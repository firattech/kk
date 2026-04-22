(function () {
  'use strict';

  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  var Api = /*#__PURE__*/function () {
    function Api() {
      _classCallCheck(this, Api);
    }
    return _createClass(Api, null, [{
      key: "list",
      value: function list() {
        var _this = this;
        return new Promise(function (resolve, reject) {
          _this.network["native"](_this.api_url, function (result) {
            Lampa.Cache.rewriteData('other', 'radio_record_list', result)["finally"](resolve.bind(resolve, result));
          }, function () {
            Lampa.Cache.getData('other', 'radio_record_list').then(resolve)["catch"](reject);
          });
        });
      }
    }]);
  }();
  _defineProperty(Api, "network", new Lampa.Reguest());
  _defineProperty(Api, "api_url", 'https://www.radiorecord.ru/api/stations/');

  var Favorites = /*#__PURE__*/function () {
    function Favorites() {
      _classCallCheck(this, Favorites);
    }
    return _createClass(Favorites, null, [{
      key: "get",
      value: function get() {
        var all = Lampa.Storage.get('radio_favorite_stations', '[]');
        all.sort(function (a, b) {
          return a.added > b.added ? -1 : a.added < b.added ? 1 : 0;
        });
        return all;
      }
    }, {
      key: "find",
      value: function find(favorite) {
        return this.get().find(function (a) {
          return a.id == favorite.id;
        });
      }
    }, {
      key: "remove",
      value: function remove(favorite) {
        var list = this.get();
        var find = this.find(favorite);
        if (find) {
          Lampa.Arrays.remove(list, find);
          Lampa.Storage.set('radio_favorite_stations', list);
        }
      }
    }, {
      key: "add",
      value: function add(favorite) {
        var list = this.get();
        var find = this.find(favorite);
        if (!find) {
          Lampa.Arrays.extend(favorite, {
            id: Lampa.Utils.uid(),
            added: Date.now()
          });
          list.push(favorite);
          Lampa.Storage.set('radio_favorite_stations', list);
        }
      }
    }, {
      key: "update",
      value: function update(favorite) {
        var list = this.get();
        var find = this.find(favorite);
        if (find) {
          Lampa.Storage.set('radio_favorite_stations', list);
        }
      }
    }, {
      key: "toggle",
      value: function toggle(favorite) {
        return this.find(favorite) ? this.remove(favorite) : this.add(favorite);
      }
    }]);
  }();

  function Player(station) {
    var html = Lampa.Template.js('radio_player');
    var audio = new Audio();
    var url = station.stream_320 ? station.stream_320 : station.stream_128 ? station.stream_128 : station.stream ? station.stream : station.stream_hls ? station.stream_hls.replace('playlist.m3u8', '96/playlist.m3u8') : '';
    var hls;
    audio.addEventListener("playing", function (event) {
      changeWave('play');
    });
    audio.addEventListener("waiting", function (event) {
      changeWave('loading');
    });
    var screenreset = setInterval(function () {
      Lampa.Screensaver.resetTimer();
    }, 1000);
    function prepare() {
      if (audio.canPlayType('application/vnd.apple.mpegurl') || url.indexOf('.aacp') > 0 || station.stream) load();else if (Hls.isSupported()) {
        try {
          hls = new Hls();
          hls.attachMedia(audio);
          hls.loadSource(url);
          hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.details === Hls.ErrorDetails.MANIFEST_PARSING_ERROR) {
              if (data.reason === "no EXTM3U delimiter") {
                Lampa.Noty.show(Lampa.Lang.translate('radio_load_error'));
              }
            }
          });
          hls.on(Hls.Events.MANIFEST_LOADED, function () {
            start();
          });
        } catch (e) {
          Lampa.Noty.show(Lampa.Lang.translate('radio_load_error'));
        }
      } else load();
    }
    function load() {
      audio.src = url;
      audio.load();
      start();
    }
    function start() {
      var playPromise;
      try {
        playPromise = audio.play();
      } catch (e) {}
      if (playPromise !== undefined) {
        playPromise.then(function () {
          console.log('Radio', 'start plaining');
          changeWave('play');
        })["catch"](function (e) {
          console.log('Radio', 'play promise error:', e.message);
        });
      }
    }
    function stop() {
      if (hls) {
        hls.destroy();
        hls = false;
      }
      audio.src = '';
    }
    function createWave() {
      var box = html.find('.radio-player__wave');
      for (var i = 0; i < 15; i++) {
        var div = document.createElement('div');
        box.append(div);
      }
      changeWave('loading');
    }
    function changeWave(class_name) {
      var lines = html.find('.radio-player__wave').querySelectorAll('div');
      for (var i = 0; i < lines.length; i++) {
        lines[i].removeClass('play loading').addClass(class_name);
        lines[i].style['animation-duration'] = (class_name == 'loading' ? 400 : 200 + Math.random() * 200) + 'ms';
        lines[i].style['animation-delay'] = (class_name == 'loading' ? Math.round(400 / lines.length * i) : 0) + 'ms';
      }
    }
    this.create = function () {
      var cover = Lampa.Template.js('radio_cover');
      cover.find('.radio-cover__title').text(station.title || '');
      cover.find('.radio-cover__tooltip').text(station.tooltip || '');
      var img_box = cover.find('.radio-cover__img-box');
      var img_elm = img_box.find('img');
      img_box.removeClass('loaded loaded-icon');
      img_elm.onload = function () {
        img_box.addClass('loaded');
      };
      img_elm.onerror = function () {
        img_elm.src = './img/icons/menu/movie.svg';
        img_box.addClass('loaded-icon');
      };
      img_elm.src = station.bg_image_mobile;
      html.find('.radio-player__cover').append(cover);
      html.find('.radio-player__close').on('click', function () {
        window.history.back();
      });
      document.body.append(html);
      createWave();
      prepare();
    };
    this.destroy = function () {
      stop();
      clearInterval(screenreset);
      html.remove();
    };
  }

  function Component() {
    var _this6 = this;
    var last,
      scroll,
      played,
      filtred = [],
      page = 0;
    var html = document.createElement('div');
    var img_bg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAZCAYAAABD2GxlAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHASURBVHgBlZaLrsMgDENXxAf3/9XHFdXNZLm2YZHQymPk4CS0277v9+ffrut62nEcn/M8nzb69cxj6le1+75f/RqrZ9fatm3F9wwMR7yhawilNke4Gis/7j9srQbdaVFBnkcQ1WrfgmIIBcTrvgqqsKiTzvpOQbUnAykVW4VVqZXyyDllYFSKx9QaVrO7nGJIB63g+FAq/xhcHWBYdwCsmAtvFZUKE0MlVZWCT4idOlyhTp3K35R/6Nzlq0uBnsKWlEzgSh1VGJxv6rmpXMO7EK+XWUPnDFRWqitQFeY2UyZVryuWlI8ulLgGf19FooAUwC9gCWLcwzWPb7Wa60qdlZxjx6ooUuUqVQsK+y1VoAJyBeJAVsLJeYmg/RIXdG2kPhwYPBUQQyYF0XC8lwP3MTCrYAXB88556peCbUUZV7WccwkUQfCZC4PXdA5hKhSVhythZqjZM0J39w5m8BRadKAcrsIpNZsLIYdOqcZ9hExhZ1MH+QL+ciFzXzmYhZr/M6yUUwp2dp5U4naZDwAF5JRSefdScJZ3SkU0nl8xpaAy+7ml1EqvMXSs1HRrZ9bc3eZUSXmGa/mdyjbmqyX7A9RaYQa9IRJ0AAAAAElFTkSuQmCC';
    this.create = function () {
      var _this = this;
      this.activity.loader(true);
      Api.list().then(function (result) {
        _this.data = result.result;
        filtred = _this.data.stations;
        _this.build();
      })["catch"](function (e) {
        console.log('Radio', 'error', e.message);
        _this.data = {
          stations: [],
          genre: []
        };
        _this.build();
      });
      return this.render();
    };
    this.background = function () {
      Lampa.Background.immediately(last ? last.background || img_bg : img_bg);
    };
    this.build = function () {
      var _this2 = this;
      this.activity.loader(false);
      console.log('Radio', 'build start');
      html.append(Lampa.Template.js('radio_content'));
      scroll = new Lampa.Scroll({
        mask: true,
        over: true
      });
      scroll.onEnd = function () {
        page++;
        _this2.next();
      };
      html.find('.radio-content__list').append(scroll.render(true));
      html.find('.radio-content__cover').append(Lampa.Template.js('radio_cover'));
      scroll.minus(html.find('.radio-content__head'));
      console.log('Radio', 'build catalog');
      this.buildCatalog();
      console.log('Radio', 'build search');
      this.buildSearch();
      console.log('Radio', 'build add');
      this.buildAdd();
      console.log('Radio', 'display');
      this.display();
      Lampa.Layer.update(html);
    };
    this.clearButtons = function (category, search) {
      var btn_catalog = html.find('.button--catalog');
      var btn_search = html.find('.button--search');
      btn_catalog.find('div').addClass('hide').text('');
      btn_search.find('div').addClass('hide').text('');
      if (category) {
        btn_catalog.find('div').removeClass('hide').text(category);
      } else {
        btn_search.find('div').removeClass('hide').text(search);
      }
    };
    this.buildCatalog = function () {
      var _this3 = this;
      var btn = html.find('.button--catalog');
      var items = [];
      var favs = Favorites.get().length;
      console.log('Radio', 'loaded favorites', favs);
      items.push({
        title: Lampa.Lang.translate('settings_input_links'),
        ghost: !favs,
        noenter: !favs,
        favorite: true
      });
      console.log('Radio', 'build stations', this.data.stations.length);
      if (this.data.stations.length) {
        items.push({
          title: Lampa.Lang.translate('settings_param_jackett_interview_all'),
          all: true
        });
        if (this.data.genre) {
          this.data.genre.forEach(function (g) {
            items.push({
              title: g.name,
              id: g.id
            });
          });
        }
      }
      console.log('Radio', 'build favorites');
      if (favs) {
        filtred = Favorites.get();
        this.clearButtons(items[0].title, false);
      }
      btn.on('hover:enter', function () {
        Lampa.Select.show({
          title: Lampa.Lang.translate('title_catalog'),
          items: items,
          onSelect: function onSelect(a) {
            if (a.favorite) {
              filtred = Favorites.get();
            } else if (a.all) filtred = _this3.data.stations;else {
              filtred = _this3.data.stations.filter(function (s) {
                return s.genre.find(function (g) {
                  return g.id == a.id;
                });
              });
            }
            _this3.clearButtons(a.title, false);
            _this3.display();
          },
          onBack: function onBack() {
            Lampa.Controller.toggle('content');
          }
        });
      });
    };
    this.buildAdd = function () {
      var _this4 = this;
      var btn = html.find('.button--add');
      btn.on('hover:enter', function () {
        Lampa.Input.edit({
          title: Lampa.Lang.translate('radio_add_station'),
          free: true,
          nosave: true,
          nomic: true,
          value: ''
        }, function (url) {
          if (url) {
            Favorites.add({
              user: true,
              stream: url,
              title: Lampa.Lang.translate('radio_station')
            });
            filtred = Favorites.get();
            _this4.clearButtons(Lampa.Lang.translate('settings_input_links'), false);
            _this4.display();
          } else {
            Lampa.Controller.toggle('content');
          }
        });
      });
    };
    this.buildSearch = function () {
      var _this5 = this;
      var btn = html.find('.button--search');
      btn.on('hover:enter', function () {
        Lampa.Input.edit({
          free: true,
          nosave: true,
          nomic: true,
          value: ''
        }, function (val) {
          if (val) {
            val = val.toLowerCase();
            filtred = _this5.data.stations.filter(function (s) {
              return s.title.toLowerCase().indexOf(val) >= 0 || s.tooltip.toLowerCase().indexOf(val) >= 0;
            });
            _this5.clearButtons(false, val);
            _this5.display();
          } else {
            Lampa.Controller.toggle('content');
          }
        });
      });
    };
    this.display = function () {
      scroll.clear();
      scroll.reset();
      last = false;
      page = 0;
      this.cover({
        title: '',
        tooltip: ''
      });
      if (filtred.length) this.next();else {
        for (var i = 0; i < 3; i++) {
          var empty = Lampa.Template.js('radio_list_item');
          empty.addClass('empty--item');
          empty.style.opacity = 1 - 0.3 * i;
          scroll.append(empty);
        }
        Lampa.Layer.visible(scroll.render(true));
      }
      this.activity.toggle();
    };
    this.next = function () {
      var views = 10;
      var start = page * views;
      filtred.slice(start, start + views).forEach(_this6.append.bind(_this6));
      Lampa.Layer.visible(scroll.render(true));
    };
    this.play = function (station) {
      played = station;
      var player = new Player(station);
      player.create();
      document.body.addClass('ambience--enable');
      var move = function move(d) {
        var pos = filtred.indexOf(played) + d;
        if (pos >= 0 && pos <= filtred.length) {
          player.destroy();
          _this6.play(filtred[pos]);
        }
      };
      Lampa.Background.change(station.bg_image_mobile || img_bg);
      Lampa.Controller.add('content', {
        invisible: true,
        toggle: function toggle() {
          Lampa.Controller.clear();
        },
        back: function back() {
          document.body.removeClass('ambience--enable');
          player.destroy();
          _this6.activity.toggle();
        },
        up: function up() {
          move(-1);
        },
        down: function down() {
          move(1);
        }
      });
      Lampa.Controller.toggle('content');
    };
    this.append = function (station) {
      var _this7 = this;
      var item = Lampa.Template.js('radio_list_item');
      item.find('.radio-item__num').text((filtred.indexOf(station) + 1).pad(2));
      item.find('.radio-item__title').text(station.title);
      item.find('.radio-item__tooltip').text(station.tooltip || station.stream);
      item.background = station.bg_image_mobile || img_bg;
      var img_box = item.find('.radio-item__cover-box');
      var img_elm = item.find('img');
      img_elm.onload = function () {
        img_box.addClass('loaded');
      };
      img_elm.onerror = function () {
        img_elm.src = './img/icons/menu/movie.svg';
        img_box.addClass('loaded-icon');
      };
      img_elm.src = station.bg_image_mobile;
      item.on('hover:focus hover:hover', function () {
        _this7.cover(station);
        if (item.background) Lampa.Background.change(item.background);else _this7.background();
        last = item;
      });
      item.on('hover:focus', function () {
        scroll.update(item);
      });
      item.on('hover:enter', function () {
        _this7.play(station);
      });
      item.on('hover:long', function () {
        if (station.user) {
          Lampa.Select.show({
            title: Lampa.Lang.translate('menu_settings'),
            items: [{
              title: Lampa.Lang.translate('extensions_change_name'),
              change: 'title'
            }, {
              title: Lampa.Lang.translate('extensions_change_link'),
              change: 'stream'
            }, {
              title: Lampa.Lang.translate('extensions_remove'),
              remove: true
            }],
            onSelect: function onSelect(a) {
              if (a.remove) {
                Favorites.remove(station);
                item.remove();
                last = false;
                Lampa.Controller.toggle('content');
              } else {
                Lampa.Input.edit({
                  free: true,
                  nosave: true,
                  nomic: true,
                  value: station[a.change] || ''
                }, function (val) {
                  if (val) {
                    station[a.change] = val;
                    Favorites.update(station);
                    _this7.cover(station);
                    item.find('.radio-item__' + (a.change == 'title' ? 'title' : 'tooltip')).text(val);
                  }
                  Lampa.Controller.toggle('content');
                });
              }
            },
            onBack: function onBack() {
              Lampa.Controller.toggle('content');
            }
          });
        } else {
          Favorites.toggle(station);
          item.toggleClass('favorite', Boolean(Favorites.find(station)));
        }
      });
      item.toggleClass('favorite', Boolean(Favorites.find(station)));
      if (!last) last = item;
      if (Lampa.Controller.own(this)) Lampa.Controller.collectionAppend(item);
      scroll.append(item);
    };
    this.cover = function (station) {
      html.find('.radio-cover__title').text(station.title || '');
      html.find('.radio-cover__tooltip').text(station.tooltip || '');
      var img_box = html.find('.radio-cover__img-box');
      var img_elm = img_box.find('img');
      img_box.removeClass('loaded loaded-icon');
      img_elm.onload = function () {
        img_box.addClass('loaded');
      };
      img_elm.onerror = function () {
        img_elm.src = './img/icons/menu/movie.svg';
        img_box.addClass('loaded-icon');
      };
      img_elm.src = station.bg_image_mobile;
    };
    this.start = function () {
      if (Lampa.Activity.active() && Lampa.Activity.active().activity !== this.activity) return;
      this.background();
      Lampa.Controller.add('content', {
        link: this,
        invisible: true,
        toggle: function toggle() {
          Lampa.Controller.collectionSet(html);
          Lampa.Controller.collectionFocus(last, html);
        },
        left: function left() {
          if (Navigator.canmove('left')) Navigator.move('left');else Lampa.Controller.toggle('menu');
        },
        right: function right() {
          Navigator.move('right');
        },
        up: function up() {
          if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
        },
        down: function down() {
          Navigator.move('down');
        },
        back: function back() {
          Lampa.Activity.backward();
        }
      });
      Lampa.Controller.toggle('content');
    };
    this.pause = function () {};
    this.stop = function () {};
    this.render = function () {
      return html;
    };
    this.destroy = function () {
      if (scroll) scroll.destroy();
      html.remove();
    };
  }

  function startPlugin() {
    window.plugin_record_ready = true;
    Lampa.Lang.add({
      radio_station: {
        ru: 'Радиостанция',
        en: 'Radio station',
        uk: 'Радіостанція',
        be: 'Радыёстанцыя',
        zh: '广播电台',
        pt: 'Estação de rádio',
        bg: 'Радиостанция'
      },
      radio_add_station: {
        ru: 'Введите адрес радиостанции',
        en: 'Enter the address of the radio station',
        uk: 'Введіть адресу радіостанції',
        be: 'Увядзіце адрас радыёстанцыі',
        zh: '输入电台地址',
        pt: 'Digite o endereço da estação de rádio',
        bg: 'Въведете адреса на радиостанцията'
      },
      radio_load_error: {
        ru: 'Ошибка в загрузке потока',
        en: 'Error in stream loading',
        uk: 'Помилка завантаження потоку',
        be: 'Памылка ў загрузцы патоку',
        zh: '流加载错误',
        pt: 'Erro ao carregar a transmissão',
        bg: 'Грешка при зареждане на потока'
      }
    });
    var manifest = {
      type: 'audio',
      version: '1.1.1',
      name: Lampa.Lang.translate('radio_station'),
      description: '',
      component: 'radio'
    };
    Lampa.Manifest.plugins = manifest;
    Lampa.Template.add('radio_content', "\n        <div class=\"radio-content\">\n            <div class=\"radio-content__head\">\n                <div class=\"simple-button simple-button--invisible simple-button--filter selector button--catalog\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" xml:space=\"preserve\">\n                        <path fill=\"currentColor\" d=\"M478.354,146.286H33.646c-12.12,0-21.943,9.823-21.943,21.943v321.829c0,12.12,9.823,21.943,21.943,21.943h444.709\n                            c12.12,0,21.943-9.823,21.943-21.943V168.229C500.297,156.109,490.474,146.286,478.354,146.286z M456.411,468.114H55.589V190.171\n                            h400.823V468.114z\"/>\n                        <path fill=\"currentColor\" d=\"M441.783,73.143H70.217c-12.12,0-21.943,9.823-21.943,21.943c0,12.12,9.823,21.943,21.943,21.943h371.566\n                            c12.12,0,21.943-9.823,21.943-21.943C463.726,82.966,453.903,73.143,441.783,73.143z\"/>\n                        <path fill=\"currentColor\" d=\"M405.211,0H106.789c-12.12,0-21.943,9.823-21.943,21.943c0,12.12,9.823,21.943,21.943,21.943h298.423\n                            c12.12,0,21.943-9.823,21.943-21.943C427.154,9.823,417.331,0,405.211,0z\"/>\n                    </svg>\n                    <div class=\"hide\"></div>\n                </div>\n                <div class=\"simple-button simple-button--invisible simple-button--filter selector button--add\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\"  viewBox=\"0 0 512 512\" xml:space=\"preserve\">\n                        <path d=\"M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.853 256-256S397.167 0 256 0zm0 472.341c-119.275 0-216.341-97.046-216.341-216.341S136.725 39.659 256 39.659 472.341 136.705 472.341 256 375.295 472.341 256 472.341z\" fill=\"currentColor\"></path>\n                        <path d=\"M355.148 234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83 8.884-19.83 19.83v79.318h-79.318c-10.966 0-19.83 8.884-19.83 19.83s8.864 19.83 19.83 19.83h79.318v79.318c0 10.946 8.864 19.83 19.83 19.83s19.83-8.884 19.83-19.83v-79.318h79.318c10.966 0 19.83-8.884 19.83-19.83s-8.864-19.83-19.83-19.83z\" fill=\"currentColor\"></path>\n                    </svg>\n                </div>\n                <div class=\"simple-button simple-button--invisible simple-button--filter selector button--search\">\n                    <svg width=\"23\" height=\"22\" viewBox=\"0 0 23 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\">\n                        <circle cx=\"9.9964\" cy=\"9.63489\" r=\"8.43556\" stroke=\"currentColor\" stroke-width=\"2.4\"></circle>\n                        <path d=\"M20.7768 20.4334L18.2135 17.8701\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"></path>\n                    </svg>\n                    <div class=\"hide\"></div>\n                </div>\n            </div>\n            <div class=\"radio-content__body\">\n                <div class=\"radio-content__list\"></div>\n                <div class=\"radio-content__cover\"></div>\n            </div>\n        </div>\n    ");
    Lampa.Template.add('radio_cover', "\n        <div class=\"radio-cover\">\n            <div class=\"radio-cover__img-container\">\n                <div class=\"radio-cover__img-box\">\n                    <img src=\"https://www.radiorecord.ru/upload/iblock/507/close-up-image-fresh-spring-green-grass1.jpg\" />\n                </div>\n            </div>\n\n            <div class=\"radio-cover__title\"></div>\n            <div class=\"radio-cover__tooltip\"></div>\n        </div>\n    ");
    Lampa.Template.add('radio_list_item', "\n        <div class=\"radio-item selector layer--visible\">\n            <div class=\"radio-item__num\"></div>\n            <div class=\"radio-item__cover\">\n                <div class=\"radio-item__cover-box\">\n                    <img />\n                </div>\n            </div>\n            <div class=\"radio-item__body\">\n                <div class=\"radio-item__title\"></div>\n                <div class=\"radio-item__tooltip\"></div>\n            </div>\n            <div class=\"radio-item__icons\">\n                <div class=\"radio-item__icon-favorite\">\n                    <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 477.534 477.534\" xml:space=\"preserve\">\n                        <path fill=\"currentColor\" d=\"M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909\n                            l-8.431-8.909C181.284,5.762,98.662,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778\n                            c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654\n                            c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z M413.787,234.226h-0.017\n                            L238.802,418.768L63.818,234.226c-39.78-42.916-39.78-109.233,0-152.149c36.125-39.154,97.152-41.609,136.306-5.484\n                            c1.901,1.754,3.73,3.583,5.484,5.484l20.804,21.948c6.856,6.812,17.925,6.812,24.781,0l20.804-21.931\n                            c36.125-39.154,97.152-41.609,136.306-5.484c1.901,1.754,3.73,3.583,5.484,5.484C453.913,125.078,454.207,191.516,413.787,234.226\n                            z\"/>\n                    </svg>\n                </div>\n                <div class=\"radio-item__icon-play\">\n                    <svg width=\"22\" height=\"25\" viewBox=\"0 0 22 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path d=\"M21 10.7679C22.3333 11.5377 22.3333 13.4622 21 14.232L3.75 24.1913C2.41666 24.9611 0.75 23.9989 0.75 22.4593L0.750001 2.5407C0.750001 1.0011 2.41667 0.0388526 3.75 0.808653L21 10.7679Z\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n            </div>\n        </div>\n    ");
    Lampa.Template.add('radio_player', "\n        <div class=\"radio-player\">\n            <div>\n                <div class=\"radio-player__cover\"></div>\n                <div class=\"radio-player__wave\"></div>\n            </div>\n            <div class=\"radio-player__close\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 329.269 329\" xml:space=\"preserve\">\n                    <path d=\"M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.273 21.273 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0\" fill=\"currentColor\"></path>\n                </svg>\n            </div>\n        </div>\n    ");
    Lampa.Template.add('radio_style', "\n        <style>\n        .radio-content{padding:0 1.5em}.radio-content__head{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:1.5em 0}.radio-content__body{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.radio-content__list{width:60%}@media screen and (max-width:576px){.radio-content__list{width:100%}}.radio-content__cover{width:40%;padding:0 2em}@media screen and (max-width:576px){.radio-content__cover{display:none}}.radio-cover{text-align:center;line-height:1.4}.radio-cover__img-container{max-width:20em;margin:0 auto}.radio-cover__img-box{position:relative;padding-bottom:100%;background-color:rgba(0,0,0,0.3);-webkit-border-radius:1em;border-radius:1em}.radio-cover__img-box>img{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-border-radius:1em;border-radius:1em;opacity:0}.radio-cover__img-box.loaded{background-color:transparent}.radio-cover__img-box.loaded>img{opacity:1}.radio-cover__img-box.loaded-icon{background-color:rgba(0,0,0,0.3)}.radio-cover__img-box.loaded-icon>img{left:20%;top:20%;width:60%;height:60%;opacity:.2}.radio-cover__title{font-weight:700;font-size:1.5em;margin-top:1em}.radio-cover__tooltip{font-weight:300;font-size:1.3em;margin-top:.2em}.radio-item{padding:1em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;line-height:1.4}.radio-item__num{font-weight:700;margin-right:1em;font-size:1.3em;opacity:.4;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}@media screen and (max-width:400px){.radio-item__num{display:none}}.radio-item__body{max-width:60%}.radio-item__cover{width:5em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin-right:2em}.radio-item__cover-box{position:relative;padding-bottom:100%;background-color:rgba(0,0,0,0.3);-webkit-border-radius:1em;border-radius:1em}.radio-item__cover-box>img{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-border-radius:1em;border-radius:1em;opacity:0}.radio-item__cover-box.loaded{background-color:transparent}.radio-item__cover-box.loaded>img{opacity:1}.radio-item__cover-box.loaded-icon{background-color:rgba(0,0,0,0.3)}.radio-item__cover-box.loaded-icon>img{left:20%;top:20%;width:60%;height:60%;opacity:.2}.radio-item__title{font-weight:700;font-size:1.2em}.radio-item__tooltip{opacity:.5;margin-top:.5em;font-size:1.1em}.radio-item__icons{margin-left:auto;padding-left:1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.radio-item__icons svg{width:1.4em !important;height:1.4em !important}.radio-item__icons>*+*{margin-left:1.5em}.radio-item__icons .radio-item__icon-favorite{display:none}.radio-item__icons .radio-item__icon-play{display:none}.radio-item.focus{background:#fff;color:#000;-webkit-border-radius:1em;border-radius:1em}.radio-item.focus .radio-item__icon-play{display:block}.radio-item.favorite .radio-item__icon-favorite{display:block}.radio-item.empty--item .radio-item__title,.radio-item.empty--item .radio-item__num,.radio-item.empty--item .radio-item__tooltip{background-color:rgba(255,255,255,0.3);height:1.2em;-webkit-border-radius:.3em;border-radius:.3em}.radio-item.empty--item .radio-item__num{width:1.4em}.radio-item.empty--item .radio-item__title{width:7em}.radio-item.empty--item .radio-item__tooltip{width:16em}.radio-item.empty--item .radio-item__icons{display:none}.radio-item.empty--item .radio-item__cover-box{background-color:rgba(255,255,255,0.3)}.radio-item.empty--item.focus{background-color:transparent;color:#fff}.radio-player{position:fixed;z-index:100;left:0;top:0;width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.radio-player__cover{width:30em}.radio-player__wave{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;margin-top:2em}.radio-player__wave>div{width:2px;background-color:#fff;margin:0 .3em;height:1em;opacity:0}.radio-player__wave>div.loading{-webkit-animation:radioAnimationWaveLoading 400ms ease infinite;animation:radioAnimationWaveLoading 400ms ease infinite}.radio-player__wave>div.play{-webkit-animation:radioAnimationWavePlay 50ms linear infinite alternate;animation:radioAnimationWavePlay 50ms linear infinite alternate}.radio-player__close{position:fixed;top:1.5em;right:50%;margin-right:-2em;-webkit-border-radius:100%;border-radius:100%;padding:1em;display:none;background-color:rgba(255,255,255,0.1)}.radio-player__close>svg{width:1.5em;height:1.5em}body.true--mobile .radio-player__close{display:block}@-webkit-keyframes radioAnimationWaveLoading{0%{-webkit-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:1}10%{-webkit-transform:scale3d(1,1.5,1);transform:scale3d(1,1.5,1);opacity:1}20%{-webkit-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:1}100%{-webkit-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:1}}@keyframes radioAnimationWaveLoading{0%{-webkit-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:1}10%{-webkit-transform:scale3d(1,1.5,1);transform:scale3d(1,1.5,1);opacity:1}20%{-webkit-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:1}100%{-webkit-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:1}}@-webkit-keyframes radioAnimationWavePlay{0%{-webkit-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:.3}100%{-webkit-transform:scale3d(1,2,1);transform:scale3d(1,2,1);opacity:1}}@keyframes radioAnimationWavePlay{0%{-webkit-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:.3}100%{-webkit-transform:scale3d(1,2,1);transform:scale3d(1,2,1);opacity:1}}\n        </style>\n    ");
    function add() {
      var button = $("<li class=\"menu__item selector\">\n            <div class=\"menu__ico\">\n                <svg width=\"38\" height=\"31\" viewBox=\"0 0 38 31\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"17.613\" width=\"3\" height=\"16.3327\" rx=\"1.5\" transform=\"rotate(63.4707 17.613 0)\" fill=\"currentColor\"/>\n                    <circle cx=\"13\" cy=\"19\" r=\"6\" fill=\"currentColor\"/>\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 11C0 8.79086 1.79083 7 4 7H34C36.2091 7 38 8.79086 38 11V27C38 29.2091 36.2092 31 34 31H4C1.79083 31 0 29.2091 0 27V11ZM21 19C21 23.4183 17.4183 27 13 27C8.58173 27 5 23.4183 5 19C5 14.5817 8.58173 11 13 11C17.4183 11 21 14.5817 21 19ZM30.5 18C31.8807 18 33 16.8807 33 15.5C33 14.1193 31.8807 13 30.5 13C29.1193 13 28 14.1193 28 15.5C28 16.8807 29.1193 18 30.5 18Z\" fill=\"currentColor\"/>\n                </svg>\n            </div>\n            <div class=\"menu__text\">".concat(manifest.name, "</div>\n        </li>"));
      button.on('hover:enter', function () {
        Lampa.Activity.push({
          url: '',
          title: manifest.name,
          component: 'radio',
          page: 1
        });
      });
      $('.menu .menu__list').eq(0).append(button);
      $('body').append(Lampa.Template.get('radio_style', {}, true));
    }
    Lampa.Component.add('radio', Component);
    if (window.appready) add();else {
      Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') add();
      });
    }
  }
  if (!window.plugin_record_ready) startPlugin();

})();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkLmpzIiwic291cmNlcyI6WyJyZWNvcmQvdXRpbHMvYXBpLmpzIiwicmVjb3JkL3V0aWxzL2Zhdm9yaXRlcy5qcyIsInJlY29yZC91dGlscy9wbGF5ZXIuanMiLCJyZWNvcmQvY29tcG9uZW50LmpzIiwicmVjb3JkL3JlY29yZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcGl7XG4gICAgc3RhdGljIG5ldHdvcmsgPSBuZXcgTGFtcGEuUmVndWVzdCgpXG4gICAgc3RhdGljIGFwaV91cmwgPSAnaHR0cHM6Ly93d3cucmFkaW9yZWNvcmQucnUvYXBpL3N0YXRpb25zLydcblxuICAgIHN0YXRpYyBsaXN0KCl7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgdGhpcy5uZXR3b3JrLm5hdGl2ZSh0aGlzLmFwaV91cmwsKHJlc3VsdCk9PntcbiAgICAgICAgICAgICAgICBMYW1wYS5DYWNoZS5yZXdyaXRlRGF0YSgnb3RoZXInLCAncmFkaW9fcmVjb3JkX2xpc3QnLHJlc3VsdCkuZmluYWxseShyZXNvbHZlLmJpbmQocmVzb2x2ZSxyZXN1bHQpKVxuICAgICAgICAgICAgfSwoKT0+e1xuICAgICAgICAgICAgICAgIExhbXBhLkNhY2hlLmdldERhdGEoJ290aGVyJywgJ3JhZGlvX3JlY29yZF9saXN0JykudGhlbihyZXNvbHZlKS5jYXRjaChyZWplY3QpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBpIiwiY2xhc3MgRmF2b3JpdGVze1xuICAgIHN0YXRpYyBnZXQoKXtcbiAgICAgICAgbGV0IGFsbCA9IExhbXBhLlN0b3JhZ2UuZ2V0KCdyYWRpb19mYXZvcml0ZV9zdGF0aW9ucycsJ1tdJylcblxuICAgICAgICBhbGwuc29ydCgoYSxiKT0+e1xuICAgICAgICAgICAgcmV0dXJuIGEuYWRkZWQgPiBiLmFkZGVkID8gLTEgOiBhLmFkZGVkIDwgYi5hZGRlZCA/IDEgOiAwXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIGFsbFxuICAgIH1cblxuICAgIHN0YXRpYyBmaW5kKGZhdm9yaXRlKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCkuZmluZChhPT5hLmlkID09IGZhdm9yaXRlLmlkKVxuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmUoZmF2b3JpdGUpe1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuZ2V0KClcbiAgICAgICAgbGV0IGZpbmQgPSB0aGlzLmZpbmQoZmF2b3JpdGUpXG5cbiAgICAgICAgaWYoZmluZCl7XG4gICAgICAgICAgICBMYW1wYS5BcnJheXMucmVtb3ZlKGxpc3QsIGZpbmQpXG5cbiAgICAgICAgICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdyYWRpb19mYXZvcml0ZV9zdGF0aW9ucycsIGxpc3QpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkKGZhdm9yaXRlKXtcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmdldCgpXG4gICAgICAgIGxldCBmaW5kID0gdGhpcy5maW5kKGZhdm9yaXRlKVxuXG4gICAgICAgIGlmKCFmaW5kKXtcbiAgICAgICAgICAgIExhbXBhLkFycmF5cy5leHRlbmQoZmF2b3JpdGUse1xuICAgICAgICAgICAgICAgIGlkOiBMYW1wYS5VdGlscy51aWQoKSxcbiAgICAgICAgICAgICAgICBhZGRlZDogRGF0ZS5ub3coKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgbGlzdC5wdXNoKGZhdm9yaXRlKVxuXG4gICAgICAgICAgICBMYW1wYS5TdG9yYWdlLnNldCgncmFkaW9fZmF2b3JpdGVfc3RhdGlvbnMnLCBsaXN0KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHVwZGF0ZShmYXZvcml0ZSl7XG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5nZXQoKVxuICAgICAgICBsZXQgZmluZCA9IHRoaXMuZmluZChmYXZvcml0ZSlcblxuICAgICAgICBpZihmaW5kKXtcbiAgICAgICAgICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdyYWRpb19mYXZvcml0ZV9zdGF0aW9ucycsIGxpc3QpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgdG9nZ2xlKGZhdm9yaXRlKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZChmYXZvcml0ZSkgPyB0aGlzLnJlbW92ZShmYXZvcml0ZSkgOiB0aGlzLmFkZChmYXZvcml0ZSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZhdm9yaXRlcyIsImZ1bmN0aW9uIFBsYXllcihzdGF0aW9uKXtcbiAgICBsZXQgaHRtbCAgID0gTGFtcGEuVGVtcGxhdGUuanMoJ3JhZGlvX3BsYXllcicpXG4gICAgbGV0IGF1ZGlvICA9IG5ldyBBdWRpbygpXG4gICAgbGV0IHVybCAgICA9IHN0YXRpb24uc3RyZWFtXzMyMCA/IHN0YXRpb24uc3RyZWFtXzMyMCA6IHN0YXRpb24uc3RyZWFtXzEyOCA/IHN0YXRpb24uc3RyZWFtXzEyOCA6IHN0YXRpb24uc3RyZWFtID8gc3RhdGlvbi5zdHJlYW0gOiBzdGF0aW9uLnN0cmVhbV9obHMgPyBzdGF0aW9uLnN0cmVhbV9obHMucmVwbGFjZSgncGxheWxpc3QubTN1OCcsJzk2L3BsYXlsaXN0Lm0zdTgnKSA6ICcnXG4gICAgbGV0IGhsc1xuXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcihcInBsYXlpbmdcIiwgZXZlbnQgPT4ge1xuICAgICAgICBjaGFuZ2VXYXZlKCdwbGF5JylcbiAgICB9KVxuXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcihcIndhaXRpbmdcIiwgZXZlbnQgPT4ge1xuICAgICAgICBjaGFuZ2VXYXZlKCdsb2FkaW5nJylcbiAgICB9KVxuXG4gICAgbGV0IHNjcmVlbnJlc2V0ID0gc2V0SW50ZXJ2YWwoKCk9PntcbiAgICAgICAgTGFtcGEuU2NyZWVuc2F2ZXIucmVzZXRUaW1lcigpXG4gICAgfSwgMTAwMClcblxuICAgIGZ1bmN0aW9uIHByZXBhcmUoKXtcbiAgICAgICAgaWYoYXVkaW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJykgfHwgdXJsLmluZGV4T2YoJy5hYWNwJykgPiAwIHx8IHN0YXRpb24uc3RyZWFtKSBsb2FkKClcbiAgICAgICAgZWxzZSBpZiAoSGxzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICBobHMgPSBuZXcgSGxzKClcbiAgICAgICAgICAgICAgICBobHMuYXR0YWNoTWVkaWEoYXVkaW8pXG4gICAgICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2UodXJsKVxuICAgICAgICAgICAgICAgIGhscy5vbihIbHMuRXZlbnRzLkVSUk9SLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpe1xuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmRldGFpbHMgPT09IEhscy5FcnJvckRldGFpbHMuTUFOSUZFU1RfUEFSU0lOR19FUlJPUil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhLnJlYXNvbiA9PT0gXCJubyBFWFRNM1UgZGVsaW1pdGVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Ob3R5LnNob3coTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3JhZGlvX2xvYWRfZXJyb3InKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgaGxzLm9uKEhscy5FdmVudHMuTUFOSUZFU1RfTE9BREVELCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBzdGFydCgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoKGUpe1xuICAgICAgICAgICAgICAgIExhbXBhLk5vdHkuc2hvdyhMYW1wYS5MYW5nLnRyYW5zbGF0ZSgncmFkaW9fbG9hZF9lcnJvcicpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgbG9hZCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZCgpe1xuICAgICAgICBhdWRpby5zcmMgPSB1cmxcblxuICAgICAgICBhdWRpby5sb2FkKClcblxuICAgICAgICBzdGFydCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RhcnQoKXtcbiAgICAgICAgdmFyIHBsYXlQcm9taXNlO1xuICAgIFxuICAgICAgICB0cnl7XG4gICAgICAgICAgICBwbGF5UHJvbWlzZSA9IGF1ZGlvLnBsYXkoKVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoKGUpeyB9XG4gICAgXG4gICAgICAgIGlmIChwbGF5UHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwbGF5UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1JhZGlvJywnc3RhcnQgcGxhaW5pbmcnKVxuXG4gICAgICAgICAgICAgICAgY2hhbmdlV2F2ZSgncGxheScpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSYWRpbycsJ3BsYXkgcHJvbWlzZSBlcnJvcjonLCBlLm1lc3NhZ2UpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0b3AoKXtcbiAgICAgICAgaWYoaGxzKXtcbiAgICAgICAgICAgIGhscy5kZXN0cm95KClcbiAgICAgICAgICAgIGhscyA9IGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBhdWRpby5zcmMgPSAnJ1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVdhdmUoKXtcbiAgICAgICAgbGV0IGJveCA9IGh0bWwuZmluZCgnLnJhZGlvLXBsYXllcl9fd2F2ZScpXG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDE1OyBpKyspe1xuICAgICAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgICAgICAgICAgIGJveC5hcHBlbmQoZGl2KVxuICAgICAgICB9XG5cbiAgICAgICAgY2hhbmdlV2F2ZSgnbG9hZGluZycpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hhbmdlV2F2ZShjbGFzc19uYW1lKXtcbiAgICAgICAgbGV0IGxpbmVzID0gaHRtbC5maW5kKCcucmFkaW8tcGxheWVyX193YXZlJykucXVlcnlTZWxlY3RvckFsbCgnZGl2JylcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgbGluZXNbaV0ucmVtb3ZlQ2xhc3MoJ3BsYXkgbG9hZGluZycpLmFkZENsYXNzKGNsYXNzX25hbWUpXG5cbiAgICAgICAgICAgIGxpbmVzW2ldLnN0eWxlWydhbmltYXRpb24tZHVyYXRpb24nXSA9IChjbGFzc19uYW1lID09ICdsb2FkaW5nJyA/IDQwMCA6IDIwMCArIE1hdGgucmFuZG9tKCkgKiAyMDApICsgJ21zJ1xuICAgICAgICAgICAgbGluZXNbaV0uc3R5bGVbJ2FuaW1hdGlvbi1kZWxheSddICAgID0gKGNsYXNzX25hbWUgPT0gJ2xvYWRpbmcnID8gTWF0aC5yb3VuZCg0MDAgLyBsaW5lcy5sZW5ndGggKiBpKSA6IDApICsgJ21zJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbigpe1xuICAgICAgICBsZXQgY292ZXIgPSBMYW1wYS5UZW1wbGF0ZS5qcygncmFkaW9fY292ZXInKVxuXG4gICAgICAgIGNvdmVyLmZpbmQoJy5yYWRpby1jb3Zlcl9fdGl0bGUnKS50ZXh0KHN0YXRpb24udGl0bGUgfHwgJycpXG4gICAgICAgIGNvdmVyLmZpbmQoJy5yYWRpby1jb3Zlcl9fdG9vbHRpcCcpLnRleHQoc3RhdGlvbi50b29sdGlwIHx8ICcnKVxuXG4gICAgICAgIGxldCBpbWdfYm94ID0gY292ZXIuZmluZCgnLnJhZGlvLWNvdmVyX19pbWctYm94JylcbiAgICAgICAgbGV0IGltZ19lbG0gPSBpbWdfYm94LmZpbmQoJ2ltZycpXG5cbiAgICAgICAgaW1nX2JveC5yZW1vdmVDbGFzcygnbG9hZGVkIGxvYWRlZC1pY29uJylcblxuICAgICAgICBpbWdfZWxtLm9ubG9hZCA9ICgpPT57XG4gICAgICAgICAgICBpbWdfYm94LmFkZENsYXNzKCdsb2FkZWQnKVxuICAgICAgICB9XG5cbiAgICAgICAgaW1nX2VsbS5vbmVycm9yID0gKCk9PntcbiAgICAgICAgICAgIGltZ19lbG0uc3JjID0gJy4vaW1nL2ljb25zL21lbnUvbW92aWUuc3ZnJ1xuXG4gICAgICAgICAgICBpbWdfYm94LmFkZENsYXNzKCdsb2FkZWQtaWNvbicpXG4gICAgICAgIH1cblxuICAgICAgICBpbWdfZWxtLnNyYyA9IHN0YXRpb24uYmdfaW1hZ2VfbW9iaWxlXG5cbiAgICAgICAgaHRtbC5maW5kKCcucmFkaW8tcGxheWVyX19jb3ZlcicpLmFwcGVuZChjb3ZlcilcblxuICAgICAgICBodG1sLmZpbmQoJy5yYWRpby1wbGF5ZXJfX2Nsb3NlJykub24oJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpXG4gICAgICAgIH0pXG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoaHRtbClcblxuICAgICAgICBjcmVhdGVXYXZlKClcblxuICAgICAgICBwcmVwYXJlKClcbiAgICB9XG5cbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICBzdG9wKClcblxuICAgICAgICBjbGVhckludGVydmFsKHNjcmVlbnJlc2V0KVxuXG4gICAgICAgIGh0bWwucmVtb3ZlKClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllciIsImltcG9ydCBBcGkgZnJvbSAnLi91dGlscy9hcGknXG5pbXBvcnQgRmF2b3JpdGVzIGZyb20gJy4vdXRpbHMvZmF2b3JpdGVzJ1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3V0aWxzL3BsYXllcidcblxuZnVuY3Rpb24gQ29tcG9uZW50KCl7XG4gICAgbGV0IGxhc3QsIHNjcm9sbCwgcGxheWVkLCBmaWx0cmVkID0gW10sIHBhZ2UgPSAwXG4gICAgbGV0IGh0bWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gICAgbGV0IGltZ19iZyA9ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUNnQUFBQVpDQVlBQUFCRDJHeGxBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUFYTlNSMElBcnM0YzZRQUFBQVJuUVUxQkFBQ3hqd3Y4WVFVQUFBSEFTVVJCVkhnQmxaYUxyc01nREVOWHhBZjMvOVhIRmRYTlpMbTJZWkhReW1QazRDUzAyNzd2OStmZnJ1dDYybkVjbi9NOG56YjY5Y3hqNmxlMSs3NWYvUnFyWjlmYXRtM0Y5d3dNUjd5aGF3aWxOa2U0R2lzLzdqOXNyUWJkYVZGQm5rY1ExV3JmZ21JSUJjVHJ2Z3Fxc0tpVHp2cE9RYlVuQXlrVlc0VlZxWlh5eURsbFlGU0t4OVFhVnJPN25HSklCNjNnK0ZBcS94aGNIV0JZZHdDc21BdHZGWlVLRTBNbFZaV0NUNGlkT2x5aFRwM0szNVIvNk56bHEwdUJuc0tXbEV6Z1NoMVZHSnh2NnJtcFhNTzdFSytYV1VQbkRGUldxaXRRRmVZMlV5WlZyeXVXbEk4dWxMZ0dmMTlGb29BVXdDOWdDV0xjd3pXUGI3V2E2MHFkbFp4ang2b29VdVVxVlFzSyt5MVZvQUp5QmVKQVZzTEplWW1nL1JJWGRHMmtQaHdZUEJVUVF5WUYwWEM4bHdQM01UQ3JZQVhCODg1NTZwZUNiVVVaVjdXY2N3a1VRZkNaQzRQWGRBNWhLaFNWaHl0aFpxalpNMEozOXc1bThCUmFkS0FjcnNJcE5ac0xJWWRPcWNaOWhFeGhaMU1IK1FMK2NpRnpYem1ZaFpyL002eVVVd3AyZHA1VTRuYVpEd0FGNUpSU2VmZFNjSlozU2tVMG5sOHhwYUF5KzdtbDFFcXZNWFNzMUhSclo5YmMzZVpVU1htR2EvbWR5amJtcXlYN0E5UmFZUWE5SVJKMEFBQUFBRWxGVGtTdVFtQ0MnXG5cbiAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuYWN0aXZpdHkubG9hZGVyKHRydWUpXG5cbiAgICAgICAgQXBpLmxpc3QoKS50aGVuKHJlc3VsdD0+e1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzdWx0LnJlc3VsdFxuXG4gICAgICAgICAgICBmaWx0cmVkID0gdGhpcy5kYXRhLnN0YXRpb25zXG5cbiAgICAgICAgICAgIHRoaXMuYnVpbGQoKVxuICAgICAgICB9KS5jYXRjaCgoZSk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSYWRpbycsICdlcnJvcicsIGUubWVzc2FnZSlcblxuICAgICAgICAgICAgdGhpcy5kYXRhID0ge1xuICAgICAgICAgICAgICAgIHN0YXRpb25zOiBbXSxcbiAgICAgICAgICAgICAgICBnZW5yZTogW11cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5idWlsZCgpXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKCkgXG4gICAgfVxuXG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gZnVuY3Rpb24oKXtcbiAgICAgICAgTGFtcGEuQmFja2dyb3VuZC5pbW1lZGlhdGVseShsYXN0ID8gbGFzdC5iYWNrZ3JvdW5kIHx8IGltZ19iZyA6IGltZ19iZylcbiAgICB9XG5cbiAgICB0aGlzLmJ1aWxkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5hY3Rpdml0eS5sb2FkZXIoZmFsc2UpXG5cbiAgICAgICAgY29uc29sZS5sb2coJ1JhZGlvJywgJ2J1aWxkIHN0YXJ0JylcblxuICAgICAgICBodG1sLmFwcGVuZChMYW1wYS5UZW1wbGF0ZS5qcygncmFkaW9fY29udGVudCcpKVxuXG4gICAgICAgIHNjcm9sbCA9IG5ldyBMYW1wYS5TY3JvbGwoe21hc2s6IHRydWUsIG92ZXI6IHRydWV9KVxuXG4gICAgICAgIHNjcm9sbC5vbkVuZCA9ICgpPT57XG4gICAgICAgICAgICBwYWdlKytcblxuICAgICAgICAgICAgdGhpcy5uZXh0KClcbiAgICAgICAgfVxuXG4gICAgICAgIGh0bWwuZmluZCgnLnJhZGlvLWNvbnRlbnRfX2xpc3QnKS5hcHBlbmQoc2Nyb2xsLnJlbmRlcih0cnVlKSlcbiAgICAgICAgaHRtbC5maW5kKCcucmFkaW8tY29udGVudF9fY292ZXInKS5hcHBlbmQoTGFtcGEuVGVtcGxhdGUuanMoJ3JhZGlvX2NvdmVyJykpXG5cbiAgICAgICAgc2Nyb2xsLm1pbnVzKGh0bWwuZmluZCgnLnJhZGlvLWNvbnRlbnRfX2hlYWQnKSlcblxuICAgICAgICBjb25zb2xlLmxvZygnUmFkaW8nLCAnYnVpbGQgY2F0YWxvZycpXG5cbiAgICAgICAgdGhpcy5idWlsZENhdGFsb2coKVxuXG4gICAgICAgIGNvbnNvbGUubG9nKCdSYWRpbycsICdidWlsZCBzZWFyY2gnKVxuXG4gICAgICAgIHRoaXMuYnVpbGRTZWFyY2goKVxuXG4gICAgICAgIGNvbnNvbGUubG9nKCdSYWRpbycsICdidWlsZCBhZGQnKVxuXG4gICAgICAgIHRoaXMuYnVpbGRBZGQoKVxuXG4gICAgICAgIGNvbnNvbGUubG9nKCdSYWRpbycsICdkaXNwbGF5JylcblxuICAgICAgICB0aGlzLmRpc3BsYXkoKVxuXG4gICAgICAgIExhbXBhLkxheWVyLnVwZGF0ZShodG1sKVxuICAgIH1cblxuICAgIHRoaXMuY2xlYXJCdXR0b25zID0gZnVuY3Rpb24oY2F0ZWdvcnksIHNlYXJjaCl7XG4gICAgICAgIGxldCBidG5fY2F0YWxvZyA9IGh0bWwuZmluZCgnLmJ1dHRvbi0tY2F0YWxvZycpXG4gICAgICAgIGxldCBidG5fc2VhcmNoICA9IGh0bWwuZmluZCgnLmJ1dHRvbi0tc2VhcmNoJylcblxuICAgICAgICBidG5fY2F0YWxvZy5maW5kKCdkaXYnKS5hZGRDbGFzcygnaGlkZScpLnRleHQoJycpXG4gICAgICAgIGJ0bl9zZWFyY2guZmluZCgnZGl2JykuYWRkQ2xhc3MoJ2hpZGUnKS50ZXh0KCcnKVxuXG4gICAgICAgIGlmKGNhdGVnb3J5KXtcbiAgICAgICAgICAgIGJ0bl9jYXRhbG9nLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdoaWRlJykudGV4dChjYXRlZ29yeSlcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgYnRuX3NlYXJjaC5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnaGlkZScpLnRleHQoc2VhcmNoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5idWlsZENhdGFsb2cgPSBmdW5jdGlvbigpe1xuICAgICAgICBsZXQgYnRuICAgPSBodG1sLmZpbmQoJy5idXR0b24tLWNhdGFsb2cnKVxuICAgICAgICBsZXQgaXRlbXMgPSBbXVxuICAgICAgICBsZXQgZmF2cyAgPSBGYXZvcml0ZXMuZ2V0KCkubGVuZ3RoXG5cbiAgICAgICAgY29uc29sZS5sb2coJ1JhZGlvJywgJ2xvYWRlZCBmYXZvcml0ZXMnLCBmYXZzKVxuXG4gICAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdzZXR0aW5nc19pbnB1dF9saW5rcycpLFxuICAgICAgICAgICAgZ2hvc3Q6ICFmYXZzLFxuICAgICAgICAgICAgbm9lbnRlcjogIWZhdnMsXG4gICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnNvbGUubG9nKCdSYWRpbycsICdidWlsZCBzdGF0aW9ucycsIHRoaXMuZGF0YS5zdGF0aW9ucy5sZW5ndGgpXG5cbiAgICAgICAgaWYodGhpcy5kYXRhLnN0YXRpb25zLmxlbmd0aCl7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3NldHRpbmdzX3BhcmFtX2phY2tldHRfaW50ZXJ2aWV3X2FsbCcpLFxuICAgICAgICAgICAgICAgIGFsbDogdHJ1ZVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYodGhpcy5kYXRhLmdlbnJlKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuZ2VucmUuZm9yRWFjaChnPT57XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGcubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBnLmlkXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKCdSYWRpbycsICdidWlsZCBmYXZvcml0ZXMnKVxuXG4gICAgICAgIGlmKGZhdnMpe1xuICAgICAgICAgICAgZmlsdHJlZCA9IEZhdm9yaXRlcy5nZXQoKVxuXG4gICAgICAgICAgICB0aGlzLmNsZWFyQnV0dG9ucyhpdGVtc1swXS50aXRsZSwgZmFsc2UpXG4gICAgICAgIH1cblxuICAgICAgICBidG4ub24oJ2hvdmVyOmVudGVyJywoKT0+e1xuICAgICAgICAgICAgTGFtcGEuU2VsZWN0LnNob3coe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndGl0bGVfY2F0YWxvZycpLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBpdGVtcyxcbiAgICAgICAgICAgICAgICBvblNlbGVjdDogKGEpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKGEuZmF2b3JpdGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdHJlZCA9IEZhdm9yaXRlcy5nZXQoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoYS5hbGwpIGZpbHRyZWQgPSB0aGlzLmRhdGEuc3RhdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRyZWQgPSB0aGlzLmRhdGEuc3RhdGlvbnMuZmlsdGVyKHM9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcy5nZW5yZS5maW5kKGc9PmcuaWQgPT0gYS5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQnV0dG9ucyhhLnRpdGxlLCBmYWxzZSlcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25CYWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnY29udGVudCcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmJ1aWxkQWRkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0IGJ0biA9IGh0bWwuZmluZCgnLmJ1dHRvbi0tYWRkJylcblxuICAgICAgICBidG4ub24oJ2hvdmVyOmVudGVyJywoKT0+e1xuICAgICAgICAgICAgTGFtcGEuSW5wdXQuZWRpdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdyYWRpb19hZGRfc3RhdGlvbicpLFxuICAgICAgICAgICAgICAgIGZyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgbm9zYXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5vbWljOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnJ1xuICAgICAgICAgICAgfSwodXJsKT0+e1xuICAgICAgICAgICAgICAgIGlmKHVybCl7XG4gICAgICAgICAgICAgICAgICAgIEZhdm9yaXRlcy5hZGQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbTogdXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdyYWRpb19zdGF0aW9uJylcbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICBmaWx0cmVkID0gRmF2b3JpdGVzLmdldCgpXG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckJ1dHRvbnMoTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3NldHRpbmdzX2lucHV0X2xpbmtzJyksIGZhbHNlKVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdjb250ZW50JylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuYnVpbGRTZWFyY2ggPSBmdW5jdGlvbigpe1xuICAgICAgICBsZXQgYnRuID0gaHRtbC5maW5kKCcuYnV0dG9uLS1zZWFyY2gnKVxuXG4gICAgICAgIGJ0bi5vbignaG92ZXI6ZW50ZXInLCgpPT57XG4gICAgICAgICAgICBMYW1wYS5JbnB1dC5lZGl0KHtcbiAgICAgICAgICAgICAgICBmcmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5vc2F2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBub21pYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJydcbiAgICAgICAgICAgIH0sKHZhbCk9PntcbiAgICAgICAgICAgICAgICBpZih2YWwpe1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSB2YWwudG9Mb3dlckNhc2UoKVxuXG4gICAgICAgICAgICAgICAgICAgIGZpbHRyZWQgPSB0aGlzLmRhdGEuc3RhdGlvbnMuZmlsdGVyKHM9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzLnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih2YWwpID49IDAgfHwgcy50b29sdGlwLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih2YWwpID49IDBcbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQnV0dG9ucyhmYWxzZSwgdmFsKVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdjb250ZW50JylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZGlzcGxheSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHNjcm9sbC5jbGVhcigpXG4gICAgICAgIHNjcm9sbC5yZXNldCgpXG5cbiAgICAgICAgbGFzdCA9IGZhbHNlXG4gICAgICAgIHBhZ2UgPSAwXG5cbiAgICAgICAgdGhpcy5jb3Zlcih7XG4gICAgICAgICAgICB0aXRsZTogJycsXG4gICAgICAgICAgICB0b29sdGlwOiAnJ1xuICAgICAgICB9KVxuXG4gICAgICAgIGlmKGZpbHRyZWQubGVuZ3RoKSB0aGlzLm5leHQoKVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDM7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IGVtcHR5ID0gTGFtcGEuVGVtcGxhdGUuanMoJ3JhZGlvX2xpc3RfaXRlbScpXG5cbiAgICAgICAgICAgICAgICBlbXB0eS5hZGRDbGFzcygnZW1wdHktLWl0ZW0nKVxuICAgICAgICAgICAgICAgIGVtcHR5LnN0eWxlLm9wYWNpdHkgPSAxIC0gMC4zICogaVxuXG4gICAgICAgICAgICAgICAgc2Nyb2xsLmFwcGVuZChlbXB0eSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTGFtcGEuTGF5ZXIudmlzaWJsZShzY3JvbGwucmVuZGVyKHRydWUpKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hY3Rpdml0eS50b2dnbGUoKVxuICAgIH1cblxuICAgIHRoaXMubmV4dCA9ICgpPT57XG4gICAgICAgIGxldCB2aWV3cyA9IDEwXG4gICAgICAgIGxldCBzdGFydCA9IHBhZ2UgKiB2aWV3c1xuXG4gICAgICAgIGZpbHRyZWQuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgdmlld3MpLmZvckVhY2godGhpcy5hcHBlbmQuYmluZCh0aGlzKSlcblxuICAgICAgICBMYW1wYS5MYXllci52aXNpYmxlKHNjcm9sbC5yZW5kZXIodHJ1ZSkpXG4gICAgfVxuXG4gICAgdGhpcy5wbGF5ID0gKHN0YXRpb24pPT57XG4gICAgICAgIHBsYXllZCA9IHN0YXRpb25cblxuICAgICAgICBsZXQgcGxheWVyID0gbmV3IFBsYXllcihzdGF0aW9uKVxuICAgICAgICAgICAgcGxheWVyLmNyZWF0ZSgpXG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRDbGFzcygnYW1iaWVuY2UtLWVuYWJsZScpXG5cbiAgICAgICAgbGV0IG1vdmUgPSAoZCk9PntcbiAgICAgICAgICAgIGxldCBwb3MgPSBmaWx0cmVkLmluZGV4T2YocGxheWVkKSArIGRcblxuICAgICAgICAgICAgaWYocG9zID49IDAgJiYgcG9zIDw9IGZpbHRyZWQubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBwbGF5ZXIuZGVzdHJveSgpXG5cbiAgICAgICAgICAgICAgICB0aGlzLnBsYXkoZmlsdHJlZFtwb3NdKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgTGFtcGEuQmFja2dyb3VuZC5jaGFuZ2Uoc3RhdGlvbi5iZ19pbWFnZV9tb2JpbGUgfHwgaW1nX2JnKVxuXG4gICAgICAgIExhbXBhLkNvbnRyb2xsZXIuYWRkKCdjb250ZW50Jyx7XG4gICAgICAgICAgICBpbnZpc2libGU6IHRydWUsXG4gICAgICAgICAgICB0b2dnbGU6ICgpPT57XG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jbGVhcigpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFjazogKCk9PntcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNsYXNzKCdhbWJpZW5jZS0tZW5hYmxlJylcblxuICAgICAgICAgICAgICAgIHBsYXllci5kZXN0cm95KClcblxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdHkudG9nZ2xlKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cDogKCk9PntcbiAgICAgICAgICAgICAgICBtb3ZlKC0xKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRvd246ICgpPT57XG4gICAgICAgICAgICAgICAgbW92ZSgxKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdjb250ZW50JylcbiAgICB9XG5cbiAgICB0aGlzLmFwcGVuZCA9IGZ1bmN0aW9uKHN0YXRpb24pe1xuICAgICAgICBsZXQgaXRlbSA9IExhbXBhLlRlbXBsYXRlLmpzKCdyYWRpb19saXN0X2l0ZW0nKVxuXG4gICAgICAgIGl0ZW0uZmluZCgnLnJhZGlvLWl0ZW1fX251bScpLnRleHQoKGZpbHRyZWQuaW5kZXhPZihzdGF0aW9uKSArIDEpLnBhZCgyKSlcblxuICAgICAgICBpdGVtLmZpbmQoJy5yYWRpby1pdGVtX190aXRsZScpLnRleHQoc3RhdGlvbi50aXRsZSlcbiAgICAgICAgaXRlbS5maW5kKCcucmFkaW8taXRlbV9fdG9vbHRpcCcpLnRleHQoc3RhdGlvbi50b29sdGlwIHx8IHN0YXRpb24uc3RyZWFtKVxuXG4gICAgICAgIGl0ZW0uYmFja2dyb3VuZCA9IHN0YXRpb24uYmdfaW1hZ2VfbW9iaWxlIHx8IGltZ19iZ1xuXG4gICAgICAgIGxldCBpbWdfYm94ID0gaXRlbS5maW5kKCcucmFkaW8taXRlbV9fY292ZXItYm94JylcbiAgICAgICAgbGV0IGltZ19lbG0gPSBpdGVtLmZpbmQoJ2ltZycpXG5cbiAgICAgICAgaW1nX2VsbS5vbmxvYWQgPSAoKT0+e1xuICAgICAgICAgICAgaW1nX2JveC5hZGRDbGFzcygnbG9hZGVkJylcbiAgICAgICAgfVxuXG4gICAgICAgIGltZ19lbG0ub25lcnJvciA9ICgpPT57XG4gICAgICAgICAgICBpbWdfZWxtLnNyYyA9ICcuL2ltZy9pY29ucy9tZW51L21vdmllLnN2ZydcblxuICAgICAgICAgICAgaW1nX2JveC5hZGRDbGFzcygnbG9hZGVkLWljb24nKVxuICAgICAgICB9XG5cbiAgICAgICAgaW1nX2VsbS5zcmMgPSBzdGF0aW9uLmJnX2ltYWdlX21vYmlsZVxuXG4gICAgICAgIGl0ZW0ub24oJ2hvdmVyOmZvY3VzIGhvdmVyOmhvdmVyJywoKT0+e1xuICAgICAgICAgICAgdGhpcy5jb3ZlcihzdGF0aW9uKVxuXG4gICAgICAgICAgICBpZihpdGVtLmJhY2tncm91bmQpIExhbXBhLkJhY2tncm91bmQuY2hhbmdlKGl0ZW0uYmFja2dyb3VuZClcbiAgICAgICAgICAgIGVsc2UgdGhpcy5iYWNrZ3JvdW5kKClcblxuICAgICAgICAgICAgbGFzdCA9IGl0ZW1cbiAgICAgICAgfSlcblxuICAgICAgICBpdGVtLm9uKCdob3Zlcjpmb2N1cycsKCk9PntcbiAgICAgICAgICAgIHNjcm9sbC51cGRhdGUoaXRlbSlcbiAgICAgICAgfSlcblxuICAgICAgICBpdGVtLm9uKCdob3ZlcjplbnRlcicsKCk9PntcbiAgICAgICAgICAgIHRoaXMucGxheShzdGF0aW9uKVxuICAgICAgICB9KVxuXG4gICAgICAgIGl0ZW0ub24oJ2hvdmVyOmxvbmcnLCgpPT57XG4gICAgICAgICAgICBpZihzdGF0aW9uLnVzZXIpe1xuICAgICAgICAgICAgICAgIExhbXBhLlNlbGVjdC5zaG93KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdtZW51X3NldHRpbmdzJyksXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdleHRlbnNpb25zX2NoYW5nZV9uYW1lJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAndGl0bGUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnZXh0ZW5zaW9uc19jaGFuZ2VfbGluaycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogJ3N0cmVhbSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdleHRlbnNpb25zX3JlbW92ZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDogKGEpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhLnJlbW92ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRmF2b3JpdGVzLnJlbW92ZShzdGF0aW9uKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5yZW1vdmUoKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdCA9IGZhbHNlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnY29udGVudCcpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLklucHV0LmVkaXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3NhdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vbWljOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogc3RhdGlvblthLmNoYW5nZV0gfHwgJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCh2YWwpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZhbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aW9uW2EuY2hhbmdlXSA9IHZhbFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGYXZvcml0ZXMudXBkYXRlKHN0YXRpb24pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY292ZXIoc3RhdGlvbilcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5maW5kKCcucmFkaW8taXRlbV9fJyArIChhLmNoYW5nZSA9PSAndGl0bGUnID8gJ3RpdGxlJyA6ICd0b29sdGlwJykpLnRleHQodmFsKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ2NvbnRlbnQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG9uQmFjazogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdjb250ZW50JylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIEZhdm9yaXRlcy50b2dnbGUoc3RhdGlvbilcblxuICAgICAgICAgICAgICAgIGl0ZW0udG9nZ2xlQ2xhc3MoJ2Zhdm9yaXRlJywgQm9vbGVhbihGYXZvcml0ZXMuZmluZChzdGF0aW9uKSkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgaXRlbS50b2dnbGVDbGFzcygnZmF2b3JpdGUnLCBCb29sZWFuKEZhdm9yaXRlcy5maW5kKHN0YXRpb24pKSlcblxuICAgICAgICBpZighbGFzdCkgbGFzdCA9IGl0ZW1cblxuICAgICAgICBpZihMYW1wYS5Db250cm9sbGVyLm93bih0aGlzKSkgTGFtcGEuQ29udHJvbGxlci5jb2xsZWN0aW9uQXBwZW5kKGl0ZW0pXG5cbiAgICAgICAgc2Nyb2xsLmFwcGVuZChpdGVtKVxuICAgIH1cblxuICAgIHRoaXMuY292ZXIgPSBmdW5jdGlvbihzdGF0aW9uKXtcbiAgICAgICAgaHRtbC5maW5kKCcucmFkaW8tY292ZXJfX3RpdGxlJykudGV4dChzdGF0aW9uLnRpdGxlIHx8ICcnKVxuICAgICAgICBodG1sLmZpbmQoJy5yYWRpby1jb3Zlcl9fdG9vbHRpcCcpLnRleHQoc3RhdGlvbi50b29sdGlwIHx8ICcnKVxuXG4gICAgICAgIGxldCBpbWdfYm94ID0gaHRtbC5maW5kKCcucmFkaW8tY292ZXJfX2ltZy1ib3gnKVxuICAgICAgICBsZXQgaW1nX2VsbSA9IGltZ19ib3guZmluZCgnaW1nJylcblxuICAgICAgICBpbWdfYm94LnJlbW92ZUNsYXNzKCdsb2FkZWQgbG9hZGVkLWljb24nKVxuXG4gICAgICAgIGltZ19lbG0ub25sb2FkID0gKCk9PntcbiAgICAgICAgICAgIGltZ19ib3guYWRkQ2xhc3MoJ2xvYWRlZCcpXG4gICAgICAgIH1cblxuICAgICAgICBpbWdfZWxtLm9uZXJyb3IgPSAoKT0+e1xuICAgICAgICAgICAgaW1nX2VsbS5zcmMgPSAnLi9pbWcvaWNvbnMvbWVudS9tb3ZpZS5zdmcnXG5cbiAgICAgICAgICAgIGltZ19ib3guYWRkQ2xhc3MoJ2xvYWRlZC1pY29uJylcbiAgICAgICAgfVxuXG4gICAgICAgIGltZ19lbG0uc3JjID0gc3RhdGlvbi5iZ19pbWFnZV9tb2JpbGVcbiAgICB9XG5cbiAgICB0aGlzLnN0YXJ0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoTGFtcGEuQWN0aXZpdHkuYWN0aXZlKCkgJiYgTGFtcGEuQWN0aXZpdHkuYWN0aXZlKCkuYWN0aXZpdHkgIT09IHRoaXMuYWN0aXZpdHkpIHJldHVyblxuXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCgpXG5cbiAgICAgICAgTGFtcGEuQ29udHJvbGxlci5hZGQoJ2NvbnRlbnQnLHtcbiAgICAgICAgICAgIGxpbms6IHRoaXMsXG4gICAgICAgICAgICBpbnZpc2libGU6IHRydWUsXG4gICAgICAgICAgICB0b2dnbGU6ICgpPT57XG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jb2xsZWN0aW9uU2V0KGh0bWwpXG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jb2xsZWN0aW9uRm9jdXMobGFzdCxodG1sKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZnQ6ICgpPT57XG4gICAgICAgICAgICAgICAgaWYoTmF2aWdhdG9yLmNhbm1vdmUoJ2xlZnQnKSkgTmF2aWdhdG9yLm1vdmUoJ2xlZnQnKVxuICAgICAgICAgICAgICAgIGVsc2UgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ21lbnUnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJpZ2h0OiAoKT0+e1xuICAgICAgICAgICAgICAgIE5hdmlnYXRvci5tb3ZlKCdyaWdodCcpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXA6ICgpPT57XG4gICAgICAgICAgICAgICAgaWYoTmF2aWdhdG9yLmNhbm1vdmUoJ3VwJykpIE5hdmlnYXRvci5tb3ZlKCd1cCcpXG4gICAgICAgICAgICAgICAgZWxzZSBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnaGVhZCcpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG93bjogKCk9PntcbiAgICAgICAgICAgICAgICBOYXZpZ2F0b3IubW92ZSgnZG93bicpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFjazogKCk9PntcbiAgICAgICAgICAgICAgICBMYW1wYS5BY3Rpdml0eS5iYWNrd2FyZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ2NvbnRlbnQnKVxuICAgIH1cblxuXG4gICAgdGhpcy5wYXVzZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHRoaXMuc3RvcCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHRoaXMucmVuZGVyID0gZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIGh0bWxcbiAgICB9XG5cbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICBpZihzY3JvbGwpIHNjcm9sbC5kZXN0cm95KClcbiAgICAgICAgXG4gICAgICAgIGh0bWwucmVtb3ZlKClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudCIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnQnXG5cblxuZnVuY3Rpb24gc3RhcnRQbHVnaW4oKSB7XG4gICAgd2luZG93LnBsdWdpbl9yZWNvcmRfcmVhZHkgPSB0cnVlXG5cbiAgICBMYW1wYS5MYW5nLmFkZCh7XG4gICAgICAgIHJhZGlvX3N0YXRpb246IHtcbiAgICAgICAgICAgIHJ1OiAn0KDQsNC00LjQvtGB0YLQsNC90YbQuNGPJyxcbiAgICAgICAgICAgIGVuOiAnUmFkaW8gc3RhdGlvbicsXG4gICAgICAgICAgICB1azogJ9Cg0LDQtNGW0L7RgdGC0LDQvdGG0ZbRjycsXG4gICAgICAgICAgICBiZTogJ9Cg0LDQtNGL0ZHRgdGC0LDQvdGG0YvRjycsXG4gICAgICAgICAgICB6aDogJ+W5v+aSreeUteWPsCcsXG4gICAgICAgICAgICBwdDogJ0VzdGHDp8OjbyBkZSByw6FkaW8nLFxuICAgICAgICAgICAgYmc6ICfQoNCw0LTQuNC+0YHRgtCw0L3RhtC40Y8nLFxuICAgICAgICB9LFxuICAgICAgICByYWRpb19hZGRfc3RhdGlvbjoge1xuICAgICAgICAgICAgcnU6ICfQktCy0LXQtNC40YLQtSDQsNC00YDQtdGBINGA0LDQtNC40L7RgdGC0LDQvdGG0LjQuCcsXG4gICAgICAgICAgICBlbjogJ0VudGVyIHRoZSBhZGRyZXNzIG9mIHRoZSByYWRpbyBzdGF0aW9uJyxcbiAgICAgICAgICAgIHVrOiAn0JLQstC10LTRltGC0Ywg0LDQtNGA0LXRgdGDINGA0LDQtNGW0L7RgdGC0LDQvdGG0ZbRlycsXG4gICAgICAgICAgICBiZTogJ9Cj0LLRj9C00LfRltGG0LUg0LDQtNGA0LDRgSDRgNCw0LTRi9GR0YHRgtCw0L3RhtGL0ZYnLFxuICAgICAgICAgICAgemg6ICfovpPlhaXnlLXlj7DlnLDlnYAnLFxuICAgICAgICAgICAgcHQ6ICdEaWdpdGUgbyBlbmRlcmXDp28gZGEgZXN0YcOnw6NvIGRlIHLDoWRpbycsXG4gICAgICAgICAgICBiZzogJ9CS0YrQstC10LTQtdGC0LUg0LDQtNGA0LXRgdCwINC90LAg0YDQsNC00LjQvtGB0YLQsNC90YbQuNGP0YLQsCcsXG4gICAgICAgIH0sXG4gICAgICAgIHJhZGlvX2xvYWRfZXJyb3I6IHtcbiAgICAgICAgICAgIHJ1OiAn0J7RiNC40LHQutCwINCyINC30LDQs9GA0YPQt9C60LUg0L/QvtGC0L7QutCwJyxcbiAgICAgICAgICAgIGVuOiAnRXJyb3IgaW4gc3RyZWFtIGxvYWRpbmcnLFxuICAgICAgICAgICAgdWs6ICfQn9C+0LzQuNC70LrQsCDQt9Cw0LLQsNC90YLQsNC20LXQvdC90Y8g0L/QvtGC0L7QutGDJyxcbiAgICAgICAgICAgIGJlOiAn0J/QsNC80YvQu9C60LAg0Z4g0LfQsNCz0YDRg9C30YbRiyDQv9Cw0YLQvtC60YMnLFxuICAgICAgICAgICAgemg6ICfmtYHliqDovb3plJnor68nLFxuICAgICAgICAgICAgcHQ6ICdFcnJvIGFvIGNhcnJlZ2FyIGEgdHJhbnNtaXNzw6NvJyxcbiAgICAgICAgICAgIGJnOiAn0JPRgNC10YjQutCwINC/0YDQuCDQt9Cw0YDQtdC20LTQsNC90LUg0L3QsCDQv9C+0YLQvtC60LAnLFxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGxldCBtYW5pZmVzdCA9IHtcbiAgICAgICAgdHlwZTogJ2F1ZGlvJyxcbiAgICAgICAgdmVyc2lvbjogJzEuMS4xJyxcbiAgICAgICAgbmFtZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3JhZGlvX3N0YXRpb24nKSxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICBjb21wb25lbnQ6ICdyYWRpbycsXG4gICAgfVxuICAgIFxuICAgIExhbXBhLk1hbmlmZXN0LnBsdWdpbnMgPSBtYW5pZmVzdFxuICAgIFxuICAgIFxuXG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdyYWRpb19jb250ZW50JywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicmFkaW8tY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJhZGlvLWNvbnRlbnRfX2hlYWRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2ltcGxlLWJ1dHRvbiBzaW1wbGUtYnV0dG9uLS1pbnZpc2libGUgc2ltcGxlLWJ1dHRvbi0tZmlsdGVyIHNlbGVjdG9yIGJ1dHRvbi0tY2F0YWxvZ1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNDc4LjM1NCwxNDYuMjg2SDMzLjY0NmMtMTIuMTIsMC0yMS45NDMsOS44MjMtMjEuOTQzLDIxLjk0M3YzMjEuODI5YzAsMTIuMTIsOS44MjMsMjEuOTQzLDIxLjk0MywyMS45NDNoNDQ0LjcwOVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMxMi4xMiwwLDIxLjk0My05LjgyMywyMS45NDMtMjEuOTQzVjE2OC4yMjlDNTAwLjI5NywxNTYuMTA5LDQ5MC40NzQsMTQ2LjI4Niw0NzguMzU0LDE0Ni4yODZ6IE00NTYuNDExLDQ2OC4xMTRINTUuNTg5VjE5MC4xNzFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoNDAwLjgyM1Y0NjguMTE0elwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTQ0MS43ODMsNzMuMTQzSDcwLjIxN2MtMTIuMTIsMC0yMS45NDMsOS44MjMtMjEuOTQzLDIxLjk0M2MwLDEyLjEyLDkuODIzLDIxLjk0MywyMS45NDMsMjEuOTQzaDM3MS41NjZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjMTIuMTIsMCwyMS45NDMtOS44MjMsMjEuOTQzLTIxLjk0M0M0NjMuNzI2LDgyLjk2Niw0NTMuOTAzLDczLjE0Myw0NDEuNzgzLDczLjE0M3pcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk00MDUuMjExLDBIMTA2Ljc4OWMtMTIuMTIsMC0yMS45NDMsOS44MjMtMjEuOTQzLDIxLjk0M2MwLDEyLjEyLDkuODIzLDIxLjk0MywyMS45NDMsMjEuOTQzaDI5OC40MjNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjMTIuMTIsMCwyMS45NDMtOS44MjMsMjEuOTQzLTIxLjk0M0M0MjcuMTU0LDkuODIzLDQxNy4zMzEsMCw0MDUuMjExLDB6XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpZGVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2ltcGxlLWJ1dHRvbiBzaW1wbGUtYnV0dG9uLS1pbnZpc2libGUgc2ltcGxlLWJ1dHRvbi0tZmlsdGVyIHNlbGVjdG9yIGJ1dHRvbi0tYWRkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiICB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0yNTYgMEMxMTQuODMzIDAgMCAxMTQuODMzIDAgMjU2czExNC44MzMgMjU2IDI1NiAyNTYgMjU2LTExNC44NTMgMjU2LTI1NlMzOTcuMTY3IDAgMjU2IDB6bTAgNDcyLjM0MWMtMTE5LjI3NSAwLTIxNi4zNDEtOTcuMDQ2LTIxNi4zNDEtMjE2LjM0MVMxMzYuNzI1IDM5LjY1OSAyNTYgMzkuNjU5IDQ3Mi4zNDEgMTM2LjcwNSA0NzIuMzQxIDI1NiAzNzUuMjk1IDQ3Mi4zNDEgMjU2IDQ3Mi4zNDF6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPjwvcGF0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMzU1LjE0OCAyMzQuMzg2SDI3NS44M3YtNzkuMzE4YzAtMTAuOTQ2LTguODY0LTE5LjgzLTE5LjgzLTE5Ljgzcy0xOS44MyA4Ljg4NC0xOS44MyAxOS44M3Y3OS4zMThoLTc5LjMxOGMtMTAuOTY2IDAtMTkuODMgOC44ODQtMTkuODMgMTkuODNzOC44NjQgMTkuODMgMTkuODMgMTkuODNoNzkuMzE4djc5LjMxOGMwIDEwLjk0NiA4Ljg2NCAxOS44MyAxOS44MyAxOS44M3MxOS44My04Ljg4NCAxOS44My0xOS44M3YtNzkuMzE4aDc5LjMxOGMxMC45NjYgMCAxOS44My04Ljg4NCAxOS44My0xOS44M3MtOC44NjQtMTkuODMtMTkuODMtMTkuODN6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPjwvcGF0aD5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpbXBsZS1idXR0b24gc2ltcGxlLWJ1dHRvbi0taW52aXNpYmxlIHNpbXBsZS1idXR0b24tLWZpbHRlciBzZWxlY3RvciBidXR0b24tLXNlYXJjaFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjNcIiBoZWlnaHQ9XCIyMlwiIHZpZXdCb3g9XCIwIDAgMjMgMjJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjkuOTk2NFwiIGN5PVwiOS42MzQ4OVwiIHI9XCI4LjQzNTU2XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMi40XCI+PC9jaXJjbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTIwLjc3NjggMjAuNDMzNEwxOC4yMTM1IDE3Ljg3MDFcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCI+PC9wYXRoPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpZGVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJhZGlvLWNvbnRlbnRfX2JvZHlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmFkaW8tY29udGVudF9fbGlzdFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyYWRpby1jb250ZW50X19jb3ZlclwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGApXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ3JhZGlvX2NvdmVyJywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicmFkaW8tY292ZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyYWRpby1jb3Zlcl9faW1nLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyYWRpby1jb3Zlcl9faW1nLWJveFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vd3d3LnJhZGlvcmVjb3JkLnJ1L3VwbG9hZC9pYmxvY2svNTA3L2Nsb3NlLXVwLWltYWdlLWZyZXNoLXNwcmluZy1ncmVlbi1ncmFzczEuanBnXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmFkaW8tY292ZXJfX3RpdGxlXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmFkaW8tY292ZXJfX3Rvb2x0aXBcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYClcblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgncmFkaW9fbGlzdF9pdGVtJywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicmFkaW8taXRlbSBzZWxlY3RvciBsYXllci0tdmlzaWJsZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJhZGlvLWl0ZW1fX251bVwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJhZGlvLWl0ZW1fX2NvdmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJhZGlvLWl0ZW1fX2NvdmVyLWJveFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyYWRpby1pdGVtX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJhZGlvLWl0ZW1fX3RpdGxlXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJhZGlvLWl0ZW1fX3Rvb2x0aXBcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJhZGlvLWl0ZW1fX2ljb25zXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJhZGlvLWl0ZW1fX2ljb24tZmF2b3JpdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgaWQ9XCJDYXBhXzFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0NzcuNTM0IDQ3Ny41MzRcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNDM4LjQ4Miw1OC42MWMtMjQuNy0yNi41NDktNTkuMzExLTQxLjY1NS05NS41NzMtNDEuNzExYy0zNi4yOTEsMC4wNDItNzAuOTM4LDE1LjE0LTk1LjY3Niw0MS42OTRsLTguNDMxLDguOTA5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbC04LjQzMS04LjkwOUMxODEuMjg0LDUuNzYyLDk4LjY2MiwyLjcyOCw0NS44MzIsNTEuODE1Yy0yLjM0MSwyLjE3Ni00LjYwMiw0LjQzNi02Ljc3OCw2Ljc3OFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMtNTIuMDcyLDU2LjE2Ni01Mi4wNzIsMTQyLjk2OCwwLDE5OS4xMzRsMTg3LjM1OCwxOTcuNTgxYzYuNDgyLDYuODQzLDE3LjI4NCw3LjEzNiwyNC4xMjcsMC42NTRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjMC4yMjQtMC4yMTIsMC40NDItMC40MywwLjY1NC0wLjY1NGwxODcuMjktMTk3LjU4MUM0OTAuNTUxLDIwMS41NjcsNDkwLjU1MSwxMTQuNzcsNDM4LjQ4Miw1OC42MXogTTQxMy43ODcsMjM0LjIyNmgtMC4wMTdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMMjM4LjgwMiw0MTguNzY4TDYzLjgxOCwyMzQuMjI2Yy0zOS43OC00Mi45MTYtMzkuNzgtMTA5LjIzMywwLTE1Mi4xNDljMzYuMTI1LTM5LjE1NCw5Ny4xNTItNDEuNjA5LDEzNi4zMDYtNS40ODRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjMS45MDEsMS43NTQsMy43MywzLjU4Myw1LjQ4NCw1LjQ4NGwyMC44MDQsMjEuOTQ4YzYuODU2LDYuODEyLDE3LjkyNSw2LjgxMiwyNC43ODEsMGwyMC44MDQtMjEuOTMxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYzM2LjEyNS0zOS4xNTQsOTcuMTUyLTQxLjYwOSwxMzYuMzA2LTUuNDg0YzEuOTAxLDEuNzU0LDMuNzMsMy41ODMsNS40ODQsNS40ODRDNDUzLjkxMywxMjUuMDc4LDQ1NC4yMDcsMTkxLjUxNiw0MTMuNzg3LDIzNC4yMjZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmFkaW8taXRlbV9faWNvbi1wbGF5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMlwiIGhlaWdodD1cIjI1XCIgdmlld0JveD1cIjAgMCAyMiAyNVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0yMSAxMC43Njc5QzIyLjMzMzMgMTEuNTM3NyAyMi4zMzMzIDEzLjQ2MjIgMjEgMTQuMjMyTDMuNzUgMjQuMTkxM0MyLjQxNjY2IDI0Ljk2MTEgMC43NSAyMy45OTg5IDAuNzUgMjIuNDU5M0wwLjc1MDAwMSAyLjU0MDdDMC43NTAwMDEgMS4wMDExIDIuNDE2NjcgMC4wMzg4NTI2IDMuNzUgMC44MDg2NTNMMjEgMTAuNzY3OVpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgKVxuXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ3JhZGlvX3BsYXllcicsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInJhZGlvLXBsYXllclwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmFkaW8tcGxheWVyX19jb3ZlclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyYWRpby1wbGF5ZXJfX3dhdmVcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJhZGlvLXBsYXllcl9fY2xvc2VcIj5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDMyOS4yNjkgMzI5XCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xOTQuOCAxNjQuNzcgMzIzLjAxMyAzNi41NTVjOC4zNDMtOC4zNCA4LjM0My0yMS44MjUgMC0zMC4xNjQtOC4zNC04LjM0LTIxLjgyNS04LjM0LTMwLjE2NCAwTDE2NC42MzMgMTM0LjYwNSAzNi40MjIgNi4zOTFjLTguMzQ0LTguMzQtMjEuODI0LTguMzQtMzAuMTY0IDAtOC4zNDQgOC4zNC04LjM0NCAyMS44MjQgMCAzMC4xNjRsMTI4LjIxIDEyOC4yMTVMNi4yNTkgMjkyLjk4NGMtOC4zNDQgOC4zNC04LjM0NCAyMS44MjUgMCAzMC4xNjRhMjEuMjY2IDIxLjI2NiAwIDAgMCAxNS4wODIgNi4yNWM1LjQ2IDAgMTAuOTIyLTIuMDkgMTUuMDgyLTYuMjVsMTI4LjIxLTEyOC4yMTQgMTI4LjIxNiAxMjguMjE0YTIxLjI3MyAyMS4yNzMgMCAwIDAgMTUuMDgyIDYuMjVjNS40NiAwIDEwLjkyMi0yLjA5IDE1LjA4Mi02LjI1IDguMzQzLTguMzQgOC4zNDMtMjEuODI0IDAtMzAuMTY0em0wIDBcIiBmaWxsPVwiY3VycmVudENvbG9yXCI+PC9wYXRoPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGApXG5cblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgncmFkaW9fc3R5bGUnLCBgXG4gICAgICAgIDxzdHlsZT5cbiAgICAgICAgQEBpbmNsdWRlKCcuLi9wbHVnaW5zL3JlY29yZC9jc3Mvc3R5bGUuY3NzJylcbiAgICAgICAgPC9zdHlsZT5cbiAgICBgKVxuXG5cblxuXG4gICAgZnVuY3Rpb24gYWRkKCl7XG4gICAgICAgIGxldCBidXR0b24gPSAkKGA8bGkgY2xhc3M9XCJtZW51X19pdGVtIHNlbGVjdG9yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudV9faWNvXCI+XG4gICAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjM4XCIgaGVpZ2h0PVwiMzFcIiB2aWV3Qm94PVwiMCAwIDM4IDMxXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIxNy42MTNcIiB3aWR0aD1cIjNcIiBoZWlnaHQ9XCIxNi4zMzI3XCIgcng9XCIxLjVcIiB0cmFuc2Zvcm09XCJyb3RhdGUoNjMuNDcwNyAxNy42MTMgMClcIiBmaWxsPVwiY3VycmVudENvbG9yXCIvPlxuICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTNcIiBjeT1cIjE5XCIgcj1cIjZcIiBmaWxsPVwiY3VycmVudENvbG9yXCIvPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMCAxMUMwIDguNzkwODYgMS43OTA4MyA3IDQgN0gzNEMzNi4yMDkxIDcgMzggOC43OTA4NiAzOCAxMVYyN0MzOCAyOS4yMDkxIDM2LjIwOTIgMzEgMzQgMzFINEMxLjc5MDgzIDMxIDAgMjkuMjA5MSAwIDI3VjExWk0yMSAxOUMyMSAyMy40MTgzIDE3LjQxODMgMjcgMTMgMjdDOC41ODE3MyAyNyA1IDIzLjQxODMgNSAxOUM1IDE0LjU4MTcgOC41ODE3MyAxMSAxMyAxMUMxNy40MTgzIDExIDIxIDE0LjU4MTcgMjEgMTlaTTMwLjUgMThDMzEuODgwNyAxOCAzMyAxNi44ODA3IDMzIDE1LjVDMzMgMTQuMTE5MyAzMS44ODA3IDEzIDMwLjUgMTNDMjkuMTE5MyAxMyAyOCAxNC4xMTkzIDI4IDE1LjVDMjggMTYuODgwNyAyOS4xMTkzIDE4IDMwLjUgMThaXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVfX3RleHRcIj4ke21hbmlmZXN0Lm5hbWV9PC9kaXY+XG4gICAgICAgIDwvbGk+YClcblxuICAgICAgICBidXR0b24ub24oJ2hvdmVyOmVudGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgTGFtcGEuQWN0aXZpdHkucHVzaCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnJyxcbiAgICAgICAgICAgICAgICB0aXRsZTogbWFuaWZlc3QubmFtZSxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6ICdyYWRpbycsXG4gICAgICAgICAgICAgICAgcGFnZTogMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICAkKCcubWVudSAubWVudV9fbGlzdCcpLmVxKDApLmFwcGVuZChidXR0b24pXG5cbiAgICAgICAgJCgnYm9keScpLmFwcGVuZChMYW1wYS5UZW1wbGF0ZS5nZXQoJ3JhZGlvX3N0eWxlJyx7fSx0cnVlKSlcbiAgICB9XG5cbiAgICBMYW1wYS5Db21wb25lbnQuYWRkKCdyYWRpbycsIENvbXBvbmVudClcblxuICAgIGlmKHdpbmRvdy5hcHByZWFkeSkgYWRkKClcbiAgICBlbHNle1xuICAgICAgICBMYW1wYS5MaXN0ZW5lci5mb2xsb3coJ2FwcCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS50eXBlID09ICdyZWFkeScpIGFkZCgpXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5pZighd2luZG93LnBsdWdpbl9yZWNvcmRfcmVhZHkpIHN0YXJ0UGx1Z2luKClcbiJdLCJuYW1lcyI6WyJBcGkiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsImxpc3QiLCJfdGhpcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibmV0d29yayIsImFwaV91cmwiLCJyZXN1bHQiLCJMYW1wYSIsIkNhY2hlIiwicmV3cml0ZURhdGEiLCJiaW5kIiwiZ2V0RGF0YSIsInRoZW4iLCJfZGVmaW5lUHJvcGVydHkiLCJSZWd1ZXN0IiwiRmF2b3JpdGVzIiwiZ2V0IiwiYWxsIiwiU3RvcmFnZSIsInNvcnQiLCJhIiwiYiIsImFkZGVkIiwiZmluZCIsImZhdm9yaXRlIiwiaWQiLCJyZW1vdmUiLCJBcnJheXMiLCJzZXQiLCJhZGQiLCJleHRlbmQiLCJVdGlscyIsInVpZCIsIkRhdGUiLCJub3ciLCJwdXNoIiwidXBkYXRlIiwidG9nZ2xlIiwiUGxheWVyIiwic3RhdGlvbiIsImh0bWwiLCJUZW1wbGF0ZSIsImpzIiwiYXVkaW8iLCJBdWRpbyIsInVybCIsInN0cmVhbV8zMjAiLCJzdHJlYW1fMTI4Iiwic3RyZWFtIiwic3RyZWFtX2hscyIsInJlcGxhY2UiLCJobHMiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJjaGFuZ2VXYXZlIiwic2NyZWVucmVzZXQiLCJzZXRJbnRlcnZhbCIsIlNjcmVlbnNhdmVyIiwicmVzZXRUaW1lciIsInByZXBhcmUiLCJjYW5QbGF5VHlwZSIsImluZGV4T2YiLCJsb2FkIiwiSGxzIiwiaXNTdXBwb3J0ZWQiLCJhdHRhY2hNZWRpYSIsImxvYWRTb3VyY2UiLCJvbiIsIkV2ZW50cyIsIkVSUk9SIiwiZGF0YSIsImRldGFpbHMiLCJFcnJvckRldGFpbHMiLCJNQU5JRkVTVF9QQVJTSU5HX0VSUk9SIiwicmVhc29uIiwiTm90eSIsInNob3ciLCJMYW5nIiwidHJhbnNsYXRlIiwiTUFOSUZFU1RfTE9BREVEIiwic3RhcnQiLCJlIiwic3JjIiwicGxheVByb21pc2UiLCJwbGF5IiwidW5kZWZpbmVkIiwiY29uc29sZSIsImxvZyIsIm1lc3NhZ2UiLCJzdG9wIiwiZGVzdHJveSIsImNyZWF0ZVdhdmUiLCJib3giLCJpIiwiZGl2IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kIiwiY2xhc3NfbmFtZSIsImxpbmVzIiwicXVlcnlTZWxlY3RvckFsbCIsImxlbmd0aCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzdHlsZSIsIk1hdGgiLCJyYW5kb20iLCJyb3VuZCIsImNyZWF0ZSIsImNvdmVyIiwidGV4dCIsInRpdGxlIiwidG9vbHRpcCIsImltZ19ib3giLCJpbWdfZWxtIiwib25sb2FkIiwib25lcnJvciIsImJnX2ltYWdlX21vYmlsZSIsIndpbmRvdyIsImhpc3RvcnkiLCJiYWNrIiwiYm9keSIsImNsZWFySW50ZXJ2YWwiLCJDb21wb25lbnQiLCJfdGhpczYiLCJsYXN0Iiwic2Nyb2xsIiwicGxheWVkIiwiZmlsdHJlZCIsInBhZ2UiLCJpbWdfYmciLCJhY3Rpdml0eSIsImxvYWRlciIsInN0YXRpb25zIiwiYnVpbGQiLCJnZW5yZSIsInJlbmRlciIsImJhY2tncm91bmQiLCJCYWNrZ3JvdW5kIiwiaW1tZWRpYXRlbHkiLCJfdGhpczIiLCJTY3JvbGwiLCJtYXNrIiwib3ZlciIsIm9uRW5kIiwibmV4dCIsIm1pbnVzIiwiYnVpbGRDYXRhbG9nIiwiYnVpbGRTZWFyY2giLCJidWlsZEFkZCIsImRpc3BsYXkiLCJMYXllciIsImNsZWFyQnV0dG9ucyIsImNhdGVnb3J5Iiwic2VhcmNoIiwiYnRuX2NhdGFsb2ciLCJidG5fc2VhcmNoIiwiX3RoaXMzIiwiYnRuIiwiaXRlbXMiLCJmYXZzIiwiZ2hvc3QiLCJub2VudGVyIiwiZm9yRWFjaCIsImciLCJuYW1lIiwiU2VsZWN0Iiwib25TZWxlY3QiLCJmaWx0ZXIiLCJzIiwib25CYWNrIiwiQ29udHJvbGxlciIsIl90aGlzNCIsIklucHV0IiwiZWRpdCIsImZyZWUiLCJub3NhdmUiLCJub21pYyIsInVzZXIiLCJfdGhpczUiLCJ2YWwiLCJ0b0xvd2VyQ2FzZSIsImNsZWFyIiwicmVzZXQiLCJlbXB0eSIsIm9wYWNpdHkiLCJ2aXNpYmxlIiwidmlld3MiLCJzbGljZSIsInBsYXllciIsIm1vdmUiLCJkIiwicG9zIiwiY2hhbmdlIiwiaW52aXNpYmxlIiwidXAiLCJkb3duIiwiX3RoaXM3IiwiaXRlbSIsInBhZCIsInRvZ2dsZUNsYXNzIiwiQm9vbGVhbiIsIm93biIsImNvbGxlY3Rpb25BcHBlbmQiLCJBY3Rpdml0eSIsImFjdGl2ZSIsImxpbmsiLCJjb2xsZWN0aW9uU2V0IiwiY29sbGVjdGlvbkZvY3VzIiwibGVmdCIsIk5hdmlnYXRvciIsImNhbm1vdmUiLCJyaWdodCIsImJhY2t3YXJkIiwicGF1c2UiLCJzdGFydFBsdWdpbiIsInBsdWdpbl9yZWNvcmRfcmVhZHkiLCJyYWRpb19zdGF0aW9uIiwicnUiLCJlbiIsInVrIiwiYmUiLCJ6aCIsInB0IiwiYmciLCJyYWRpb19hZGRfc3RhdGlvbiIsInJhZGlvX2xvYWRfZXJyb3IiLCJtYW5pZmVzdCIsInR5cGUiLCJ2ZXJzaW9uIiwiZGVzY3JpcHRpb24iLCJjb21wb25lbnQiLCJNYW5pZmVzdCIsInBsdWdpbnMiLCJidXR0b24iLCIkIiwiY29uY2F0IiwiZXEiLCJhcHByZWFkeSIsIkxpc3RlbmVyIiwiZm9sbG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BQU1BLEdBQUc7SUFBQSxTQUFBQTtNQUFBQyxlQUFBLE9BQUFELEdBQUE7O0lBQUEsT0FBQUUsWUFBQSxDQUFBRixHQUFBO01BQUFHLEdBQUE7TUFBQUMsS0FBQSxFQUlMLFNBQU9DLElBQUlBLEdBQUU7UUFBQSxJQUFBQyxLQUFBO1FBQ1QsT0FBTyxJQUFJQyxPQUFPLENBQUMsVUFBQ0MsT0FBTyxFQUFFQyxNQUFNLEVBQUc7VUFDbENILEtBQUksQ0FBQ0ksT0FBTyxVQUFPLENBQUNKLEtBQUksQ0FBQ0ssT0FBTyxFQUFDLFVBQUNDLE1BQU0sRUFBRztZQUN2Q0MsS0FBSyxDQUFDQyxLQUFLLENBQUNDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUNILE1BQU0sQ0FBQyxXQUFRLENBQUNKLE9BQU8sQ0FBQ1EsSUFBSSxDQUFDUixPQUFPLEVBQUNJLE1BQU0sQ0FBQyxDQUFDO1dBQ3JHLEVBQUMsWUFBSTtZQUNGQyxLQUFLLENBQUNDLEtBQUssQ0FBQ0csT0FBTyxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDQyxJQUFJLENBQUNWLE9BQU8sQ0FBQyxTQUFNLENBQUNDLE1BQU0sQ0FBQztXQUNoRixDQUFDO1NBQ0wsQ0FBQzs7O0VBQ0w7RUFBQVUsZUFBQSxDQVpDbkIsR0FBRyxhQUNZLElBQUlhLEtBQUssQ0FBQ08sT0FBTyxFQUFFO0VBQUFELGVBQUEsQ0FEbENuQixHQUFHLGFBRVksMENBQTBDOztNQ0Z6RHFCLFNBQVM7SUFBQSxTQUFBQTtNQUFBcEIsZUFBQSxPQUFBb0IsU0FBQTs7SUFBQSxPQUFBbkIsWUFBQSxDQUFBbUIsU0FBQTtNQUFBbEIsR0FBQTtNQUFBQyxLQUFBLEVBQ1gsU0FBT2tCLEdBQUdBLEdBQUU7UUFDUixJ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