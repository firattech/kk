const defaults = {
    title: 'FIRATFLIX',
    source: 'makra',
    api_base: 'http://maxgoldx.xyz:2095',
    api_key: '',
    username: 'IbrahimSansar',
    password: 'dpypW87TJ3',
    live_api_base: 'http://maxgoldx.xyz:2095',
    live_username: '1313ptt',
    live_password: 'e7b1ae2e99c947b5',
    live_streaming: 'ts',
    proxy_base: '/makra-proxy',
    transcode_base: '',
    headers: {},
    endpoints: {
        home: '/player_api.php',
        category: '/player_api.php',
        list: '/player_api.php',
        search: '/player_api.php',
        content: '/player_api.php'
    }
}

function get(){
    return window.makra_firat_flix || defaults
}

function endpoint(name, params = {}){
    let config = get()
    let path = config.endpoints[name] || ''

    Object.keys(params).forEach((key)=>{
        path = path.replace(new RegExp('\\{' + key + '\\}', 'g'), encodeURIComponent(params[key]))
    })

    return path
}

export default {
    defaults,
    get,
    endpoint
}
