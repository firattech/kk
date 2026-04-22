(function () {
    'use strict';

    var connect_host = '{localhost}';
    var list_opened = false;
    function reguest(params, callback) {
      if (params.ffprobe && params.path.split('.').pop() !== 'mp4') {
        setTimeout(function () {
          callback({
            streams: params.ffprobe
          });
        }, 200);
      } else {
        if (connect_host == '{localhost}') connect_host = '185.204.0.61';
        var socket = new WebSocket('ws://' + connect_host + ':8080/?' + params.torrent_hash + '&index=' + params.id);
        socket.addEventListener('message', function (event) {
          socket.close();
          var json = {};
          try {
            json = JSON.parse(event.data);
          } catch (e) {}
          if (json.streams) callback(json);
        });
      }
    }
    function subscribeTracks(data) {
      var inited = false;
      var inited_parse = false;
      var webos_replace = {};
      function log() {
        console.log.apply(console.log, arguments);
      }
      function getTracks() {
        var video = Lampa.PlayerVideo.video();
        return video.audioTracks || [];
      }
      function getSubs() {
        var video = Lampa.PlayerVideo.video();
        return video.textTracks || [];
      }
      log('Tracks', 'start');
      function setTracks() {
        if (inited_parse) {
          var new_tracks = [];
          var video_tracks = getTracks();
          var parse_tracks = inited_parse.streams.filter(function (a) {
            return a.codec_type == 'audio';
          });
          var minus = 1;
          log('Tracks', 'set tracks:', video_tracks.length);
          if (parse_tracks.length !== video_tracks.length) parse_tracks = parse_tracks.filter(function (a) {
            return a.codec_name !== 'dts';
          });
          parse_tracks = parse_tracks.filter(function (a) {
            return a.tags;
          });
          log('Tracks', 'filtred tracks:', parse_tracks.length);
          parse_tracks.forEach(function (track) {
            var orig = video_tracks[track.index - minus];
            var elem = {
              index: track.index - minus,
              language: track.tags.language,
              label: track.tags.title || track.tags.handler_name,
              ghost: orig ? false : true,
              selected: orig ? orig.selected == true || orig.enabled == true : false
            };
            console.log('Tracks', 'tracks original', orig);
            Object.defineProperty(elem, "enabled", {
              set: function set(v) {
                if (v) {
                  var aud = getTracks();
                  var trk = aud[elem.index];
                  for (var i = 0; i < aud.length; i++) {
                    aud[i].enabled = false;
                    aud[i].selected = false;
                  }
                  if (trk) {
                    trk.enabled = true;
                    trk.selected = true;
                  }
                }
              },
              get: function get() {}
            });
            new_tracks.push(elem);
          });
          if (parse_tracks.length) Lampa.PlayerPanel.setTracks(new_tracks);
        }
      }
      function setSubs() {
        if (inited_parse) {
          var new_subs = [];
          var video_subs = getSubs();
          var parse_subs = inited_parse.streams.filter(function (a) {
            return a.codec_type == 'subtitle';
          });
          var minus = inited_parse.streams.filter(function (a) {
            return a.codec_type == 'audio';
          }).length + 1;
          log('Tracks', 'set subs:', video_subs.length);
          parse_subs = parse_subs.filter(function (a) {
            return a.tags;
          });
          log('Tracks', 'filtred subs:', parse_subs.length);
          parse_subs.forEach(function (track) {
            var orig = video_subs[track.index - minus];
            var elem = {
              index: track.index - minus,
              language: track.tags.language,
              label: track.tags.title || track.tags.handler_name,
              ghost: video_subs[track.index - minus] ? false : true,
              selected: orig ? orig.selected == true || orig.mode == 'showing' : false
            };
            console.log('Tracks', 'subs original', orig);
            Object.defineProperty(elem, "mode", {
              set: function set(v) {
                if (v) {
                  var txt = getSubs();
                  var sub = txt[elem.index];
                  for (var i = 0; i < txt.length; i++) {
                    txt[i].mode = 'disabled';
                    txt[i].selected = false;
                  }
                  if (sub) {
                    sub.mode = 'showing';
                    sub.selected = true;
                  }
                }
              },
              get: function get() {}
            });
            new_subs.push(elem);
          });
          if (parse_subs.length) Lampa.PlayerPanel.setSubs(new_subs);
        }
      }
      function listenTracks() {
        log('Tracks', 'tracks video event');
        setTracks();
        Lampa.PlayerVideo.listener.remove('tracks', listenTracks);
      }
      function listenSubs() {
        log('Tracks', 'subs video event');
        setSubs();
        Lampa.PlayerVideo.listener.remove('subs', listenSubs);
      }
      function canPlay() {
        log('Tracks', 'canplay video event');
        if (webos_replace.tracks) setWebosTracks(webos_replace.tracks);else setTracks();
        if (webos_replace.subs) setWebosSubs(webos_replace.subs);else setSubs();
        Lampa.PlayerVideo.listener.remove('canplay', canPlay);
      }
      function setWebosTracks(video_tracks) {
        if (inited_parse) {
          var parse_tracks = inited_parse.streams.filter(function (a) {
            return a.codec_type == 'audio';
          });
          log('Tracks', 'webos set tracks:', video_tracks.length);
          if (parse_tracks.length !== video_tracks.length) {
            parse_tracks = parse_tracks.filter(function (a) {
              return a.codec_name !== 'truehd';
            });
            if (parse_tracks.length !== video_tracks.length) {
              parse_tracks = parse_tracks.filter(function (a) {
                return a.codec_name !== 'dts';
              });
            }
          }
          parse_tracks = parse_tracks.filter(function (a) {
            return a.tags;
          });
          log('Tracks', 'webos tracks', video_tracks);
          parse_tracks.forEach(function (track, i) {
            if (video_tracks[i]) {
              video_tracks[i].language = track.tags.language;
              video_tracks[i].label = track.tags.title || track.tags.handler_name;
            }
          });
        }
      }
      function setWebosSubs(video_subs) {
        if (inited_parse) {
          var parse_subs = inited_parse.streams.filter(function (a) {
            return a.codec_type == 'subtitle';
          });
          log('Tracks', 'webos set subs:', video_subs.length);
          if (parse_subs.length !== video_subs.length - 1) parse_subs = parse_subs.filter(function (a) {
            return a.codec_name !== 'hdmv_pgs_subtitle';
          });
          parse_subs = parse_subs.filter(function (a) {
            return a.tags;
          });
          parse_subs.forEach(function (track, a) {
            var i = a + 1;
            if (video_subs[i]) {
              video_subs[i].language = track.tags.language;
              video_subs[i].label = track.tags.title || track.tags.handler_name;
            }
          });
        }
      }
      function listenWebosSubs(_data) {
        log('Tracks', 'webos subs event');
        webos_replace.subs = _data.subs;
        if (inited_parse) setWebosSubs(_data.subs);
      }
      function listenWebosTracks(_data) {
        log('Tracks', 'webos tracks event');
        webos_replace.tracks = _data.tracks;
        if (inited_parse) setWebosTracks(_data.tracks);
      }
      function listenStart() {
        inited = true;
        reguest(data, function (result) {
          log('Tracks', 'parsed', inited_parse);
          inited_parse = result;
          if (inited) {
            if (webos_replace.subs) setWebosSubs(webos_replace.subs);else setSubs();
            if (webos_replace.tracks) setWebosTracks(webos_replace.tracks);else setTracks();
          }
        });
      }
      function listenDestroy() {
        inited = false;
        Lampa.Player.listener.remove('destroy', listenDestroy);
        Lampa.PlayerVideo.listener.remove('tracks', listenTracks);
        Lampa.PlayerVideo.listener.remove('subs', listenSubs);
        Lampa.PlayerVideo.listener.remove('webos_subs', listenWebosSubs);
        Lampa.PlayerVideo.listener.remove('webos_tracks', listenWebosTracks);
        Lampa.PlayerVideo.listener.remove('canplay', canPlay);
        log('Tracks', 'end');
      }
      Lampa.Player.listener.follow('destroy', listenDestroy);
      Lampa.PlayerVideo.listener.follow('tracks', listenTracks);
      Lampa.PlayerVideo.listener.follow('subs', listenSubs);
      Lampa.PlayerVideo.listener.follow('webos_subs', listenWebosSubs);
      Lampa.PlayerVideo.listener.follow('webos_tracks', listenWebosTracks);
      Lampa.PlayerVideo.listener.follow('canplay', canPlay);
      listenStart();
    }
    function parseMetainfo(data) {
      var loading = Lampa.Template.get('tracks_loading');
      data.item.after(loading);
      reguest(data.element, function (result) {
        if (list_opened) {
          var append = function append(name, fields) {
            if (fields.length) {
              var block = Lampa.Template.get('tracks_metainfo_block', {});
              block.find('.tracks-metainfo__label').text(Lampa.Lang.translate(name == 'video' ? 'extensions_hpu_video' : name == 'audio' ? 'player_tracks' : 'player_' + name));
              fields.forEach(function (data) {
                var item = $('<div class="tracks-metainfo__item tracks-metainfo__item--' + name + ' selector"></div>');
                item.on('hover:focus', function (e) {
                  Lampa.Modal.scroll().update(item);
                });
                for (var i in data) {
                  var div = $('<div class="tracks-metainfo__column--' + i + '"></div>');
                  div.text(data[i]);
                  item.append(div);
                }
                block.find('.tracks-metainfo__info').append(item);
              });
              html.append(block);
            }
          };
          var video = [];
          var audio = [];
          var subs = [];
          var codec_video = result.streams.filter(function (a) {
            return a.codec_type == 'video';
          });
          var codec_audio = result.streams.filter(function (a) {
            return a.codec_type == 'audio';
          });
          var codec_subs = result.streams.filter(function (a) {
            return a.codec_type == 'subtitle';
          });
          codec_video.slice(0, 1).forEach(function (v) {
            var line = {};
            if (v.width && v.height) line.video = v.width + 'х' + v.height;
            if (v.duration) {
              line.duration = new Date(v.duration * 1000).toISOString().slice(11, 19);
            } else if (v.tags) {
              if (v.tags.DURATION) {
                line.duration = v.tags.DURATION ? v.tags.DURATION.split(".") : '';
                line.duration.pop();
              } else if (v.tags["DURATION-eng"]) {
                line.duration = v.tags["DURATION-eng"] ? v.tags["DURATION-eng"].split(".") : '';
                line.duration.pop();
              }
            }
            if (v.codec_name) line.codec = v.codec_name.toUpperCase();
            if (Boolean(v.is_avc)) line.avc = 'AVC';
            var bit = v.bit_rate ? v.bit_rate : v.tags && (v.tags.BPS || v.tags["BPS-eng"]) ? v.tags.BPS || v.tags["BPS-eng"] : '--';
            line.rate = bit == '--' ? bit : Math.round(bit / 1000000) + ' ' + Lampa.Lang.translate('speed_mb');
            if (Lampa.Arrays.getKeys(line).length) video.push(line);
          });
          codec_audio.forEach(function (a, i) {
            var line = {
              num: i + 1
            };
            if (a.tags) {
              line.lang = (a.tags.language || '').toUpperCase();
            }
            line.name = a.tags ? a.tags.title || a.tags.handler_name : '';
            if (a.codec_name) line.codec = a.codec_name.toUpperCase();
            if (a.channel_layout) line.channels = a.channel_layout.replace('(side)', '').replace('stereo', '2.0').replace('8 channels (FL+FR+FC+LFE+SL+SR+TFL+TFR)', '7.1');
            var bit = a.bit_rate ? a.bit_rate : a.tags && (a.tags.BPS || a.tags["BPS-eng"]) ? a.tags.BPS || a.tags["BPS-eng"] : '--';
            line.rate = bit == '--' ? bit : Math.round(bit / 1000) + ' ' + Lampa.Lang.translate('speed_kb');
            if (Lampa.Arrays.getKeys(line).length) audio.push(line);
          });
          codec_subs.forEach(function (a, i) {
            var line = {
              num: i + 1
            };
            if (a.tags) {
              line.lang = (a.tags.language || '').toUpperCase();
            }
            line.name = a.tags ? a.tags.title || a.tags.handler_name : '';
            if (a.codec_name) line.codec = a.codec_name.toUpperCase().replace('SUBRIP', 'SRT').replace('HDMV_PGS_SUBTITLE', 'HDMV PGS').replace('MOV_TEXT', 'MOV TEXT');
            if (Lampa.Arrays.getKeys(line).length) subs.push(line);
          });
          var html = Lampa.Template.get('tracks_metainfo', {});
          append('video', video);
          append('audio', audio);
          append('subs', subs);
          loading.remove();
          if (video.length || audio.length || subs.length) {
            data.item.after(html);
          }
          if (Lampa.Controller.enabled().name == 'modal') Lampa.Controller.toggle('modal');
        }
      });
    }
    Lampa.Player.listener.follow('start', function (data) {
      if (data.torrent_hash) subscribeTracks(data);
    });
    Lampa.Listener.follow('torrent_file', function (data) {
      if (data.type == 'list_open') list_opened = true;
      if (data.type == 'list_close') list_opened = false;
      if (data.type == 'render' && data.items.length == 1 && list_opened) {
        parseMetainfo(data);
      }
    });
    Lampa.Template.add('tracks_loading', "\n    <div class=\"tracks-loading\">\n        <span>#{loading}...</span>\n    </div>\n");
    Lampa.Template.add('tracks_metainfo', "\n    <div class=\"tracks-metainfo\"></div>\n");
    Lampa.Template.add('tracks_metainfo_block', "\n    <div class=\"tracks-metainfo__line\">\n        <div class=\"tracks-metainfo__label\"></div>\n        <div class=\"tracks-metainfo__info\"></div>\n    </div>\n");
    Lampa.Template.add('tracks_css', "\n    <style>\n    .tracks-loading{margin-top:1em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}.tracks-loading:before{content:'';display:inline-block;width:1.3em;height:1.3em;background:url('./img/loader.svg') no-repeat 50% 50%;background-size:contain;margin-right:.4em}.tracks-loading>span{font-size:1.1em;line-height:1.1}.tracks-metainfo{margin-top:1em}.tracks-metainfo__line+.tracks-metainfo__line{margin-top:2em}.tracks-metainfo__label{opacity:.5;font-weight:600}.tracks-metainfo__info{padding-top:1em;line-height:1.2}.tracks-metainfo__info>div{background-color:rgba(0,0,0,0.22);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-border-radius:.3em;border-radius:.3em;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.tracks-metainfo__info>div.focus{background-color:rgba(255,255,255,0.06)}.tracks-metainfo__info>div>div{padding:1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.tracks-metainfo__info>div>div:not(:last-child){padding-right:1.5em}.tracks-metainfo__info>div+div{margin-top:1em}.tracks-metainfo__column--video,.tracks-metainfo__column--name{margin-right:auto}.tracks-metainfo__column--num{min-width:3em;padding-right:0}.tracks-metainfo__column--rate{min-width:7em;text-align:right}.tracks-metainfo__column--channels{min-width:5em;text-align:right}\n    </style>\n");
    $('body').append(Lampa.Template.get('tracks_css', {}, true));

})();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tzLmpzIiwic291cmNlcyI6WyJ0cmFja3MvdHJhY2tzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBjb25uZWN0X3R5cGUgID0gJ3NvY2tldCdcbmxldCBjb25uZWN0X2hvc3QgID0gJ3tsb2NhbGhvc3R9J1xubGV0IGxpc3Rfb3BlbmVkICAgPSBmYWxzZVxubGV0IGxvZ3MgICAgICAgICAgPSB0cnVlXG5cbmZ1bmN0aW9uIHJlZ3Vlc3QocGFyYW1zLCBjYWxsYmFjayl7XG4gICAgaWYocGFyYW1zLmZmcHJvYmUgJiYgcGFyYW1zLnBhdGguc3BsaXQoJy4nKS5wb3AoKSAhPT0gJ21wNCcpe1xuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICBjYWxsYmFjayh7c3RyZWFtczogcGFyYW1zLmZmcHJvYmV9KVxuICAgICAgICB9LDIwMClcbiAgICB9XG4gICAgZWxzZSBpZihjb25uZWN0X3R5cGUgPT0gJ2h0dHAnKXtcbiAgICAgICAgbGV0IG5ldCA9IG5ldyBMYW1wYS5SZWd1ZXN0KClcblxuICAgICAgICBuZXQudGltZW91dCgxMDAwKjE1KVxuXG4gICAgICAgIGlmKGNvbm5lY3RfaG9zdCA9PSAne2xvY2FsaG9zdH0nKSBjb25uZWN0X2hvc3QgPSAnMTI3LjAuMC4xJ1xuXG4gICAgICAgIG5ldC5uYXRpdmUoJ2h0dHA6Ly8nK2Nvbm5lY3RfaG9zdCsnOjkxMTgvZmZwcm9iZT9tZWRpYT0nK2VuY29kZVVSSUNvbXBvbmVudChwYXJhbXMudXJsKSwoc3RyKT0+e1xuICAgICAgICAgICAgbGV0IGpzb24gPSB7fVxuXG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAganNvbiA9IEpTT04ucGFyc2Uoc3RyKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2goZSl7fVxuXG4gICAgICAgICAgICBpZihqc29uLnN0cmVhbXMpIGNhbGxiYWNrKGpzb24pXG4gICAgICAgIH0sZmFsc2UsZmFsc2Use1xuICAgICAgICAgICAgZGF0YVR5cGU6ICd0ZXh0J1xuICAgICAgICB9KVxuICAgIH1cbiAgICBlbHNlIGlmKGNvbm5lY3RfdHlwZSA9PSAnc29ja2V0Jyl7XG4gICAgICAgIGlmKGNvbm5lY3RfaG9zdCA9PSAne2xvY2FsaG9zdH0nKSBjb25uZWN0X2hvc3QgPSAnMTg1LjIwNC4wLjYxJ1xuXG4gICAgICAgIGxldCBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KCd3czovLycrY29ubmVjdF9ob3N0Kyc6ODA4MC8/JytwYXJhbXMudG9ycmVudF9oYXNoKycmaW5kZXg9JytwYXJhbXMuaWQpXG5cbiAgICAgICAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXZlbnQpPT4ge1xuICAgICAgICAgICAgc29ja2V0LmNsb3NlKClcblxuICAgICAgICAgICAgbGV0IGpzb24gPSB7fVxuXG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAganNvbiA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoKGUpe31cblxuICAgICAgICAgICAgaWYoanNvbi5zdHJlYW1zKSBjYWxsYmFjayhqc29uKVxuICAgICAgICB9KSAgICBcbiAgICB9ICAgXG59XG5cbmZ1bmN0aW9uIHN1YnNjcmliZVRyYWNrcyhkYXRhKXtcbiAgICBsZXQgaW5pdGVkICAgICAgICA9IGZhbHNlXG4gICAgbGV0IGluaXRlZF9wYXJzZSAgPSBmYWxzZVxuICAgIGxldCB3ZWJvc19yZXBsYWNlID0ge31cblxuICAgIGZ1bmN0aW9uIGxvZygpe1xuICAgICAgICBpZihsb2dzKSBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLmxvZywgYXJndW1lbnRzKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRyYWNrcygpe1xuICAgICAgICBsZXQgdmlkZW8gPSBMYW1wYS5QbGF5ZXJWaWRlby52aWRlbygpXG5cbiAgICAgICAgcmV0dXJuIHZpZGVvLmF1ZGlvVHJhY2tzIHx8IFtdXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U3Vicygpe1xuICAgICAgICBsZXQgdmlkZW8gPSBMYW1wYS5QbGF5ZXJWaWRlby52aWRlbygpXG5cbiAgICAgICAgcmV0dXJuIHZpZGVvLnRleHRUcmFja3MgfHwgW11cbiAgICB9XG5cbiAgICBsb2coJ1RyYWNrcycsICdzdGFydCcpXG5cbiAgICBmdW5jdGlvbiBzZXRUcmFja3MoKXtcbiAgICAgICAgaWYoaW5pdGVkX3BhcnNlKXtcbiAgICAgICAgICAgIGxldCBuZXdfdHJhY2tzICAgPSBbXVxuICAgICAgICAgICAgbGV0IHZpZGVvX3RyYWNrcyA9IGdldFRyYWNrcygpXG4gICAgICAgICAgICBsZXQgcGFyc2VfdHJhY2tzID0gaW5pdGVkX3BhcnNlLnN0cmVhbXMuZmlsdGVyKGE9PmEuY29kZWNfdHlwZSA9PSAnYXVkaW8nKVxuICAgICAgICAgICAgbGV0IG1pbnVzICAgICAgICA9IDFcblxuICAgICAgICAgICAgbG9nKCdUcmFja3MnLCAnc2V0IHRyYWNrczonLCB2aWRlb190cmFja3MubGVuZ3RoKVxuXG4gICAgICAgICAgICBpZihwYXJzZV90cmFja3MubGVuZ3RoICE9PSB2aWRlb190cmFja3MubGVuZ3RoKSBwYXJzZV90cmFja3MgPSBwYXJzZV90cmFja3MuZmlsdGVyKGE9PmEuY29kZWNfbmFtZSAhPT0gJ2R0cycpXG5cbiAgICAgICAgICAgIHBhcnNlX3RyYWNrcyA9IHBhcnNlX3RyYWNrcy5maWx0ZXIoYT0+YS50YWdzKVxuXG4gICAgICAgICAgICBsb2coJ1RyYWNrcycsICdmaWx0cmVkIHRyYWNrczonLCBwYXJzZV90cmFja3MubGVuZ3RoKVxuXG4gICAgICAgICAgICBwYXJzZV90cmFja3MuZm9yRWFjaCh0cmFjaz0+e1xuICAgICAgICAgICAgICAgIGxldCBvcmlnID0gdmlkZW9fdHJhY2tzW3RyYWNrLmluZGV4IC0gbWludXNdXG4gICAgICAgICAgICAgICAgbGV0IGVsZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiB0cmFjay5pbmRleCAtIG1pbnVzLFxuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogdHJhY2sudGFncy5sYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRyYWNrLnRhZ3MudGl0bGUgfHwgdHJhY2sudGFncy5oYW5kbGVyX25hbWUsXG4gICAgICAgICAgICAgICAgICAgIGdob3N0OiBvcmlnID8gZmFsc2UgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogb3JpZyA/IG9yaWcuc2VsZWN0ZWQgPT0gdHJ1ZSB8fCBvcmlnLmVuYWJsZWQgPT0gdHJ1ZSA6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RyYWNrcycsJ3RyYWNrcyBvcmlnaW5hbCcsIG9yaWcpXG5cbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbSwgXCJlbmFibGVkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0OiAodik9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHYpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdWQgPSBnZXRUcmFja3MoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0cmsgPSBhdWRbZWxlbS5pbmRleF1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhdWQubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdWRbaV0uZW5hYmxlZCAgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdWRbaV0uc2VsZWN0ZWQgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0cmspe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmsuZW5hYmxlZCAgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyay5zZWxlY3RlZCA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBnZXQ6ICgpPT57fVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBuZXdfdHJhY2tzLnB1c2goZWxlbSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmKHBhcnNlX3RyYWNrcy5sZW5ndGgpIExhbXBhLlBsYXllclBhbmVsLnNldFRyYWNrcyhuZXdfdHJhY2tzKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0U3Vicygpe1xuICAgICAgICBpZihpbml0ZWRfcGFyc2Upe1xuICAgICAgICAgICAgbGV0IG5ld19zdWJzICAgPSBbXVxuICAgICAgICAgICAgbGV0IHZpZGVvX3N1YnMgPSBnZXRTdWJzKClcbiAgICAgICAgICAgIGxldCBwYXJzZV9zdWJzID0gaW5pdGVkX3BhcnNlLnN0cmVhbXMuZmlsdGVyKGE9PmEuY29kZWNfdHlwZSA9PSAnc3VidGl0bGUnKVxuICAgICAgICAgICAgbGV0IG1pbnVzICAgICAgPSBpbml0ZWRfcGFyc2Uuc3RyZWFtcy5maWx0ZXIoYT0+YS5jb2RlY190eXBlID09ICdhdWRpbycpLmxlbmd0aCArIDFcblxuICAgICAgICAgICAgbG9nKCdUcmFja3MnLCAnc2V0IHN1YnM6JywgdmlkZW9fc3Vicy5sZW5ndGgpXG5cbiAgICAgICAgICAgIHBhcnNlX3N1YnMgPSBwYXJzZV9zdWJzLmZpbHRlcihhPT5hLnRhZ3MpXG5cbiAgICAgICAgICAgIGxvZygnVHJhY2tzJywgJ2ZpbHRyZWQgc3ViczonLCBwYXJzZV9zdWJzLmxlbmd0aClcblxuICAgICAgICAgICAgcGFyc2Vfc3Vicy5mb3JFYWNoKHRyYWNrPT57XG4gICAgICAgICAgICAgICAgbGV0IG9yaWcgPSB2aWRlb19zdWJzW3RyYWNrLmluZGV4IC0gbWludXNdXG4gICAgICAgICAgICAgICAgbGV0IGVsZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiB0cmFjay5pbmRleCAtIG1pbnVzLFxuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogdHJhY2sudGFncy5sYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRyYWNrLnRhZ3MudGl0bGUgfHwgdHJhY2sudGFncy5oYW5kbGVyX25hbWUsXG4gICAgICAgICAgICAgICAgICAgIGdob3N0OiB2aWRlb19zdWJzW3RyYWNrLmluZGV4IC0gbWludXNdID8gZmFsc2UgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogb3JpZyA/IG9yaWcuc2VsZWN0ZWQgPT0gdHJ1ZSB8fCBvcmlnLm1vZGUgPT0gJ3Nob3dpbmcnIDogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVHJhY2tzJywnc3VicyBvcmlnaW5hbCcsIG9yaWcpXG5cbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbSwgXCJtb2RlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0OiAodik9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHYpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0eHQgPSBnZXRTdWJzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3ViID0gdHh0W2VsZW0uaW5kZXhdXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdHh0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0W2ldLm1vZGUgPSAnZGlzYWJsZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dFtpXS5zZWxlY3RlZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3ViKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViLm1vZGUgPSAnc2hvd2luZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViLnNlbGVjdGVkID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGdldDogKCk9Pnt9XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIG5ld19zdWJzLnB1c2goZWxlbSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmKHBhcnNlX3N1YnMubGVuZ3RoKSBMYW1wYS5QbGF5ZXJQYW5lbC5zZXRTdWJzKG5ld19zdWJzKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdGVuVHJhY2tzKCl7XG4gICAgICAgIGxvZygnVHJhY2tzJywgJ3RyYWNrcyB2aWRlbyBldmVudCcpXG5cbiAgICAgICAgc2V0VHJhY2tzKClcblxuICAgICAgICBMYW1wYS5QbGF5ZXJWaWRlby5saXN0ZW5lci5yZW1vdmUoJ3RyYWNrcycsbGlzdGVuVHJhY2tzKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RlblN1YnMoKXtcbiAgICAgICAgbG9nKCdUcmFja3MnLCAnc3VicyB2aWRlbyBldmVudCcpXG5cbiAgICAgICAgc2V0U3VicygpXG5cbiAgICAgICAgTGFtcGEuUGxheWVyVmlkZW8ubGlzdGVuZXIucmVtb3ZlKCdzdWJzJyxsaXN0ZW5TdWJzKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhblBsYXkoKXtcbiAgICAgICAgbG9nKCdUcmFja3MnLCAnY2FucGxheSB2aWRlbyBldmVudCcpXG5cbiAgICAgICAgaWYod2Vib3NfcmVwbGFjZS50cmFja3MpICBzZXRXZWJvc1RyYWNrcyh3ZWJvc19yZXBsYWNlLnRyYWNrcylcbiAgICAgICAgZWxzZSBzZXRUcmFja3MoKVxuXG4gICAgICAgIGlmKHdlYm9zX3JlcGxhY2Uuc3VicykgICBzZXRXZWJvc1N1YnMod2Vib3NfcmVwbGFjZS5zdWJzKVxuICAgICAgICBlbHNlIHNldFN1YnMoKVxuXG4gICAgICAgIExhbXBhLlBsYXllclZpZGVvLmxpc3RlbmVyLnJlbW92ZSgnY2FucGxheScsY2FuUGxheSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRXZWJvc1RyYWNrcyh2aWRlb190cmFja3Mpe1xuICAgICAgICBpZihpbml0ZWRfcGFyc2Upe1xuICAgICAgICAgICAgbGV0IHBhcnNlX3RyYWNrcyA9IGluaXRlZF9wYXJzZS5zdHJlYW1zLmZpbHRlcihhPT5hLmNvZGVjX3R5cGUgPT0gJ2F1ZGlvJylcblxuICAgICAgICAgICAgbG9nKCdUcmFja3MnLCAnd2Vib3Mgc2V0IHRyYWNrczonLCB2aWRlb190cmFja3MubGVuZ3RoKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihwYXJzZV90cmFja3MubGVuZ3RoICE9PSB2aWRlb190cmFja3MubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBwYXJzZV90cmFja3MgPSBwYXJzZV90cmFja3MuZmlsdGVyKGE9PmEuY29kZWNfbmFtZSAhPT0gJ3RydWVoZCcpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYocGFyc2VfdHJhY2tzLmxlbmd0aCAhPT0gdmlkZW9fdHJhY2tzLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlX3RyYWNrcyA9IHBhcnNlX3RyYWNrcy5maWx0ZXIoYT0+YS5jb2RlY19uYW1lICE9PSAnZHRzJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBhcnNlX3RyYWNrcyA9IHBhcnNlX3RyYWNrcy5maWx0ZXIoYT0+YS50YWdzKVxuXG4gICAgICAgICAgICBsb2coJ1RyYWNrcycsJ3dlYm9zIHRyYWNrcycsIHZpZGVvX3RyYWNrcylcblxuICAgICAgICAgICAgcGFyc2VfdHJhY2tzLmZvckVhY2goKHRyYWNrLGkpPT57XG4gICAgICAgICAgICAgICAgaWYodmlkZW9fdHJhY2tzW2ldKXtcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9fdHJhY2tzW2ldLmxhbmd1YWdlID0gdHJhY2sudGFncy5sYW5ndWFnZVxuICAgICAgICAgICAgICAgICAgICB2aWRlb190cmFja3NbaV0ubGFiZWwgICAgPSB0cmFjay50YWdzLnRpdGxlIHx8IHRyYWNrLnRhZ3MuaGFuZGxlcl9uYW1lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFdlYm9zU3Vicyh2aWRlb19zdWJzKXtcbiAgICAgICAgaWYoaW5pdGVkX3BhcnNlKXtcbiAgICAgICAgICAgIGxldCBwYXJzZV9zdWJzID0gaW5pdGVkX3BhcnNlLnN0cmVhbXMuZmlsdGVyKGE9PmEuY29kZWNfdHlwZSA9PSAnc3VidGl0bGUnKVxuXG4gICAgICAgICAgICBsb2coJ1RyYWNrcycsICd3ZWJvcyBzZXQgc3ViczonLCB2aWRlb19zdWJzLmxlbmd0aClcblxuICAgICAgICAgICAgaWYocGFyc2Vfc3Vicy5sZW5ndGggIT09IHZpZGVvX3N1YnMubGVuZ3RoLTEpIHBhcnNlX3N1YnMgPSBwYXJzZV9zdWJzLmZpbHRlcihhPT5hLmNvZGVjX25hbWUgIT09ICdoZG12X3Bnc19zdWJ0aXRsZScpICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHBhcnNlX3N1YnMgPSBwYXJzZV9zdWJzLmZpbHRlcihhPT5hLnRhZ3MpXG5cbiAgICAgICAgICAgIHBhcnNlX3N1YnMuZm9yRWFjaCgodHJhY2ssYSk9PntcbiAgICAgICAgICAgICAgICBsZXQgaSA9IGEgKyAxXG5cbiAgICAgICAgICAgICAgICBpZih2aWRlb19zdWJzW2ldKXtcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9fc3Vic1tpXS5sYW5ndWFnZSA9IHRyYWNrLnRhZ3MubGFuZ3VhZ2VcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9fc3Vic1tpXS5sYWJlbCA9IHRyYWNrLnRhZ3MudGl0bGUgfHwgdHJhY2sudGFncy5oYW5kbGVyX25hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdGVuV2Vib3NTdWJzKF9kYXRhKXtcbiAgICAgICAgbG9nKCdUcmFja3MnLCd3ZWJvcyBzdWJzIGV2ZW50JylcblxuICAgICAgICB3ZWJvc19yZXBsYWNlLnN1YnMgPSBfZGF0YS5zdWJzXG5cbiAgICAgICAgaWYoaW5pdGVkX3BhcnNlKSBzZXRXZWJvc1N1YnMoX2RhdGEuc3VicylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0ZW5XZWJvc1RyYWNrcyhfZGF0YSl7XG4gICAgICAgIGxvZygnVHJhY2tzJywnd2Vib3MgdHJhY2tzIGV2ZW50JylcblxuICAgICAgICB3ZWJvc19yZXBsYWNlLnRyYWNrcyA9IF9kYXRhLnRyYWNrc1xuXG4gICAgICAgIGlmKGluaXRlZF9wYXJzZSkgc2V0V2Vib3NUcmFja3MoX2RhdGEudHJhY2tzKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RlblN0YXJ0KCl7XG4gICAgICAgIGluaXRlZCA9IHRydWVcblxuICAgICAgICByZWd1ZXN0KGRhdGEsKHJlc3VsdCk9PntcbiAgICAgICAgICAgIGxvZygnVHJhY2tzJywgJ3BhcnNlZCcsIGluaXRlZF9wYXJzZSlcblxuICAgICAgICAgICAgaW5pdGVkX3BhcnNlID0gcmVzdWx0XG5cbiAgICAgICAgICAgIGlmKGluaXRlZCl7XG4gICAgICAgICAgICAgICAgaWYod2Vib3NfcmVwbGFjZS5zdWJzKSAgIHNldFdlYm9zU3Vicyh3ZWJvc19yZXBsYWNlLnN1YnMpXG4gICAgICAgICAgICAgICAgZWxzZSBzZXRTdWJzKClcblxuICAgICAgICAgICAgICAgIGlmKHdlYm9zX3JlcGxhY2UudHJhY2tzKSBzZXRXZWJvc1RyYWNrcyh3ZWJvc19yZXBsYWNlLnRyYWNrcylcbiAgICAgICAgICAgICAgICBlbHNlIHNldFRyYWNrcygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdGVuRGVzdHJveSgpe1xuICAgICAgICBpbml0ZWQgPSBmYWxzZVxuXG4gICAgICAgIExhbXBhLlBsYXllci5saXN0ZW5lci5yZW1vdmUoJ2Rlc3Ryb3knLGxpc3RlbkRlc3Ryb3kpXG4gICAgICAgIExhbXBhLlBsYXllclZpZGVvLmxpc3RlbmVyLnJlbW92ZSgndHJhY2tzJyxsaXN0ZW5UcmFja3MpXG4gICAgICAgIExhbXBhLlBsYXllclZpZGVvLmxpc3RlbmVyLnJlbW92ZSgnc3VicycsbGlzdGVuU3VicylcbiAgICAgICAgTGFtcGEuUGxheWVyVmlkZW8ubGlzdGVuZXIucmVtb3ZlKCd3ZWJvc19zdWJzJyxsaXN0ZW5XZWJvc1N1YnMpXG4gICAgICAgIExhbXBhLlBsYXllclZpZGVvLmxpc3RlbmVyLnJlbW92ZSgnd2Vib3NfdHJhY2tzJyxsaXN0ZW5XZWJvc1RyYWNrcylcbiAgICAgICAgTGFtcGEuUGxheWVyVmlkZW8ubGlzdGVuZXIucmVtb3ZlKCdjYW5wbGF5JyxjYW5QbGF5KVxuICAgICAgICBcbiAgICAgICAgbG9nKCdUcmFja3MnLCAnZW5kJylcbiAgICB9XG5cbiAgICBMYW1wYS5QbGF5ZXIubGlzdGVuZXIuZm9sbG93KCdkZXN0cm95JyxsaXN0ZW5EZXN0cm95KVxuICAgIExhbXBhLlBsYXllclZpZGVvLmxpc3RlbmVyLmZvbGxvdygndHJhY2tzJyxsaXN0ZW5UcmFja3MpXG4gICAgTGFtcGEuUGxheWVyVmlkZW8ubGlzdGVuZXIuZm9sbG93KCdzdWJzJyxsaXN0ZW5TdWJzKVxuICAgIExhbXBhLlBsYXllclZpZGVvLmxpc3RlbmVyLmZvbGxvdygnd2Vib3Nfc3VicycsbGlzdGVuV2Vib3NTdWJzKVxuICAgIExhbXBhLlBsYXllclZpZGVvLmxpc3RlbmVyLmZvbGxvdygnd2Vib3NfdHJhY2tzJyxsaXN0ZW5XZWJvc1RyYWNrcylcbiAgICBMYW1wYS5QbGF5ZXJWaWRlby5saXN0ZW5lci5mb2xsb3coJ2NhbnBsYXknLGNhblBsYXkpXG5cbiAgICBsaXN0ZW5TdGFydCgpXG59XG5cbmZ1bmN0aW9uIHBhcnNlTWV0YWluZm8oZGF0YSl7XG4gICAgbGV0IGxvYWRpbmcgID0gTGFtcGEuVGVtcGxhdGUuZ2V0KCd0cmFja3NfbG9hZGluZycpXG5cbiAgICBkYXRhLml0ZW0uYWZ0ZXIobG9hZGluZylcblxuICAgIHJlZ3Vlc3QoZGF0YS5lbGVtZW50LChyZXN1bHQpPT57XG4gICAgICAgIGlmKGxpc3Rfb3BlbmVkKXtcbiAgICAgICAgICAgIGxldCB2aWRlbyA9IFtdXG4gICAgICAgICAgICBsZXQgYXVkaW8gPSBbXVxuICAgICAgICAgICAgbGV0IHN1YnMgID0gW11cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGNvZGVjX3ZpZGVvID0gcmVzdWx0LnN0cmVhbXMuZmlsdGVyKGE9PmEuY29kZWNfdHlwZSA9PSAndmlkZW8nKVxuICAgICAgICAgICAgbGV0IGNvZGVjX2F1ZGlvID0gcmVzdWx0LnN0cmVhbXMuZmlsdGVyKGE9PmEuY29kZWNfdHlwZSA9PSAnYXVkaW8nKVxuICAgICAgICAgICAgbGV0IGNvZGVjX3N1YnMgID0gcmVzdWx0LnN0cmVhbXMuZmlsdGVyKGE9PmEuY29kZWNfdHlwZSA9PSAnc3VidGl0bGUnKVxuXG4gICAgICAgICAgICBjb2RlY192aWRlby5zbGljZSgwLDEpLmZvckVhY2godj0+e1xuICAgICAgICAgICAgICAgIGxldCBsaW5lID0ge31cblxuICAgICAgICAgICAgICAgIGlmKHYud2lkdGggJiYgdi5oZWlnaHQpIGxpbmUudmlkZW8gPSB2LndpZHRoICsgJ9GFJyArIHYuaGVpZ2h0XG5cdFx0aWYodi5kdXJhdGlvbil7XG5cdFx0XHRsaW5lLmR1cmF0aW9uID0gbmV3IERhdGUodi5kdXJhdGlvbiAqIDEwMDApXG5cdFx0XHQudG9JU09TdHJpbmcoKVxuXHRcdFx0LnNsaWNlKDExLCAxOSk7XHRcdFx0XG5cdFx0XHR9IFxuXHRcdGVsc2UgaWYodi50YWdzKXtcblx0XHRcdFx0aWYodi50YWdzLkRVUkFUSU9OKXtcblx0XHRcdFx0XHRsaW5lLmR1cmF0aW9uID0gdi50YWdzLkRVUkFUSU9OID8gdi50YWdzLkRVUkFUSU9OLnNwbGl0KFwiLlwiKSA6ICcnXG5cdFx0XHRcdFx0bGluZS5kdXJhdGlvbi5wb3AoKVxuXHRcdFx0XHRcdH0gXG5cdFx0XHRcdGVsc2UgaWYodi50YWdzW1wiRFVSQVRJT04tZW5nXCJdKXtcblx0XHRcdFx0XHRsaW5lLmR1cmF0aW9uID0gdi50YWdzW1wiRFVSQVRJT04tZW5nXCJdID8gdi50YWdzW1wiRFVSQVRJT04tZW5nXCJdLnNwbGl0KFwiLlwiKSA6ICcnXG5cdFx0XHRcdFx0bGluZS5kdXJhdGlvbi5wb3AoKVxuXHRcdFx0XHRcdH1cblx0XHRcdH0gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKHYuY29kZWNfbmFtZSkgICAgICAgIGxpbmUuY29kZWMgPSB2LmNvZGVjX25hbWUudG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgICAgIGlmKEJvb2xlYW4odi5pc19hdmMpKSAgIGxpbmUuYXZjID0gJ0FWQydcbiAgICAgICAgICAgICAgICBsZXQgYml0ID0gdi5iaXRfcmF0ZSA/IHYuYml0X3JhdGUgOiB2LnRhZ3MgJiYgKHYudGFncy5CUFMgfHwgdi50YWdzW1wiQlBTLWVuZ1wiXSkgPyB2LnRhZ3MuQlBTIHx8IHYudGFnc1tcIkJQUy1lbmdcIl0gOiAnLS0nXG4gICAgICAgICAgICAgICAgbGluZS5yYXRlID0gYml0ID09ICctLScgPyBiaXQgOiBNYXRoLnJvdW5kKGJpdC8xMDAwMDAwKSArICcgJyArIExhbXBhLkxhbmcudHJhbnNsYXRlKCdzcGVlZF9tYicpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoTGFtcGEuQXJyYXlzLmdldEtleXMobGluZSkubGVuZ3RoKSB2aWRlby5wdXNoKGxpbmUpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBjb2RlY19hdWRpby5mb3JFYWNoKChhLGkpPT57XG4gICAgICAgICAgICAgICAgbGV0IGxpbmUgPSB7bnVtOiBpKzF9XG5cbiAgICAgICAgICAgICAgICBpZihhLnRhZ3Mpe1xuICAgICAgICAgICAgICAgICAgICBsaW5lLmxhbmcgPSAoYS50YWdzLmxhbmd1YWdlIHx8ICcnKS50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGluZS5uYW1lID0gYS50YWdzID8gKGEudGFncy50aXRsZSB8fCBhLnRhZ3MuaGFuZGxlcl9uYW1lKSA6ICcnXG5cbiAgICAgICAgICAgICAgICBpZihhLmNvZGVjX25hbWUpIGxpbmUuY29kZWMgPSBhLmNvZGVjX25hbWUudG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgICAgIGlmKGEuY2hhbm5lbF9sYXlvdXQpIGxpbmUuY2hhbm5lbHMgPSBhLmNoYW5uZWxfbGF5b3V0LnJlcGxhY2UoJyhzaWRlKScsJycpLnJlcGxhY2UoJ3N0ZXJlbycsJzIuMCcpLnJlcGxhY2UoJzggY2hhbm5lbHMgKEZMK0ZSK0ZDK0xGRStTTCtTUitURkwrVEZSKScsJzcuMScpXG5cbiAgICAgICAgICAgICAgICBsZXQgYml0ID0gYS5iaXRfcmF0ZSA/IGEuYml0X3JhdGUgOiBhLnRhZ3MgJiYgKGEudGFncy5CUFMgfHwgYS50YWdzW1wiQlBTLWVuZ1wiXSkgPyBhLnRhZ3MuQlBTIHx8IGEudGFnc1tcIkJQUy1lbmdcIl0gOiAnLS0nXG5cbiAgICAgICAgICAgICAgICBsaW5lLnJhdGUgPSBiaXQgPT0gJy0tJyA/IGJpdCA6IE1hdGgucm91bmQoYml0LzEwMDApICsgJyAnICsgTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3NwZWVkX2tiJylcblxuICAgICAgICAgICAgICAgIGlmKExhbXBhLkFycmF5cy5nZXRLZXlzKGxpbmUpLmxlbmd0aCkgYXVkaW8ucHVzaChsaW5lKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgY29kZWNfc3Vicy5mb3JFYWNoKChhLGkpPT57XG4gICAgICAgICAgICAgICAgbGV0IGxpbmUgPSB7bnVtOiBpKzF9XG5cbiAgICAgICAgICAgICAgICBpZihhLnRhZ3Mpe1xuICAgICAgICAgICAgICAgICAgICBsaW5lLmxhbmcgPSAoYS50YWdzLmxhbmd1YWdlIHx8ICcnKS50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGluZS5uYW1lID0gYS50YWdzID8gKGEudGFncy50aXRsZSB8fCBhLnRhZ3MuaGFuZGxlcl9uYW1lKSA6ICcnXG5cdFx0aWYoYS5jb2RlY19uYW1lKSBsaW5lLmNvZGVjID0gYS5jb2RlY19uYW1lLnRvVXBwZXJDYXNlKCkucmVwbGFjZSgnU1VCUklQJywgJ1NSVCcpLnJlcGxhY2UoJ0hETVZfUEdTX1NVQlRJVExFJywgJ0hETVYgUEdTJykucmVwbGFjZSgnTU9WX1RFWFQnLCAnTU9WIFRFWFQnKVxuXG4gICAgICAgICAgICAgICAgaWYoTGFtcGEuQXJyYXlzLmdldEtleXMobGluZSkubGVuZ3RoKSBzdWJzLnB1c2gobGluZSlcbiAgICAgICAgICAgIH0pXG5cblxuICAgICAgICAgICAgbGV0IGh0bWwgPSBMYW1wYS5UZW1wbGF0ZS5nZXQoJ3RyYWNrc19tZXRhaW5mbycse30pXG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGFwcGVuZChuYW1lLCBmaWVsZHMpe1xuICAgICAgICAgICAgICAgIGlmKGZpZWxkcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2sgPSBMYW1wYS5UZW1wbGF0ZS5nZXQoJ3RyYWNrc19tZXRhaW5mb19ibG9jaycse30pXG5cbiAgICAgICAgICAgICAgICAgICAgYmxvY2suZmluZCgnLnRyYWNrcy1tZXRhaW5mb19fbGFiZWwnKS50ZXh0KExhbXBhLkxhbmcudHJhbnNsYXRlKG5hbWUgPT0gJ3ZpZGVvJyA/ICdleHRlbnNpb25zX2hwdV92aWRlbycgOiBuYW1lID09ICdhdWRpbycgPyAncGxheWVyX3RyYWNrcycgOiAncGxheWVyXycgKyBuYW1lKSlcblxuICAgICAgICAgICAgICAgICAgICBmaWVsZHMuZm9yRWFjaChkYXRhPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9ICQoJzxkaXYgY2xhc3M9XCJ0cmFja3MtbWV0YWluZm9fX2l0ZW0gdHJhY2tzLW1ldGFpbmZvX19pdGVtLS0nK25hbWUrJyBzZWxlY3RvclwiPjwvZGl2PicpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ub24oJ2hvdmVyOmZvY3VzJywoZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Nb2RhbC5zY3JvbGwoKS51cGRhdGUoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSBpbiBkYXRhKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGl2ID0gJCgnPGRpdiBjbGFzcz1cInRyYWNrcy1tZXRhaW5mb19fY29sdW1uLS0nK2krJ1wiPjwvZGl2PicpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYudGV4dChkYXRhW2ldKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hcHBlbmQoZGl2KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrLmZpbmQoJy50cmFja3MtbWV0YWluZm9fX2luZm8nKS5hcHBlbmQoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICBodG1sLmFwcGVuZChibG9jaylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFwcGVuZCgndmlkZW8nLHZpZGVvKVxuICAgICAgICAgICAgYXBwZW5kKCdhdWRpbycsYXVkaW8pXG4gICAgICAgICAgICBhcHBlbmQoJ3N1YnMnLHN1YnMpXG5cbiAgICAgICAgICAgIGxvYWRpbmcucmVtb3ZlKClcblxuICAgICAgICAgICAgaWYodmlkZW8ubGVuZ3RoIHx8IGF1ZGlvLmxlbmd0aCB8fCBzdWJzLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgZGF0YS5pdGVtLmFmdGVyKGh0bWwpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKExhbXBhLkNvbnRyb2xsZXIuZW5hYmxlZCgpLm5hbWUgPT0gJ21vZGFsJykgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ21vZGFsJylcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbkxhbXBhLlBsYXllci5saXN0ZW5lci5mb2xsb3coJ3N0YXJ0JywgKGRhdGEpPT57XG4gICAgaWYoZGF0YS50b3JyZW50X2hhc2gpIHN1YnNjcmliZVRyYWNrcyhkYXRhKVxufSlcblxuTGFtcGEuTGlzdGVuZXIuZm9sbG93KCd0b3JyZW50X2ZpbGUnLCAoZGF0YSk9PntcbiAgICBpZihkYXRhLnR5cGUgPT0gJ2xpc3Rfb3BlbicpICBsaXN0X29wZW5lZCA9IHRydWVcbiAgICBpZihkYXRhLnR5cGUgPT0gJ2xpc3RfY2xvc2UnKSBsaXN0X29wZW5lZCA9IGZhbHNlXG5cbiAgICBpZihkYXRhLnR5cGUgPT0gJ3JlbmRlcicgJiYgZGF0YS5pdGVtcy5sZW5ndGggPT0gMSAmJiBsaXN0X29wZW5lZCl7XG4gICAgICAgIHBhcnNlTWV0YWluZm8oZGF0YSlcbiAgICB9XG59KVxuXG5MYW1wYS5UZW1wbGF0ZS5hZGQoJ3RyYWNrc19sb2FkaW5nJywgYFxuICAgIDxkaXYgY2xhc3M9XCJ0cmFja3MtbG9hZGluZ1wiPlxuICAgICAgICA8c3Bhbj4je2xvYWRpbmd9Li4uPC9zcGFuPlxuICAgIDwvZGl2PlxuYClcblxuTGFtcGEuVGVtcGxhdGUuYWRkKCd0cmFja3NfbWV0YWluZm8nLCBgXG4gICAgPGRpdiBjbGFzcz1cInRyYWNrcy1tZXRhaW5mb1wiPjwvZGl2PlxuYClcblxuTGFtcGEuVGVtcGxhdGUuYWRkKCd0cmFja3NfbWV0YWluZm9fYmxvY2snLCBgXG4gICAgPGRpdiBjbGFzcz1cInRyYWNrcy1tZXRhaW5mb19fbGluZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidHJhY2tzLW1ldGFpbmZvX19sYWJlbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidHJhY2tzLW1ldGFpbmZvX19pbmZvXCI+PC9kaXY+XG4gICAgPC9kaXY+XG5gKVxuXG5cblxuTGFtcGEuVGVtcGxhdGUuYWRkKCd0cmFja3NfY3NzJywgYFxuICAgIDxzdHlsZT5cbiAgICBAQGluY2x1ZGUoJy4uL3BsdWdpbnMvdHJhY2tzL2Nzcy9zdHlsZS5jc3MnKVxuICAgIDwvc3R5bGU+XG5gKVxuXG4kKCdib2R5JykuYXBwZW5kKExhbXBhLlRlbXBsYXRlLmdldCgndHJhY2tzX2Nzcycse30sdHJ1ZSkpXG4iXSwibmFtZXMiOlsiY29ubmVjdF9ob3N0IiwibGlzdF9vcGVuZWQiLCJyZWd1ZXN0IiwicGFyYW1zIiwiY2FsbGJhY2siLCJmZnByb2JlIiwicGF0aCIsInNwbGl0IiwicG9wIiwic2V0VGltZW91dCIsInN0cmVhbXMiLCJzb2NrZXQiLCJXZWJTb2NrZXQiLCJ0b3JyZW50X2hhc2giLCJpZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNsb3NlIiwianNvbiIsIkpTT04iLCJwYXJzZSIsImRhdGEiLCJlIiwic3Vic2NyaWJlVHJhY2tzIiwiaW5pdGVkIiwiaW5pdGVkX3BhcnNlIiwid2Vib3NfcmVwbGFjZSIsImxvZyIsImNvbnNvbGUiLCJhcHBseSIsImFyZ3VtZW50cyIsImdldFRyYWNrcyIsInZpZGVvIiwiTGFtcGEiLCJQbGF5ZXJWaWRlbyIsImF1ZGlvVHJhY2tzIiwiZ2V0U3VicyIsInRleHRUcmFja3MiLCJzZXRUcmFja3MiLCJuZXdfdHJhY2tzIiwidmlkZW9fdHJhY2tzIiwicGFyc2VfdHJhY2tzIiwiZmlsdGVyIiwiYSIsImNvZGVjX3R5cGUiLCJtaW51cyIsImxlbmd0aCIsImNvZGVjX25hbWUiLCJ0YWdzIiwiZm9yRWFjaCIsInRyYWNrIiwib3JpZyIsImluZGV4IiwiZWxlbSIsImxhbmd1YWdlIiwibGFiZWwiLCJ0aXRsZSIsImhhbmRsZXJfbmFtZSIsImdob3N0Iiwic2VsZWN0ZWQiLCJlbmFibGVkIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJzZXQiLCJ2IiwiYXVkIiwidHJrIiwiaSIsImdldCIsInB1c2giLCJQbGF5ZXJQYW5lbCIsInNldFN1YnMiLCJuZXdfc3VicyIsInZpZGVvX3N1YnMiLCJwYXJzZV9zdWJzIiwibW9kZSIsInR4dCIsInN1YiIsImxpc3RlblRyYWNrcyIsImxpc3RlbmVyIiwicmVtb3ZlIiwibGlzdGVuU3VicyIsImNhblBsYXkiLCJ0cmFja3MiLCJzZXRXZWJvc1RyYWNrcyIsInN1YnMiLCJzZXRXZWJvc1N1YnMiLCJsaXN0ZW5XZWJvc1N1YnMiLCJfZGF0YSIsImxpc3RlbldlYm9zVHJhY2tzIiwibGlzdGVuU3RhcnQiLCJyZXN1bHQiLCJsaXN0ZW5EZXN0cm95IiwiUGxheWVyIiwiZm9sbG93IiwicGFyc2VNZXRhaW5mbyIsImxvYWRpbmciLCJUZW1wbGF0ZSIsIml0ZW0iLCJhZnRlciIsImVsZW1lbnQiLCJhcHBlbmQiLCJuYW1lIiwiZmllbGRzIiwiYmxvY2siLCJmaW5kIiwidGV4dCIsIkxhbmciLCJ0cmFuc2xhdGUiLCIkIiwib24iLCJNb2RhbCIsInNjcm9sbCIsInVwZGF0ZSIsImRpdiIsImh0bWwiLCJhdWRpbyIsImNvZGVjX3ZpZGVvIiwiY29kZWNfYXVkaW8iLCJjb2RlY19zdWJzIiwic2xpY2UiLCJsaW5lIiwid2lkdGgiLCJoZWlnaHQiLCJkdXJhdGlvbiIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsIkRVUkFUSU9OIiwiY29kZWMiLCJ0b1VwcGVyQ2FzZSIsIkJvb2xlYW4iLCJpc19hdmMiLCJhdmMiLCJiaXQiLCJiaXRfcmF0ZSIsIkJQUyIsInJhdGUiLCJNYXRoIiwicm91bmQiLCJBcnJheXMiLCJnZXRLZXlzIiwibnVtIiwibGFuZyIsImNoYW5uZWxfbGF5b3V0IiwiY2hhbm5lbHMiLCJyZXBsYWNlIiwiQ29udHJvbGxlciIsInRvZ2dsZSIsIkxpc3RlbmVyIiwidHlwZSIsIml0ZW1zIiwiYWRkIl0sIm1hcHBpbmdzIjoiOzs7SUFDQSxJQUFJQSxZQUFZLEdBQUksYUFBYTtJQUNqQyxJQUFJQyxXQUFXLEdBQUssS0FBSztJQUd6QixTQUFTQyxPQUFPQSxDQUFDQyxNQUFNLEVBQUVDLFFBQVEsRUFBQztNQUM5QixJQUFHRCxNQUFNLENBQUNFLE9BQU8sSUFBSUYsTUFBTSxDQUFDRyxJQUFJLENBQUNDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsR0FBRyxFQUFFLEtBQUssS0FBSyxFQUFDO1FBQ3hEQyxVQUFVLENBQUMsWUFBSTtVQUNYTCxRQUFRLENBQUM7WUFBQ00sT0FBTyxFQUFFUCxNQUFNLENBQUNFO1dBQVEsQ0FBQztTQUN0QyxFQUFDLEdBQUcsQ0FBQztPQUNULE1BcUJnQztRQUM3QixJQUFHTCxZQUFZLElBQUksYUFBYSxFQUFFQSxZQUFZLEdBQUcsY0FBYztRQUUvRCxJQUFJVyxNQUFNLEdBQUcsSUFBSUMsU0FBUyxDQUFDLE9BQU8sR0FBQ1osWUFBWSxHQUFDLFNBQVMsR0FBQ0csTUFBTSxDQUFDVSxZQUFZLEdBQUMsU0FBUyxHQUFDVixNQUFNLENBQUNXLEVBQUUsQ0FBQztRQUVsR0gsTUFBTSxDQUFDSSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBQ0MsS0FBSyxFQUFJO1VBQ3pDTCxNQUFNLENBQUNNLEtBQUssRUFBRTtVQUVkLElBQUlDLElBQUksR0FBRyxFQUFFO1VBRWIsSUFBRztZQUNDQSxJQUFJLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDSixLQUFLLENBQUNLLElBQUksQ0FBQztXQUNoQyxDQUNELE9BQU1DLENBQUMsRUFBQztVQUVSLElBQUdKLElBQUksQ0FBQ1IsT0FBTyxF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