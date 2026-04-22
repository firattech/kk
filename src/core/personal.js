let status = false

function init(){
    if(window.localStorage.getItem('source') == 'makra') return

    $.ajax({
        url: "./personal.lampa",
        dataType: 'text',
        success: ()=>{
            status = true
        }
    })
}

function confirm(){
    return status
}

export default {
    init,
    confirm
}
