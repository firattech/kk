import Reguest from '../../../utils/reguest'
import Utils from '../../../utils/utils'
import Lang from '../../lang'
import TMDB from './tmdb'
import Activity from '../../../interaction/activity/activity'
import Router from '../../router'
import CardModule from '../../../interaction/card/module/module'
import MakraConfig from '../../../config/makra'

let network = new Reguest()
let source = 'makra'

let config = {
    host: 'http://maxgoldx.xyz:2095',
    username: 'IbrahimSansar',
    password: 'dpypW87TJ3',
    output: 'm3u8',
    live_host: 'http://maxgoldx.xyz:2095',
    live_username: '1313ptt',
    live_password: 'e7b1ae2e99c947b5',
    live_output: 'ts'
}

function updateConfig(){
    let makra = MakraConfig.get()

    config.host = makra.api_base || config.host
    config.username = makra.username || config.username
    config.password = makra.password || config.password
    config.output = makra.output || 'm3u8'
    config.live_host = makra.live_api_base || makra.api_base || config.live_host
    config.live_username = makra.live_username || makra.username || config.live_username
    config.live_password = makra.live_password || makra.password || config.live_password
    config.live_output = makra.live_streaming || 'ts'
}

let memory = {
    live_categories: null,
    vod_categories: null,
    series_categories: null
}

function api(query = ''){
    updateConfig()
    return config.host + '/player_api.php?username=' + encodeURIComponent(config.username) + '&password=' + encodeURIComponent(config.password) + (query ? '&' + query : '')
}

function liveUrl(id){
    updateConfig()
    return config.live_host + '/live/' + encodeURIComponent(config.live_username) + '/' + encodeURIComponent(config.live_password) + '/' + id + '.' + config.live_output
}

function liveTsUrl(id){
    updateConfig()
    return config.live_host + '/live/' + encodeURIComponent(config.live_username) + '/' + encodeURIComponent(config.live_password) + '/' + id + '.ts'
}

function liveQuality(id){
    return {
        1: {
            url: proxiedUrl(liveUrl(id), 'live'),
            label: 'LIVE'
        },
        2: {
            url: proxiedUrl(liveTsUrl(id), 'live'),
            label: 'TS'
        }
    }
}

function movieUrl(id, ext){
    updateConfig()
    return config.host + '/movie/' + encodeURIComponent(config.username) + '/' + encodeURIComponent(config.password) + '/' + id + '.' + (ext || 'mp4')
}

function seriesUrl(id, ext){
    updateConfig()
    return config.host + '/series/' + encodeURIComponent(config.username) + '/' + encodeURIComponent(config.password) + '/' + id + '.' + (ext || 'mkv')
}

function proxiedUrl(url, type){
    let makra = MakraConfig.get()
    let proxy = makra.proxy_base || ''
    let base = makra.transcode_base || ''

    if(proxy) return proxy + '?url=' + encodeURIComponent(url) + '&type=' + encodeURIComponent(type || 'vod')
    if(!base) return url

    return base + '?type=' + encodeURIComponent(type || 'vod') + '&url=' + encodeURIComponent(url)
}

function request(url, oncomplite, onerror){
    network.timeout(1000 * 20)
    network.silent(url, oncomplite, onerror)
}

function asArray(data){
    if(Array.isArray(data)) return data
    if(data && Array.isArray(data.value)) return data.value
    return []
}

function parseCategoryType(url){
    if(url == 'live') return 'live'
    if(url == 'episodes' || url == 'series') return 'series'
    return 'vod'
}

function cleanTitle(name = ''){
    return (name + '').replace(/^TR:\s*/i, '').trim()
}

function isAbsoluteUrl(url = ''){
    return /^https?:\/\//i.test((url || '') + '')
}

function asPosterPath(url = ''){
    return isAbsoluteUrl(url) ? '' : (url || '')
}

function asImage(url = ''){
    return isAbsoluteUrl(url) ? url : ''
}

function isDecorativeLive(item){
    let title = cleanTitle(item && item.name || '')

    if(!title) return true

    return /^✦/.test(title) || /^[-=•* ]+$/.test(title)
}

function isWebAudioCodec(codec = ''){
    return ['aac', 'mp3', 'opus', 'vorbis', 'flac', 'mp2', 'pcm_s16le', 'pcm_s24le'].indexOf((codec + '').toLowerCase()) >= 0
}

function canPlayWeb(info = {}){
    let video = info.video || {}
    let audio = info.audio || {}

    let videoCodec = (video.codec_name || '').toLowerCase()
    let audioCodec = (audio.codec_name || '').toLowerCase()

    let videoOk = !videoCodec || ['h264', 'av1', 'vp8', 'vp9', 'hevc'].indexOf(videoCodec) >= 0
    let audioOk = !audioCodec || isWebAudioCodec(audioCodec)

    return videoOk && audioOk
}

function normalizeCategory(item, type){
    return {
        id: item.category_id + '',
        title: item.category_name,
        url: type + ':' + item.category_id,
        source
    }
}

function normalizeVod(item){
    let tmdb_id = parseInt(item.tmdb || '0')
    let icon = item.stream_icon || ''

    return {
        id: tmdb_id || item.stream_id,
        xtream_id: item.stream_id,
        xtream_tmdb: tmdb_id,
        title: cleanTitle(item.name),
        original_title: cleanTitle(item.name),
        poster_path: asPosterPath(icon),
        backdrop_path: '',
        vote_average: parseFloat(item.rating || 0),
        release_date: '',
        overview: item.plot || '',
        source,
        method: 'movie',
        card_type: 'movie',
        stream_icon: icon,
        img: asImage(icon),
        container_extension: item.container_extension || 'mp4',
        genres: [],
        production_companies: [],
        production_countries: []
    }
}

function normalizeLive(item){
    if(isDecorativeLive(item)) return null
    let icon = item.stream_icon || ''
    let primary = proxiedUrl(liveUrl(item.stream_id), 'live')
    let reserve = proxiedUrl(liveTsUrl(item.stream_id), 'live')

    return {
        id: 'live_' + item.stream_id,
        xtream_id: item.stream_id,
        title: cleanTitle(item.name),
        original_title: cleanTitle(item.name),
        poster_path: asPosterPath(icon),
        backdrop_path: '',
        vote_average: 0,
        source,
        method: 'movie',
        card_type: 'live',
        stream_icon: icon,
        img: asImage(icon),
        url: primary,
        url_reserve: reserve,
        quality: liveQuality(item.stream_id),
        tv: true,
        iptv: true,
        name: cleanTitle(item.name),
        genres: [],
        production_companies: [],
        production_countries: []
    }
}

function normalizeSeries(item){
    let tmdb_id = parseInt(item.tmdb || '0')
    let cover = item.cover || ''
    let backdrop = Array.isArray(item.backdrop_path) ? item.backdrop_path[0] || '' : ''

    return {
        id: tmdb_id || item.series_id,
        xtream_id: item.series_id,
        xtream_tmdb: tmdb_id,
        title: cleanTitle(item.name),
        name: cleanTitle(item.name),
        original_title: cleanTitle(item.name),
        original_name: cleanTitle(item.name),
        poster_path: asPosterPath(cover),
        backdrop_path: asPosterPath(backdrop),
        img: asImage(cover),
        background_image: asImage(backdrop),
        vote_average: parseFloat(item.rating || 0),
        overview: item.plot || '',
        first_air_date: item.releaseDate || item.release_date || '',
        source,
        method: 'tv',
        card_type: 'tv',
        number_of_seasons: 1,
        number_of_episodes: 0,
        genres: [],
        production_companies: [],
        production_countries: []
    }
}

function cached(name, loader, oncomplite, onerror){
    if(memory[name]) return oncomplite(memory[name])

    loader((data)=>{
        memory[name] = data
        oncomplite(data)
    }, onerror)
}

function categoriesFor(type, oncomplite, onerror){
    let normalize = (data)=>asArray(data).filter((item)=>item && item.category_id && item.category_name)

    if(type == 'live') return cached('live_categories', (call, fail)=>request(api('action=get_live_categories'), (data)=>call(normalize(data)), fail), oncomplite, onerror)
    if(type == 'series') return cached('series_categories', (call, fail)=>request(api('action=get_series_categories'), (data)=>call(normalize(data)), fail), oncomplite, onerror)
    return cached('vod_categories', (call, fail)=>request(api('action=get_vod_categories'), (data)=>call(normalize(data)), fail), oncomplite, onerror)
}

function listByCategory(type, category_id, oncomplite, onerror){
    let action = type == 'live' ? 'get_live_streams' : type == 'series' ? 'get_series' : 'get_vod_streams'

    request(api('action=' + action + '&category_id=' + category_id), (data)=>{
        let items = asArray(data)

        if(type == 'live') items = items.map(normalizeLive).filter(Boolean)
        else if(type == 'series') items = items.map(normalizeSeries)
        else items = items.map(normalizeVod)

        oncomplite(items)
    }, onerror)
}

function main(params = {}, oncomplite, onerror){
    let type = parseCategoryType(params.url || 'vod')

    categoriesFor(type, (cats)=>{
        let groups = cats.slice(0, 8)
        let wait = groups.length
        let result = []

        if(!wait) return onerror && onerror()

        groups.forEach((cat)=>{
            listByCategory(type, cat.category_id, (items)=>{
                result.push({
                    title: cat.category_name,
                    results: items.slice(0, 24),
                    source
                })

                wait--
                if(wait <= 0) oncomplite(result.filter((row)=>row.results.length))
            }, ()=>{
                wait--
                if(wait <= 0) oncomplite(result.filter((row)=>row.results.length))
            })
        })
    }, onerror)
}

function category(params = {}, oncomplite, onerror){
    let type = parseCategoryType(params.url || 'vod')

    categoriesFor(type, (cats)=>{
        let groups = cats.map((cat)=>normalizeCategory(cat, type))

        oncomplite(groups.map((group)=>({
            title: group.title,
            url: group.url,
            results: [],
            source
        })))
    }, onerror)
}

function list(params = {}, oncomplite, onerror){
    let parts = (params.url || 'vod').split(':')
    let type = parts[0] == 'episodes' ? 'series' : parts[0]
    let category_id = parts[1]

    if(!category_id){
        return categoriesFor(type, (cats)=>{
            oncomplite({
                title: params.title || (type == 'live' ? 'Canli TV' : type == 'series' ? 'Diziler' : 'VOD'),
                page: 1,
                total_pages: 1,
                results: cats.map((cat)=>({
                    id: 'folder_' + cat.category_id,
                    title: cat.category_name,
                    name: cat.category_name,
                    source,
                    url: type + ':' + cat.category_id,
                    card_type: 'folder',
                    poster_path: '',
                    params: {
                        module: CardModule.only('Card', 'Callback')
                    }
                }))
            })
        }, onerror)
    }

    listByCategory(type, category_id, (items)=>{
        oncomplite({
            title: params.title || '',
            page: 1,
            total_pages: 1,
            results: items,
            source
        })
    }, onerror)
}

function search(params = {}, oncomplite){
    let query = (params.query || '').toLowerCase().trim()
    let status = {
        wait: 2,
        results: []
    }

    if(!query) return oncomplite([])

    let finish = ()=>{
        status.wait--
        if(status.wait <= 0) oncomplite(status.results.filter((row)=>row.results.length))
    }

    categoriesFor('vod', (cats)=>{
        let selected = cats.slice(0, 12)
        let rows = []
        let wait = selected.length

        if(!wait) return finish()

        selected.forEach((cat)=>{
            listByCategory('vod', cat.category_id, (items)=>{
                let found = items.filter((item)=>(item.title || '').toLowerCase().indexOf(query) >= 0).slice(0, 10)
                if(found.length) rows.push({title: cat.category_name, results: found, type: 'movie'})
                wait--
                if(wait <= 0){
                    status.results = status.results.concat(rows)
                    finish()
                }
            }, ()=>{
                wait--
                if(wait <= 0){
                    status.results = status.results.concat(rows)
                    finish()
                }
            })
        })
    }, finish)

    categoriesFor('series', (cats)=>{
        let selected = cats.slice(0, 10)
        let rows = []
        let wait = selected.length

        if(!wait) return finish()

        selected.forEach((cat)=>{
            listByCategory('series', cat.category_id, (items)=>{
                let found = items.filter((item)=>(item.title || '').toLowerCase().indexOf(query) >= 0).slice(0, 10)
                if(found.length) rows.push({title: cat.category_name, results: found, type: 'tv'})
                wait--
                if(wait <= 0){
                    status.results = status.results.concat(rows)
                    finish()
                }
            }, ()=>{
                wait--
                if(wait <= 0){
                    status.results = status.results.concat(rows)
                    finish()
                }
            })
        })
    }, finish)
}

function discovery(){
    return {
        title: 'FIRATFLIX',
        search,
        params: {
            save: true
        },
        onSelect: (params, close)=>{
            close()
            Router.call('full', params.element)
        },
        onMore: (params, close)=>{
            close()
            Activity.push({
                url: '',
                title: Lang.translate('search') + ' - ' + params.query,
                component: 'category_full',
                page: 1,
                query: encodeURIComponent(params.query),
                source
            })
        },
        onCancel: network.clear.bind(network)
    }
}

function full(params = {}, oncomplite, onerror){
    if((params.card && params.card.card_type == 'live') || (params.card && params.card.tv && params.card.iptv)){
        let primary = proxiedUrl(liveUrl(params.card.xtream_id), 'live')
        let reserve = proxiedUrl(liveTsUrl(params.card.xtream_id), 'live')

        let movie = Object.assign({}, params.card, {
            source,
            makra_streams: {
                vod: [],
                live: [{
                    title: params.card.title,
                    url: primary,
                    url_reserve: reserve,
                    quality: liveQuality(params.card.xtream_id),
                    tv: true,
                    iptv: true,
                    source
                }],
                episodes: []
            }
        })

        return oncomplite({movie})
    }

    if(params.card && params.card.xtream_id && params.card.card_type == 'tv'){
        let tmdbParams = Object.assign({}, params, {
            id: params.card.xtream_tmdb || params.id,
            method: 'tv'
        })

        return TMDB.full(tmdbParams, (data)=>{
            request(api('action=get_series_info&series_id=' + params.card.xtream_id), (series)=>{
                let episodes = []
                let episodes_by_season = {}
                let seasons_count = asArray(series.seasons).length || 1

                Object.keys(series.episodes || {}).forEach((season)=>{
                    let season_number = parseInt(season) || 1

                    if(!episodes_by_season[season_number]){
                        episodes_by_season[season_number] = []
                    }

                    asArray(series.episodes[season]).forEach((episode)=>{
                        let info = episode.info || {}
                        let playable_web = canPlayWeb(info)
                        let normalized = {
                            id: episode.id,
                            episode_number: episode.episode_num,
                            season_number,
                            name: episode.title,
                            title: episode.title,
                            air_date: info.releasedate || '',
                            still_path: '',
                            overview: '',
                            source,
                            container_extension: episode.container_extension || 'mp4',
                            url: proxiedUrl(seriesUrl(episode.id, episode.container_extension || 'mp4'), 'episode'),
                            playable_web
                        }

                        episodes.push(normalized)

                        episodes_by_season[season_number].push(normalized)
                    })
                })

                data.movie.source = source
                data.movie.number_of_seasons = data.movie.number_of_seasons || seasons_count
                data.movie.makra_series_episodes = episodes_by_season
                data.movie.makra_streams = {
                    vod: [],
                    live: [],
                    episodes: episodes.map((episode)=>({
                        title: episode.title,
                        url: episode.url,
                        source
                    }))
                }
                data.episodes = {
                    episodes,
                    episodes_original: episodes,
                    seasons_count,
                    name: Lang.translate('full_series_release')
                }

                oncomplite(data)
            }, onerror)
        }, onerror)
    }

    let movie_id = params.card ? params.card.xtream_id : params.id
    let tmdb_id = params.card ? params.card.xtream_tmdb : 0
    let ext = params.card ? params.card.container_extension : 'mp4'

    if(!movie_id || movie_id == 'undefined'){
        let card = Object.assign({}, params.card, {
            source,
            makra_streams: {
                vod: [],
                live: [],
                episodes: []
            }
        })

        return oncomplite({movie: card})
    }

    let tmdbParams = Object.assign({}, params, {
        id: tmdb_id || params.id,
        method: 'movie'
    })

    if(tmdb_id){
        TMDB.full(tmdbParams, (data)=>{
            request(api('action=get_vod_info&vod_id=' + movie_id), (vod_info)=>{
                let info = vod_info && vod_info.info ? vod_info.info : {}
                let playable = canPlayWeb(info)

                data.movie.source = source
                data.movie.xtream_id = movie_id
                data.movie.makra_streams = {
                    vod: playable ? [{
                        title: data.movie.title || params.card.title,
                        url: proxiedUrl(movieUrl(movie_id, ext), 'vod'),
                        source
                    }] : [],
                    live: [],
                    episodes: []
                }

                oncomplite(data)
            }, ()=>{
                data.movie.source = source
                data.movie.xtream_id = movie_id
                data.movie.makra_streams = {
                    vod: [{
                        title: data.movie.title || params.card.title,
                        url: proxiedUrl(movieUrl(movie_id, ext), 'vod'),
                        source
                    }],
                    live: [],
                    episodes: []
                }

                oncomplite(data)
            })
        }, ()=>{
            let card = Object.assign({}, params.card, {
                source,
                makra_streams: {
                    vod: [{
                        title: params.card.title,
                        url: proxiedUrl(movieUrl(movie_id, ext), 'vod'),
                        source
                    }],
                    live: [],
                    episodes: []
                }
            })

            oncomplite({movie: card})
        })
    }
    else{
        let card = Object.assign({}, params.card, {
            source,
            makra_streams: {
                vod: [{
                    title: params.card.title,
                    url: proxiedUrl(movieUrl(movie_id, ext), 'vod'),
                    source
                }],
                live: [],
                episodes: []
            }
        })

        oncomplite({movie: card})
    }
}

function menu(params = {}, oncomplite){
    oncomplite([
        {title: 'VOD', id: 'vod'},
        {title: 'Canli TV', id: 'live'},
        {title: 'Diziler', id: 'episodes'}
    ])
}

function menuCategory(params, oncomplite){
    let type = parseCategoryType(params.action || 'vod')

    categoriesFor(type, (cats)=>{
        oncomplite(cats.map((cat)=>({
            title: cat.category_name,
            url: type + ':' + cat.category_id
        })))
    }, ()=>oncomplite([]))
}

function person(params, oncomplite, onerror){
    TMDB.person(params, oncomplite, onerror)
}

function seasons(tv, from, oncomplite){
    if(tv && tv.source == source && tv.makra_series_episodes){
        let seasons = {}
        let requested = Array.isArray(from) && from.length ? from : Object.keys(tv.makra_series_episodes)

        requested.forEach((season_value)=>{
            let season_number = parseInt(season_value) || 1
            let episodes = (tv.makra_series_episodes[season_number] || []).map((episode)=>Object.assign({}, episode, {
                card: tv,
                original_name: tv.original_name || tv.name
            }))

            seasons[season_number] = {
                season_number,
                seasons_count: tv.number_of_seasons || Object.keys(tv.makra_series_episodes).length || 1,
                episodes
            }
        })

        oncomplite(seasons)
        return
    }

    TMDB.seasons(tv, from, oncomplite)
}

function clear(){
    network.clear()
}

export default {
    main,
    menu,
    full,
    list,
    category,
    clear,
    person,
    seasons,
    menuCategory,
    discovery
}
