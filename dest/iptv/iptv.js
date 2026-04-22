(function () {
  'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
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
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
        t && (r = t);
        var n = 0,
          F = function () {};
        return {
          s: F,
          n: function () {
            return n >= r.length ? {
              done: !0
            } : {
              done: !1,
              value: r[n++]
            };
          },
          e: function (r) {
            throw r;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = !0,
      u = !1;
    return {
      s: function () {
        t = t.call(r);
      },
      n: function () {
        var r = t.next();
        return a = r.done, r;
      },
      e: function (r) {
        u = !0, o = r;
      },
      f: function () {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
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
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  var Utils = /*#__PURE__*/function () {
    function Utils() {
      _classCallCheck(this, Utils);
    }
    return _createClass(Utils, null, [{
      key: "clear",
      value: function clear(str) {
        return str.replace(/\&quot;/g, '"').replace(/\&#039;/g, "'").replace(/\&amp;/g, "&").replace(/\&.+?;/g, '');
      }
    }, {
      key: "isHD",
      value: function isHD(name) {
        var math = name.toLowerCase().match(' .hd$| .нd$| .hd | .нd | hd$| нd&| hd | нd ');
        return math ? math[0].trim() : '';
      }
    }, {
      key: "clearHDSD",
      value: function clearHDSD(name) {
        return name.replace(/ hd$| нd$| .hd$| .нd$/gi, '').replace(/ sd$/gi, '').replace(/ hd | нd | .hd | .нd /gi, ' ').replace(/ sd /gi, ' ');
      }
    }, {
      key: "clearMenuName",
      value: function clearMenuName(name) {
        return name.replace(/^\d+\. /gi, '').replace(/^\d+ /gi, '');
      }
    }, {
      key: "clearChannelName",
      value: function clearChannelName(name) {
        return this.clearHDSD(this.clear(name));
      }
    }, {
      key: "hasArchive",
      value: function hasArchive(channel) {
        if (channel.catchup) {
          var days = parseInt(channel.catchup.days);
          if (!isNaN(days) && days > 0) return days;
        }
        return 0;
      }
    }, {
      key: "canUseDB",
      value: function canUseDB() {
        return DB.db && Lampa.Storage.get('iptv_use_db', 'indexdb') == 'indexdb';
      }
    }]);
  }();

  var favorites = [];
  var Favorites = /*#__PURE__*/function () {
    function Favorites() {
      _classCallCheck(this, Favorites);
    }
    return _createClass(Favorites, null, [{
      key: "load",
      value: function load() {
        var _this = this;
        return new Promise(function (resolve, reject) {
          if (Utils.canUseDB()) {
            DB.getData('favorites').then(function (result) {
              favorites = result || [];
            })["finally"](resolve);
          } else {
            _this.nosuport();
            resolve();
          }
        });
      }
    }, {
      key: "nosuport",
      value: function nosuport() {
        favorites = Lampa.Storage.get('iptv_favorite_channels', '[]');
      }
    }, {
      key: "list",
      value: function list() {
        return favorites;
      }
    }, {
      key: "key",
      value: function key() {
        return Lampa.Storage.get('iptv_favotite_save', 'url');
      }
    }, {
      key: "find",
      value: function find(favorite) {
        var _this2 = this;
        return favorites.find(function (a) {
          return a[_this2.key()] == favorite[_this2.key()];
        });
      }
    }, {
      key: "remove",
      value: function remove(favorite) {
        var _this3 = this;
        return new Promise(function (resolve, reject) {
          var find = favorites.find(function (a) {
            return a[_this3.key()] == favorite[_this3.key()];
          });
          if (find) {
            if (Utils.canUseDB()) {
              DB.deleteData('favorites', favorite[_this3.key()]).then(function () {
                Lampa.Arrays.remove(favorites, find);
                resolve();
              })["catch"](reject);
            } else {
              Lampa.Arrays.remove(favorites, find);
              Lampa.Storage.set('iptv_favorite_channels', favorites);
              resolve();
            }
          } else reject();
        });
      }
    }, {
      key: "add",
      value: function add(favorite) {
        var _this4 = this;
        return new Promise(function (resolve, reject) {
          if (!favorites.find(function (a) {
            return a[_this4.key()] == favorite[_this4.key()];
          })) {
            Lampa.Arrays.extend(favorite, {
              view: 0,
              added: Date.now()
            });
            if (Utils.canUseDB()) {
              DB.addData('favorites', favorite[_this4.key()], favorite).then(function () {
                favorites.push(favorite);
                resolve();
              })["catch"](reject);
            } else {
              favorites.push(favorite);
              Lampa.Storage.set('iptv_favorite_channels', favorites);
              resolve();
            }
          } else reject();
        });
      }
    }, {
      key: "update",
      value: function update(favorite) {
        var _this5 = this;
        return new Promise(function (resolve, reject) {
          if (favorites.find(function (a) {
            return a[_this5.key()] == favorite[_this5.key()];
          })) {
            Lampa.Arrays.extend(favorite, {
              view: 0,
              added: Date.now()
            });
            if (Utils.canUseDB()) DB.updateData('favorites', favorite[_this5.key()], favorite).then(resolve)["catch"](reject);else {
              Lampa.Storage.set('iptv_favorite_channels', favorites);
              resolve();
            }
          } else reject();
        });
      }
    }, {
      key: "toggle",
      value: function toggle(favorite) {
        return this.find(favorite) ? this.remove(favorite) : this.add(favorite);
      }
    }]);
  }();

  var locked = [];
  var Locked = /*#__PURE__*/function () {
    function Locked() {
      _classCallCheck(this, Locked);
    }
    return _createClass(Locked, null, [{
      key: "load",
      value: function load() {
        var _this = this;
        return new Promise(function (resolve, reject) {
          if (Utils.canUseDB()) {
            DB.getData('locked').then(function (result) {
              locked = result || [];
            })["finally"](resolve);
          } else {
            _this.nosuport();
            resolve();
          }
        });
      }
    }, {
      key: "nosuport",
      value: function nosuport() {
        locked = Lampa.Storage.get('iptv_locked_channels', '[]');
      }
    }, {
      key: "list",
      value: function list() {
        return locked;
      }
    }, {
      key: "find",
      value: function find(key) {
        return locked.find(function (a) {
          return a == key;
        });
      }
    }, {
      key: "format",
      value: function format(type, element) {
        return type == 'channel' ? 'channel:' + element[Lampa.Storage.get('iptv_favotite_save', 'url')] : type == 'group' ? 'group:' + element : 'other:' + element;
      }
    }, {
      key: "remove",
      value: function remove(key) {
        return new Promise(function (resolve, reject) {
          var find = locked.find(function (a) {
            return a == key;
          });
          if (find) {
            if (Utils.canUseDB()) {
              DB.deleteData('locked', key).then(function () {
                Lampa.Arrays.remove(locked, find);
                resolve();
              })["catch"](reject);
            } else {
              Lampa.Arrays.remove(locked, find);
              Lampa.Storage.set('iptv_locked_channels', locked);
              resolve();
            }
          } else reject();
        });
      }
    }, {
      key: "add",
      value: function add(key) {
        return new Promise(function (resolve, reject) {
          if (!locked.find(function (a) {
            return a == key;
          })) {
            if (Utils.canUseDB()) {
              DB.addData('locked', key, key).then(function () {
                locked.push(key);
                resolve();
              })["catch"](reject);
            } else {
              locked.push(key);
              Lampa.Storage.set('iptv_locked_channels', locked);
              resolve();
            }
          } else reject();
        });
      }
    }, {
      key: "update",
      value: function update(key) {
        return new Promise(function (resolve, reject) {
          if (locked.find(function (a) {
            return a == key;
          })) {
            if (Utils.canUseDB()) DB.updateData('locked', key, key).then(resolve)["catch"](reject);else {
              Lampa.Storage.set('iptv_locked_channels', locked);
              resolve();
            }
          } else reject();
        });
      }
    }, {
      key: "toggle",
      value: function toggle(key) {
        return this.find(key) ? this.remove(key) : this.add(key);
      }
    }]);
  }();

  var DB = new Lampa.DB('cub_iptv', ['playlist', 'params', 'epg', 'favorites', 'other', 'epg_channels', 'locked'], 6);
  DB.logs = true;
  DB.openDatabase().then(function () {
    Favorites.load();
    Locked.load();
  })["catch"](function () {
    Favorites.nosuport();
    Locked.nosuport();
  });

  function fixParams(params_data) {
    var params = params_data || {};
    Lampa.Arrays.extend(params, {
      update: 'none',
      update_time: Date.now(),
      loading: 'cub'
    });
    return params;
  }
  var Params = /*#__PURE__*/function () {
    function Params() {
      _classCallCheck(this, Params);
    }
    return _createClass(Params, null, [{
      key: "get",
      value: function get(id) {
        return new Promise(function (resolve) {
          if (Utils.canUseDB()) {
            DB.getDataAnyCase('params', id).then(function (params) {
              resolve(fixParams(params));
            });
          } else {
            resolve(fixParams(Lampa.Storage.get('iptv_playlist_params_' + id, '{}')));
          }
        });
      }
    }, {
      key: "set",
      value: function set(id, params) {
        if (Utils.canUseDB()) {
          return DB.rewriteData('params', id, fixParams(params));
        } else {
          return new Promise(function (resolve) {
            Lampa.Storage.set('iptv_playlist_params_' + id, fixParams(params));
            resolve();
          });
        }
      }
    }, {
      key: "value",
      value: function value(params, name) {
        return Lampa.Lang.translate('iptv_params_' + params[name]);
      }
    }]);
  }();

  function isValidPath(string) {
    var url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }
  var Parser$1 = {};
  Parser$1.parse = function (content) {
    var playlist = {
      header: {},
      items: []
    };
    var lines = content.split('\n').map(parseLine);
    var firstLine = lines.find(function (l) {
      return l.index === 0;
    });
    if (!firstLine || !/^#EXTM3U/.test(firstLine.raw)) throw new Error('Playlist is not valid');
    playlist.header = parseHeader(firstLine);
    var i = 0;
    var items = {};
    var _iterator = _createForOfIteratorHelper(lines),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var line = _step.value;
        if (line.index === 0) continue;
        var string = line.raw.toString().trim();
        if (string.startsWith('#EXTINF:')) {
          var EXTINF = string;
          items[i] = {
            name: EXTINF.getName(),
            tvg: {
              id: EXTINF.getAttribute('tvg-id'),
              name: EXTINF.getAttribute('tvg-name'),
              logo: EXTINF.getAttribute('tvg-logo'),
              url: EXTINF.getAttribute('tvg-url'),
              rec: EXTINF.getAttribute('tvg-rec')
            },
            group: {
              title: EXTINF.getAttribute('group-title')
            },
            http: {
              referrer: '',
              'user-agent': EXTINF.getAttribute('user-agent')
            },
            url: undefined,
            raw: line.raw,
            line: line.index + 1,
            catchup: {
              type: EXTINF.getAttribute('catchup'),
              days: EXTINF.getAttribute('catchup-days'),
              source: EXTINF.getAttribute('catchup-source')
            },
            timeshift: EXTINF.getAttribute('timeshift')
          };
        } else if (string.startsWith('#EXTVLCOPT:')) {
          if (!items[i]) continue;
          var EXTVLCOPT = string;
          items[i].http.referrer = EXTVLCOPT.getOption('http-referrer') || items[i].http.referrer;
          items[i].http['user-agent'] = EXTVLCOPT.getOption('http-user-agent') || items[i].http['user-agent'];
          items[i].raw += "\r\n".concat(line.raw);
        } else if (string.startsWith('#EXTGRP:')) {
          if (!items[i]) continue;
          var EXTGRP = string;
          items[i].group.title = EXTGRP.getValue() || items[i].group.title;
          items[i].raw += "\r\n".concat(line.raw);
        } else {
          if (!items[i]) continue;
          var url = string.getURL();
          var user_agent = string.getParameter('user-agent');
          var referrer = string.getParameter('referer');
          if (url && isValidPath(url)) {
            items[i].url = url;
            items[i].http['user-agent'] = user_agent || items[i].http['user-agent'];
            items[i].http.referrer = referrer || items[i].http.referrer;
            items[i].raw += "\r\n".concat(line.raw);
            i++;
          } else {
            if (!items[i]) continue;
            items[i].raw += "\r\n".concat(line.raw);
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    playlist.items = Object.values(items);
    return playlist;
  };
  function parseLine(line, index) {
    return {
      index: index,
      raw: line
    };
  }
  function parseHeader(line) {
    var supportedAttrs = ['x-tvg-url', 'url-tvg'];
    var attrs = {};
    for (var _i = 0, _supportedAttrs = supportedAttrs; _i < _supportedAttrs.length; _i++) {
      var attrName = _supportedAttrs[_i];
      var tvgUrl = line.raw.getAttribute(attrName);
      if (tvgUrl) {
        attrs[attrName] = tvgUrl;
      }
    }
    return {
      attrs: attrs,
      raw: line.raw
    };
  }
  String.prototype.getName = function () {
    var name = this.split(/[\r\n]+/).shift().split(',').pop();
    return name || '';
  };
  String.prototype.getAttribute = function (name) {
    var regex = new RegExp(name + '="(.*?)"', 'gi');
    var match = regex.exec(this);
    return match && match[1] ? match[1] : '';
  };
  String.prototype.getOption = function (name) {
    var regex = new RegExp(':' + name + '=(.*)', 'gi');
    var match = regex.exec(this);
    return match && match[1] && typeof match[1] === 'string' ? match[1].replace(/\"/g, '') : '';
  };
  String.prototype.getValue = function (name) {
    var regex = new RegExp(':(.*)', 'gi');
    var match = regex.exec(this);
    return match && match[1] && typeof match[1] === 'string' ? match[1].replace(/\"/g, '') : '';
  };
  String.prototype.getURL = function () {
    return this.split('|')[0] || '';
  };
  String.prototype.getParameter = function (name) {
    var params = this.replace(/^(.*)\|/, '');
    var regex = new RegExp(name + '=(\\w[^&]*)', 'gi');
    var match = regex.exec(params);
    return match && match[1] ? match[1] : '';
  };

  var Api = /*#__PURE__*/function () {
    function Api() {
      _classCallCheck(this, Api);
    }
    return _createClass(Api, null, [{
      key: "get",
      value: function get(method, catch_error) {
        var _this = this;
        return new Promise(function (resolve, reject) {
          var account = Lampa.Storage.get('account', '{}');
          if (!account.token) return catch_error ? reject(Lang.translate('account_login_failed')) : resolve();
          _this.network.silent(_this.api_url + method, resolve, catch_error ? reject : resolve, false, {
            headers: {
              token: account.token,
              profile: account.profile.id
            }
          });
        });
      }
    }, {
      key: "time",
      value: function time(call) {
        this.network.silent(this.api_url + 'time', call, function () {
          call({
            time: Date.now()
          });
        });
      }
    }, {
      key: "m3u",
      value: function m3u(url) {
        var _this2 = this;
        return new Promise(function (resolve, reject) {
          var account = Lampa.Storage.get('account', '{}');
          if (!account.token) return reject(Lampa.Lang.translate('account_login_failed'));
          _this2.network.timeout(20000);
          _this2.network["native"](url, function (str) {
            try {
              var file = new File([str], "playlist.m3u", {
                type: "text/plain"
              });
              var formData = new FormData($('<form></form>')[0]);
              formData.append("file", file, "playlist.m3u");
              $.ajax({
                url: _this2.api_url + 'lampa',
                type: 'POST',
                data: formData,
                async: true,
                cache: false,
                contentType: false,
                timeout: 20000,
                enctype: 'multipart/form-data',
                processData: false,
                headers: {
                  token: account.token,
                  profile: account.profile.id
                },
                success: function success(j) {
                  if (j.secuses) resolve(j);else reject(Lampa.Lang.translate('account_export_fail_600') + ' (' + (j.text || j.message) + ')');
                },
                error: function error(e) {
                  e.from_error = 'M3U Function (Failed upload to CUB)';
                  reject(e);
                }
              });
            } catch (e) {
              e.from_error = 'M3U Function';
              reject(e);
            }
          }, function (e) {
            e.from_error = 'M3U Function (Failed to download file)';
            reject(e);
          }, false, {
            dataType: 'text'
          });
        });
      }
    }, {
      key: "list",
      value: function list() {
        var _this3 = this;
        return new Promise(function (resolve, reject) {
          Promise.all([_this3.get('list'), DB.getDataAnyCase('playlist', 'list')]).then(function (result) {
            if (result[0]) DB.rewriteData('playlist', 'list', result[0]);
            var playlist = result[0] || result[1] || {
              list: []
            };
            playlist.list = playlist.list.concat(Lampa.Storage.get('iptv_playlist_custom', '[]'));
            resolve(playlist);
          })["catch"](reject);
        });
      }
    }, {
      key: "m3uClient",
      value: function m3uClient(url) {
        var _this4 = this;
        return new Promise(function (resolve, reject) {
          _this4.network.timeout(20000);
          _this4.network[window.god_enabled ? 'native' : 'silent'](url, function (str) {
            if (typeof str != 'string' || str.substr(0, 7).toUpperCase() !== "#EXTM3U") {
              return reject(Lampa.Lang.translate('torrent_parser_request_error') + ' [M3UClient Function (The file is not M3U)]');
            }
            var list;
            var catchup;
            try {
              str = str.replace(/tvg-rec="(\d+)"/g, 'catchup="default" catchup-days="$1"');
              list = Parser$1.parse(str);
            } catch (e) {}
            if (list && list.items) {
              var channels = [];
              if (list.header.raw.indexOf('catchup') >= 0) {
                catchup = {
                  days: 0,
                  source: '',
                  type: ''
                };
                var m_days = list.header.raw.match(/catchup-days="(\d+)"/);
                var m_type = list.header.raw.match(/catchup="([a-z]+)"/);
                var m_source = list.header.raw.match(/catchup-source="(.*?)"/);
                if (m_days) catchup.days = m_days[1];
                if (m_type) catchup.type = m_type[1];
                if (m_source) catchup.source = m_source[1];
              }
              for (var i = 0; i < list.items.length; i++) {
                var item = list.items[i];
                var name = item.name.trim();
                var channel = {
                  id: item.tvg && item.tvg.id ? item.tvg.id : null,
                  name: name.replace(/ \((\+\d+)\)/g, ' $1').replace(/\s+(\s|ⓢ|ⓖ|ⓥ|ⓞ|Ⓢ|Ⓖ|Ⓥ|Ⓞ)/g, ' ').trim(),
                  logo: item.tvg && item.tvg.logo && item.tvg.logo.indexOf('http') == 0 ? item.tvg.logo : null,
                  group: item.group.title,
                  url: item.url,
                  catchup: item.catchup,
                  timeshift: item.timeshift,
                  tvg: item.tvg
                };
                if (!item.catchup.type && catchup && item.raw.indexOf('catchup-enable="1"') >= 0) {
                  channel.catchup = catchup;
                }
                channels.push(channel);
              }
              var result = {
                menu: [],
                channels: channels
              };
              result.menu.push({
                name: '',
                count: channels.length
              });
              var _loop = function _loop() {
                var channel = channels[_i];
                var group = channel.group;
                var find = result.menu.find(function (item) {
                  return item.name === group;
                });
                if (find) {
                  find.count++;
                } else {
                  result.menu.push({
                    name: group,
                    count: 1
                  });
                }
              };
              for (var _i = 0; _i < channels.length; _i++) {
                _loop();
              }
              resolve({
                name: '',
                playlist: result,
                secuses: true
              });
            } else {
              reject(Lampa.Lang.translate('torrent_parser_empty') + ' [M3UClient Function (Parsing m3u failed)]');
            }
          }, function (e) {
            e.from_error = 'M3UClient Function (Failed to load)';
            reject(e);
          }, false, {
            dataType: 'text'
          });
        });
      }
    }, {
      key: "playlist",
      value: function playlist(data) {
        var _this5 = this;
        var id = data.id;
        return new Promise(function (resolve, reject) {
          Promise.all([DB.getDataAnyCase('playlist', id), Params.get(id)]).then(function (result) {
            var playlist = result[0];
            var params = result[1];
            if (playlist && params) {
              var time = {
                'always': 0,
                'hour': 1000 * 60 * 60,
                'hour12': 1000 * 60 * 60 * 12,
                'day': 1000 * 60 * 60 * 24,
                'week': 1000 * 60 * 60 * 24 * 7,
                'none': 0
              };
              if (params.update_time + time[params.update] > Date.now() || params.update == 'none') return resolve(playlist);
            }
            var secuses = function secuses(result) {
              DB.rewriteData('playlist', id, result)["finally"](function () {
                if (params) params.update_time = Date.now();
                Params.set(id, params)["finally"](resolve.bind(resolve, result));
              });
            };
            var error = function error(e) {
              playlist ? resolve(playlist) : reject(e);
            };
            if (params && params.loading == 'lampa' || data.custom) {
              _this5[Lampa.Account.logged() ? 'm3u' : 'm3uClient'](data.url).then(secuses)["catch"](error);
            } else {
              _this5.get('playlist/' + id, true).then(secuses)["catch"](function () {
                _this5.m3u(data.url).then(secuses)["catch"](error);
              });
            }
          })["catch"](function (e) {
            e.from_error = 'Playlist Function (Something went wrong)';
            reject(e);
          });
        });
      }
    }, {
      key: "program",
      value: function program(data) {
        var _this6 = this;
        return new Promise(function (resolve, reject) {
          var days = Lampa.Storage.field('iptv_guide_custom') ? Lampa.Storage.field('iptv_guide_save') : 3;
          var tvg_id = data.tvg && data.tvg.id ? data.tvg.id : data.channel_id;
          var tvg_name = data.tvg && data.tvg.name ? data.tvg.name : '';
          var loadCUB = function loadCUB() {
            var id = Lampa.Storage.field('iptv_guide_custom') ? tvg_id : data.channel_id;
            _this6.network.timeout(5000);
            _this6.network.silent(_this6.api_url + 'program/' + data.channel_id + '/' + data.time + '?full=true', function (result) {
              DB.rewriteData('epg', id, result.program)["finally"](resolve.bind(resolve, result.program));
            }, function (a) {
              if (a.status == 500) DB.rewriteData('epg', id, [])["finally"](resolve.bind(resolve, []));else reject();
            });
          };
          var loadEPG = function loadEPG(id, call) {
            DB.getDataAnyCase('epg', id, 60 * 24 * days).then(function (epg) {
              if (epg) resolve(epg);else call();
            });
          };
          if (tvg_id) {
            loadEPG(tvg_id, function () {
              DB.getDataAnyCase('epg_channels', (tvg_name || data.name).toLowerCase()).then(function (gu) {
                if (gu) loadEPG(gu.id, loadCUB);else loadCUB();
              });
            });
          } else reject();
        });
      }
    }]);
  }();
  _defineProperty(Api, "network", new Lampa.Reguest());
  _defineProperty(Api, "api_url", Lampa.Utils.protocol() + Lampa.Manifest.cub_domain + '/api/iptv/');

  var Pilot = /*#__PURE__*/function () {
    function Pilot() {
      _classCallCheck(this, Pilot);
    }
    return _createClass(Pilot, null, [{
      key: "notebook",
      value: function notebook(param_name, param_set) {
        var book = Lampa.Storage.get('iptv_pilot_book', '{}');
        Lampa.Arrays.extend(book, {
          playlist: '',
          channel: -1,
          category: ''
        });
        if (typeof param_set !== 'undefined') {
          book[param_name] = param_set;
          Lampa.Storage.set('iptv_pilot_book', book);
        } else return book[param_name];
      }
    }]);
  }();

  var PlaylistItem = /*#__PURE__*/function () {
    function PlaylistItem(playlist) {
      var _this = this;
      _classCallCheck(this, PlaylistItem);
      this.playlist = playlist;
      this.item = Lampa.Template.js('cub_iptv_playlist_item');
      this.footer = this.item.find('.iptv-playlist-item__footer');
      this.params = {};
      Params.get(playlist.id).then(function (params) {
        _this.params = params;
        _this.drawFooter();
      });
      var name = playlist.name || '---';
      this.item.find('.iptv-playlist-item__url').text(playlist.url);
      this.item.find('.iptv-playlist-item__name-text').text(name);
      this.item.find('.iptv-playlist-item__name-ico span').text(name.slice(0, 1).toUpperCase());
      this.item.on('hover:long', this.displaySettings.bind(this)).on('hover:enter', function () {
        if (_this.deleted) return;
        Pilot.notebook('playlist', playlist.id);
        DB.rewriteData('playlist', 'active', playlist.id)["finally"](function () {
          _this.listener.send('channels-load', playlist);
        });
      });
      this.item.on('update', function () {
        Params.get(playlist.id).then(function (params) {
          _this.params = params;
          _this.drawFooter();
        });
      });
    }
    return _createClass(PlaylistItem, [{
      key: "displaySettings",
      value: function displaySettings() {
        var _this2 = this;
        if (this.deleted) return;
        var params = {
          update: ['always', 'hour', 'hour12', 'day', 'week', 'none'],
          loading: ['cub', 'lampa']
        };
        var menu = [];
        menu = menu.concat([{
          title: Lampa.Lang.translate('iptv_update'),
          subtitle: Params.value(this.params, 'update'),
          name: 'update'
        }, {
          title: Lampa.Lang.translate('iptv_loading'),
          subtitle: Params.value(this.params, 'loading'),
          name: 'loading'
        }, {
          title: Lampa.Lang.translate('iptv_remove_cache'),
          subtitle: Lampa.Lang.translate('iptv_remove_cache_descr')
        }]);
        if (this.playlist.custom) {
          menu = menu.concat([{
            title: Lampa.Lang.translate('more'),
            separator: true
          }, {
            title: Lampa.Lang.translate('iptv_playlist_change_name'),
            name: 'change',
            value: 'name'
          }, {
            title: Lampa.Lang.translate('extensions_change_link'),
            name: 'change',
            value: 'url'
          }, {
            title: Lampa.Lang.translate('extensions_remove'),
            name: 'delete'
          }]);
        }
        Lampa.Select.show({
          title: Lampa.Lang.translate('title_settings'),
          items: menu,
          onSelect: function onSelect(a) {
            if (a.name == 'change') {
              Lampa.Input.edit({
                title: Lampa.Lang.translate('iptv_playlist_add_set_' + a.value),
                free: true,
                nosave: true,
                value: _this2.playlist[a.value]
              }, function (value) {
                if (value) {
                  var list = Lampa.Storage.get('iptv_playlist_custom', '[]');
                  var item = list.find(function (n) {
                    return n.id == _this2.playlist.id;
                  });
                  if (item && item[a.value] !== value) {
                    item[a.value] = value;
                    _this2.playlist[a.value] = value;
                    Lampa.Storage.set('iptv_playlist_custom', list);
                    _this2.item.find('.iptv-playlist-item__' + (a.value == 'name' ? 'name-text' : 'url')).text(value);
                    Lampa.Noty.show(Lampa.Lang.translate('iptv_playlist_' + a.value + '_changed'));
                  }
                }
                Lampa.Controller.toggle('content');
              });
            } else if (a.name == 'delete') {
              Lampa.Modal.open({
                title: '',
                align: 'center',
                html: $('<div class="about">' + Lampa.Lang.translate('iptv_confirm_delete_playlist') + '</div>'),
                buttons: [{
                  name: Lampa.Lang.translate('settings_param_no'),
                  onSelect: function onSelect() {
                    Lampa.Modal.close();
                    Lampa.Controller.toggle('content');
                  }
                }, {
                  name: Lampa.Lang.translate('settings_param_yes'),
                  onSelect: function onSelect() {
                    var list = Lampa.Storage.get('iptv_playlist_custom', '[]');
                    Lampa.Arrays.remove(list, list.find(function (n) {
                      return n.id == _this2.playlist.id;
                    }));
                    Lampa.Storage.set('iptv_playlist_custom', list);
                    Lampa.Noty.show(Lampa.Lang.translate('iptv_playlist_deleted'));
                    Lampa.Modal.close();
                    Lampa.Controller.toggle('content');
                    _this2.item.style.opacity = 0.3;
                    _this2.deleted = true;
                  }
                }]
              });
            } else if (a.name) {
              var keys = params[a.name];
              var items = [];
              keys.forEach(function (k) {
                items.push({
                  title: Lampa.Lang.translate('iptv_params_' + k),
                  selected: _this2.params[a.name] == k,
                  value: k
                });
              });
              Lampa.Select.show({
                title: Lampa.Lang.translate('title_settings'),
                items: items,
                onSelect: function onSelect(b) {
                  _this2.params[a.name] = b.value;
                  Params.set(_this2.playlist.id, _this2.params).then(_this2.drawFooter.bind(_this2))["catch"](function (e) {
                    Lampa.Noty.show(e);
                  })["finally"](_this2.displaySettings.bind(_this2));
                },
                onBack: _this2.displaySettings.bind(_this2)
              });
            } else {
              DB.deleteData('playlist', _this2.playlist.id)["finally"](function () {
                Lampa.Noty.show(Lampa.Lang.translate('iptv_cache_clear'));
              });
              Lampa.Controller.toggle('content');
            }
          },
          onBack: function onBack() {
            Lampa.Controller.toggle('content');
          }
        });
      }
    }, {
      key: "drawFooter",
      value: function drawFooter() {
        var _this3 = this;
        this.footer.removeClass('hide');
        function label(where, name, value) {
          var leb_div = document.createElement('div');
          var leb_val = document.createElement('span');
          leb_div.addClass('iptv-playlist-item__label');
          if (name) leb_div.text(name + ' - ');
          leb_val.text(value);
          leb_div.append(leb_val);
          where.append(leb_div);
        }
        DB.getDataAnyCase('playlist', 'active').then(function (active) {
          var details_left = _this3.item.find('.details-left').empty();
          var details_right = _this3.item.find('.details-right').empty();
          if (active && active == _this3.playlist.id) label(details_left, '', Lampa.Lang.translate('iptv_active'));
          label(details_left, Lampa.Lang.translate('iptv_update'), Params.value(_this3.params, 'update'));
          label(details_left, Lampa.Lang.translate('iptv_loading'), Params.value(_this3.params, 'loading'));
          label(details_right, Lampa.Lang.translate('iptv_updated'), Lampa.Utils.parseTime(_this3.params.update_time).briefly);
        });
      }
    }, {
      key: "render",
      value: function render() {
        return this.item;
      }
    }]);
  }();

  var Playlist = /*#__PURE__*/function () {
    function Playlist(listener) {
      _classCallCheck(this, Playlist);
      this.listener = listener;
      this.html = Lampa.Template.js('cub_iptv_list');
      this.scroll = new Lampa.Scroll({
        mask: true,
        over: true
      });
      this.html.find('.iptv-list__title').text(Lampa.Lang.translate('iptv_select_playlist'));
      this.html.find('.iptv-list__items').append(this.scroll.render(true));
    }
    return _createClass(Playlist, [{
      key: "item",
      value: function item(data) {
        var _this = this;
        var item = new PlaylistItem(data);
        item.listener = this.listener;
        var elem = item.render();
        elem.on('hover:focus', function () {
          _this.last = elem;
          _this.scroll.update(_this.last);
        }).on('hover:hover hover:touch', function () {
          _this.last = elem;
          Navigator.focused(elem);
        });
        return item;
      }
    }, {
      key: "list",
      value: function list(playlist) {
        var _this2 = this;
        this.scroll.clear();
        this.scroll.reset();
        this.html.find('.iptv-list__text').html(Lampa.Lang.translate('iptv_select_playlist_text'));
        var add = Lampa.Template.js('cub_iptv_list_add_custom');
        add.find('.iptv-playlist-item__title').text(Lampa.Lang.translate('iptv_playlist_add_new'));
        add.on('hover:enter', function () {
          Lampa.Input.edit({
            title: Lampa.Lang.translate('iptv_playlist_add_set_url'),
            free: true,
            nosave: true,
            value: ''
          }, function (value) {
            if (value) {
              var data = {
                id: Lampa.Utils.uid(),
                custom: true,
                url: value,
                name: ''
              };
              Lampa.Storage.add('iptv_playlist_custom', data);
              var item = _this2.item(data);
              add.parentNode.insertBefore(item.render(), add.nextSibling);
            }
            Lampa.Controller.toggle('content');
          });
        });
        add.on('hover:focus', function () {
          _this2.last = add;
          _this2.scroll.update(_this2.last);
        });
        this.scroll.append(add);
        playlist.list.reverse().forEach(function (data) {
          var item = _this2.item(data);
          _this2.scroll.append(item.render());
        });
        this.listener.send('display', this);
      }
    }, {
      key: "main",
      value: function main() {
        Api.list().then(this.list.bind(this))["catch"](this.empty.bind(this));
      }
    }, {
      key: "load",
      value: function load() {
        var _this3 = this;
        Promise.all([Api.list(), DB.getDataAnyCase('playlist', 'active')]).then(function (result) {
          var playlist = result[0];
          var active = result[1] || Pilot.notebook('playlist');
          if (playlist) {
            if (active) {
              var find = playlist.list.find(function (l) {
                return l.id == active;
              });
              if (find) {
                _this3.listener.send('channels-load', find);
              } else _this3.list(playlist);
            } else _this3.list(playlist);
          } else _this3.empty();
        })["catch"](this.empty.bind(this));
      }
    }, {
      key: "empty",
      value: function empty() {
        this.scroll.clear();
        this.scroll.reset();
        this.html.find('.iptv-list__text').html(Lampa.Lang.translate('iptv_playlist_empty'));
        var empty = Lampa.Template.js('cub_iptv_list_empty');
        empty.find('.iptv-list-empty__text').html(Lampa.Lang.translate('empty_title'));
        this.scroll.append(empty);
        this.listener.send('display', this);
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var _this4 = this;
        Lampa.Controller.add('content', {
          toggle: function toggle() {
            Lampa.Controller.collectionSet(_this4.html);
            Lampa.Controller.collectionFocus(_this4.last, _this4.html);
          },
          left: function left() {
            Lampa.Controller.toggle('menu');
          },
          down: Navigator.move.bind(Navigator, 'down'),
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
          },
          back: function back() {
            Lampa.Activity.backward();
          }
        });
        Lampa.Controller.toggle('content');
      }
    }, {
      key: "render",
      value: function render() {
        return this.html;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.scroll.destroy();
        this.html.remove();
      }
    }]);
  }();

  var Icons = /*#__PURE__*/function () {
    function Icons(listener) {
      var _this = this;
      _classCallCheck(this, Icons);
      this.listener = listener;
      this.position = 0;
      this.scroll = new Lampa.Scroll({
        mask: !window.iptv_mobile,
        over: true,
        end_ratio: 2,
        horizontal: window.iptv_mobile
      });
      this.html = document.createElement('div');
      this.html.addClass('iptv-channels');
      this.scroll.append(this.html);
      if (!window.iptv_mobile) this.scroll.minus();
      this.scroll.onEnd = function () {
        _this.position++;
        _this.next();
      };
      this.listener.follow('icons-load', function (data) {
        _this.icons = data.icons;
        if (data.menu.favorites) {
          _this.icons.sort(function (a, b) {
            var ta = a.added || 0;
            var tb = b.added || 0;
            return ta < tb ? -1 : ta > tb ? 1 : 0;
          });
          _this.sort();
        }
        _this.icons_clone = Lampa.Arrays.clone(_this.icons);
        _this.html.empty();
        _this.scroll.reset();
        _this.position = 0;
        _this.last = false;
        _this.next();
        var channel = Pilot.notebook('channel');
        if (channel >= 0 && channel <= _this.icons.length && window.lampa_settings.iptv) {
          setTimeout(function () {
            _this.listener.send('play', {
              position: channel,
              total: _this.icons.length
            });
          }, 1000);
        }
      });
    }
    return _createClass(Icons, [{
      key: "sort",
      value: function sort() {
        var sort_type = Lampa.Storage.field('iptv_favotite_sort');
        if (Lampa.Account.hasPremium() && sort_type !== 'add') {
          this.icons.sort(function (a, b) {
            if (sort_type == 'name') {
              return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            } else if (sort_type == 'view') {
              var va = a.view || 0;
              var vb = b.view || 0;
              return va < vb ? 1 : va > vb ? -1 : 0;
            }
          });
        }
      }
    }, {
      key: "active",
      value: function active(item) {
        var active = this.html.find('.active');
        if (active) active.removeClass('active');
        item.addClass('active');
      }
    }, {
      key: "icon",
      value: function icon(item, element) {
        var icons = item.find('.iptv-channel__icons');
        icons.empty();
        if (Favorites.find(element)) icons.append(Lampa.Template.js('cub_iptv_icon_fav'));
        if (Locked.find(Locked.format('channel', element))) icons.append(Lampa.Template.js('cub_iptv_icon_lock'));
      }
    }, {
      key: "next",
      value: function next() {
        var _this2 = this;
        var views = 10;
        var start = this.position * views;
        this.icons.slice(start, start + views).forEach(function (element, index) {
          delete element.target;
          var item = document.createElement('div');
          var body = document.createElement('div');
          var img = document.createElement('img');
          var chn = document.createElement('div');
          var icn = document.createElement('div');
          var position = start + index;
          chn.text((position + 1).pad(3));
          item.addClass('iptv-channel selector layer--visible layer--render');
          body.addClass('iptv-channel__body');
          img.addClass('iptv-channel__ico');
          chn.addClass('iptv-channel__chn');
          icn.addClass('iptv-channel__icons');
          body.append(img);
          item.append(body);
          item.append(chn);
          item.append(icn);
          _this2.icon(item, element);
          _this2.listener.follow('update-channel-icon', function (channel) {
            if (channel.name == element.name) _this2.icon(item, element);
          });
          item.on('visible', function () {
            img.onerror = function () {
              var simb = document.createElement('div');
              simb.addClass('iptv-channel__simb');
              simb.text(element.name.length <= 3 ? element.name.toUpperCase() : element.name.replace(/[^a-z|а-я|0-9]/gi, '').toUpperCase()[0]);
              var text = document.createElement('div');
              text.addClass('iptv-channel__name');
              text.text(Utils.clear(element.name));
              body.append(simb);
              body.append(text);
            };
            img.onload = function () {
              item.addClass('loaded');
              if (element.logo.indexOf('epg.it999') == -1) {
                item.addClass('small--icon');
              }
            };
            if (element.logo) img.src = element.logo;else img.onerror();
          });
          item.on('hover:focus', function () {
            _this2.active(item);
            _this2.scroll.update(item);
            if (_this2.last !== item) _this2.listener.send('details-load', element);
            _this2.last = item;
          }).on('hover:hover hover:touch', function () {
            Navigator.focused(item);
            _this2.active(item);
            if (_this2.last !== item) _this2.listener.send('details-load', element);
            _this2.last = item;
          }).on('hover:long', function () {
            Lampa.Select.show({
              title: Lampa.Lang.translate('title_action'),
              items: [{
                title: Lampa.Lang.translate(Favorites.find(element) ? 'iptv_remove_fav' : 'iptv_add_fav'),
                type: 'favorite'
              }, {
                title: Lampa.Lang.translate(Locked.find(Locked.format('channel', element)) ? 'iptv_channel_unlock' : 'iptv_channel_lock'),
                type: 'locked'
              }],
              onSelect: function onSelect(a) {
                _this2.toggle();
                if (a.type == 'favorite') {
                  Favorites.toggle(element)["finally"](function () {
                    _this2.icon(item, element);
                    _this2.listener.send('update-favorites');
                  });
                } else if (a.type == 'locked') {
                  if (Lampa.Manifest.app_digital >= 204) {
                    if (Locked.find(Locked.format('channel', element))) {
                      Lampa.ParentalControl.query(function () {
                        _this2.toggle();
                        Locked.remove(Locked.format('channel', element))["finally"](function () {
                          _this2.icon(item, element);
                        });
                      }, _this2.toggle.bind(_this2));
                    } else {
                      Locked.add(Locked.format('channel', element))["finally"](function () {
                        _this2.icon(item, element);
                      });
                    }
                  } else {
                    Lampa.Noty.show(Lampa.Lang.translate('iptv_need_update_app'));
                  }
                }
              },
              onBack: _this2.toggle.bind(_this2)
            });
          }).on('hover:enter', function () {
            _this2.listener.send('play', {
              position: position,
              total: _this2.icons.length
            });
          });
          _this2.html.append(item);
          if (Lampa.Controller.own(_this2)) Lampa.Controller.collectionAppend(item);
        });
        setTimeout(function () {
          Lampa.Layer.visible(_this2.html);
        }, 300);
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var _this3 = this;
        Lampa.Controller.add('content', {
          link: this,
          toggle: function toggle() {
            if (_this3.html.find('.selector')) {
              Lampa.Controller.collectionSet(_this3.html);
              Lampa.Controller.collectionFocus(_this3.last, _this3.html);
            } else _this3.listener.send('toggle', 'menu');
          },
          left: function left() {
            _this3.listener.send('toggle', 'menu');
          },
          right: function right() {
            _this3.listener.send('toggle', 'details');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: function back() {
            _this3.listener.send('back');
          }
        });
        Lampa.Controller.toggle('content');
      }
    }, {
      key: "render",
      value: function render() {
        return this.scroll.render(true);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.scroll.destroy();
        this.html.remove();
      }
    }]);
  }();

  var EPG = /*#__PURE__*/function () {
    function EPG() {
      _classCallCheck(this, EPG);
    }
    return _createClass(EPG, null, [{
      key: "init",
      value: function init() {
        var _this = this;
        var ts = new Date().getTime();
        Api.time(function (json) {
          var te = new Date().getTime();
          _this.time_offset = json.time < ts || json.time > te ? json.time - te : 0;
        });
      }
    }, {
      key: "time",
      value: function time(channel) {
        var timeshift = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var date = new Date(),
          time = date.getTime() + this.time_offset,
          ofst = parseInt((localStorage.getItem('time_offset') == null ? 'n0' : localStorage.getItem('time_offset')).replace('n', ''));
        date = new Date(time + ofst * 1000 * 60 * 60);
        var offset = channel.name.match(/([+|-]\d)$/);
        if (offset) {
          date.setHours(date.getHours() + parseInt(offset[1]));
        }
        var result = date.getTime();
        result -= timeshift;
        return result;
      }
    }, {
      key: "position",
      value: function position(channel, list, timeshift) {
        var tim = this.time(channel, timeshift);
        var now = list.find(function (p) {
          return tim > p.start && tim < p.stop;
        });
        return now ? list.indexOf(now) : list.length - 1;
      }
    }, {
      key: "timeline",
      value: function timeline(channel, program, timeshift) {
        var time = this.time(channel, timeshift);
        var total = program.stop - program.start;
        var less = program.stop - time;
        return Math.min(100, Math.max(0, (1 - less / total) * 100));
      }
    }, {
      key: "list",
      value: function list(channel, _list) {
        var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
        var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var day_lst = '';
        var day_prg = '';
        var day_now = new Date(Date.now()).getDate();
        var day_nam = {};
        var display = [];
        day_nam[day_now - 1] = Lampa.Lang.translate('iptv_yesterday');
        day_nam[day_now] = Lampa.Lang.translate('iptv_today');
        day_nam[day_now + 1] = Lampa.Lang.translate('iptv_tomorrow');
        var watch = _list[this.position(channel, _list)];
        _list.slice(position, position + size).forEach(function (elem) {
          day_prg = new Date(elem.start).getDate();
          if (day_lst !== day_prg) {
            day_lst = day_prg;
            display.push({
              type: 'date',
              date: day_nam[day_prg] ? day_nam[day_prg] : Lampa.Utils.parseTime(elem.start)["short"]
            });
          }
          display.push({
            type: 'program',
            program: elem,
            watch: watch == elem
          });
        });
        return display;
      }
    }]);
  }();
  _defineProperty(EPG, "time_offset", 0);

  var Details = /*#__PURE__*/function () {
    function Details(listener) {
      var _this = this;
      _classCallCheck(this, Details);
      this.listener = listener;
      this.html = Lampa.Template.js('cub_iptv_details');
      this.title = this.html.find('.iptv-details__title');
      this.play = this.html.find('.iptv-details__play');
      this.progm = this.html.find('.iptv-details__program');
      this.progm_image = false;
      this.empty_html = Lampa.Template.js('cub_iptv_details_empty');
      this.listener.follow('details-load', this.draw.bind(this));
      if (window.iptv_mobile) this.html.removeClass('layer--wheight');
      this.timer = setInterval(function () {
        if (_this.timeline) _this.timeline();
      }, 1000 * 5);
    }
    return _createClass(Details, [{
      key: "draw",
      value: function draw(channel) {
        var _this2 = this;
        this.title.text(Utils.clearChannelName(channel.name));
        this.group(channel, Utils.clearMenuName(channel.group || Lampa.Lang.translate('player_unknown')));
        this.wait_for = channel.name;
        if (channel.id) {
          this.progm.text(Lampa.Lang.translate('loading') + '...');
          Api.program({
            name: channel.name,
            channel_id: channel.id,
            time: EPG.time(channel),
            tvg: channel.tvg
          }).then(function (program) {
            if (_this2.wait_for == channel.name) {
              if (program.length) _this2.program(channel, program);else _this2.empty();
            }
          })["catch"](function (e) {
            _this2.empty();
          });
        } else {
          this.empty();
        }
      }
    }, {
      key: "group",
      value: function group(channel, title) {
        this.play.empty();
        var group = document.createElement('span');
        group.text(title);
        if (Utils.hasArchive(channel)) {
          var archive = document.createElement('span');
          archive.addClass('lb').text('A');
          this.play.append(archive);
        }
        var hd = Utils.isHD(channel.name);
        if (hd) {
          var hd_lb = document.createElement('span');
          hd_lb.addClass('lb').text(hd.toUpperCase());
          this.play.append(hd_lb);
        }
        this.play.append(group);
      }
    }, {
      key: "empty",
      value: function empty() {
        this.timeline = false;
        this.progm.empty().append(this.empty_html);
      }
    }, {
      key: "buildProgramList",
      value: function buildProgramList(channel, program, params) {
        var _this3 = this;
        var stime = EPG.time(channel);
        var start = EPG.position(channel, program);
        var archive = Utils.hasArchive(channel);
        if (!params && program[start]) {
          this.group(channel, Lampa.Utils.shortText(Utils.clear(program[start].title), 50));
        }
        return new Lampa.Endless(function (position) {
          if (position >= program.length) return _this3.endless.to(position - 1);
          var wrap = document.createElement('div');
          var list = EPG.list(channel, program, 10, position);
          wrap.addClass('iptv-details__list');
          list.forEach(function (elem, index) {
            var item = document.createElement('div');
            if (elem.type == 'date') item.addClass('iptv-program-date').text(elem.date);else {
              item.addClass('iptv-program selector');
              var head, icon_wrap, icon_img, head_body;
              var time = document.createElement('div');
              time.addClass('iptv-program__time').text(Lampa.Utils.parseTime(elem.program.start).time);
              var body = document.createElement('div');
              body.addClass('iptv-program__body');
              var title = document.createElement('div');
              title.addClass('iptv-program__title').text(Utils.clear(elem.program.title));
              if (elem.program.icon && index == 1) {
                head = document.createElement('div');
                head_body = document.createElement('div');
                icon_wrap = document.createElement('div');
                icon_img = document.createElement('img');
                head.addClass('iptv-program__head');
                head_body.addClass('iptv-program__head-body');
                icon_wrap.addClass('iptv-program__icon-wrap');
                icon_img.addClass('iptv-program__icon-img');
                icon_wrap.append(icon_img);
                head.append(icon_wrap);
                head.append(head_body);
                head_body.append(title);
                body.append(head);
                if (_this3.progm_image && _this3.progm_image.waiting) _this3.progm_image.src = '';
                icon_img.onload = function () {
                  icon_img.waiting = false;
                  icon_wrap.addClass('loaded');
                };
                icon_img.error = function () {
                  icon_wrap.addClass('loaded-error');
                  icon_img.src = './img/img_broken.svg';
                };
                icon_img.waiting = true;
                icon_img.src = elem.program.icon;
                _this3.progm_image = icon_img;
              } else {
                body.append(title);
              }
              if (elem.watch) {
                var timeline = document.createElement('div');
                timeline.addClass('iptv-program__timeline');
                var div = document.createElement('div');
                div.style.width = EPG.timeline(channel, elem.program) + '%';
                timeline.append(div);
                if (!params) {
                  _this3.timeline = function () {
                    var percent = EPG.timeline(channel, elem.program);
                    div.style.width = percent + '%';
                    if (percent == 100) {
                      var next = EPG.position(channel, program);
                      if (start !== next) _this3.program(channel, program);
                    }
                  };
                }
                if (archive) {
                  item.on('hover:enter', function () {
                    var data = {
                      program: elem.program,
                      position: position,
                      channel: channel,
                      playlist: program.slice(Math.max(0, position - 40), start)
                    };
                    if (params) params.onPlay(data);else _this3.listener.send('play-archive', data);
                  });
                }
                item.addClass('played');
                if (elem.program.icon && head_body) {
                  head_body.append(timeline);
                } else {
                  body.append(timeline);
                }
              }
              if (index == 1 && elem.program.desc) {
                var text = Utils.clear(elem.program.desc);
                if (text.length > 300) text = text.slice(0, 300) + '...';
                var descr = document.createElement('div');
                descr.addClass('iptv-program__descr').text(text);
                body.append(descr);
              }
              if (archive) {
                var minus = stime - archive * 1000 * 60 * 60 * 24;
                if (elem.program.start > minus && elem.program.stop < stime) {
                  item.addClass('archive');
                  item.on('hover:enter', function () {
                    var data = {
                      program: elem.program,
                      position: position,
                      channel: channel,
                      timeshift: stime - elem.program.start,
                      playlist: program.slice(Math.max(0, position - 40), start)
                    };
                    if (params) params.onPlay(data);else _this3.listener.send('play-archive', data);
                  });
                }
              }
              item.append(time);
              item.append(body);
            }
            wrap.append(item);
          });
          return wrap;
        }, {
          position: start
        });
      }

      /**
       * Программа в плеере
       */
    }, {
      key: "playlist",
      value: function playlist(channel, program) {
        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return this.buildProgramList(channel, program, params);
      }

      /**
       * Программа в главном интерфейсе
       */
    }, {
      key: "program",
      value: function program(channel, _program) {
        if (this.endless) this.endless.destroy();
        this.timeline = false;
        this.endless = this.buildProgramList(channel, _program);
        this.progm.empty().append(this.endless.render());
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var _this4 = this;
        Lampa.Controller.add('content', {
          link: this,
          toggle: function toggle() {
            if (_this4.html.find('.selector')) {
              Lampa.Controller.collectionSet(_this4.html);
              Lampa.Controller.collectionFocus(false, _this4.html);
            } else _this4.listener.send('toggle', 'icons');
          },
          left: function left() {
            _this4.listener.send('toggle', 'icons');
          },
          up: function up() {
            if (_this4.endless) {
              _this4.endless.move(-1);
              Lampa.Controller.collectionSet(_this4.html);
              Lampa.Controller.collectionFocus(false, _this4.html);
            }
          },
          down: function down() {
            if (_this4.endless) {
              _this4.endless.move(1);
              Lampa.Controller.collectionSet(_this4.html);
              Lampa.Controller.collectionFocus(false, _this4.html);
            }
          },
          back: function back() {
            _this4.listener.send('back');
          }
        });
        Lampa.Controller.toggle('content');
      }
    }, {
      key: "render",
      value: function render() {
        return this.html;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.html.remove();
        clearInterval(this.timer);
        this.wait_for = false;
      }
    }]);
  }();

  var last_query = '';
  var Search = /*#__PURE__*/function () {
    function Search() {
      _classCallCheck(this, Search);
    }
    return _createClass(Search, null, [{
      key: "find",
      value: function find(channels, call) {
        var controller = Lampa.Controller.enabled().name;
        Lampa.Input.edit({
          value: last_query,
          free: true,
          nosave: true
        }, function (new_value) {
          last_query = new_value;
          Lampa.Controller.toggle(controller);
          call({
            channels: channels.filter(function (c) {
              return c.name.toLowerCase().indexOf(new_value.toLowerCase()) >= 0;
            }),
            query: new_value
          });
        });
      }
    }]);
  }();

  var Menu = /*#__PURE__*/function () {
    function Menu(listener) {
      _classCallCheck(this, Menu);
      this.listener = listener;
      this.html = Lampa.Template.js('cub_iptv_menu');
      this.menu = this.html.find('.iptv-menu__list');
      this.scroll = new Lampa.Scroll({
        mask: !window.iptv_mobile,
        over: true,
        horizontal: window.iptv_mobile
      });
      if (!window.iptv_mobile) this.scroll.minus();
      this.scroll.append(this.html);
    }
    return _createClass(Menu, [{
      key: "favorites",
      value: function favorites(channels) {
        var favorites = Favorites.list();
        if (Lampa.Storage.get('iptv_favotite_save', 'url') == 'name') {
          favorites = favorites.filter(function (f) {
            return channels.find(function (c) {
              return c.name == f.name;
            });
          });
          favorites.forEach(function (f) {
            f.url = channels.find(function (c) {
              return c.name == f.name;
            }).url;
          });
        }
        return favorites;
      }
    }, {
      key: "build",
      value: function build(data) {
        var _this = this;
        this.menu.empty();
        var search_item = {
          name: Lampa.Lang.translate('search'),
          count: 0,
          search: true
        };
        this.html.find('.iptv-menu__title').text(data.name || Lampa.Lang.translate('player_playlist'));
        this.html.find('.iptv-menu__search').on('hover:enter', function () {
          Search.find(data.playlist.channels, search_item.update);
        });
        Lampa.Arrays.insert(data.playlist.menu, 0, search_item);
        var favorites = this.favorites(data.playlist.channels);
        var category = Pilot.notebook('category');
        Lampa.Arrays.insert(data.playlist.menu, 0, {
          name: Lampa.Lang.translate('settings_input_links'),
          count: favorites.length,
          favorites: true
        });
        var first;
        var first_item;
        var pilot;
        if (window.iptv_mobile) {
          var mobile_seacrh_button = Lampa.Template.js('iptv_menu_mobile_button_search');
          mobile_seacrh_button.on('hover:enter', function () {
            Search.find(data.playlist.channels, search_item.update);
          });
          this.menu.append(mobile_seacrh_button);
        }
        data.playlist.menu.forEach(function (menu) {
          if (menu.count == 0 && !(menu.favorites || menu.search)) return;
          var li = document.createElement('div');
          var co = document.createElement('span');
          var nm = document.createElement('div');
          var ic = document.createElement('div');
          li.addClass('iptv-menu__list-item selector');
          ic.addClass('iptv-menu__list-item-icon');
          nm.text(Utils.clearMenuName(menu.name || Lampa.Lang.translate('iptv_all_channels')));
          co.text(menu.count);
          li.append(ic);
          li.append(nm);
          li.append(co);
          var icon_name = 'group';
          if (menu.favorites) icon_name = 'fav';
          if (menu.search) icon_name = 'searched';
          if (!menu.name) icon_name = 'all';
          ic.append(Lampa.Template.js('cub_iptv_icon_' + icon_name));
          if (menu.favorites) {
            li.addClass('favorites--menu-item');
            _this.listener.follow('update-favorites', function () {
              favorites = Favorites.list();
              menu.count = favorites.length;
              co.text(menu.count);
            });
          } else if (menu.search) {
            li.addClass('search--menu-item');
            menu.update = function (result) {
              menu.find = result.channels;
              menu.count = result.channels.length;
              co.text(result.channels.length);
              if (menu.count) Lampa.Utils.trigger(li, 'hover:enter');else {
                Lampa.Noty.show(Lampa.Lang.translate('iptv_search_no_result') + ' (' + result.query + ')');
                if (first_item) Lampa.Utils.trigger(first_item, 'hover:enter');
              }
            };
          } else {
            if (!first_item) {
              first_item = li;
            }
            if (menu.name) {
              var updateIcon = function updateIcon() {
                ic.empty();
                ic.append(Lampa.Template.js('cub_iptv_icon_' + (Locked.find(Locked.format('group', menu.name)) ? 'lock' : 'group')));
              };
              updateIcon();
              li.on('hover:long', function () {
                Lampa.Select.show({
                  title: Lampa.Lang.translate('title_action'),
                  items: [{
                    title: Lampa.Lang.translate(Locked.find(Locked.format('group', menu.name)) ? 'iptv_channel_unlock' : 'iptv_channel_lock'),
                    type: 'locked'
                  }],
                  onSelect: function onSelect(a) {
                    _this.toggle();
                    if (a.type == 'locked') {
                      if (Lampa.Manifest.app_digital >= 204) {
                        if (Locked.find(Locked.format('group', menu.name))) {
                          Lampa.ParentalControl.query(function () {
                            _this.toggle();
                            Locked.remove(Locked.format('group', menu.name))["finally"](updateIcon);
                          }, _this.toggle.bind(_this));
                        } else {
                          Locked.add(Locked.format('group', menu.name))["finally"](updateIcon);
                        }
                      } else {
                        Lampa.Noty.show(Lampa.Lang.translate('iptv_need_update_app'));
                      }
                    }
                  },
                  onBack: _this.toggle.bind(_this)
                });
              });
            }
          }
          li.on('hover:enter', function () {
            if (menu.count == 0) return;
            var load = function load() {
              Pilot.notebook('category', menu.name || 'all');
              _this.listener.send('icons-load', {
                menu: menu,
                icons: menu.name ? data.playlist.channels.filter(function (a) {
                  return a.group == menu.name;
                }) : data.playlist.channels
              });
            };
            var toggle = function toggle() {
              var active = _this.menu.find('.active');
              if (active) active.removeClass('active');
              li.addClass('active');
              _this.last = li;
              _this.listener.send('toggle', 'icons');
            };
            if (menu.favorites) {
              Pilot.notebook('category', '');
              _this.listener.send('icons-load', {
                menu: menu,
                icons: favorites
              });
            } else if (menu.search) {
              Pilot.notebook('category', '');
              _this.listener.send('icons-load', {
                menu: menu,
                icons: menu.find
              });
            } else {
              if (Lampa.Manifest.app_digital >= 204 && Locked.find(Locked.format('group', menu.name))) {
                return Lampa.ParentalControl.query(function () {
                  load();
                  toggle();
                }, _this.toggle.bind(_this));
              } else load();
            }
            toggle();
          });
          li.on('hover:focus', function () {
            _this.scroll.update(li, true);
            _this.last = li;
          });
          if (!first && menu.count !== 0) first = li;
          if (menu.name == category && category || !menu.name && category == 'all') pilot = li;
          _this.menu.append(li);
        });
        if (pilot) Lampa.Utils.trigger(pilot, 'hover:enter');else if (first) Lampa.Utils.trigger(first, 'hover:enter');
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var _this2 = this;
        Lampa.Controller.add('content', {
          toggle: function toggle() {
            Lampa.Controller.collectionSet(_this2.html);
            Lampa.Controller.collectionFocus(_this2.last, _this2.html);
          },
          left: function left() {
            Lampa.Controller.toggle('menu');
          },
          right: function right() {
            _this2.listener.send('toggle', 'icons');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: function back() {
            _this2.listener.send('back');
          }
        });
        Lampa.Controller.toggle('content');
      }
    }, {
      key: "render",
      value: function render() {
        return this.scroll.render(true);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.scroll.destroy();
        this.html.remove();
      }
    }]);
  }();

  function strReplace(str, key2val) {
    for (var key in key2val) {
      str = str.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), key2val[key]);
    }
    return str;
  }
  function tf(t, format, u, tz) {
    format = format || '';
    tz = parseInt(tz || '0');
    var thisOffset = EPG.time_offset;
    thisOffset += tz;
    if (!u) thisOffset += parseInt(Lampa.Storage.get('time_offset', 'n0').replace('n', '')) * 60 - new Date().getTimezoneOffset();
    var d = new Date((t + thisOffset) * 1000);
    var r = {
      yyyy: d.getUTCFullYear(),
      MM: ('0' + (d.getUTCMonth() + 1)).substr(-2),
      dd: ('0' + d.getUTCDate()).substr(-2),
      HH: ('0' + d.getUTCHours()).substr(-2),
      mm: ('0' + d.getUTCMinutes()).substr(-2),
      ss: ('0' + d.getUTCSeconds()).substr(-2),
      UTF: t
    };
    return strReplace(format, r);
  }
  function unixtime$1() {
    return Math.floor((new Date().getTime() + EPG.time_offset) / 1000);
  }
  var Url = /*#__PURE__*/function () {
    function Url() {
      _classCallCheck(this, Url);
    }
    return _createClass(Url, null, [{
      key: "prepareUrl",
      value: function prepareUrl(url, program) {
        var m = [],
          val = '',
          r = {
            start: unixtime$1,
            offset: 0
          };
        if (program) {
          var start = Math.floor(program.start / 1000);
          var end = Math.floor(program.stop / 1000);
          var duration = end - start;
          r = {
            start: start,
            utc: start,
            end: end,
            utcend: end,
            offset: unixtime$1() - start,
            duration: duration,
            durationfs: end > unixtime$1() ? 'now' : duration,
            now: unixtime$1,
            lutc: unixtime$1,
            timestamp: unixtime$1,
            d: function d(m) {
              return strReplace(m[6] || '', {
                M: Math.floor(duration / 60),
                S: duration,
                h: Math.floor(duration / 60 / 60),
                m: ('0' + Math.floor(duration / 60) % 60).substr(-2),
                s: '00'
              });
            },
            b: function b(m) {
              return tf(start, m[6], m[4], m[5]);
            },
            e: function e(m) {
              return tf(end, m[6], m[4], m[5]);
            },
            n: function n(m) {
              return tf(unixtime$1(), m[6], m[4], m[5]);
            }
          };
        }
        while (!!(m = url.match(/\${(\((([a-zA-Z\d]+?)(u)?)([+-]\d+)?\))?([^${}]+)}/))) {
          if (!!m[2] && typeof r[m[2]] === "function") val = r[m[2]](m);else if (!!m[3] && typeof r[m[3]] === "function") val = r[m[3]](m);else if (m[6] in r) val = typeof r[m[6]] === "function" ? r[m[6]]() : r[m[6]];else val = m[1];
          url = url.replace(m[0], encodeURIComponent(val));
        }
        return url;
      }
    }, {
      key: "catchupUrl",
      value: function catchupUrl(url, type, source) {
        type = (type || '').toLowerCase();
        source = source || '';
        if (!type) {
          if (!!source) {
            if (source.search(/^https?:\/\//i) === 0) type = 'default';else if (source.search(/^[?&/][^/]/) === 0) type = 'append';else type = 'default';
          } else if (url.indexOf('${') < 0) type = 'shift';else type = 'default';
          console.log('IPTV', 'Autodetect catchup-type "' + type + '"');
        }
        var newUrl = '';
        switch (type) {
          case 'append':
            if (source) {
              newUrl = (source.search(/^https?:\/\//i) === 0 ? '' : url) + source;
              break; // так и задумано
            }
          case 'timeshift': // @deprecated
          case 'shift':
            // + append
            newUrl = source || url;
            newUrl += (newUrl.indexOf('?') >= 0 ? '&' : '?') + 'utc=${start}&lutc=${timestamp}';
            return newUrl;
          case 'flussonic':
          case 'flussonic-hls':
          case 'flussonic-ts':
          case 'fs':
            // Example stream and catchup URLs
            // stream:  http://ch01.spr24.net/151/mpegts?token=my_token
            // catchup: http://ch01.spr24.net/151/timeshift_abs-{utc}.ts?token=my_token
            // stream:  http://list.tv:8888/325/index.m3u8?token=secret
            // catchup: http://list.tv:8888/325/timeshift_rel-{offset:1}.m3u8?token=secret
            // stream:  http://list.tv:8888/325/mono.m3u8?token=secret
            // catchup: http://list.tv:8888/325/mono-timeshift_rel-{offset:1}.m3u8?token=secret
            // stream:  http://list.tv:8888/325/live?token=my_token
            // catchup: http://list.tv:8888/325/{utc}.ts?token=my_token
            // See doc: https://flussonic.ru/doc/proigryvanie/vosproizvedenie-hls/
            return url.replace(/\/(video\d*|mono\d*)\.(m3u8|ts)(\?|$)/, '/$1-\${start}-\${durationfs}.$2$3').replace(/\/(index|playlist)\.(m3u8|ts)(\?|$)/, '/archive-\${start}-\${durationfs}.$2$3').replace(/\/mpegts(\?|$)/, '/timeshift_abs-\${start}.ts$1').replace(/\/live(\?|$)/, '/\${start}.ts$1');
          case 'xc':
            // Example stream and catchup URLs
            // stream:  http://list.tv:8080/my@account.xc/my_password/1477
            // catchup: http://list.tv:8080/timeshift/my@account.xc/my_password/{duration}/{Y}-{m}-{d}:{H}-{M}/1477.ts
            // stream:  http://list.tv:8080/live/my@account.xc/my_password/1477.m3u8
            // catchup: http://list.tv:8080/timeshift/my@account.xc/my_password/{duration}/{Y}-{m}-{d}:{H}-{M}/1477.m3u8
            newUrl = url.replace(/^(https?:\/\/[^/]+)(\/live)?(\/[^/]+\/[^/]+\/)([^/.]+)\.m3u8?$/, '$1/timeshift$3\${(d)M}/\${(b)yyyy-MM-dd:HH-mm}/$4.m3u8').replace(/^(https?:\/\/[^/]+)(\/live)?(\/[^/]+\/[^/]+\/)([^/.]+)(\.ts|)$/, '$1/timeshift$3\${(d)M}/\${(b)yyyy-MM-dd:HH-mm}/$4.ts');
            break;
          case 'default':
            newUrl = source || url;
            break;
          case 'disabled':
            return false;
          default:
            console.log('IPTV', 'Err: no support catchup-type="' + type + '"');
            return false;
        }
        if (newUrl.indexOf('${') < 0) return this.catchupUrl(newUrl, 'shift');
        return newUrl;
      }
    }]);
  }();

  var HUDMenu = /*#__PURE__*/function () {
    function HUDMenu(listener, channel) {
      _classCallCheck(this, HUDMenu);
      this.listener = listener;
      this.channel = channel;
      this.original = channel.original;
      this.html = document.createElement('div');
    }
    return _createClass(HUDMenu, [{
      key: "create",
      value: function create() {
        var _this = this;
        var info = $("\n            <div class=\"iptv-hud-menu-info\">\n                <div class=\"iptv-hud-menu-info__group\">".concat(this.channel.group, "</div>\n                <div class=\"iptv-hud-menu-info__name\">").concat(this.channel.name, "</div>\n            </div>\n        "))[0];
        var favorite = this.button(Lampa.Template.get('cub_iptv_icon_favorite', {}, true), Lampa.Lang.translate('settings_input_links'), function () {
          Favorites.toggle(_this.original)["finally"](function () {
            favorite.toggleClass('active', Boolean(Favorites.find(_this.original)));
            _this.listener.send('action-favorite', _this.original);
          });
        });
        var locked = this.button(Lampa.Template.get('cub_iptv_icon_lock', {}, true), Lampa.Lang.translate(Locked.find(Locked.format('channel', this.original)) ? 'iptv_channel_unlock' : 'iptv_channel_lock'), function () {
          var name = Lampa.Controller.enabled().name;
          if (Lampa.Manifest.app_digital >= 204) {
            if (Locked.find(Locked.format('channel', _this.original))) {
              Lampa.ParentalControl.query(function () {
                Lampa.Controller.toggle(name);
                Locked.remove(Locked.format('channel', _this.original))["finally"](function () {
                  locked.toggleClass('active', Boolean(Locked.find(Locked.format('channel', _this.original))));
                  _this.listener.send('action-locked', _this.original);
                });
              }, function () {
                Lampa.Controller.toggle(name);
              });
            } else {
              Locked.add(Locked.format('channel', _this.original))["finally"](function () {
                locked.toggleClass('active', Boolean(Locked.find(Locked.format('channel', _this.original))));
                _this.listener.send('action-locked', _this.original);
              });
            }
          } else {
            Lampa.Noty.show(Lampa.Lang.translate('iptv_need_update_app'));
          }
        });
        favorite.toggleClass('active', Boolean(Favorites.find(this.original)));
        locked.toggleClass('active', Boolean(Locked.find(Locked.format('channel', this.original))));
        this.html.append(info);
        this.html.append(favorite);
        this.html.append(locked);
      }
    }, {
      key: "button",
      value: function button(icon, text, call) {
        var button = $("\n            <div class=\"iptv-hud-menu-button selector\">\n                <div class=\"iptv-hud-menu-button__icon\">".concat(icon, "</div>\n                <div class=\"iptv-hud-menu-button__text\">").concat(text, "</div>\n            </div>\n        "));
        button.on('hover:enter', call);
        return button[0];
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var _this2 = this;
        Lampa.Controller.add('player_iptv_hud_menu', {
          toggle: function toggle() {
            Lampa.Controller.collectionSet(_this2.render());
            Lampa.Controller.collectionFocus(false, _this2.render());
          },
          up: function up() {
            Navigator.move('up');
          },
          down: function down() {
            Navigator.move('down');
          },
          right: function right() {
            _this2.listener.send('toggle_program');
          },
          gone: function gone() {
            var focus = _this2.html.find('.focus');
            if (focus) focus.removeClass('focus');
          },
          back: function back() {
            _this2.listener.send('close');
          }
        });
        Lampa.Controller.toggle('player_iptv_hud_menu');
      }
    }, {
      key: "render",
      value: function render() {
        return this.html;
      }
    }, {
      key: "destroy",
      value: function destroy() {}
    }]);
  }();

  var HUDProgram = /*#__PURE__*/function () {
    function HUDProgram(listener, channel, program) {
      _classCallCheck(this, HUDProgram);
      this.listener = listener;
      this.channel = channel;
      this.html = document.createElement('div');
    }
    return _createClass(HUDProgram, [{
      key: "create",
      value: function create() {
        var _this = this;
        this.listener.follow('set_program_endless', function (event) {
          _this.endless = event.endless;
          _this.html.append(event.endless.render());
        });
        this.listener.send('get_program_endless');
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var _this2 = this;
        Lampa.Controller.add('player_iptv_hud_program', {
          toggle: function toggle() {
            Lampa.Controller.collectionSet(_this2.render());
            Lampa.Controller.collectionFocus(false, _this2.render());
          },
          up: function up() {
            _this2.endless.move(-1);
            Lampa.Controller.collectionSet(_this2.render());
            Lampa.Controller.collectionFocus(false, _this2.render());
          },
          down: function down() {
            _this2.endless.move(1);
            Lampa.Controller.collectionSet(_this2.render());
            Lampa.Controller.collectionFocus(false, _this2.render());
          },
          left: function left() {
            _this2.listener.send('toggle_menu');
          },
          gone: function gone() {
            var focus = _this2.html.find('.focus');
            if (focus) focus.removeClass('focus');
          },
          back: function back() {
            _this2.listener.send('close');
          }
        });
        Lampa.Controller.toggle('player_iptv_hud_program');
      }
    }, {
      key: "render",
      value: function render() {
        return this.html;
      }
    }, {
      key: "destroy",
      value: function destroy() {}
    }]);
  }();

  var HUD = /*#__PURE__*/function () {
    function HUD(channel, program) {
      _classCallCheck(this, HUD);
      this.listener = Lampa.Subscribe();
      this.menu = new HUDMenu(this.listener, channel, program);
      this.program = new HUDProgram(this.listener, channel, program);
      this.hud = Lampa.Template.js('cub_iptv_hud');
      this.hud.find('.iptv-hud__menu').append(this.menu.render());
      this.hud.find('.iptv-hud__program').append(this.program.render());
      document.body.find('.player').append(this.hud);
      this.listen();
    }
    return _createClass(HUD, [{
      key: "create",
      value: function create() {
        this.menu.create();
        this.program.create();
        this.menu.toggle();
      }
    }, {
      key: "listen",
      value: function listen() {
        var _this = this;
        this.listener.follow('toggle_menu', function () {
          _this.menu.toggle();
        });
        this.listener.follow('toggle_program', function () {
          _this.program.toggle();
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.menu.destroy();
        this.program.destroy();
        this.hud.remove();
      }
    }]);
  }();

  var Channels = /*#__PURE__*/function () {
    function Channels(listener) {
      var _this = this;
      _classCallCheck(this, Channels);
      this.listener = listener;
      this.html = Lampa.Template.js('cub_iptv_content');
      this.inner_listener = Lampa.Subscribe();
      this.menu = new Menu(this.inner_listener);
      this.icons = new Icons(this.inner_listener);
      this.details = new Details(this.inner_listener);
      this.inner_listener.follow('toggle', function (name) {
        _this[name].toggle();
        _this.active = _this[name];
      });
      this.inner_listener.follow('back', function () {
        _this.listener.send('playlist-main');
      });
      this.inner_listener.follow('play', this.playChannel.bind(this));
      this.inner_listener.follow('play-archive', this.playArchive.bind(this));
      this.active = this.menu;
      this.html.find('.iptv-content__menu').append(this.menu.render());
      this.html.find('.iptv-content__channels').append(this.icons.render());
      this.html.find('.iptv-content__details').append(this.details.render());
    }
    return _createClass(Channels, [{
      key: "build",
      value: function build(data) {
        this.empty = false;
        this.menu.build(data);
        this.listener.send('display', this);
      }
    }, {
      key: "addToHistory",
      value: function addToHistory(channel) {
        var board = Lampa.Storage.cache('iptv_play_history_main_board', 20, []);
        var find = board.find(function (a) {
          return a.url == channel.url;
        });
        if (find) Lampa.Arrays.remove(board, find);
        board.push(channel);
        Lampa.Storage.set('iptv_play_history_main_board', board);
      }
    }, {
      key: "playArchive",
      value: function playArchive(data) {
        var convert = function convert(p) {
          var item = {
            title: Lampa.Utils.parseTime(p.start).time + ' - ' + Lampa.Utils.capitalizeFirstLetter(p.title)
          };
          item.url = Url.catchupUrl(data.channel.url, data.channel.catchup.type, data.channel.catchup.source);
          item.url = Url.prepareUrl(item.url, p);
          item.need_check_live_stream = true;
          return item;
        };
        Lampa.Player.runas(Lampa.Storage.field('player_iptv'));
        Lampa.Player.play(convert(data.program));
        Lampa.Player.playlist(data.playlist.map(convert));
      }
    }, {
      key: "playChannel",
      value: function playChannel(data) {
        var _this2 = this;
        var cache = {};
        cache.none = [];
        var time;
        var update;
        var start_channel = Lampa.Arrays.clone(this.icons.icons_clone[data.position]);
        start_channel.original = this.icons.icons_clone[data.position];
        data.url = Url.prepareUrl(start_channel.url);
        if (this.archive && this.archive.channel == start_channel.original) {
          data.url = Url.catchupUrl(this.archive.channel.url, this.archive.channel.catchup.type, this.archive.channel.catchup.source);
          data.url = Url.prepareUrl(data.url, this.archive.program);
        } else {
          this.addToHistory(Lampa.Arrays.clone(start_channel));
        }
        data.locked = Boolean(Locked.find(Locked.format('channel', start_channel.original)));
        data.onGetChannel = function (position) {
          var original = _this2.icons.icons_clone[position];
          var channel = Lampa.Arrays.clone(original);
          var timeshift = _this2.archive && _this2.archive.channel == original ? _this2.archive.timeshift : 0;
          channel.name = Utils.clearChannelName(channel.name);
          channel.group = Utils.clearMenuName(channel.group);
          channel.url = Url.prepareUrl(channel.url);
          channel.icons = [];
          channel.original = original;
          if (timeshift) {
            channel.shift = timeshift;
            channel.url = Url.catchupUrl(original.url, channel.catchup.type, channel.catchup.source);
            channel.url = Url.prepareUrl(channel.url, _this2.archive.program);
          }
          if (Locked.find(Locked.format('channel', original))) {
            channel.locked = true;
          }
          if (Boolean(Favorites.find(channel))) {
            channel.icons.push(Lampa.Template.get('cub_iptv_icon_fav', {}, true));
          }
          if (Boolean(Locked.find(Locked.format('channel', channel)))) {
            channel.icons.push(Lampa.Template.get('cub_iptv_icon_lock', {}, true));
          }
          update = false;
          if (channel.id) {
            if (!cache[channel.id]) {
              cache[channel.id] = [];
              Api.program({
                name: channel.name,
                channel_id: channel.id,
                tvg: channel.tvg,
                time: EPG.time(channel, timeshift)
              }).then(function (program) {
                cache[channel.id] = program;
              })["finally"](function () {
                Lampa.Player.programReady({
                  channel: channel,
                  position: EPG.position(channel, cache[channel.id], timeshift),
                  total: cache[channel.id].length
                });
              });
            } else {
              Lampa.Player.programReady({
                channel: channel,
                position: EPG.position(channel, cache[channel.id], timeshift),
                total: cache[channel.id].length
              });
            }
          } else {
            Lampa.Player.programReady({
              channel: channel,
              position: 0,
              total: 0
            });
          }
          return channel;
        };
        data.onMenu = function (channel) {
          _this2.hud = new HUD(channel);
          _this2.hud.listener.follow('close', function () {
            _this2.hud = _this2.hud.destroy();
            Lampa.Controller.toggle('player_tv');
          });
          _this2.hud.listener.follow('get_program_endless', function () {
            var program = cache[channel.id || 'none'];
            var endless = _this2.details.playlist(channel, program, {
              onPlay: function onPlay(param) {
                Lampa.Player.close();
                _this2.playArchive(param);
              }
            });
            _this2.hud.listener.send('set_program_endless', {
              endless: endless
            });
          });
          _this2.hud.listener.follow('action-favorite', function (orig) {
            Lampa.PlayerIPTV.redrawChannel();
            _this2.inner_listener.send('update-favorites');
            _this2.inner_listener.send('update-channel-icon', orig);
          });
          _this2.hud.listener.follow('action-locked', function (orig) {
            Lampa.PlayerIPTV.redrawChannel();
            _this2.inner_listener.send('update-channel-icon', orig);
          });
          _this2.hud.create();
        };

        //устарело, потом удалить
        data.onPlaylistProgram = function (channel) {
          var program = cache[channel.id || 'none'];
          if (!program.length) return;
          var html = document.createElement('div');
          html.style.lineHeight = '1.4';
          Lampa.Modal.open({
            title: '',
            size: 'medium',
            html: $(html)
          });
          var endless = _this2.details.playlist(channel, program, {
            onPlay: function onPlay(param) {
              Lampa.Modal.close();
              Lampa.Player.close();
              _this2.playArchive(param);
            }
          });
          html.append(endless.render());
          Lampa.Controller.add('modal', {
            invisible: true,
            toggle: function toggle() {
              Lampa.Controller.collectionSet(html);
              Lampa.Controller.collectionFocus(false, html);
            },
            up: function up() {
              endless.move(-1);
              Lampa.Controller.collectionSet(html);
              Lampa.Controller.collectionFocus(false, html);
            },
            down: function down() {
              endless.move(1);
              Lampa.Controller.collectionSet(html);
              Lampa.Controller.collectionFocus(false, html);
            },
            back: function back() {
              Lampa.Modal.close();
              Lampa.Controller.toggle('player_tv');
            }
          });
          Lampa.Controller.toggle('modal');
        };
        data.onPlay = function (channel) {
          Pilot.notebook('channel', _this2.icons.icons_clone.indexOf(channel.original));
          if (channel.original.added) {
            channel.original.view++;
            Favorites.update(channel.original);
          }
        };
        data.onGetProgram = function (channel, position, container) {
          update = false;
          var timeshift = channel.shift || 0;
          var program = cache[channel.id || 'none'];
          var noprog = document.createElement('div');
          noprog.addClass('player-panel-iptv-item__prog-load');
          noprog.text(Lampa.Lang.translate('iptv_noprogram'));
          container[0].empty().append(noprog);
          if (program.length) {
            var start = EPG.position(channel, program, timeshift);
            var list = program.slice(position, position + 2);
            var now = program[start];
            if (list.length) container[0].empty();
            list.forEach(function (prog) {
              var item = document.createElement('div');
              item.addClass('player-panel-iptv-item__prog-item');
              var span = document.createElement('span');
              span.html(Lampa.Utils.parseTime(prog.start).time + (now == prog ? ' - ' + Lampa.Utils.parseTime(prog.stop).time : '') + ' &nbsp; ' + Utils.clear(prog.title));
              item.append(span);
              if (now == prog) {
                item.addClass('watch');
                var timeline = document.createElement('div');
                timeline.addClass('player-panel-iptv-item__prog-timeline');
                var div = document.createElement('div');
                div.style.width = EPG.timeline(channel, prog, timeshift) + '%';
                timeline.append(div);
                update = function update() {
                  var percent = EPG.timeline(channel, prog, timeshift);
                  div.style.width = percent + '%';
                  if (percent == 100) {
                    var next = EPG.position(channel, program, timeshift);
                    if (start !== next) {
                      Lampa.Player.programReady({
                        channel: channel,
                        position: next,
                        total: cache[channel.id].length
                      });
                    }
                  }
                };
                item.append(timeline);
              }
              container[0].append(item);
            });
          }
        };
        Lampa.Player.iptv(data);
        time = setInterval(function () {
          if (update) update();
        }, 1000 * 10);
        var _destroy = function destroy() {
          Lampa.Player.listener.remove('destroy', _destroy);
          cache = null;
          update = null;
          _this2.archive = false;
          if (_this2.hud) _this2.hud = _this2.hud.destroy();
          Pilot.notebook('channel', -1);
          clearInterval(time);
        };
        Lampa.Player.listener.follow('destroy', _destroy);
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var _this3 = this;
        if (this.empty) {
          Lampa.Controller.add('content', {
            invisible: true,
            toggle: function toggle() {
              Lampa.Controller.clear();
            },
            left: function left() {
              Lampa.Controller.toggle('menu');
            },
            up: function up() {
              Lampa.Controller.toggle('head');
            },
            back: function back() {
              _this3.listener.send('playlist-main');
            }
          });
          Lampa.Controller.toggle('content');
        } else this.active.toggle();
      }
    }, {
      key: "render",
      value: function render() {
        return this.empty ? this.empty.render(true) : this.html;
      }
    }, {
      key: "load",
      value: function load(playlist) {
        var _this4 = this;
        this.listener.send('loading');
        Api.playlist(playlist).then(this.build.bind(this))["catch"](function (e) {
          var msg = '';
          if (typeof e == 'string') msg = e;else if (typeof e.responseJSON !== 'undefined' && e.responseJSON.text) msg = Lampa.Lang.translate('torrent_error_connect') + ': ' + e.responseJSON.text + (e.responseJSON.code ? ' [' + e.responseJSON.code + ']' : '');else if (typeof e.status !== 'undefined') msg = Lampa.Lang.translate('torrent_error_connect') + ': [' + e.status + ']' + (e.from_error ? ' [' + e.from_error + ']' : '');else if (typeof e.message !== 'undefined') msg = e.message;
          _this4.empty = new Lampa.Empty({
            descr: '<div style="width: 60%; margin:0 auto; line-height: 1.4">' + Lampa.Lang.translate('iptv_noload_playlist') + (msg ? '<br><br>' + msg : '') + '</div>'
          });
          _this4.listener.send('display', _this4);
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.menu.destroy();
        this.icons.destroy();
        this.details.destroy();
        this.inner_listener.destroy();
        this.active = false;
        this.epg_cache = null;
        this.html.remove();
      }
    }]);
  }();

  function Component() {
    var html = document.createElement('div');
    var listener;
    var playlist;
    var channels;
    var initialized;
    window.iptv_mobile = window.innerWidth < 768;
    if (Lampa.Manifest.app_digital >= 185) {
      listener = Lampa.Subscribe();
      playlist = new Playlist(listener);
      channels = new Channels(listener);
    }
    this.create = function () {
      return this.render();
    };
    this.initialize = function () {
      var _this = this;
      this.activity.loader(true);
      if (Lampa.Manifest.app_digital >= 185) {
        listener.follow('display', function (controller) {
          _this.active = controller;
          _this.display(controller.render());
        });
        listener.follow('loading', this.loading.bind(this));
        listener.follow('channels-load', channels.load.bind(channels));
        listener.follow('playlist-main', playlist.main.bind(playlist));
        playlist.load();
      } else {
        var old = Lampa.Template.get('cub_iptv_list');
        old.find('.iptv-list__title').text(Lampa.Lang.translate('iptv_update_app_title'));
        old.find('.iptv-list__text').text(Lampa.Lang.translate('iptv_update_app_text'));
        $(html).append(old);
        this.activity.loader(false);
      }
      if (window.iptv_mobile) html.addClass('iptv-mobile');
    };
    this.playlist = function () {
      playlist.main();
    };
    this.loading = function () {
      this.activity.loader(true);
      this.active = false;
      this.start();
    };
    this.display = function (render) {
      html.empty().append(render);
      Lampa.Layer.update(html);
      Lampa.Layer.visible(html);
      this.activity.loader(false);
      this.start();
    };
    this.background = function () {
      Lampa.Background.immediately('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAZCAYAAABD2GxlAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHASURBVHgBlZaLrsMgDENXxAf3/9XHFdXNZLm2YZHQymPk4CS0277v9+ffrut62nEcn/M8nzb69cxj6le1+75f/RqrZ9fatm3F9wwMR7yhawilNke4Gis/7j9srQbdaVFBnkcQ1WrfgmIIBcTrvgqqsKiTzvpOQbUnAykVW4VVqZXyyDllYFSKx9QaVrO7nGJIB63g+FAq/xhcHWBYdwCsmAtvFZUKE0MlVZWCT4idOlyhTp3K35R/6Nzlq0uBnsKWlEzgSh1VGJxv6rmpXMO7EK+XWUPnDFRWqitQFeY2UyZVryuWlI8ulLgGf19FooAUwC9gCWLcwzWPb7Wa60qdlZxjx6ooUuUqVQsK+y1VoAJyBeJAVsLJeYmg/RIXdG2kPhwYPBUQQyYF0XC8lwP3MTCrYAXB88556peCbUUZV7WccwkUQfCZC4PXdA5hKhSVhythZqjZM0J39w5m8BRadKAcrsIpNZsLIYdOqcZ9hExhZ1MH+QL+ciFzXzmYhZr/M6yUUwp2dp5U4naZDwAF5JRSefdScJZ3SkU0nl8xpaAy+7ml1EqvMXSs1HRrZ9bc3eZUSXmGa/mdyjbmqyX7A9RaYQa9IRJ0AAAAAElFTkSuQmCC');
    };
    this.start = function () {
      var _this2 = this;
      if (Lampa.Activity.active() && Lampa.Activity.active().activity !== this.activity) return;
      if (!initialized) {
        initialized = true;
        this.initialize();
      }
      this.background();
      Lampa.Controller.add('content', {
        invisible: true,
        toggle: function toggle() {
          if (_this2.active) _this2.active.toggle();else {
            Lampa.Controller.collectionSet(html);
            Lampa.Controller.collectionFocus(false, html);
          }
        },
        left: function left() {
          Lampa.Controller.toggle('menu');
        },
        up: function up() {
          Lampa.Controller.toggle('head');
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
      if (playlist) playlist.destroy();
      if (channels) channels.destroy();
      listener.destroy();
      html.remove();
    };
  }

  var UnpackStream = function () {
    var t = {},
      n = Uint8Array,
      i = Uint16Array,
      e = Uint32Array,
      r = new n(0),
      a = new n([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
      s = new n([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
      o = new n([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
      h = function h(t, n) {
        for (var r = new i(31), a = 0; a < 31; ++a) r[a] = n += 1 << t[a - 1];
        for (var s = new e(r[30]), o = 1; o < 30; ++o) for (var h = r[o]; h < r[o + 1]; ++h) s[h] = h - r[o] << 5 | o;
        return [r, s];
      },
      f = h(a, 2),
      l = f[0],
      p = f[1];
    l[28] = 258, p[258] = 28;
    var v,
      u = h(s, 0)[0],
      d = new i(32768);
    for (v = 0; v < 32768; ++v) {
      var c = (43690 & v) >>> 1 | (21845 & v) << 1;
      c = (61680 & (c = (52428 & c) >>> 2 | (13107 & c) << 2)) >>> 4 | (3855 & c) << 4, d[v] = ((65280 & c) >>> 8 | (255 & c) << 8) >>> 1;
    }
    var g = function g(t, n, e) {
        for (var r = t.length, a = 0, s = new i(n); a < r; ++a) t[a] && ++s[t[a] - 1];
        var o,
          h = new i(n);
        for (a = 0; a < n; ++a) h[a] = h[a - 1] + s[a - 1] << 1;
        if (e) {
          o = new i(1 << n);
          var f = 15 - n;
          for (a = 0; a < r; ++a) if (t[a]) for (var l = a << 4 | t[a], p = n - t[a], v = h[t[a] - 1]++ << p, u = v | (1 << p) - 1; v <= u; ++v) o[d[v] >>> f] = l;
        } else for (o = new i(r), a = 0; a < r; ++a) t[a] && (o[a] = d[h[t[a] - 1]++] >>> 15 - t[a]);
        return o;
      },
      w = new n(288);
    for (v = 0; v < 144; ++v) w[v] = 8;
    for (v = 144; v < 256; ++v) w[v] = 9;
    for (v = 256; v < 280; ++v) w[v] = 7;
    for (v = 280; v < 288; ++v) w[v] = 8;
    var y = new n(32);
    for (v = 0; v < 32; ++v) y[v] = 5;
    var m = g(w, 9, 1),
      b = g(y, 5, 1),
      T = function T(t) {
        for (var n = t[0], i = 1; i < t.length; ++i) t[i] > n && (n = t[i]);
        return n;
      },
      E = function E(t, n, i) {
        var e = n / 8 | 0;
        return (t[e] | t[e + 1] << 8) >> (7 & n) & i;
      },
      k = function k(t, n) {
        var i = n / 8 | 0;
        return (t[i] | t[i + 1] << 8 | t[i + 2] << 16) >> (7 & n);
      },
      C = function C(t, r, a) {
        (null == r || r < 0) && (r = 0), (null == a || a > t.length) && (a = t.length);
        var s = new (2 === t.BYTES_PER_ELEMENT ? i : 4 === t.BYTES_PER_ELEMENT ? e : n)(a - r);
        return s.set(t.subarray(r, a)), s;
      };
    t.FlateErrorCode = {
      UnexpectedEOF: 0,
      InvalidBlockType: 1,
      InvalidLengthLiteral: 2,
      InvalidDistance: 3,
      StreamFinished: 4,
      NoStreamHandler: 5,
      InvalidHeader: 6,
      NoCallback: 7,
      InvalidUTF8: 8,
      ExtraFieldTooLong: 9,
      InvalidDate: 10,
      FilenameTooLong: 11,
      StreamFinishing: 12,
      InvalidZipData: 13,
      UnknownCompressionMethod: 14
    };
    var F = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", "invalid header", "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data", "determined by unknown compression method"],
      S = function S(t, n, i) {
        var e = new Error(n || F[t]);
        if (e.code = t, !i) throw e;
        return e;
      },
      x = function () {
        function t(t) {
          this.s = {}, this.p = new n(0), this.ondata = t;
        }
        return t.prototype.e = function (t) {
          this.ondata || S(5), this.d && S(4);
          var i = this.p.length,
            e = new n(i + t.length);
          e.set(this.p), e.set(t, i), this.p = e;
        }, t.prototype.c = function (t) {
          this.d = this.s.i = t || !1;
          var i = this.s.b,
            e = function (t, i, e) {
              var r = t.length;
              if (!r || e && e.f && !e.l) return i || new n(0);
              var h = !i || e,
                f = !e || e.i;
              e || (e = {}), i || (i = new n(3 * r));
              var p = function p(t) {
                  var e = i.length;
                  if (t > e) {
                    var r = new n(Math.max(2 * e, t));
                    r.set(i), i = r;
                  }
                },
                v = e.f || 0,
                d = e.p || 0,
                c = e.b || 0,
                w = e.l,
                y = e.d,
                F = e.m,
                x = e.n,
                I = 8 * r;
              do {
                if (!w) {
                  v = E(t, d, 1);
                  var U = E(t, d + 1, 3);
                  if (d += 3, !U) {
                    var D = 4 + ((d + 7) / 8 | 0),
                      L = t[D - 4] | t[D - 3] << 8,
                      z = D + L;
                    if (z > r) {
                      f && S(0);
                      break;
                    }
                    h && p(c + L), i.set(t.subarray(D, z), c), e.b = c += L, e.p = d = 8 * z, e.f = v;
                    continue;
                  }
                  if (1 === U) w = m, y = b, F = 9, x = 5;else if (2 === U) {
                    var B = E(t, d, 31) + 257,
                      M = E(t, d + 10, 15) + 4,
                      N = B + E(t, d + 5, 31) + 1;
                    d += 14;
                    var _,
                      A = new n(N),
                      G = new n(19);
                    for (_ = 0; _ < M; ++_) G[o[_]] = E(t, d + 3 * _, 7);
                    d += 3 * M;
                    var H = T(G),
                      O = (1 << H) - 1,
                      P = g(G, H, 1);
                    for (_ = 0; _ < N;) {
                      var R = P[E(t, d, O)];
                      d += 15 & R;
                      var Y = R >>> 4;
                      if (Y < 16) A[_++] = Y;else {
                        var Z = 0,
                          j = 0;
                        for (16 === Y ? (j = 3 + E(t, d, 3), d += 2, Z = A[_ - 1]) : 17 === Y ? (j = 3 + E(t, d, 7), d += 3) : 18 === Y && (j = 11 + E(t, d, 127), d += 7); j--;) A[_++] = Z;
                      }
                    }
                    var q = A.subarray(0, B),
                      J = A.subarray(B);
                    F = T(q), x = T(J), w = g(q, F, 1), y = g(J, x, 1);
                  } else S(1);
                  if (d > I) {
                    f && S(0);
                    break;
                  }
                }
                h && p(c + 131072);
                for (var K = (1 << F) - 1, Q = (1 << x) - 1, V = d;; V = d) {
                  var W = w[k(t, d) & K],
                    X = W >>> 4;
                  if ((d += 15 & W) > I) {
                    f && S(0);
                    break;
                  }
                  if (W || S(2), X < 256) i[c++] = X;else {
                    if (256 === X) {
                      V = d, w = null;
                      break;
                    }
                    var $ = X - 254;
                    if (X > 264) {
                      var tt = X - 257,
                        nt = a[tt];
                      $ = E(t, d, (1 << nt) - 1) + l[tt], d += nt;
                    }
                    var it = y[k(t, d) & Q],
                      et = it >>> 4;
                    it || S(3), d += 15 & it;
                    var rt = u[et];
                    if (et > 3) {
                      var at = s[et];
                      rt += k(t, d) & (1 << at) - 1, d += at;
                    }
                    if (d > I) {
                      f && S(0);
                      break;
                    }
                    h && p(c + 131072);
                    for (var st = c + $; c < st; c += 4) i[c] = i[c - rt], i[c + 1] = i[c + 1 - rt], i[c + 2] = i[c + 2 - rt], i[c + 3] = i[c + 3 - rt];
                    c = st;
                  }
                }
                e.l = w, e.p = V, e.b = c, e.f = v, w && (v = 1, e.m = F, e.d = y, e.n = x);
              } while (!v);
              return c === i.length ? i : C(i, 0, c);
            }(this.p, this.o, this.s);
          this.ondata(C(e, i, this.s.b), this.d), this.o = C(e, this.s.b - 32768), this.s.b = this.o.length, this.p = C(this.p, this.s.p / 8 | 0), this.s.p &= 7;
        }, t.prototype.push = function (t, n) {
          this.e(t), this.c(n);
        }, t;
      }();
    t.Inflate = x;
    var I = function () {
      function t(t) {
        this.ondata = t;
      }
      return t.prototype.push = function (t, n) {
        this.ondata(t, n);
      }, t;
    }();
    t.TextBytes = I;
    var U = function () {
      function t(t) {
        this.v = 1, x.call(this, t);
      }
      return t.prototype.push = function (t, n) {
        if (x.prototype.e.call(this, t), this.v) {
          var i = this.p.length > 3 ? function (t) {
            31 === t[0] && 139 === t[1] && 8 === t[2] || S(6, "invalid gzip data");
            var n = t[3],
              i = 10;
            4 & n && (i += t[10] | 2 + (t[11] << 8));
            for (var e = (n >> 3 & 1) + (n >> 4 & 1); e > 0;) e -= !t[i++];
            return i + (2 & n);
          }(this.p) : 4;
          if (i >= this.p.length && !n) return;
          this.p = this.p.subarray(i), this.v = 0;
        }
        n && (this.p.length < 8 && S(6, "invalid gzip data"), this.p = this.p.subarray(0, -8)), x.prototype.c.call(this, n);
      }, t;
    }();
    t.Gunzip = U, t.Decompress = function () {
      function t(t) {
        this.G = U, this.I = x, this.T = I, this.ondata = t;
      }
      return t.prototype.push = function (t, i) {
        if (this.ondata || S(5), this.s) this.s.push(t, i);else {
          if (this.p && this.p.length) {
            var e = new n(this.p.length + t.length);
            e.set(this.p), e.set(t, this.p.length);
          } else this.p = t;
          if (this.p.length > 2) {
            var r = this,
              a = function a() {
                r.ondata.apply(r, arguments);
              };
            this.s = 31 === this.p[0] && 139 === this.p[1] && 8 === this.p[2] ? new this.G(a) : new this.T(a), this.s.push(this.p, i), this.p = null;
          }
        }
      }, t;
    }();
    var D = "undefined" != typeof TextDecoder && new TextDecoder(),
      L = 0;
    try {
      D.decode(r, {
        stream: !0
      }), L = 1;
    } catch (t) {}
    return t.DecodeUTF8 = function () {
      function t(t) {
        this.ondata = t, L ? this.t = new TextDecoder() : this.p = r;
      }
      return t.prototype.push = function (t, i) {
        if (this.ondata || S(5), i = !!i, this.t) return this.ondata(this.t.decode(t, {
          stream: !0
        }), i), void (i && (this.t.decode().length && S(8), this.t = null));
        this.p || S(4);
        var e = new n(this.p.length + t.length);
        e.set(this.p), e.set(t, this.p.length);
        var r = function (t) {
            for (var n = "", i = 0;;) {
              var e = t[i++],
                r = (e > 127) + (e > 223) + (e > 239);
              if (i + r > t.length) return [n, C(t, i - 1)];
              r ? 3 === r ? (e = ((15 & e) << 18 | (63 & t[i++]) << 12 | (63 & t[i++]) << 6 | 63 & t[i++]) - 65536, n += String.fromCharCode(55296 | e >> 10, 56320 | 1023 & e)) : n += 1 & r ? String.fromCharCode((31 & e) << 6 | 63 & t[i++]) : String.fromCharCode((15 & e) << 12 | (63 & t[i++]) << 6 | 63 & t[i++]) : n += String.fromCharCode(e);
            }
          }(e),
          a = r[0],
          s = r[1];
        i ? (s.length && S(8), this.p = null) : this.p = s, this.ondata(a, i);
      }, t;
    }(), t;
  }();

  var cur_time = 0;
  var channel = {};
  // Распаковываем по 32 КБ gzip, обычно при сжатии чанк по умолчанию 16 КБ, поэтому меньше нет смысла ставить.
  var maxChunkSize = 4 * 1024;
  var string_data = '';
  var percent = -1;
  var this_res = null;
  var load_end = false;
  var chunk_parse = false;
  var dcmpStrm = function dcmpStrm() {};
  var content_type = '';
  var cur_pos = 0;
  var content_length = 0;
  var listener = Lampa.Subscribe();
  function nextChunk() {
    if (chunk_parse || this_res === null) return;
    chunk_parse = true;
    var len = this_res.responseText.length;
    var maxPos = Math.min(cur_pos + maxChunkSize, len);
    if (maxPos > cur_pos) {
      var finish = load_end && maxPos === len;
      dcmpStrm.push(str2ab(this_res.responseText.substring(cur_pos, maxPos)), finish);
      cur_pos = maxPos;
      percent = content_length ? cur_pos * 100 / content_length : load_end ? cur_pos * 100 / len : -1;
      listener.send('percent', {
        percent: percent
      });
      if (finish) {
        parseFinish();
        listener.send('end', {
          time: unixtime() - cur_time,
          channel: channel
        });
        channel = {};
      }
    }
    chunk_parse = false;
    requestFrame();
  }
  function parseChannel(attr, string) {
    if (!attr['id']) return; // todo не парсить каналы которых нет в листе

    string = string.replace(/\n/g, '');
    var names = [];
    var m_name = string.match(/<display-name[^>]+>(.*?)</g);
    var m_icon = string.match(/<icon src="(.*?)"/);
    if (m_name) {
      names = m_name.map(function (n) {
        return n.slice(0, -1).split('>')[1];
      });
    }
    channel[attr.id] = {
      id: attr.id,
      names: names,
      icon: m_icon ? m_icon[1] : '',
      program: []
    };
    listener.send('channel', {
      channel: channel[attr.id]
    });
  }
  function parseProgramme(attr, string) {
    if (!attr['channel'] || !attr['start'] || !attr['stop'] || !channel[attr.channel]) return;
    var start = parseDate(attr.start);
    var stop = parseDate(attr.stop);
    string = string.replace(/\n/g, '');
    var m_title = string.match(/<title\s+lang="ru">(.*?)</);
    var m_category = string.match(/<category\s+lang="ru">(.*?)</);
    var m_desc = string.match(/<desc\s+lang="ru">(.*?)</);
    var m_icon = string.match(/<icon src="(.*?)"/);
    if (!m_title) m_title = string.match(/<title[^>]+>(.*?)</);
    if (!m_category) m_category = string.match(/<category[^>]+>(.*?)</);
    if (!m_desc) m_desc = string.match(/<desc[^>]+>(.*?)</);
    var title = m_title ? m_title[1] : '';
    var category = m_category ? m_category[1] : '';
    var desc = m_desc ? m_desc[1] : '';
    var icon = m_icon ? m_icon[1] : '';
    var prog = {
      start: start * 1000,
      stop: stop * 1000,
      title: title,
      category: category,
      desc: desc,
      icon: icon
    };
    listener.send('program', {
      program: prog,
      id: attr.channel,
      channel: channel[attr.channel]
    });
  }
  function parseDate(s) {
    return Date.parse(s.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\s+([+-]\d{2})(\d{2})$/, '$1-$2-$3T$4:$5:$6$7:$8')) / 1000;
  }
  function parseParams(s) {
    var o = {},
      m,
      mm;
    if (!!(m = s.match(/([^\s=]+)=((["'])(.*?)\3|\S+)/g))) {
      for (var i = 0; i < m.length; i++) {
        if (!!(mm = m[i].match(/([^\s=]+)=((["'])(.*?)\3|\S+)/))) {
          o[mm[1].toLowerCase()] = mm[4] || mm[2];
        }
      }
    }
    return o;
  }
  function unixtime() {
    return Math.floor(new Date().getTime() / 1000);
  }
  function str2ab(str) {
    var buf = new ArrayBuffer(str.length),
      bufView = new Uint8Array(buf),
      i = 0;
    for (; i < str.length; i++) bufView[i] = str.charCodeAt(i) & 0xff;
    return bufView;
  }
  function parseFinish() {
    //clearInterval(interval)

    string_data = '';
    percent = -1;
    this_res = null;
    load_end = false;
    chunk_parse = false;
    dcmpStrm = function dcmpStrm() {};
    content_type = '';
    cur_pos = 0;
    content_length = 0;
  }
  function requestFrame() {
    requestAnimationFrame(nextChunk);
  }
  function parseStart(url) {
    parseFinish();
    channel = {};
    var chOrProgRegExp;
    try {
      chOrProgRegExp = new RegExp('\\s*<(programme|channel)(\\s+([^>]+)?)?>(.*?)<\\/\\1\\s*>\\s*', 'gs');
    } catch (e) {
      chOrProgRegExp = new RegExp('\\s*<(programme|channel)(\\s+([^>]+)?)?>((.|\\n)*?)<\\/\\1\\s*>\\s*', 'g');
    }
    cur_time = unixtime();
    listener.send('start');
    var xhr = new XMLHttpRequest();
    var utfDecode = new UnpackStream.DecodeUTF8(function (data, _final) {
      string_data += data;
      var lenStart = string_data.length;
      string_data = string_data.replace(chOrProgRegExp, function (match, p1, p2, p3, p4) {
        if (p1 === 'channel') parseChannel(parseParams(p3), p4);else parseProgramme(parseParams(p3), p4);
        return '';
      });
      if (lenStart === string_data.length && lenStart > 204800) {
        var text = 'Bad xml.gz file';
        console.log('IPTV', text, string_data.substring(0, 4096) + '...');
        if (!load_end) xhr.abort();
        parseFinish();
        listener.send('error', {
          text: text
        });
      }
    });
    dcmpStrm = new UnpackStream.Decompress(function (chunk, _final2) {
      utfDecode.push(chunk, _final2);
    });
    xhr.open('get', url);
    xhr.responseType = 'text';
    xhr.overrideMimeType('text\/plain; charset=x-user-defined');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 2) {
        // получаем заголовки
        content_type = xhr.getResponseHeader('content-type') || content_type;
        content_length = xhr.getResponseHeader('content-length') || content_length;
        console.log('IPTV', 'Content-Type', content_type);
        console.log('IPTV', 'Content-Length', content_length);
        requestFrame();
        //interval = setInterval(nextChunk, intervalTime)
      }
    };
    xhr.onload = xhr.onprogress = function (e) {
      this_res = this;
      load_end = e.type === 'load';
    };
    xhr.onerror = function () {
      // происходит, только когда запрос совсем не получилось выполнить
      parseFinish();
      listener.send('error', {
        text: 'Error connect (CORS or bad URL)'
      });
    };
    xhr.onabort = function () {
      parseFinish();
      listener.send('error', {
        text: 'Load abort'
      });
    };
    xhr.ontimeout = function () {
      parseFinish();
      listener.send('error', {
        text: 'Load timeout'
      });
    };
    xhr.send();
  }
  var Parser = {
    listener: listener,
    start: parseStart
  };

  var Guide = /*#__PURE__*/function () {
    function Guide() {
      _classCallCheck(this, Guide);
    }
    return _createClass(Guide, null, [{
      key: "init",
      value: function init() {
        var _this = this;
        if (Lampa.Storage.field('iptv_guide_update_after_start')) this.update();
        setInterval(function () {
          var lastupdate = Lampa.Storage.get('iptv_guide_updated_status', '{}').time || 0;
          if (Lampa.Storage.field('iptv_guide_interval') > 0 && lastupdate + 1000 * 60 * 60 * Lampa.Storage.field('iptv_guide_interval') < Date.now()) _this.update();
        }, 1000 * 60);
      }
    }, {
      key: "update",
      value: function update(status_elem) {
        var url = Lampa.Storage.get('iptv_guide_url');
        if (Lampa.Storage.field('iptv_guide_custom') && url) {
          if (!window.iptv_guide_update_process) {
            window.iptv_guide_update_process = Parser.listener;
            var last_id = -1;
            var program = [];
            Parser.listener.follow('program', function (data) {
              if (last_id == data.id) program.push(data.program);else {
                DB.rewriteData('epg', last_id, program)["finally"](function () {});
                last_id = data.id;
                program = [data.program];
              }
            });
            Parser.listener.follow('channel', function (data) {
              data.channel.names.forEach(function (name) {
                DB.addData('epg_channels', name.toLowerCase(), {
                  id: data.channel.id,
                  ic: data.channel.icon
                })["catch"](function () {});
              });
            });
            if (Lampa.Processing) {
              Parser.listener.follow('percent', function (data) {
                Lampa.Processing.push('iptv', data.percent);
              });
            }
            Parser.listener.follow('end', function (data) {
              program = [];
              var count = Lampa.Arrays.getKeys(data.channel).length;
              Lampa.Storage.set('iptv_guide_updated_status', {
                type: 'finish',
                channels: count,
                time: Date.now()
              });
              Parser.listener.send('finish', {
                count: count,
                time: Date.now()
              });
              window.iptv_guide_update_process.destroy();
              window.iptv_guide_update_process = false;
            });
            Parser.listener.follow('error', function (data) {
              window.iptv_guide_update_process.destroy();
              window.iptv_guide_update_process = false;
              Lampa.Storage.set('iptv_guide_updated_status', {
                type: 'error',
                text: data.text,
                time: Date.now()
              });
            });
            if (DB.clearTable) {
              DB.clearTable('epg')["finally"](function () {});
              DB.clearTable('epg_channels')["finally"](function () {});
            }
            setTimeout(function () {
              Parser.start(url);
            }, 100);
          }
        } else if (status_elem) {
          Lampa.Noty.show(Lampa.Lang.translate('iptv_guide_error_link'));
        }
      }
    }]);
  }();

  function init$2() {
    Lampa.Template.add('cub_iptv_content', "\n        <div class=\"iptv-content\">\n            <div class=\"iptv-content__menu\"></div>\n            <div class=\"iptv-content__channels\"></div>\n            <div class=\"iptv-content__details\"></div>\n        </div>\n    ");
    Lampa.Template.add('cub_iptv_menu', "\n        <div class=\"iptv-menu\">\n            <div class=\"iptv-menu__body\">\n                <div class=\"iptv-menu__head\">\n                    <div class=\"iptv-menu__title\"></div>\n                    <div class=\"iptv-menu__search selector\">\n                        <svg width=\"23\" height=\"22\" viewBox=\"0 0 23 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <circle cx=\"9.9964\" cy=\"9.63489\" r=\"8.43556\" stroke=\"currentColor\" stroke-width=\"2.4\"></circle>\n                            <path d=\"M20.7768 20.4334L18.2135 17.8701\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"></path>\n                        </svg>\n                    </div>\n                </div>\n                <div class=\"iptv-menu__list\"></div>\n            </div>\n        </div>\n    ");
    Lampa.Template.add('iptv_menu_mobile_button_search', "\n        <div class=\"iptv-menu__search-mobile selector\">\n            <svg width=\"23\" height=\"22\" viewBox=\"0 0 23 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <circle cx=\"9.9964\" cy=\"9.63489\" r=\"8.43556\" stroke=\"currentColor\" stroke-width=\"2.4\"></circle>\n                <path d=\"M20.7768 20.4334L18.2135 17.8701\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"></path>\n            </svg>\n        </div>\n    ");
    Lampa.Template.add('cub_iptv_channels', "\n        <div class=\"iptv-channels\">\n            \n        </div>\n    ");
    Lampa.Template.add('cub_iptv_details', "\n        <div class=\"iptv-details layer--wheight\">\n            <div class=\"iptv-details__play\"></div>\n            <div class=\"iptv-details__title\"></div>\n\n            <div class=\"iptv-details__program\">\n\n            </div>\n        </div>\n    ");
    Lampa.Template.add('cub_iptv_details_empty', "\n        <div class=\"iptv-details-epmty endless endless-up\">\n            <div><span></span><span style=\"width: 60%\"></span></div>\n            <div><span></span><span style=\"width: 70%\"></span></div>\n            <div><span></span><span style=\"width: 40%\"></span></div>\n            <div><span></span><span style=\"width: 55%\"></span></div>\n            <div><span></span><span style=\"width: 30%\"></span></div>\n            <div><span></span><span style=\"width: 55%\"></span></div>\n            <div><span></span><span style=\"width: 30%\"></span></div>\n        </div>\n    ");
    Lampa.Template.add('cub_iptv_playlist_item', "\n        <div class=\"iptv-playlist-item selector layer--visible layer--render\">\n            <div class=\"iptv-playlist-item__body\">\n                <div class=\"iptv-playlist-item__name\">\n                    <div class=\"iptv-playlist-item__name-ico\"><span></span></div>\n                    <div class=\"iptv-playlist-item__name-text\">est</div>\n                </div>\n                <div class=\"iptv-playlist-item__url\"></div>\n            </div>\n\n            <div class=\"iptv-playlist-item__footer hide\">\n                <div class=\"iptv-playlist-item__details details-left\"></div>\n                <div class=\"iptv-playlist-item__details details-right\"></div>\n            </div>\n        </div>\n    ");
    Lampa.Template.add('cub_iptv_list_add_custom', "\n        <div class=\"iptv-playlist-item selector layer--visible\">\n            <div class=\"iptv-playlist-item__title\">\n                \n            </div>\n        </div>\n    ");
    Lampa.Template.add('cub_iptv_list', "\n        <div class=\"iptv-list layer--wheight\">\n            <div class=\"iptv-list__ico\">\n                <svg height=\"36\" viewBox=\"0 0 38 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"2\" y=\"8\" width=\"34\" height=\"21\" rx=\"3\" stroke=\"white\" stroke-width=\"3\"/>\n                    <line x1=\"13.0925\" y1=\"2.34874\" x2=\"16.3487\" y2=\"6.90754\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                    <line x1=\"1.5\" y1=\"-1.5\" x2=\"9.31665\" y2=\"-1.5\" transform=\"matrix(-0.757816 0.652468 0.652468 0.757816 26.197 2)\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                    <line x1=\"9.5\" y1=\"34.5\" x2=\"29.5\" y2=\"34.5\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                </svg>\n            </div>\n            <div class=\"iptv-list__title\"></div>\n            <div class=\"iptv-list__text\"></div>\n            <div class=\"iptv-list__items\"></div>\n        </div>\n    ");
    Lampa.Template.add('cub_iptv_list_empty', "\n        <div class=\"iptv-list-empty selector\">\n            <div class=\"iptv-list-empty__text\"></div>\n        </div>\n    ");
    Lampa.Template.add('cub_iptv_param_lock', "\n        <div class=\"iptv-param-lock\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"512\" height=\"512\" viewBox=\"0 0 401.998 401.998\" xml:space=\"preserve\"><path d=\"M357.45 190.721c-5.331-5.33-11.8-7.993-19.417-7.993h-9.131v-54.821c0-35.022-12.559-65.093-37.685-90.218C266.093 12.563 236.025 0 200.998 0c-35.026 0-65.1 12.563-90.222 37.688-25.126 25.126-37.685 55.196-37.685 90.219v54.821h-9.135c-7.611 0-14.084 2.663-19.414 7.993-5.33 5.326-7.994 11.799-7.994 19.417V374.59c0 7.611 2.665 14.086 7.994 19.417 5.33 5.325 11.803 7.991 19.414 7.991H338.04c7.617 0 14.085-2.663 19.417-7.991 5.325-5.331 7.994-11.806 7.994-19.417V210.135c.004-7.612-2.669-14.084-8.001-19.414zm-83.363-7.993H127.909v-54.821c0-20.175 7.139-37.402 21.414-51.675 14.277-14.275 31.501-21.411 51.678-21.411 20.179 0 37.399 7.135 51.677 21.411 14.271 14.272 21.409 31.5 21.409 51.675v54.821z\" fill=\"currentColor\"></path></svg>\n        </div>\n    ");
    Lampa.Template.add('cub_iptv_icon_favorite', "\n        <svg width=\"65\" height=\"87\" viewBox=\"0 0 65 87\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M36.1884 47.9221L32.5 42.6448L28.8116 47.9221L5.40983 81.4046C5.33938 81.5054 5.28461 81.5509 5.25807 81.5702C5.23028 81.5904 5.2049 81.6024 5.17705 81.611C5.11471 81.6301 4.99693 81.6414 4.84985 81.5951C4.70278 81.5488 4.61273 81.472 4.57257 81.4207C4.55463 81.3977 4.54075 81.3733 4.52953 81.3408C4.51882 81.3098 4.5 81.2411 4.5 81.1182V13C4.5 8.30558 8.30558 4.5 13 4.5H52C56.6944 4.5 60.5 8.30558 60.5 13V81.1182C60.5 81.2411 60.4812 81.3098 60.4705 81.3408C60.4593 81.3733 60.4454 81.3977 60.4274 81.4207C60.3873 81.472 60.2972 81.5488 60.1502 81.5951C60.0031 81.6414 59.8853 81.6301 59.8229 81.611C59.7951 81.6024 59.7697 81.5904 59.7419 81.5702C59.7154 81.5509 59.6606 81.5054 59.5902 81.4046L36.1884 47.9221Z\" stroke=\"currentColor\" stroke-width=\"9\"/>\n            <path class=\"active-layer\" d=\"M0 13C0 5.8203 5.8203 0 13 0H52C59.1797 0 65 5.8203 65 13V81.1182C65 86.0086 58.7033 87.9909 55.9018 83.9825L32.5 50.5L9.09823 83.9825C6.29666 87.9909 0 86.0086 0 81.1182V13Z\" fill=\"currentColor\"/>\n        </svg>\n    ");
    Lampa.Template.add('cub_iptv_icon_lock', "\n        <svg width=\"420\" height=\"512\" viewBox=\"0 0 420 512\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M384.532 232.729C394.233 232.729 402.472 236.121 409.262 242.91C416.053 249.698 419.457 257.941 419.452 267.636V477.092C419.452 486.786 416.053 495.033 409.271 501.822C402.48 508.608 394.242 512 384.541 512H35.4568C25.7632 512 17.5189 508.604 10.7304 501.822C3.9432 495.033 0.54895 486.786 0.54895 477.092V267.64C0.54895 257.937 3.94192 249.693 10.7304 242.91C17.5189 236.121 25.7632 232.729 35.4568 232.729H47.0915V162.907C47.0915 118.301 63.0871 80.0023 95.0886 48.0009C127.085 16.0007 165.388 0 209.999 0C254.61 0 292.906 16.0007 324.905 48.0021C356.907 80.0023 372.902 118.302 372.902 162.907V232.729H384.532ZM116.91 162.907V232.729H303.088V162.907C303.088 137.212 293.996 115.269 275.82 97.092C257.635 78.9095 235.703 69.8221 210.003 69.8221C184.304 69.8221 162.367 78.9108 144.183 97.092C126.002 115.271 116.91 137.212 116.91 162.907ZM62 293C53.7157 293 47 299.716 47 308V445C47 453.284 53.7157 460 62 460H358C366.284 460 373 453.284 373 445V308C373 299.716 366.284 293 358 293H62Z\" fill=\"currentColor\"/>\n        <rect class=\"active-layer\" x=\"33\" y=\"275\" width=\"354\" height=\"203\" rx=\"15\" fill=\"currentColor\"/>\n        </svg>\n    ");
    Lampa.Template.add('cub_iptv_icon_fav', "\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 512 512\" xml:space=\"preserve\">\n            <path fill=\"currentColor\" d=\"M391.416,0H120.584c-17.778,0-32.242,14.464-32.242,32.242v460.413c0,7.016,3.798,13.477,9.924,16.895\n            c2.934,1.638,6.178,2.45,9.421,2.45c3.534,0,7.055-0.961,10.169-2.882l138.182-85.312l138.163,84.693\n            c5.971,3.669,13.458,3.817,19.564,0.387c6.107-3.418,9.892-9.872,9.892-16.875V32.242C423.657,14.464,409.194,0,391.416,0z\n            M384.967,457.453l-118.85-72.86c-6.229-3.817-14.07-3.798-20.28,0.032l-118.805,73.35V38.69h257.935V457.453z\"></path>\n        </svg>\n    ");
    Lampa.Template.add('cub_iptv_icon_all', "\n        <svg height=\"30\" viewBox=\"0 0 38 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect x=\"1.5\" y=\"1.5\" width=\"35\" height=\"27\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"3\"></rect>\n            <rect x=\"6\" y=\"7\" width=\"25\" height=\"3\" fill=\"currentColor\"></rect>\n            <rect x=\"6\" y=\"13\" width=\"13\" height=\"3\" fill=\"currentColor\"></rect>\n            <rect x=\"6\" y=\"19\" width=\"19\" height=\"3\" fill=\"currentColor\"></rect>\n        </svg>\n    ");
    Lampa.Template.add('cub_iptv_icon_group', "\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 512 512\" xml:space=\"preserve\">\n            <path fill=\"currentColor\" d=\"M478.354,146.286H33.646c-12.12,0-21.943,9.823-21.943,21.943v321.829c0,12.12,9.823,21.943,21.943,21.943h444.709\n                c12.12,0,21.943-9.823,21.943-21.943V168.229C500.297,156.109,490.474,146.286,478.354,146.286z M456.411,468.114H55.589V190.171\n                h400.823V468.114z\"></path>\n            <path fill=\"currentColor\" d=\"M441.783,73.143H70.217c-12.12,0-21.943,9.823-21.943,21.943c0,12.12,9.823,21.943,21.943,21.943h371.566\n                c12.12,0,21.943-9.823,21.943-21.943C463.726,82.966,453.903,73.143,441.783,73.143z\"></path>\n            <path fill=\"currentColor\" d=\"M405.211,0H106.789c-12.12,0-21.943,9.823-21.943,21.943c0,12.12,9.823,21.943,21.943,21.943h298.423\n                c12.12,0,21.943-9.823,21.943-21.943C427.154,9.823,417.331,0,405.211,0z\"></path>\n        </svg>\n    ");
    Lampa.Template.add('cub_iptv_icon_searched', "\n        <svg height=\"34\" viewBox=\"0 0 28 34\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect x=\"1.5\" y=\"1.5\" width=\"25\" height=\"31\" rx=\"2.5\" stroke=\"currentColor\" stroke-width=\"3\"></rect>\n            <rect x=\"6\" y=\"7\" width=\"16\" height=\"3\" rx=\"1.5\" fill=\"currentColor\"></rect>\n            <rect x=\"6\" y=\"13\" width=\"16\" height=\"3\" rx=\"1.5\" fill=\"currentColor\"></rect>\n        </svg>\n    ");
    Lampa.Template.add('cub_iptv_hud', "\n        <div class=\"iptv-hud\">\n            <div class=\"iptv-hud__content\">\n                <div class=\"iptv-hud__menu\"></div>\n                <div class=\"iptv-hud__program\"></div>\n            </div>\n        </div>\n    ");
    Lampa.Template.add('cub_iptv_channel_main_board', "\n        <div class=\"iptv-channel iptv-channel--main selector layer--visible layer--render\">\n            <div class=\"iptv-channel__body\">\n                <img class=\"iptv-channel__ico\">\n            </div>\n        </div>\n    ");
    Lampa.Template.add('settings_iptv_guide', "<div>\n        <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"iptv_guide_custom\" data-children=\"use_custom_guide\">\n            <div class=\"settings-param__name\">#{iptv_param_guide_custom_title}</div>\n            <div class=\"settings-param__value\"></div>\n            <div class=\"settings-param__descr\">#{iptv_param_guide_custom_descr}</div>\n        </div>\n        <div data-parent=\"use_custom_guide\">\n            <div class=\"settings-param selector\" data-type=\"input\" data-name=\"iptv_guide_url\" placeholder=\"#{torrent_parser_set_link}\">\n                <div class=\"settings-param__name\">#{settings_parser_jackett_link}</div>\n                <div class=\"settings-param__value\"></div>\n                <div class=\"settings-param__descr\">#{iptv_param_guide_url_descr}</div>\n            </div>\n            <div class=\"settings-param selector\" data-type=\"select\" data-name=\"iptv_guide_save\">\n                <div class=\"settings-param__name\">#{iptv_param_guide_save_title}</div>\n                <div class=\"settings-param__value\"></div>\n                <div class=\"settings-param__descr\">#{iptv_param_guide_save_descr}</div>\n            </div>\n            <div class=\"settings-param selector\" data-type=\"select\" data-name=\"iptv_guide_interval\">\n                <div class=\"settings-param__name\">#{iptv_param_guide_interval_title}</div>\n                <div class=\"settings-param__value\"></div>\n                <div class=\"settings-param__descr\">#{iptv_param_guide_interval_descr}</div>\n            </div>\n            <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"iptv_guide_update_after_start\">\n                <div class=\"settings-param__name\">#{iptv_param_guide_update_after_start}</div>\n                <div class=\"settings-param__value\"></div>\n            </div>\n            <div class=\"settings-param selector settings-param--button update-guide-now\" data-static=\"true\">\n                <div class=\"settings-param__name\">#{iptv_param_guide_update_now}</div>\n            </div>\n            <div class=\"settings-param update-guide-status\" data-static=\"true\">\n                <div class=\"settings-param__name\">#{iptv_guide_status_finish}</div>\n                <div class=\"settings-param__value\">#{iptv_guide_status_noupdates}</div>\n            </div>\n        </div>\n    </div>");
    if (window.lampa_settings.iptv) {
      Lampa.Template.add('about', "<div class=\"about\">\n            <div>#{iptv_about_text}</div>\n        \n            <div class=\"overhide\">\n                <div class=\"about__contacts\">\n                    <div>\n                        <small>#{about_channel}</small><br>\n                        @lampa_channel\n                    </div>\n        \n                    <div>\n                        <small>#{about_group}</small><br>\n                        @lampa_group\n                    </div>\n        \n                    <div>\n                        <small>#{about_version}</small><br>\n                        <span class=\"version_app\"></span>\n                    </div>\n        \n                    <div class=\"hide platform_android\">\n                        <small>#{about_version} Android APK</small><br>\n                        <span class=\"version_android\"></span>\n                    </div>\n                </div>\n            </div>\n        </div>");
    }
    Lampa.Template.add('cub_iptv_style', "\n        <style>\n        .iptv-list{padding:1.5em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding-bottom:1em}.iptv-list__ico{width:4.5em;margin-bottom:2em;height:4.5em}.iptv-list__ico>svg{width:4.5em;height:4.5em}.iptv-list__title{font-size:1.9em;margin-bottom:1em}.iptv-list__text{font-size:1.2em;line-height:1.4;margin-bottom:1em;text-align:center;width:60%;margin:0 auto;margin-bottom:2em}@media screen and (max-width:767px){.iptv-list__text{width:100%}}.iptv-list__items{width:80%;margin:0 auto}.iptv-list__items .scroll{height:22em}@media screen and (max-width:767px){.iptv-list__items{width:100%}}.iptv-list__item{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:1em;background-color:rgba(255,255,255,0.1);font-size:1.3em;line-height:1.3;-webkit-border-radius:.3em;border-radius:.3em;margin:1em}.iptv-list__item-name{width:40%;padding-right:1em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;text-align:left}.iptv-list__item-url{width:60%;padding-left:1em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;text-align:right}.iptv-list__item.focus{background-color:#fff;color:black}.iptv-playlist-item{padding:1em;background-color:rgba(255,255,255,0.1);line-height:1.3;margin:1em;-webkit-border-radius:1em;border-radius:1em;position:relative}.iptv-playlist-item__body{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.iptv-playlist-item__url{width:60%;padding-left:1em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;text-align:right}.iptv-playlist-item__title{text-align:center;padding:1em;font-size:1.3em}.iptv-playlist-item__name{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:40%}.iptv-playlist-item__name-ico{background-color:#fff;-webkit-border-radius:.5em;border-radius:.5em;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:.3em .5em;color:#000;min-width:2.3em;text-align:center}.iptv-playlist-item__name-ico>span{font-size:1.2em;font-weight:900}.iptv-playlist-item__name-text{font-weight:600;padding-left:1em}.iptv-playlist-item__footer{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin-top:1em;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}@media screen and (max-width:480px){.iptv-playlist-item__footer{display:block}}.iptv-playlist-item__details{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.iptv-playlist-item__details+div{margin-left:2em}@media screen and (max-width:480px){.iptv-playlist-item__details+div{margin-left:0;margin-top:1em}}.iptv-playlist-item__label{color:rgba(255,255,255,0.5)}.iptv-playlist-item__label>span{color:#fff}.iptv-playlist-item__label+.iptv-playlist-item__label:before{content:'|';display:inline-block;margin:0 1em;font-size:.7em;margin-top:-0.4em}.iptv-playlist-item.focus::after,.iptv-playlist-item.hover::after{content:'';position:absolute;top:-0.5em;left:-0.5em;right:-0.5em;bottom:-0.5em;border:.3em solid #fff;-webkit-border-radius:1.4em;border-radius:1.4em;z-index:-1;pointer-events:none}.iptv-content{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:0 1.5em;line-height:1.3}.iptv-content>div{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.iptv-content__menu{width:30%;padding-right:4em}@media screen and (max-width:900px){.iptv-content__menu{width:28%}}.iptv-content__channels{width:25%}@media screen and (max-width:900px){.iptv-content__channels{width:27%}}.iptv-content__details{width:45%;padding-left:4em}.iptv-menu__head{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin-bottom:2.4em;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}.iptv-menu__search{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;padding:.5em;margin-top:.6em;margin-right:.6em}.iptv-menu__search>svg{width:1.5em !important;height:1.5em !important}.iptv-menu__search.focus{-webkit-border-radius:100%;border-radius:100%;background-color:#fff;color:#000}.iptv-menu__search-mobile{padding:.5em}.iptv-menu__search-mobile>svg{width:1.5em !important;height:1.5em !important}.iptv-menu__title{font-size:2.4em;font-weight:300;padding-right:1em;margin-right:auto}.iptv-menu__list-item{font-size:1.4em;font-weight:300;position:relative;padding:.5em .8em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;opacity:.6}.iptv-menu__list-item>div{word-break:break-all}.iptv-menu__list-item-icon{margin-right:.5em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.iptv-menu__list-item-icon>svg{width:1em !important;height:1em !important}.iptv-menu__list-item>span{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;padding-left:1em;margin-left:auto}.iptv-menu__list-item.active{color:#fff;background-color:rgba(255,255,255,0.1);-webkit-border-radius:.8em;border-radius:.8em;opacity:1}.iptv-menu__list-item.focus{color:#000;background-color:#fff;-webkit-border-radius:.8em;border-radius:.8em;opacity:1}.iptv-menu__list>div+div{margin-top:.3em}.iptv-channels{padding:1em;padding-left:5em}.iptv-channel{background-color:#464646;-webkit-border-radius:1em;border-radius:1em;padding-bottom:72%;position:relative}.iptv-channel__body{position:absolute;top:0;left:0;right:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:1em;text-align:center}.iptv-channel__ico{width:80%;opacity:0;max-height:100%}.iptv-channel__icons{position:absolute;top:.6em;right:.6em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.iptv-channel__icons>svg{width:1.2em !important;height:1.2em !important;margin-left:.5em}.iptv-channel__name{text-align:center;font-size:1.2em;overflow:hidden;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical;max-height:1.4em}.iptv-channel__simb{font-size:4em;font-weight:900;line-height:.7;margin-bottom:.4em}.iptv-channel__chn{position:absolute;top:50%;right:100%;margin-right:.5em;font-size:1.9em;font-weight:600;margin-top:-0.7em;opacity:.5}.iptv-channel.loaded .iptv-channel__ico{opacity:1}.iptv-channel.full--icon .iptv-channel__body{padding:0;overflow:hidden;-webkit-border-radius:1em;border-radius:1em}.iptv-channel.full--icon .iptv-channel__ico{max-width:105%;width:105%;height:105%}.iptv-channel.small--icon .iptv-channel__ico{width:6em;-webkit-border-radius:.7em;border-radius:.7em}.iptv-channel.favorite::after{content:'';position:absolute;top:.3em;right:.2em;background-image:url(./img/icons/menu/like.svg);background-repeat:no-repeat;background-position:50% 50%;background-size:55%;-webkit-border-radius:100%;border-radius:100%;width:1.8em;height:1.8em;margin-left:-0.9em}.iptv-channel.focus::before,.iptv-channel.active::before{content:'';position:absolute;top:-0.5em;left:-0.5em;right:-0.5em;bottom:-0.5em;border:.3em solid #fff;-webkit-border-radius:1.4em;border-radius:1.4em;opacity:.4}.iptv-channel.focus::before{opacity:1}.iptv-channel+.iptv-channel{margin-top:1em}.iptv-channel--main{width:12.75em;padding-bottom:0;height:9em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.iptv-channel--main+.iptv-channel{margin-top:0;margin-left:1em}.iptv-details{padding-top:3.5em;-webkit-mask-image:-webkit-gradient(linear,left top,left bottom,from(white),color-stop(92%,white),to(rgba(255,255,255,0)));-webkit-mask-image:-webkit-linear-gradient(top,white 0,white 92%,rgba(255,255,255,0) 100%);mask-image:-webkit-gradient(linear,left top,left bottom,from(white),color-stop(92%,white),to(rgba(255,255,255,0)));mask-image:linear-gradient(to bottom,white 0,white 92%,rgba(255,255,255,0) 100%)}.iptv-details__play{font-size:1.3em;margin-bottom:.5em}.iptv-details__play .lb{background:rgba(255,255,255,0.3);-webkit-border-radius:.2em;border-radius:.2em;padding:0 .4em;margin-right:.7em}.iptv-details__play span:last-child{opacity:.5}.iptv-details__title{font-size:3.3em;font-weight:700}.iptv-details__program{padding-top:3em}.iptv-details__list>div+div{margin-top:1.6em}.iptv-details-epmty>div{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.iptv-details-epmty>div span{background-color:rgba(255,255,255,0.18);-webkit-border-radius:.2em;border-radius:.2em;height:1em}.iptv-details-epmty>div span:first-child{width:8%;margin-right:3.2em}.iptv-details-epmty>div+div{margin-top:2em}.iptv-program{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;font-size:1.2em;font-weight:300;position:relative}.iptv-program-date{font-size:1.2em;padding-left:4.9em;margin-bottom:1em;opacity:.5}.iptv-program__head{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.iptv-program__head-body{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;padding-left:1em}.iptv-program__title{overflow:hidden;-o-text-overflow:'.';text-overflow:'.';display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical}.iptv-program__icon-wrap{width:35%;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;-webkit-border-radius:1em;border-radius:1em;background-color:#464646;position:relative;padding-bottom:25%}.iptv-program__icon-wrap.loaded .iptv-program__icon-img{opacity:1}.iptv-program__icon-img{width:100%;height:100%;position:absolute;top:0;left:0;opacity:0;-webkit-transition:opacity .1s;-o-transition:opacity .1s;transition:opacity .1s;-webkit-border-radius:1em;border-radius:1em}.iptv-program__time{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:5em;position:relative}.iptv-program__descr{opacity:.5;margin-top:.7em}.iptv-program__timeline{-webkit-border-radius:1em;border-radius:1em;background:rgba(255,255,255,0.1);margin-top:.9em}.iptv-program__timeline>div{height:.1em;-webkit-border-radius:1em;border-radius:1em;background:#fff;min-height:2px}.iptv-program__body{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1}.iptv-program.archive::after{content:'';position:absolute;top:.2em;left:3.1em;width:1em;height:1em;background:url('./img/icons/menu/time.svg') no-repeat 50% 50%;background-size:contain}.iptv-program.played::after{content:'';position:absolute;top:.2em;left:3.1em;width:1em;height:1em;background:url('./img/icons/player/play.svg') no-repeat 50% 50%;background-size:contain}.iptv-program.focus .iptv-program__time::after{content:'';position:absolute;top:0;width:2.4em;left:0;background-color:rgba(255,255,255,0.2);height:1.4em;-webkit-border-radius:.2em;border-radius:.2em}.iptv-hud{position:absolute;top:0;left:0;width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;line-height:1.3}.iptv-hud__content{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding-left:1.5em;padding-right:1.5em;padding-top:7em;padding-bottom:14em}.iptv-hud__menu,.iptv-hud__program{background-color:rgba(0,0,0,0.6);-webkit-border-radius:.5em;border-radius:.5em;padding:1em;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.iptv-hud__menu>div,.iptv-hud__program>div{width:100%;overflow:hidden}.iptv-hud__menu{width:22%;margin-right:1.5em}.iptv-hud__program{width:40%}.iptv-hud-menu-info{margin-bottom:1em}.iptv-hud-menu-info__group{opacity:.5}.iptv-hud-menu-info__name{line-height:1.6;font-size:1.8em}.iptv-hud-menu-button{padding:1em;-webkit-border-radius:.3em;border-radius:.3em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;background-color:rgba(255,255,255,0.06)}.iptv-hud-menu-button__icon{margin-right:1em}.iptv-hud-menu-button__icon>svg{width:1.6em !important;height:1.6em !important}.iptv-hud-menu-button__icon .active-layer{opacity:0}.iptv-hud-menu-button__text{font-size:1.3em}.iptv-hud-menu-button.focus{background-color:#fff;color:#000}.iptv-hud-menu-button.active .active-layer{opacity:1}.iptv-hud-menu-button+.iptv-hud-menu-button{margin-top:.5em}.iptv-list-empty{border:.2em dashed rgba(255,255,255,0.5);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;height:12em;-webkit-border-radius:1em;border-radius:1em}.iptv-link{display:inline-block;padding:.1em .5em;-webkit-border-radius:.2em;border-radius:.2em;background-color:rgba(255,255,255,0.1)}.iptv-param-lock{position:absolute;top:50%;right:1.5em;margin-top:-1em;opacity:.5}.iptv-param-lock>svg{width:2em;height:2em}body.platform--orsay .iptv-menu__list-item{padding-right:2.7em}body.platform--orsay .iptv-menu__list-item>span{position:absolute;top:.5em;right:1em}body.light--version .iptv-content{font-size:.9em}body.light--version .iptv-channel{-webkit-border-radius:.3em;border-radius:.3em}body.light--version .iptv-channel::before{-webkit-border-radius:.6em;border-radius:.6em}.iptv-mobile .iptv-content{display:block;padding:0}.iptv-mobile .iptv-content__menu,.iptv-mobile .iptv-content__channels,.iptv-mobile .iptv-content__details{width:100%;padding:0}.iptv-mobile .iptv-menu__list{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.iptv-mobile .iptv-menu__list>div+div{margin:0;margin-left:.5em}.iptv-mobile .iptv-menu__list-item{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.iptv-mobile .iptv-menu__head{display:none}.iptv-mobile .iptv-channels{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:0}.iptv-mobile .iptv-channel{padding-bottom:0;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:14em;height:10em}@media screen and (max-width:400px){.iptv-mobile .iptv-channel{width:11em;height:8em}.iptv-mobile .iptv-channel .iptv-channel__simb{font-size:3.2em}}.iptv-mobile .iptv-channel__chn{display:none}.iptv-mobile .iptv-channel+.iptv-channel{margin:0;margin-left:1em}.iptv-mobile .iptv-content__details{padding:0 1.5em}.iptv-mobile .iptv-details{padding-top:0;height:48vh}@media screen and (max-width:500px){.iptv-mobile .iptv-details__title{font-size:2.5em}}body.platform--browser .iptv-hud__menu,body.platform--browser .iptv-hud__program,body.platform--nw .iptv-hud__menu,body.platform--nw .iptv-hud__program{background-color:rgba(0,0,0,0.3);-webkit-backdrop-filter:blur(1em);backdrop-filter:blur(1em)}body.glass--style-opacity--medium .iptv-hud__menu,body.glass--style-opacity--medium .iptv-hud__program{background-color:rgba(0,0,0,0.6)}body.glass--style-opacity--blacked .iptv-hud__menu,body.glass--style-opacity--blacked .iptv-hud__program{background-color:rgba(0,0,0,0.85)}\n        </style>\n    ");
  }
  var Templates = {
    init: init$2
  };

  function init$1() {
    Lampa.Params.trigger('iptv_guide_update_after_start', false);
    Lampa.Params.trigger('iptv_guide_custom', false);
    Lampa.Params.select('iptv_guide_url', '', '');
    Lampa.Params.select('iptv_guide_interval', {
      '0': '#{iptv_param_guide_update_custom}',
      '1': '1',
      '2': '2',
      '3': '3',
      '5': '5',
      '8': '8',
      '12': '12',
      '18': '18',
      '24': '24 / 1',
      '48': '48 / 2',
      '72': '72 / 3',
      '96': '96 / 4',
      '120': '120 / 5',
      '144': '144 / 6',
      '168': '168 / 7'
    }, '24');
    Lampa.Params.select('iptv_guide_save', {
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '14': '14'
    }, '3');
    Lampa.Settings.listener.follow('open', function (e) {
      if (e.name == 'iptv') {
        if (!Lampa.Account.hasPremium()) {
          var body = e.body.find('.scroll__body > div');
          var info = $("<div class=\"settings-param selector\" data-type=\"button\" data-static=\"true\">\n                    <div class=\"settings-param__name\">".concat(Lampa.Lang.translate('account_premium_more'), "</div>\n                    <div class=\"settings-param__descr\">").concat(Lampa.Lang.translate('iptv_premium'), "</div>\n                </div>"));
          info.on('hover:enter', Lampa.Account.showCubPremium);
          body.prepend('<div class="settings-param-title"><span>' + Lampa.Lang.translate('title_settings') + '</span></div>');
          body.prepend(info);
        }
      }
      if (e.name == 'iptv_guide') {
        var status = e.body.find('.update-guide-status');
        var parser = window.iptv_guide_update_process;
        var listen = function listen() {
          if (!parser) return;
          parser.follow('start', function () {
            status.find('.settings-param__name').text(Lampa.Lang.translate('iptv_guide_status_update'));
            status.find('.settings-param__value').text(Lampa.Lang.translate('iptv_guide_status_parsing') + ' 0%');
          });
          parser.follow('percent', function (data) {
            status.find('.settings-param__value').text(Lampa.Lang.translate('iptv_guide_status_parsing') + ' ' + data.percent.toFixed(2) + '%');
          });
          parser.follow('finish', function (data) {
            status.find('.settings-param__name').text(Lampa.Lang.translate('iptv_guide_status_finish'));
            status.find('.settings-param__value').text(Lampa.Lang.translate('iptv_guide_status_channels') + ' - ' + data.count + ', ' + Lampa.Lang.translate('iptv_guide_status_date') + ' - ' + Lampa.Utils.parseTime(data.time).briefly);
          });
          parser.follow('error', function (data) {
            status.find('.settings-param__name').text(Lampa.Lang.translate('title_error'));
            status.find('.settings-param__value').text(data.text);
          });
        };
        e.body.find('.update-guide-now').on('hover:enter', function () {
          if (window.iptv_guide_update_process) return Lampa.Noty.show(Lampa.Lang.translate('iptv_guide_status_update_wait'));
          Guide.update(status);
          parser = window.iptv_guide_update_process;
          listen();
        });
        var last_status = Lampa.Storage.get('iptv_guide_updated_status', '{}');
        if (last_status.type) {
          if (last_status.type == 'error') {
            status.find('.settings-param__name').text(Lampa.Lang.translate('title_error'));
            status.find('.settings-param__value').text(last_status.text);
          }
          if (last_status.type == 'finish') {
            status.find('.settings-param__value').text(Lampa.Lang.translate('iptv_guide_status_channels') + ' - ' + last_status.channels + ', ' + Lampa.Lang.translate('iptv_guide_status_date') + ' - ' + Lampa.Utils.parseTime(last_status.time).briefly);
          }
        }
        if (parser) listen();
      }
    });
    Lampa.SettingsApi.addComponent({
      component: 'iptv',
      icon: "<svg height=\"36\" viewBox=\"0 0 38 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect x=\"2\" y=\"8\" width=\"34\" height=\"21\" rx=\"3\" stroke=\"white\" stroke-width=\"3\"/>\n            <line x1=\"13.0925\" y1=\"2.34874\" x2=\"16.3487\" y2=\"6.90754\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n            <line x1=\"1.5\" y1=\"-1.5\" x2=\"9.31665\" y2=\"-1.5\" transform=\"matrix(-0.757816 0.652468 0.652468 0.757816 26.197 2)\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n            <line x1=\"9.5\" y1=\"34.5\" x2=\"29.5\" y2=\"34.5\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n        </svg>",
      name: 'IPTV'
    });
    if (Lampa.Manifest.app_digital >= 200) {
      Lampa.SettingsApi.addParam({
        component: 'iptv',
        param: {
          type: 'button'
        },
        field: {
          name: Lampa.Lang.translate('iptv_param_guide')
        },
        onChange: function onChange() {
          Lampa.Settings.create('iptv_guide', {
            onBack: function onBack() {
              Lampa.Settings.create('iptv');
            }
          });
        }
      });
    }
    Lampa.SettingsApi.addParam({
      component: 'iptv',
      param: {
        type: 'title'
      },
      field: {
        name: Lampa.Lang.translate('more')
      }
    });
    Lampa.SettingsApi.addParam({
      component: 'iptv',
      param: {
        name: 'iptv_view_in_main',
        type: 'trigger',
        "default": true
      },
      field: {
        name: Lampa.Lang.translate('iptv_param_view_in_main')
      }
    });
    Lampa.SettingsApi.addParam({
      component: 'iptv',
      param: {
        name: 'iptv_use_db',
        type: 'select',
        values: {
          indexdb: 'IndexedDB',
          storage: 'LocalStorage'
        },
        "default": 'indexdb'
      },
      field: {
        name: Lampa.Lang.translate('iptv_param_use_db')
      },
      onChange: function onChange() {
        Favorites.load().then(function () {
          document.querySelectorAll('.iptv-playlist-item').forEach(function (element) {
            Lampa.Utils.trigger(element, 'update');
          });
        });
      }
    });
    Lampa.SettingsApi.addParam({
      component: 'iptv',
      param: {
        name: 'iptv_favotite_save',
        type: 'select',
        values: {
          url: '#{iptv_param_save_favorite_url}',
          name: '#{iptv_param_save_favorite_name}'
        },
        "default": 'url'
      },
      field: {
        name: Lampa.Lang.translate('iptv_param_save_favorite')
      }
    });
    Lampa.SettingsApi.addParam({
      component: 'iptv',
      param: {
        name: 'iptv_favotite_sort',
        type: 'select',
        values: {
          add: '#{iptv_param_sort_add}',
          name: '#{iptv_param_sort_name}',
          view: '#{iptv_param_sort_view}'
        },
        "default": 'add'
      },
      field: {
        name: Lampa.Lang.translate('iptv_param_sort_favorite')
      },
      onRender: function onRender(item) {
        if (!Lampa.Account.hasPremium()) {
          item.removeClass('selector');
          item.append(Lampa.Template.get('cub_iptv_param_lock'));
        }
      },
      onChange: function onChange() {}
    });
  }
  var Settings = {
    init: init$1
  };

  function init() {
    var domain = Lampa.Manifest.cub_site || 'cub.rip';
    Lampa.Lang.add({
      iptv_noprogram: {
        ru: 'Нет программы',
        en: 'No program',
        uk: 'Немає програми',
        be: 'Няма праграмы',
        zh: '没有节目',
        pt: 'Nenhum programa',
        bg: 'Няма програми'
      },
      iptv_noload_playlist: {
        ru: 'К сожалению, загрузка плейлиста не удалась. Возможно, ваш провайдер заблокировал загрузку из внешних источников.',
        en: 'Unfortunately, the playlist download failed. Your ISP may have blocked downloads from external sources.',
        uk: 'На жаль, завантаження плейлиста не вдалося. Можливо, ваш провайдер заблокував завантаження із зовнішніх джерел.',
        be: 'Нажаль, загрузка плэйліста не атрымалася. Магчыма, ваш правайдэр заблакаваў загрузку са знешніх крыніц.',
        zh: '不幸的是，播放列表下载失败。 您的 ISP 可能已阻止从外部来源下载。',
        pt: 'Infelizmente, o download da lista de reprodução falhou. Seu ISP pode ter bloqueado downloads de fontes externas.',
        bg: 'За съжаление, свалянето на плейлистата се провали. Вашият доставчик може да блокира сваляне от външни източници.'
      },
      iptv_select_playlist: {
        ru: 'Выберите плейлист',
        en: 'Choose a playlist',
        uk: 'Виберіть плейлист',
        be: 'Выберыце плэйліст',
        zh: '选择一个播放列表',
        pt: 'Escolha uma lista de reprodução',
        bg: 'Изберете плейлист'
      },
      iptv_all_channels: {
        ru: 'Все каналы',
        en: 'All channels',
        uk: 'Усі канали',
        be: 'Усе каналы',
        zh: '所有频道',
        pt: 'Todos os canais',
        bg: 'Всички канали'
      },
      iptv_add_fav: {
        ru: 'Добавить в избранное',
        en: 'Add to favorites',
        uk: 'Додати в обране',
        be: 'Дадаць у абранае',
        zh: '添加到收藏夹',
        pt: 'Adicionar aos favoritos',
        bg: 'Добави в избрани'
      },
      iptv_remove_fav: {
        ru: 'Убрать из избранного',
        en: 'Remove from favorites',
        uk: 'Прибрати з вибраного',
        be: 'Прыбраць з абранага',
        zh: '从收藏夹中删除',
        pt: 'Remover dos favoritos',
        bg: 'Премахни от избрани'
      },
      iptv_playlist_empty: {
        ru: 'К сожалению, на данный момент вы не добавили ни одного плейлиста. Чтобы начать просмотр контента, пожалуйста, перейдите на страницу <span class="iptv-link">' + domain + '/iptv</span> и добавьте хотя бы один плейлист.',
        en: 'Sorry, you haven\'t added any playlist yet. To start watching content, please go to <span class="iptv-link">' + domain + '/iptv</span> and add at least one playlist.',
        uk: 'На жаль, на даний момент ви не додали жодного плейлиста. Щоб розпочати перегляд контенту, будь ласка, перейдіть на сторінку <span class="iptv-link">' + domain + '/iptv</span> і додайте хоча б один плейлист.',
        be: 'Нажаль, на дадзены момант вы не дадалі ніводнага плэйліста. Каб пачаць прагляд кантэнту, калі ласка, перайдзіце на старонку <span class="iptv-link">' + domain + '/iptv</span> і дадайце хаця б адзін плэйліст.',
        zh: '抱歉，您还没有添加任何播放列表。 要开始观看内容，请转到 <span class="iptv-link">' + domain + '/iptv</span> 并添加至少一个播放列表。',
        pt: 'Desculpe, você ainda não adicionou nenhuma lista de reprodução. Para começar a assistir o conteúdo, acesse <span class="iptv-link">' + domain + '/iptv</span> e adicione pelo menos uma lista de reprodução.',
        bg: 'Съжалявам, още не сте добавили никаква листа. За да почнете да гледате, моля идете на <span class="iptv-link">' + domain + '/iptv</span> и добавете поне една листа.'
      },
      iptv_select_playlist_text: {
        ru: 'Для того чтобы добавить свой плейлист, вам необходимо перейти на сайт <span class="iptv-link">' + domain + '/iptv</span> и добавить плейлист от вашего провайдера.',
        en: 'In order to add your playlist, you need to go to <span class="iptv-link">' + domain + '/iptv</span> and add a playlist from your provider.',
        uk: 'Щоб додати свій плейлист, вам необхідно перейти на сайт <span class="iptv-link">' + domain + '/iptv</span> і додати плейлист від вашого провайдера.',
        be: 'Для таго каб дадаць свой плэйліст, вам неабходна перайсці на сайт <span class="iptv-link">' + domain + '/iptv</span> і дадаць плэйліст ад вашага правайдэра.',
        zh: '要添加您的播放列表，您需要前往 <span class="iptv-link">' + domain + '/iptv</span> 并添加来自您的提供商的播放列表。',
        pt: 'Para adicionar sua lista de reprodução, você precisa acessar <span class="iptv-link">' + domain + '/iptv</span> e adicionar uma lista de reprodução do seu provedor.',
        bg: 'За да добавите ваша листа, трябва да отидете на <span class="iptv-link">' + domain + '/iptv</span> и да добавите листа от вашият доставчик на телевизия.'
      },
      iptv_updated: {
        ru: 'Обновлено',
        en: 'Updated',
        uk: 'Оновлено',
        be: 'Абноўлена',
        zh: '更新',
        pt: 'Atualizada',
        bg: 'Обновено'
      },
      iptv_update: {
        ru: 'Обновление',
        en: 'Update',
        uk: 'Оновлення',
        be: 'Абнаўленне',
        zh: '更新',
        pt: 'Atualizar',
        bg: 'Обновяване'
      },
      iptv_active: {
        ru: 'Активно',
        en: 'Actively',
        uk: 'Активно',
        be: 'Актыўна',
        zh: '积极地',
        pt: 'Ativamente',
        bg: 'Активно'
      },
      iptv_yesterday: {
        ru: 'Вчера',
        en: 'Yesterday',
        uk: 'Вчора',
        be: 'Учора',
        zh: '昨天',
        pt: 'Ontem',
        bg: 'Вчера'
      },
      iptv_today: {
        ru: 'Сегодня',
        en: 'Today',
        uk: 'Сьогодні',
        be: 'Сёння',
        zh: '今天',
        pt: 'Hoje',
        bg: 'Днес'
      },
      iptv_tomorrow: {
        ru: 'Завтра',
        en: 'Tomorrow',
        uk: 'Завтра',
        be: 'Заўтра',
        zh: '明天',
        pt: 'Amanhã',
        bg: 'Утре'
      },
      iptv_loading: {
        ru: 'Метод загрузки',
        en: 'Download method',
        uk: 'Метод завантаження',
        be: 'Метад загрузкі',
        zh: '下载方式',
        pt: 'Método de download',
        bg: 'Метод на зареждане'
      },
      iptv_params_cub: {
        ru: 'CUB',
        en: 'CUB',
        uk: 'CUB',
        be: 'CUB',
        zh: 'CUB',
        pt: 'CUB',
        bg: 'CUB'
      },
      iptv_params_lampa: {
        ru: 'Lampa',
        en: 'Lampa',
        uk: 'Lampa',
        be: 'Lampa',
        zh: 'Lampa',
        pt: 'Lampa',
        bg: 'Lampa'
      },
      iptv_remove_cache: {
        ru: 'Удалить кеш',
        en: 'Delete cache',
        uk: 'Видалити кеш',
        be: 'Выдаліць кэш',
        zh: '删除缓存',
        pt: 'Excluir cache',
        bg: 'Изтриване на кеш'
      },
      iptv_remove_cache_descr: {
        ru: 'Удалить плейлист из кеша',
        en: 'Delete playlist from cache',
        uk: 'Видалити плейлист з кешу',
        be: 'Выдаліць плэйліст з кэшу',
        zh: '从缓存中删除播放列表',
        pt: 'Excluir lista de reprodução do cache',
        bg: 'Изтрий плейлиста от кеша'
      },
      iptv_params_always: {
        ru: 'Всегда',
        en: 'Always',
        uk: 'Завжди',
        be: 'Заўсёды',
        zh: '总是',
        pt: 'Sempre',
        bg: 'Винаги'
      },
      iptv_params_hour: {
        ru: 'Каждый час',
        en: 'Each hour',
        uk: 'Кожну годину',
        be: 'Кожную гадзіну',
        zh: '每小时',
        pt: 'Cada hora',
        bg: 'Всеки час'
      },
      iptv_params_hour12: {
        ru: 'Каждые 12 часов',
        en: 'Every 12 hours',
        uk: 'Кожні 12 годин',
        be: 'Кожныя 12 гадзін',
        zh: '每12小时',
        pt: 'A cada 12 horas',
        bg: 'Всеки 12 часа'
      },
      iptv_params_day: {
        ru: 'Ежедневно',
        en: 'Daily',
        uk: 'Щодня',
        be: 'Штодня',
        zh: '日常的',
        pt: 'Diário',
        bg: 'Ежедневно'
      },
      iptv_params_week: {
        ru: 'Еженедельно',
        en: 'Weekly',
        uk: 'Щотижня',
        be: 'Штотыдзень',
        zh: '每周',
        pt: 'Semanalmente',
        bg: 'Седмично'
      },
      iptv_params_none: {
        ru: 'Никогда',
        en: 'Never',
        uk: 'Ніколи',
        be: 'Ніколі',
        zh: '绝不',
        pt: 'Nunca',
        bg: 'Никога'
      },
      iptv_update_app_title: {
        ru: 'Обновите приложение',
        en: 'Update the app',
        uk: 'Оновлення програми',
        be: 'Абнавіце дадатак',
        zh: '更新应用程序',
        pt: 'Atualize o aplicativo',
        bg: 'Обновни приложение'
      },
      iptv_update_app_text: {
        ru: 'К сожалению, для работы плагина необходимо обновить вашу лампу путем ее перезагрузки. Она устарела и без этой процедуры плагин не будет функционировать.',
        en: 'Unfortunately, for the plugin to work, you need to update your lamp by rebooting it. It is outdated and without this procedure the plugin will not function.',
        uk: 'На жаль, для роботи плагіна необхідно оновити лампу шляхом її перезавантаження. Вона застаріла і без цієї процедури плагін не функціонуватиме.',
        be: 'Нажаль, для працы плагіна неабходна абнавіць вашу лямпу шляхам яе перазагрузкі. Яна састарэлая і без гэтай працэдуры плягін не будзе функцыянаваць.',
        zh: '不幸的是，要使插件正常工作，您需要通过重新启动来更新灯泡。 它已过时，如果没有此程序，插件将无法运行。',
        pt: 'Infelizmente, para que o plug-in funcione, você precisa atualizar sua lâmpada reiniciando-a. Está desatualizado e sem este procedimento o plugin não funcionará.',
        bg: 'За съжаление, за да работи добавка, трябва да обновите вашата Lampa и да я рестартирате. Приложението не е актуално и без тази процедура добавката не може да работи'
      },
      iptv_param_sort_add: {
        ru: 'По добавлению',
        en: 'By addition',
        uk: 'За додаванням',
        be: 'Па даданні',
        zh: '按添加时间',
        pt: 'Por adição',
        bg: 'По добавяне'
      },
      iptv_param_sort_name: {
        ru: 'По названию',
        en: 'By name',
        uk: 'За назвою',
        be: 'Па назве',
        zh: '按名称',
        pt: 'Por nome',
        bg: 'По име'
      },
      iptv_param_sort_view: {
        ru: 'По просмотрам',
        en: 'By views',
        uk: 'За переглядами',
        be: 'Па праглядах',
        zh: '按观看次数',
        pt: 'Por visualizações',
        bg: 'По прегледи'
      },
      iptv_param_sort_favorite: {
        ru: 'Сортировать избранное',
        en: 'Sort by favorite',
        uk: 'Сортувати в обраному',
        be: 'Сартаваць па выбраным',
        zh: '按收藏排序',
        pt: 'Classificar por favoritos',
        bg: 'Сортиране по избрани'
      },
      iptv_premium: {
        ru: 'Доступ к некоторым функциям возможен только при наличии подписки <b>CUB Premium</b>',
        en: 'Some features are only available with a <b>CUB Premium</b> subscription',
        uk: 'Доступ до деяких функцій можливий лише за наявності передплати <b>CUB Premium</b>',
        be: 'Доступ да некаторых функцый магчымы толькі пры наяўнасці падпіскі <b>CUB Premium</b>',
        zh: '某些功能仅适用于 <b>CUB Premium</b> 订阅',
        pt: 'Alguns recursos estão disponíveis apenas com uma assinatura <b>CUB Premium</b>',
        bg: 'Достъпът до някои функции е наличен само чрез <b>CUB Premium</b> абонамент'
      },
      iptv_param_save_favorite: {
        ru: 'Метод хранения избранного',
        en: 'Favorite storage method',
        uk: 'Спосіб зберігання обраного',
        be: 'Метад захоўвання абранага',
        zh: '收藏存储方法',
        pt: 'Método de armazenamento favorito',
        bg: 'Начин на сърханение на фаворити'
      },
      iptv_param_save_favorite_url: {
        ru: 'По адресу канала',
        en: 'By channel URL',
        uk: 'За URL-адресою каналу',
        be: 'Па URL-адрэсе канала',
        zh: '按频道网址',
        pt: 'Por URL do canal',
        bg: 'По URL на канала'
      },
      iptv_param_save_favorite_name: {
        ru: 'По названию канала',
        en: 'By channel name',
        uk: 'За назвою каналу',
        be: 'Па назве канала',
        zh: '按频道名称',
        pt: 'Por nome do canal',
        bg: 'По име на канала'
      },
      iptv_param_use_db: {
        ru: 'Использовать базу данных',
        en: 'Use database',
        uk: 'Використовувати базу даних',
        be: 'Выкарыстоўваць базу дадзеных',
        zh: '使用数据库',
        pt: 'Utilizar banco de dados',
        bg: 'Използвайки база данни'
      },
      iptv_param_guide: {
        ru: 'Телегид',
        en: 'TV Guide',
        uk: 'Телегід',
        be: 'Тэлегід',
        zh: '电视指南',
        pt: 'Guia de TV',
        bg: 'Телевизионен справочник'
      },
      iptv_search_no_result: {
        ru: 'Нет результатов по запросу',
        en: 'No results found',
        uk: 'Немає результатів за запитом',
        be: 'Няма вынікаў па запыце',
        zh: '未找到结果',
        pt: 'Nenhum resultado encontrado',
        bg: 'Няма намерени резултати'
      },
      iptv_guide_status_update_wait: {
        ru: 'Идет процесс обновления, подождите...',
        en: 'Updating process in progress, please wait...',
        uk: 'Йде процес оновлення, зачекайте...',
        be: 'Ідзе працэс абнаўлення, калі ласка, пачакайце...',
        zh: '更新过程正在进行，请稍等...',
        pt: 'Processo de atualização em andamento, aguarde...',
        bg: 'Процесът на актуализация е в ход, моля изчакайте...'
      },
      iptv_guide_status_update: {
        ru: 'Идет обновление',
        en: 'Update in progress',
        uk: 'Йде оновлення',
        be: 'Ідзе абнаўленне',
        zh: '更新进行中',
        pt: 'Atualização em andamento',
        bg: 'Актуализация в ход'
      },
      iptv_guide_status_parsing: {
        ru: 'Парсинг',
        en: 'Parsing',
        uk: 'Аналіз',
        be: 'Аналіз',
        zh: '解析中',
        pt: 'Analisando',
        bg: 'Анализ'
      },
      iptv_guide_status_finish: {
        ru: 'Статус последнего обновления',
        en: 'Status of the last update',
        uk: 'Статус останнього оновлення',
        be: 'Статус апошняга абнаўлення',
        zh: '最后更新状态',
        pt: 'Estado da última atualização',
        bg: 'Състояние на последното обновление'
      },
      iptv_guide_status_channels: {
        ru: 'Каналов',
        en: 'Channels',
        uk: 'Каналів',
        be: 'Каналаў',
        zh: '频道',
        pt: 'Canais',
        bg: 'Канали'
      },
      iptv_guide_status_date: {
        ru: 'обновлено',
        en: 'updated',
        uk: 'оновлено',
        be: 'абноўлена',
        zh: '已更新',
        pt: 'atualizado',
        bg: 'обновено'
      },
      iptv_guide_status_noupdates: {
        ru: 'Еще нет обновлений',
        en: 'No updates yet',
        uk: 'Ще немає оновлень',
        be: 'Яшчэ няма абнаўленняў',
        zh: '暂无更新',
        pt: 'Ainda sem atualizações',
        bg: 'Все още няма актуализации'
      },
      iptv_guide_error_link: {
        ru: 'Укажите ссылку на телегид',
        en: 'Specify the TV guide link',
        uk: 'Вкажіть посилання на телегід',
        be: 'Пакажыце спасылку на тэлегід',
        zh: '请指定电视指南链接',
        pt: 'Indique o link do guia de TV',
        bg: 'Посочете връзката към телегида'
      },
      iptv_param_guide_custom_title: {
        ru: 'Использовать свою ссылку',
        en: 'Use your own link',
        uk: 'Використовуйте своє посилання',
        be: 'Выкарыстоўвайце сваю спасылку',
        zh: '使用您自己的链接',
        pt: 'Use seu próprio link',
        bg: 'Използвайте своята връзка'
      },
      iptv_param_guide_custom_descr: {
        ru: 'Укажите свою ссылку на телегид, если не хотите использовать телегид от CUB',
        en: 'Specify your TV guide link if you do not want to use the CUB TV guide',
        uk: 'Вкажіть своє посилання на телегід, якщо ви не хочете використовувати телегід від CUB',
        be: 'Пакажыце сваю спасылку на тэлегід, калі вы не хочаце выкарыстоўваць тэлегід ад CUB',
        zh: '如果您不想使用CUB电视指南，请指定您的电视指南链接',
        pt: 'Especifique seu link do guia de TV se não quiser usar o guia de TV da CUB',
        bg: 'Уточнете своята връзка към телегида, ако не искате да използвате този на CUB'
      },
      iptv_param_guide_url_descr: {
        ru: 'Укажите свою ссылку на телегид EPG',
        en: 'Specify your EPG TV guide link',
        uk: 'Вкажіть своє посилання на телегід EPG',
        be: 'Пакажыце сваю спасылку на тэлегід EPG',
        zh: '请指定您的电视指南EPG链接',
        pt: 'Especifique seu link do guia de TV EPG',
        bg: 'Уточнете своята връзка към телегида EPG'
      },
      iptv_param_guide_interval_title: {
        ru: 'Интервал обновления',
        en: 'Update Interval',
        uk: 'Інтервал оновлення',
        be: 'Інтэрвал абнаўлення',
        zh: '更新间隔',
        pt: 'Intervalo de atualização',
        bg: 'Интервал за актуализация'
      },
      iptv_param_guide_interval_descr: {
        ru: 'Через сколько часов обновлять телегид',
        en: 'How many hours to update the TV guide',
        uk: 'Через скільки годин оновлювати телегід',
        be: 'Праз колькі гадзін абнаўляць тэлегід',
        zh: '多少小时更新电视指南',
        pt: 'Quantas horas para atualizar o guia de TV',
        bg: 'През колко часа да актуализира телевизионния справочник'
      },
      iptv_param_guide_update_after_start: {
        ru: 'Обновить при запуске приложения',
        en: 'Update on application startup',
        uk: 'Оновити при запуску додатка',
        be: 'Абнавіць пры запуску прыкладання',
        zh: '启动应用时更新',
        pt: 'Atualizar ao iniciar o aplicativo',
        bg: 'Актуализация при стартиране на приложението'
      },
      iptv_param_guide_update_now: {
        ru: 'Обновить телегид',
        en: 'Update TV Guide Now',
        uk: 'Оновити телегід зараз',
        be: 'Абнавіць тэлегід зараз',
        zh: '立即更新电视指南',
        pt: 'Atualizar guia de TV agora',
        bg: 'Актуализирайте телевизионния справочник сега'
      },
      iptv_param_guide_save_title: {
        ru: 'Число дней хранения',
        en: 'Number of Days to Keep',
        uk: 'Кількість днів зберігання',
        be: 'Колькасць дзён захоўвання',
        zh: '保存天数',
        pt: 'Número de dias para manter',
        bg: 'Брой дни за запазване'
      },
      iptv_param_guide_save_descr: {
        ru: 'Сколько дней хранить телегид в кэше',
        en: 'How many days to keep the TV guide in the cache',
        uk: 'Скільки днів зберігати телегід у кеші',
        be: 'Колькі дзён захоўваць тэлегід у кэшы',
        zh: '在缓存中保存多少天的电视指南',
        pt: 'Quantos dias manter o guia de TV no cache',
        bg: 'За колко дни да се запази телевизионния справочник в кеша'
      },
      iptv_param_guide_update_custom: {
        ru: 'Вручную',
        en: 'Manual',
        uk: 'Вручну',
        be: 'Адзіначку',
        zh: '手动',
        pt: 'Manual',
        bg: 'Ръчно'
      },
      iptv_need_update_app: {
        ru: 'Обновите приложение до последней версии',
        en: 'Update the application to the latest version',
        uk: 'Оновіть програму до останньої версії',
        be: 'Абновіце прыкладанне да апошняй версіі',
        zh: '升级应用程序到最新版本',
        pt: 'Atualize o aplicativo para a versão mais recente',
        bg: 'Актуализирайте приложението до последната версия'
      },
      iptv_channel_lock: {
        ru: 'Заблокировать',
        en: 'Lock',
        uk: 'Заблокувати',
        be: 'Заблакаваць',
        zh: '锁定',
        pt: 'Bloquear',
        bg: 'Заключване'
      },
      iptv_channel_unlock: {
        ru: 'Разблокировать',
        en: 'Unlock',
        uk: 'Розблокувати',
        be: 'Разблакаваць',
        zh: '解锁',
        pt: 'Desbloquear',
        bg: 'Отключване'
      },
      iptv_about_text: {
        ru: 'Удобное приложение IPTV – откройте доступ к множеству каналов, фильмам и сериалам прямо на вашем телевизоре. Интуитивный интерфейс, легкая навигация, и безграничные возможности развлечений на вашем большом экране. Ваш личный портал в мир цифрового телевидения!',
        en: 'Convenient IPTV application - access a variety of channels, movies, and series directly on your television. Intuitive interface, easy navigation, and unlimited entertainment possibilities on your big screen. Your personal portal to the world of digital television!',
        uk: 'Зручний додаток IPTV - отримайте доступ до безлічі каналів, фільмів і серіалів прямо на вашому телевізорі. Інтуїтивний інтерфейс, легка навігація та необмежені можливості розваг на вашому великому екрані. Ваш особистий портал у світ цифрового телебачення!',
        be: 'Зручнае прыкладанне IPTV - атрымайце доступ да шматліканальнага тэлебачання, фільмаў і серыялаў проста на вашым тэлевізары. Інтуітыўны інтэрфейс, лёгкая навігацыя і неабмежаваныя магчымасці разваг на вашым вялікім экране. Ваш асабісты партал у свет цыфравага тэлебачання!',
        zh: '方便的IPTV应用程序-直接在您的电视上访问各种频道，电影和系列。直观的界面，简单的导航以及在您的大屏幕上无限的娱乐可能性。您数字电视世界的个人门户！',
        pt: 'Aplicativo IPTV conveniente - acesse uma variedade de canais, filmes e séries diretamente na sua televisão. Interface intuitiva, navegação fácil e possibilidades de entretenimento ilimitadas na sua tela grande. Seu portal pessoal para o mundo da televisão digital!',
        bg: 'Удобно приложение за IPTV - отворете достъп до множество канали, филми и сериали директно на вашия телевизор. Интуитивен интерфейс, лесна навигация и неограничени възможности за забавления на големия ви екран. Вашият личен портал към света на цифровата телевизия!'
      },
      iptv_confirm_delete_playlist: {
        ru: 'Вы точно хотите удалить плейлист?',
        en: 'Are you sure you want to delete the playlist?',
        uk: 'Ви точно хочете видалити плейлист?',
        be: 'Вы ўпэўненыя, што хочаце выдаліць плейліст?',
        zh: '您确定要删除播放列表吗？',
        pt: 'Tem certeza de que deseja excluir a lista de reprodução?',
        bg: 'Сигурни ли сте, че искате да изтриете списъка с канали?'
      },
      iptv_cache_clear: {
        ru: 'Кеш удален',
        en: 'Cache cleared',
        uk: 'Кеш видалено',
        be: 'Кеш выдалены',
        zh: '缓存已清除',
        pt: 'Cache limpo',
        bg: 'Кешът е изчистен'
      },
      iptv_playlist_deleted: {
        ru: 'Плейлист удален',
        en: 'Playlist deleted',
        uk: 'Плейлист видалено',
        be: 'Плейліст выдалены',
        zh: '播放列表已删除',
        pt: 'Lista de reprodução excluída',
        bg: 'Плейлистът е изтрит'
      },
      iptv_playlist_add_set_url: {
        ru: 'Укажите URL плейлиста',
        en: 'Enter the playlist URL',
        uk: 'Вкажіть URL плейлиста',
        be: 'Укажыце URL плейліста',
        zh: '请输入播放列表的 URL',
        pt: 'Insira o URL da lista de reprodução',
        bg: 'Въведете URL адреса на плейлиста'
      },
      iptv_playlist_add_new: {
        ru: 'Добавить новый плейлист',
        en: 'Add new playlist',
        uk: 'Додати новий плейлист',
        be: 'Дадаць новы плейліст',
        zh: '添加新播放列表',
        pt: 'Adicionar nova lista de reprodução',
        bg: 'Добавяне на нов списък с канали'
      },
      iptv_playlist_url_changed: {
        ru: 'Ссылка изменена',
        en: 'Link changed',
        uk: 'Посилання змінено',
        be: 'Спасылка зменена',
        zh: '链接已更改',
        pt: 'Link alterado',
        bg: 'Връзката е променена'
      },
      iptv_playlist_add_set_name: {
        ru: 'Укажите название плейлиста',
        en: 'Enter the playlist name',
        uk: 'Вкажіть назву плейлиста',
        be: 'Укажыце назву плейліста',
        zh: '请输入播放列表名称',
        pt: 'Insira o nome da lista de reprodução',
        bg: 'Въведете име на плейлиста'
      },
      iptv_playlist_name_changed: {
        ru: 'Название изменено',
        en: 'Name changed',
        uk: 'Назва змінена',
        be: 'Назва зменена',
        zh: '名称已更改',
        pt: 'Nome alterado',
        bg: 'Името е променено'
      },
      iptv_playlist_change_name: {
        ru: 'Изменить название',
        en: 'Change name',
        uk: 'Змінити назву',
        be: 'Змяніць назву',
        zh: '更改名称',
        pt: 'Alterar nome',
        bg: 'Промяна на името'
      },
      iptv_param_view_in_main: {
        ru: 'Показывать каналы на главной',
        en: 'Show channels on main page',
        uk: 'Показувати канали на головній',
        be: 'Паказваць каналы на галоўнай',
        zh: '在主页上显示频道',
        pt: 'Mostrar canais na página principal',
        bg: 'Показване на канали на главната страница'
      }
    });
  }
  var Lang$1 = {
    init: init
  };

  var Channel = /*#__PURE__*/function () {
    function Channel(data, playlist) {
      _classCallCheck(this, Channel);
      this.data = data;
      this.playlist = playlist;
    }

    /**
     * Загрузить шаблон
     */
    return _createClass(Channel, [{
      key: "build",
      value: function build() {
        this.card = Lampa.Template.js('cub_iptv_channel_main_board');
        this.icon = this.card.querySelector('.iptv-channel__ico') || {};
        this.card.addEventListener('visible', this.visible.bind(this));
      }

      /**
       * Загрузить картинку
       */
    }, {
      key: "image",
      value: function image() {
        var _this = this;
        this.icon.onload = function () {
          _this.card.classList.add('loaded');
          if (_this.data.logo.indexOf('epg.it999') == -1) {
            _this.card.addClass('small--icon');
          }
        };
        this.icon.onerror = function () {
          var simb = document.createElement('div');
          simb.addClass('iptv-channel__simb');
          simb.text(_this.data.name.length <= 3 ? _this.data.name.toUpperCase() : _this.data.name.replace(/[^a-z|а-я|0-9]/gi, '').toUpperCase()[0]);
          var text = document.createElement('div');
          text.addClass('iptv-channel__name');
          text.text(Utils.clear(_this.data.name));
          _this.card.querySelector('.iptv-channel__body').append(simb);
          _this.card.querySelector('.iptv-channel__body').append(text);
        };
      }

      /**
       * Создать
       */
    }, {
      key: "create",
      value: function create() {
        var _this2 = this;
        this.build();
        this.card.addEventListener('hover:focus', function () {
          if (_this2.onFocus) _this2.onFocus(_this2.card, _this2.data);
        });
        this.card.addEventListener('hover:hover', function () {
          if (_this2.onHover) _this2.onHover(_this2.card, _this2.data);
        });
        this.card.addEventListener('hover:enter', function () {
          var play = {
            title: _this2.data.name || '',
            url: _this2.data.url,
            tv: true
          };
          Lampa.Player.runas(Lampa.Storage.field('player_iptv'));
          Lampa.Player.play(play);
          Lampa.Player.playlist(_this2.playlist.map(function (a) {
            return {
              title: a.name,
              url: a.url,
              tv: true
            };
          }));
        });
        this.image();
      }
    }, {
      key: "emit",
      value: function emit() {}
    }, {
      key: "use",
      value: function use() {}

      /**
       * Загружать картинку если видна карточка
       */
    }, {
      key: "visible",
      value: function visible() {
        if (this.data.logo) this.icon.src = this.data.logo;else this.icon.onerror();
        if (this.onVisible) this.onVisible(this.card, this.data);
      }

      /**
       * Уничтожить
       */
    }, {
      key: "destroy",
      value: function destroy() {
        this.icon.onerror = function () {};
        this.icon.onload = function () {};
        this.icon.src = '';
        this.card.remove();
        this.card = null;
        this.icon = null;
      }

      /**
       * Рендер
       * @returns {object}
       */
    }, {
      key: "render",
      value: function render(js) {
        return js ? this.card : $(this.card);
      }
    }]);
  }();

  function startPlugin() {
    window.plugin_iptv_ready = true;
    var manifest = {
      type: 'video',
      version: '1.2.8',
      name: 'IPTV',
      description: '',
      component: 'iptv',
      onMain: function onMain(data) {
        if (!Lampa.Storage.field('iptv_view_in_main')) return {
          results: []
        };
        var playlist = Lampa.Arrays.clone(Lampa.Storage.get('iptv_play_history_main_board', '[]')).reverse();
        return {
          results: playlist,
          title: Lampa.Lang.translate('title_continue'),
          nomore: true,
          line_type: 'iptv',
          cardClass: function cardClass(item) {
            return new Channel(item, playlist);
          }
        };
      }
    };
    Lampa.Manifest.plugins = manifest;
    if (Lampa.Manifest.app_digital >= 300) {
      Lampa.ContentRows.add({
        index: 1,
        screen: ['main'],
        call: function call(params, screen) {
          if (!Lampa.Storage.field('iptv_view_in_main')) return;
          var playlist = Lampa.Arrays.clone(Lampa.Storage.get('iptv_play_history_main_board', '[]')).reverse();

          // возвращаем функцию с коллбеком
          return function (call) {
            playlist.forEach(function (item) {
              item.params = {
                createInstance: function createInstance(item) {
                  return new Channel(item, playlist);
                }
              };
            });
            call({
              results: playlist,
              title: Lampa.Lang.translate('title_continue')
            });
          };
        }
      });
    }
    function add() {
      var button = $("<li class=\"menu__item selector\">\n            <div class=\"menu__ico\">\n                <svg height=\"36\" viewBox=\"0 0 38 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"2\" y=\"8\" width=\"34\" height=\"21\" rx=\"3\" stroke=\"currentColor\" stroke-width=\"3\"/>\n                    <line x1=\"13.0925\" y1=\"2.34874\" x2=\"16.3487\" y2=\"6.90754\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                    <line x1=\"1.5\" y1=\"-1.5\" x2=\"9.31665\" y2=\"-1.5\" transform=\"matrix(-0.757816 0.652468 0.652468 0.757816 26.197 2)\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                    <line x1=\"9.5\" y1=\"34.5\" x2=\"29.5\" y2=\"34.5\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                </svg>\n            </div>\n            <div class=\"menu__text\">".concat(window.lampa_settings.iptv ? Lampa.Lang.translate('player_playlist') : 'IPTV', "</div>\n        </li>"));
      button.on('hover:enter', function () {
        if (window.lampa_settings.iptv) {
          if (Lampa.Activity.active().component == 'iptv') return Lampa.Activity.active().activity.component.playlist();
        }
        Lampa.Activity.push({
          url: '',
          title: 'IPTV',
          component: 'iptv',
          page: 1
        });
      });
      $('.menu .menu__list').eq(0).append(button);
      $('body').append(Lampa.Template.get('cub_iptv_style', {}, true));
      if (window.lampa_settings.iptv) {
        $('.head .head__action.open--search').addClass('hide');
        $('.head .head__action.open--premium').remove();
        $('.head .head__action.open--feed').remove();
        $('.navigation-bar__body [data-action="main"]').unbind().on('click', function () {
          Lampa.Activity.active().activity.component.playlist();
        });
        $('.navigation-bar__body [data-action="search"]').addClass('hide');
      }
    }
    Lang$1.init();
    Templates.init();
    Settings.init();
    EPG.init();
    Guide.init();
    Lampa.Component.add('iptv', Component);
    if (window.lampa_settings.iptv) {
      Lampa.Storage.set('start_page', 'last');
      window.start_deep_link = {
        component: 'iptv'
      };
    }
    if (window.appready) add();else {
      Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') add();
      });
    }
  }
  if (!window.plugin_iptv_ready) startPlugin();

})();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXB0di5qcyIsInNvdXJjZXMiOlsiaXB0di91dGlscy91dGlscy5qcyIsImlwdHYvdXRpbHMvZmF2b3JpdGVzLmpzIiwiaXB0di91dGlscy9sb2NrZWQuanMiLCJpcHR2L3V0aWxzL2RiLmpzIiwiaXB0di91dGlscy9wYXJhbXMuanMiLCJpcHR2L3V0aWxzL20zdTguanMiLCJpcHR2L3V0aWxzL2FwaS5qcyIsImlwdHYvdXRpbHMvcGlsb3QuanMiLCJpcHR2L3BsYXlsaXN0L2l0ZW0uanMiLCJpcHR2L3BsYXlsaXN0L21haW4uanMiLCJpcHR2L2NoYW5uZWxzL2ljb25zLmpzIiwiaXB0di91dGlscy9lcGcuanMiLCJpcHR2L2NoYW5uZWxzL2RldGFpbHMuanMiLCJpcHR2L2NoYW5uZWxzL3NlYXJjaC5qcyIsImlwdHYvY2hhbm5lbHMvbWVudS5qcyIsImlwdHYvdXRpbHMvdXJsLmpzIiwiaXB0di9odWQvbWVudS5qcyIsImlwdHYvaHVkL3Byb2dyYW0uanMiLCJpcHR2L2h1ZC9odWQuanMiLCJpcHR2L2NoYW5uZWxzL21haW4uanMiLCJpcHR2L2NvbXBvbmVudC5qcyIsImlwdHYvdXRpbHMvdW5wYWNrLmpzIiwiaXB0di91dGlscy9ndWlkZV9wYXJzZXIuanMiLCJpcHR2L3V0aWxzL2d1aWRlLmpzIiwiaXB0di90ZW1wbGF0ZXMuanMiLCJpcHR2L3NldHRpbmdzLmpzIiwiaXB0di9sYW5nLmpzIiwiaXB0di91dGlscy9tYWluX2NoYW5uZWwuanMiLCJpcHR2L2lwdHYuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERCIGZyb20gJy4vZGInXG5cbmNsYXNzIFV0aWxze1xuICAgIHN0YXRpYyBjbGVhcihzdHIpe1xuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcJnF1b3Q7L2csJ1wiJykucmVwbGFjZSgvXFwmIzAzOTsvZyxcIidcIikucmVwbGFjZSgvXFwmYW1wOy9nLFwiJlwiKS5yZXBsYWNlKC9cXCYuKz87L2csJycpXG4gICAgfVxuXG4gICAgc3RhdGljIGlzSEQobmFtZSl7XG4gICAgICAgIGxldCBtYXRoID0gbmFtZS50b0xvd2VyQ2FzZSgpLm1hdGNoKCcgLmhkJHwgLtC9ZCR8IC5oZCB8IC7QvWQgfCBoZCR8INC9ZCZ8IGhkIHwg0L1kICcpXG5cbiAgICAgICAgcmV0dXJuIG1hdGggPyBtYXRoWzBdLnRyaW0oKSA6ICcnXG4gICAgfVxuXG4gICAgc3RhdGljIGNsZWFySERTRChuYW1lKXtcbiAgICAgICAgcmV0dXJuIG5hbWUucmVwbGFjZSgvIGhkJHwg0L1kJHwgLmhkJHwgLtC9ZCQvZ2ksJycpLnJlcGxhY2UoLyBzZCQvZ2ksJycpLnJlcGxhY2UoLyBoZCB8INC9ZCB8IC5oZCB8IC7QvWQgL2dpLCcgJykucmVwbGFjZSgvIHNkIC9naSwnICcpXG4gICAgfVxuXG4gICAgc3RhdGljIGNsZWFyTWVudU5hbWUobmFtZSl7XG4gICAgICAgIHJldHVybiBuYW1lLnJlcGxhY2UoL15cXGQrXFwuIC9naSwnJykucmVwbGFjZSgvXlxcZCsgL2dpLCcnKVxuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhckNoYW5uZWxOYW1lKG5hbWUpe1xuICAgICAgICByZXR1cm4gdGhpcy5jbGVhckhEU0QodGhpcy5jbGVhcihuYW1lKSlcbiAgICB9XG5cbiAgICBzdGF0aWMgaGFzQXJjaGl2ZShjaGFubmVsKXtcbiAgICAgICAgaWYoY2hhbm5lbC5jYXRjaHVwKXtcbiAgICAgICAgICAgIGxldCBkYXlzID0gcGFyc2VJbnQoY2hhbm5lbC5jYXRjaHVwLmRheXMpXG5cbiAgICAgICAgICAgIGlmKCFpc05hTihkYXlzKSAmJiBkYXlzID4gMCkgcmV0dXJuIGRheXNcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAwXG4gICAgfVxuXG4gICAgc3RhdGljIGNhblVzZURCKCl7XG4gICAgICAgIHJldHVybiBEQi5kYiAmJiBMYW1wYS5TdG9yYWdlLmdldCgnaXB0dl91c2VfZGInLCdpbmRleGRiJykgPT0gJ2luZGV4ZGInXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVdGlscyIsImltcG9ydCBEQiBmcm9tICcuL2RiJ1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMnXG5cbmxldCBmYXZvcml0ZXMgPSBbXVxuXG5jbGFzcyBGYXZvcml0ZXN7XG4gICAgc3RhdGljIGxvYWQoKXtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICBpZihVdGlscy5jYW5Vc2VEQigpKXtcbiAgICAgICAgICAgICAgICBEQi5nZXREYXRhKCdmYXZvcml0ZXMnKS50aGVuKChyZXN1bHQpPT57XG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlcyA9IHJlc3VsdCB8fCBbXVxuICAgICAgICAgICAgICAgIH0pLmZpbmFsbHkocmVzb2x2ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3N1cG9ydCgpXG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgbm9zdXBvcnQoKXtcbiAgICAgICAgZmF2b3JpdGVzID0gTGFtcGEuU3RvcmFnZS5nZXQoJ2lwdHZfZmF2b3JpdGVfY2hhbm5lbHMnLCdbXScpXG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3QoKXtcbiAgICAgICAgcmV0dXJuIGZhdm9yaXRlc1xuICAgIH1cblxuICAgIHN0YXRpYyBrZXkoKXtcbiAgICAgICAgcmV0dXJuIExhbXBhLlN0b3JhZ2UuZ2V0KCdpcHR2X2Zhdm90aXRlX3NhdmUnLCd1cmwnKVxuICAgIH1cblxuICAgIHN0YXRpYyBmaW5kKGZhdm9yaXRlKXtcbiAgICAgICAgcmV0dXJuIGZhdm9yaXRlcy5maW5kKGE9PmFbdGhpcy5rZXkoKV0gPT0gZmF2b3JpdGVbdGhpcy5rZXkoKV0pXG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZShmYXZvcml0ZSl7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgbGV0IGZpbmQgPSBmYXZvcml0ZXMuZmluZChhPT5hW3RoaXMua2V5KCldID09IGZhdm9yaXRlW3RoaXMua2V5KCldKVxuXG4gICAgICAgICAgICBpZihmaW5kKXtcbiAgICAgICAgICAgICAgICBpZihVdGlscy5jYW5Vc2VEQigpKXtcbiAgICAgICAgICAgICAgICAgICAgREIuZGVsZXRlRGF0YSgnZmF2b3JpdGVzJywgZmF2b3JpdGVbdGhpcy5rZXkoKV0pLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLkFycmF5cy5yZW1vdmUoZmF2b3JpdGVzLCBmaW5kKVxuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKHJlamVjdClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuQXJyYXlzLnJlbW92ZShmYXZvcml0ZXMsIGZpbmQpXG5cbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoJ2lwdHZfZmF2b3JpdGVfY2hhbm5lbHMnLGZhdm9yaXRlcylcblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHJlamVjdCgpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGFkZChmYXZvcml0ZSl7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgaWYoIWZhdm9yaXRlcy5maW5kKGE9PmFbdGhpcy5rZXkoKV0gPT0gZmF2b3JpdGVbdGhpcy5rZXkoKV0pKXtcblxuICAgICAgICAgICAgICAgIExhbXBhLkFycmF5cy5leHRlbmQoZmF2b3JpdGUse1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiAwLFxuICAgICAgICAgICAgICAgICAgICBhZGRlZDogRGF0ZS5ub3coKVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBpZihVdGlscy5jYW5Vc2VEQigpKXtcbiAgICAgICAgICAgICAgICAgICAgREIuYWRkRGF0YSgnZmF2b3JpdGVzJywgZmF2b3JpdGVbdGhpcy5rZXkoKV0sIGZhdm9yaXRlKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZXMucHVzaChmYXZvcml0ZSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKHJlamVjdClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVzLnB1c2goZmF2b3JpdGUpXG5cbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoJ2lwdHZfZmF2b3JpdGVfY2hhbm5lbHMnLGZhdm9yaXRlcylcblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHJlamVjdCgpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIHVwZGF0ZShmYXZvcml0ZSl7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgaWYoZmF2b3JpdGVzLmZpbmQoYT0+YVt0aGlzLmtleSgpXSA9PSBmYXZvcml0ZVt0aGlzLmtleSgpXSkpe1xuXG4gICAgICAgICAgICAgICAgTGFtcGEuQXJyYXlzLmV4dGVuZChmYXZvcml0ZSx7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IDAsXG4gICAgICAgICAgICAgICAgICAgIGFkZGVkOiBEYXRlLm5vdygpXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIGlmKFV0aWxzLmNhblVzZURCKCkpIERCLnVwZGF0ZURhdGEoJ2Zhdm9yaXRlcycsIGZhdm9yaXRlW3RoaXMua2V5KCldLCBmYXZvcml0ZSkudGhlbihyZXNvbHZlKS5jYXRjaChyZWplY3QpXG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoJ2lwdHZfZmF2b3JpdGVfY2hhbm5lbHMnLGZhdm9yaXRlcylcblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHJlamVjdCgpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIHRvZ2dsZShmYXZvcml0ZSl7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmQoZmF2b3JpdGUpID8gdGhpcy5yZW1vdmUoZmF2b3JpdGUpIDogdGhpcy5hZGQoZmF2b3JpdGUpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGYXZvcml0ZXMiLCJpbXBvcnQgREIgZnJvbSAnLi9kYidcbmltcG9ydCBVdGlscyBmcm9tICcuL3V0aWxzJ1xuXG5sZXQgbG9ja2VkID0gW11cblxuY2xhc3MgTG9ja2Vke1xuICAgIHN0YXRpYyBsb2FkKCl7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgaWYoVXRpbHMuY2FuVXNlREIoKSl7XG4gICAgICAgICAgICAgICAgREIuZ2V0RGF0YSgnbG9ja2VkJykudGhlbigocmVzdWx0KT0+e1xuICAgICAgICAgICAgICAgICAgICBsb2NrZWQgPSByZXN1bHQgfHwgW11cbiAgICAgICAgICAgICAgICB9KS5maW5hbGx5KHJlc29sdmUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHRoaXMubm9zdXBvcnQoKVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIG5vc3Vwb3J0KCl7XG4gICAgICAgIGxvY2tlZCA9IExhbXBhLlN0b3JhZ2UuZ2V0KCdpcHR2X2xvY2tlZF9jaGFubmVscycsJ1tdJylcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdCgpe1xuICAgICAgICByZXR1cm4gbG9ja2VkXG4gICAgfVxuXG4gICAgc3RhdGljIGZpbmQoa2V5KXtcbiAgICAgICAgcmV0dXJuIGxvY2tlZC5maW5kKGE9PmEgPT0ga2V5KVxuICAgIH1cblxuICAgIHN0YXRpYyBmb3JtYXQodHlwZSwgZWxlbWVudCl7XG4gICAgICAgIHJldHVybiB0eXBlID09ICdjaGFubmVsJyA/ICdjaGFubmVsOicgKyBlbGVtZW50W0xhbXBhLlN0b3JhZ2UuZ2V0KCdpcHR2X2Zhdm90aXRlX3NhdmUnLCd1cmwnKV0gOiB0eXBlID09ICdncm91cCcgPyAnZ3JvdXA6JyArIGVsZW1lbnQgOiAnb3RoZXI6JyArIGVsZW1lbnRcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlKGtleSl7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgbGV0IGZpbmQgPSBsb2NrZWQuZmluZChhPT5hID09IGtleSlcblxuICAgICAgICAgICAgaWYoZmluZCl7XG4gICAgICAgICAgICAgICAgaWYoVXRpbHMuY2FuVXNlREIoKSl7XG4gICAgICAgICAgICAgICAgICAgIERCLmRlbGV0ZURhdGEoJ2xvY2tlZCcsIGtleSkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuQXJyYXlzLnJlbW92ZShsb2NrZWQsIGZpbmQpXG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2gocmVqZWN0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBMYW1wYS5BcnJheXMucmVtb3ZlKGxvY2tlZCwgZmluZClcblxuICAgICAgICAgICAgICAgICAgICBMYW1wYS5TdG9yYWdlLnNldCgnaXB0dl9sb2NrZWRfY2hhbm5lbHMnLGxvY2tlZClcblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHJlamVjdCgpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGFkZChrZXkpe1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgICAgIGlmKCFsb2NrZWQuZmluZChhPT5hID09IGtleSkpe1xuXG4gICAgICAgICAgICAgICAgaWYoVXRpbHMuY2FuVXNlREIoKSl7XG4gICAgICAgICAgICAgICAgICAgIERCLmFkZERhdGEoJ2xvY2tlZCcsIGtleSwga2V5KS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQucHVzaChrZXkpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChyZWplY3QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGxvY2tlZC5wdXNoKGtleSlcblxuICAgICAgICAgICAgICAgICAgICBMYW1wYS5TdG9yYWdlLnNldCgnaXB0dl9sb2NrZWRfY2hhbm5lbHMnLGxvY2tlZClcblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHJlamVjdCgpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIHVwZGF0ZShrZXkpe1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgICAgIGlmKGxvY2tlZC5maW5kKGE9PmEgPT0ga2V5KSl7XG5cbiAgICAgICAgICAgICAgICBpZihVdGlscy5jYW5Vc2VEQigpKSBEQi51cGRhdGVEYXRhKCdsb2NrZWQnLCBrZXksIGtleSkudGhlbihyZXNvbHZlKS5jYXRjaChyZWplY3QpXG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoJ2lwdHZfbG9ja2VkX2NoYW5uZWxzJyxsb2NrZWQpXG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSByZWplY3QoKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyB0b2dnbGUoa2V5KXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZChrZXkpID8gdGhpcy5yZW1vdmUoa2V5KSA6IHRoaXMuYWRkKGtleSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvY2tlZCIsImltcG9ydCBGYXZvcml0ZXMgZnJvbSAnLi9mYXZvcml0ZXMnXG5pbXBvcnQgTG9ja2VkIGZyb20gJy4vbG9ja2VkJ1xuXG5sZXQgREIgPSBuZXcgTGFtcGEuREIoJ2N1Yl9pcHR2JywgWydwbGF5bGlzdCcsJ3BhcmFtcycsJ2VwZycsJ2Zhdm9yaXRlcycsJ290aGVyJywgJ2VwZ19jaGFubmVscycsICdsb2NrZWQnXSwgNilcbiAgICBEQi5sb2dzID0gdHJ1ZVxuICAgIERCLm9wZW5EYXRhYmFzZSgpLnRoZW4oKCk9PntcbiAgICAgICAgRmF2b3JpdGVzLmxvYWQoKVxuICAgICAgICBMb2NrZWQubG9hZCgpXG4gICAgfSkuY2F0Y2goKCk9PntcbiAgICAgICAgRmF2b3JpdGVzLm5vc3Vwb3J0KClcbiAgICAgICAgTG9ja2VkLm5vc3Vwb3J0KClcbiAgICB9KVxuXG5leHBvcnQgZGVmYXVsdCBEQiIsImltcG9ydCBEQiBmcm9tICcuL2RiJ1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMnXG5cbmZ1bmN0aW9uIGZpeFBhcmFtcyhwYXJhbXNfZGF0YSl7XG4gICAgbGV0IHBhcmFtcyA9IHBhcmFtc19kYXRhIHx8IHt9XG4gICAgXG4gICAgTGFtcGEuQXJyYXlzLmV4dGVuZChwYXJhbXMse1xuICAgICAgICB1cGRhdGU6ICdub25lJyxcbiAgICAgICAgdXBkYXRlX3RpbWU6IERhdGUubm93KCksXG4gICAgICAgIGxvYWRpbmc6ICdjdWInXG4gICAgfSlcblxuICAgIHJldHVybiBwYXJhbXNcbn1cblxuY2xhc3MgUGFyYW1ze1xuICAgIHN0YXRpYyBnZXQoaWQpe1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpPT57XG4gICAgICAgICAgICBpZihVdGlscy5jYW5Vc2VEQigpKXtcbiAgICAgICAgICAgICAgICBEQi5nZXREYXRhQW55Q2FzZSgncGFyYW1zJyxpZCkudGhlbigocGFyYW1zKT0+e1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZpeFBhcmFtcyhwYXJhbXMpKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZml4UGFyYW1zKExhbXBhLlN0b3JhZ2UuZ2V0KCdpcHR2X3BsYXlsaXN0X3BhcmFtc18nK2lkLCd7fScpKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0KGlkLCBwYXJhbXMpe1xuICAgICAgICBpZihVdGlscy5jYW5Vc2VEQigpKXtcbiAgICAgICAgICAgIHJldHVybiBEQi5yZXdyaXRlRGF0YSgncGFyYW1zJywgaWQsIGZpeFBhcmFtcyhwYXJhbXMpKVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpPT57XG4gICAgICAgICAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoJ2lwdHZfcGxheWxpc3RfcGFyYW1zXycraWQsIGZpeFBhcmFtcyhwYXJhbXMpKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyB2YWx1ZShwYXJhbXMsIG5hbWUpe1xuICAgICAgICByZXR1cm4gTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2lwdHZfcGFyYW1zXycgKyBwYXJhbXNbbmFtZV0pXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYXJhbXMiLCJmdW5jdGlvbiBpc1ZhbGlkUGF0aChzdHJpbmcpIHtcbiAgICBsZXQgdXJsO1xuICAgIFxuICAgIHRyeSB7XG4gICAgICB1cmwgPSBuZXcgVVJMKHN0cmluZyk7XG4gICAgfSBjYXRjaCAoXykge1xuICAgICAgcmV0dXJuIGZhbHNlOyAgXG4gICAgfVxuICBcbiAgICByZXR1cm4gdXJsLnByb3RvY29sID09PSBcImh0dHA6XCIgfHwgdXJsLnByb3RvY29sID09PSBcImh0dHBzOlwiO1xuICB9XG5cbmNvbnN0IFBhcnNlciA9IHt9XG5cblBhcnNlci5wYXJzZSA9IGNvbnRlbnQgPT4ge1xuICBsZXQgcGxheWxpc3QgPSB7XG4gICAgaGVhZGVyOiB7fSxcbiAgICBpdGVtczogW11cbiAgfVxuXG4gIGxldCBsaW5lcyA9IGNvbnRlbnQuc3BsaXQoJ1xcbicpLm1hcChwYXJzZUxpbmUpXG4gIGxldCBmaXJzdExpbmUgPSBsaW5lcy5maW5kKGwgPT4gbC5pbmRleCA9PT0gMClcblxuICBpZiAoIWZpcnN0TGluZSB8fCAhL14jRVhUTTNVLy50ZXN0KGZpcnN0TGluZS5yYXcpKSB0aHJvdyBuZXcgRXJyb3IoJ1BsYXlsaXN0IGlzIG5vdCB2YWxpZCcpXG5cbiAgcGxheWxpc3QuaGVhZGVyID0gcGFyc2VIZWFkZXIoZmlyc3RMaW5lKVxuXG4gIGxldCBpID0gMFxuICBjb25zdCBpdGVtcyA9IHt9XG4gIGZvciAobGV0IGxpbmUgb2YgbGluZXMpIHtcbiAgICBpZiAobGluZS5pbmRleCA9PT0gMCkgY29udGludWVcbiAgICBjb25zdCBzdHJpbmcgPSBsaW5lLnJhdy50b1N0cmluZygpLnRyaW0oKVxuICAgIGlmIChzdHJpbmcuc3RhcnRzV2l0aCgnI0VYVElORjonKSkge1xuICAgICAgY29uc3QgRVhUSU5GID0gc3RyaW5nXG4gICAgICBpdGVtc1tpXSA9IHtcbiAgICAgICAgbmFtZTogRVhUSU5GLmdldE5hbWUoKSxcbiAgICAgICAgdHZnOiB7XG4gICAgICAgICAgaWQ6IEVYVElORi5nZXRBdHRyaWJ1dGUoJ3R2Zy1pZCcpLFxuICAgICAgICAgIG5hbWU6IEVYVElORi5nZXRBdHRyaWJ1dGUoJ3R2Zy1uYW1lJyksXG4gICAgICAgICAgbG9nbzogRVhUSU5GLmdldEF0dHJpYnV0ZSgndHZnLWxvZ28nKSxcbiAgICAgICAgICB1cmw6IEVYVElORi5nZXRBdHRyaWJ1dGUoJ3R2Zy11cmwnKSxcbiAgICAgICAgICByZWM6IEVYVElORi5nZXRBdHRyaWJ1dGUoJ3R2Zy1yZWMnKVxuICAgICAgICB9LFxuICAgICAgICBncm91cDoge1xuICAgICAgICAgIHRpdGxlOiBFWFRJTkYuZ2V0QXR0cmlidXRlKCdncm91cC10aXRsZScpXG4gICAgICAgIH0sXG4gICAgICAgIGh0dHA6IHtcbiAgICAgICAgICByZWZlcnJlcjogJycsXG4gICAgICAgICAgJ3VzZXItYWdlbnQnOiBFWFRJTkYuZ2V0QXR0cmlidXRlKCd1c2VyLWFnZW50JylcbiAgICAgICAgfSxcbiAgICAgICAgdXJsOiB1bmRlZmluZWQsXG4gICAgICAgIHJhdzogbGluZS5yYXcsXG4gICAgICAgIGxpbmU6IGxpbmUuaW5kZXggKyAxLFxuICAgICAgICBjYXRjaHVwOiB7XG4gICAgICAgICAgdHlwZTogRVhUSU5GLmdldEF0dHJpYnV0ZSgnY2F0Y2h1cCcpLFxuICAgICAgICAgIGRheXM6IEVYVElORi5nZXRBdHRyaWJ1dGUoJ2NhdGNodXAtZGF5cycpLFxuICAgICAgICAgIHNvdXJjZTogRVhUSU5GLmdldEF0dHJpYnV0ZSgnY2F0Y2h1cC1zb3VyY2UnKVxuICAgICAgICB9LFxuICAgICAgICB0aW1lc2hpZnQ6IEVYVElORi5nZXRBdHRyaWJ1dGUoJ3RpbWVzaGlmdCcpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzdHJpbmcuc3RhcnRzV2l0aCgnI0VYVFZMQ09QVDonKSkge1xuICAgICAgaWYgKCFpdGVtc1tpXSkgY29udGludWVcbiAgICAgIGNvbnN0IEVYVFZMQ09QVCA9IHN0cmluZ1xuICAgICAgaXRlbXNbaV0uaHR0cC5yZWZlcnJlciA9IEVYVFZMQ09QVC5nZXRPcHRpb24oJ2h0dHAtcmVmZXJyZXInKSB8fCBpdGVtc1tpXS5odHRwLnJlZmVycmVyXG4gICAgICBpdGVtc1tpXS5odHRwWyd1c2VyLWFnZW50J10gPVxuICAgICAgICBFWFRWTENPUFQuZ2V0T3B0aW9uKCdodHRwLXVzZXItYWdlbnQnKSB8fCBpdGVtc1tpXS5odHRwWyd1c2VyLWFnZW50J11cbiAgICAgIGl0ZW1zW2ldLnJhdyArPSBgXFxyXFxuJHtsaW5lLnJhd31gXG4gICAgfSBlbHNlIGlmIChzdHJpbmcuc3RhcnRzV2l0aCgnI0VYVEdSUDonKSkge1xuICAgICAgaWYgKCFpdGVtc1tpXSkgY29udGludWVcbiAgICAgIGNvbnN0IEVYVEdSUCA9IHN0cmluZ1xuICAgICAgaXRlbXNbaV0uZ3JvdXAudGl0bGUgPSBFWFRHUlAuZ2V0VmFsdWUoKSB8fCBpdGVtc1tpXS5ncm91cC50aXRsZVxuICAgICAgaXRlbXNbaV0ucmF3ICs9IGBcXHJcXG4ke2xpbmUucmF3fWBcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFpdGVtc1tpXSkgY29udGludWVcbiAgICAgIGNvbnN0IHVybCA9IHN0cmluZy5nZXRVUkwoKVxuICAgICAgY29uc3QgdXNlcl9hZ2VudCA9IHN0cmluZy5nZXRQYXJhbWV0ZXIoJ3VzZXItYWdlbnQnKVxuICAgICAgY29uc3QgcmVmZXJyZXIgPSBzdHJpbmcuZ2V0UGFyYW1ldGVyKCdyZWZlcmVyJylcbiAgICAgIGlmICh1cmwgJiYgaXNWYWxpZFBhdGgodXJsKSkge1xuICAgICAgICBpdGVtc1tpXS51cmwgPSB1cmxcbiAgICAgICAgaXRlbXNbaV0uaHR0cFsndXNlci1hZ2VudCddID0gdXNlcl9hZ2VudCB8fCBpdGVtc1tpXS5odHRwWyd1c2VyLWFnZW50J11cbiAgICAgICAgaXRlbXNbaV0uaHR0cC5yZWZlcnJlciA9IHJlZmVycmVyIHx8IGl0ZW1zW2ldLmh0dHAucmVmZXJyZXJcbiAgICAgICAgaXRlbXNbaV0ucmF3ICs9IGBcXHJcXG4ke2xpbmUucmF3fWBcbiAgICAgICAgaSsrXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWl0ZW1zW2ldKSBjb250aW51ZVxuICAgICAgICBpdGVtc1tpXS5yYXcgKz0gYFxcclxcbiR7bGluZS5yYXd9YFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsYXlsaXN0Lml0ZW1zID0gT2JqZWN0LnZhbHVlcyhpdGVtcylcblxuICByZXR1cm4gcGxheWxpc3Rcbn1cblxuZnVuY3Rpb24gcGFyc2VMaW5lKGxpbmUsIGluZGV4KSB7XG4gIHJldHVybiB7XG4gICAgaW5kZXgsXG4gICAgcmF3OiBsaW5lXG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VIZWFkZXIobGluZSkge1xuICBjb25zdCBzdXBwb3J0ZWRBdHRycyA9IFsneC10dmctdXJsJywgJ3VybC10dmcnXVxuXG4gIGxldCBhdHRycyA9IHt9XG4gIGZvciAobGV0IGF0dHJOYW1lIG9mIHN1cHBvcnRlZEF0dHJzKSB7XG4gICAgY29uc3QgdHZnVXJsID0gbGluZS5yYXcuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKVxuICAgIGlmICh0dmdVcmwpIHtcbiAgICAgIGF0dHJzW2F0dHJOYW1lXSA9IHR2Z1VybFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYXR0cnMsXG4gICAgcmF3OiBsaW5lLnJhd1xuICB9XG59XG5cblN0cmluZy5wcm90b3R5cGUuZ2V0TmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgbGV0IG5hbWUgPSB0aGlzLnNwbGl0KC9bXFxyXFxuXSsvKVxuICAgIC5zaGlmdCgpXG4gICAgLnNwbGl0KCcsJylcbiAgICAucG9wKClcblxuICByZXR1cm4gbmFtZSB8fCAnJ1xufVxuXG5TdHJpbmcucHJvdG90eXBlLmdldEF0dHJpYnV0ZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGxldCByZWdleCA9IG5ldyBSZWdFeHAobmFtZSArICc9XCIoLio/KVwiJywgJ2dpJylcbiAgbGV0IG1hdGNoID0gcmVnZXguZXhlYyh0aGlzKVxuXG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXSA/IG1hdGNoWzFdIDogJydcbn1cblxuU3RyaW5nLnByb3RvdHlwZS5nZXRPcHRpb24gPSBmdW5jdGlvbiAobmFtZSkge1xuICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKCc6JyArIG5hbWUgKyAnPSguKiknLCAnZ2knKVxuICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKHRoaXMpXG5cbiAgcmV0dXJuIG1hdGNoICYmIG1hdGNoWzFdICYmIHR5cGVvZiBtYXRjaFsxXSA9PT0gJ3N0cmluZycgPyBtYXRjaFsxXS5yZXBsYWNlKC9cXFwiL2csICcnKSA6ICcnXG59XG5cblN0cmluZy5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKCc6KC4qKScsICdnaScpXG4gIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWModGhpcylcblxuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV0gJiYgdHlwZW9mIG1hdGNoWzFdID09PSAnc3RyaW5nJyA/IG1hdGNoWzFdLnJlcGxhY2UoL1xcXCIvZywgJycpIDogJydcbn1cblxuU3RyaW5nLnByb3RvdHlwZS5nZXRVUkwgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnNwbGl0KCd8JylbMF0gfHwgJydcbn1cblxuU3RyaW5nLnByb3RvdHlwZS5nZXRQYXJhbWV0ZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICBjb25zdCBwYXJhbXMgPSB0aGlzLnJlcGxhY2UoL14oLiopXFx8LywgJycpXG4gIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChuYW1lICsgJz0oXFxcXHdbXiZdKiknLCAnZ2knKVxuICBjb25zdCBtYXRjaCA9IHJlZ2V4LmV4ZWMocGFyYW1zKVxuXG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXSA/IG1hdGNoWzFdIDogJydcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFyc2VyXG4iLCJpbXBvcnQgREIgZnJvbSAnLi9kYidcbmltcG9ydCBQYXJhbXMgZnJvbSAnLi9wYXJhbXMnXG5pbXBvcnQgTTN1OCBmcm9tICcuL20zdTgnXG5cbmNsYXNzIEFwaXtcbiAgICBzdGF0aWMgbmV0d29yayA9IG5ldyBMYW1wYS5SZWd1ZXN0KClcbiAgICBzdGF0aWMgYXBpX3VybCA9IExhbXBhLlV0aWxzLnByb3RvY29sKCkgKyBMYW1wYS5NYW5pZmVzdC5jdWJfZG9tYWluICsgJy9hcGkvaXB0di8nXG5cbiAgICBzdGF0aWMgZ2V0KG1ldGhvZCwgY2F0Y2hfZXJyb3Ipe1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgICAgIGxldCBhY2NvdW50ID0gTGFtcGEuU3RvcmFnZS5nZXQoJ2FjY291bnQnLCd7fScpXG5cbiAgICAgICAgICAgIGlmKCFhY2NvdW50LnRva2VuKSByZXR1cm4gY2F0Y2hfZXJyb3IgPyByZWplY3QoTGFuZy50cmFuc2xhdGUoJ2FjY291bnRfbG9naW5fZmFpbGVkJykpOiByZXNvbHZlKClcblxuICAgICAgICAgICAgdGhpcy5uZXR3b3JrLnNpbGVudCh0aGlzLmFwaV91cmwgKyBtZXRob2QsIHJlc29sdmUsIGNhdGNoX2Vycm9yID8gcmVqZWN0IDogcmVzb2x2ZSwgZmFsc2UsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBhY2NvdW50LnRva2VuLFxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlOiBhY2NvdW50LnByb2ZpbGUuaWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyB0aW1lKGNhbGwpe1xuICAgICAgICB0aGlzLm5ldHdvcmsuc2lsZW50KHRoaXMuYXBpX3VybCArICd0aW1lJyxjYWxsLCgpPT57XG4gICAgICAgICAgICBjYWxsKHt0aW1lOiBEYXRlLm5vdygpfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgbTN1KHVybCl7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgbGV0IGFjY291bnQgPSBMYW1wYS5TdG9yYWdlLmdldCgnYWNjb3VudCcsJ3t9JylcblxuICAgICAgICAgICAgaWYoIWFjY291bnQudG9rZW4pIHJldHVybiByZWplY3QoTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2FjY291bnRfbG9naW5fZmFpbGVkJykpXG5cbiAgICAgICAgICAgIHRoaXMubmV0d29yay50aW1lb3V0KDIwMDAwKVxuXG4gICAgICAgICAgICB0aGlzLm5ldHdvcmsubmF0aXZlKHVybCwoc3RyKT0+e1xuICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGUgPSBuZXcgRmlsZShbc3RyXSwgXCJwbGF5bGlzdC5tM3VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0L3BsYWluXCIsXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCQoJzxmb3JtPjwvZm9ybT4nKVswXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChcImZpbGVcIiwgZmlsZSwgXCJwbGF5bGlzdC5tM3VcIilcblxuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLmFwaV91cmwgKyAnbGFtcGEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZm9ybURhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDIwMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5jdHlwZTogJ211bHRpcGFydC9mb3JtLWRhdGEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBhY2NvdW50LnRva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGU6IGFjY291bnQucHJvZmlsZS5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoai5zZWN1c2VzKSByZXNvbHZlKGopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZWplY3QoTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2FjY291bnRfZXhwb3J0X2ZhaWxfNjAwJykgKyAnICgnICsgKGoudGV4dCB8fCBqLm1lc3NhZ2UpICsgJyknKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiAoZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmZyb21fZXJyb3IgPSAnTTNVIEZ1bmN0aW9uIChGYWlsZWQgdXBsb2FkIHRvIENVQiknXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2goZSl7XG4gICAgICAgICAgICAgICAgICAgIGUuZnJvbV9lcnJvciA9ICdNM1UgRnVuY3Rpb24nXG5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwoZSk9PntcbiAgICAgICAgICAgICAgICBlLmZyb21fZXJyb3IgPSAnTTNVIEZ1bmN0aW9uIChGYWlsZWQgdG8gZG93bmxvYWQgZmlsZSknXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpXG4gICAgICAgICAgICB9LGZhbHNlLHtcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3RleHQnXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0KCl7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0KCdsaXN0JyksXG4gICAgICAgICAgICAgICAgREIuZ2V0RGF0YUFueUNhc2UoJ3BsYXlsaXN0JywnbGlzdCcpXG4gICAgICAgICAgICBdKS50aGVuKHJlc3VsdD0+e1xuICAgICAgICAgICAgICAgIGlmKHJlc3VsdFswXSkgREIucmV3cml0ZURhdGEoJ3BsYXlsaXN0JywnbGlzdCcscmVzdWx0WzBdKVxuXG4gICAgICAgICAgICAgICAgbGV0IHBsYXlsaXN0ID0gcmVzdWx0WzBdIHx8IHJlc3VsdFsxXSB8fCB7bGlzdDogW119XG5cbiAgICAgICAgICAgICAgICBwbGF5bGlzdC5saXN0ID0gcGxheWxpc3QubGlzdC5jb25jYXQoTGFtcGEuU3RvcmFnZS5nZXQoJ2lwdHZfcGxheWxpc3RfY3VzdG9tJywnW10nKSlcblxuICAgICAgICAgICAgICAgIHJlc29sdmUocGxheWxpc3QpXG4gICAgICAgICAgICB9KS5jYXRjaChyZWplY3QpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIG0zdUNsaWVudCh1cmwpe1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgICAgIHRoaXMubmV0d29yay50aW1lb3V0KDIwMDAwKVxuXG4gICAgICAgICAgICB0aGlzLm5ldHdvcmtbd2luZG93LmdvZF9lbmFibGVkID8gJ25hdGl2ZScgOiAnc2lsZW50J10odXJsLChzdHIpPT57XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdHIgIT0gJ3N0cmluZycgfHwgc3RyLnN1YnN0cigwLCA3KS50b1VwcGVyQ2FzZSgpICE9PSBcIiNFWFRNM1VcIikge1xuXHRcdFx0XHRcdHJldHVybiByZWplY3QoTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RvcnJlbnRfcGFyc2VyX3JlcXVlc3RfZXJyb3InKSArICcgW00zVUNsaWVudCBGdW5jdGlvbiAoVGhlIGZpbGUgaXMgbm90IE0zVSldJylcblx0XHRcdFx0fVxuXG4gICAgICAgICAgICAgICAgbGV0IGxpc3RcbiAgICAgICAgICAgICAgICBsZXQgY2F0Y2h1cFxuXG4gICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvdHZnLXJlYz1cIihcXGQrKVwiL2csICdjYXRjaHVwPVwiZGVmYXVsdFwiIGNhdGNodXAtZGF5cz1cIiQxXCInKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IE0zdTgucGFyc2Uoc3RyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaChlKXt9XG5cbiAgICAgICAgICAgICAgICBpZihsaXN0ICYmIGxpc3QuaXRlbXMpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hhbm5lbHMgPSBbXVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYobGlzdC5oZWFkZXIucmF3LmluZGV4T2YoJ2NhdGNodXAnKSA+PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNodXAgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5czogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1fZGF5cyAgID0gbGlzdC5oZWFkZXIucmF3Lm1hdGNoKC9jYXRjaHVwLWRheXM9XCIoXFxkKylcIi8pXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbV90eXBlICAgPSBsaXN0LmhlYWRlci5yYXcubWF0Y2goL2NhdGNodXA9XCIoW2Etel0rKVwiLylcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtX3NvdXJjZSA9IGxpc3QuaGVhZGVyLnJhdy5tYXRjaCgvY2F0Y2h1cC1zb3VyY2U9XCIoLio/KVwiLylcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihtX2RheXMpICAgY2F0Y2h1cC5kYXlzICAgPSBtX2RheXNbMV1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1fdHlwZSkgICBjYXRjaHVwLnR5cGUgICA9IG1fdHlwZVsxXVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobV9zb3VyY2UpIGNhdGNodXAuc291cmNlID0gbV9zb3VyY2VbMV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxpc3QuaXRlbXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gICA9IGxpc3QuaXRlbXNbaV1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYW1lICAgPSBpdGVtLm5hbWUudHJpbSgpXG5cbiAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpdGVtLnR2ZyAmJiBpdGVtLnR2Zy5pZCA/IGl0ZW0udHZnLmlkIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLnJlcGxhY2UoLyBcXCgoXFwrXFxkKylcXCkvZywnICQxJykucmVwbGFjZSgvXFxzKyhcXHN84pOifOKTlnzik6V84pOefOKTiHzikrx84pOLfOKThCkvZywgJyAnKS50cmltKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nbzogaXRlbS50dmcgJiYgaXRlbS50dmcubG9nbyAmJiBpdGVtLnR2Zy5sb2dvLmluZGV4T2YoJ2h0dHAnKSA9PSAwID8gaXRlbS50dmcubG9nbyA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IGl0ZW0uZ3JvdXAudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBpdGVtLnVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaHVwOiBpdGVtLmNhdGNodXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZXNoaWZ0OiBpdGVtLnRpbWVzaGlmdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dmc6IGl0ZW0udHZnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWl0ZW0uY2F0Y2h1cC50eXBlICYmIGNhdGNodXAgJiYgaXRlbS5yYXcuaW5kZXhPZignY2F0Y2h1cC1lbmFibGU9XCIxXCInKSA+PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLmNhdGNodXAgPSBjYXRjaHVwXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbHMucHVzaChjaGFubmVsKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVudTogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsczogY2hhbm5lbHMsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5tZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogY2hhbm5lbHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGNoYW5uZWxzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsID0gY2hhbm5lbHNbaV1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncm91cCA9IGNoYW5uZWwuZ3JvdXBcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZCA9IHJlc3VsdC5tZW51LmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09IGdyb3VwKVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZpbmQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmQuY291bnQrK1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQubWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZ3JvdXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdDogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VjdXNlczogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RvcnJlbnRfcGFyc2VyX2VtcHR5JykgKyAnIFtNM1VDbGllbnQgRnVuY3Rpb24gKFBhcnNpbmcgbTN1IGZhaWxlZCldJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LChlKT0+e1xuICAgICAgICAgICAgICAgIGUuZnJvbV9lcnJvciA9ICdNM1VDbGllbnQgRnVuY3Rpb24gKEZhaWxlZCB0byBsb2FkKSdcblxuICAgICAgICAgICAgICAgIHJlamVjdChlKVxuICAgICAgICAgICAgfSxmYWxzZSx7XG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICd0ZXh0J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgcGxheWxpc3QoZGF0YSl7XG4gICAgICAgIGxldCBpZCA9IGRhdGEuaWRcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBEQi5nZXREYXRhQW55Q2FzZSgncGxheWxpc3QnLGlkKSxcbiAgICAgICAgICAgICAgICBQYXJhbXMuZ2V0KGlkKVxuICAgICAgICAgICAgXSkudGhlbihyZXN1bHQ9PntcbiAgICAgICAgICAgICAgICBsZXQgcGxheWxpc3QgPSByZXN1bHRbMF1cbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1zID0gcmVzdWx0WzFdXG5cbiAgICAgICAgICAgICAgICBpZihwbGF5bGlzdCAmJiBwYXJhbXMpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGltZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbHdheXMnOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2hvdXInOiAxMDAwICogNjAgKiA2MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdob3VyMTInOiAxMDAwICogNjAgKiA2MCAqIDEyLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RheSc6IDEwMDAgKiA2MCAqIDYwICogMjQsXG4gICAgICAgICAgICAgICAgICAgICAgICAnd2Vlayc6IDEwMDAgKiA2MCAqIDYwICogMjQgKiA3LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ25vbmUnOiAwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcmFtcy51cGRhdGVfdGltZSArIHRpbWVbcGFyYW1zLnVwZGF0ZV0gPiBEYXRlLm5vdygpIHx8IHBhcmFtcy51cGRhdGUgPT0gJ25vbmUnKSByZXR1cm4gcmVzb2x2ZShwbGF5bGlzdClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgc2VjdXNlcyA9IChyZXN1bHQpPT57XG4gICAgICAgICAgICAgICAgICAgIERCLnJld3JpdGVEYXRhKCdwbGF5bGlzdCcsIGlkLCByZXN1bHQpLmZpbmFsbHkoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBhcmFtcykgcGFyYW1zLnVwZGF0ZV90aW1lID0gRGF0ZS5ub3coKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBQYXJhbXMuc2V0KGlkLCBwYXJhbXMpLmZpbmFsbHkocmVzb2x2ZS5iaW5kKHJlc29sdmUsIHJlc3VsdCkpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGVycm9yID0gKGUpPT57XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0ID8gcmVzb2x2ZShwbGF5bGlzdCkgOiByZWplY3QoZSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihwYXJhbXMgJiYgcGFyYW1zLmxvYWRpbmcgPT0gJ2xhbXBhJyB8fCBkYXRhLmN1c3RvbSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbTGFtcGEuQWNjb3VudC5sb2dnZWQoKSA/ICdtM3UnIDogJ20zdUNsaWVudCddKGRhdGEudXJsKS50aGVuKHNlY3VzZXMpLmNhdGNoKGVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldCgncGxheWxpc3QvJyArIGlkLCB0cnVlKS50aGVuKHNlY3VzZXMpLmNhdGNoKCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm0zdShkYXRhLnVybCkudGhlbihzZWN1c2VzKS5jYXRjaChlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5jYXRjaCgoZSk9PntcbiAgICAgICAgICAgICAgICBlLmZyb21fZXJyb3IgPSAnUGxheWxpc3QgRnVuY3Rpb24gKFNvbWV0aGluZyB3ZW50IHdyb25nKSdcblxuICAgICAgICAgICAgICAgIHJlamVjdChlKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvZ3JhbShkYXRhKXtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICBsZXQgZGF5cyAgICAgPSBMYW1wYS5TdG9yYWdlLmZpZWxkKCdpcHR2X2d1aWRlX2N1c3RvbScpID8gTGFtcGEuU3RvcmFnZS5maWVsZCgnaXB0dl9ndWlkZV9zYXZlJykgOiAzXG4gICAgICAgICAgICBsZXQgdHZnX2lkICAgPSBkYXRhLnR2ZyAmJiBkYXRhLnR2Zy5pZCA/IGRhdGEudHZnLmlkIDogZGF0YS5jaGFubmVsX2lkXG4gICAgICAgICAgICBsZXQgdHZnX25hbWUgPSBkYXRhLnR2ZyAmJiBkYXRhLnR2Zy5uYW1lID8gZGF0YS50dmcubmFtZSA6ICcnXG5cbiAgICAgICAgICAgIGxldCBsb2FkQ1VCID0gKCk9PntcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBMYW1wYS5TdG9yYWdlLmZpZWxkKCdpcHR2X2d1aWRlX2N1c3RvbScpID8gdHZnX2lkIDogZGF0YS5jaGFubmVsX2lkXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5uZXR3b3JrLnRpbWVvdXQoNTAwMClcblxuICAgICAgICAgICAgICAgIHRoaXMubmV0d29yay5zaWxlbnQodGhpcy5hcGlfdXJsICsgJ3Byb2dyYW0vJytkYXRhLmNoYW5uZWxfaWQrJy8nK2RhdGEudGltZSArICc/ZnVsbD10cnVlJywocmVzdWx0KT0+e1xuICAgICAgICAgICAgICAgICAgICBEQi5yZXdyaXRlRGF0YSgnZXBnJywgaWQsIHJlc3VsdC5wcm9ncmFtKS5maW5hbGx5KHJlc29sdmUuYmluZChyZXNvbHZlLCByZXN1bHQucHJvZ3JhbSkpXG4gICAgICAgICAgICAgICAgfSwoYSk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYoYS5zdGF0dXMgPT0gNTAwKSBEQi5yZXdyaXRlRGF0YSgnZXBnJywgaWQsIFtdKS5maW5hbGx5KHJlc29sdmUuYmluZChyZXNvbHZlLCBbXSkpXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmVqZWN0KClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbG9hZEVQRyA9IChpZCwgY2FsbCk9PntcbiAgICAgICAgICAgICAgICBEQi5nZXREYXRhQW55Q2FzZSgnZXBnJywgaWQsIDYwICogMjQgKiBkYXlzKS50aGVuKGVwZz0+e1xuICAgICAgICAgICAgICAgICAgICBpZihlcGcpIHJlc29sdmUoZXBnKVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGNhbGwoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHR2Z19pZCl7XG4gICAgICAgICAgICAgICAgbG9hZEVQRyh0dmdfaWQsICgpPT57XG4gICAgICAgICAgICAgICAgICAgIERCLmdldERhdGFBbnlDYXNlKCdlcGdfY2hhbm5lbHMnLCAodHZnX25hbWUgfHwgZGF0YS5uYW1lKS50b0xvd2VyQ2FzZSgpKS50aGVuKGd1PT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihndSkgbG9hZEVQRyhndS5pZCwgbG9hZENVQilcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgbG9hZENVQigpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgcmVqZWN0KClcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwaSIsImNsYXNzIFBpbG90e1xuICAgIHN0YXRpYyBub3RlYm9vayhwYXJhbV9uYW1lLCBwYXJhbV9zZXQpe1xuICAgICAgICBsZXQgYm9vayA9IExhbXBhLlN0b3JhZ2UuZ2V0KCdpcHR2X3BpbG90X2Jvb2snLCd7fScpXG5cbiAgICAgICAgTGFtcGEuQXJyYXlzLmV4dGVuZChib29rLCB7XG4gICAgICAgICAgICBwbGF5bGlzdDogJycsXG4gICAgICAgICAgICBjaGFubmVsOiAtMSxcbiAgICAgICAgICAgIGNhdGVnb3J5OiAnJ1xuICAgICAgICB9KVxuXG4gICAgICAgIGlmKHR5cGVvZiBwYXJhbV9zZXQgIT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgIGJvb2tbcGFyYW1fbmFtZV0gPSBwYXJhbV9zZXRcblxuICAgICAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoJ2lwdHZfcGlsb3RfYm9vaycsYm9vaylcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHJldHVybiBib29rW3BhcmFtX25hbWVdXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQaWxvdCIsImltcG9ydCBEQiBmcm9tICcuLi91dGlscy9kYidcbmltcG9ydCBQYXJhbXMgZnJvbSAnLi4vdXRpbHMvcGFyYW1zJ1xuaW1wb3J0IFBpbG90IGZyb20gJy4uL3V0aWxzL3BpbG90J1xuXG5jbGFzcyBQbGF5bGlzdEl0ZW17XG4gICAgY29uc3RydWN0b3IocGxheWxpc3Qpe1xuICAgICAgICB0aGlzLnBsYXlsaXN0ID0gcGxheWxpc3RcbiAgICAgICAgdGhpcy5pdGVtICAgICA9IExhbXBhLlRlbXBsYXRlLmpzKCdjdWJfaXB0dl9wbGF5bGlzdF9pdGVtJylcbiAgICAgICAgdGhpcy5mb290ZXIgICA9IHRoaXMuaXRlbS5maW5kKCcuaXB0di1wbGF5bGlzdC1pdGVtX19mb290ZXInKVxuICAgICAgICB0aGlzLnBhcmFtcyAgID0ge31cblxuICAgICAgICBQYXJhbXMuZ2V0KHBsYXlsaXN0LmlkKS50aGVuKHBhcmFtcz0+e1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXNcblxuICAgICAgICAgICAgdGhpcy5kcmF3Rm9vdGVyKClcbiAgICAgICAgfSlcblxuICAgICAgICBsZXQgbmFtZSA9IHBsYXlsaXN0Lm5hbWUgfHwgJy0tLSdcblxuICAgICAgICB0aGlzLml0ZW0uZmluZCgnLmlwdHYtcGxheWxpc3QtaXRlbV9fdXJsJykudGV4dChwbGF5bGlzdC51cmwpXG4gICAgICAgIHRoaXMuaXRlbS5maW5kKCcuaXB0di1wbGF5bGlzdC1pdGVtX19uYW1lLXRleHQnKS50ZXh0KG5hbWUpXG4gICAgICAgIHRoaXMuaXRlbS5maW5kKCcuaXB0di1wbGF5bGlzdC1pdGVtX19uYW1lLWljbyBzcGFuJykudGV4dChuYW1lLnNsaWNlKDAsMSkudG9VcHBlckNhc2UoKSlcblxuICAgICAgICB0aGlzLml0ZW0ub24oJ2hvdmVyOmxvbmcnLHRoaXMuZGlzcGxheVNldHRpbmdzLmJpbmQodGhpcykpLm9uKCdob3ZlcjplbnRlcicsKCk9PntcbiAgICAgICAgICAgIGlmKHRoaXMuZGVsZXRlZCkgcmV0dXJuXG5cbiAgICAgICAgICAgIFBpbG90Lm5vdGVib29rKCdwbGF5bGlzdCcsIHBsYXlsaXN0LmlkKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBEQi5yZXdyaXRlRGF0YSgncGxheWxpc3QnLCdhY3RpdmUnLHBsYXlsaXN0LmlkKS5maW5hbGx5KCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lci5zZW5kKCdjaGFubmVscy1sb2FkJyxwbGF5bGlzdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5pdGVtLm9uKCd1cGRhdGUnLCAoKT0+e1xuICAgICAgICAgICAgUGFyYW1zLmdldChwbGF5bGlzdC5pZCkudGhlbihwYXJhbXM9PntcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcyA9IHBhcmFtc1xuICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0Zvb3RlcigpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGRpc3BsYXlTZXR0aW5ncygpe1xuICAgICAgICBpZih0aGlzLmRlbGV0ZWQpIHJldHVyblxuXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgICAgICB1cGRhdGU6IFsnYWx3YXlzJywnaG91cicsJ2hvdXIxMicsJ2RheScsJ3dlZWsnLCdub25lJ10sXG4gICAgICAgICAgICBsb2FkaW5nOiBbJ2N1YicsJ2xhbXBhJ11cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtZW51ID0gW11cblxuICAgICAgICBtZW51ID0gbWVudS5jb25jYXQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl91cGRhdGUnKSxcbiAgICAgICAgICAgICAgICBzdWJ0aXRsZTogUGFyYW1zLnZhbHVlKHRoaXMucGFyYW1zLCAndXBkYXRlJyksXG4gICAgICAgICAgICAgICAgbmFtZTogJ3VwZGF0ZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdpcHR2X2xvYWRpbmcnKSxcbiAgICAgICAgICAgICAgICBzdWJ0aXRsZTogUGFyYW1zLnZhbHVlKHRoaXMucGFyYW1zLCAnbG9hZGluZycpLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdsb2FkaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2lwdHZfcmVtb3ZlX2NhY2hlJyksXG4gICAgICAgICAgICAgICAgc3VidGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdpcHR2X3JlbW92ZV9jYWNoZV9kZXNjcicpXG4gICAgICAgICAgICB9XG4gICAgICAgIF0pXG5cbiAgICAgICAgaWYodGhpcy5wbGF5bGlzdC5jdXN0b20pe1xuICAgICAgICAgICAgbWVudSA9IG1lbnUuY29uY2F0KFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnbW9yZScpLFxuICAgICAgICAgICAgICAgICAgICBzZXBhcmF0b3I6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdpcHR2X3BsYXlsaXN0X2NoYW5nZV9uYW1lJyksXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdjaGFuZ2UnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ25hbWUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnZXh0ZW5zaW9uc19jaGFuZ2VfbGluaycpLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnY2hhbmdlJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd1cmwnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnZXh0ZW5zaW9uc19yZW1vdmUnKSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2RlbGV0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdKVxuICAgICAgICB9XG5cbiAgICAgICAgTGFtcGEuU2VsZWN0LnNob3coe1xuICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCd0aXRsZV9zZXR0aW5ncycpLFxuICAgICAgICAgICAgaXRlbXM6IG1lbnUsXG4gICAgICAgICAgICBvblNlbGVjdDogKGEpPT57XG4gICAgICAgICAgICAgICAgaWYoYS5uYW1lID09ICdjaGFuZ2UnKXtcbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuSW5wdXQuZWRpdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2lwdHZfcGxheWxpc3RfYWRkX3NldF8nICsgYS52YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9zYXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMucGxheWxpc3RbYS52YWx1ZV1cbiAgICAgICAgICAgICAgICAgICAgfSwodmFsdWUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3QgPSBMYW1wYS5TdG9yYWdlLmdldCgnaXB0dl9wbGF5bGlzdF9jdXN0b20nLCdbXScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBsaXN0LmZpbmQobj0+bi5pZCA9PSB0aGlzLnBsYXlsaXN0LmlkKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbSAmJiBpdGVtW2EudmFsdWVdICE9PSB2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1bYS52YWx1ZV0gPSB2YWx1ZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWxpc3RbYS52YWx1ZV0gPSB2YWx1ZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdpcHR2X3BsYXlsaXN0X2N1c3RvbScsbGlzdClcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW0uZmluZCgnLmlwdHYtcGxheWxpc3QtaXRlbV9fJyArIChhLnZhbHVlID09ICduYW1lJyA/ICduYW1lLXRleHQnIDogJ3VybCcpKS50ZXh0KHZhbHVlKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLk5vdHkuc2hvdyhMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl9wbGF5bGlzdF8nK2EudmFsdWUrJ19jaGFuZ2VkJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdjb250ZW50JylcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihhLm5hbWUgPT0gJ2RlbGV0ZScpe1xuICAgICAgICAgICAgICAgICAgICBMYW1wYS5Nb2RhbC5vcGVuKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6ICQoJzxkaXYgY2xhc3M9XCJhYm91dFwiPicrTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2lwdHZfY29uZmlybV9kZWxldGVfcGxheWxpc3QnKSsnPC9kaXY+JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnc2V0dGluZ3NfcGFyYW1fbm8nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Nb2RhbC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnY29udGVudCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3NldHRpbmdzX3BhcmFtX3llcycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gTGFtcGEuU3RvcmFnZS5nZXQoJ2lwdHZfcGxheWxpc3RfY3VzdG9tJywnW10nKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5BcnJheXMucmVtb3ZlKGxpc3QsIGxpc3QuZmluZChuPT5uLmlkID09IHRoaXMucGxheWxpc3QuaWQpKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5TdG9yYWdlLnNldCgnaXB0dl9wbGF5bGlzdF9jdXN0b20nLGxpc3QpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLk5vdHkuc2hvdyhMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl9wbGF5bGlzdF9kZWxldGVkJykpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLk1vZGFsLmNsb3NlKClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdjb250ZW50JylcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtLnN0eWxlLm9wYWNpdHkgPSAwLjNcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxldGVkID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGEubmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXlzID0gcGFyYW1zW2EubmFtZV1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gW11cblxuICAgICAgICAgICAgICAgICAgICBrZXlzLmZvckVhY2goaz0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdpcHR2X3BhcmFtc18nICsgayksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IHRoaXMucGFyYW1zW2EubmFtZV0gPT0gayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToga1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICBMYW1wYS5TZWxlY3Quc2hvdyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RpdGxlX3NldHRpbmdzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogaXRlbXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDogKGIpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbXNbYS5uYW1lXSA9IGIudmFsdWVcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhcmFtcy5zZXQodGhpcy5wbGF5bGlzdC5pZCwgdGhpcy5wYXJhbXMpLnRoZW4odGhpcy5kcmF3Rm9vdGVyLmJpbmQodGhpcykpLmNhdGNoKChlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Ob3R5LnNob3coZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5maW5hbGx5KHRoaXMuZGlzcGxheVNldHRpbmdzLmJpbmQodGhpcykpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb25CYWNrOiB0aGlzLmRpc3BsYXlTZXR0aW5ncy5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIERCLmRlbGV0ZURhdGEoJ3BsYXlsaXN0JywgdGhpcy5wbGF5bGlzdC5pZCkuZmluYWxseSgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuTm90eS5zaG93KExhbXBhLkxhbmcudHJhbnNsYXRlKCdpcHR2X2NhY2hlX2NsZWFyJykpXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ2NvbnRlbnQnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkJhY2s6ICgpPT57XG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ2NvbnRlbnQnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGRyYXdGb290ZXIoKXtcbiAgICAgICAgdGhpcy5mb290ZXIucmVtb3ZlQ2xhc3MoJ2hpZGUnKVxuXG4gICAgICAgIGZ1bmN0aW9uIGxhYmVsKHdoZXJlLCBuYW1lLCB2YWx1ZSl7XG4gICAgICAgICAgICBsZXQgbGViX2RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBsZXQgbGViX3ZhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZWJfZGl2LmFkZENsYXNzKCdpcHR2LXBsYXlsaXN0LWl0ZW1fX2xhYmVsJylcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYobmFtZSkgbGViX2Rpdi50ZXh0KG5hbWUgKyAnIC0gJylcblxuICAgICAgICAgICAgbGViX3ZhbC50ZXh0KHZhbHVlKVxuXG4gICAgICAgICAgICBsZWJfZGl2LmFwcGVuZChsZWJfdmFsKVxuXG4gICAgICAgICAgICB3aGVyZS5hcHBlbmQobGViX2RpdilcbiAgICAgICAgfVxuXG4gICAgICAgIERCLmdldERhdGFBbnlDYXNlKCdwbGF5bGlzdCcsJ2FjdGl2ZScpLnRoZW4oYWN0aXZlPT57XG4gICAgICAgICAgICBsZXQgZGV0YWlsc19sZWZ0ICA9IHRoaXMuaXRlbS5maW5kKCcuZGV0YWlscy1sZWZ0JykuZW1wdHkoKVxuICAgICAgICAgICAgbGV0IGRldGFpbHNfcmlnaHQgPSB0aGlzLml0ZW0uZmluZCgnLmRldGFpbHMtcmlnaHQnKS5lbXB0eSgpXG5cbiAgICAgICAgICAgIGlmKGFjdGl2ZSAmJiBhY3RpdmUgPT0gdGhpcy5wbGF5bGlzdC5pZCkgbGFiZWwoZGV0YWlsc19sZWZ0LCAnJyxMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl9hY3RpdmUnKSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGFiZWwoZGV0YWlsc19sZWZ0LCBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl91cGRhdGUnKSwgUGFyYW1zLnZhbHVlKHRoaXMucGFyYW1zLCAndXBkYXRlJykpXG4gICAgICAgICAgICBsYWJlbChkZXRhaWxzX2xlZnQsIExhbXBhLkxhbmcudHJhbnNsYXRlKCdpcHR2X2xvYWRpbmcnKSwgUGFyYW1zLnZhbHVlKHRoaXMucGFyYW1zLCAnbG9hZGluZycpKVxuICAgICAgICAgICAgbGFiZWwoZGV0YWlsc19yaWdodCwgTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2lwdHZfdXBkYXRlZCcpLExhbXBhLlV0aWxzLnBhcnNlVGltZSh0aGlzLnBhcmFtcy51cGRhdGVfdGltZSkuYnJpZWZseSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWxpc3RJdGVtIiwiaW1wb3J0IEFwaSBmcm9tICcuLi91dGlscy9hcGknXG5pbXBvcnQgREIgZnJvbSAnLi4vdXRpbHMvZGInXG5pbXBvcnQgSXRlbSBmcm9tICcuL2l0ZW0nXG5pbXBvcnQgUGlsb3QgZnJvbSAnLi4vdXRpbHMvcGlsb3QnXG5cbmNsYXNzIFBsYXlsaXN0e1xuICAgIGNvbnN0cnVjdG9yKGxpc3RlbmVyKXtcbiAgICAgICAgdGhpcy5saXN0ZW5lciA9IGxpc3RlbmVyXG5cbiAgICAgICAgdGhpcy5odG1sICAgPSBMYW1wYS5UZW1wbGF0ZS5qcygnY3ViX2lwdHZfbGlzdCcpXG4gICAgICAgIHRoaXMuc2Nyb2xsID0gbmV3IExhbXBhLlNjcm9sbCh7bWFzazp0cnVlLG92ZXI6IHRydWV9KVxuXG4gICAgICAgIHRoaXMuaHRtbC5maW5kKCcuaXB0di1saXN0X190aXRsZScpLnRleHQoTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2lwdHZfc2VsZWN0X3BsYXlsaXN0JykpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmh0bWwuZmluZCgnLmlwdHYtbGlzdF9faXRlbXMnKS5hcHBlbmQodGhpcy5zY3JvbGwucmVuZGVyKHRydWUpKVxuICAgIH1cblxuICAgIGl0ZW0oZGF0YSl7XG4gICAgICAgIGxldCBpdGVtID0gbmV3IEl0ZW0oZGF0YSlcbiAgICAgICAgICAgIGl0ZW0ubGlzdGVuZXIgPSB0aGlzLmxpc3RlbmVyXG5cbiAgICAgICAgbGV0IGVsZW0gPSBpdGVtLnJlbmRlcigpXG5cbiAgICAgICAgZWxlbS5vbignaG92ZXI6Zm9jdXMnLCgpPT57XG4gICAgICAgICAgICB0aGlzLmxhc3QgPSBlbGVtXG5cbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsLnVwZGF0ZSh0aGlzLmxhc3QpXG4gICAgICAgIH0pLm9uKCdob3Zlcjpob3ZlciBob3Zlcjp0b3VjaCcsKCk9PntcbiAgICAgICAgICAgIHRoaXMubGFzdCA9IGVsZW1cblxuICAgICAgICAgICAgTmF2aWdhdG9yLmZvY3VzZWQoZWxlbSlcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gaXRlbVxuICAgIH1cblxuICAgIGxpc3QocGxheWxpc3Qpe1xuICAgICAgICB0aGlzLnNjcm9sbC5jbGVhcigpXG4gICAgICAgIHRoaXMuc2Nyb2xsLnJlc2V0KClcblxuICAgICAgICB0aGlzLmh0bWwuZmluZCgnLmlwdHYtbGlzdF9fdGV4dCcpLmh0bWwoTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2lwdHZfc2VsZWN0X3BsYXlsaXN0X3RleHQnKSlcblxuICAgICAgICBsZXQgYWRkID0gTGFtcGEuVGVtcGxhdGUuanMoJ2N1Yl9pcHR2X2xpc3RfYWRkX2N1c3RvbScpXG5cbiAgICAgICAgYWRkLmZpbmQoJy5pcHR2LXBsYXlsaXN0LWl0ZW1fX3RpdGxlJykudGV4dChMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl9wbGF5bGlzdF9hZGRfbmV3JykpXG5cbiAgICAgICAgYWRkLm9uKCdob3ZlcjplbnRlcicsKCk9PntcbiAgICAgICAgICAgIExhbXBhLklucHV0LmVkaXQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl9wbGF5bGlzdF9hZGRfc2V0X3VybCcpLFxuICAgICAgICAgICAgICAgIGZyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgbm9zYXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnJ1xuICAgICAgICAgICAgfSwodmFsdWUpPT57XG4gICAgICAgICAgICAgICAgaWYodmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBMYW1wYS5VdGlscy51aWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnJ1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuU3RvcmFnZS5hZGQoJ2lwdHZfcGxheWxpc3RfY3VzdG9tJyxkYXRhKVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5pdGVtKGRhdGEpXG5cbiAgICAgICAgICAgICAgICAgICAgYWRkLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGl0ZW0ucmVuZGVyKCksIGFkZC5uZXh0U2libGluZylcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnY29udGVudCcpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGFkZC5vbignaG92ZXI6Zm9jdXMnLCgpPT57XG4gICAgICAgICAgICB0aGlzLmxhc3QgPSBhZGRcblxuICAgICAgICAgICAgdGhpcy5zY3JvbGwudXBkYXRlKHRoaXMubGFzdClcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLnNjcm9sbC5hcHBlbmQoYWRkKVxuXG4gICAgICAgIHBsYXlsaXN0Lmxpc3QucmV2ZXJzZSgpLmZvckVhY2goKGRhdGEpPT57XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbShkYXRhKVxuXG4gICAgICAgICAgICB0aGlzLnNjcm9sbC5hcHBlbmQoaXRlbS5yZW5kZXIoKSlcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmxpc3RlbmVyLnNlbmQoJ2Rpc3BsYXknLHRoaXMpXG4gICAgfVxuXG4gICAgbWFpbigpe1xuICAgICAgICBBcGkubGlzdCgpLnRoZW4odGhpcy5saXN0LmJpbmQodGhpcykpLmNhdGNoKHRoaXMuZW1wdHkuYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICBsb2FkKCl7XG4gICAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIEFwaS5saXN0KCksXG4gICAgICAgICAgICBEQi5nZXREYXRhQW55Q2FzZSgncGxheWxpc3QnLCdhY3RpdmUnKVxuICAgICAgICBdKS50aGVuKChyZXN1bHQpPT57XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBwbGF5bGlzdCA9IHJlc3VsdFswXVxuICAgICAgICAgICAgbGV0IGFjdGl2ZSA9IHJlc3VsdFsxXSB8fCBQaWxvdC5ub3RlYm9vaygncGxheWxpc3QnKVxuXG4gICAgICAgICAgICBpZihwbGF5bGlzdCl7XG4gICAgICAgICAgICAgICAgaWYoYWN0aXZlKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmQgPSBwbGF5bGlzdC5saXN0LmZpbmQobD0+bC5pZCA9PSBhY3RpdmUpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZmluZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyLnNlbmQoJ2NoYW5uZWxzLWxvYWQnLGZpbmQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB0aGlzLmxpc3QocGxheWxpc3QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5saXN0KHBsYXlsaXN0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB0aGlzLmVtcHR5KClcbiAgICAgICAgfSkuY2F0Y2godGhpcy5lbXB0eS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIGVtcHR5KCl7XG4gICAgICAgIHRoaXMuc2Nyb2xsLmNsZWFyKClcbiAgICAgICAgdGhpcy5zY3JvbGwucmVzZXQoKVxuXG4gICAgICAgIHRoaXMuaHRtbC5maW5kKCcuaXB0di1saXN0X190ZXh0JykuaHRtbChMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl9wbGF5bGlzdF9lbXB0eScpKVxuXG4gICAgICAgIGxldCBlbXB0eSA9IExhbXBhLlRlbXBsYXRlLmpzKCdjdWJfaXB0dl9saXN0X2VtcHR5JylcbiAgICAgICAgICAgIGVtcHR5LmZpbmQoJy5pcHR2LWxpc3QtZW1wdHlfX3RleHQnKS5odG1sKExhbXBhLkxhbmcudHJhbnNsYXRlKCdlbXB0eV90aXRsZScpKVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsLmFwcGVuZChlbXB0eSlcblxuICAgICAgICB0aGlzLmxpc3RlbmVyLnNlbmQoJ2Rpc3BsYXknLHRoaXMpXG4gICAgfVxuXG4gICAgdG9nZ2xlKCl7XG4gICAgICAgIExhbXBhLkNvbnRyb2xsZXIuYWRkKCdjb250ZW50Jyx7XG4gICAgICAgICAgICB0b2dnbGU6ICgpPT57XG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jb2xsZWN0aW9uU2V0KHRoaXMuaHRtbClcbiAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLmNvbGxlY3Rpb25Gb2N1cyh0aGlzLmxhc3QsdGhpcy5odG1sKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZnQ6ICgpPT57XG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ21lbnUnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRvd246IE5hdmlnYXRvci5tb3ZlLmJpbmQoTmF2aWdhdG9yLCdkb3duJyksXG4gICAgICAgICAgICB1cDogKCk9PntcbiAgICAgICAgICAgICAgICBpZihOYXZpZ2F0b3IuY2FubW92ZSgndXAnKSkgTmF2aWdhdG9yLm1vdmUoJ3VwJylcbiAgICAgICAgICAgICAgICBlbHNlIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdoZWFkJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgIExhbXBhLkFjdGl2aXR5LmJhY2t3YXJkKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnY29udGVudCcpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmh0bWxcbiAgICB9XG5cbiAgICBkZXN0cm95KCl7XG4gICAgICAgIHRoaXMuc2Nyb2xsLmRlc3Ryb3koKVxuXG4gICAgICAgIHRoaXMuaHRtbC5yZW1vdmUoKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWxpc3QiLCJpbXBvcnQgRmF2b3JpdGVzIGZyb20gJy4uL3V0aWxzL2Zhdm9yaXRlcydcbmltcG9ydCBMb2NrZWQgZnJvbSAnLi4vdXRpbHMvbG9ja2VkJ1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3V0aWxzL3V0aWxzJ1xuaW1wb3J0IFBpbG90IGZyb20gJy4uL3V0aWxzL3BpbG90J1xuXG5jbGFzcyBJY29uc3tcbiAgICBjb25zdHJ1Y3RvcihsaXN0ZW5lcil7XG4gICAgICAgIHRoaXMubGlzdGVuZXIgPSBsaXN0ZW5lclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gMFxuICAgICAgICB0aGlzLnNjcm9sbCAgID0gbmV3IExhbXBhLlNjcm9sbCh7bWFzazohd2luZG93LmlwdHZfbW9iaWxlLG92ZXI6IHRydWUsZW5kX3JhdGlvOjIsaG9yaXpvbnRhbDp3aW5kb3cuaXB0dl9tb2JpbGV9KVxuICAgICAgICB0aGlzLmh0bWwgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICAgICAgICB0aGlzLmh0bWwuYWRkQ2xhc3MoJ2lwdHYtY2hhbm5lbHMnKVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsLmFwcGVuZCh0aGlzLmh0bWwpXG4gICAgICAgIFxuICAgICAgICBpZighd2luZG93LmlwdHZfbW9iaWxlKSB0aGlzLnNjcm9sbC5taW51cygpXG5cbiAgICAgICAgdGhpcy5zY3JvbGwub25FbmQgPSAoKT0+e1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbisrXG5cbiAgICAgICAgICAgIHRoaXMubmV4dCgpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxpc3RlbmVyLmZvbGxvdygnaWNvbnMtbG9hZCcsKGRhdGEpPT57XG4gICAgICAgICAgICB0aGlzLmljb25zID0gZGF0YS5pY29uc1xuXG4gICAgICAgICAgICBpZihkYXRhLm1lbnUuZmF2b3JpdGVzKXtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25zLnNvcnQoKGEsYik9PntcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhID0gYS5hZGRlZCB8fCAwXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YiA9IGIuYWRkZWQgfHwgMFxuICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGEgPCB0YiA/IC0xIDogdGEgPiB0YiA/IDEgOiAwXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHRoaXMuc29ydCgpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaWNvbnNfY2xvbmUgPSBMYW1wYS5BcnJheXMuY2xvbmUodGhpcy5pY29ucylcblxuICAgICAgICAgICAgdGhpcy5odG1sLmVtcHR5KClcblxuICAgICAgICAgICAgdGhpcy5zY3JvbGwucmVzZXQoKVxuXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gMFxuXG4gICAgICAgICAgICB0aGlzLmxhc3QgPSBmYWxzZVxuXG4gICAgICAgICAgICB0aGlzLm5leHQoKVxuXG4gICAgICAgICAgICBsZXQgY2hhbm5lbCA9IFBpbG90Lm5vdGVib29rKCdjaGFubmVsJylcblxuICAgICAgICAgICAgaWYoY2hhbm5lbCA+PSAwICYmIGNoYW5uZWwgPD0gdGhpcy5pY29ucy5sZW5ndGggJiYgd2luZG93LmxhbXBhX3NldHRpbmdzLmlwdHYpe1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lci5zZW5kKCdwbGF5Jyx7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogY2hhbm5lbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsOiB0aGlzLmljb25zLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0sMTAwMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzb3J0KCl7XG4gICAgICAgIGxldCBzb3J0X3R5cGUgPSBMYW1wYS5TdG9yYWdlLmZpZWxkKCdpcHR2X2Zhdm90aXRlX3NvcnQnKVxuXG4gICAgICAgIGlmKExhbXBhLkFjY291bnQuaGFzUHJlbWl1bSgpICYmIHNvcnRfdHlwZSAhPT0gJ2FkZCcpe1xuICAgICAgICAgICAgdGhpcy5pY29ucy5zb3J0KChhLGIpPT57XG4gICAgICAgICAgICAgICAgaWYoc29ydF90eXBlID09ICduYW1lJyl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLm5hbWUgPCBiLm5hbWUgPyAtMSA6IGEubmFtZSA+IGIubmFtZSA/IDEgOiAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc29ydF90eXBlID09ICd2aWV3Jyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YSA9IGEudmlldyB8fCAwXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YiA9IGIudmlldyB8fCAwXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhIDwgdmIgPyAxIDogdmEgPiB2YiA/IC0xIDogMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhY3RpdmUoaXRlbSl7XG4gICAgICAgIGxldCBhY3RpdmUgPSB0aGlzLmh0bWwuZmluZCgnLmFjdGl2ZScpXG5cbiAgICAgICAgaWYoYWN0aXZlKSBhY3RpdmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAgICAgaXRlbS5hZGRDbGFzcygnYWN0aXZlJylcbiAgICB9XG5cbiAgICBpY29uKGl0ZW0sIGVsZW1lbnQpe1xuICAgICAgICBsZXQgaWNvbnMgPSBpdGVtLmZpbmQoJy5pcHR2LWNoYW5uZWxfX2ljb25zJylcbiAgICAgICAgICAgIGljb25zLmVtcHR5KClcblxuICAgICAgICBpZihGYXZvcml0ZXMuZmluZChlbGVtZW50KSkgaWNvbnMuYXBwZW5kKExhbXBhLlRlbXBsYXRlLmpzKCdjdWJfaXB0dl9pY29uX2ZhdicpKVxuICAgICAgICBpZihMb2NrZWQuZmluZChMb2NrZWQuZm9ybWF0KCdjaGFubmVsJywgZWxlbWVudCkpKSBpY29ucy5hcHBlbmQoTGFtcGEuVGVtcGxhdGUuanMoJ2N1Yl9pcHR2X2ljb25fbG9jaycpKVxuICAgIH1cblxuICAgIG5leHQoKXtcbiAgICAgICAgbGV0IHZpZXdzID0gMTBcbiAgICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5wb3NpdGlvbiAqIHZpZXdzXG5cbiAgICAgICAgdGhpcy5pY29ucy5zbGljZShzdGFydCwgc3RhcnQgKyB2aWV3cykuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZSBlbGVtZW50LnRhcmdldFxuXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBsZXQgYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBsZXQgaW1nICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgICAgICAgICBsZXQgY2huICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBsZXQgaWNuICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IHN0YXJ0ICsgaW5kZXhcblxuICAgICAgICAgICAgY2huLnRleHQoKHBvc2l0aW9uICsgMSkucGFkKDMpKVxuXG4gICAgICAgICAgICBpdGVtLmFkZENsYXNzKCdpcHR2LWNoYW5uZWwgc2VsZWN0b3IgbGF5ZXItLXZpc2libGUgbGF5ZXItLXJlbmRlcicpXG4gICAgICAgICAgICBib2R5LmFkZENsYXNzKCdpcHR2LWNoYW5uZWxfX2JvZHknKVxuICAgICAgICAgICAgaW1nLmFkZENsYXNzKCdpcHR2LWNoYW5uZWxfX2ljbycpXG4gICAgICAgICAgICBjaG4uYWRkQ2xhc3MoJ2lwdHYtY2hhbm5lbF9fY2huJylcbiAgICAgICAgICAgIGljbi5hZGRDbGFzcygnaXB0di1jaGFubmVsX19pY29ucycpXG5cbiAgICAgICAgICAgIGJvZHkuYXBwZW5kKGltZylcbiAgICAgICAgICAgIGl0ZW0uYXBwZW5kKGJvZHkpXG4gICAgICAgICAgICBpdGVtLmFwcGVuZChjaG4pXG4gICAgICAgICAgICBpdGVtLmFwcGVuZChpY24pXG5cbiAgICAgICAgICAgIHRoaXMuaWNvbihpdGVtLCBlbGVtZW50KVxuXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyLmZvbGxvdygndXBkYXRlLWNoYW5uZWwtaWNvbicsKGNoYW5uZWwpPT57XG4gICAgICAgICAgICAgICAgaWYoY2hhbm5lbC5uYW1lID09IGVsZW1lbnQubmFtZSkgdGhpcy5pY29uKGl0ZW0sIGVsZW1lbnQpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpdGVtLm9uKCd2aXNpYmxlJywoKT0+e1xuICAgICAgICAgICAgICAgIGltZy5vbmVycm9yID0gKCk9PntcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpbWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgICAgICAgICAgICAgc2ltYi5hZGRDbGFzcygnaXB0di1jaGFubmVsX19zaW1iJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpbWIudGV4dChlbGVtZW50Lm5hbWUubGVuZ3RoIDw9IDMgPyBlbGVtZW50Lm5hbWUudG9VcHBlckNhc2UoKSA6IGVsZW1lbnQubmFtZS5yZXBsYWNlKC9bXmEtenzQsC3Rj3wwLTldL2dpLCcnKS50b1VwcGVyQ2FzZSgpWzBdKVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQuYWRkQ2xhc3MoJ2lwdHYtY2hhbm5lbF9fbmFtZScpXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0LnRleHQoVXRpbHMuY2xlYXIoZWxlbWVudC5uYW1lKSlcblxuICAgICAgICAgICAgICAgICAgICBib2R5LmFwcGVuZChzaW1iKVxuICAgICAgICAgICAgICAgICAgICBib2R5LmFwcGVuZCh0ZXh0KVxuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDbGFzcygnbG9hZGVkJylcblxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50LmxvZ28uaW5kZXhPZignZXBnLml0OTk5JykgPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDbGFzcygnc21hbGwtLWljb24nKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudC5sb2dvKSBpbWcuc3JjID0gZWxlbWVudC5sb2dvXG4gICAgICAgICAgICAgICAgZWxzZSBpbWcub25lcnJvcigpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpdGVtLm9uKCdob3Zlcjpmb2N1cycsKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZShpdGVtKVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGwudXBkYXRlKGl0ZW0pXG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLmxhc3QgIT09IGl0ZW0pIHRoaXMubGlzdGVuZXIuc2VuZCgnZGV0YWlscy1sb2FkJyxlbGVtZW50KVxuXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0ID0gaXRlbVxuICAgICAgICAgICAgfSkub24oJ2hvdmVyOmhvdmVyIGhvdmVyOnRvdWNoJywoKT0+e1xuICAgICAgICAgICAgICAgIE5hdmlnYXRvci5mb2N1c2VkKGl0ZW0pXG5cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZShpdGVtKVxuXG4gICAgICAgICAgICAgICAgaWYodGhpcy5sYXN0ICE9PSBpdGVtKSB0aGlzLmxpc3RlbmVyLnNlbmQoJ2RldGFpbHMtbG9hZCcsZWxlbWVudClcblxuICAgICAgICAgICAgICAgIHRoaXMubGFzdCA9IGl0ZW1cbiAgICAgICAgICAgIH0pLm9uKCdob3Zlcjpsb25nJywoKT0+e1xuICAgICAgICAgICAgICAgIExhbXBhLlNlbGVjdC5zaG93KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCd0aXRsZV9hY3Rpb24nKSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoRmF2b3JpdGVzLmZpbmQoZWxlbWVudCkgPyAnaXB0dl9yZW1vdmVfZmF2JyA6ICdpcHR2X2FkZF9mYXYnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZmF2b3JpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZShMb2NrZWQuZmluZChMb2NrZWQuZm9ybWF0KCdjaGFubmVsJywgZWxlbWVudCkpID8gJ2lwdHZfY2hhbm5lbF91bmxvY2snIDogJ2lwdHZfY2hhbm5lbF9sb2NrJyApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsb2NrZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OiAoYSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKClcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYS50eXBlID09ICdmYXZvcml0ZScpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZhdm9yaXRlcy50b2dnbGUoZWxlbWVudCkuZmluYWxseSgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmljb24oaXRlbSwgZWxlbWVudClcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyLnNlbmQoJ3VwZGF0ZS1mYXZvcml0ZXMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGEudHlwZSA9PSAnbG9ja2VkJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoTGFtcGEuTWFuaWZlc3QuYXBwX2RpZ2l0YWwgPj0gMjA0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoTG9ja2VkLmZpbmQoTG9ja2VkLmZvcm1hdCgnY2hhbm5lbCcsIGVsZW1lbnQpKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5QYXJlbnRhbENvbnRyb2wucXVlcnkoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZSgpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2NrZWQucmVtb3ZlKExvY2tlZC5mb3JtYXQoJ2NoYW5uZWwnLCBlbGVtZW50KSkuZmluYWxseSgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmljb24oaXRlbSwgZWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2NrZWQuYWRkKExvY2tlZC5mb3JtYXQoJ2NoYW5uZWwnLCBlbGVtZW50KSkuZmluYWxseSgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaWNvbihpdGVtLCBlbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Ob3R5LnNob3coTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2lwdHZfbmVlZF91cGRhdGVfYXBwJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvbkJhY2s6IHRoaXMudG9nZ2xlLmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSkub24oJ2hvdmVyOmVudGVyJywoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXIuc2VuZCgncGxheScse1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsOiB0aGlzLmljb25zLmxlbmd0aFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB0aGlzLmh0bWwuYXBwZW5kKGl0ZW0pXG5cbiAgICAgICAgICAgIGlmKExhbXBhLkNvbnRyb2xsZXIub3duKHRoaXMpKSBMYW1wYS5Db250cm9sbGVyLmNvbGxlY3Rpb25BcHBlbmQoaXRlbSlcbiAgICAgICAgfSlcblxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICBMYW1wYS5MYXllci52aXNpYmxlKHRoaXMuaHRtbClcbiAgICAgICAgfSwzMDApXG4gICAgfVxuXG4gICAgdG9nZ2xlKCl7XG4gICAgICAgIExhbXBhLkNvbnRyb2xsZXIuYWRkKCdjb250ZW50Jyx7XG4gICAgICAgICAgICBsaW5rOiB0aGlzLFxuICAgICAgICAgICAgdG9nZ2xlOiAoKT0+e1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaHRtbC5maW5kKCcuc2VsZWN0b3InKSl7XG4gICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuY29sbGVjdGlvblNldCh0aGlzLmh0bWwpXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuY29sbGVjdGlvbkZvY3VzKHRoaXMubGFzdCx0aGlzLmh0bWwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5saXN0ZW5lci5zZW5kKCd0b2dnbGUnLCdtZW51JylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWZ0OiAoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXIuc2VuZCgndG9nZ2xlJywnbWVudScpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmlnaHQ6ICgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lci5zZW5kKCd0b2dnbGUnLCdkZXRhaWxzJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cDogKCk9PntcbiAgICAgICAgICAgICAgICBpZihOYXZpZ2F0b3IuY2FubW92ZSgndXAnKSkgTmF2aWdhdG9yLm1vdmUoJ3VwJylcbiAgICAgICAgICAgICAgICBlbHNlIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdoZWFkJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkb3duOiAoKT0+e1xuICAgICAgICAgICAgICAgIGlmKE5hdmlnYXRvci5jYW5tb3ZlKCdkb3duJykpIE5hdmlnYXRvci5tb3ZlKCdkb3duJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXIuc2VuZCgnYmFjaycpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ2NvbnRlbnQnKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gdGhpcy5zY3JvbGwucmVuZGVyKHRydWUpXG4gICAgfVxuXG4gICAgZGVzdHJveSgpe1xuICAgICAgICB0aGlzLnNjcm9sbC5kZXN0cm95KClcblxuICAgICAgICB0aGlzLmh0bWwucmVtb3ZlKClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEljb25zIiwiaW1wb3J0IEFwaSBmcm9tICcuL2FwaSdcblxuY2xhc3MgRVBHe1xuICAgIHN0YXRpYyB0aW1lX29mZnNldCA9IDBcblxuICAgIHN0YXRpYyBpbml0KCl7XG4gICAgICAgIGxldCB0cyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG5cbiAgICAgICAgQXBpLnRpbWUoKGpzb24pPT57XG4gICAgICAgICAgICBsZXQgdGUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuXG4gICAgICAgICAgICB0aGlzLnRpbWVfb2Zmc2V0ID0gKGpzb24udGltZSA8IHRzIHx8IGpzb24udGltZSA+IHRlKSA/IGpzb24udGltZSAtIHRlIDogMFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyB0aW1lKGNoYW5uZWwsIHRpbWVzaGlmdCA9IDApe1xuICAgICAgICBsZXQgZGF0ZSAgID0gbmV3IERhdGUoKSxcbiAgICAgICAgICAgIHRpbWUgPSBkYXRlLmdldFRpbWUoKSArIHRoaXMudGltZV9vZmZzZXQsXG4gICAgICAgICAgICBvZnN0ID0gcGFyc2VJbnQoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0aW1lX29mZnNldCcpID09IG51bGwgPyAnbjAnIDogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RpbWVfb2Zmc2V0JykpLnJlcGxhY2UoJ24nLCcnKSlcblxuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKHRpbWUgKyAob2ZzdCAqIDEwMDAgKiA2MCAqIDYwKSlcblxuICAgICAgICBsZXQgb2Zmc2V0ID0gY2hhbm5lbC5uYW1lLm1hdGNoKC8oWyt8LV1cXGQpJC8pXG5cbiAgICAgICAgaWYob2Zmc2V0KXtcbiAgICAgICAgICAgIGRhdGUuc2V0SG91cnMoZGF0ZS5nZXRIb3VycygpICsgcGFyc2VJbnQob2Zmc2V0WzFdKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXN1bHQgPSBkYXRlLmdldFRpbWUoKVxuXG4gICAgICAgIHJlc3VsdCAtPSB0aW1lc2hpZnRcblxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuXG4gICAgc3RhdGljIHBvc2l0aW9uKGNoYW5uZWwsIGxpc3QsIHRpbWVzaGlmdCl7XG4gICAgICAgIGxldCB0aW0gPSB0aGlzLnRpbWUoY2hhbm5lbCwgdGltZXNoaWZ0KVxuICAgICAgICBsZXQgbm93ID0gbGlzdC5maW5kKHA9PnRpbSA+IHAuc3RhcnQgJiYgdGltIDwgcC5zdG9wKVxuXG4gICAgICAgIHJldHVybiBub3cgPyBsaXN0LmluZGV4T2Yobm93KSA6IGxpc3QubGVuZ3RoIC0gMVxuICAgIH1cblxuICAgIHN0YXRpYyB0aW1lbGluZShjaGFubmVsLCBwcm9ncmFtLCB0aW1lc2hpZnQpe1xuICAgICAgICBsZXQgdGltZSAgPSB0aGlzLnRpbWUoY2hhbm5lbCwgdGltZXNoaWZ0KVxuICAgICAgICBsZXQgdG90YWwgPSBwcm9ncmFtLnN0b3AgLSBwcm9ncmFtLnN0YXJ0XG4gICAgICAgIGxldCBsZXNzICA9IHByb2dyYW0uc3RvcCAtIHRpbWVcblxuICAgICAgICByZXR1cm4gTWF0aC5taW4oMTAwLCBNYXRoLm1heCgwLCgxIC0gbGVzcyAvIHRvdGFsKSAqIDEwMCkpXG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3QoY2hhbm5lbCwgbGlzdCwgc2l6ZSA9IDEwLCBwb3NpdGlvbiA9IDApe1xuICAgICAgICBsZXQgZGF5X2xzdCA9ICcnXG4gICAgICAgIGxldCBkYXlfcHJnID0gJydcbiAgICAgICAgbGV0IGRheV9ub3cgPSBuZXcgRGF0ZShEYXRlLm5vdygpKS5nZXREYXRlKClcbiAgICAgICAgbGV0IGRheV9uYW0gPSB7fVxuICAgICAgICBsZXQgZGlzcGxheSA9IFtdXG5cbiAgICAgICAgZGF5X25hbVtkYXlfbm93LTFdID0gTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2lwdHZfeWVzdGVyZGF5JylcbiAgICAgICAgZGF5X25hbVtkYXlfbm93XSAgID0gTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2lwdHZfdG9kYXknKVxuICAgICAgICBkYXlfbmFtW2RheV9ub3crMV0gPSBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl90b21vcnJvdycpXG5cbiAgICAgICAgbGV0IHdhdGNoID0gbGlzdFt0aGlzLnBvc2l0aW9uKGNoYW5uZWwsIGxpc3QpXVxuXG4gICAgICAgIGxpc3Quc2xpY2UocG9zaXRpb24sIHBvc2l0aW9uICsgc2l6ZSkuZm9yRWFjaChlbGVtPT57XG4gICAgICAgICAgICBkYXlfcHJnID0gbmV3IERhdGUoZWxlbS5zdGFydCkuZ2V0RGF0ZSgpXG5cbiAgICAgICAgICAgIGlmKGRheV9sc3QgIT09IGRheV9wcmcpe1xuICAgICAgICAgICAgICAgIGRheV9sc3QgPSBkYXlfcHJnXG5cbiAgICAgICAgICAgICAgICBkaXNwbGF5LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IGRheV9uYW1bZGF5X3ByZ10gPyBkYXlfbmFtW2RheV9wcmddIDogTGFtcGEuVXRpbHMucGFyc2VUaW1lKGVsZW0uc3RhcnQpLnNob3J0XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGlzcGxheS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncHJvZ3JhbScsXG4gICAgICAgICAgICAgICAgcHJvZ3JhbTogZWxlbSxcbiAgICAgICAgICAgICAgICB3YXRjaDogd2F0Y2ggPT0gZWxlbVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gZGlzcGxheVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRVBHIiwiaW1wb3J0IEFwaSBmcm9tICcuLi91dGlscy9hcGknXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vdXRpbHMvdXRpbHMnXG5pbXBvcnQgRVBHIGZyb20gJy4uL3V0aWxzL2VwZydcblxuY2xhc3MgRGV0YWlsc3tcbiAgICBjb25zdHJ1Y3RvcihsaXN0ZW5lcil7XG4gICAgICAgIHRoaXMubGlzdGVuZXIgPSBsaXN0ZW5lclxuXG4gICAgICAgIHRoaXMuaHRtbCAgID0gTGFtcGEuVGVtcGxhdGUuanMoJ2N1Yl9pcHR2X2RldGFpbHMnKVxuICAgICAgICB0aGlzLnRpdGxlICA9IHRoaXMuaHRtbC5maW5kKCcuaXB0di1kZXRhaWxzX190aXRsZScpXG4gICAgICAgIHRoaXMucGxheSAgID0gdGhpcy5odG1sLmZpbmQoJy5pcHR2LWRldGFpbHNfX3BsYXknKVxuICAgICAgICB0aGlzLnByb2dtICA9IHRoaXMuaHRtbC5maW5kKCcuaXB0di1kZXRhaWxzX19wcm9ncmFtJylcblxuICAgICAgICB0aGlzLnByb2dtX2ltYWdlID0gZmFsc2VcblxuICAgICAgICB0aGlzLmVtcHR5X2h0bWwgPSBMYW1wYS5UZW1wbGF0ZS5qcygnY3ViX2lwdHZfZGV0YWlsc19lbXB0eScpXG5cbiAgICAgICAgdGhpcy5saXN0ZW5lci5mb2xsb3coJ2RldGFpbHMtbG9hZCcsdGhpcy5kcmF3LmJpbmQodGhpcykpXG5cbiAgICAgICAgaWYod2luZG93LmlwdHZfbW9iaWxlKSB0aGlzLmh0bWwucmVtb3ZlQ2xhc3MoJ2xheWVyLS13aGVpZ2h0JylcblxuICAgICAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwoKCk9PntcbiAgICAgICAgICAgIGlmKHRoaXMudGltZWxpbmUpIHRoaXMudGltZWxpbmUoKVxuICAgICAgICB9LDEwMDAgKiA1KVxuICAgIH1cblxuICAgIGRyYXcoY2hhbm5lbCl7XG4gICAgICAgIHRoaXMudGl0bGUudGV4dChVdGlscy5jbGVhckNoYW5uZWxOYW1lKGNoYW5uZWwubmFtZSkpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmdyb3VwKGNoYW5uZWwsIFV0aWxzLmNsZWFyTWVudU5hbWUoY2hhbm5lbC5ncm91cCB8fCBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgncGxheWVyX3Vua25vd24nKSkpXG5cbiAgICAgICAgdGhpcy53YWl0X2ZvciA9IGNoYW5uZWwubmFtZVxuXG4gICAgICAgIGlmKGNoYW5uZWwuaWQpe1xuICAgICAgICAgICAgdGhpcy5wcm9nbS50ZXh0KExhbXBhLkxhbmcudHJhbnNsYXRlKCdsb2FkaW5nJykrJy4uLicpXG5cbiAgICAgICAgICAgIEFwaS5wcm9ncmFtKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBjaGFubmVsLm5hbWUsXG4gICAgICAgICAgICAgICAgY2hhbm5lbF9pZDogY2hhbm5lbC5pZCxcbiAgICAgICAgICAgICAgICB0aW1lOiBFUEcudGltZShjaGFubmVsKSxcbiAgICAgICAgICAgICAgICB0dmc6IGNoYW5uZWwudHZnXG4gICAgICAgICAgICB9KS50aGVuKChwcm9ncmFtKT0+e1xuICAgICAgICAgICAgICAgIGlmKHRoaXMud2FpdF9mb3IgPT0gY2hhbm5lbC5uYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgaWYocHJvZ3JhbS5sZW5ndGgpIHRoaXMucHJvZ3JhbShjaGFubmVsLCBwcm9ncmFtKVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHRoaXMuZW1wdHkoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhdGNoKChlKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuZW1wdHkoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5lbXB0eSgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBncm91cChjaGFubmVsLCB0aXRsZSl7XG4gICAgICAgIHRoaXMucGxheS5lbXB0eSgpXG5cbiAgICAgICAgbGV0IGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgICAgICBncm91cC50ZXh0KHRpdGxlKVxuXG4gICAgICAgIGlmKFV0aWxzLmhhc0FyY2hpdmUoY2hhbm5lbCkpe1xuICAgICAgICAgICAgbGV0IGFyY2hpdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgICAgICAgICBhcmNoaXZlLmFkZENsYXNzKCdsYicpLnRleHQoJ0EnKVxuXG4gICAgICAgICAgICB0aGlzLnBsYXkuYXBwZW5kKGFyY2hpdmUpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaGQgPSBVdGlscy5pc0hEKGNoYW5uZWwubmFtZSlcblxuICAgICAgICBpZihoZCl7XG4gICAgICAgICAgICBsZXQgaGRfbGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgICAgICAgICBoZF9sYi5hZGRDbGFzcygnbGInKS50ZXh0KGhkLnRvVXBwZXJDYXNlKCkpXG5cbiAgICAgICAgICAgIHRoaXMucGxheS5hcHBlbmQoaGRfbGIpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBsYXkuYXBwZW5kKGdyb3VwKVxuICAgIH1cblxuICAgIGVtcHR5KCl7XG4gICAgICAgIHRoaXMudGltZWxpbmUgPSBmYWxzZVxuXG4gICAgICAgIHRoaXMucHJvZ20uZW1wdHkoKS5hcHBlbmQodGhpcy5lbXB0eV9odG1sKVxuICAgIH1cblxuICAgIGJ1aWxkUHJvZ3JhbUxpc3QoY2hhbm5lbCwgcHJvZ3JhbSwgcGFyYW1zKXtcbiAgICAgICAgbGV0IHN0aW1lICAgPSBFUEcudGltZShjaGFubmVsKVxuICAgICAgICBsZXQgc3RhcnQgICA9IEVQRy5wb3NpdGlvbihjaGFubmVsLCBwcm9ncmFtKVxuICAgICAgICBsZXQgYXJjaGl2ZSA9IFV0aWxzLmhhc0FyY2hpdmUoY2hhbm5lbClcblxuICAgICAgICBpZighcGFyYW1zICYmIHByb2dyYW1bc3RhcnRdKXtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXAoY2hhbm5lbCwgTGFtcGEuVXRpbHMuc2hvcnRUZXh0KFV0aWxzLmNsZWFyKHByb2dyYW1bc3RhcnRdLnRpdGxlKSw1MCkpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IExhbXBhLkVuZGxlc3MoKHBvc2l0aW9uKT0+e1xuICAgICAgICAgICAgaWYocG9zaXRpb24gPj0gcHJvZ3JhbS5sZW5ndGgpIHJldHVybiB0aGlzLmVuZGxlc3MudG8ocG9zaXRpb24tMSlcblxuICAgICAgICAgICAgbGV0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgbGV0IGxpc3QgPSBFUEcubGlzdChjaGFubmVsLCBwcm9ncmFtLCAxMCwgcG9zaXRpb24pXG5cbiAgICAgICAgICAgIHdyYXAuYWRkQ2xhc3MoJ2lwdHYtZGV0YWlsc19fbGlzdCcpXG5cbiAgICAgICAgICAgIGxpc3QuZm9yRWFjaCgoZWxlbSwgaW5kZXgpPT57XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gICAgICAgICAgICAgICAgaWYoZWxlbS50eXBlID09ICdkYXRlJykgaXRlbS5hZGRDbGFzcygnaXB0di1wcm9ncmFtLWRhdGUnKS50ZXh0KGVsZW0uZGF0ZSlcbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENsYXNzKCdpcHR2LXByb2dyYW0gc2VsZWN0b3InKVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBoZWFkLCBpY29uX3dyYXAsIGljb25faW1nLCBoZWFkX2JvZHlcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lLmFkZENsYXNzKCdpcHR2LXByb2dyYW1fX3RpbWUnKS50ZXh0KExhbXBhLlV0aWxzLnBhcnNlVGltZShlbGVtLnByb2dyYW0uc3RhcnQpLnRpbWUpXG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5hZGRDbGFzcygnaXB0di1wcm9ncmFtX19ib2R5JylcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUuYWRkQ2xhc3MoJ2lwdHYtcHJvZ3JhbV9fdGl0bGUnKS50ZXh0KFV0aWxzLmNsZWFyKGVsZW0ucHJvZ3JhbS50aXRsZSkpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZWxlbS5wcm9ncmFtLmljb24gJiYgaW5kZXggPT0gMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZF9ib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25fd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uX2ltZyAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkLmFkZENsYXNzKCdpcHR2LXByb2dyYW1fX2hlYWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZF9ib2R5LmFkZENsYXNzKCdpcHR2LXByb2dyYW1fX2hlYWQtYm9keScpXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uX3dyYXAuYWRkQ2xhc3MoJ2lwdHYtcHJvZ3JhbV9faWNvbi13cmFwJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25faW1nLmFkZENsYXNzKCdpcHR2LXByb2dyYW1fX2ljb24taW1nJylcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbl93cmFwLmFwcGVuZChpY29uX2ltZylcblxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZC5hcHBlbmQoaWNvbl93cmFwKVxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZC5hcHBlbmQoaGVhZF9ib2R5KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkX2JvZHkuYXBwZW5kKHRpdGxlKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5LmFwcGVuZChoZWFkKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnByb2dtX2ltYWdlICYmIHRoaXMucHJvZ21faW1hZ2Uud2FpdGluZykgdGhpcy5wcm9nbV9pbWFnZS5zcmMgPSAnJ1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uX2ltZy5vbmxvYWQgPSAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25faW1nLndhaXRpbmcgPSBmYWxzZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbl93cmFwLmFkZENsYXNzKCdsb2FkZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uX2ltZy5lcnJvciA9ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbl93cmFwLmFkZENsYXNzKCdsb2FkZWQtZXJyb3InKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbl9pbWcuc3JjID0gJy4vaW1nL2ltZ19icm9rZW4uc3ZnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uX2ltZy53YWl0aW5nID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbl9pbWcuc3JjICAgICA9IGVsZW0ucHJvZ3JhbS5pY29uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ21faW1hZ2UgPSBpY29uX2ltZ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5LmFwcGVuZCh0aXRsZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtLndhdGNoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aW1lbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmUuYWRkQ2xhc3MoJ2lwdHYtcHJvZ3JhbV9fdGltZWxpbmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUud2lkdGggPSBFUEcudGltZWxpbmUoY2hhbm5lbCwgZWxlbS5wcm9ncmFtKSArICclJ1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZS5hcHBlbmQoZGl2KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighcGFyYW1zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVsaW5lID0gKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBlcmNlbnQgPSBFUEcudGltZWxpbmUoY2hhbm5lbCwgZWxlbS5wcm9ncmFtKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS53aWR0aCA9IHBlcmNlbnQgKyAnJSdcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwZXJjZW50ID09IDEwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dCA9IEVQRy5wb3NpdGlvbihjaGFubmVsLCBwcm9ncmFtKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzdGFydCAhPT0gbmV4dCkgdGhpcy5wcm9ncmFtKGNoYW5uZWwsIHByb2dyYW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFyY2hpdmUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ub24oJ2hvdmVyOmVudGVyJywoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyYW06IGVsZW0ucHJvZ3JhbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWw6IGNoYW5uZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdDogcHJvZ3JhbS5zbGljZShNYXRoLm1heCgwLHBvc2l0aW9uIC0gNDApLCBzdGFydClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBhcmFtcykgcGFyYW1zLm9uUGxheShkYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHRoaXMubGlzdGVuZXIuc2VuZCgncGxheS1hcmNoaXZlJyxkYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2xhc3MoJ3BsYXllZCcpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW0ucHJvZ3JhbS5pY29uICYmIGhlYWRfYm9keSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZF9ib2R5LmFwcGVuZCh0aW1lbGluZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5hcHBlbmQodGltZWxpbmUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihpbmRleCA9PSAxICYmIGVsZW0ucHJvZ3JhbS5kZXNjKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0ICA9IFV0aWxzLmNsZWFyKGVsZW0ucHJvZ3JhbS5kZXNjKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0ZXh0Lmxlbmd0aCA+IDMwMCkgdGV4dCA9IHRleHQuc2xpY2UoMCwzMDApICsgJy4uLidcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlc2NyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjci5hZGRDbGFzcygnaXB0di1wcm9ncmFtX19kZXNjcicpLnRleHQodGV4dClcblxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5hcHBlbmQoZGVzY3IpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihhcmNoaXZlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtaW51cyA9IHN0aW1lIC0gYXJjaGl2ZSAqIDEwMDAgKiA2MCAqIDYwICogMjRcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbS5wcm9ncmFtLnN0YXJ0ID4gbWludXMgJiYgZWxlbS5wcm9ncmFtLnN0b3AgPCBzdGltZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDbGFzcygnYXJjaGl2ZScpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm9uKCdob3ZlcjplbnRlcicsKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmFtOiBlbGVtLnByb2dyYW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiBjaGFubmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZXNoaWZ0OiBzdGltZSAtIGVsZW0ucHJvZ3JhbS5zdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0OiBwcm9ncmFtLnNsaWNlKE1hdGgubWF4KDAscG9zaXRpb24gLSA0MCksIHN0YXJ0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocGFyYW1zKSBwYXJhbXMub25QbGF5KGRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5saXN0ZW5lci5zZW5kKCdwbGF5LWFyY2hpdmUnLCBkYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFwcGVuZCh0aW1lKVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFwcGVuZChib2R5KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdyYXAuYXBwZW5kKGl0ZW0pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gd3JhcFxuICAgICAgICB9LHtwb3NpdGlvbjogc3RhcnR9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0YDQvtCz0YDQsNC80LzQsCDQsiDQv9C70LXQtdGA0LVcbiAgICAgKi9cblxuICAgIHBsYXlsaXN0KGNoYW5uZWwsIHByb2dyYW0sIHBhcmFtcyA9IHt9KXtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRQcm9ncmFtTGlzdChjaGFubmVsLCBwcm9ncmFtLCBwYXJhbXMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J/RgNC+0LPRgNCw0LzQvNCwINCyINCz0LvQsNCy0L3QvtC8INC40L3RgtC10YDRhNC10LnRgdC1XG4gICAgICovXG4gICAgcHJvZ3JhbShjaGFubmVsLCBwcm9ncmFtKXtcbiAgICAgICAgaWYodGhpcy5lbmRsZXNzKSB0aGlzLmVuZGxlc3MuZGVzdHJveSgpXG5cbiAgICAgICAgdGhpcy50aW1lbGluZSA9IGZhbHNlXG5cbiAgICAgICAgdGhpcy5lbmRsZXNzID0gdGhpcy5idWlsZFByb2dyYW1MaXN0KGNoYW5uZWwsIHByb2dyYW0pXG5cbiAgICAgICAgdGhpcy5wcm9nbS5lbXB0eSgpLmFwcGVuZCh0aGlzLmVuZGxlc3MucmVuZGVyKCkpXG4gICAgfVxuXG4gICAgdG9nZ2xlKCl7XG4gICAgICAgIExhbXBhLkNvbnRyb2xsZXIuYWRkKCdjb250ZW50Jyx7XG4gICAgICAgICAgICBsaW5rOiB0aGlzLFxuICAgICAgICAgICAgdG9nZ2xlOiAoKT0+e1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaHRtbC5maW5kKCcuc2VsZWN0b3InKSl7XG4gICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuY29sbGVjdGlvblNldCh0aGlzLmh0bWwpXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuY29sbGVjdGlvbkZvY3VzKGZhbHNlLHRoaXMuaHRtbClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmxpc3RlbmVyLnNlbmQoJ3RvZ2dsZScsJ2ljb25zJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWZ0OiAoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXIuc2VuZCgndG9nZ2xlJywnaWNvbnMnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwOiAoKT0+e1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuZW5kbGVzcyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kbGVzcy5tb3ZlKC0xKVxuXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuY29sbGVjdGlvblNldCh0aGlzLmh0bWwpXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuY29sbGVjdGlvbkZvY3VzKGZhbHNlLHRoaXMuaHRtbClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG93bjogKCk9PntcbiAgICAgICAgICAgICAgICBpZih0aGlzLmVuZGxlc3Mpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZGxlc3MubW92ZSgxKVxuXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuY29sbGVjdGlvblNldCh0aGlzLmh0bWwpXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuY29sbGVjdGlvbkZvY3VzKGZhbHNlLHRoaXMuaHRtbClcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhY2s6ICgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lci5zZW5kKCdiYWNrJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnY29udGVudCcpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmh0bWxcbiAgICB9XG5cbiAgICBkZXN0cm95KCl7XG4gICAgICAgIHRoaXMuaHRtbC5yZW1vdmUoKVxuXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcilcblxuICAgICAgICB0aGlzLndhaXRfZm9yID0gZmFsc2VcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERldGFpbHMiLCJsZXQgbGFzdF9xdWVyeSA9ICcnXG5cbmNsYXNzIFNlYXJjaHtcbiAgICBzdGF0aWMgZmluZChjaGFubmVscywgY2FsbCl7XG4gICAgICAgIGxldCBjb250cm9sbGVyID0gTGFtcGEuQ29udHJvbGxlci5lbmFibGVkKCkubmFtZVxuXG4gICAgICAgIExhbXBhLklucHV0LmVkaXQoe1xuICAgICAgICAgICAgdmFsdWU6IGxhc3RfcXVlcnksXG4gICAgICAgICAgICBmcmVlOiB0cnVlLFxuICAgICAgICAgICAgbm9zYXZlOiB0cnVlXG4gICAgICAgIH0sKG5ld192YWx1ZSk9PntcbiAgICAgICAgICAgIGxhc3RfcXVlcnkgPSBuZXdfdmFsdWVcblxuICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoY29udHJvbGxlcilcblxuICAgICAgICAgICAgY2FsbCh7XG4gICAgICAgICAgICAgICAgY2hhbm5lbHM6IGNoYW5uZWxzLmZpbHRlcihjPT5jLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5ld192YWx1ZS50b0xvd2VyQ2FzZSgpKSA+PSAwKSxcbiAgICAgICAgICAgICAgICBxdWVyeTogbmV3X3ZhbHVlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoIiwiaW1wb3J0IEZhdm9yaXRlcyBmcm9tICcuLi91dGlscy9mYXZvcml0ZXMnXG5pbXBvcnQgTG9ja2VkIGZyb20gJy4uL3V0aWxzL2xvY2tlZCdcbmltcG9ydCBVdGlscyBmcm9tICcuLi91dGlscy91dGlscydcbmltcG9ydCBTZWFyY2ggZnJvbSAnLi9zZWFyY2gnXG5pbXBvcnQgUGlsb3QgZnJvbSAnLi4vdXRpbHMvcGlsb3QnXG5cbmNsYXNzIE1lbnV7XG4gICAgY29uc3RydWN0b3IobGlzdGVuZXIpe1xuICAgICAgICB0aGlzLmxpc3RlbmVyID0gbGlzdGVuZXJcblxuICAgICAgICB0aGlzLmh0bWwgID0gTGFtcGEuVGVtcGxhdGUuanMoJ2N1Yl9pcHR2X21lbnUnKVxuICAgICAgICB0aGlzLm1lbnUgID0gdGhpcy5odG1sLmZpbmQoJy5pcHR2LW1lbnVfX2xpc3QnKVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsID0gbmV3IExhbXBhLlNjcm9sbCh7bWFzazohd2luZG93LmlwdHZfbW9iaWxlLG92ZXI6IHRydWUsaG9yaXpvbnRhbDp3aW5kb3cuaXB0dl9tb2JpbGV9KVxuXG4gICAgICAgIGlmKCF3aW5kb3cuaXB0dl9tb2JpbGUpIHRoaXMuc2Nyb2xsLm1pbnVzKClcblxuICAgICAgICB0aGlzLnNjcm9sbC5hcHBlbmQodGhpcy5odG1sKVxuICAgIH1cblxuICAgIGZhdm9yaXRlcyhjaGFubmVscyl7XG4gICAgICAgIGxldCBmYXZvcml0ZXMgPSBGYXZvcml0ZXMubGlzdCgpXG5cbiAgICAgICAgaWYoTGFtcGEuU3RvcmFnZS5nZXQoJ2lwdHZfZmF2b3RpdGVfc2F2ZScsJ3VybCcpID09ICduYW1lJyl7XG4gICAgICAgICAgICBmYXZvcml0ZXMgPSBmYXZvcml0ZXMuZmlsdGVyKGY9PntcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hhbm5lbHMuZmluZChjPT5jLm5hbWUgPT0gZi5uYW1lKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgZmF2b3JpdGVzLmZvckVhY2goZj0+e1xuICAgICAgICAgICAgICAgIGYudXJsID0gY2hhbm5lbHMuZmluZChjPT5jLm5hbWUgPT0gZi5uYW1lKS51cmxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmF2b3JpdGVzXG4gICAgfVxuXG4gICAgYnVpbGQoZGF0YSl7XG4gICAgICAgIHRoaXMubWVudS5lbXB0eSgpXG5cbiAgICAgICAgbGV0IHNlYXJjaF9pdGVtID0ge1xuICAgICAgICAgICAgbmFtZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3NlYXJjaCcpLFxuICAgICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgICAgICBzZWFyY2g6IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaHRtbC5maW5kKCcuaXB0di1tZW51X190aXRsZScpLnRleHQoZGF0YS5uYW1lIHx8IExhbXBhLkxhbmcudHJhbnNsYXRlKCdwbGF5ZXJfcGxheWxpc3QnKSlcbiAgICAgICAgdGhpcy5odG1sLmZpbmQoJy5pcHR2LW1lbnVfX3NlYXJjaCcpLm9uKCdob3ZlcjplbnRlcicsKCk9PntcbiAgICAgICAgICAgIFNlYXJjaC5maW5kKGRhdGEucGxheWxpc3QuY2hhbm5lbHMsIHNlYXJjaF9pdGVtLnVwZGF0ZSlcbiAgICAgICAgfSlcblxuICAgICAgICBMYW1wYS5BcnJheXMuaW5zZXJ0KGRhdGEucGxheWxpc3QubWVudSwwLHNlYXJjaF9pdGVtKVxuXG4gICAgICAgIGxldCBmYXZvcml0ZXMgPSB0aGlzLmZhdm9yaXRlcyhkYXRhLnBsYXlsaXN0LmNoYW5uZWxzKVxuICAgICAgICBsZXQgY2F0ZWdvcnkgID0gUGlsb3Qubm90ZWJvb2soJ2NhdGVnb3J5JylcblxuICAgICAgICBMYW1wYS5BcnJheXMuaW5zZXJ0KGRhdGEucGxheWxpc3QubWVudSwwLHtcbiAgICAgICAgICAgIG5hbWU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdzZXR0aW5nc19pbnB1dF9saW5rcycpLFxuICAgICAgICAgICAgY291bnQ6IGZhdm9yaXRlcy5sZW5ndGgsXG4gICAgICAgICAgICBmYXZvcml0ZXM6IHRydWVcbiAgICAgICAgfSlcblxuICAgICAgICBsZXQgZmlyc3RcbiAgICAgICAgbGV0IGZpcnN0X2l0ZW1cbiAgICAgICAgbGV0IHBpbG90XG5cbiAgICAgICAgaWYod2luZG93LmlwdHZfbW9iaWxlKXtcbiAgICAgICAgICAgIGxldCBtb2JpbGVfc2VhY3JoX2J1dHRvbiA9IExhbXBhLlRlbXBsYXRlLmpzKCdpcHR2X21lbnVfbW9iaWxlX2J1dHRvbl9zZWFyY2gnKVxuXG4gICAgICAgICAgICBtb2JpbGVfc2VhY3JoX2J1dHRvbi5vbignaG92ZXI6ZW50ZXInLCgpPT57XG4gICAgICAgICAgICAgICAgU2VhcmNoLmZpbmQoZGF0YS5wbGF5bGlzdC5jaGFubmVscywgc2VhcmNoX2l0ZW0udXBkYXRlKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy5tZW51LmFwcGVuZChtb2JpbGVfc2VhY3JoX2J1dHRvbilcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEucGxheWxpc3QubWVudS5mb3JFYWNoKChtZW51KT0+e1xuICAgICAgICAgICAgaWYobWVudS5jb3VudCA9PSAwICYmICEobWVudS5mYXZvcml0ZXMgfHwgbWVudS5zZWFyY2gpKSByZXR1cm5cblxuICAgICAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGxldCBjbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgICAgbGV0IG5tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGxldCBpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBsaS5hZGRDbGFzcygnaXB0di1tZW51X19saXN0LWl0ZW0gc2VsZWN0b3InKVxuICAgICAgICAgICAgaWMuYWRkQ2xhc3MoJ2lwdHYtbWVudV9fbGlzdC1pdGVtLWljb24nKVxuXG4gICAgICAgICAgICBubS50ZXh0KFV0aWxzLmNsZWFyTWVudU5hbWUobWVudS5uYW1lIHx8IExhbXBhLkxhbmcudHJhbnNsYXRlKCdpcHR2X2FsbF9jaGFubmVscycpKSlcbiAgICAgICAgICAgIGNvLnRleHQobWVudS5jb3VudClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGkuYXBwZW5kKGljKVxuICAgICAgICAgICAgbGkuYXBwZW5kKG5tKVxuICAgICAgICAgICAgbGkuYXBwZW5kKGNvKVxuXG4gICAgICAgICAgICBsZXQgaWNvbl9uYW1lID0gJ2dyb3VwJ1xuXG4gICAgICAgICAgICBpZihtZW51LmZhdm9yaXRlcykgaWNvbl9uYW1lID0gJ2ZhdidcbiAgICAgICAgICAgIGlmKG1lbnUuc2VhcmNoKSAgICBpY29uX25hbWUgPSAnc2VhcmNoZWQnXG4gICAgICAgICAgICBpZighbWVudS5uYW1lKSAgICAgaWNvbl9uYW1lID0gJ2FsbCdcblxuICAgICAgICAgICAgaWMuYXBwZW5kKExhbXBhLlRlbXBsYXRlLmpzKCdjdWJfaXB0dl9pY29uXycgKyBpY29uX25hbWUpKVxuXG4gICAgICAgICAgICBpZihtZW51LmZhdm9yaXRlcyl7XG4gICAgICAgICAgICAgICAgbGkuYWRkQ2xhc3MoJ2Zhdm9yaXRlcy0tbWVudS1pdGVtJylcblxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXIuZm9sbG93KCd1cGRhdGUtZmF2b3JpdGVzJywoKT0+e1xuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZXMgPSBGYXZvcml0ZXMubGlzdCgpXG5cbiAgICAgICAgICAgICAgICAgICAgbWVudS5jb3VudCA9IGZhdm9yaXRlcy5sZW5ndGhcblxuICAgICAgICAgICAgICAgICAgICBjby50ZXh0KG1lbnUuY291bnQpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYobWVudS5zZWFyY2gpe1xuICAgICAgICAgICAgICAgIGxpLmFkZENsYXNzKCdzZWFyY2gtLW1lbnUtaXRlbScpXG5cbiAgICAgICAgICAgICAgICBtZW51LnVwZGF0ZSA9IChyZXN1bHQpPT57XG4gICAgICAgICAgICAgICAgICAgIG1lbnUuZmluZCAgPSByZXN1bHQuY2hhbm5lbHNcbiAgICAgICAgICAgICAgICAgICAgbWVudS5jb3VudCA9IHJlc3VsdC5jaGFubmVscy5sZW5ndGhcblxuICAgICAgICAgICAgICAgICAgICBjby50ZXh0KHJlc3VsdC5jaGFubmVscy5sZW5ndGgpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYobWVudS5jb3VudCkgTGFtcGEuVXRpbHMudHJpZ2dlcihsaSwnaG92ZXI6ZW50ZXInKVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuTm90eS5zaG93KExhbXBhLkxhbmcudHJhbnNsYXRlKCdpcHR2X3NlYXJjaF9ub19yZXN1bHQnKSArICcgKCcrcmVzdWx0LnF1ZXJ5KycpJylcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZmlyc3RfaXRlbSkgTGFtcGEuVXRpbHMudHJpZ2dlcihmaXJzdF9pdGVtLCdob3ZlcjplbnRlcicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGlmKCFmaXJzdF9pdGVtKXtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RfaXRlbSA9IGxpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYobWVudS5uYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVwZGF0ZUljb24gPSAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWMuZW1wdHkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWMuYXBwZW5kKExhbXBhLlRlbXBsYXRlLmpzKCdjdWJfaXB0dl9pY29uXycgKyAoTG9ja2VkLmZpbmQoTG9ja2VkLmZvcm1hdCgnZ3JvdXAnLCBtZW51Lm5hbWUpKSA/ICdsb2NrJyA6ICdncm91cCcpKSlcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUljb24oKVxuXG4gICAgICAgICAgICAgICAgICAgIGxpLm9uKCdob3Zlcjpsb25nJywoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuU2VsZWN0LnNob3coe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndGl0bGVfYWN0aW9uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKExvY2tlZC5maW5kKExvY2tlZC5mb3JtYXQoJ2dyb3VwJywgbWVudS5uYW1lKSkgPyAnaXB0dl9jaGFubmVsX3VubG9jaycgOiAnaXB0dl9jaGFubmVsX2xvY2snKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsb2NrZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OiAoYSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGEudHlwZSA9PSAnbG9ja2VkJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihMYW1wYS5NYW5pZmVzdC5hcHBfZGlnaXRhbCA+PSAyMDQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKExvY2tlZC5maW5kKExvY2tlZC5mb3JtYXQoJ2dyb3VwJywgbWVudS5uYW1lKSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5QYXJlbnRhbENvbnRyb2wucXVlcnkoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKClcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2NrZWQucmVtb3ZlKExvY2tlZC5mb3JtYXQoJ2dyb3VwJywgbWVudS5uYW1lKSkuZmluYWxseSh1cGRhdGVJY29uKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMudG9nZ2xlLmJpbmQodGhpcykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvY2tlZC5hZGQoTG9ja2VkLmZvcm1hdCgnZ3JvdXAnLCBtZW51Lm5hbWUpKS5maW5hbGx5KHVwZGF0ZUljb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Ob3R5LnNob3coTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2lwdHZfbmVlZF91cGRhdGVfYXBwJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmFjazogdGhpcy50b2dnbGUuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxpLm9uKCdob3ZlcjplbnRlcicsKCk9PntcbiAgICAgICAgICAgICAgICBpZihtZW51LmNvdW50ID09IDApIHJldHVyblxuXG4gICAgICAgICAgICAgICAgbGV0IGxvYWQgPSAoKT0+e1xuICAgICAgICAgICAgICAgICAgICBQaWxvdC5ub3RlYm9vaygnY2F0ZWdvcnknLCBtZW51Lm5hbWUgfHwgJ2FsbCcpXG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lci5zZW5kKCdpY29ucy1sb2FkJywge21lbnUsIGljb25zOiBtZW51Lm5hbWUgPyBkYXRhLnBsYXlsaXN0LmNoYW5uZWxzLmZpbHRlcihhPT5hLmdyb3VwID09IG1lbnUubmFtZSkgOiBkYXRhLnBsYXlsaXN0LmNoYW5uZWxzfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgdG9nZ2xlID0gKCk9PntcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGl2ZSA9IHRoaXMubWVudS5maW5kKCcuYWN0aXZlJylcblxuICAgICAgICAgICAgICAgICAgICBpZihhY3RpdmUpIGFjdGl2ZS5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICAgICAgICAgICAgICAgICAgICBsaS5hZGRDbGFzcygnYWN0aXZlJylcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3QgPSBsaVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXIuc2VuZCgndG9nZ2xlJywnaWNvbnMnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZihtZW51LmZhdm9yaXRlcyl7XG4gICAgICAgICAgICAgICAgICAgIFBpbG90Lm5vdGVib29rKCdjYXRlZ29yeScsICcnKVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXIuc2VuZCgnaWNvbnMtbG9hZCcsIHttZW51LCBpY29uczogZmF2b3JpdGVzfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihtZW51LnNlYXJjaCl7XG4gICAgICAgICAgICAgICAgICAgIFBpbG90Lm5vdGVib29rKCdjYXRlZ29yeScsICcnKVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXIuc2VuZCgnaWNvbnMtbG9hZCcsIHttZW51LCBpY29uczogbWVudS5maW5kfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgaWYoTGFtcGEuTWFuaWZlc3QuYXBwX2RpZ2l0YWwgPj0gMjA0ICYmIExvY2tlZC5maW5kKExvY2tlZC5mb3JtYXQoJ2dyb3VwJywgbWVudS5uYW1lKSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIExhbXBhLlBhcmVudGFsQ29udHJvbC5xdWVyeSgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMudG9nZ2xlLmJpbmQodGhpcykpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBsb2FkKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0b2dnbGUoKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgbGkub24oJ2hvdmVyOmZvY3VzJywoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsLnVwZGF0ZShsaSx0cnVlKVxuXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0ID0gbGlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmKCFmaXJzdCAmJiBtZW51LmNvdW50ICE9PSAwKSBmaXJzdCA9IGxpXG5cbiAgICAgICAgICAgIGlmKChtZW51Lm5hbWUgPT0gY2F0ZWdvcnkgJiYgY2F0ZWdvcnkpIHx8ICghbWVudS5uYW1lICYmIGNhdGVnb3J5ID09ICdhbGwnKSkgcGlsb3QgPSBsaVxuXG4gICAgICAgICAgICB0aGlzLm1lbnUuYXBwZW5kKGxpKVxuICAgICAgICB9KVxuXG4gICAgICAgIFxuICAgICAgICBpZihwaWxvdCkgTGFtcGEuVXRpbHMudHJpZ2dlcihwaWxvdCwgJ2hvdmVyOmVudGVyJylcbiAgICAgICAgZWxzZSBpZihmaXJzdCkgTGFtcGEuVXRpbHMudHJpZ2dlcihmaXJzdCwgJ2hvdmVyOmVudGVyJylcbiAgICB9XG5cbiAgICB0b2dnbGUoKXtcbiAgICAgICAgTGFtcGEuQ29udHJvbGxlci5hZGQoJ2NvbnRlbnQnLHtcbiAgICAgICAgICAgIHRvZ2dsZTogKCk9PntcbiAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLmNvbGxlY3Rpb25TZXQodGhpcy5odG1sKVxuICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuY29sbGVjdGlvbkZvY3VzKHRoaXMubGFzdCx0aGlzLmh0bWwpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVmdDogKCk9PntcbiAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnbWVudScpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmlnaHQ6ICgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lci5zZW5kKCd0b2dnbGUnLCdpY29ucycpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXA6ICgpPT57XG4gICAgICAgICAgICAgICAgaWYoTmF2aWdhdG9yLmNhbm1vdmUoJ3VwJykpIE5hdmlnYXRvci5tb3ZlKCd1cCcpXG4gICAgICAgICAgICAgICAgZWxzZSBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnaGVhZCcpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG93bjogKCk9PntcbiAgICAgICAgICAgICAgICBpZihOYXZpZ2F0b3IuY2FubW92ZSgnZG93bicpKSBOYXZpZ2F0b3IubW92ZSgnZG93bicpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFjazogKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyLnNlbmQoJ2JhY2snKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdjb250ZW50JylcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Nyb2xsLnJlbmRlcih0cnVlKVxuICAgIH1cblxuICAgIGRlc3Ryb3koKXtcbiAgICAgICAgdGhpcy5zY3JvbGwuZGVzdHJveSgpXG5cbiAgICAgICAgdGhpcy5odG1sLnJlbW92ZSgpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZW51IiwiaW1wb3J0IEVQRyBmcm9tICcuL2VwZydcblxuZnVuY3Rpb24gc3RyUmVwbGFjZShzdHIsIGtleTJ2YWwpIHtcblx0Zm9yIChsZXQga2V5IGluIGtleTJ2YWwpIHtcblx0XHRzdHIgPSBzdHIucmVwbGFjZShcblx0XHRcdG5ldyBSZWdFeHAoa2V5LnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJyksICdnJyksXG5cdFx0XHRrZXkydmFsW2tleV1cblx0XHQpO1xuXHR9XG5cdHJldHVybiBzdHI7XG59XG5cbmZ1bmN0aW9uIHRmKHQsIGZvcm1hdCwgdSwgdHopIHtcblx0Zm9ybWF0ID0gZm9ybWF0IHx8ICcnO1xuXHR0eiA9IHBhcnNlSW50KHR6IHx8ICcwJyk7XG5cdHZhciB0aGlzT2Zmc2V0ID0gRVBHLnRpbWVfb2Zmc2V0O1xuXHR0aGlzT2Zmc2V0ICs9IHR6O1xuXHRpZiAoIXUpIHRoaXNPZmZzZXQgKz0gcGFyc2VJbnQoTGFtcGEuU3RvcmFnZS5nZXQoJ3RpbWVfb2Zmc2V0JywgJ24wJykucmVwbGFjZSgnbicsJycpKSAqIDYwIC0gbmV3IERhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpO1xuXHR2YXIgZCA9IG5ldyBEYXRlKCh0ICsgdGhpc09mZnNldCkgKiAxMDAwKTtcblx0dmFyIHIgPSB7eXl5eTpkLmdldFVUQ0Z1bGxZZWFyKCksTU06KCcwJysoZC5nZXRVVENNb250aCgpKzEpKS5zdWJzdHIoLTIpLGRkOignMCcrZC5nZXRVVENEYXRlKCkpLnN1YnN0cigtMiksSEg6KCcwJytkLmdldFVUQ0hvdXJzKCkpLnN1YnN0cigtMiksbW06KCcwJytkLmdldFVUQ01pbnV0ZXMoKSkuc3Vic3RyKC0yKSxzczooJzAnK2QuZ2V0VVRDU2Vjb25kcygpKS5zdWJzdHIoLTIpLFVURjp0fTtcblx0cmV0dXJuIHN0clJlcGxhY2UoZm9ybWF0LCByKTtcbn1cblxuZnVuY3Rpb24gdW5peHRpbWUoKSB7XG5cdHJldHVybiBNYXRoLmZsb29yKChuZXcgRGF0ZSgpLmdldFRpbWUoKSArIEVQRy50aW1lX29mZnNldCkvMTAwMCk7XG59XG5cblxuY2xhc3MgVXJse1xuICAgIHN0YXRpYyBwcmVwYXJlVXJsKHVybCwgcHJvZ3JhbSl7XG4gICAgICAgIGxldCBtID0gW10sIHZhbCA9ICcnLCByID0ge3N0YXJ0OnVuaXh0aW1lLG9mZnNldDowfTtcbiAgICAgICAgXG4gICAgICAgIGlmIChwcm9ncmFtKSB7XG4gICAgICAgICAgICBsZXQgc3RhcnQgPSBNYXRoLmZsb29yKHByb2dyYW0uc3RhcnQgLyAxMDAwKVxuICAgICAgICAgICAgbGV0IGVuZCAgID0gTWF0aC5mbG9vcihwcm9ncmFtLnN0b3AgLyAxMDAwKVxuICAgICAgICAgICAgbGV0IGR1cmF0aW9uID0gIGVuZCAtIHN0YXJ0XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgciA9IHtcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICAgICAgdXRjOiBzdGFydCxcbiAgICAgICAgICAgICAgICBlbmQ6IGVuZCxcbiAgICAgICAgICAgICAgICB1dGNlbmQ6IGVuZCxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IHVuaXh0aW1lKCkgLSBzdGFydCxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgZHVyYXRpb25mczogZW5kID4gdW5peHRpbWUoKSA/ICdub3cnIDogZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgbm93OiB1bml4dGltZSxcbiAgICAgICAgICAgICAgICBsdXRjOiB1bml4dGltZSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IHVuaXh0aW1lLFxuICAgICAgICAgICAgICAgIGQ6IGZ1bmN0aW9uKG0pe3JldHVybiBzdHJSZXBsYWNlKG1bNl18fCcnLHtNOk1hdGguZmxvb3IoZHVyYXRpb24vNjApLFM6ZHVyYXRpb24saDpNYXRoLmZsb29yKGR1cmF0aW9uLzYwLzYwKSxtOignMCcrKE1hdGguZmxvb3IoZHVyYXRpb24vNjApICUgNjApKS5zdWJzdHIoLTIpLHM6JzAwJ30pfSxcbiAgICAgICAgICAgICAgICBiOiBmdW5jdGlvbihtKXtyZXR1cm4gdGYoc3RhcnQsIG1bNl0sIG1bNF0sIG1bNV0pfSxcbiAgICAgICAgICAgICAgICBlOiBmdW5jdGlvbihtKXtyZXR1cm4gdGYoZW5kLCBtWzZdLCBtWzRdLCBtWzVdKX0sXG4gICAgICAgICAgICAgICAgbjogZnVuY3Rpb24obSl7cmV0dXJuIHRmKHVuaXh0aW1lKCksIG1bNl0sIG1bNF0sIG1bNV0pfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoISEobSA9IHVybC5tYXRjaCgvXFwkeyhcXCgoKFthLXpBLVpcXGRdKz8pKHUpPykoWystXVxcZCspP1xcKSk/KFteJHt9XSspfS8pKSkge1xuICAgICAgICAgICAgaWYgKCEhbVsyXSAmJiB0eXBlb2YgclttWzJdXSA9PT0gXCJmdW5jdGlvblwiKSB2YWwgPSByW21bMl1dKG0pO1xuICAgICAgICAgICAgZWxzZSBpZiAoISFtWzNdICYmIHR5cGVvZiByW21bM11dID09PSBcImZ1bmN0aW9uXCIpIHZhbCA9IHJbbVszXV0obSk7XG4gICAgICAgICAgICBlbHNlIGlmIChtWzZdIGluIHIpIHZhbCA9IHR5cGVvZiByW21bNl1dID09PSBcImZ1bmN0aW9uXCIgPyByW21bNl1dKCkgOiByW21bNl1dO1xuICAgICAgICAgICAgZWxzZSB2YWwgPSBtWzFdO1xuICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UobVswXSwgZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgc3RhdGljIGNhdGNodXBVcmwodXJsLCB0eXBlLCBzb3VyY2Upe1xuICAgICAgICB0eXBlID0gKHR5cGUgfHwgJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHNvdXJjZSA9IHNvdXJjZSB8fCAnJztcbiAgICAgICAgaWYgKCF0eXBlKSB7XG4gICAgICAgICAgICBpZiAoISFzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlLnNlYXJjaCgvXmh0dHBzPzpcXC9cXC8vaSkgPT09IDApIHR5cGUgPSAnZGVmYXVsdCc7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc291cmNlLnNlYXJjaCgvXls/Ji9dW14vXS8pID09PSAwKSB0eXBlID0gJ2FwcGVuZCc7XG4gICAgICAgICAgICAgICAgZWxzZSB0eXBlID0gJ2RlZmF1bHQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodXJsLmluZGV4T2YoJyR7JykgPCAwKSB0eXBlID0gJ3NoaWZ0JztcbiAgICAgICAgICAgIGVsc2UgdHlwZSA9ICdkZWZhdWx0JztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJUFRWJywgJ0F1dG9kZXRlY3QgY2F0Y2h1cC10eXBlIFwiJyArIHR5cGUgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3VXJsID0gJyc7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnYXBwZW5kJzpcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1VybCA9IChzb3VyY2Uuc2VhcmNoKC9eaHR0cHM/OlxcL1xcLy9pKSA9PT0gMCA/ICcnIDogdXJsKSArIHNvdXJjZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vINGC0LDQuiDQuCDQt9Cw0LTRg9C80LDQvdC+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAndGltZXNoaWZ0JzogLy8gQGRlcHJlY2F0ZWRcbiAgICAgICAgICAgIGNhc2UgJ3NoaWZ0JzogLy8gKyBhcHBlbmRcbiAgICAgICAgICAgICAgICBuZXdVcmwgPSAoc291cmNlIHx8IHVybCk7XG4gICAgICAgICAgICAgICAgbmV3VXJsICs9IChuZXdVcmwuaW5kZXhPZignPycpID49IDAgPyAnJicgOiAnPycpICsgJ3V0Yz0ke3N0YXJ0fSZsdXRjPSR7dGltZXN0YW1wfSc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1VybDtcbiAgICAgICAgICAgIGNhc2UgJ2ZsdXNzb25pYyc6XG4gICAgICAgICAgICBjYXNlICdmbHVzc29uaWMtaGxzJzpcbiAgICAgICAgICAgIGNhc2UgJ2ZsdXNzb25pYy10cyc6XG4gICAgICAgICAgICBjYXNlICdmcyc6XG4gICAgICAgICAgICAgICAgLy8gRXhhbXBsZSBzdHJlYW0gYW5kIGNhdGNodXAgVVJMc1xuICAgICAgICAgICAgICAgIC8vIHN0cmVhbTogIGh0dHA6Ly9jaDAxLnNwcjI0Lm5ldC8xNTEvbXBlZ3RzP3Rva2VuPW15X3Rva2VuXG4gICAgICAgICAgICAgICAgLy8gY2F0Y2h1cDogaHR0cDovL2NoMDEuc3ByMjQubmV0LzE1MS90aW1lc2hpZnRfYWJzLXt1dGN9LnRzP3Rva2VuPW15X3Rva2VuXG4gICAgICAgICAgICAgICAgLy8gc3RyZWFtOiAgaHR0cDovL2xpc3QudHY6ODg4OC8zMjUvaW5kZXgubTN1OD90b2tlbj1zZWNyZXRcbiAgICAgICAgICAgICAgICAvLyBjYXRjaHVwOiBodHRwOi8vbGlzdC50djo4ODg4LzMyNS90aW1lc2hpZnRfcmVsLXtvZmZzZXQ6MX0ubTN1OD90b2tlbj1zZWNyZXRcbiAgICAgICAgICAgICAgICAvLyBzdHJlYW06ICBodHRwOi8vbGlzdC50djo4ODg4LzMyNS9tb25vLm0zdTg/dG9rZW49c2VjcmV0XG4gICAgICAgICAgICAgICAgLy8gY2F0Y2h1cDogaHR0cDovL2xpc3QudHY6ODg4OC8zMjUvbW9uby10aW1lc2hpZnRfcmVsLXtvZmZzZXQ6MX0ubTN1OD90b2tlbj1zZWNyZXRcbiAgICAgICAgICAgICAgICAvLyBzdHJlYW06ICBodHRwOi8vbGlzdC50djo4ODg4LzMyNS9saXZlP3Rva2VuPW15X3Rva2VuXG4gICAgICAgICAgICAgICAgLy8gY2F0Y2h1cDogaHR0cDovL2xpc3QudHY6ODg4OC8zMjUve3V0Y30udHM/dG9rZW49bXlfdG9rZW5cbiAgICAgICAgICAgICAgICAvLyBTZWUgZG9jOiBodHRwczovL2ZsdXNzb25pYy5ydS9kb2MvcHJvaWdyeXZhbmllL3Zvc3Byb2l6dmVkZW5pZS1obHMvXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVybFxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvKHZpZGVvXFxkKnxtb25vXFxkKilcXC4obTN1OHx0cykoXFw/fCQpLywgJy8kMS1cXCR7c3RhcnR9LVxcJHtkdXJhdGlvbmZzfS4kMiQzJylcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLyhpbmRleHxwbGF5bGlzdClcXC4obTN1OHx0cykoXFw/fCQpLywgJy9hcmNoaXZlLVxcJHtzdGFydH0tXFwke2R1cmF0aW9uZnN9LiQyJDMnKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvbXBlZ3RzKFxcP3wkKS8sICcvdGltZXNoaWZ0X2Ficy1cXCR7c3RhcnR9LnRzJDEnKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvbGl2ZShcXD98JCkvLCAnL1xcJHtzdGFydH0udHMkMScpXG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgY2FzZSAneGMnOlxuICAgICAgICAgICAgICAgIC8vIEV4YW1wbGUgc3RyZWFtIGFuZCBjYXRjaHVwIFVSTHNcbiAgICAgICAgICAgICAgICAvLyBzdHJlYW06ICBodHRwOi8vbGlzdC50djo4MDgwL215QGFjY291bnQueGMvbXlfcGFzc3dvcmQvMTQ3N1xuICAgICAgICAgICAgICAgIC8vIGNhdGNodXA6IGh0dHA6Ly9saXN0LnR2OjgwODAvdGltZXNoaWZ0L215QGFjY291bnQueGMvbXlfcGFzc3dvcmQve2R1cmF0aW9ufS97WX0te219LXtkfTp7SH0te019LzE0NzcudHNcbiAgICAgICAgICAgICAgICAvLyBzdHJlYW06ICBodHRwOi8vbGlzdC50djo4MDgwL2xpdmUvbXlAYWNjb3VudC54Yy9teV9wYXNzd29yZC8xNDc3Lm0zdThcbiAgICAgICAgICAgICAgICAvLyBjYXRjaHVwOiBodHRwOi8vbGlzdC50djo4MDgwL3RpbWVzaGlmdC9teUBhY2NvdW50LnhjL215X3Bhc3N3b3JkL3tkdXJhdGlvbn0ve1l9LXttfS17ZH06e0h9LXtNfS8xNDc3Lm0zdThcbiAgICAgICAgICAgICAgICBuZXdVcmwgPSB1cmxcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAvXihodHRwcz86XFwvXFwvW14vXSspKFxcL2xpdmUpPyhcXC9bXi9dK1xcL1teL10rXFwvKShbXi8uXSspXFwubTN1OD8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICckMS90aW1lc2hpZnQkM1xcJHsoZClNfS9cXCR7KGIpeXl5eS1NTS1kZDpISC1tbX0vJDQubTN1OCdcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgICAgIC9eKGh0dHBzPzpcXC9cXC9bXi9dKykoXFwvbGl2ZSk/KFxcL1teL10rXFwvW14vXStcXC8pKFteLy5dKykoXFwudHN8KSQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgJyQxL3RpbWVzaGlmdCQzXFwkeyhkKU19L1xcJHsoYil5eXl5LU1NLWRkOkhILW1tfS8kNC50cydcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RlZmF1bHQnOlxuICAgICAgICAgICAgICAgIG5ld1VybCA9IHNvdXJjZSB8fCB1cmw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSVBUVicsICdFcnI6IG5vIHN1cHBvcnQgY2F0Y2h1cC10eXBlPVwiJyArIHR5cGUgKyAnXCInKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld1VybC5pbmRleE9mKCckeycpIDwgMCkgcmV0dXJuIHRoaXMuY2F0Y2h1cFVybChuZXdVcmwsJ3NoaWZ0Jyk7XG4gICAgICAgIHJldHVybiBuZXdVcmw7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVcmxcbiIsImltcG9ydCBGYXZvcml0ZXMgZnJvbSAnLi4vdXRpbHMvZmF2b3JpdGVzJ1xuaW1wb3J0IExvY2tlZCBmcm9tICcuLi91dGlscy9sb2NrZWQnXG5cbmNsYXNzIEhVRE1lbnV7XG4gICAgY29uc3RydWN0b3IobGlzdGVuZXIsIGNoYW5uZWwpe1xuICAgICAgICB0aGlzLmxpc3RlbmVyID0gbGlzdGVuZXJcbiAgICAgICAgdGhpcy5jaGFubmVsICA9IGNoYW5uZWxcbiAgICAgICAgdGhpcy5vcmlnaW5hbCA9IGNoYW5uZWwub3JpZ2luYWxcblxuICAgICAgICB0aGlzLmh0bWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIH1cblxuICAgIGNyZWF0ZSgpe1xuICAgICAgICBsZXQgaW5mbyA9ICQoYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtaHVkLW1lbnUtaW5mb1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LWh1ZC1tZW51LWluZm9fX2dyb3VwXCI+JHt0aGlzLmNoYW5uZWwuZ3JvdXB9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtaHVkLW1lbnUtaW5mb19fbmFtZVwiPiR7dGhpcy5jaGFubmVsLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYClbMF1cblxuICAgICAgICBsZXQgZmF2b3JpdGUgPSB0aGlzLmJ1dHRvbihMYW1wYS5UZW1wbGF0ZS5nZXQoJ2N1Yl9pcHR2X2ljb25fZmF2b3JpdGUnLCB7fSwgdHJ1ZSksIExhbXBhLkxhbmcudHJhbnNsYXRlKCdzZXR0aW5nc19pbnB1dF9saW5rcycpLCAoKT0+e1xuICAgICAgICAgICAgRmF2b3JpdGVzLnRvZ2dsZSh0aGlzLm9yaWdpbmFsKS5maW5hbGx5KCgpPT57XG4gICAgICAgICAgICAgICAgZmF2b3JpdGUudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScsIEJvb2xlYW4oRmF2b3JpdGVzLmZpbmQodGhpcy5vcmlnaW5hbCkpKVxuXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lci5zZW5kKCdhY3Rpb24tZmF2b3JpdGUnLCB0aGlzLm9yaWdpbmFsKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICBsZXQgbG9ja2VkID0gdGhpcy5idXR0b24oTGFtcGEuVGVtcGxhdGUuZ2V0KCdjdWJfaXB0dl9pY29uX2xvY2snLCB7fSwgdHJ1ZSksIExhbXBhLkxhbmcudHJhbnNsYXRlKCBMb2NrZWQuZmluZChMb2NrZWQuZm9ybWF0KCdjaGFubmVsJywgdGhpcy5vcmlnaW5hbCkpID8gJ2lwdHZfY2hhbm5lbF91bmxvY2snIDogJ2lwdHZfY2hhbm5lbF9sb2NrJyApLCAoKT0+e1xuICAgICAgICAgICAgbGV0IG5hbWUgPSBMYW1wYS5Db250cm9sbGVyLmVuYWJsZWQoKS5uYW1lXG5cbiAgICAgICAgICAgIGlmKExhbXBhLk1hbmlmZXN0LmFwcF9kaWdpdGFsID49IDIwNCl7XG4gICAgICAgICAgICAgICAgaWYoTG9ja2VkLmZpbmQoTG9ja2VkLmZvcm1hdCgnY2hhbm5lbCcsIHRoaXMub3JpZ2luYWwpKSl7XG4gICAgICAgICAgICAgICAgICAgIExhbXBhLlBhcmVudGFsQ29udHJvbC5xdWVyeSgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUobmFtZSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgTG9ja2VkLnJlbW92ZShMb2NrZWQuZm9ybWF0KCdjaGFubmVsJywgdGhpcy5vcmlnaW5hbCkpLmZpbmFsbHkoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScsIEJvb2xlYW4oTG9ja2VkLmZpbmQoTG9ja2VkLmZvcm1hdCgnY2hhbm5lbCcsIHRoaXMub3JpZ2luYWwpKSkpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyLnNlbmQoJ2FjdGlvbi1sb2NrZWQnLCB0aGlzLm9yaWdpbmFsKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSwoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUobmFtZSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgTG9ja2VkLmFkZChMb2NrZWQuZm9ybWF0KCdjaGFubmVsJywgdGhpcy5vcmlnaW5hbCkpLmZpbmFsbHkoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZC50b2dnbGVDbGFzcygnYWN0aXZlJywgQm9vbGVhbihMb2NrZWQuZmluZChMb2NrZWQuZm9ybWF0KCdjaGFubmVsJywgdGhpcy5vcmlnaW5hbCkpKSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lci5zZW5kKCdhY3Rpb24tbG9ja2VkJywgdGhpcy5vcmlnaW5hbClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIExhbXBhLk5vdHkuc2hvdyhMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl9uZWVkX3VwZGF0ZV9hcHAnKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBmYXZvcml0ZS50b2dnbGVDbGFzcygnYWN0aXZlJywgQm9vbGVhbihGYXZvcml0ZXMuZmluZCh0aGlzLm9yaWdpbmFsKSkpXG4gICAgICAgIGxvY2tlZC50b2dnbGVDbGFzcygnYWN0aXZlJywgQm9vbGVhbihMb2NrZWQuZmluZChMb2NrZWQuZm9ybWF0KCdjaGFubmVsJywgdGhpcy5vcmlnaW5hbCkpKSlcblxuICAgICAgICB0aGlzLmh0bWwuYXBwZW5kKGluZm8pXG4gICAgICAgIHRoaXMuaHRtbC5hcHBlbmQoZmF2b3JpdGUpXG4gICAgICAgIHRoaXMuaHRtbC5hcHBlbmQobG9ja2VkKVxuICAgIH1cblxuICAgIGJ1dHRvbihpY29uLCB0ZXh0LCBjYWxsKXtcbiAgICAgICAgbGV0IGJ1dHRvbiA9ICQoYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtaHVkLW1lbnUtYnV0dG9uIHNlbGVjdG9yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtaHVkLW1lbnUtYnV0dG9uX19pY29uXCI+JHtpY29ufTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LWh1ZC1tZW51LWJ1dHRvbl9fdGV4dFwiPiR7dGV4dH08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKVxuXG4gICAgICAgIGJ1dHRvbi5vbignaG92ZXI6ZW50ZXInLGNhbGwpXG5cbiAgICAgICAgcmV0dXJuIGJ1dHRvblswXVxuICAgIH1cblxuICAgIHRvZ2dsZSgpe1xuICAgICAgICBMYW1wYS5Db250cm9sbGVyLmFkZCgncGxheWVyX2lwdHZfaHVkX21lbnUnLHtcbiAgICAgICAgICAgIHRvZ2dsZTogKCk9PntcbiAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLmNvbGxlY3Rpb25TZXQodGhpcy5yZW5kZXIoKSlcbiAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLmNvbGxlY3Rpb25Gb2N1cyhmYWxzZSx0aGlzLnJlbmRlcigpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwOiAoKT0+e1xuICAgICAgICAgICAgICAgIE5hdmlnYXRvci5tb3ZlKCd1cCcpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG93bjogKCk9PntcbiAgICAgICAgICAgICAgICBOYXZpZ2F0b3IubW92ZSgnZG93bicpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmlnaHQ6ICgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lci5zZW5kKCd0b2dnbGVfcHJvZ3JhbScpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ29uZTogKCk9PntcbiAgICAgICAgICAgICAgICBsZXQgZm9jdXMgPSB0aGlzLmh0bWwuZmluZCgnLmZvY3VzJylcblxuICAgICAgICAgICAgICAgIGlmKGZvY3VzKSBmb2N1cy5yZW1vdmVDbGFzcygnZm9jdXMnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhY2s6ICgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lci5zZW5kKCdjbG9zZScpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ3BsYXllcl9pcHR2X2h1ZF9tZW51JylcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtbFxuICAgIH1cblxuICAgIGRlc3Ryb3koKXtcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSFVETWVudSIsImNsYXNzIEhVRFByb2dyYW17XG4gICAgY29uc3RydWN0b3IobGlzdGVuZXIsIGNoYW5uZWwsIHByb2dyYW0pe1xuICAgICAgICB0aGlzLmxpc3RlbmVyID0gbGlzdGVuZXJcbiAgICAgICAgdGhpcy5jaGFubmVsICA9IGNoYW5uZWxcblxuICAgICAgICB0aGlzLmh0bWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIH1cblxuICAgIGNyZWF0ZSgpe1xuICAgICAgICB0aGlzLmxpc3RlbmVyLmZvbGxvdygnc2V0X3Byb2dyYW1fZW5kbGVzcycsKGV2ZW50KT0+e1xuICAgICAgICAgICAgdGhpcy5lbmRsZXNzID0gZXZlbnQuZW5kbGVzc1xuXG4gICAgICAgICAgICB0aGlzLmh0bWwuYXBwZW5kKGV2ZW50LmVuZGxlc3MucmVuZGVyKCkpXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5saXN0ZW5lci5zZW5kKCdnZXRfcHJvZ3JhbV9lbmRsZXNzJylcbiAgICB9XG5cbiAgICB0b2dnbGUoKXtcbiAgICAgICAgTGFtcGEuQ29udHJvbGxlci5hZGQoJ3BsYXllcl9pcHR2X2h1ZF9wcm9ncmFtJyx7XG4gICAgICAgICAgICB0b2dnbGU6ICgpPT57XG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jb2xsZWN0aW9uU2V0KHRoaXMucmVuZGVyKCkpXG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jb2xsZWN0aW9uRm9jdXMoZmFsc2UsdGhpcy5yZW5kZXIoKSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cDogKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmVuZGxlc3MubW92ZSgtMSlcblxuICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuY29sbGVjdGlvblNldCh0aGlzLnJlbmRlcigpKVxuICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuY29sbGVjdGlvbkZvY3VzKGZhbHNlLHRoaXMucmVuZGVyKCkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG93bjogKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmVuZGxlc3MubW92ZSgxKVxuXG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jb2xsZWN0aW9uU2V0KHRoaXMucmVuZGVyKCkpXG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jb2xsZWN0aW9uRm9jdXMoZmFsc2UsdGhpcy5yZW5kZXIoKSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWZ0OiAoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXIuc2VuZCgndG9nZ2xlX21lbnUnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdvbmU6ICgpPT57XG4gICAgICAgICAgICAgICAgbGV0IGZvY3VzID0gdGhpcy5odG1sLmZpbmQoJy5mb2N1cycpXG5cbiAgICAgICAgICAgICAgICBpZihmb2N1cykgZm9jdXMucmVtb3ZlQ2xhc3MoJ2ZvY3VzJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXIuc2VuZCgnY2xvc2UnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdwbGF5ZXJfaXB0dl9odWRfcHJvZ3JhbScpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmh0bWxcbiAgICB9XG5cbiAgICBkZXN0cm95KCl7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhVRFByb2dyYW0iLCJpbXBvcnQgTWVudSBmcm9tICcuL21lbnUnXG5pbXBvcnQgUHJvZ3JhbSBmcm9tICcuL3Byb2dyYW0nXG5cbmNsYXNzIEhVRHtcbiAgICBjb25zdHJ1Y3RvcihjaGFubmVsLCBwcm9ncmFtKXtcbiAgICAgICAgdGhpcy5saXN0ZW5lciA9IExhbXBhLlN1YnNjcmliZSgpXG5cbiAgICAgICAgdGhpcy5tZW51ICAgID0gbmV3IE1lbnUodGhpcy5saXN0ZW5lciwgY2hhbm5lbCwgcHJvZ3JhbSlcbiAgICAgICAgdGhpcy5wcm9ncmFtID0gbmV3IFByb2dyYW0odGhpcy5saXN0ZW5lciwgY2hhbm5lbCwgcHJvZ3JhbSlcblxuICAgICAgICB0aGlzLmh1ZCA9IExhbXBhLlRlbXBsYXRlLmpzKCdjdWJfaXB0dl9odWQnKVxuXG4gICAgICAgIHRoaXMuaHVkLmZpbmQoJy5pcHR2LWh1ZF9fbWVudScpLmFwcGVuZCh0aGlzLm1lbnUucmVuZGVyKCkpXG4gICAgICAgIHRoaXMuaHVkLmZpbmQoJy5pcHR2LWh1ZF9fcHJvZ3JhbScpLmFwcGVuZCh0aGlzLnByb2dyYW0ucmVuZGVyKCkpXG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5maW5kKCcucGxheWVyJykuYXBwZW5kKHRoaXMuaHVkKVxuXG4gICAgICAgIHRoaXMubGlzdGVuKClcbiAgICB9XG5cbiAgICBjcmVhdGUoKXtcbiAgICAgICAgdGhpcy5tZW51LmNyZWF0ZSgpXG4gICAgICAgIHRoaXMucHJvZ3JhbS5jcmVhdGUoKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5tZW51LnRvZ2dsZSgpXG4gICAgfVxuXG4gICAgbGlzdGVuKCl7XG4gICAgICAgIHRoaXMubGlzdGVuZXIuZm9sbG93KCd0b2dnbGVfbWVudScsKCk9PntcbiAgICAgICAgICAgIHRoaXMubWVudS50b2dnbGUoKVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMubGlzdGVuZXIuZm9sbG93KCd0b2dnbGVfcHJvZ3JhbScsKCk9PntcbiAgICAgICAgICAgIHRoaXMucHJvZ3JhbS50b2dnbGUoKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGRlc3Ryb3koKXtcbiAgICAgICAgdGhpcy5tZW51LmRlc3Ryb3koKVxuICAgICAgICB0aGlzLnByb2dyYW0uZGVzdHJveSgpXG5cbiAgICAgICAgdGhpcy5odWQucmVtb3ZlKClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhVRCIsImltcG9ydCBBcGkgZnJvbSAnLi4vdXRpbHMvYXBpJ1xuaW1wb3J0IEljb25zIGZyb20gJy4vaWNvbnMnXG5pbXBvcnQgRGV0YWlscyBmcm9tICcuL2RldGFpbHMnXG5pbXBvcnQgTWVudSBmcm9tICcuL21lbnUnXG5pbXBvcnQgRVBHIGZyb20gJy4uL3V0aWxzL2VwZydcbmltcG9ydCBVdGlscyBmcm9tICcuLi91dGlscy91dGlscydcbmltcG9ydCBVcmwgZnJvbSAnLi4vdXRpbHMvdXJsJ1xuaW1wb3J0IEZhdm9yaXRlcyBmcm9tICcuLi91dGlscy9mYXZvcml0ZXMnXG5pbXBvcnQgSFVEIGZyb20gJy4uL2h1ZC9odWQnXG5pbXBvcnQgTG9ja2VkIGZyb20gJy4uL3V0aWxzL2xvY2tlZCdcbmltcG9ydCBQaWxvdCBmcm9tICcuLi91dGlscy9waWxvdCdcblxuY2xhc3MgQ2hhbm5lbHN7XG4gICAgY29uc3RydWN0b3IobGlzdGVuZXIpe1xuICAgICAgICB0aGlzLmxpc3RlbmVyID0gbGlzdGVuZXJcblxuICAgICAgICB0aGlzLmh0bWwgID0gTGFtcGEuVGVtcGxhdGUuanMoJ2N1Yl9pcHR2X2NvbnRlbnQnKVxuXG4gICAgICAgIHRoaXMuaW5uZXJfbGlzdGVuZXIgPSBMYW1wYS5TdWJzY3JpYmUoKVxuXG4gICAgICAgIHRoaXMubWVudSAgICA9IG5ldyBNZW51KHRoaXMuaW5uZXJfbGlzdGVuZXIpXG4gICAgICAgIHRoaXMuaWNvbnMgICA9IG5ldyBJY29ucyh0aGlzLmlubmVyX2xpc3RlbmVyKVxuICAgICAgICB0aGlzLmRldGFpbHMgPSBuZXcgRGV0YWlscyh0aGlzLmlubmVyX2xpc3RlbmVyKVxuXG4gICAgICAgIHRoaXMuaW5uZXJfbGlzdGVuZXIuZm9sbG93KCd0b2dnbGUnLG5hbWU9PntcbiAgICAgICAgICAgIHRoaXNbbmFtZV0udG9nZ2xlKClcblxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0aGlzW25hbWVdXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5pbm5lcl9saXN0ZW5lci5mb2xsb3coJ2JhY2snLCgpPT57XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyLnNlbmQoJ3BsYXlsaXN0LW1haW4nKVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuaW5uZXJfbGlzdGVuZXIuZm9sbG93KCdwbGF5Jyx0aGlzLnBsYXlDaGFubmVsLmJpbmQodGhpcykpXG5cbiAgICAgICAgdGhpcy5pbm5lcl9saXN0ZW5lci5mb2xsb3coJ3BsYXktYXJjaGl2ZScsdGhpcy5wbGF5QXJjaGl2ZS5iaW5kKHRoaXMpKVxuXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdGhpcy5tZW51XG5cbiAgICAgICAgdGhpcy5odG1sLmZpbmQoJy5pcHR2LWNvbnRlbnRfX21lbnUnKS5hcHBlbmQodGhpcy5tZW51LnJlbmRlcigpKVxuICAgICAgICB0aGlzLmh0bWwuZmluZCgnLmlwdHYtY29udGVudF9fY2hhbm5lbHMnKS5hcHBlbmQodGhpcy5pY29ucy5yZW5kZXIoKSlcbiAgICAgICAgdGhpcy5odG1sLmZpbmQoJy5pcHR2LWNvbnRlbnRfX2RldGFpbHMnKS5hcHBlbmQodGhpcy5kZXRhaWxzLnJlbmRlcigpKVxuICAgIH1cblxuICAgIGJ1aWxkKGRhdGEpe1xuICAgICAgICB0aGlzLmVtcHR5ID0gZmFsc2VcblxuICAgICAgICB0aGlzLm1lbnUuYnVpbGQoZGF0YSlcblxuICAgICAgICB0aGlzLmxpc3RlbmVyLnNlbmQoJ2Rpc3BsYXknLHRoaXMpXG4gICAgfVxuXG4gICAgYWRkVG9IaXN0b3J5KGNoYW5uZWwpe1xuICAgICAgICBsZXQgYm9hcmQgPSBMYW1wYS5TdG9yYWdlLmNhY2hlKCdpcHR2X3BsYXlfaGlzdG9yeV9tYWluX2JvYXJkJywyMCxbXSlcbiAgICAgICAgbGV0IGZpbmQgID0gYm9hcmQuZmluZChhPT5hLnVybCA9PSBjaGFubmVsLnVybClcblxuICAgICAgICBpZihmaW5kKSBMYW1wYS5BcnJheXMucmVtb3ZlKGJvYXJkLCBmaW5kKVxuXG4gICAgICAgIGJvYXJkLnB1c2goY2hhbm5lbClcblxuICAgICAgICBMYW1wYS5TdG9yYWdlLnNldCgnaXB0dl9wbGF5X2hpc3RvcnlfbWFpbl9ib2FyZCcsYm9hcmQpXG4gICAgfVxuXG4gICAgcGxheUFyY2hpdmUoZGF0YSl7XG4gICAgICAgIGxldCBjb252ZXJ0ID0gKHApPT57XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuVXRpbHMucGFyc2VUaW1lKHAuc3RhcnQpLnRpbWUgKyAnIC0gJyArIExhbXBhLlV0aWxzLmNhcGl0YWxpemVGaXJzdExldHRlcihwLnRpdGxlKSxcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXRlbS51cmwgPSBVcmwuY2F0Y2h1cFVybChkYXRhLmNoYW5uZWwudXJsLCBkYXRhLmNoYW5uZWwuY2F0Y2h1cC50eXBlLCBkYXRhLmNoYW5uZWwuY2F0Y2h1cC5zb3VyY2UpXG4gICAgICAgICAgICBpdGVtLnVybCA9IFVybC5wcmVwYXJlVXJsKGl0ZW0udXJsLCBwKVxuXG4gICAgICAgICAgICBpdGVtLm5lZWRfY2hlY2tfbGl2ZV9zdHJlYW0gPSB0cnVlXG5cbiAgICAgICAgICAgIHJldHVybiBpdGVtXG4gICAgICAgIH1cblxuICAgICAgICBMYW1wYS5QbGF5ZXIucnVuYXMoTGFtcGEuU3RvcmFnZS5maWVsZCgncGxheWVyX2lwdHYnKSlcblxuICAgICAgICBMYW1wYS5QbGF5ZXIucGxheShjb252ZXJ0KGRhdGEucHJvZ3JhbSkpXG4gICAgICAgIExhbXBhLlBsYXllci5wbGF5bGlzdChkYXRhLnBsYXlsaXN0Lm1hcChjb252ZXJ0KSlcbiAgICB9XG5cbiAgICBwbGF5Q2hhbm5lbChkYXRhKXtcbiAgICAgICAgbGV0IGNhY2hlID0ge31cbiAgICAgICAgICAgIGNhY2hlLm5vbmUgPSBbXVxuXG4gICAgICAgIGxldCB0aW1lXG4gICAgICAgIGxldCB1cGRhdGVcblxuICAgICAgICBsZXQgc3RhcnRfY2hhbm5lbCA9IExhbXBhLkFycmF5cy5jbG9uZSh0aGlzLmljb25zLmljb25zX2Nsb25lW2RhdGEucG9zaXRpb25dKVxuICAgICAgICAgICAgc3RhcnRfY2hhbm5lbC5vcmlnaW5hbCA9IHRoaXMuaWNvbnMuaWNvbnNfY2xvbmVbZGF0YS5wb3NpdGlvbl1cblxuICAgICAgICBkYXRhLnVybCA9IFVybC5wcmVwYXJlVXJsKHN0YXJ0X2NoYW5uZWwudXJsKVxuXG4gICAgICAgIGlmKHRoaXMuYXJjaGl2ZSAmJiB0aGlzLmFyY2hpdmUuY2hhbm5lbCA9PSBzdGFydF9jaGFubmVsLm9yaWdpbmFsKXtcbiAgICAgICAgICAgIGRhdGEudXJsID0gVXJsLmNhdGNodXBVcmwodGhpcy5hcmNoaXZlLmNoYW5uZWwudXJsLCB0aGlzLmFyY2hpdmUuY2hhbm5lbC5jYXRjaHVwLnR5cGUsIHRoaXMuYXJjaGl2ZS5jaGFubmVsLmNhdGNodXAuc291cmNlKVxuICAgICAgICAgICAgZGF0YS51cmwgPSBVcmwucHJlcGFyZVVybChkYXRhLnVybCwgdGhpcy5hcmNoaXZlLnByb2dyYW0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuYWRkVG9IaXN0b3J5KExhbXBhLkFycmF5cy5jbG9uZShzdGFydF9jaGFubmVsKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEubG9ja2VkID0gQm9vbGVhbihMb2NrZWQuZmluZChMb2NrZWQuZm9ybWF0KCdjaGFubmVsJywgc3RhcnRfY2hhbm5lbC5vcmlnaW5hbCkpKVxuXG4gICAgICAgIGRhdGEub25HZXRDaGFubmVsID0gKHBvc2l0aW9uKT0+e1xuICAgICAgICAgICAgbGV0IG9yaWdpbmFsICA9IHRoaXMuaWNvbnMuaWNvbnNfY2xvbmVbcG9zaXRpb25dXG4gICAgICAgICAgICBsZXQgY2hhbm5lbCAgID0gTGFtcGEuQXJyYXlzLmNsb25lKG9yaWdpbmFsKVxuICAgICAgICAgICAgbGV0IHRpbWVzaGlmdCA9IHRoaXMuYXJjaGl2ZSAmJiB0aGlzLmFyY2hpdmUuY2hhbm5lbCA9PSBvcmlnaW5hbCA/IHRoaXMuYXJjaGl2ZS50aW1lc2hpZnQgOiAwXG5cbiAgICAgICAgICAgIGNoYW5uZWwubmFtZSAgPSBVdGlscy5jbGVhckNoYW5uZWxOYW1lKGNoYW5uZWwubmFtZSlcbiAgICAgICAgICAgIGNoYW5uZWwuZ3JvdXAgPSBVdGlscy5jbGVhck1lbnVOYW1lKGNoYW5uZWwuZ3JvdXApXG4gICAgICAgICAgICBjaGFubmVsLnVybCAgID0gVXJsLnByZXBhcmVVcmwoY2hhbm5lbC51cmwpXG4gICAgICAgICAgICBjaGFubmVsLmljb25zID0gW11cblxuICAgICAgICAgICAgY2hhbm5lbC5vcmlnaW5hbCA9IG9yaWdpbmFsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHRpbWVzaGlmdCl7XG4gICAgICAgICAgICAgICAgY2hhbm5lbC5zaGlmdCA9IHRpbWVzaGlmdFxuXG4gICAgICAgICAgICAgICAgY2hhbm5lbC51cmwgPSBVcmwuY2F0Y2h1cFVybChvcmlnaW5hbC51cmwsIGNoYW5uZWwuY2F0Y2h1cC50eXBlLCBjaGFubmVsLmNhdGNodXAuc291cmNlKVxuICAgICAgICAgICAgICAgIGNoYW5uZWwudXJsID0gVXJsLnByZXBhcmVVcmwoY2hhbm5lbC51cmwsIHRoaXMuYXJjaGl2ZS5wcm9ncmFtKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihMb2NrZWQuZmluZChMb2NrZWQuZm9ybWF0KCdjaGFubmVsJywgb3JpZ2luYWwpKSl7XG4gICAgICAgICAgICAgICAgY2hhbm5lbC5sb2NrZWQgPSB0cnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKEJvb2xlYW4oRmF2b3JpdGVzLmZpbmQoY2hhbm5lbCkpKXtcbiAgICAgICAgICAgICAgICBjaGFubmVsLmljb25zLnB1c2goTGFtcGEuVGVtcGxhdGUuZ2V0KCdjdWJfaXB0dl9pY29uX2Zhdicse30sdHJ1ZSkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihCb29sZWFuKExvY2tlZC5maW5kKExvY2tlZC5mb3JtYXQoJ2NoYW5uZWwnLCBjaGFubmVsKSkpKXtcbiAgICAgICAgICAgICAgICBjaGFubmVsLmljb25zLnB1c2goTGFtcGEuVGVtcGxhdGUuZ2V0KCdjdWJfaXB0dl9pY29uX2xvY2snLHt9LHRydWUpKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1cGRhdGUgPSBmYWxzZVxuXG4gICAgICAgICAgICBpZihjaGFubmVsLmlkKXtcbiAgICAgICAgICAgICAgICBpZighY2FjaGVbY2hhbm5lbC5pZF0pe1xuICAgICAgICAgICAgICAgICAgICBjYWNoZVtjaGFubmVsLmlkXSA9IFtdXG5cbiAgICAgICAgICAgICAgICAgICAgQXBpLnByb2dyYW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogY2hhbm5lbC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbF9pZDogY2hhbm5lbC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR2ZzogY2hhbm5lbC50dmcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lOiBFUEcudGltZShjaGFubmVsLHRpbWVzaGlmdClcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbihwcm9ncmFtPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWNoZVtjaGFubmVsLmlkXSA9IHByb2dyYW1cbiAgICAgICAgICAgICAgICAgICAgfSkuZmluYWxseSgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuUGxheWVyLnByb2dyYW1SZWFkeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogY2hhbm5lbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogRVBHLnBvc2l0aW9uKGNoYW5uZWwsIGNhY2hlW2NoYW5uZWwuaWRdLCB0aW1lc2hpZnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsOiBjYWNoZVtjaGFubmVsLmlkXS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIExhbXBhLlBsYXllci5wcm9ncmFtUmVhZHkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogY2hhbm5lbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBFUEcucG9zaXRpb24oY2hhbm5lbCwgY2FjaGVbY2hhbm5lbC5pZF0sIHRpbWVzaGlmdCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbDogY2FjaGVbY2hhbm5lbC5pZF0ubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBMYW1wYS5QbGF5ZXIucHJvZ3JhbVJlYWR5KHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogY2hhbm5lbCxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsOiAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNoYW5uZWxcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEub25NZW51ID0gKGNoYW5uZWwpPT57XG4gICAgICAgICAgICB0aGlzLmh1ZCA9IG5ldyBIVUQoY2hhbm5lbClcblxuICAgICAgICAgICAgdGhpcy5odWQubGlzdGVuZXIuZm9sbG93KCdjbG9zZScsKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmh1ZCA9IHRoaXMuaHVkLmRlc3Ryb3koKVxuXG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ3BsYXllcl90dicpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB0aGlzLmh1ZC5saXN0ZW5lci5mb2xsb3coJ2dldF9wcm9ncmFtX2VuZGxlc3MnLCgpPT57XG4gICAgICAgICAgICAgICAgbGV0IHByb2dyYW0gPSBjYWNoZVtjaGFubmVsLmlkIHx8ICdub25lJ11cblxuICAgICAgICAgICAgICAgIGxldCBlbmRsZXNzID0gdGhpcy5kZXRhaWxzLnBsYXlsaXN0KGNoYW5uZWwsIHByb2dyYW0sIHtcbiAgICAgICAgICAgICAgICAgICAgb25QbGF5OiAocGFyYW0pPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5QbGF5ZXIuY2xvc2UoKVxuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5QXJjaGl2ZShwYXJhbSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICB0aGlzLmh1ZC5saXN0ZW5lci5zZW5kKCdzZXRfcHJvZ3JhbV9lbmRsZXNzJyx7ZW5kbGVzc30pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB0aGlzLmh1ZC5saXN0ZW5lci5mb2xsb3coJ2FjdGlvbi1mYXZvcml0ZScsKG9yaWcpPT57XG4gICAgICAgICAgICAgICAgTGFtcGEuUGxheWVySVBUVi5yZWRyYXdDaGFubmVsKClcblxuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJfbGlzdGVuZXIuc2VuZCgndXBkYXRlLWZhdm9yaXRlcycpXG5cbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyX2xpc3RlbmVyLnNlbmQoJ3VwZGF0ZS1jaGFubmVsLWljb24nLCBvcmlnKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy5odWQubGlzdGVuZXIuZm9sbG93KCdhY3Rpb24tbG9ja2VkJywob3JpZyk9PntcbiAgICAgICAgICAgICAgICBMYW1wYS5QbGF5ZXJJUFRWLnJlZHJhd0NoYW5uZWwoKVxuXG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lcl9saXN0ZW5lci5zZW5kKCd1cGRhdGUtY2hhbm5lbC1pY29uJywgb3JpZylcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHRoaXMuaHVkLmNyZWF0ZSgpXG4gICAgICAgIH1cblxuICAgICAgICAvL9GD0YHRgtCw0YDQtdC70L4sINC/0L7RgtC+0Lwg0YPQtNCw0LvQuNGC0YxcbiAgICAgICAgZGF0YS5vblBsYXlsaXN0UHJvZ3JhbSA9IChjaGFubmVsKT0+e1xuICAgICAgICAgICAgbGV0IHByb2dyYW0gPSBjYWNoZVtjaGFubmVsLmlkIHx8ICdub25lJ11cblxuICAgICAgICAgICAgaWYoIXByb2dyYW0ubGVuZ3RoKSByZXR1cm5cblxuICAgICAgICAgICAgbGV0IGh0bWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gICAgICAgICAgICBodG1sLnN0eWxlLmxpbmVIZWlnaHQgPSAnMS40J1xuXG4gICAgICAgICAgICBMYW1wYS5Nb2RhbC5vcGVuKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJycsXG4gICAgICAgICAgICAgICAgc2l6ZTogJ21lZGl1bScsXG4gICAgICAgICAgICAgICAgaHRtbDogJChodG1sKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgbGV0IGVuZGxlc3MgPSB0aGlzLmRldGFpbHMucGxheWxpc3QoY2hhbm5lbCwgcHJvZ3JhbSwge1xuICAgICAgICAgICAgICAgIG9uUGxheTogKHBhcmFtKT0+e1xuICAgICAgICAgICAgICAgICAgICBMYW1wYS5Nb2RhbC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLlBsYXllci5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5QXJjaGl2ZShwYXJhbSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBodG1sLmFwcGVuZChlbmRsZXNzLnJlbmRlcigpKVxuXG4gICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLmFkZCgnbW9kYWwnLHtcbiAgICAgICAgICAgICAgICBpbnZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgdG9nZ2xlOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLmNvbGxlY3Rpb25TZXQoaHRtbClcbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jb2xsZWN0aW9uRm9jdXMoZmFsc2UsaHRtbClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHVwOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICBlbmRsZXNzLm1vdmUoLTEpXG5cbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jb2xsZWN0aW9uU2V0KGh0bWwpXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuY29sbGVjdGlvbkZvY3VzKGZhbHNlLGh0bWwpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkb3duOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICBlbmRsZXNzLm1vdmUoMSlcblxuICAgICAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLmNvbGxlY3Rpb25TZXQoaHRtbClcbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jb2xsZWN0aW9uRm9jdXMoZmFsc2UsaHRtbClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJhY2s6ICgpPT57XG4gICAgICAgICAgICAgICAgICAgIExhbXBhLk1vZGFsLmNsb3NlKClcblxuICAgICAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgncGxheWVyX3R2JylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnbW9kYWwnKVxuICAgICAgICB9XG5cbiAgICAgICAgZGF0YS5vblBsYXkgPSAoY2hhbm5lbCk9PntcbiAgICAgICAgICAgIFBpbG90Lm5vdGVib29rKCdjaGFubmVsJywgdGhpcy5pY29ucy5pY29uc19jbG9uZS5pbmRleE9mKGNoYW5uZWwub3JpZ2luYWwpKVxuXG4gICAgICAgICAgICBpZihjaGFubmVsLm9yaWdpbmFsLmFkZGVkKXtcbiAgICAgICAgICAgICAgICBjaGFubmVsLm9yaWdpbmFsLnZpZXcrK1xuXG4gICAgICAgICAgICAgICAgRmF2b3JpdGVzLnVwZGF0ZShjaGFubmVsLm9yaWdpbmFsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZGF0YS5vbkdldFByb2dyYW0gPSAoY2hhbm5lbCwgcG9zaXRpb24sIGNvbnRhaW5lcik9PntcbiAgICAgICAgICAgIHVwZGF0ZSA9IGZhbHNlXG5cbiAgICAgICAgICAgIGxldCB0aW1lc2hpZnQgPSBjaGFubmVsLnNoaWZ0IHx8IDBcblxuICAgICAgICAgICAgbGV0IHByb2dyYW0gPSBjYWNoZVtjaGFubmVsLmlkIHx8ICdub25lJ11cbiAgICAgICAgICAgIGxldCBub3Byb2cgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgICBub3Byb2cuYWRkQ2xhc3MoJ3BsYXllci1wYW5lbC1pcHR2LWl0ZW1fX3Byb2ctbG9hZCcpXG4gICAgICAgICAgICAgICAgbm9wcm9nLnRleHQoTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2lwdHZfbm9wcm9ncmFtJykpXG5cbiAgICAgICAgICAgIGNvbnRhaW5lclswXS5lbXB0eSgpLmFwcGVuZChub3Byb2cpXG5cbiAgICAgICAgICAgIGlmKHByb2dyYW0ubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBFUEcucG9zaXRpb24oY2hhbm5lbCwgcHJvZ3JhbSwgdGltZXNoaWZ0KVxuICAgICAgICAgICAgICAgIGxldCBsaXN0ICA9IHByb2dyYW0uc2xpY2UocG9zaXRpb24sIHBvc2l0aW9uICsgMilcbiAgICAgICAgICAgICAgICBsZXQgbm93ICAgPSBwcm9ncmFtW3N0YXJ0XVxuXG4gICAgICAgICAgICAgICAgaWYobGlzdC5sZW5ndGgpIGNvbnRhaW5lclswXS5lbXB0eSgpXG5cbiAgICAgICAgICAgICAgICBsaXN0LmZvckVhY2gocHJvZz0+e1xuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENsYXNzKCdwbGF5ZXItcGFuZWwtaXB0di1pdGVtX19wcm9nLWl0ZW0nKVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLmh0bWwoTGFtcGEuVXRpbHMucGFyc2VUaW1lKHByb2cuc3RhcnQpLnRpbWUgKyAobm93ID09IHByb2cgPyAnIC0gJyArIExhbXBhLlV0aWxzLnBhcnNlVGltZShwcm9nLnN0b3ApLnRpbWUgOiAnJykgKyAnICZuYnNwOyAnICsgVXRpbHMuY2xlYXIocHJvZy50aXRsZSkpXG5cbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hcHBlbmQoc3BhbilcblxuICAgICAgICAgICAgICAgICAgICBpZihub3cgPT0gcHJvZyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENsYXNzKCd3YXRjaCcpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aW1lbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmUuYWRkQ2xhc3MoJ3BsYXllci1wYW5lbC1pcHR2LWl0ZW1fX3Byb2ctdGltZWxpbmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUud2lkdGggPSBFUEcudGltZWxpbmUoY2hhbm5lbCwgcHJvZywgdGltZXNoaWZ0KSArICclJ1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZS5hcHBlbmQoZGl2KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGUgPSAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwZXJjZW50ID0gRVBHLnRpbWVsaW5lKGNoYW5uZWwsIHByb2csIHRpbWVzaGlmdClcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS53aWR0aCA9IHBlcmNlbnQgKyAnJSdcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBlcmNlbnQgPT0gMTAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHQgPSBFUEcucG9zaXRpb24oY2hhbm5lbCwgcHJvZ3JhbSwgdGltZXNoaWZ0KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHN0YXJ0ICE9PSBuZXh0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLlBsYXllci5wcm9ncmFtUmVhZHkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWw6IGNoYW5uZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IG5leHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWw6IGNhY2hlW2NoYW5uZWwuaWRdLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hcHBlbmQodGltZWxpbmUpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJbMF0uYXBwZW5kKGl0ZW0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIExhbXBhLlBsYXllci5pcHR2KGRhdGEpXG5cbiAgICAgICAgdGltZSA9IHNldEludGVydmFsKCgpPT57XG4gICAgICAgICAgICBpZih1cGRhdGUpIHVwZGF0ZSgpXG4gICAgICAgIH0sMTAwMCAqIDEwKVxuXG4gICAgICAgIGxldCBkZXN0cm95ID0gKCk9PntcbiAgICAgICAgICAgIExhbXBhLlBsYXllci5saXN0ZW5lci5yZW1vdmUoJ2Rlc3Ryb3knLCBkZXN0cm95KVxuXG4gICAgICAgICAgICBjYWNoZSAgPSBudWxsXG4gICAgICAgICAgICB1cGRhdGUgPSBudWxsXG5cbiAgICAgICAgICAgIHRoaXMuYXJjaGl2ZSA9IGZhbHNlXG5cbiAgICAgICAgICAgIGlmKHRoaXMuaHVkKSB0aGlzLmh1ZCA9IHRoaXMuaHVkLmRlc3Ryb3koKVxuXG4gICAgICAgICAgICBQaWxvdC5ub3RlYm9vaygnY2hhbm5lbCcsIC0xKVxuXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWUpXG4gICAgICAgIH1cblxuICAgICAgICBMYW1wYS5QbGF5ZXIubGlzdGVuZXIuZm9sbG93KCdkZXN0cm95JyxkZXN0cm95KVxuICAgIH1cblxuICAgIHRvZ2dsZSgpe1xuICAgICAgICBpZih0aGlzLmVtcHR5KXtcbiAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuYWRkKCdjb250ZW50Jyx7XG4gICAgICAgICAgICAgICAgaW52aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRvZ2dsZTogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jbGVhcigpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsZWZ0OiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnbWVudScpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB1cDogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ2hlYWQnKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYmFjazogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lci5zZW5kKCdwbGF5bGlzdC1tYWluJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ2NvbnRlbnQnKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgdGhpcy5hY3RpdmUudG9nZ2xlKClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHkgPyB0aGlzLmVtcHR5LnJlbmRlcih0cnVlKSA6IHRoaXMuaHRtbFxuICAgIH1cblxuICAgIGxvYWQocGxheWxpc3Qpe1xuICAgICAgICB0aGlzLmxpc3RlbmVyLnNlbmQoJ2xvYWRpbmcnKVxuXG4gICAgICAgIEFwaS5wbGF5bGlzdChwbGF5bGlzdCkudGhlbih0aGlzLmJ1aWxkLmJpbmQodGhpcykpLmNhdGNoKGU9PntcbiAgICAgICAgICAgIGxldCBtc2cgPSAnJ1xuXG4gICAgICAgICAgICBpZih0eXBlb2YgZSA9PSAnc3RyaW5nJykgbXNnID0gZVxuICAgICAgICAgICAgZWxzZSBpZih0eXBlb2YgZS5yZXNwb25zZUpTT04gIT09ICd1bmRlZmluZWQnICYmIGUucmVzcG9uc2VKU09OLnRleHQpICBtc2cgPSBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndG9ycmVudF9lcnJvcl9jb25uZWN0JykgKyAnOiAnICsgZS5yZXNwb25zZUpTT04udGV4dCArIChlLnJlc3BvbnNlSlNPTi5jb2RlID8gJyBbJytlLnJlc3BvbnNlSlNPTi5jb2RlKyddJyA6ICcnKVxuICAgICAgICAgICAgZWxzZSBpZih0eXBlb2YgZS5zdGF0dXMgIT09ICd1bmRlZmluZWQnKSAgbXNnID0gTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RvcnJlbnRfZXJyb3JfY29ubmVjdCcpICsgJzogWycgKyBlLnN0YXR1cyArICddJyArIChlLmZyb21fZXJyb3IgPyAnIFsnK2UuZnJvbV9lcnJvcisnXScgOiAnJylcbiAgICAgICAgICAgIGVsc2UgaWYodHlwZW9mIGUubWVzc2FnZSAhPT0gJ3VuZGVmaW5lZCcpIG1zZyA9IGUubWVzc2FnZVxuXG4gICAgICAgICAgICB0aGlzLmVtcHR5ID0gbmV3IExhbXBhLkVtcHR5KHtkZXNjcjogJzxkaXYgc3R5bGU9XCJ3aWR0aDogNjAlOyBtYXJnaW46MCBhdXRvOyBsaW5lLWhlaWdodDogMS40XCI+JytMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl9ub2xvYWRfcGxheWxpc3QnKSArIChtc2cgPyAnPGJyPjxicj4nICsgbXNnIDogJycpICsnPC9kaXY+J30pXG5cbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXIuc2VuZCgnZGlzcGxheScsdGhpcylcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBkZXN0cm95KCl7XG4gICAgICAgIHRoaXMubWVudS5kZXN0cm95KClcbiAgICAgICAgdGhpcy5pY29ucy5kZXN0cm95KClcbiAgICAgICAgdGhpcy5kZXRhaWxzLmRlc3Ryb3koKVxuXG4gICAgICAgIHRoaXMuaW5uZXJfbGlzdGVuZXIuZGVzdHJveSgpXG5cbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZVxuXG4gICAgICAgIHRoaXMuZXBnX2NhY2hlID0gbnVsbFxuXG4gICAgICAgIHRoaXMuaHRtbC5yZW1vdmUoKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbHMiLCJpbXBvcnQgUGxheWxpc3QgZnJvbSAnLi9wbGF5bGlzdC9tYWluJ1xuaW1wb3J0IENoYW5uZWxzIGZyb20gJy4vY2hhbm5lbHMvbWFpbidcblxuZnVuY3Rpb24gQ29tcG9uZW50KCl7XG4gICAgbGV0IGh0bWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIFxuICAgIGxldCBsaXN0ZW5lclxuICAgIGxldCBwbGF5bGlzdFxuICAgIGxldCBjaGFubmVsc1xuICAgIGxldCBpbml0aWFsaXplZFxuXG4gICAgd2luZG93LmlwdHZfbW9iaWxlID0gd2luZG93LmlubmVyV2lkdGggPCA3NjhcblxuICAgIGlmKExhbXBhLk1hbmlmZXN0LmFwcF9kaWdpdGFsID49IDE4NSl7XG4gICAgICAgIGxpc3RlbmVyID0gTGFtcGEuU3Vic2NyaWJlKClcbiAgICAgICAgcGxheWxpc3QgPSBuZXcgUGxheWxpc3QobGlzdGVuZXIpXG4gICAgICAgIGNoYW5uZWxzID0gbmV3IENoYW5uZWxzKGxpc3RlbmVyKVxuICAgIH1cbiAgICBcbiAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcigpIFxuICAgIH1cblxuICAgIHRoaXMuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuYWN0aXZpdHkubG9hZGVyKHRydWUpXG5cbiAgICAgICAgaWYoTGFtcGEuTWFuaWZlc3QuYXBwX2RpZ2l0YWwgPj0gMTg1KXtcbiAgICAgICAgICAgIGxpc3RlbmVyLmZvbGxvdygnZGlzcGxheScsKGNvbnRyb2xsZXIpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBjb250cm9sbGVyXG5cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkoY29udHJvbGxlci5yZW5kZXIoKSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGxpc3RlbmVyLmZvbGxvdygnbG9hZGluZycsdGhpcy5sb2FkaW5nLmJpbmQodGhpcykpXG5cbiAgICAgICAgICAgIGxpc3RlbmVyLmZvbGxvdygnY2hhbm5lbHMtbG9hZCcsY2hhbm5lbHMubG9hZC5iaW5kKGNoYW5uZWxzKSlcbiAgICAgICAgICAgIGxpc3RlbmVyLmZvbGxvdygncGxheWxpc3QtbWFpbicscGxheWxpc3QubWFpbi5iaW5kKHBsYXlsaXN0KSlcblxuICAgICAgICAgICAgcGxheWxpc3QubG9hZCgpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGxldCBvbGQgPSBMYW1wYS5UZW1wbGF0ZS5nZXQoJ2N1Yl9pcHR2X2xpc3QnKVxuXG4gICAgICAgICAgICBvbGQuZmluZCgnLmlwdHYtbGlzdF9fdGl0bGUnKS50ZXh0KExhbXBhLkxhbmcudHJhbnNsYXRlKCdpcHR2X3VwZGF0ZV9hcHBfdGl0bGUnKSlcbiAgICAgICAgICAgIG9sZC5maW5kKCcuaXB0di1saXN0X190ZXh0JykudGV4dChMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl91cGRhdGVfYXBwX3RleHQnKSlcblxuICAgICAgICAgICAgJChodG1sKS5hcHBlbmQob2xkKVxuXG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5LmxvYWRlcihmYWxzZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHdpbmRvdy5pcHR2X21vYmlsZSkgaHRtbC5hZGRDbGFzcygnaXB0di1tb2JpbGUnKVxuICAgIH1cblxuICAgIHRoaXMucGxheWxpc3QgPSBmdW5jdGlvbigpe1xuICAgICAgICBwbGF5bGlzdC5tYWluKClcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRpbmcgPSBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmFjdGl2aXR5LmxvYWRlcih0cnVlKVxuXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2VcblxuICAgICAgICB0aGlzLnN0YXJ0KClcbiAgICB9XG5cbiAgICB0aGlzLmRpc3BsYXkgPSBmdW5jdGlvbihyZW5kZXIpe1xuICAgICAgICBodG1sLmVtcHR5KCkuYXBwZW5kKHJlbmRlcilcblxuICAgICAgICBMYW1wYS5MYXllci51cGRhdGUoaHRtbClcbiAgICAgICAgTGFtcGEuTGF5ZXIudmlzaWJsZShodG1sKVxuXG4gICAgICAgIHRoaXMuYWN0aXZpdHkubG9hZGVyKGZhbHNlKVxuXG4gICAgICAgIHRoaXMuc3RhcnQoKVxuICAgIH1cblxuICAgIHRoaXMuYmFja2dyb3VuZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIExhbXBhLkJhY2tncm91bmQuaW1tZWRpYXRlbHkoJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ2dBQUFBWkNBWUFBQUJEMkd4bEFBQUFDWEJJV1hNQUFBc1RBQUFMRXdFQW1wd1lBQUFBQVhOU1IwSUFyczRjNlFBQUFBUm5RVTFCQUFDeGp3djhZUVVBQUFIQVNVUkJWSGdCbFphTHJzTWdERU5YeEFmMy85WEhGZFhOWkxtMllaSFF5bVBrNENTMDI3N3Y5K2ZmcnV0NjJuRWNuL004bnpiNjljeGo2bGUxKzc1Zi9ScXJaOWZhdG0zRjl3d01SN3loYXdpbE5rZTRHaXMvN2o5c3JRYmRhVkZCbmtjUTFXcmZnbUlJQmNUcnZncXFzS2lUenZwT1FiVW5BeWtWVzRWVnFaWHl5RGxsWUZTS3g5UWFWck83bkdKSUI2M2crRkFxL3hoY0hXQllkd0NzbUF0dkZaVUtFME1sVlpXQ1Q0aWRPbHloVHAzSzM1Ui82TnpscTB1Qm5zS1dsRXpnU2gxVkdKeHY2cm1wWE1PN0VLK1hXVVBuREZSV3FpdFFGZVkyVXlaVnJ5dVdsSTh1bExnR2YxOUZvb0FVd0M5Z0NXTGN3eldQYjdXYTYwcWRsWnhqeDZvb1V1VXFWUXNLK3kxVm9BSnlCZUpBVnNMSmVZbWcvUklYZEcya1Bod1lQQlVRUXlZRjBYQzhsd1AzTVRDcllBWEI4ODU1NnBlQ2JVVVpWN1djY3drVVFmQ1pDNFBYZEE1aEtoU1ZoeXRoWnFqWk0wSjM5dzVtOEJSYWRLQWNyc0lwTlpzTElZZE9xY1o5aEV4aFoxTUgrUUwrY2lGelh6bVloWnIvTTZ5VVV3cDJkcDVVNG5hWkR3QUY1SlJTZWZkU2NKWjNTa1Uwbmw4eHBhQXkrN21sMUVxdk1YU3MxSFJyWjliYzNlWlVTWG1HYS9tZHlqYm1xeVg3QTlSYVlRYTlJUkowQUFBQUFFbEZUa1N1UW1DQycpXG4gICAgfVxuXG4gICAgdGhpcy5zdGFydCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKExhbXBhLkFjdGl2aXR5LmFjdGl2ZSgpICYmIExhbXBhLkFjdGl2aXR5LmFjdGl2ZSgpLmFjdGl2aXR5ICE9PSB0aGlzLmFjdGl2aXR5KSByZXR1cm5cblxuICAgICAgICBpZighaW5pdGlhbGl6ZWQpe1xuICAgICAgICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlXG5cbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJhY2tncm91bmQoKVxuXG4gICAgICAgIExhbXBhLkNvbnRyb2xsZXIuYWRkKCdjb250ZW50Jyx7XG4gICAgICAgICAgICBpbnZpc2libGU6IHRydWUsXG4gICAgICAgICAgICB0b2dnbGU6ICgpPT57XG4gICAgICAgICAgICAgICAgaWYodGhpcy5hY3RpdmUpIHRoaXMuYWN0aXZlLnRvZ2dsZSgpXG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jb2xsZWN0aW9uU2V0KGh0bWwpXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuY29sbGVjdGlvbkZvY3VzKGZhbHNlLGh0bWwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZnQ6ICgpPT57XG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ21lbnUnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwOiAoKT0+e1xuICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdoZWFkJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgIExhbXBhLkFjdGl2aXR5LmJhY2t3YXJkKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnY29udGVudCcpXG4gICAgfVxuXG5cbiAgICB0aGlzLnBhdXNlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgdGhpcy5zdG9wID0gZnVuY3Rpb24oKXtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXIgPSBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gaHRtbFxuICAgIH1cblxuICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHBsYXlsaXN0KSBwbGF5bGlzdC5kZXN0cm95KClcbiAgICAgICAgaWYoY2hhbm5lbHMpIGNoYW5uZWxzLmRlc3Ryb3koKVxuICAgICAgICBcbiAgICAgICAgbGlzdGVuZXIuZGVzdHJveSgpXG5cbiAgICAgICAgaHRtbC5yZW1vdmUoKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50IiwiY29uc3QgVW5wYWNrU3RyZWFtPWZ1bmN0aW9uKCl7dmFyIHQ9e30sbj1VaW50OEFycmF5LGk9VWludDE2QXJyYXksZT1VaW50MzJBcnJheSxyPW5ldyBuKDApLGE9bmV3IG4oWzAsMCwwLDAsMCwwLDAsMCwxLDEsMSwxLDIsMiwyLDIsMywzLDMsMyw0LDQsNCw0LDUsNSw1LDUsMCwwLDAsMF0pLHM9bmV3IG4oWzAsMCwwLDAsMSwxLDIsMiwzLDMsNCw0LDUsNSw2LDYsNyw3LDgsOCw5LDksMTAsMTAsMTEsMTEsMTIsMTIsMTMsMTMsMCwwXSksbz1uZXcgbihbMTYsMTcsMTgsMCw4LDcsOSw2LDEwLDUsMTEsNCwxMiwzLDEzLDIsMTQsMSwxNV0pLGg9ZnVuY3Rpb24odCxuKXtmb3IodmFyIHI9bmV3IGkoMzEpLGE9MDthPDMxOysrYSlyW2FdPW4rPTE8PHRbYS0xXTtmb3IodmFyIHM9bmV3IGUoclszMF0pLG89MTtvPDMwOysrbylmb3IodmFyIGg9cltvXTtoPHJbbysxXTsrK2gpc1toXT1oLXJbb108PDV8bztyZXR1cm5bcixzXX0sZj1oKGEsMiksbD1mWzBdLHA9ZlsxXTtsWzI4XT0yNTgscFsyNThdPTI4O3ZhciB2LHU9aChzLDApWzBdLGQ9bmV3IGkoMzI3NjgpO2Zvcih2PTA7djwzMjc2ODsrK3Ype3ZhciBjPSg0MzY5MCZ2KT4+PjF8KDIxODQ1JnYpPDwxO2M9KDYxNjgwJihjPSg1MjQyOCZjKT4+PjJ8KDEzMTA3JmMpPDwyKSk+Pj40fCgzODU1JmMpPDw0LGRbdl09KCg2NTI4MCZjKT4+Pjh8KDI1NSZjKTw8OCk+Pj4xfXZhciBnPWZ1bmN0aW9uKHQsbixlKXtmb3IodmFyIHI9dC5sZW5ndGgsYT0wLHM9bmV3IGkobik7YTxyOysrYSl0W2FdJiYrK3NbdFthXS0xXTt2YXIgbyxoPW5ldyBpKG4pO2ZvcihhPTA7YTxuOysrYSloW2FdPWhbYS0xXStzW2EtMV08PDE7aWYoZSl7bz1uZXcgaSgxPDxuKTt2YXIgZj0xNS1uO2ZvcihhPTA7YTxyOysrYSlpZih0W2FdKWZvcih2YXIgbD1hPDw0fHRbYV0scD1uLXRbYV0sdj1oW3RbYV0tMV0rKzw8cCx1PXZ8KDE8PHApLTE7djw9dTsrK3Ypb1tkW3ZdPj4+Zl09bH1lbHNlIGZvcihvPW5ldyBpKHIpLGE9MDthPHI7KythKXRbYV0mJihvW2FdPWRbaFt0W2FdLTFdKytdPj4+MTUtdFthXSk7cmV0dXJuIG99LHc9bmV3IG4oMjg4KTtmb3Iodj0wO3Y8MTQ0Oysrdil3W3ZdPTg7Zm9yKHY9MTQ0O3Y8MjU2Oysrdil3W3ZdPTk7Zm9yKHY9MjU2O3Y8MjgwOysrdil3W3ZdPTc7Zm9yKHY9MjgwO3Y8Mjg4Oysrdil3W3ZdPTg7dmFyIHk9bmV3IG4oMzIpO2Zvcih2PTA7djwzMjsrK3YpeVt2XT01O3ZhciBtPWcodyw5LDEpLGI9Zyh5LDUsMSksVD1mdW5jdGlvbih0KXtmb3IodmFyIG49dFswXSxpPTE7aTx0Lmxlbmd0aDsrK2kpdFtpXT5uJiYobj10W2ldKTtyZXR1cm4gbn0sRT1mdW5jdGlvbih0LG4saSl7dmFyIGU9bi84fDA7cmV0dXJuKHRbZV18dFtlKzFdPDw4KT4+KDcmbikmaX0saz1mdW5jdGlvbih0LG4pe3ZhciBpPW4vOHwwO3JldHVybih0W2ldfHRbaSsxXTw8OHx0W2krMl08PDE2KT4+KDcmbil9LEM9ZnVuY3Rpb24odCxyLGEpeyhudWxsPT1yfHxyPDApJiYocj0wKSwobnVsbD09YXx8YT50Lmxlbmd0aCkmJihhPXQubGVuZ3RoKTt2YXIgcz1uZXcoMj09PXQuQllURVNfUEVSX0VMRU1FTlQ/aTo0PT09dC5CWVRFU19QRVJfRUxFTUVOVD9lOm4pKGEtcik7cmV0dXJuIHMuc2V0KHQuc3ViYXJyYXkocixhKSksc307dC5GbGF0ZUVycm9yQ29kZT17VW5leHBlY3RlZEVPRjowLEludmFsaWRCbG9ja1R5cGU6MSxJbnZhbGlkTGVuZ3RoTGl0ZXJhbDoyLEludmFsaWREaXN0YW5jZTozLFN0cmVhbUZpbmlzaGVkOjQsTm9TdHJlYW1IYW5kbGVyOjUsSW52YWxpZEhlYWRlcjo2LE5vQ2FsbGJhY2s6NyxJbnZhbGlkVVRGODo4LEV4dHJhRmllbGRUb29Mb25nOjksSW52YWxpZERhdGU6MTAsRmlsZW5hbWVUb29Mb25nOjExLFN0cmVhbUZpbmlzaGluZzoxMixJbnZhbGlkWmlwRGF0YToxMyxVbmtub3duQ29tcHJlc3Npb25NZXRob2Q6MTR9O3ZhciBGPVtcInVuZXhwZWN0ZWQgRU9GXCIsXCJpbnZhbGlkIGJsb2NrIHR5cGVcIixcImludmFsaWQgbGVuZ3RoL2xpdGVyYWxcIixcImludmFsaWQgZGlzdGFuY2VcIixcInN0cmVhbSBmaW5pc2hlZFwiLFwibm8gc3RyZWFtIGhhbmRsZXJcIixcImludmFsaWQgaGVhZGVyXCIsXCJubyBjYWxsYmFja1wiLFwiaW52YWxpZCBVVEYtOCBkYXRhXCIsXCJleHRyYSBmaWVsZCB0b28gbG9uZ1wiLFwiZGF0ZSBub3QgaW4gcmFuZ2UgMTk4MC0yMDk5XCIsXCJmaWxlbmFtZSB0b28gbG9uZ1wiLFwic3RyZWFtIGZpbmlzaGluZ1wiLFwiaW52YWxpZCB6aXAgZGF0YVwiLFwiZGV0ZXJtaW5lZCBieSB1bmtub3duIGNvbXByZXNzaW9uIG1ldGhvZFwiXSxTPWZ1bmN0aW9uKHQsbixpKXt2YXIgZT1uZXcgRXJyb3Iobnx8Rlt0XSk7aWYoZS5jb2RlPXQsIWkpdGhyb3cgZTtyZXR1cm4gZX0seD1mdW5jdGlvbigpe2Z1bmN0aW9uIHQodCl7dGhpcy5zPXt9LHRoaXMucD1uZXcgbigwKSx0aGlzLm9uZGF0YT10fXJldHVybiB0LnByb3RvdHlwZS5lPWZ1bmN0aW9uKHQpe3RoaXMub25kYXRhfHxTKDUpLHRoaXMuZCYmUyg0KTt2YXIgaT10aGlzLnAubGVuZ3RoLGU9bmV3IG4oaSt0Lmxlbmd0aCk7ZS5zZXQodGhpcy5wKSxlLnNldCh0LGkpLHRoaXMucD1lfSx0LnByb3RvdHlwZS5jPWZ1bmN0aW9uKHQpe3RoaXMuZD10aGlzLnMuaT10fHwhMTt2YXIgaT10aGlzLnMuYixlPWZ1bmN0aW9uKHQsaSxlKXt2YXIgcj10Lmxlbmd0aDtpZighcnx8ZSYmZS5mJiYhZS5sKXJldHVybiBpfHxuZXcgbigwKTt2YXIgaD0haXx8ZSxmPSFlfHxlLmk7ZXx8KGU9e30pLGl8fChpPW5ldyBuKDMqcikpO3ZhciBwPWZ1bmN0aW9uKHQpe3ZhciBlPWkubGVuZ3RoO2lmKHQ+ZSl7dmFyIHI9bmV3IG4oTWF0aC5tYXgoMiplLHQpKTtyLnNldChpKSxpPXJ9fSx2PWUuZnx8MCxkPWUucHx8MCxjPWUuYnx8MCx3PWUubCx5PWUuZCxGPWUubSx4PWUubixJPTgqcjtkb3tpZighdyl7dj1FKHQsZCwxKTt2YXIgVT1FKHQsZCsxLDMpO2lmKGQrPTMsIVUpe3ZhciBEPTQrKChkKzcpLzh8MCksTD10W0QtNF18dFtELTNdPDw4LHo9RCtMO2lmKHo+cil7ZiYmUygwKTticmVha31oJiZwKGMrTCksaS5zZXQodC5zdWJhcnJheShELHopLGMpLGUuYj1jKz1MLGUucD1kPTgqeixlLmY9djtjb250aW51ZX1pZigxPT09VSl3PW0seT1iLEY9OSx4PTU7ZWxzZSBpZigyPT09VSl7dmFyIEI9RSh0LGQsMzEpKzI1NyxNPUUodCxkKzEwLDE1KSs0LE49QitFKHQsZCs1LDMxKSsxO2QrPTE0O3ZhciBfLEE9bmV3IG4oTiksRz1uZXcgbigxOSk7Zm9yKF89MDtfPE07KytfKUdbb1tfXV09RSh0LGQrMypfLDcpO2QrPTMqTTt2YXIgSD1UKEcpLE89KDE8PEgpLTEsUD1nKEcsSCwxKTtmb3IoXz0wO188Tjspe3ZhciBSPVBbRSh0LGQsTyldO2QrPTE1JlI7dmFyIFk9Uj4+PjQ7aWYoWTwxNilBW18rK109WTtlbHNle3ZhciBaPTAsaj0wO2ZvcigxNj09PVk/KGo9MytFKHQsZCwzKSxkKz0yLFo9QVtfLTFdKToxNz09PVk/KGo9MytFKHQsZCw3KSxkKz0zKToxOD09PVkmJihqPTExK0UodCxkLDEyNyksZCs9Nyk7ai0tOylBW18rK109Wn19dmFyIHE9QS5zdWJhcnJheSgwLEIpLEo9QS5zdWJhcnJheShCKTtGPVQocSkseD1UKEopLHc9ZyhxLEYsMSkseT1nKEoseCwxKX1lbHNlIFMoMSk7aWYoZD5JKXtmJiZTKDApO2JyZWFrfX1oJiZwKGMrMTMxMDcyKTtmb3IodmFyIEs9KDE8PEYpLTEsUT0oMTw8eCktMSxWPWQ7O1Y9ZCl7dmFyIFc9d1trKHQsZCkmS10sWD1XPj4+NDtpZigoZCs9MTUmVyk+SSl7ZiYmUygwKTticmVha31pZihXfHxTKDIpLFg8MjU2KWlbYysrXT1YO2Vsc2V7aWYoMjU2PT09WCl7Vj1kLHc9bnVsbDticmVha312YXIgJD1YLTI1NDtpZihYPjI2NCl7dmFyIHR0PVgtMjU3LG50PWFbdHRdOyQ9RSh0LGQsKDE8PG50KS0xKStsW3R0XSxkKz1udH12YXIgaXQ9eVtrKHQsZCkmUV0sZXQ9aXQ+Pj40O2l0fHxTKDMpLGQrPTE1Jml0O3ZhciBydD11W2V0XTtpZihldD4zKXt2YXIgYXQ9c1tldF07cnQrPWsodCxkKSYoMTw8YXQpLTEsZCs9YXR9aWYoZD5JKXtmJiZTKDApO2JyZWFrfWgmJnAoYysxMzEwNzIpO2Zvcih2YXIgc3Q9YyskO2M8c3Q7Yys9NClpW2NdPWlbYy1ydF0saVtjKzFdPWlbYysxLXJ0XSxpW2MrMl09aVtjKzItcnRdLGlbYyszXT1pW2MrMy1ydF07Yz1zdH19ZS5sPXcsZS5wPVYsZS5iPWMsZS5mPXYsdyYmKHY9MSxlLm09RixlLmQ9eSxlLm49eCl9d2hpbGUoIXYpO3JldHVybiBjPT09aS5sZW5ndGg/aTpDKGksMCxjKX0odGhpcy5wLHRoaXMubyx0aGlzLnMpO3RoaXMub25kYXRhKEMoZSxpLHRoaXMucy5iKSx0aGlzLmQpLHRoaXMubz1DKGUsdGhpcy5zLmItMzI3NjgpLHRoaXMucy5iPXRoaXMuby5sZW5ndGgsdGhpcy5wPUModGhpcy5wLHRoaXMucy5wLzh8MCksdGhpcy5zLnAmPTd9LHQucHJvdG90eXBlLnB1c2g9ZnVuY3Rpb24odCxuKXt0aGlzLmUodCksdGhpcy5jKG4pfSx0fSgpO3QuSW5mbGF0ZT14O3ZhciBJPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCh0KXt0aGlzLm9uZGF0YT10fXJldHVybiB0LnByb3RvdHlwZS5wdXNoPWZ1bmN0aW9uKHQsbil7dGhpcy5vbmRhdGEodCxuKX0sdH0oKTt0LlRleHRCeXRlcz1JO3ZhciBVPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCh0KXt0aGlzLnY9MSx4LmNhbGwodGhpcyx0KX1yZXR1cm4gdC5wcm90b3R5cGUucHVzaD1mdW5jdGlvbih0LG4pe2lmKHgucHJvdG90eXBlLmUuY2FsbCh0aGlzLHQpLHRoaXMudil7dmFyIGk9dGhpcy5wLmxlbmd0aD4zP2Z1bmN0aW9uKHQpezMxPT09dFswXSYmMTM5PT09dFsxXSYmOD09PXRbMl18fFMoNixcImludmFsaWQgZ3ppcCBkYXRhXCIpO3ZhciBuPXRbM10saT0xMDs0Jm4mJihpKz10WzEwXXwyKyh0WzExXTw8OCkpO2Zvcih2YXIgZT0obj4+MyYxKSsobj4+NCYxKTtlPjA7KWUtPSF0W2krK107cmV0dXJuIGkrKDImbil9KHRoaXMucCk6NDtpZihpPj10aGlzLnAubGVuZ3RoJiYhbilyZXR1cm47dGhpcy5wPXRoaXMucC5zdWJhcnJheShpKSx0aGlzLnY9MH1uJiYodGhpcy5wLmxlbmd0aDw4JiZTKDYsXCJpbnZhbGlkIGd6aXAgZGF0YVwiKSx0aGlzLnA9dGhpcy5wLnN1YmFycmF5KDAsLTgpKSx4LnByb3RvdHlwZS5jLmNhbGwodGhpcyxuKX0sdH0oKTt0Lkd1bnppcD1VLHQuRGVjb21wcmVzcz1mdW5jdGlvbigpe2Z1bmN0aW9uIHQodCl7dGhpcy5HPVUsdGhpcy5JPXgsdGhpcy5UPUksdGhpcy5vbmRhdGE9dH1yZXR1cm4gdC5wcm90b3R5cGUucHVzaD1mdW5jdGlvbih0LGkpe2lmKHRoaXMub25kYXRhfHxTKDUpLHRoaXMucyl0aGlzLnMucHVzaCh0LGkpO2Vsc2V7aWYodGhpcy5wJiZ0aGlzLnAubGVuZ3RoKXt2YXIgZT1uZXcgbih0aGlzLnAubGVuZ3RoK3QubGVuZ3RoKTtlLnNldCh0aGlzLnApLGUuc2V0KHQsdGhpcy5wLmxlbmd0aCl9ZWxzZSB0aGlzLnA9dDtpZih0aGlzLnAubGVuZ3RoPjIpe3ZhciByPXRoaXMsYT1mdW5jdGlvbigpe3Iub25kYXRhLmFwcGx5KHIsYXJndW1lbnRzKX07dGhpcy5zPTMxPT09dGhpcy5wWzBdJiYxMzk9PT10aGlzLnBbMV0mJjg9PT10aGlzLnBbMl0/bmV3IHRoaXMuRyhhKTpuZXcgdGhpcy5UKGEpLHRoaXMucy5wdXNoKHRoaXMucCxpKSx0aGlzLnA9bnVsbH19fSx0fSgpO3ZhciBEPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBUZXh0RGVjb2RlciYmbmV3IFRleHREZWNvZGVyLEw9MDt0cnl7RC5kZWNvZGUocix7c3RyZWFtOiEwfSksTD0xfWNhdGNoKHQpe31yZXR1cm4gdC5EZWNvZGVVVEY4PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCh0KXt0aGlzLm9uZGF0YT10LEw/dGhpcy50PW5ldyBUZXh0RGVjb2Rlcjp0aGlzLnA9cn1yZXR1cm4gdC5wcm90b3R5cGUucHVzaD1mdW5jdGlvbih0LGkpe2lmKHRoaXMub25kYXRhfHxTKDUpLGk9ISFpLHRoaXMudClyZXR1cm4gdGhpcy5vbmRhdGEodGhpcy50LmRlY29kZSh0LHtzdHJlYW06ITB9KSxpKSx2b2lkKGkmJih0aGlzLnQuZGVjb2RlKCkubGVuZ3RoJiZTKDgpLHRoaXMudD1udWxsKSk7dGhpcy5wfHxTKDQpO3ZhciBlPW5ldyBuKHRoaXMucC5sZW5ndGgrdC5sZW5ndGgpO2Uuc2V0KHRoaXMucCksZS5zZXQodCx0aGlzLnAubGVuZ3RoKTt2YXIgcj1mdW5jdGlvbih0KXtmb3IodmFyIG49XCJcIixpPTA7Oyl7dmFyIGU9dFtpKytdLHI9KGU+MTI3KSsoZT4yMjMpKyhlPjIzOSk7aWYoaStyPnQubGVuZ3RoKXJldHVybltuLEModCxpLTEpXTtyPzM9PT1yPyhlPSgoMTUmZSk8PDE4fCg2MyZ0W2krK10pPDwxMnwoNjMmdFtpKytdKTw8Nnw2MyZ0W2krK10pLTY1NTM2LG4rPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUyOTZ8ZT4+MTAsNTYzMjB8MTAyMyZlKSk6bis9MSZyP1N0cmluZy5mcm9tQ2hhckNvZGUoKDMxJmUpPDw2fDYzJnRbaSsrXSk6U3RyaW5nLmZyb21DaGFyQ29kZSgoMTUmZSk8PDEyfCg2MyZ0W2krK10pPDw2fDYzJnRbaSsrXSk6bis9U3RyaW5nLmZyb21DaGFyQ29kZShlKX19KGUpLGE9clswXSxzPXJbMV07aT8ocy5sZW5ndGgmJlMoOCksdGhpcy5wPW51bGwpOnRoaXMucD1zLHRoaXMub25kYXRhKGEsaSl9LHR9KCksdH0oKTtcblxuZXhwb3J0IGRlZmF1bHQgVW5wYWNrU3RyZWFtIiwiaW1wb3J0IFVucGFja1N0cmVhbSBmcm9tICcuL3VucGFjaydcblxubGV0IGN1cl90aW1lICAgICA9IDBcbmxldCBjaGFubmVsICAgICAgPSB7fVxuXG5cbi8vINCf0LDRg9C30LAg0LzQtdC20LTRgyDRh9Cw0L3QutCw0LzQuCAo0YHQvdC40LbQsNC10Lwg0L3QsNCz0YDRg9C30LrRgyDQvdCwIENQVSAtINC80L7QttC90L4g0LggMCDQv9C+0YHRgtCw0LLQuNGC0YwsINC90L4g0LXRgdC70Lgg0L/QsNC80Y/RgtGMINC90LUg0LjQt9C80LXQvdGP0LXRgiwg0YLQviDQutCw0LrQvtC5LdGC0L4g0LjQtyDQsdGA0LDRg9C30LXRgNC+0LIg0L/RgNC10LLRgNCw0YnQsNC7IDAg0LIgfjUwKVxubGV0IGludGVydmFsVGltZSA9IDEwMFxuLy8g0KDQsNGB0L/QsNC60L7QstGL0LLQsNC10Lwg0L/QviAzMiDQmtCRIGd6aXAsINC+0LHRi9GH0L3QviDQv9GA0Lgg0YHQttCw0YLQuNC4INGH0LDQvdC6INC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOIDE2INCa0JEsINC/0L7RjdGC0L7QvNGDINC80LXQvdGM0YjQtSDQvdC10YIg0YHQvNGL0YHQu9CwINGB0YLQsNCy0LjRgtGMLlxubGV0IG1heENodW5rU2l6ZSA9IDQgKiAxMDI0XG5cbmxldCBzdHJpbmdfZGF0YSA9ICcnXG5sZXQgcGVyY2VudCAgICAgPSAtMVxubGV0IHRoaXNfcmVzICAgID0gbnVsbFxubGV0IGxvYWRfZW5kICAgID0gZmFsc2VcbmxldCBjaHVua19wYXJzZSA9IGZhbHNlXG5sZXQgaW50ZXJ2YWwgICAgPSAtMVxuXG5sZXQgZGNtcFN0cm0gICAgICAgPSBmdW5jdGlvbiAoKXt9XG5sZXQgY29udGVudF90eXBlICAgPSAnJ1xubGV0IGN1cl9wb3MgICAgICAgID0gMFxubGV0IGNvbnRlbnRfbGVuZ3RoID0gMFxuXG5sZXQgbGlzdGVuZXIgPSBMYW1wYS5TdWJzY3JpYmUoKVxuXG5mdW5jdGlvbiBuZXh0Q2h1bmsoKSB7XG4gICAgaWYgKGNodW5rX3BhcnNlIHx8IHRoaXNfcmVzID09PSBudWxsKSByZXR1cm5cblxuICAgIGNodW5rX3BhcnNlID0gdHJ1ZVxuXG4gICAgbGV0IGxlbiAgICA9IHRoaXNfcmVzLnJlc3BvbnNlVGV4dC5sZW5ndGhcbiAgICBsZXQgbWF4UG9zID0gTWF0aC5taW4oY3VyX3BvcyArIG1heENodW5rU2l6ZSwgbGVuKVxuXG4gICAgaWYgKG1heFBvcyA+IGN1cl9wb3MpIHtcbiAgICAgICAgbGV0IGZpbmlzaCA9IChsb2FkX2VuZCAmJiBtYXhQb3MgPT09IGxlbilcblxuICAgICAgICBkY21wU3RybS5wdXNoKHN0cjJhYih0aGlzX3Jlcy5yZXNwb25zZVRleHQuc3Vic3RyaW5nKGN1cl9wb3MsIG1heFBvcykpLCBmaW5pc2gpXG4gICAgICAgIFxuICAgICAgICBjdXJfcG9zID0gbWF4UG9zXG5cbiAgICAgICAgcGVyY2VudCA9IGNvbnRlbnRfbGVuZ3RoID8gY3VyX3BvcyAqIDEwMCAvIGNvbnRlbnRfbGVuZ3RoIDogKGxvYWRfZW5kID8gY3VyX3BvcyAqIDEwMCAvIGxlbiA6IC0xKVxuXG4gICAgICAgIGxpc3RlbmVyLnNlbmQoJ3BlcmNlbnQnLHtcbiAgICAgICAgICAgIHBlcmNlbnRcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoZmluaXNoKSB7XG4gICAgICAgICAgICBwYXJzZUZpbmlzaCgpXG5cbiAgICAgICAgICAgIGxpc3RlbmVyLnNlbmQoJ2VuZCcse1xuICAgICAgICAgICAgICAgIHRpbWU6ICh1bml4dGltZSgpIC0gY3VyX3RpbWUpLFxuICAgICAgICAgICAgICAgIGNoYW5uZWxcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGNoYW5uZWwgPSB7fVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2h1bmtfcGFyc2UgPSBmYWxzZVxuXG4gICAgcmVxdWVzdEZyYW1lKClcbn1cblxuZnVuY3Rpb24gcGFyc2VDaGFubmVsKGF0dHIsIHN0cmluZykge1xuICAgIGlmICghYXR0clsnaWQnXSkgcmV0dXJuOyAvLyB0b2RvINC90LUg0L/QsNGA0YHQuNGC0Ywg0LrQsNC90LDQu9GLINC60L7RgtC+0YDRi9GFINC90LXRgiDQsiDQu9C40YHRgtC1XG4gICAgXG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xcbi9nLCAnJylcblxuICAgIGxldCBuYW1lcyA9IFtdXG5cbiAgICBsZXQgbV9uYW1lICA9IHN0cmluZy5tYXRjaCgvPGRpc3BsYXktbmFtZVtePl0rPiguKj8pPC9nKVxuICAgIGxldCBtX2ljb24gID0gc3RyaW5nLm1hdGNoKC88aWNvbiBzcmM9XCIoLio/KVwiLylcblxuICAgIGlmKG1fbmFtZSl7XG4gICAgICAgIG5hbWVzID0gbV9uYW1lLm1hcChuPT57XG4gICAgICAgICAgICByZXR1cm4gbi5zbGljZSgwLC0xKS5zcGxpdCgnPicpWzFdXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY2hhbm5lbFthdHRyLmlkXSA9IHtcbiAgICAgICAgaWQ6IGF0dHIuaWQsXG4gICAgICAgIG5hbWVzOiBuYW1lcyxcbiAgICAgICAgaWNvbjogbV9pY29uID8gbV9pY29uWzFdIDogJycsXG4gICAgICAgIHByb2dyYW06IFtdXG4gICAgfVxuXG4gICAgbGlzdGVuZXIuc2VuZCgnY2hhbm5lbCcse2NoYW5uZWw6IGNoYW5uZWxbYXR0ci5pZF19KVxufVxuXG5mdW5jdGlvbiBwYXJzZVByb2dyYW1tZShhdHRyLCBzdHJpbmcpIHtcbiAgICBpZiAoIWF0dHJbJ2NoYW5uZWwnXSB8fCAhYXR0clsnc3RhcnQnXSB8fCAhYXR0clsnc3RvcCddIHx8ICFjaGFubmVsW2F0dHIuY2hhbm5lbF0pIHJldHVyblxuXG4gICAgbGV0IHN0YXJ0ID0gcGFyc2VEYXRlKGF0dHIuc3RhcnQpXG4gICAgbGV0IHN0b3AgID0gcGFyc2VEYXRlKGF0dHIuc3RvcClcblxuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXG4vZywgJycpXG5cbiAgICBsZXQgbV90aXRsZSAgICAgPSBzdHJpbmcubWF0Y2goLzx0aXRsZVxccytsYW5nPVwicnVcIj4oLio/KTwvKVxuICAgIGxldCBtX2NhdGVnb3J5ICA9IHN0cmluZy5tYXRjaCgvPGNhdGVnb3J5XFxzK2xhbmc9XCJydVwiPiguKj8pPC8pXG4gICAgbGV0IG1fZGVzYyAgICAgID0gc3RyaW5nLm1hdGNoKC88ZGVzY1xccytsYW5nPVwicnVcIj4oLio/KTwvKVxuICAgIGxldCBtX2ljb24gICAgICA9IHN0cmluZy5tYXRjaCgvPGljb24gc3JjPVwiKC4qPylcIi8pXG5cbiAgICBpZighbV90aXRsZSkgICAgbV90aXRsZSAgICA9IHN0cmluZy5tYXRjaCgvPHRpdGxlW14+XSs+KC4qPyk8LylcbiAgICBpZighbV9jYXRlZ29yeSkgbV9jYXRlZ29yeSA9IHN0cmluZy5tYXRjaCgvPGNhdGVnb3J5W14+XSs+KC4qPyk8LylcbiAgICBpZighbV9kZXNjKSAgICAgbV9kZXNjICAgICA9IHN0cmluZy5tYXRjaCgvPGRlc2NbXj5dKz4oLio/KTwvKVxuXG4gICAgbGV0IHRpdGxlICAgID0gbV90aXRsZSA/IG1fdGl0bGVbMV0gOiAnJ1xuICAgIGxldCBjYXRlZ29yeSA9IG1fY2F0ZWdvcnkgPyBtX2NhdGVnb3J5WzFdIDogJydcbiAgICBsZXQgZGVzYyAgICAgPSBtX2Rlc2MgPyBtX2Rlc2NbMV0gOiAnJ1xuICAgIGxldCBpY29uICAgICA9IG1faWNvbiA/IG1faWNvblsxXSA6ICcnXG4gICAgbGV0IHByb2cgICAgID0ge1xuICAgICAgICBzdGFydDogc3RhcnQgKiAxMDAwLFxuICAgICAgICBzdG9wOiBzdG9wICogMTAwMCxcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICBjYXRlZ29yeTogY2F0ZWdvcnksXG4gICAgICAgIGRlc2M6IGRlc2MsXG4gICAgICAgIGljb246IGljb25cbiAgICB9XG5cbiAgICBsaXN0ZW5lci5zZW5kKCdwcm9ncmFtJyx7cHJvZ3JhbTogcHJvZywgaWQ6IGF0dHIuY2hhbm5lbCwgY2hhbm5lbDogY2hhbm5lbFthdHRyLmNoYW5uZWxdfSlcbn1cblxuZnVuY3Rpb24gcGFyc2VEYXRlKHMpIHtcbiAgICByZXR1cm4gRGF0ZS5wYXJzZShcbiAgICAgICAgcy5yZXBsYWNlKC9eKFxcZHs0fSkoXFxkezJ9KShcXGR7Mn0pKFxcZHsyfSkoXFxkezJ9KShcXGR7Mn0pXFxzKyhbKy1dXFxkezJ9KShcXGR7Mn0pJC8sICckMS0kMi0kM1QkNDokNTokNiQ3OiQ4JylcbiAgICApIC8gMTAwMDtcbn1cblxuZnVuY3Rpb24gcGFyc2VQYXJhbXMocykge1xuICAgIGxldCBvID0ge30sIG0sIG1tXG5cbiAgICBpZiAoISEobSA9IHMubWF0Y2goLyhbXlxccz1dKyk9KChbXCInXSkoLio/KVxcM3xcXFMrKS9nKSkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoISEobW0gPSBtW2ldLm1hdGNoKC8oW15cXHM9XSspPSgoW1wiJ10pKC4qPylcXDN8XFxTKykvKSkpIHtcbiAgICAgICAgICAgICAgICBvW21tWzFdLnRvTG93ZXJDYXNlKCldID0gbW1bNF0gfHwgbW1bMl1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb1xufVxuXG5mdW5jdGlvbiB1bml4dGltZSgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigobmV3IERhdGUpLmdldFRpbWUoKS8xMDAwKVxufVxuXG5mdW5jdGlvbiBzdHIyYWIoc3RyKSB7XG4gICAgbGV0IGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcihzdHIubGVuZ3RoKSwgYnVmVmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZiksIGk9MFxuXG4gICAgZm9yICg7IGk8c3RyLmxlbmd0aDsgaSsrKSBidWZWaWV3W2ldID0gc3RyLmNoYXJDb2RlQXQoaSkgJiAweGZmXG5cbiAgICByZXR1cm4gYnVmVmlld1xufVxuXG5mdW5jdGlvbiBwYXJzZUZpbmlzaCgpIHtcbiAgICAvL2NsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpXG5cbiAgICBzdHJpbmdfZGF0YSA9ICcnXG4gICAgcGVyY2VudCAgICAgPSAtMVxuICAgIHRoaXNfcmVzICAgID0gbnVsbFxuICAgIGxvYWRfZW5kICAgID0gZmFsc2VcbiAgICBjaHVua19wYXJzZSA9IGZhbHNlXG4gICAgaW50ZXJ2YWwgICAgPSAtMVxuXG4gICAgZGNtcFN0cm0gICAgICAgPSBmdW5jdGlvbiAoKXt9XG4gICAgY29udGVudF90eXBlICAgPSAnJ1xuICAgIGN1cl9wb3MgICAgICAgID0gMFxuICAgIGNvbnRlbnRfbGVuZ3RoID0gMFxufVxuXG5mdW5jdGlvbiByZXF1ZXN0RnJhbWUoKXtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobmV4dENodW5rKVxufVxuXG5mdW5jdGlvbiBwYXJzZVN0YXJ0KHVybCkge1xuICAgIHBhcnNlRmluaXNoKClcblxuICAgIGNoYW5uZWwgPSB7fVxuXG4gICAgbGV0IGNoT3JQcm9nUmVnRXhwXG5cbiAgICB0cnkge1xuICAgICAgICBjaE9yUHJvZ1JlZ0V4cCA9IG5ldyBSZWdFeHAoJ1xcXFxzKjwocHJvZ3JhbW1lfGNoYW5uZWwpKFxcXFxzKyhbXj5dKyk/KT8+KC4qPyk8XFxcXC9cXFxcMVxcXFxzKj5cXFxccyonLCAnZ3MnKTtcbiAgICB9XG4gICAgY2F0Y2goZSkge1xuICAgICAgICBjaE9yUHJvZ1JlZ0V4cCA9IG5ldyBSZWdFeHAoJ1xcXFxzKjwocHJvZ3JhbW1lfGNoYW5uZWwpKFxcXFxzKyhbXj5dKyk/KT8+KCgufFxcXFxuKSo/KTxcXFxcL1xcXFwxXFxcXHMqPlxcXFxzKicsICdnJyk7XG4gICAgfVxuXG4gICAgY3VyX3RpbWUgPSB1bml4dGltZSgpXG5cbiAgICBsaXN0ZW5lci5zZW5kKCdzdGFydCcpXG5cbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0XG5cbiAgICBsZXQgdXRmRGVjb2RlID0gbmV3IFVucGFja1N0cmVhbS5EZWNvZGVVVEY4KGZ1bmN0aW9uIChkYXRhLCBmaW5hbCkge1xuICAgICAgICBzdHJpbmdfZGF0YSArPSBkYXRhXG5cbiAgICAgICAgbGV0IGxlblN0YXJ0ID0gc3RyaW5nX2RhdGEubGVuZ3RoXG5cbiAgICAgICAgc3RyaW5nX2RhdGEgPSBzdHJpbmdfZGF0YS5yZXBsYWNlKFxuICAgICAgICAgICAgY2hPclByb2dSZWdFeHAsXG4gICAgICAgICAgICBmdW5jdGlvbiAobWF0Y2gsIHAxLCBwMiwgcDMsIHA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHAxID09PSAnY2hhbm5lbCcpIHBhcnNlQ2hhbm5lbChwYXJzZVBhcmFtcyhwMyksIHA0KVxuICAgICAgICAgICAgICAgIGVsc2UgcGFyc2VQcm9ncmFtbWUocGFyc2VQYXJhbXMocDMpLCBwNClcblxuICAgICAgICAgICAgICAgIHJldHVybiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG5cbiAgICAgICAgaWYgKGxlblN0YXJ0ID09PSBzdHJpbmdfZGF0YS5sZW5ndGggJiYgbGVuU3RhcnQgPiAyMDQ4MDApIHtcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gJ0JhZCB4bWwuZ3ogZmlsZSdcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0lQVFYnLHRleHQsIHN0cmluZ19kYXRhLnN1YnN0cmluZygwLCA0MDk2KSArICcuLi4nKVxuXG4gICAgICAgICAgICBpZiAoIWxvYWRfZW5kKSB4aHIuYWJvcnQoKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBwYXJzZUZpbmlzaCgpXG5cbiAgICAgICAgICAgIGxpc3RlbmVyLnNlbmQoJ2Vycm9yJyx7XG4gICAgICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBkY21wU3RybSA9IG5ldyBVbnBhY2tTdHJlYW0uRGVjb21wcmVzcyhmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIHV0ZkRlY29kZS5wdXNoKGNodW5rLCBmaW5hbClcbiAgICB9KVxuXG4gICAgeGhyLm9wZW4oJ2dldCcsIHVybClcbiAgICB4aHIucmVzcG9uc2VUeXBlID0gJ3RleHQnXG4gICAgeGhyLm92ZXJyaWRlTWltZVR5cGUoJ3RleHRcXC9wbGFpbjsgY2hhcnNldD14LXVzZXItZGVmaW5lZCcpXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSAyKSB7XG4gICAgICAgICAgICAvLyDQv9C+0LvRg9GH0LDQtdC8INC30LDQs9C+0LvQvtCy0LrQuFxuICAgICAgICAgICAgY29udGVudF90eXBlID0geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LXR5cGUnKSB8fCBjb250ZW50X3R5cGVcbiAgICAgICAgICAgIGNvbnRlbnRfbGVuZ3RoID0geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LWxlbmd0aCcpIHx8IGNvbnRlbnRfbGVuZ3RoXG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJUFRWJywnQ29udGVudC1UeXBlJywgY29udGVudF90eXBlKVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0lQVFYnLCdDb250ZW50LUxlbmd0aCcsIGNvbnRlbnRfbGVuZ3RoKVxuXG4gICAgICAgICAgICByZXF1ZXN0RnJhbWUoKVxuICAgICAgICAgICAgLy9pbnRlcnZhbCA9IHNldEludGVydmFsKG5leHRDaHVuaywgaW50ZXJ2YWxUaW1lKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgeGhyLm9ubG9hZCA9IHhoci5vbnByb2dyZXNzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdGhpc19yZXMgPSB0aGlzXG5cbiAgICAgICAgbG9hZF9lbmQgPSAoZS50eXBlID09PSAnbG9hZCcpXG4gICAgfVxuXG4gICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7IC8vINC/0YDQvtC40YHRhdC+0LTQuNGCLCDRgtC+0LvRjNC60L4g0LrQvtCz0LTQsCDQt9Cw0L/RgNC+0YEg0YHQvtCy0YHQtdC8INC90LUg0L/QvtC70YPRh9C40LvQvtGB0Ywg0LLRi9C/0L7Qu9C90LjRgtGMXG4gICAgICAgIHBhcnNlRmluaXNoKClcblxuICAgICAgICBsaXN0ZW5lci5zZW5kKCdlcnJvcicse1xuICAgICAgICAgICAgdGV4dDogJ0Vycm9yIGNvbm5lY3QgKENPUlMgb3IgYmFkIFVSTCknXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgeGhyLm9uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBhcnNlRmluaXNoKClcblxuICAgICAgICBsaXN0ZW5lci5zZW5kKCdlcnJvcicse1xuICAgICAgICAgICAgdGV4dDogJ0xvYWQgYWJvcnQnXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcGFyc2VGaW5pc2goKVxuXG4gICAgICAgIGxpc3RlbmVyLnNlbmQoJ2Vycm9yJyx7XG4gICAgICAgICAgICB0ZXh0OiAnTG9hZCB0aW1lb3V0J1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHhoci5zZW5kKClcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGxpc3RlbmVyLFxuICAgIHN0YXJ0OiBwYXJzZVN0YXJ0XG59IiwiaW1wb3J0IERCIGZyb20gJy4vZGInXG5pbXBvcnQgUGFyc2VyIGZyb20gJy4vZ3VpZGVfcGFyc2VyJ1xuXG5jbGFzcyBHdWlkZXtcbiAgICBzdGF0aWMgaW5pdCgpe1xuICAgICAgICBpZihMYW1wYS5TdG9yYWdlLmZpZWxkKCdpcHR2X2d1aWRlX3VwZGF0ZV9hZnRlcl9zdGFydCcpKSB0aGlzLnVwZGF0ZSgpXG5cbiAgICAgICAgc2V0SW50ZXJ2YWwoKCk9PntcbiAgICAgICAgICAgIGxldCBsYXN0dXBkYXRlID0gTGFtcGEuU3RvcmFnZS5nZXQoJ2lwdHZfZ3VpZGVfdXBkYXRlZF9zdGF0dXMnLCd7fScpLnRpbWUgfHwgMFxuXG4gICAgICAgICAgICBpZihMYW1wYS5TdG9yYWdlLmZpZWxkKCdpcHR2X2d1aWRlX2ludGVydmFsJykgPiAwICYmIChsYXN0dXBkYXRlICsgMTAwMCAqIDYwICogNjAgKiBMYW1wYS5TdG9yYWdlLmZpZWxkKCdpcHR2X2d1aWRlX2ludGVydmFsJykpIDwgRGF0ZS5ub3coKSkgdGhpcy51cGRhdGUoKVxuICAgICAgICB9LDEwMDAgKiA2MClcbiAgICB9XG5cbiAgICBzdGF0aWMgdXBkYXRlKHN0YXR1c19lbGVtKXtcbiAgICAgICAgbGV0IHVybCA9IExhbXBhLlN0b3JhZ2UuZ2V0KCdpcHR2X2d1aWRlX3VybCcpXG5cbiAgICAgICAgaWYoTGFtcGEuU3RvcmFnZS5maWVsZCgnaXB0dl9ndWlkZV9jdXN0b20nKSAmJiB1cmwpe1xuICAgICAgICAgICAgaWYoIXdpbmRvdy5pcHR2X2d1aWRlX3VwZGF0ZV9wcm9jZXNzKXtcbiAgICAgICAgICAgICAgICB3aW5kb3cuaXB0dl9ndWlkZV91cGRhdGVfcHJvY2VzcyA9IFBhcnNlci5saXN0ZW5lclxuXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RfaWQgPSAtMVxuICAgICAgICAgICAgICAgIGxldCBwcm9ncmFtID0gW11cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBQYXJzZXIubGlzdGVuZXIuZm9sbG93KCdwcm9ncmFtJywoZGF0YSk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYobGFzdF9pZCA9PSBkYXRhLmlkKSBwcm9ncmFtLnB1c2goZGF0YS5wcm9ncmFtKVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgREIucmV3cml0ZURhdGEoJ2VwZycsIGxhc3RfaWQsIHByb2dyYW0pLmZpbmFsbHkoKCk9Pnt9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0X2lkID0gZGF0YS5pZFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmFtID0gW2RhdGEucHJvZ3JhbV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBQYXJzZXIubGlzdGVuZXIuZm9sbG93KCdjaGFubmVsJywoZGF0YSk9PntcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5jaGFubmVsLm5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBEQi5hZGREYXRhKCdlcGdfY2hhbm5lbHMnLCBuYW1lLnRvTG93ZXJDYXNlKCksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogZGF0YS5jaGFubmVsLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljOiBkYXRhLmNoYW5uZWwuaWNvblxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCk9Pnt9KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBpZihMYW1wYS5Qcm9jZXNzaW5nKXtcbiAgICAgICAgICAgICAgICAgICAgUGFyc2VyLmxpc3RlbmVyLmZvbGxvdygncGVyY2VudCcsKGRhdGEpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Qcm9jZXNzaW5nLnB1c2goJ2lwdHYnLGRhdGEucGVyY2VudClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBQYXJzZXIubGlzdGVuZXIuZm9sbG93KCdlbmQnLChkYXRhKT0+e1xuICAgICAgICAgICAgICAgICAgICBwcm9ncmFtID0gW11cblxuICAgICAgICAgICAgICAgICAgICBsZXQgY291bnQgPSBMYW1wYS5BcnJheXMuZ2V0S2V5cyhkYXRhLmNoYW5uZWwpLmxlbmd0aFxuXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdpcHR2X2d1aWRlX3VwZGF0ZWRfc3RhdHVzJyx7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZmluaXNoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWxzOiBjb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6IERhdGUubm93KClcbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICBQYXJzZXIubGlzdGVuZXIuc2VuZCgnZmluaXNoJyx7Y291bnQsIHRpbWU6IERhdGUubm93KCl9KVxuXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5pcHR2X2d1aWRlX3VwZGF0ZV9wcm9jZXNzLmRlc3Ryb3koKVxuXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5pcHR2X2d1aWRlX3VwZGF0ZV9wcm9jZXNzID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgUGFyc2VyLmxpc3RlbmVyLmZvbGxvdygnZXJyb3InLChkYXRhKT0+e1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuaXB0dl9ndWlkZV91cGRhdGVfcHJvY2Vzcy5kZXN0cm95KClcblxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuaXB0dl9ndWlkZV91cGRhdGVfcHJvY2VzcyA9IGZhbHNlXG5cbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoJ2lwdHZfZ3VpZGVfdXBkYXRlZF9zdGF0dXMnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogZGF0YS50ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogRGF0ZS5ub3coKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoREIuY2xlYXJUYWJsZSl7XG4gICAgICAgICAgICAgICAgICAgIERCLmNsZWFyVGFibGUoJ2VwZycpLmZpbmFsbHkoKCk9Pnt9KVxuICAgICAgICAgICAgICAgICAgICBEQi5jbGVhclRhYmxlKCdlcGdfY2hhbm5lbHMnKS5maW5hbGx5KCgpPT57fSlcbiAgICAgICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgICAgICBQYXJzZXIuc3RhcnQodXJsKVxuICAgICAgICAgICAgICAgIH0sMTAwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoc3RhdHVzX2VsZW0pe1xuICAgICAgICAgICAgTGFtcGEuTm90eS5zaG93KExhbXBhLkxhbmcudHJhbnNsYXRlKCdpcHR2X2d1aWRlX2Vycm9yX2xpbmsnKSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR3VpZGUiLCJmdW5jdGlvbiBpbml0KCl7XG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdjdWJfaXB0dl9jb250ZW50JywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1jb250ZW50X19tZW51XCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1jb250ZW50X19jaGFubmVsc1wiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtY29udGVudF9fZGV0YWlsc1wiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgKVxuXG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdjdWJfaXB0dl9tZW51JywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1tZW51XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1tZW51X19ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbWVudV9faGVhZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1tZW51X190aXRsZVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1tZW51X19zZWFyY2ggc2VsZWN0b3JcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyM1wiIGhlaWdodD1cIjIyXCIgdmlld0JveD1cIjAgMCAyMyAyMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI5Ljk5NjRcIiBjeT1cIjkuNjM0ODlcIiByPVwiOC40MzU1NlwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjIuNFwiPjwvY2lyY2xlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjAuNzc2OCAyMC40MzM0TDE4LjIxMzUgMTcuODcwMVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjIuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIj48L3BhdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbWVudV9fbGlzdFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGApXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ2lwdHZfbWVudV9tb2JpbGVfYnV0dG9uX3NlYXJjaCcsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbWVudV9fc2VhcmNoLW1vYmlsZSBzZWxlY3RvclwiPlxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjIzXCIgaGVpZ2h0PVwiMjJcIiB2aWV3Qm94PVwiMCAwIDIzIDIyXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjkuOTk2NFwiIGN5PVwiOS42MzQ4OVwiIHI9XCI4LjQzNTU2XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMi40XCI+PC9jaXJjbGU+XG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0yMC43NzY4IDIwLjQzMzRMMTguMjEzNSAxNy44NzAxXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMi41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiPjwvcGF0aD5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICBgKVxuXG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdjdWJfaXB0dl9jaGFubmVscycsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtY2hhbm5lbHNcIj5cbiAgICAgICAgICAgIFxuICAgICAgICA8L2Rpdj5cbiAgICBgKVxuXG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdjdWJfaXB0dl9kZXRhaWxzJywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1kZXRhaWxzIGxheWVyLS13aGVpZ2h0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1kZXRhaWxzX19wbGF5XCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1kZXRhaWxzX190aXRsZVwiPjwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1kZXRhaWxzX19wcm9ncmFtXCI+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgKVxuXG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdjdWJfaXB0dl9kZXRhaWxzX2VtcHR5JywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1kZXRhaWxzLWVwbXR5IGVuZGxlc3MgZW5kbGVzcy11cFwiPlxuICAgICAgICAgICAgPGRpdj48c3Bhbj48L3NwYW4+PHNwYW4gc3R5bGU9XCJ3aWR0aDogNjAlXCI+PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPGRpdj48c3Bhbj48L3NwYW4+PHNwYW4gc3R5bGU9XCJ3aWR0aDogNzAlXCI+PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPGRpdj48c3Bhbj48L3NwYW4+PHNwYW4gc3R5bGU9XCJ3aWR0aDogNDAlXCI+PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPGRpdj48c3Bhbj48L3NwYW4+PHNwYW4gc3R5bGU9XCJ3aWR0aDogNTUlXCI+PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPGRpdj48c3Bhbj48L3NwYW4+PHNwYW4gc3R5bGU9XCJ3aWR0aDogMzAlXCI+PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPGRpdj48c3Bhbj48L3NwYW4+PHNwYW4gc3R5bGU9XCJ3aWR0aDogNTUlXCI+PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPGRpdj48c3Bhbj48L3NwYW4+PHNwYW4gc3R5bGU9XCJ3aWR0aDogMzAlXCI+PC9zcGFuPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgKVxuXG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdjdWJfaXB0dl9wbGF5bGlzdF9pdGVtJywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1wbGF5bGlzdC1pdGVtIHNlbGVjdG9yIGxheWVyLS12aXNpYmxlIGxheWVyLS1yZW5kZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LXBsYXlsaXN0LWl0ZW1fX2JvZHlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1wbGF5bGlzdC1pdGVtX19uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LXBsYXlsaXN0LWl0ZW1fX25hbWUtaWNvXCI+PHNwYW4+PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1wbGF5bGlzdC1pdGVtX19uYW1lLXRleHRcIj5lc3Q8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1wbGF5bGlzdC1pdGVtX191cmxcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1wbGF5bGlzdC1pdGVtX19mb290ZXIgaGlkZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LXBsYXlsaXN0LWl0ZW1fX2RldGFpbHMgZGV0YWlscy1sZWZ0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtcGxheWxpc3QtaXRlbV9fZGV0YWlscyBkZXRhaWxzLXJpZ2h0XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYClcblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgnY3ViX2lwdHZfbGlzdF9hZGRfY3VzdG9tJywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1wbGF5bGlzdC1pdGVtIHNlbGVjdG9yIGxheWVyLS12aXNpYmxlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1wbGF5bGlzdC1pdGVtX190aXRsZVwiPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGApXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ2N1Yl9pcHR2X2xpc3QnLCBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LWxpc3QgbGF5ZXItLXdoZWlnaHRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LWxpc3RfX2ljb1wiPlxuICAgICAgICAgICAgICAgIDxzdmcgaGVpZ2h0PVwiMzZcIiB2aWV3Qm94PVwiMCAwIDM4IDM2XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIyXCIgeT1cIjhcIiB3aWR0aD1cIjM0XCIgaGVpZ2h0PVwiMjFcIiByeD1cIjNcIiBzdHJva2U9XCJ3aGl0ZVwiIHN0cm9rZS13aWR0aD1cIjNcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxsaW5lIHgxPVwiMTMuMDkyNVwiIHkxPVwiMi4zNDg3NFwiIHgyPVwiMTYuMzQ4N1wiIHkyPVwiNi45MDc1NFwiIHN0cm9rZT1cIndoaXRlXCIgc3Ryb2tlLXdpZHRoPVwiM1wiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxsaW5lIHgxPVwiMS41XCIgeTE9XCItMS41XCIgeDI9XCI5LjMxNjY1XCIgeTI9XCItMS41XCIgdHJhbnNmb3JtPVwibWF0cml4KC0wLjc1NzgxNiAwLjY1MjQ2OCAwLjY1MjQ2OCAwLjc1NzgxNiAyNi4xOTcgMilcIiBzdHJva2U9XCJ3aGl0ZVwiIHN0cm9rZS13aWR0aD1cIjNcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIvPlxuICAgICAgICAgICAgICAgICAgICA8bGluZSB4MT1cIjkuNVwiIHkxPVwiMzQuNVwiIHgyPVwiMjkuNVwiIHkyPVwiMzQuNVwiIHN0cm9rZT1cIndoaXRlXCIgc3Ryb2tlLXdpZHRoPVwiM1wiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIi8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LWxpc3RfX3RpdGxlXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1saXN0X190ZXh0XCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1saXN0X19pdGVtc1wiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgKVxuXG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdjdWJfaXB0dl9saXN0X2VtcHR5JywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1saXN0LWVtcHR5IHNlbGVjdG9yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1saXN0LWVtcHR5X190ZXh0XCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGApXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ2N1Yl9pcHR2X3BhcmFtX2xvY2snLCBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LXBhcmFtLWxvY2tcIj5cbiAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZlcnNpb249XCIxLjFcIiB3aWR0aD1cIjUxMlwiIGhlaWdodD1cIjUxMlwiIHZpZXdCb3g9XCIwIDAgNDAxLjk5OCA0MDEuOTk4XCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj48cGF0aCBkPVwiTTM1Ny40NSAxOTAuNzIxYy01LjMzMS01LjMzLTExLjgtNy45OTMtMTkuNDE3LTcuOTkzaC05LjEzMXYtNTQuODIxYzAtMzUuMDIyLTEyLjU1OS02NS4wOTMtMzcuNjg1LTkwLjIxOEMyNjYuMDkzIDEyLjU2MyAyMzYuMDI1IDAgMjAwLjk5OCAwYy0zNS4wMjYgMC02NS4xIDEyLjU2My05MC4yMjIgMzcuNjg4LTI1LjEyNiAyNS4xMjYtMzcuNjg1IDU1LjE5Ni0zNy42ODUgOTAuMjE5djU0LjgyMWgtOS4xMzVjLTcuNjExIDAtMTQuMDg0IDIuNjYzLTE5LjQxNCA3Ljk5My01LjMzIDUuMzI2LTcuOTk0IDExLjc5OS03Ljk5NCAxOS40MTdWMzc0LjU5YzAgNy42MTEgMi42NjUgMTQuMDg2IDcuOTk0IDE5LjQxNyA1LjMzIDUuMzI1IDExLjgwMyA3Ljk5MSAxOS40MTQgNy45OTFIMzM4LjA0YzcuNjE3IDAgMTQuMDg1LTIuNjYzIDE5LjQxNy03Ljk5MSA1LjMyNS01LjMzMSA3Ljk5NC0xMS44MDYgNy45OTQtMTkuNDE3VjIxMC4xMzVjLjAwNC03LjYxMi0yLjY2OS0xNC4wODQtOC4wMDEtMTkuNDE0em0tODMuMzYzLTcuOTkzSDEyNy45MDl2LTU0LjgyMWMwLTIwLjE3NSA3LjEzOS0zNy40MDIgMjEuNDE0LTUxLjY3NSAxNC4yNzctMTQuMjc1IDMxLjUwMS0yMS40MTEgNTEuNjc4LTIxLjQxMSAyMC4xNzkgMCAzNy4zOTkgNy4xMzUgNTEuNjc3IDIxLjQxMSAxNC4yNzEgMTQuMjcyIDIxLjQwOSAzMS41IDIxLjQwOSA1MS42NzV2NTQuODIxelwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIj48L3BhdGg+PC9zdmc+XG4gICAgICAgIDwvZGl2PlxuICAgIGApXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ2N1Yl9pcHR2X2ljb25fZmF2b3JpdGUnLCBgXG4gICAgICAgIDxzdmcgd2lkdGg9XCI2NVwiIGhlaWdodD1cIjg3XCIgdmlld0JveD1cIjAgMCA2NSA4N1wiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0zNi4xODg0IDQ3LjkyMjFMMzIuNSA0Mi42NDQ4TDI4LjgxMTYgNDcuOTIyMUw1LjQwOTgzIDgxLjQwNDZDNS4zMzkzOCA4MS41MDU0IDUuMjg0NjEgODEuNTUwOSA1LjI1ODA3IDgxLjU3MDJDNS4yMzAyOCA4MS41OTA0IDUuMjA0OSA4MS42MDI0IDUuMTc3MDUgODEuNjExQzUuMTE0NzEgODEuNjMwMSA0Ljk5NjkzIDgxLjY0MTQgNC44NDk4NSA4MS41OTUxQzQuNzAyNzggODEuNTQ4OCA0LjYxMjczIDgxLjQ3MiA0LjU3MjU3IDgxLjQyMDdDNC41NTQ2MyA4MS4zOTc3IDQuNTQwNzUgODEuMzczMyA0LjUyOTUzIDgxLjM0MDhDNC41MTg4MiA4MS4zMDk4IDQuNSA4MS4yNDExIDQuNSA4MS4xMTgyVjEzQzQuNSA4LjMwNTU4IDguMzA1NTggNC41IDEzIDQuNUg1MkM1Ni42OTQ0IDQuNSA2MC41IDguMzA1NTggNjAuNSAxM1Y4MS4xMTgyQzYwLjUgODEuMjQxMSA2MC40ODEyIDgxLjMwOTggNjAuNDcwNSA4MS4zNDA4QzYwLjQ1OTMgODEuMzczMyA2MC40NDU0IDgxLjM5NzcgNjAuNDI3NCA4MS40MjA3QzYwLjM4NzMgODEuNDcyIDYwLjI5NzIgODEuNTQ4OCA2MC4xNTAyIDgxLjU5NTFDNjAuMDAzMSA4MS42NDE0IDU5Ljg4NTMgODEuNjMwMSA1OS44MjI5IDgxLjYxMUM1OS43OTUxIDgxLjYwMjQgNTkuNzY5NyA4MS41OTA0IDU5Ljc0MTkgODEuNTcwMkM1OS43MTU0IDgxLjU1MDkgNTkuNjYwNiA4MS41MDU0IDU5LjU5MDIgODEuNDA0NkwzNi4xODg0IDQ3LjkyMjFaXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiOVwiLz5cbiAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiYWN0aXZlLWxheWVyXCIgZD1cIk0wIDEzQzAgNS44MjAzIDUuODIwMyAwIDEzIDBINTJDNTkuMTc5NyAwIDY1IDUuODIwMyA2NSAxM1Y4MS4xMTgyQzY1IDg2LjAwODYgNTguNzAzMyA4Ny45OTA5IDU1LjkwMTggODMuOTgyNUwzMi41IDUwLjVMOS4wOTgyMyA4My45ODI1QzYuMjk2NjYgODcuOTkwOSAwIDg2LjAwODYgMCA4MS4xMTgyVjEzWlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIi8+XG4gICAgICAgIDwvc3ZnPlxuICAgIGApXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ2N1Yl9pcHR2X2ljb25fbG9jaycsIGBcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjQyMFwiIGhlaWdodD1cIjUxMlwiIHZpZXdCb3g9XCIwIDAgNDIwIDUxMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMzg0LjUzMiAyMzIuNzI5QzM5NC4yMzMgMjMyLjcyOSA0MDIuNDcyIDIzNi4xMjEgNDA5LjI2MiAyNDIuOTFDNDE2LjA1MyAyNDkuNjk4IDQxOS40NTcgMjU3Ljk0MSA0MTkuNDUyIDI2Ny42MzZWNDc3LjA5MkM0MTkuNDUyIDQ4Ni43ODYgNDE2LjA1MyA0OTUuMDMzIDQwOS4yNzEgNTAxLjgyMkM0MDIuNDggNTA4LjYwOCAzOTQuMjQyIDUxMiAzODQuNTQxIDUxMkgzNS40NTY4QzI1Ljc2MzIgNTEyIDE3LjUxODkgNTA4LjYwNCAxMC43MzA0IDUwMS44MjJDMy45NDMyIDQ5NS4wMzMgMC41NDg5NSA0ODYuNzg2IDAuNTQ4OTUgNDc3LjA5MlYyNjcuNjRDMC41NDg5NSAyNTcuOTM3IDMuOTQxOTIgMjQ5LjY5MyAxMC43MzA0IDI0Mi45MUMxNy41MTg5IDIzNi4xMjEgMjUuNzYzMiAyMzIuNzI5IDM1LjQ1NjggMjMyLjcyOUg0Ny4wOTE1VjE2Mi45MDdDNDcuMDkxNSAxMTguMzAxIDYzLjA4NzEgODAuMDAyMyA5NS4wODg2IDQ4LjAwMDlDMTI3LjA4NSAxNi4wMDA3IDE2NS4zODggMCAyMDkuOTk5IDBDMjU0LjYxIDAgMjkyLjkwNiAxNi4wMDA3IDMyNC45MDUgNDguMDAyMUMzNTYuOTA3IDgwLjAwMjMgMzcyLjkwMiAxMTguMzAyIDM3Mi45MDIgMTYyLjkwN1YyMzIuNzI5SDM4NC41MzJaTTExNi45MSAxNjIuOTA3VjIzMi43MjlIMzAzLjA4OFYxNjIuOTA3QzMwMy4wODggMTM3LjIxMiAyOTMuOTk2IDExNS4yNjkgMjc1LjgyIDk3LjA5MkMyNTcuNjM1IDc4LjkwOTUgMjM1LjcwMyA2OS44MjIxIDIxMC4wMDMgNjkuODIyMUMxODQuMzA0IDY5LjgyMjEgMTYyLjM2NyA3OC45MTA4IDE0NC4xODMgOTcuMDkyQzEyNi4wMDIgMTE1LjI3MSAxMTYuOTEgMTM3LjIxMiAxMTYuOTEgMTYyLjkwN1pNNjIgMjkzQzUzLjcxNTcgMjkzIDQ3IDI5OS43MTYgNDcgMzA4VjQ0NUM0NyA0NTMuMjg0IDUzLjcxNTcgNDYwIDYyIDQ2MEgzNThDMzY2LjI4NCA0NjAgMzczIDQ1My4yODQgMzczIDQ0NVYzMDhDMzczIDI5OS43MTYgMzY2LjI4NCAyOTMgMzU4IDI5M0g2MlpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIvPlxuICAgICAgICA8cmVjdCBjbGFzcz1cImFjdGl2ZS1sYXllclwiIHg9XCIzM1wiIHk9XCIyNzVcIiB3aWR0aD1cIjM1NFwiIGhlaWdodD1cIjIwM1wiIHJ4PVwiMTVcIiBmaWxsPVwiY3VycmVudENvbG9yXCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICBgKVxuXG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdjdWJfaXB0dl9pY29uX2ZhdicsIGBcbiAgICAgICAgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XG4gICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0zOTEuNDE2LDBIMTIwLjU4NGMtMTcuNzc4LDAtMzIuMjQyLDE0LjQ2NC0zMi4yNDIsMzIuMjQydjQ2MC40MTNjMCw3LjAxNiwzLjc5OCwxMy40NzcsOS45MjQsMTYuODk1XG4gICAgICAgICAgICBjMi45MzQsMS42MzgsNi4xNzgsMi40NSw5LjQyMSwyLjQ1YzMuNTM0LDAsNy4wNTUtMC45NjEsMTAuMTY5LTIuODgybDEzOC4xODItODUuMzEybDEzOC4xNjMsODQuNjkzXG4gICAgICAgICAgICBjNS45NzEsMy42NjksMTMuNDU4LDMuODE3LDE5LjU2NCwwLjM4N2M2LjEwNy0zLjQxOCw5Ljg5Mi05Ljg3Miw5Ljg5Mi0xNi44NzVWMzIuMjQyQzQyMy42NTcsMTQuNDY0LDQwOS4xOTQsMCwzOTEuNDE2LDB6XG4gICAgICAgICAgICBNMzg0Ljk2Nyw0NTcuNDUzbC0xMTguODUtNzIuODZjLTYuMjI5LTMuODE3LTE0LjA3LTMuNzk4LTIwLjI4LDAuMDMybC0xMTguODA1LDczLjM1VjM4LjY5aDI1Ny45MzVWNDU3LjQ1M3pcIj48L3BhdGg+XG4gICAgICAgIDwvc3ZnPlxuICAgIGApXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ2N1Yl9pcHR2X2ljb25fYWxsJywgYFxuICAgICAgICA8c3ZnIGhlaWdodD1cIjMwXCIgdmlld0JveD1cIjAgMCAzOCAzMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgPHJlY3QgeD1cIjEuNVwiIHk9XCIxLjVcIiB3aWR0aD1cIjM1XCIgaGVpZ2h0PVwiMjdcIiByeD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjNcIj48L3JlY3Q+XG4gICAgICAgICAgICA8cmVjdCB4PVwiNlwiIHk9XCI3XCIgd2lkdGg9XCIyNVwiIGhlaWdodD1cIjNcIiBmaWxsPVwiY3VycmVudENvbG9yXCI+PC9yZWN0PlxuICAgICAgICAgICAgPHJlY3QgeD1cIjZcIiB5PVwiMTNcIiB3aWR0aD1cIjEzXCIgaGVpZ2h0PVwiM1wiIGZpbGw9XCJjdXJyZW50Q29sb3JcIj48L3JlY3Q+XG4gICAgICAgICAgICA8cmVjdCB4PVwiNlwiIHk9XCIxOVwiIHdpZHRoPVwiMTlcIiBoZWlnaHQ9XCIzXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPjwvcmVjdD5cbiAgICAgICAgPC9zdmc+XG4gICAgYClcblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgnY3ViX2lwdHZfaWNvbl9ncm91cCcsIGBcbiAgICAgICAgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XG4gICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk00NzguMzU0LDE0Ni4yODZIMzMuNjQ2Yy0xMi4xMiwwLTIxLjk0Myw5LjgyMy0yMS45NDMsMjEuOTQzdjMyMS44MjljMCwxMi4xMiw5LjgyMywyMS45NDMsMjEuOTQzLDIxLjk0M2g0NDQuNzA5XG4gICAgICAgICAgICAgICAgYzEyLjEyLDAsMjEuOTQzLTkuODIzLDIxLjk0My0yMS45NDNWMTY4LjIyOUM1MDAuMjk3LDE1Ni4xMDksNDkwLjQ3NCwxNDYuMjg2LDQ3OC4zNTQsMTQ2LjI4NnogTTQ1Ni40MTEsNDY4LjExNEg1NS41ODlWMTkwLjE3MVxuICAgICAgICAgICAgICAgIGg0MDAuODIzVjQ2OC4xMTR6XCI+PC9wYXRoPlxuICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNDQxLjc4Myw3My4xNDNINzAuMjE3Yy0xMi4xMiwwLTIxLjk0Myw5LjgyMy0yMS45NDMsMjEuOTQzYzAsMTIuMTIsOS44MjMsMjEuOTQzLDIxLjk0MywyMS45NDNoMzcxLjU2NlxuICAgICAgICAgICAgICAgIGMxMi4xMiwwLDIxLjk0My05LjgyMywyMS45NDMtMjEuOTQzQzQ2My43MjYsODIuOTY2LDQ1My45MDMsNzMuMTQzLDQ0MS43ODMsNzMuMTQzelwiPjwvcGF0aD5cbiAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTQwNS4yMTEsMEgxMDYuNzg5Yy0xMi4xMiwwLTIxLjk0Myw5LjgyMy0yMS45NDMsMjEuOTQzYzAsMTIuMTIsOS44MjMsMjEuOTQzLDIxLjk0MywyMS45NDNoMjk4LjQyM1xuICAgICAgICAgICAgICAgIGMxMi4xMiwwLDIxLjk0My05LjgyMywyMS45NDMtMjEuOTQzQzQyNy4xNTQsOS44MjMsNDE3LjMzMSwwLDQwNS4yMTEsMHpcIj48L3BhdGg+XG4gICAgICAgIDwvc3ZnPlxuICAgIGApXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ2N1Yl9pcHR2X2ljb25fc2VhcmNoZWQnLCBgXG4gICAgICAgIDxzdmcgaGVpZ2h0PVwiMzRcIiB2aWV3Qm94PVwiMCAwIDI4IDM0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICA8cmVjdCB4PVwiMS41XCIgeT1cIjEuNVwiIHdpZHRoPVwiMjVcIiBoZWlnaHQ9XCIzMVwiIHJ4PVwiMi41XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiM1wiPjwvcmVjdD5cbiAgICAgICAgICAgIDxyZWN0IHg9XCI2XCIgeT1cIjdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiM1wiIHJ4PVwiMS41XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPjwvcmVjdD5cbiAgICAgICAgICAgIDxyZWN0IHg9XCI2XCIgeT1cIjEzXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjNcIiByeD1cIjEuNVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIj48L3JlY3Q+XG4gICAgICAgIDwvc3ZnPlxuICAgIGApXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ2N1Yl9pcHR2X2h1ZCcsYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1odWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LWh1ZF9fY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LWh1ZF9fbWVudVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LWh1ZF9fcHJvZ3JhbVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGApXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ2N1Yl9pcHR2X2NoYW5uZWxfbWFpbl9ib2FyZCcsYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1jaGFubmVsIGlwdHYtY2hhbm5lbC0tbWFpbiBzZWxlY3RvciBsYXllci0tdmlzaWJsZSBsYXllci0tcmVuZGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1jaGFubmVsX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImlwdHYtY2hhbm5lbF9faWNvXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYClcblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgnc2V0dGluZ3NfaXB0dl9ndWlkZScsYDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbSBzZWxlY3RvclwiIGRhdGEtdHlwZT1cInRvZ2dsZVwiIGRhdGEtbmFtZT1cImlwdHZfZ3VpZGVfY3VzdG9tXCIgZGF0YS1jaGlsZHJlbj1cInVzZV9jdXN0b21fZ3VpZGVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbV9fbmFtZVwiPiN7aXB0dl9wYXJhbV9ndWlkZV9jdXN0b21fdGl0bGV9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX3ZhbHVlXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX2Rlc2NyXCI+I3tpcHR2X3BhcmFtX2d1aWRlX2N1c3RvbV9kZXNjcn08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgZGF0YS1wYXJlbnQ9XCJ1c2VfY3VzdG9tX2d1aWRlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW0gc2VsZWN0b3JcIiBkYXRhLXR5cGU9XCJpbnB1dFwiIGRhdGEtbmFtZT1cImlwdHZfZ3VpZGVfdXJsXCIgcGxhY2Vob2xkZXI9XCIje3RvcnJlbnRfcGFyc2VyX3NldF9saW5rfVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbV9fbmFtZVwiPiN7c2V0dGluZ3NfcGFyc2VyX2phY2tldHRfbGlua308L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX3ZhbHVlXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtX19kZXNjclwiPiN7aXB0dl9wYXJhbV9ndWlkZV91cmxfZGVzY3J9PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbSBzZWxlY3RvclwiIGRhdGEtdHlwZT1cInNlbGVjdFwiIGRhdGEtbmFtZT1cImlwdHZfZ3VpZGVfc2F2ZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbV9fbmFtZVwiPiN7aXB0dl9wYXJhbV9ndWlkZV9zYXZlX3RpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbV9fdmFsdWVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX2Rlc2NyXCI+I3tpcHR2X3BhcmFtX2d1aWRlX3NhdmVfZGVzY3J9PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbSBzZWxlY3RvclwiIGRhdGEtdHlwZT1cInNlbGVjdFwiIGRhdGEtbmFtZT1cImlwdHZfZ3VpZGVfaW50ZXJ2YWxcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX25hbWVcIj4je2lwdHZfcGFyYW1fZ3VpZGVfaW50ZXJ2YWxfdGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtX192YWx1ZVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbV9fZGVzY3JcIj4je2lwdHZfcGFyYW1fZ3VpZGVfaW50ZXJ2YWxfZGVzY3J9PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbSBzZWxlY3RvclwiIGRhdGEtdHlwZT1cInRvZ2dsZVwiIGRhdGEtbmFtZT1cImlwdHZfZ3VpZGVfdXBkYXRlX2FmdGVyX3N0YXJ0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtX19uYW1lXCI+I3tpcHR2X3BhcmFtX2d1aWRlX3VwZGF0ZV9hZnRlcl9zdGFydH08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX3ZhbHVlXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbSBzZWxlY3RvciBzZXR0aW5ncy1wYXJhbS0tYnV0dG9uIHVwZGF0ZS1ndWlkZS1ub3dcIiBkYXRhLXN0YXRpYz1cInRydWVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX25hbWVcIj4je2lwdHZfcGFyYW1fZ3VpZGVfdXBkYXRlX25vd308L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtIHVwZGF0ZS1ndWlkZS1zdGF0dXNcIiBkYXRhLXN0YXRpYz1cInRydWVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX25hbWVcIj4je2lwdHZfZ3VpZGVfc3RhdHVzX2ZpbmlzaH08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX3ZhbHVlXCI+I3tpcHR2X2d1aWRlX3N0YXR1c19ub3VwZGF0ZXN9PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+YClcblxuICAgIGlmKHdpbmRvdy5sYW1wYV9zZXR0aW5ncy5pcHR2KXtcbiAgICAgICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdhYm91dCcsYDxkaXYgY2xhc3M9XCJhYm91dFwiPlxuICAgICAgICAgICAgPGRpdj4je2lwdHZfYWJvdXRfdGV4dH08L2Rpdj5cbiAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3ZlcmhpZGVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWJvdXRfX2NvbnRhY3RzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c21hbGw+I3thYm91dF9jaGFubmVsfTwvc21hbGw+PGJyPlxuICAgICAgICAgICAgICAgICAgICAgICAgQGxhbXBhX2NoYW5uZWxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsPiN7YWJvdXRfZ3JvdXB9PC9zbWFsbD48YnI+XG4gICAgICAgICAgICAgICAgICAgICAgICBAbGFtcGFfZ3JvdXBcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsPiN7YWJvdXRfdmVyc2lvbn08L3NtYWxsPjxicj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidmVyc2lvbl9hcHBcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpZGUgcGxhdGZvcm1fYW5kcm9pZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsPiN7YWJvdXRfdmVyc2lvbn0gQW5kcm9pZCBBUEs8L3NtYWxsPjxicj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidmVyc2lvbl9hbmRyb2lkXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5gKVxuICAgIH1cblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgnY3ViX2lwdHZfc3R5bGUnLCBgXG4gICAgICAgIDxzdHlsZT5cbiAgICAgICAgQEBpbmNsdWRlKCcuLi9wbHVnaW5zL2lwdHYvY3NzL3N0eWxlLmNzcycpXG4gICAgICAgIDwvc3R5bGU+XG4gICAgYClcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGluaXRcbn0iLCJpbXBvcnQgRmF2b3JpdGVzIGZyb20gJy4vdXRpbHMvZmF2b3JpdGVzJ1xuaW1wb3J0IEd1aWRlIGZyb20gJy4vdXRpbHMvZ3VpZGUnXG5cbmZ1bmN0aW9uIGluaXQoKXtcbiAgICBMYW1wYS5QYXJhbXMudHJpZ2dlcignaXB0dl9ndWlkZV91cGRhdGVfYWZ0ZXJfc3RhcnQnLCBmYWxzZSlcbiAgICBMYW1wYS5QYXJhbXMudHJpZ2dlcignaXB0dl9ndWlkZV9jdXN0b20nLCBmYWxzZSlcbiAgICBMYW1wYS5QYXJhbXMuc2VsZWN0KCdpcHR2X2d1aWRlX3VybCcsJycsJycpXG4gICAgTGFtcGEuUGFyYW1zLnNlbGVjdCgnaXB0dl9ndWlkZV9pbnRlcnZhbCcse1xuICAgICAgICAnMCc6ICcje2lwdHZfcGFyYW1fZ3VpZGVfdXBkYXRlX2N1c3RvbX0nLFxuICAgICAgICAnMSc6ICcxJyxcbiAgICAgICAgJzInOiAnMicsXG4gICAgICAgICczJzogJzMnLFxuICAgICAgICAnNSc6ICc1JyxcbiAgICAgICAgJzgnOiAnOCcsXG4gICAgICAgICcxMic6ICcxMicsXG4gICAgICAgICcxOCc6ICcxOCcsXG4gICAgICAgICcyNCc6ICcyNCAvIDEnLFxuICAgICAgICAnNDgnOiAnNDggLyAyJyxcbiAgICAgICAgJzcyJzogJzcyIC8gMycsXG4gICAgICAgICc5Nic6ICc5NiAvIDQnLFxuICAgICAgICAnMTIwJzogJzEyMCAvIDUnLFxuICAgICAgICAnMTQ0JzogJzE0NCAvIDYnLFxuICAgICAgICAnMTY4JzogJzE2OCAvIDcnLFxuICAgIH0sJzI0JylcbiAgICBMYW1wYS5QYXJhbXMuc2VsZWN0KCdpcHR2X2d1aWRlX3NhdmUnLHtcbiAgICAgICAgJzEnOiAnMScsXG4gICAgICAgICcyJzogJzInLFxuICAgICAgICAnMyc6ICczJyxcbiAgICAgICAgJzQnOiAnNCcsXG4gICAgICAgICc1JzogJzUnLFxuICAgICAgICAnNic6ICc2JyxcbiAgICAgICAgJzcnOiAnNycsXG4gICAgICAgICcxNCc6ICcxNCcsXG4gICAgfSwnMycpXG4gICAgXG5cbiAgICBMYW1wYS5TZXR0aW5ncy5saXN0ZW5lci5mb2xsb3coJ29wZW4nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZihlLm5hbWUgPT0gJ2lwdHYnKXtcbiAgICAgICAgICAgIGlmKCFMYW1wYS5BY2NvdW50Lmhhc1ByZW1pdW0oKSl7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSBlLmJvZHkuZmluZCgnLnNjcm9sbF9fYm9keSA+IGRpdicpXG5cbiAgICAgICAgICAgICAgICBsZXQgaW5mbyA9ICQoYDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbSBzZWxlY3RvclwiIGRhdGEtdHlwZT1cImJ1dHRvblwiIGRhdGEtc3RhdGljPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX25hbWVcIj4ke0xhbXBhLkxhbmcudHJhbnNsYXRlKCdhY2NvdW50X3ByZW1pdW1fbW9yZScpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX2Rlc2NyXCI+JHtMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl9wcmVtaXVtJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+YClcblxuICAgICAgICAgICAgICAgIGluZm8ub24oJ2hvdmVyOmVudGVyJyxMYW1wYS5BY2NvdW50LnNob3dDdWJQcmVtaXVtKVxuXG4gICAgICAgICAgICAgICAgYm9keS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW0tdGl0bGVcIj48c3Bhbj4nK0xhbXBhLkxhbmcudHJhbnNsYXRlKCd0aXRsZV9zZXR0aW5ncycpKyc8L3NwYW4+PC9kaXY+JylcblxuICAgICAgICAgICAgICAgIGJvZHkucHJlcGVuZChpbmZvKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGUubmFtZSA9PSAnaXB0dl9ndWlkZScpe1xuICAgICAgICAgICAgbGV0IHN0YXR1cyA9IGUuYm9keS5maW5kKCcudXBkYXRlLWd1aWRlLXN0YXR1cycpXG4gICAgICAgICAgICBsZXQgcGFyc2VyID0gd2luZG93LmlwdHZfZ3VpZGVfdXBkYXRlX3Byb2Nlc3NcbiAgICAgICAgICAgIGxldCBsaXN0ZW4gPSAoKT0+e1xuICAgICAgICAgICAgICAgIGlmKCFwYXJzZXIpIHJldHVyblxuXG4gICAgICAgICAgICAgICAgcGFyc2VyLmZvbGxvdygnc3RhcnQnLCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5maW5kKCcuc2V0dGluZ3MtcGFyYW1fX25hbWUnKS50ZXh0KExhbXBhLkxhbmcudHJhbnNsYXRlKCdpcHR2X2d1aWRlX3N0YXR1c191cGRhdGUnKSlcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmZpbmQoJy5zZXR0aW5ncy1wYXJhbV9fdmFsdWUnKS50ZXh0KExhbXBhLkxhbmcudHJhbnNsYXRlKCdpcHR2X2d1aWRlX3N0YXR1c19wYXJzaW5nJykgKyAnIDAlJylcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgcGFyc2VyLmZvbGxvdygncGVyY2VudCcsKGRhdGEpPT57XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5maW5kKCcuc2V0dGluZ3MtcGFyYW1fX3ZhbHVlJykudGV4dChMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl9ndWlkZV9zdGF0dXNfcGFyc2luZycpICsgJyAnK2RhdGEucGVyY2VudC50b0ZpeGVkKDIpKyclJylcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgcGFyc2VyLmZvbGxvdygnZmluaXNoJywoZGF0YSk9PntcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmZpbmQoJy5zZXR0aW5ncy1wYXJhbV9fbmFtZScpLnRleHQoTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2lwdHZfZ3VpZGVfc3RhdHVzX2ZpbmlzaCcpKVxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZmluZCgnLnNldHRpbmdzLXBhcmFtX192YWx1ZScpLnRleHQoTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2lwdHZfZ3VpZGVfc3RhdHVzX2NoYW5uZWxzJykgKyAnIC0gJyArIGRhdGEuY291bnQgKyAnLCAnK0xhbXBhLkxhbmcudHJhbnNsYXRlKCdpcHR2X2d1aWRlX3N0YXR1c19kYXRlJykrJyAtICcgKyBMYW1wYS5VdGlscy5wYXJzZVRpbWUoZGF0YS50aW1lKS5icmllZmx5KVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBwYXJzZXIuZm9sbG93KCdlcnJvcicsKGRhdGEpPT57XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5maW5kKCcuc2V0dGluZ3MtcGFyYW1fX25hbWUnKS50ZXh0KExhbXBhLkxhbmcudHJhbnNsYXRlKCd0aXRsZV9lcnJvcicpKVxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZmluZCgnLnNldHRpbmdzLXBhcmFtX192YWx1ZScpLnRleHQoZGF0YS50ZXh0KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGUuYm9keS5maW5kKCcudXBkYXRlLWd1aWRlLW5vdycpLm9uKCdob3ZlcjplbnRlcicsKCk9PntcbiAgICAgICAgICAgICAgICBpZih3aW5kb3cuaXB0dl9ndWlkZV91cGRhdGVfcHJvY2VzcykgcmV0dXJuIExhbXBhLk5vdHkuc2hvdyhMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl9ndWlkZV9zdGF0dXNfdXBkYXRlX3dhaXQnKSlcblxuICAgICAgICAgICAgICAgIEd1aWRlLnVwZGF0ZShzdGF0dXMpXG5cbiAgICAgICAgICAgICAgICBwYXJzZXIgPSB3aW5kb3cuaXB0dl9ndWlkZV91cGRhdGVfcHJvY2Vzc1xuXG4gICAgICAgICAgICAgICAgbGlzdGVuKClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGxldCBsYXN0X3N0YXR1cyA9IExhbXBhLlN0b3JhZ2UuZ2V0KCdpcHR2X2d1aWRlX3VwZGF0ZWRfc3RhdHVzJywne30nKVxuXG4gICAgICAgICAgICBpZihsYXN0X3N0YXR1cy50eXBlKXtcbiAgICAgICAgICAgICAgICBpZihsYXN0X3N0YXR1cy50eXBlID09ICdlcnJvcicpe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZmluZCgnLnNldHRpbmdzLXBhcmFtX19uYW1lJykudGV4dChMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndGl0bGVfZXJyb3InKSlcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmZpbmQoJy5zZXR0aW5ncy1wYXJhbV9fdmFsdWUnKS50ZXh0KGxhc3Rfc3RhdHVzLnRleHQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGxhc3Rfc3RhdHVzLnR5cGUgPT0gJ2ZpbmlzaCcpe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZmluZCgnLnNldHRpbmdzLXBhcmFtX192YWx1ZScpLnRleHQoTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2lwdHZfZ3VpZGVfc3RhdHVzX2NoYW5uZWxzJykgKyAnIC0gJyArIGxhc3Rfc3RhdHVzLmNoYW5uZWxzICsgJywgJytMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl9ndWlkZV9zdGF0dXNfZGF0ZScpKycgLSAnICsgTGFtcGEuVXRpbHMucGFyc2VUaW1lKGxhc3Rfc3RhdHVzLnRpbWUpLmJyaWVmbHkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihwYXJzZXIpIGxpc3RlbigpXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgTGFtcGEuU2V0dGluZ3NBcGkuYWRkQ29tcG9uZW50KHtcbiAgICAgICAgY29tcG9uZW50OiAnaXB0dicsXG4gICAgICAgIGljb246IGA8c3ZnIGhlaWdodD1cIjM2XCIgdmlld0JveD1cIjAgMCAzOCAzNlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgPHJlY3QgeD1cIjJcIiB5PVwiOFwiIHdpZHRoPVwiMzRcIiBoZWlnaHQ9XCIyMVwiIHJ4PVwiM1wiIHN0cm9rZT1cIndoaXRlXCIgc3Ryb2tlLXdpZHRoPVwiM1wiLz5cbiAgICAgICAgICAgIDxsaW5lIHgxPVwiMTMuMDkyNVwiIHkxPVwiMi4zNDg3NFwiIHgyPVwiMTYuMzQ4N1wiIHkyPVwiNi45MDc1NFwiIHN0cm9rZT1cIndoaXRlXCIgc3Ryb2tlLXdpZHRoPVwiM1wiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIi8+XG4gICAgICAgICAgICA8bGluZSB4MT1cIjEuNVwiIHkxPVwiLTEuNVwiIHgyPVwiOS4zMTY2NVwiIHkyPVwiLTEuNVwiIHRyYW5zZm9ybT1cIm1hdHJpeCgtMC43NTc4MTYgMC42NTI0NjggMC42NTI0NjggMC43NTc4MTYgMjYuMTk3IDIpXCIgc3Ryb2tlPVwid2hpdGVcIiBzdHJva2Utd2lkdGg9XCIzXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiLz5cbiAgICAgICAgICAgIDxsaW5lIHgxPVwiOS41XCIgeTE9XCIzNC41XCIgeDI9XCIyOS41XCIgeTI9XCIzNC41XCIgc3Ryb2tlPVwid2hpdGVcIiBzdHJva2Utd2lkdGg9XCIzXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiLz5cbiAgICAgICAgPC9zdmc+YCxcbiAgICAgICAgbmFtZTogJ0lQVFYnXG4gICAgfSlcblxuICAgIGlmKExhbXBhLk1hbmlmZXN0LmFwcF9kaWdpdGFsID49IDIwMCl7XG4gICAgICAgIExhbXBhLlNldHRpbmdzQXBpLmFkZFBhcmFtKHtcbiAgICAgICAgICAgIGNvbXBvbmVudDogJ2lwdHYnLFxuICAgICAgICAgICAgcGFyYW06IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpZWxkOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2lwdHZfcGFyYW1fZ3VpZGUnKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNoYW5nZTogKCk9PntcbiAgICAgICAgICAgICAgICBMYW1wYS5TZXR0aW5ncy5jcmVhdGUoJ2lwdHZfZ3VpZGUnLHtcbiAgICAgICAgICAgICAgICAgICAgb25CYWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuU2V0dGluZ3MuY3JlYXRlKCdpcHR2JylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgTGFtcGEuU2V0dGluZ3NBcGkuYWRkUGFyYW0oe1xuICAgICAgICBjb21wb25lbnQ6ICdpcHR2JyxcbiAgICAgICAgcGFyYW06IHtcbiAgICAgICAgICAgIHR5cGU6ICd0aXRsZSdcbiAgICAgICAgfSxcbiAgICAgICAgZmllbGQ6IHtcbiAgICAgICAgICAgIG5hbWU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdtb3JlJyksXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgTGFtcGEuU2V0dGluZ3NBcGkuYWRkUGFyYW0oe1xuICAgICAgICBjb21wb25lbnQ6ICdpcHR2JyxcbiAgICAgICAgcGFyYW06IHtcbiAgICAgICAgICAgIG5hbWU6ICdpcHR2X3ZpZXdfaW5fbWFpbicsXG4gICAgICAgICAgICB0eXBlOiAndHJpZ2dlcicsXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIGZpZWxkOiB7XG4gICAgICAgICAgICBuYW1lOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl9wYXJhbV92aWV3X2luX21haW4nKSxcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBMYW1wYS5TZXR0aW5nc0FwaS5hZGRQYXJhbSh7XG4gICAgICAgIGNvbXBvbmVudDogJ2lwdHYnLFxuICAgICAgICBwYXJhbToge1xuICAgICAgICAgICAgbmFtZTogJ2lwdHZfdXNlX2RiJyxcbiAgICAgICAgICAgIHR5cGU6ICdzZWxlY3QnLFxuICAgICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICAgICAgaW5kZXhkYjogJ0luZGV4ZWREQicsXG4gICAgICAgICAgICAgICAgc3RvcmFnZTogJ0xvY2FsU3RvcmFnZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVmYXVsdDogJ2luZGV4ZGInXG4gICAgICAgIH0sXG4gICAgICAgIGZpZWxkOiB7XG4gICAgICAgICAgICBuYW1lOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl9wYXJhbV91c2VfZGInKSxcbiAgICAgICAgfSxcbiAgICAgICAgb25DaGFuZ2U6ICgpPT57XG4gICAgICAgICAgICBGYXZvcml0ZXMubG9hZCgpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaXB0di1wbGF5bGlzdC1pdGVtJykuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuVXRpbHMudHJpZ2dlcihlbGVtZW50LCAndXBkYXRlJylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBMYW1wYS5TZXR0aW5nc0FwaS5hZGRQYXJhbSh7XG4gICAgICAgIGNvbXBvbmVudDogJ2lwdHYnLFxuICAgICAgICBwYXJhbToge1xuICAgICAgICAgICAgbmFtZTogJ2lwdHZfZmF2b3RpdGVfc2F2ZScsXG4gICAgICAgICAgICB0eXBlOiAnc2VsZWN0JyxcbiAgICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgICAgIHVybDogJyN7aXB0dl9wYXJhbV9zYXZlX2Zhdm9yaXRlX3VybH0nLFxuICAgICAgICAgICAgICAgIG5hbWU6ICcje2lwdHZfcGFyYW1fc2F2ZV9mYXZvcml0ZV9uYW1lfScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVmYXVsdDogJ3VybCdcbiAgICAgICAgfSxcbiAgICAgICAgZmllbGQ6IHtcbiAgICAgICAgICAgIG5hbWU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdpcHR2X3BhcmFtX3NhdmVfZmF2b3JpdGUnKSxcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBMYW1wYS5TZXR0aW5nc0FwaS5hZGRQYXJhbSh7XG4gICAgICAgIGNvbXBvbmVudDogJ2lwdHYnLFxuICAgICAgICBwYXJhbToge1xuICAgICAgICAgICAgbmFtZTogJ2lwdHZfZmF2b3RpdGVfc29ydCcsXG4gICAgICAgICAgICB0eXBlOiAnc2VsZWN0JyxcbiAgICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgICAgIGFkZDogJyN7aXB0dl9wYXJhbV9zb3J0X2FkZH0nLFxuICAgICAgICAgICAgICAgIG5hbWU6ICcje2lwdHZfcGFyYW1fc29ydF9uYW1lfScsXG4gICAgICAgICAgICAgICAgdmlldzogJyN7aXB0dl9wYXJhbV9zb3J0X3ZpZXd9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdhZGQnXG4gICAgICAgIH0sXG4gICAgICAgIGZpZWxkOiB7XG4gICAgICAgICAgICBuYW1lOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnaXB0dl9wYXJhbV9zb3J0X2Zhdm9yaXRlJyksXG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVuZGVyOiAoaXRlbSk9PntcbiAgICAgICAgICAgIGlmKCFMYW1wYS5BY2NvdW50Lmhhc1ByZW1pdW0oKSl7XG4gICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVDbGFzcygnc2VsZWN0b3InKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGl0ZW0uYXBwZW5kKExhbXBhLlRlbXBsYXRlLmdldCgnY3ViX2lwdHZfcGFyYW1fbG9jaycpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbkNoYW5nZTogKCk9PntcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGluaXRcbn0iLCJmdW5jdGlvbiBpbml0KCl7XG4gICAgbGV0IGRvbWFpbiA9IExhbXBhLk1hbmlmZXN0LmN1Yl9zaXRlIHx8ICdjdWIucmlwJ1xuICAgIFxuICAgIExhbXBhLkxhbmcuYWRkKHtcbiAgICAgICAgaXB0dl9ub3Byb2dyYW06IHtcbiAgICAgICAgICAgIHJ1OiAn0J3QtdGCINC/0YDQvtCz0YDQsNC80LzRiycsXG4gICAgICAgICAgICBlbjogJ05vIHByb2dyYW0nLFxuICAgICAgICAgICAgdWs6ICfQndC10LzQsNGUINC/0YDQvtCz0YDQsNC80LgnLFxuICAgICAgICAgICAgYmU6ICfQndGP0LzQsCDQv9GA0LDQs9GA0LDQvNGLJyxcbiAgICAgICAgICAgIHpoOiAn5rKh5pyJ6IqC55uuJyxcbiAgICAgICAgICAgIHB0OiAnTmVuaHVtIHByb2dyYW1hJyxcbiAgICAgICAgICAgIGJnOiAn0J3Rj9C80LAg0L/RgNC+0LPRgNCw0LzQuCdcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl9ub2xvYWRfcGxheWxpc3Q6IHtcbiAgICAgICAgICAgIHJ1OiAn0Jog0YHQvtC20LDQu9C10L3QuNGOLCDQt9Cw0LPRgNGD0LfQutCwINC/0LvQtdC50LvQuNGB0YLQsCDQvdC1INGD0LTQsNC70LDRgdGMLiDQktC+0LfQvNC+0LbQvdC+LCDQstCw0Ygg0L/RgNC+0LLQsNC50LTQtdGAINC30LDQsdC70L7QutC40YDQvtCy0LDQuyDQt9Cw0LPRgNGD0LfQutGDINC40Lcg0LLQvdC10YjQvdC40YUg0LjRgdGC0L7Rh9C90LjQutC+0LIuJyxcbiAgICAgICAgICAgIGVuOiAnVW5mb3J0dW5hdGVseSwgdGhlIHBsYXlsaXN0IGRvd25sb2FkIGZhaWxlZC4gWW91ciBJU1AgbWF5IGhhdmUgYmxvY2tlZCBkb3dubG9hZHMgZnJvbSBleHRlcm5hbCBzb3VyY2VzLicsXG4gICAgICAgICAgICB1azogJ9Cd0LAg0LbQsNC70YwsINC30LDQstCw0L3RgtCw0LbQtdC90L3RjyDQv9C70LXQudC70LjRgdGC0LAg0L3QtSDQstC00LDQu9C+0YHRjy4g0JzQvtC20LvQuNCy0L4sINCy0LDRiCDQv9GA0L7QstCw0LnQtNC10YAg0LfQsNCx0LvQvtC60YPQstCw0LIg0LfQsNCy0LDQvdGC0LDQttC10L3QvdGPINGW0Lcg0LfQvtCy0L3RltGI0L3RltGFINC00LbQtdGA0LXQuy4nLFxuICAgICAgICAgICAgYmU6ICfQndCw0LbQsNC70YwsINC30LDQs9GA0YPQt9C60LAg0L/Qu9GN0LnQu9GW0YHRgtCwINC90LUg0LDRgtGA0YvQvNCw0LvQsNGB0Y8uINCc0LDQs9GH0YvQvNCwLCDQstCw0Ygg0L/RgNCw0LLQsNC50LTRjdGAINC30LDQsdC70LDQutCw0LLQsNGeINC30LDQs9GA0YPQt9C60YMg0YHQsCDQt9C90LXRiNC90ZbRhSDQutGA0YvQvdGW0YYuJyxcbiAgICAgICAgICAgIHpoOiAn5LiN5bm455qE5piv77yM5pKt5pS+5YiX6KGo5LiL6L295aSx6LSl44CCIOaCqOeahCBJU1Ag5Y+v6IO95bey6Zi75q2i5LuO5aSW6YOo5p2l5rqQ5LiL6L2944CCJyxcbiAgICAgICAgICAgIHB0OiAnSW5mZWxpem1lbnRlLCBvIGRvd25sb2FkIGRhIGxpc3RhIGRlIHJlcHJvZHXDp8OjbyBmYWxob3UuIFNldSBJU1AgcG9kZSB0ZXIgYmxvcXVlYWRvIGRvd25sb2FkcyBkZSBmb250ZXMgZXh0ZXJuYXMuJyxcbiAgICAgICAgICAgIGJnOiAn0JfQsCDRgdGK0LbQsNC70LXQvdC40LUsINGB0LLQsNC70Y/QvdC10YLQviDQvdCwINC/0LvQtdC50LvQuNGB0YLQsNGC0LAg0YHQtSDQv9GA0L7QstCw0LvQuC4g0JLQsNGI0LjRj9GCINC00L7RgdGC0LDQstGH0LjQuiDQvNC+0LbQtSDQtNCwINCx0LvQvtC60LjRgNCwINGB0LLQsNC70Y/QvdC1INC+0YIg0LLRitC90YjQvdC4INC40LfRgtC+0YfQvdC40YbQuC4nXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfc2VsZWN0X3BsYXlsaXN0OiB7XG4gICAgICAgICAgICBydTogJ9CS0YvQsdC10YDQuNGC0LUg0L/Qu9C10LnQu9C40YHRgicsXG4gICAgICAgICAgICBlbjogJ0Nob29zZSBhIHBsYXlsaXN0JyxcbiAgICAgICAgICAgIHVrOiAn0JLQuNCx0LXRgNGW0YLRjCDQv9C70LXQudC70LjRgdGCJyxcbiAgICAgICAgICAgIGJlOiAn0JLRi9Cx0LXRgNGL0YbQtSDQv9C70Y3QudC70ZbRgdGCJyxcbiAgICAgICAgICAgIHpoOiAn6YCJ5oup5LiA5Liq5pKt5pS+5YiX6KGoJyxcbiAgICAgICAgICAgIHB0OiAnRXNjb2xoYSB1bWEgbGlzdGEgZGUgcmVwcm9kdcOnw6NvJyxcbiAgICAgICAgICAgIGJnOiAn0JjQt9Cx0LXRgNC10YLQtSDQv9C70LXQudC70LjRgdGCJ1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X2FsbF9jaGFubmVsczoge1xuICAgICAgICAgICAgcnU6ICfQktGB0LUg0LrQsNC90LDQu9GLJyxcbiAgICAgICAgICAgIGVuOiAnQWxsIGNoYW5uZWxzJyxcbiAgICAgICAgICAgIHVrOiAn0KPRgdGWINC60LDQvdCw0LvQuCcsXG4gICAgICAgICAgICBiZTogJ9Cj0YHQtSDQutCw0L3QsNC70YsnLFxuICAgICAgICAgICAgemg6ICfmiYDmnInpopHpgZMnLFxuICAgICAgICAgICAgcHQ6ICdUb2RvcyBvcyBjYW5haXMnLFxuICAgICAgICAgICAgYmc6ICfQktGB0LjRh9C60Lgg0LrQsNC90LDQu9C4J1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X2FkZF9mYXY6IHtcbiAgICAgICAgICAgIHJ1OiAn0JTQvtCx0LDQstC40YLRjCDQsiDQuNC30LHRgNCw0L3QvdC+0LUnLFxuICAgICAgICAgICAgZW46ICdBZGQgdG8gZmF2b3JpdGVzJyxcbiAgICAgICAgICAgIHVrOiAn0JTQvtC00LDRgtC4INCyINC+0LHRgNCw0L3QtScsXG4gICAgICAgICAgICBiZTogJ9CU0LDQtNCw0YbRjCDRgyDQsNCx0YDQsNC90LDQtScsXG4gICAgICAgICAgICB6aDogJ+a3u+WKoOWIsOaUtuiXj+WkuScsXG4gICAgICAgICAgICBwdDogJ0FkaWNpb25hciBhb3MgZmF2b3JpdG9zJyxcbiAgICAgICAgICAgIGJnOiAn0JTQvtCx0LDQstC4INCyINC40LfQsdGA0LDQvdC4J1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3JlbW92ZV9mYXY6IHtcbiAgICAgICAgICAgIHJ1OiAn0KPQsdGA0LDRgtGMINC40Lcg0LjQt9Cx0YDQsNC90L3QvtCz0L4nLFxuICAgICAgICAgICAgZW46ICdSZW1vdmUgZnJvbSBmYXZvcml0ZXMnLFxuICAgICAgICAgICAgdWs6ICfQn9GA0LjQsdGA0LDRgtC4INC3INCy0LjQsdGA0LDQvdC+0LPQvicsXG4gICAgICAgICAgICBiZTogJ9Cf0YDRi9Cx0YDQsNGG0Ywg0Lcg0LDQsdGA0LDQvdCw0LPQsCcsXG4gICAgICAgICAgICB6aDogJ+S7juaUtuiXj+WkueS4reWIoOmZpCcsXG4gICAgICAgICAgICBwdDogJ1JlbW92ZXIgZG9zIGZhdm9yaXRvcycsXG4gICAgICAgICAgICBiZzogJ9Cf0YDQtdC80LDRhdC90Lgg0L7RgiDQuNC30LHRgNCw0L3QuCdcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl9wbGF5bGlzdF9lbXB0eToge1xuICAgICAgICAgICAgcnU6ICfQmiDRgdC+0LbQsNC70LXQvdC40Y4sINC90LAg0LTQsNC90L3Ri9C5INC80L7QvNC10L3RgiDQstGLINC90LUg0LTQvtCx0LDQstC40LvQuCDQvdC4INC+0LTQvdC+0LPQviDQv9C70LXQudC70LjRgdGC0LAuINCn0YLQvtCx0Ysg0L3QsNGH0LDRgtGMINC/0YDQvtGB0LzQvtGC0YAg0LrQvtC90YLQtdC90YLQsCwg0L/QvtC20LDQu9GD0LnRgdGC0LAsINC/0LXRgNC10LnQtNC40YLQtSDQvdCwINGB0YLRgNCw0L3QuNGG0YMgPHNwYW4gY2xhc3M9XCJpcHR2LWxpbmtcIj4nK2RvbWFpbisnL2lwdHY8L3NwYW4+INC4INC00L7QsdCw0LLRjNGC0LUg0YXQvtGC0Y8g0LHRiyDQvtC00LjQvSDQv9C70LXQudC70LjRgdGCLicsXG4gICAgICAgICAgICBlbjogJ1NvcnJ5LCB5b3UgaGF2ZW5cXCd0IGFkZGVkIGFueSBwbGF5bGlzdCB5ZXQuIFRvIHN0YXJ0IHdhdGNoaW5nIGNvbnRlbnQsIHBsZWFzZSBnbyB0byA8c3BhbiBjbGFzcz1cImlwdHYtbGlua1wiPicrZG9tYWluKycvaXB0djwvc3Bhbj4gYW5kIGFkZCBhdCBsZWFzdCBvbmUgcGxheWxpc3QuJyxcbiAgICAgICAgICAgIHVrOiAn0J3QsCDQttCw0LvRjCwg0L3QsCDQtNCw0L3QuNC5INC80L7QvNC10L3RgiDQstC4INC90LUg0LTQvtC00LDQu9C4INC20L7QtNC90L7Qs9C+INC/0LvQtdC50LvQuNGB0YLQsC4g0KnQvtCxINGA0L7Qt9C/0L7Rh9Cw0YLQuCDQv9C10YDQtdCz0LvRj9C0INC60L7QvdGC0LXQvdGC0YMsINCx0YPQtNGMINC70LDRgdC60LAsINC/0LXRgNC10LnQtNGW0YLRjCDQvdCwINGB0YLQvtGA0ZbQvdC60YMgPHNwYW4gY2xhc3M9XCJpcHR2LWxpbmtcIj4nK2RvbWFpbisnL2lwdHY8L3NwYW4+INGWINC00L7QtNCw0LnRgtC1INGF0L7Rh9CwINCxINC+0LTQuNC9INC/0LvQtdC50LvQuNGB0YIuJyxcbiAgICAgICAgICAgIGJlOiAn0J3QsNC20LDQu9GMLCDQvdCwINC00LDQtNC30LXQvdGLINC80L7QvNCw0L3RgiDQstGLINC90LUg0LTQsNC00LDQu9GWINC90ZbQstC+0LTQvdCw0LPQsCDQv9C70Y3QudC70ZbRgdGC0LAuINCa0LDQsSDQv9Cw0YfQsNGG0Ywg0L/RgNCw0LPQu9GP0LQg0LrQsNC90YLRjdC90YLRgywg0LrQsNC70ZYg0LvQsNGB0LrQsCwg0L/QtdGA0LDQudC00LfRltGG0LUg0L3QsCDRgdGC0LDRgNC+0L3QutGDIDxzcGFuIGNsYXNzPVwiaXB0di1saW5rXCI+Jytkb21haW4rJy9pcHR2PC9zcGFuPiDRliDQtNCw0LTQsNC50YbQtSDRhdCw0YbRjyDQsSDQsNC00LfRltC9INC/0LvRjdC50LvRltGB0YIuJyxcbiAgICAgICAgICAgIHpoOiAn5oqx5q2J77yM5oKo6L+Y5rKh5pyJ5re75Yqg5Lu75L2V5pKt5pS+5YiX6KGo44CCIOimgeW8gOWni+ingueci+WGheWuue+8jOivt+i9rOWIsCA8c3BhbiBjbGFzcz1cImlwdHYtbGlua1wiPicrZG9tYWluKycvaXB0djwvc3Bhbj4g5bm25re75Yqg6Iez5bCR5LiA5Liq5pKt5pS+5YiX6KGo44CCJyxcbiAgICAgICAgICAgIHB0OiAnRGVzY3VscGUsIHZvY8OqIGFpbmRhIG7Do28gYWRpY2lvbm91IG5lbmh1bWEgbGlzdGEgZGUgcmVwcm9kdcOnw6NvLiBQYXJhIGNvbWXDp2FyIGEgYXNzaXN0aXIgbyBjb250ZcO6ZG8sIGFjZXNzZSA8c3BhbiBjbGFzcz1cImlwdHYtbGlua1wiPicrZG9tYWluKycvaXB0djwvc3Bhbj4gZSBhZGljaW9uZSBwZWxvIG1lbm9zIHVtYSBsaXN0YSBkZSByZXByb2R1w6fDo28uJyxcbiAgICAgICAgICAgIGJnOiAn0KHRitC20LDQu9GP0LLQsNC8LCDQvtGJ0LUg0L3QtSDRgdGC0LUg0LTQvtCx0LDQstC40LvQuCDQvdC40LrQsNC60LLQsCDQu9C40YHRgtCwLiDQl9CwINC00LAg0L/QvtGH0L3QtdGC0LUg0LTQsCDQs9C70LXQtNCw0YLQtSwg0LzQvtC70Y8g0LjQtNC10YLQtSDQvdCwIDxzcGFuIGNsYXNzPVwiaXB0di1saW5rXCI+Jytkb21haW4rJy9pcHR2PC9zcGFuPiDQuCDQtNC+0LHQsNCy0LXRgtC1INC/0L7QvdC1INC10LTQvdCwINC70LjRgdGC0LAuJ1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3NlbGVjdF9wbGF5bGlzdF90ZXh0OiB7XG4gICAgICAgICAgICBydTogJ9CU0LvRjyDRgtC+0LPQviDRh9GC0L7QsdGLINC00L7QsdCw0LLQuNGC0Ywg0YHQstC+0Lkg0L/Qu9C10LnQu9C40YHRgiwg0LLQsNC8INC90LXQvtCx0YXQvtC00LjQvNC+INC/0LXRgNC10LnRgtC4INC90LAg0YHQsNC50YIgPHNwYW4gY2xhc3M9XCJpcHR2LWxpbmtcIj4nK2RvbWFpbisnL2lwdHY8L3NwYW4+INC4INC00L7QsdCw0LLQuNGC0Ywg0L/Qu9C10LnQu9C40YHRgiDQvtGCINCy0LDRiNC10LPQviDQv9GA0L7QstCw0LnQtNC10YDQsC4nLFxuICAgICAgICAgICAgZW46ICdJbiBvcmRlciB0byBhZGQgeW91ciBwbGF5bGlzdCwgeW91IG5lZWQgdG8gZ28gdG8gPHNwYW4gY2xhc3M9XCJpcHR2LWxpbmtcIj4nK2RvbWFpbisnL2lwdHY8L3NwYW4+IGFuZCBhZGQgYSBwbGF5bGlzdCBmcm9tIHlvdXIgcHJvdmlkZXIuJyxcbiAgICAgICAgICAgIHVrOiAn0KnQvtCxINC00L7QtNCw0YLQuCDRgdCy0ZbQuSDQv9C70LXQudC70LjRgdGCLCDQstCw0Lwg0L3QtdC+0LHRhdGW0LTQvdC+INC/0LXRgNC10LnRgtC4INC90LAg0YHQsNC50YIgPHNwYW4gY2xhc3M9XCJpcHR2LWxpbmtcIj4nK2RvbWFpbisnL2lwdHY8L3NwYW4+INGWINC00L7QtNCw0YLQuCDQv9C70LXQudC70LjRgdGCINCy0ZbQtCDQstCw0YjQvtCz0L4g0L/RgNC+0LLQsNC50LTQtdGA0LAuJyxcbiAgICAgICAgICAgIGJlOiAn0JTQu9GPINGC0LDQs9C+INC60LDQsSDQtNCw0LTQsNGG0Ywg0YHQstC+0Lkg0L/Qu9GN0LnQu9GW0YHRgiwg0LLQsNC8INC90LXQsNCx0YXQvtC00L3QsCDQv9C10YDQsNC50YHRhtGWINC90LAg0YHQsNC50YIgPHNwYW4gY2xhc3M9XCJpcHR2LWxpbmtcIj4nK2RvbWFpbisnL2lwdHY8L3NwYW4+INGWINC00LDQtNCw0YbRjCDQv9C70Y3QudC70ZbRgdGCINCw0LQg0LLQsNGI0LDQs9CwINC/0YDQsNCy0LDQudC00Y3RgNCwLicsXG4gICAgICAgICAgICB6aDogJ+imgea3u+WKoOaCqOeahOaSreaUvuWIl+ihqO+8jOaCqOmcgOimgeWJjeW+gCA8c3BhbiBjbGFzcz1cImlwdHYtbGlua1wiPicrZG9tYWluKycvaXB0djwvc3Bhbj4g5bm25re75Yqg5p2l6Ieq5oKo55qE5o+Q5L6b5ZWG55qE5pKt5pS+5YiX6KGo44CCJyxcbiAgICAgICAgICAgIHB0OiAnUGFyYSBhZGljaW9uYXIgc3VhIGxpc3RhIGRlIHJlcHJvZHXDp8Ojbywgdm9jw6ogcHJlY2lzYSBhY2Vzc2FyIDxzcGFuIGNsYXNzPVwiaXB0di1saW5rXCI+Jytkb21haW4rJy9pcHR2PC9zcGFuPiBlIGFkaWNpb25hciB1bWEgbGlzdGEgZGUgcmVwcm9kdcOnw6NvIGRvIHNldSBwcm92ZWRvci4nLFxuICAgICAgICAgICAgYmc6ICfQl9CwINC00LAg0LTQvtCx0LDQstC40YLQtSDQstCw0YjQsCDQu9C40YHRgtCwLCDRgtGA0Y/QsdCy0LAg0LTQsCDQvtGC0LjQtNC10YLQtSDQvdCwIDxzcGFuIGNsYXNzPVwiaXB0di1saW5rXCI+Jytkb21haW4rJy9pcHR2PC9zcGFuPiDQuCDQtNCwINC00L7QsdCw0LLQuNGC0LUg0LvQuNGB0YLQsCDQvtGCINCy0LDRiNC40Y/RgiDQtNC+0YHRgtCw0LLRh9C40Log0L3QsCDRgtC10LvQtdCy0LjQt9C40Y8uJ1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3VwZGF0ZWQ6IHtcbiAgICAgICAgICAgIHJ1OiAn0J7QsdC90L7QstC70LXQvdC+JyxcbiAgICAgICAgICAgIGVuOiAnVXBkYXRlZCcsXG4gICAgICAgICAgICB1azogJ9Ce0L3QvtCy0LvQtdC90L4nLFxuICAgICAgICAgICAgYmU6ICfQkNCx0L3QvtGe0LvQtdC90LAnLFxuICAgICAgICAgICAgemg6ICfmm7TmlrAnLFxuICAgICAgICAgICAgcHQ6ICdBdHVhbGl6YWRhJyxcbiAgICAgICAgICAgIGJnOiAn0J7QsdC90L7QstC10L3QvidcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl91cGRhdGU6IHtcbiAgICAgICAgICAgIHJ1OiAn0J7QsdC90L7QstC70LXQvdC40LUnLFxuICAgICAgICAgICAgZW46ICdVcGRhdGUnLFxuICAgICAgICAgICAgdWs6ICfQntC90L7QstC70LXQvdC90Y8nLFxuICAgICAgICAgICAgYmU6ICfQkNCx0L3QsNGe0LvQtdC90L3QtScsXG4gICAgICAgICAgICB6aDogJ+abtOaWsCcsXG4gICAgICAgICAgICBwdDogJ0F0dWFsaXphcicsXG4gICAgICAgICAgICBiZzogJ9Ce0LHQvdC+0LLRj9Cy0LDQvdC1J1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X2FjdGl2ZToge1xuICAgICAgICAgICAgcnU6ICfQkNC60YLQuNCy0L3QvicsXG4gICAgICAgICAgICBlbjogJ0FjdGl2ZWx5JyxcbiAgICAgICAgICAgIHVrOiAn0JDQutGC0LjQstC90L4nLFxuICAgICAgICAgICAgYmU6ICfQkNC60YLRi9Ge0L3QsCcsXG4gICAgICAgICAgICB6aDogJ+enr+aegeWcsCcsXG4gICAgICAgICAgICBwdDogJ0F0aXZhbWVudGUnLFxuICAgICAgICAgICAgYmc6ICfQkNC60YLQuNCy0L3QvidcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl95ZXN0ZXJkYXk6IHtcbiAgICAgICAgICAgIHJ1OiAn0JLRh9C10YDQsCcsXG4gICAgICAgICAgICBlbjogJ1llc3RlcmRheScsXG4gICAgICAgICAgICB1azogJ9CS0YfQvtGA0LAnLFxuICAgICAgICAgICAgYmU6ICfQo9GH0L7RgNCwJyxcbiAgICAgICAgICAgIHpoOiAn5pio5aSpJyxcbiAgICAgICAgICAgIHB0OiAnT250ZW0nLFxuICAgICAgICAgICAgYmc6ICfQktGH0LXRgNCwJ1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3RvZGF5OiB7XG4gICAgICAgICAgICBydTogJ9Ch0LXQs9C+0LTQvdGPJyxcbiAgICAgICAgICAgIGVuOiAnVG9kYXknLFxuICAgICAgICAgICAgdWs6ICfQodGM0L7Qs9C+0LTQvdGWJyxcbiAgICAgICAgICAgIGJlOiAn0KHRkdC90L3RjycsXG4gICAgICAgICAgICB6aDogJ+S7iuWkqScsXG4gICAgICAgICAgICBwdDogJ0hvamUnLFxuICAgICAgICAgICAgYmc6ICfQlNC90LXRgSdcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl90b21vcnJvdzoge1xuICAgICAgICAgICAgcnU6ICfQl9Cw0LLRgtGA0LAnLFxuICAgICAgICAgICAgZW46ICdUb21vcnJvdycsXG4gICAgICAgICAgICB1azogJ9CX0LDQstGC0YDQsCcsXG4gICAgICAgICAgICBiZTogJ9CX0LDRntGC0YDQsCcsXG4gICAgICAgICAgICB6aDogJ+aYjuWkqScsXG4gICAgICAgICAgICBwdDogJ0FtYW5ow6MnLFxuICAgICAgICAgICAgYmc6ICfQo9GC0YDQtSdcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl9sb2FkaW5nOiB7XG4gICAgICAgICAgICBydTogJ9Cc0LXRgtC+0LQg0LfQsNCz0YDRg9C30LrQuCcsXG4gICAgICAgICAgICBlbjogJ0Rvd25sb2FkIG1ldGhvZCcsXG4gICAgICAgICAgICB1azogJ9Cc0LXRgtC+0LQg0LfQsNCy0LDQvdGC0LDQttC10L3QvdGPJyxcbiAgICAgICAgICAgIGJlOiAn0JzQtdGC0LDQtCDQt9Cw0LPRgNGD0LfQutGWJyxcbiAgICAgICAgICAgIHpoOiAn5LiL6L295pa55byPJyxcbiAgICAgICAgICAgIHB0OiAnTcOpdG9kbyBkZSBkb3dubG9hZCcsXG4gICAgICAgICAgICBiZzogJ9Cc0LXRgtC+0LQg0L3QsCDQt9Cw0YDQtdC20LTQsNC90LUnXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfcGFyYW1zX2N1Yjoge1xuICAgICAgICAgICAgcnU6ICdDVUInLFxuICAgICAgICAgICAgZW46ICdDVUInLFxuICAgICAgICAgICAgdWs6ICdDVUInLFxuICAgICAgICAgICAgYmU6ICdDVUInLFxuICAgICAgICAgICAgemg6ICdDVUInLFxuICAgICAgICAgICAgcHQ6ICdDVUInLFxuICAgICAgICAgICAgYmc6ICdDVUInXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfcGFyYW1zX2xhbXBhOiB7XG4gICAgICAgICAgICBydTogJ0xhbXBhJyxcbiAgICAgICAgICAgIGVuOiAnTGFtcGEnLFxuICAgICAgICAgICAgdWs6ICdMYW1wYScsXG4gICAgICAgICAgICBiZTogJ0xhbXBhJyxcbiAgICAgICAgICAgIHpoOiAnTGFtcGEnLFxuICAgICAgICAgICAgcHQ6ICdMYW1wYScsXG4gICAgICAgICAgICBiZzogJ0xhbXBhJ1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3JlbW92ZV9jYWNoZToge1xuICAgICAgICAgICAgcnU6ICfQo9C00LDQu9C40YLRjCDQutC10YgnLFxuICAgICAgICAgICAgZW46ICdEZWxldGUgY2FjaGUnLFxuICAgICAgICAgICAgdWs6ICfQktC40LTQsNC70LjRgtC4INC60LXRiCcsXG4gICAgICAgICAgICBiZTogJ9CS0YvQtNCw0LvRltGG0Ywg0LrRjdGIJyxcbiAgICAgICAgICAgIHpoOiAn5Yig6Zmk57yT5a2YJyxcbiAgICAgICAgICAgIHB0OiAnRXhjbHVpciBjYWNoZScsXG4gICAgICAgICAgICBiZzogJ9CY0LfRgtGA0LjQstCw0L3QtSDQvdCwINC60LXRiCdcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl9yZW1vdmVfY2FjaGVfZGVzY3I6IHtcbiAgICAgICAgICAgIHJ1OiAn0KPQtNCw0LvQuNGC0Ywg0L/Qu9C10LnQu9C40YHRgiDQuNC3INC60LXRiNCwJyxcbiAgICAgICAgICAgIGVuOiAnRGVsZXRlIHBsYXlsaXN0IGZyb20gY2FjaGUnLFxuICAgICAgICAgICAgdWs6ICfQktC40LTQsNC70LjRgtC4INC/0LvQtdC50LvQuNGB0YIg0Lcg0LrQtdGI0YMnLFxuICAgICAgICAgICAgYmU6ICfQktGL0LTQsNC70ZbRhtGMINC/0LvRjdC50LvRltGB0YIg0Lcg0LrRjdGI0YMnLFxuICAgICAgICAgICAgemg6ICfku47nvJPlrZjkuK3liKDpmaTmkq3mlL7liJfooagnLFxuICAgICAgICAgICAgcHQ6ICdFeGNsdWlyIGxpc3RhIGRlIHJlcHJvZHXDp8OjbyBkbyBjYWNoZScsXG4gICAgICAgICAgICBiZzogJ9CY0LfRgtGA0LjQuSDQv9C70LXQudC70LjRgdGC0LAg0L7RgiDQutC10YjQsCdcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl9wYXJhbXNfYWx3YXlzOiB7XG4gICAgICAgICAgICBydTogJ9CS0YHQtdCz0LTQsCcsXG4gICAgICAgICAgICBlbjogJ0Fsd2F5cycsXG4gICAgICAgICAgICB1azogJ9CX0LDQstC20LTQuCcsXG4gICAgICAgICAgICBiZTogJ9CX0LDRntGB0ZHQtNGLJyxcbiAgICAgICAgICAgIHpoOiAn5oC75pivJyxcbiAgICAgICAgICAgIHB0OiAnU2VtcHJlJyxcbiAgICAgICAgICAgIGJnOiAn0JLQuNC90LDQs9C4J1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3BhcmFtc19ob3VyOiB7XG4gICAgICAgICAgICBydTogJ9Ca0LDQttC00YvQuSDRh9Cw0YEnLFxuICAgICAgICAgICAgZW46ICdFYWNoIGhvdXInLFxuICAgICAgICAgICAgdWs6ICfQmtC+0LbQvdGDINCz0L7QtNC40L3RgycsXG4gICAgICAgICAgICBiZTogJ9Ca0L7QttC90YPRjiDQs9Cw0LTQt9GW0L3RgycsXG4gICAgICAgICAgICB6aDogJ+avj+Wwj+aXticsXG4gICAgICAgICAgICBwdDogJ0NhZGEgaG9yYScsXG4gICAgICAgICAgICBiZzogJ9CS0YHQtdC60Lgg0YfQsNGBJ1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3BhcmFtc19ob3VyMTI6IHtcbiAgICAgICAgICAgIHJ1OiAn0JrQsNC20LTRi9C1IDEyINGH0LDRgdC+0LInLFxuICAgICAgICAgICAgZW46ICdFdmVyeSAxMiBob3VycycsXG4gICAgICAgICAgICB1azogJ9Ca0L7QttC90ZYgMTIg0LPQvtC00LjQvScsXG4gICAgICAgICAgICBiZTogJ9Ca0L7QttC90YvRjyAxMiDQs9Cw0LTQt9GW0L0nLFxuICAgICAgICAgICAgemg6ICfmr48xMuWwj+aXticsXG4gICAgICAgICAgICBwdDogJ0EgY2FkYSAxMiBob3JhcycsXG4gICAgICAgICAgICBiZzogJ9CS0YHQtdC60LggMTIg0YfQsNGB0LAnXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfcGFyYW1zX2RheToge1xuICAgICAgICAgICAgcnU6ICfQldC20LXQtNC90LXQstC90L4nLFxuICAgICAgICAgICAgZW46ICdEYWlseScsXG4gICAgICAgICAgICB1azogJ9Cp0L7QtNC90Y8nLFxuICAgICAgICAgICAgYmU6ICfQqNGC0L7QtNC90Y8nLFxuICAgICAgICAgICAgemg6ICfml6XluLjnmoQnLFxuICAgICAgICAgICAgcHQ6ICdEacOhcmlvJyxcbiAgICAgICAgICAgIGJnOiAn0JXQttC10LTQvdC10LLQvdC+J1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3BhcmFtc193ZWVrOiB7XG4gICAgICAgICAgICBydTogJ9CV0LbQtdC90LXQtNC10LvRjNC90L4nLFxuICAgICAgICAgICAgZW46ICdXZWVrbHknLFxuICAgICAgICAgICAgdWs6ICfQqdC+0YLQuNC20L3RjycsXG4gICAgICAgICAgICBiZTogJ9Co0YLQvtGC0YvQtNC30LXQvdGMJyxcbiAgICAgICAgICAgIHpoOiAn5q+P5ZGoJyxcbiAgICAgICAgICAgIHB0OiAnU2VtYW5hbG1lbnRlJyxcbiAgICAgICAgICAgIGJnOiAn0KHQtdC00LzQuNGH0L3QvidcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl9wYXJhbXNfbm9uZToge1xuICAgICAgICAgICAgcnU6ICfQndC40LrQvtCz0LTQsCcsXG4gICAgICAgICAgICBlbjogJ05ldmVyJyxcbiAgICAgICAgICAgIHVrOiAn0J3RltC60L7Qu9C4JyxcbiAgICAgICAgICAgIGJlOiAn0J3RltC60L7Qu9GWJyxcbiAgICAgICAgICAgIHpoOiAn57ud5LiNJyxcbiAgICAgICAgICAgIHB0OiAnTnVuY2EnLFxuICAgICAgICAgICAgYmc6ICfQndC40LrQvtCz0LAnXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfdXBkYXRlX2FwcF90aXRsZToge1xuICAgICAgICAgICAgcnU6ICfQntCx0L3QvtCy0LjRgtC1INC/0YDQuNC70L7QttC10L3QuNC1JyxcbiAgICAgICAgICAgIGVuOiAnVXBkYXRlIHRoZSBhcHAnLFxuICAgICAgICAgICAgdWs6ICfQntC90L7QstC70LXQvdC90Y8g0L/RgNC+0LPRgNCw0LzQuCcsXG4gICAgICAgICAgICBiZTogJ9CQ0LHQvdCw0LLRltGG0LUg0LTQsNC00LDRgtCw0LonLFxuICAgICAgICAgICAgemg6ICfmm7TmlrDlupTnlKjnqIvluo8nLFxuICAgICAgICAgICAgcHQ6ICdBdHVhbGl6ZSBvIGFwbGljYXRpdm8nLFxuICAgICAgICAgICAgYmc6ICfQntCx0L3QvtCy0L3QuCDQv9GA0LjQu9C+0LbQtdC90LjQtSdcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl91cGRhdGVfYXBwX3RleHQ6IHtcbiAgICAgICAgICAgIHJ1OiAn0Jog0YHQvtC20LDQu9C10L3QuNGOLCDQtNC70Y8g0YDQsNCx0L7RgtGLINC/0LvQsNCz0LjQvdCwINC90LXQvtCx0YXQvtC00LjQvNC+INC+0LHQvdC+0LLQuNGC0Ywg0LLQsNGI0YMg0LvQsNC80L/RgyDQv9GD0YLQtdC8INC10LUg0L/QtdGA0LXQt9Cw0LPRgNGD0LfQutC4LiDQntC90LAg0YPRgdGC0LDRgNC10LvQsCDQuCDQsdC10Lcg0Y3RgtC+0Lkg0L/RgNC+0YbQtdC00YPRgNGLINC/0LvQsNCz0LjQvSDQvdC1INCx0YPQtNC10YIg0YTRg9C90LrRhtC40L7QvdC40YDQvtCy0LDRgtGMLicsXG4gICAgICAgICAgICBlbjogJ1VuZm9ydHVuYXRlbHksIGZvciB0aGUgcGx1Z2luIHRvIHdvcmssIHlvdSBuZWVkIHRvIHVwZGF0ZSB5b3VyIGxhbXAgYnkgcmVib290aW5nIGl0LiBJdCBpcyBvdXRkYXRlZCBhbmQgd2l0aG91dCB0aGlzIHByb2NlZHVyZSB0aGUgcGx1Z2luIHdpbGwgbm90IGZ1bmN0aW9uLicsXG4gICAgICAgICAgICB1azogJ9Cd0LAg0LbQsNC70YwsINC00LvRjyDRgNC+0LHQvtGC0Lgg0L/Qu9Cw0LPRltC90LAg0L3QtdC+0LHRhdGW0LTQvdC+INC+0L3QvtCy0LjRgtC4INC70LDQvNC/0YMg0YjQu9GP0YXQvtC8INGX0Zcg0L/QtdGA0LXQt9Cw0LLQsNC90YLQsNC20LXQvdC90Y8uINCS0L7QvdCwINC30LDRgdGC0LDRgNGW0LvQsCDRliDQsdC10Lcg0YbRltGU0Zcg0L/RgNC+0YbQtdC00YPRgNC4INC/0LvQsNCz0ZbQvSDQvdC1INGE0YPQvdC60YbRltC+0L3Rg9Cy0LDRgtC40LzQtS4nLFxuICAgICAgICAgICAgYmU6ICfQndCw0LbQsNC70YwsINC00LvRjyDQv9GA0LDRhtGLINC/0LvQsNCz0ZbQvdCwINC90LXQsNCx0YXQvtC00L3QsCDQsNCx0L3QsNCy0ZbRhtGMINCy0LDRiNGDINC70Y/QvNC/0YMg0YjQu9GP0YXQsNC8INGP0LUg0L/QtdGA0LDQt9Cw0LPRgNGD0LfQutGWLiDQr9C90LAg0YHQsNGB0YLQsNGA0Y3Qu9Cw0Y8g0ZYg0LHQtdC3INCz0Y3RgtCw0Lkg0L/RgNCw0YbRjdC00YPRgNGLINC/0LvRj9Cz0ZbQvSDQvdC1INCx0YPQtNC30LUg0YTRg9C90LrRhtGL0Y/QvdCw0LLQsNGG0YwuJyxcbiAgICAgICAgICAgIHpoOiAn5LiN5bm455qE5piv77yM6KaB5L2/5o+S5Lu25q2j5bi45bel5L2c77yM5oKo6ZyA6KaB6YCa6L+H6YeN5paw5ZCv5Yqo5p2l5pu05paw54Gv5rOh44CCIOWug+W3sui/h+aXtu+8jOWmguaenOayoeacieatpOeoi+W6j++8jOaPkuS7tuWwhuaXoOazlei/kOihjOOAgicsXG4gICAgICAgICAgICBwdDogJ0luZmVsaXptZW50ZSwgcGFyYSBxdWUgbyBwbHVnLWluIGZ1bmNpb25lLCB2b2PDqiBwcmVjaXNhIGF0dWFsaXphciBzdWEgbMOibXBhZGEgcmVpbmljaWFuZG8tYS4gRXN0w6EgZGVzYXR1YWxpemFkbyBlIHNlbSBlc3RlIHByb2NlZGltZW50byBvIHBsdWdpbiBuw6NvIGZ1bmNpb25hcsOhLicsXG4gICAgICAgICAgICBiZzogJ9CX0LAg0YHRitC20LDQu9C10L3QuNC1LCDQt9CwINC00LAg0YDQsNCx0L7RgtC4INC00L7QsdCw0LLQutCwLCDRgtGA0Y/QsdCy0LAg0LTQsCDQvtCx0L3QvtCy0LjRgtC1INCy0LDRiNCw0YLQsCBMYW1wYSDQuCDQtNCwINGPINGA0LXRgdGC0LDRgNGC0LjRgNCw0YLQtS4g0J/RgNC40LvQvtC20LXQvdC40LXRgtC+INC90LUg0LUg0LDQutGC0YPQsNC70L3QviDQuCDQsdC10Lcg0YLQsNC30Lgg0L/RgNC+0YbQtdC00YPRgNCwINC00L7QsdCw0LLQutCw0YLQsCDQvdC1INC80L7QttC1INC00LAg0YDQsNCx0L7RgtC4J1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3BhcmFtX3NvcnRfYWRkOiB7XG4gICAgICAgICAgICBydTogJ9Cf0L4g0LTQvtCx0LDQstC70LXQvdC40Y4nLFxuICAgICAgICAgICAgZW46ICdCeSBhZGRpdGlvbicsXG4gICAgICAgICAgICB1azogJ9CX0LAg0LTQvtC00LDQstCw0L3QvdGP0LwnLFxuICAgICAgICAgICAgYmU6ICfQn9CwINC00LDQtNCw0L3QvdGWJyxcbiAgICAgICAgICAgIHpoOiAn5oyJ5re75Yqg5pe26Ze0JyxcbiAgICAgICAgICAgIHB0OiAnUG9yIGFkacOnw6NvJyxcbiAgICAgICAgICAgIGJnOiAn0J/QviDQtNC+0LHQsNCy0Y/QvdC1J1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3BhcmFtX3NvcnRfbmFtZToge1xuICAgICAgICAgICAgcnU6ICfQn9C+INC90LDQt9Cy0LDQvdC40Y4nLFxuICAgICAgICAgICAgZW46ICdCeSBuYW1lJyxcbiAgICAgICAgICAgIHVrOiAn0JfQsCDQvdCw0LfQstC+0Y4nLFxuICAgICAgICAgICAgYmU6ICfQn9CwINC90LDQt9Cy0LUnLFxuICAgICAgICAgICAgemg6ICfmjInlkI3np7AnLFxuICAgICAgICAgICAgcHQ6ICdQb3Igbm9tZScsXG4gICAgICAgICAgICBiZzogJ9Cf0L4g0LjQvNC1J1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3BhcmFtX3NvcnRfdmlldzoge1xuICAgICAgICAgICAgcnU6ICfQn9C+INC/0YDQvtGB0LzQvtGC0YDQsNC8JyxcbiAgICAgICAgICAgIGVuOiAnQnkgdmlld3MnLFxuICAgICAgICAgICAgdWs6ICfQl9CwINC/0LXRgNC10LPQu9GP0LTQsNC80LgnLFxuICAgICAgICAgICAgYmU6ICfQn9CwINC/0YDQsNCz0LvRj9C00LDRhScsXG4gICAgICAgICAgICB6aDogJ+aMieingueci+asoeaVsCcsXG4gICAgICAgICAgICBwdDogJ1BvciB2aXN1YWxpemHDp8O1ZXMnLFxuICAgICAgICAgICAgYmc6ICfQn9C+INC/0YDQtdCz0LvQtdC00LgnXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfcGFyYW1fc29ydF9mYXZvcml0ZToge1xuICAgICAgICAgICAgcnU6ICfQodC+0YDRgtC40YDQvtCy0LDRgtGMINC40LfQsdGA0LDQvdC90L7QtScsXG4gICAgICAgICAgICBlbjogJ1NvcnQgYnkgZmF2b3JpdGUnLFxuICAgICAgICAgICAgdWs6ICfQodC+0YDRgtGD0LLQsNGC0Lgg0LIg0L7QsdGA0LDQvdC+0LzRgycsXG4gICAgICAgICAgICBiZTogJ9Ch0LDRgNGC0LDQstCw0YbRjCDQv9CwINCy0YvQsdGA0LDQvdGL0LwnLFxuICAgICAgICAgICAgemg6ICfmjInmlLbol4/mjpLluo8nLFxuICAgICAgICAgICAgcHQ6ICdDbGFzc2lmaWNhciBwb3IgZmF2b3JpdG9zJyxcbiAgICAgICAgICAgIGJnOiAn0KHQvtGA0YLQuNGA0LDQvdC1INC/0L4g0LjQt9Cx0YDQsNC90LgnXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfcHJlbWl1bToge1xuICAgICAgICAgICAgcnU6ICfQlNC+0YHRgtGD0L8g0Log0L3QtdC60L7RgtC+0YDRi9C8INGE0YPQvdC60YbQuNGP0Lwg0LLQvtC30LzQvtC20LXQvSDRgtC+0LvRjNC60L4g0L/RgNC4INC90LDQu9C40YfQuNC4INC/0L7QtNC/0LjRgdC60LggPGI+Q1VCIFByZW1pdW08L2I+JyxcbiAgICAgICAgICAgIGVuOiAnU29tZSBmZWF0dXJlcyBhcmUgb25seSBhdmFpbGFibGUgd2l0aCBhIDxiPkNVQiBQcmVtaXVtPC9iPiBzdWJzY3JpcHRpb24nLFxuICAgICAgICAgICAgdWs6ICfQlNC+0YHRgtGD0L8g0LTQviDQtNC10Y/QutC40YUg0YTRg9C90LrRhtGW0Lkg0LzQvtC20LvQuNCy0LjQuSDQu9C40YjQtSDQt9CwINC90LDRj9Cy0L3QvtGB0YLRliDQv9C10YDQtdC00L/Qu9Cw0YLQuCA8Yj5DVUIgUHJlbWl1bTwvYj4nLFxuICAgICAgICAgICAgYmU6ICfQlNC+0YHRgtGD0L8g0LTQsCDQvdC10LrQsNGC0L7RgNGL0YUg0YTRg9C90LrRhtGL0Lkg0LzQsNCz0YfRi9C80Ysg0YLQvtC70YzQutGWINC/0YDRiyDQvdCw0Y/RntC90LDRgdGG0ZYg0L/QsNC00L/RltGB0LrRliA8Yj5DVUIgUHJlbWl1bTwvYj4nLFxuICAgICAgICAgICAgemg6ICfmn5Dkupvlip/og73ku4XpgILnlKjkuo4gPGI+Q1VCIFByZW1pdW08L2I+IOiuoumYhScsXG4gICAgICAgICAgICBwdDogJ0FsZ3VucyByZWN1cnNvcyBlc3TDo28gZGlzcG9uw612ZWlzIGFwZW5hcyBjb20gdW1hIGFzc2luYXR1cmEgPGI+Q1VCIFByZW1pdW08L2I+JyxcbiAgICAgICAgICAgIGJnOiAn0JTQvtGB0YLRitC/0YrRgiDQtNC+INC90Y/QutC+0Lgg0YTRg9C90LrRhtC40Lgg0LUg0L3QsNC70LjRh9C10L0g0YHQsNC80L4g0YfRgNC10LcgPGI+Q1VCIFByZW1pdW08L2I+INCw0LHQvtC90LDQvNC10L3RgidcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl9wYXJhbV9zYXZlX2Zhdm9yaXRlOiB7XG4gICAgICAgICAgICBydTogJ9Cc0LXRgtC+0LQg0YXRgNCw0L3QtdC90LjRjyDQuNC30LHRgNCw0L3QvdC+0LPQvicsXG4gICAgICAgICAgICBlbjogJ0Zhdm9yaXRlIHN0b3JhZ2UgbWV0aG9kJyxcbiAgICAgICAgICAgIHVrOiAn0KHQv9C+0YHRltCxINC30LHQtdGA0ZbQs9Cw0L3QvdGPINC+0LHRgNCw0L3QvtCz0L4nLFxuICAgICAgICAgICAgYmU6ICfQnNC10YLQsNC0INC30LDRhdC+0Z7QstCw0L3QvdGPINCw0LHRgNCw0L3QsNCz0LAnLFxuICAgICAgICAgICAgemg6ICfmlLbol4/lrZjlgqjmlrnms5UnLFxuICAgICAgICAgICAgcHQ6ICdNw6l0b2RvIGRlIGFybWF6ZW5hbWVudG8gZmF2b3JpdG8nLFxuICAgICAgICAgICAgYmc6ICfQndCw0YfQuNC9INC90LAg0YHRitGA0YXQsNC90LXQvdC40LUg0L3QsCDRhNCw0LLQvtGA0LjRgtC4J1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3BhcmFtX3NhdmVfZmF2b3JpdGVfdXJsOiB7XG4gICAgICAgICAgICBydTogJ9Cf0L4g0LDQtNGA0LXRgdGDINC60LDQvdCw0LvQsCcsXG4gICAgICAgICAgICBlbjogJ0J5IGNoYW5uZWwgVVJMJyxcbiAgICAgICAgICAgIHVrOiAn0JfQsCBVUkwt0LDQtNGA0LXRgdC+0Y4g0LrQsNC90LDQu9GDJyxcbiAgICAgICAgICAgIGJlOiAn0J/QsCBVUkwt0LDQtNGA0Y3RgdC1INC60LDQvdCw0LvQsCcsXG4gICAgICAgICAgICB6aDogJ+aMiemikemBk+e9keWdgCcsXG4gICAgICAgICAgICBwdDogJ1BvciBVUkwgZG8gY2FuYWwnLFxuICAgICAgICAgICAgYmc6ICfQn9C+IFVSTCDQvdCwINC60LDQvdCw0LvQsCdcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl9wYXJhbV9zYXZlX2Zhdm9yaXRlX25hbWU6IHtcbiAgICAgICAgICAgIHJ1OiAn0J/QviDQvdCw0LfQstCw0L3QuNGOINC60LDQvdCw0LvQsCcsXG4gICAgICAgICAgICBlbjogJ0J5IGNoYW5uZWwgbmFtZScsXG4gICAgICAgICAgICB1azogJ9CX0LAg0L3QsNC30LLQvtGOINC60LDQvdCw0LvRgycsXG4gICAgICAgICAgICBiZTogJ9Cf0LAg0L3QsNC30LLQtSDQutCw0L3QsNC70LAnLFxuICAgICAgICAgICAgemg6ICfmjInpopHpgZPlkI3np7AnLFxuICAgICAgICAgICAgcHQ6ICdQb3Igbm9tZSBkbyBjYW5hbCcsXG4gICAgICAgICAgICBiZzogJ9Cf0L4g0LjQvNC1INC90LAg0LrQsNC90LDQu9CwJ1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3BhcmFtX3VzZV9kYjoge1xuICAgICAgICAgICAgcnU6ICfQmNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0LHQsNC30YMg0LTQsNC90L3Ri9GFJyxcbiAgICAgICAgICAgIGVuOiAnVXNlIGRhdGFiYXNlJyxcbiAgICAgICAgICAgIHVrOiAn0JLQuNC60L7RgNC40YHRgtC+0LLRg9Cy0LDRgtC4INCx0LDQt9GDINC00LDQvdC40YUnLFxuICAgICAgICAgICAgYmU6ICfQktGL0LrQsNGA0YvRgdGC0L7RntCy0LDRhtGMINCx0LDQt9GDINC00LDQtNC30LXQvdGL0YUnLFxuICAgICAgICAgICAgemg6ICfkvb/nlKjmlbDmja7lupMnLFxuICAgICAgICAgICAgcHQ6ICdVdGlsaXphciBiYW5jbyBkZSBkYWRvcycsXG4gICAgICAgICAgICBiZzogJ9CY0LfQv9C+0LvQt9Cy0LDQudC60Lgg0LHQsNC30LAg0LTQsNC90L3QuCdcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl9wYXJhbV9ndWlkZToge1xuICAgICAgICAgICAgcnU6ICfQotC10LvQtdCz0LjQtCcsXG4gICAgICAgICAgICBlbjogJ1RWIEd1aWRlJyxcbiAgICAgICAgICAgIHVrOiAn0KLQtdC70LXQs9GW0LQnLFxuICAgICAgICAgICAgYmU6ICfQotGN0LvQtdCz0ZbQtCcsXG4gICAgICAgICAgICB6aDogJ+eUteinhuaMh+WNlycsXG4gICAgICAgICAgICBwdDogJ0d1aWEgZGUgVFYnLFxuICAgICAgICAgICAgYmc6ICfQotC10LvQtdCy0LjQt9C40L7QvdC10L0g0YHQv9GA0LDQstC+0YfQvdC40LonXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfc2VhcmNoX25vX3Jlc3VsdDoge1xuICAgICAgICAgICAgcnU6ICfQndC10YIg0YDQtdC30YPQu9GM0YLQsNGC0L7QsiDQv9C+INC30LDQv9GA0L7RgdGDJyxcbiAgICAgICAgICAgIGVuOiAnTm8gcmVzdWx0cyBmb3VuZCcsXG4gICAgICAgICAgICB1azogJ9Cd0LXQvNCw0ZQg0YDQtdC30YPQu9GM0YLQsNGC0ZbQsiDQt9CwINC30LDQv9C40YLQvtC8JyxcbiAgICAgICAgICAgIGJlOiAn0J3Rj9C80LAg0LLRi9C90ZbQutCw0Z4g0L/QsCDQt9Cw0L/Ri9GG0LUnLFxuICAgICAgICAgICAgemg6ICfmnKrmib7liLDnu5PmnpwnLFxuICAgICAgICAgICAgcHQ6ICdOZW5odW0gcmVzdWx0YWRvIGVuY29udHJhZG8nLFxuICAgICAgICAgICAgYmc6ICfQndGP0LzQsCDQvdCw0LzQtdGA0LXQvdC4INGA0LXQt9GD0LvRgtCw0YLQuCdcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl9ndWlkZV9zdGF0dXNfdXBkYXRlX3dhaXQ6IHtcbiAgICAgICAgICAgIHJ1OiAn0JjQtNC10YIg0L/RgNC+0YbQtdGB0YEg0L7QsdC90L7QstC70LXQvdC40Y8sINC/0L7QtNC+0LbQtNC40YLQtS4uLicsXG4gICAgICAgICAgICBlbjogJ1VwZGF0aW5nIHByb2Nlc3MgaW4gcHJvZ3Jlc3MsIHBsZWFzZSB3YWl0Li4uJyxcbiAgICAgICAgICAgIHVrOiAn0JnQtNC1INC/0YDQvtGG0LXRgSDQvtC90L7QstC70LXQvdC90Y8sINC30LDRh9C10LrQsNC50YLQtS4uLicsXG4gICAgICAgICAgICBiZTogJ9CG0LTQt9C1INC/0YDQsNGG0Y3RgSDQsNCx0L3QsNGe0LvQtdC90L3Rjywg0LrQsNC70ZYg0LvQsNGB0LrQsCwg0L/QsNGH0LDQutCw0LnRhtC1Li4uJyxcbiAgICAgICAgICAgIHpoOiAn5pu05paw6L+H56iL5q2j5Zyo6L+b6KGM77yM6K+356iN562JLi4uJyxcbiAgICAgICAgICAgIHB0OiAnUHJvY2Vzc28gZGUgYXR1YWxpemHDp8OjbyBlbSBhbmRhbWVudG8sIGFndWFyZGUuLi4nLFxuICAgICAgICAgICAgYmc6ICfQn9GA0L7RhtC10YHRitGCINC90LAg0LDQutGC0YPQsNC70LjQt9Cw0YbQuNGPINC1INCyINGF0L7QtCwg0LzQvtC70Y8g0LjQt9GH0LDQutCw0LnRgtC1Li4uJ1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X2d1aWRlX3N0YXR1c191cGRhdGU6IHtcbiAgICAgICAgICAgIHJ1OiAn0JjQtNC10YIg0L7QsdC90L7QstC70LXQvdC40LUnLFxuICAgICAgICAgICAgZW46ICdVcGRhdGUgaW4gcHJvZ3Jlc3MnLFxuICAgICAgICAgICAgdWs6ICfQmdC00LUg0L7QvdC+0LLQu9C10L3QvdGPJyxcbiAgICAgICAgICAgIGJlOiAn0IbQtNC30LUg0LDQsdC90LDRntC70LXQvdC90LUnLFxuICAgICAgICAgICAgemg6ICfmm7TmlrDov5vooYzkuK0nLFxuICAgICAgICAgICAgcHQ6ICdBdHVhbGl6YcOnw6NvIGVtIGFuZGFtZW50bycsXG4gICAgICAgICAgICBiZzogJ9CQ0LrRgtGD0LDQu9C40LfQsNGG0LjRjyDQsiDRhdC+0LQnXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfZ3VpZGVfc3RhdHVzX3BhcnNpbmc6IHtcbiAgICAgICAgICAgIHJ1OiAn0J/QsNGA0YHQuNC90LMnLFxuICAgICAgICAgICAgZW46ICdQYXJzaW5nJyxcbiAgICAgICAgICAgIHVrOiAn0JDQvdCw0LvRltC3JyxcbiAgICAgICAgICAgIGJlOiAn0JDQvdCw0LvRltC3JyxcbiAgICAgICAgICAgIHpoOiAn6Kej5p6Q5LitJyxcbiAgICAgICAgICAgIHB0OiAnQW5hbGlzYW5kbycsXG4gICAgICAgICAgICBiZzogJ9CQ0L3QsNC70LjQtydcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl9ndWlkZV9zdGF0dXNfZmluaXNoOiB7XG4gICAgICAgICAgICBydTogJ9Ch0YLQsNGC0YPRgSDQv9C+0YHQu9C10LTQvdC10LPQviDQvtCx0L3QvtCy0LvQtdC90LjRjycsXG4gICAgICAgICAgICBlbjogJ1N0YXR1cyBvZiB0aGUgbGFzdCB1cGRhdGUnLFxuICAgICAgICAgICAgdWs6ICfQodGC0LDRgtGD0YEg0L7RgdGC0LDQvdC90YzQvtCz0L4g0L7QvdC+0LLQu9C10L3QvdGPJyxcbiAgICAgICAgICAgIGJlOiAn0KHRgtCw0YLRg9GBINCw0L/QvtGI0L3Rj9Cz0LAg0LDQsdC90LDRntC70LXQvdC90Y8nLFxuICAgICAgICAgICAgemg6ICfmnIDlkI7mm7TmlrDnirbmgIEnLFxuICAgICAgICAgICAgcHQ6ICdFc3RhZG8gZGEgw7psdGltYSBhdHVhbGl6YcOnw6NvJyxcbiAgICAgICAgICAgIGJnOiAn0KHRitGB0YLQvtGP0L3QuNC1INC90LAg0L/QvtGB0LvQtdC00L3QvtGC0L4g0L7QsdC90L7QstC70LXQvdC40LUnXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfZ3VpZGVfc3RhdHVzX2NoYW5uZWxzOiB7XG4gICAgICAgICAgICBydTogJ9Ca0LDQvdCw0LvQvtCyJyxcbiAgICAgICAgICAgIGVuOiAnQ2hhbm5lbHMnLFxuICAgICAgICAgICAgdWs6ICfQmtCw0L3QsNC70ZbQsicsXG4gICAgICAgICAgICBiZTogJ9Ca0LDQvdCw0LvQsNGeJyxcbiAgICAgICAgICAgIHpoOiAn6aKR6YGTJyxcbiAgICAgICAgICAgIHB0OiAnQ2FuYWlzJyxcbiAgICAgICAgICAgIGJnOiAn0JrQsNC90LDQu9C4J1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X2d1aWRlX3N0YXR1c19kYXRlOiB7XG4gICAgICAgICAgICBydTogJ9C+0LHQvdC+0LLQu9C10L3QvicsXG4gICAgICAgICAgICBlbjogJ3VwZGF0ZWQnLFxuICAgICAgICAgICAgdWs6ICfQvtC90L7QstC70LXQvdC+JyxcbiAgICAgICAgICAgIGJlOiAn0LDQsdC90L7RntC70LXQvdCwJyxcbiAgICAgICAgICAgIHpoOiAn5bey5pu05pawJyxcbiAgICAgICAgICAgIHB0OiAnYXR1YWxpemFkbycsXG4gICAgICAgICAgICBiZzogJ9C+0LHQvdC+0LLQtdC90L4nXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfZ3VpZGVfc3RhdHVzX25vdXBkYXRlczoge1xuICAgICAgICAgICAgcnU6ICfQldGJ0LUg0L3QtdGCINC+0LHQvdC+0LLQu9C10L3QuNC5JyxcbiAgICAgICAgICAgIGVuOiAnTm8gdXBkYXRlcyB5ZXQnLFxuICAgICAgICAgICAgdWs6ICfQqdC1INC90LXQvNCw0ZQg0L7QvdC+0LLQu9C10L3RjCcsXG4gICAgICAgICAgICBiZTogJ9Cv0YjRh9GNINC90Y/QvNCwINCw0LHQvdCw0Z7Qu9C10L3QvdGP0Z4nLFxuICAgICAgICAgICAgemg6ICfmmoLml6Dmm7TmlrAnLFxuICAgICAgICAgICAgcHQ6ICdBaW5kYSBzZW0gYXR1YWxpemHDp8O1ZXMnLFxuICAgICAgICAgICAgYmc6ICfQktGB0LUg0L7RidC1INC90Y/QvNCwINCw0LrRgtGD0LDQu9C40LfQsNGG0LjQuCdcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl9ndWlkZV9lcnJvcl9saW5rOiB7XG4gICAgICAgICAgICBydTogJ9Cj0LrQsNC20LjRgtC1INGB0YHRi9C70LrRgyDQvdCwINGC0LXQu9C10LPQuNC0JyxcbiAgICAgICAgICAgIGVuOiAnU3BlY2lmeSB0aGUgVFYgZ3VpZGUgbGluaycsXG4gICAgICAgICAgICB1azogJ9CS0LrQsNC20ZbRgtGMINC/0L7RgdC40LvQsNC90L3RjyDQvdCwINGC0LXQu9C10LPRltC0JyxcbiAgICAgICAgICAgIGJlOiAn0J/QsNC60LDQttGL0YbQtSDRgdC/0LDRgdGL0LvQutGDINC90LAg0YLRjdC70LXQs9GW0LQnLFxuICAgICAgICAgICAgemg6ICfor7fmjIflrprnlLXop4bmjIfljZfpk77mjqUnLFxuICAgICAgICAgICAgcHQ6ICdJbmRpcXVlIG8gbGluayBkbyBndWlhIGRlIFRWJyxcbiAgICAgICAgICAgIGJnOiAn0J/QvtGB0L7Rh9C10YLQtSDQstGA0YrQt9C60LDRgtCwINC60YrQvCDRgtC10LvQtdCz0LjQtNCwJ1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3BhcmFtX2d1aWRlX2N1c3RvbV90aXRsZToge1xuICAgICAgICAgICAgcnU6ICfQmNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0YHQstC+0Y4g0YHRgdGL0LvQutGDJyxcbiAgICAgICAgICAgIGVuOiAnVXNlIHlvdXIgb3duIGxpbmsnLFxuICAgICAgICAgICAgdWs6ICfQktC40LrQvtGA0LjRgdGC0L7QstGD0LnRgtC1INGB0LLQvtGUINC/0L7RgdC40LvQsNC90L3RjycsXG4gICAgICAgICAgICBiZTogJ9CS0YvQutCw0YDRi9GB0YLQvtGe0LLQsNC50YbQtSDRgdCy0LDRjiDRgdC/0LDRgdGL0LvQutGDJyxcbiAgICAgICAgICAgIHpoOiAn5L2/55So5oKo6Ieq5bex55qE6ZO+5o6lJyxcbiAgICAgICAgICAgIHB0OiAnVXNlIHNldSBwcsOzcHJpbyBsaW5rJyxcbiAgICAgICAgICAgIGJnOiAn0JjQt9C/0L7Qu9C30LLQsNC50YLQtSDRgdCy0L7Rj9GC0LAg0LLRgNGK0LfQutCwJ1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3BhcmFtX2d1aWRlX2N1c3RvbV9kZXNjcjoge1xuICAgICAgICAgICAgcnU6ICfQo9C60LDQttC40YLQtSDRgdCy0L7RjiDRgdGB0YvQu9C60YMg0L3QsCDRgtC10LvQtdCz0LjQtCwg0LXRgdC70Lgg0L3QtSDRhdC+0YLQuNGC0LUg0LjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMINGC0LXQu9C10LPQuNC0INC+0YIgQ1VCJyxcbiAgICAgICAgICAgIGVuOiAnU3BlY2lmeSB5b3VyIFRWIGd1aWRlIGxpbmsgaWYgeW91IGRvIG5vdCB3YW50IHRvIHVzZSB0aGUgQ1VCIFRWIGd1aWRlJyxcbiAgICAgICAgICAgIHVrOiAn0JLQutCw0LbRltGC0Ywg0YHQstC+0ZQg0L/QvtGB0LjQu9Cw0L3QvdGPINC90LAg0YLQtdC70LXQs9GW0LQsINGP0LrRidC+INCy0Lgg0L3QtSDRhdC+0YfQtdGC0LUg0LLQuNC60L7RgNC40YHRgtC+0LLRg9Cy0LDRgtC4INGC0LXQu9C10LPRltC0INCy0ZbQtCBDVUInLFxuICAgICAgICAgICAgYmU6ICfQn9Cw0LrQsNC20YvRhtC1INGB0LLQsNGOINGB0L/QsNGB0YvQu9C60YMg0L3QsCDRgtGN0LvQtdCz0ZbQtCwg0LrQsNC70ZYg0LLRiyDQvdC1INGF0L7Rh9Cw0YbQtSDQstGL0LrQsNGA0YvRgdGC0L7RntCy0LDRhtGMINGC0Y3Qu9C10LPRltC0INCw0LQgQ1VCJyxcbiAgICAgICAgICAgIHpoOiAn5aaC5p6c5oKo5LiN5oOz5L2/55SoQ1VC55S16KeG5oyH5Y2X77yM6K+35oyH5a6a5oKo55qE55S16KeG5oyH5Y2X6ZO+5o6lJyxcbiAgICAgICAgICAgIHB0OiAnRXNwZWNpZmlxdWUgc2V1IGxpbmsgZG8gZ3VpYSBkZSBUViBzZSBuw6NvIHF1aXNlciB1c2FyIG8gZ3VpYSBkZSBUViBkYSBDVUInLFxuICAgICAgICAgICAgYmc6ICfQo9GC0L7Rh9C90LXRgtC1INGB0LLQvtGP0YLQsCDQstGA0YrQt9C60LAg0LrRitC8INGC0LXQu9C10LPQuNC00LAsINCw0LrQviDQvdC1INC40YHQutCw0YLQtSDQtNCwINC40LfQv9C+0LvQt9Cy0LDRgtC1INGC0L7Qt9C4INC90LAgQ1VCJ1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3BhcmFtX2d1aWRlX3VybF9kZXNjcjoge1xuICAgICAgICAgICAgcnU6ICfQo9C60LDQttC40YLQtSDRgdCy0L7RjiDRgdGB0YvQu9C60YMg0L3QsCDRgtC10LvQtdCz0LjQtCBFUEcnLFxuICAgICAgICAgICAgZW46ICdTcGVjaWZ5IHlvdXIgRVBHIFRWIGd1aWRlIGxpbmsnLFxuICAgICAgICAgICAgdWs6ICfQktC60LDQttGW0YLRjCDRgdCy0L7RlCDQv9C+0YHQuNC70LDQvdC90Y8g0L3QsCDRgtC10LvQtdCz0ZbQtCBFUEcnLFxuICAgICAgICAgICAgYmU6ICfQn9Cw0LrQsNC20YvRhtC1INGB0LLQsNGOINGB0L/QsNGB0YvQu9C60YMg0L3QsCDRgtGN0LvQtdCz0ZbQtCBFUEcnLFxuICAgICAgICAgICAgemg6ICfor7fmjIflrprmgqjnmoTnlLXop4bmjIfljZdFUEfpk77mjqUnLFxuICAgICAgICAgICAgcHQ6ICdFc3BlY2lmaXF1ZSBzZXUgbGluayBkbyBndWlhIGRlIFRWIEVQRycsXG4gICAgICAgICAgICBiZzogJ9Cj0YLQvtGH0L3QtdGC0LUg0YHQstC+0Y/RgtCwINCy0YDRitC30LrQsCDQutGK0Lwg0YLQtdC70LXQs9C40LTQsCBFUEcnXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfcGFyYW1fZ3VpZGVfaW50ZXJ2YWxfdGl0bGU6IHtcbiAgICAgICAgICAgIHJ1OiAn0JjQvdGC0LXRgNCy0LDQuyDQvtCx0L3QvtCy0LvQtdC90LjRjycsXG4gICAgICAgICAgICBlbjogJ1VwZGF0ZSBJbnRlcnZhbCcsXG4gICAgICAgICAgICB1azogJ9CG0L3RgtC10YDQstCw0Lsg0L7QvdC+0LLQu9C10L3QvdGPJyxcbiAgICAgICAgICAgIGJlOiAn0IbQvdGC0Y3RgNCy0LDQuyDQsNCx0L3QsNGe0LvQtdC90L3RjycsXG4gICAgICAgICAgICB6aDogJ+abtOaWsOmXtOmalCcsXG4gICAgICAgICAgICBwdDogJ0ludGVydmFsbyBkZSBhdHVhbGl6YcOnw6NvJyxcbiAgICAgICAgICAgIGJnOiAn0JjQvdGC0LXRgNCy0LDQuyDQt9CwINCw0LrRgtGD0LDQu9C40LfQsNGG0LjRjydcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl9wYXJhbV9ndWlkZV9pbnRlcnZhbF9kZXNjcjoge1xuICAgICAgICAgICAgcnU6ICfQp9C10YDQtdC3INGB0LrQvtC70YzQutC+INGH0LDRgdC+0LIg0L7QsdC90L7QstC70Y/RgtGMINGC0LXQu9C10LPQuNC0JyxcbiAgICAgICAgICAgIGVuOiAnSG93IG1hbnkgaG91cnMgdG8gdXBkYXRlIHRoZSBUViBndWlkZScsXG4gICAgICAgICAgICB1azogJ9Cn0LXRgNC10Lcg0YHQutGW0LvRjNC60Lgg0LPQvtC00LjQvSDQvtC90L7QstC70Y7QstCw0YLQuCDRgtC10LvQtdCz0ZbQtCcsXG4gICAgICAgICAgICBiZTogJ9Cf0YDQsNC3INC60L7Qu9GM0LrRliDQs9Cw0LTQt9GW0L0g0LDQsdC90LDRntC70Y/RhtGMINGC0Y3Qu9C10LPRltC0JyxcbiAgICAgICAgICAgIHpoOiAn5aSa5bCR5bCP5pe25pu05paw55S16KeG5oyH5Y2XJyxcbiAgICAgICAgICAgIHB0OiAnUXVhbnRhcyBob3JhcyBwYXJhIGF0dWFsaXphciBvIGd1aWEgZGUgVFYnLFxuICAgICAgICAgICAgYmc6ICfQn9GA0LXQtyDQutC+0LvQutC+INGH0LDRgdCwINC00LAg0LDQutGC0YPQsNC70LjQt9C40YDQsCDRgtC10LvQtdCy0LjQt9C40L7QvdC90LjRjyDRgdC/0YDQsNCy0L7Rh9C90LjQuidcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl9wYXJhbV9ndWlkZV91cGRhdGVfYWZ0ZXJfc3RhcnQ6IHtcbiAgICAgICAgICAgIHJ1OiAn0J7QsdC90L7QstC40YLRjCDQv9GA0Lgg0LfQsNC/0YPRgdC60LUg0L/RgNC40LvQvtC20LXQvdC40Y8nLFxuICAgICAgICAgICAgZW46ICdVcGRhdGUgb24gYXBwbGljYXRpb24gc3RhcnR1cCcsXG4gICAgICAgICAgICB1azogJ9Ce0L3QvtCy0LjRgtC4INC/0YDQuCDQt9Cw0L/Rg9GB0LrRgyDQtNC+0LTQsNGC0LrQsCcsXG4gICAgICAgICAgICBiZTogJ9CQ0LHQvdCw0LLRltGG0Ywg0L/RgNGLINC30LDQv9GD0YHQutGDINC/0YDRi9C60LvQsNC00LDQvdC90Y8nLFxuICAgICAgICAgICAgemg6ICflkK/liqjlupTnlKjml7bmm7TmlrAnLFxuICAgICAgICAgICAgcHQ6ICdBdHVhbGl6YXIgYW8gaW5pY2lhciBvIGFwbGljYXRpdm8nLFxuICAgICAgICAgICAgYmc6ICfQkNC60YLRg9Cw0LvQuNC30LDRhtC40Y8g0L/RgNC4INGB0YLQsNGA0YLQuNGA0LDQvdC1INC90LAg0L/RgNC40LvQvtC20LXQvdC40LXRgtC+J1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3BhcmFtX2d1aWRlX3VwZGF0ZV9ub3c6IHtcbiAgICAgICAgICAgIHJ1OiAn0J7QsdC90L7QstC40YLRjCDRgtC10LvQtdCz0LjQtCcsXG4gICAgICAgICAgICBlbjogJ1VwZGF0ZSBUViBHdWlkZSBOb3cnLFxuICAgICAgICAgICAgdWs6ICfQntC90L7QstC40YLQuCDRgtC10LvQtdCz0ZbQtCDQt9Cw0YDQsNC3JyxcbiAgICAgICAgICAgIGJlOiAn0JDQsdC90LDQstGW0YbRjCDRgtGN0LvQtdCz0ZbQtCDQt9Cw0YDQsNC3JyxcbiAgICAgICAgICAgIHpoOiAn56uL5Y2z5pu05paw55S16KeG5oyH5Y2XJyxcbiAgICAgICAgICAgIHB0OiAnQXR1YWxpemFyIGd1aWEgZGUgVFYgYWdvcmEnLFxuICAgICAgICAgICAgYmc6ICfQkNC60YLRg9Cw0LvQuNC30LjRgNCw0LnRgtC1INGC0LXQu9C10LLQuNC30LjQvtC90L3QuNGPINGB0L/RgNCw0LLQvtGH0L3QuNC6INGB0LXQs9CwJ1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3BhcmFtX2d1aWRlX3NhdmVfdGl0bGU6IHtcbiAgICAgICAgICAgIHJ1OiAn0KfQuNGB0LvQviDQtNC90LXQuSDRhdGA0LDQvdC10L3QuNGPJyxcbiAgICAgICAgICAgIGVuOiAnTnVtYmVyIG9mIERheXMgdG8gS2VlcCcsXG4gICAgICAgICAgICB1azogJ9Ca0ZbQu9GM0LrRltGB0YLRjCDQtNC90ZbQsiDQt9Cx0LXRgNGW0LPQsNC90L3RjycsXG4gICAgICAgICAgICBiZTogJ9Ca0L7Qu9GM0LrQsNGB0YbRjCDQtNC30ZHQvSDQt9Cw0YXQvtGe0LLQsNC90L3RjycsXG4gICAgICAgICAgICB6aDogJ+S/neWtmOWkqeaVsCcsXG4gICAgICAgICAgICBwdDogJ07Dum1lcm8gZGUgZGlhcyBwYXJhIG1hbnRlcicsXG4gICAgICAgICAgICBiZzogJ9CR0YDQvtC5INC00L3QuCDQt9CwINC30LDQv9Cw0LfQstCw0L3QtSdcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl9wYXJhbV9ndWlkZV9zYXZlX2Rlc2NyOiB7XG4gICAgICAgICAgICBydTogJ9Ch0LrQvtC70YzQutC+INC00L3QtdC5INGF0YDQsNC90LjRgtGMINGC0LXQu9C10LPQuNC0INCyINC60Y3RiNC1JyxcbiAgICAgICAgICAgIGVuOiAnSG93IG1hbnkgZGF5cyB0byBrZWVwIHRoZSBUViBndWlkZSBpbiB0aGUgY2FjaGUnLFxuICAgICAgICAgICAgdWs6ICfQodC60ZbQu9GM0LrQuCDQtNC90ZbQsiDQt9Cx0LXRgNGW0LPQsNGC0Lgg0YLQtdC70LXQs9GW0LQg0YMg0LrQtdGI0ZYnLFxuICAgICAgICAgICAgYmU6ICfQmtC+0LvRjNC60ZYg0LTQt9GR0L0g0LfQsNGF0L7RntCy0LDRhtGMINGC0Y3Qu9C10LPRltC0INGDINC60Y3RiNGLJyxcbiAgICAgICAgICAgIHpoOiAn5Zyo57yT5a2Y5Lit5L+d5a2Y5aSa5bCR5aSp55qE55S16KeG5oyH5Y2XJyxcbiAgICAgICAgICAgIHB0OiAnUXVhbnRvcyBkaWFzIG1hbnRlciBvIGd1aWEgZGUgVFYgbm8gY2FjaGUnLFxuICAgICAgICAgICAgYmc6ICfQl9CwINC60L7Qu9C60L4g0LTQvdC4INC00LAg0YHQtSDQt9Cw0L/QsNC30Lgg0YLQtdC70LXQstC40LfQuNC+0L3QvdC40Y8g0YHQv9GA0LDQstC+0YfQvdC40Log0LIg0LrQtdGI0LAnXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfcGFyYW1fZ3VpZGVfdXBkYXRlX2N1c3RvbToge1xuICAgICAgICAgICAgcnU6ICfQktGA0YPRh9C90YPRjicsXG4gICAgICAgICAgICBlbjogJ01hbnVhbCcsXG4gICAgICAgICAgICB1azogJ9CS0YDRg9GH0L3RgycsXG4gICAgICAgICAgICBiZTogJ9CQ0LTQt9GW0L3QsNGH0LrRgycsXG4gICAgICAgICAgICB6aDogJ+aJi+WKqCcsXG4gICAgICAgICAgICBwdDogJ01hbnVhbCcsXG4gICAgICAgICAgICBiZzogJ9Cg0YrRh9C90L4nXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfbmVlZF91cGRhdGVfYXBwOiB7XG4gICAgICAgICAgICBydTogJ9Ce0LHQvdC+0LLQuNGC0LUg0L/RgNC40LvQvtC20LXQvdC40LUg0LTQviDQv9C+0YHQu9C10LTQvdC10Lkg0LLQtdGA0YHQuNC4JyxcbiAgICAgICAgICAgIGVuOiAnVXBkYXRlIHRoZSBhcHBsaWNhdGlvbiB0byB0aGUgbGF0ZXN0IHZlcnNpb24nLFxuICAgICAgICAgICAgdWs6ICfQntC90L7QstGW0YLRjCDQv9GA0L7Qs9GA0LDQvNGDINC00L4g0L7RgdGC0LDQvdC90YzQvtGXINCy0LXRgNGB0ZbRlycsXG4gICAgICAgICAgICBiZTogJ9CQ0LHQvdC+0LLRltGG0LUg0L/RgNGL0LrQu9Cw0LTQsNC90L3QtSDQtNCwINCw0L/QvtGI0L3Rj9C5INCy0LXRgNGB0ZbRlicsXG4gICAgICAgICAgICB6aDogJ+WNh+e6p+W6lOeUqOeoi+W6j+WIsOacgOaWsOeJiOacrCcsXG4gICAgICAgICAgICBwdDogJ0F0dWFsaXplIG8gYXBsaWNhdGl2byBwYXJhIGEgdmVyc8OjbyBtYWlzIHJlY2VudGUnLFxuICAgICAgICAgICAgYmc6ICfQkNC60YLRg9Cw0LvQuNC30LjRgNCw0LnRgtC1INC/0YDQuNC70L7QttC10L3QuNC10YLQviDQtNC+INC/0L7RgdC70LXQtNC90LDRgtCwINCy0LXRgNGB0LjRjydcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl9jaGFubmVsX2xvY2s6IHtcbiAgICAgICAgICAgIHJ1OiAn0JfQsNCx0LvQvtC60LjRgNC+0LLQsNGC0YwnLFxuICAgICAgICAgICAgZW46ICdMb2NrJyxcbiAgICAgICAgICAgIHVrOiAn0JfQsNCx0LvQvtC60YPQstCw0YLQuCcsXG4gICAgICAgICAgICBiZTogJ9CX0LDQsdC70LDQutCw0LLQsNGG0YwnLFxuICAgICAgICAgICAgemg6ICfplIHlrponLFxuICAgICAgICAgICAgcHQ6ICdCbG9xdWVhcicsXG4gICAgICAgICAgICBiZzogJ9CX0LDQutC70Y7Rh9Cy0LDQvdC1J1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X2NoYW5uZWxfdW5sb2NrOiB7XG4gICAgICAgICAgICBydTogJ9Cg0LDQt9Cx0LvQvtC60LjRgNC+0LLQsNGC0YwnLFxuICAgICAgICAgICAgZW46ICdVbmxvY2snLFxuICAgICAgICAgICAgdWs6ICfQoNC+0LfQsdC70L7QutGD0LLQsNGC0LgnLFxuICAgICAgICAgICAgYmU6ICfQoNCw0LfQsdC70LDQutCw0LLQsNGG0YwnLFxuICAgICAgICAgICAgemg6ICfop6PplIEnLFxuICAgICAgICAgICAgcHQ6ICdEZXNibG9xdWVhcicsXG4gICAgICAgICAgICBiZzogJ9Ce0YLQutC70Y7Rh9Cy0LDQvdC1J1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X2Fib3V0X3RleHQ6IHtcbiAgICAgICAgICAgIHJ1OiAn0KPQtNC+0LHQvdC+0LUg0L/RgNC40LvQvtC20LXQvdC40LUgSVBUViDigJMg0L7RgtC60YDQvtC50YLQtSDQtNC+0YHRgtGD0L8g0Log0LzQvdC+0LbQtdGB0YLQstGDINC60LDQvdCw0LvQvtCyLCDRhNC40LvRjNC80LDQvCDQuCDRgdC10YDQuNCw0LvQsNC8INC/0YDRj9C80L4g0L3QsCDQstCw0YjQtdC8INGC0LXQu9C10LLQuNC30L7RgNC1LiDQmNC90YLRg9C40YLQuNCy0L3Ri9C5INC40L3RgtC10YDRhNC10LnRgSwg0LvQtdCz0LrQsNGPINC90LDQstC40LPQsNGG0LjRjywg0Lgg0LHQtdC30LPRgNCw0L3QuNGH0L3Ri9C1INCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0YDQsNC30LLQu9C10YfQtdC90LjQuSDQvdCwINCy0LDRiNC10Lwg0LHQvtC70YzRiNC+0Lwg0Y3QutGA0LDQvdC1LiDQktCw0Ygg0LvQuNGH0L3Ri9C5INC/0L7RgNGC0LDQuyDQsiDQvNC40YAg0YbQuNGE0YDQvtCy0L7Qs9C+INGC0LXQu9C10LLQuNC00LXQvdC40Y8hJyxcbiAgICAgICAgICAgIGVuOiAnQ29udmVuaWVudCBJUFRWIGFwcGxpY2F0aW9uIC0gYWNjZXNzIGEgdmFyaWV0eSBvZiBjaGFubmVscywgbW92aWVzLCBhbmQgc2VyaWVzIGRpcmVjdGx5IG9uIHlvdXIgdGVsZXZpc2lvbi4gSW50dWl0aXZlIGludGVyZmFjZSwgZWFzeSBuYXZpZ2F0aW9uLCBhbmQgdW5saW1pdGVkIGVudGVydGFpbm1lbnQgcG9zc2liaWxpdGllcyBvbiB5b3VyIGJpZyBzY3JlZW4uIFlvdXIgcGVyc29uYWwgcG9ydGFsIHRvIHRoZSB3b3JsZCBvZiBkaWdpdGFsIHRlbGV2aXNpb24hJyxcbiAgICAgICAgICAgIHVrOiAn0JfRgNGD0YfQvdC40Lkg0LTQvtC00LDRgtC+0LogSVBUViAtINC+0YLRgNC40LzQsNC50YLQtSDQtNC+0YHRgtGD0L8g0LTQviDQsdC10LfQu9GW0YfRliDQutCw0L3QsNC70ZbQsiwg0YTRltC70YzQvNGW0LIg0ZYg0YHQtdGA0ZbQsNC70ZbQsiDQv9GA0Y/QvNC+INC90LAg0LLQsNGI0L7QvNGDINGC0LXQu9C10LLRltC30L7RgNGWLiDQhtC90YLRg9GX0YLQuNCy0L3QuNC5INGW0L3RgtC10YDRhNC10LnRgSwg0LvQtdCz0LrQsCDQvdCw0LLRltCz0LDRhtGW0Y8g0YLQsCDQvdC10L7QsdC80LXQttC10L3RliDQvNC+0LbQu9C40LLQvtGB0YLRliDRgNC+0LfQstCw0LMg0L3QsCDQstCw0YjQvtC80YMg0LLQtdC70LjQutC+0LzRgyDQtdC60YDQsNC90ZYuINCS0LDRiCDQvtGB0L7QsdC40YHRgtC40Lkg0L/QvtGA0YLQsNC7INGDINGB0LLRltGCINGG0LjRhNGA0L7QstC+0LPQviDRgtC10LvQtdCx0LDRh9C10L3QvdGPIScsXG4gICAgICAgICAgICBiZTogJ9CX0YDRg9GH0L3QsNC1INC/0YDRi9C60LvQsNC00LDQvdC90LUgSVBUViAtINCw0YLRgNGL0LzQsNC50YbQtSDQtNC+0YHRgtGD0L8g0LTQsCDRiNC80LDRgtC70ZbQutCw0L3QsNC70YzQvdCw0LPQsCDRgtGN0LvQtdCx0LDRh9Cw0L3QvdGPLCDRhNGW0LvRjNC80LDRniDRliDRgdC10YDRi9GP0LvQsNGeINC/0YDQvtGB0YLQsCDQvdCwINCy0LDRiNGL0Lwg0YLRjdC70LXQstGW0LfQsNGA0YsuINCG0L3RgtGD0ZbRgtGL0Z7QvdGLINGW0L3RgtGN0YDRhNC10LnRgSwg0LvRkdCz0LrQsNGPINC90LDQstGW0LPQsNGG0YvRjyDRliDQvdC10LDQsdC80LXQttCw0LLQsNC90YvRjyDQvNCw0LPRh9GL0LzQsNGB0YbRliDRgNCw0LfQstCw0LMg0L3QsCDQstCw0YjRi9C8INCy0Y/Qu9GW0LrRltC8INGN0LrRgNCw0L3QtS4g0JLQsNGIINCw0YHQsNCx0ZbRgdGC0Ysg0L/QsNGA0YLQsNC7INGDINGB0LLQtdGCINGG0YvRhNGA0LDQstCw0LPQsCDRgtGN0LvQtdCx0LDRh9Cw0L3QvdGPIScsXG4gICAgICAgICAgICB6aDogJ+aWueS+v+eahElQVFblupTnlKjnqIvluo8t55u05o6l5Zyo5oKo55qE55S16KeG5LiK6K6/6Zeu5ZCE56eN6aKR6YGT77yM55S15b2x5ZKM57O75YiX44CC55u06KeC55qE55WM6Z2i77yM566A5Y2V55qE5a+86Iiq5Lul5Y+K5Zyo5oKo55qE5aSn5bGP5bmV5LiK5peg6ZmQ55qE5aix5LmQ5Y+v6IO95oCn44CC5oKo5pWw5a2X55S16KeG5LiW55WM55qE5Liq5Lq66Zeo5oi377yBJyxcbiAgICAgICAgICAgIHB0OiAnQXBsaWNhdGl2byBJUFRWIGNvbnZlbmllbnRlIC0gYWNlc3NlIHVtYSB2YXJpZWRhZGUgZGUgY2FuYWlzLCBmaWxtZXMgZSBzw6lyaWVzIGRpcmV0YW1lbnRlIG5hIHN1YSB0ZWxldmlzw6NvLiBJbnRlcmZhY2UgaW50dWl0aXZhLCBuYXZlZ2HDp8OjbyBmw6FjaWwgZSBwb3NzaWJpbGlkYWRlcyBkZSBlbnRyZXRlbmltZW50byBpbGltaXRhZGFzIG5hIHN1YSB0ZWxhIGdyYW5kZS4gU2V1IHBvcnRhbCBwZXNzb2FsIHBhcmEgbyBtdW5kbyBkYSB0ZWxldmlzw6NvIGRpZ2l0YWwhJyxcbiAgICAgICAgICAgIGJnOiAn0KPQtNC+0LHQvdC+INC/0YDQuNC70L7QttC10L3QuNC1INC30LAgSVBUViAtINC+0YLQstC+0YDQtdGC0LUg0LTQvtGB0YLRitC/INC00L4g0LzQvdC+0LbQtdGB0YLQstC+INC60LDQvdCw0LvQuCwg0YTQuNC70LzQuCDQuCDRgdC10YDQuNCw0LvQuCDQtNC40YDQtdC60YLQvdC+INC90LAg0LLQsNGI0LjRjyDRgtC10LvQtdCy0LjQt9C+0YAuINCY0L3RgtGD0LjRgtC40LLQtdC9INC40L3RgtC10YDRhNC10LnRgSwg0LvQtdGB0L3QsCDQvdCw0LLQuNCz0LDRhtC40Y8g0Lgg0L3QtdC+0LPRgNCw0L3QuNGH0LXQvdC4INCy0YrQt9C80L7QttC90L7RgdGC0Lgg0LfQsCDQt9Cw0LHQsNCy0LvQtdC90LjRjyDQvdCwINCz0L7Qu9C10LzQuNGPINCy0Lgg0LXQutGA0LDQvS4g0JLQsNGI0LjRj9GCINC70LjRh9C10L0g0L/QvtGA0YLQsNC7INC60YrQvCDRgdCy0LXRgtCwINC90LAg0YbQuNGE0YDQvtCy0LDRgtCwINGC0LXQu9C10LLQuNC30LjRjyEnXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfY29uZmlybV9kZWxldGVfcGxheWxpc3Q6IHtcbiAgICAgICAgICAgIHJ1OiAn0JLRiyDRgtC+0YfQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDQv9C70LXQudC70LjRgdGCPycsXG4gICAgICAgICAgICBlbjogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhlIHBsYXlsaXN0PycsXG4gICAgICAgICAgICB1azogJ9CS0Lgg0YLQvtGH0L3QviDRhdC+0YfQtdGC0LUg0LLQuNC00LDQu9C40YLQuCDQv9C70LXQudC70LjRgdGCPycsXG4gICAgICAgICAgICBiZTogJ9CS0Ysg0Z7Qv9GN0Z7QvdC10L3Ri9GPLCDRiNGC0L4g0YXQvtGH0LDRhtC1INCy0YvQtNCw0LvRltGG0Ywg0L/Qu9C10LnQu9GW0YHRgj8nLFxuICAgICAgICAgICAgemg6ICfmgqjnoa7lrpropoHliKDpmaTmkq3mlL7liJfooajlkJfvvJ8nLFxuICAgICAgICAgICAgcHQ6ICdUZW0gY2VydGV6YSBkZSBxdWUgZGVzZWphIGV4Y2x1aXIgYSBsaXN0YSBkZSByZXByb2R1w6fDo28/JyxcbiAgICAgICAgICAgIGJnOiAn0KHQuNCz0YPRgNC90Lgg0LvQuCDRgdGC0LUsINGH0LUg0LjRgdC60LDRgtC1INC00LAg0LjQt9GC0YDQuNC10YLQtSDRgdC/0LjRgdGK0LrQsCDRgSDQutCw0L3QsNC70Lg/J1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X2NhY2hlX2NsZWFyOiB7XG4gICAgICAgICAgICBydTogJ9Ca0LXRiCDRg9C00LDQu9C10L0nLFxuICAgICAgICAgICAgZW46ICdDYWNoZSBjbGVhcmVkJyxcbiAgICAgICAgICAgIHVrOiAn0JrQtdGIINCy0LjQtNCw0LvQtdC90L4nLFxuICAgICAgICAgICAgYmU6ICfQmtC10Ygg0LLRi9C00LDQu9C10L3RiycsXG4gICAgICAgICAgICB6aDogJ+e8k+WtmOW3sua4hemZpCcsXG4gICAgICAgICAgICBwdDogJ0NhY2hlIGxpbXBvJyxcbiAgICAgICAgICAgIGJnOiAn0JrQtdGI0YrRgiDQtSDQuNC30YfQuNGB0YLQtdC9J1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3BsYXlsaXN0X2RlbGV0ZWQ6IHtcbiAgICAgICAgICAgIHJ1OiAn0J/Qu9C10LnQu9C40YHRgiDRg9C00LDQu9C10L0nLFxuICAgICAgICAgICAgZW46ICdQbGF5bGlzdCBkZWxldGVkJyxcbiAgICAgICAgICAgIHVrOiAn0J/Qu9C10LnQu9C40YHRgiDQstC40LTQsNC70LXQvdC+JyxcbiAgICAgICAgICAgIGJlOiAn0J/Qu9C10LnQu9GW0YHRgiDQstGL0LTQsNC70LXQvdGLJyxcbiAgICAgICAgICAgIHpoOiAn5pKt5pS+5YiX6KGo5bey5Yig6ZmkJyxcbiAgICAgICAgICAgIHB0OiAnTGlzdGEgZGUgcmVwcm9kdcOnw6NvIGV4Y2x1w61kYScsXG4gICAgICAgICAgICBiZzogJ9Cf0LvQtdC50LvQuNGB0YLRitGCINC1INC40LfRgtGA0LjRgidcbiAgICAgICAgfSxcbiAgICAgICAgaXB0dl9wbGF5bGlzdF9hZGRfc2V0X3VybDoge1xuICAgICAgICAgICAgcnU6ICfQo9C60LDQttC40YLQtSBVUkwg0L/Qu9C10LnQu9C40YHRgtCwJyxcbiAgICAgICAgICAgIGVuOiAnRW50ZXIgdGhlIHBsYXlsaXN0IFVSTCcsXG4gICAgICAgICAgICB1azogJ9CS0LrQsNC20ZbRgtGMIFVSTCDQv9C70LXQudC70LjRgdGC0LAnLFxuICAgICAgICAgICAgYmU6ICfQo9C60LDQttGL0YbQtSBVUkwg0L/Qu9C10LnQu9GW0YHRgtCwJyxcbiAgICAgICAgICAgIHpoOiAn6K+36L6T5YWl5pKt5pS+5YiX6KGo55qEIFVSTCcsXG4gICAgICAgICAgICBwdDogJ0luc2lyYSBvIFVSTCBkYSBsaXN0YSBkZSByZXByb2R1w6fDo28nLFxuICAgICAgICAgICAgYmc6ICfQktGK0LLQtdC00LXRgtC1IFVSTCDQsNC00YDQtdGB0LAg0L3QsCDQv9C70LXQudC70LjRgdGC0LAnXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfcGxheWxpc3RfYWRkX25ldzoge1xuICAgICAgICAgICAgcnU6ICfQlNC+0LHQsNCy0LjRgtGMINC90L7QstGL0Lkg0L/Qu9C10LnQu9C40YHRgicsXG4gICAgICAgICAgICBlbjogJ0FkZCBuZXcgcGxheWxpc3QnLFxuICAgICAgICAgICAgdWs6ICfQlNC+0LTQsNGC0Lgg0L3QvtCy0LjQuSDQv9C70LXQudC70LjRgdGCJyxcbiAgICAgICAgICAgIGJlOiAn0JTQsNC00LDRhtGMINC90L7QstGLINC/0LvQtdC50LvRltGB0YInLFxuICAgICAgICAgICAgemg6ICfmt7vliqDmlrDmkq3mlL7liJfooagnLFxuICAgICAgICAgICAgcHQ6ICdBZGljaW9uYXIgbm92YSBsaXN0YSBkZSByZXByb2R1w6fDo28nLFxuICAgICAgICAgICAgYmc6ICfQlNC+0LHQsNCy0Y/QvdC1INC90LAg0L3QvtCyINGB0L/QuNGB0YrQuiDRgSDQutCw0L3QsNC70LgnXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfcGxheWxpc3RfdXJsX2NoYW5nZWQ6IHtcbiAgICAgICAgICAgIHJ1OiAn0KHRgdGL0LvQutCwINC40LfQvNC10L3QtdC90LAnLFxuICAgICAgICAgICAgZW46ICdMaW5rIGNoYW5nZWQnLFxuICAgICAgICAgICAgdWs6ICfQn9C+0YHQuNC70LDQvdC90Y8g0LfQvNGW0L3QtdC90L4nLFxuICAgICAgICAgICAgYmU6ICfQodC/0LDRgdGL0LvQutCwINC30LzQtdC90LXQvdCwJyxcbiAgICAgICAgICAgIHpoOiAn6ZO+5o6l5bey5pu05pS5JyxcbiAgICAgICAgICAgIHB0OiAnTGluayBhbHRlcmFkbycsXG4gICAgICAgICAgICBiZzogJ9CS0YDRitC30LrQsNGC0LAg0LUg0L/RgNC+0LzQtdC90LXQvdCwJ1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3BsYXlsaXN0X2FkZF9zZXRfbmFtZToge1xuICAgICAgICAgICAgcnU6ICfQo9C60LDQttC40YLQtSDQvdCw0LfQstCw0L3QuNC1INC/0LvQtdC50LvQuNGB0YLQsCcsXG4gICAgICAgICAgICBlbjogJ0VudGVyIHRoZSBwbGF5bGlzdCBuYW1lJyxcbiAgICAgICAgICAgIHVrOiAn0JLQutCw0LbRltGC0Ywg0L3QsNC30LLRgyDQv9C70LXQudC70LjRgdGC0LAnLFxuICAgICAgICAgICAgYmU6ICfQo9C60LDQttGL0YbQtSDQvdCw0LfQstGDINC/0LvQtdC50LvRltGB0YLQsCcsXG4gICAgICAgICAgICB6aDogJ+ivt+i+k+WFpeaSreaUvuWIl+ihqOWQjeensCcsXG4gICAgICAgICAgICBwdDogJ0luc2lyYSBvIG5vbWUgZGEgbGlzdGEgZGUgcmVwcm9kdcOnw6NvJyxcbiAgICAgICAgICAgIGJnOiAn0JLRitCy0LXQtNC10YLQtSDQuNC80LUg0L3QsCDQv9C70LXQudC70LjRgdGC0LAnXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfcGxheWxpc3RfbmFtZV9jaGFuZ2VkOiB7XG4gICAgICAgICAgICBydTogJ9Cd0LDQt9Cy0LDQvdC40LUg0LjQt9C80LXQvdC10L3QvicsXG4gICAgICAgICAgICBlbjogJ05hbWUgY2hhbmdlZCcsXG4gICAgICAgICAgICB1azogJ9Cd0LDQt9Cy0LAg0LfQvNGW0L3QtdC90LAnLFxuICAgICAgICAgICAgYmU6ICfQndCw0LfQstCwINC30LzQtdC90LXQvdCwJyxcbiAgICAgICAgICAgIHpoOiAn5ZCN56ew5bey5pu05pS5JyxcbiAgICAgICAgICAgIHB0OiAnTm9tZSBhbHRlcmFkbycsXG4gICAgICAgICAgICBiZzogJ9CY0LzQtdGC0L4g0LUg0L/RgNC+0LzQtdC90LXQvdC+J1xuICAgICAgICB9LFxuICAgICAgICBpcHR2X3BsYXlsaXN0X2NoYW5nZV9uYW1lOiB7XG4gICAgICAgICAgICBydTogJ9CY0LfQvNC10L3QuNGC0Ywg0L3QsNC30LLQsNC90LjQtScsXG4gICAgICAgICAgICBlbjogJ0NoYW5nZSBuYW1lJyxcbiAgICAgICAgICAgIHVrOiAn0JfQvNGW0L3QuNGC0Lgg0L3QsNC30LLRgycsXG4gICAgICAgICAgICBiZTogJ9CX0LzRj9C90ZbRhtGMINC90LDQt9Cy0YMnLFxuICAgICAgICAgICAgemg6ICfmm7TmlLnlkI3np7AnLFxuICAgICAgICAgICAgcHQ6ICdBbHRlcmFyIG5vbWUnLFxuICAgICAgICAgICAgYmc6ICfQn9GA0L7QvNGP0L3QsCDQvdCwINC40LzQtdGC0L4nXG4gICAgICAgIH0sXG4gICAgICAgIGlwdHZfcGFyYW1fdmlld19pbl9tYWluOiB7XG4gICAgICAgICAgICBydTogJ9Cf0L7QutCw0LfRi9Cy0LDRgtGMINC60LDQvdCw0LvRiyDQvdCwINCz0LvQsNCy0L3QvtC5JyxcbiAgICAgICAgICAgIGVuOiAnU2hvdyBjaGFubmVscyBvbiBtYWluIHBhZ2UnLFxuICAgICAgICAgICAgdWs6ICfQn9C+0LrQsNC30YPQstCw0YLQuCDQutCw0L3QsNC70Lgg0L3QsCDQs9C+0LvQvtCy0L3RltC5JyxcbiAgICAgICAgICAgIGJlOiAn0J/QsNC60LDQt9Cy0LDRhtGMINC60LDQvdCw0LvRiyDQvdCwINCz0LDQu9C+0Z7QvdCw0LknLFxuICAgICAgICAgICAgemg6ICflnKjkuLvpobXkuIrmmL7npLrpopHpgZMnLFxuICAgICAgICAgICAgcHQ6ICdNb3N0cmFyIGNhbmFpcyBuYSBww6FnaW5hIHByaW5jaXBhbCcsXG4gICAgICAgICAgICBiZzogJ9Cf0L7QutCw0LfQstCw0L3QtSDQvdCwINC60LDQvdCw0LvQuCDQvdCwINCz0LvQsNCy0L3QsNGC0LAg0YHRgtGA0LDQvdC40YbQsCdcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbml0XG59XG4iLCJpbXBvcnQgVXRpbHMgZnJvbSAnLi91dGlscydcblxuY2xhc3MgQ2hhbm5lbCB7XG4gICAgY29uc3RydWN0b3IoZGF0YSwgcGxheWxpc3QpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YVxuICAgICAgICB0aGlzLnBsYXlsaXN0ID0gcGxheWxpc3RcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQl9Cw0LPRgNGD0LfQuNGC0Ywg0YjQsNCx0LvQvtC9XG4gICAgICovXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIHRoaXMuY2FyZCA9IExhbXBhLlRlbXBsYXRlLmpzKCdjdWJfaXB0dl9jaGFubmVsX21haW5fYm9hcmQnKVxuICAgICAgICB0aGlzLmljb24gPSB0aGlzLmNhcmQucXVlcnlTZWxlY3RvcignLmlwdHYtY2hhbm5lbF9faWNvJykgfHwge31cblxuICAgICAgICB0aGlzLmNhcmQuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJsZScsIHRoaXMudmlzaWJsZS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCX0LDQs9GA0YPQt9C40YLRjCDQutCw0YDRgtC40L3QutGDXG4gICAgICovXG4gICAgaW1hZ2UoKSB7XG4gICAgICAgIHRoaXMuaWNvbi5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhcmQuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJylcblxuICAgICAgICAgICAgaWYodGhpcy5kYXRhLmxvZ28uaW5kZXhPZignZXBnLml0OTk5JykgPT0gLTEpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2FyZC5hZGRDbGFzcygnc21hbGwtLWljb24nKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pY29uLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2ltYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICAgICAgc2ltYi5hZGRDbGFzcygnaXB0di1jaGFubmVsX19zaW1iJylcbiAgICAgICAgICAgICAgICBzaW1iLnRleHQodGhpcy5kYXRhLm5hbWUubGVuZ3RoIDw9IDMgPyB0aGlzLmRhdGEubmFtZS50b1VwcGVyQ2FzZSgpIDogdGhpcy5kYXRhLm5hbWUucmVwbGFjZSgvW15hLXp80LAt0Y98MC05XS9naSwnJykudG9VcHBlckNhc2UoKVswXSlcblxuICAgICAgICAgICAgbGV0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgICAgIHRleHQuYWRkQ2xhc3MoJ2lwdHYtY2hhbm5lbF9fbmFtZScpXG4gICAgICAgICAgICAgICAgdGV4dC50ZXh0KFV0aWxzLmNsZWFyKHRoaXMuZGF0YS5uYW1lKSlcblxuICAgICAgICAgICAgdGhpcy5jYXJkLnF1ZXJ5U2VsZWN0b3IoJy5pcHR2LWNoYW5uZWxfX2JvZHknKS5hcHBlbmQoc2ltYilcbiAgICAgICAgICAgIHRoaXMuY2FyZC5xdWVyeVNlbGVjdG9yKCcuaXB0di1jaGFubmVsX19ib2R5JykuYXBwZW5kKHRleHQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQodC+0LfQtNCw0YLRjFxuICAgICAqL1xuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgdGhpcy5idWlsZCgpXG5cbiAgICAgICAgdGhpcy5jYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2hvdmVyOmZvY3VzJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub25Gb2N1cykgdGhpcy5vbkZvY3VzKHRoaXMuY2FyZCwgdGhpcy5kYXRhKVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuY2FyZC5hZGRFdmVudExpc3RlbmVyKCdob3Zlcjpob3ZlcicsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9uSG92ZXIpIHRoaXMub25Ib3Zlcih0aGlzLmNhcmQsIHRoaXMuZGF0YSlcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmNhcmQuYWRkRXZlbnRMaXN0ZW5lcignaG92ZXI6ZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcGxheSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5kYXRhLm5hbWUgfHwgJycsXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmRhdGEudXJsLFxuICAgICAgICAgICAgICAgIHR2OiB0cnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIExhbXBhLlBsYXllci5ydW5hcyhMYW1wYS5TdG9yYWdlLmZpZWxkKCdwbGF5ZXJfaXB0dicpKVxuXG4gICAgICAgICAgICBMYW1wYS5QbGF5ZXIucGxheShwbGF5KVxuICAgICAgICAgICAgTGFtcGEuUGxheWVyLnBsYXlsaXN0KHRoaXMucGxheWxpc3QubWFwKChhKT0+eyByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBhLm5hbWUsIFxuICAgICAgICAgICAgICAgIHVybDogYS51cmwsXG4gICAgICAgICAgICAgICAgdHY6IHRydWVcbiAgICAgICAgICAgIH0gfSkpXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5pbWFnZSgpXG4gICAgfVxuXG4gICAgZW1pdCgpe1xuICAgICAgICBcbiAgICB9XG5cbiAgICB1c2UoKXtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JfQsNCz0YDRg9C20LDRgtGMINC60LDRgNGC0LjQvdC60YMg0LXRgdC70Lgg0LLQuNC00L3QsCDQutCw0YDRgtC+0YfQutCwXG4gICAgICovXG4gICAgdmlzaWJsZSgpIHtcbiAgICAgICAgaWYodGhpcy5kYXRhLmxvZ28pIHRoaXMuaWNvbi5zcmMgPSB0aGlzLmRhdGEubG9nb1xuICAgICAgICBlbHNlIHRoaXMuaWNvbi5vbmVycm9yKClcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMub25WaXNpYmxlKSB0aGlzLm9uVmlzaWJsZSh0aGlzLmNhcmQsIHRoaXMuZGF0YSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQo9C90LjRh9GC0L7QttC40YLRjFxuICAgICAqL1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuaWNvbi5vbmVycm9yID0gKCkgPT4geyB9XG4gICAgICAgIHRoaXMuaWNvbi5vbmxvYWQgPSAoKSA9PiB7IH1cblxuICAgICAgICB0aGlzLmljb24uc3JjID0gJydcblxuICAgICAgICB0aGlzLmNhcmQucmVtb3ZlKClcblxuICAgICAgICB0aGlzLmNhcmQgPSBudWxsXG5cbiAgICAgICAgdGhpcy5pY29uID0gbnVsbFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCg0LXQvdC00LXRgFxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAgICovXG4gICAgcmVuZGVyKGpzKSB7XG4gICAgICAgIHJldHVybiBqcyA/IHRoaXMuY2FyZCA6ICQodGhpcy5jYXJkKVxuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbCIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnQnXG5pbXBvcnQgR3VpZGUgZnJvbSAnLi91dGlscy9ndWlkZSdcbmltcG9ydCBUZW1wbGF0ZXMgZnJvbSAnLi90ZW1wbGF0ZXMnXG5pbXBvcnQgU2V0dGluZ3MgZnJvbSAnLi9zZXR0aW5ncydcbmltcG9ydCBMYW5nIGZyb20gJy4vbGFuZydcbmltcG9ydCBFUEcgZnJvbSAnLi91dGlscy9lcGcnXG5pbXBvcnQgTWFpbkNoYW5uZWwgZnJvbSAnLi91dGlscy9tYWluX2NoYW5uZWwnXG5cblxuZnVuY3Rpb24gc3RhcnRQbHVnaW4oKSB7XG4gICAgd2luZG93LnBsdWdpbl9pcHR2X3JlYWR5ID0gdHJ1ZVxuXG4gICAgbGV0IG1hbmlmZXN0ID0ge1xuICAgICAgICB0eXBlOiAndmlkZW8nLFxuICAgICAgICB2ZXJzaW9uOiAnMS4yLjgnLFxuICAgICAgICBuYW1lOiAnSVBUVicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgY29tcG9uZW50OiAnaXB0dicsXG4gICAgICAgIG9uTWFpbjogKGRhdGEpPT57XG4gICAgICAgICAgICBpZighTGFtcGEuU3RvcmFnZS5maWVsZCgnaXB0dl92aWV3X2luX21haW4nKSkgcmV0dXJuIHtyZXN1bHRzOiBbXX1cblxuICAgICAgICAgICAgbGV0IHBsYXlsaXN0ID0gTGFtcGEuQXJyYXlzLmNsb25lKExhbXBhLlN0b3JhZ2UuZ2V0KCdpcHR2X3BsYXlfaGlzdG9yeV9tYWluX2JvYXJkJywnW10nKSkucmV2ZXJzZSgpXG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0czogcGxheWxpc3QsXG4gICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCd0aXRsZV9jb250aW51ZScpLFxuICAgICAgICAgICAgICAgIG5vbW9yZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsaW5lX3R5cGU6ICdpcHR2JyxcbiAgICAgICAgICAgICAgICBjYXJkQ2xhc3M6IChpdGVtKT0+e1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE1haW5DaGFubmVsKGl0ZW0sIHBsYXlsaXN0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBMYW1wYS5NYW5pZmVzdC5wbHVnaW5zID0gbWFuaWZlc3RcblxuICAgIGlmKExhbXBhLk1hbmlmZXN0LmFwcF9kaWdpdGFsID49IDMwMCl7XG4gICAgICAgIExhbXBhLkNvbnRlbnRSb3dzLmFkZCh7XG4gICAgICAgICAgICBpbmRleDogMSxcbiAgICAgICAgICAgIHNjcmVlbjogWydtYWluJ10sXG4gICAgICAgICAgICBjYWxsOiAocGFyYW1zLCBzY3JlZW4pPT57XG4gICAgICAgICAgICAgICAgaWYoIUxhbXBhLlN0b3JhZ2UuZmllbGQoJ2lwdHZfdmlld19pbl9tYWluJykpIHJldHVyblxuXG4gICAgICAgICAgICAgICAgbGV0IHBsYXlsaXN0ID0gTGFtcGEuQXJyYXlzLmNsb25lKExhbXBhLlN0b3JhZ2UuZ2V0KCdpcHR2X3BsYXlfaGlzdG9yeV9tYWluX2JvYXJkJywnW10nKSkucmV2ZXJzZSgpXG5cbiAgICAgICAgICAgICAgICAvLyDQstC+0LfQstGA0LDRidCw0LXQvCDRhNGD0L3QutGG0LjRjiDRgSDQutC+0LvQu9Cx0LXQutC+0LxcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oY2FsbCl7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0LmZvckVhY2goaXRlbT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlSW5zdGFuY2U6IChpdGVtKT0+bmV3IE1haW5DaGFubmVsKGl0ZW0sIHBsYXlsaXN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIGNhbGwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0czogcGxheWxpc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RpdGxlX2NvbnRpbnVlJyksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZCgpe1xuICAgICAgICBsZXQgYnV0dG9uID0gJChgPGxpIGNsYXNzPVwibWVudV9faXRlbSBzZWxlY3RvclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVfX2ljb1wiPlxuICAgICAgICAgICAgICAgIDxzdmcgaGVpZ2h0PVwiMzZcIiB2aWV3Qm94PVwiMCAwIDM4IDM2XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIyXCIgeT1cIjhcIiB3aWR0aD1cIjM0XCIgaGVpZ2h0PVwiMjFcIiByeD1cIjNcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIzXCIvPlxuICAgICAgICAgICAgICAgICAgICA8bGluZSB4MT1cIjEzLjA5MjVcIiB5MT1cIjIuMzQ4NzRcIiB4Mj1cIjE2LjM0ODdcIiB5Mj1cIjYuOTA3NTRcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIzXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGxpbmUgeDE9XCIxLjVcIiB5MT1cIi0xLjVcIiB4Mj1cIjkuMzE2NjVcIiB5Mj1cIi0xLjVcIiB0cmFuc2Zvcm09XCJtYXRyaXgoLTAuNzU3ODE2IDAuNjUyNDY4IDAuNjUyNDY4IDAuNzU3ODE2IDI2LjE5NyAyKVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjNcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIvPlxuICAgICAgICAgICAgICAgICAgICA8bGluZSB4MT1cIjkuNVwiIHkxPVwiMzQuNVwiIHgyPVwiMjkuNVwiIHkyPVwiMzQuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjNcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudV9fdGV4dFwiPiR7d2luZG93LmxhbXBhX3NldHRpbmdzLmlwdHYgPyBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgncGxheWVyX3BsYXlsaXN0JykgOiAnSVBUVid9PC9kaXY+XG4gICAgICAgIDwvbGk+YClcblxuICAgICAgICBidXR0b24ub24oJ2hvdmVyOmVudGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYod2luZG93LmxhbXBhX3NldHRpbmdzLmlwdHYpe1xuICAgICAgICAgICAgICAgIGlmKExhbXBhLkFjdGl2aXR5LmFjdGl2ZSgpLmNvbXBvbmVudCA9PSAnaXB0dicpIHJldHVybiBMYW1wYS5BY3Rpdml0eS5hY3RpdmUoKS5hY3Rpdml0eS5jb21wb25lbnQucGxheWxpc3QoKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMYW1wYS5BY3Rpdml0eS5wdXNoKHtcbiAgICAgICAgICAgICAgICB1cmw6ICcnLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnSVBUVicsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiAnaXB0dicsXG4gICAgICAgICAgICAgICAgcGFnZTogMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICAkKCcubWVudSAubWVudV9fbGlzdCcpLmVxKDApLmFwcGVuZChidXR0b24pXG5cbiAgICAgICAgJCgnYm9keScpLmFwcGVuZChMYW1wYS5UZW1wbGF0ZS5nZXQoJ2N1Yl9pcHR2X3N0eWxlJyx7fSx0cnVlKSlcblxuICAgICAgICBpZih3aW5kb3cubGFtcGFfc2V0dGluZ3MuaXB0dil7XG4gICAgICAgICAgICAkKCcuaGVhZCAuaGVhZF9fYWN0aW9uLm9wZW4tLXNlYXJjaCcpLmFkZENsYXNzKCdoaWRlJylcblxuICAgICAgICAgICAgJCgnLmhlYWQgLmhlYWRfX2FjdGlvbi5vcGVuLS1wcmVtaXVtJykucmVtb3ZlKClcbiAgICAgICAgICAgICQoJy5oZWFkIC5oZWFkX19hY3Rpb24ub3Blbi0tZmVlZCcpLnJlbW92ZSgpXG5cbiAgICAgICAgICAgICQoJy5uYXZpZ2F0aW9uLWJhcl9fYm9keSBbZGF0YS1hY3Rpb249XCJtYWluXCJdJykudW5iaW5kKCkub24oJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgIExhbXBhLkFjdGl2aXR5LmFjdGl2ZSgpLmFjdGl2aXR5LmNvbXBvbmVudC5wbGF5bGlzdCgpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAkKCcubmF2aWdhdGlvbi1iYXJfX2JvZHkgW2RhdGEtYWN0aW9uPVwic2VhcmNoXCJdJykuYWRkQ2xhc3MoJ2hpZGUnKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgTGFuZy5pbml0KClcblxuICAgIFRlbXBsYXRlcy5pbml0KClcblxuICAgIFNldHRpbmdzLmluaXQoKVxuXG4gICAgRVBHLmluaXQoKVxuXG4gICAgR3VpZGUuaW5pdCgpXG5cbiAgICBMYW1wYS5Db21wb25lbnQuYWRkKCdpcHR2JywgQ29tcG9uZW50KVxuXG4gICAgaWYod2luZG93LmxhbXBhX3NldHRpbmdzLmlwdHYpe1xuICAgICAgICBMYW1wYS5TdG9yYWdlLnNldCgnc3RhcnRfcGFnZScsJ2xhc3QnKVxuXG4gICAgICAgIHdpbmRvdy5zdGFydF9kZWVwX2xpbmsgPSB7Y29tcG9uZW50OiAnaXB0did9XG4gICAgfVxuXG4gICAgaWYod2luZG93LmFwcHJlYWR5KSBhZGQoKVxuICAgIGVsc2V7XG4gICAgICAgIExhbXBhLkxpc3RlbmVyLmZvbGxvdygnYXBwJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLnR5cGUgPT0gJ3JlYWR5JykgYWRkKClcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmlmKCF3aW5kb3cucGx1Z2luX2lwdHZfcmVhZHkpIHN0YXJ0UGx1Z2luKClcbiJdLCJuYW1lcyI6WyJVdGlscyIsIl9jbGFzc0NhbGxDaGVjayIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwiY2xlYXIiLCJzdHIiLCJyZXBsYWNlIiwiaXNIRCIsIm5hbWUiLCJtYXRoIiwidG9Mb3dlckNhc2UiLCJtYXRjaCIsInRyaW0iLCJjbGVhckhEU0QiLCJjbGVhck1lbnVOYW1lIiwiY2xlYXJDaGFubmVsTmFtZSIsImhhc0FyY2hpdmUiLCJjaGFubmVsIiwiY2F0Y2h1cCIsImRheXMiLCJwYXJzZUludCIsImlzTmFOIiwiY2FuVXNlREIiLCJEQiIsImRiIiwiTGFtcGEiLCJTdG9yYWdlIiwiZ2V0IiwiZmF2b3JpdGVzIiwiRmF2b3JpdGVzIiwibG9hZCIsIl90aGlzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJnZXREYXRhIiwidGhlbiIsInJlc3VsdCIsIm5vc3Vwb3J0IiwibGlzdCIsImZpbmQiLCJmYXZvcml0ZSIsIl90aGlzMiIsImEiLCJyZW1vdmUiLCJfdGhpczMiLCJkZWxldGVEYXRhIiwiQXJyYXlzIiwic2V0IiwiYWRkIiwiX3RoaXM0IiwiZXh0ZW5kIiwidmlldyIsImFkZGVkIiwiRGF0ZSIsIm5vdyIsImFkZERhdGEiLCJwdXNoIiwidXBkYXRlIiwiX3RoaXM1IiwidXBkYXRlRGF0YSIsInRvZ2dsZSIsImxvY2tlZCIsIkxvY2tlZCIsImZvcm1hdCIsInR5cGUiLCJlbGVtZW50IiwibG9ncyIsIm9wZW5EYXRhYmFzZSIsImZpeFBhcmFtcyIsInBhcmFtc19kYXRhIiwicGFyYW1zIiwidXBkYXRlX3RpbWUiLCJsb2FkaW5nIiwiUGFyYW1zIiwiaWQiLCJnZXREYXRhQW55Q2FzZSIsInJld3JpdGVEYXRhIiwiTGFuZyIsInRyYW5zbGF0ZSIsImlzVmFsaWRQYXRoIiwic3RyaW5nIiwidXJsIiwiVVJMIiwiXyIsInByb3RvY29sIiwiUGFyc2VyIiwicGFyc2UiLCJjb250ZW50IiwicGxheWxpc3QiLCJoZWFkZXIiLCJpdGVtcyIsImxpbmVzIiwic3BsaXQiLCJtYXAiLCJwYXJzZUxpbmUiLCJmaXJzdExpbmUiLCJsIiwiaW5kZXgiLCJ0ZXN0IiwicmF3IiwiRXJyb3IiLCJwYXJzZUhlYWRlciIsImkiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9zdGVwIiwicyIsIm4iLCJkb25lIiwibGluZSIsInRvU3RyaW5nIiwic3RhcnRzV2l0aCIsIkVYVElORiIsImdldE5hbWUiLCJ0dmciLCJnZXRBdHRyaWJ1dGUiLCJsb2dvIiwicmVjIiwiZ3JvdXAiLCJ0aXRsZSIsImh0dHAiLCJyZWZlcnJlciIsInVuZGVmaW5lZCIsInNvdXJjZSIsInRpbWVzaGlmdCIsIkVYVFZMQ09QVCIsImdldE9wdGlvbiIsImNvbmNhdCIsIkVYVEdSUCIsImdldFZhbHVlIiwiZ2V0VVJMIiwidXNlcl9hZ2VudCIsImdldFBhcmFtZXRlciIsImVyciIsImUiLCJmIiwiT2JqZWN0IiwidmFsdWVzIiwic3VwcG9ydGVkQXR0cnMiLCJhdHRycyIsIl9pIiwiX3N1cHBvcnRlZEF0dHJzIiwibGVuZ3RoIiwiYXR0ck5hbWUiLCJ0dmdVcmwiLCJTdHJpbmciLCJwcm90b3R5cGUiLCJzaGlmdCIsInBvcCIsInJlZ2V4IiwiUmVnRXhwIiwiZXhlYyIsIkFwaSIsIm1ldGhvZCIsImNhdGNoX2Vycm9yIiwiYWNjb3VudCIsInRva2VuIiwibmV0d29yayIsInNpbGVudCIsImFwaV91cmwiLCJoZWFkZXJzIiwicHJvZmlsZSIsInRpbWUiLCJjYWxsIiwibTN1IiwidGltZW91dCIsImZpbGUiLCJGaWxlIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsIiQiLCJhcHBlbmQiLCJhamF4IiwiZGF0YSIsImFzeW5jIiwiY2FjaGUiLCJjb250ZW50VHlwZSIsImVuY3R5cGUiLCJwcm9jZXNzRGF0YSIsInN1Y2Nlc3MiLCJqIiwic2VjdXNlcyIsInRleHQiLCJtZXNzYWdlIiwiZXJyb3IiLCJmcm9tX2Vycm9yIiwiZGF0YVR5cGUiLCJhbGwiLCJtM3VDbGllbnQiLCJ3aW5kb3ciLCJnb2RfZW5hYmxlZCIsInN1YnN0ciIsInRvVXBwZXJDYXNlIiwiTTN1OCIsImNoYW5uZWxzIiwiaW5kZXhPZiIsIm1fZGF5cyIsIm1fdHlwZSIsIm1fc291cmNlIiwiaXRlbSIsIm1lbnUiLCJjb3VudCIsIl9sb29wIiwiYmluZCIsImN1c3RvbSIsIkFjY291bnQiLCJsb2dnZWQiLCJwcm9ncmFtIiwiX3RoaXM2IiwiZmllbGQiLCJ0dmdfaWQiLCJjaGFubmVsX2lkIiwidHZnX25hbWUiLCJsb2FkQ1VCIiwic3RhdHVzIiwibG9hZEVQRyIsImVwZyIsImd1IiwiX2RlZmluZVByb3BlcnR5IiwiUmVndWVzdCIsIk1hbmlmZXN0IiwiY3ViX2RvbWFpbiIsIlBpbG90Iiwibm90ZWJvb2siLCJwYXJhbV9uYW1lIiwicGFyYW1fc2V0IiwiYm9vayIsImNhdGVnb3J5IiwiUGxheWxpc3RJdGVtIiwiVGVtcGxhdGUiLCJqcyIsImZvb3RlciIsImRyYXdGb290ZXIiLCJzbGljZSIsIm9uIiwiZGlzcGxheVNldHRpbmdzIiwiZGVsZXRlZCIsImxpc3RlbmVyIiwic2VuZCIsInN1YnRpdGxlIiwic2VwYXJhdG9yIiwiU2VsZWN0Iiwic2hvdyIsIm9uU2VsZWN0IiwiSW5wdXQiLCJlZGl0IiwiZnJlZSIsIm5vc2F2ZSIsIk5vdHkiLCJDb250cm9sbGVyIiwiTW9kYWwiLCJvcGVuIiwiYWxpZ24iLCJodG1sIiwiYnV0dG9ucyIsImNsb3NlIiwic3R5bGUiLCJvcGFjaXR5Iiwia2V5cyIsImZvckVhY2giLCJrIiwic2VsZWN0ZWQiLCJiIiwib25CYWNrIiwicmVtb3ZlQ2xhc3MiLCJsYWJlbCIsIndoZXJlIiwibGViX2RpdiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImxlYl92YWwiLCJhZGRDbGFzcyIsImFjdGl2ZSIsImRldGFpbHNfbGVmdCIsImVtcHR5IiwiZGV0YWlsc19yaWdodCIsInBhcnNlVGltZSIsImJyaWVmbHkiLCJyZW5kZXIiLCJQbGF5bGlzdCIsInNjcm9sbCIsIlNjcm9sbCIsIm1hc2siLCJvdmVyIiwiSXRlbSIsImVsZW0iLCJsYXN0IiwiTmF2aWdhdG9yIiwiZm9jdXNlZCIsInJlc2V0IiwidWlkIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsIm5leHRTaWJsaW5nIiwicmV2ZXJzZSIsIm1haW4iLCJjb2xsZWN0aW9uU2V0IiwiY29sbGVjdGlvbkZvY3VzIiwibGVmdCIsImRvd24iLCJtb3ZlIiwidXAiLCJjYW5tb3ZlIiwiYmFjayIsIkFjdGl2aXR5IiwiYmFja3dhcmQiLCJkZXN0cm95IiwiSWNvbnMiLCJwb3NpdGlvbiIsImlwdHZfbW9iaWxlIiwiZW5kX3JhdGlvIiwiaG9yaXpvbnRhbCIsIm1pbnVzIiwib25FbmQiLCJuZXh0IiwiZm9sbG93IiwiaWNvbnMiLCJzb3J0IiwidGEiLCJ0YiIsImljb25zX2Nsb25lIiwiY2xvbmUiLCJsYW1wYV9zZXR0aW5ncyIsImlwdHYiLCJzZXRUaW1lb3V0IiwidG90YWwiLCJzb3J0X3R5cGUiLCJoYXNQcmVtaXVtIiwidmEiLCJ2YiIsImljb24iLCJ2aWV3cyIsInN0YXJ0IiwidGFyZ2V0IiwiYm9keSIsImltZyIsImNobiIsImljbiIsInBhZCIsIm9uZXJyb3IiLCJzaW1iIiwib25sb2FkIiwic3JjIiwiYXBwX2RpZ2l0YWwiLCJQYXJlbnRhbENvbnRyb2wiLCJxdWVyeSIsIm93biIsImNvbGxlY3Rpb25BcHBlbmQiLCJMYXllciIsInZpc2libGUiLCJsaW5rIiwicmlnaHQiLCJFUEciLCJpbml0IiwidHMiLCJnZXRUaW1lIiwianNvbiIsInRlIiwidGltZV9vZmZzZXQiLCJhcmd1bWVudHMiLCJkYXRlIiwib2ZzdCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJvZmZzZXQiLCJzZXRIb3VycyIsImdldEhvdXJzIiwidGltIiwicCIsInN0b3AiLCJ0aW1lbGluZSIsImxlc3MiLCJNYXRoIiwibWluIiwibWF4Iiwic2l6ZSIsImRheV9sc3QiLCJkYXlfcHJnIiwiZGF5X25vdyIsImdldERhdGUiLCJkYXlfbmFtIiwiZGlzcGxheSIsIndhdGNoIiwiRGV0YWlscyIsInBsYXkiLCJwcm9nbSIsInByb2dtX2ltYWdlIiwiZW1wdHlfaHRtbCIsImRyYXciLCJ0aW1lciIsInNldEludGVydmFsIiwid2FpdF9mb3IiLCJhcmNoaXZlIiwiaGQiLCJoZF9sYiIsImJ1aWxkUHJvZ3JhbUxpc3QiLCJzdGltZSIsInNob3J0VGV4dCIsIkVuZGxlc3MiLCJlbmRsZXNzIiwidG8iLCJ3cmFwIiwiaGVhZCIsImljb25fd3JhcCIsImljb25faW1nIiwiaGVhZF9ib2R5Iiwid2FpdGluZyIsImRpdiIsIndpZHRoIiwicGVyY2VudCIsIm9uUGxheSIsImRlc2MiLCJkZXNjciIsImNsZWFySW50ZXJ2YWwiLCJsYXN0X3F1ZXJ5IiwiU2VhcmNoIiwiY29udHJvbGxlciIsImVuYWJsZWQiLCJuZXdfdmFsdWUiLCJmaWx0ZXIiLCJjIiwiTWVudSIsImJ1aWxkIiwic2VhcmNoX2l0ZW0iLCJzZWFyY2giLCJpbnNlcnQiLCJmaXJzdCIsImZpcnN0X2l0ZW0iLCJwaWxvdCIsIm1vYmlsZV9zZWFjcmhfYnV0dG9uIiwibGkiLCJjbyIsIm5tIiwiaWMiLCJpY29uX25hbWUiLCJ0cmlnZ2VyIiwidXBkYXRlSWNvbiIsInN0clJlcGxhY2UiLCJrZXkydmFsIiwidGYiLCJ0IiwidSIsInR6IiwidGhpc09mZnNldCIsImdldFRpbWV6b25lT2Zmc2V0IiwiZCIsInIiLCJ5eXl5IiwiZ2V0VVRDRnVsbFllYXIiLCJNTSIsImdldFVUQ01vbnRoIiwiZGQiLCJnZXRVVENEYXRlIiwiSEgiLCJnZXRVVENIb3VycyIsIm1tIiwiZ2V0VVRDTWludXRlcyIsInNzIiwiZ2V0VVRDU2Vjb25kcyIsIlVURiIsInVuaXh0aW1lIiwiZmxvb3IiLCJVcmwiLCJwcmVwYXJlVXJsIiwibSIsInZhbCIsImVuZCIsImR1cmF0aW9uIiwidXRjIiwidXRjZW5kIiwiZHVyYXRpb25mcyIsImx1dGMiLCJ0aW1lc3RhbXAiLCJNIiwiUyIsImgiLCJlbmNvZGVVUklDb21wb25lbnQiLCJjYXRjaHVwVXJsIiwiY29uc29sZSIsImxvZyIsIm5ld1VybCIsIkhVRE1lbnUiLCJvcmlnaW5hbCIsImNyZWF0ZSIsImluZm8iLCJidXR0b24iLCJ0b2dnbGVDbGFzcyIsIkJvb2xlYW4iLCJnb25lIiwiZm9jdXMiLCJIVURQcm9ncmFtIiwiZXZlbnQiLCJIVUQiLCJTdWJzY3JpYmUiLCJQcm9ncmFtIiwiaHVkIiwibGlzdGVuIiwiQ2hhbm5lbHMiLCJpbm5lcl9saXN0ZW5lciIsImRldGFpbHMiLCJwbGF5Q2hhbm5lbCIsInBsYXlBcmNoaXZlIiwiYWRkVG9IaXN0b3J5IiwiYm9hcmQiLCJjb252ZXJ0IiwiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwibmVlZF9jaGVja19saXZlX3N0cmVhbSIsIlBsYXllciIsInJ1bmFzIiwibm9uZSIsInN0YXJ0X2NoYW5uZWwiLCJvbkdldENoYW5uZWwiLCJwcm9ncmFtUmVhZHkiLCJvbk1lbnUiLCJwYXJhbSIsIm9yaWciLCJQbGF5ZXJJUFRWIiwicmVkcmF3Q2hhbm5lbCIsIm9uUGxheWxpc3RQcm9ncmFtIiwibGluZUhlaWdodCIsImludmlzaWJsZSIsIm9uR2V0UHJvZ3JhbSIsImNvbnRhaW5lciIsIm5vcHJvZyIsInByb2ciLCJzcGFuIiwibXNnIiwicmVzcG9uc2VKU09OIiwiY29kZSIsIkVtcHR5IiwiZXBnX2NhY2hlIiwiQ29tcG9uZW50IiwiaW5pdGlhbGl6ZWQiLCJpbm5lcldpZHRoIiwiaW5pdGlhbGl6ZSIsImFjdGl2aXR5IiwibG9hZGVyIiwib2xkIiwiYmFja2dyb3VuZCIsIkJhY2tncm91bmQiLCJpbW1lZGlhdGVseSIsInBhdXNlIiwiVW5wYWNrU3RyZWFtIiwiVWludDhBcnJheSIsIlVpbnQxNkFycmF5IiwiVWludDMyQXJyYXkiLCJvIiwidiIsImciLCJ3IiwieSIsIlQiLCJFIiwiQyIsIkJZVEVTX1BFUl9FTEVNRU5UIiwic3ViYXJyYXkiLCJGbGF0ZUVycm9yQ29kZSIsIlVuZXhwZWN0ZWRFT0YiLCJJbnZhbGlkQmxvY2tUeXBlIiwiSW52YWxpZExlbmd0aExpdGVyYWwiLCJJbnZhbGlkRGlzdGFuY2UiLCJTdHJlYW1GaW5pc2hlZCIsIk5vU3RyZWFtSGFuZGxlciIsIkludmFsaWRIZWFkZXIiLCJOb0NhbGxiYWNrIiwiSW52YWxpZFVURjgiLCJFeHRyYUZpZWxkVG9vTG9uZyIsIkludmFsaWREYXRlIiwiRmlsZW5hbWVUb29Mb25nIiwiU3RyZWFtRmluaXNoaW5nIiwiSW52YWxpZFppcERhdGEiLCJVbmtub3duQ29tcHJlc3Npb25NZXRob2QiLCJGIiwieCIsIm9uZGF0YSIsIkkiLCJVIiwiRCIsIkwiLCJ6IiwiQiIsIk4iLCJBIiwiRyIsIkgiLCJPIiwiUCIsIlIiLCJZIiwiWiIsInEiLCJKIiwiSyIsIlEiLCJWIiwiVyIsIlgiLCJ0dCIsIm50IiwiaXQiLCJldCIsInJ0IiwiYXQiLCJzdCIsIkluZmxhdGUiLCJUZXh0Qnl0ZXMiLCJHdW56aXAiLCJEZWNvbXByZXNzIiwiYXBwbHkiLCJUZXh0RGVjb2RlciIsImRlY29kZSIsInN0cmVhbSIsIkRlY29kZVVURjgiLCJmcm9tQ2hhckNvZGUiLCJjdXJfdGltZSIsIm1heENodW5rU2l6ZSIsInN0cmluZ19kYXRhIiwidGhpc19yZXMiLCJsb2FkX2VuZCIsImNodW5rX3BhcnNlIiwiZGNtcFN0cm0iLCJjb250ZW50X3R5cGUiLCJjdXJfcG9zIiwiY29udGVudF9sZW5ndGgiLCJuZXh0Q2h1bmsiLCJsZW4iLCJyZXNwb25zZVRleHQiLCJtYXhQb3MiLCJmaW5pc2giLCJzdHIyYWIiLCJzdWJzdHJpbmciLCJwYXJzZUZpbmlzaCIsInJlcXVlc3RGcmFtZSIsInBhcnNlQ2hhbm5lbCIsImF0dHIiLCJuYW1lcyIsIm1fbmFtZSIsIm1faWNvbiIsInBhcnNlUHJvZ3JhbW1lIiwicGFyc2VEYXRlIiwibV90aXRsZSIsIm1fY2F0ZWdvcnkiLCJtX2Rlc2MiLCJwYXJzZVBhcmFtcyIsImJ1ZiIsIkFycmF5QnVmZmVyIiwiYnVmVmlldyIsImNoYXJDb2RlQXQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJwYXJzZVN0YXJ0IiwiY2hPclByb2dSZWdFeHAiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsInV0ZkRlY29kZSIsImZpbmFsIiwibGVuU3RhcnQiLCJwMSIsInAyIiwicDMiLCJwNCIsImFib3J0IiwiY2h1bmsiLCJyZXNwb25zZVR5cGUiLCJvdmVycmlkZU1pbWVUeXBlIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsImdldFJlc3BvbnNlSGVhZGVyIiwib25wcm9ncmVzcyIsIm9uYWJvcnQiLCJvbnRpbWVvdXQiLCJHdWlkZSIsImxhc3R1cGRhdGUiLCJzdGF0dXNfZWxlbSIsImlwdHZfZ3VpZGVfdXBkYXRlX3Byb2Nlc3MiLCJsYXN0X2lkIiwiUHJvY2Vzc2luZyIsImdldEtleXMiLCJjbGVhclRhYmxlIiwic2VsZWN0IiwiU2V0dGluZ3MiLCJzaG93Q3ViUHJlbWl1bSIsInByZXBlbmQiLCJwYXJzZXIiLCJ0b0ZpeGVkIiwibGFzdF9zdGF0dXMiLCJTZXR0aW5nc0FwaSIsImFkZENvbXBvbmVudCIsImNvbXBvbmVudCIsImFkZFBhcmFtIiwib25DaGFuZ2UiLCJpbmRleGRiIiwic3RvcmFnZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJvblJlbmRlciIsImRvbWFpbiIsImN1Yl9zaXRlIiwiaXB0dl9ub3Byb2dyYW0iLCJydSIsImVuIiwidWsiLCJiZSIsInpoIiwicHQiLCJiZyIsImlwdHZfbm9sb2FkX3BsYXlsaXN0IiwiaXB0dl9zZWxlY3RfcGxheWxpc3QiLCJpcHR2X2FsbF9jaGFubmVscyIsImlwdHZfYWRkX2ZhdiIsImlwdHZfcmVtb3ZlX2ZhdiIsImlwdHZfcGxheWxpc3RfZW1wdHkiLCJpcHR2X3NlbGVjdF9wbGF5bGlzdF90ZXh0IiwiaXB0dl91cGRhdGVkIiwiaXB0dl91cGRhdGUiLCJpcHR2X2FjdGl2ZSIsImlwdHZfeWVzdGVyZGF5IiwiaXB0dl90b2RheSIsImlwdHZfdG9tb3Jyb3ciLCJpcHR2X2xvYWRpbmciLCJpcHR2X3BhcmFtc19jdWIiLCJpcHR2X3BhcmFtc19sYW1wYSIsImlwdHZfcmVtb3ZlX2NhY2hlIiwiaXB0dl9yZW1vdmVfY2FjaGVfZGVzY3IiLCJpcHR2X3BhcmFtc19hbHdheXMiLCJpcHR2X3BhcmFtc19ob3VyIiwiaXB0dl9wYXJhbXNfaG91cjEyIiwiaXB0dl9wYXJhbXNfZGF5IiwiaXB0dl9wYXJhbXNfd2VlayIsImlwdHZfcGFyYW1zX25vbmUiLCJpcHR2X3VwZGF0ZV9hcHBfdGl0bGUiLCJpcHR2X3VwZGF0ZV9hcHBfdGV4dCIsImlwdHZfcGFyYW1fc29ydF9hZGQiLCJpcHR2X3BhcmFtX3NvcnRfbmFtZSIsImlwdHZfcGFyYW1fc29ydF92aWV3IiwiaXB0dl9wYXJhbV9zb3J0X2Zhdm9yaXRlIiwiaXB0dl9wcmVtaXVtIiwiaXB0dl9wYXJhbV9zYXZlX2Zhdm9yaXRlIiwiaXB0dl9wYXJhbV9zYXZlX2Zhdm9yaXRlX3VybCIsImlwdHZfcGFyYW1fc2F2ZV9mYXZvcml0ZV9uYW1lIiwiaXB0dl9wYXJhbV91c2VfZGIiLCJpcHR2X3BhcmFtX2d1aWRlIiwiaXB0dl9zZWFyY2hfbm9fcmVzdWx0IiwiaXB0dl9ndWlkZV9zdGF0dXNfdXBkYXRlX3dhaXQiLCJpcHR2X2d1aWRlX3N0YXR1c191cGRhdGUiLCJpcHR2X2d1aWRlX3N0YXR1c19wYXJzaW5nIiwiaXB0dl9ndWlkZV9zdGF0dXNfZmluaXNoIiwiaXB0dl9ndWlkZV9zdGF0dXNfY2hhbm5lbHMiLCJpcHR2X2d1aWRlX3N0YXR1c19kYXRlIiwiaXB0dl9ndWlkZV9zdGF0dXNfbm91cGRhdGVzIiwiaXB0dl9ndWlkZV9lcnJvcl9saW5rIiwiaXB0dl9wYXJhbV9ndWlkZV9jdXN0b21fdGl0bGUiLCJpcHR2X3BhcmFtX2d1aWRlX2N1c3RvbV9kZXNjciIsImlwdHZfcGFyYW1fZ3VpZGVfdXJsX2Rlc2NyIiwiaXB0dl9wYXJhbV9ndWlkZV9pbnRlcnZhbF90aXRsZSIsImlwdHZfcGFyYW1fZ3VpZGVfaW50ZXJ2YWxfZGVzY3IiLCJpcHR2X3BhcmFtX2d1aWRlX3VwZGF0ZV9hZnRlcl9zdGFydCIsImlwdHZfcGFyYW1fZ3VpZGVfdXBkYXRlX25vdyIsImlwdHZfcGFyYW1fZ3VpZGVfc2F2ZV90aXRsZSIsImlwdHZfcGFyYW1fZ3VpZGVfc2F2ZV9kZXNjciIsImlwdHZfcGFyYW1fZ3VpZGVfdXBkYXRlX2N1c3RvbSIsImlwdHZfbmVlZF91cGRhdGVfYXBwIiwiaXB0dl9jaGFubmVsX2xvY2siLCJpcHR2X2NoYW5uZWxfdW5sb2NrIiwiaXB0dl9hYm91dF90ZXh0IiwiaXB0dl9jb25maXJtX2RlbGV0ZV9wbGF5bGlzdCIsImlwdHZfY2FjaGVfY2xlYXIiLCJpcHR2X3BsYXlsaXN0X2RlbGV0ZWQiLCJpcHR2X3BsYXlsaXN0X2FkZF9zZXRfdXJsIiwiaXB0dl9wbGF5bGlzdF9hZGRfbmV3IiwiaXB0dl9wbGF5bGlzdF91cmxfY2hhbmdlZCIsImlwdHZfcGxheWxpc3RfYWRkX3NldF9uYW1lIiwiaXB0dl9wbGF5bGlzdF9uYW1lX2NoYW5nZWQiLCJpcHR2X3BsYXlsaXN0X2NoYW5nZV9uYW1lIiwiaXB0dl9wYXJhbV92aWV3X2luX21haW4iLCJDaGFubmVsIiwiY2FyZCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiaW1hZ2UiLCJjbGFzc0xpc3QiLCJvbkZvY3VzIiwib25Ib3ZlciIsInR2IiwiZW1pdCIsInVzZSIsIm9uVmlzaWJsZSIsInN0YXJ0UGx1Z2luIiwicGx1Z2luX2lwdHZfcmVhZHkiLCJtYW5pZmVzdCIsInZlcnNpb24iLCJkZXNjcmlwdGlvbiIsIm9uTWFpbiIsInJlc3VsdHMiLCJub21vcmUiLCJsaW5lX3R5cGUiLCJjYXJkQ2xhc3MiLCJNYWluQ2hhbm5lbCIsInBsdWdpbnMiLCJDb250ZW50Um93cyIsInNjcmVlbiIsImNyZWF0ZUluc3RhbmNlIiwicGFnZSIsImVxIiwidW5iaW5kIiwiVGVtcGxhdGVzIiwic3RhcnRfZGVlcF9saW5rIiwiYXBwcmVhZHkiLCJMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUFxQixJQUVmQSxLQUFLO0lB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