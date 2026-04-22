(function () {
    'use strict';

    function init() {
      $('body').append("\n        <style>\n        .full-start-new__title{-webkit-line-clamp:2;line-clamp:2}.full-descr__text{width:100%}\n        </style>\n    ");
    }
    if (window.appready) init();else {
      Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') init();
      });
    }

})();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdvbGluZXMuanMiLCJzb3VyY2VzIjpbInR3b2xpbmVzL3R3b2xpbmVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGluaXQoKXtcbiAgICAkKCdib2R5JykuYXBwZW5kKGBcbiAgICAgICAgPHN0eWxlPlxuICAgICAgICBAQGluY2x1ZGUoJy4uL3BsdWdpbnMvdHdvbGluZXMvY3NzL3N0eWxlLmNzcycpXG4gICAgICAgIDwvc3R5bGU+XG4gICAgYClcbn1cblxuaWYod2luZG93LmFwcHJlYWR5KSBpbml0KClcbmVsc2V7XG4gICAgTGFtcGEuTGlzdGVuZXIuZm9sbG93KCdhcHAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS50eXBlID09ICdyZWFkeScpIGluaXQoKVxuICAgIH0pXG59Il0sIm5hbWVzIjpbImluaXQiLCIkIiwiYXBwZW5kIiwid2luZG93IiwiYXBwcmVhZHkiLCJMYW1wYSIsIkxpc3RlbmVyIiwiZm9sbG93IiwiZSIsInR5cGUiXSwibWFwcGluZ3MiOiI7OztJQUFBLFNBQVNBLElBQUlBLEdBQUU7TUFDWEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDQyxNQUFNLG9HQUlmLENBQUM7SUFDTjtJQUVBLElBQUdDLE1BQU0sQ0FBQ0MsUUFBUSxFQUFFSixJQUFJLEVBQUUsTUFDdEI7TUFDQUssS0FBSyxDQUFDQyxRQUFRLENBQUNDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBVUMsQ0FBQyxFQUFFO1FBQ3RDLElBQUlBLENBQUMsQ0FBQ0MsSUFBSSxJQUFJLE9BQU8sRUFBRVQsSUFBSSxFQUFFO09BQ2hDLENBQUM7SUFDTjs7Ozs7OyJ9