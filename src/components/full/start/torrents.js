import Activity from '../../../interaction/activity/activity'
import Lang from '../../../core/lang'
import Storage from '../../../core/storage/storage'
import Select from '../../../interaction/select'
import Controller from '../../../core/controller'
import Player from '../../../interaction/player'
import Router from '../../../core/router'

export default {
    onCreate: function(){
        let status = Storage.field('parser_use')
        let button = this.html.find('.view--torrent')
        let streams = this.card.makra_streams || {vod: [], live: [], episodes: []}

        if(this.card.source == 'makra'){
            let playStream = (stream)=>{
                let payload = Object.assign({
                    title: stream.title || this.card.title || this.card.name || 'FIRATFLIX',
                    url: stream.url,
                    card: this.card
                }, stream)

                if(payload.iptv || payload.tv){
                    payload.iptv = false
                    payload.tv = false
                    payload.need_check_live_stream = true
                }

                Player.play(payload)
            }

            let groups = [
                {title: 'VOD', items: streams.vod},
                {title: 'Canli TV', items: streams.live},
                {title: 'Bolumler', items: streams.episodes}
            ].filter((group)=>group.items && group.items.length)
            let flat = groups.reduce((list, group)=>{
                return list.concat((group.items || []).map((item)=>Object.assign({
                    group: group.title
                }, item)))
            }, [])

            if(!groups.length){
                button.remove()
                return
            }

            button.addClass('selector').removeClass('hide')
            button.find('span').text(streams.episodes && streams.episodes.length ? 'Bolumleri Ac' : 'Icerigi Oynat')

            button.on('hover:enter',()=>{
                if(!flat.length) return

                if(streams.episodes && streams.episodes.length){
                    Router.call('episodes', this.card)
                    return
                }

                if(flat.length == 1){
                    playStream(flat[0])
                    return
                }

                Select.show({
                    title: streams.episodes && streams.episodes.length ? 'Bolumler' : 'Kaynaklar',
                    items: flat.map((item, index)=>({
                        title: item.title || (item.group + ' ' + (index + 1)),
                        subtitle: item.group == 'Bolumler' ? ('Sezon/Bolum Secimi') : item.group,
                        item
                    })),
                    onSelect: (selected)=>{
                        playStream(selected.item)
                    },
                    onBack: ()=>{
                        Controller.toggle('content')
                    }
                })
            })

            return
        }

        if(window.lampa_settings.torrents_use) button.toggleClass('selector', status).toggleClass('hide',!status)

        button.on('hover:enter',()=>{
            let year = ((this.card.first_air_date || this.card.release_date || '0000') + '').slice(0,4)
            let combinations = {
                'df': this.card.original_title,
                'df_year': this.card.original_title + ' ' + year,
                'df_lg': this.card.original_title + ' ' + this.card.title,
                'df_lg_year': this.card.original_title + ' ' + this.card.title + ' ' + year,

                'lg': this.card.title,
                'lg_year': this.card.title + ' ' + year,
                'lg_df': this.card.title + ' ' + this.card.original_title,
                'lg_df_year': this.card.title + ' ' + this.card.original_title + ' ' + year,
            }

            Activity.push({
                url: '',
                title: Lang.translate('title_torrents'),
                component: 'torrents',
                search: combinations[Storage.field('parse_lang')],
                search_one: this.card.title,
                search_two: this.card.original_title,
                movie: this.card,
                page: 1
            })
        })
    }
}
