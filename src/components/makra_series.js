import Controller from '../core/controller'
import Lang from '../core/lang'
import Api from '../core/api/api'
import Utils from '../utils/utils'
import Background from '../interaction/background'
import Activity from '../interaction/activity/activity'
import Category from '../interaction/items/category'
import CategoryModule from '../interaction/items/category/module/module'
import Season from '../interaction/season/season'
import SeasonModule from '../interaction/season/module/module'
import Episode from '../interaction/episode/episode'
import Select from '../interaction/select'
import EpisodeModule from '../interaction/episode/module/module'
import Arrays from '../utils/arrays'
import Player from '../interaction/player'
import TMDB from '../core/api/sources/tmdb'

function component(object){
    let comp = Utils.createInstance(Category, object, {
        module: CategoryModule.toggle(CategoryModule.MASK.base, 'Explorer'),
        items: {
            mapping: 'list'
        }
    })

    let chooseSeason = (ctx)=>{
        let total = object.seasons_count || Utils.countSeasons(object.card) || 1
        let items = []

        for(let i = 1; i <= total; i++){
            items.push({
                title: Lang.translate('torrent_serial_season') + ' ' + i,
                season: i,
                selected: (object.season || 1) == i
            })
        }

        Select.show({
            title: Lang.translate('torrent_serial_season'),
            items,
            onSelect: (a)=>{
                Controller.toggle('content')
                Activity.replace({
                    season: a.season
                })
            },
            onBack: ()=>{
                Controller.toggle('content')
            }
        })
    }

    let playEpisode = (episode)=>{
        let episode_streams = object.card && object.card.makra_streams ? object.card.makra_streams.episodes || [] : []
        let direct_stream = episode_streams.find((item, index)=>index + 1 == episode.episode_number)
        let stream = direct_stream || episode

        if(!(stream && stream.url)) {
            console.warn('MakraSeries', 'episode url empty', episode)
            return
        }

        console.log('MakraSeries', 'play', episode.title || episode.name, stream.url)

        Player.play({
            title: episode.title || episode.name || 'Bolum',
            url: stream.url,
            quality: stream.quality,
            card: object.card,
            timeline: episode.timeline
        })
    }

    comp.use({
        onCreate: function(){
            let season = object.season || 1

            Api.seasons(object.card, [season], (data)=>{
                if(!(data[season] && data[season].episodes)) return this.empty()

                object.season = season
                object.seasons_count = data[season].seasons_count || Object.keys(object.card.makra_series_episodes || {}).length || 1

                Arrays.extend(data[season], {
                    title: Lang.translate('torrent_serial_season') + ' ' + season,
                    params: {
                        createInstance: (item)=>new Season(item),
                        module: SeasonModule.only('Line', 'Callback')
                    }
                })

                let results = [data[season]]
                let buildEpisodes = (enrich = {})=>{
                    let season_streams = object.card && object.card.makra_series_episodes ? object.card.makra_series_episodes[season] || [] : []

                    data[season].episodes.forEach((episode)=>{
                        let tmdb_episode = enrich[episode.episode_number] || {}
                        let stream_episode = season_streams.find((item)=>item.episode_number == episode.episode_number) || {}

                        episode.name = tmdb_episode.name || episode.name || (Lang.translate('full_episode') + ' ' + episode.episode_number)
                        episode.title = tmdb_episode.name || episode.title || episode.name
                        episode.overview = tmdb_episode.overview || episode.overview || ''
                        episode.air_date = tmdb_episode.air_date || episode.air_date || ''
                        episode.still_path = tmdb_episode.still_path || episode.still_path || ''
                        episode.runtime = tmdb_episode.runtime || episode.runtime || 0
                        episode.url = stream_episode.url || episode.url || ''
                        episode.original_name = object.card.original_name || object.card.name
                        episode.params = {
                            createInstance: ()=>new Episode(episode),
                            module: EpisodeModule.toggle(EpisodeModule.MASK.base, 'Line'),
                            on: {
                                'hover:enter': ()=>playEpisode(episode)
                            },
                            emit: {
                                onCreate: function(){
                                    let element = this.render()

                                    element.attr('data-episode-number', episode.episode_number)
                                    element.attr('data-title', episode.title || episode.name || '')
                                    element.attr('data-url', episode.url || '')
                                }
                            }
                        }
                        results.push(episode)
                    })

                    this.build({results})
                }

                if(object.card.xtream_tmdb){
                    TMDB.seasons({
                        id: object.card.xtream_tmdb,
                        method: 'tv',
                        card: object.card
                    }, [season], (tmdb_data)=>{
                        let enrich = {}
                        let season_data = tmdb_data[season]
                        let episodes = season_data && season_data.episodes ? season_data.episodes : []

                        episodes.forEach((episode)=>{
                            enrich[episode.episode_number] = episode
                        })

                        buildEpisodes(enrich)
                    }, ()=>buildEpisodes())
                }
                else{
                    buildEpisodes()
                }
            }, this.empty.bind(this))
        },
        onInstance: function(item, data){
            let element = item.render()

            if(data && data.episodes){
                element.attr('data-season', object.season || 1)
                item.use({
                    onlyEnter: ()=>chooseSeason(this)
                })
                element.off('hover:enter.makraSeries click.makraSeries').on('hover:enter.makraSeries click.makraSeries', ()=>chooseSeason(this))
                return
            }

            if(data && data.url){
                element.attr('data-episode-number', data.episode_number || '')
                element.attr('data-title', data.title || data.name || '')
                element.attr('data-url', data.url || '')

                item.use({
                    onlyEnter: ()=>playEpisode(data)
                })
                element.off('hover:enter.makraSeries click.makraSeries').on('hover:enter.makraSeries click.makraSeries', ()=>playEpisode(data))
            }
        },
        onController: function(){
            Background.immediately(Utils.cardImgBackgroundBlur(object.card))
        }
    })

    return comp
}

export default component
