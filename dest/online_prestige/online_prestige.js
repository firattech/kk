(function () {
    'use strict';

    function videocdn(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var results = [];
      var object = _object;
      var get_links_wait = false;
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        voice_name: ''
      };
      this.search = function (_object, data) {
        object = _object;
        get_links_wait = true;
        var url = component.proxy('videocdn') + 'https://videocdn.tv/api/';
        var itm = data[0];
        if (!itm.iframe_src) return component.doesNotAnswer();
        var type = itm.iframe_src.split('/').slice(-2)[0];
        if (type == 'movie') type = 'movies';
        url += type;
        url = Lampa.Utils.addUrlComponent(url, 'api_token=3i40G5TSECmLF77oAqnEgbx61ZWaOYaE');
        url = Lampa.Utils.addUrlComponent(url, 'query=' + encodeURIComponent(itm.imdb_id ? itm.imdb_id : itm.title));
        url = Lampa.Utils.addUrlComponent(url, 'field=' + encodeURIComponent(itm.imdb_id ? 'imdb_id' : 'title'));
        network.silent(url, function (found) {
          results = found.data.filter(function (elem) {
            return elem.id == itm.id;
          });
          if (!results.length) component.doesNotAnswer();else {
            try {
              success(results);
            } catch (e) {
              component.doesNotAnswer();
            }
          }
          component.loading(false);
        }, function (a, c) {
          component.doesNotAnswer();
        });
      };
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0,
          voice_name: ''
        };
        filter();
        append(filtred());
      };
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        if (a.stype == 'voice') {
          choice.voice_name = filter_items.voice[b.index];
        }
        component.reset();
        filter();
        append(filtred());
      };
      this.destroy = function () {
        network.clear();
        results = null;
      };
      function success(json) {
        results = json;
        extractData(json);
        filter();
        append(filtred());
      }
      function extractItems(str, max_quality) {
        try {
          var items = str.split(',').map(function (item) {
            return {
              quality: parseInt(item.match(/\[(\d+)p\]/)[1]),
              file: 'http:' + item.replace(/\[\d+p\]/, '').split(' or ')[0]
            };
          }).filter(function (item) {
            return item.quality <= max_quality;
          });
          items.sort(function (a, b) {
            return b.quality - a.quality;
          });
          return items;
        } catch (e) {}
        return [];
      }
      function extractData(results) {
        network.timeout(20000);
        var movie = results.slice(0, 1)[0];
        extract = {};
        if (movie) {
          var src = movie.iframe_src;
          var meta = $('head meta[name="referrer"]');
          var referrer = meta.attr('content') || 'never';
          meta.attr('content', 'unsafe-url');
          network.silent('https:' + src, function (raw) {
            meta.attr('content', referrer);
            get_links_wait = false;
            component.render().find('.online-prestige__scan-file').remove();
            var math = raw.replace(/\n/g, '').match(/id="files" value="(.*?)"/);
            if (!math) math = raw.replace(/\n/g, '').match(/id="files" value='(.*?)'/);
            if (math) {
              var json = Lampa.Arrays.decodeJson(math[1].replace(/&quot;/g, '"'), {});
              var text = document.createElement("textarea");
              var _loop = function _loop(i) {
                var _movie$media;
                if (0 === i - 0) {
                  return 1; // continue
                }
                text.innerHTML = json[i];
                var max_quality = (_movie$media = movie.media) === null || _movie$media === void 0 || (_movie$media = _movie$media.filter(function (obj) {
                  return obj.translation_id === i - 0;
                })[0]) === null || _movie$media === void 0 ? void 0 : _movie$media.max_quality;
                if (!max_quality) {
                  var _movie$translations;
                  max_quality = (_movie$translations = movie.translations) === null || _movie$translations === void 0 || (_movie$translations = _movie$translations.filter(function (obj) {
                    return obj.id === i - 0;
                  })[0]) === null || _movie$translations === void 0 ? void 0 : _movie$translations.max_quality;
                }
                extract[i] = {
                  json: Lampa.Arrays.decodeJson(text.value, {}),
                  items: extractItems(json[i], max_quality)
                };
                for (var a in extract[i].json) {
                  var elem = extract[i].json[a];
                  if (elem.folder) {
                    for (var f in elem.folder) {
                      var folder = elem.folder[f];
                      folder.items = extractItems(folder.file, max_quality);
                    }
                  } else elem.items = extractItems(elem.file, max_quality);
                }
              };
              for (var i in json) {
                if (_loop(i)) continue;
              }
            }
          }, function () {
            meta.attr('content', referrer);
            get_links_wait = false;
            component.render().find('.online-prestige__scan-file').remove();
          }, false, {
            dataType: 'text'
          });
        }
      }
      function getFile(element) {
        var translat = extract[element.translation];
        var id = element.season + '_' + element.episode;
        var file = '';
        var items = [];
        var quality = false;
        if (translat) {
          if (element.season) {
            for (var i in translat.json) {
              var elem = translat.json[i];
              if (elem.folder) {
                for (var f in elem.folder) {
                  var folder = elem.folder[f];
                  if (folder.id == id) {
                    items = folder.items;
                    break;
                  }
                }
              } else if (elem.id == id) {
                items = elem.items;
                break;
              }
            }
          } else {
            items = translat.items;
          }
        }
        if (items && items.length) {
          quality = {};
          var mass = [720, 480, 360];
          if (Lampa.Account.hasPremium()) Lampa.Arrays.insert(mass, 0, 1080);
          mass.forEach(function (n) {
            var exes = items.find(function (a) {
              return a.quality == n;
            });
            if (exes) {
              if (!file) file = exes.file;
              quality[n + 'p'] = exes.file;
            }
          });
          var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
          if (quality[preferably]) file = quality[preferably];
        }
        return {
          file: file,
          quality: quality
        };
      }
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          voice_info: []
        };
        results.slice(0, 1).forEach(function (movie) {
          var seasons = movie.season_count || object.movie.number_of_seasons;
          if (seasons) {
            var s = seasons;
            while (s--) {
              filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + (seasons - s));
            }
          }
          if (filter_items.season.length) {
            movie.episodes.forEach(function (episode) {
              if (episode.season_num == choice.season + 1) {
                episode.media.forEach(function (media) {
                  if (!filter_items.voice_info.find(function (v) {
                    return v.id == media.translation.id;
                  })) {
                    filter_items.voice.push(media.translation.shorter_title || media.translation.short_title);
                    filter_items.voice_info.push({
                      id: media.translation.id
                    });
                  }
                });
              }
            });
          }
        });
        if (choice.voice_name) {
          var inx = filter_items.voice.map(function (v) {
            return v.toLowerCase();
          }).indexOf(choice.voice_name.toLowerCase());
          if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
            choice.voice = inx;
          }
        }
        component.filter(filter_items, choice);
      }
      function filtred() {
        var filtred = [];
        if (object.movie.name) {
          results.slice(0, 1).forEach(function (movie) {
            movie.episodes.forEach(function (episode) {
              if (episode.season_num == choice.season + 1) {
                var temp = episode.media.map(function (m) {
                  return m;
                });
                var unique = [];
                temp.sort(function (a, b) {
                  return b.max_quality - a.max_quality;
                });
                temp.forEach(function (m) {
                  if (!unique.find(function (a) {
                    return a.translation.id == m.translation.id;
                  })) {
                    unique.push(m);
                  }
                });
                episode.media.forEach(function (media) {
                  if (media.translation.id == filter_items.voice_info[choice.voice].id && unique.indexOf(media) !== -1) {
                    filtred.push({
                      episode: parseInt(episode.num),
                      season: episode.season_num,
                      title: episode.ru_title,
                      quality: (media.source_quality && window.innerWidth > 480 ? media.source_quality.toUpperCase() + ' - ' : '') + media.max_quality + 'p',
                      translation: media.translation_id,
                      info: filter_items.voice[choice.voice],
                      voice_name: filter_items.voice[choice.voice]
                    });
                  }
                });
              }
            });
          });
        } else {
          results.slice(0, 1).forEach(function (movie) {
            movie.media.forEach(function (element) {
              filtred.push({
                title: element.translation.shorter_title || element.translation.short_title,
                quality: (element.source_quality && window.innerWidth > 480 ? element.source_quality.toUpperCase() + ' - ' : '') + element.max_quality + 'p',
                translation: element.translation_id,
                voice_name: element.translation.shorter_title || element.translation.short_title
              });
            });
          });
        }
        return filtred;
      }
      function toPlayElement(element) {
        var extra = getFile(element, element.quality);
        var play = {
          title: element.title,
          url: extra.file,
          quality: extra.quality,
          timeline: element.timeline,
          callback: element.mark
        };
        return play;
      }
      function append(items) {
        component.reset();
        component.draw(items, {
          onRender: function onRender(item, html) {
            if (get_links_wait) html.find('.online-prestige__body').append($('<div class="online-prestige__scan-file"><div class="broadcast__scan"><div></div></div></div>'));
          },
          onEnter: function onEnter(item, html) {
            var extra = getFile(item, item.quality);
            if (extra.file) {
              var playlist = [];
              var first = toPlayElement(item);
              if (item.season) {
                items.forEach(function (elem) {
                  playlist.push(toPlayElement(elem));
                });
              } else {
                playlist.push(first);
              }
              if (playlist.length > 1) first.playlist = playlist;
              Lampa.Player.play(first);
              Lampa.Player.playlist(playlist);
              item.mark();
            } else Lampa.Noty.show(Lampa.Lang.translate(get_links_wait ? 'online_waitlink' : 'online_nolink'));
          },
          onContextMenu: function onContextMenu(item, html, data, call) {
            call(getFile(item, item.quality));
          }
        });
      }
    }

    function rezka(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var embed = component.proxy('rezka') + 'https://voidboost.net/';
      var object = _object;
      var select_id = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        voice_name: ''
      };
      this.searchByKinopoisk = function (_object, id) {
        object = _object;
        select_id = id;
        getFirstTranlate(id, function (voice) {
          getFilm(id, voice);
        });
      };
      this.searchByImdbID = function (_object, id) {
        object = _object;
        select_id = id;
        getFirstTranlate(id, function (voice) {
          getFilm(id, voice);
        });
      };
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0,
          voice_name: ''
        };
        component.loading(true);
        getFilm(select_id);
        component.saveChoice(choice);
      };
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
        component.reset();
        filter();
        component.loading(true);
        getFilm(select_id, extract.voice[choice.voice].token);
        component.saveChoice(choice);
        setTimeout(component.closeFilter, 10);
      };
      this.destroy = function () {
        network.clear();
        extract = null;
      };
      function getSeasons(voice, call) {
        var url = embed + 'serial/' + voice + '/iframe?h=gidonline.io';
        network.clear();
        network.timeout(10000);
        network["native"](url, function (str) {
          extractData(str);
          call();
        }, function (a, c) {
          component.doesNotAnswer();
        }, false, {
          dataType: 'text'
        });
      }
      function getFirstTranlate(id, call) {
        network.clear();
        network.timeout(10000);
        network["native"](embed + 'embed/' + id + '?s=1', function (str) {
          extractData(str);
          if (extract.voice.length) call(extract.voice[0].token);else component.doesNotAnswer();
        }, function (a, c) {
          component.doesNotAnswer();
        }, false, {
          dataType: 'text'
        });
      }
      function getEmbed(url) {
        network.clear();
        network.timeout(10000);
        network["native"](url, function (str) {
          component.loading(false);
          extractData(str);
          filter();
          append();
        }, function (a, c) {
          component.doesNotAnswer();
        }, false, {
          dataType: 'text'
        });
      }
      function getFilm(id, voice) {
        network.clear();
        network.timeout(10000);
        var url = embed;
        if (voice) {
          if (extract.season.length) {
            var ses = extract.season[Math.min(extract.season.length - 1, choice.season)].id;
            url += 'serial/' + voice + '/iframe?s=' + ses + '&h=gidonline.io';
            return getSeasons(voice, function () {
              var check = extract.season.filter(function (s) {
                return s.id == ses;
              });
              if (!check.length) {
                choice.season = extract.season.length - 1;
                url = embed + 'serial/' + voice + '/iframe?s=' + extract.season[Math.min(extract.season.length - 1, choice.season)].id + '&h=gidonline.io';
              }
              getEmbed(url);
            });
          } else {
            url += 'movie/' + voice + '/iframe?h=gidonline.io';
            getEmbed(url);
          }
        } else {
          url += 'embed/' + id;
          url += '?s=1';
          getEmbed(url);
        }
      }
      function filter() {
        filter_items = {
          season: extract.season.map(function (v) {
            return v.name;
          }),
          voice: extract.season.length ? extract.voice.map(function (v) {
            return v.name;
          }) : []
        };
        if (choice.voice_name) {
          var inx = filter_items.voice.map(function (v) {
            return v.toLowerCase();
          }).indexOf(choice.voice_name.toLowerCase());
          if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
            choice.voice = inx;
          }
        }
        if (!extract.season[choice.season]) choice.season = 0;
        component.filter(filter_items, choice);
      }
      function parseSubtitles(str) {
        var subtitle = str.match("subtitle': '(.*?)'");
        if (subtitle) {
          var index = -1;
          return subtitle[1].split(',').map(function (sb) {
            var sp = sb.split(']');
            index++;
            return {
              label: sp[0].slice(1),
              url: sp.pop(),
              index: index
            };
          });
        }
      }
      function getStream(element, call, error) {
        if (element.stream) return call(element.stream);
        var url = embed;
        if (element.season) {
          url += 'serial/' + extract.voice[choice.voice].token + '/iframe?s=' + element.season + '&e=' + element.episode + '&h=gidonline.io';
        } else {
          url += 'movie/' + element.voice.token + '/iframe?h=gidonline.io';
        }
        network.clear();
        network.timeout(3000);
        network["native"](url, function (str) {
          var videos = str.match("file': '(.*?)'");
          if (videos) {
            var video = decode(videos[1]),
              qused = '',
              first = '',
              mass = ['2160p', '1440p', '1080p Ultra', '1080p', '720p', '480p', '360p'];
            video = video.slice(1).split(/,\[/).map(function (s) {
              return s.split(']')[0] + ']' + (s.indexOf(' or ') > -1 ? s.split(' or').pop().trim() : s.split(']').pop());
            }).join('[');
            element.qualitys = {};
            var preferably = Lampa.Storage.get('video_quality_default', '1080');
            mass.forEach(function (n) {
              var link = video.match(new RegExp(n + "](.*?)mp4"));
              if (link) {
                if (!first) first = link[1] + 'mp4';
                element.qualitys[n] = link[1] + 'mp4';
                if (n.indexOf(preferably) >= 0) {
                  qused = link[1] + 'mp4';
                  first = qused;
                }
              }
            });
            if (!first) element.qualitys = false;
            if (first) {
              element.stream = qused || first;
              element.subtitles = parseSubtitles(str);
              call(element.stream);
            } else error();
          } else error();
        }, error, false, {
          dataType: 'text'
        });
      }
      function decode(data) {
        function product(iterables, repeat) {
          var argv = Array.prototype.slice.call(arguments),
            argc = argv.length;
          if (argc === 2 && !isNaN(argv[argc - 1])) {
            var copies = [];
            for (var i = 0; i < argv[argc - 1]; i++) {
              copies.push(argv[0].slice()); // Clone
            }
            argv = copies;
          }
          return argv.reduce(function tl(accumulator, value) {
            var tmp = [];
            accumulator.forEach(function (a0) {
              value.forEach(function (a1) {
                tmp.push(a0.concat(a1));
              });
            });
            return tmp;
          }, [[]]);
        }
        function unite(arr) {
          var _final = [];
          arr.forEach(function (e) {
            _final.push(e.join(""));
          });
          return _final;
        }
        var trashList = ["@", "#", "!", "^", "$"];
        var two = unite(product(trashList, 2));
        var tree = unite(product(trashList, 3));
        var trashCodesSet = two.concat(tree);
        var arr = data.replace("#h", "").split("//_//");
        var trashString = arr.join('');
        trashCodesSet.forEach(function (i) {
          trashString = trashString.replace(new RegExp(btoa(i), 'g'), '');
        });
        var result = '';
        try {
          result = atob(trashString.substr(2));
        } catch (e) {}
        return result;
      }
      function extractData(str) {
        extract.voice = [];
        extract.season = [];
        extract.episode = [];
        str = str.replace(/\n/g, '');
        var voices = str.match('<select name="translator"[^>]+>(.*?)</select>');
        var sesons = str.match('<select name="season"[^>]+>(.*?)</select>');
        var episod = str.match('<select name="episode"[^>]+>(.*?)</select>');
        if (sesons) {
          var select = $('<select>' + sesons[1] + '</select>');
          $('option', select).each(function () {
            extract.season.push({
              id: $(this).attr('value'),
              name: $(this).text()
            });
          });
        }
        if (voices) {
          var _select = $('<select>' + voices[1] + '</select>');
          $('option', _select).each(function () {
            var token = $(this).attr('data-token');
            if (token) {
              extract.voice.push({
                token: token,
                name: $(this).text(),
                id: $(this).val()
              });
            }
          });
        }
        if (episod) {
          var _select2 = $('<select>' + episod[1] + '</select>');
          $('option', _select2).each(function () {
            extract.episode.push({
              id: $(this).attr('value'),
              name: $(this).text()
            });
          });
        }
      }
      function append() {
        component.reset();
        var items = [];
        if (extract.season.length) {
          extract.episode.forEach(function (episode) {
            items.push({
              title: episode.name,
              quality: '720p ~ 1080p',
              season: extract.season[Math.min(extract.season.length - 1, choice.season)].id,
              episode: parseInt(episode.id),
              info: extract.voice[choice.voice].name,
              voice: extract.voice[choice.voice],
              voice_name: extract.voice[choice.voice].name
            });
          });
        } else {
          extract.voice.forEach(function (voice) {
            items.push({
              title: voice.name.length > 3 ? voice.name : object.movie.title,
              quality: '720p ~ 1080p',
              voice: voice,
              info: '',
              voice_name: voice.name
            });
          });
        }
        component.draw(items, {
          onEnter: function onEnter(item, html) {
            getStream(item, function (stream) {
              var first = {
                url: stream,
                timeline: item.timeline,
                quality: item.qualitys,
                title: item.title,
                subtitles: item.subtitles
              };
              Lampa.Player.play(first);
              if (item.season) {
                var playlist = [];
                items.forEach(function (elem) {
                  var cell = {
                    url: function url(call) {
                      getStream(elem, function (stream) {
                        cell.url = stream;
                        cell.quality = elem.qualitys;
                        elem.mark();
                        call();
                      }, function () {
                        cell.url = '';
                        call();
                      });
                    },
                    timeline: elem.timeline,
                    title: elem.title,
                    subtitles: elem.subtitles
                  };
                  if (elem == item) cell.url = stream;
                  playlist.push(cell);
                });
                Lampa.Player.playlist(playlist);
              } else {
                Lampa.Player.playlist([first]);
              }
              item.mark();
            }, function () {
              Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
            });
          },
          onContextMenu: function onContextMenu(item, html, data, call) {
            getStream(item, function (stream) {
              call({
                file: stream,
                quality: item.qualitys
              });
            });
          }
        });
      }
    }

    function kinobase(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var embed = component.proxy('kinobase') + 'https://kinobase.org/';
      var object = _object;
      var select_title = '';
      var select_id = '';
      var is_playlist = false;
      var translation = '';
      var quality_type = '';
      var filter_items = {};
      var wait_similars;
      var choice = {
        season: 0,
        voice: -1
      };
      this.search = function (_object, sim) {
        if (wait_similars && sim) return getPage(sim[0].link);
      };
      this.searchByTitle = function (_object, query) {
        object = _object;
        select_title = query;
        var url = embed + "search?query=" + encodeURIComponent(cleanTitle(select_title));
        network["native"](url, function (str) {
          str = str.replace(/\n/, '');
          var links = object.movie.number_of_seasons ? str.match(/<a href="\/serial\/(.*?)">(.*?)<\/a>/g) : str.match(/<a href="\/film\/(.*?)" class="link"[^>]+>(.*?)<\/a>/g);
          var relise = object.search_date || (object.movie.number_of_seasons ? object.movie.first_air_date : object.movie.release_date) || '0000';
          var need_year = parseInt((relise + '').slice(0, 4));
          var found_url = '';
          if (links) {
            var cards = [];
            links.filter(function (l) {
              var link = $(l),
                titl = link.attr('title') || link.text() || '';
              var year = parseInt(titl.split('(').pop().slice(0, -1));
              if (year > need_year - 2 && year < need_year + 2) cards.push({
                year: year,
                title: titl.split(/\(\d{4}\)/)[0].trim(),
                link: link.attr('href')
              });
            });
            var card = cards.find(function (c) {
              return c.year == need_year;
            });
            if (!card) card = cards.find(function (c) {
              return c.title == select_title;
            });
            if (!card && cards.length == 1) card = cards[0];
            if (card) found_url = cards[0].link;
            if (found_url) getPage(found_url);else if (links.length) {
              wait_similars = true;
              var similars = [];
              links.forEach(function (l) {
                var link = $(l),
                  titl = link.attr('title') || link.text();
                similars.push({
                  title: titl,
                  link: link.attr('href'),
                  filmId: 'similars'
                });
              });
              component.similars(similars);
              component.loading(false);
            } else component.doesNotAnswer();
          } else component.doesNotAnswer();
        }, function (a, c) {
          component.doesNotAnswer();
        }, false, {
          dataType: 'text'
        });
      };
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: -1
        };
        filter();
        append(filtred());
      };
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        component.reset();
        filter();
        append(filtred());
      };
      this.destroy = function () {
        network.clear();
        extract = null;
      };
      function cleanTitle(str) {
        return str.replace('.', '').replace(':', '');
      }
      function parsePlaylist(str) {
        var pl = [];
        try {
          if (str.charAt(0) === '[') {
            str.substring(1).split(',[').forEach(function (item) {
              var label_end = item.indexOf(']');
              if (label_end >= 0) {
                var label = item.substring(0, label_end);
                if (item.charAt(label_end + 1) === '{') {
                  item.substring(label_end + 2).split(';{').forEach(function (voice_item) {
                    var voice_end = voice_item.indexOf('}');
                    if (voice_end >= 0) {
                      var voice = voice_item.substring(0, voice_end);
                      pl.push({
                        label: label,
                        voice: voice,
                        links: voice_item.substring(voice_end + 1).split(' or ')
                      });
                    }
                  });
                } else {
                  pl.push({
                    label: label,
                    links: item.substring(label_end + 1).split(' or ')
                  });
                }
              }
              return null;
            });
          }
        } catch (e) {}
        return pl;
      }
      function filter() {
        filter_items = {
          season: [],
          voice: []
        };
        if (is_playlist) {
          extract.forEach(function (item, i) {
            if (item.playlist) {
              filter_items.season.push(item.comment);
              if (i == choice.season) {
                item.playlist.forEach(function (eps) {
                  if (eps.file) {
                    parsePlaylist(eps.file).forEach(function (el) {
                      if (el.voice && filter_items.voice.indexOf(el.voice) == -1) {
                        filter_items.voice.push(el.voice);
                      }
                    });
                  }
                });
              }
            } else if (item.file) {
              parsePlaylist(item.file).forEach(function (el) {
                if (el.voice && filter_items.voice.indexOf(el.voice) == -1) {
                  filter_items.voice.push(el.voice);
                }
              });
            }
          });
        }
        if (!filter_items.season[choice.season]) choice.season = 0;
        if (!filter_items.voice[choice.voice]) choice.voice = 0;
        component.filter(filter_items, choice);
      }
      function filtred() {
        var filtred = [];
        if (is_playlist) {
          var playlist = extract;
          var season = object.movie.number_of_seasons && 1;
          if (extract[choice.season] && extract[choice.season].playlist) {
            playlist = extract[choice.season].playlist;
            season = parseInt(extract[choice.season].comment);
            if (isNaN(season)) season = 1;
          }
          playlist.forEach(function (eps, episode) {
            var items = extractItems(eps.file, filter_items.voice[choice.voice]);
            if (items.length) {
              var alt_voice = eps.comment.match(/\d+ серия (.*)$/i);
              var info = items[0].voice || alt_voice && alt_voice[1].trim() || translation;
              if (info == eps.comment) info = '';
              filtred.push({
                file: eps.file,
                title: eps.comment,
                quality: (quality_type && window.innerWidth > 480 ? quality_type + ' - ' : '') + items[0].quality + 'p',
                season: season,
                episode: episode + 1,
                info: info,
                voice: items[0].voice,
                voice_name: info,
                subtitles: parseSubs(eps.subtitle || '')
              });
            }
          });
        } else {
          filtred = extract;
        }
        return filtred;
      }
      function extractItems(str, voice) {
        try {
          var list = parsePlaylist(str);
          if (voice) {
            var tmp = list.filter(function (el) {
              return el.voice == voice;
            });
            if (tmp.length) {
              list = tmp;
            } else {
              list = list.filter(function (el) {
                return typeof el.voice == 'undefined';
              });
            }
          }
          var items = list.map(function (item) {
            var quality = item.label.match(/(\d\d\d+)p/);
            return {
              label: item.label,
              voice: item.voice,
              quality: quality ? parseInt(quality[1]) : NaN,
              file: item.links[0]
            };
          });
          items.sort(function (a, b) {
            if (b.quality > a.quality) return 1;
            if (b.quality < a.quality) return -1;
            if (b.label > a.label) return 1;
            if (b.label < a.label) return -1;
            return 0;
          });
          return items;
        } catch (e) {}
        return [];
      }
      function parseSubs(vod) {
        var subtitles = [];
        vod.split(',').forEach(function (s) {
          var nam = s.match("\\[(.*?)]");
          if (nam) {
            var url = s.replace(/\[.*?\]/, '').split(' or ')[0];
            if (url) {
              subtitles.push({
                label: nam[1],
                url: url
              });
            }
          }
        });
        return subtitles.length ? subtitles : false;
      }
      function extractData(str, page) {
        var quality_match = page.match(/<li><b>Качество:<\/b>([^<,]+)<\/li>/i);
        var translation_match = page.match(/<li><b>Перевод:<\/b>([^<,]+)<\/li>/i);
        quality_type = quality_match ? quality_match[1].trim() : '';
        translation = translation_match ? translation_match[1].trim() : '';
        var vod = str.split('|');
        if (vod[0] == 'file') {
          var file = vod[1];
          var found = [];
          var subtiles = parseSubs(vod[2]);
          if (file) {
            var voices = {};
            parsePlaylist(file).forEach(function (item) {
              var prev = voices[item.voice || ''];
              var quality_str = item.label.match(/(\d\d\d+)p/);
              var quality = quality_str ? parseInt(quality_str[1]) : NaN;
              if (!prev || quality > prev.quality) {
                voices[item.voice || ''] = {
                  quality: quality
                };
              }
            });
            for (var voice in voices) {
              var el = voices[voice];
              found.push({
                file: file,
                title: voice || translation || object.movie.title,
                quality: (quality_type && window.innerWidth > 480 ? quality_type + ' - ' : '') + el.quality + 'p',
                info: '',
                voice: voice,
                subtitles: subtiles,
                voice_name: voice || translation || ''
              });
            }
          }
          extract = found;
          is_playlist = false;
        } else if (vod[0] == 'pl') {
          extract = Lampa.Arrays.decodeJson(vod[1], []);
          is_playlist = true;
        } else component.emptyForQuery(select_title);
      }
      function getPage(url) {
        network.clear();
        network.timeout(1000 * 10);
        network["native"](embed + url, function (str) {
          str = str.replace(/\n/g, '');
          var MOVIE_ID = str.match('var MOVIE_ID = ([^;]+);');
          var IDENTIFIER = str.match('var IDENTIFIER = "([^"]+)"');
          var PLAYER_CUID = str.match('var PLAYER_CUID = "([^"]+)"');
          if (MOVIE_ID && IDENTIFIER && PLAYER_CUID) {
            select_id = MOVIE_ID[1];
            var identifier = IDENTIFIER[1];
            var player_cuid = PLAYER_CUID[1];
            var data_url = "user_data";
            data_url = Lampa.Utils.addUrlComponent(data_url, "page=movie");
            data_url = Lampa.Utils.addUrlComponent(data_url, "movie_id=" + select_id);
            data_url = Lampa.Utils.addUrlComponent(data_url, "cuid=" + player_cuid);
            data_url = Lampa.Utils.addUrlComponent(data_url, "device=DESKTOP");
            data_url = Lampa.Utils.addUrlComponent(data_url, "_=" + Date.now());
            network.clear();
            network.timeout(1000 * 10);
            network["native"](embed + data_url, function (user_data) {
              if (typeof user_data.vod_hash == "string") {
                var file_url = "vod/" + select_id;
                file_url = Lampa.Utils.addUrlComponent(file_url, "identifier=" + identifier);
                file_url = Lampa.Utils.addUrlComponent(file_url, "player_type=new");
                file_url = Lampa.Utils.addUrlComponent(file_url, "file_type=mp4");
                file_url = Lampa.Utils.addUrlComponent(file_url, "st=" + user_data.vod_hash);
                file_url = Lampa.Utils.addUrlComponent(file_url, "e=" + user_data.vod_time);
                file_url = Lampa.Utils.addUrlComponent(file_url, "_=" + Date.now());
                network.clear();
                network.timeout(1000 * 10);
                network["native"](embed + file_url, function (files) {
                  component.loading(false);
                  extractData(files, str);
                  filter();
                  append(filtred());
                }, function (a, c) {
                  component.doesNotAnswer();
                }, false, {
                  dataType: 'text'
                });
              } else component.doesNotAnswer(L);
            }, function (a, c) {
              component.doesNotAnswer();
            });
          } else component.doesNotAnswer();
        }, function (a, c) {
          component.doesNotAnswer();
        }, false, {
          dataType: 'text'
        });
      }
      function getFile(element) {
        var quality = {},
          first = '';
        var preferably = Lampa.Storage.get('video_quality_default', '1080');
        element.file.split(',').reverse().forEach(function (file) {
          var q = file.match("\\[(\\d+)p");
          if (q) {
            quality[q[1] + 'p'] = file.replace(/\[\d+p\]/, '').replace(/{([^}]+)}/, '').split(' or ')[0];
            if (!first || q[1] == preferably) first = quality[q[1] + 'p'];
          }
        });
        element.stream = first;
        element.qualitys = quality;
        return {
          file: first,
          quality: quality
        };
      }
      function toPlayElement(element) {
        getFile(element);
        var play = {
          url: element.stream,
          timeline: element.timeline,
          title: element.title,
          subtitles: element.subtitles,
          quality: element.qualitys,
          callback: element.mark
        };
        return play;
      }
      function append(items) {
        component.reset();
        component.draw(items, {
          similars: wait_similars,
          onEnter: function onEnter(item, html) {
            getFile(item);
            if (item.stream) {
              var playlist = [];
              var first = toPlayElement(item);
              if (item.season) {
                items.forEach(function (elem) {
                  playlist.push(toPlayElement(elem));
                });
              } else {
                playlist.push(first);
              }
              if (playlist.length > 1) first.playlist = playlist;
              Lampa.Player.play(first);
              Lampa.Player.playlist(playlist);
              item.mark();
            } else Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
          },
          onContextMenu: function onContextMenu(item, html, data, call) {
            call(getFile(item));
          }
        });
      }
    }

    function collaps(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var embed = component.proxy('collaps') + 'https://api.delivembd.ws/embed/';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0
      };
      this.searchByKinopoisk = function (_object, id) {
        this.searchIn('kp', id);
      };
      this.searchByImdbID = function (_object, id) {
        this.searchIn('imdb', id);
      };
      this.searchIn = function (where, id) {
        var url = embed + where + '/' + id;
        network.silent(url, function (str) {
          if (str) {
            parse(str);
          } else component.doesNotAnswer();
          component.loading(false);
        }, function (a, c) {
          component.doesNotAnswer();
        }, false, {
          dataType: 'text'
        });
      };
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0
        };
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      this.destroy = function () {
        network.clear();
        extract = null;
      };
      function parse(str) {
        str = str.replace(/\n/g, '');
        var find = str.match('makePlayer\\({(.*?)}\\);');
        if (find) {
          var json;
          try {
            json = eval('({' + find[1] + '})');
          } catch (e) {}
          if (json) {
            extract = json;
            filter();
            append(filtred());
          } else component.doesNotAnswer();
        }
      }
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          quality: []
        };
        if (extract.playlist) {
          if (extract.playlist.seasons) {
            extract.playlist.seasons.forEach(function (season) {
              filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + season.season);
            });
          }
        }
        filter_items.season.sort(function (a, b) {
          var n_a = parseInt(a.replace(/\D/g, ''));
          var n_b = parseInt(b.replace(/\D/g, ''));
          if (n_a > n_b) return 1;else if (n_a < n_b) return -1;else return 0;
        });
        component.filter(filter_items, choice);
      }
      function filtred() {
        var filtred = [];
        if (extract.playlist) {
          extract.playlist.seasons.forEach(function (season, i) {
            if (season.season - 1 == choice.season) {
              season.episodes.forEach(function (episode) {
                filtred.push({
                  file: episode.hls,
                  episode: parseInt(episode.episode),
                  season: season.season,
                  title: episode.title,
                  quality: '',
                  info: episode.audio.names.slice(0, 5).join(', '),
                  subtitles: episode.cc ? episode.cc.map(function (c) {
                    return {
                      label: c.name,
                      url: c.url
                    };
                  }) : false
                });
              });
            }
          });
        } else if (extract.source) {
          var resolution = Lampa.Arrays.getKeys(extract.qualityByWidth).pop();
          var max_quality = extract.qualityByWidth ? extract.qualityByWidth[resolution] || 0 : 0;
          filtred.push({
            file: extract.source.hls,
            title: extract.title,
            quality: max_quality ? max_quality + 'p' : '',
            info: extract.source.audio.names.slice(0, 4).join(', '),
            subtitles: extract.source.cc ? extract.source.cc.map(function (c) {
              return {
                label: c.name,
                url: c.url
              };
            }) : false
          });
        }
        return filtred;
      }
      function append(items) {
        component.reset();
        component.draw(items, {
          onEnter: function onEnter(item, html) {
            if (item.file) {
              var playlist = [];
              var first = {
                url: item.file,
                timeline: item.timeline,
                title: item.title,
                subtitles: item.subtitles
              };
              if (item.season) {
                items.forEach(function (elem) {
                  playlist.push({
                    title: elem.title,
                    url: elem.file,
                    timeline: elem.timeline,
                    subtitles: elem.subtitles,
                    callback: function callback() {
                      elem.mark();
                    }
                  });
                });
              } else {
                playlist.push(first);
              }
              if (playlist.length > 1) first.playlist = playlist;
              Lampa.Player.play(first);
              Lampa.Player.playlist(playlist);
              item.mark();
            } else Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
          },
          onContextMenu: function onContextMenu(item, html, data, call) {
            call({
              file: item.file
            });
          }
        });
      }
    }

    function filmix(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var results = [];
      var object = _object;
      var embed = 'http://filmixapp.cyou/api/v2/';
      var wait_similars;
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        voice_name: ''
      };
      var token = Lampa.Storage.get('filmix_token', '');
      var dev_token = 'user_dev_apk=2.0.1&user_dev_id=&user_dev_name=Xiaomi&user_dev_os=11&user_dev_token=' + token + '&user_dev_vendor=Xiaomi';
      this.search = function (_object, sim) {
        if (wait_similars) this.find(sim[0].id);
      };
      this.searchByTitle = function (_object, query) {
        var _this = this;
        object = _object;
        var year = parseInt((object.movie.release_date || object.movie.first_air_date || '0000').slice(0, 4));
        var orig = object.movie.original_title || object.movie.original_name;
        var url = embed + 'search';
        url = Lampa.Utils.addUrlComponent(url, 'story=' + encodeURIComponent(query));
        url = Lampa.Utils.addUrlComponent(url, dev_token);
        network.clear();
        network.silent(url, function (json) {
          var cards = json.filter(function (c) {
            c.year = parseInt(c.alt_name.split('-').pop());
            return c.year > year - 2 && c.year < year + 2;
          });
          var card = cards.find(function (c) {
            return c.year == year;
          });
          if (!card) {
            card = cards.find(function (c) {
              return c.original_title == orig;
            });
          }
          if (!card && cards.length == 1) card = cards[0];
          if (card) _this.find(card.id);else if (json.length) {
            wait_similars = true;
            component.similars(json);
            component.loading(false);
          } else component.doesNotAnswer();
        }, function (a, c) {
          component.doesNotAnswer();
        });
      };
      this.find = function (filmix_id) {
        var url = embed;
        if (!window.filmix.is_max_qualitie && token) {
          window.filmix.is_max_qualitie = true;
          network.clear();
          network.timeout(10000);
          network.silent(url + 'user_profile?' + dev_token, function (found) {
            if (found && found.user_data) {
              if (found.user_data.is_pro) window.filmix.max_qualitie = 1080;
              if (found.user_data.is_pro_plus) window.filmix.max_qualitie = 2160;
            }
            end_search(filmix_id);
          });
        } else end_search(filmix_id);
        function end_search(filmix_id) {
          network.clear();
          network.timeout(10000);
          network.silent((window.filmix.is_max_qualitie ? url + 'post/' + filmix_id : url + 'post/' + filmix_id) + '?' + dev_token, function (found) {
            if (found && Object.keys(found).length) {
              success(found);
              component.loading(false);
            } else component.doesNotAnswer();
          }, function (a, c) {
            component.doesNotAnswer();
          });
        }
      };
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0,
          voice_name: ''
        };
        extractData(results);
        filter();
        append(filtred());
      };
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
        component.reset();
        extractData(results);
        filter();
        append(filtred());
      };
      this.destroy = function () {
        network.clear();
        results = null;
      };
      function success(json) {
        results = json;
        extractData(json);
        filter();
        append(filtred());
      }
      function extractData(data) {
        extract = {};
        var pl_links = data.player_links;
        if (pl_links.playlist && Object.keys(pl_links.playlist).length > 0) {
          var seas_num = 0;
          for (var season in pl_links.playlist) {
            var episode = pl_links.playlist[season];
            ++seas_num;
            var transl_id = 0;
            for (var voice in episode) {
              var episode_voice = episode[voice];
              ++transl_id;
              var items = [];
              for (var ID in episode_voice) {
                var file_episod = episode_voice[ID];
                var quality_eps = file_episod.qualities.filter(function (qualitys) {
                  return qualitys <= window.filmix.max_qualitie;
                });
                var max_quality = Math.max.apply(null, quality_eps);
                var stream_url = file_episod.link.replace('%s.mp4', max_quality + '.mp4');
                var s_e = stream_url.slice(0 - stream_url.length + stream_url.lastIndexOf('/'));
                var str_s_e = s_e.match(/s(\d+)e(\d+?)_\d+\.mp4/i);
                if (str_s_e) {
                  var _seas_num = parseInt(str_s_e[1]);
                  var _epis_num = parseInt(str_s_e[2]);
                  items.push({
                    id: _seas_num + '_' + _epis_num,
                    comment: _epis_num + ' ' + Lampa.Lang.translate('torrent_serial_episode') + ' <i>' + ID + '</i>',
                    file: stream_url,
                    episode: _epis_num,
                    season: _seas_num,
                    quality: max_quality,
                    qualities: quality_eps,
                    translation: transl_id
                  });
                }
              }
              if (!extract[transl_id]) extract[transl_id] = {
                json: [],
                file: ''
              };
              extract[transl_id].json.push({
                id: seas_num,
                comment: seas_num + ' ' + Lampa.Lang.translate('torrent_serial_season'),
                folder: items,
                translation: transl_id
              });
            }
          }
        } else if (pl_links.movie && pl_links.movie.length > 0) {
          var _transl_id = 0;
          for (var _ID in pl_links.movie) {
            var _file_episod = pl_links.movie[_ID];
            ++_transl_id;
            var _quality_eps = _file_episod.link.match(/.+\[(.+[\d]),?\].+/i);
            if (_quality_eps) _quality_eps = _quality_eps[1].split(',').filter(function (quality_) {
              return quality_ <= window.filmix.max_qualitie;
            });
            var _max_quality = Math.max.apply(null, _quality_eps);
            var file_url = _file_episod.link.replace(/\[(.+[\d]),?\]/i, _max_quality);
            extract[_transl_id] = {
              file: file_url,
              translation: _file_episod.translation,
              quality: _max_quality,
              qualities: _quality_eps
            };
          }
        }
      }
      function getFile(element, max_quality) {
        var translat = extract[element.translation];
        var id = element.season + '_' + element.episode;
        var file = '';
        var quality = false;
        if (translat) {
          if (element.season) for (var i in translat.json) {
            var elem = translat.json[i];
            if (elem.folder) for (var f in elem.folder) {
              var folder = elem.folder[f];
              if (folder.id == id) {
                file = folder.file;
                break;
              }
            } else {
              if (elem.id == id) {
                file = elem.file;
                break;
              }
            }
          } else file = translat.file;
        }
        max_quality = parseInt(max_quality);
        if (file) {
          var link = file.slice(0, file.lastIndexOf('_')) + '_';
          var orin = file.split('?');
          orin = orin.length > 1 ? '?' + orin.slice(1).join('?') : '';
          if (file.split('_').pop().replace('.mp4', '') !== max_quality) {
            file = link + max_quality + '.mp4' + orin;
          }
          quality = {};
          var mass = [2160, 1440, 1080, 720, 480, 360];
          mass = mass.slice(mass.indexOf(max_quality));
          mass.forEach(function (n) {
            quality[n + 'p'] = link + n + '.mp4' + orin;
          });
          var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
          if (quality[preferably]) file = quality[preferably];
        }
        return {
          file: file,
          quality: quality
        };
      }
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          voice_info: []
        };
        if (results.last_episode && results.last_episode.season) {
          var s = results.last_episode.season;
          while (s--) {
            filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + (results.last_episode.season - s));
          }
        }
        for (var Id in results.player_links.playlist) {
          var season = results.player_links.playlist[Id];
          var d = 0;
          for (var voic in season) {
            ++d;
            if (filter_items.voice.indexOf(voic) == -1) {
              filter_items.voice.push(voic);
              filter_items.voice_info.push({
                id: d
              });
            }
          }
        }
        if (choice.voice_name) {
          var inx = filter_items.voice.map(function (v) {
            return v.toLowerCase();
          }).indexOf(choice.voice_name.toLowerCase());
          if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
            choice.voice = inx;
          }
        }
        component.filter(filter_items, choice);
      }
      function filtred() {
        var filtred = [];
        if (Object.keys(results.player_links.playlist).length) {
          for (var transl in extract) {
            var element = extract[transl];
            for (var season_id in element.json) {
              var episode = element.json[season_id];
              if (episode.id == choice.season + 1) {
                episode.folder.forEach(function (media) {
                  if (media.translation == filter_items.voice_info[choice.voice].id) {
                    filtred.push({
                      episode: parseInt(media.episode),
                      season: media.season,
                      title: Lampa.Lang.translate('torrent_serial_episode') + ' ' + media.episode + (media.title ? ' - ' + media.title : ''),
                      quality: media.quality + 'p ',
                      translation: media.translation,
                      voice_name: filter_items.voice[choice.voice],
                      info: filter_items.voice[choice.voice]
                    });
                  }
                });
              }
            }
          }
        } else if (Object.keys(results.player_links.movie).length) {
          for (var transl_id in extract) {
            var _element = extract[transl_id];
            filtred.push({
              title: _element.translation,
              quality: _element.quality + 'p ',
              qualitys: _element.qualities,
              translation: transl_id,
              voice_name: _element.translation
            });
          }
        }
        return filtred;
      }
      function toPlayElement(element) {
        var extra = getFile(element, element.quality);
        var play = {
          title: element.title,
          url: extra.file,
          quality: extra.quality,
          timeline: element.timeline,
          callback: element.mark
        };
        return play;
      }
      function append(items) {
        component.reset();
        component.draw(items, {
          similars: wait_similars,
          onEnter: function onEnter(item, html) {
            var extra = getFile(item, item.quality);
            if (extra.file) {
              var playlist = [];
              var first = toPlayElement(item);
              if (item.season) {
                items.forEach(function (elem) {
                  playlist.push(toPlayElement(elem));
                });
              } else {
                playlist.push(first);
              }
              if (playlist.length > 1) first.playlist = playlist;
              Lampa.Player.play(first);
              Lampa.Player.playlist(playlist);
              item.mark();
            } else Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
          },
          onContextMenu: function onContextMenu(item, html, data, call) {
            call(getFile(item, item.quality));
          }
        });
      }
    }

    function component(object) {
      var network = new Lampa.Reguest();
      var scroll = new Lampa.Scroll({
        mask: true,
        over: true
      });
      var files = new Lampa.Explorer(object);
      var filter = new Lampa.Filter(object);
      var sources = {
        videocdn: videocdn,
        rezka: rezka,
        kinobase: kinobase,
        collaps: collaps,
        filmix: filmix
      };
      var last;
      var extended;
      var selected_id;
      var source;
      var balanser;
      var initialized;
      var balanser_timer;
      var images = [];
      var filter_sources = Lampa.Arrays.getKeys(sources);
      var filter_translate = {
        season: Lampa.Lang.translate('torrent_serial_season'),
        voice: Lampa.Lang.translate('torrent_parser_voice'),
        source: Lampa.Lang.translate('settings_rest_source')
      };
      this.initialize = function () {
        var _this = this;
        source = this.createSource();
        filter.onSearch = function (value) {
          Lampa.Activity.replace({
            search: value,
            clarification: true
          });
        };
        filter.onBack = function () {
          _this.start();
        };
        filter.render().find('.selector').on('hover:enter', function () {
          clearInterval(balanser_timer);
        });
        filter.onSelect = function (type, a, b) {
          if (type == 'filter') {
            if (a.reset) {
              if (extended) source.reset();else _this.start();
            } else {
              source.filter(type, a, b);
            }
          } else if (type == 'sort') {
            Lampa.Select.close();
            _this.changeBalanser(a.source);
          }
        };
        if (filter.addButtonBack) filter.addButtonBack();
        filter.render().find('.filter--sort span').text(Lampa.Lang.translate('online_balanser'));
        files.appendFiles(scroll.render());
        files.appendHead(filter.render());
        scroll.body().addClass('torrent-list');
        scroll.minus(files.render().find('.explorer__files-head'));
        this.search();
      };
      this.changeBalanser = function (balanser_name) {
        var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
        last_select_balanser[object.movie.id] = balanser_name;
        Lampa.Storage.set('online_last_balanser', last_select_balanser);
        Lampa.Storage.set('online_balanser', balanser_name);
        var to = this.getChoice(balanser_name);
        var from = this.getChoice();
        if (from.voice_name) to.voice_name = from.voice_name;
        this.saveChoice(to, balanser_name);
        Lampa.Activity.replace();
      };
      this.createSource = function () {
        var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
        if (last_select_balanser[object.movie.id]) {
          balanser = last_select_balanser[object.movie.id];
          Lampa.Storage.set('online_last_balanser', last_select_balanser);
        } else {
          balanser = Lampa.Storage.get('online_balanser', 'filmix');
        }
        if (!sources[balanser]) {
          balanser = 'filmix';
        }
        return new sources[balanser](this, object);
      };
      this.proxy = function (name) {
        var prox = Lampa.Storage.get('online_proxy_all');
        var need = Lampa.Storage.get('online_proxy_' + name);
        if (need) prox = need;
        if (prox && prox.slice(-1) !== '/') {
          prox += '/';
        }
        return prox;
      };

      /**
       * Подготовка
       */
      this.create = function () {
        return this.render();
      };

      /**
       * Начать поиск
       */
      this.search = function () {
        this.activity.loader(true);
        this.filter({
          source: filter_sources
        }, this.getChoice());
        this.find();
      };
      this.find = function () {
        var _this2 = this;
        var url = this.proxy('videocdn') + 'https://videocdn.tv/api/short';
        var query = object.search;
        url = Lampa.Utils.addUrlComponent(url, 'api_token=3i40G5TSECmLF77oAqnEgbx61ZWaOYaE');
        var display = function display(json) {
          if (object.movie.imdb_id) {
            var imdb = json.data.filter(function (elem) {
              return elem.imdb_id == object.movie.imdb_id;
            });
            if (imdb.length) json.data = imdb;
          }
          if (json.data && json.data.length) {
            if (json.data.length == 1 || object.clarification) {
              _this2.extendChoice();
              var kinopoisk_id = json.data[0].kp_id || json.data[0].filmId;
              if (kinopoisk_id && source.searchByKinopoisk) {
                source.searchByKinopoisk(object, kinopoisk_id);
              } else if (json.data[0].imdb_id && source.searchByImdbID) {
                source.searchByImdbID(object, json.data[0].imdb_id);
              } else if (source.search) {
                source.search(object, json.data);
              } else {
                _this2.doesNotAnswer();
              }
            } else {
              _this2.similars(json.data);
              _this2.loading(false);
            }
          } else _this2.doesNotAnswer(query);
        };
        var pillow = function pillow(a, c) {
          network.timeout(1000 * 15);
          network["native"]('https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=' + encodeURIComponent(query), function (json) {
            json.data = json.films;
            display(json);
          }, function (a, c) {
            _this2.doesNotAnswer();
          }, false, {
            headers: {
              'X-API-KEY': '2d55adfd-019d-4567-bbf7-67d503f61b5a'
            }
          });
        };
        var letgo = function letgo(imdb_id) {
          if (imdb_id && source.searchByImdbID) {
            _this2.extendChoice();
            source.searchByImdbID(object, imdb_id);
          } else {
            var url_end = Lampa.Utils.addUrlComponent(url, imdb_id ? 'imdb_id=' + encodeURIComponent(imdb_id) : 'title=' + encodeURIComponent(query));
            network.timeout(1000 * 15);
            network["native"](url_end, function (json) {
              if (json.data && json.data.length) display(json);else {
                network["native"](Lampa.Utils.addUrlComponent(url, 'title=' + encodeURIComponent(query)), display.bind(_this2), pillow.bind(_this2));
              }
            }, pillow.bind(_this2));
          }
        };
        if (source.searchByTitle) {
          this.extendChoice();
          source.searchByTitle(object, object.movie.title || object.movie.name);
        } else if (object.movie.kinopoisk_id && source.searchByKinopoisk) {
          this.extendChoice();
          source.searchByKinopoisk(object, object.movie.kinopoisk_id);
        } else if (object.movie.imdb_id) {
          letgo(object.movie.imdb_id);
        } else if (object.movie.source == 'tmdb' || object.movie.source == 'cub') {
          var tmdburl = (object.movie.name ? 'tv' : 'movie') + '/' + object.movie.id + '/external_ids?api_key=4ef0d7355d9ffb5151e987764708ce96&language=ru';
          var baseurl = Lampa.TMDB.api(tmdburl);
          network.timeout(1000 * 10);
          network["native"](baseurl, function (ttid) {
            letgo(ttid.imdb_id);
          }, function (a, c) {
            letgo();
          });
        } else {
          letgo();
        }
      };
      this.getChoice = function (for_balanser) {
        var data = Lampa.Storage.cache('online_choice_' + (for_balanser || balanser), 3000, {});
        var save = data[selected_id || object.movie.id] || {};
        Lampa.Arrays.extend(save, {
          season: 0,
          voice: 0,
          voice_name: '',
          voice_id: 0,
          episodes_view: {},
          movie_view: ''
        });
        return save;
      };
      this.extendChoice = function () {
        extended = true;
        source.extendChoice(this.getChoice());
      };
      this.saveChoice = function (choice, for_balanser) {
        var data = Lampa.Storage.cache('online_choice_' + (for_balanser || balanser), 3000, {});
        data[selected_id || object.movie.id] = choice;
        Lampa.Storage.set('online_choice_' + (for_balanser || balanser), data);
      };

      /**
       * Есть похожие карточки
       * @param {Object} json 
       */
      this.similars = function (json) {
        var _this3 = this;
        json.forEach(function (elem) {
          var info = [];
          var year = ((elem.start_date || elem.year || '') + '').slice(0, 4);
          if (elem.rating && elem.rating !== 'null' && elem.filmId) info.push(Lampa.Template.get('online_prestige_rate', {
            rate: elem.rating
          }, true));
          if (year) info.push(year);
          if (elem.countries && elem.countries.length) {
            info.push((elem.filmId ? elem.countries.map(function (c) {
              return c.country;
            }) : elem.countries).join(', '));
          }
          if (elem.categories && elem.categories.length) {
            info.push(elem.categories.slice(0, 4).join(', '));
          }
          var name = elem.title || elem.ru_title || elem.en_title || elem.nameRu || elem.nameEn;
          var orig = elem.orig_title || elem.nameEn || '';
          elem.title = name + (orig && orig !== name ? ' / ' + orig : '');
          elem.time = elem.filmLength || '';
          elem.info = info.join('<span class="online-prestige-split">●</span>');
          var item = Lampa.Template.get('online_prestige_folder', elem);
          item.on('hover:enter', function () {
            _this3.activity.loader(true);
            _this3.reset();
            object.search_date = year;
            selected_id = elem.id;
            _this3.extendChoice();
            var kinopoisk_id = elem.kp_id || elem.filmId;
            if (kinopoisk_id && source.searchByKinopoisk) {
              source.searchByKinopoisk(object, kinopoisk_id);
            } else if (source.search) {
              source.search(object, [elem]);
            } else {
              _this3.doesNotAnswer();
            }
          }).on('hover:focus', function (e) {
            last = e.target;
            scroll.update($(e.target), true);
          });
          scroll.append(item);
        });
      };
      this.clearImages = function () {
        images.forEach(function (img) {
          img.onerror = function () {};
          img.onload = function () {};
          img.src = '';
        });
        images = [];
      };

      /**
       * Очистить список файлов
       */
      this.reset = function () {
        last = false;
        clearInterval(balanser_timer);
        network.clear();
        this.clearImages();
        scroll.render().find('.empty').remove();
        scroll.clear();
      };

      /**
       * Загрузка
       */
      this.loading = function (status) {
        if (status) this.activity.loader(true);else {
          this.activity.loader(false);
          this.activity.toggle();
        }
      };

      /**
       * Построить фильтр
       */
      this.filter = function (filter_items, choice) {
        var _this4 = this;
        var select = [];
        var add = function add(type, title) {
          var need = _this4.getChoice();
          var items = filter_items[type];
          var subitems = [];
          var value = need[type];
          items.forEach(function (name, i) {
            subitems.push({
              title: name,
              selected: value == i,
              index: i
            });
          });
          select.push({
            title: title,
            subtitle: items[value],
            items: subitems,
            stype: type
          });
        };
        filter_items.source = filter_sources;
        select.push({
          title: Lampa.Lang.translate('torrent_parser_reset'),
          reset: true
        });
        this.saveChoice(choice);
        if (filter_items.voice && filter_items.voice.length) add('voice', Lampa.Lang.translate('torrent_parser_voice'));
        if (filter_items.season && filter_items.season.length) add('season', Lampa.Lang.translate('torrent_serial_season'));
        filter.set('filter', select);
        filter.set('sort', filter_sources.map(function (e) {
          return {
            title: e,
            source: e,
            selected: e == balanser
          };
        }));
        this.selected(filter_items);
      };

      /**
       * Закрыть фильтр
       */
      this.closeFilter = function () {
        if ($('body').hasClass('selectbox--open')) Lampa.Select.close();
      };

      /**
       * Показать что выбрано в фильтре
       */
      this.selected = function (filter_items) {
        var need = this.getChoice(),
          select = [];
        for (var i in need) {
          if (filter_items[i] && filter_items[i].length) {
            if (i == 'voice') {
              select.push(filter_translate[i] + ': ' + filter_items[i][need[i]]);
            } else if (i !== 'source') {
              if (filter_items.season.length >= 1) {
                select.push(filter_translate.season + ': ' + filter_items[i][need[i]]);
              }
            }
          }
        }
        filter.chosen('filter', select);
        filter.chosen('sort', [balanser]);
      };
      this.getEpisodes = function (season, call) {
        var episodes = [];
        if (typeof object.movie.id == 'number' && object.movie.name) {
          Lampa.Api.sources.tmdb.get('tv/' + object.movie.id + '/season/' + season, {}, function (data) {
            episodes = data.episodes || [];
            call(episodes);
          }, function () {
            call(episodes);
          });
        } else call(episodes);
      };

      /**
       * Добавить элементы в список
       */
      this.append = function (item) {
        item.on('hover:focus', function (e) {
          last = e.target;
          scroll.update($(e.target), true);
        });
        scroll.append(item);
      };
      this.watched = function (set) {
        var file_id = Lampa.Utils.hash(object.movie.number_of_seasons ? object.movie.original_name : object.movie.original_title);
        var watched = Lampa.Storage.cache('online_watched_last', 5000, {});
        if (set) {
          if (!watched[file_id]) watched[file_id] = {};
          Lampa.Arrays.extend(watched[file_id], set, true);
          Lampa.Storage.set('online_watched_last', watched);
          this.updateWatched();
        } else {
          return watched[file_id];
        }
      };
      this.updateWatched = function () {
        var watched = this.watched();
        var body = scroll.body().find('.online-prestige-watched .online-prestige-watched__body').empty();
        if (watched) {
          var line = [];
          if (watched.balanser_name) line.push(watched.balanser_name);
          if (watched.voice_name) line.push(watched.voice_name);
          if (watched.season) line.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + watched.season);
          if (watched.episode) line.push(Lampa.Lang.translate('torrent_serial_episode') + ' ' + watched.episode);
          line.forEach(function (n) {
            body.append('<span>' + n + '</span>');
          });
        } else body.append('<span>' + Lampa.Lang.translate('online_no_watch_history') + '</span>');
      };

      /**
       * Отрисовка файлов
       */
      this.draw = function (items) {
        var _this5 = this;
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (!items.length) return this.empty();
        scroll.append(Lampa.Template.get('online_prestige_watched', {}));
        this.updateWatched();
        this.getEpisodes(items[0].season, function (episodes) {
          var viewed = Lampa.Storage.cache('online_view', 5000, []);
          var serial = object.movie.name ? true : false;
          var choice = _this5.getChoice();
          var fully = window.innerWidth > 480;
          var scroll_to_element = false;
          var scroll_to_mark = false;
          items.forEach(function (element, index) {
            var episode = serial && episodes.length && !params.similars ? episodes.find(function (e) {
              return e.episode_number == element.episode;
            }) : false;
            var episode_num = element.episode || index + 1;
            var episode_last = choice.episodes_view[element.season];
            Lampa.Arrays.extend(element, {
              info: '',
              quality: '',
              time: Lampa.Utils.secondsToTime((episode ? episode.runtime : object.movie.runtime) * 60, true)
            });
            var hash_timeline = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
            var hash_behold = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, element.voice_name].join('') : object.movie.original_title + element.voice_name);
            var data = {
              hash_timeline: hash_timeline,
              hash_behold: hash_behold
            };
            var info = [];
            if (element.season) {
              element.translate_episode_end = _this5.getLastEpisode(items);
              element.translate_voice = element.voice_name;
            }
            element.timeline = Lampa.Timeline.view(hash_timeline);
            if (episode) {
              element.title = episode.name;
              if (element.info.length < 30 && episode.vote_average) info.push(Lampa.Template.get('online_prestige_rate', {
                rate: parseFloat(episode.vote_average + '').toFixed(1)
              }, true));
              if (episode.air_date && fully) info.push(Lampa.Utils.parseTime(episode.air_date).full);
            } else if (object.movie.release_date && fully) {
              info.push(Lampa.Utils.parseTime(object.movie.release_date).full);
            }
            if (!serial && object.movie.tagline && element.info.length < 30) info.push(object.movie.tagline);
            if (element.info) info.push(element.info);
            if (info.length) element.info = info.map(function (i) {
              return '<span>' + i + '</span>';
            }).join('<span class="online-prestige-split">●</span>');
            var html = Lampa.Template.get('online_prestige_full', element);
            var loader = html.find('.online-prestige__loader');
            var image = html.find('.online-prestige__img');
            if (!serial) {
              if (choice.movie_view == hash_behold) scroll_to_element = html;
            } else if (typeof episode_last !== 'undefined' && episode_last == episode_num) {
              scroll_to_element = html;
            }
            if (serial && !episode) {
              image.append('<div class="online-prestige__episode-number">' + ('0' + (element.episode || index + 1)).slice(-2) + '</div>');
              loader.remove();
            } else {
              var img = html.find('img')[0];
              img.onerror = function () {
                img.src = './img/img_broken.svg';
              };
              img.onload = function () {
                image.addClass('online-prestige__img--loaded');
                loader.remove();
                if (serial) image.append('<div class="online-prestige__episode-number">' + ('0' + (element.episode || index + 1)).slice(-2) + '</div>');
              };
              img.src = Lampa.TMDB.image('t/p/w300' + (episode ? episode.still_path : object.movie.backdrop_path));
              images.push(img);
            }
            html.find('.online-prestige__timeline').append(Lampa.Timeline.render(element.timeline));
            if (viewed.indexOf(hash_behold) !== -1) {
              scroll_to_mark = html;
              html.find('.online-prestige__img').append('<div class="online-prestige__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
            }
            element.mark = function () {
              viewed = Lampa.Storage.cache('online_view', 5000, []);
              if (viewed.indexOf(hash_behold) == -1) {
                viewed.push(hash_behold);
                Lampa.Storage.set('online_view', viewed);
                if (html.find('.online-prestige__viewed').length == 0) {
                  html.find('.online-prestige__img').append('<div class="online-prestige__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
                }
              }
              choice = _this5.getChoice();
              if (!serial) {
                choice.movie_view = hash_behold;
              } else {
                choice.episodes_view[element.season] = episode_num;
              }
              _this5.saveChoice(choice);
              _this5.watched({
                balanser: balanser,
                balanser_name: Lampa.Utils.capitalizeFirstLetter(balanser),
                voice_id: choice.voice_id,
                voice_name: choice.voice_name || element.voice_name,
                episode: element.episode,
                season: element.season
              });
            };
            element.unmark = function () {
              viewed = Lampa.Storage.cache('online_view', 5000, []);
              if (viewed.indexOf(hash_behold) !== -1) {
                Lampa.Arrays.remove(viewed, hash_behold);
                Lampa.Storage.set('online_view', viewed);
                if (Lampa.Manifest.app_digital >= 177) Lampa.Storage.remove('online_view', hash_behold);
                html.find('.online-prestige__viewed').remove();
              }
            };
            element.timeclear = function () {
              element.timeline.percent = 0;
              element.timeline.time = 0;
              element.timeline.duration = 0;
              Lampa.Timeline.update(element.timeline);
            };
            html.on('hover:enter', function () {
              if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
              if (params.onEnter) params.onEnter(element, html, data);
            }).on('hover:focus', function (e) {
              last = e.target;
              if (params.onFocus) params.onFocus(element, html, data);
              scroll.update($(e.target), true);
            });
            if (params.onRender) params.onRender(element, html, data);
            _this5.contextMenu({
              html: html,
              element: element,
              onFile: function onFile(call) {
                if (params.onContextMenu) params.onContextMenu(element, html, data, call);
              },
              onClearAllMark: function onClearAllMark() {
                items.forEach(function (elem) {
                  elem.unmark();
                });
              },
              onClearAllTime: function onClearAllTime() {
                items.forEach(function (elem) {
                  elem.timeclear();
                });
              }
            });
            scroll.append(html);
          });
          if (serial && episodes.length > items.length && !params.similars) {
            var left = episodes.slice(items.length);
            left.forEach(function (episode) {
              var info = [];
              if (episode.vote_average) info.push(Lampa.Template.get('online_prestige_rate', {
                rate: parseFloat(episode.vote_average + '').toFixed(1)
              }, true));
              if (episode.air_date) info.push(Lampa.Utils.parseTime(episode.air_date).full);
              var air = new Date((episode.air_date + '').replace(/-/g, '/'));
              var now = Date.now();
              var day = Math.round((air.getTime() - now) / (24 * 60 * 60 * 1000));
              var txt = Lampa.Lang.translate('full_episode_days_left') + ': ' + day;
              var html = Lampa.Template.get('online_prestige_full', {
                time: Lampa.Utils.secondsToTime((episode ? episode.runtime : object.movie.runtime) * 60, true),
                info: info.length ? info.map(function (i) {
                  return '<span>' + i + '</span>';
                }).join('<span class="online-prestige-split">●</span>') : '',
                title: episode.name,
                quality: day > 0 ? txt : ''
              });
              var loader = html.find('.online-prestige__loader');
              var image = html.find('.online-prestige__img');
              var season = items[0] ? items[0].season : 1;
              html.find('.online-prestige__timeline').append(Lampa.Timeline.render(Lampa.Timeline.view(Lampa.Utils.hash([season, episode.episode_number, object.movie.original_title].join('')))));
              var img = html.find('img')[0];
              if (episode.still_path) {
                img.onerror = function () {
                  img.src = './img/img_broken.svg';
                };
                img.onload = function () {
                  image.addClass('online-prestige__img--loaded');
                  loader.remove();
                  image.append('<div class="online-prestige__episode-number">' + ('0' + episode.episode_number).slice(-2) + '</div>');
                };
                img.src = Lampa.TMDB.image('t/p/w300' + episode.still_path);
                images.push(img);
              } else {
                loader.remove();
                image.append('<div class="online-prestige__episode-number">' + ('0' + episode.episode_number).slice(-2) + '</div>');
              }
              html.on('hover:focus', function (e) {
                last = e.target;
                scroll.update($(e.target), true);
              });
              scroll.append(html);
            });
          }
          if (scroll_to_element) {
            last = scroll_to_element[0];
          } else if (scroll_to_mark) {
            last = scroll_to_mark[0];
          }
          Lampa.Controller.enable('content');
        });
      };

      /**
       * Меню
       */
      this.contextMenu = function (params) {
        params.html.on('hover:long', function () {
          function show(extra) {
            var enabled = Lampa.Controller.enabled().name;
            var menu = [];
            if (Lampa.Platform.is('webos')) {
              menu.push({
                title: Lampa.Lang.translate('player_lauch') + ' - Webos',
                player: 'webos'
              });
            }
            if (Lampa.Platform.is('android')) {
              menu.push({
                title: Lampa.Lang.translate('player_lauch') + ' - Android',
                player: 'android'
              });
            }
            menu.push({
              title: Lampa.Lang.translate('player_lauch') + ' - Lampa',
              player: 'lampa'
            });
            menu.push({
              title: Lampa.Lang.translate('online_video'),
              separator: true
            });
            menu.push({
              title: Lampa.Lang.translate('torrent_parser_label_title'),
              mark: true
            });
            menu.push({
              title: Lampa.Lang.translate('torrent_parser_label_cancel_title'),
              unmark: true
            });
            menu.push({
              title: Lampa.Lang.translate('time_reset'),
              timeclear: true
            });
            if (extra) {
              menu.push({
                title: Lampa.Lang.translate('copy_link'),
                copylink: true
              });
            }
            menu.push({
              title: Lampa.Lang.translate('more'),
              separator: true
            });
            if (Lampa.Account.logged() && params.element && typeof params.element.season !== 'undefined' && params.element.translate_voice) {
              menu.push({
                title: Lampa.Lang.translate('online_voice_subscribe'),
                subscribe: true
              });
            }
            menu.push({
              title: Lampa.Lang.translate('online_clear_all_marks'),
              clearallmark: true
            });
            menu.push({
              title: Lampa.Lang.translate('online_clear_all_timecodes'),
              timeclearall: true
            });
            Lampa.Select.show({
              title: Lampa.Lang.translate('title_action'),
              items: menu,
              onBack: function onBack() {
                Lampa.Controller.toggle(enabled);
              },
              onSelect: function onSelect(a) {
                if (a.mark) params.element.mark();
                if (a.unmark) params.element.unmark();
                if (a.timeclear) params.element.timeclear();
                if (a.clearallmark) params.onClearAllMark();
                if (a.timeclearall) params.onClearAllTime();
                Lampa.Controller.toggle(enabled);
                if (a.player) {
                  Lampa.Player.runas(a.player);
                  params.html.trigger('hover:enter');
                }
                if (a.copylink) {
                  if (extra.quality) {
                    var qual = [];
                    for (var i in extra.quality) {
                      qual.push({
                        title: i,
                        file: extra.quality[i]
                      });
                    }
                    Lampa.Select.show({
                      title: Lampa.Lang.translate('settings_server_links'),
                      items: qual,
                      onBack: function onBack() {
                        Lampa.Controller.toggle(enabled);
                      },
                      onSelect: function onSelect(b) {
                        Lampa.Utils.copyTextToClipboard(b.file, function () {
                          Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
                        }, function () {
                          Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
                        });
                      }
                    });
                  } else {
                    Lampa.Utils.copyTextToClipboard(extra.file, function () {
                      Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
                    }, function () {
                      Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
                    });
                  }
                }
                if (a.subscribe) {
                  Lampa.Account.subscribeToTranslation({
                    card: object.movie,
                    season: params.element.season,
                    episode: params.element.translate_episode_end,
                    voice: params.element.translate_voice
                  }, function () {
                    Lampa.Noty.show(Lampa.Lang.translate('online_voice_success'));
                  }, function () {
                    Lampa.Noty.show(Lampa.Lang.translate('online_voice_error'));
                  });
                }
              }
            });
          }
          params.onFile(show);
        }).on('hover:focus', function () {
          if (Lampa.Helper) Lampa.Helper.show('online_file', Lampa.Lang.translate('helper_online_file'), params.html);
        });
      };

      /**
       * Показать пустой результат
       */
      this.empty = function (msg) {
        var html = Lampa.Template.get('online_does_not_answer', {});
        html.find('.online-empty__buttons').remove();
        html.find('.online-empty__title').text(Lampa.Lang.translate('empty_title_two'));
        html.find('.online-empty__time').text(Lampa.Lang.translate('empty_text'));
        scroll.append(html);
        this.loading(false);
      };
      this.doesNotAnswer = function () {
        var _this6 = this;
        this.reset();
        var html = Lampa.Template.get('online_does_not_answer', {
          balanser: balanser
        });
        var tic = 10;
        html.find('.cancel').on('hover:enter', function () {
          clearInterval(balanser_timer);
        });
        html.find('.change').on('hover:enter', function () {
          clearInterval(balanser_timer);
          filter.render().find('.filter--sort').trigger('hover:enter');
        });
        scroll.append(html);
        this.loading(false);
        balanser_timer = setInterval(function () {
          tic--;
          html.find('.timeout').text(tic);
          if (tic == 0) {
            clearInterval(balanser_timer);
            var keys = Lampa.Arrays.getKeys(sources);
            var indx = keys.indexOf(balanser);
            var next = keys[indx + 1];
            if (!next) next = keys[0];
            balanser = next;
            if (Lampa.Activity.active().activity == _this6.activity) _this6.changeBalanser(balanser);
          }
        }, 1000);
      };
      this.getLastEpisode = function (items) {
        var last_episode = 0;
        items.forEach(function (e) {
          if (typeof e.episode !== 'undefined') last_episode = Math.max(last_episode, parseInt(e.episode));
        });
        return last_episode;
      };

      /**
       * Начать навигацию по файлам
       */
      this.start = function () {
        if (Lampa.Activity.active().activity !== this.activity) return;
        if (!initialized) {
          initialized = true;
          this.initialize();
        }
        Lampa.Background.immediately(Lampa.Utils.cardImgBackgroundBlur(object.movie));
        Lampa.Controller.add('content', {
          toggle: function toggle() {
            Lampa.Controller.collectionSet(scroll.render(), files.render());
            Lampa.Controller.collectionFocus(last || false, scroll.render());
          },
          up: function up() {
            if (Navigator.canmove('up')) {
              Navigator.move('up');
            } else Lampa.Controller.toggle('head');
          },
          down: function down() {
            Navigator.move('down');
          },
          right: function right() {
            if (Navigator.canmove('right')) Navigator.move('right');else filter.show(Lampa.Lang.translate('title_filter'), 'filter');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Lampa.Controller.toggle('menu');
          },
          gone: function gone() {
            clearInterval(balanser_timer);
          },
          back: this.back
        });
        Lampa.Controller.toggle('content');
      };
      this.render = function () {
        return files.render();
      };
      this.back = function () {
        Lampa.Activity.backward();
      };
      this.pause = function () {};
      this.stop = function () {};
      this.destroy = function () {
        network.clear();
        this.clearImages();
        files.destroy();
        scroll.destroy();
        clearInterval(balanser_timer);
        if (source) source.destroy();
      };
    }

    function startPlugin() {
      window.online_prestige = true;
      var manifest = {
        type: 'video',
        version: '1.0.9',
        name: 'Онлайн - Prestige',
        description: 'Плагин для просмотра онлайн сериалов и фильмов',
        component: 'online_prestige',
        onContextMenu: function onContextMenu(object) {
          return {
            name: Lampa.Lang.translate('online_watch'),
            description: ''
          };
        },
        onContextLauch: function onContextLauch(object) {
          resetTemplates();
          Lampa.Component.add('online_prestige', component);
          Lampa.Activity.push({
            url: '',
            title: Lampa.Lang.translate('title_online'),
            component: 'online_prestige',
            search: object.title,
            search_one: object.title,
            search_two: object.original_title,
            movie: object,
            page: 1
          });
        }
      };
      Lampa.Manifest.plugins = manifest;
      Lampa.Lang.add({
        online_watch: {
          ru: 'Смотреть онлайн',
          en: 'Watch online',
          ua: 'Дивитися онлайн',
          zh: '在线观看'
        },
        online_no_watch_history: {
          ru: 'Нет истории просмотра',
          en: 'No browsing history',
          ua: 'Немає історії перегляду',
          zh: '没有浏览历史'
        },
        online_video: {
          ru: 'Видео',
          en: 'Video',
          ua: 'Відео',
          zh: '视频'
        },
        online_nolink: {
          ru: 'Не удалось извлечь ссылку',
          uk: 'Неможливо отримати посилання',
          en: 'Failed to fetch link',
          zh: '获取链接失败'
        },
        online_waitlink: {
          ru: 'Работаем над извлечением ссылки, подождите...',
          uk: 'Працюємо над отриманням посилання, зачекайте...',
          en: 'Working on extracting the link, please wait...',
          zh: '正在提取链接，请稍候...'
        },
        online_balanser: {
          ru: 'Балансер',
          uk: 'Балансер',
          en: 'Balancer',
          zh: '平衡器'
        },
        helper_online_file: {
          ru: 'Удерживайте клавишу "ОК" для вызова контекстного меню',
          uk: 'Утримуйте клавішу "ОК" для виклику контекстного меню',
          en: 'Hold the "OK" key to bring up the context menu',
          zh: '按住“确定”键调出上下文菜单'
        },
        online_query_start: {
          ru: 'По запросу',
          uk: 'На запит',
          en: 'On request',
          zh: '根据要求'
        },
        online_query_end: {
          ru: 'нет результатов',
          uk: 'немає результатів',
          en: 'no results',
          zh: '没有结果'
        },
        title_online: {
          ru: 'Онлайн',
          uk: 'Онлайн',
          en: 'Online',
          zh: '在线的'
        },
        title_proxy: {
          ru: 'Прокси',
          uk: 'Проксі',
          en: 'Proxy',
          zh: '代理人'
        },
        online_proxy_title: {
          ru: 'Основной прокси',
          uk: 'Основний проксі',
          en: 'Main proxy',
          zh: '主要代理'
        },
        online_proxy_descr: {
          ru: 'Будет использоваться для всех балансеров',
          uk: 'Використовуватиметься для всіх балансерів',
          en: 'Will be used for all balancers',
          zh: '将用于所有平衡器'
        },
        online_proxy_placeholder: {
          ru: 'Например: http://proxy.com',
          uk: 'Наприклад: http://proxy.com',
          en: 'For example: http://proxy.com',
          zh: '例如：http://proxy.com'
        },
        filmix_param_add_title: {
          ru: 'Добавить ТОКЕН от Filmix',
          uk: 'Додати ТОКЕН від Filmix',
          en: 'Add TOKEN from Filmix',
          zh: '从 Filmix 添加 TOKEN'
        },
        filmix_param_add_descr: {
          ru: 'Добавьте ТОКЕН для подключения подписки',
          uk: 'Додайте ТОКЕН для підключення передплати',
          en: 'Add a TOKEN to connect a subscription',
          zh: '添加 TOKEN 以连接订阅'
        },
        filmix_param_placeholder: {
          ru: 'Например: nxjekeb57385b..',
          uk: 'Наприклад: nxjekeb57385b..',
          en: 'For example: nxjekeb57385b..',
          zh: '例如：nxjekeb57385b..'
        },
        filmix_param_add_device: {
          ru: 'Добавить устройство на Filmix',
          uk: 'Додати пристрій на Filmix',
          en: 'Add Device to Filmix',
          zh: '将设备添加到 Filmix'
        },
        filmix_modal_text: {
          ru: 'Введите его на странице https://filmix.ac/consoles в вашем авторизованном аккаунте!',
          uk: 'Введіть його на сторінці https://filmix.ac/consoles у вашому авторизованому обліковому записі!',
          en: 'Enter it at https://filmix.ac/consoles in your authorized account!',
          zh: '在您的授权帐户中的 https://filmix.ac/consoles 中输入！'
        },
        filmix_modal_wait: {
          ru: 'Ожидаем код',
          uk: 'Очікуємо код',
          en: 'Waiting for the code',
          zh: '我们正在等待代码'
        },
        filmix_copy_secuses: {
          ru: 'Код скопирован в буфер обмена',
          uk: 'Код скопійовано в буфер обміну',
          en: 'Code copied to clipboard',
          zh: '代码复制到剪贴板'
        },
        filmix_copy_fail: {
          ru: 'Ошибка при копировании',
          uk: 'Помилка при копіюванні',
          en: 'Copy error',
          zh: '复制错误'
        },
        filmix_nodevice: {
          ru: 'Устройство не авторизовано',
          uk: 'Пристрій не авторизований',
          en: 'Device not authorized',
          zh: '设备未授权'
        },
        title_status: {
          ru: 'Статус',
          uk: 'Статус',
          en: 'Status',
          zh: '地位'
        },
        online_voice_subscribe: {
          ru: 'Подписаться на перевод',
          uk: 'Підписатися на переклад',
          en: 'Subscribe to translation',
          zh: '订阅翻译'
        },
        online_voice_success: {
          ru: 'Вы успешно подписались',
          uk: 'Ви успішно підписалися',
          en: 'You have successfully subscribed',
          zh: '您已成功订阅'
        },
        online_voice_error: {
          ru: 'Возникла ошибка',
          uk: 'Виникла помилка',
          en: 'An error has occurred',
          zh: '发生了错误'
        },
        online_clear_all_marks: {
          ru: 'Очистить все метки',
          uk: 'Очистити всі мітки',
          en: 'Clear all labels',
          zh: '清除所有标签'
        },
        online_clear_all_timecodes: {
          ru: 'Очистить все тайм-коды',
          uk: 'Очистити всі тайм-коди',
          en: 'Clear all timecodes',
          zh: '清除所有时间代码'
        },
        online_change_balanser: {
          ru: 'Изменить балансер',
          uk: 'Змінити балансер',
          en: 'Change balancer',
          zh: '更改平衡器'
        },
        online_balanser_dont_work: {
          ru: 'Балансер ({balanser}) не отвечает на запрос.',
          uk: 'Балансер ({balanser}) не відповідає на запит.',
          en: 'Balancer ({balanser}) does not respond to the request.',
          zh: '平衡器（{balanser}）未响应请求。'
        },
        online_balanser_timeout: {
          ru: 'Балансер будет переключен автоматически через <span class="timeout">10</span> секунд.',
          uk: 'Балансер буде переключено автоматично через <span class="timeout">10</span> секунд.',
          en: 'Balancer will be switched automatically in <span class="timeout">10</span> seconds.',
          zh: '平衡器将在<span class="timeout">10</span>秒内自动切换。'
        }
      });
      Lampa.Template.add('online_prestige_css', "\n        <style>\n        @charset 'UTF-8';.online-prestige{position:relative;-webkit-border-radius:.3em;border-radius:.3em;background-color:rgba(0,0,0,0.3);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;will-change:transform}.online-prestige__body{padding:1.2em;line-height:1.3;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;position:relative}@media screen and (max-width:480px){.online-prestige__body{padding:.8em 1.2em}}.online-prestige__img{position:relative;width:13em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;min-height:8.2em}.online-prestige__img>img{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;-webkit-border-radius:.3em;border-radius:.3em;opacity:0;-webkit-transition:opacity .3s;-o-transition:opacity .3s;transition:opacity .3s}.online-prestige__img--loaded>img{opacity:1}@media screen and (max-width:480px){.online-prestige__img{width:7em;min-height:6em}}.online-prestige__folder{padding:1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.online-prestige__folder>svg{width:4.4em !important;height:4.4em !important}.online-prestige__viewed{position:absolute;top:1em;left:1em;background:rgba(0,0,0,0.45);-webkit-border-radius:100%;border-radius:100%;padding:.25em;font-size:.76em}.online-prestige__viewed>svg{width:1.5em !important;height:1.5em !important}.online-prestige__episode-number{position:absolute;top:0;left:0;right:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;font-size:2em}.online-prestige__loader{position:absolute;top:50%;left:50%;width:2em;height:2em;margin-left:-1em;margin-top:-1em;background:url(./img/loader.svg) no-repeat center center;background-size:contain}.online-prestige__head,.online-prestige__footer{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.online-prestige__timeline{margin:.8em 0}.online-prestige__timeline>.time-line{display:block !important}.online-prestige__title{font-size:1.7em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}@media screen and (max-width:480px){.online-prestige__title{font-size:1.4em}}.online-prestige__time{padding-left:2em}.online-prestige__info{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.online-prestige__info>*{overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}.online-prestige__quality{padding-left:1em;white-space:nowrap}.online-prestige__scan-file{position:absolute;bottom:0;left:0;right:0}.online-prestige__scan-file .broadcast__scan{margin:0}.online-prestige .online-prestige-split{font-size:.8em;margin:0 1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.online-prestige.focus::after{content:'';position:absolute;top:-0.6em;left:-0.6em;right:-0.6em;bottom:-0.6em;-webkit-border-radius:.7em;border-radius:.7em;border:solid .3em #fff;z-index:-1;pointer-events:none}.online-prestige+.online-prestige{margin-top:1.5em}.online-prestige--folder .online-prestige__footer{margin-top:.8em}.online-prestige-watched{padding:1em}.online-prestige-watched__icon>svg{width:1.5em;height:1.5em}.online-prestige-watched__body{padding-left:1em;padding-top:.1em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.online-prestige-watched__body>span+span::before{content:' ● ';vertical-align:top;display:inline-block;margin:0 .5em}.online-prestige-rate{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.online-prestige-rate>svg{width:1.3em !important;height:1.3em !important}.online-prestige-rate>span{font-weight:600;font-size:1.1em;padding-left:.7em}.online-empty{line-height:1.4}.online-empty__title{font-size:1.8em;margin-bottom:.3em}.online-empty__time{font-size:1.2em;font-weight:300;margin-bottom:1.6em}.online-empty__buttons{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.online-empty__buttons>*+*{margin-left:1em}.online-empty__button{background:rgba(0,0,0,0.3);font-size:1.2em;padding:.5em 1.2em;-webkit-border-radius:.2em;border-radius:.2em;margin-bottom:2.4em}.online-empty__button.focus{background:#fff;color:black}.online-empty__templates .online-empty-template:nth-child(2){opacity:.5}.online-empty__templates .online-empty-template:nth-child(3){opacity:.2}.online-empty-template{background-color:rgba(255,255,255,0.3);padding:1em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-border-radius:.3em;border-radius:.3em}.online-empty-template>*{background:rgba(0,0,0,0.3);-webkit-border-radius:.3em;border-radius:.3em}.online-empty-template__ico{width:4em;height:4em;margin-right:2.4em}.online-empty-template__body{height:1.7em;width:70%}.online-empty-template+.online-empty-template{margin-top:1em}\n        </style>\n    ");
      $('body').append(Lampa.Template.get('online_prestige_css', {}, true));
      function resetTemplates() {
        Lampa.Template.add('online_prestige_full', "<div class=\"online-prestige online-prestige--full selector\">\n            <div class=\"online-prestige__img\">\n                <img alt=\"\">\n                <div class=\"online-prestige__loader\"></div>\n            </div>\n            <div class=\"online-prestige__body\">\n                <div class=\"online-prestige__head\">\n                    <div class=\"online-prestige__title\">{title}</div>\n                    <div class=\"online-prestige__time\">{time}</div>\n                </div>\n\n                <div class=\"online-prestige__timeline\"></div>\n\n                <div class=\"online-prestige__footer\">\n                    <div class=\"online-prestige__info\">{info}</div>\n                    <div class=\"online-prestige__quality\">{quality}</div>\n                </div>\n            </div>\n        </div>");
        Lampa.Template.add('online_does_not_answer', "<div class=\"online-empty\">\n            <div class=\"online-empty__title\">\n                #{online_balanser_dont_work}\n            </div>\n            <div class=\"online-empty__time\">\n                #{online_balanser_timeout}\n            </div>\n            <div class=\"online-empty__buttons\">\n                <div class=\"online-empty__button selector cancel\">#{cancel}</div>\n                <div class=\"online-empty__button selector change\">#{online_change_balanser}</div>\n            </div>\n            <div class=\"online-empty__templates\">\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n            </div>\n        </div>");
        Lampa.Template.add('online_prestige_rate', "<div class=\"online-prestige-rate\">\n            <svg width=\"17\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M8.39409 0.192139L10.99 5.30994L16.7882 6.20387L12.5475 10.4277L13.5819 15.9311L8.39409 13.2425L3.20626 15.9311L4.24065 10.4277L0 6.20387L5.79819 5.30994L8.39409 0.192139Z\" fill=\"#fff\"></path>\n            </svg>\n            <span>{rate}</span>\n        </div>");
        Lampa.Template.add('online_prestige_folder', "<div class=\"online-prestige online-prestige--folder selector\">\n            <div class=\"online-prestige__folder\">\n                <svg viewBox=\"0 0 128 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect y=\"20\" width=\"128\" height=\"92\" rx=\"13\" fill=\"white\"></rect>\n                    <path d=\"M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z\" fill=\"white\" fill-opacity=\"0.23\"></path>\n                    <rect x=\"11\" y=\"8\" width=\"106\" height=\"76\" rx=\"13\" fill=\"white\" fill-opacity=\"0.51\"></rect>\n                </svg>\n            </div>\n            <div class=\"online-prestige__body\">\n                <div class=\"online-prestige__head\">\n                    <div class=\"online-prestige__title\">{title}</div>\n                    <div class=\"online-prestige__time\">{time}</div>\n                </div>\n\n                <div class=\"online-prestige__footer\">\n                    <div class=\"online-prestige__info\">{info}</div>\n                </div>\n            </div>\n        </div>");
        Lampa.Template.add('online_prestige_watched', "<div class=\"online-prestige online-prestige-watched selector\">\n            <div class=\"online-prestige-watched__icon\">\n                <svg width=\"21\" height=\"21\" viewBox=\"0 0 21 21\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <circle cx=\"10.5\" cy=\"10.5\" r=\"9\" stroke=\"currentColor\" stroke-width=\"3\"/>\n                    <path d=\"M14.8477 10.5628L8.20312 14.399L8.20313 6.72656L14.8477 10.5628Z\" fill=\"currentColor\"/>\n                </svg>\n            </div>\n            <div class=\"online-prestige-watched__body\">\n                \n            </div>\n        </div>");
      }
      var button = "<div class=\"full-start__button selector view--online\" data-subtitle=\"Prestige v".concat(manifest.version, "\">\n        <svg width=\"135\" height=\"147\" viewBox=\"0 0 135 147\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M121.5 96.8823C139.5 86.49 139.5 60.5092 121.5 50.1169L41.25 3.78454C23.25 -6.60776 0.750004 6.38265 0.750001 27.1673L0.75 51.9742C4.70314 35.7475 23.6209 26.8138 39.0547 35.7701L94.8534 68.1505C110.252 77.0864 111.909 97.8693 99.8725 109.369L121.5 96.8823Z\" fill=\"currentColor\"/>\n            <path d=\"M63 84.9836C80.3333 94.991 80.3333 120.01 63 130.017L39.75 143.44C22.4167 153.448 0.749999 140.938 0.75 120.924L0.750001 94.0769C0.750002 74.0621 22.4167 61.5528 39.75 71.5602L63 84.9836Z\" fill=\"currentColor\"/>\n        </svg>\n\n        <span>#{title_online}</span>\n    </div>");

      // нужна заглушка, а то при страте лампы говорит пусто
      Lampa.Component.add('online_prestige', component);

      //то же самое
      resetTemplates();
      Lampa.Listener.follow('full', function (e) {
        if (e.type == 'complite') {
          var btn = $(Lampa.Lang.translate(button));
          btn.on('hover:enter', function () {
            resetTemplates();
            Lampa.Component.add('online_prestige', component);
            Lampa.Activity.push({
              url: '',
              title: Lampa.Lang.translate('title_online'),
              component: 'online_prestige',
              search: e.data.movie.title,
              search_one: e.data.movie.title,
              search_two: e.data.movie.original_title,
              movie: e.data.movie,
              page: 1
            });
          });
          e.object.activity.render().find('.view--torrent').after(btn);
        }
      });

      ///////ONLINE/////////

      Lampa.Params.select('online_proxy_all', '', '');
      Lampa.Params.select('online_proxy_videocdn', '', '');
      Lampa.Params.select('online_proxy_rezka', '', '');
      Lampa.Params.select('online_proxy_kinobase', '', '');
      Lampa.Params.select('online_proxy_collaps', '', '');
      Lampa.Template.add('settings_proxy', "<div>\n        <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_all\" placeholder=\"#{online_proxy_placeholder}\">\n            <div class=\"settings-param__name\">#{online_proxy_title}</div>\n            <div class=\"settings-param__value\"></div>\n            <div class=\"settings-param__descr\">#{online_proxy_descr}</div>\n        </div>\n\n        <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_videocdn\" placeholder=\"#{online_proxy_placeholder}\">\n            <div class=\"settings-param__name\">Videocdn</div>\n            <div class=\"settings-param__value\"></div>\n        </div>\n\n        <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_rezka\" placeholder=\"#{online_proxy_placeholder}\">\n            <div class=\"settings-param__name\">Rezka</div>\n            <div class=\"settings-param__value\"></div>\n        </div>\n\n        <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_kinobase\" placeholder=\"#{online_proxy_placeholder}\">\n            <div class=\"settings-param__name\">Kinobase</div>\n            <div class=\"settings-param__value\"></div>\n        </div>\n\n        <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_collaps\" placeholder=\"#{online_proxy_placeholder}\">\n            <div class=\"settings-param__name\">Collaps</div>\n            <div class=\"settings-param__value\"></div>\n        </div>\n    </div>");
      function addSettingsProxy() {
        if (Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="proxy"]').length) {
          var field = $(Lampa.Lang.translate("<div class=\"settings-folder selector\" data-component=\"proxy\">\n                <div class=\"settings-folder__icon\">\n                    <svg height=\"46\" viewBox=\"0 0 42 46\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"1.5\" y=\"26.5\" width=\"39\" height=\"18\" rx=\"1.5\" stroke=\"white\" stroke-width=\"3\"/>\n                    <circle cx=\"9.5\" cy=\"35.5\" r=\"3.5\" fill=\"white\"/>\n                    <circle cx=\"26.5\" cy=\"35.5\" r=\"2.5\" fill=\"white\"/>\n                    <circle cx=\"32.5\" cy=\"35.5\" r=\"2.5\" fill=\"white\"/>\n                    <circle cx=\"21.5\" cy=\"5.5\" r=\"5.5\" fill=\"white\"/>\n                    <rect x=\"31\" y=\"4\" width=\"11\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                    <rect y=\"4\" width=\"11\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                    <rect x=\"20\" y=\"14\" width=\"3\" height=\"7\" rx=\"1.5\" fill=\"white\"/>\n                    </svg>\n                </div>\n                <div class=\"settings-folder__name\">#{title_proxy}</div>\n            </div>"));
          Lampa.Settings.main().render().find('[data-component="more"]').after(field);
          Lampa.Settings.main().update();
        }
      }
      if (window.appready) addSettingsProxy();else {
        Lampa.Listener.follow('app', function (e) {
          if (e.type == 'ready') addSettingsProxy();
        });
      }

      ///////FILMIX/////////

      var network = new Lampa.Reguest();
      var api_url = 'http://filmixapp.cyou/api/v2/';
      var user_dev = '?user_dev_apk=1.1.3&user_dev_id=' + Lampa.Utils.uid(16) + '&user_dev_name=Xiaomi&user_dev_os=11&user_dev_vendor=Xiaomi&user_dev_token=';
      var ping_auth;
      Lampa.Params.select('filmix_token', '', '');
      Lampa.Template.add('settings_filmix', "<div>\n        <div class=\"settings-param selector\" data-name=\"filmix_token\" data-type=\"input\" placeholder=\"#{filmix_param_placeholder}\">\n            <div class=\"settings-param__name\">#{filmix_param_add_title}</div>\n            <div class=\"settings-param__value\"></div>\n            <div class=\"settings-param__descr\">#{filmix_param_add_descr}</div>\n        </div>\n        <div class=\"settings-param selector\" data-name=\"filmix_add\" data-static=\"true\">\n            <div class=\"settings-param__name\">#{filmix_param_add_device}</div>\n        </div>\n    </div>");
      Lampa.Storage.listener.follow('change', function (e) {
        if (e.name == 'filmix_token') {
          if (e.value) checkPro(e.value);else {
            Lampa.Storage.set("filmix_status", {});
            showStatus();
          }
        }
      });
      function setFilmixQuality() {
        var timeZone = 'Europe/Kiev';
        var quality = 480;
        try {
          var formatter = new Intl.DateTimeFormat('uk-UA', {
            hour: 'numeric',
            timeZone: timeZone
          });
          var currentTime = formatter.format(new Date());
          quality = parseInt(currentTime) >= 19 && parseInt(currentTime) <= 23 ? 480 : 720;
        } catch (e) {}
        if (!window.filmix) {
          window.filmix = {
            max_qualitie: quality,
            is_max_qualitie: false
          };
        } else {
          if (window.filmix.max_qualitie == 720 || window.filmix.max_qualitie == 480) window.filmix.max_qualitie = quality;
        }
      }
      setInterval(setFilmixQuality, 10000);
      function addSettingsFilmix() {
        if (Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="filmix"]').length) {
          var field = $("<div class=\"settings-folder selector\" data-component=\"filmix\">\n                <div class=\"settings-folder__icon\">\n                    <svg height=\"57\" viewBox=\"0 0 58 57\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z\" fill=\"white\"/>\n                    <rect x=\"2\" y=\"2\" width=\"54\" height=\"53\" rx=\"5\" stroke=\"white\" stroke-width=\"4\"/>\n                    </svg>\n                </div>\n                <div class=\"settings-folder__name\">Filmix</div>\n            </div>");
          Lampa.Settings.main().render().find('[data-component="more"]').after(field);
          Lampa.Settings.main().update();
        }
      }
      if (window.appready) addSettingsFilmix();else {
        Lampa.Listener.follow('app', function (e) {
          if (e.type == 'ready') addSettingsFilmix();
        });
      }
      setFilmixQuality();
      Lampa.Settings.listener.follow('open', function (e) {
        if (e.name == 'filmix') {
          e.body.find('[data-name="filmix_add"]').unbind('hover:enter').on('hover:enter', function () {
            var user_code = '';
            var user_token = '';
            var modal = $('<div><div class="broadcast__text">' + Lampa.Lang.translate('filmix_modal_text') + '</div><div class="broadcast__device selector" style="text-align: center">' + Lampa.Lang.translate('filmix_modal_wait') + '...</div><br><div class="broadcast__scan"><div></div></div></div></div>');
            Lampa.Modal.open({
              title: '',
              html: modal,
              onBack: function onBack() {
                Lampa.Modal.close();
                Lampa.Controller.toggle('settings_component');
                clearInterval(ping_auth);
              },
              onSelect: function onSelect() {
                Lampa.Utils.copyTextToClipboard(user_code, function () {
                  Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_secuses'));
                }, function () {
                  Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_fail'));
                });
              }
            });
            ping_auth = setInterval(function () {
              checkPro(user_token, function () {
                Lampa.Modal.close();
                clearInterval(ping_auth);
                Lampa.Storage.set("filmix_token", user_token);
                e.body.find('[data-name="filmix_token"] .settings-param__value').text(user_token);
                Lampa.Controller.toggle('settings_component');
              });
            }, 10000);
            network.clear();
            network.timeout(10000);
            network.quiet(api_url + 'token_request' + user_dev, function (found) {
              if (found.status == 'ok') {
                user_token = found.code;
                user_code = found.user_code;
                modal.find('.selector').text(user_code);
              } else {
                Lampa.Noty.show(found);
              }
            }, function (a, c) {
              Lampa.Noty.show(network.errorDecode(a, c));
            });
          });
          showStatus();
        }
      });
      function showStatus() {
        var status = Lampa.Storage.get("filmix_status", '{}');
        var info = Lampa.Lang.translate('filmix_nodevice');
        if (status.login) {
          if (status.is_pro) info = status.login + ' - PRO ' + Lampa.Lang.translate('filter_rating_to') + ' - ' + status.pro_date;else if (status.is_pro_plus) info = status.login + ' - PRO_PLUS ' + Lampa.Lang.translate('filter_rating_to') + ' - ' + status.pro_date;else info = status.login + ' - NO PRO';
        }
        var field = $(Lampa.Lang.translate("\n            <div class=\"settings-param\" data-name=\"filmix_status\" data-static=\"true\">\n                <div class=\"settings-param__name\">#{title_status}</div>\n                <div class=\"settings-param__value\">".concat(info, "</div>\n            </div>")));
        $('.settings [data-name="filmix_status"]').remove();
        $('.settings [data-name="filmix_add"]').after(field);
      }
      function checkPro(token, call) {
        network.clear();
        network.timeout(8000);
        network.silent(api_url + 'user_profile' + user_dev + token, function (json) {
          if (json) {
            if (json.user_data) {
              Lampa.Storage.set("filmix_status", json.user_data);
              if (call) call();
            } else {
              Lampa.Storage.set("filmix_status", {});
            }
            showStatus();
          }
        }, function (a, c) {
          Lampa.Noty.show(network.errorDecode(a, c));
        });
      }
      if (Lampa.Manifest.app_digital >= 177) {
        Lampa.Storage.sync('online_choice_videocdn', 'object_object');
        Lampa.Storage.sync('online_choice_rezka', 'object_object');
        Lampa.Storage.sync('online_choice_kinobase', 'object_object');
        Lampa.Storage.sync('online_choice_collaps', 'object_object');
        Lampa.Storage.sync('online_choice_filmix', 'object_object');
        Lampa.Storage.sync('online_watched_last', 'object_object');
      }
    }
    if (!window.online_prestige && Lampa.Manifest.app_digital >= 155) startPlugin();

})();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25saW5lX3ByZXN0aWdlLmpzIiwic291cmNlcyI6WyJvbmxpbmVfcHJlc3RpZ2UvYmFsYW5zZXJzL3ZpZGVvY2RuLmpzIiwib25saW5lX3ByZXN0aWdlL2JhbGFuc2Vycy9yZXprYS5qcyIsIm9ubGluZV9wcmVzdGlnZS9iYWxhbnNlcnMva2lub2Jhc2UuanMiLCJvbmxpbmVfcHJlc3RpZ2UvYmFsYW5zZXJzL2NvbGxhcHMuanMiLCJvbmxpbmVfcHJlc3RpZ2UvYmFsYW5zZXJzL2ZpbG1peC5qcyIsIm9ubGluZV9wcmVzdGlnZS9jb21wb25lbnQuanMiLCJvbmxpbmVfcHJlc3RpZ2Uvb25saW5lX3ByZXN0aWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHZpZGVvY2RuKGNvbXBvbmVudCwgX29iamVjdCl7XG4gICAgbGV0IG5ldHdvcmsgID0gbmV3IExhbXBhLlJlZ3Vlc3QoKVxuICAgIGxldCBleHRyYWN0ICA9IHt9XG4gICAgbGV0IHJlc3VsdHMgID0gW11cbiAgICBsZXQgb2JqZWN0ICAgPSBfb2JqZWN0XG4gICAgbGV0IGdldF9saW5rc193YWl0ID0gZmFsc2VcblxuICAgIGxldCBmaWx0ZXJfaXRlbXMgPSB7fVxuXG4gICAgbGV0IGNob2ljZSA9IHtcbiAgICAgICAgc2Vhc29uOiAwLFxuICAgICAgICB2b2ljZTogMCxcbiAgICAgICAgdm9pY2VfbmFtZTogJydcbiAgICB9XG5cbiAgICB0aGlzLnNlYXJjaCA9IGZ1bmN0aW9uKF9vYmplY3QsIGRhdGEpe1xuICAgICAgICBvYmplY3QgPSBfb2JqZWN0XG5cbiAgICAgICAgZ2V0X2xpbmtzX3dhaXQgPSB0cnVlXG5cbiAgICAgICAgbGV0IHVybCAgPSBjb21wb25lbnQucHJveHkoJ3ZpZGVvY2RuJykgKyAnaHR0cHM6Ly92aWRlb2Nkbi50di9hcGkvJ1xuICAgICAgICBsZXQgaXRtICA9IGRhdGFbMF1cblxuICAgICAgICBpZighaXRtLmlmcmFtZV9zcmMpIHJldHVybiBjb21wb25lbnQuZG9lc05vdEFuc3dlcigpXG5cbiAgICAgICAgbGV0IHR5cGUgPSBpdG0uaWZyYW1lX3NyYy5zcGxpdCgnLycpLnNsaWNlKC0yKVswXVxuXG4gICAgICAgIGlmKHR5cGUgPT0gJ21vdmllJykgdHlwZSA9ICdtb3ZpZXMnXG5cbiAgICAgICAgdXJsICs9IHR5cGVcblxuICAgICAgICB1cmwgPSBMYW1wYS5VdGlscy5hZGRVcmxDb21wb25lbnQodXJsLCdhcGlfdG9rZW49M2k0MEc1VFNFQ21MRjc3b0FxbkVnYng2MVpXYU9ZYUUnKVxuICAgICAgICB1cmwgPSBMYW1wYS5VdGlscy5hZGRVcmxDb21wb25lbnQodXJsLCdxdWVyeT0nK2VuY29kZVVSSUNvbXBvbmVudChpdG0uaW1kYl9pZCA/IGl0bS5pbWRiX2lkIDogaXRtLnRpdGxlKSlcbiAgICAgICAgdXJsID0gTGFtcGEuVXRpbHMuYWRkVXJsQ29tcG9uZW50KHVybCwnZmllbGQ9JytlbmNvZGVVUklDb21wb25lbnQoaXRtLmltZGJfaWQgPyAnaW1kYl9pZCcgOiAndGl0bGUnKSlcblxuICAgICAgICBuZXR3b3JrLnNpbGVudCh1cmwsIChmb3VuZCkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0cyA9IGZvdW5kLmRhdGEuZmlsdGVyKGVsZW09PmVsZW0uaWQgPT0gaXRtLmlkKVxuXG4gICAgICAgICAgICBpZighcmVzdWx0cy5sZW5ndGgpIGNvbXBvbmVudC5kb2VzTm90QW5zd2VyKClcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlc3VsdHMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoKGUpe1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuZG9lc05vdEFuc3dlcigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb21wb25lbnQubG9hZGluZyhmYWxzZSlcbiAgICAgICAgfSwoYSxjKT0+e1xuICAgICAgICAgICAgY29tcG9uZW50LmRvZXNOb3RBbnN3ZXIoKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZXh0ZW5kQ2hvaWNlID0gZnVuY3Rpb24oc2F2ZWQpe1xuICAgICAgICBMYW1wYS5BcnJheXMuZXh0ZW5kKGNob2ljZSwgc2F2ZWQsIHRydWUpXG4gICAgfVxuXG4gICAgdGhpcy5yZXNldCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbXBvbmVudC5yZXNldCgpXG5cbiAgICAgICAgY2hvaWNlID0ge1xuICAgICAgICAgICAgc2Vhc29uOiAwLFxuICAgICAgICAgICAgdm9pY2U6IDAsXG4gICAgICAgICAgICB2b2ljZV9uYW1lOiAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgZmlsdGVyKClcblxuICAgICAgICBhcHBlbmQoZmlsdHJlZCgpKVxuICAgIH1cblxuICAgIHRoaXMuZmlsdGVyID0gZnVuY3Rpb24odHlwZSwgYSwgYil7XG4gICAgICAgIGNob2ljZVthLnN0eXBlXSA9IGIuaW5kZXhcblxuICAgICAgICBpZihhLnN0eXBlID09ICd2b2ljZScpe1xuICAgICAgICAgICAgY2hvaWNlLnZvaWNlX25hbWUgPSBmaWx0ZXJfaXRlbXMudm9pY2VbYi5pbmRleF1cbiAgICAgICAgfSBcblxuICAgICAgICBjb21wb25lbnQucmVzZXQoKVxuXG4gICAgICAgIGZpbHRlcigpXG5cbiAgICAgICAgYXBwZW5kKGZpbHRyZWQoKSlcbiAgICB9XG5cbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICBuZXR3b3JrLmNsZWFyKClcblxuICAgICAgICByZXN1bHRzID0gbnVsbFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN1Y2Nlc3MoanNvbil7XG4gICAgICAgIHJlc3VsdHMgPSBqc29uXG5cbiAgICAgICAgZXh0cmFjdERhdGEoanNvbilcblxuICAgICAgICBmaWx0ZXIoKVxuXG4gICAgICAgIGFwcGVuZChmaWx0cmVkKCkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0cmFjdEl0ZW1zKHN0ciwgbWF4X3F1YWxpdHkpe1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgaXRlbXMgPSBzdHIuc3BsaXQoJywnKS5tYXAoaXRlbT0+e1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6IHBhcnNlSW50KGl0ZW0ubWF0Y2goL1xcWyhcXGQrKXBcXF0vKVsxXSksXG4gICAgICAgICAgICAgICAgICAgIGZpbGU6ICdodHRwOicgKyBpdGVtLnJlcGxhY2UoL1xcW1xcZCtwXFxdLywnJykuc3BsaXQoJyBvciAnKVswXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmZpbHRlcihpdGVtPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucXVhbGl0eSA8PSBtYXhfcXVhbGl0eVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaXRlbXMuc29ydCgoYSxiKT0+e1xuICAgICAgICAgICAgICAgIHJldHVybiBiLnF1YWxpdHkgLSBhLnF1YWxpdHlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHJldHVybiBpdGVtc1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoKGUpe31cblxuICAgICAgICByZXR1cm4gW11cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRyYWN0RGF0YShyZXN1bHRzKXtcbiAgICAgICAgbmV0d29yay50aW1lb3V0KDIwMDAwKVxuXG4gICAgICAgIGxldCBtb3ZpZSA9IHJlc3VsdHMuc2xpY2UoMCwxKVswXVxuXG4gICAgICAgIGV4dHJhY3QgPSB7fVxuXG4gICAgICAgIGlmKG1vdmllKXtcbiAgICAgICAgICAgIGxldCBzcmMgPSBtb3ZpZS5pZnJhbWVfc3JjO1xuICAgICAgICAgICAgbGV0IG1ldGEgPSAkKCdoZWFkIG1ldGFbbmFtZT1cInJlZmVycmVyXCJdJylcbiAgICAgICAgICAgIGxldCByZWZlcnJlciA9IG1ldGEuYXR0cignY29udGVudCcpIHx8ICduZXZlcidcblxuICAgICAgICAgICAgbWV0YS5hdHRyKCdjb250ZW50JywndW5zYWZlLXVybCcpXG5cbiAgICAgICAgICAgIG5ldHdvcmsuc2lsZW50KCdodHRwczonK3NyYywocmF3KT0+e1xuICAgICAgICAgICAgICAgIG1ldGEuYXR0cignY29udGVudCcscmVmZXJyZXIpXG5cbiAgICAgICAgICAgICAgICBnZXRfbGlua3Nfd2FpdCA9IGZhbHNlXG5cbiAgICAgICAgICAgICAgICBjb21wb25lbnQucmVuZGVyKCkuZmluZCgnLm9ubGluZS1wcmVzdGlnZV9fc2Nhbi1maWxlJykucmVtb3ZlKClcblxuICAgICAgICAgICAgICAgIGxldCBtYXRoID0gcmF3LnJlcGxhY2UoL1xcbi9nLCcnKS5tYXRjaCgvaWQ9XCJmaWxlc1wiIHZhbHVlPVwiKC4qPylcIi8pXG5cbiAgICAgICAgICAgICAgICBpZighbWF0aCkgbWF0aCA9IHJhdy5yZXBsYWNlKC9cXG4vZywnJykubWF0Y2goL2lkPVwiZmlsZXNcIiB2YWx1ZT0nKC4qPyknLylcblxuICAgICAgICAgICAgICAgIGlmKG1hdGgpe1xuICAgICAgICAgICAgICAgICAgICBsZXQganNvbiA9IExhbXBhLkFycmF5cy5kZWNvZGVKc29uKG1hdGhbMV0ucmVwbGFjZSgvJnF1b3Q7L2csJ1wiJykse30pXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpXG5cbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpIGluIGpzb24pe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IChpIC0gMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC5pbm5lckhUTUwgPSBqc29uW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYXhfcXVhbGl0eSA9IG1vdmllLm1lZGlhPy5maWx0ZXIob2JqID0+IG9iai50cmFuc2xhdGlvbl9pZCA9PT0gKGkgLSAwKSlbMF0/Lm1heF9xdWFsaXR5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1heF9xdWFsaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4X3F1YWxpdHkgPSBtb3ZpZS50cmFuc2xhdGlvbnM/LmZpbHRlcihvYmogPT4gb2JqLmlkID09PSAoaSAtIDApKVswXT8ubWF4X3F1YWxpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhY3RbaV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganNvbjogTGFtcGEuQXJyYXlzLmRlY29kZUpzb24odGV4dC52YWx1ZSx7fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IGV4dHJhY3RJdGVtcyhqc29uW2ldLCBtYXhfcXVhbGl0eSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBhIGluIGV4dHJhY3RbaV0uanNvbil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsZW0gPSBleHRyYWN0W2ldLmpzb25bYV1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW0uZm9sZGVyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBmIGluIGVsZW0uZm9sZGVyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb2xkZXIgPSBlbGVtLmZvbGRlcltmXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2xkZXIuaXRlbXMgPSBleHRyYWN0SXRlbXMoZm9sZGVyLmZpbGUsIG1heF9xdWFsaXR5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgZWxlbS5pdGVtcyA9IGV4dHJhY3RJdGVtcyhlbGVtLmZpbGUsIG1heF9xdWFsaXR5KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCgpPT57XG4gICAgICAgICAgICAgICAgbWV0YS5hdHRyKCdjb250ZW50JyxyZWZlcnJlcilcblxuICAgICAgICAgICAgICAgIGdldF9saW5rc193YWl0ID0gZmFsc2VcblxuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5yZW5kZXIoKS5maW5kKCcub25saW5lLXByZXN0aWdlX19zY2FuLWZpbGUnKS5yZW1vdmUoKVxuICAgICAgICAgICAgfSxmYWxzZSx7ZGF0YVR5cGU6ICd0ZXh0J30pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaWxlKGVsZW1lbnQpe1xuICAgICAgICBsZXQgdHJhbnNsYXQgPSBleHRyYWN0W2VsZW1lbnQudHJhbnNsYXRpb25dXG4gICAgICAgIGxldCBpZCAgICAgICA9IGVsZW1lbnQuc2Vhc29uKydfJytlbGVtZW50LmVwaXNvZGVcbiAgICAgICAgbGV0IGZpbGUgICAgID0gJydcbiAgICAgICAgbGV0IGl0ZW1zICAgID0gW11cbiAgICAgICAgbGV0IHF1YWxpdHkgID0gZmFsc2VcblxuICAgICAgICBpZih0cmFuc2xhdCl7XG4gICAgICAgICAgICBpZihlbGVtZW50LnNlYXNvbil7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpIGluIHRyYW5zbGF0Lmpzb24pe1xuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbSA9IHRyYW5zbGF0Lmpzb25baV1cblxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtLmZvbGRlcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGYgaW4gZWxlbS5mb2xkZXIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb2xkZXIgPSBlbGVtLmZvbGRlcltmXVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZm9sZGVyLmlkID09IGlkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMgPSBmb2xkZXIuaXRlbXNcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihlbGVtLmlkID09IGlkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zID0gZWxlbS5pdGVtc1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBpdGVtcyA9IHRyYW5zbGF0Lml0ZW1zXG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG5cbiAgICAgICAgaWYoaXRlbXMgJiYgaXRlbXMubGVuZ3RoKXtcbiAgICAgICAgICAgIHF1YWxpdHkgPSB7fVxuXG4gICAgICAgICAgICBsZXQgbWFzcyA9IFs3MjAsNDgwLDM2MF1cblxuICAgICAgICAgICAgaWYoTGFtcGEuQWNjb3VudC5oYXNQcmVtaXVtKCkpIExhbXBhLkFycmF5cy5pbnNlcnQobWFzcywwLDEwODApXG5cbiAgICAgICAgICAgICAgICBtYXNzLmZvckVhY2goKG4pPT57XG4gICAgICAgICAgICAgICAgICAgIGxldCBleGVzID0gaXRlbXMuZmluZChhPT5hLnF1YWxpdHkgPT0gbilcblxuICAgICAgICAgICAgICAgICAgICBpZihleGVzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFmaWxlKSBmaWxlID0gZXhlcy5maWxlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHlbbiArICdwJ10gPSBleGVzLmZpbGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGxldCBwcmVmZXJhYmx5ID0gTGFtcGEuU3RvcmFnZS5nZXQoJ3ZpZGVvX3F1YWxpdHlfZGVmYXVsdCcsJzEwODAnKSArICdwJ1xuICAgICAgICBcbiAgICAgICAgICAgIGlmKHF1YWxpdHlbcHJlZmVyYWJseV0pIGZpbGUgPSBxdWFsaXR5W3ByZWZlcmFibHldXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgIHF1YWxpdHk6IHF1YWxpdHlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRlcigpe1xuICAgICAgICBmaWx0ZXJfaXRlbXMgID0ge1xuICAgICAgICAgICAgc2Vhc29uOiBbXSxcbiAgICAgICAgICAgIHZvaWNlOiBbXSxcbiAgICAgICAgICAgIHZvaWNlX2luZm86IFtdXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJlc3VsdHMuc2xpY2UoMCwxKS5mb3JFYWNoKG1vdmllID0+IHtcbiAgICAgICAgICAgIGxldCBzZWFzb25zID0gbW92aWUuc2Vhc29uX2NvdW50IHx8IG9iamVjdC5tb3ZpZS5udW1iZXJfb2Zfc2Vhc29uc1xuXG4gICAgICAgICAgICBpZihzZWFzb25zKXtcbiAgICAgICAgICAgICAgICBsZXQgcyA9IHNlYXNvbnNcblxuICAgICAgICAgICAgICAgIHdoaWxlKHMtLSl7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcl9pdGVtcy5zZWFzb24ucHVzaChMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndG9ycmVudF9zZXJpYWxfc2Vhc29uJykgKyAnICcgKyAoc2Vhc29ucyAtIHMpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoZmlsdGVyX2l0ZW1zLnNlYXNvbi5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIG1vdmllLmVwaXNvZGVzLmZvckVhY2goZXBpc29kZT0+e1xuICAgICAgICAgICAgICAgICAgICBpZihlcGlzb2RlLnNlYXNvbl9udW0gPT0gY2hvaWNlLnNlYXNvbiArIDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXBpc29kZS5tZWRpYS5mb3JFYWNoKG1lZGlhPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWZpbHRlcl9pdGVtcy52b2ljZV9pbmZvLmZpbmQodj0+di5pZCA9PSBtZWRpYS50cmFuc2xhdGlvbi5pZCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJfaXRlbXMudm9pY2UucHVzaChtZWRpYS50cmFuc2xhdGlvbi5zaG9ydGVyX3RpdGxlIHx8IG1lZGlhLnRyYW5zbGF0aW9uLnNob3J0X3RpdGxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJfaXRlbXMudm9pY2VfaW5mby5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBtZWRpYS50cmFuc2xhdGlvbi5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmKGNob2ljZS52b2ljZV9uYW1lKXtcbiAgICAgICAgICAgIGxldCBpbnggPSBmaWx0ZXJfaXRlbXMudm9pY2UubWFwKHY9PnYudG9Mb3dlckNhc2UoKSkuaW5kZXhPZihjaG9pY2Uudm9pY2VfbmFtZS50b0xvd2VyQ2FzZSgpKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihpbnggPT0gLTEpIGNob2ljZS52b2ljZSA9IDBcbiAgICAgICAgICAgIGVsc2UgaWYoaW54ICE9PSBjaG9pY2Uudm9pY2Upe1xuICAgICAgICAgICAgICAgIGNob2ljZS52b2ljZSA9IGlueFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9uZW50LmZpbHRlcihmaWx0ZXJfaXRlbXMsIGNob2ljZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaWx0cmVkKCl7XG4gICAgICAgIGxldCBmaWx0cmVkID0gW11cblxuICAgICAgICBpZihvYmplY3QubW92aWUubmFtZSl7XG4gICAgICAgICAgICByZXN1bHRzLnNsaWNlKDAsMSkuZm9yRWFjaChtb3ZpZT0+e1xuICAgICAgICAgICAgICAgIG1vdmllLmVwaXNvZGVzLmZvckVhY2goZXBpc29kZT0+e1xuICAgICAgICAgICAgICAgICAgICBpZihlcGlzb2RlLnNlYXNvbl9udW0gPT0gY2hvaWNlLnNlYXNvbiArIDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXAgICA9IGVwaXNvZGUubWVkaWEubWFwKG09Pm0pXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdW5pcXVlID0gW11cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcC5zb3J0KChhLGIpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGIubWF4X3F1YWxpdHkgLSBhLm1heF9xdWFsaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wLmZvckVhY2gobT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCF1bmlxdWUuZmluZChhPT5hLnRyYW5zbGF0aW9uLmlkID09IG0udHJhbnNsYXRpb24uaWQpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pcXVlLnB1c2gobSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlcGlzb2RlLm1lZGlhLmZvckVhY2gobWVkaWE9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtZWRpYS50cmFuc2xhdGlvbi5pZCA9PSBmaWx0ZXJfaXRlbXMudm9pY2VfaW5mb1tjaG9pY2Uudm9pY2VdLmlkICYmIHVuaXF1ZS5pbmRleE9mKG1lZGlhKSAhPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0cmVkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXBpc29kZTogcGFyc2VJbnQoZXBpc29kZS5udW0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vhc29uOiBlcGlzb2RlLnNlYXNvbl9udW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZXBpc29kZS5ydV90aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6IChtZWRpYS5zb3VyY2VfcXVhbGl0eSAgJiYgd2luZG93LmlubmVyV2lkdGggPiA0ODAgPyBtZWRpYS5zb3VyY2VfcXVhbGl0eS50b1VwcGVyQ2FzZSgpICsgJyAtICcgOiAnJykgKyBtZWRpYS5tYXhfcXVhbGl0eSArICdwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBtZWRpYS50cmFuc2xhdGlvbl9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm86IGZpbHRlcl9pdGVtcy52b2ljZVtjaG9pY2Uudm9pY2VdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pY2VfbmFtZTogZmlsdGVyX2l0ZW1zLnZvaWNlW2Nob2ljZS52b2ljZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJlc3VsdHMuc2xpY2UoMCwxKS5mb3JFYWNoKG1vdmllPT57XG4gICAgICAgICAgICAgICAgbW92aWUubWVkaWEuZm9yRWFjaChlbGVtZW50PT57XG4gICAgICAgICAgICAgICAgICAgIGZpbHRyZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZWxlbWVudC50cmFuc2xhdGlvbi5zaG9ydGVyX3RpdGxlIHx8IGVsZW1lbnQudHJhbnNsYXRpb24uc2hvcnRfdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5OiAoZWxlbWVudC5zb3VyY2VfcXVhbGl0eSAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDQ4MCA/IGVsZW1lbnQuc291cmNlX3F1YWxpdHkudG9VcHBlckNhc2UoKSArICcgLSAnIDogJycpICsgZWxlbWVudC5tYXhfcXVhbGl0eSArICdwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBlbGVtZW50LnRyYW5zbGF0aW9uX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdm9pY2VfbmFtZTogZWxlbWVudC50cmFuc2xhdGlvbi5zaG9ydGVyX3RpdGxlIHx8IGVsZW1lbnQudHJhbnNsYXRpb24uc2hvcnRfdGl0bGVcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmaWx0cmVkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9QbGF5RWxlbWVudChlbGVtZW50KXtcbiAgICAgICAgbGV0IGV4dHJhID0gZ2V0RmlsZShlbGVtZW50LCBlbGVtZW50LnF1YWxpdHkpXG4gICAgICAgIGxldCBwbGF5ICA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBlbGVtZW50LnRpdGxlLFxuICAgICAgICAgICAgdXJsOiBleHRyYS5maWxlLFxuICAgICAgICAgICAgcXVhbGl0eTogZXh0cmEucXVhbGl0eSxcbiAgICAgICAgICAgIHRpbWVsaW5lOiBlbGVtZW50LnRpbWVsaW5lLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGVsZW1lbnQubWFya1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBsYXlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmQoaXRlbXMpe1xuICAgICAgICBjb21wb25lbnQucmVzZXQoKVxuXG4gICAgICAgIGNvbXBvbmVudC5kcmF3KGl0ZW1zLHtcbiAgICAgICAgICAgIG9uUmVuZGVyOiAoaXRlbSwgaHRtbCk9PntcbiAgICAgICAgICAgICAgICBpZihnZXRfbGlua3Nfd2FpdCkgaHRtbC5maW5kKCcub25saW5lLXByZXN0aWdlX19ib2R5JykuYXBwZW5kKCQoJzxkaXYgY2xhc3M9XCJvbmxpbmUtcHJlc3RpZ2VfX3NjYW4tZmlsZVwiPjxkaXYgY2xhc3M9XCJicm9hZGNhc3RfX3NjYW5cIj48ZGl2PjwvZGl2PjwvZGl2PjwvZGl2PicpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRW50ZXI6IChpdGVtLCBodG1sKT0+e1xuICAgICAgICAgICAgICAgIGxldCBleHRyYSA9IGdldEZpbGUoaXRlbSwgaXRlbS5xdWFsaXR5KVxuXG4gICAgICAgICAgICAgICAgaWYoZXh0cmEuZmlsZSl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwbGF5bGlzdCA9IFtdXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaXJzdCAgICA9IHRvUGxheUVsZW1lbnQoaXRlbSlcblxuICAgICAgICAgICAgICAgICAgICBpZihpdGVtLnNlYXNvbil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5mb3JFYWNoKGVsZW09PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdC5wdXNoKHRvUGxheUVsZW1lbnQoZWxlbSkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdC5wdXNoKGZpcnN0KVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYocGxheWxpc3QubGVuZ3RoID4gMSkgZmlyc3QucGxheWxpc3QgPSBwbGF5bGlzdFxuXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLlBsYXllci5wbGF5KGZpcnN0KVxuXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLlBsYXllci5wbGF5bGlzdChwbGF5bGlzdClcblxuICAgICAgICAgICAgICAgICAgICBpdGVtLm1hcmsoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIExhbXBhLk5vdHkuc2hvdyhMYW1wYS5MYW5nLnRyYW5zbGF0ZShnZXRfbGlua3Nfd2FpdCA/ICdvbmxpbmVfd2FpdGxpbmsnIDogJ29ubGluZV9ub2xpbmsnKSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNvbnRleHRNZW51OiAoaXRlbSwgaHRtbCwgZGF0YSwgY2FsbCk9PntcbiAgICAgICAgICAgICAgICBjYWxsKGdldEZpbGUoaXRlbSwgaXRlbS5xdWFsaXR5KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZpZGVvY2RuIiwiZnVuY3Rpb24gcmV6a2EoY29tcG9uZW50LCBfb2JqZWN0KXtcbiAgICBsZXQgbmV0d29yayAgICA9IG5ldyBMYW1wYS5SZWd1ZXN0KClcbiAgICBsZXQgZXh0cmFjdCAgICA9IHt9XG4gICAgbGV0IGVtYmVkICAgICAgPSBjb21wb25lbnQucHJveHkoJ3JlemthJykgKyAnaHR0cHM6Ly92b2lkYm9vc3QubmV0LydcbiAgICBsZXQgb2JqZWN0ICAgICA9IF9vYmplY3RcblxuICAgIGxldCBzZWxlY3RfaWQgICAgPSAnJ1xuICAgIGxldCBmaWx0ZXJfaXRlbXMgPSB7fVxuXG4gICAgbGV0IGNob2ljZSA9IHtcbiAgICAgICAgc2Vhc29uOiAwLFxuICAgICAgICB2b2ljZTogMCxcbiAgICAgICAgdm9pY2VfbmFtZTogJydcbiAgICB9XG5cbiAgICB0aGlzLnNlYXJjaEJ5S2lub3BvaXNrID0gZnVuY3Rpb24oX29iamVjdCwgaWQpe1xuICAgICAgICBvYmplY3QgPSBfb2JqZWN0XG5cbiAgICAgICAgc2VsZWN0X2lkID0gaWRcblxuICAgICAgICBnZXRGaXJzdFRyYW5sYXRlKGlkLCAodm9pY2UpPT57XG4gICAgICAgICAgICBnZXRGaWxtKGlkLCB2b2ljZSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLnNlYXJjaEJ5SW1kYklEID0gZnVuY3Rpb24oX29iamVjdCwgaWQpe1xuICAgICAgICBvYmplY3QgPSBfb2JqZWN0XG5cbiAgICAgICAgc2VsZWN0X2lkID0gaWRcblxuICAgICAgICBnZXRGaXJzdFRyYW5sYXRlKGlkLCAodm9pY2UpPT57XG4gICAgICAgICAgICBnZXRGaWxtKGlkLCB2b2ljZSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmV4dGVuZENob2ljZSA9IGZ1bmN0aW9uKHNhdmVkKXtcbiAgICAgICAgTGFtcGEuQXJyYXlzLmV4dGVuZChjaG9pY2UsIHNhdmVkLCB0cnVlKVxuICAgIH1cbiAgICBcbiAgICB0aGlzLnJlc2V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgY29tcG9uZW50LnJlc2V0KClcblxuICAgICAgICBjaG9pY2UgPSB7XG4gICAgICAgICAgICBzZWFzb246IDAsXG4gICAgICAgICAgICB2b2ljZTogMCxcbiAgICAgICAgICAgIHZvaWNlX25hbWU6ICcnXG4gICAgICAgIH1cblxuICAgICAgICBjb21wb25lbnQubG9hZGluZyh0cnVlKVxuXG4gICAgICAgIGdldEZpbG0oc2VsZWN0X2lkKVxuXG4gICAgICAgIGNvbXBvbmVudC5zYXZlQ2hvaWNlKGNob2ljZSlcbiAgICB9XG5cbiAgICB0aGlzLmZpbHRlciA9IGZ1bmN0aW9uKHR5cGUsIGEsIGIpe1xuICAgICAgICBjaG9pY2VbYS5zdHlwZV0gPSBiLmluZGV4XG5cbiAgICAgICAgaWYoYS5zdHlwZSA9PSAndm9pY2UnKSBjaG9pY2Uudm9pY2VfbmFtZSA9IGZpbHRlcl9pdGVtcy52b2ljZVtiLmluZGV4XVxuXG4gICAgICAgIGNvbXBvbmVudC5yZXNldCgpXG5cbiAgICAgICAgZmlsdGVyKClcblxuICAgICAgICBjb21wb25lbnQubG9hZGluZyh0cnVlKVxuXG4gICAgICAgIGdldEZpbG0oc2VsZWN0X2lkLCBleHRyYWN0LnZvaWNlW2Nob2ljZS52b2ljZV0udG9rZW4pXG5cbiAgICAgICAgY29tcG9uZW50LnNhdmVDaG9pY2UoY2hvaWNlKVxuXG4gICAgICAgIHNldFRpbWVvdXQoY29tcG9uZW50LmNsb3NlRmlsdGVyLDEwKVxuICAgIH1cblxuICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIG5ldHdvcmsuY2xlYXIoKVxuXG4gICAgICAgIGV4dHJhY3QgPSBudWxsXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2Vhc29ucyh2b2ljZSwgY2FsbCl7XG4gICAgICAgIGxldCB1cmwgPSBlbWJlZCArICdzZXJpYWwvJyt2b2ljZSsnL2lmcmFtZT9oPWdpZG9ubGluZS5pbydcblxuICAgICAgICBuZXR3b3JrLmNsZWFyKClcbiAgICAgICAgbmV0d29yay50aW1lb3V0KDEwMDAwKVxuXG4gICAgICAgIG5ldHdvcmsubmF0aXZlKHVybCwoc3RyKT0+e1xuICAgICAgICAgICAgZXh0cmFjdERhdGEoc3RyKVxuXG4gICAgICAgICAgICBjYWxsKClcbiAgICAgICAgfSwoYSxjKT0+e1xuICAgICAgICAgICAgY29tcG9uZW50LmRvZXNOb3RBbnN3ZXIoKVxuICAgICAgICB9LGZhbHNlLHtcbiAgICAgICAgICAgIGRhdGFUeXBlOiAndGV4dCdcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaXJzdFRyYW5sYXRlKGlkLCBjYWxsKXtcbiAgICAgICAgbmV0d29yay5jbGVhcigpXG4gICAgICAgIG5ldHdvcmsudGltZW91dCgxMDAwMClcblxuICAgICAgICBuZXR3b3JrLm5hdGl2ZShlbWJlZCArICdlbWJlZC8nK2lkICsgJz9zPTEnLChzdHIpPT57XG4gICAgICAgICAgICBleHRyYWN0RGF0YShzdHIpXG5cbiAgICAgICAgICAgIGlmKGV4dHJhY3Qudm9pY2UubGVuZ3RoKSBjYWxsKGV4dHJhY3Qudm9pY2VbMF0udG9rZW4pXG4gICAgICAgICAgICBlbHNlIGNvbXBvbmVudC5kb2VzTm90QW5zd2VyKClcbiAgICAgICAgfSwoYSxjKT0+e1xuICAgICAgICAgICAgY29tcG9uZW50LmRvZXNOb3RBbnN3ZXIoKVxuICAgICAgICB9LGZhbHNlLHtcbiAgICAgICAgICAgIGRhdGFUeXBlOiAndGV4dCdcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRFbWJlZCh1cmwpe1xuICAgICAgICBuZXR3b3JrLmNsZWFyKClcbiAgICAgICAgbmV0d29yay50aW1lb3V0KDEwMDAwKVxuXG4gICAgICAgIG5ldHdvcmsubmF0aXZlKHVybCwoc3RyKT0+e1xuICAgICAgICAgICAgY29tcG9uZW50LmxvYWRpbmcoZmFsc2UpXG5cbiAgICAgICAgICAgIGV4dHJhY3REYXRhKHN0cilcblxuICAgICAgICAgICAgZmlsdGVyKClcblxuICAgICAgICAgICAgYXBwZW5kKClcbiAgICAgICAgfSwoYSxjKT0+e1xuICAgICAgICAgICAgY29tcG9uZW50LmRvZXNOb3RBbnN3ZXIoKVxuICAgICAgICB9LGZhbHNlLHtcbiAgICAgICAgICAgIGRhdGFUeXBlOiAndGV4dCdcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaWxtKGlkLCB2b2ljZSl7XG4gICAgICAgIG5ldHdvcmsuY2xlYXIoKVxuXG4gICAgICAgIG5ldHdvcmsudGltZW91dCgxMDAwMClcblxuICAgICAgICBsZXQgdXJsID0gZW1iZWRcblxuICAgICAgICBpZih2b2ljZSl7XG4gICAgICAgICAgICBpZihleHRyYWN0LnNlYXNvbi5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIGxldCBzZXMgPSBleHRyYWN0LnNlYXNvbltNYXRoLm1pbihleHRyYWN0LnNlYXNvbi5sZW5ndGgtMSxjaG9pY2Uuc2Vhc29uKV0uaWRcblxuICAgICAgICAgICAgICAgIHVybCArPSAnc2VyaWFsLycrdm9pY2UrJy9pZnJhbWU/cz0nK3NlcysnJmg9Z2lkb25saW5lLmlvJ1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldFNlYXNvbnModm9pY2UsICgpPT57XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGVjayA9IGV4dHJhY3Quc2Vhc29uLmZpbHRlcihzPT5zLmlkID09IHNlcylcblxuICAgICAgICAgICAgICAgICAgICBpZighY2hlY2subGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNob2ljZS5zZWFzb24gPSBleHRyYWN0LnNlYXNvbi5sZW5ndGggLSAxXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IGVtYmVkICsgJ3NlcmlhbC8nK3ZvaWNlKycvaWZyYW1lP3M9JytleHRyYWN0LnNlYXNvbltNYXRoLm1pbihleHRyYWN0LnNlYXNvbi5sZW5ndGgtMSxjaG9pY2Uuc2Vhc29uKV0uaWQrJyZoPWdpZG9ubGluZS5pbydcbiAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGdldEVtYmVkKHVybClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB1cmwgKz0gJ21vdmllLycrdm9pY2UrJy9pZnJhbWU/aD1naWRvbmxpbmUuaW8nXG5cbiAgICAgICAgICAgICAgICBnZXRFbWJlZCh1cmwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHVybCArPSAnZW1iZWQvJytpZFxuICAgICAgICAgICAgdXJsICs9ICc/cz0xJ1xuXG4gICAgICAgICAgICBnZXRFbWJlZCh1cmwpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaWx0ZXIoKXtcbiAgICAgICAgZmlsdGVyX2l0ZW1zICA9IHtcbiAgICAgICAgICAgIHNlYXNvbjogZXh0cmFjdC5zZWFzb24ubWFwKHY9PnYubmFtZSksXG4gICAgICAgICAgICB2b2ljZTogZXh0cmFjdC5zZWFzb24ubGVuZ3RoID8gZXh0cmFjdC52b2ljZS5tYXAodj0+di5uYW1lKSA6IFtdXG4gICAgICAgIH1cblxuICAgICAgICBpZihjaG9pY2Uudm9pY2VfbmFtZSl7XG4gICAgICAgICAgICBsZXQgaW54ID0gZmlsdGVyX2l0ZW1zLnZvaWNlLm1hcCh2PT52LnRvTG93ZXJDYXNlKCkpLmluZGV4T2YoY2hvaWNlLnZvaWNlX25hbWUudG9Mb3dlckNhc2UoKSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoaW54ID09IC0xKSBjaG9pY2Uudm9pY2UgPSAwXG4gICAgICAgICAgICBlbHNlIGlmKGlueCAhPT0gY2hvaWNlLnZvaWNlKXtcbiAgICAgICAgICAgICAgICBjaG9pY2Uudm9pY2UgPSBpbnhcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFleHRyYWN0LnNlYXNvbltjaG9pY2Uuc2Vhc29uXSkgY2hvaWNlLnNlYXNvbiA9IDBcbiAgICAgICAgXG4gICAgICAgIGNvbXBvbmVudC5maWx0ZXIoZmlsdGVyX2l0ZW1zLCBjaG9pY2UpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VTdWJ0aXRsZXMoc3RyKXtcbiAgICAgICAgbGV0IHN1YnRpdGxlID0gc3RyLm1hdGNoKFwic3VidGl0bGUnOiAnKC4qPyknXCIpXG5cbiAgICAgICAgaWYoc3VidGl0bGUpe1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gLTFcblxuICAgICAgICAgICAgcmV0dXJuIHN1YnRpdGxlWzFdLnNwbGl0KCcsJykubWFwKChzYik9PntcbiAgICAgICAgICAgICAgICBsZXQgc3AgPSBzYi5zcGxpdCgnXScpXG5cbiAgICAgICAgICAgICAgICBpbmRleCsrXG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogc3BbMF0uc2xpY2UoMSksXG4gICAgICAgICAgICAgICAgICAgIHVybDogc3AucG9wKCksXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTdHJlYW0oZWxlbWVudCwgY2FsbCwgZXJyb3Ipe1xuICAgICAgICBpZihlbGVtZW50LnN0cmVhbSkgcmV0dXJuIGNhbGwoZWxlbWVudC5zdHJlYW0pXG5cbiAgICAgICAgbGV0IHVybCA9IGVtYmVkXG5cbiAgICAgICAgaWYoZWxlbWVudC5zZWFzb24pe1xuICAgICAgICAgICAgdXJsICs9ICdzZXJpYWwvJytleHRyYWN0LnZvaWNlW2Nob2ljZS52b2ljZV0udG9rZW4rJy9pZnJhbWU/cz0nK2VsZW1lbnQuc2Vhc29uKycmZT0nK2VsZW1lbnQuZXBpc29kZSsnJmg9Z2lkb25saW5lLmlvJ1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB1cmwgKz0gJ21vdmllLycrZWxlbWVudC52b2ljZS50b2tlbisnL2lmcmFtZT9oPWdpZG9ubGluZS5pbydcbiAgICAgICAgfVxuXG4gICAgICAgIG5ldHdvcmsuY2xlYXIoKVxuXG4gICAgICAgIG5ldHdvcmsudGltZW91dCgzMDAwKVxuXG4gICAgICAgIG5ldHdvcmsubmF0aXZlKHVybCwoc3RyKT0+e1xuICAgICAgICAgICAgdmFyIHZpZGVvcyA9IHN0ci5tYXRjaChcImZpbGUnOiAnKC4qPyknXCIpXG5cbiAgICAgICAgICAgIGlmKHZpZGVvcyl7XG4gICAgICAgICAgICAgICAgbGV0IHZpZGVvID0gZGVjb2RlKHZpZGVvc1sxXSksXG4gICAgICAgICAgICAgICAgICAgIHF1c2VkID0gJycsXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gJycsXG4gICAgICAgICAgICAgICAgICAgIG1hc3MgPSBbJzIxNjBwJywnMTQ0MHAnLCcxMDgwcCBVbHRyYScsJzEwODBwJywnNzIwcCcsJzQ4MHAnLCczNjBwJ11cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2aWRlbyA9IHZpZGVvLnNsaWNlKDEpLnNwbGl0KC8sXFxbLykubWFwKChzKT0+e1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcy5zcGxpdCgnXScpWzBdICsgJ10nICsgKHMuaW5kZXhPZignIG9yICcpID4gLTEgPyBzLnNwbGl0KCcgb3InKS5wb3AoKS50cmltKCkgOiBzLnNwbGl0KCddJykucG9wKCkpXG4gICAgICAgICAgICAgICAgfSkuam9pbignWycpXG5cbiAgICAgICAgICAgICAgICBlbGVtZW50LnF1YWxpdHlzID0ge31cblxuICAgICAgICAgICAgICAgIGxldCBwcmVmZXJhYmx5ID0gTGFtcGEuU3RvcmFnZS5nZXQoJ3ZpZGVvX3F1YWxpdHlfZGVmYXVsdCcsJzEwODAnKVxuXG4gICAgICAgICAgICAgICAgbWFzcy5mb3JFYWNoKChuKT0+e1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGluayA9IHZpZGVvLm1hdGNoKG5ldyBSZWdFeHAobiArIFwiXSguKj8pbXA0XCIpKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGxpbmspe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWZpcnN0KSBmaXJzdCA9IGxpbmtbMV0rJ21wNCdcblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5xdWFsaXR5c1tuXSA9IGxpbmtbMV0rJ21wNCdcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobi5pbmRleE9mKHByZWZlcmFibHkpID49IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1c2VkID0gbGlua1sxXSsnbXA0J1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBxdXNlZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBpZighZmlyc3QpIGVsZW1lbnQucXVhbGl0eXMgPSBmYWxzZVxuXG4gICAgICAgICAgICAgICAgaWYoZmlyc3Qpe1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0cmVhbSA9IHF1c2VkIHx8IGZpcnN0XG5cbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdWJ0aXRsZXMgPSBwYXJzZVN1YnRpdGxlcyhzdHIpXG5cbiAgICAgICAgICAgICAgICAgICAgY2FsbChlbGVtZW50LnN0cmVhbSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBlcnJvcigpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGVycm9yKClcblxuICAgICAgICB9LGVycm9yLGZhbHNlLHtcbiAgICAgICAgICAgIGRhdGFUeXBlOiAndGV4dCdcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWNvZGUoZGF0YSkge1xuICAgICAgICBmdW5jdGlvbiBwcm9kdWN0KGl0ZXJhYmxlcywgcmVwZWF0KSB7XG4gICAgICAgICAgICB2YXIgYXJndiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyksXG4gICAgICAgICAgICAgICAgYXJnYyA9IGFyZ3YubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGFyZ2MgPT09IDIgJiYgIWlzTmFOKGFyZ3ZbYXJnYyAtIDFdKSkge1xuICAgICAgICAgICAgICAgIHZhciBjb3BpZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3ZbYXJnYyAtIDFdOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29waWVzLnB1c2goYXJndlswXS5zbGljZSgpKTsgLy8gQ2xvbmVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJndiA9IGNvcGllcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhcmd2LnJlZHVjZShmdW5jdGlvbiB0bChhY2N1bXVsYXRvciwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG1wID0gW107XG4gICAgICAgICAgICAgICAgYWNjdW11bGF0b3IuZm9yRWFjaChmdW5jdGlvbihhMCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uKGExKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAucHVzaChhMC5jb25jYXQoYTEpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRtcDtcbiAgICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgICAgICBbXVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgZnVuY3Rpb24gdW5pdGUoYXJyKSB7XG4gICAgICAgICAgICB2YXIgZmluYWwgPSBbXTtcbiAgICAgICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBmaW5hbC5wdXNoKGUuam9pbihcIlwiKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gZmluYWw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRyYXNoTGlzdCA9IFtcIkBcIiwgXCIjXCIsIFwiIVwiLCBcIl5cIiwgXCIkXCJdO1xuICAgICAgICB2YXIgdHdvID0gdW5pdGUocHJvZHVjdCh0cmFzaExpc3QsIDIpKTtcbiAgICAgICAgdmFyIHRyZWUgPSB1bml0ZShwcm9kdWN0KHRyYXNoTGlzdCwgMykpO1xuICAgICAgICB2YXIgdHJhc2hDb2Rlc1NldCA9IHR3by5jb25jYXQodHJlZSk7XG4gICAgXG4gICAgICAgIHZhciBhcnIgPSBkYXRhLnJlcGxhY2UoXCIjaFwiLCBcIlwiKS5zcGxpdChcIi8vXy8vXCIpO1xuICAgICAgICB2YXIgdHJhc2hTdHJpbmcgPSBhcnIuam9pbignJyk7XG4gICAgXG4gICAgICAgIHRyYXNoQ29kZXNTZXQuZm9yRWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICB0cmFzaFN0cmluZyA9IHRyYXNoU3RyaW5nLnJlcGxhY2UobmV3IFJlZ0V4cChidG9hKGkpLCdnJyksJycpXG4gICAgICAgIH0pXG5cbiAgICAgICAgdmFyIHJlc3VsdCA9ICcnXG5cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgcmVzdWx0ID0gYXRvYih0cmFzaFN0cmluZy5zdWJzdHIoMikpXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2goZSl7fVxuXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRyYWN0RGF0YShzdHIpe1xuICAgICAgICBleHRyYWN0LnZvaWNlICAgPSBbXVxuICAgICAgICBleHRyYWN0LnNlYXNvbiAgPSBbXVxuICAgICAgICBleHRyYWN0LmVwaXNvZGUgPSBbXVxuXG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9cXG4vZywnJylcblxuICAgICAgICBsZXQgdm9pY2VzID0gc3RyLm1hdGNoKCc8c2VsZWN0IG5hbWU9XCJ0cmFuc2xhdG9yXCJbXj5dKz4oLio/KTwvc2VsZWN0PicpXG4gICAgICAgIGxldCBzZXNvbnMgPSBzdHIubWF0Y2goJzxzZWxlY3QgbmFtZT1cInNlYXNvblwiW14+XSs+KC4qPyk8L3NlbGVjdD4nKVxuICAgICAgICBsZXQgZXBpc29kID0gc3RyLm1hdGNoKCc8c2VsZWN0IG5hbWU9XCJlcGlzb2RlXCJbXj5dKz4oLio/KTwvc2VsZWN0PicpXG5cbiAgICAgICAgaWYoc2Vzb25zKXtcbiAgICAgICAgICAgIGxldCBzZWxlY3QgPSAkKCc8c2VsZWN0Picrc2Vzb25zWzFdKyc8L3NlbGVjdD4nKVxuXG4gICAgICAgICAgICAkKCdvcHRpb24nLHNlbGVjdCkuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGV4dHJhY3Quc2Vhc29uLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogJCh0aGlzKS5hdHRyKCd2YWx1ZScpLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAkKHRoaXMpLnRleHQoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodm9pY2VzKXtcbiAgICAgICAgICAgIGxldCBzZWxlY3QgPSAkKCc8c2VsZWN0Picrdm9pY2VzWzFdKyc8L3NlbGVjdD4nKVxuXG4gICAgICAgICAgICAkKCdvcHRpb24nLHNlbGVjdCkuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGxldCB0b2tlbiA9ICQodGhpcykuYXR0cignZGF0YS10b2tlbicpXG5cbiAgICAgICAgICAgICAgICBpZih0b2tlbil7XG4gICAgICAgICAgICAgICAgICAgIGV4dHJhY3Qudm9pY2UucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAkKHRoaXMpLnRleHQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAkKHRoaXMpLnZhbCgpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGVwaXNvZCl7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ID0gJCgnPHNlbGVjdD4nK2VwaXNvZFsxXSsnPC9zZWxlY3Q+JylcblxuICAgICAgICAgICAgJCgnb3B0aW9uJyxzZWxlY3QpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBleHRyYWN0LmVwaXNvZGUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAkKHRoaXMpLmF0dHIoJ3ZhbHVlJyksXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICQodGhpcykudGV4dCgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmQoKXtcbiAgICAgICAgY29tcG9uZW50LnJlc2V0KClcblxuICAgICAgICBsZXQgaXRlbXMgPSBbXVxuXG4gICAgICAgIGlmKGV4dHJhY3Quc2Vhc29uLmxlbmd0aCl7XG4gICAgICAgICAgICBleHRyYWN0LmVwaXNvZGUuZm9yRWFjaChlcGlzb2RlPT57XG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBlcGlzb2RlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6ICc3MjBwIH4gMTA4MHAnLFxuICAgICAgICAgICAgICAgICAgICBzZWFzb246IGV4dHJhY3Quc2Vhc29uW01hdGgubWluKGV4dHJhY3Quc2Vhc29uLmxlbmd0aC0xLGNob2ljZS5zZWFzb24pXS5pZCxcbiAgICAgICAgICAgICAgICAgICAgZXBpc29kZTogcGFyc2VJbnQoZXBpc29kZS5pZCksXG4gICAgICAgICAgICAgICAgICAgIGluZm86IGV4dHJhY3Qudm9pY2VbY2hvaWNlLnZvaWNlXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICB2b2ljZTogZXh0cmFjdC52b2ljZVtjaG9pY2Uudm9pY2VdLFxuICAgICAgICAgICAgICAgICAgICB2b2ljZV9uYW1lOiBleHRyYWN0LnZvaWNlW2Nob2ljZS52b2ljZV0ubmFtZSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXh0cmFjdC52b2ljZS5mb3JFYWNoKHZvaWNlID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHZvaWNlLm5hbWUubGVuZ3RoID4gMyA/IHZvaWNlLm5hbWUgOiBvYmplY3QubW92aWUudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6ICc3MjBwIH4gMTA4MHAnLFxuICAgICAgICAgICAgICAgICAgICB2b2ljZTogdm9pY2UsXG4gICAgICAgICAgICAgICAgICAgIGluZm86ICcnLFxuICAgICAgICAgICAgICAgICAgICB2b2ljZV9uYW1lOiB2b2ljZS5uYW1lLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9uZW50LmRyYXcoaXRlbXMse1xuICAgICAgICAgICAgb25FbnRlcjogKGl0ZW0sIGh0bWwpPT57XG4gICAgICAgICAgICAgICAgZ2V0U3RyZWFtKGl0ZW0sKHN0cmVhbSk9PntcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpcnN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBzdHJlYW0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZTogaXRlbS50aW1lbGluZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6IGl0ZW0ucXVhbGl0eXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogaXRlbS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlczogaXRlbS5zdWJ0aXRsZXMsXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBMYW1wYS5QbGF5ZXIucGxheShmaXJzdClcblxuICAgICAgICAgICAgICAgICAgICBpZihpdGVtLnNlYXNvbil7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGxheWxpc3QgPSBbXVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjZWxsID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IChjYWxsKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0U3RyZWFtKGVsZW0sKHN0cmVhbSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsLnVybCA9IHN0cmVhbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwucXVhbGl0eSA9IGVsZW0ucXVhbGl0eXNcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0ubWFyaygpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsLnVybCA9ICcnXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lOiBlbGVtLnRpbWVsaW5lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZWxlbS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VidGl0bGVzOiBlbGVtLnN1YnRpdGxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtID09IGl0ZW0pIGNlbGwudXJsID0gc3RyZWFtXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdC5wdXNoKGNlbGwpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5QbGF5ZXIucGxheWxpc3QocGxheWxpc3QpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLlBsYXllci5wbGF5bGlzdChbZmlyc3RdKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaXRlbS5tYXJrKClcbiAgICAgICAgICAgICAgICB9LCgpPT57XG4gICAgICAgICAgICAgICAgICAgIExhbXBhLk5vdHkuc2hvdyhMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnb25saW5lX25vbGluaycpKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Db250ZXh0TWVudTogKGl0ZW0sIGh0bWwsIGRhdGEsIGNhbGwpPT57XG4gICAgICAgICAgICAgICAgZ2V0U3RyZWFtKGl0ZW0sKHN0cmVhbSk9PntjYWxsKHtmaWxlOnN0cmVhbSxxdWFsaXR5Oml0ZW0ucXVhbGl0eXN9KX0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCByZXprYSIsImZ1bmN0aW9uIGtpbm9iYXNlKGNvbXBvbmVudCwgX29iamVjdCkge1xuICAgIGxldCBuZXR3b3JrID0gbmV3IExhbXBhLlJlZ3Vlc3QoKVxuICAgIGxldCBleHRyYWN0ID0ge31cbiAgICBsZXQgZW1iZWQgICA9IGNvbXBvbmVudC5wcm94eSgna2lub2Jhc2UnKSArICAnaHR0cHM6Ly9raW5vYmFzZS5vcmcvJ1xuICAgIGxldCBvYmplY3QgID0gX29iamVjdFxuXG4gICAgbGV0IHNlbGVjdF90aXRsZSA9ICcnXG4gICAgbGV0IHNlbGVjdF9pZCAgICA9ICcnXG4gICAgbGV0IGlzX3BsYXlsaXN0ICA9IGZhbHNlXG4gICAgbGV0IHRyYW5zbGF0aW9uICA9ICcnXG4gICAgbGV0IHF1YWxpdHlfdHlwZSA9ICcnXG5cbiAgICBsZXQgZmlsdGVyX2l0ZW1zID0ge31cbiAgICBsZXQgd2FpdF9zaW1pbGFyc1xuXG4gICAgbGV0IGNob2ljZSA9IHtcbiAgICAgICAgc2Vhc29uOiAwLFxuICAgICAgICB2b2ljZTogLTEsXG4gICAgfVxuXG4gICAgdGhpcy5zZWFyY2ggPSBmdW5jdGlvbiAoX29iamVjdCwgc2ltKSB7XG4gICAgICAgIGlmKHdhaXRfc2ltaWxhcnMgJiYgc2ltKSByZXR1cm4gZ2V0UGFnZShzaW1bMF0ubGluaylcbiAgICB9XG5cbiAgICB0aGlzLnNlYXJjaEJ5VGl0bGUgPSBmdW5jdGlvbiAoX29iamVjdCwgcXVlcnkpIHtcbiAgICAgICAgb2JqZWN0ID0gX29iamVjdFxuXG4gICAgICAgIHNlbGVjdF90aXRsZSA9IHF1ZXJ5XG5cbiAgICAgICAgbGV0IHVybCA9IGVtYmVkICsgXCJzZWFyY2g/cXVlcnk9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoY2xlYW5UaXRsZShzZWxlY3RfdGl0bGUpKVxuXG4gICAgICAgIG5ldHdvcmsubmF0aXZlKHVybCwgKHN0cikgPT4ge1xuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL1xcbi8sJycpXG5cbiAgICAgICAgICAgIGxldCBsaW5rcyAgICAgPSBvYmplY3QubW92aWUubnVtYmVyX29mX3NlYXNvbnMgPyBzdHIubWF0Y2goLzxhIGhyZWY9XCJcXC9zZXJpYWxcXC8oLio/KVwiPiguKj8pPFxcL2E+L2cpIDogc3RyLm1hdGNoKC88YSBocmVmPVwiXFwvZmlsbVxcLyguKj8pXCIgY2xhc3M9XCJsaW5rXCJbXj5dKz4oLio/KTxcXC9hPi9nKVxuICAgICAgICAgICAgbGV0IHJlbGlzZSAgICA9IG9iamVjdC5zZWFyY2hfZGF0ZSB8fCAob2JqZWN0Lm1vdmllLm51bWJlcl9vZl9zZWFzb25zID8gb2JqZWN0Lm1vdmllLmZpcnN0X2Fpcl9kYXRlIDogb2JqZWN0Lm1vdmllLnJlbGVhc2VfZGF0ZSkgfHwgJzAwMDAnXG4gICAgICAgICAgICBsZXQgbmVlZF95ZWFyID0gcGFyc2VJbnQoKHJlbGlzZSArICcnKS5zbGljZSgwLDQpKVxuICAgICAgICAgICAgbGV0IGZvdW5kX3VybCA9ICcnXG5cbiAgICAgICAgICAgIGlmKGxpbmtzKXtcbiAgICAgICAgICAgICAgICBsZXQgY2FyZHMgPSBbXVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxpbmtzLmZpbHRlcihsPT57XG4gICAgICAgICAgICAgICAgICAgIGxldCBsaW5rID0gJChsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGwgPSBsaW5rLmF0dHIoJ3RpdGxlJykgfHwgbGluay50ZXh0KCkgfHwgJydcblxuICAgICAgICAgICAgICAgICAgICBsZXQgeWVhciA9IHBhcnNlSW50KHRpdGwuc3BsaXQoJygnKS5wb3AoKS5zbGljZSgwLC0xKSlcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoeWVhciA+IG5lZWRfeWVhciAtIDIgJiYgeWVhciA8IG5lZWRfeWVhciArIDIpIGNhcmRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgeWVhcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsLnNwbGl0KC9cXChcXGR7NH1cXCkvKVswXS50cmltKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiBsaW5rLmF0dHIoJ2hyZWYnKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBsZXQgY2FyZCA9IGNhcmRzLmZpbmQoYz0+Yy55ZWFyID09IG5lZWRfeWVhcilcblxuICAgICAgICAgICAgICAgIGlmKCFjYXJkKSBjYXJkID0gY2FyZHMuZmluZChjPT5jLnRpdGxlID09IHNlbGVjdF90aXRsZSlcblxuICAgICAgICAgICAgICAgIGlmKCFjYXJkICYmIGNhcmRzLmxlbmd0aCA9PSAxKSBjYXJkID0gY2FyZHNbMF1cblxuICAgICAgICAgICAgICAgIGlmKGNhcmQpIGZvdW5kX3VybCA9IGNhcmRzWzBdLmxpbmtcblxuICAgICAgICAgICAgICAgIGlmKGZvdW5kX3VybCkgZ2V0UGFnZShmb3VuZF91cmwpXG4gICAgICAgICAgICAgICAgZWxzZSBpZihsaW5rcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgd2FpdF9zaW1pbGFycyA9IHRydWVcblxuICAgICAgICAgICAgICAgICAgICBsZXQgc2ltaWxhcnMgPSBbXVxuXG4gICAgICAgICAgICAgICAgICAgIGxpbmtzLmZvckVhY2gobD0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmsgPSAkKGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGwgPSBsaW5rLmF0dHIoJ3RpdGxlJykgfHwgbGluay50ZXh0KClcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2ltaWxhcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRpdGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluazogbGluay5hdHRyKCdocmVmJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbUlkOiAnc2ltaWxhcnMnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5zaW1pbGFycyhzaW1pbGFycylcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LmxvYWRpbmcoZmFsc2UpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgY29tcG9uZW50LmRvZXNOb3RBbnN3ZXIoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBjb21wb25lbnQuZG9lc05vdEFuc3dlcigpXG4gICAgICAgIH0sIChhLGMpPT57XG4gICAgICAgICAgICBjb21wb25lbnQuZG9lc05vdEFuc3dlcigpXG4gICAgICAgIH0sIGZhbHNlLHtcbiAgICAgICAgICAgIGRhdGFUeXBlOiAndGV4dCdcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmV4dGVuZENob2ljZSA9IGZ1bmN0aW9uKHNhdmVkKXtcbiAgICAgICAgTGFtcGEuQXJyYXlzLmV4dGVuZChjaG9pY2UsIHNhdmVkLCB0cnVlKVxuICAgIH1cblxuICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbXBvbmVudC5yZXNldCgpXG5cbiAgICAgICAgY2hvaWNlID0ge1xuICAgICAgICAgICAgc2Vhc29uOiAwLFxuICAgICAgICAgICAgdm9pY2U6IC0xXG4gICAgICAgIH1cblxuICAgICAgICBmaWx0ZXIoKVxuXG4gICAgICAgIGFwcGVuZChmaWx0cmVkKCkpXG4gICAgfVxuXG4gICAgdGhpcy5maWx0ZXIgPSBmdW5jdGlvbiAodHlwZSwgYSwgYikge1xuICAgICAgICBjaG9pY2VbYS5zdHlwZV0gPSBiLmluZGV4XG5cbiAgICAgICAgY29tcG9uZW50LnJlc2V0KClcblxuICAgICAgICBmaWx0ZXIoKVxuXG4gICAgICAgIGFwcGVuZChmaWx0cmVkKCkpXG4gICAgfVxuXG4gICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBuZXR3b3JrLmNsZWFyKClcblxuICAgICAgICBleHRyYWN0ID0gbnVsbFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFuVGl0bGUoc3RyKXtcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKCcuJywgJycpLnJlcGxhY2UoJzonLCAnJylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVBsYXlsaXN0KHN0cikge1xuICAgICAgICBsZXQgcGwgPSBbXVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoc3RyLmNoYXJBdCgwKSA9PT0gJ1snKSB7XG4gICAgICAgICAgICAgICAgc3RyLnN1YnN0cmluZygxKS5zcGxpdCgnLFsnKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhYmVsX2VuZCA9IGl0ZW0uaW5kZXhPZignXScpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsX2VuZCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFiZWwgPSBpdGVtLnN1YnN0cmluZygwLCBsYWJlbF9lbmQpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNoYXJBdChsYWJlbF9lbmQgKyAxKSA9PT0gJ3snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zdWJzdHJpbmcobGFiZWxfZW5kICsgMikuc3BsaXQoJzt7JykuZm9yRWFjaChmdW5jdGlvbih2b2ljZV9pdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2b2ljZV9lbmQgPSB2b2ljZV9pdGVtLmluZGV4T2YoJ30nKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2ljZV9lbmQgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZvaWNlID0gdm9pY2VfaXRlbS5zdWJzdHJpbmcoMCwgdm9pY2VfZW5kKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogbGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pY2U6IHZvaWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtzOiB2b2ljZV9pdGVtLnN1YnN0cmluZyh2b2ljZV9lbmQgKyAxKS5zcGxpdCgnIG9yICcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rczogaXRlbS5zdWJzdHJpbmcobGFiZWxfZW5kICsgMSkuc3BsaXQoJyBvciAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgICAgIGNhdGNoIChlKSB7fVxuXG4gICAgICAgIHJldHVybiBwbFxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBmaWx0ZXIoKSB7XG4gICAgICAgIGZpbHRlcl9pdGVtcyA9IHtcbiAgICAgICAgICAgIHNlYXNvbjogW10sXG4gICAgICAgICAgICB2b2ljZTogW11cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc19wbGF5bGlzdCkge1xuICAgICAgICAgICAgZXh0cmFjdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5wbGF5bGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJfaXRlbXMuc2Vhc29uLnB1c2goaXRlbS5jb21tZW50KVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09IGNob2ljZS5zZWFzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucGxheWxpc3QuZm9yRWFjaChmdW5jdGlvbihlcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXBzLmZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VQbGF5bGlzdChlcHMuZmlsZSkuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsLnZvaWNlICYmIGZpbHRlcl9pdGVtcy52b2ljZS5pbmRleE9mKGVsLnZvaWNlKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcl9pdGVtcy52b2ljZS5wdXNoKGVsLnZvaWNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGl0ZW0uZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZVBsYXlsaXN0KGl0ZW0uZmlsZSkuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsLnZvaWNlICYmIGZpbHRlcl9pdGVtcy52b2ljZS5pbmRleE9mKGVsLnZvaWNlKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcl9pdGVtcy52b2ljZS5wdXNoKGVsLnZvaWNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWZpbHRlcl9pdGVtcy5zZWFzb25bY2hvaWNlLnNlYXNvbl0pIGNob2ljZS5zZWFzb24gPSAwXG4gICAgICAgIGlmICghZmlsdGVyX2l0ZW1zLnZvaWNlW2Nob2ljZS52b2ljZV0pICAgY2hvaWNlLnZvaWNlICA9IDBcblxuICAgICAgICBjb21wb25lbnQuZmlsdGVyKGZpbHRlcl9pdGVtcywgY2hvaWNlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRyZWQoKSB7XG4gICAgICAgIGxldCBmaWx0cmVkID0gW11cblxuICAgICAgICBpZiAoaXNfcGxheWxpc3QpIHtcbiAgICAgICAgICAgIGxldCBwbGF5bGlzdCA9IGV4dHJhY3RcbiAgICAgICAgICAgIGxldCBzZWFzb24gPSBvYmplY3QubW92aWUubnVtYmVyX29mX3NlYXNvbnMgJiYgMVxuXG4gICAgICAgICAgICBpZiAoZXh0cmFjdFtjaG9pY2Uuc2Vhc29uXSAmJiBleHRyYWN0W2Nob2ljZS5zZWFzb25dLnBsYXlsaXN0KSB7XG4gICAgICAgICAgICAgICAgcGxheWxpc3QgPSBleHRyYWN0W2Nob2ljZS5zZWFzb25dLnBsYXlsaXN0XG4gICAgICAgICAgICAgICAgc2Vhc29uID0gcGFyc2VJbnQoZXh0cmFjdFtjaG9pY2Uuc2Vhc29uXS5jb21tZW50KVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKHNlYXNvbikpIHNlYXNvbiA9IDFcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxheWxpc3QuZm9yRWFjaChmdW5jdGlvbihlcHMsIGVwaXNvZGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSBleHRyYWN0SXRlbXMoZXBzLmZpbGUsIGZpbHRlcl9pdGVtcy52b2ljZVtjaG9pY2Uudm9pY2VdKVxuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYWx0X3ZvaWNlID0gZXBzLmNvbW1lbnQubWF0Y2goL1xcZCsg0YHQtdGA0LjRjyAoLiopJC9pKVxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IGl0ZW1zWzBdLnZvaWNlIHx8IChhbHRfdm9pY2UgJiYgYWx0X3ZvaWNlWzFdLnRyaW0oKSkgfHwgdHJhbnNsYXRpb25cblxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mbyA9PSBlcHMuY29tbWVudCkgaW5mbyA9ICcnXG5cbiAgICAgICAgICAgICAgICAgICAgZmlsdHJlZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IGVwcy5maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGVwcy5jb21tZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eTogKHF1YWxpdHlfdHlwZSAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDQ4MCA/IHF1YWxpdHlfdHlwZSArICcgLSAnIDogJycpICsgaXRlbXNbMF0ucXVhbGl0eSArICdwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXNvbjogc2Vhc29uLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXBpc29kZTogZXBpc29kZSArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvOiBpbmZvLFxuICAgICAgICAgICAgICAgICAgICAgICAgdm9pY2U6IGl0ZW1zWzBdLnZvaWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdm9pY2VfbmFtZTogaW5mbyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlczogcGFyc2VTdWJzKGVwcy5zdWJ0aXRsZSB8fCAnJylcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZpbHRyZWQgPSBleHRyYWN0XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmlsdHJlZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dHJhY3RJdGVtcyhzdHIsIHZvaWNlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgbGlzdCA9IHBhcnNlUGxheWxpc3Qoc3RyKVxuXG4gICAgICAgICAgICBpZiAodm9pY2UpIHtcbiAgICAgICAgICAgICAgICBsZXQgdG1wID0gbGlzdC5maWx0ZXIoZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsLnZvaWNlID09IHZvaWNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHRtcC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IHRtcFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSBsaXN0LmZpbHRlcihmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBlbC52b2ljZSA9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGl0ZW1zID0gbGlzdC5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGxldCBxdWFsaXR5ID0gaXRlbS5sYWJlbC5tYXRjaCgvKFxcZFxcZFxcZCspcC8pXG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogaXRlbS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgdm9pY2U6IGl0ZW0udm9pY2UsXG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6IHF1YWxpdHkgPyBwYXJzZUludChxdWFsaXR5WzFdKSA6IE5hTixcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogaXRlbS5saW5rc1swXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGl0ZW1zLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgICAgIGlmIChiLnF1YWxpdHkgPiBhLnF1YWxpdHkpIHJldHVybiAxXG4gICAgICAgICAgICAgICAgaWYgKGIucXVhbGl0eSA8IGEucXVhbGl0eSkgcmV0dXJuIC0xXG4gICAgICAgICAgICAgICAgaWYgKGIubGFiZWwgPiBhLmxhYmVsKSByZXR1cm4gMVxuICAgICAgICAgICAgICAgIGlmIChiLmxhYmVsIDwgYS5sYWJlbCkgcmV0dXJuIC0xXG4gICAgICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHJldHVybiBpdGVtc1xuICAgICAgICB9IFxuICAgICAgICBjYXRjaCAoZSkge31cblxuICAgICAgICByZXR1cm4gW11cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVN1YnModm9kKXtcbiAgICAgICAgbGV0IHN1YnRpdGxlcyA9IFtdXG5cbiAgICAgICAgdm9kLnNwbGl0KCcsJykuZm9yRWFjaCgocyk9PntcbiAgICAgICAgICAgIGxldCBuYW0gPSBzLm1hdGNoKFwiXFxcXFsoLio/KV1cIilcblxuICAgICAgICAgICAgaWYobmFtKXtcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gcy5yZXBsYWNlKC9cXFsuKj9cXF0vLCcnKS5zcGxpdCgnIG9yICcpWzBdXG5cbiAgICAgICAgICAgICAgICBpZih1cmwpe1xuICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogbmFtWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHN1YnRpdGxlcy5sZW5ndGggPyBzdWJ0aXRsZXMgOiBmYWxzZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dHJhY3REYXRhKHN0ciwgcGFnZSkge1xuICAgICAgICBsZXQgcXVhbGl0eV9tYXRjaCA9IHBhZ2UubWF0Y2goLzxsaT48Yj7QmtCw0YfQtdGB0YLQstC+OjxcXC9iPihbXjwsXSspPFxcL2xpPi9pKVxuICAgICAgICBsZXQgdHJhbnNsYXRpb25fbWF0Y2ggPSBwYWdlLm1hdGNoKC88bGk+PGI+0J/QtdGA0LXQstC+0LQ6PFxcL2I+KFtePCxdKyk8XFwvbGk+L2kpXG5cbiAgICAgICAgcXVhbGl0eV90eXBlID0gcXVhbGl0eV9tYXRjaCA/IHF1YWxpdHlfbWF0Y2hbMV0udHJpbSgpIDogJydcbiAgICAgICAgdHJhbnNsYXRpb24gPSB0cmFuc2xhdGlvbl9tYXRjaCA/IHRyYW5zbGF0aW9uX21hdGNoWzFdLnRyaW0oKSA6ICcnXG5cbiAgICAgICAgbGV0IHZvZCA9IHN0ci5zcGxpdCgnfCcpXG5cbiAgICAgICAgaWYgKHZvZFswXSA9PSAnZmlsZScpIHtcbiAgICAgICAgICAgIGxldCBmaWxlICA9IHZvZFsxXVxuICAgICAgICAgICAgbGV0IGZvdW5kID0gW11cbiAgICAgICAgICAgIGxldCBzdWJ0aWxlcyA9IHBhcnNlU3Vicyh2b2RbMl0pXG5cbiAgICAgICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZvaWNlcyA9IHt9XG5cbiAgICAgICAgICAgICAgICBwYXJzZVBsYXlsaXN0KGZpbGUpLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcHJldiA9IHZvaWNlc1tpdGVtLnZvaWNlIHx8ICcnXVxuICAgICAgICAgICAgICAgICAgICBsZXQgcXVhbGl0eV9zdHIgPSBpdGVtLmxhYmVsLm1hdGNoKC8oXFxkXFxkXFxkKylwLylcbiAgICAgICAgICAgICAgICAgICAgbGV0IHF1YWxpdHkgPSBxdWFsaXR5X3N0ciA/IHBhcnNlSW50KHF1YWxpdHlfc3RyWzFdKSA6IE5hTlxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghcHJldiB8fCBxdWFsaXR5ID4gcHJldi5xdWFsaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2b2ljZXNbaXRlbS52b2ljZSB8fCAnJ10gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eTogcXVhbGl0eVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IHZvaWNlIGluIHZvaWNlcykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZWwgPSB2b2ljZXNbdm9pY2VdXG5cbiAgICAgICAgICAgICAgICAgICAgZm91bmQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHZvaWNlIHx8IHRyYW5zbGF0aW9uIHx8IG9iamVjdC5tb3ZpZS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6IChxdWFsaXR5X3R5cGUgJiYgd2luZG93LmlubmVyV2lkdGggPiA0ODAgPyBxdWFsaXR5X3R5cGUgKyAnIC0gJyA6ICcnKSArIGVsLnF1YWxpdHkgKyAncCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZvaWNlOiB2b2ljZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlczogc3VidGlsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB2b2ljZV9uYW1lOiB2b2ljZSB8fCB0cmFuc2xhdGlvbiB8fCAnJ1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXh0cmFjdCA9IGZvdW5kXG5cbiAgICAgICAgICAgIGlzX3BsYXlsaXN0ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2b2RbMF0gPT0gJ3BsJykge1xuICAgICAgICAgICAgZXh0cmFjdCA9IExhbXBhLkFycmF5cy5kZWNvZGVKc29uKHZvZFsxXSwgW10pXG5cbiAgICAgICAgICAgIGlzX3BsYXlsaXN0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGNvbXBvbmVudC5lbXB0eUZvclF1ZXJ5KHNlbGVjdF90aXRsZSlcbiAgICB9XG5cbiAgICBcbiAgICBmdW5jdGlvbiBnZXRQYWdlKHVybCl7XG4gICAgICAgIG5ldHdvcmsuY2xlYXIoKVxuXG4gICAgICAgIG5ldHdvcmsudGltZW91dCgxMDAwICogMTApXG4gICAgICAgIFxuICAgICAgICBuZXR3b3JrLm5hdGl2ZShlbWJlZCt1cmwsIChzdHIpPT57XG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFxuL2csICcnKVxuXG4gICAgICAgICAgICBsZXQgTU9WSUVfSUQgPSBzdHIubWF0Y2goJ3ZhciBNT1ZJRV9JRCA9IChbXjtdKyk7JylcbiAgICAgICAgICAgIGxldCBJREVOVElGSUVSID0gc3RyLm1hdGNoKCd2YXIgSURFTlRJRklFUiA9IFwiKFteXCJdKylcIicpXG4gICAgICAgICAgICBsZXQgUExBWUVSX0NVSUQgPSBzdHIubWF0Y2goJ3ZhciBQTEFZRVJfQ1VJRCA9IFwiKFteXCJdKylcIicpXG5cbiAgICAgICAgICAgIGlmIChNT1ZJRV9JRCAmJiBJREVOVElGSUVSICYmIFBMQVlFUl9DVUlEKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0X2lkID0gTU9WSUVfSURbMV1cblxuICAgICAgICAgICAgICAgIGxldCBpZGVudGlmaWVyICA9IElERU5USUZJRVJbMV1cbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyX2N1aWQgPSBQTEFZRVJfQ1VJRFsxXVxuXG5cbiAgICAgICAgICAgICAgICBsZXQgZGF0YV91cmwgPSBcInVzZXJfZGF0YVwiXG4gICAgICAgICAgICAgICAgICAgIGRhdGFfdXJsID0gTGFtcGEuVXRpbHMuYWRkVXJsQ29tcG9uZW50KGRhdGFfdXJsLCBcInBhZ2U9bW92aWVcIilcbiAgICAgICAgICAgICAgICAgICAgZGF0YV91cmwgPSBMYW1wYS5VdGlscy5hZGRVcmxDb21wb25lbnQoZGF0YV91cmwsIFwibW92aWVfaWQ9XCIgKyBzZWxlY3RfaWQpXG4gICAgICAgICAgICAgICAgICAgIGRhdGFfdXJsID0gTGFtcGEuVXRpbHMuYWRkVXJsQ29tcG9uZW50KGRhdGFfdXJsLCBcImN1aWQ9XCIgKyBwbGF5ZXJfY3VpZClcbiAgICAgICAgICAgICAgICAgICAgZGF0YV91cmwgPSBMYW1wYS5VdGlscy5hZGRVcmxDb21wb25lbnQoZGF0YV91cmwsIFwiZGV2aWNlPURFU0tUT1BcIilcbiAgICAgICAgICAgICAgICAgICAgZGF0YV91cmwgPSBMYW1wYS5VdGlscy5hZGRVcmxDb21wb25lbnQoZGF0YV91cmwsIFwiXz1cIitEYXRlLm5vdygpKVxuXG4gICAgICAgICAgICAgICAgbmV0d29yay5jbGVhcigpXG5cbiAgICAgICAgICAgICAgICBuZXR3b3JrLnRpbWVvdXQoMTAwMCAqIDEwKVxuXG4gICAgICAgICAgICAgICAgbmV0d29yay5uYXRpdmUoZW1iZWQgKyBkYXRhX3VybCwgKHVzZXJfZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHVzZXJfZGF0YS52b2RfaGFzaCA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZV91cmwgPSBcInZvZC9cIiArIHNlbGVjdF9pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfdXJsID0gTGFtcGEuVXRpbHMuYWRkVXJsQ29tcG9uZW50KGZpbGVfdXJsLCBcImlkZW50aWZpZXI9XCIgKyBpZGVudGlmaWVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfdXJsID0gTGFtcGEuVXRpbHMuYWRkVXJsQ29tcG9uZW50KGZpbGVfdXJsLCBcInBsYXllcl90eXBlPW5ld1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfdXJsID0gTGFtcGEuVXRpbHMuYWRkVXJsQ29tcG9uZW50KGZpbGVfdXJsLCBcImZpbGVfdHlwZT1tcDRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlX3VybCA9IExhbXBhLlV0aWxzLmFkZFVybENvbXBvbmVudChmaWxlX3VybCwgXCJzdD1cIiArIHVzZXJfZGF0YS52b2RfaGFzaClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlX3VybCA9IExhbXBhLlV0aWxzLmFkZFVybENvbXBvbmVudChmaWxlX3VybCwgXCJlPVwiICsgdXNlcl9kYXRhLnZvZF90aW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfdXJsID0gTGFtcGEuVXRpbHMuYWRkVXJsQ29tcG9uZW50KGZpbGVfdXJsLCBcIl89XCIrRGF0ZS5ub3coKSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29yay5jbGVhcigpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmsudGltZW91dCgxMDAwICogMTApXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmsubmF0aXZlKGVtYmVkICsgZmlsZV91cmwsIChmaWxlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5sb2FkaW5nKGZhbHNlKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmFjdERhdGEoZmlsZXMsIHN0cilcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcigpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmQoZmlsdHJlZCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGEsIGMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuZG9lc05vdEFuc3dlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmYWxzZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBjb21wb25lbnQuZG9lc05vdEFuc3dlcihMKVxuXG4gICAgICAgICAgICAgICAgfSwgKGEsYykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuZG9lc05vdEFuc3dlcigpXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBjb21wb25lbnQuZG9lc05vdEFuc3dlcigpXG4gICAgICAgIH0sKGEsYyk9PntcbiAgICAgICAgICAgIGNvbXBvbmVudC5kb2VzTm90QW5zd2VyKClcbiAgICAgICAgfSwgZmFsc2UsIHtcbiAgICAgICAgICAgIGRhdGFUeXBlOiAndGV4dCdcbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gZ2V0RmlsZShlbGVtZW50KXtcbiAgICAgICAgbGV0IHF1YWxpdHkgPSB7fSxcbiAgICAgICAgICAgIGZpcnN0ICAgPSAnJ1xuXG4gICAgICAgIGxldCBwcmVmZXJhYmx5ID0gTGFtcGEuU3RvcmFnZS5nZXQoJ3ZpZGVvX3F1YWxpdHlfZGVmYXVsdCcsJzEwODAnKVxuXG4gICAgICAgIGVsZW1lbnQuZmlsZS5zcGxpdCgnLCcpLnJldmVyc2UoKS5mb3JFYWNoKGZpbGU9PntcbiAgICAgICAgICAgIGxldCBxID0gZmlsZS5tYXRjaChcIlxcXFxbKFxcXFxkKylwXCIpXG5cbiAgICAgICAgICAgIGlmKHEpe1xuICAgICAgICAgICAgICAgIHF1YWxpdHlbcVsxXSsncCddID0gZmlsZS5yZXBsYWNlKC9cXFtcXGQrcFxcXS8sJycpLnJlcGxhY2UoL3soW159XSspfS8sJycpLnNwbGl0KCcgb3IgJylbMF1cblxuICAgICAgICAgICAgICAgIGlmKCFmaXJzdCB8fCBxWzFdID09IHByZWZlcmFibHkpIGZpcnN0ID0gcXVhbGl0eVtxWzFdKydwJ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBlbGVtZW50LnN0cmVhbSAgICA9IGZpcnN0XG4gICAgICAgIGVsZW1lbnQucXVhbGl0eXMgID0gcXVhbGl0eVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmaWxlOiBmaXJzdCxcbiAgICAgICAgICAgIHF1YWxpdHk6IHF1YWxpdHlcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiB0b1BsYXlFbGVtZW50KGVsZW1lbnQpe1xuICAgICAgICBnZXRGaWxlKGVsZW1lbnQpXG5cbiAgICAgICAgbGV0IHBsYXkgID0ge1xuICAgICAgICAgICAgdXJsOiBlbGVtZW50LnN0cmVhbSxcbiAgICAgICAgICAgIHRpbWVsaW5lOiBlbGVtZW50LnRpbWVsaW5lLFxuICAgICAgICAgICAgdGl0bGU6IGVsZW1lbnQudGl0bGUsXG4gICAgICAgICAgICBzdWJ0aXRsZXM6IGVsZW1lbnQuc3VidGl0bGVzLFxuICAgICAgICAgICAgcXVhbGl0eTogZWxlbWVudC5xdWFsaXR5cyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBlbGVtZW50Lm1hcmtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwbGF5XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwZW5kKGl0ZW1zKSB7XG4gICAgICAgIGNvbXBvbmVudC5yZXNldCgpXG5cbiAgICAgICAgY29tcG9uZW50LmRyYXcoaXRlbXMse1xuICAgICAgICAgICAgc2ltaWxhcnM6IHdhaXRfc2ltaWxhcnMsXG4gICAgICAgICAgICBvbkVudGVyOiAoaXRlbSwgaHRtbCk9PntcbiAgICAgICAgICAgICAgICBnZXRGaWxlKGl0ZW0pXG5cbiAgICAgICAgICAgICAgICBpZihpdGVtLnN0cmVhbSl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwbGF5bGlzdCA9IFtdXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaXJzdCA9IHRvUGxheUVsZW1lbnQoaXRlbSlcblxuICAgICAgICAgICAgICAgICAgICBpZihpdGVtLnNlYXNvbil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5mb3JFYWNoKGVsZW09PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdC5wdXNoKHRvUGxheUVsZW1lbnQoZWxlbSkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdC5wdXNoKGZpcnN0KVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYocGxheWxpc3QubGVuZ3RoID4gMSkgZmlyc3QucGxheWxpc3QgPSBwbGF5bGlzdFxuXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLlBsYXllci5wbGF5KGZpcnN0KVxuXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLlBsYXllci5wbGF5bGlzdChwbGF5bGlzdClcblxuICAgICAgICAgICAgICAgICAgICBpdGVtLm1hcmsoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIExhbXBhLk5vdHkuc2hvdyhMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnb25saW5lX25vbGluaycpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQ29udGV4dE1lbnU6IChpdGVtLCBodG1sLCBkYXRhLCBjYWxsKT0+e1xuICAgICAgICAgICAgICAgIGNhbGwoZ2V0RmlsZShpdGVtKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGtpbm9iYXNlIiwiZnVuY3Rpb24gY29sbGFwcyhjb21wb25lbnQsIF9vYmplY3Qpe1xuICAgIGxldCBuZXR3b3JrICAgID0gbmV3IExhbXBhLlJlZ3Vlc3QoKVxuICAgIGxldCBleHRyYWN0ICAgID0ge31cbiAgICBsZXQgZW1iZWQgICAgICA9IGNvbXBvbmVudC5wcm94eSgnY29sbGFwcycpICsgICdodHRwczovL2FwaS5kZWxpdmVtYmQud3MvZW1iZWQvJ1xuICAgIGxldCBvYmplY3QgICAgID0gX29iamVjdFxuXG4gICAgbGV0IGZpbHRlcl9pdGVtcyA9IHt9XG5cbiAgICBsZXQgY2hvaWNlID0ge1xuICAgICAgICBzZWFzb246IDAsXG4gICAgICAgIHZvaWNlOiAwXG4gICAgfVxuICAgIFxuICAgIHRoaXMuc2VhcmNoQnlLaW5vcG9pc2sgPSBmdW5jdGlvbihfb2JqZWN0LCBpZCl7XG4gICAgICAgIG9iamVjdCA9IF9vYmplY3RcblxuICAgICAgICB0aGlzLnNlYXJjaEluKCdrcCcsIGlkKVxuICAgIH1cblxuICAgIHRoaXMuc2VhcmNoQnlJbWRiSUQgPSBmdW5jdGlvbihfb2JqZWN0LCBpZCl7XG4gICAgICAgIG9iamVjdCA9IF9vYmplY3RcblxuICAgICAgICB0aGlzLnNlYXJjaEluKCdpbWRiJywgaWQpXG4gICAgfVxuXG4gICAgdGhpcy5zZWFyY2hJbiA9IGZ1bmN0aW9uKHdoZXJlLCBpZCl7XG4gICAgICAgIGxldCB1cmwgPSBlbWJlZCArIHdoZXJlICsgJy8nICsgaWRcblxuICAgICAgICBuZXR3b3JrLnNpbGVudCh1cmwsIChzdHIpID0+IHtcbiAgICAgICAgICAgIGlmKHN0cil7XG4gICAgICAgICAgICAgICAgcGFyc2Uoc3RyKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBjb21wb25lbnQuZG9lc05vdEFuc3dlcigpXG5cbiAgICAgICAgICAgIGNvbXBvbmVudC5sb2FkaW5nKGZhbHNlKVxuICAgICAgICB9LCAoYSxjKT0+e1xuICAgICAgICAgICAgY29tcG9uZW50LmRvZXNOb3RBbnN3ZXIoKVxuICAgICAgICB9LCBmYWxzZSx7XG4gICAgICAgICAgICBkYXRhVHlwZTogJ3RleHQnXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5leHRlbmRDaG9pY2UgPSBmdW5jdGlvbihzYXZlZCl7XG4gICAgICAgIExhbXBhLkFycmF5cy5leHRlbmQoY2hvaWNlLCBzYXZlZCwgdHJ1ZSlcbiAgICB9XG5cbiAgICB0aGlzLnJlc2V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgY29tcG9uZW50LnJlc2V0KClcblxuICAgICAgICBjaG9pY2UgPSB7XG4gICAgICAgICAgICBzZWFzb246IDAsXG4gICAgICAgICAgICB2b2ljZTogMFxuICAgICAgICB9XG5cbiAgICAgICAgZmlsdGVyKClcblxuICAgICAgICBhcHBlbmQoZmlsdHJlZCgpKVxuXG4gICAgICAgIGNvbXBvbmVudC5zYXZlQ2hvaWNlKGNob2ljZSlcbiAgICB9XG5cbiAgICB0aGlzLmZpbHRlciA9IGZ1bmN0aW9uKHR5cGUsIGEsIGIpe1xuICAgICAgICBjaG9pY2VbYS5zdHlwZV0gPSBiLmluZGV4XG5cbiAgICAgICAgY29tcG9uZW50LnJlc2V0KClcblxuICAgICAgICBmaWx0ZXIoKVxuXG4gICAgICAgIGFwcGVuZChmaWx0cmVkKCkpXG5cbiAgICAgICAgY29tcG9uZW50LnNhdmVDaG9pY2UoY2hvaWNlKVxuICAgIH1cblxuICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIG5ldHdvcmsuY2xlYXIoKVxuXG4gICAgICAgIGV4dHJhY3QgPSBudWxsXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2Uoc3RyKXtcbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL1xcbi9nLCcnKVxuXG4gICAgICAgIGxldCBmaW5kID0gc3RyLm1hdGNoKCdtYWtlUGxheWVyXFxcXCh7KC4qPyl9XFxcXCk7JylcblxuICAgICAgICBpZihmaW5kKXtcbiAgICAgICAgICAgIGxldCBqc29uXG5cbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICBqc29uID0gZXZhbCgnKHsnK2ZpbmRbMV0rJ30pJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoKGUpe31cblxuICAgICAgICAgICAgaWYoanNvbil7XG4gICAgICAgICAgICAgICAgZXh0cmFjdCA9IGpzb25cblxuICAgICAgICAgICAgICAgIGZpbHRlcigpXG5cbiAgICAgICAgICAgICAgICBhcHBlbmQoZmlsdHJlZCgpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBjb21wb25lbnQuZG9lc05vdEFuc3dlcigpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaWx0ZXIoKXtcbiAgICAgICAgZmlsdGVyX2l0ZW1zID0ge1xuICAgICAgICAgICAgc2Vhc29uOiBbXSxcbiAgICAgICAgICAgIHZvaWNlOiBbXSxcbiAgICAgICAgICAgIHF1YWxpdHk6IFtdXG4gICAgICAgIH1cblxuICAgICAgICBpZihleHRyYWN0LnBsYXlsaXN0KXtcbiAgICAgICAgICAgIGlmKGV4dHJhY3QucGxheWxpc3Quc2Vhc29ucyl7XG4gICAgICAgICAgICAgICAgZXh0cmFjdC5wbGF5bGlzdC5zZWFzb25zLmZvckVhY2goKHNlYXNvbik9PntcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyX2l0ZW1zLnNlYXNvbi5wdXNoKExhbXBhLkxhbmcudHJhbnNsYXRlKCd0b3JyZW50X3NlcmlhbF9zZWFzb24nKSArICcgJyArIHNlYXNvbi5zZWFzb24pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZpbHRlcl9pdGVtcy5zZWFzb24uc29ydCgoYSxiKT0+e1xuICAgICAgICAgICAgbGV0IG5fYSA9IHBhcnNlSW50KGEucmVwbGFjZSgvXFxEL2csJycpKVxuICAgICAgICAgICAgbGV0IG5fYiA9IHBhcnNlSW50KGIucmVwbGFjZSgvXFxEL2csJycpKVxuXG4gICAgICAgICAgICBpZihuX2EgPiBuX2IpIHJldHVybiAxXG4gICAgICAgICAgICBlbHNlIGlmKG5fYSA8IG5fYikgcmV0dXJuIC0xXG4gICAgICAgICAgICBlbHNlIHJldHVybiAwXG4gICAgICAgIH0pXG4gICAgICAgIFxuXG4gICAgICAgIGNvbXBvbmVudC5maWx0ZXIoZmlsdGVyX2l0ZW1zLCBjaG9pY2UpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlsdHJlZCgpe1xuICAgICAgICBsZXQgZmlsdHJlZCA9IFtdXG5cbiAgICAgICAgaWYoZXh0cmFjdC5wbGF5bGlzdCl7XG4gICAgICAgICAgICBleHRyYWN0LnBsYXlsaXN0LnNlYXNvbnMuZm9yRWFjaCgoc2Vhc29uLCBpKT0+e1xuICAgICAgICAgICAgICAgIGlmKChzZWFzb24uc2Vhc29uIC0gMSkgPT0gY2hvaWNlLnNlYXNvbil7XG4gICAgICAgICAgICAgICAgICAgIHNlYXNvbi5lcGlzb2Rlcy5mb3JFYWNoKGVwaXNvZGU9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRyZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogZXBpc29kZS5obHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXBpc29kZTogcGFyc2VJbnQoZXBpc29kZS5lcGlzb2RlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFzb246IHNlYXNvbi5zZWFzb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGVwaXNvZGUudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mbzogZXBpc29kZS5hdWRpby5uYW1lcy5zbGljZSgwLDUpLmpvaW4oJywgJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VidGl0bGVzOiBlcGlzb2RlLmNjID8gZXBpc29kZS5jYy5tYXAoYz0+eyByZXR1cm4ge2xhYmVsOiBjLm5hbWUsIHVybDogYy51cmx9fSkgOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihleHRyYWN0LnNvdXJjZSl7XG4gICAgICAgICAgICBsZXQgcmVzb2x1dGlvbiAgPSBMYW1wYS5BcnJheXMuZ2V0S2V5cyhleHRyYWN0LnF1YWxpdHlCeVdpZHRoKS5wb3AoKVxuICAgICAgICAgICAgbGV0IG1heF9xdWFsaXR5ID0gZXh0cmFjdC5xdWFsaXR5QnlXaWR0aCA/IGV4dHJhY3QucXVhbGl0eUJ5V2lkdGhbcmVzb2x1dGlvbl0gfHwgMCA6IDBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZmlsdHJlZC5wdXNoKHtcbiAgICAgICAgICAgICAgICBmaWxlOiBleHRyYWN0LnNvdXJjZS5obHMsXG4gICAgICAgICAgICAgICAgdGl0bGU6IGV4dHJhY3QudGl0bGUsXG4gICAgICAgICAgICAgICAgcXVhbGl0eTogbWF4X3F1YWxpdHkgPyBtYXhfcXVhbGl0eSArICdwJyA6ICcnLFxuICAgICAgICAgICAgICAgIGluZm86IGV4dHJhY3Quc291cmNlLmF1ZGlvLm5hbWVzLnNsaWNlKDAsNCkuam9pbignLCAnKSxcbiAgICAgICAgICAgICAgICBzdWJ0aXRsZXM6IGV4dHJhY3Quc291cmNlLmNjID8gZXh0cmFjdC5zb3VyY2UuY2MubWFwKGM9PnsgcmV0dXJuIHtsYWJlbDogYy5uYW1lLCB1cmw6IGMudXJsfX0pIDogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmlsdHJlZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZChpdGVtcykge1xuICAgICAgICBjb21wb25lbnQucmVzZXQoKVxuXG4gICAgICAgIGNvbXBvbmVudC5kcmF3KGl0ZW1zLHtcbiAgICAgICAgICAgIG9uRW50ZXI6IChpdGVtLCBodG1sKT0+e1xuICAgICAgICAgICAgICAgIGlmKGl0ZW0uZmlsZSl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwbGF5bGlzdCA9IFtdXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaXJzdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogaXRlbS5maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmU6IGl0ZW0udGltZWxpbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogaXRlbS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlczogaXRlbS5zdWJ0aXRsZXNcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0uc2Vhc29uKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goZWxlbT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZWxlbS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBlbGVtLmZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lOiBlbGVtLnRpbWVsaW5lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZXM6IGVsZW0uc3VidGl0bGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0ubWFyaygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWxpc3QucHVzaChmaXJzdClcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHBsYXlsaXN0Lmxlbmd0aCA+IDEpIGZpcnN0LnBsYXlsaXN0ID0gcGxheWxpc3RcblxuICAgICAgICAgICAgICAgICAgICBMYW1wYS5QbGF5ZXIucGxheShmaXJzdClcblxuICAgICAgICAgICAgICAgICAgICBMYW1wYS5QbGF5ZXIucGxheWxpc3QocGxheWxpc3QpXG5cbiAgICAgICAgICAgICAgICAgICAgaXRlbS5tYXJrKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBMYW1wYS5Ob3R5LnNob3coTGFtcGEuTGFuZy50cmFuc2xhdGUoJ29ubGluZV9ub2xpbmsnKSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNvbnRleHRNZW51OiAoaXRlbSwgaHRtbCwgZGF0YSwgY2FsbCk9PntcbiAgICAgICAgICAgICAgICBjYWxsKHtmaWxlOiBpdGVtLmZpbGV9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29sbGFwcyIsImZ1bmN0aW9uIGZpbG1peChjb21wb25lbnQsIF9vYmplY3Qpe1xuICAgIGxldCBuZXR3b3JrICA9IG5ldyBMYW1wYS5SZWd1ZXN0KClcbiAgICBsZXQgZXh0cmFjdCAgPSB7fVxuICAgIGxldCByZXN1bHRzICA9IFtdXG4gICAgbGV0IG9iamVjdCAgID0gX29iamVjdFxuICAgIGxldCBlbWJlZCAgICA9ICdodHRwOi8vZmlsbWl4YXBwLmN5b3UvYXBpL3YyLyc7XG4gICAgbGV0IHdhaXRfc2ltaWxhcnNcblxuICAgIGxldCBmaWx0ZXJfaXRlbXMgPSB7fVxuXG4gICAgbGV0IGNob2ljZSA9IHtcbiAgICAgICAgc2Vhc29uOiAwLFxuICAgICAgICB2b2ljZTogMCxcbiAgICAgICAgdm9pY2VfbmFtZTogJydcbiAgICB9XG5cbiAgICBsZXQgdG9rZW4gPSBMYW1wYS5TdG9yYWdlLmdldCgnZmlsbWl4X3Rva2VuJywnJylcbiAgICBsZXQgZGV2X3Rva2VuID0gJ3VzZXJfZGV2X2Fwaz0yLjAuMSZ1c2VyX2Rldl9pZD0mdXNlcl9kZXZfbmFtZT1YaWFvbWkmdXNlcl9kZXZfb3M9MTEmdXNlcl9kZXZfdG9rZW49Jyt0b2tlbisnJnVzZXJfZGV2X3ZlbmRvcj1YaWFvbWknXG5cbiAgICB0aGlzLnNlYXJjaCA9IGZ1bmN0aW9uKF9vYmplY3QsIHNpbSl7XG4gICAgICAgIGlmKHdhaXRfc2ltaWxhcnMpIHRoaXMuZmluZChzaW1bMF0uaWQpXG4gICAgfVxuXG4gICAgdGhpcy5zZWFyY2hCeVRpdGxlID0gZnVuY3Rpb24oX29iamVjdCwgcXVlcnkpe1xuICAgICAgICBvYmplY3QgID0gX29iamVjdFxuXG4gICAgICAgIGxldCB5ZWFyID0gcGFyc2VJbnQoKG9iamVjdC5tb3ZpZS5yZWxlYXNlX2RhdGUgfHwgb2JqZWN0Lm1vdmllLmZpcnN0X2Fpcl9kYXRlIHx8ICcwMDAwJykuc2xpY2UoMCw0KSlcbiAgICAgICAgbGV0IG9yaWcgPSBvYmplY3QubW92aWUub3JpZ2luYWxfdGl0bGUgfHwgb2JqZWN0Lm1vdmllLm9yaWdpbmFsX25hbWVcblxuICAgICAgICBsZXQgdXJsID0gZW1iZWQgKyAnc2VhcmNoJ1xuICAgICAgICAgICAgdXJsID0gTGFtcGEuVXRpbHMuYWRkVXJsQ29tcG9uZW50KHVybCwgJ3N0b3J5PScgKyBlbmNvZGVVUklDb21wb25lbnQocXVlcnkpKVxuICAgICAgICAgICAgdXJsID0gTGFtcGEuVXRpbHMuYWRkVXJsQ29tcG9uZW50KHVybCwgZGV2X3Rva2VuKVxuXG4gICAgICAgIG5ldHdvcmsuY2xlYXIoKVxuICAgICAgICBuZXR3b3JrLnNpbGVudCh1cmwsIChqc29uKT0+IHtcbiAgICAgICAgICAgIGxldCBjYXJkcyA9IGpzb24uZmlsdGVyKGM9PntcbiAgICAgICAgICAgICAgICBjLnllYXIgPSBwYXJzZUludChjLmFsdF9uYW1lLnNwbGl0KCctJykucG9wKCkpXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYy55ZWFyID4geWVhciAtIDIgJiYgYy55ZWFyIDwgeWVhciArIDJcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGxldCBjYXJkID0gY2FyZHMuZmluZChjPT5jLnllYXIgPT0geWVhcilcblxuICAgICAgICAgICAgaWYoIWNhcmQpe1xuICAgICAgICAgICAgICAgIGNhcmQgPSBjYXJkcy5maW5kKGM9PmMub3JpZ2luYWxfdGl0bGUgPT0gb3JpZylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIWNhcmQgJiYgY2FyZHMubGVuZ3RoID09IDEpIGNhcmQgPSBjYXJkc1swXVxuXG4gICAgICAgICAgICBpZihjYXJkKSB0aGlzLmZpbmQoY2FyZC5pZClcbiAgICAgICAgICAgIGVsc2UgaWYoanNvbi5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIHdhaXRfc2ltaWxhcnMgPSB0cnVlXG5cbiAgICAgICAgICAgICAgICBjb21wb25lbnQuc2ltaWxhcnMoanNvbilcbiAgICAgICAgICAgICAgICBjb21wb25lbnQubG9hZGluZyhmYWxzZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgY29tcG9uZW50LmRvZXNOb3RBbnN3ZXIoKVxuICAgICAgICB9LCAoYSwgYyk9PiB7XG4gICAgICAgICAgICBjb21wb25lbnQuZG9lc05vdEFuc3dlcigpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5maW5kID0gZnVuY3Rpb24gKGZpbG1peF9pZCkge1xuICAgICAgICBsZXQgdXJsID0gZW1iZWRcblxuICAgICAgICBpZiAoIXdpbmRvdy5maWxtaXguaXNfbWF4X3F1YWxpdGllICYmIHRva2VuKSB7XG4gICAgICAgICAgICB3aW5kb3cuZmlsbWl4LmlzX21heF9xdWFsaXRpZSA9IHRydWVcblxuICAgICAgICAgICAgbmV0d29yay5jbGVhcigpXG4gICAgICAgICAgICBuZXR3b3JrLnRpbWVvdXQoMTAwMDApXG4gICAgICAgICAgICBuZXR3b3JrLnNpbGVudCh1cmwgKyAndXNlcl9wcm9maWxlPycgKyBkZXZfdG9rZW4sIGZ1bmN0aW9uIChmb3VuZCkge1xuICAgICAgICAgICAgICAgIGlmIChmb3VuZCAmJiBmb3VuZC51c2VyX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kLnVzZXJfZGF0YS5pc19wcm8pIHdpbmRvdy5maWxtaXgubWF4X3F1YWxpdGllICAgICAgPSAxMDgwXG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZC51c2VyX2RhdGEuaXNfcHJvX3BsdXMpIHdpbmRvdy5maWxtaXgubWF4X3F1YWxpdGllID0gMjE2MFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVuZF9zZWFyY2goZmlsbWl4X2lkKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGVuZF9zZWFyY2goZmlsbWl4X2lkKVxuXG4gICAgICAgIGZ1bmN0aW9uIGVuZF9zZWFyY2goZmlsbWl4X2lkKSB7XG4gICAgICAgICAgICBuZXR3b3JrLmNsZWFyKCk7XG4gICAgICAgICAgICBuZXR3b3JrLnRpbWVvdXQoMTAwMDApO1xuICAgICAgICAgICAgbmV0d29yay5zaWxlbnQoKHdpbmRvdy5maWxtaXguaXNfbWF4X3F1YWxpdGllID8gdXJsICsgJ3Bvc3QvJyArIGZpbG1peF9pZCA6IHVybCArICdwb3N0LycgKyBmaWxtaXhfaWQpICsgJz8nICsgZGV2X3Rva2VuLCBmdW5jdGlvbiAoZm91bmQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm91bmQgJiYgT2JqZWN0LmtleXMoZm91bmQpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKGZvdW5kKVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5sb2FkaW5nKGZhbHNlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGNvbXBvbmVudC5kb2VzTm90QW5zd2VyKClcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChhLCBjKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LmRvZXNOb3RBbnN3ZXIoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZXh0ZW5kQ2hvaWNlID0gZnVuY3Rpb24oc2F2ZWQpe1xuICAgICAgICBMYW1wYS5BcnJheXMuZXh0ZW5kKGNob2ljZSwgc2F2ZWQsIHRydWUpXG4gICAgfVxuXG4gICAgdGhpcy5yZXNldCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbXBvbmVudC5yZXNldCgpXG5cbiAgICAgICAgY2hvaWNlID0ge1xuICAgICAgICAgICAgc2Vhc29uOiAwLFxuICAgICAgICAgICAgdm9pY2U6IDAsXG4gICAgICAgICAgICB2b2ljZV9uYW1lOiAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgZXh0cmFjdERhdGEocmVzdWx0cylcblxuICAgICAgICBmaWx0ZXIoKVxuXG4gICAgICAgIGFwcGVuZChmaWx0cmVkKCkpXG4gICAgfVxuXG4gICAgdGhpcy5maWx0ZXIgPSBmdW5jdGlvbih0eXBlLCBhLCBiKXtcbiAgICAgICAgY2hvaWNlW2Euc3R5cGVdID0gYi5pbmRleFxuXG4gICAgICAgIGlmKGEuc3R5cGUgPT0gJ3ZvaWNlJykgY2hvaWNlLnZvaWNlX25hbWUgPSBmaWx0ZXJfaXRlbXMudm9pY2VbYi5pbmRleF1cblxuICAgICAgICBjb21wb25lbnQucmVzZXQoKVxuXG4gICAgICAgIGV4dHJhY3REYXRhKHJlc3VsdHMpXG5cbiAgICAgICAgZmlsdGVyKClcblxuICAgICAgICBhcHBlbmQoZmlsdHJlZCgpKSBcbiAgICB9XG5cbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICBuZXR3b3JrLmNsZWFyKClcblxuICAgICAgICByZXN1bHRzID0gbnVsbFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN1Y2Nlc3MoanNvbikge1xuICAgICAgICByZXN1bHRzID0ganNvblxuXG4gICAgICAgIGV4dHJhY3REYXRhKGpzb24pXG5cbiAgICAgICAgZmlsdGVyKClcblxuICAgICAgICBhcHBlbmQoZmlsdHJlZCgpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dHJhY3REYXRhKGRhdGEpIHtcbiAgICAgICAgZXh0cmFjdCA9IHt9XG5cbiAgICAgICAgbGV0IHBsX2xpbmtzID0gZGF0YS5wbGF5ZXJfbGlua3NcblxuICAgICAgICBpZiAocGxfbGlua3MucGxheWxpc3QgJiYgT2JqZWN0LmtleXMocGxfbGlua3MucGxheWxpc3QpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBzZWFzX251bSA9IDBcblxuICAgICAgICAgICAgZm9yIChsZXQgc2Vhc29uIGluIHBsX2xpbmtzLnBsYXlsaXN0KSB7XG4gICAgICAgICAgICAgICAgbGV0IGVwaXNvZGUgPSBwbF9saW5rcy5wbGF5bGlzdFtzZWFzb25dXG5cbiAgICAgICAgICAgICAgICArK3NlYXNfbnVtXG5cbiAgICAgICAgICAgICAgICBsZXQgdHJhbnNsX2lkID0gMFxuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdm9pY2UgaW4gZXBpc29kZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXBpc29kZV92b2ljZSA9IGVwaXNvZGVbdm9pY2VdXG4gICAgICAgICAgICAgICAgICAgICsrdHJhbnNsX2lkXG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gW10sXG4gICAgICAgICAgICAgICAgICAgICAgICBlcGlzX251bSA9IDBcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBJRCBpbiBlcGlzb2RlX3ZvaWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZV9lcGlzb2QgPSBlcGlzb2RlX3ZvaWNlW0lEXVxuXG4gICAgICAgICAgICAgICAgICAgICAgICArK2VwaXNfbnVtXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBxdWFsaXR5X2VwcyA9IGZpbGVfZXBpc29kLnF1YWxpdGllcy5maWx0ZXIoZnVuY3Rpb24gKHF1YWxpdHlzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHlzIDw9IHdpbmRvdy5maWxtaXgubWF4X3F1YWxpdGllXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWF4X3F1YWxpdHkgPSBNYXRoLm1heC5hcHBseShudWxsLCBxdWFsaXR5X2VwcylcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHJlYW1fdXJsID0gZmlsZV9lcGlzb2QubGluay5yZXBsYWNlKCclcy5tcDQnLCBtYXhfcXVhbGl0eSArICcubXA0JylcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzX2UgPSBzdHJlYW1fdXJsLnNsaWNlKDAgLSBzdHJlYW1fdXJsLmxlbmd0aCArIHN0cmVhbV91cmwubGFzdEluZGV4T2YoJy8nKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHJfc19lID0gc19lLm1hdGNoKC9zKFxcZCspZShcXGQrPylfXFxkK1xcLm1wNC9pKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyX3NfZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWFzX251bSA9IHBhcnNlSW50KHN0cl9zX2VbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVwaXNfbnVtID0gcGFyc2VJbnQoc3RyX3NfZVsyXSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogc2Vhc19udW0gKyAnXycgKyBlcGlzX251bSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudDogZXBpc19udW0gKyAnICcgKyBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndG9ycmVudF9zZXJpYWxfZXBpc29kZScpICsgJyA8aT4nICsgSUQgKyAnPC9pPicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IHN0cmVhbV91cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVwaXNvZGU6IGVwaXNfbnVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFzb246IHNlYXNfbnVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5OiBtYXhfcXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0aWVzOiBxdWFsaXR5X2VwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IHRyYW5zbF9pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFleHRyYWN0W3RyYW5zbF9pZF0pIGV4dHJhY3RbdHJhbnNsX2lkXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzb246IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogJydcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGV4dHJhY3RbdHJhbnNsX2lkXS5qc29uLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHNlYXNfbnVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudDogc2Vhc19udW0gKyAnICcgKyBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndG9ycmVudF9zZXJpYWxfc2Vhc29uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBmb2xkZXI6IGl0ZW1zLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IHRyYW5zbF9pZFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZiAocGxfbGlua3MubW92aWUgJiYgcGxfbGlua3MubW92aWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IHRyYW5zbF9pZCA9IDBcblxuICAgICAgICAgICAgZm9yIChsZXQgSUQgaW4gcGxfbGlua3MubW92aWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgZmlsZV9lcGlzb2QgPSBwbF9saW5rcy5tb3ZpZVtJRF1cblxuICAgICAgICAgICAgICAgICsrdHJhbnNsX2lkXG5cbiAgICAgICAgICAgICAgICBsZXQgcXVhbGl0eV9lcHMgPSBmaWxlX2VwaXNvZC5saW5rLm1hdGNoKC8uK1xcWyguK1tcXGRdKSw/XFxdLisvaSlcblxuICAgICAgICAgICAgICAgIGlmIChxdWFsaXR5X2VwcykgcXVhbGl0eV9lcHMgPSBxdWFsaXR5X2Vwc1sxXS5zcGxpdCgnLCcpLmZpbHRlcihmdW5jdGlvbiAocXVhbGl0eV8pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHlfIDw9IHdpbmRvdy5maWxtaXgubWF4X3F1YWxpdGllXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIGxldCBtYXhfcXVhbGl0eSA9IE1hdGgubWF4LmFwcGx5KG51bGwsIHF1YWxpdHlfZXBzKVxuICAgICAgICAgICAgICAgIGxldCBmaWxlX3VybCA9IGZpbGVfZXBpc29kLmxpbmsucmVwbGFjZSgvXFxbKC4rW1xcZF0pLD9cXF0vaSwgbWF4X3F1YWxpdHkpXG5cbiAgICAgICAgICAgICAgICBleHRyYWN0W3RyYW5zbF9pZF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IGZpbGVfdXJsLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZmlsZV9lcGlzb2QudHJhbnNsYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6IG1heF9xdWFsaXR5LFxuICAgICAgICAgICAgICAgICAgICBxdWFsaXRpZXM6IHF1YWxpdHlfZXBzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RmlsZShlbGVtZW50LCBtYXhfcXVhbGl0eSkge1xuICAgICAgICBsZXQgdHJhbnNsYXQgPSBleHRyYWN0W2VsZW1lbnQudHJhbnNsYXRpb25dXG4gICAgICAgIGxldCBpZCAgICAgICA9IGVsZW1lbnQuc2Vhc29uICsgJ18nICsgZWxlbWVudC5lcGlzb2RlXG4gICAgICAgIGxldCBmaWxlICAgICA9ICcnXG4gICAgICAgIGxldCBxdWFsaXR5ICA9IGZhbHNlXG5cbiAgICAgICAgaWYgKHRyYW5zbGF0KSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5zZWFzb24pXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0cmFuc2xhdC5qc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVtID0gdHJhbnNsYXQuanNvbltpXVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtLmZvbGRlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGYgaW4gZWxlbS5mb2xkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9sZGVyID0gZWxlbS5mb2xkZXJbZl1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb2xkZXIuaWQgPT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZSA9IGZvbGRlci5maWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbS5pZCA9PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlID0gZWxlbS5maWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgZWxzZSBmaWxlID0gdHJhbnNsYXQuZmlsZVxuICAgICAgICB9XG5cbiAgICAgICAgbWF4X3F1YWxpdHkgPSBwYXJzZUludChtYXhfcXVhbGl0eSlcblxuICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgbGV0IGxpbmsgPSBmaWxlLnNsaWNlKDAsIGZpbGUubGFzdEluZGV4T2YoJ18nKSkgKyAnXydcbiAgICAgICAgICAgIGxldCBvcmluID0gZmlsZS5zcGxpdCgnPycpXG4gICAgICAgICAgICAgICAgb3JpbiA9IG9yaW4ubGVuZ3RoID4gMSA/ICc/JytvcmluLnNsaWNlKDEpLmpvaW4oJz8nKSA6ICcnXG5cbiAgICAgICAgICAgIGlmIChmaWxlLnNwbGl0KCdfJykucG9wKCkucmVwbGFjZSgnLm1wNCcsICcnKSAhPT0gbWF4X3F1YWxpdHkpIHtcbiAgICAgICAgICAgICAgICBmaWxlID0gbGluayArIG1heF9xdWFsaXR5ICsgJy5tcDQnICsgb3JpblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBxdWFsaXR5ID0ge31cblxuICAgICAgICAgICAgbGV0IG1hc3MgPSBbMjE2MCwgMTQ0MCwgMTA4MCwgNzIwLCA0ODAsIDM2MF1cblxuICAgICAgICAgICAgbWFzcyA9IG1hc3Muc2xpY2UobWFzcy5pbmRleE9mKG1heF9xdWFsaXR5KSlcblxuICAgICAgICAgICAgbWFzcy5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICAgICAgcXVhbGl0eVtuICsgJ3AnXSA9IGxpbmsgKyBuICsgJy5tcDQnICsgb3JpblxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgbGV0IHByZWZlcmFibHkgPSBMYW1wYS5TdG9yYWdlLmdldCgndmlkZW9fcXVhbGl0eV9kZWZhdWx0JywnMTA4MCcpICsgJ3AnXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHF1YWxpdHlbcHJlZmVyYWJseV0pIGZpbGUgPSBxdWFsaXR5W3ByZWZlcmFibHldXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgIHF1YWxpdHk6IHF1YWxpdHlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRlcigpe1xuICAgICAgICBmaWx0ZXJfaXRlbXMgPSB7XG4gICAgICAgICAgICBzZWFzb246IFtdLFxuICAgICAgICAgICAgdm9pY2U6IFtdLFxuICAgICAgICAgICAgdm9pY2VfaW5mbzogW11cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHRzLmxhc3RfZXBpc29kZSAmJiByZXN1bHRzLmxhc3RfZXBpc29kZS5zZWFzb24pIHtcbiAgICAgICAgICAgIGxldCBzID0gcmVzdWx0cy5sYXN0X2VwaXNvZGUuc2Vhc29uXG5cbiAgICAgICAgICAgIHdoaWxlIChzLS0pIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJfaXRlbXMuc2Vhc29uLnB1c2goTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RvcnJlbnRfc2VyaWFsX3NlYXNvbicpICsgJyAnICsgKHJlc3VsdHMubGFzdF9lcGlzb2RlLnNlYXNvbiAtIHMpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGkgPSAwO1xuXG4gICAgICAgIGZvciAobGV0IElkIGluIHJlc3VsdHMucGxheWVyX2xpbmtzLnBsYXlsaXN0KSB7XG4gICAgICAgICAgICBsZXQgc2Vhc29uID0gcmVzdWx0cy5wbGF5ZXJfbGlua3MucGxheWxpc3RbSWRdXG5cbiAgICAgICAgICAgICsraVxuXG4gICAgICAgICAgICBsZXQgZCA9IDBcblxuICAgICAgICAgICAgZm9yIChsZXQgdm9pYyBpbiBzZWFzb24pIHtcbiAgICAgICAgICAgICAgICArK2RcblxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJfaXRlbXMudm9pY2UuaW5kZXhPZih2b2ljKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJfaXRlbXMudm9pY2UucHVzaCh2b2ljKTtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyX2l0ZW1zLnZvaWNlX2luZm8ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogZFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNob2ljZS52b2ljZV9uYW1lKXtcbiAgICAgICAgICAgIGxldCBpbnggPSBmaWx0ZXJfaXRlbXMudm9pY2UubWFwKHY9PnYudG9Mb3dlckNhc2UoKSkuaW5kZXhPZihjaG9pY2Uudm9pY2VfbmFtZS50b0xvd2VyQ2FzZSgpKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihpbnggPT0gLTEpIGNob2ljZS52b2ljZSA9IDBcbiAgICAgICAgICAgIGVsc2UgaWYoaW54ICE9PSBjaG9pY2Uudm9pY2Upe1xuICAgICAgICAgICAgICAgIGNob2ljZS52b2ljZSA9IGlueFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9uZW50LmZpbHRlcihmaWx0ZXJfaXRlbXMsIGNob2ljZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaWx0cmVkKCl7XG4gICAgICAgIGxldCBmaWx0cmVkID0gW11cbiAgICAgICAgXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhyZXN1bHRzLnBsYXllcl9saW5rcy5wbGF5bGlzdCkubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB0cmFuc2wgaW4gZXh0cmFjdCkge1xuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gZXh0cmFjdFt0cmFuc2xdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNlYXNvbl9pZCBpbiBlbGVtZW50Lmpzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVwaXNvZGUgPSBlbGVtZW50Lmpzb25bc2Vhc29uX2lkXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVwaXNvZGUuaWQgPT0gY2hvaWNlLnNlYXNvbiArIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVwaXNvZGUuZm9sZGVyLmZvckVhY2goZnVuY3Rpb24gKG1lZGlhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lZGlhLnRyYW5zbGF0aW9uID09IGZpbHRlcl9pdGVtcy52b2ljZV9pbmZvW2Nob2ljZS52b2ljZV0uaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdHJlZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVwaXNvZGU6IHBhcnNlSW50KG1lZGlhLmVwaXNvZGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vhc29uOiBtZWRpYS5zZWFzb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RvcnJlbnRfc2VyaWFsX2VwaXNvZGUnKSArICcgJyArICBtZWRpYS5lcGlzb2RlICsgKG1lZGlhLnRpdGxlID8gJyAtICcgKyBtZWRpYS50aXRsZSA6ICcnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6IG1lZGlhLnF1YWxpdHkgKyAncCAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IG1lZGlhLnRyYW5zbGF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pY2VfbmFtZTogZmlsdGVyX2l0ZW1zLnZvaWNlW2Nob2ljZS52b2ljZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvOiBmaWx0ZXJfaXRlbXMudm9pY2VbY2hvaWNlLnZvaWNlXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYgKE9iamVjdC5rZXlzKHJlc3VsdHMucGxheWVyX2xpbmtzLm1vdmllKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IHRyYW5zbF9pZCBpbiBleHRyYWN0KSB7XG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBleHRyYWN0W3RyYW5zbF9pZF1cblxuICAgICAgICAgICAgICAgIGZpbHRyZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBlbGVtZW50LnRyYW5zbGF0aW9uLFxuICAgICAgICAgICAgICAgICAgICBxdWFsaXR5OiBlbGVtZW50LnF1YWxpdHkgKyAncCAnLFxuICAgICAgICAgICAgICAgICAgICBxdWFsaXR5czogZWxlbWVudC5xdWFsaXRpZXMsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiB0cmFuc2xfaWQsXG4gICAgICAgICAgICAgICAgICAgIHZvaWNlX25hbWU6IGVsZW1lbnQudHJhbnNsYXRpb25cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpbHRyZWRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b1BsYXlFbGVtZW50KGVsZW1lbnQpe1xuICAgICAgICBsZXQgZXh0cmEgPSBnZXRGaWxlKGVsZW1lbnQsIGVsZW1lbnQucXVhbGl0eSlcbiAgICAgICAgbGV0IHBsYXkgID0ge1xuICAgICAgICAgICAgdGl0bGU6IGVsZW1lbnQudGl0bGUsXG4gICAgICAgICAgICB1cmw6IGV4dHJhLmZpbGUsXG4gICAgICAgICAgICBxdWFsaXR5OiBleHRyYS5xdWFsaXR5LFxuICAgICAgICAgICAgdGltZWxpbmU6IGVsZW1lbnQudGltZWxpbmUsXG4gICAgICAgICAgICBjYWxsYmFjazogZWxlbWVudC5tYXJrXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGxheVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZChpdGVtcyl7XG4gICAgICAgIGNvbXBvbmVudC5yZXNldCgpXG5cbiAgICAgICAgY29tcG9uZW50LmRyYXcoaXRlbXMse1xuICAgICAgICAgICAgc2ltaWxhcnM6IHdhaXRfc2ltaWxhcnMsXG4gICAgICAgICAgICBvbkVudGVyOiAoaXRlbSwgaHRtbCk9PntcbiAgICAgICAgICAgICAgICBsZXQgZXh0cmEgPSBnZXRGaWxlKGl0ZW0sIGl0ZW0ucXVhbGl0eSlcblxuICAgICAgICAgICAgICAgIGlmKGV4dHJhLmZpbGUpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGxheWxpc3QgPSBbXVxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3QgPSB0b1BsYXlFbGVtZW50KGl0ZW0pXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS5zZWFzb24pe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMuZm9yRWFjaChlbGVtPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWxpc3QucHVzaCh0b1BsYXlFbGVtZW50KGVsZW0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWxpc3QucHVzaChmaXJzdClcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHBsYXlsaXN0Lmxlbmd0aCA+IDEpIGZpcnN0LnBsYXlsaXN0ID0gcGxheWxpc3RcblxuICAgICAgICAgICAgICAgICAgICBMYW1wYS5QbGF5ZXIucGxheShmaXJzdClcblxuICAgICAgICAgICAgICAgICAgICBMYW1wYS5QbGF5ZXIucGxheWxpc3QocGxheWxpc3QpXG5cbiAgICAgICAgICAgICAgICAgICAgaXRlbS5tYXJrKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBMYW1wYS5Ob3R5LnNob3coTGFtcGEuTGFuZy50cmFuc2xhdGUoJ29ubGluZV9ub2xpbmsnKSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNvbnRleHRNZW51OiAoaXRlbSwgaHRtbCwgZGF0YSwgY2FsbCk9PntcbiAgICAgICAgICAgICAgICBjYWxsKGdldEZpbGUoaXRlbSwgaXRlbS5xdWFsaXR5KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZpbG1peCIsImltcG9ydCB2aWRlb2NkbiBmcm9tICcuL2JhbGFuc2Vycy92aWRlb2NkbidcbmltcG9ydCByZXprYSBmcm9tICcuL2JhbGFuc2Vycy9yZXprYSdcbmltcG9ydCBraW5vYmFzZSBmcm9tICcuL2JhbGFuc2Vycy9raW5vYmFzZSdcbmltcG9ydCBjb2xsYXBzIGZyb20gJy4vYmFsYW5zZXJzL2NvbGxhcHMnXG5pbXBvcnQgZmlsbWl4IGZyb20gJy4vYmFsYW5zZXJzL2ZpbG1peCdcblxuZnVuY3Rpb24gY29tcG9uZW50KG9iamVjdCl7XG4gICAgbGV0IG5ldHdvcmsgID0gbmV3IExhbXBhLlJlZ3Vlc3QoKVxuICAgIGxldCBzY3JvbGwgICA9IG5ldyBMYW1wYS5TY3JvbGwoe21hc2s6dHJ1ZSxvdmVyOiB0cnVlfSlcbiAgICBsZXQgZmlsZXMgICAgPSBuZXcgTGFtcGEuRXhwbG9yZXIob2JqZWN0KVxuICAgIGxldCBmaWx0ZXIgICA9IG5ldyBMYW1wYS5GaWx0ZXIob2JqZWN0KVxuICAgIGxldCBzb3VyY2VzICA9IHtcbiAgICAgICAgdmlkZW9jZG46IHZpZGVvY2RuLFxuICAgICAgICByZXprYTogcmV6a2EsXG4gICAgICAgIGtpbm9iYXNlOiBraW5vYmFzZSxcbiAgICAgICAgY29sbGFwczogY29sbGFwcyxcbiAgICAgICAgZmlsbWl4OiBmaWxtaXhcbiAgICB9XG4gICAgXG5cbiAgICBsZXQgbGFzdFxuICAgIGxldCBleHRlbmRlZFxuICAgIGxldCBzZWxlY3RlZF9pZFxuICAgIGxldCBzb3VyY2VcbiAgICBsZXQgYmFsYW5zZXJcbiAgICBsZXQgaW5pdGlhbGl6ZWRcbiAgICBsZXQgYmFsYW5zZXJfdGltZXJcbiAgICBsZXQgaW1hZ2VzID0gW11cblxuICAgIGxldCBmaWx0ZXJfc291cmNlcyAgID0gTGFtcGEuQXJyYXlzLmdldEtleXMoc291cmNlcylcbiAgICBsZXQgZmlsdGVyX3RyYW5zbGF0ZSA9IHtcbiAgICAgICAgc2Vhc29uOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndG9ycmVudF9zZXJpYWxfc2Vhc29uJyksXG4gICAgICAgIHZvaWNlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndG9ycmVudF9wYXJzZXJfdm9pY2UnKSxcbiAgICAgICAgc291cmNlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnc2V0dGluZ3NfcmVzdF9zb3VyY2UnKVxuICAgIH1cblxuXG4gICAgdGhpcy5pbml0aWFsaXplID0gZnVuY3Rpb24oKXtcbiAgICAgICAgc291cmNlID0gdGhpcy5jcmVhdGVTb3VyY2UoKVxuXG4gICAgICAgIGZpbHRlci5vblNlYXJjaCA9ICh2YWx1ZSk9PntcbiAgICAgICAgICAgIExhbXBhLkFjdGl2aXR5LnJlcGxhY2Uoe1xuICAgICAgICAgICAgICAgIHNlYXJjaDogdmFsdWUsXG4gICAgICAgICAgICAgICAgY2xhcmlmaWNhdGlvbjogdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGZpbHRlci5vbkJhY2sgPSAoKT0+e1xuICAgICAgICAgICAgdGhpcy5zdGFydCgpXG4gICAgICAgIH1cblxuICAgICAgICBmaWx0ZXIucmVuZGVyKCkuZmluZCgnLnNlbGVjdG9yJykub24oJ2hvdmVyOmVudGVyJywoKT0+e1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChiYWxhbnNlcl90aW1lcilcbiAgICAgICAgfSlcblxuICAgICAgICBmaWx0ZXIub25TZWxlY3QgPSAodHlwZSwgYSwgYik9PntcbiAgICAgICAgICAgIGlmKHR5cGUgPT0gJ2ZpbHRlcicpe1xuICAgICAgICAgICAgICAgIGlmKGEucmVzZXQpe1xuICAgICAgICAgICAgICAgICAgICBpZihleHRlbmRlZCkgc291cmNlLnJlc2V0KClcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB0aGlzLnN0YXJ0KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmZpbHRlcih0eXBlLCBhLCBiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYodHlwZSA9PSAnc29ydCcpe1xuICAgICAgICAgICAgICAgIExhbXBhLlNlbGVjdC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUJhbGFuc2VyKGEuc291cmNlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoZmlsdGVyLmFkZEJ1dHRvbkJhY2spIGZpbHRlci5hZGRCdXR0b25CYWNrKClcblxuICAgICAgICBmaWx0ZXIucmVuZGVyKCkuZmluZCgnLmZpbHRlci0tc29ydCBzcGFuJykudGV4dChMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnb25saW5lX2JhbGFuc2VyJykpXG5cbiAgICAgICAgZmlsZXMuYXBwZW5kRmlsZXMoc2Nyb2xsLnJlbmRlcigpKVxuICAgICAgICBmaWxlcy5hcHBlbmRIZWFkKGZpbHRlci5yZW5kZXIoKSlcblxuICAgICAgICBzY3JvbGwuYm9keSgpLmFkZENsYXNzKCd0b3JyZW50LWxpc3QnKVxuXG4gICAgICAgIHNjcm9sbC5taW51cyhmaWxlcy5yZW5kZXIoKS5maW5kKCcuZXhwbG9yZXJfX2ZpbGVzLWhlYWQnKSlcblxuICAgICAgICB0aGlzLnNlYXJjaCgpXG4gICAgfVxuXG4gICAgdGhpcy5jaGFuZ2VCYWxhbnNlciA9IGZ1bmN0aW9uKGJhbGFuc2VyX25hbWUpe1xuICAgICAgICBsZXQgbGFzdF9zZWxlY3RfYmFsYW5zZXIgPSBMYW1wYS5TdG9yYWdlLmNhY2hlKCdvbmxpbmVfbGFzdF9iYWxhbnNlcicsIDMwMDAsIHt9KVxuICAgICAgICAgICAgbGFzdF9zZWxlY3RfYmFsYW5zZXJbb2JqZWN0Lm1vdmllLmlkXSA9IGJhbGFuc2VyX25hbWVcblxuICAgICAgICBMYW1wYS5TdG9yYWdlLnNldCgnb25saW5lX2xhc3RfYmFsYW5zZXInLCBsYXN0X3NlbGVjdF9iYWxhbnNlcilcbiAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoJ29ubGluZV9iYWxhbnNlcicsIGJhbGFuc2VyX25hbWUpXG5cbiAgICAgICAgbGV0IHRvICAgPSB0aGlzLmdldENob2ljZShiYWxhbnNlcl9uYW1lKVxuICAgICAgICBsZXQgZnJvbSA9IHRoaXMuZ2V0Q2hvaWNlKClcblxuICAgICAgICBpZihmcm9tLnZvaWNlX25hbWUpIHRvLnZvaWNlX25hbWUgPSBmcm9tLnZvaWNlX25hbWVcblxuICAgICAgICB0aGlzLnNhdmVDaG9pY2UodG8sIGJhbGFuc2VyX25hbWUpXG5cbiAgICAgICAgTGFtcGEuQWN0aXZpdHkucmVwbGFjZSgpXG4gICAgfVxuXG4gICAgdGhpcy5jcmVhdGVTb3VyY2UgPSBmdW5jdGlvbigpe1xuICAgICAgICBsZXQgbGFzdF9zZWxlY3RfYmFsYW5zZXIgPSBMYW1wYS5TdG9yYWdlLmNhY2hlKCdvbmxpbmVfbGFzdF9iYWxhbnNlcicsIDMwMDAsIHt9KVxuXG4gICAgICAgIGlmKGxhc3Rfc2VsZWN0X2JhbGFuc2VyW29iamVjdC5tb3ZpZS5pZF0pe1xuICAgICAgICAgICAgYmFsYW5zZXIgPSBsYXN0X3NlbGVjdF9iYWxhbnNlcltvYmplY3QubW92aWUuaWRdXG5cbiAgICAgICAgICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdvbmxpbmVfbGFzdF9iYWxhbnNlcicsIGxhc3Rfc2VsZWN0X2JhbGFuc2VyKVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBiYWxhbnNlciA9IExhbXBhLlN0b3JhZ2UuZ2V0KCdvbmxpbmVfYmFsYW5zZXInLCAnZmlsbWl4JylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFzb3VyY2VzW2JhbGFuc2VyXSl7XG4gICAgICAgICAgICBiYWxhbnNlciA9ICdmaWxtaXgnXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IHNvdXJjZXNbYmFsYW5zZXJdKHRoaXMsIG9iamVjdClcbiAgICB9XG5cbiAgICB0aGlzLnByb3h5ID0gZnVuY3Rpb24obmFtZSl7XG4gICAgICAgIGxldCBwcm94ID0gTGFtcGEuU3RvcmFnZS5nZXQoJ29ubGluZV9wcm94eV9hbGwnKVxuICAgICAgICBsZXQgbmVlZCA9IExhbXBhLlN0b3JhZ2UuZ2V0KCdvbmxpbmVfcHJveHlfJytuYW1lKVxuXG4gICAgICAgIGlmKG5lZWQpIHByb3ggPSBuZWVkXG5cbiAgICAgICAgaWYocHJveCAmJiBwcm94LnNsaWNlKC0xKSAhPT0gJy8nKXtcbiAgICAgICAgICAgIHByb3ggKz0gJy8nXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJveFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0L7QtNCz0L7RgtC+0LLQutCwXG4gICAgICovXG4gICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXIoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCd0LDRh9Cw0YLRjCDQv9C+0LjRgdC6XG4gICAgICovXG4gICAgdGhpcy5zZWFyY2ggPSBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmFjdGl2aXR5LmxvYWRlcih0cnVlKVxuXG4gICAgICAgIHRoaXMuZmlsdGVyKHtcbiAgICAgICAgICAgIHNvdXJjZTogZmlsdGVyX3NvdXJjZXNcbiAgICAgICAgfSx0aGlzLmdldENob2ljZSgpKVxuXG4gICAgICAgIHRoaXMuZmluZCgpXG4gICAgfVxuXG4gICAgdGhpcy5maW5kID0gZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0IHVybCAgID0gdGhpcy5wcm94eSgndmlkZW9jZG4nKSArICdodHRwczovL3ZpZGVvY2RuLnR2L2FwaS9zaG9ydCdcbiAgICAgICAgbGV0IHF1ZXJ5ID0gb2JqZWN0LnNlYXJjaFxuXG4gICAgICAgIHVybCA9IExhbXBhLlV0aWxzLmFkZFVybENvbXBvbmVudCh1cmwsJ2FwaV90b2tlbj0zaTQwRzVUU0VDbUxGNzdvQXFuRWdieDYxWldhT1lhRScpXG4gICAgICAgIFxuICAgICAgICBjb25zdCBkaXNwbGF5ID0gKGpzb24pPT57XG4gICAgICAgICAgICBpZihvYmplY3QubW92aWUuaW1kYl9pZCl7XG4gICAgICAgICAgICAgICAgbGV0IGltZGIgPSBqc29uLmRhdGEuZmlsdGVyKGVsZW09PmVsZW0uaW1kYl9pZCA9PSBvYmplY3QubW92aWUuaW1kYl9pZClcblxuICAgICAgICAgICAgICAgIGlmKGltZGIubGVuZ3RoKSBqc29uLmRhdGEgPSBpbWRiXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGpzb24uZGF0YSAmJiBqc29uLmRhdGEubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBpZihqc29uLmRhdGEubGVuZ3RoID09IDEgfHwgb2JqZWN0LmNsYXJpZmljYXRpb24pe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4dGVuZENob2ljZSgpXG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGtpbm9wb2lza19pZCA9IGpzb24uZGF0YVswXS5rcF9pZCB8fCBqc29uLmRhdGFbMF0uZmlsbUlkXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoa2lub3BvaXNrX2lkICYmIHNvdXJjZS5zZWFyY2hCeUtpbm9wb2lzayl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2Uuc2VhcmNoQnlLaW5vcG9pc2sob2JqZWN0LCBraW5vcG9pc2tfaWQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihqc29uLmRhdGFbMF0uaW1kYl9pZCAmJiBzb3VyY2Uuc2VhcmNoQnlJbWRiSUQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlLnNlYXJjaEJ5SW1kYklEKG9iamVjdCwganNvbi5kYXRhWzBdLmltZGJfaWQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihzb3VyY2Uuc2VhcmNoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZS5zZWFyY2gob2JqZWN0LCBqc29uLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9lc05vdEFuc3dlcigpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaW1pbGFycyhqc29uLmRhdGEpXG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nKGZhbHNlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgdGhpcy5kb2VzTm90QW5zd2VyKHF1ZXJ5KVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGlsbG93ID0gKGEsIGMpPT57XG4gICAgICAgICAgICBuZXR3b3JrLnRpbWVvdXQoMTAwMCoxNSlcblxuICAgICAgICAgICAgbmV0d29yay5uYXRpdmUoJ2h0dHBzOi8va2lub3BvaXNrYXBpdW5vZmZpY2lhbC50ZWNoL2FwaS92Mi4xL2ZpbG1zL3NlYXJjaC1ieS1rZXl3b3JkP2tleXdvcmQ9JytlbmNvZGVVUklDb21wb25lbnQocXVlcnkpLChqc29uKT0+e1xuICAgICAgICAgICAgICAgIGpzb24uZGF0YSA9IGpzb24uZmlsbXNcblxuICAgICAgICAgICAgICAgIGRpc3BsYXkoanNvbilcbiAgICAgICAgICAgIH0sKGEsIGMpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5kb2VzTm90QW5zd2VyKClcbiAgICAgICAgICAgIH0sZmFsc2Use1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ1gtQVBJLUtFWSc6ICcyZDU1YWRmZC0wMTlkLTQ1NjctYmJmNy02N2Q1MDNmNjFiNWEnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxldGdvID0gKGltZGJfaWQpPT57XG4gICAgICAgICAgICBpZihpbWRiX2lkICYmIHNvdXJjZS5zZWFyY2hCeUltZGJJRCl7XG4gICAgICAgICAgICAgICAgdGhpcy5leHRlbmRDaG9pY2UoKVxuXG4gICAgICAgICAgICAgICAgc291cmNlLnNlYXJjaEJ5SW1kYklEKG9iamVjdCwgaW1kYl9pZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgbGV0IHVybF9lbmQgPSBMYW1wYS5VdGlscy5hZGRVcmxDb21wb25lbnQodXJsLCBpbWRiX2lkID8gJ2ltZGJfaWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChpbWRiX2lkKSA6ICd0aXRsZT0nK2VuY29kZVVSSUNvbXBvbmVudChxdWVyeSkpXG5cbiAgICAgICAgICAgICAgICBuZXR3b3JrLnRpbWVvdXQoMTAwMCoxNSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBuZXR3b3JrLm5hdGl2ZSh1cmxfZW5kLChqc29uKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZihqc29uLmRhdGEgJiYganNvbi5kYXRhLmxlbmd0aCkgZGlzcGxheShqc29uKVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29yay5uYXRpdmUoTGFtcGEuVXRpbHMuYWRkVXJsQ29tcG9uZW50KHVybCwgJ3RpdGxlPScrZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KSksZGlzcGxheS5iaW5kKHRoaXMpLHBpbGxvdy5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxwaWxsb3cuYmluZCh0aGlzKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYoc291cmNlLnNlYXJjaEJ5VGl0bGUpe1xuICAgICAgICAgICAgdGhpcy5leHRlbmRDaG9pY2UoKVxuXG4gICAgICAgICAgICBzb3VyY2Uuc2VhcmNoQnlUaXRsZShvYmplY3QsIG9iamVjdC5tb3ZpZS50aXRsZSB8fCBvYmplY3QubW92aWUubmFtZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKG9iamVjdC5tb3ZpZS5raW5vcG9pc2tfaWQgJiYgc291cmNlLnNlYXJjaEJ5S2lub3BvaXNrKXtcbiAgICAgICAgICAgIHRoaXMuZXh0ZW5kQ2hvaWNlKClcblxuICAgICAgICAgICAgc291cmNlLnNlYXJjaEJ5S2lub3BvaXNrKG9iamVjdCwgb2JqZWN0Lm1vdmllLmtpbm9wb2lza19pZClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKG9iamVjdC5tb3ZpZS5pbWRiX2lkKXtcbiAgICAgICAgICAgIGxldGdvKG9iamVjdC5tb3ZpZS5pbWRiX2lkKVxuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmKG9iamVjdC5tb3ZpZS5zb3VyY2UgPT0gJ3RtZGInIHx8IG9iamVjdC5tb3ZpZS5zb3VyY2UgPT0gJ2N1Yicpe1xuICAgICAgICAgICAgbGV0IHRtZGJ1cmwgPSAob2JqZWN0Lm1vdmllLm5hbWUgPyAndHYnIDogJ21vdmllJykgKyAnLycgKyBvYmplY3QubW92aWUuaWQgKyAnL2V4dGVybmFsX2lkcz9hcGlfa2V5PTRlZjBkNzM1NWQ5ZmZiNTE1MWU5ODc3NjQ3MDhjZTk2Jmxhbmd1YWdlPXJ1J1xuICAgICAgICAgICAgbGV0IGJhc2V1cmwgPSBMYW1wYS5UTURCLmFwaSh0bWRidXJsKVxuXG4gICAgICAgICAgICBuZXR3b3JrLnRpbWVvdXQoMTAwMCoxMClcblxuICAgICAgICAgICAgbmV0d29yay5uYXRpdmUoYmFzZXVybCwgZnVuY3Rpb24gKHR0aWQpIHtcbiAgICAgICAgICAgICAgICBsZXRnbyh0dGlkLmltZGJfaWQpXG4gICAgICAgICAgICB9LChhLCBjKT0+e1xuICAgICAgICAgICAgICAgIGxldGdvKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGxldGdvKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZ2V0Q2hvaWNlID0gZnVuY3Rpb24oZm9yX2JhbGFuc2VyKXtcbiAgICAgICAgbGV0IGRhdGEgPSBMYW1wYS5TdG9yYWdlLmNhY2hlKCdvbmxpbmVfY2hvaWNlXycrKGZvcl9iYWxhbnNlciB8fCBiYWxhbnNlciksIDMwMDAsIHt9KVxuICAgICAgICBsZXQgc2F2ZSA9IGRhdGFbc2VsZWN0ZWRfaWQgfHwgb2JqZWN0Lm1vdmllLmlkXSB8fCB7fVxuXG4gICAgICAgIExhbXBhLkFycmF5cy5leHRlbmQoc2F2ZSwge1xuICAgICAgICAgICAgc2Vhc29uOiAwLFxuICAgICAgICAgICAgdm9pY2U6IDAsXG4gICAgICAgICAgICB2b2ljZV9uYW1lOiAnJyxcbiAgICAgICAgICAgIHZvaWNlX2lkOiAwLFxuICAgICAgICAgICAgZXBpc29kZXNfdmlldzoge30sXG4gICAgICAgICAgICBtb3ZpZV92aWV3OiAnJ1xuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBzYXZlXG4gICAgfVxuXG4gICAgdGhpcy5leHRlbmRDaG9pY2UgPSBmdW5jdGlvbigpe1xuICAgICAgICBleHRlbmRlZCA9IHRydWVcblxuICAgICAgICBzb3VyY2UuZXh0ZW5kQ2hvaWNlKHRoaXMuZ2V0Q2hvaWNlKCkpXG4gICAgfVxuXG4gICAgdGhpcy5zYXZlQ2hvaWNlID0gZnVuY3Rpb24oY2hvaWNlLCBmb3JfYmFsYW5zZXIpe1xuICAgICAgICBsZXQgZGF0YSA9IExhbXBhLlN0b3JhZ2UuY2FjaGUoJ29ubGluZV9jaG9pY2VfJysoZm9yX2JhbGFuc2VyIHx8IGJhbGFuc2VyKSwgMzAwMCwge30pXG5cbiAgICAgICAgICAgIGRhdGFbc2VsZWN0ZWRfaWQgfHwgb2JqZWN0Lm1vdmllLmlkXSA9IGNob2ljZVxuXG4gICAgICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdvbmxpbmVfY2hvaWNlXycrKGZvcl9iYWxhbnNlciB8fCBiYWxhbnNlciksIGRhdGEpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JXRgdGC0Ywg0L/QvtGF0L7QttC40LUg0LrQsNGA0YLQvtGH0LrQuFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBqc29uIFxuICAgICAqL1xuICAgICB0aGlzLnNpbWlsYXJzID0gZnVuY3Rpb24oanNvbil7XG4gICAgICAgIGpzb24uZm9yRWFjaChlbGVtPT57XG4gICAgICAgICAgICBsZXQgaW5mbyA9IFtdXG4gICAgICAgICAgICBsZXQgeWVhciA9ICgoZWxlbS5zdGFydF9kYXRlIHx8IGVsZW0ueWVhciB8fCAnJykgKyAnJykuc2xpY2UoMCw0KVxuXG4gICAgICAgICAgICBpZihlbGVtLnJhdGluZyAmJiBlbGVtLnJhdGluZyAhPT0gJ251bGwnICYmIGVsZW0uZmlsbUlkKSBpbmZvLnB1c2goTGFtcGEuVGVtcGxhdGUuZ2V0KCdvbmxpbmVfcHJlc3RpZ2VfcmF0ZScse3JhdGU6IGVsZW0ucmF0aW5nfSx0cnVlKSlcblxuICAgICAgICAgICAgaWYoeWVhcikgaW5mby5wdXNoKHllYXIpXG5cbiAgICAgICAgICAgIGlmKGVsZW0uY291bnRyaWVzICYmIGVsZW0uY291bnRyaWVzLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgaW5mby5wdXNoKChlbGVtLmZpbG1JZCA/IGVsZW0uY291bnRyaWVzLm1hcChjPT5jLmNvdW50cnkpIDogZWxlbS5jb3VudHJpZXMpLmpvaW4oJywgJykpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGVsZW0uY2F0ZWdvcmllcyAmJiBlbGVtLmNhdGVnb3JpZXMubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBpbmZvLnB1c2goZWxlbS5jYXRlZ29yaWVzLnNsaWNlKDAsNCkuam9pbignLCAnKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG5hbWUgPSBlbGVtLnRpdGxlIHx8IGVsZW0ucnVfdGl0bGUgfHwgZWxlbS5lbl90aXRsZSB8fCBlbGVtLm5hbWVSdSB8fCBlbGVtLm5hbWVFblxuICAgICAgICAgICAgbGV0IG9yaWcgPSBlbGVtLm9yaWdfdGl0bGUgfHwgZWxlbS5uYW1lRW4gfHwgJydcblxuICAgICAgICAgICAgZWxlbS50aXRsZSA9IG5hbWUgKyAob3JpZyAmJiBvcmlnICE9PSBuYW1lID8gJyAvICcgKyBvcmlnIDogJycpIFxuICAgICAgICAgICAgZWxlbS50aW1lICA9IGVsZW0uZmlsbUxlbmd0aCB8fCAnJ1xuICAgICAgICAgICAgZWxlbS5pbmZvICA9IGluZm8uam9pbignPHNwYW4gY2xhc3M9XCJvbmxpbmUtcHJlc3RpZ2Utc3BsaXRcIj7il488L3NwYW4+JylcblxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBMYW1wYS5UZW1wbGF0ZS5nZXQoJ29ubGluZV9wcmVzdGlnZV9mb2xkZXInLGVsZW0pXG5cbiAgICAgICAgICAgIGl0ZW0ub24oJ2hvdmVyOmVudGVyJywoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdHkubG9hZGVyKHRydWUpXG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KClcblxuICAgICAgICAgICAgICAgIG9iamVjdC5zZWFyY2hfZGF0ZSA9IHllYXJcblxuICAgICAgICAgICAgICAgIHNlbGVjdGVkX2lkID0gZWxlbS5pZFxuXG4gICAgICAgICAgICAgICAgdGhpcy5leHRlbmRDaG9pY2UoKVxuXG4gICAgICAgICAgICAgICAgbGV0IGtpbm9wb2lza19pZCA9IGVsZW0ua3BfaWQgfHwgZWxlbS5maWxtSWRcblxuICAgICAgICAgICAgICAgIGlmKGtpbm9wb2lza19pZCAmJiBzb3VyY2Uuc2VhcmNoQnlLaW5vcG9pc2spe1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2Uuc2VhcmNoQnlLaW5vcG9pc2sob2JqZWN0LCBraW5vcG9pc2tfaWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc291cmNlLnNlYXJjaCl7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5zZWFyY2gob2JqZWN0LCBbZWxlbV0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9lc05vdEFuc3dlcigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkub24oJ2hvdmVyOmZvY3VzJywoZSk9PntcbiAgICAgICAgICAgICAgICBsYXN0ID0gZS50YXJnZXRcbiAgICBcbiAgICAgICAgICAgICAgICBzY3JvbGwudXBkYXRlKCQoZS50YXJnZXQpLHRydWUpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBzY3JvbGwuYXBwZW5kKGl0ZW0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5jbGVhckltYWdlcyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGltYWdlcy5mb3JFYWNoKGltZz0+e1xuICAgICAgICAgICAgaW1nLm9uZXJyb3IgPSAoKT0+e31cbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSAoKT0+e31cblxuICAgICAgICAgICAgaW1nLnNyYyA9ICcnXG4gICAgICAgIH0pXG5cbiAgICAgICAgaW1hZ2VzID0gW11cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQntGH0LjRgdGC0LjRgtGMINGB0L/QuNGB0L7QuiDRhNCw0LnQu9C+0LJcbiAgICAgKi9cbiAgICB0aGlzLnJlc2V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgbGFzdCA9IGZhbHNlXG5cbiAgICAgICAgY2xlYXJJbnRlcnZhbChiYWxhbnNlcl90aW1lcilcblxuICAgICAgICBuZXR3b3JrLmNsZWFyKClcblxuICAgICAgICB0aGlzLmNsZWFySW1hZ2VzKClcblxuICAgICAgICBzY3JvbGwucmVuZGVyKCkuZmluZCgnLmVtcHR5JykucmVtb3ZlKClcblxuICAgICAgICBzY3JvbGwuY2xlYXIoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCX0LDQs9GA0YPQt9C60LBcbiAgICAgKi9cbiAgICB0aGlzLmxvYWRpbmcgPSBmdW5jdGlvbihzdGF0dXMpe1xuICAgICAgICBpZihzdGF0dXMpIHRoaXMuYWN0aXZpdHkubG9hZGVyKHRydWUpXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5LmxvYWRlcihmYWxzZSlcblxuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eS50b2dnbGUoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J/QvtGB0YLRgNC+0LjRgtGMINGE0LjQu9GM0YLRgFxuICAgICAqL1xuICAgIHRoaXMuZmlsdGVyID0gZnVuY3Rpb24oZmlsdGVyX2l0ZW1zLCBjaG9pY2Upe1xuICAgICAgICBsZXQgc2VsZWN0ID0gW11cblxuICAgICAgICBsZXQgYWRkID0gKHR5cGUsIHRpdGxlKT0+e1xuICAgICAgICAgICAgbGV0IG5lZWQgICAgID0gdGhpcy5nZXRDaG9pY2UoKVxuICAgICAgICAgICAgbGV0IGl0ZW1zICAgID0gZmlsdGVyX2l0ZW1zW3R5cGVdXG4gICAgICAgICAgICBsZXQgc3ViaXRlbXMgPSBbXVxuICAgICAgICAgICAgbGV0IHZhbHVlICAgID0gbmVlZFt0eXBlXVxuXG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKChuYW1lLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgc3ViaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBuYW1lLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogdmFsdWUgPT0gaSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgc2VsZWN0LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgICAgICBzdWJ0aXRsZTogaXRlbXNbdmFsdWVdLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBzdWJpdGVtcyxcbiAgICAgICAgICAgICAgICBzdHlwZTogdHlwZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGZpbHRlcl9pdGVtcy5zb3VyY2UgPSBmaWx0ZXJfc291cmNlc1xuXG4gICAgICAgIHNlbGVjdC5wdXNoKHtcbiAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndG9ycmVudF9wYXJzZXJfcmVzZXQnKSxcbiAgICAgICAgICAgIHJlc2V0OiB0cnVlXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5zYXZlQ2hvaWNlKGNob2ljZSlcblxuICAgICAgICBpZihmaWx0ZXJfaXRlbXMudm9pY2UgJiYgZmlsdGVyX2l0ZW1zLnZvaWNlLmxlbmd0aCkgYWRkKCd2b2ljZScsTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RvcnJlbnRfcGFyc2VyX3ZvaWNlJykpXG5cbiAgICAgICAgaWYoZmlsdGVyX2l0ZW1zLnNlYXNvbiAmJiBmaWx0ZXJfaXRlbXMuc2Vhc29uLmxlbmd0aCkgYWRkKCdzZWFzb24nLExhbXBhLkxhbmcudHJhbnNsYXRlKCd0b3JyZW50X3NlcmlhbF9zZWFzb24nKSlcblxuICAgICAgICBmaWx0ZXIuc2V0KCdmaWx0ZXInLCBzZWxlY3QpIFxuICAgICAgICBmaWx0ZXIuc2V0KCdzb3J0JywgZmlsdGVyX3NvdXJjZXMubWFwKGU9PntyZXR1cm4ge3RpdGxlOmUsc291cmNlOmUsc2VsZWN0ZWQ6ZT09YmFsYW5zZXJ9fSkpIFxuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQoZmlsdGVyX2l0ZW1zKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCX0LDQutGA0YvRgtGMINGE0LjQu9GM0YLRgFxuICAgICAqL1xuICAgIHRoaXMuY2xvc2VGaWx0ZXIgPSBmdW5jdGlvbigpe1xuICAgICAgICBpZigkKCdib2R5JykuaGFzQ2xhc3MoJ3NlbGVjdGJveC0tb3BlbicpKSBMYW1wYS5TZWxlY3QuY2xvc2UoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0L7QutCw0LfQsNGC0Ywg0YfRgtC+INCy0YvQsdGA0LDQvdC+INCyINGE0LjQu9GM0YLRgNC1XG4gICAgICovXG4gICAgdGhpcy5zZWxlY3RlZCA9IGZ1bmN0aW9uKGZpbHRlcl9pdGVtcyl7XG4gICAgICAgIGxldCBuZWVkICAgPSB0aGlzLmdldENob2ljZSgpLFxuICAgICAgICAgICAgc2VsZWN0ID0gW11cblxuICAgICAgICBmb3IobGV0IGkgaW4gbmVlZCl7XG4gICAgICAgICAgICBpZihmaWx0ZXJfaXRlbXNbaV0gJiYgZmlsdGVyX2l0ZW1zW2ldLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgaWYoaSA9PSAndm9pY2UnKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnB1c2goZmlsdGVyX3RyYW5zbGF0ZVtpXSArICc6ICcgKyBmaWx0ZXJfaXRlbXNbaV1bbmVlZFtpXV0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoaSAhPT0gJ3NvdXJjZScpe1xuICAgICAgICAgICAgICAgICAgICBpZihmaWx0ZXJfaXRlbXMuc2Vhc29uLmxlbmd0aCA+PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC5wdXNoKGZpbHRlcl90cmFuc2xhdGUuc2Vhc29uICsgJzogJyArIGZpbHRlcl9pdGVtc1tpXVtuZWVkW2ldXSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZpbHRlci5jaG9zZW4oJ2ZpbHRlcicsIHNlbGVjdClcbiAgICAgICAgZmlsdGVyLmNob3Nlbignc29ydCcsIFtiYWxhbnNlcl0pXG4gICAgfVxuXG4gICAgdGhpcy5nZXRFcGlzb2RlcyA9IGZ1bmN0aW9uKHNlYXNvbiwgY2FsbCl7XG4gICAgICAgIGxldCBlcGlzb2RlcyA9IFtdXG5cbiAgICAgICAgaWYodHlwZW9mIG9iamVjdC5tb3ZpZS5pZCA9PSAnbnVtYmVyJyAmJiBvYmplY3QubW92aWUubmFtZSl7XG4gICAgICAgICAgICBMYW1wYS5BcGkuc291cmNlcy50bWRiLmdldCgndHYvJyArIG9iamVjdC5tb3ZpZS5pZCArICcvc2Vhc29uLycrc2Vhc29uLCB7fSwgZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICAgICAgZXBpc29kZXMgPSBkYXRhLmVwaXNvZGVzIHx8IFtdXG5cbiAgICAgICAgICAgICAgICBjYWxsKGVwaXNvZGVzKVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBjYWxsKGVwaXNvZGVzKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGNhbGwoZXBpc29kZXMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JTQvtCx0LDQstC40YLRjCDRjdC70LXQvNC10L3RgtGLINCyINGB0L/QuNGB0L7QulxuICAgICAqL1xuICAgIHRoaXMuYXBwZW5kID0gZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgIGl0ZW0ub24oJ2hvdmVyOmZvY3VzJywoZSk9PntcbiAgICAgICAgICAgIGxhc3QgPSBlLnRhcmdldFxuXG4gICAgICAgICAgICBzY3JvbGwudXBkYXRlKCQoZS50YXJnZXQpLHRydWUpXG4gICAgICAgIH0pXG5cbiAgICAgICAgc2Nyb2xsLmFwcGVuZChpdGVtKVxuICAgIH1cblxuICAgIHRoaXMud2F0Y2hlZCA9IGZ1bmN0aW9uKHNldCl7XG4gICAgICAgIGxldCBmaWxlX2lkID0gTGFtcGEuVXRpbHMuaGFzaChvYmplY3QubW92aWUubnVtYmVyX29mX3NlYXNvbnMgPyBvYmplY3QubW92aWUub3JpZ2luYWxfbmFtZSA6IG9iamVjdC5tb3ZpZS5vcmlnaW5hbF90aXRsZSlcbiAgICAgICAgbGV0IHdhdGNoZWQgPSBMYW1wYS5TdG9yYWdlLmNhY2hlKCdvbmxpbmVfd2F0Y2hlZF9sYXN0JywgNTAwMCwge30pXG5cbiAgICAgICAgaWYoc2V0KXtcbiAgICAgICAgICAgIGlmKCF3YXRjaGVkW2ZpbGVfaWRdKSB3YXRjaGVkW2ZpbGVfaWRdID0ge31cblxuICAgICAgICAgICAgTGFtcGEuQXJyYXlzLmV4dGVuZCh3YXRjaGVkW2ZpbGVfaWRdLCBzZXQsIHRydWUpXG5cbiAgICAgICAgICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdvbmxpbmVfd2F0Y2hlZF9sYXN0Jywgd2F0Y2hlZClcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVXYXRjaGVkKClcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIHdhdGNoZWRbZmlsZV9pZF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlV2F0Y2hlZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGxldCB3YXRjaGVkID0gdGhpcy53YXRjaGVkKClcbiAgICAgICAgbGV0IGJvZHkgICAgPSBzY3JvbGwuYm9keSgpLmZpbmQoJy5vbmxpbmUtcHJlc3RpZ2Utd2F0Y2hlZCAub25saW5lLXByZXN0aWdlLXdhdGNoZWRfX2JvZHknKS5lbXB0eSgpXG5cbiAgICAgICAgaWYod2F0Y2hlZCl7XG4gICAgICAgICAgICBsZXQgbGluZSA9IFtdXG5cbiAgICAgICAgICAgIGlmKHdhdGNoZWQuYmFsYW5zZXJfbmFtZSkgbGluZS5wdXNoKHdhdGNoZWQuYmFsYW5zZXJfbmFtZSlcbiAgICAgICAgICAgIGlmKHdhdGNoZWQudm9pY2VfbmFtZSkgICAgbGluZS5wdXNoKHdhdGNoZWQudm9pY2VfbmFtZSlcbiAgICAgICAgICAgIGlmKHdhdGNoZWQuc2Vhc29uKSAgICAgICAgbGluZS5wdXNoKExhbXBhLkxhbmcudHJhbnNsYXRlKCd0b3JyZW50X3NlcmlhbF9zZWFzb24nKSArICcgJyArIHdhdGNoZWQuc2Vhc29uKVxuICAgICAgICAgICAgaWYod2F0Y2hlZC5lcGlzb2RlKSAgICAgICBsaW5lLnB1c2goTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RvcnJlbnRfc2VyaWFsX2VwaXNvZGUnKSArICcgJyArIHdhdGNoZWQuZXBpc29kZSlcblxuICAgICAgICAgICAgbGluZS5mb3JFYWNoKG49PntcbiAgICAgICAgICAgICAgICBib2R5LmFwcGVuZCgnPHNwYW4+JytuKyc8L3NwYW4+JylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBib2R5LmFwcGVuZCgnPHNwYW4+JytMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnb25saW5lX25vX3dhdGNoX2hpc3RvcnknKSsnPC9zcGFuPicpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J7RgtGA0LjRgdC+0LLQutCwINGE0LDQudC70L7QslxuICAgICAqL1xuICAgIHRoaXMuZHJhdyA9IGZ1bmN0aW9uKGl0ZW1zLCBwYXJhbXMgPSB7fSl7XG4gICAgICAgIGlmKCFpdGVtcy5sZW5ndGgpIHJldHVybiB0aGlzLmVtcHR5KClcblxuICAgICAgICBzY3JvbGwuYXBwZW5kKExhbXBhLlRlbXBsYXRlLmdldCgnb25saW5lX3ByZXN0aWdlX3dhdGNoZWQnLCB7fSkpXG5cbiAgICAgICAgdGhpcy51cGRhdGVXYXRjaGVkKClcblxuICAgICAgICB0aGlzLmdldEVwaXNvZGVzKGl0ZW1zWzBdLnNlYXNvbixlcGlzb2Rlcz0+e1xuICAgICAgICAgICAgbGV0IHZpZXdlZCA9IExhbXBhLlN0b3JhZ2UuY2FjaGUoJ29ubGluZV92aWV3JywgNTAwMCwgW10pXG4gICAgICAgICAgICBsZXQgc2VyaWFsID0gb2JqZWN0Lm1vdmllLm5hbWUgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICAgIGxldCBjaG9pY2UgPSB0aGlzLmdldENob2ljZSgpXG4gICAgICAgICAgICBsZXQgZnVsbHkgID0gd2luZG93LmlubmVyV2lkdGggPiA0ODBcblxuICAgICAgICAgICAgbGV0IHNjcm9sbF90b19lbGVtZW50ID0gZmFsc2VcbiAgICAgICAgICAgIGxldCBzY3JvbGxfdG9fbWFyayAgICA9IGZhbHNlXG5cbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGVwaXNvZGUgICAgICA9IHNlcmlhbCAmJiBlcGlzb2Rlcy5sZW5ndGggJiYgIXBhcmFtcy5zaW1pbGFycyA/IGVwaXNvZGVzLmZpbmQoZT0+ZS5lcGlzb2RlX251bWJlciA9PSBlbGVtZW50LmVwaXNvZGUpIDogZmFsc2VcbiAgICAgICAgICAgICAgICBsZXQgZXBpc29kZV9udW0gID0gZWxlbWVudC5lcGlzb2RlIHx8IChpbmRleCArIDEpXG4gICAgICAgICAgICAgICAgbGV0IGVwaXNvZGVfbGFzdCA9IGNob2ljZS5lcGlzb2Rlc192aWV3W2VsZW1lbnQuc2Vhc29uXVxuXG4gICAgICAgICAgICAgICAgTGFtcGEuQXJyYXlzLmV4dGVuZChlbGVtZW50LHtcbiAgICAgICAgICAgICAgICAgICAgaW5mbzogJycsXG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6ICcnLFxuICAgICAgICAgICAgICAgICAgICB0aW1lOiBMYW1wYS5VdGlscy5zZWNvbmRzVG9UaW1lKChlcGlzb2RlID8gZXBpc29kZS5ydW50aW1lIDogb2JqZWN0Lm1vdmllLnJ1bnRpbWUpICogNjAsdHJ1ZSlcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgbGV0IGhhc2hfdGltZWxpbmUgPSBMYW1wYS5VdGlscy5oYXNoKGVsZW1lbnQuc2Vhc29uID8gW2VsZW1lbnQuc2Vhc29uLGVsZW1lbnQuZXBpc29kZSxvYmplY3QubW92aWUub3JpZ2luYWxfdGl0bGVdLmpvaW4oJycpIDogb2JqZWN0Lm1vdmllLm9yaWdpbmFsX3RpdGxlKVxuICAgICAgICAgICAgICAgIGxldCBoYXNoX2JlaG9sZCAgID0gTGFtcGEuVXRpbHMuaGFzaChlbGVtZW50LnNlYXNvbiA/IFtlbGVtZW50LnNlYXNvbixlbGVtZW50LmVwaXNvZGUsb2JqZWN0Lm1vdmllLm9yaWdpbmFsX3RpdGxlLGVsZW1lbnQudm9pY2VfbmFtZV0uam9pbignJykgOiBvYmplY3QubW92aWUub3JpZ2luYWxfdGl0bGUgKyBlbGVtZW50LnZvaWNlX25hbWUpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc2hfdGltZWxpbmUsXG4gICAgICAgICAgICAgICAgICAgIGhhc2hfYmVob2xkXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGluZm8gPSBbXVxuXG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudC5zZWFzb24pe1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnRyYW5zbGF0ZV9lcGlzb2RlX2VuZCA9IHRoaXMuZ2V0TGFzdEVwaXNvZGUoaXRlbXMpXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQudHJhbnNsYXRlX3ZvaWNlICAgICAgID0gZWxlbWVudC52b2ljZV9uYW1lXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWxlbWVudC50aW1lbGluZSA9IExhbXBhLlRpbWVsaW5lLnZpZXcoaGFzaF90aW1lbGluZSlcblxuICAgICAgICAgICAgICAgIGlmKGVwaXNvZGUpe1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnRpdGxlID0gZXBpc29kZS5uYW1lXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC5pbmZvLmxlbmd0aCA8IDMwICYmIGVwaXNvZGUudm90ZV9hdmVyYWdlKSBpbmZvLnB1c2goTGFtcGEuVGVtcGxhdGUuZ2V0KCdvbmxpbmVfcHJlc3RpZ2VfcmF0ZScse3JhdGU6IHBhcnNlRmxvYXQoZXBpc29kZS52b3RlX2F2ZXJhZ2UgKycnKS50b0ZpeGVkKDEpfSx0cnVlKSlcblxuICAgICAgICAgICAgICAgICAgICBpZihlcGlzb2RlLmFpcl9kYXRlICYmIGZ1bGx5KSBpbmZvLnB1c2goTGFtcGEuVXRpbHMucGFyc2VUaW1lKGVwaXNvZGUuYWlyX2RhdGUpLmZ1bGwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYob2JqZWN0Lm1vdmllLnJlbGVhc2VfZGF0ZSAmJiBmdWxseSl7XG4gICAgICAgICAgICAgICAgICAgIGluZm8ucHVzaChMYW1wYS5VdGlscy5wYXJzZVRpbWUob2JqZWN0Lm1vdmllLnJlbGVhc2VfZGF0ZSkuZnVsbClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZighc2VyaWFsICYmIG9iamVjdC5tb3ZpZS50YWdsaW5lICYmIGVsZW1lbnQuaW5mby5sZW5ndGggPCAzMCkgaW5mby5wdXNoKG9iamVjdC5tb3ZpZS50YWdsaW5lKVxuXG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudC5pbmZvKSBpbmZvLnB1c2goZWxlbWVudC5pbmZvKSBcblxuICAgICAgICAgICAgICAgIGlmKGluZm8ubGVuZ3RoKSBlbGVtZW50LmluZm8gPSBpbmZvLm1hcChpPT4nPHNwYW4+JytpKyc8L3NwYW4+Jykuam9pbignPHNwYW4gY2xhc3M9XCJvbmxpbmUtcHJlc3RpZ2Utc3BsaXRcIj7il488L3NwYW4+JylcblxuICAgICAgICAgICAgICAgIGxldCBodG1sICAgPSBMYW1wYS5UZW1wbGF0ZS5nZXQoJ29ubGluZV9wcmVzdGlnZV9mdWxsJywgZWxlbWVudClcbiAgICAgICAgICAgICAgICBsZXQgbG9hZGVyID0gaHRtbC5maW5kKCcub25saW5lLXByZXN0aWdlX19sb2FkZXInKVxuICAgICAgICAgICAgICAgIGxldCBpbWFnZSAgPSBodG1sLmZpbmQoJy5vbmxpbmUtcHJlc3RpZ2VfX2ltZycpXG5cbiAgICAgICAgICAgICAgICBpZighc2VyaWFsKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoY2hvaWNlLm1vdmllX3ZpZXcgPT0gaGFzaF9iZWhvbGQpIHNjcm9sbF90b19lbGVtZW50ID0gaHRtbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHR5cGVvZiBlcGlzb2RlX2xhc3QgIT09ICd1bmRlZmluZWQnICYmIGVwaXNvZGVfbGFzdCA9PSBlcGlzb2RlX251bSl7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbF90b19lbGVtZW50ID0gaHRtbFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHNlcmlhbCAmJiAhZXBpc29kZSl7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm9ubGluZS1wcmVzdGlnZV9fZXBpc29kZS1udW1iZXJcIj4nKygnMCcgKyAoZWxlbWVudC5lcGlzb2RlIHx8IChpbmRleCArIDEpKSkuc2xpY2UoLTIpKyc8L2Rpdj4nKVxuXG4gICAgICAgICAgICAgICAgICAgIGxvYWRlci5yZW1vdmUoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW1nID0gaHRtbC5maW5kKCdpbWcnKVswXVxuXG4gICAgICAgICAgICAgICAgICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zcmMgPSAnLi9pbWcvaW1nX2Jyb2tlbi5zdmcnXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlLmFkZENsYXNzKCdvbmxpbmUtcHJlc3RpZ2VfX2ltZy0tbG9hZGVkJylcblxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVyLnJlbW92ZSgpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlcmlhbCkgaW1hZ2UuYXBwZW5kKCc8ZGl2IGNsYXNzPVwib25saW5lLXByZXN0aWdlX19lcGlzb2RlLW51bWJlclwiPicrKCcwJyArIChlbGVtZW50LmVwaXNvZGUgfHwgKGluZGV4ICsgMSkpKS5zbGljZSgtMikrJzwvZGl2PicpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjID0gTGFtcGEuVE1EQi5pbWFnZSgndC9wL3czMDAnICsgKGVwaXNvZGUgPyBlcGlzb2RlLnN0aWxsX3BhdGggOiBvYmplY3QubW92aWUuYmFja2Ryb3BfcGF0aCkpXG5cbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzLnB1c2goaW1nKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBodG1sLmZpbmQoJy5vbmxpbmUtcHJlc3RpZ2VfX3RpbWVsaW5lJykuYXBwZW5kKExhbXBhLlRpbWVsaW5lLnJlbmRlcihlbGVtZW50LnRpbWVsaW5lKSlcblxuICAgICAgICAgICAgICAgIGlmKHZpZXdlZC5pbmRleE9mKGhhc2hfYmVob2xkKSAhPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxfdG9fbWFyayA9IGh0bWxcblxuICAgICAgICAgICAgICAgICAgICBodG1sLmZpbmQoJy5vbmxpbmUtcHJlc3RpZ2VfX2ltZycpLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm9ubGluZS1wcmVzdGlnZV9fdmlld2VkXCI+JytMYW1wYS5UZW1wbGF0ZS5nZXQoJ2ljb25fdmlld2VkJyx7fSx0cnVlKSsnPC9kaXY+JylcbiAgICAgICAgICAgICAgICB9IFxuXG5cbiAgICAgICAgICAgICAgICBlbGVtZW50Lm1hcmsgPSAoKT0+e1xuICAgICAgICAgICAgICAgICAgICB2aWV3ZWQgPSBMYW1wYS5TdG9yYWdlLmNhY2hlKCdvbmxpbmVfdmlldycsIDUwMDAsIFtdKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHZpZXdlZC5pbmRleE9mKGhhc2hfYmVob2xkKSA9PSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3ZWQucHVzaChoYXNoX2JlaG9sZClcblxuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoJ29ubGluZV92aWV3Jywgdmlld2VkKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihodG1sLmZpbmQoJy5vbmxpbmUtcHJlc3RpZ2VfX3ZpZXdlZCcpLmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sLmZpbmQoJy5vbmxpbmUtcHJlc3RpZ2VfX2ltZycpLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm9ubGluZS1wcmVzdGlnZV9fdmlld2VkXCI+JytMYW1wYS5UZW1wbGF0ZS5nZXQoJ2ljb25fdmlld2VkJyx7fSx0cnVlKSsnPC9kaXY+JylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNob2ljZSA9IHRoaXMuZ2V0Q2hvaWNlKClcblxuICAgICAgICAgICAgICAgICAgICBpZighc2VyaWFsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNob2ljZS5tb3ZpZV92aWV3ID0gaGFzaF9iZWhvbGRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hvaWNlLmVwaXNvZGVzX3ZpZXdbZWxlbWVudC5zZWFzb25dID0gZXBpc29kZV9udW1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZUNob2ljZShjaG9pY2UpXG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXRjaGVkKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhbGFuc2VyOiBiYWxhbnNlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhbGFuc2VyX25hbWU6IExhbXBhLlV0aWxzLmNhcGl0YWxpemVGaXJzdExldHRlcihiYWxhbnNlciksXG4gICAgICAgICAgICAgICAgICAgICAgICB2b2ljZV9pZDogY2hvaWNlLnZvaWNlX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdm9pY2VfbmFtZTogY2hvaWNlLnZvaWNlX25hbWUgfHwgZWxlbWVudC52b2ljZV9uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXBpc29kZTogZWxlbWVudC5lcGlzb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vhc29uOiBlbGVtZW50LnNlYXNvblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsZW1lbnQudW5tYXJrID0gKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdmlld2VkID0gTGFtcGEuU3RvcmFnZS5jYWNoZSgnb25saW5lX3ZpZXcnLCA1MDAwLCBbXSlcblxuICAgICAgICAgICAgICAgICAgICBpZih2aWV3ZWQuaW5kZXhPZihoYXNoX2JlaG9sZCkgIT09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLkFycmF5cy5yZW1vdmUodmlld2VkLCBoYXNoX2JlaG9sZClcblxuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoJ29ubGluZV92aWV3Jywgdmlld2VkKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihMYW1wYS5NYW5pZmVzdC5hcHBfZGlnaXRhbCA+PSAxNzcpIExhbXBhLlN0b3JhZ2UucmVtb3ZlKCdvbmxpbmVfdmlldycsIGhhc2hfYmVob2xkKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sLmZpbmQoJy5vbmxpbmUtcHJlc3RpZ2VfX3ZpZXdlZCcpLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50LnRpbWVjbGVhciA9ICgpPT57XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQudGltZWxpbmUucGVyY2VudCAgPSAwXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQudGltZWxpbmUudGltZSAgICAgPSAwXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQudGltZWxpbmUuZHVyYXRpb24gPSAwXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBMYW1wYS5UaW1lbGluZS51cGRhdGUoZWxlbWVudC50aW1lbGluZSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBodG1sLm9uKCdob3ZlcjplbnRlcicsKCk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYob2JqZWN0Lm1vdmllLmlkKSBMYW1wYS5GYXZvcml0ZS5hZGQoJ2hpc3RvcnknLCBvYmplY3QubW92aWUsIDEwMClcblxuICAgICAgICAgICAgICAgICAgICBpZihwYXJhbXMub25FbnRlcikgcGFyYW1zLm9uRW50ZXIoZWxlbWVudCwgaHRtbCwgZGF0YSlcbiAgICAgICAgICAgICAgICB9KS5vbignaG92ZXI6Zm9jdXMnLChlKT0+e1xuICAgICAgICAgICAgICAgICAgICBsYXN0ID0gZS50YXJnZXRcblxuICAgICAgICAgICAgICAgICAgICBpZihwYXJhbXMub25Gb2N1cykgcGFyYW1zLm9uRm9jdXMoZWxlbWVudCwgaHRtbCwgZGF0YSlcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbC51cGRhdGUoJChlLnRhcmdldCksIHRydWUpXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIGlmKHBhcmFtcy5vblJlbmRlcikgcGFyYW1zLm9uUmVuZGVyKGVsZW1lbnQsIGh0bWwsIGRhdGEpXG5cbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51KHtcbiAgICAgICAgICAgICAgICAgICAgaHRtbCxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgb25GaWxlOiAoY2FsbCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBhcmFtcy5vbkNvbnRleHRNZW51KSBwYXJhbXMub25Db250ZXh0TWVudShlbGVtZW50LCBodG1sLCBkYXRhLCBjYWxsKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvbkNsZWFyQWxsTWFyazogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goZWxlbT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0udW5tYXJrKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xlYXJBbGxUaW1lOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMuZm9yRWFjaChlbGVtPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS50aW1lY2xlYXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHNjcm9sbC5hcHBlbmQoaHRtbClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmKHNlcmlhbCAmJiBlcGlzb2Rlcy5sZW5ndGggPiBpdGVtcy5sZW5ndGggJiYgIXBhcmFtcy5zaW1pbGFycyl7XG4gICAgICAgICAgICAgICAgbGV0IGxlZnQgPSBlcGlzb2Rlcy5zbGljZShpdGVtcy5sZW5ndGgpXG5cbiAgICAgICAgICAgICAgICBsZWZ0LmZvckVhY2goZXBpc29kZT0+e1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IFtdXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZXBpc29kZS52b3RlX2F2ZXJhZ2UpIGluZm8ucHVzaChMYW1wYS5UZW1wbGF0ZS5nZXQoJ29ubGluZV9wcmVzdGlnZV9yYXRlJyx7cmF0ZTogcGFyc2VGbG9hdChlcGlzb2RlLnZvdGVfYXZlcmFnZSArJycpLnRvRml4ZWQoMSl9LHRydWUpKVxuICAgICAgICAgICAgICAgICAgICBpZihlcGlzb2RlLmFpcl9kYXRlKSBpbmZvLnB1c2goTGFtcGEuVXRpbHMucGFyc2VUaW1lKGVwaXNvZGUuYWlyX2RhdGUpLmZ1bGwpXG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGFpciA9IG5ldyBEYXRlKChlcGlzb2RlLmFpcl9kYXRlICsgJycpLnJlcGxhY2UoLy0vZywnLycpKVxuICAgICAgICAgICAgICAgICAgICBsZXQgbm93ID0gRGF0ZS5ub3coKVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXkgPSBNYXRoLnJvdW5kKChhaXIuZ2V0VGltZSgpIC0gbm93KS8oMjQqNjAqNjAqMTAwMCkpXG4gICAgICAgICAgICAgICAgICAgIGxldCB0eHQgPSBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnZnVsbF9lcGlzb2RlX2RheXNfbGVmdCcpKyc6ICcgKyBkYXlcblxuICAgICAgICAgICAgICAgICAgICBsZXQgaHRtbCAgID0gTGFtcGEuVGVtcGxhdGUuZ2V0KCdvbmxpbmVfcHJlc3RpZ2VfZnVsbCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6IExhbXBhLlV0aWxzLnNlY29uZHNUb1RpbWUoKGVwaXNvZGUgPyBlcGlzb2RlLnJ1bnRpbWUgOiBvYmplY3QubW92aWUucnVudGltZSkgKiA2MCx0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm86IGluZm8ubGVuZ3RoID8gaW5mby5tYXAoaT0+JzxzcGFuPicraSsnPC9zcGFuPicpLmpvaW4oJzxzcGFuIGNsYXNzPVwib25saW5lLXByZXN0aWdlLXNwbGl0XCI+4pePPC9zcGFuPicpIDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZXBpc29kZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eTogZGF5ID4gMCA/IHR4dCA6ICcnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGxldCBsb2FkZXIgPSBodG1sLmZpbmQoJy5vbmxpbmUtcHJlc3RpZ2VfX2xvYWRlcicpXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWFnZSAgPSBodG1sLmZpbmQoJy5vbmxpbmUtcHJlc3RpZ2VfX2ltZycpXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWFzb24gPSBpdGVtc1swXSA/IGl0ZW1zWzBdLnNlYXNvbiA6IDFcblxuICAgICAgICAgICAgICAgICAgICBodG1sLmZpbmQoJy5vbmxpbmUtcHJlc3RpZ2VfX3RpbWVsaW5lJykuYXBwZW5kKExhbXBhLlRpbWVsaW5lLnJlbmRlcihMYW1wYS5UaW1lbGluZS52aWV3KExhbXBhLlV0aWxzLmhhc2goW3NlYXNvbixlcGlzb2RlLmVwaXNvZGVfbnVtYmVyLG9iamVjdC5tb3ZpZS5vcmlnaW5hbF90aXRsZV0uam9pbignJykpICkpKVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWcgPSBodG1sLmZpbmQoJ2ltZycpWzBdXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZXBpc29kZS5zdGlsbF9wYXRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWcuc3JjID0gJy4vaW1nL2ltZ19icm9rZW4uc3ZnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZS5hZGRDbGFzcygnb25saW5lLXByZXN0aWdlX19pbWctLWxvYWRlZCcpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkZXIucmVtb3ZlKClcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm9ubGluZS1wcmVzdGlnZV9fZXBpc29kZS1udW1iZXJcIj4nKygnMCcgKyAoZXBpc29kZS5lcGlzb2RlX251bWJlcikpLnNsaWNlKC0yKSsnPC9kaXY+JylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9IExhbXBhLlRNREIuaW1hZ2UoJ3QvcC93MzAwJyArIGVwaXNvZGUuc3RpbGxfcGF0aClcblxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VzLnB1c2goaW1nKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkZXIucmVtb3ZlKClcblxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2UuYXBwZW5kKCc8ZGl2IGNsYXNzPVwib25saW5lLXByZXN0aWdlX19lcGlzb2RlLW51bWJlclwiPicrKCcwJyArIChlcGlzb2RlLmVwaXNvZGVfbnVtYmVyKSkuc2xpY2UoLTIpKyc8L2Rpdj4nKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaHRtbC5vbignaG92ZXI6Zm9jdXMnLChlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdCA9IGUudGFyZ2V0XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbC51cGRhdGUoJChlLnRhcmdldCksIHRydWUpXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsLmFwcGVuZChodG1sKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHNjcm9sbF90b19lbGVtZW50KXtcbiAgICAgICAgICAgICAgICBsYXN0ID0gc2Nyb2xsX3RvX2VsZW1lbnRbMF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoc2Nyb2xsX3RvX21hcmspe1xuICAgICAgICAgICAgICAgIGxhc3QgPSBzY3JvbGxfdG9fbWFya1swXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLmVuYWJsZSgnY29udGVudCcpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JzQtdC90Y5cbiAgICAgKi9cbiAgICB0aGlzLmNvbnRleHRNZW51ID0gZnVuY3Rpb24ocGFyYW1zKXtcbiAgICAgICAgcGFyYW1zLmh0bWwub24oJ2hvdmVyOmxvbmcnLCgpPT57XG4gICAgICAgICAgICBmdW5jdGlvbiBzaG93KGV4dHJhKXtcbiAgICAgICAgICAgICAgICBsZXQgZW5hYmxlZCA9IExhbXBhLkNvbnRyb2xsZXIuZW5hYmxlZCgpLm5hbWVcblxuICAgICAgICAgICAgICAgIGxldCBtZW51ID0gW11cblxuICAgICAgICAgICAgICAgIGlmKExhbXBhLlBsYXRmb3JtLmlzKCd3ZWJvcycpKXtcbiAgICAgICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgncGxheWVyX2xhdWNoJykgKyAnIC0gV2Vib3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyOiAnd2Vib3MnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKExhbXBhLlBsYXRmb3JtLmlzKCdhbmRyb2lkJykpe1xuICAgICAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdwbGF5ZXJfbGF1Y2gnKSArICcgLSBBbmRyb2lkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjogJ2FuZHJvaWQnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdwbGF5ZXJfbGF1Y2gnKSArICcgLSBMYW1wYScsXG4gICAgICAgICAgICAgICAgICAgIHBsYXllcjogJ2xhbXBhJ1xuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ29ubGluZV92aWRlbycpLFxuICAgICAgICAgICAgICAgICAgICBzZXBhcmF0b3I6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCd0b3JyZW50X3BhcnNlcl9sYWJlbF90aXRsZScpLFxuICAgICAgICAgICAgICAgICAgICBtYXJrOiB0cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RvcnJlbnRfcGFyc2VyX2xhYmVsX2NhbmNlbF90aXRsZScpLFxuICAgICAgICAgICAgICAgICAgICB1bm1hcms6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndGltZV9yZXNldCcpLFxuICAgICAgICAgICAgICAgICAgICB0aW1lY2xlYXI6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgaWYoZXh0cmEpe1xuICAgICAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdjb3B5X2xpbmsnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcHlsaW5rOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdtb3JlJyksXG4gICAgICAgICAgICAgICAgICAgIHNlcGFyYXRvcjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBpZihMYW1wYS5BY2NvdW50LmxvZ2dlZCgpICYmIHBhcmFtcy5lbGVtZW50ICYmIHR5cGVvZiBwYXJhbXMuZWxlbWVudC5zZWFzb24gIT09ICd1bmRlZmluZWQnICYmIHBhcmFtcy5lbGVtZW50LnRyYW5zbGF0ZV92b2ljZSl7XG4gICAgICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ29ubGluZV92b2ljZV9zdWJzY3JpYmUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnb25saW5lX2NsZWFyX2FsbF9tYXJrcycpLFxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFsbG1hcms6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdvbmxpbmVfY2xlYXJfYWxsX3RpbWVjb2RlcycpLFxuICAgICAgICAgICAgICAgICAgICB0aW1lY2xlYXJhbGw6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgTGFtcGEuU2VsZWN0LnNob3coe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RpdGxlX2FjdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICBpdGVtczogbWVudSxcbiAgICAgICAgICAgICAgICAgICAgb25CYWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoZW5hYmxlZClcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6IChhKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYS5tYXJrKSAgICAgIHBhcmFtcy5lbGVtZW50Lm1hcmsoKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYS51bm1hcmspICAgIHBhcmFtcy5lbGVtZW50LnVubWFyaygpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhLnRpbWVjbGVhcikgcGFyYW1zLmVsZW1lbnQudGltZWNsZWFyKClcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYS5jbGVhcmFsbG1hcmspIHBhcmFtcy5vbkNsZWFyQWxsTWFyaygpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhLnRpbWVjbGVhcmFsbCkgcGFyYW1zLm9uQ2xlYXJBbGxUaW1lKClcblxuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoZW5hYmxlZClcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYS5wbGF5ZXIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLlBsYXllci5ydW5hcyhhLnBsYXllcilcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5odG1sLnRyaWdnZXIoJ2hvdmVyOmVudGVyJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYS5jb3B5bGluayl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZXh0cmEucXVhbGl0eSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBxdWFsID0gW11cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgaW4gZXh0cmEucXVhbGl0eSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWFsLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IGV4dHJhLnF1YWxpdHlbaV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5TZWxlY3Quc2hvdyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3NldHRpbmdzX3NlcnZlcl9saW5rcycpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBxdWFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25CYWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKGVuYWJsZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6IChiKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLlV0aWxzLmNvcHlUZXh0VG9DbGlwYm9hcmQoYi5maWxlLCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLk5vdHkuc2hvdyhMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnY29weV9zZWN1c2VzJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Ob3R5LnNob3coTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2NvcHlfZXJyb3InKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5VdGlscy5jb3B5VGV4dFRvQ2xpcGJvYXJkKGV4dHJhLmZpbGUsKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLk5vdHkuc2hvdyhMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnY29weV9zZWN1c2VzJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLk5vdHkuc2hvdyhMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnY29weV9lcnJvcicpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYS5zdWJzY3JpYmUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLkFjY291bnQuc3Vic2NyaWJlVG9UcmFuc2xhdGlvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQ6IG9iamVjdC5tb3ZpZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vhc29uOiBwYXJhbXMuZWxlbWVudC5zZWFzb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVwaXNvZGU6IHBhcmFtcy5lbGVtZW50LnRyYW5zbGF0ZV9lcGlzb2RlX2VuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pY2U6IHBhcmFtcy5lbGVtZW50LnRyYW5zbGF0ZV92b2ljZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuTm90eS5zaG93KExhbXBhLkxhbmcudHJhbnNsYXRlKCdvbmxpbmVfdm9pY2Vfc3VjY2VzcycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuTm90eS5zaG93KExhbXBhLkxhbmcudHJhbnNsYXRlKCdvbmxpbmVfdm9pY2VfZXJyb3InKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGFyYW1zLm9uRmlsZShzaG93KVxuICAgICAgICB9KS5vbignaG92ZXI6Zm9jdXMnLCgpPT57XG4gICAgICAgICAgICBpZihMYW1wYS5IZWxwZXIpIExhbXBhLkhlbHBlci5zaG93KCdvbmxpbmVfZmlsZScsTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2hlbHBlcl9vbmxpbmVfZmlsZScpLHBhcmFtcy5odG1sKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0L7QutCw0LfQsNGC0Ywg0L/Rg9GB0YLQvtC5INGA0LXQt9GD0LvRjNGC0LDRglxuICAgICAqL1xuICAgIHRoaXMuZW1wdHkgPSBmdW5jdGlvbihtc2cpe1xuICAgICAgICBsZXQgaHRtbCA9IExhbXBhLlRlbXBsYXRlLmdldCgnb25saW5lX2RvZXNfbm90X2Fuc3dlcicse30pXG5cbiAgICAgICAgaHRtbC5maW5kKCcub25saW5lLWVtcHR5X19idXR0b25zJykucmVtb3ZlKClcbiAgICAgICAgaHRtbC5maW5kKCcub25saW5lLWVtcHR5X190aXRsZScpLnRleHQoTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2VtcHR5X3RpdGxlX3R3bycpKVxuICAgICAgICBodG1sLmZpbmQoJy5vbmxpbmUtZW1wdHlfX3RpbWUnKS50ZXh0KExhbXBhLkxhbmcudHJhbnNsYXRlKCdlbXB0eV90ZXh0JykpXG5cbiAgICAgICAgc2Nyb2xsLmFwcGVuZChodG1sKVxuXG4gICAgICAgIHRoaXMubG9hZGluZyhmYWxzZSlcbiAgICB9XG5cbiAgICB0aGlzLmRvZXNOb3RBbnN3ZXIgPSBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnJlc2V0KClcblxuICAgICAgICBsZXQgaHRtbCA9IExhbXBhLlRlbXBsYXRlLmdldCgnb25saW5lX2RvZXNfbm90X2Fuc3dlcicse2JhbGFuc2VyfSlcbiAgICAgICAgbGV0IHRpYyAgPSAxMFxuXG4gICAgICAgIGh0bWwuZmluZCgnLmNhbmNlbCcpLm9uKCdob3ZlcjplbnRlcicsKCk9PntcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoYmFsYW5zZXJfdGltZXIpXG4gICAgICAgIH0pXG5cbiAgICAgICAgaHRtbC5maW5kKCcuY2hhbmdlJykub24oJ2hvdmVyOmVudGVyJywoKT0+e1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChiYWxhbnNlcl90aW1lcilcblxuICAgICAgICAgICAgZmlsdGVyLnJlbmRlcigpLmZpbmQoJy5maWx0ZXItLXNvcnQnKS50cmlnZ2VyKCdob3ZlcjplbnRlcicpXG4gICAgICAgIH0pXG5cbiAgICAgICAgc2Nyb2xsLmFwcGVuZChodG1sKVxuXG4gICAgICAgIHRoaXMubG9hZGluZyhmYWxzZSlcblxuICAgICAgICBiYWxhbnNlcl90aW1lciA9IHNldEludGVydmFsKCgpPT57XG4gICAgICAgICAgICB0aWMtLVxuXG4gICAgICAgICAgICBodG1sLmZpbmQoJy50aW1lb3V0JykudGV4dCh0aWMpXG5cbiAgICAgICAgICAgIGlmKHRpYyA9PSAwKXtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGJhbGFuc2VyX3RpbWVyKVxuXG4gICAgICAgICAgICAgICAgbGV0IGtleXMgPSBMYW1wYS5BcnJheXMuZ2V0S2V5cyhzb3VyY2VzKVxuICAgICAgICAgICAgICAgIGxldCBpbmR4ID0ga2V5cy5pbmRleE9mKGJhbGFuc2VyKVxuICAgICAgICAgICAgICAgIGxldCBuZXh0ID0ga2V5c1tpbmR4KzFdXG5cbiAgICAgICAgICAgICAgICBpZighbmV4dCkgbmV4dCA9IGtleXNbMF1cblxuICAgICAgICAgICAgICAgIGJhbGFuc2VyID0gbmV4dFxuXG4gICAgICAgICAgICAgICAgaWYoTGFtcGEuQWN0aXZpdHkuYWN0aXZlKCkuYWN0aXZpdHkgPT0gdGhpcy5hY3Rpdml0eSkgdGhpcy5jaGFuZ2VCYWxhbnNlcihiYWxhbnNlcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwxMDAwKVxuICAgIH1cblxuICAgIHRoaXMuZ2V0TGFzdEVwaXNvZGUgPSBmdW5jdGlvbihpdGVtcyl7XG4gICAgICAgIGxldCBsYXN0X2VwaXNvZGUgPSAwXG5cbiAgICAgICAgaXRlbXMuZm9yRWFjaChlPT57XG4gICAgICAgICAgICBpZih0eXBlb2YgZS5lcGlzb2RlICE9PSAndW5kZWZpbmVkJykgbGFzdF9lcGlzb2RlID0gTWF0aC5tYXgobGFzdF9lcGlzb2RlLCBwYXJzZUludChlLmVwaXNvZGUpKVxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBsYXN0X2VwaXNvZGVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQndCw0YfQsNGC0Ywg0L3QsNCy0LjQs9Cw0YbQuNGOINC/0L4g0YTQsNC50LvQsNC8XG4gICAgICovXG4gICAgdGhpcy5zdGFydCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKExhbXBhLkFjdGl2aXR5LmFjdGl2ZSgpLmFjdGl2aXR5ICE9PSB0aGlzLmFjdGl2aXR5KSByZXR1cm5cblxuICAgICAgICBpZighaW5pdGlhbGl6ZWQpe1xuICAgICAgICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlXG5cbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpXG4gICAgICAgIH1cblxuICAgICAgICBMYW1wYS5CYWNrZ3JvdW5kLmltbWVkaWF0ZWx5KExhbXBhLlV0aWxzLmNhcmRJbWdCYWNrZ3JvdW5kQmx1cihvYmplY3QubW92aWUpKVxuXG4gICAgICAgIExhbXBhLkNvbnRyb2xsZXIuYWRkKCdjb250ZW50Jyx7XG4gICAgICAgICAgICB0b2dnbGU6ICgpPT57XG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jb2xsZWN0aW9uU2V0KHNjcm9sbC5yZW5kZXIoKSxmaWxlcy5yZW5kZXIoKSlcbiAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLmNvbGxlY3Rpb25Gb2N1cyhsYXN0IHx8IGZhbHNlLHNjcm9sbC5yZW5kZXIoKSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cDogKCk9PntcbiAgICAgICAgICAgICAgICBpZihOYXZpZ2F0b3IuY2FubW92ZSgndXAnKSl7XG4gICAgICAgICAgICAgICAgICAgIE5hdmlnYXRvci5tb3ZlKCd1cCcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ2hlYWQnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRvd246ICgpPT57XG4gICAgICAgICAgICAgICAgTmF2aWdhdG9yLm1vdmUoJ2Rvd24nKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJpZ2h0OiAoKT0+e1xuICAgICAgICAgICAgICAgIGlmKE5hdmlnYXRvci5jYW5tb3ZlKCdyaWdodCcpKSBOYXZpZ2F0b3IubW92ZSgncmlnaHQnKVxuICAgICAgICAgICAgICAgIGVsc2UgZmlsdGVyLnNob3coTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RpdGxlX2ZpbHRlcicpLCdmaWx0ZXInKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZnQ6ICgpPT57XG4gICAgICAgICAgICAgICAgaWYoTmF2aWdhdG9yLmNhbm1vdmUoJ2xlZnQnKSkgTmF2aWdhdG9yLm1vdmUoJ2xlZnQnKVxuICAgICAgICAgICAgICAgIGVsc2UgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ21lbnUnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdvbmU6ICgpPT57XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChiYWxhbnNlcl90aW1lcilcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYWNrOiB0aGlzLmJhY2tcbiAgICAgICAgfSlcblxuICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnY29udGVudCcpXG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXIgPSBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gZmlsZXMucmVuZGVyKClcbiAgICB9XG5cbiAgICB0aGlzLmJhY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICBMYW1wYS5BY3Rpdml0eS5iYWNrd2FyZCgpXG4gICAgfVxuXG4gICAgdGhpcy5wYXVzZSA9IGZ1bmN0aW9uKCl7fVxuXG4gICAgdGhpcy5zdG9wID0gZnVuY3Rpb24oKXt9XG5cbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICBuZXR3b3JrLmNsZWFyKClcblxuICAgICAgICB0aGlzLmNsZWFySW1hZ2VzKClcblxuICAgICAgICBmaWxlcy5kZXN0cm95KClcblxuICAgICAgICBzY3JvbGwuZGVzdHJveSgpXG5cbiAgICAgICAgY2xlYXJJbnRlcnZhbChiYWxhbnNlcl90aW1lcilcblxuICAgICAgICBpZihzb3VyY2UpIHNvdXJjZS5kZXN0cm95KClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudFxuIiwiaW1wb3J0IE9ubGluZSBmcm9tICcuL2NvbXBvbmVudCdcblxuXG5mdW5jdGlvbiBzdGFydFBsdWdpbigpIHtcbiAgICB3aW5kb3cub25saW5lX3ByZXN0aWdlID0gdHJ1ZVxuXG4gICAgbGV0IG1hbmlmZXN0ID0ge1xuICAgICAgICB0eXBlOiAndmlkZW8nLFxuICAgICAgICB2ZXJzaW9uOiAnMS4wLjknLFxuICAgICAgICBuYW1lOiAn0J7QvdC70LDQudC9IC0gUHJlc3RpZ2UnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ9Cf0LvQsNCz0LjQvSDQtNC70Y8g0L/RgNC+0YHQvNC+0YLRgNCwINC+0L3Qu9Cw0LnQvSDRgdC10YDQuNCw0LvQvtCyINC4INGE0LjQu9GM0LzQvtCyJyxcbiAgICAgICAgY29tcG9uZW50OiAnb25saW5lX3ByZXN0aWdlJyxcbiAgICAgICAgb25Db250ZXh0TWVudTogKG9iamVjdCk9PntcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbmFtZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ29ubGluZV93YXRjaCcpLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbkNvbnRleHRMYXVjaDogKG9iamVjdCk9PntcbiAgICAgICAgICAgIHJlc2V0VGVtcGxhdGVzKClcblxuICAgICAgICAgICAgTGFtcGEuQ29tcG9uZW50LmFkZCgnb25saW5lX3ByZXN0aWdlJywgT25saW5lKVxuXG4gICAgICAgICAgICBMYW1wYS5BY3Rpdml0eS5wdXNoKHtcbiAgICAgICAgICAgICAgICB1cmw6ICcnLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndGl0bGVfb25saW5lJyksXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiAnb25saW5lX3ByZXN0aWdlJyxcbiAgICAgICAgICAgICAgICBzZWFyY2g6IG9iamVjdC50aXRsZSxcbiAgICAgICAgICAgICAgICBzZWFyY2hfb25lOiBvYmplY3QudGl0bGUsXG4gICAgICAgICAgICAgICAgc2VhcmNoX3R3bzogb2JqZWN0Lm9yaWdpbmFsX3RpdGxlLFxuICAgICAgICAgICAgICAgIG1vdmllOiBvYmplY3QsXG4gICAgICAgICAgICAgICAgcGFnZTogMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIExhbXBhLk1hbmlmZXN0LnBsdWdpbnMgPSBtYW5pZmVzdFxuXG4gICAgTGFtcGEuTGFuZy5hZGQoe1xuICAgICAgICBvbmxpbmVfd2F0Y2g6IHtcbiAgICAgICAgICAgIHJ1OiAn0KHQvNC+0YLRgNC10YLRjCDQvtC90LvQsNC50L0nLFxuICAgICAgICAgICAgZW46ICdXYXRjaCBvbmxpbmUnLFxuICAgICAgICAgICAgdWE6ICfQlNC40LLQuNGC0LjRgdGPINC+0L3Qu9Cw0LnQvScsXG4gICAgICAgICAgICB6aDogJ+WcqOe6v+ingueciycsXG4gICAgICAgIH0sXG4gICAgICAgIG9ubGluZV9ub193YXRjaF9oaXN0b3J5OiB7XG4gICAgICAgICAgICBydTogJ9Cd0LXRgiDQuNGB0YLQvtGA0LjQuCDQv9GA0L7RgdC80L7RgtGA0LAnLFxuICAgICAgICAgICAgZW46ICdObyBicm93c2luZyBoaXN0b3J5JyxcbiAgICAgICAgICAgIHVhOiAn0J3QtdC80LDRlCDRltGB0YLQvtGA0ZbRlyDQv9C10YDQtdCz0LvRj9C00YMnLFxuICAgICAgICAgICAgemg6ICfmsqHmnInmtY/op4jljoblj7InLFxuICAgICAgICB9LFxuICAgICAgICBvbmxpbmVfdmlkZW86IHtcbiAgICAgICAgICAgIHJ1OiAn0JLQuNC00LXQvicsXG4gICAgICAgICAgICBlbjogJ1ZpZGVvJyxcbiAgICAgICAgICAgIHVhOiAn0JLRltC00LXQvicsXG4gICAgICAgICAgICB6aDogJ+inhumikSdcbiAgICAgICAgfSxcbiAgICAgICAgb25saW5lX25vbGluazoge1xuICAgICAgICAgICAgcnU6ICfQndC1INGD0LTQsNC70L7RgdGMINC40LfQstC70LXRh9GMINGB0YHRi9C70LrRgycsXG4gICAgICAgICAgICB1azogJ9Cd0LXQvNC+0LbQu9C40LLQviDQvtGC0YDQuNC80LDRgtC4INC/0L7RgdC40LvQsNC90L3RjycsXG4gICAgICAgICAgICBlbjogJ0ZhaWxlZCB0byBmZXRjaCBsaW5rJyxcbiAgICAgICAgICAgIHpoOiAn6I635Y+W6ZO+5o6l5aSx6LSlJ1xuICAgICAgICB9LFxuICAgICAgICBvbmxpbmVfd2FpdGxpbms6IHtcbiAgICAgICAgICAgIHJ1OiAn0KDQsNCx0L7RgtCw0LXQvCDQvdCw0LQg0LjQt9Cy0LvQtdGH0LXQvdC40LXQvCDRgdGB0YvQu9C60LgsINC/0L7QtNC+0LbQtNC40YLQtS4uLicsXG4gICAgICAgICAgICB1azogJ9Cf0YDQsNGG0Y7RlNC80L4g0L3QsNC0INC+0YLRgNC40LzQsNC90L3Rj9C8INC/0L7RgdC40LvQsNC90L3Rjywg0LfQsNGH0LXQutCw0LnRgtC1Li4uJyxcbiAgICAgICAgICAgIGVuOiAnV29ya2luZyBvbiBleHRyYWN0aW5nIHRoZSBsaW5rLCBwbGVhc2Ugd2FpdC4uLicsXG4gICAgICAgICAgICB6aDogJ+ato+WcqOaPkOWPlumTvuaOpe+8jOivt+eojeWAmS4uLidcbiAgICAgICAgfSxcbiAgICAgICAgb25saW5lX2JhbGFuc2VyOiB7XG4gICAgICAgICAgICBydTogJ9CR0LDQu9Cw0L3RgdC10YAnLFxuICAgICAgICAgICAgdWs6ICfQkdCw0LvQsNC90YHQtdGAJyxcbiAgICAgICAgICAgIGVuOiAnQmFsYW5jZXInLFxuICAgICAgICAgICAgemg6ICflubPooaHlmagnXG4gICAgICAgIH0sXG4gICAgICAgIGhlbHBlcl9vbmxpbmVfZmlsZToge1xuICAgICAgICAgICAgcnU6ICfQo9C00LXRgNC20LjQstCw0LnRgtC1INC60LvQsNCy0LjRiNGDIFwi0J7QmlwiINC00LvRjyDQstGL0LfQvtCy0LAg0LrQvtC90YLQtdC60YHRgtC90L7Qs9C+INC80LXQvdGOJyxcbiAgICAgICAgICAgIHVrOiAn0KPRgtGA0LjQvNGD0LnRgtC1INC60LvQsNCy0ZbRiNGDIFwi0J7QmlwiINC00LvRjyDQstC40LrQu9C40LrRgyDQutC+0L3RgtC10LrRgdGC0L3QvtCz0L4g0LzQtdC90Y4nLFxuICAgICAgICAgICAgZW46ICdIb2xkIHRoZSBcIk9LXCIga2V5IHRvIGJyaW5nIHVwIHRoZSBjb250ZXh0IG1lbnUnLFxuICAgICAgICAgICAgemg6ICfmjInkvY/igJznoa7lrprigJ3plK7osIPlh7rkuIrkuIvmlofoj5zljZUnXG4gICAgICAgIH0sXG4gICAgICAgIG9ubGluZV9xdWVyeV9zdGFydDoge1xuICAgICAgICAgICAgcnU6ICfQn9C+INC30LDQv9GA0L7RgdGDJyxcbiAgICAgICAgICAgIHVrOiAn0J3QsCDQt9Cw0L/QuNGCJyxcbiAgICAgICAgICAgIGVuOiAnT24gcmVxdWVzdCcsXG4gICAgICAgICAgICB6aDogJ+agueaNruimgeaxgidcbiAgICAgICAgfSxcbiAgICAgICAgb25saW5lX3F1ZXJ5X2VuZDoge1xuICAgICAgICAgICAgcnU6ICfQvdC10YIg0YDQtdC30YPQu9GM0YLQsNGC0L7QsicsXG4gICAgICAgICAgICB1azogJ9C90LXQvNCw0ZQg0YDQtdC30YPQu9GM0YLQsNGC0ZbQsicsXG4gICAgICAgICAgICBlbjogJ25vIHJlc3VsdHMnLFxuICAgICAgICAgICAgemg6ICfmsqHmnInnu5PmnpwnXG4gICAgICAgIH0sXG4gICAgICAgIHRpdGxlX29ubGluZToge1xuICAgICAgICAgICAgcnU6ICfQntC90LvQsNC50L0nLFxuICAgICAgICAgICAgdWs6ICfQntC90LvQsNC50L0nLFxuICAgICAgICAgICAgZW46ICdPbmxpbmUnLFxuICAgICAgICAgICAgemg6ICflnKjnur/nmoQnXG4gICAgICAgIH0sXG4gICAgICAgIHRpdGxlX3Byb3h5OiB7XG4gICAgICAgICAgICBydTogJ9Cf0YDQvtC60YHQuCcsXG4gICAgICAgICAgICB1azogJ9Cf0YDQvtC60YHRlicsXG4gICAgICAgICAgICBlbjogJ1Byb3h5JyxcbiAgICAgICAgICAgIHpoOiAn5Luj55CG5Lq6J1xuICAgICAgICB9LFxuICAgICAgICBvbmxpbmVfcHJveHlfdGl0bGU6IHtcbiAgICAgICAgICAgIHJ1OiAn0J7RgdC90L7QstC90L7QuSDQv9GA0L7QutGB0LgnLFxuICAgICAgICAgICAgdWs6ICfQntGB0L3QvtCy0L3QuNC5INC/0YDQvtC60YHRlicsXG4gICAgICAgICAgICBlbjogJ01haW4gcHJveHknLFxuICAgICAgICAgICAgemg6ICfkuLvopoHku6PnkIYnXG4gICAgICAgIH0sXG4gICAgICAgIG9ubGluZV9wcm94eV9kZXNjcjp7XG4gICAgICAgICAgICBydTogJ9CR0YPQtNC10YIg0LjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGM0YHRjyDQtNC70Y8g0LLRgdC10YUg0LHQsNC70LDQvdGB0LXRgNC+0LInLFxuICAgICAgICAgICAgdWs6ICfQktC40LrQvtGA0LjRgdGC0L7QstGD0LLQsNGC0LjQvNC10YLRjNGB0Y8g0LTQu9GPINCy0YHRltGFINCx0LDQu9Cw0L3RgdC10YDRltCyJyxcbiAgICAgICAgICAgIGVuOiAnV2lsbCBiZSB1c2VkIGZvciBhbGwgYmFsYW5jZXJzJyxcbiAgICAgICAgICAgIHpoOiAn5bCG55So5LqO5omA5pyJ5bmz6KGh5ZmoJ1xuICAgICAgICB9LFxuICAgICAgICBvbmxpbmVfcHJveHlfcGxhY2Vob2xkZXI6IHtcbiAgICAgICAgICAgIHJ1OiAn0J3QsNC/0YDQuNC80LXRgDogaHR0cDovL3Byb3h5LmNvbScsXG4gICAgICAgICAgICB1azogJ9Cd0LDQv9GA0LjQutC70LDQtDogaHR0cDovL3Byb3h5LmNvbScsXG4gICAgICAgICAgICBlbjogJ0ZvciBleGFtcGxlOiBodHRwOi8vcHJveHkuY29tJyxcbiAgICAgICAgICAgIHpoOiAn5L6L5aaC77yaaHR0cDovL3Byb3h5LmNvbSdcbiAgICAgICAgfSxcbiAgICAgICAgZmlsbWl4X3BhcmFtX2FkZF90aXRsZToge1xuICAgICAgICAgICAgcnU6ICfQlNC+0LHQsNCy0LjRgtGMINCi0J7QmtCV0J0g0L7RgiBGaWxtaXgnLFxuICAgICAgICAgICAgdWs6ICfQlNC+0LTQsNGC0Lgg0KLQntCa0JXQnSDQstGW0LQgRmlsbWl4JyxcbiAgICAgICAgICAgIGVuOiAnQWRkIFRPS0VOIGZyb20gRmlsbWl4JyxcbiAgICAgICAgICAgIHpoOiAn5LuOIEZpbG1peCDmt7vliqAgVE9LRU4nXG4gICAgICAgIH0sXG4gICAgICAgIGZpbG1peF9wYXJhbV9hZGRfZGVzY3I6IHtcbiAgICAgICAgICAgIHJ1OiAn0JTQvtCx0LDQstGM0YLQtSDQotCe0JrQldCdINC00LvRjyDQv9C+0LTQutC70Y7Rh9C10L3QuNGPINC/0L7QtNC/0LjRgdC60LgnLFxuICAgICAgICAgICAgdWs6ICfQlNC+0LTQsNC50YLQtSDQotCe0JrQldCdINC00LvRjyDQv9GW0LTQutC70Y7Rh9C10L3QvdGPINC/0LXRgNC10LTQv9C70LDRgtC4JyxcbiAgICAgICAgICAgIGVuOiAnQWRkIGEgVE9LRU4gdG8gY29ubmVjdCBhIHN1YnNjcmlwdGlvbicsXG4gICAgICAgICAgICB6aDogJ+a3u+WKoCBUT0tFTiDku6Xov57mjqXorqLpmIUnXG4gICAgICAgIH0sXG4gICAgICAgIGZpbG1peF9wYXJhbV9wbGFjZWhvbGRlcjoge1xuICAgICAgICAgICAgcnU6ICfQndCw0L/RgNC40LzQtdGAOiBueGpla2ViNTczODViLi4nLFxuICAgICAgICAgICAgdWs6ICfQndCw0L/RgNC40LrQu9Cw0LQ6IG54amVrZWI1NzM4NWIuLicsXG4gICAgICAgICAgICBlbjogJ0ZvciBleGFtcGxlOiBueGpla2ViNTczODViLi4nLFxuICAgICAgICAgICAgemg6ICfkvovlpoLvvJpueGpla2ViNTczODViLi4nXG4gICAgICAgIH0sXG4gICAgICAgIGZpbG1peF9wYXJhbV9hZGRfZGV2aWNlOiB7XG4gICAgICAgICAgICBydTogJ9CU0L7QsdCw0LLQuNGC0Ywg0YPRgdGC0YDQvtC50YHRgtCy0L4g0L3QsCBGaWxtaXgnLFxuICAgICAgICAgICAgdWs6ICfQlNC+0LTQsNGC0Lgg0L/RgNC40YHRgtGA0ZbQuSDQvdCwIEZpbG1peCcsXG4gICAgICAgICAgICBlbjogJ0FkZCBEZXZpY2UgdG8gRmlsbWl4JyxcbiAgICAgICAgICAgIHpoOiAn5bCG6K6+5aSH5re75Yqg5YiwIEZpbG1peCdcbiAgICAgICAgfSxcbiAgICAgICAgZmlsbWl4X21vZGFsX3RleHQ6IHtcbiAgICAgICAgICAgIHJ1OiAn0JLQstC10LTQuNGC0LUg0LXQs9C+INC90LAg0YHRgtGA0LDQvdC40YbQtSBodHRwczovL2ZpbG1peC5hYy9jb25zb2xlcyDQsiDQstCw0YjQtdC8INCw0LLRgtC+0YDQuNC30L7QstCw0L3QvdC+0Lwg0LDQutC60LDRg9C90YLQtSEnLFxuICAgICAgICAgICAgdWs6ICfQktCy0LXQtNGW0YLRjCDQudC+0LPQviDQvdCwINGB0YLQvtGA0ZbQvdGG0ZYgaHR0cHM6Ly9maWxtaXguYWMvY29uc29sZXMg0YMg0LLQsNGI0L7QvNGDINCw0LLRgtC+0YDQuNC30L7QstCw0L3QvtC80YMg0L7QsdC70ZbQutC+0LLQvtC80YMg0LfQsNC/0LjRgdGWIScsXG4gICAgICAgICAgICBlbjogJ0VudGVyIGl0IGF0IGh0dHBzOi8vZmlsbWl4LmFjL2NvbnNvbGVzIGluIHlvdXIgYXV0aG9yaXplZCBhY2NvdW50IScsXG4gICAgICAgICAgICB6aDogJ+WcqOaCqOeahOaOiOadg+W4kOaIt+S4reeahCBodHRwczovL2ZpbG1peC5hYy9jb25zb2xlcyDkuK3ovpPlhaXvvIEnXG4gICAgICAgIH0sXG4gICAgICAgIGZpbG1peF9tb2RhbF93YWl0OiB7XG4gICAgICAgICAgICBydTogJ9Ce0LbQuNC00LDQtdC8INC60L7QtCcsXG4gICAgICAgICAgICB1azogJ9Ce0YfRltC60YPRlNC80L4g0LrQvtC0JyxcbiAgICAgICAgICAgIGVuOiAnV2FpdGluZyBmb3IgdGhlIGNvZGUnLFxuICAgICAgICAgICAgemg6ICfmiJHku6zmraPlnKjnrYnlvoXku6PnoIEnXG4gICAgICAgIH0sXG4gICAgICAgIGZpbG1peF9jb3B5X3NlY3VzZXM6IHtcbiAgICAgICAgICAgIHJ1OiAn0JrQvtC0INGB0LrQvtC/0LjRgNC+0LLQsNC9INCyINCx0YPRhNC10YAg0L7QsdC80LXQvdCwJyxcbiAgICAgICAgICAgIHVrOiAn0JrQvtC0INGB0LrQvtC/0ZbQudC+0LLQsNC90L4g0LIg0LHRg9GE0LXRgCDQvtCx0LzRltC90YMnLFxuICAgICAgICAgICAgZW46ICdDb2RlIGNvcGllZCB0byBjbGlwYm9hcmQnLFxuICAgICAgICAgICAgemg6ICfku6PnoIHlpI3liLbliLDliarotLTmnb8nXG4gICAgICAgIH0sXG4gICAgICAgIGZpbG1peF9jb3B5X2ZhaWw6IHtcbiAgICAgICAgICAgIHJ1OiAn0J7RiNC40LHQutCwINC/0YDQuCDQutC+0L/QuNGA0L7QstCw0L3QuNC4JyxcbiAgICAgICAgICAgIHVrOiAn0J/QvtC80LjQu9C60LAg0L/RgNC4INC60L7Qv9GW0Y7QstCw0L3QvdGWJyxcbiAgICAgICAgICAgIGVuOiAnQ29weSBlcnJvcicsXG4gICAgICAgICAgICB6aDogJ+WkjeWItumUmeivrydcbiAgICAgICAgfSxcbiAgICAgICAgZmlsbWl4X25vZGV2aWNlOiB7XG4gICAgICAgICAgICBydTogJ9Cj0YHRgtGA0L7QudGB0YLQstC+INC90LUg0LDQstGC0L7RgNC40LfQvtCy0LDQvdC+JyxcbiAgICAgICAgICAgIHVrOiAn0J/RgNC40YHRgtGA0ZbQuSDQvdC1INCw0LLRgtC+0YDQuNC30L7QstCw0L3QuNC5JyxcbiAgICAgICAgICAgIGVuOiAnRGV2aWNlIG5vdCBhdXRob3JpemVkJyxcbiAgICAgICAgICAgIHpoOiAn6K6+5aSH5pyq5o6I5p2DJ1xuICAgICAgICB9LFxuICAgICAgICB0aXRsZV9zdGF0dXM6IHtcbiAgICAgICAgICAgIHJ1OiAn0KHRgtCw0YLRg9GBJyxcbiAgICAgICAgICAgIHVrOiAn0KHRgtCw0YLRg9GBJyxcbiAgICAgICAgICAgIGVuOiAnU3RhdHVzJyxcbiAgICAgICAgICAgIHpoOiAn5Zyw5L2NJ1xuICAgICAgICB9LFxuICAgICAgICBvbmxpbmVfdm9pY2Vfc3Vic2NyaWJlOiB7XG4gICAgICAgICAgICBydTogJ9Cf0L7QtNC/0LjRgdCw0YLRjNGB0Y8g0L3QsCDQv9C10YDQtdCy0L7QtCcsXG4gICAgICAgICAgICB1azogJ9Cf0ZbQtNC/0LjRgdCw0YLQuNGB0Y8g0L3QsCDQv9C10YDQtdC60LvQsNC0JyxcbiAgICAgICAgICAgIGVuOiAnU3Vic2NyaWJlIHRvIHRyYW5zbGF0aW9uJyxcbiAgICAgICAgICAgIHpoOiAn6K6i6ZiF57+76K+RJ1xuICAgICAgICB9LFxuICAgICAgICBvbmxpbmVfdm9pY2Vfc3VjY2Vzczoge1xuICAgICAgICAgICAgcnU6ICfQktGLINGD0YHQv9C10YjQvdC+INC/0L7QtNC/0LjRgdCw0LvQuNGB0YwnLFxuICAgICAgICAgICAgdWs6ICfQktC4INGD0YHQv9GW0YjQvdC+INC/0ZbQtNC/0LjRgdCw0LvQuNGB0Y8nLFxuICAgICAgICAgICAgZW46ICdZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc3Vic2NyaWJlZCcsXG4gICAgICAgICAgICB6aDogJ+aCqOW3suaIkOWKn+iuoumYhSdcbiAgICAgICAgfSxcbiAgICAgICAgb25saW5lX3ZvaWNlX2Vycm9yOiB7XG4gICAgICAgICAgICBydTogJ9CS0L7Qt9C90LjQutC70LAg0L7RiNC40LHQutCwJyxcbiAgICAgICAgICAgIHVrOiAn0JLQuNC90LjQutC70LAg0L/QvtC80LjQu9C60LAnLFxuICAgICAgICAgICAgZW46ICdBbiBlcnJvciBoYXMgb2NjdXJyZWQnLFxuICAgICAgICAgICAgemg6ICflj5HnlJ/kuobplJnor68nXG4gICAgICAgIH0sXG4gICAgICAgIG9ubGluZV9jbGVhcl9hbGxfbWFya3M6IHtcbiAgICAgICAgICAgIHJ1OiAn0J7Rh9C40YHRgtC40YLRjCDQstGB0LUg0LzQtdGC0LrQuCcsXG4gICAgICAgICAgICB1azogJ9Ce0YfQuNGB0YLQuNGC0Lgg0LLRgdGWINC80ZbRgtC60LgnLFxuICAgICAgICAgICAgZW46ICdDbGVhciBhbGwgbGFiZWxzJyxcbiAgICAgICAgICAgIHpoOiAn5riF6Zmk5omA5pyJ5qCH562+J1xuICAgICAgICB9LFxuICAgICAgICBvbmxpbmVfY2xlYXJfYWxsX3RpbWVjb2Rlczoge1xuICAgICAgICAgICAgcnU6ICfQntGH0LjRgdGC0LjRgtGMINCy0YHQtSDRgtCw0LnQvC3QutC+0LTRiycsXG4gICAgICAgICAgICB1azogJ9Ce0YfQuNGB0YLQuNGC0Lgg0LLRgdGWINGC0LDQudC8LdC60L7QtNC4JyxcbiAgICAgICAgICAgIGVuOiAnQ2xlYXIgYWxsIHRpbWVjb2RlcycsXG4gICAgICAgICAgICB6aDogJ+a4hemZpOaJgOacieaXtumXtOS7o+eggSdcbiAgICAgICAgfSxcbiAgICAgICAgb25saW5lX2NoYW5nZV9iYWxhbnNlcjoge1xuICAgICAgICAgICAgcnU6ICfQmNC30LzQtdC90LjRgtGMINCx0LDQu9Cw0L3RgdC10YAnLFxuICAgICAgICAgICAgdWs6ICfQl9C80ZbQvdC40YLQuCDQsdCw0LvQsNC90YHQtdGAJyxcbiAgICAgICAgICAgIGVuOiAnQ2hhbmdlIGJhbGFuY2VyJyxcbiAgICAgICAgICAgIHpoOiAn5pu05pS55bmz6KGh5ZmoJ1xuICAgICAgICB9LFxuICAgICAgICBvbmxpbmVfYmFsYW5zZXJfZG9udF93b3JrOiB7XG4gICAgICAgICAgICBydTogJ9CR0LDQu9Cw0L3RgdC10YAgKHtiYWxhbnNlcn0pINC90LUg0L7RgtCy0LXRh9Cw0LXRgiDQvdCwINC30LDQv9GA0L7RgS4nLFxuICAgICAgICAgICAgdWs6ICfQkdCw0LvQsNC90YHQtdGAICh7YmFsYW5zZXJ9KSDQvdC1INCy0ZbQtNC/0L7QstGW0LTQsNGUINC90LAg0LfQsNC/0LjRgi4nLFxuICAgICAgICAgICAgZW46ICdCYWxhbmNlciAoe2JhbGFuc2VyfSkgZG9lcyBub3QgcmVzcG9uZCB0byB0aGUgcmVxdWVzdC4nLFxuICAgICAgICAgICAgemg6ICflubPooaHlmajvvIh7YmFsYW5zZXJ977yJ5pyq5ZON5bqU6K+35rGC44CCJ1xuICAgICAgICB9LFxuICAgICAgICBvbmxpbmVfYmFsYW5zZXJfdGltZW91dDoge1xuICAgICAgICAgICAgcnU6ICfQkdCw0LvQsNC90YHQtdGAINCx0YPQtNC10YIg0L/QtdGA0LXQutC70Y7Rh9C10L0g0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60Lgg0YfQtdGA0LXQtyA8c3BhbiBjbGFzcz1cInRpbWVvdXRcIj4xMDwvc3Bhbj4g0YHQtdC60YPQvdC0LicsXG4gICAgICAgICAgICB1azogJ9CR0LDQu9Cw0L3RgdC10YAg0LHRg9C00LUg0L/QtdGA0LXQutC70Y7Rh9C10L3QviDQsNCy0YLQvtC80LDRgtC40YfQvdC+INGH0LXRgNC10LcgPHNwYW4gY2xhc3M9XCJ0aW1lb3V0XCI+MTA8L3NwYW4+INGB0LXQutGD0L3QtC4nLFxuICAgICAgICAgICAgZW46ICdCYWxhbmNlciB3aWxsIGJlIHN3aXRjaGVkIGF1dG9tYXRpY2FsbHkgaW4gPHNwYW4gY2xhc3M9XCJ0aW1lb3V0XCI+MTA8L3NwYW4+IHNlY29uZHMuJyxcbiAgICAgICAgICAgIHpoOiAn5bmz6KGh5Zmo5bCG5ZyoPHNwYW4gY2xhc3M9XCJ0aW1lb3V0XCI+MTA8L3NwYW4+56eS5YaF6Ieq5Yqo5YiH5o2i44CCJ1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgnb25saW5lX3ByZXN0aWdlX2NzcycsIGBcbiAgICAgICAgPHN0eWxlPlxuICAgICAgICBAQGluY2x1ZGUoJy4uL3BsdWdpbnMvb25saW5lX3ByZXN0aWdlL2Nzcy9zdHlsZS5jc3MnKVxuICAgICAgICA8L3N0eWxlPlxuICAgIGApXG5cbiAgICAkKCdib2R5JykuYXBwZW5kKExhbXBhLlRlbXBsYXRlLmdldCgnb25saW5lX3ByZXN0aWdlX2Nzcycse30sdHJ1ZSkpXG5cbiAgICBmdW5jdGlvbiByZXNldFRlbXBsYXRlcygpe1xuICAgICAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ29ubGluZV9wcmVzdGlnZV9mdWxsJyxgPGRpdiBjbGFzcz1cIm9ubGluZS1wcmVzdGlnZSBvbmxpbmUtcHJlc3RpZ2UtLWZ1bGwgc2VsZWN0b3JcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvbmxpbmUtcHJlc3RpZ2VfX2ltZ1wiPlxuICAgICAgICAgICAgICAgIDxpbWcgYWx0PVwiXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9ubGluZS1wcmVzdGlnZV9fbG9hZGVyXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvbmxpbmUtcHJlc3RpZ2VfX2JvZHlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib25saW5lLXByZXN0aWdlX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvbmxpbmUtcHJlc3RpZ2VfX3RpdGxlXCI+e3RpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib25saW5lLXByZXN0aWdlX190aW1lXCI+e3RpbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib25saW5lLXByZXN0aWdlX190aW1lbGluZVwiPjwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9ubGluZS1wcmVzdGlnZV9fZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvbmxpbmUtcHJlc3RpZ2VfX2luZm9cIj57aW5mb308L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9ubGluZS1wcmVzdGlnZV9fcXVhbGl0eVwiPntxdWFsaXR5fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PmApXG5cbiAgICAgICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdvbmxpbmVfZG9lc19ub3RfYW5zd2VyJyxgPGRpdiBjbGFzcz1cIm9ubGluZS1lbXB0eVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9ubGluZS1lbXB0eV9fdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAje29ubGluZV9iYWxhbnNlcl9kb250X3dvcmt9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvbmxpbmUtZW1wdHlfX3RpbWVcIj5cbiAgICAgICAgICAgICAgICAje29ubGluZV9iYWxhbnNlcl90aW1lb3V0fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib25saW5lLWVtcHR5X19idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9ubGluZS1lbXB0eV9fYnV0dG9uIHNlbGVjdG9yIGNhbmNlbFwiPiN7Y2FuY2VsfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvbmxpbmUtZW1wdHlfX2J1dHRvbiBzZWxlY3RvciBjaGFuZ2VcIj4je29ubGluZV9jaGFuZ2VfYmFsYW5zZXJ9PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvbmxpbmUtZW1wdHlfX3RlbXBsYXRlc1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvbmxpbmUtZW1wdHktdGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9ubGluZS1lbXB0eS10ZW1wbGF0ZV9faWNvXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvbmxpbmUtZW1wdHktdGVtcGxhdGVfX2JvZHlcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib25saW5lLWVtcHR5LXRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvbmxpbmUtZW1wdHktdGVtcGxhdGVfX2ljb1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib25saW5lLWVtcHR5LXRlbXBsYXRlX19ib2R5XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9ubGluZS1lbXB0eS10ZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib25saW5lLWVtcHR5LXRlbXBsYXRlX19pY29cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9ubGluZS1lbXB0eS10ZW1wbGF0ZV9fYm9keVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PmApXG5cbiAgICAgICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdvbmxpbmVfcHJlc3RpZ2VfcmF0ZScsYDxkaXYgY2xhc3M9XCJvbmxpbmUtcHJlc3RpZ2UtcmF0ZVwiPlxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjE3XCIgaGVpZ2h0PVwiMTZcIiB2aWV3Qm94PVwiMCAwIDE3IDE2XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk04LjM5NDA5IDAuMTkyMTM5TDEwLjk5IDUuMzA5OTRMMTYuNzg4MiA2LjIwMzg3TDEyLjU0NzUgMTAuNDI3N0wxMy41ODE5IDE1LjkzMTFMOC4zOTQwOSAxMy4yNDI1TDMuMjA2MjYgMTUuOTMxMUw0LjI0MDY1IDEwLjQyNzdMMCA2LjIwMzg3TDUuNzk4MTkgNS4zMDk5NEw4LjM5NDA5IDAuMTkyMTM5WlwiIGZpbGw9XCIjZmZmXCI+PC9wYXRoPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8c3Bhbj57cmF0ZX08L3NwYW4+XG4gICAgICAgIDwvZGl2PmApXG5cbiAgICAgICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdvbmxpbmVfcHJlc3RpZ2VfZm9sZGVyJyxgPGRpdiBjbGFzcz1cIm9ubGluZS1wcmVzdGlnZSBvbmxpbmUtcHJlc3RpZ2UtLWZvbGRlciBzZWxlY3RvclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9ubGluZS1wcmVzdGlnZV9fZm9sZGVyXCI+XG4gICAgICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEyOCAxMTJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICAgICAgPHJlY3QgeT1cIjIwXCIgd2lkdGg9XCIxMjhcIiBoZWlnaHQ9XCI5MlwiIHJ4PVwiMTNcIiBmaWxsPVwid2hpdGVcIj48L3JlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjkuOTk2MyA4SDk4LjAwMzdDOTYuMDQ0NiAzLjMwMjEgOTEuNDA3OSAwIDg2IDBINDJDMzYuNTkyMSAwIDMxLjk1NTUgMy4zMDIxIDI5Ljk5NjMgOFpcIiBmaWxsPVwid2hpdGVcIiBmaWxsLW9wYWNpdHk9XCIwLjIzXCI+PC9wYXRoPlxuICAgICAgICAgICAgICAgICAgICA8cmVjdCB4PVwiMTFcIiB5PVwiOFwiIHdpZHRoPVwiMTA2XCIgaGVpZ2h0PVwiNzZcIiByeD1cIjEzXCIgZmlsbD1cIndoaXRlXCIgZmlsbC1vcGFjaXR5PVwiMC41MVwiPjwvcmVjdD5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9ubGluZS1wcmVzdGlnZV9fYm9keVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvbmxpbmUtcHJlc3RpZ2VfX2hlYWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9ubGluZS1wcmVzdGlnZV9fdGl0bGVcIj57dGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvbmxpbmUtcHJlc3RpZ2VfX3RpbWVcIj57dGltZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvbmxpbmUtcHJlc3RpZ2VfX2Zvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib25saW5lLXByZXN0aWdlX19pbmZvXCI+e2luZm99PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+YClcblxuICAgICAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ29ubGluZV9wcmVzdGlnZV93YXRjaGVkJyxgPGRpdiBjbGFzcz1cIm9ubGluZS1wcmVzdGlnZSBvbmxpbmUtcHJlc3RpZ2Utd2F0Y2hlZCBzZWxlY3RvclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9ubGluZS1wcmVzdGlnZS13YXRjaGVkX19pY29uXCI+XG4gICAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjIxXCIgaGVpZ2h0PVwiMjFcIiB2aWV3Qm94PVwiMCAwIDIxIDIxXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9XCIxMC41XCIgY3k9XCIxMC41XCIgcj1cIjlcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIzXCIvPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTE0Ljg0NzcgMTAuNTYyOEw4LjIwMzEyIDE0LjM5OUw4LjIwMzEzIDYuNzI2NTZMMTQuODQ3NyAxMC41NjI4WlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIi8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvbmxpbmUtcHJlc3RpZ2Utd2F0Y2hlZF9fYm9keVwiPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PmApXG4gICAgICAgIFxuICAgIH1cblxuXG4gICAgY29uc3QgYnV0dG9uID0gYDxkaXYgY2xhc3M9XCJmdWxsLXN0YXJ0X19idXR0b24gc2VsZWN0b3Igdmlldy0tb25saW5lXCIgZGF0YS1zdWJ0aXRsZT1cIlByZXN0aWdlIHYke21hbmlmZXN0LnZlcnNpb259XCI+XG4gICAgICAgIDxzdmcgd2lkdGg9XCIxMzVcIiBoZWlnaHQ9XCIxNDdcIiB2aWV3Qm94PVwiMCAwIDEzNSAxNDdcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTIxLjUgOTYuODgyM0MxMzkuNSA4Ni40OSAxMzkuNSA2MC41MDkyIDEyMS41IDUwLjExNjlMNDEuMjUgMy43ODQ1NEMyMy4yNSAtNi42MDc3NiAwLjc1MDAwNCA2LjM4MjY1IDAuNzUwMDAxIDI3LjE2NzNMMC43NSA1MS45NzQyQzQuNzAzMTQgMzUuNzQ3NSAyMy42MjA5IDI2LjgxMzggMzkuMDU0NyAzNS43NzAxTDk0Ljg1MzQgNjguMTUwNUMxMTAuMjUyIDc3LjA4NjQgMTExLjkwOSA5Ny44NjkzIDk5Ljg3MjUgMTA5LjM2OUwxMjEuNSA5Ni44ODIzWlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIi8+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTYzIDg0Ljk4MzZDODAuMzMzMyA5NC45OTEgODAuMzMzMyAxMjAuMDEgNjMgMTMwLjAxN0wzOS43NSAxNDMuNDRDMjIuNDE2NyAxNTMuNDQ4IDAuNzQ5OTk5IDE0MC45MzggMC43NSAxMjAuOTI0TDAuNzUwMDAxIDk0LjA3NjlDMC43NTAwMDIgNzQuMDYyMSAyMi40MTY3IDYxLjU1MjggMzkuNzUgNzEuNTYwMkw2MyA4NC45ODM2WlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIi8+XG4gICAgICAgIDwvc3ZnPlxuXG4gICAgICAgIDxzcGFuPiN7dGl0bGVfb25saW5lfTwvc3Bhbj5cbiAgICA8L2Rpdj5gXG5cbiAgICAvLyDQvdGD0LbQvdCwINC30LDQs9C70YPRiNC60LAsINCwINGC0L4g0L/RgNC4INGB0YLRgNCw0YLQtSDQu9Cw0LzQv9GLINCz0L7QstC+0YDQuNGCINC/0YPRgdGC0L5cbiAgICBMYW1wYS5Db21wb25lbnQuYWRkKCdvbmxpbmVfcHJlc3RpZ2UnLCBPbmxpbmUpXG5cbiAgICAvL9GC0L4g0LbQtSDRgdCw0LzQvtC1XG4gICAgcmVzZXRUZW1wbGF0ZXMoKVxuXG4gICAgTGFtcGEuTGlzdGVuZXIuZm9sbG93KCdmdWxsJywoZSk9PntcbiAgICAgICAgaWYoZS50eXBlID09ICdjb21wbGl0ZScpe1xuICAgICAgICAgICAgbGV0IGJ0biA9ICQoTGFtcGEuTGFuZy50cmFuc2xhdGUoYnV0dG9uKSlcblxuICAgICAgICAgICAgYnRuLm9uKCdob3ZlcjplbnRlcicsKCk9PntcbiAgICAgICAgICAgICAgICByZXNldFRlbXBsYXRlcygpXG5cbiAgICAgICAgICAgICAgICBMYW1wYS5Db21wb25lbnQuYWRkKCdvbmxpbmVfcHJlc3RpZ2UnLCBPbmxpbmUpXG5cbiAgICAgICAgICAgICAgICBMYW1wYS5BY3Rpdml0eS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCd0aXRsZV9vbmxpbmUnKSxcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiAnb25saW5lX3ByZXN0aWdlJyxcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoOiBlLmRhdGEubW92aWUudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaF9vbmU6IGUuZGF0YS5tb3ZpZS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoX3R3bzogZS5kYXRhLm1vdmllLm9yaWdpbmFsX3RpdGxlLFxuICAgICAgICAgICAgICAgICAgICBtb3ZpZTogZS5kYXRhLm1vdmllLFxuICAgICAgICAgICAgICAgICAgICBwYWdlOiAxXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGUub2JqZWN0LmFjdGl2aXR5LnJlbmRlcigpLmZpbmQoJy52aWV3LS10b3JyZW50JykuYWZ0ZXIoYnRuKVxuICAgICAgICB9XG4gICAgfSlcblxuXG4gICAgLy8vLy8vL09OTElORS8vLy8vLy8vL1xuXG4gICAgTGFtcGEuUGFyYW1zLnNlbGVjdCgnb25saW5lX3Byb3h5X2FsbCcsJycsJycpXG4gICAgTGFtcGEuUGFyYW1zLnNlbGVjdCgnb25saW5lX3Byb3h5X3ZpZGVvY2RuJywnJywnJylcbiAgICBMYW1wYS5QYXJhbXMuc2VsZWN0KCdvbmxpbmVfcHJveHlfcmV6a2EnLCcnLCcnKVxuICAgIExhbXBhLlBhcmFtcy5zZWxlY3QoJ29ubGluZV9wcm94eV9raW5vYmFzZScsJycsJycpXG4gICAgTGFtcGEuUGFyYW1zLnNlbGVjdCgnb25saW5lX3Byb3h5X2NvbGxhcHMnLCcnLCcnKVxuXG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdzZXR0aW5nc19wcm94eScsYDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbSBzZWxlY3RvclwiIGRhdGEtdHlwZT1cImlucHV0XCIgZGF0YS1uYW1lPVwib25saW5lX3Byb3h5X2FsbFwiIHBsYWNlaG9sZGVyPVwiI3tvbmxpbmVfcHJveHlfcGxhY2Vob2xkZXJ9XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX25hbWVcIj4je29ubGluZV9wcm94eV90aXRsZX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbV9fdmFsdWVcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbV9fZGVzY3JcIj4je29ubGluZV9wcm94eV9kZXNjcn08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtIHNlbGVjdG9yXCIgZGF0YS10eXBlPVwiaW5wdXRcIiBkYXRhLW5hbWU9XCJvbmxpbmVfcHJveHlfdmlkZW9jZG5cIiBwbGFjZWhvbGRlcj1cIiN7b25saW5lX3Byb3h5X3BsYWNlaG9sZGVyfVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtX19uYW1lXCI+VmlkZW9jZG48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbV9fdmFsdWVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtIHNlbGVjdG9yXCIgZGF0YS10eXBlPVwiaW5wdXRcIiBkYXRhLW5hbWU9XCJvbmxpbmVfcHJveHlfcmV6a2FcIiBwbGFjZWhvbGRlcj1cIiN7b25saW5lX3Byb3h5X3BsYWNlaG9sZGVyfVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtX19uYW1lXCI+UmV6a2E8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbV9fdmFsdWVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtIHNlbGVjdG9yXCIgZGF0YS10eXBlPVwiaW5wdXRcIiBkYXRhLW5hbWU9XCJvbmxpbmVfcHJveHlfa2lub2Jhc2VcIiBwbGFjZWhvbGRlcj1cIiN7b25saW5lX3Byb3h5X3BsYWNlaG9sZGVyfVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtX19uYW1lXCI+S2lub2Jhc2U8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbV9fdmFsdWVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtIHNlbGVjdG9yXCIgZGF0YS10eXBlPVwiaW5wdXRcIiBkYXRhLW5hbWU9XCJvbmxpbmVfcHJveHlfY29sbGFwc1wiIHBsYWNlaG9sZGVyPVwiI3tvbmxpbmVfcHJveHlfcGxhY2Vob2xkZXJ9XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX25hbWVcIj5Db2xsYXBzPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX3ZhbHVlXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmApXG5cbiAgICBmdW5jdGlvbiBhZGRTZXR0aW5nc1Byb3h5KCl7XG4gICAgICAgIGlmKExhbXBhLlNldHRpbmdzLm1haW4gJiYgIUxhbXBhLlNldHRpbmdzLm1haW4oKS5yZW5kZXIoKS5maW5kKCdbZGF0YS1jb21wb25lbnQ9XCJwcm94eVwiXScpLmxlbmd0aCl7XG4gICAgICAgICAgICBsZXQgZmllbGQgPSAkKExhbXBhLkxhbmcudHJhbnNsYXRlKGA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtZm9sZGVyIHNlbGVjdG9yXCIgZGF0YS1jb21wb25lbnQ9XCJwcm94eVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1mb2xkZXJfX2ljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBoZWlnaHQ9XCI0NlwiIHZpZXdCb3g9XCIwIDAgNDIgNDZcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICAgICAgPHJlY3QgeD1cIjEuNVwiIHk9XCIyNi41XCIgd2lkdGg9XCIzOVwiIGhlaWdodD1cIjE4XCIgcng9XCIxLjVcIiBzdHJva2U9XCJ3aGl0ZVwiIHN0cm9rZS13aWR0aD1cIjNcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI5LjVcIiBjeT1cIjM1LjVcIiByPVwiMy41XCIgZmlsbD1cIndoaXRlXCIvPlxuICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PVwiMjYuNVwiIGN5PVwiMzUuNVwiIHI9XCIyLjVcIiBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9XCIzMi41XCIgY3k9XCIzNS41XCIgcj1cIjIuNVwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjIxLjVcIiBjeT1cIjUuNVwiIHI9XCI1LjVcIiBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIzMVwiIHk9XCI0XCIgd2lkdGg9XCIxMVwiIGhlaWdodD1cIjNcIiByeD1cIjEuNVwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPHJlY3QgeT1cIjRcIiB3aWR0aD1cIjExXCIgaGVpZ2h0PVwiM1wiIHJ4PVwiMS41XCIgZmlsbD1cIndoaXRlXCIvPlxuICAgICAgICAgICAgICAgICAgICA8cmVjdCB4PVwiMjBcIiB5PVwiMTRcIiB3aWR0aD1cIjNcIiBoZWlnaHQ9XCI3XCIgcng9XCIxLjVcIiBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1mb2xkZXJfX25hbWVcIj4je3RpdGxlX3Byb3h5fTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+YCkpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIExhbXBhLlNldHRpbmdzLm1haW4oKS5yZW5kZXIoKS5maW5kKCdbZGF0YS1jb21wb25lbnQ9XCJtb3JlXCJdJykuYWZ0ZXIoZmllbGQpXG4gICAgICAgICAgICBMYW1wYS5TZXR0aW5ncy5tYWluKCkudXBkYXRlKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmKHdpbmRvdy5hcHByZWFkeSkgYWRkU2V0dGluZ3NQcm94eSgpXG4gICAgZWxzZXtcbiAgICAgICAgTGFtcGEuTGlzdGVuZXIuZm9sbG93KCdhcHAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYoZS50eXBlID09J3JlYWR5JykgYWRkU2V0dGluZ3NQcm94eSgpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8vLy8vL0ZJTE1JWC8vLy8vLy8vL1xuXG4gICAgbGV0IG5ldHdvcmsgID0gbmV3IExhbXBhLlJlZ3Vlc3QoKVxuICAgIGxldCBhcGlfdXJsICA9ICdodHRwOi8vZmlsbWl4YXBwLmN5b3UvYXBpL3YyLydcbiAgICBsZXQgdXNlcl9kZXYgPSAnP3VzZXJfZGV2X2Fwaz0xLjEuMyZ1c2VyX2Rldl9pZD0nICsgTGFtcGEuVXRpbHMudWlkKDE2KSArICcmdXNlcl9kZXZfbmFtZT1YaWFvbWkmdXNlcl9kZXZfb3M9MTEmdXNlcl9kZXZfdmVuZG9yPVhpYW9taSZ1c2VyX2Rldl90b2tlbj0nXG4gICAgbGV0IHBpbmdfYXV0aFxuXG4gICAgTGFtcGEuUGFyYW1zLnNlbGVjdCgnZmlsbWl4X3Rva2VuJywnJywnJylcblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgnc2V0dGluZ3NfZmlsbWl4JyxgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtIHNlbGVjdG9yXCIgZGF0YS1uYW1lPVwiZmlsbWl4X3Rva2VuXCIgZGF0YS10eXBlPVwiaW5wdXRcIiBwbGFjZWhvbGRlcj1cIiN7ZmlsbWl4X3BhcmFtX3BsYWNlaG9sZGVyfVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtX19uYW1lXCI+I3tmaWxtaXhfcGFyYW1fYWRkX3RpdGxlfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtX192YWx1ZVwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtX19kZXNjclwiPiN7ZmlsbWl4X3BhcmFtX2FkZF9kZXNjcn08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbSBzZWxlY3RvclwiIGRhdGEtbmFtZT1cImZpbG1peF9hZGRcIiBkYXRhLXN0YXRpYz1cInRydWVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbV9fbmFtZVwiPiN7ZmlsbWl4X3BhcmFtX2FkZF9kZXZpY2V9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmApXG5cblxuICAgIExhbXBhLlN0b3JhZ2UubGlzdGVuZXIuZm9sbG93KCdjaGFuZ2UnLChlKT0+e1xuICAgICAgICBpZihlLm5hbWUgPT0gJ2ZpbG1peF90b2tlbicpe1xuICAgICAgICAgICAgaWYoZS52YWx1ZSkgY2hlY2tQcm8oZS52YWx1ZSlcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoXCJmaWxtaXhfc3RhdHVzXCIsIHt9KVxuXG4gICAgICAgICAgICAgICAgc2hvd1N0YXR1cygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gc2V0RmlsbWl4UXVhbGl0eSgpe1xuICAgICAgICBsZXQgdGltZVpvbmUgPSAnRXVyb3BlL0tpZXYnO1xuICAgICAgICBsZXQgcXVhbGl0eSAgPSA0ODBcblxuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgZm9ybWF0dGVyID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoJ3VrLVVBJywge1xuICAgICAgICAgICAgICAgIGhvdXI6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICB0aW1lWm9uZTogdGltZVpvbmUsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IGN1cnJlbnRUaW1lID0gZm9ybWF0dGVyLmZvcm1hdChuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcXVhbGl0eSA9IHBhcnNlSW50KGN1cnJlbnRUaW1lKSA+PSAxOSAmJiBwYXJzZUludChjdXJyZW50VGltZSkgPD0gMjMgPyA0ODAgOiA3MjBcbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlKXt9XG5cbiAgICAgICAgaWYgKCF3aW5kb3cuZmlsbWl4KXtcbiAgICAgICAgICAgIHdpbmRvdy5maWxtaXggPSB7XG4gICAgICAgICAgICAgICAgbWF4X3F1YWxpdGllOiBxdWFsaXR5LFxuICAgICAgICAgICAgICAgIGlzX21heF9xdWFsaXRpZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgaWYod2luZG93LmZpbG1peC5tYXhfcXVhbGl0aWUgPT0gNzIwIHx8IHdpbmRvdy5maWxtaXgubWF4X3F1YWxpdGllID09IDQ4MCkgd2luZG93LmZpbG1peC5tYXhfcXVhbGl0aWUgPSBxdWFsaXR5XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJbnRlcnZhbChzZXRGaWxtaXhRdWFsaXR5LDEwMDAwKVxuXG4gICAgZnVuY3Rpb24gYWRkU2V0dGluZ3NGaWxtaXgoKXtcbiAgICAgICAgaWYoTGFtcGEuU2V0dGluZ3MubWFpbiAmJiAhTGFtcGEuU2V0dGluZ3MubWFpbigpLnJlbmRlcigpLmZpbmQoJ1tkYXRhLWNvbXBvbmVudD1cImZpbG1peFwiXScpLmxlbmd0aCl7XG4gICAgICAgICAgICBsZXQgZmllbGQgPSAkKGA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtZm9sZGVyIHNlbGVjdG9yXCIgZGF0YS1jb21wb25lbnQ9XCJmaWxtaXhcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtZm9sZGVyX19pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgaGVpZ2h0PVwiNTdcIiB2aWV3Qm94PVwiMCAwIDU4IDU3XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjAgMjAuMzczNVY0NUgyNi44MjgxVjM0LjEyNjJIMzYuNzI0VjI2Ljk4MDZIMjYuODI4MVYyNC4zOTE2QzI2LjgyODEgMjEuNTk1NSAyOC45MDYyIDE5LjgzNSAzMS4xODIzIDE5LjgzNUgzOVYxM0gyNi44MjgxQzIzLjY2MTUgMTMgMjAgMTUuNDg1NCAyMCAyMC4zNzM1WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPHJlY3QgeD1cIjJcIiB5PVwiMlwiIHdpZHRoPVwiNTRcIiBoZWlnaHQ9XCI1M1wiIHJ4PVwiNVwiIHN0cm9rZT1cIndoaXRlXCIgc3Ryb2tlLXdpZHRoPVwiNFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLWZvbGRlcl9fbmFtZVwiPkZpbG1peDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+YClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgTGFtcGEuU2V0dGluZ3MubWFpbigpLnJlbmRlcigpLmZpbmQoJ1tkYXRhLWNvbXBvbmVudD1cIm1vcmVcIl0nKS5hZnRlcihmaWVsZClcbiAgICAgICAgICAgIExhbXBhLlNldHRpbmdzLm1haW4oKS51cGRhdGUoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYod2luZG93LmFwcHJlYWR5KSBhZGRTZXR0aW5nc0ZpbG1peCgpXG4gICAgZWxzZXtcbiAgICAgICAgTGFtcGEuTGlzdGVuZXIuZm9sbG93KCdhcHAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYoZS50eXBlID09J3JlYWR5JykgYWRkU2V0dGluZ3NGaWxtaXgoKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNldEZpbG1peFF1YWxpdHkoKVxuXG4gICAgTGFtcGEuU2V0dGluZ3MubGlzdGVuZXIuZm9sbG93KCdvcGVuJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYoZS5uYW1lID09ICdmaWxtaXgnKXtcbiAgICAgICAgICAgIGUuYm9keS5maW5kKCdbZGF0YS1uYW1lPVwiZmlsbWl4X2FkZFwiXScpLnVuYmluZCgnaG92ZXI6ZW50ZXInKS5vbignaG92ZXI6ZW50ZXInLCgpPT57XG4gICAgICAgICAgICAgICAgbGV0IHVzZXJfY29kZSAgPSAnJ1xuICAgICAgICAgICAgICAgIGxldCB1c2VyX3Rva2VuID0gJydcblxuICAgICAgICAgICAgICAgIGxldCBtb2RhbCA9ICQoJzxkaXY+PGRpdiBjbGFzcz1cImJyb2FkY2FzdF9fdGV4dFwiPicrTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2ZpbG1peF9tb2RhbF90ZXh0JykrJzwvZGl2PjxkaXYgY2xhc3M9XCJicm9hZGNhc3RfX2RldmljZSBzZWxlY3RvclwiIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyXCI+JytMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnZmlsbWl4X21vZGFsX3dhaXQnKSsnLi4uPC9kaXY+PGJyPjxkaXYgY2xhc3M9XCJicm9hZGNhc3RfX3NjYW5cIj48ZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PicpXG5cbiAgICAgICAgICAgICAgICBMYW1wYS5Nb2RhbC5vcGVuKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBodG1sOiBtb2RhbCxcbiAgICAgICAgICAgICAgICAgICAgb25CYWNrOiAoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLk1vZGFsLmNsb3NlKClcblxuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ3NldHRpbmdzX2NvbXBvbmVudCcpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocGluZ19hdXRoKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDogKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5VdGlscy5jb3B5VGV4dFRvQ2xpcGJvYXJkKHVzZXJfY29kZSwgKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuTm90eS5zaG93KExhbXBhLkxhbmcudHJhbnNsYXRlKCdmaWxtaXhfY29weV9zZWN1c2VzJykpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Ob3R5LnNob3coTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2ZpbG1peF9jb3B5X2ZhaWwnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgcGluZ19hdXRoID0gc2V0SW50ZXJ2YWwoKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrUHJvKHVzZXJfdG9rZW4sICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Nb2RhbC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocGluZ19hdXRoKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5TdG9yYWdlLnNldChcImZpbG1peF90b2tlblwiLCB1c2VyX3Rva2VuKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlLmJvZHkuZmluZCgnW2RhdGEtbmFtZT1cImZpbG1peF90b2tlblwiXSAuc2V0dGluZ3MtcGFyYW1fX3ZhbHVlJykudGV4dCh1c2VyX3Rva2VuKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnc2V0dGluZ3NfY29tcG9uZW50JylcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9LCAxMDAwMClcblxuICAgICAgICAgICAgICAgIG5ldHdvcmsuY2xlYXIoKVxuICAgICAgICAgICAgICAgIG5ldHdvcmsudGltZW91dCgxMDAwMClcblxuICAgICAgICAgICAgICAgIG5ldHdvcmsucXVpZXQoYXBpX3VybCArICd0b2tlbl9yZXF1ZXN0JyArIHVzZXJfZGV2LCAoZm91bmQpPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQuc3RhdHVzID09ICdvaycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfdG9rZW4gPSBmb3VuZC5jb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2NvZGUgID0gZm91bmQudXNlcl9jb2RlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsLmZpbmQoJy5zZWxlY3RvcicpLnRleHQodXNlcl9jb2RlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Ob3R5LnNob3coZm91bmQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LChhLCBjKT0+e1xuICAgICAgICAgICAgICAgICAgICBMYW1wYS5Ob3R5LnNob3cobmV0d29yay5lcnJvckRlY29kZShhLCBjKSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgc2hvd1N0YXR1cygpXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gc2hvd1N0YXR1cygpe1xuICAgICAgICBsZXQgc3RhdHVzID0gTGFtcGEuU3RvcmFnZS5nZXQoXCJmaWxtaXhfc3RhdHVzXCIsICd7fScpXG4gICAgICAgIGxldCBpbmZvICAgPSBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnZmlsbWl4X25vZGV2aWNlJylcblxuICAgICAgICBpZiAoc3RhdHVzLmxvZ2luKXtcbiAgICAgICAgICAgIGlmIChzdGF0dXMuaXNfcHJvKSAgICAgICAgICAgaW5mbyA9IHN0YXR1cy5sb2dpbiArICcgLSBQUk8gJytMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnZmlsdGVyX3JhdGluZ190bycpKycgLSAnICsgc3RhdHVzLnByb19kYXRlXG4gICAgICAgICAgICBlbHNlIGlmIChzdGF0dXMuaXNfcHJvX3BsdXMpIGluZm8gPSBzdGF0dXMubG9naW4gKyAnIC0gUFJPX1BMVVMgJytMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnZmlsdGVyX3JhdGluZ190bycpKycgLSAnICsgc3RhdHVzLnByb19kYXRlXG4gICAgICAgICAgICBlbHNlICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8gPSBzdGF0dXMubG9naW4gKyAnIC0gTk8gUFJPJ1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZpZWxkICA9ICQoTGFtcGEuTGFuZy50cmFuc2xhdGUoYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtXCIgZGF0YS1uYW1lPVwiZmlsbWl4X3N0YXR1c1wiIGRhdGEtc3RhdGljPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbV9fbmFtZVwiPiN7dGl0bGVfc3RhdHVzfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbV9fdmFsdWVcIj4ke2luZm99PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5gKSlcblxuICAgICAgICAkKCcuc2V0dGluZ3MgW2RhdGEtbmFtZT1cImZpbG1peF9zdGF0dXNcIl0nKS5yZW1vdmUoKVxuICAgICAgICAkKCcuc2V0dGluZ3MgW2RhdGEtbmFtZT1cImZpbG1peF9hZGRcIl0nKS5hZnRlcihmaWVsZClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1Bybyh0b2tlbiwgY2FsbCkge1xuICAgICAgICBuZXR3b3JrLmNsZWFyKClcbiAgICAgICAgbmV0d29yay50aW1lb3V0KDgwMDApXG4gICAgICAgIG5ldHdvcmsuc2lsZW50KGFwaV91cmwgKyAndXNlcl9wcm9maWxlJyArIHVzZXJfZGV2ICsgdG9rZW4sIGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgICAgICBpZiAoanNvbikge1xuICAgICAgICAgICAgICAgIGlmKGpzb24udXNlcl9kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIExhbXBhLlN0b3JhZ2Uuc2V0KFwiZmlsbWl4X3N0YXR1c1wiLCBqc29uLnVzZXJfZGF0YSlcblxuICAgICAgICAgICAgICAgICAgICBpZihjYWxsKSBjYWxsKClcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMYW1wYS5TdG9yYWdlLnNldChcImZpbG1peF9zdGF0dXNcIiwge30pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2hvd1N0YXR1cygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uIChhLCBjKSB7XG4gICAgICAgICAgICBMYW1wYS5Ob3R5LnNob3cobmV0d29yay5lcnJvckRlY29kZShhLCBjKSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBpZihMYW1wYS5NYW5pZmVzdC5hcHBfZGlnaXRhbCA+PSAxNzcpe1xuICAgICAgICBMYW1wYS5TdG9yYWdlLnN5bmMoJ29ubGluZV9jaG9pY2VfdmlkZW9jZG4nLCAnb2JqZWN0X29iamVjdCcpXG4gICAgICAgIExhbXBhLlN0b3JhZ2Uuc3luYygnb25saW5lX2Nob2ljZV9yZXprYScsICdvYmplY3Rfb2JqZWN0JylcbiAgICAgICAgTGFtcGEuU3RvcmFnZS5zeW5jKCdvbmxpbmVfY2hvaWNlX2tpbm9iYXNlJywgJ29iamVjdF9vYmplY3QnKVxuICAgICAgICBMYW1wYS5TdG9yYWdlLnN5bmMoJ29ubGluZV9jaG9pY2VfY29sbGFwcycsICdvYmplY3Rfb2JqZWN0JylcbiAgICAgICAgTGFtcGEuU3RvcmFnZS5zeW5jKCdvbmxpbmVfY2hvaWNlX2ZpbG1peCcsICdvYmplY3Rfb2JqZWN0JylcbiAgICAgICAgTGFtcGEuU3RvcmFnZS5zeW5jKCdvbmxpbmVfd2F0Y2hlZF9sYXN0JywgJ29iamVjdF9vYmplY3QnKVxuICAgIH1cbn1cblxuaWYoIXdpbmRvdy5vbmxpbmVfcHJlc3RpZ2UgJiYgTGFtcGEuTWFuaWZlc3QuYXBwX2RpZ2l0YWwgPj0gMTU1KSBzdGFydFBsdWdpbigpIl0sIm5hbWVzIjpbInZpZGVvY2RuIiwiY29tcG9uZW50IiwiX29iamVjdCIsIm5ldHdvcmsiLCJMYW1wYSIsIlJlZ3Vlc3QiLCJleHRyYWN0IiwicmVzdWx0cyIsIm9iamVjdCIsImdldF9saW5rc193YWl0IiwiZmlsdGVyX2l0ZW1zIiwiY2hvaWNlIiwic2Vhc29uIiwidm9pY2UiLCJ2b2ljZV9uYW1lIiwic2VhcmNoIiwiZGF0YSIsInVybCIsInByb3h5IiwiaXRtIiwiaWZyYW1lX3NyYyIsImRvZXNOb3RBbnN3ZXIiLCJ0eXBlIiwic3BsaXQiLCJzbGljZSIsIlV0aWxzIiwiYWRkVXJsQ29tcG9uZW50IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiaW1kYl9pZCIsInRpdGxlIiwic2lsZW50IiwiZm91bmQiLCJmaWx0ZXIiLCJlbGVtIiwiaWQiLCJsZW5ndGgiLCJzdWNjZXNzIiwiZSIsImxvYWRpbmciLCJhIiwiYyIsImV4dGVuZENob2ljZSIsInNhdmVkIiwiQXJyYXlzIiwiZXh0ZW5kIiwicmVzZXQiLCJhcHBlbmQiLCJmaWx0cmVkIiwiYiIsInN0eXBlIiwiaW5kZXgiLCJkZXN0cm95IiwiY2xlYXIiLCJqc29uIiwiZXh0cmFjdERhdGEiLCJleHRyYWN0SXRlbXMiLCJzdHIiLCJtYXhfcXVhbGl0eSIsIml0ZW1zIiwibWFwIiwiaXRlbSIsInF1YWxpdHkiLCJwYXJzZUludCIsIm1hdGNoIiwiZmlsZSIsInJlcGxhY2UiLCJzb3J0IiwidGltZW91dCIsIm1vdmllIiwic3JjIiwibWV0YSIsIiQiLCJyZWZlcnJlciIsImF0dHIiLCJyYXciLCJyZW5kZXIiLCJmaW5kIiwicmVtb3ZlIiwibWF0aCIsImRlY29kZUpzb24iLCJ0ZXh0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiX2xvb3AiLCJpIiwiX21vdmllJG1lZGlhIiwiaW5uZXJIVE1MIiwibWVkaWEiLCJvYmoiLCJ0cmFuc2xhdGlvbl9pZCIsIl9tb3ZpZSR0cmFuc2xhdGlvbnMiLCJ0cmFuc2xhdGlvbnMiLCJ2YWx1ZSIsImZvbGRlciIsImYiLCJkYXRhVHlwZSIsImdldEZpbGUiLCJlbGVtZW50IiwidHJhbnNsYXQiLCJ0cmFuc2xhdGlvbiIsImVwaXNvZGUiLCJtYXNzIiwiQWNjb3VudCIsImhhc1ByZW1pdW0iLCJpbnNlcnQiLCJmb3JFYWNoIiwibiIsImV4ZXMiLCJwcmVmZXJhYmx5IiwiU3RvcmFnZSIsImdldCIsInZvaWNlX2luZm8iLCJzZWFzb25zIiwic2Vhc29uX2NvdW50IiwibnVtYmVyX29mX3NlYXNvbnMiLCJzIiwicHVzaCIsIkxhbmciLCJ0cmFuc2xhdGUiLCJlcGlzb2RlcyIsInNlYXNvbl9udW0iLCJ2Iiwic2hvcnRlcl90aXRsZSIsInNob3J0X3RpdGxlIiwiaW54IiwidG9Mb3dlckNhc2UiLCJpbmRleE9mIiwibmFtZSIsInRlbXAiLCJtIiwidW5pcXVlIiwibnVtIiwicnVfdGl0bGUiLCJzb3VyY2VfcXVhbGl0eSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJ0b1VwcGVyQ2FzZSIsImluZm8iLCJ0b1BsYXlFbGVtZW50IiwiZXh0cmEiLCJwbGF5IiwidGltZWxpbmUiLCJjYWxsYmFjayIsIm1hcmsiLCJkcmF3Iiwib25SZW5kZXIiLCJodG1sIiwib25FbnRlciIsInBsYXlsaXN0IiwiZmlyc3QiLCJQbGF5ZXIiLCJOb3R5Iiwic2hvdyIsIm9uQ29udGV4dE1lbnUiLCJjYWxsIiwicmV6a2EiLCJlbWJlZCIsInNlbGVjdF9pZCIsInNlYXJjaEJ5S2lub3BvaXNrIiwiZ2V0Rmlyc3RUcmFubGF0ZSIsImdldEZpbG0iLCJzZWFyY2hCeUltZGJJRCIsInNhdmVDaG9pY2UiLCJ0b2tlbiIsInNldFRpbWVvdXQiLCJjbG9zZUZpbHRlciIsImdldFNlYXNvbnMiLCJnZXRFbWJlZCIsInNlcyIsIk1hdGgiLCJtaW4iLCJjaGVjayIsInBhcnNlU3VidGl0bGVzIiwic3VidGl0bGUiLCJzYiIsInNwIiwibGFiZWwiLCJwb3AiLCJnZXRTdHJlYW0iLCJlcnJvciIsInN0cmVhbSIsInZpZGVvcyIsInZpZGVvIiwiZGVjb2RlIiwicXVzZWQiLCJ0cmltIiwiam9pbiIsInF1YWxpdHlzIiwibGluayIsIlJlZ0V4cCIsInN1YnRpdGxlcyIsInByb2R1Y3QiLCJpdGVyYWJsZXMiLCJyZXBlYXQiLCJhcmd2IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJhcmd1bWVudHMiLCJhcmdjIiwiaXNOYU4iLCJjb3BpZXMiLCJyZWR1Y2UiLCJ0bCIsImFjY3VtdWxhdG9yIiwidG1wIiwiYTAiLCJhMSIsImNvbmNhdCIsInVuaXRlIiwiYXJyIiwiZmluYWwiLCJ0cmFzaExpc3QiLCJ0d28iLCJ0cmVlIiwidHJhc2hDb2Rlc1NldCIsInRyYXNoU3RyaW5nIiwiYnRvYSIsInJlc3VsdCIsImF0b2IiLCJzdWJzdHIiLCJ2b2ljZXMiLCJzZXNvbnMiLCJlcGlzb2QiLCJzZWxlY3QiLCJlYWNoIiwidmFsIiwiY2VsbCIsImtpbm9iYXNlIiwic2VsZWN0X3RpdGxlIiwiaXNfcGxheWxpc3QiLCJxdWFsaXR5X3R5cGUiLCJ3YWl0X3NpbWlsYXJzIiwic2ltIiwiZ2V0UGFnZSIsInNlYXJjaEJ5VGl0bGUiLCJxdWVyeSIsImNsZWFuVGl0bGUiLCJsaW5rcyIsInJlbGlzZSIsInNlYXJjaF9kYXRlIiwiZmlyc3RfYWlyX2RhdGUiLCJyZWxlYXNlX2RhdGUiLCJuZWVkX3llYXIiLCJmb3VuZF91cmwiLCJjYXJkcyIsImwiLCJ0aXRsIiwieWVhciIsImNhcmQiLCJzaW1pbGFycyIsImZpbG1JZCIsInBhcnNlUGxheWxpc3QiLCJwbCIsImNoYXJBdCIsInN1YnN0cmluZyIsImxhYmVsX2VuZCIsInZvaWNlX2l0ZW0iLCJ2b2ljZV9lbmQiLCJjb21tZW50IiwiZXBzIiwiZWwiLCJhbHRfdm9pY2UiLCJwYXJzZVN1YnMiLCJsaXN0IiwiTmFOIiwidm9kIiwibmFtIiwicGFnZSIsInF1YWxpdHlfbWF0Y2giLCJ0cmFuc2xhdGlvbl9tYXRjaCIsInN1YnRpbGVzIiwicHJldiIsInF1YWxpdHlfc3RyIiwiZW1wdHlGb3JRdWVyeSIsIk1PVklFX0lEIiwiSURFTlRJRklFUiIsIlBMQVlFUl9DVUlEIiwiaWRlbnRpZmllciIsInBsYXllcl9jdWlkIiwiZGF0YV91cmwiLCJEYXRlIiwibm93IiwidXNlcl9kYXRhIiwidm9kX2hhc2giLCJmaWxlX3VybCIsInZvZF90aW1lIiwiZmlsZXMiLCJMIiwicmV2ZXJzZSIsInEiLCJjb2xsYXBzIiwic2VhcmNoSW4iLCJ3aGVyZSIsInBhcnNlIiwiZXZhbCIsIm5fYSIsIm5fYiIsImhscyIsImF1ZGlvIiwibmFtZXMiLCJjYyIsInNvdXJjZSIsInJlc29sdXRpb24iLCJnZXRLZXlzIiwicXVhbGl0eUJ5V2lkdGgiLCJmaWxtaXgiLCJkZXZfdG9rZW4iLCJfdGhpcyIsIm9yaWciLCJvcmlnaW5hbF90aXRsZSIsIm9yaWdpbmFsX25hbWUiLCJhbHRfbmFtZSIsImZpbG1peF9pZCIsImlzX21heF9xdWFsaXRpZSIsImlzX3BybyIsIm1heF9xdWFsaXRpZSIsImlzX3Byb19wbHVzIiwiZW5kX3NlYXJjaCIsIk9iamVjdCIsImtleXMiLCJwbF9saW5rcyIsInBsYXllcl9saW5rcyIsInNlYXNfbnVtIiwidHJhbnNsX2lkIiwiZXBpc29kZV92b2ljZSIsIklEIiwiZmlsZV9lcGlzb2QiLCJxdWFsaXR5X2VwcyIsInF1YWxpdGllcyIsIm1heCIsImFwcGx5Iiwic3RyZWFtX3VybCIsInNfZSIsImxhc3RJbmRleE9mIiwic3RyX3NfZSIsImVwaXNfbnVtIiwicXVhbGl0eV8iLCJvcmluIiwibGFzdF9lcGlzb2RlIiwiSWQiLCJkIiwidm9pYyIsInRyYW5zbCIsInNlYXNvbl9pZCIsInNjcm9sbCIsIlNjcm9sbCIsIm1hc2siLCJvdmVyIiwiRXhwbG9yZXIiLCJGaWx0ZXIiLCJzb3VyY2VzIiwibGFzdCIsImV4dGVuZGVkIiwic2VsZWN0ZWRfaWQiLCJiYWxhbnNlciIsImluaXRpYWxpemVkIiwiYmFsYW5zZXJfdGltZXIiLCJpbWFnZXMiLCJmaWx0ZXJfc291cmNlcyIsImZpbHRlcl90cmFuc2xhdGUiLCJpbml0aWFsaXplIiwiY3JlYXRlU291cmNlIiwib25TZWFyY2giLCJBY3Rpdml0eSIsImNsYXJpZmljYXRpb24iLCJvbkJhY2siLCJzdGFydCIsIm9uIiwiY2xlYXJJbnRlcnZhbCIsIm9uU2VsZWN0IiwiU2VsZWN0IiwiY2xvc2UiLCJjaGFuZ2VCYWxhbnNlciIsImFkZEJ1dHRvbkJhY2siLCJhcHBlbmRGaWxlcyIsImFwcGVuZEhlYWQiLCJib2R5IiwiYWRkQ2xhc3MiLCJtaW51cyIsImJhbGFuc2VyX25hbWUiLCJsYXN0X3NlbGVjdF9iYWxhbnNlciIsImNhY2hlIiwic2V0IiwidG8iLCJnZXRDaG9pY2UiLCJmcm9tIiwicHJveCIsIm5lZWQiLCJjcmVhdGUiLCJhY3Rpdml0eSIsImxvYWRlciIsIl90aGlzMiIsImRpc3BsYXkiLCJpbWRiIiwia2lub3BvaXNrX2lkIiwia3BfaWQiLCJwaWxsb3ciLCJmaWxtcyIsImhlYWRlcnMiLCJsZXRnbyIsInVybF9lbmQiLCJiaW5kIiwidG1kYnVybCIsImJhc2V1cmwiLCJUTURCIiwiYXBpIiwidHRpZCIsImZvcl9iYWxhbnNlciIsInNhdmUiLCJ2b2ljZV9pZCIsImVwaXNvZGVzX3ZpZXciLCJtb3ZpZV92aWV3IiwiX3RoaXMzIiwic3RhcnRfZGF0ZSIsInJhdGluZyIsIlRlbXBsYXRlIiwicmF0ZSIsImNvdW50cmllcyIsImNvdW50cnkiLCJjYXRlZ29yaWVzIiwiZW5fdGl0bGUiLCJuYW1lUnUiLCJuYW1lRW4iLCJvcmlnX3RpdGxlIiwidGltZSIsImZpbG1MZW5ndGgiLCJ0YXJnZXQiLCJ1cGRhdGUiLCJjbGVhckltYWdlcyIsImltZyIsIm9uZXJyb3IiLCJvbmxvYWQiLCJzdGF0dXMiLCJ0b2dnbGUiLCJfdGhpczQiLCJhZGQiLCJzdWJpdGVtcyIsInNlbGVjdGVkIiwiaGFzQ2xhc3MiLCJjaG9zZW4iLCJnZXRFcGlzb2RlcyIsIkFwaSIsInRtZGIiLCJ3YXRjaGVkIiwiZmlsZV9pZCIsImhhc2giLCJ1cGRhdGVXYXRjaGVkIiwiZW1wdHkiLCJsaW5lIiwiX3RoaXM1IiwicGFyYW1zIiwidW5kZWZpbmVkIiwidmlld2VkIiwic2VyaWFsIiwiZnVsbHkiLCJzY3JvbGxfdG9fZWxlbWVudCIsInNjcm9sbF90b19tYXJrIiwiZXBpc29kZV9udW1iZXIiLCJlcGlzb2RlX251bSIsImVwaXNvZGVfbGFzdCIsInNlY29uZHNUb1RpbWUiLCJydW50aW1lIiwiaGFzaF90aW1lbGluZSIsImhhc2hfYmVob2xkIiwidHJhbnNsYXRlX2VwaXNvZGVfZW5kIiwiZ2V0TGFzdEVwaXNvZGUiLCJ0cmFuc2xhdGVfdm9pY2UiLCJUaW1lbGluZSIsInZpZXciLCJ2b3RlX2F2ZXJhZ2UiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsImFpcl9kYXRlIiwicGFyc2VUaW1lIiwiZnVsbCIsInRhZ2xpbmUiLCJpbWFnZSIsInN0aWxsX3BhdGgiLCJiYWNrZHJvcF9wYXRoIiwiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwidW5tYXJrIiwiTWFuaWZlc3QiLCJhcHBfZGlnaXRhbCIsInRpbWVjbGVhciIsInBlcmNlbnQiLCJkdXJhdGlvbiIsIkZhdm9yaXRlIiwib25Gb2N1cyIsImNvbnRleHRNZW51Iiwib25GaWxlIiwib25DbGVhckFsbE1hcmsiLCJvbkNsZWFyQWxsVGltZSIsImxlZnQiLCJhaXIiLCJkYXkiLCJyb3VuZCIsImdldFRpbWUiLCJ0eHQiLCJDb250cm9sbGVyIiwiZW5hYmxlIiwiZW5hYmxlZCIsIm1lbnUiLCJQbGF0Zm9ybSIsImlzIiwicGxheWVyIiwic2VwYXJhdG9yIiwiY29weWxpbmsiLCJsb2dnZWQiLCJzdWJzY3JpYmUiLCJjbGVhcmFsbG1hcmsiLCJ0aW1lY2xlYXJhbGwiLCJydW5hcyIsInRyaWdnZXIiLCJxdWFsIiwiY29weVRleHRUb0NsaXBib2FyZCIsInN1YnNjcmliZVRvVHJhbnNsYXRpb24iLCJIZWxwZXIiLCJtc2ciLCJfdGhpczYiLCJ0aWMiLCJzZXRJbnRlcnZhbCIsImluZHgiLCJuZXh0IiwiYWN0aXZlIiwiQmFja2dyb3VuZCIsImltbWVkaWF0ZWx5IiwiY2FyZEltZ0JhY2tncm91bmRCbHVyIiwiY29sbGVjdGlvblNldCIsImNvbGxlY3Rpb25Gb2N1cyIsInVwIiwiTmF2aWdhdG9yIiwiY2FubW92ZSIsIm1vdmUiLCJkb3duIiwicmlnaHQiLCJnb25lIiwiYmFjayIsImJhY2t3YXJkIiwicGF1c2UiLCJzdG9wIiwic3RhcnRQbHVnaW4iLCJvbmxpbmVfcHJlc3RpZ2UiLCJtYW5pZmVzdCIsInZlcnNpb24iLCJkZXNjcmlwdGlvbiIsIm9uQ29udGV4dExhdWNoIiwicmVzZXRUZW1wbGF0ZXMiLCJDb21wb25lbnQiLCJPbmxpbmUiLCJzZWFyY2hfb25lIiwic2VhcmNoX3R3byIsInBsdWdpbnMiLCJvbmxpbmVfd2F0Y2giLCJydSIsImVuIiwidWEiLCJ6aCIsIm9ubGluZV9ub193YXRjaF9oaXN0b3J5Iiwib25saW5lX3ZpZGVvIiwib25saW5lX25vbGluayIsInVrIiwib25saW5lX3dhaXRsaW5rIiwib25saW5lX2JhbGFuc2VyIiwiaGVscGVyX29ubGluZV9maWxlIiwib25saW5lX3F1ZXJ5X3N0YXJ0Iiwib25saW5lX3F1ZXJ5X2VuZCIsInRpdGxlX29ubGluZSIsInRpdGxlX3Byb3h5Iiwib25saW5lX3Byb3h5X3RpdGxlIiwib25saW5lX3Byb3h5X2Rlc2NyIiwib25saW5lX3Byb3h5X3BsYWNlaG9sZGVyIiwiZmlsbWl4X3BhcmFtX2FkZF90aXRsZSIsImZpbG1peF9wYXJhbV9hZGRfZGVzY3IiLCJmaWxtaXhfcGFyYW1fcGxhY2Vob2xkZXIiLCJmaWxtaXhfcGFyYW1fYWRkX2RldmljZSIsImZpbG1peF9tb2RhbF90ZXh0IiwiZmlsbWl4X21vZGFsX3dhaXQiLCJmaWxtaXhfY29weV9zZWN1c2VzIiwiZmlsbWl4X2NvcHlfZmFpbCIsImZpbG1peF9ub2RldmljZSIsInRpdGxlX3N0YXR1cyIsIm9ubGluZV92b2ljZV9zdWJzY3JpYmUiLCJvbmxpbmVfdm9pY2Vfc3VjY2VzcyIsIm9ubGluZV92b2ljZV9lcnJvciIsIm9ubGluZV9jbGVhcl9hbGxfbWFya3MiLCJvbmxpbmVfY2xlYXJfYWxsX3RpbWVjb2RlcyIsIm9ubGluZV9jaGFuZ2VfYmFsYW5zZXIiLCJvbmxpbmVfYmFsYW5zZXJfZG9udF93b3JrIiwib25saW5lX2JhbGFuc2VyX3RpbWVvdXQiLCJidXR0b24iLCJMaXN0ZW5lciIsImZvbGxvdyIsImJ0biIsImFmdGVyIiwiUGFyYW1zIiwiYWRkU2V0dGluZ3NQcm94eSIsIlNldHRpbmdzIiwibWFpbiIsImZpZWxkIiwiYXBwcmVhZHkiLCJhcGlfdXJsIiwidXNlcl9kZXYiLCJ1aWQiLCJwaW5nX2F1dGgiLCJsaXN0ZW5lciIsImNoZWNrUHJvIiwic2hvd1N0YXR1cyIsInNldEZpbG1peFF1YWxpdHkiLCJ0aW1lWm9uZSIsImZvcm1hdHRlciIsIkludGwiLCJEYXRlVGltZUZvcm1hdCIsImhvdXIiLCJjdXJyZW50VGltZSIsImZvcm1hdCIsImFkZFNldHRpbmdzRmlsbWl4IiwidW5iaW5kIiwidXNlcl9jb2RlIiwidXNlcl90b2tlbiIsIm1vZGFsIiwiTW9kYWwiLCJvcGVuIiwicXVpZXQiLCJjb2RlIiwiZXJyb3JEZWNvZGUiLCJsb2dpbiIsInByb19kYXRlIiwic3luYyJdLCJtYXBwaW5ncyI6Ijs7O0lBQUEsU0FBU0EsUUFBUUEsQ0FBQ0MsU0FBUyxFQUFFQyxPQUFP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