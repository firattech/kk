import Api from '../../core/api/api'
import Category from '../../interaction/items/category'
import CategoryModule from '../../interaction/items/category/module/module'
import Background from '../../interaction/background'
import Utils from '../../utils/utils'
import Router from '../../core/router'
import Player from '../../interaction/player'

function startMakraLiveTV(channels = [], selected){
    let live = channels.filter((channel)=>channel && channel.card_type == 'live' && channel.url)
    let position = Math.max(0, live.findIndex((channel)=>channel.id == selected.id))

    if(!live.length) return

    let data = {
        title: selected.title || selected.name || 'Canli TV',
        url: live[position].url,
        position,
        total: live.length,
        onGetChannel: (index)=>{
            let current = live[index] || live[0]

            return {
                name: current.title || current.name || 'Kanal',
                group: 'Makra Live',
                url: current.url,
                icon: current.stream_icon || current.poster_path || '',
                tv: false,
                original: current
            }
        },
        onGetProgram: (channel, index, container)=>{
            let wrap = document.createElement('div')
            wrap.addClass('player-panel-iptv-item__prog-load')
            wrap.text('Canli yayin')
            container[0].empty().append(wrap)
        }
    }

    Player.iptv(data)
}

function component(object){
    let current = []

    let comp = Utils.createInstance(Category, object, {
        module: CategoryModule.toggle(CategoryModule.MASK.base, 'Pagination')
    })

    comp.use({
        onCreate: function(){
            Api.list(object, (result)=>{
                current = result && result.results ? result.results : []
                this.build(result)
            }, this.empty.bind(this))
        },
        onNext: function(resolve, reject){
            Api.list(object, (result)=>{
                current = current.concat(result && result.results ? result.results : [])
                resolve.call(this, result)
            }, reject.bind(this))
        },
        onInstance: function(item, data){
            item.use({
                onEnter: data.card_type == 'folder' ? function(){
                    Router.call('category_full', {
                        url: data.url,
                        title: data.title || data.name,
                        source: data.source
                    })
                } : object.source == 'makra' && data.card_type == 'live' ? function(){
                    startMakraLiveTV(current, data)
                } : Router.call.bind(Router, 'full', data),
                onFocus: function(){
                    Background.change(Utils.cardImgBackground(data))
                }
            })
        }
    })

    return comp
}

export default component
