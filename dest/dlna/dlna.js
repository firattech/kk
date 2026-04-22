(function () {
    'use strict';

    function Component(object) {
      var html = Lampa.Template.js('client_dlna_main'),
        head = html.find('.client-dlna-main__head'),
        body = html.find('.client-dlna-main__body');
      var listener_id, deviceFinder, scroll, tree;
      this.create = function () {
        this.activity.loader(true);
        if (window.serviceProvider) {
          scroll = new Lampa.Scroll({
            mask: true,
            over: true
          });
          scroll.minus(head);
          body.append(scroll.render(true));
          try {
            deviceFinder = serviceProvider.getDeviceFinder();
            listener_id = deviceFinder.addDeviceDiscoveryListener({
              ondeviceadded: this.drawDevices.bind(this),
              ondeviceremoved: this.drawDevices.bind(this)
            });
          } catch (e) {
            console.log('DLNA', 'getDeviceFinder error: ', e.message);
          }
          this.drawDevices();
        } else {
          var empty = new Lampa.Empty({
            descr: Lampa.Lang.translate('client_dlna_nosuport')
          });
          html.empty();
          html.append(empty.render(true));
          this.start = empty.start.bind(empty);
        }
        this.activity.loader(false);
      };
      this.drawDevices = function () {
        var _this = this;
        var devices = [];
        try {
          devices = deviceFinder.getDeviceList("MEDIAPROVIDER");
        } catch (e) {
          console.log('DLNA', 'getDeviceList error: ', e.message);
        }
        scroll.clear();
        scroll.reset();
        if (devices.length) {
          devices.forEach(function (element) {
            var item = Lampa.Template.js('client_dlna_device');
            item.find('.client-dlna-device__name').text(element.name);
            item.find('.client-dlna-device__ip').text(element.ipAddress);
            item.on('hover:enter', function () {
              tree = {
                device: element,
                tree: [element.rootFolder]
              };
              _this.displayFolder();
            });
            item.on('hover:focus', function () {
              scroll.update(item);
            });
            scroll.append(item);
          });
        } else {
          this.drawLoading(Lampa.Lang.translate('client_dlna_search_device'));
        }
        this.drawHead();
        this.activity.toggle();
      };
      this.drawLoading = function (text) {
        scroll.clear();
        scroll.reset();
        Lampa.Controller.clear();
        var load = Lampa.Template.js('client_dlna_loading');
        load.find('.client-dlna-loading__title').text(text);
        scroll.append(load);
      };
      this.drawFolder = function (elems) {
        var _this2 = this;
        scroll.clear();
        scroll.reset();
        var folders = elems.filter(function (a) {
          return a.itemType == 'FOLDER';
        });
        var files = elems.filter(function (a) {
          return a.itemType == 'VIDEO';
        });
        folders.forEach(function (element) {
          var item = Lampa.Template.js('client_dlna_folder');
          item.find('.client-dlna-device__name').text(element.title);
          item.on('hover:enter', function () {
            tree.tree.push(element);
            _this2.displayFolder();
          });
          item.on('hover:focus', function () {
            scroll.update(item);
          });
          scroll.append(item);
        });
        if (files.length) {
          var spl = document.createElement('div');
          spl.addClass('client-dlna-main__split');
          spl.text(Lampa.Lang.translate('title_files'));
          scroll.append(spl);
          files.forEach(function (element) {
            var item = Lampa.Template.js('client_dlna_file');
            item.find('.client-dlna-file__name').text(element.title);
            item.find('.client-dlna-file__size').text(Lampa.Utils.bytesToSize(element.fileSize));
            item.on('hover:enter', function () {
              var video = {
                title: element.title,
                url: element.itemUri
              };
              Lampa.Player.play(video);
              Lampa.Player.playlist([video]);
            });
            item.on('hover:focus', function () {
              scroll.update(item);
            });
            scroll.append(item);
          });
        }
        this.drawHead();
        this.activity.toggle();
      };
      this.drawHead = function () {
        head.empty();
        var nav = [];
        if (tree) {
          var device_item = document.createElement('div');
          device_item.addClass('client-dlna-head__device');
          var icon = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 128 128\" xml:space=\"preserve\">\n                <path d=\"M111.7 57.1V22.2c0-1.1-.5-2.3-1.4-2.9h-.1c-.6-.4-1.2-.6-2-.6H30.9c-2 0-3.5 1.5-3.5 3.5v31.9h34.9c2.8 0 5.1 2.4 5.1 5.2v15.5h27.5V61.4c0-2.4 1.9-4.2 4.2-4.2h12.6z\" fill=\"currentColor\"></path>\n                <path d=\"M96.8 67.6H128v33.2H96.8zM67.3 86.1h27.5v-9.2H67.3zM65.1 59.3c0-1.8-1.3-3.1-3-3.1h-56c-1.7 0-3 1.4-3 3.1v41.9h62zM0 106.1c0 1.7 1.3 3.1 3.1 3.1h62.2c1.7 0 3.1-1.3 3.1-3.1v-2.9H0zM125.8 59.3H99c-1.2 0-2.2.9-2.2 2.2v4.1H128v-4.1c0-1.3-.9-2.2-2.2-2.2zm-9.4 4.1h-7.9c-.6 0-1-.4-1-1s.4-1 1-1h7.9c.6 0 1 .4 1 1 .1.6-.3 1-1 1zm3.8 0h-.4c-.6 0-1-.4-1-1s.4-1 1-1h.4c.6 0 1 .4 1 1s-.4 1-1 1zM96.8 107.1c0 1.2.9 2.2 2.2 2.2h26.8c1.2 0 2.2-1 2.2-2.2V103H96.8zm11.6-2h7.9c.6 0 1 .4 1 1s-.4 1-1 1h-7.9c-.6 0-1-.4-1-1s.4-1 1-1zM81.7 93.7H78v-5.6H67.3v7.6h14.3c.6 0 1-.4 1-1 .1-.6-.3-1-.9-1z\" fill=\"currentColor\"></path>\n            </svg>";
          icon += '<span>' + tree.device.name + '</span>';
          device_item.html(icon);
          nav.push(device_item);
          tree.tree.forEach(function (folder) {
            if (folder.isRootFolder) return;
            var folder_item = document.createElement('div');
            folder_item.text(folder.title);
            folder_item.addClass('client-dlna-head__folder');
            nav.push(folder_item);
          });
        } else {
          var empty_item = document.createElement('div');
          empty_item.addClass('client-dlna-head__device');
          var _icon = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 128 128\" xml:space=\"preserve\">\n                <path d=\"M111.7 57.1V22.2c0-1.1-.5-2.3-1.4-2.9h-.1c-.6-.4-1.2-.6-2-.6H30.9c-2 0-3.5 1.5-3.5 3.5v31.9h34.9c2.8 0 5.1 2.4 5.1 5.2v15.5h27.5V61.4c0-2.4 1.9-4.2 4.2-4.2h12.6z\" fill=\"currentColor\"></path>\n                <path d=\"M96.8 67.6H128v33.2H96.8zM67.3 86.1h27.5v-9.2H67.3zM65.1 59.3c0-1.8-1.3-3.1-3-3.1h-56c-1.7 0-3 1.4-3 3.1v41.9h62zM0 106.1c0 1.7 1.3 3.1 3.1 3.1h62.2c1.7 0 3.1-1.3 3.1-3.1v-2.9H0zM125.8 59.3H99c-1.2 0-2.2.9-2.2 2.2v4.1H128v-4.1c0-1.3-.9-2.2-2.2-2.2zm-9.4 4.1h-7.9c-.6 0-1-.4-1-1s.4-1 1-1h7.9c.6 0 1 .4 1 1 .1.6-.3 1-1 1zm3.8 0h-.4c-.6 0-1-.4-1-1s.4-1 1-1h.4c.6 0 1 .4 1 1s-.4 1-1 1zM96.8 107.1c0 1.2.9 2.2 2.2 2.2h26.8c1.2 0 2.2-1 2.2-2.2V103H96.8zm11.6-2h7.9c.6 0 1 .4 1 1s-.4 1-1 1h-7.9c-.6 0-1-.4-1-1s.4-1 1-1zM81.7 93.7H78v-5.6H67.3v7.6h14.3c.6 0 1-.4 1-1 .1-.6-.3-1-.9-1z\" fill=\"currentColor\"></path>\n            </svg>";
          _icon += '<span>' + Lampa.Lang.translate('client_dlna_all_device') + '</span>';
          empty_item.html(_icon);
          nav.push(empty_item);
        }
        for (var i = 0; i < nav.length; i++) {
          if (i > 0) {
            var spl = document.createElement('div');
            spl.addClass('client-dlna-head__split');
            head.append(spl);
          }
          head.append(nav[i]);
        }
      };
      this.displayFolder = function () {
        var _this3 = this;
        var device = tree.device;
        var folder = tree.tree[tree.tree.length - 1];
        this.drawLoading(Lampa.Lang.translate('loading'));
        device.browse(folder, 0, 10, this.drawFolder.bind(this), function () {
          Lampa.Noty.show(Lampa.Lang.translate('torrent_parser_empty'));
          tree.tree.pop();
          _this3.displayFolder();
        });
      };
      this.back = function () {
        if (tree) {
          if (tree.tree.length > 1) {
            tree.tree.pop();
            this.displayFolder();
          } else {
            tree = false;
            this.drawDevices();
          }
        } else {
          Lampa.Activity.backward();
        }
      };
      this.background = function () {
        Lampa.Background.immediately('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAZCAYAAABD2GxlAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHASURBVHgBlZaLrsMgDENXxAf3/9XHFdXNZLm2YZHQymPk4CS0277v9+ffrut62nEcn/M8nzb69cxj6le1+75f/RqrZ9fatm3F9wwMR7yhawilNke4Gis/7j9srQbdaVFBnkcQ1WrfgmIIBcTrvgqqsKiTzvpOQbUnAykVW4VVqZXyyDllYFSKx9QaVrO7nGJIB63g+FAq/xhcHWBYdwCsmAtvFZUKE0MlVZWCT4idOlyhTp3K35R/6Nzlq0uBnsKWlEzgSh1VGJxv6rmpXMO7EK+XWUPnDFRWqitQFeY2UyZVryuWlI8ulLgGf19FooAUwC9gCWLcwzWPb7Wa60qdlZxjx6ooUuUqVQsK+y1VoAJyBeJAVsLJeYmg/RIXdG2kPhwYPBUQQyYF0XC8lwP3MTCrYAXB88556peCbUUZV7WccwkUQfCZC4PXdA5hKhSVhythZqjZM0J39w5m8BRadKAcrsIpNZsLIYdOqcZ9hExhZ1MH+QL+ciFzXzmYhZr/M6yUUwp2dp5U4naZDwAF5JRSefdScJZ3SkU0nl8xpaAy+7ml1EqvMXSs1HRrZ9bc3eZUSXmGa/mdyjbmqyX7A9RaYQa9IRJ0AAAAAElFTkSuQmCC');
      };
      this.start = function () {
        if (Lampa.Activity.active() && Lampa.Activity.active().activity !== this.activity) return;
        this.background();
        Lampa.Controller.add('content', {
          invisible: true,
          toggle: function toggle() {
            Lampa.Controller.collectionSet(html);
            Lampa.Controller.collectionFocus(false, html);
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Lampa.Controller.toggle('menu');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
          },
          right: function right() {
            Navigator.move('right');
          },
          down: function down() {
            Navigator.move('down');
          },
          back: this.back.bind(this)
        });
        Lampa.Controller.toggle('content');
      };
      this.pause = function () {};
      this.stop = function () {};
      this.render = function () {
        return html;
      };
      this.destroy = function () {
        if (deviceFinder) deviceFinder.removeDeviceDiscoveryListener(listener_id);
        if (scroll) scroll.destroy();
        html.remove();
      };
    }

    // window.webapis = {
    //     allshare: {
    //         serviceconnector: {
    //             createServiceProvider: function(good, err){
    //                 good()
    //             },
    //             getServiceProvider: function(){
    //                 return window.webapis.allshare.serviceconnector
    //             },
    //             getDeviceFinder: function(){
    //                 return {
    //                     getDeviceList: function(){
    //                         return [{
    //                             browse: (where, index, max, call)=>{
    //                                 let root = [{
    //                                     contentBuildType: "PROVIDER",
    //                                     date: "2023-06-14",
    //                                     duration: 0,
    //                                     extension: "avi",
    //                                     fileSize: 781084672,
    //                                     height: 0,
    //                                     isRootFolder: false,
    //                                     itemType: "FOLDER",
    //                                     title: "Следствие ведут знатоки (малые рипы)/Следствие ведут знатоки фильм 01 Черный маклер 745"
    //                                 }]

    //                                 let folder = [{
    //                                     contentBuildType: "PROVIDER",
    //                                     date: "2023-06-14",
    //                                     duration: 0,
    //                                     extension: "avi",
    //                                     fileSize: 781084672,
    //                                     height: 0,
    //                                     isRootFolder: false,
    //                                     itemType: "FOLDER",
    //                                     title: "Moviews"
    //                                 },
    //                                 {
    //                                     contentBuildType: "PROVIDER",
    //                                     date: "2023-06-14",
    //                                     duration: 0,
    //                                     extension: "avi",
    //                                     fileSize: 781084672,
    //                                     height: 0,
    //                                     isRootFolder: false,
    //                                     itemType: "FOLDER",
    //                                     title: "Moviews"
    //                                 },
    //                                 {
    //                                     contentBuildType: "PROVIDER",
    //                                     date: "2023-06-14",
    //                                     duration: 0,
    //                                     extension: "avi",
    //                                     fileSize: 781084672,
    //                                     height: 0,
    //                                     isRootFolder: false,
    //                                     itemType: "VIDEO",
    //                                     title: "Super_Mario_Brosers.avi"
    //                                 },{
    //                                     contentBuildType: "PROVIDER",
    //                                     date: "2023-06-14",
    //                                     duration: 0,
    //                                     extension: "avi",
    //                                     fileSize: 781084672,
    //                                     height: 0,
    //                                     isRootFolder: false,
    //                                     itemType: "VIDEO",
    //                                     title: "Super_Mario_Brosers.avi"
    //                                 },{
    //                                     contentBuildType: "PROVIDER",
    //                                     date: "2023-06-14",
    //                                     duration: 0,
    //                                     extension: "avi",
    //                                     fileSize: 781084672,
    //                                     height: 0,
    //                                     isRootFolder: false,
    //                                     itemType: "VIDEO",
    //                                     title: "Super_Mario_Brosers.avi"
    //                                 },{
    //                                     contentBuildType: "PROVIDER",
    //                                     date: "2023-06-14",
    //                                     duration: 0,
    //                                     extension: "avi",
    //                                     fileSize: 781084672,
    //                                     height: 0,
    //                                     isRootFolder: false,
    //                                     itemType: "VIDEO",
    //                                     title: "Super_Mario_Brosers.avi"
    //                                 },{
    //                                     contentBuildType: "PROVIDER",
    //                                     date: "2023-06-14",
    //                                     duration: 0,
    //                                     extension: "avi",
    //                                     fileSize: 781084672,
    //                                     height: 0,
    //                                     isRootFolder: false,
    //                                     itemType: "VIDEO",
    //                                     title: "Super_Mario_Brosers.avi"
    //                                 }]

    //                                 call(where.isRootFolder ? root : folder)
    //                             },
    //                             deviceDomain: "LOCAL_NETWORK",
    //                             deviceType: "MEDIAPROVIDER",
    //                             iconArray: [],
    //                             id: "uuid:cb14b8a3-c25f-e43b-596b-49b4643ff223+wlan0",
    //                             ipAddress: "192.168.0.103",
    //                             isSearchable: true,
    //                             modelName: "dms 1.4",
    //                             name: "Tor",
    //                             nic: "192.168.0.102",
    //                             rootFolder: {
    //                                 isRootFolder: true,
    //                                 title: 'Root',
    //                             },
    //                             search: ()=>{},
    //                             subtype: ""
    //                         }]
    //                     },
    //                     addDeviceDiscoveryListener: function(){
    //                         return 23334
    //                     },
    //                     removeDeviceDiscoveryListener: function(){

    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    function startPlugin() {
      window.plugin_client_dnla = true;
      Lampa.Lang.add({
        client_dlna_search_device: {
          ru: 'Поиск устройств',
          en: 'Device search',
          uk: 'Пошук пристроїв',
          be: 'Пошук прылад',
          zh: '设备搜索',
          pt: 'Pesquisa de dispositivos'
        },
        client_dlna_nosuport: {
          ru: 'Ваш виджет не поддерживается, обновите виджет на новую версию',
          en: 'Your widget is not supported, update the widget to a newer version',
          uk: 'Віджет не підтримується, оновіть віджет на нову версію',
          be: 'Ваш віджэт не падтрымліваецца, абнавіце віджэт на новую версію',
          zh: '不支持您的小部件，请将小部件更新到较新版本',
          pt: 'Seu widget não é compatível, atualize o widget para uma versão mais recente'
        },
        client_dlna_all_device: {
          ru: 'Все устройства',
          en: 'All devices',
          uk: 'Усі пристрої',
          be: 'Усе прылады',
          zh: '所有设备',
          pt: 'Todos os dispositivos'
        }
      });
      var manifest = {
        type: 'plugin',
        version: '1.1.1',
        name: 'DLNA',
        description: '',
        component: 'client_dnla'
      };
      Lampa.Manifest.plugins = manifest;
      Lampa.Template.add('client_dlna_main', "\n        <div class=\"client-dlna-main\">\n            <div class=\"client-dlna-main__head client-dlna-head\"></div>\n            <div class=\"client-dlna-main__body\"></div>\n        </div>\n    ");
      Lampa.Template.add('client_dlna_loading', "\n        <div class=\"client-dlna-loading\">\n            <div class=\"client-dlna-loading__title\"></div>\n            <div class=\"client-dlna-loading__loader\">\n                <div class=\"broadcast__scan\"><div></div></div>\n            </div>\n        </div>\n    ");
      Lampa.Template.add('client_dlna_device', "\n        <div class=\"client-dlna-device selector\">\n            <div class=\"client-dlna-device__body\">\n                <div class=\"client-dlna-device__icon\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 128 128\" xml:space=\"preserve\">\n                        <path d=\"M111.7 57.1V22.2c0-1.1-.5-2.3-1.4-2.9h-.1c-.6-.4-1.2-.6-2-.6H30.9c-2 0-3.5 1.5-3.5 3.5v31.9h34.9c2.8 0 5.1 2.4 5.1 5.2v15.5h27.5V61.4c0-2.4 1.9-4.2 4.2-4.2h12.6z\" fill=\"currentColor\"></path>\n                        <path d=\"M96.8 67.6H128v33.2H96.8zM67.3 86.1h27.5v-9.2H67.3zM65.1 59.3c0-1.8-1.3-3.1-3-3.1h-56c-1.7 0-3 1.4-3 3.1v41.9h62zM0 106.1c0 1.7 1.3 3.1 3.1 3.1h62.2c1.7 0 3.1-1.3 3.1-3.1v-2.9H0zM125.8 59.3H99c-1.2 0-2.2.9-2.2 2.2v4.1H128v-4.1c0-1.3-.9-2.2-2.2-2.2zm-9.4 4.1h-7.9c-.6 0-1-.4-1-1s.4-1 1-1h7.9c.6 0 1 .4 1 1 .1.6-.3 1-1 1zm3.8 0h-.4c-.6 0-1-.4-1-1s.4-1 1-1h.4c.6 0 1 .4 1 1s-.4 1-1 1zM96.8 107.1c0 1.2.9 2.2 2.2 2.2h26.8c1.2 0 2.2-1 2.2-2.2V103H96.8zm11.6-2h7.9c.6 0 1 .4 1 1s-.4 1-1 1h-7.9c-.6 0-1-.4-1-1s.4-1 1-1zM81.7 93.7H78v-5.6H67.3v7.6h14.3c.6 0 1-.4 1-1 .1-.6-.3-1-.9-1z\" fill=\"currentColor\"></path>\n                    </svg>\n                </div>\n                <div class=\"client-dlna-device__name\"></div>\n                <div class=\"client-dlna-device__ip\"></div>\n            </div>\n        </div>\n    ");
      Lampa.Template.add('client_dlna_folder', "\n        <div class=\"client-dlna-device selector\">\n            <div class=\"client-dlna-device__body\">\n                <div class=\"client-dlna-device__icon\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 408 408\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\">\n                        <path d=\"M372 88.661H206.32l-33-39.24a5.001 5.001 0 0 0-4-1.8H36c-19.956.198-36.023 16.443-36 36.4v240c-.001 19.941 16.06 36.163 36 36.36h336c19.94-.197 36.001-16.419 36-36.36v-199c.001-19.941-16.06-36.162-36-36.36z\" fill=\"currentColor\"></path>\n                    </svg>\n                </div>\n                <div class=\"client-dlna-device__name\"></div>\n            </div>\n        </div>\n    ");
      Lampa.Template.add('client_dlna_file', "\n        <div class=\"client-dlna-file selector\">\n            <div class=\"client-dlna-file__body\">\n                <div class=\"client-dlna-file__icon\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 477.867 477.867\" xml:space=\"preserve\">\n                        <path d=\"M238.933 0C106.974 0 0 106.974 0 238.933s106.974 238.933 238.933 238.933 238.933-106.974 238.933-238.933C477.726 107.033 370.834.141 238.933 0zm100.624 246.546a17.068 17.068 0 0 1-7.662 7.662v.085L195.362 322.56c-8.432 4.213-18.682.794-22.896-7.638a17.061 17.061 0 0 1-1.8-7.722V170.667c-.004-9.426 7.633-17.07 17.059-17.075a17.068 17.068 0 0 1 7.637 1.8l136.533 68.267c8.436 4.204 11.867 14.451 7.662 22.887z\" fill=\"currentColor\"></path>\n                    </svg>\n                </div>\n                <div class=\"client-dlna-file__name\"></div>\n                <div class=\"client-dlna-file__size\"></div>\n            </div>\n        </div>\n    ");
      Lampa.Template.add(manifest.component + '_style', "\n        <style>\n        .client-dlna-main__wrap::after{content:'';display:block;clear:both}.client-dlna-main__split{clear:both;padding:1.2em;font-size:1.4em}.client-dlna-head{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;line-height:1.4;font-size:1.2em;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;min-height:4.1em;padding:.7em;padding-bottom:0}.client-dlna-head>*{margin:.5em;-webkit-border-radius:.3em;border-radius:.3em;padding:.4em 1em;-o-text-overflow:ellipsis;text-overflow:ellipsis;max-width:20em;overflow:hidden;white-space:nowrap;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.client-dlna-head__device{background-color:#404040;font-weight:600;margin-right:1.4em}.client-dlna-head__device>svg{width:1.5em !important;height:1.5em !important;margin-right:1em;vertical-align:middle;opacity:.5}.client-dlna-head__split{padding:0;margin:0;overflow:inherit}.client-dlna-head__split::before{content:'';display:block;width:.3em;height:.3em;border-right:.2em solid #fff;border-bottom:.2em solid #fff;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);opacity:.5;margin-top:.15em}.client-dlna-device{float:left;width:33.3%;padding:1.5em;line-height:1.4}.client-dlna-device__body{background-color:#404040;-webkit-border-radius:1em;border-radius:1em;padding:1.5em;position:relative;min-height:12.5em}.client-dlna-device__name{font-weight:600;font-size:1.4em;margin-bottom:.4em;overflow:hidden;-o-text-overflow:'.';text-overflow:'.';display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical}.client-dlna-device__ip{opacity:.5}.client-dlna-device__icon{opacity:.5;margin-bottom:1em}.client-dlna-device__icon svg{width:4em !important;height:4em !important}.client-dlna-device.focus .client-dlna-device__body::after,.client-dlna-device.hover .client-dlna-device__body::after{content:'';position:absolute;top:-0.5em;left:-0.5em;right:-0.5em;bottom:-0.5em;border:.3em solid #fff;-webkit-border-radius:1.4em;border-radius:1.4em;z-index:-1;pointer-events:none}.client-dlna-loading{margin:0 auto;padding:1.5em;text-align:center}.client-dlna-loading__title{font-size:1.4em;margin-bottom:2em}.client-dlna-file{padding:1.5em;line-height:1.4;padding-bottom:0}.client-dlna-file__body{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;background-color:#404040;-webkit-border-radius:1em;border-radius:1em;padding:1.5em;position:relative}.client-dlna-file__icon{opacity:.5;margin-right:2em}.client-dlna-file__icon svg{width:3em !important;height:3em !important}.client-dlna-file__name{font-weight:600;font-size:1.4em;overflow:hidden;-o-text-overflow:'.';text-overflow:'.';display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical}.client-dlna-file__size{padding-left:2em;margin-left:auto}.client-dlna-file.focus .client-dlna-file__body::after,.client-dlna-file.hover .client-dlna-file__body::after{content:'';position:absolute;top:-0.5em;left:-0.5em;right:-0.5em;bottom:-0.5em;border:.3em solid #fff;-webkit-border-radius:1.4em;border-radius:1.4em;z-index:-1;pointer-events:none}\n        </style>\n    ");
      try {
        webapis.allshare.serviceconnector.createServiceProvider(function () {
          console.log('DLNA', 'connected');
          window.serviceProvider = webapis.allshare.serviceconnector.getServiceProvider();
        }, function (e) {
          console.log('DLNA', 'connect error:', e.message);
        });
      } catch (e) {}
      function add() {
        //if(!Lampa.Platform.is('tizen')) return

        var button = $("<li class=\"menu__item selector\">\n            <div class=\"menu__ico\">\n                <svg viewBox=\"0 0 512 512\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill=\"currentColor\" d=\"M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.833 256-256S397.167 0 256 0Zm0 472.341c-119.275 0-216.341-97.066-216.341-216.341S136.725 39.659 256 39.659c119.295 0 216.341 97.066 216.341 216.341S375.275 472.341 256 472.341z\"/>\n                    <circle cx=\"160\" cy=\"250\" r=\"60\" fill=\"currentColor\"/>\n                    <circle cx=\"320\" cy=\"150\" r=\"60\" fill=\"currentColor\"/>\n                    <circle cx=\"320\" cy=\"350\" r=\"60\" fill=\"currentColor\"/>\n                    <path fill=\"currentColor\" d=\"M35 135h270v30H35zm175.782 100h270v30h-270zM35 335h270v30H35z\"/>\n                </svg>\n            </div>\n            <div class=\"menu__text\">".concat(manifest.name, "</div>\n        </li>"));
        button.on('hover:enter', function () {
          Lampa.Activity.push({
            url: '',
            title: manifest.name,
            component: manifest.component,
            page: 1
          });
        });
        $('.menu .menu__list').eq(0).append(button);
        $('body').append(Lampa.Template.get(manifest.component + '_style', {}, true));
      }
      Lampa.Component.add(manifest.component, Component);
      if (window.appready) add();else {
        Lampa.Listener.follow('app', function (e) {
          if (e.type == 'ready') add();
        });
      }
    }
    if (!window.plugin_client_dnla) startPlugin();

})();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGxuYS5qcyIsInNvdXJjZXMiOlsiZGxuYS9jb21wb25lbnQuanMiLCJkbG5hL2RsbmEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gQ29tcG9uZW50KG9iamVjdCl7XG4gICAgbGV0IGh0bWwgPSBMYW1wYS5UZW1wbGF0ZS5qcygnY2xpZW50X2RsbmFfbWFpbicpLFxuICAgICAgICBoZWFkID0gaHRtbC5maW5kKCcuY2xpZW50LWRsbmEtbWFpbl9faGVhZCcpLFxuICAgICAgICBib2R5ID0gaHRtbC5maW5kKCcuY2xpZW50LWRsbmEtbWFpbl9fYm9keScpXG5cbiAgICBsZXQgbGlzdGVuZXJfaWQsIGRldmljZUZpbmRlciwgc2Nyb2xsLCB0cmVlXG5cbiAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuYWN0aXZpdHkubG9hZGVyKHRydWUpXG5cbiAgICAgICAgaWYod2luZG93LnNlcnZpY2VQcm92aWRlcil7XG4gICAgICAgICAgICBzY3JvbGwgPSBuZXcgTGFtcGEuU2Nyb2xsKHttYXNrOiB0cnVlLCBvdmVyOiB0cnVlfSlcblxuICAgICAgICAgICAgc2Nyb2xsLm1pbnVzKGhlYWQpXG5cbiAgICAgICAgICAgIGJvZHkuYXBwZW5kKHNjcm9sbC5yZW5kZXIodHJ1ZSkpXG5cbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICBkZXZpY2VGaW5kZXIgPSBzZXJ2aWNlUHJvdmlkZXIuZ2V0RGV2aWNlRmluZGVyKClcblxuICAgICAgICAgICAgICAgIGxpc3RlbmVyX2lkID0gZGV2aWNlRmluZGVyLmFkZERldmljZURpc2NvdmVyeUxpc3RlbmVyKHtcbiAgICAgICAgICAgICAgICAgICAgb25kZXZpY2VhZGRlZDogdGhpcy5kcmF3RGV2aWNlcy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICBvbmRldmljZXJlbW92ZWQ6IHRoaXMuZHJhd0RldmljZXMuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaChlKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRExOQScsICdnZXREZXZpY2VGaW5kZXIgZXJyb3I6ICcsIGUubWVzc2FnZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5kcmF3RGV2aWNlcygpXG4gICAgICAgIH0gXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBsZXQgZW1wdHkgPSBuZXcgTGFtcGEuRW1wdHkoe1xuICAgICAgICAgICAgICAgIGRlc2NyOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnY2xpZW50X2RsbmFfbm9zdXBvcnQnKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaHRtbC5lbXB0eSgpXG5cbiAgICAgICAgICAgIGh0bWwuYXBwZW5kKGVtcHR5LnJlbmRlcih0cnVlKSlcblxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IGVtcHR5LnN0YXJ0LmJpbmQoZW1wdHkpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFjdGl2aXR5LmxvYWRlcihmYWxzZSlcbiAgICB9XG5cbiAgICB0aGlzLmRyYXdEZXZpY2VzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0IGRldmljZXMgPSBbXVxuICAgICAgICBcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgZGV2aWNlcyA9IGRldmljZUZpbmRlci5nZXREZXZpY2VMaXN0KFwiTUVESUFQUk9WSURFUlwiKVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoKGUpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0RMTkEnLCAnZ2V0RGV2aWNlTGlzdCBlcnJvcjogJywgZS5tZXNzYWdlKVxuICAgICAgICB9XG5cbiAgICAgICAgc2Nyb2xsLmNsZWFyKClcbiAgICAgICAgc2Nyb2xsLnJlc2V0KClcbiAgICBcbiAgICAgICAgaWYoZGV2aWNlcy5sZW5ndGgpe1xuICAgICAgICAgICAgZGV2aWNlcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gTGFtcGEuVGVtcGxhdGUuanMoJ2NsaWVudF9kbG5hX2RldmljZScpXG5cbiAgICAgICAgICAgICAgICBpdGVtLmZpbmQoJy5jbGllbnQtZGxuYS1kZXZpY2VfX25hbWUnKS50ZXh0KGVsZW1lbnQubmFtZSlcbiAgICAgICAgICAgICAgICBpdGVtLmZpbmQoJy5jbGllbnQtZGxuYS1kZXZpY2VfX2lwJykudGV4dChlbGVtZW50LmlwQWRkcmVzcylcblxuICAgICAgICAgICAgICAgIGl0ZW0ub24oJ2hvdmVyOmVudGVyJywoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0cmVlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGV2aWNlOiBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZTogW2VsZW1lbnQucm9vdEZvbGRlcl1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUZvbGRlcigpXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIGl0ZW0ub24oJ2hvdmVyOmZvY3VzJywoKT0+e1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGwudXBkYXRlKGl0ZW0pXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHNjcm9sbC5hcHBlbmQoaXRlbSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuZHJhd0xvYWRpbmcoTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2NsaWVudF9kbG5hX3NlYXJjaF9kZXZpY2UnKSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhd0hlYWQoKVxuXG4gICAgICAgIHRoaXMuYWN0aXZpdHkudG9nZ2xlKClcbiAgICB9XG5cbiAgICB0aGlzLmRyYXdMb2FkaW5nID0gZnVuY3Rpb24odGV4dCl7XG4gICAgICAgIHNjcm9sbC5jbGVhcigpXG4gICAgICAgIHNjcm9sbC5yZXNldCgpXG5cbiAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jbGVhcigpXG5cbiAgICAgICAgbGV0IGxvYWQgPSBMYW1wYS5UZW1wbGF0ZS5qcygnY2xpZW50X2RsbmFfbG9hZGluZycpXG4gICAgICAgICAgICBsb2FkLmZpbmQoJy5jbGllbnQtZGxuYS1sb2FkaW5nX190aXRsZScpLnRleHQodGV4dClcblxuICAgICAgICBzY3JvbGwuYXBwZW5kKGxvYWQpXG4gICAgfVxuXG4gICAgdGhpcy5kcmF3Rm9sZGVyID0gZnVuY3Rpb24oZWxlbXMpe1xuICAgICAgICBzY3JvbGwuY2xlYXIoKVxuICAgICAgICBzY3JvbGwucmVzZXQoKVxuXG4gICAgICAgIGxldCBmb2xkZXJzID0gZWxlbXMuZmlsdGVyKGE9PmEuaXRlbVR5cGUgPT0gJ0ZPTERFUicpXG4gICAgICAgIGxldCBmaWxlcyAgID0gZWxlbXMuZmlsdGVyKGE9PmEuaXRlbVR5cGUgPT0gJ1ZJREVPJylcblxuICAgICAgICBmb2xkZXJzLmZvckVhY2goZWxlbWVudD0+e1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBMYW1wYS5UZW1wbGF0ZS5qcygnY2xpZW50X2RsbmFfZm9sZGVyJylcblxuICAgICAgICAgICAgaXRlbS5maW5kKCcuY2xpZW50LWRsbmEtZGV2aWNlX19uYW1lJykudGV4dChlbGVtZW50LnRpdGxlKVxuXG4gICAgICAgICAgICBpdGVtLm9uKCdob3ZlcjplbnRlcicsKCk9PntcbiAgICAgICAgICAgICAgICB0cmVlLnRyZWUucHVzaChlbGVtZW50KVxuXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5Rm9sZGVyKClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGl0ZW0ub24oJ2hvdmVyOmZvY3VzJywoKT0+e1xuICAgICAgICAgICAgICAgIHNjcm9sbC51cGRhdGUoaXRlbSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHNjcm9sbC5hcHBlbmQoaXRlbSlcbiAgICAgICAgfSlcblxuICAgICAgICBpZihmaWxlcy5sZW5ndGgpe1xuICAgICAgICAgICAgbGV0IHNwbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICAgICAgc3BsLmFkZENsYXNzKCdjbGllbnQtZGxuYS1tYWluX19zcGxpdCcpXG4gICAgICAgICAgICAgICAgc3BsLnRleHQoTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RpdGxlX2ZpbGVzJykpXG5cbiAgICAgICAgICAgIHNjcm9sbC5hcHBlbmQoc3BsKVxuXG4gICAgICAgICAgICBmaWxlcy5mb3JFYWNoKGVsZW1lbnQ9PntcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IExhbXBhLlRlbXBsYXRlLmpzKCdjbGllbnRfZGxuYV9maWxlJylcbiAgICBcbiAgICAgICAgICAgICAgICBpdGVtLmZpbmQoJy5jbGllbnQtZGxuYS1maWxlX19uYW1lJykudGV4dChlbGVtZW50LnRpdGxlKVxuICAgICAgICAgICAgICAgIGl0ZW0uZmluZCgnLmNsaWVudC1kbG5hLWZpbGVfX3NpemUnKS50ZXh0KExhbXBhLlV0aWxzLmJ5dGVzVG9TaXplKGVsZW1lbnQuZmlsZVNpemUpKVxuICAgIFxuICAgICAgICAgICAgICAgIGl0ZW0ub24oJ2hvdmVyOmVudGVyJywoKT0+e1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmlkZW8gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZWxlbWVudC50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogZWxlbWVudC5pdGVtVXJpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBMYW1wYS5QbGF5ZXIucGxheSh2aWRlbylcbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuUGxheWVyLnBsYXlsaXN0KFt2aWRlb10pXG4gICAgICAgICAgICAgICAgfSlcbiAgICBcbiAgICAgICAgICAgICAgICBpdGVtLm9uKCdob3Zlcjpmb2N1cycsKCk9PntcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsLnVwZGF0ZShpdGVtKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgXG4gICAgICAgICAgICAgICAgc2Nyb2xsLmFwcGVuZChpdGVtKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhd0hlYWQoKVxuXG4gICAgICAgIHRoaXMuYWN0aXZpdHkudG9nZ2xlKClcbiAgICB9XG5cbiAgICB0aGlzLmRyYXdIZWFkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaGVhZC5lbXB0eSgpXG5cbiAgICAgICAgbGV0IG5hdiA9IFtdXG5cbiAgICAgICAgaWYodHJlZSl7XG4gICAgICAgICAgICBsZXQgZGV2aWNlX2l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgICAgIGRldmljZV9pdGVtLmFkZENsYXNzKCdjbGllbnQtZGxuYS1oZWFkX19kZXZpY2UnKVxuXG4gICAgICAgICAgICBsZXQgaWNvbiA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2ZXJzaW9uPVwiMS4xXCIgdmlld0JveD1cIjAgMCAxMjggMTI4XCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTExMS43IDU3LjFWMjIuMmMwLTEuMS0uNS0yLjMtMS40LTIuOWgtLjFjLS42LS40LTEuMi0uNi0yLS42SDMwLjljLTIgMC0zLjUgMS41LTMuNSAzLjV2MzEuOWgzNC45YzIuOCAwIDUuMSAyLjQgNS4xIDUuMnYxNS41aDI3LjVWNjEuNGMwLTIuNCAxLjktNC4yIDQuMi00LjJoMTIuNnpcIiBmaWxsPVwiY3VycmVudENvbG9yXCI+PC9wYXRoPlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNOTYuOCA2Ny42SDEyOHYzMy4ySDk2Ljh6TTY3LjMgODYuMWgyNy41di05LjJINjcuM3pNNjUuMSA1OS4zYzAtMS44LTEuMy0zLjEtMy0zLjFoLTU2Yy0xLjcgMC0zIDEuNC0zIDMuMXY0MS45aDYyek0wIDEwNi4xYzAgMS43IDEuMyAzLjEgMy4xIDMuMWg2Mi4yYzEuNyAwIDMuMS0xLjMgMy4xLTMuMXYtMi45SDB6TTEyNS44IDU5LjNIOTljLTEuMiAwLTIuMi45LTIuMiAyLjJ2NC4xSDEyOHYtNC4xYzAtMS4zLS45LTIuMi0yLjItMi4yem0tOS40IDQuMWgtNy45Yy0uNiAwLTEtLjQtMS0xcy40LTEgMS0xaDcuOWMuNiAwIDEgLjQgMSAxIC4xLjYtLjMgMS0xIDF6bTMuOCAwaC0uNGMtLjYgMC0xLS40LTEtMXMuNC0xIDEtMWguNGMuNiAwIDEgLjQgMSAxcy0uNCAxLTEgMXpNOTYuOCAxMDcuMWMwIDEuMi45IDIuMiAyLjIgMi4yaDI2LjhjMS4yIDAgMi4yLTEgMi4yLTIuMlYxMDNIOTYuOHptMTEuNi0yaDcuOWMuNiAwIDEgLjQgMSAxcy0uNCAxLTEgMWgtNy45Yy0uNiAwLTEtLjQtMS0xcy40LTEgMS0xek04MS43IDkzLjdINzh2LTUuNkg2Ny4zdjcuNmgxNC4zYy42IDAgMS0uNCAxLTEgLjEtLjYtLjMtMS0uOS0xelwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIj48L3BhdGg+XG4gICAgICAgICAgICA8L3N2Zz5gXG5cbiAgICAgICAgICAgIGljb24gKz0gJzxzcGFuPicrdHJlZS5kZXZpY2UubmFtZSsnPC9zcGFuPidcblxuICAgICAgICAgICAgZGV2aWNlX2l0ZW0uaHRtbChpY29uKVxuXG4gICAgICAgICAgICBuYXYucHVzaChkZXZpY2VfaXRlbSlcblxuICAgICAgICAgICAgdHJlZS50cmVlLmZvckVhY2goZm9sZGVyPT57XG4gICAgICAgICAgICAgICAgaWYoZm9sZGVyLmlzUm9vdEZvbGRlcikgcmV0dXJuXG5cbiAgICAgICAgICAgICAgICBsZXQgZm9sZGVyX2l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgICAgICAgICBmb2xkZXJfaXRlbS50ZXh0KGZvbGRlci50aXRsZSlcbiAgICAgICAgICAgICAgICAgICAgZm9sZGVyX2l0ZW0uYWRkQ2xhc3MoJ2NsaWVudC1kbG5hLWhlYWRfX2ZvbGRlcicpXG5cbiAgICAgICAgICAgICAgICBuYXYucHVzaChmb2xkZXJfaXRlbSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGxldCBlbXB0eV9pdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgICBlbXB0eV9pdGVtLmFkZENsYXNzKCdjbGllbnQtZGxuYS1oZWFkX19kZXZpY2UnKVxuXG4gICAgICAgICAgICBsZXQgaWNvbiA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2ZXJzaW9uPVwiMS4xXCIgdmlld0JveD1cIjAgMCAxMjggMTI4XCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTExMS43IDU3LjFWMjIuMmMwLTEuMS0uNS0yLjMtMS40LTIuOWgtLjFjLS42LS40LTEuMi0uNi0yLS42SDMwLjljLTIgMC0zLjUgMS41LTMuNSAzLjV2MzEuOWgzNC45YzIuOCAwIDUuMSAyLjQgNS4xIDUuMnYxNS41aDI3LjVWNjEuNGMwLTIuNCAxLjktNC4yIDQuMi00LjJoMTIuNnpcIiBmaWxsPVwiY3VycmVudENvbG9yXCI+PC9wYXRoPlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNOTYuOCA2Ny42SDEyOHYzMy4ySDk2Ljh6TTY3LjMgODYuMWgyNy41di05LjJINjcuM3pNNjUuMSA1OS4zYzAtMS44LTEuMy0zLjEtMy0zLjFoLTU2Yy0xLjcgMC0zIDEuNC0zIDMuMXY0MS45aDYyek0wIDEwNi4xYzAgMS43IDEuMyAzLjEgMy4xIDMuMWg2Mi4yYzEuNyAwIDMuMS0xLjMgMy4xLTMuMXYtMi45SDB6TTEyNS44IDU5LjNIOTljLTEuMiAwLTIuMi45LTIuMiAyLjJ2NC4xSDEyOHYtNC4xYzAtMS4zLS45LTIuMi0yLjItMi4yem0tOS40IDQuMWgtNy45Yy0uNiAwLTEtLjQtMS0xcy40LTEgMS0xaDcuOWMuNiAwIDEgLjQgMSAxIC4xLjYtLjMgMS0xIDF6bTMuOCAwaC0uNGMtLjYgMC0xLS40LTEtMXMuNC0xIDEtMWguNGMuNiAwIDEgLjQgMSAxcy0uNCAxLTEgMXpNOTYuOCAxMDcuMWMwIDEuMi45IDIuMiAyLjIgMi4yaDI2LjhjMS4yIDAgMi4yLTEgMi4yLTIuMlYxMDNIOTYuOHptMTEuNi0yaDcuOWMuNiAwIDEgLjQgMSAxcy0uNCAxLTEgMWgtNy45Yy0uNiAwLTEtLjQtMS0xcy40LTEgMS0xek04MS43IDkzLjdINzh2LTUuNkg2Ny4zdjcuNmgxNC4zYy42IDAgMS0uNCAxLTEgLjEtLjYtLjMtMS0uOS0xelwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIj48L3BhdGg+XG4gICAgICAgICAgICA8L3N2Zz5gXG5cbiAgICAgICAgICAgIGljb24gKz0gJzxzcGFuPicrTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2NsaWVudF9kbG5hX2FsbF9kZXZpY2UnKSsnPC9zcGFuPidcblxuICAgICAgICAgICAgZW1wdHlfaXRlbS5odG1sKGljb24pXG5cbiAgICAgICAgICAgIG5hdi5wdXNoKGVtcHR5X2l0ZW0pXG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbmF2Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmKGkgPiAwKXtcbiAgICAgICAgICAgICAgICBsZXQgc3BsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgc3BsLmFkZENsYXNzKCdjbGllbnQtZGxuYS1oZWFkX19zcGxpdCcpXG5cbiAgICAgICAgICAgICAgICBoZWFkLmFwcGVuZChzcGwpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGhlYWQuYXBwZW5kKG5hdltpXSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZGlzcGxheUZvbGRlciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGxldCBkZXZpY2UgPSB0cmVlLmRldmljZVxuICAgICAgICBsZXQgZm9sZGVyID0gdHJlZS50cmVlW3RyZWUudHJlZS5sZW5ndGggLSAxXVxuXG4gICAgICAgIHRoaXMuZHJhd0xvYWRpbmcoTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2xvYWRpbmcnKSlcblxuICAgICAgICBkZXZpY2UuYnJvd3NlKGZvbGRlciwgMCwgMTAsIHRoaXMuZHJhd0ZvbGRlci5iaW5kKHRoaXMpLCAoKT0+e1xuICAgICAgICAgICAgTGFtcGEuTm90eS5zaG93KExhbXBhLkxhbmcudHJhbnNsYXRlKCd0b3JyZW50X3BhcnNlcl9lbXB0eScpKVxuXG4gICAgICAgICAgICB0cmVlLnRyZWUucG9wKClcblxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Rm9sZGVyKClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmJhY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICBpZih0cmVlKXtcbiAgICAgICAgICAgIGlmKHRyZWUudHJlZS5sZW5ndGggPiAxKXtcbiAgICAgICAgICAgICAgICB0cmVlLnRyZWUucG9wKClcblxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUZvbGRlcigpXG5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdHJlZSA9IGZhbHNlXG5cbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdEZXZpY2VzKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgTGFtcGEuQWN0aXZpdHkuYmFja3dhcmQoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gZnVuY3Rpb24oKXtcbiAgICAgICAgTGFtcGEuQmFja2dyb3VuZC5pbW1lZGlhdGVseSgnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDZ0FBQUFaQ0FZQUFBQkQyR3hsQUFBQUNYQklXWE1BQUFzVEFBQUxFd0VBbXB3WUFBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQUhBU1VSQlZIZ0JsWmFMcnNNZ0RFTlh4QWYzLzlYSEZkWE5aTG0yWVpIUXltUGs0Q1MwMjc3djkrZmZydXQ2Mm5FY24vTThuemI2OWN4ajZsZTErNzVmL1Jxclo5ZmF0bTNGOXd3TVI3eWhhd2lsTmtlNEdpcy83ajlzclFiZGFWRkJua2NRMVdyZmdtSUlCY1RydmdxcXNLaVR6dnBPUWJVbkF5a1ZXNFZWcVpYeXlEbGxZRlNLeDlRYVZyTzduR0pJQjYzZytGQXEveGhjSFdCWWR3Q3NtQXR2RlpVS0UwTWxWWldDVDRpZE9seWhUcDNLMzVSLzZOemxxMHVCbnNLV2xFemdTaDFWR0p4djZybXBYTU83RUsrWFdVUG5ERlJXcWl0UUZlWTJVeVpWcnl1V2xJOHVsTGdHZjE5Rm9vQVV3QzlnQ1dMY3d6V1BiN1dhNjBxZGxaeGp4Nm9vVXVVcVZRc0sreTFWb0FKeUJlSkFWc0xKZVltZy9SSVhkRzJrUGh3WVBCVVFReVlGMFhDOGx3UDNNVENyWUFYQjg4NTU2cGVDYlVVWlY3V2Njd2tVUWZDWkM0UFhkQTVoS2hTVmh5dGhacWpaTTBKMzl3NW04QlJhZEtBY3JzSXBOWnNMSVlkT3FjWjloRXhoWjFNSCtRTCtjaUZ6WHptWWhaci9NNnlVVXdwMmRwNVU0bmFaRHdBRjVKUlNlZmRTY0paM1NrVTBubDh4cGFBeSs3bWwxRXF2TVhTczFIUnJaOWJjM2VaVVNYbUdhL21keWpibXF5WDdBOVJhWVFhOUlSSjBBQUFBQUVsRlRrU3VRbUNDJylcbiAgICB9XG5cbiAgICB0aGlzLnN0YXJ0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoTGFtcGEuQWN0aXZpdHkuYWN0aXZlKCkgJiYgTGFtcGEuQWN0aXZpdHkuYWN0aXZlKCkuYWN0aXZpdHkgIT09IHRoaXMuYWN0aXZpdHkpIHJldHVyblxuXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCgpXG5cbiAgICAgICAgTGFtcGEuQ29udHJvbGxlci5hZGQoJ2NvbnRlbnQnLHtcbiAgICAgICAgICAgIGludmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHRvZ2dsZTogKCk9PntcbiAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLmNvbGxlY3Rpb25TZXQoaHRtbClcbiAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLmNvbGxlY3Rpb25Gb2N1cyhmYWxzZSxodG1sKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZnQ6ICgpPT57XG4gICAgICAgICAgICAgICAgaWYoTmF2aWdhdG9yLmNhbm1vdmUoJ2xlZnQnKSkgTmF2aWdhdG9yLm1vdmUoJ2xlZnQnKVxuICAgICAgICAgICAgICAgIGVsc2UgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ21lbnUnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwOiAoKT0+e1xuICAgICAgICAgICAgICAgIGlmKE5hdmlnYXRvci5jYW5tb3ZlKCd1cCcpKSBOYXZpZ2F0b3IubW92ZSgndXAnKVxuICAgICAgICAgICAgICAgIGVsc2UgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ2hlYWQnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJpZ2h0OiAoKT0+e1xuICAgICAgICAgICAgICAgIE5hdmlnYXRvci5tb3ZlKCdyaWdodCcpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG93bjogKCk9PntcbiAgICAgICAgICAgICAgICBOYXZpZ2F0b3IubW92ZSgnZG93bicpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFjazogdGhpcy5iYWNrLmJpbmQodGhpcylcbiAgICAgICAgfSlcblxuICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnY29udGVudCcpXG4gICAgfVxuXG4gICAgdGhpcy5wYXVzZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHRoaXMuc3RvcCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHRoaXMucmVuZGVyID0gZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIGh0bWxcbiAgICB9XG5cbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICBpZihkZXZpY2VGaW5kZXIpIGRldmljZUZpbmRlci5yZW1vdmVEZXZpY2VEaXNjb3ZlcnlMaXN0ZW5lcihsaXN0ZW5lcl9pZClcbiAgICAgICAgXG4gICAgICAgIGlmKHNjcm9sbCkgc2Nyb2xsLmRlc3Ryb3koKVxuXG4gICAgICAgIGh0bWwucmVtb3ZlKClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudCIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnQnXG5cbi8vIHdpbmRvdy53ZWJhcGlzID0ge1xuLy8gICAgIGFsbHNoYXJlOiB7XG4vLyAgICAgICAgIHNlcnZpY2Vjb25uZWN0b3I6IHtcbi8vICAgICAgICAgICAgIGNyZWF0ZVNlcnZpY2VQcm92aWRlcjogZnVuY3Rpb24oZ29vZCwgZXJyKXtcbi8vICAgICAgICAgICAgICAgICBnb29kKClcbi8vICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICBnZXRTZXJ2aWNlUHJvdmlkZXI6IGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy53ZWJhcGlzLmFsbHNoYXJlLnNlcnZpY2Vjb25uZWN0b3Jcbi8vICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICBnZXREZXZpY2VGaW5kZXI6IGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgICAgICAgICAgZ2V0RGV2aWNlTGlzdDogZnVuY3Rpb24oKXtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbe1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyb3dzZTogKHdoZXJlLCBpbmRleCwgbWF4LCBjYWxsKT0+e1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm9vdCA9IFt7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50QnVpbGRUeXBlOiBcIlBST1ZJREVSXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiBcIjIwMjMtMDYtMTRcIixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uOiBcImF2aVwiLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVNpemU6IDc4MTA4NDY3Mixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMCxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUm9vdEZvbGRlcjogZmFsc2UsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVHlwZTogXCJGT0xERVJcIixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcItCh0LvQtdC00YHRgtCy0LjQtSDQstC10LTRg9GCINC30L3QsNGC0L7QutC4ICjQvNCw0LvRi9C1INGA0LjQv9GLKS/QodC70LXQtNGB0YLQstC40LUg0LLQtdC00YPRgiDQt9C90LDRgtC+0LrQuCDRhNC40LvRjNC8IDAxINCn0LXRgNC90YvQuSDQvNCw0LrQu9C10YAgNzQ1XCJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cblxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9sZGVyID0gW3tcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRCdWlsZFR5cGU6IFwiUFJPVklERVJcIixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGU6IFwiMjAyMy0wNi0xNFwiLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlbnNpb246IFwiYXZpXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlU2l6ZTogNzgxMDg0NjcyLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAwLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSb290Rm9sZGVyOiBmYWxzZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UeXBlOiBcIkZPTERFUlwiLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTW92aWV3c1wiXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRCdWlsZFR5cGU6IFwiUFJPVklERVJcIixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGU6IFwiMjAyMy0wNi0xNFwiLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlbnNpb246IFwiYXZpXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlU2l6ZTogNzgxMDg0NjcyLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAwLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSb290Rm9sZGVyOiBmYWxzZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UeXBlOiBcIkZPTERFUlwiLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTW92aWV3c1wiXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRCdWlsZFR5cGU6IFwiUFJPVklERVJcIixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGU6IFwiMjAyMy0wNi0xNFwiLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlbnNpb246IFwiYXZpXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlU2l6ZTogNzgxMDg0NjcyLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAwLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSb290Rm9sZGVyOiBmYWxzZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UeXBlOiBcIlZJREVPXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJTdXBlcl9NYXJpb19Ccm9zZXJzLmF2aVwiXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEJ1aWxkVHlwZTogXCJQUk9WSURFUlwiLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZTogXCIyMDIzLTA2LTE0XCIsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMCxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbjogXCJhdmlcIixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVTaXplOiA3ODEwODQ2NzIsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDAsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1Jvb3RGb2xkZXI6IGZhbHNlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVR5cGU6IFwiVklERU9cIixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlN1cGVyX01hcmlvX0Jyb3NlcnMuYXZpXCJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSx7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50QnVpbGRUeXBlOiBcIlBST1ZJREVSXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiBcIjIwMjMtMDYtMTRcIixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uOiBcImF2aVwiLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVNpemU6IDc4MTA4NDY3Mixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMCxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUm9vdEZvbGRlcjogZmFsc2UsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVHlwZTogXCJWSURFT1wiLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU3VwZXJfTWFyaW9fQnJvc2Vycy5hdmlcIlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRCdWlsZFR5cGU6IFwiUFJPVklERVJcIixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGU6IFwiMjAyMy0wNi0xNFwiLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlbnNpb246IFwiYXZpXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlU2l6ZTogNzgxMDg0NjcyLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAwLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSb290Rm9sZGVyOiBmYWxzZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UeXBlOiBcIlZJREVPXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJTdXBlcl9NYXJpb19Ccm9zZXJzLmF2aVwiXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEJ1aWxkVHlwZTogXCJQUk9WSURFUlwiLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZTogXCIyMDIzLTA2LTE0XCIsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMCxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbjogXCJhdmlcIixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVTaXplOiA3ODEwODQ2NzIsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDAsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1Jvb3RGb2xkZXI6IGZhbHNlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVR5cGU6IFwiVklERU9cIixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlN1cGVyX01hcmlvX0Jyb3NlcnMuYXZpXCJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cblxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsKHdoZXJlLmlzUm9vdEZvbGRlciA/IHJvb3QgOiBmb2xkZXIpXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXZpY2VEb21haW46IFwiTE9DQUxfTkVUV09SS1wiLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldmljZVR5cGU6IFwiTUVESUFQUk9WSURFUlwiLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25BcnJheTogW10sXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidXVpZDpjYjE0YjhhMy1jMjVmLWU0M2ItNTk2Yi00OWI0NjQzZmYyMjMrd2xhbjBcIixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcEFkZHJlc3M6IFwiMTkyLjE2OC4wLjEwM1wiLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VhcmNoYWJsZTogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbE5hbWU6IFwiZG1zIDEuNFwiLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVG9yXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmljOiBcIjE5Mi4xNjguMC4xMDJcIixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb290Rm9sZGVyOiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUm9vdEZvbGRlcjogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdSb290Jyxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaDogKCk9Pnt9LFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnR5cGU6IFwiXCJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4vLyAgICAgICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgICAgIGFkZERldmljZURpc2NvdmVyeUxpc3RlbmVyOiBmdW5jdGlvbigpe1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDIzMzM0XG4vLyAgICAgICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlbW92ZURldmljZURpc2NvdmVyeUxpc3RlbmVyOiBmdW5jdGlvbigpe1xuXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyB9XG5cbmZ1bmN0aW9uIHN0YXJ0UGx1Z2luKCkge1xuICAgIHdpbmRvdy5wbHVnaW5fY2xpZW50X2RubGEgPSB0cnVlXG5cbiAgICBMYW1wYS5MYW5nLmFkZCh7XG4gICAgICAgIGNsaWVudF9kbG5hX3NlYXJjaF9kZXZpY2U6IHtcbiAgICAgICAgICAgIHJ1OiAn0J/QvtC40YHQuiDRg9GB0YLRgNC+0LnRgdGC0LInLFxuICAgICAgICAgICAgZW46ICdEZXZpY2Ugc2VhcmNoJyxcbiAgICAgICAgICAgIHVrOiAn0J/QvtGI0YPQuiDQv9GA0LjRgdGC0YDQvtGX0LInLFxuICAgICAgICAgICAgYmU6ICfQn9C+0YjRg9C6INC/0YDRi9C70LDQtCcsXG4gICAgICAgICAgICB6aDogJ+iuvuWkh+aQnOe0oicsXG4gICAgICAgICAgICBwdDogJ1Blc3F1aXNhIGRlIGRpc3Bvc2l0aXZvcydcbiAgICAgICAgfSxcbiAgICAgICAgY2xpZW50X2RsbmFfbm9zdXBvcnQ6IHtcbiAgICAgICAgICAgIHJ1OiAn0JLQsNGIINCy0LjQtNC20LXRgiDQvdC1INC/0L7QtNC00LXRgNC20LjQstCw0LXRgtGB0Y8sINC+0LHQvdC+0LLQuNGC0LUg0LLQuNC00LbQtdGCINC90LAg0L3QvtCy0YPRjiDQstC10YDRgdC40Y4nLFxuICAgICAgICAgICAgZW46ICdZb3VyIHdpZGdldCBpcyBub3Qgc3VwcG9ydGVkLCB1cGRhdGUgdGhlIHdpZGdldCB0byBhIG5ld2VyIHZlcnNpb24nLFxuICAgICAgICAgICAgdWs6ICfQktGW0LTQttC10YIg0L3QtSDQv9GW0LTRgtGA0LjQvNGD0ZTRgtGM0YHRjywg0L7QvdC+0LLRltGC0Ywg0LLRltC00LbQtdGCINC90LAg0L3QvtCy0YMg0LLQtdGA0YHRltGOJyxcbiAgICAgICAgICAgIGJlOiAn0JLQsNGIINCy0ZbQtNC20Y3RgiDQvdC1INC/0LDQtNGC0YDRi9C80LvRltCy0LDQtdGG0YbQsCwg0LDQsdC90LDQstGW0YbQtSDQstGW0LTQttGN0YIg0L3QsCDQvdC+0LLRg9GOINCy0LXRgNGB0ZbRjicsXG4gICAgICAgICAgICB6aDogJ+S4jeaUr+aMgeaCqOeahOWwj+mDqOS7tu+8jOivt+WwhuWwj+mDqOS7tuabtOaWsOWIsOi+g+aWsOeJiOacrCcsXG4gICAgICAgICAgICBwdDogJ1NldSB3aWRnZXQgbsOjbyDDqSBjb21wYXTDrXZlbCwgYXR1YWxpemUgbyB3aWRnZXQgcGFyYSB1bWEgdmVyc8OjbyBtYWlzIHJlY2VudGUnXG4gICAgICAgIH0sXG4gICAgICAgIGNsaWVudF9kbG5hX2FsbF9kZXZpY2U6IHtcbiAgICAgICAgICAgIHJ1OiAn0JLRgdC1INGD0YHRgtGA0L7QudGB0YLQstCwJyxcbiAgICAgICAgICAgIGVuOiAnQWxsIGRldmljZXMnLFxuICAgICAgICAgICAgdWs6ICfQo9GB0ZYg0L/RgNC40YHRgtGA0L7RlycsXG4gICAgICAgICAgICBiZTogJ9Cj0YHQtSDQv9GA0YvQu9Cw0LTRiycsXG4gICAgICAgICAgICB6aDogJ+aJgOacieiuvuWkhycsXG4gICAgICAgICAgICBwdDogJ1RvZG9zIG9zIGRpc3Bvc2l0aXZvcydcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBsZXQgbWFuaWZlc3QgPSB7XG4gICAgICAgIHR5cGU6ICdwbHVnaW4nLFxuICAgICAgICB2ZXJzaW9uOiAnMS4xLjEnLFxuICAgICAgICBuYW1lOiAnRExOQScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgY29tcG9uZW50OiAnY2xpZW50X2RubGEnLFxuICAgIH1cbiAgICBcbiAgICBMYW1wYS5NYW5pZmVzdC5wbHVnaW5zID0gbWFuaWZlc3RcbiAgICBcbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ2NsaWVudF9kbG5hX21haW4nLCBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnQtZGxuYS1tYWluXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50LWRsbmEtbWFpbl9faGVhZCBjbGllbnQtZGxuYS1oZWFkXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50LWRsbmEtbWFpbl9fYm9keVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgKVxuXG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdjbGllbnRfZGxuYV9sb2FkaW5nJywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50LWRsbmEtbG9hZGluZ1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudC1kbG5hLWxvYWRpbmdfX3RpdGxlXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50LWRsbmEtbG9hZGluZ19fbG9hZGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJyb2FkY2FzdF9fc2NhblwiPjxkaXY+PC9kaXY+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYClcblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgnY2xpZW50X2RsbmFfZGV2aWNlJywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50LWRsbmEtZGV2aWNlIHNlbGVjdG9yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50LWRsbmEtZGV2aWNlX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudC1kbG5hLWRldmljZV9faWNvblwiPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2ZXJzaW9uPVwiMS4xXCIgdmlld0JveD1cIjAgMCAxMjggMTI4XCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTExLjcgNTcuMVYyMi4yYzAtMS4xLS41LTIuMy0xLjQtMi45aC0uMWMtLjYtLjQtMS4yLS42LTItLjZIMzAuOWMtMiAwLTMuNSAxLjUtMy41IDMuNXYzMS45aDM0LjljMi44IDAgNS4xIDIuNCA1LjEgNS4ydjE1LjVoMjcuNVY2MS40YzAtMi40IDEuOS00LjIgNC4yLTQuMmgxMi42elwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIj48L3BhdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTk2LjggNjcuNkgxMjh2MzMuMkg5Ni44ek02Ny4zIDg2LjFoMjcuNXYtOS4ySDY3LjN6TTY1LjEgNTkuM2MwLTEuOC0xLjMtMy4xLTMtMy4xaC01NmMtMS43IDAtMyAxLjQtMyAzLjF2NDEuOWg2MnpNMCAxMDYuMWMwIDEuNyAxLjMgMy4xIDMuMSAzLjFoNjIuMmMxLjcgMCAzLjEtMS4zIDMuMS0zLjF2LTIuOUgwek0xMjUuOCA1OS4zSDk5Yy0xLjIgMC0yLjIuOS0yLjIgMi4ydjQuMUgxMjh2LTQuMWMwLTEuMy0uOS0yLjItMi4yLTIuMnptLTkuNCA0LjFoLTcuOWMtLjYgMC0xLS40LTEtMXMuNC0xIDEtMWg3LjljLjYgMCAxIC40IDEgMSAuMS42LS4zIDEtMSAxem0zLjggMGgtLjRjLS42IDAtMS0uNC0xLTFzLjQtMSAxLTFoLjRjLjYgMCAxIC40IDEgMXMtLjQgMS0xIDF6TTk2LjggMTA3LjFjMCAxLjIuOSAyLjIgMi4yIDIuMmgyNi44YzEuMiAwIDIuMi0xIDIuMi0yLjJWMTAzSDk2Ljh6bTExLjYtMmg3LjljLjYgMCAxIC40IDEgMXMtLjQgMS0xIDFoLTcuOWMtLjYgMC0xLS40LTEtMXMuNC0xIDEtMXpNODEuNyA5My43SDc4di01LjZINjcuM3Y3LjZoMTQuM2MuNiAwIDEtLjQgMS0xIC4xLS42LS4zLTEtLjktMXpcIiBmaWxsPVwiY3VycmVudENvbG9yXCI+PC9wYXRoPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50LWRsbmEtZGV2aWNlX19uYW1lXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudC1kbG5hLWRldmljZV9faXBcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgKVxuXG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdjbGllbnRfZGxuYV9mb2xkZXInLCBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnQtZGxuYS1kZXZpY2Ugc2VsZWN0b3JcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnQtZGxuYS1kZXZpY2VfX2JvZHlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50LWRsbmEtZGV2aWNlX19pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZlcnNpb249XCIxLjFcIiB2aWV3Qm94PVwiMCAwIDQwOCA0MDhcIiBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMlwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTM3MiA4OC42NjFIMjA2LjMybC0zMy0zOS4yNGE1LjAwMSA1LjAwMSAwIDAgMC00LTEuOEgzNmMtMTkuOTU2LjE5OC0zNi4wMjMgMTYuNDQzLTM2IDM2LjR2MjQwYy0uMDAxIDE5Ljk0MSAxNi4wNiAzNi4xNjMgMzYgMzYuMzZoMzM2YzE5Ljk0LS4xOTcgMzYuMDAxLTE2LjQxOSAzNi0zNi4zNnYtMTk5Yy4wMDEtMTkuOTQxLTE2LjA2LTM2LjE2Mi0zNi0zNi4zNnpcIiBmaWxsPVwiY3VycmVudENvbG9yXCI+PC9wYXRoPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50LWRsbmEtZGV2aWNlX19uYW1lXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYClcblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgnY2xpZW50X2RsbmFfZmlsZScsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudC1kbG5hLWZpbGUgc2VsZWN0b3JcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnQtZGxuYS1maWxlX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudC1kbG5hLWZpbGVfX2ljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmVyc2lvbj1cIjEuMVwiIHZpZXdCb3g9XCIwIDAgNDc3Ljg2NyA0NzcuODY3XCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjM4LjkzMyAwQzEwNi45NzQgMCAwIDEwNi45NzQgMCAyMzguOTMzczEwNi45NzQgMjM4LjkzMyAyMzguOTMzIDIzOC45MzMgMjM4LjkzMy0xMDYuOTc0IDIzOC45MzMtMjM4LjkzM0M0NzcuNzI2IDEwNy4wMzMgMzcwLjgzNC4xNDEgMjM4LjkzMyAwem0xMDAuNjI0IDI0Ni41NDZhMTcuMDY4IDE3LjA2OCAwIDAgMS03LjY2MiA3LjY2MnYuMDg1TDE5NS4zNjIgMzIyLjU2Yy04LjQzMiA0LjIxMy0xOC42ODIuNzk0LTIyLjg5Ni03LjYzOGExNy4wNjEgMTcuMDYxIDAgMCAxLTEuOC03LjcyMlYxNzAuNjY3Yy0uMDA0LTkuNDI2IDcuNjMzLTE3LjA3IDE3LjA1OS0xNy4wNzVhMTcuMDY4IDE3LjA2OCAwIDAgMSA3LjYzNyAxLjhsMTM2LjUzMyA2OC4yNjdjOC40MzYgNC4yMDQgMTEuODY3IDE0LjQ1MSA3LjY2MiAyMi44ODd6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPjwvcGF0aD5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudC1kbG5hLWZpbGVfX25hbWVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50LWRsbmEtZmlsZV9fc2l6ZVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGApXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQobWFuaWZlc3QuY29tcG9uZW50ICsgJ19zdHlsZScsIGBcbiAgICAgICAgPHN0eWxlPlxuICAgICAgICBAQGluY2x1ZGUoJy4uL3BsdWdpbnMvZGxuYS9jc3Mvc3R5bGUuY3NzJylcbiAgICAgICAgPC9zdHlsZT5cbiAgICBgKVxuXG5cbiAgICB0cnl7XG4gICAgICAgIHdlYmFwaXMuYWxsc2hhcmUuc2VydmljZWNvbm5lY3Rvci5jcmVhdGVTZXJ2aWNlUHJvdmlkZXIoKCk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdETE5BJywnY29ubmVjdGVkJylcblxuICAgICAgICAgICAgd2luZG93LnNlcnZpY2VQcm92aWRlciA9IHdlYmFwaXMuYWxsc2hhcmUuc2VydmljZWNvbm5lY3Rvci5nZXRTZXJ2aWNlUHJvdmlkZXIoKVxuICAgICAgICB9LChlKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0RMTkEnLCdjb25uZWN0IGVycm9yOicsIGUubWVzc2FnZSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgY2F0Y2goZSl7fVxuXG5cblxuICAgIGZ1bmN0aW9uIGFkZCgpe1xuICAgICAgICAvL2lmKCFMYW1wYS5QbGF0Zm9ybS5pcygndGl6ZW4nKSkgcmV0dXJuXG5cbiAgICAgICAgbGV0IGJ1dHRvbiA9ICQoYDxsaSBjbGFzcz1cIm1lbnVfX2l0ZW0gc2VsZWN0b3JcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZW51X19pY29cIj5cbiAgICAgICAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yNTYgMEMxMTQuODMzIDAgMCAxMTQuODMzIDAgMjU2czExNC44MzMgMjU2IDI1NiAyNTYgMjU2LTExNC44MzMgMjU2LTI1NlMzOTcuMTY3IDAgMjU2IDBabTAgNDcyLjM0MWMtMTE5LjI3NSAwLTIxNi4zNDEtOTcuMDY2LTIxNi4zNDEtMjE2LjM0MVMxMzYuNzI1IDM5LjY1OSAyNTYgMzkuNjU5YzExOS4yOTUgMCAyMTYuMzQxIDk3LjA2NiAyMTYuMzQxIDIxNi4zNDFTMzc1LjI3NSA0NzIuMzQxIDI1NiA0NzIuMzQxelwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjE2MFwiIGN5PVwiMjUwXCIgcj1cIjYwXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjMyMFwiIGN5PVwiMTUwXCIgcj1cIjYwXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjMyMFwiIGN5PVwiMzUwXCIgcj1cIjYwXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiLz5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMzUgMTM1aDI3MHYzMEgzNXptMTc1Ljc4MiAxMDBoMjcwdjMwaC0yNzB6TTM1IDMzNWgyNzB2MzBIMzV6XCIvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudV9fdGV4dFwiPiR7bWFuaWZlc3QubmFtZX08L2Rpdj5cbiAgICAgICAgPC9saT5gKVxuXG4gICAgICAgIGJ1dHRvbi5vbignaG92ZXI6ZW50ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBMYW1wYS5BY3Rpdml0eS5wdXNoKHtcbiAgICAgICAgICAgICAgICB1cmw6ICcnLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBtYW5pZmVzdC5uYW1lLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogbWFuaWZlc3QuY29tcG9uZW50LFxuICAgICAgICAgICAgICAgIHBhZ2U6IDFcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgJCgnLm1lbnUgLm1lbnVfX2xpc3QnKS5lcSgwKS5hcHBlbmQoYnV0dG9uKVxuXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoTGFtcGEuVGVtcGxhdGUuZ2V0KG1hbmlmZXN0LmNvbXBvbmVudCArICdfc3R5bGUnLHt9LHRydWUpKVxuICAgIH1cblxuICAgIExhbXBhLkNvbXBvbmVudC5hZGQobWFuaWZlc3QuY29tcG9uZW50LCBDb21wb25lbnQpXG5cbiAgICBpZih3aW5kb3cuYXBwcmVhZHkpIGFkZCgpXG4gICAgZWxzZXtcbiAgICAgICAgTGFtcGEuTGlzdGVuZXIuZm9sbG93KCdhcHAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUudHlwZSA9PSAncmVhZHknKSBhZGQoKVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuaWYoIXdpbmRvdy5wbHVnaW5fY2xpZW50X2RubGEpIHN0YXJ0UGx1Z2luKCkiXSwibmFtZXMiOlsiQ29tcG9uZW50Iiwib2JqZWN0IiwiaHRtbCIsIkxhbXBhIiwiVGVtcGxhdGUiLCJqcyIsImhlYWQiLCJmaW5kIiwiYm9keSIsImxpc3RlbmVyX2lkIiwiZGV2aWNlRmluZGVyIiwic2Nyb2xsIiwidHJlZSIsImNyZWF0ZSIsImFjdGl2aXR5IiwibG9hZGVyIiwid2luZG93Iiwic2VydmljZVByb3ZpZGVyIiwiU2Nyb2xsIiwibWFzayIsIm92ZXIiLCJtaW51cyIsImFwcGVuZCIsInJlbmRlciIsImdldERldmljZUZpbmRlciIsImFkZERldmljZURpc2NvdmVyeUxpc3RlbmVyIiwib25kZXZpY2VhZGRlZCIsImRyYXdEZXZpY2VzIiwiYmluZCIsIm9uZGV2aWNlcmVtb3ZlZCIsImUiLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSIsImVtcHR5IiwiRW1wdHkiLCJkZXNjciIsIkxhbmciLCJ0cmFuc2xhdGUiLCJzdGFydCIsIl90aGlzIiwiZGV2aWNlcyIsImdldERldmljZUxpc3QiLCJjbGVhciIsInJlc2V0IiwibGVuZ3RoIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJpdGVtIiwidGV4dCIsIm5hbWUiLCJpcEFkZHJlc3MiLCJvbiIsImRldmljZSIsInJvb3RGb2xkZXIiLCJkaXNwbGF5Rm9sZGVyIiwidXBkYXRlIiwiZHJhd0xvYWRpbmciLCJkcmF3SGVhZCIsInRvZ2dsZSIsIkNvbnRyb2xsZXIiLCJsb2FkIiwiZHJhd0ZvbGRlciIsImVsZW1zIiwiX3RoaXMyIiwiZm9sZGVycyIsImZpbHRlciIsImEiLCJpdGVtVHlwZSIsImZpbGVzIiwidGl0bGUiLCJwdXNoIiwic3BsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYWRkQ2xhc3MiLCJVdGlscyIsImJ5dGVzVG9TaXplIiwiZmlsZVNpemUiLCJ2aWRlbyIsInVybCIsIml0ZW1VcmkiLCJQbGF5ZXIiLCJwbGF5IiwicGxheWxpc3QiLCJuYXYiLCJkZXZpY2VfaXRlbSIsImljb24iLCJmb2xkZXIiLCJpc1Jvb3RGb2xkZXIiLCJmb2xkZXJfaXRlbSIsImVtcHR5X2l0ZW0iLCJpIiwiX3RoaXMzIiwiYnJvd3NlIiwiTm90eSIsInNob3ciLCJwb3AiLCJiYWNrIiwiQWN0aXZpdHkiLCJiYWNrd2FyZCIsImJhY2tncm91bmQiLCJCYWNrZ3JvdW5kIiwiaW1tZWRpYXRlbHkiLCJhY3RpdmUiLCJhZGQiLCJpbnZpc2libGUiLCJjb2xsZWN0aW9uU2V0IiwiY29sbGVjdGlvbkZvY3VzIiwibGVmdCIsIk5hdmlnYXRvciIsImNhbm1vdmUiLCJtb3ZlIiwidXAiLCJyaWdodCIsImRvd24iLCJwYXVzZSIsInN0b3AiLCJkZXN0cm95IiwicmVtb3ZlRGV2aWNlRGlzY292ZXJ5TGlzdGVuZXIiLCJyZW1vdmUiLCJzdGFydFBsdWdpbiIsInBsdWdpbl9jbGllbnRfZG5sYSIsImNsaWVudF9kbG5hX3NlYXJjaF9kZXZpY2UiLCJydSIsImVuIiwidWsiLCJiZSIsInpoIiwicHQiLCJjbGllbnRfZGxuYV9ub3N1cG9ydCIsImNsaWVudF9kbG5hX2FsbF9kZXZpY2UiLCJtYW5pZmVzdCIsInR5cGUiLCJ2ZXJzaW9uIiwiZGVzY3JpcHRpb24iLCJjb21wb25lbnQiLCJNYW5pZmVzdCIsInBsdWdpbnMiLCJ3ZWJhcGlzIiwiYWxsc2hhcmUiLCJzZXJ2aWNlY29ubmVjdG9yIiwiY3JlYXRlU2VydmljZVByb3ZpZGVyIiwiZ2V0U2VydmljZVByb3ZpZGVyIiwiYnV0dG9uIiwiJCIsImNvbmNhdCIsInBhZ2UiLCJlcSIsImdldCIsImFwcHJlYWR5IiwiTGlzdGVuZXIiLCJmb2xsb3ciXSwibWFwcGluZ3MiOiI7OztJQUFBLFNBQVNBLFNBQVNBLENBQUNDLE1BQU0sRUFBQztNQUN0QixJQUFJQyxJQUFJLEdBQUdDLEtBQUssQ0FBQ0MsUUFBUSxDQUFDQyxFQUFFLENBQUMsa0JBQWtCLENBQUM7UUFDNUNDLElBQUksR0FBR0osSUFBSSxDQUFDSyxJQUFJLENBQUMseUJBQXlCLENBQUM7UUFDM0NDLElBQUksR0FBR04sSUFBSSxDQUFDSyxJQUFJLENBQUMseUJBQXlCLENBQUM7TUFFL0MsSUFBSUUsV0FBVyxFQUFFQyxZQUFZLEVBQUVDLE1BQU0sRUFBRUMsSUFBSTtNQUUzQyxJQUFJLENBQUNDLE1BQU0sR0FBRyxZQUFVO1FBQ3BCLElBQUksQ0FBQ0MsUUFBUSxDQUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBRTFCLElBQUdDLE1BQU0sQ0FBQ0MsZUFBZSxFQUFDO1VBQ3RCTixNQUFNLEdBQUcsSUFBSVIsS0FBSyxDQUFDZSxNQUFNLENBQUM7WUFBQ0MsSUFBSSxFQUFFLElBQUk7WUFBRUMsSUFBSSxFQUFFO1dBQUssQ0FBQztVQUVuRFQsTUFBTSxDQUFDVSxLQUFLLENBQUNmLElBQUksQ0FBQztVQUVsQkUsSUFBSSxDQUFDYyxNQUFNLENBQUNYLE1BQU0sQ0FBQ1ksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1VBRWhDLElBQUc7WUFDQ2IsWUFBWSxHQUFHTyxl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