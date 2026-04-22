const http = require('http')
const { spawn } = require('child_process')
const { URL } = require('url')
const fs = require('fs')
const path = require('path')

const PORT = parseInt(process.env.MAKRA_TRANSCODE_PORT || '9911', 10)
const HOST = process.env.MAKRA_TRANSCODE_HOST || '127.0.0.1'

function resolveFfmpeg(){
    const candidates = [
        process.env.MAKRA_FFMPEG_PATH,
        path.join(process.env.LOCALAPPDATA || '', 'Microsoft', 'WinGet', 'Packages', 'Gyan.FFmpeg.Essentials_Microsoft.Winget.Source_8wekyb3d8bbwe', 'ffmpeg-8.1-essentials_build', 'bin', 'ffmpeg.exe'),
        'ffmpeg'
    ].filter(Boolean)

    return candidates.find((candidate)=>{
        if(candidate === 'ffmpeg') return true
        return fs.existsSync(candidate)
    }) || 'ffmpeg'
}

const FFMPEG_PATH = resolveFfmpeg()

function writeJson(res, code, payload){
    res.writeHead(code, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    })
    res.end(JSON.stringify(payload))
}

function ffmpegArgs(input, type){
    if(type === 'live'){
        return [
            '-hide_banner',
            '-loglevel', 'error',
            '-fflags', '+genpts',
            '-i', input,
            '-map', '0:v:0?',
            '-map', '0:a:0?',
            '-sn',
            '-dn',
            '-c:v', 'libx264',
            '-preset', 'veryfast',
            '-tune', 'zerolatency',
            '-pix_fmt', 'yuv420p',
            '-profile:v', 'main',
            '-level', '4.0',
            '-g', '48',
            '-keyint_min', '48',
            '-sc_threshold', '0',
            '-c:a', 'aac',
            '-ac', '2',
            '-ar', '48000',
            '-b:a', '128k',
            '-movflags', 'frag_keyframe+empty_moov+default_base_moof',
            '-f', 'mp4',
            'pipe:1'
        ]
    }

    return [
        '-hide_banner',
        '-loglevel', 'error',
        '-i', input,
        '-map', '0:v:0?',
        '-map', '0:a:0?',
        '-sn',
        '-dn',
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-ac', '2',
        '-ar', '48000',
        '-b:a', '160k',
        '-movflags', 'frag_keyframe+empty_moov+default_base_moof',
        '-f', 'mp4',
        'pipe:1'
    ]
}

const server = http.createServer((req, res)=>{
    if(req.method === 'OPTIONS'){
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        })
        return res.end()
    }

    const requestUrl = new URL(req.url, `http://${req.headers.host}`)

    if(requestUrl.pathname === '/health'){
        return writeJson(res, 200, { ok: true, port: PORT })
    }

    if(requestUrl.pathname !== '/transcode'){
        return writeJson(res, 404, { ok: false, error: 'not_found' })
    }

    const input = requestUrl.searchParams.get('url')
    const type = requestUrl.searchParams.get('type') || 'vod'

    if(!input){
        return writeJson(res, 400, { ok: false, error: 'missing_url' })
    }

    const ffmpeg = spawn(FFMPEG_PATH, ffmpegArgs(input, type), {
        windowsHide: true,
        stdio: ['ignore', 'pipe', 'pipe']
    })

    let stderr = ''

    ffmpeg.stderr.on('data', (chunk)=>{
        stderr += chunk.toString()
    })

    ffmpeg.on('error', (error)=>{
        if(!res.headersSent) writeJson(res, 500, { ok: false, error: error.message })
    })

    ffmpeg.on('close', (code)=>{
        if(code !== 0 && !res.headersSent){
            writeJson(res, 502, { ok: false, error: 'ffmpeg_exit', code, details: stderr.trim().slice(-500) })
        }
    })

    req.on('close', ()=>{
        if(!ffmpeg.killed) ffmpeg.kill('SIGKILL')
    })

    res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*',
        'Accept-Ranges': 'none'
    })

    ffmpeg.stdout.pipe(res)
})

server.listen(PORT, HOST, ()=>{
    console.log(`Makra transcode server listening on http://${HOST}:${PORT}`)
    console.log(`Using ffmpeg: ${FFMPEG_PATH}`)
})
