const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { URL } = require('url')

const root = __dirname
const webRoot = path.join(root, 'build', 'web')
const port = parseInt(process.env.PORT || '3000', 10)
const proxySessions = new Map()

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.ico': 'image/x-icon'
}

function parseCookies(header = ''){
    return (header || '').split(';').reduce((map, item)=>{
        let parts = item.trim().split('=')
        if(parts[0]) map[parts[0]] = parts.slice(1).join('=')
        return map
    }, {})
}

function ensureSession(req, res){
    let cookies = parseCookies(req.headers.cookie || '')
    let id = cookies.firatflix_proxy

    if(!id){
        id = crypto.randomBytes(16).toString('hex')
        res.setHeader('Set-Cookie', 'firatflix_proxy=' + id + '; Path=/; HttpOnly; SameSite=Lax')
    }

    if(!proxySessions.has(id)){
        proxySessions.set(id, { cookies: {} })
    }

    return proxySessions.get(id)
}

function storeCookies(session, origin, setCookie = []){
    if(!Array.isArray(setCookie) || !setCookie.length) return

    let bucket = session.cookies[origin] || {}

    setCookie.forEach((cookie)=>{
        let pair = (cookie || '').split(';')[0]
        let index = pair.indexOf('=')

        if(index > 0){
            let key = pair.slice(0, index).trim()
            let value = pair.slice(index + 1).trim()
            bucket[key] = value
        }
    })

    session.cookies[origin] = bucket
}

function cookieHeader(session, origin){
    let bucket = session.cookies[origin] || {}
    let keys = Object.keys(bucket)

    return keys.map((key)=>key + '=' + bucket[key]).join('; ')
}

function rewriteManifest(body, baseUrl){
    return body.split('\n').map((line)=>{
        let trimmed = line.trim()

        if(!trimmed) return line

        if(trimmed[0] === '#'){
            return line
                .replace(/URI="([^"]+)"/g, (_, value)=>{
                    let absolute = new URL(value, baseUrl).toString()
                    return 'URI="/makra-proxy?url=' + encodeURIComponent(absolute) + '"'
                })
        }

        let absolute = new URL(trimmed, baseUrl).toString()
        return '/makra-proxy?url=' + encodeURIComponent(absolute)
    }).join('\n')
}

function requestUpstream(targetUrl, clientReq, session, redirectCount, callback){
    let parsed = new URL(targetUrl)
    let transport = parsed.protocol === 'https:' ? https : http
    let origin = parsed.origin
    let headers = {
        'user-agent': clientReq.headers['user-agent'] || 'Mozilla/5.0',
        'accept': clientReq.headers['accept'] || '*/*',
        'accept-language': clientReq.headers['accept-language'] || 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7'
    }
    let cookies = cookieHeader(session, origin)

    if(clientReq.headers.range) headers.range = clientReq.headers.range
    if(cookies) headers.cookie = cookies

    let upstreamReq = transport.request({
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
        path: parsed.pathname + parsed.search,
        method: 'GET',
        headers
    }, (upstreamRes)=>{
        storeCookies(session, origin, upstreamRes.headers['set-cookie'])

        if(upstreamRes.statusCode >= 300 && upstreamRes.statusCode < 400 && upstreamRes.headers.location && redirectCount < 10){
            let nextUrl = new URL(upstreamRes.headers.location, targetUrl).toString()
            upstreamRes.resume()
            requestUpstream(nextUrl, clientReq, session, redirectCount + 1, callback)
            return
        }

        callback(null, {
            response: upstreamRes,
            finalUrl: targetUrl
        })
    })

    upstreamReq.on('error', (error)=>callback(error))
    upstreamReq.end()
}

function serveFile(req, res, targetPath){
    let resolved = path.join(webRoot, targetPath === '/' ? '/index.html' : targetPath)
    let safe = path.normalize(resolved)

    if(!safe.startsWith(path.normalize(webRoot))){
        res.writeHead(403)
        res.end('Forbidden')
        return
    }

    let filePath = safe

    if(fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()){
        filePath = path.join(filePath, 'index.html')
    }

    if(!fs.existsSync(filePath)){
        filePath = path.join(webRoot, 'index.html')
    }

    let ext = path.extname(filePath).toLowerCase()
    let mime = mimeTypes[ext] || 'application/octet-stream'

    fs.createReadStream(filePath)
        .on('error', ()=>{
            res.writeHead(500)
            res.end('Internal Server Error')
        })
        .pipe(res.writeHead(200, {
            'Content-Type': mime,
            'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
        }))
}

function proxyRequest(req, res, requestUrl){
    let target = requestUrl.searchParams.get('url') || ''

    if(!/^https?:\/\//i.test(target)){
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' })
        res.end('Missing or invalid url')
        return
    }

    let session = ensureSession(req, res)

    requestUpstream(target, req, session, 0, (error, result)=>{
        if(error){
            res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8', 'Access-Control-Allow-Origin': '*' })
            res.end('Proxy error: ' + error.message)
            return
        }

        let upstreamRes = result.response
        let finalUrl = result.finalUrl
        let contentType = upstreamRes.headers['content-type'] || 'application/octet-stream'
        let isManifest = /\.m3u8($|\?)/i.test(finalUrl) || /mpegurl/i.test(contentType)

        if(isManifest){
            let chunks = []

            upstreamRes.on('data', (chunk)=>chunks.push(chunk))
            upstreamRes.on('end', ()=>{
                let body = Buffer.concat(chunks).toString('utf8')
                let rewritten = rewriteManifest(body, finalUrl)

                res.writeHead(200, {
                    'Content-Type': 'application/vnd.apple.mpegurl; charset=utf-8',
                    'Cache-Control': 'no-cache',
                    'Access-Control-Allow-Origin': '*'
                })
                res.end(rewritten)
            })

            return
        }

        let headers = {
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache'
        }

        if(upstreamRes.headers['content-length']) headers['Content-Length'] = upstreamRes.headers['content-length']
        if(upstreamRes.headers['content-range']) headers['Content-Range'] = upstreamRes.headers['content-range']
        if(upstreamRes.headers['accept-ranges']) headers['Accept-Ranges'] = upstreamRes.headers['accept-ranges']

        res.writeHead(upstreamRes.statusCode || 200, headers)
        upstreamRes.pipe(res)
    })
}

http.createServer((req, res)=>{
    let requestUrl = new URL(req.url, 'http://127.0.0.1')

    if(requestUrl.pathname === '/health'){
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
        res.end(JSON.stringify({ ok: true }))
        return
    }

    if(requestUrl.pathname === '/makra-proxy'){
        proxyRequest(req, res, requestUrl)
        return
    }

    serveFile(req, res, requestUrl.pathname)
}).listen(port, ()=>{
    console.log('FIRATFLIX server running on port ' + port)
})
