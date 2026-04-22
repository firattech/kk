(function () {
    'use strict';

    function videocdn(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var results = [];
      var object = _object;
      var select_title = '';
      var get_links_wait = false;
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        voice_name: '',
        voice_id: 0
      };

      /**
       * Начать поиск
       * @param {Object} _object 
       */
      this.search = function (_object, data) {
        object = _object;
        select_title = object.movie.title;
        get_links_wait = true;
        var url = component.proxy('videocdn') + 'http://cdn.svetacdn.in/api/';
        var itm = data[0];
        var type = itm.iframe_src.split('/').slice(-2)[0];
        if (type == 'movie') type = 'movies';
        url += type;
        url = Lampa.Utils.addUrlComponent(url, 'api_token=3i40G5TSECmLF77oAqnEgbx61ZWaOYaE');
        url = Lampa.Utils.addUrlComponent(url, itm.imdb_id ? 'imdb_id=' + encodeURIComponent(itm.imdb_id) : 'title=' + encodeURIComponent(itm.title));
        url = Lampa.Utils.addUrlComponent(url, 'field=' + encodeURIComponent('global'));
        network.silent(url, function (found) {
          results = found.data.filter(function (elem) {
            return elem.id == itm.id;
          });
          success(results);
          component.loading(false);
          if (!results.length) component.emptyForQuery(select_title);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        });
      };
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };

      /**
       * Сброс фильтра
       */
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0,
          voice_name: '',
          voice_id: 0
        };
        filter();
        append(filtred());
        component.saveChoice(choice);
      };

      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        if (a.stype == 'voice') {
          choice.voice_name = filter_items.voice[b.index];
          choice.voice_id = filter_items.voice_info[b.index] && filter_items.voice_info[b.index].id;
        }
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };

      /**
       * Уничтожить
       */
      this.destroy = function () {
        network.clear();
        results = null;
      };

      /**
       * Успешно, есть данные
       * @param {Object} json 
       */
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

      /**
       * Получить информацию о фильме
       * @param {Arrays} results 
       */
      function extractData(results) {
        network.timeout(20000);
        var movie = results.slice(0, 1)[0];
        extract = {};
        if (movie) {
          var src = movie.iframe_src;
          network["native"]('http:' + src, function (raw) {
            get_links_wait = false;
            component.render().find('.broadcast__scan').remove();
            var math = raw.replace(/\n/g, '').match(/id="files" value="(.*?)"/);
            if (math) {
              var json = Lampa.Arrays.decodeJson(math[1].replace(/&quot;/g, '"'), {});
              var text = document.createElement("textarea");
              var _loop = function _loop(i) {
                var _movie$media;
                if (0 === i - 0) {
                  return 1; // continue
                }
                text.innerHTML = json[i];
                Lampa.Arrays.decodeJson(text.value, {});
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
                  //file: extractFile(json[i], max_quality)
                  items: extractItems(json[i], max_quality)
                };
                for (var a in extract[i].json) {
                  var elem = extract[i].json[a];
                  if (elem.folder) {
                    for (var f in elem.folder) {
                      var folder = elem.folder[f];

                      //folder.file = extractFile(folder.file, max_quality)
                      folder.items = extractItems(folder.file, max_quality);
                    }
                  }
                  //else elem.file = extractFile(elem.file, max_quality)
                  else elem.items = extractItems(elem.file, max_quality);
                }
              };
              for (var i in json) {
                if (_loop(i)) continue;
              }
            }
          }, function () {
            get_links_wait = false;
            component.render().find('.broadcast__scan').remove();
          }, false, {
            dataType: 'text'
          });
        }
      }

      /**
       * Найти поток
       * @param {Object} element 
       * @param {Int} max_quality
       * @returns string
       */
      function getFile(element, max_quality) {
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
                    //file = folder.file
                    items = folder.items;
                    break;
                  }
                }
              } else if (elem.id == id) {
                //file = elem.file
                items = elem.items;
                break;
              }
            }
          } else {
            //file = translat.file
            items = translat.items;
          }
        }
        max_quality = parseInt(max_quality);

        /*
        if(file){
            let path = file.slice(0, file.lastIndexOf('/')) + '/'
             if(file.split('/').pop().replace('.mp4','') !== max_quality){
                file = path + max_quality + '.mp4'
            }
             quality = {}
             let mass = [1080,720,480,360]
                mass = mass.slice(mass.indexOf(max_quality))
                 mass.forEach((n)=>{
                    quality[n + 'p'] = path + n + '.mp4'
                })
            
            let preferably = Lampa.Storage.get('video_quality_default','1080') + 'p'
            
            if(quality[preferably]) file = quality[preferably]
        }
        */

        if (items && items.length) {
          quality = {};
          var mass = [1080, 720, 480, 360];
          mass = mass.slice(mass.indexOf(max_quality));
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

      /**
       * Построить фильтр
       */
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          voice_info: []
        };
        results.slice(0, 1).forEach(function (movie) {
          if (movie.season_count) {
            var s = movie.season_count;
            while (s--) {
              filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + (movie.season_count - s));
            }
          }
          if (filter_items.season.length) {
            movie.episodes.forEach(function (episode) {
              if (episode.season_num == choice.season + 1) {
                episode.media.forEach(function (media) {
                  if (!filter_items.voice_info.find(function (v) {
                    return v.id == media.translation.id;
                  })) {
                    filter_items.voice.push(media.translation.shorter_title);
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
          var inx = -1;
          if (choice.voice_id) {
            var voice = filter_items.voice_info.find(function (v) {
              return v.id == choice.voice_id;
            });
            if (voice) inx = filter_items.voice_info.indexOf(voice);
          }
          if (inx == -1) inx = filter_items.voice.indexOf(choice.voice_name);
          if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
            choice.voice = inx;
          }
        }
        component.filter(filter_items, choice);
      }

      /**
       * Отфильтровать файлы
       * @returns array
       */
      function filtred() {
        var filtred = [];
        var filter_data = Lampa.Storage.get('online_filter', '{}');
        if (object.movie.number_of_seasons) {
          results.slice(0, 1).forEach(function (movie) {
            movie.episodes.forEach(function (episode) {
              if (episode.season_num == filter_data.season + 1) {
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
                  if (media.translation.id == filter_items.voice_info[filter_data.voice].id && unique.indexOf(media) !== -1) {
                    filtred.push({
                      episode: parseInt(episode.num),
                      season: episode.season_num,
                      title: episode.num + ' - ' + episode.ru_title,
                      quality: media.max_quality + 'p',
                      translation: media.translation_id
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
                title: element.translation.title,
                quality: element.max_quality + 'p' + (element.source_quality ? ' - ' + element.source_quality.toUpperCase() : ''),
                translation: element.translation_id
              });
            });
          });
        }
        return filtred;
      }

      /**
       * Добавить видео
       * @param {Array} items 
       */
      function append(items) {
        component.reset();
        if (get_links_wait) component.append($('<div class="broadcast__scan"><div></div></div>'));
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        var last_episode = component.getLastEpisode(items);
        items.forEach(function (element) {
          if (element.season) element.title = 'S' + element.season + ' / ' + Lampa.Lang.translate('torrent_serial_episode') + ' ' + element.title;
          element.info = element.season ? ' / ' + filter_items.voice[choice.voice] : '';
          if (element.season) {
            element.translate_episode_end = last_episode;
            element.translate_voice = filter_items.voice[choice.voice];
          }
          var hash = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online', element);
          var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, filter_items.voice[choice.voice]].join('') : object.movie.original_title + element.title);
          item.addClass('video--stream');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            var extra = getFile(element, element.quality);
            if (extra.file) {
              var playlist = [];
              var first = {
                url: extra.file,
                quality: extra.quality,
                timeline: view,
                title: element.season ? element.title : object.movie.title + ' / ' + element.title
              };
              if (element.season) {
                items.forEach(function (elem) {
                  var ex = getFile(elem, elem.quality);
                  playlist.push({
                    title: elem.title,
                    url: ex.file,
                    quality: ex.quality,
                    timeline: elem.timeline
                  });
                });
              } else {
                playlist.push(first);
              }
              if (playlist.length > 1) first.playlist = playlist;
              Lampa.Player.play(first);
              Lampa.Player.playlist(playlist);
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate(get_links_wait ? 'online_waitlink' : 'online_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            element: element,
            file: function file(call) {
              call(getFile(element, element.quality));
            }
          });
        });
        component.start(true);
      }
    }

    function rezka(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var embed = component.proxy('rezka') + 'https://voidboost.net/';
      var object = _object;
      var select_title = '';
      var select_id = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        voice_name: ''
      };

      /**
       * Поиск
       * @param {Object} _object 
       */
      this.search = function (_object, kinopoisk_id) {
        object = _object;
        select_id = kinopoisk_id;
        select_title = object.movie.title;
        getFirstTranlate(kinopoisk_id, function (voice) {
          getFilm(kinopoisk_id, voice);
        });
      };
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };

      /**
       * Сброс фильтра
       */
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

      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
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

      /**
       * Уничтожить
       */
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
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'text'
        });
      }
      function getFirstTranlate(id, call) {
        network.clear();
        network.timeout(10000);
        network["native"](embed + 'embed/' + id + '?s=1', function (str) {
          extractData(str);
          if (extract.voice.length) call(extract.voice[0].token);else component.emptyForQuery(select_title);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
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
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'text'
        });
      }

      /**
       * Запросить фильм
       * @param {Int} id 
       * @param {String} voice 
       */
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

      /**
       * Построить фильтр
       */
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
          var inx = filter_items.voice.indexOf(choice.voice_name);
          if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
            choice.voice = inx;
          }
        }
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

      /**
       * Получить поток
       * @param {*} element 
       */
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

            //ухня тут происходит, хрен знает почему после .join() возврошает только последнию ссылку
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

      /*
      function decode(x){
          let file = x.replace('JCQkIyMjIyEhISEhISE=', '')
              .replace('QCMhQEBAIyMkJEBA', '')
              .replace('QCFeXiFAI0BAJCQkJCQ=', '')
              .replace('Xl4jQEAhIUAjISQ=', '')
              .replace('Xl5eXl5eIyNAzN2FkZmRm', '')
              .split('//_//')
              .join('')
              .substr(2)
          try {
              return atob(file)
          } catch (e){
              console.log("Encrypt error: ", file)
              return ''
          }
      }
      */

      /**
       * Получить данные о фильме
       * @param {String} str 
       */
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

      /**
       * Показать файлы
       */
      function append() {
        component.reset();
        var items = [];
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        if (extract.season.length) {
          extract.episode.forEach(function (episode) {
            items.push({
              title: 'S' + extract.season[Math.min(extract.season.length - 1, choice.season)].id + ' / ' + episode.name,
              quality: '720p ~ 1080p',
              season: extract.season[Math.min(extract.season.length - 1, choice.season)].id,
              episode: parseInt(episode.id),
              info: ' / ' + extract.voice[choice.voice].name,
              voice: extract.voice[choice.voice]
            });
          });
        } else {
          extract.voice.forEach(function (voice) {
            items.push({
              title: voice.name.length > 3 ? voice.name : select_title,
              quality: '720p ~ 1080p',
              voice: voice,
              info: ''
            });
          });
        }
        var last_episode = component.getLastEpisode(items);
        items.forEach(function (element) {
          var hash = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online', element);
          var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, element.voice.name].join('') : object.movie.original_title + element.voice.name);
          element.timeline = view;
          if (element.season) {
            element.translate_episode_end = last_episode;
            element.translate_voice = element.voice.name;
          }
          item.append(Lampa.Timeline.render(view));
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            getStream(element, function (stream) {
              var first = {
                url: stream,
                timeline: view,
                quality: element.qualitys,
                title: element.title
              };
              Lampa.Player.play(first);
              if (element.season && Lampa.Platform.version) {
                var playlist = [];
                items.forEach(function (elem) {
                  var cell = {
                    url: function url(call) {
                      getStream(elem, function (stream) {
                        cell.url = stream;
                        cell.quality = elem.qualitys;
                        call();
                      }, function () {
                        cell.url = '';
                        call();
                      });
                    },
                    timeline: elem.timeline,
                    title: elem.title
                  };
                  if (elem == element) cell.url = stream;
                  playlist.push(cell);
                });
                Lampa.Player.playlist(playlist);
              } else {
                Lampa.Player.playlist([first]);
              }
              if (element.subtitles && Lampa.Player.subtitles) Lampa.Player.subtitles(element.subtitles);
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            }, function () {
              Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
            });
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            element: element,
            file: function file(call) {
              getStream(element, function (stream) {
                call({
                  file: stream,
                  quality: element.qualitys
                });
              });
            }
          });
        });
        component.start(true);
      }
    }

    function kinobase(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var embed = component.proxy('kinobase') + 'https://kinobase.org/';
      var object = _object;
      var select_title = '';
      var select_id = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: -1,
        quality: -1
      };

      /**
       * Поиск
       * @param {Object} _object
       * @param {String} kinopoisk_id
       */
      this.search = function (_object, kp_id, sim) {
        var _this = this;
        if (this.wait_similars && sim) return getPage(sim[0].link);
        object = _object;
        select_title = object.movie.title;
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
              _this.wait_similars = true;
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
            } else component.emptyForQuery(select_title);
          } else component.emptyForQuery(select_title);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'text'
        });
      };
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };

      /**
       * Сброс фильтра
       */
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: -1
        };
        append(filtred());
        component.saveChoice(choice);
      };

      /**
       * Применить фильтр
       * @param {*} type
       * @param {*} a
       * @param {*} b
       */
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };

      /**
       * Уничтожить
       */
      this.destroy = function () {
        network.clear();
        extract = null;
      };
      function cleanTitle(str) {
        return str.replace('.', '').replace(':', '');
      }
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          quality: []
        };
        if (object.movie.number_of_seasons) {
          if (extract[0].playlist) {
            extract.forEach(function (item) {
              filter_items.season.push(item.comment);
            });
          }
        }
        component.filter(filter_items, choice);
      }
      function filtred() {
        var filtred = [];
        if (object.movie.number_of_seasons) {
          var playlist = extract[choice.season].playlist || extract;
          var season = parseInt(extract[choice.season].comment);
          playlist.forEach(function (serial) {
            var quality = serial.file.match(/\[(\d+)p\]/g).pop().replace(/\[|\]/g, '');
            var voice = serial.file.match("{([^}]+)}");
            filtred.push({
              file: serial.file,
              title: serial.comment,
              quality: quality,
              season: isNaN(season) ? 1 : season,
              info: voice ? ' / ' + voice[1] : '',
              subtitles: parseSubs(serial.subtitle || '')
            });
          });
        } else {
          extract.forEach(function (elem) {
            var quality = elem.file.match(/\[(\d+)p\]/g).pop().replace(/\[|\]/g, '');
            var voice = elem.file.match("{([^}]+)}");
            if (!elem.title) elem.title = elem.comment || (voice ? voice[1] : Lampa.Lang.translate('noname'));
            if (!elem.quality) elem.quality = quality;
            if (!elem.info) elem.info = '';
          });
          filtred = extract;
        }
        return filtred;
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

      /**
       * Получить данные о фильме
       * @param {String} str
       */
      function extractData(str, page) {
        var vod = str.split('|');
        if (vod[0] == 'file') {
          var file = str.match("file\\|([^\\|]+)\\|");
          var found = [];
          var subtiles = parseSubs(vod[2]);
          var quality_type = page.replace(/\n/g, '').replace(/ /g, '').match(/<li><b>Качество:<\/b>(\w+)<\/li>/i);
          if (file) {
            str = file[1].replace(/\n/g, '');
            str.split(',').forEach(function (el) {
              var quality = el.match("\\[(\\d+)p");
              el.split(';').forEach(function (el2) {
                var voice = el2.match("{([^}]+)}");
                var links = voice ? el2.match("}([^;]+)") : el2.match("\\]([^;]+)");
                found.push({
                  file: file[1],
                  title: object.movie.title,
                  quality: quality[1] + 'p' + (quality_type ? ' - ' + quality_type[1] : ''),
                  voice: voice ? voice[1] : '',
                  stream: links[1].split(' or ')[0],
                  subtitles: subtiles,
                  info: ' '
                });
              });
            });
            found.reverse();
          }
          extract = found;
        } else if (vod[0] == 'pl') extract = Lampa.Arrays.decodeJson(vod[1], []);else component.emptyForQuery(select_title);
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
                  component.empty(network.errorDecode(a, c));
                }, false, {
                  dataType: 'text'
                });
              } else component.empty(Lampa.Lang.translate('torrent_parser_no_hash'));
            }, function (a, c) {
              component.empty(network.errorDecode(a, c));
            });
          } else component.emptyForQuery(select_title);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
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

      /**
       * Показать файлы
       */
      function append(items) {
        component.reset();
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        items.forEach(function (element, index) {
          if (element.season) element.title = 'S' + element.season + ' / ' + element.title;
          if (element.voice) element.title = element.voice;
          if (typeof element.episode == 'undefined') element.episode = index + 1;
          var hash = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online', element);
          var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, element.title, 'kinobase'].join('') : object.movie.original_title + element.quality + 'kinobase');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            getFile(element);
            if (element.stream) {
              var playlist = [];
              var first = {
                url: element.stream,
                timeline: view,
                title: element.season ? element.title : element.voice ? object.movie.title + ' / ' + element.title : element.title,
                subtitles: element.subtitles,
                quality: element.qualitys
              };
              if (element.season) {
                items.forEach(function (elem) {
                  getFile(elem);
                  playlist.push({
                    title: elem.title,
                    url: elem.stream,
                    timeline: elem.timeline,
                    subtitles: elem.subtitles,
                    quality: elem.qualitys
                  });
                });
              } else {
                playlist.push(first);
              }
              if (playlist.length > 1) first.playlist = playlist;
              Lampa.Player.play(first);
              Lampa.Player.playlist(playlist);
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            file: function file(call) {
              call(getFile(element));
            }
          });
        });
        component.start(true);
      }
    }

    function collaps(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var embed = component.proxy('collaps') + 'https://api.delivembd.ws/embed/';
      var object = _object;
      var select_title = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0
      };

      /**
       * Поиск
       * @param {Object} _object 
       */
      this.search = function (_object, kinopoisk_id) {
        object = _object;
        select_title = object.movie.title;
        var url = embed + 'kp/' + kinopoisk_id;
        network.silent(url, function (str) {
          if (str) {
            parse(str);
          } else component.emptyForQuery(select_title);
          component.loading(false);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'text'
        });
      };
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };

      /**
       * Сброс фильтра
       */
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

      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };

      /**
       * Уничтожить
       */
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
          } else component.emptyForQuery(select_title);
        }
      }

      /**
       * Построить фильтр
       */
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
        component.filter(filter_items, choice);
      }

      /**
       * Отфильтровать файлы
       * @returns array
       */
      function filtred() {
        var filtred = [];
        var filter_data = Lampa.Storage.get('online_filter', '{}');
        if (extract.playlist) {
          extract.playlist.seasons.forEach(function (season, i) {
            if (i == filter_data.season) {
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
            quality: max_quality ? max_quality + 'p / ' : '',
            info: extract.source.audio.names.slice(0, 5).join(', '),
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

      /**
       * Показать файлы
       */
      function append(items) {
        component.reset();
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        items.forEach(function (element) {
          var hash = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online', element);
          var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, element.title].join('') : object.movie.original_title + 'collaps');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            if (element.file) {
              var playlist = [];
              var first = {
                url: element.file,
                timeline: view,
                title: element.season ? element.title : element.voice ? object.movie.title + ' / ' + element.title : element.title,
                subtitles: element.subtitles
              };
              if (element.season) {
                items.forEach(function (elem) {
                  playlist.push({
                    title: elem.title,
                    url: elem.file,
                    timeline: elem.timeline,
                    subtitles: elem.subtitles
                  });
                });
              } else {
                playlist.push(first);
              }
              if (playlist.length > 1) first.playlist = playlist;
              Lampa.Player.play(first);
              Lampa.Player.playlist(playlist);
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            file: function file(call) {
              call({
                file: element.file
              });
            }
          });
        });
        component.start(true);
      }
    }

    function cdnmovies(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var object = _object;
      var select_title = '';
      var embed = component.proxy('cdnmovies') + 'https://cdnmovies.net/api/short/';
      var token = '02d56099082ad5ad586d7fe4e2493dd9';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        voice_name: ''
      };

      /**
       * Начать поиск
       * @param {Object} _object 
       */
      this.search = function (_object, data) {
        var _this = this;
        if (this.wait_similars) return this.find(data[0].iframe_src);
        object = _object;
        select_title = object.movie.title;
        var url = embed;
        var itm = data[0];
        if (itm.iframe_src) {
          var type = itm.iframe_src.split('/').slice(-2)[0];
          if (type == 'movie') type = 'movies';
          url += type;
          url = Lampa.Utils.addUrlComponent(url, 'token=' + token);
          url = Lampa.Utils.addUrlComponent(url, itm.imdb_id ? 'imdb_id=' + encodeURIComponent(itm.imdb_id) : 'title=' + encodeURIComponent(itm.title));
          url = Lampa.Utils.addUrlComponent(url, 'field=' + encodeURIComponent('global'));
          network.silent(url, function (json) {
            var array_data = [];
            for (var key in json.data) {
              array_data.push(json.data[key]);
            }
            json.data = array_data;
            if (json.data.length > 1) {
              _this.wait_similars = true;
              component.similars(json.data);
              component.loading(false);
            } else if (json.data.length == 1) {
              _this.find(json.data[0].iframe_src);
            } else {
              component.emptyForQuery(select_title);
            }
          }, function (a, c) {
            component.empty(network.errorDecode(a, c));
          }, false, {
            dataType: 'json'
          });
        } else {
          component.emptyForQuery(select_title);
        }
      };
      this.find = function (url) {
        network.clear();
        network.silent('http:' + url, function (json) {
          parse(json);
          component.loading(false);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'text'
        });
      };
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };

      /**
       * Сброс фильтра
       */
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0,
          voice_name: ''
        };
        filter();
        append(filtred());
        component.saveChoice(choice);
      };

      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };

      /**
       * Уничтожить
       */
      this.destroy = function () {
        network.clear();
      };
      function parse(str) {
        str = str.replace(/\n/g, '');
        var find = str.match('Playerjs\\({(.*?)}\\);');
        var videos = str.match("file:'(.*?)'}");
        if (videos) {
          var video = decode(videos[1]) || videos[1];
          if (find) {
            var json;
            try {
              json = JSON.parse(video);
            } catch (e) {}
            if (json) {
              extract = json;
              filter();
              append(filtred());
            } else component.emptyForQuery(select_title);
          }
        } else component.emptyForQuery(select_title);
      }
      function decode(data) {
        data = data.replace('#2', '').replace('//NTR2amZoY2dkYnJ5ZGtjZmtuZHo1Njg0MzZmcmVkKypk', '').replace('//YXorLWVydyozNDU3ZWRndGpkLWZlcXNwdGYvcmUqcSpZ', '').replace('//LSpmcm9mcHNjcHJwYW1mcFEqNDU2MTIuMzI1NmRmcmdk', '').replace('//ZGY4dmc2OXI5enhXZGx5ZisqZmd4NDU1ZzhmaDl6LWUqUQ==', '').replace('//bHZmeWNnbmRxY3lkcmNnY2ZnKzk1MTQ3Z2ZkZ2YtemQq', '');
        try {
          return decodeURIComponent(atob(data).split("").map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(""));
        } catch (e) {
          return '';
        }
      }

      /**
       * Найти поток
       * @param {Object} element 
       * @param {Int} max_quality
       * @returns string
       */
      function getFile(element) {
        var file = '';
        var quality = false;
        var max_quality = 1080;
        var path = element.slice(0, element.lastIndexOf('/')) + '/';
        if (file.split('/').pop().replace('.mp4', '') !== max_quality) {
          file = path + max_quality + '.mp4';
        }
        quality = {};
        var mass = [1080, 720, 480, 360];
        mass = mass.slice(mass.indexOf(max_quality));
        mass.forEach(function (n) {
          quality[n + 'p'] = path + n + '.mp4';
        });
        var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
        if (quality[preferably]) file = quality[preferably];
        return {
          file: file,
          quality: quality
        };
      }

      /**
       * Построить фильтр
       */
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          quality: []
        };
        if (extract[0].folder || object.movie.number_of_seasons) {
          extract.forEach(function (season) {
            filter_items.season.push(season.title);
          });
          extract[choice.season].folder.forEach(function (f) {
            f.folder.forEach(function (t) {
              if (filter_items.voice.indexOf(t.title) == -1) filter_items.voice.push(t.title);
            });
          });
          if (!filter_items.voice[choice.voice]) choice.voice = 0;
        }
        if (choice.voice_name) {
          var inx = filter_items.voice.indexOf(choice.voice_name);
          if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
            choice.voice = inx;
          }
        }
        component.filter(filter_items, choice);
      }

      /**
       * Отфильтровать файлы
       * @returns array
       */
      function filtred() {
        var filtred = [];
        var filter_data = Lampa.Storage.get('online_filter', '{}');
        if (extract[0].folder || object.movie.number_of_seasons) {
          extract.forEach(function (t) {
            if (t.title == filter_items.season[filter_data.season]) {
              t.folder.forEach(function (se) {
                se.folder.forEach(function (eps) {
                  if (eps.title == filter_items.voice[choice.voice]) {
                    filtred.push({
                      file: eps.file,
                      episode: parseInt(se.title.match(/\d+/)),
                      season: parseInt(t.title.match(/\d+/)),
                      quality: '360p ~ 1080p',
                      info: ' / ' + Lampa.Utils.shortText(eps.title, 50)
                    });
                  }
                });
              });
            }
          });
        } else {
          extract.forEach(function (data) {
            filtred.push({
              file: data.file,
              title: data.title,
              quality: '360p ~ 1080p',
              info: '',
              subtitles: data.subtitle ? data.subtitle.split(',').map(function (c) {
                return {
                  label: c.split(']')[0].slice(1),
                  url: c.split(']')[1]
                };
              }) : false
            });
          });
        }
        return filtred;
      }

      /**
       * Добавить видео
       * @param {Array} items 
       */
      function append(items) {
        component.reset();
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        items.forEach(function (element) {
          if (element.season) element.title = 'S' + element.season + ' / ' + Lampa.Lang.translate('torrent_serial_episode') + ' ' + element.episode;
          element.info = element.season ? ' / ' + Lampa.Utils.shortText(filter_items.voice[choice.voice], 50) : '';
          var hash = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online', element);
          var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, filter_items.voice[choice.voice]].join('') : object.movie.original_title + element.title);
          item.addClass('video--stream');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            var extra = getFile(element.file);
            if (extra.file) {
              var playlist = [];
              var first = {
                url: extra.file,
                quality: extra.quality,
                timeline: view,
                subtitles: element.subtitles,
                title: element.season ? element.title : object.movie.title + ' / ' + element.title
              };
              if (element.season) {
                items.forEach(function (elem) {
                  var ex = getFile(elem.file);
                  playlist.push({
                    title: elem.title,
                    url: ex.file,
                    quality: ex.quality,
                    subtitles: elem.subtitles,
                    timeline: elem.timeline
                  });
                });
              } else {
                playlist.push(first);
              }
              if (playlist.length > 1) first.playlist = playlist;
              Lampa.Player.play(first);
              Lampa.Player.playlist(playlist);
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            file: function file(call) {
              call(getFile(element.file));
            }
          });
        });
        component.start(true);
      }
    }

    function filmix(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var results = [];
      var object = _object;
      var embed = 'http://filmixapp.cyou/api/v2/';
      var select_title = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        voice_name: ''
      };
      var token = Lampa.Storage.get('filmix_token', '');
      if (!window.filmix) {
        window.filmix = {
          max_qualitie: 720,
          is_max_qualitie: false
        };
      }
      var dev_token = 'user_dev_apk=2.0.1&user_dev_id=&user_dev_name=Xiaomi&user_dev_os=11&user_dev_token=' + token + '&user_dev_vendor=Xiaomi';

      /**
       * Начать поиск
       * @param {Object} _object 
       */
      this.search = function (_object, data) {
        var _this = this;
        if (this.wait_similars) return this.find(data[0].id);
        object = _object;
        select_title = object.movie.title;
        var item = data[0];
        var year = parseInt((object.movie.release_date || object.movie.first_air_date || '0000').slice(0, 4));
        var orig = object.movie.original_title || object.movie.original_name;
        var url = embed + 'search';
        url = Lampa.Utils.addUrlComponent(url, 'story=' + encodeURIComponent(item.title));
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
            _this.wait_similars = true;
            component.similars(json);
            component.loading(false);
          } else component.emptyForQuery(select_title);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
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
            } else component.emptyForQuery(select_title);
          }, function (a, c) {
            component.empty(network.errorDecode(a, c));
          });
        }
      };
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };

      /**
       * Сброс фильтра
       */
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
        component.saveChoice(choice);
      };

      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
        component.reset();
        extractData(results);
        filter();
        append(filtred());
        component.saveChoice(choice);
      };

      /**
       * Уничтожить
       */
      this.destroy = function () {
        network.clear();
        results = null;
      };

      /**
       * Успешно, есть данные
       * @param {Object} json
       */
      function success(json) {
        results = json;
        extractData(json);
        filter();
        append(filtred());
      }

      /**
       * Получить информацию о фильме
       * @param {Arrays} data
       */
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

      /**
       * Найти поток
       * @param {Object} element
       * @param {Int} max_quality
       * @returns string
       */
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

      /**
       * Построить фильтр
       */
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
          var inx = filter_items.voice.indexOf(choice.voice_name);
          if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
            choice.voice = inx;
          }
        }
        component.filter(filter_items, choice);
      }

      /**
       * Отфильтровать файлы
       * @returns array
       */
      function filtred() {
        var filtred = [];
        var filter_data = Lampa.Storage.get('online_filter', '{}');
        if (Object.keys(results.player_links.playlist).length) {
          for (var transl in extract) {
            var element = extract[transl];
            for (var season_id in element.json) {
              var episode = element.json[season_id];
              if (episode.id == filter_data.season + 1) {
                episode.folder.forEach(function (media) {
                  if (media.translation == filter_items.voice_info[filter_data.voice].id) {
                    filtred.push({
                      episode: parseInt(media.episode),
                      season: media.season,
                      title: media.episode + (media.title ? ' - ' + media.title : ''),
                      quality: media.quality + 'p ',
                      translation: media.translation
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
              translation: transl_id
            });
          }
        }
        return filtred;
      }

      /**
       * Добавить видео
       * @param {Array} items 
       */
      function append(items) {
        component.reset();
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        var last_episode = component.getLastEpisode(items);
        items.forEach(function (element) {
          if (element.season) element.title = 'S' + element.season + ' / ' + Lampa.Lang.translate('torrent_serial_episode') + ' ' + element.episode;
          element.info = element.season ? ' / ' + Lampa.Utils.shortText(filter_items.voice[choice.voice], 50) : '';
          if (element.season) {
            element.translate_episode_end = last_episode;
            element.translate_voice = filter_items.voice[choice.voice];
          }
          var hash = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online', element);
          var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, filter_items.voice[choice.voice]].join('') : object.movie.original_title + element.title);
          item.addClass('video--stream');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            var extra = getFile(element, element.quality);
            if (extra.file) {
              var playlist = [];
              var first = {
                url: extra.file,
                quality: extra.quality,
                timeline: view,
                title: element.season ? element.title : object.movie.title + ' / ' + element.title
              };
              if (element.season) {
                items.forEach(function (elem) {
                  var ex = getFile(elem, elem.quality);
                  playlist.push({
                    title: elem.title,
                    url: ex.file,
                    quality: ex.quality,
                    timeline: elem.timeline
                  });
                });
              } else {
                playlist.push(first);
              }
              if (playlist.length > 1) first.playlist = playlist;
              Lampa.Player.play(first);
              Lampa.Player.playlist(playlist);
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            element: element,
            file: function file(call) {
              call(getFile(element, element.quality));
            }
          });
        });
        component.start(true);
      }
    }

    function component(object) {
      var network = new Lampa.Reguest();
      var scroll = new Lampa.Scroll({
        mask: true,
        over: true
      });
      var files = new Lampa.Files(object);
      var filter = new Lampa.Filter(object);
      var balanser = Lampa.Storage.get('online_balanser', 'videocdn');
      var last_bls = Lampa.Storage.cache('online_last_balanser', 200, {});
      if (last_bls[object.movie.id]) {
        balanser = last_bls[object.movie.id];
      }
      this.proxy = function (name) {
        var prox = Lampa.Storage.get('online_proxy_all');
        var need = Lampa.Storage.get('online_proxy_' + name);
        if (need) prox = need;
        if (prox && prox.slice(-1) !== '/') {
          prox += '/';
        }
        return prox;
      };
      var sources = {
        videocdn: new videocdn(this, object),
        rezka: new rezka(this, object),
        kinobase: new kinobase(this, object),
        collaps: new collaps(this, object),
        cdnmovies: new cdnmovies(this, object),
        filmix: new filmix(this, object)
      };
      var last;
      var last_filter;
      var extended;
      var selected_id;
      var filter_translate = {
        season: Lampa.Lang.translate('torrent_serial_season'),
        voice: Lampa.Lang.translate('torrent_parser_voice'),
        source: Lampa.Lang.translate('settings_rest_source')
      };
      var filter_sources = ['videocdn', 'rezka', 'kinobase', 'collaps', 'filmix'];
      var ignore_sources = ['filmix', 'kinobase'];
      var kiposk_sources = ['rezka', 'collaps'];

      // шаловливые ручки
      if (filter_sources.indexOf(balanser) == -1) {
        balanser = 'videocdn';
        Lampa.Storage.set('online_balanser', 'videocdn');
      }
      scroll.body().addClass('torrent-list');
      function minus() {
        scroll.minus(window.innerWidth > 580 ? false : files.render().find('.files__left'));
      }
      window.addEventListener('resize', minus, false);
      minus();

      /**
       * Подготовка
       */
      this.create = function () {
        var _this = this;
        this.activity.loader(true);
        filter.onSearch = function (value) {
          Lampa.Activity.replace({
            search: value,
            clarification: true
          });
        };
        filter.onBack = function () {
          _this.start();
        };
        filter.render().find('.selector').on('hover:focus', function (e) {
          last_filter = e.target;
        });
        filter.onSelect = function (type, a, b) {
          if (type == 'filter') {
            if (a.reset) {
              if (extended) sources[balanser].reset();else _this.start();
            } else {
              sources[balanser].filter(type, a, b);
            }
          } else if (type == 'sort') {
            balanser = a.source;
            Lampa.Storage.set('online_balanser', balanser);
            last_bls[object.movie.id] = balanser;
            Lampa.Storage.set('online_last_balanser', last_bls);
            _this.search();
            setTimeout(Lampa.Select.close, 10);
          }
        };
        filter.render().find('.filter--sort span').text(Lampa.Lang.translate('online_balanser'));
        filter.render();
        files.append(scroll.render());
        scroll.append(filter.render());
        this.search();
        return this.render();
      };

      /**
       * Начать поиск
       */
      this.search = function () {
        this.activity.loader(true);
        this.filter({
          source: filter_sources
        }, {
          source: 0
        });
        this.reset();
        this.find();
      };
      this.find = function () {
        var _this2 = this;
        var url = this.proxy('videocdn') + 'http://cdn.svetacdn.in/api/short';
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
              if (balanser == 'videocdn' || balanser == 'filmix' || balanser == 'cdnmovies') sources[balanser].search(object, json.data);else sources[balanser].search(object, json.data[0].kp_id || json.data[0].filmId, json.data);
            } else {
              _this2.similars(json.data);
              _this2.loading(false);
            }
          } else _this2.emptyForQuery(query);
        };
        var pillow = function pillow(a, c) {
          network.timeout(1000 * 15);
          if (balanser !== 'videocdn') {
            network["native"]('https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=' + encodeURIComponent(query), function (json) {
              json.data = json.films;
              display(json);
            }, function (a, c) {
              _this2.empty(network.errorDecode(a, c));
            }, false, {
              headers: {
                'X-API-KEY': '2d55adfd-019d-4567-bbf7-67d503f61b5a'
              }
            });
          } else {
            _this2.empty(network.errorDecode(a, c));
          }
        };
        var letgo = function letgo(imdb_id) {
          var url_end = Lampa.Utils.addUrlComponent(url, imdb_id ? 'imdb_id=' + encodeURIComponent(imdb_id) : 'title=' + encodeURIComponent(query));
          network.timeout(1000 * 15);
          network["native"](url_end, function (json) {
            if (json.data && json.data.length) display(json);else {
              network["native"](Lampa.Utils.addUrlComponent(url, 'title=' + encodeURIComponent(query)), display.bind(_this2), pillow.bind(_this2));
            }
          }, pillow.bind(_this2));
        };
        network.clear();
        network.timeout(1000 * 15);
        if (ignore_sources.indexOf(balanser) >= 0) {
          display({
            data: [{
              title: object.movie.title || object.movie.name
            }]
          });
        } else if (object.movie.kinopoisk_id && kiposk_sources.indexOf(balanser) >= 0) {
          sources[balanser].search(object, object.movie.kinopoisk_id);
        } else if (object.movie.imdb_id) {
          letgo(object.movie.imdb_id);
        } else if (object.movie.source == 'tmdb' || object.movie.source == 'cub') {
          var tmdburl = (object.movie.name ? 'tv' : 'movie') + '/' + object.movie.id + '/external_ids?api_key=4ef0d7355d9ffb5151e987764708ce96&language=ru';
          var baseurl = typeof Lampa.TMDB !== 'undefined' ? Lampa.TMDB.api(tmdburl) : 'http://api.themoviedb.org' + tmdburl;
          network["native"](baseurl, function (ttid) {
            letgo(ttid.imdb_id);
          }, function (a, c) {
            _this2.empty(network.errorDecode(a, c));
          });
        } else {
          letgo();
        }
      };
      this.extendChoice = function () {
        var data = Lampa.Storage.cache('online_choice_' + balanser, 500, {});
        var save = data[selected_id || object.movie.id] || {};
        extended = true;
        sources[balanser].extendChoice(save);
      };
      this.saveChoice = function (choice) {
        var data = Lampa.Storage.cache('online_choice_' + balanser, 500, {});
        data[selected_id || object.movie.id] = choice;
        Lampa.Storage.set('online_choice_' + balanser, data);
      };

      /**
       * Есть похожие карточки
       * @param {Object} json 
       */
      this.similars = function (json) {
        var _this3 = this;
        json.forEach(function (elem) {
          var year = elem.start_date || elem.year || '';
          elem.title = elem.title || elem.ru_title || elem.en_title || elem.nameRu || elem.nameEn;
          elem.quality = year ? (year + '').slice(0, 4) : '----';
          elem.info = '';
          var item = Lampa.Template.get('online_folder', elem);
          item.on('hover:enter', function () {
            _this3.activity.loader(true);
            _this3.reset();
            object.search_date = year;
            selected_id = elem.id;
            _this3.extendChoice();
            if (balanser == 'videocdn' || balanser == 'filmix' || balanser == 'cdnmovies') sources[balanser].search(object, [elem]);else sources[balanser].search(object, elem.kp_id || elem.filmId, [elem]);
          });
          _this3.append(item);
        });
      };

      /**
       * Очистить список файлов
       */
      this.reset = function () {
        last = false;
        scroll.render().find('.empty').remove();
        filter.render().detach();
        scroll.clear();
        scroll.append(filter.render());
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
        var select = [];
        var add = function add(type, title) {
          var need = Lampa.Storage.get('online_filter', '{}');
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
        choice.source = filter_sources.indexOf(balanser);
        select.push({
          title: Lampa.Lang.translate('torrent_parser_reset'),
          reset: true
        });
        Lampa.Storage.set('online_filter', choice);
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
        var need = Lampa.Storage.get('online_filter', '{}'),
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

      /**
       * Добавить файл
       */
      this.append = function (item) {
        item.on('hover:focus', function (e) {
          last = e.target;
          scroll.update($(e.target), true);
        });
        scroll.append(item);
      };

      /**
       * Меню
       */
      this.contextmenu = function (params) {
        params.item.on('hover:long', function () {
          function show(extra) {
            var enabled = Lampa.Controller.enabled().name;
            var menu = [{
              title: Lampa.Lang.translate('torrent_parser_label_title'),
              mark: true
            }, {
              title: Lampa.Lang.translate('torrent_parser_label_cancel_title'),
              clearmark: true
            }, {
              title: Lampa.Lang.translate('time_reset'),
              timeclear: true
            }];
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
            if (extra) {
              menu.push({
                title: Lampa.Lang.translate('copy_link'),
                copylink: true
              });
            }
            if (Lampa.Account.working() && params.element && typeof params.element.season !== 'undefined' && Lampa.Account.subscribeToTranslation) {
              menu.push({
                title: Lampa.Lang.translate('online_voice_subscribe'),
                subscribe: true
              });
            }
            Lampa.Select.show({
              title: Lampa.Lang.translate('title_action'),
              items: menu,
              onBack: function onBack() {
                Lampa.Controller.toggle(enabled);
              },
              onSelect: function onSelect(a) {
                if (a.clearmark) {
                  Lampa.Arrays.remove(params.viewed, params.hash_file);
                  Lampa.Storage.set('online_view', params.viewed);
                  params.item.find('.torrent-item__viewed').remove();
                }
                if (a.mark) {
                  if (params.viewed.indexOf(params.hash_file) == -1) {
                    params.viewed.push(params.hash_file);
                    params.item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                    Lampa.Storage.set('online_view', params.viewed);
                  }
                }
                if (a.timeclear) {
                  params.view.percent = 0;
                  params.view.time = 0;
                  params.view.duration = 0;
                  Lampa.Timeline.update(params.view);
                }
                Lampa.Controller.toggle(enabled);
                if (a.player) {
                  Lampa.Player.runas(a.player);
                  params.item.trigger('hover:enter');
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
                      title: 'Ссылки',
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
          params.file(show);
        }).on('hover:focus', function () {
          if (Lampa.Helper) Lampa.Helper.show('online_file', Lampa.Lang.translate('helper_online_file'), params.item);
        });
      };

      /**
       * Показать пустой результат
       */
      this.empty = function (msg) {
        var empty = Lampa.Template.get('list_empty');
        if (msg) empty.find('.empty__descr').text(msg);
        scroll.append(empty);
        this.loading(false);
      };

      /**
       * Показать пустой результат по ключевому слову
       */
      this.emptyForQuery = function (query) {
        this.empty(Lampa.Lang.translate('online_query_start') + ' (' + query + ') ' + Lampa.Lang.translate('online_query_end'));
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
      this.start = function (first_select) {
        if (Lampa.Activity.active().activity !== this.activity) return; //обязательно, иначе наблюдается баг, активность создается но не стартует, в то время как компонент загружается и стартует самого себя.

        if (first_select) {
          var last_views = scroll.render().find('.selector.online').find('.torrent-item__viewed').parent().last();
          if (object.movie.number_of_seasons && last_views.length) last = last_views.eq(0)[0];else last = scroll.render().find('.selector').eq(3)[0];
        }
        Lampa.Background.immediately(Lampa.Utils.cardImgBackground(object.movie));
        Lampa.Controller.add('content', {
          toggle: function toggle() {
            Lampa.Controller.collectionSet(scroll.render(), files.render());
            Lampa.Controller.collectionFocus(last || false, scroll.render());
          },
          up: function up() {
            if (Navigator.canmove('up')) {
              if (scroll.render().find('.selector').slice(3).index(last) == 0 && last_filter) {
                Lampa.Controller.collectionFocus(last_filter, scroll.render());
              } else Navigator.move('up');
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
        files.destroy();
        scroll.destroy();
        network = null;
        sources.videocdn.destroy();
        sources.rezka.destroy();
        sources.kinobase.destroy();
        sources.collaps.destroy();
        sources.cdnmovies.destroy();
        sources.filmix.destroy();
        window.removeEventListener('resize', minus);
      };
    }

    if (!Lampa.Lang) {
      var lang_data = {};
      Lampa.Lang = {
        add: function add(data) {
          lang_data = data;
        },
        translate: function translate(key) {
          return lang_data[key] ? lang_data[key].ru : key;
        }
      };
    }
    Lampa.Lang.add({
      online_nolink: {
        ru: 'Не удалось извлечь ссылку',
        uk: 'Неможливо отримати посилання',
        en: 'Failed to fetch link',
        zh: '获取链接失败',
        bg: 'Не може да се извлече връзката'
      },
      online_waitlink: {
        ru: 'Работаем над извлечением ссылки, подождите...',
        uk: 'Працюємо над отриманням посилання, зачекайте...',
        en: 'Working on extracting the link, please wait...',
        zh: '正在提取链接，请稍候...',
        bg: 'Работя по извличнаето на линка, моля почакайте...'
      },
      online_balanser: {
        ru: 'Балансер',
        uk: 'Балансер',
        en: 'Balancer',
        zh: '平衡器',
        bg: 'Балансър'
      },
      helper_online_file: {
        ru: 'Удерживайте клавишу "ОК" для вызова контекстного меню',
        uk: 'Утримуйте клавішу "ОК" для виклику контекстного меню',
        en: 'Hold the "OK" key to bring up the context menu',
        zh: '按住“确定”键调出上下文菜单',
        bg: 'Задръжте бутон "ОК" за да отворите контекстното меню'
      },
      online_query_start: {
        ru: 'По запросу',
        uk: 'На запит',
        en: 'On request',
        zh: '根据要求',
        bg: 'По запитване'
      },
      online_query_end: {
        ru: 'нет результатов',
        uk: 'немає результатів',
        en: 'no results',
        zh: '没有结果',
        bg: 'няма резултати'
      },
      title_online: {
        ru: 'Онлайн',
        uk: 'Онлайн',
        en: 'Online',
        zh: '在线的',
        bg: 'Онлайн'
      },
      title_proxy: {
        ru: 'Прокси',
        uk: 'Проксі',
        en: 'Proxy',
        zh: '代理人',
        bg: 'Прокси'
      },
      online_proxy_title: {
        ru: 'Основной прокси',
        uk: 'Основний проксі',
        en: 'Main proxy',
        zh: '主要代理',
        bg: 'Основно прокси'
      },
      online_proxy_descr: {
        ru: 'Будет использоваться для всех балансеров',
        uk: 'Використовуватиметься для всіх балансерів',
        en: 'Will be used for all balancers',
        zh: '将用于所有平衡器',
        bg: 'Ще бъде използвано от всички балансъри'
      },
      online_proxy_placeholder: {
        ru: 'Например: http://proxy.com',
        uk: 'Наприклад: http://proxy.com',
        en: 'For example: http://proxy.com',
        zh: '例如：http://proxy.com',
        bg: 'Например: http://proxy.com'
      },
      filmix_param_add_title: {
        ru: 'Добавить ТОКЕН от Filmix',
        uk: 'Додати ТОКЕН від Filmix',
        en: 'Add TOKEN from Filmix',
        zh: '从 Filmix 添加 TOKEN',
        bg: 'Добави TOKEN от Filmix'
      },
      filmix_param_add_descr: {
        ru: 'Добавьте ТОКЕН для подключения подписки',
        uk: 'Додайте ТОКЕН для підключення передплати',
        en: 'Add a TOKEN to connect a subscription',
        zh: '添加 TOKEN 以连接订阅',
        bg: 'Добави TOKEN за вклюване на абонамента'
      },
      filmix_param_placeholder: {
        ru: 'Например: nxjekeb57385b..',
        uk: 'Наприклад: nxjekeb57385b..',
        en: 'For example: nxjekeb57385b..',
        zh: '例如：nxjekeb57385b..',
        bg: 'Например: nxjekeb57385b..'
      },
      filmix_param_add_device: {
        ru: 'Добавить устройство на Filmix',
        uk: 'Додати пристрій на Filmix',
        en: 'Add Device to Filmix',
        zh: '将设备添加到 Filmix',
        bg: 'Добави устройство в Filmix'
      },
      filmix_modal_text: {
        ru: 'Введите его на странице https://filmix.ac/consoles в вашем авторизованном аккаунте!',
        uk: 'Введіть його на сторінці https://filmix.ac/consoles у вашому авторизованому обліковому записі!',
        en: 'Enter it at https://filmix.ac/consoles in your authorized account!',
        zh: '在您的授权帐户中的 https://filmix.ac/consoles 中输入！',
        bg: 'Въведете го на страницата https://filmix.ac/consoles във вашият акаунт'
      },
      filmix_modal_wait: {
        ru: 'Ожидаем код',
        uk: 'Очікуємо код',
        en: 'Waiting for the code',
        zh: '我们正在等待代码',
        bg: 'Очаквам код'
      },
      filmix_copy_secuses: {
        ru: 'Код скопирован в буфер обмена',
        uk: 'Код скопійовано в буфер обміну',
        en: 'Code copied to clipboard',
        zh: '代码复制到剪贴板',
        bg: 'Кода е копиран в буфера за обмен'
      },
      filmix_copy_fail: {
        ru: 'Ошибка при копировании',
        uk: 'Помилка при копіюванні',
        en: 'Copy error',
        zh: '复制错误',
        bg: 'Грешка при копиране'
      },
      filmix_nodevice: {
        ru: 'Устройство не авторизовано',
        uk: 'Пристрій не авторизований',
        en: 'Device not authorized',
        zh: '设备未授权',
        bg: 'Устройството не е оторизирано'
      },
      title_status: {
        ru: 'Статус',
        uk: 'Статус',
        en: 'Status',
        zh: '地位',
        bg: 'Статус'
      },
      online_voice_subscribe: {
        ru: 'Подписаться на перевод',
        uk: 'Підписатися на переклад',
        en: 'Subscribe to translation',
        zh: '订阅翻译',
        bg: 'Абонирай се за превода'
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
        zh: '发生了错误',
        bg: 'Възникна грешка'
      }
    });
    function resetTemplates() {
      Lampa.Template.add('online', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div style=\"position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em\">\n                <svg style=\"height: 2.4em; width:  2.4em;\" viewBox=\"0 0 128 128\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <circle cx=\"64\" cy=\"64\" r=\"56\" stroke=\"white\" stroke-width=\"16\"/>\n                    <path d=\"M90.5 64.3827L50 87.7654L50 41L90.5 64.3827Z\" fill=\"white\"/>\n                </svg>\n            </div>\n            <div class=\"online__title\" style=\"padding-left: 2.1em;\">{title}</div>\n            <div class=\"online__quality\" style=\"padding-left: 3.4em;\">{quality}{info}</div>\n        </div>\n    </div>");
      Lampa.Template.add('online_folder', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div style=\"position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em\">\n                <svg style=\"height: 2.4em; width:  2.4em;\" viewBox=\"0 0 128 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect y=\"20\" width=\"128\" height=\"92\" rx=\"13\" fill=\"white\"/>\n                    <path d=\"M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z\" fill=\"white\" fill-opacity=\"0.23\"/>\n                    <rect x=\"11\" y=\"8\" width=\"106\" height=\"76\" rx=\"13\" fill=\"white\" fill-opacity=\"0.51\"/>\n                </svg>\n            </div>\n            <div class=\"online__title\" style=\"padding-left: 2.1em;\">{title}</div>\n            <div class=\"online__quality\" style=\"padding-left: 3.4em;\">{quality}{info}</div>\n        </div>\n    </div>");
    }
    var button = "<div class=\"full-start__button selector view--online\" data-subtitle=\"v1.54\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:svgjs=\"http://svgjs.com/svgjs\" version=\"1.1\" width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 30.051 30.051\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\" class=\"\">\n    <g xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M19.982,14.438l-6.24-4.536c-0.229-0.166-0.533-0.191-0.784-0.062c-0.253,0.128-0.411,0.388-0.411,0.669v9.069   c0,0.284,0.158,0.543,0.411,0.671c0.107,0.054,0.224,0.081,0.342,0.081c0.154,0,0.31-0.049,0.442-0.146l6.24-4.532   c0.197-0.145,0.312-0.369,0.312-0.607C20.295,14.803,20.177,14.58,19.982,14.438z\" fill=\"currentColor\"/>\n        <path d=\"M15.026,0.002C6.726,0.002,0,6.728,0,15.028c0,8.297,6.726,15.021,15.026,15.021c8.298,0,15.025-6.725,15.025-15.021   C30.052,6.728,23.324,0.002,15.026,0.002z M15.026,27.542c-6.912,0-12.516-5.601-12.516-12.514c0-6.91,5.604-12.518,12.516-12.518   c6.911,0,12.514,5.607,12.514,12.518C27.541,21.941,21.937,27.542,15.026,27.542z\" fill=\"currentColor\"/>\n    </g></svg>\n\n    <span>#{title_online}</span>\n    </div>";

    // нужна заглушка, а то при страте лампы говорит пусто
    Lampa.Component.add('online', component);

    //то же самое
    resetTemplates();
    Lampa.Listener.follow('full', function (e) {
      if (e.type == 'complite') {
        var btn = $(Lampa.Lang.translate(button));
        btn.on('hover:enter', function () {
          resetTemplates();
          Lampa.Component.add('online', component);
          Lampa.Activity.push({
            url: '',
            title: Lampa.Lang.translate('title_online'),
            component: 'online',
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
    Lampa.Params.select('online_proxy_cdnmovies', '', '');
    Lampa.Template.add('settings_proxy', "<div>\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_all\" placeholder=\"#{online_proxy_placeholder}\">\n        <div class=\"settings-param__name\">#{online_proxy_title}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{online_proxy_descr}</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_videocdn\" placeholder=\"#{online_proxy_placeholder}\">\n        <div class=\"settings-param__name\">Videocdn</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_rezka\" placeholder=\"#{online_proxy_placeholder}\">\n        <div class=\"settings-param__name\">Rezka</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_kinobase\" placeholder=\"#{online_proxy_placeholder}\">\n        <div class=\"settings-param__name\">Kinobase</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_collaps\" placeholder=\"#{online_proxy_placeholder}\">\n        <div class=\"settings-param__name\">Collaps</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_cdnmovies\" placeholder=\"#{online_proxy_placeholder}\">\n        <div class=\"settings-param__name\">Cdnmovies</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n</div>");
    function addSettingsProxy() {
      if (Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="proxy"]').length) {
        var field = $(Lampa.Lang.translate("<div class=\"settings-folder selector\" data-component=\"proxy\">\n            <div class=\"settings-folder__icon\">\n                <svg height=\"46\" viewBox=\"0 0 42 46\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <rect x=\"1.5\" y=\"26.5\" width=\"39\" height=\"18\" rx=\"1.5\" stroke=\"white\" stroke-width=\"3\"/>\n                <circle cx=\"9.5\" cy=\"35.5\" r=\"3.5\" fill=\"white\"/>\n                <circle cx=\"26.5\" cy=\"35.5\" r=\"2.5\" fill=\"white\"/>\n                <circle cx=\"32.5\" cy=\"35.5\" r=\"2.5\" fill=\"white\"/>\n                <circle cx=\"21.5\" cy=\"5.5\" r=\"5.5\" fill=\"white\"/>\n                <rect x=\"31\" y=\"4\" width=\"11\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                <rect y=\"4\" width=\"11\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                <rect x=\"20\" y=\"14\" width=\"3\" height=\"7\" rx=\"1.5\" fill=\"white\"/>\n                </svg>\n            </div>\n            <div class=\"settings-folder__name\">#{title_proxy}</div>\n        </div>"));
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
    Lampa.Template.add('settings_filmix', "<div>\n    <div class=\"settings-param selector\" data-name=\"filmix_token\" data-type=\"input\" placeholder=\"#{filmix_param_placeholder}\">\n        <div class=\"settings-param__name\">#{filmix_param_add_title}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{filmix_param_add_descr}</div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"filmix_add\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{filmix_param_add_device}</div>\n    </div>\n</div>");
    Lampa.Storage.listener.follow('change', function (e) {
      if (e.name == 'filmix_token') {
        if (e.value) checkPro(e.value);else {
          Lampa.Storage.set("filmix_status", {});
          showStatus();
        }
      }
    });
    function addSettingsFilmix() {
      if (Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="filmix"]').length) {
        var field = $("<div class=\"settings-folder selector\" data-component=\"filmix\">\n            <div class=\"settings-folder__icon\">\n                <svg height=\"57\" viewBox=\"0 0 58 57\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z\" fill=\"white\"/>\n                <rect x=\"2\" y=\"2\" width=\"54\" height=\"53\" rx=\"5\" stroke=\"white\" stroke-width=\"4\"/>\n                </svg>\n            </div>\n            <div class=\"settings-folder__name\">Filmix</div>\n        </div>");
        Lampa.Settings.main().render().find('[data-component="more"]').after(field);
        Lampa.Settings.main().update();
      }
    }
    if (window.appready) addSettingsFilmix();else {
      Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') addSettingsFilmix();
      });
    }
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
              //modal.find('.broadcast__scan').remove()
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
      var field = $(Lampa.Lang.translate("\n        <div class=\"settings-param\" data-name=\"filmix_status\" data-static=\"true\">\n            <div class=\"settings-param__name\">#{title_status}</div>\n            <div class=\"settings-param__value\">".concat(info, "</div>\n        </div>")));
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

})();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25saW5lLmpzIiwic291cmNlcyI6WyJvbmxpbmUvdmlkZW9jZG4uanMiLCJvbmxpbmUvcmV6a2EuanMiLCJvbmxpbmUva2lub2Jhc2UuanMiLCJvbmxpbmUvY29sbGFwcy5qcyIsIm9ubGluZS9jZG5tb3ZpZXMuanMiLCJvbmxpbmUvZmlsbWl4LmpzIiwib25saW5lL2NvbXBvbmVudC5qcyIsIm9ubGluZS9vbmxpbmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gdmlkZW9jZG4oY29tcG9uZW50LCBfb2JqZWN0KXtcbiAgICBsZXQgbmV0d29yayAgPSBuZXcgTGFtcGEuUmVndWVzdCgpXG4gICAgbGV0IGV4dHJhY3QgID0ge31cbiAgICBsZXQgcmVzdWx0cyAgPSBbXVxuICAgIGxldCBvYmplY3QgICA9IF9vYmplY3RcbiAgICBsZXQgc2VsZWN0X3RpdGxlID0gJydcbiAgICBsZXQgZ2V0X2xpbmtzX3dhaXQgPSBmYWxzZVxuXG4gICAgbGV0IGZpbHRlcl9pdGVtcyA9IHt9XG5cbiAgICBsZXQgY2hvaWNlID0ge1xuICAgICAgICBzZWFzb246IDAsXG4gICAgICAgIHZvaWNlOiAwLFxuICAgICAgICB2b2ljZV9uYW1lOiAnJyxcbiAgICAgICAgdm9pY2VfaWQ6IDBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQndCw0YfQsNGC0Ywg0L/QvtC40YHQulxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBfb2JqZWN0IFxuICAgICAqL1xuICAgIHRoaXMuc2VhcmNoID0gZnVuY3Rpb24oX29iamVjdCwgZGF0YSl7XG4gICAgICAgIG9iamVjdCA9IF9vYmplY3RcblxuICAgICAgICBzZWxlY3RfdGl0bGUgPSBvYmplY3QubW92aWUudGl0bGVcblxuICAgICAgICBnZXRfbGlua3Nfd2FpdCA9IHRydWVcblxuICAgICAgICBsZXQgdXJsICA9IGNvbXBvbmVudC5wcm94eSgndmlkZW9jZG4nKSArICdodHRwOi8vY2RuLnN2ZXRhY2RuLmluL2FwaS8nXG4gICAgICAgIGxldCBpdG0gID0gZGF0YVswXVxuICAgICAgICBsZXQgdHlwZSA9IGl0bS5pZnJhbWVfc3JjLnNwbGl0KCcvJykuc2xpY2UoLTIpWzBdXG5cbiAgICAgICAgaWYodHlwZSA9PSAnbW92aWUnKSB0eXBlID0gJ21vdmllcydcblxuICAgICAgICB1cmwgKz0gdHlwZVxuXG4gICAgICAgIHVybCA9IExhbXBhLlV0aWxzLmFkZFVybENvbXBvbmVudCh1cmwsJ2FwaV90b2tlbj0zaTQwRzVUU0VDbUxGNzdvQXFuRWdieDYxWldhT1lhRScpXG4gICAgICAgIHVybCA9IExhbXBhLlV0aWxzLmFkZFVybENvbXBvbmVudCh1cmwsaXRtLmltZGJfaWQgPyAnaW1kYl9pZD0nK2VuY29kZVVSSUNvbXBvbmVudChpdG0uaW1kYl9pZCkgOiAndGl0bGU9JytlbmNvZGVVUklDb21wb25lbnQoaXRtLnRpdGxlKSlcbiAgICAgICAgdXJsID0gTGFtcGEuVXRpbHMuYWRkVXJsQ29tcG9uZW50KHVybCwnZmllbGQ9JytlbmNvZGVVUklDb21wb25lbnQoJ2dsb2JhbCcpKVxuXG4gICAgICAgIG5ldHdvcmsuc2lsZW50KHVybCwgKGZvdW5kKSA9PiB7XG4gICAgICAgICAgICByZXN1bHRzID0gZm91bmQuZGF0YS5maWx0ZXIoZWxlbT0+ZWxlbS5pZCA9PSBpdG0uaWQpXG5cbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzdWx0cylcblxuICAgICAgICAgICAgY29tcG9uZW50LmxvYWRpbmcoZmFsc2UpXG5cbiAgICAgICAgICAgIGlmKCFyZXN1bHRzLmxlbmd0aCkgY29tcG9uZW50LmVtcHR5Rm9yUXVlcnkoc2VsZWN0X3RpdGxlKVxuXG4gICAgICAgIH0sKGEsYyk9PntcbiAgICAgICAgICAgIGNvbXBvbmVudC5lbXB0eShuZXR3b3JrLmVycm9yRGVjb2RlKGEsIGMpKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZXh0ZW5kQ2hvaWNlID0gZnVuY3Rpb24oc2F2ZWQpe1xuICAgICAgICBMYW1wYS5BcnJheXMuZXh0ZW5kKGNob2ljZSwgc2F2ZWQsIHRydWUpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KHQsdGA0L7RgSDRhNC40LvRjNGC0YDQsFxuICAgICAqL1xuICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbigpe1xuICAgICAgICBjb21wb25lbnQucmVzZXQoKVxuXG4gICAgICAgIGNob2ljZSA9IHtcbiAgICAgICAgICAgIHNlYXNvbjogMCxcbiAgICAgICAgICAgIHZvaWNlOiAwLFxuICAgICAgICAgICAgdm9pY2VfbmFtZTogJycsXG4gICAgICAgICAgICB2b2ljZV9pZDogMFxuICAgICAgICB9XG5cbiAgICAgICAgZmlsdGVyKClcblxuICAgICAgICBhcHBlbmQoZmlsdHJlZCgpKVxuXG4gICAgICAgIGNvbXBvbmVudC5zYXZlQ2hvaWNlKGNob2ljZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9GA0LjQvNC10L3QuNGC0Ywg0YTQuNC70YzRgtGAXG4gICAgICogQHBhcmFtIHsqfSB0eXBlIFxuICAgICAqIEBwYXJhbSB7Kn0gYSBcbiAgICAgKiBAcGFyYW0geyp9IGIgXG4gICAgICovXG4gICAgdGhpcy5maWx0ZXIgPSBmdW5jdGlvbih0eXBlLCBhLCBiKXtcbiAgICAgICAgY2hvaWNlW2Euc3R5cGVdID0gYi5pbmRleFxuXG4gICAgICAgIGlmKGEuc3R5cGUgPT0gJ3ZvaWNlJyl7XG4gICAgICAgICAgICBjaG9pY2Uudm9pY2VfbmFtZSA9IGZpbHRlcl9pdGVtcy52b2ljZVtiLmluZGV4XVxuICAgICAgICAgICAgY2hvaWNlLnZvaWNlX2lkID0gZmlsdGVyX2l0ZW1zLnZvaWNlX2luZm9bYi5pbmRleF0gJiYgZmlsdGVyX2l0ZW1zLnZvaWNlX2luZm9bYi5pbmRleF0uaWRcbiAgICAgICAgfSBcblxuICAgICAgICBjb21wb25lbnQucmVzZXQoKVxuXG4gICAgICAgIGZpbHRlcigpXG5cbiAgICAgICAgYXBwZW5kKGZpbHRyZWQoKSlcblxuICAgICAgICBjb21wb25lbnQuc2F2ZUNob2ljZShjaG9pY2UpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KPQvdC40YfRgtC+0LbQuNGC0YxcbiAgICAgKi9cbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICBuZXR3b3JrLmNsZWFyKClcblxuICAgICAgICByZXN1bHRzID0gbnVsbFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCj0YHQv9C10YjQvdC+LCDQtdGB0YLRjCDQtNCw0L3QvdGL0LVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ganNvbiBcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdWNjZXNzKGpzb24pe1xuICAgICAgICByZXN1bHRzID0ganNvblxuXG4gICAgICAgIGV4dHJhY3REYXRhKGpzb24pXG5cbiAgICAgICAgZmlsdGVyKClcblxuICAgICAgICBhcHBlbmQoZmlsdHJlZCgpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0L7Qu9GD0YfQuNGC0Ywg0L/QvtGC0L7QutC4XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciBcbiAgICAgKiBAcGFyYW0ge0ludH0gbWF4X3F1YWxpdHkgXG4gICAgICogQHJldHVybnMgc3RyaW5nXG4gICAgICovXG4gICAgZnVuY3Rpb24gZXh0cmFjdEZpbGUoc3RyLCBtYXhfcXVhbGl0eSl7XG4gICAgICAgIGxldCB1cmwgPSAnJ1xuXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCBpdGVtcyA9IHN0ci5zcGxpdCgnLCcpLm1hcChpdGVtPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcXVhbGl0eTogcGFyc2VJbnQoaXRlbS5tYXRjaCgvXFxbKFxcZCspcFxcXS8pWzFdKSxcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogaXRlbS5yZXBsYWNlKC9cXFtcXGQrcFxcXS8sJycpLnNwbGl0KCcgb3IgJylbMF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpdGVtcy5zb3J0KChhLGIpPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIGIucXVhbGl0eSAtIGEucXVhbGl0eVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdXJsID0gaXRlbXNbMF0uZmlsZVxuICAgICAgICAgICAgdXJsID0gJ2h0dHA6JyArIHVybC5zbGljZSgwLCB1cmwubGFzdEluZGV4T2YoJy8nKSkgKyAnLycgKyAobWF4X3F1YWxpdHkgfHwgaXRlbXNbMF0ucXVhbGl0eSkgKyAnLm1wNCdcbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlKXt9XG5cbiAgICAgICAgcmV0dXJuIHVybFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dHJhY3RJdGVtcyhzdHIsIG1heF9xdWFsaXR5KXtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IGl0ZW1zID0gc3RyLnNwbGl0KCcsJykubWFwKGl0ZW09PntcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBxdWFsaXR5OiBwYXJzZUludChpdGVtLm1hdGNoKC9cXFsoXFxkKylwXFxdLylbMV0pLFxuICAgICAgICAgICAgICAgICAgICBmaWxlOiAnaHR0cDonICsgaXRlbS5yZXBsYWNlKC9cXFtcXGQrcFxcXS8sJycpLnNwbGl0KCcgb3IgJylbMF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5maWx0ZXIoaXRlbT0+e1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnF1YWxpdHkgPD0gbWF4X3F1YWxpdHlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGl0ZW1zLnNvcnQoKGEsYik9PntcbiAgICAgICAgICAgICAgICByZXR1cm4gYi5xdWFsaXR5IC0gYS5xdWFsaXR5XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gaXRlbXNcbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlKXt9XG5cbiAgICAgICAgcmV0dXJuIFtdXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J/QvtC70YPRh9C40YLRjCDQuNC90YTQvtGA0LzQsNGG0LjRjiDQviDRhNC40LvRjNC80LVcbiAgICAgKiBAcGFyYW0ge0FycmF5c30gcmVzdWx0cyBcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBleHRyYWN0RGF0YShyZXN1bHRzKXtcbiAgICAgICAgbmV0d29yay50aW1lb3V0KDIwMDAwKVxuXG4gICAgICAgIGxldCBtb3ZpZSA9IHJlc3VsdHMuc2xpY2UoMCwxKVswXVxuXG4gICAgICAgIGV4dHJhY3QgPSB7fVxuXG4gICAgICAgIGlmKG1vdmllKXtcbiAgICAgICAgICAgIGxldCBzcmMgPSBtb3ZpZS5pZnJhbWVfc3JjO1xuXG4gICAgICAgICAgICBuZXR3b3JrLm5hdGl2ZSgnaHR0cDonK3NyYywocmF3KT0+e1xuICAgICAgICAgICAgICAgIGdldF9saW5rc193YWl0ID0gZmFsc2VcblxuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5yZW5kZXIoKS5maW5kKCcuYnJvYWRjYXN0X19zY2FuJykucmVtb3ZlKClcblxuICAgICAgICAgICAgICAgIGxldCBtYXRoID0gcmF3LnJlcGxhY2UoL1xcbi9nLCcnKS5tYXRjaCgvaWQ9XCJmaWxlc1wiIHZhbHVlPVwiKC4qPylcIi8pXG5cbiAgICAgICAgICAgICAgICBpZihtYXRoKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGpzb24gPSBMYW1wYS5BcnJheXMuZGVjb2RlSnNvbihtYXRoWzFdLnJlcGxhY2UoLyZxdW90Oy9nLCdcIicpLHt9KVxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKVxuXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSBpbiBqc29uKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09PSAoaSAtIDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQuaW5uZXJIVE1MID0ganNvbltpXVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5BcnJheXMuZGVjb2RlSnNvbih0ZXh0LnZhbHVlLHt9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWF4X3F1YWxpdHkgPSBtb3ZpZS5tZWRpYT8uZmlsdGVyKG9iaiA9PiBvYmoudHJhbnNsYXRpb25faWQgPT09IChpIC0gMCkpWzBdPy5tYXhfcXVhbGl0eTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXhfcXVhbGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heF9xdWFsaXR5ID0gbW92aWUudHJhbnNsYXRpb25zPy5maWx0ZXIob2JqID0+IG9iai5pZCA9PT0gKGkgLSAwKSlbMF0/Lm1heF9xdWFsaXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRyYWN0W2ldID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzb246IExhbXBhLkFycmF5cy5kZWNvZGVKc29uKHRleHQudmFsdWUse30pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZmlsZTogZXh0cmFjdEZpbGUoanNvbltpXSwgbWF4X3F1YWxpdHkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IGV4dHJhY3RJdGVtcyhqc29uW2ldLCBtYXhfcXVhbGl0eSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBhIGluIGV4dHJhY3RbaV0uanNvbil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsZW0gPSBleHRyYWN0W2ldLmpzb25bYV1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW0uZm9sZGVyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBmIGluIGVsZW0uZm9sZGVyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb2xkZXIgPSBlbGVtLmZvbGRlcltmXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2ZvbGRlci5maWxlID0gZXh0cmFjdEZpbGUoZm9sZGVyLmZpbGUsIG1heF9xdWFsaXR5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9sZGVyLml0ZW1zID0gZXh0cmFjdEl0ZW1zKGZvbGRlci5maWxlLCBtYXhfcXVhbGl0eSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Vsc2UgZWxlbS5maWxlID0gZXh0cmFjdEZpbGUoZWxlbS5maWxlLCBtYXhfcXVhbGl0eSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGVsZW0uaXRlbXMgPSBleHRyYWN0SXRlbXMoZWxlbS5maWxlLCBtYXhfcXVhbGl0eSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwoKT0+e1xuICAgICAgICAgICAgICAgIGdldF9saW5rc193YWl0ID0gZmFsc2VcblxuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5yZW5kZXIoKS5maW5kKCcuYnJvYWRjYXN0X19zY2FuJykucmVtb3ZlKClcbiAgICAgICAgICAgIH0sZmFsc2Use2RhdGFUeXBlOiAndGV4dCd9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J3QsNC50YLQuCDQv9C+0YLQvtC6XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgXG4gICAgICogQHBhcmFtIHtJbnR9IG1heF9xdWFsaXR5XG4gICAgICogQHJldHVybnMgc3RyaW5nXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0RmlsZShlbGVtZW50LCBtYXhfcXVhbGl0eSl7XG4gICAgICAgIGxldCB0cmFuc2xhdCA9IGV4dHJhY3RbZWxlbWVudC50cmFuc2xhdGlvbl1cbiAgICAgICAgbGV0IGlkICAgICAgID0gZWxlbWVudC5zZWFzb24rJ18nK2VsZW1lbnQuZXBpc29kZVxuICAgICAgICBsZXQgZmlsZSAgICAgPSAnJ1xuICAgICAgICBsZXQgaXRlbXMgICAgPSBbXVxuICAgICAgICBsZXQgcXVhbGl0eSAgPSBmYWxzZVxuXG4gICAgICAgIGlmKHRyYW5zbGF0KXtcbiAgICAgICAgICAgIGlmKGVsZW1lbnQuc2Vhc29uKXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgaW4gdHJhbnNsYXQuanNvbil7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVtID0gdHJhbnNsYXQuanNvbltpXVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGVsZW0uZm9sZGVyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgZiBpbiBlbGVtLmZvbGRlcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvbGRlciA9IGVsZW0uZm9sZGVyW2ZdXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihmb2xkZXIuaWQgPT0gaWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2ZpbGUgPSBmb2xkZXIuZmlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcyA9IGZvbGRlci5pdGVtc1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGVsZW0uaWQgPT0gaWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9maWxlID0gZWxlbS5maWxlXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtcyA9IGVsZW0uaXRlbXNcblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLy9maWxlID0gdHJhbnNsYXQuZmlsZVxuICAgICAgICAgICAgICAgIGl0ZW1zID0gdHJhbnNsYXQuaXRlbXNcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cblxuICAgICAgICBtYXhfcXVhbGl0eSA9IHBhcnNlSW50KG1heF9xdWFsaXR5KVxuXG4gICAgICAgIC8qXG4gICAgICAgIGlmKGZpbGUpe1xuICAgICAgICAgICAgbGV0IHBhdGggPSBmaWxlLnNsaWNlKDAsIGZpbGUubGFzdEluZGV4T2YoJy8nKSkgKyAnLydcblxuICAgICAgICAgICAgaWYoZmlsZS5zcGxpdCgnLycpLnBvcCgpLnJlcGxhY2UoJy5tcDQnLCcnKSAhPT0gbWF4X3F1YWxpdHkpe1xuICAgICAgICAgICAgICAgIGZpbGUgPSBwYXRoICsgbWF4X3F1YWxpdHkgKyAnLm1wNCdcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcXVhbGl0eSA9IHt9XG5cbiAgICAgICAgICAgIGxldCBtYXNzID0gWzEwODAsNzIwLDQ4MCwzNjBdXG4gICAgICAgICAgICAgICAgbWFzcyA9IG1hc3Muc2xpY2UobWFzcy5pbmRleE9mKG1heF9xdWFsaXR5KSlcblxuICAgICAgICAgICAgICAgIG1hc3MuZm9yRWFjaCgobik9PntcbiAgICAgICAgICAgICAgICAgICAgcXVhbGl0eVtuICsgJ3AnXSA9IHBhdGggKyBuICsgJy5tcDQnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHByZWZlcmFibHkgPSBMYW1wYS5TdG9yYWdlLmdldCgndmlkZW9fcXVhbGl0eV9kZWZhdWx0JywnMTA4MCcpICsgJ3AnXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHF1YWxpdHlbcHJlZmVyYWJseV0pIGZpbGUgPSBxdWFsaXR5W3ByZWZlcmFibHldXG4gICAgICAgIH1cbiAgICAgICAgKi9cblxuICAgICAgICBpZihpdGVtcyAmJiBpdGVtcy5sZW5ndGgpe1xuICAgICAgICAgICAgcXVhbGl0eSA9IHt9XG5cbiAgICAgICAgICAgIGxldCBtYXNzID0gWzEwODAsNzIwLDQ4MCwzNjBdXG4gICAgICAgICAgICAgICAgbWFzcyA9IG1hc3Muc2xpY2UobWFzcy5pbmRleE9mKG1heF9xdWFsaXR5KSlcblxuICAgICAgICAgICAgICAgIG1hc3MuZm9yRWFjaCgobik9PntcbiAgICAgICAgICAgICAgICAgICAgbGV0IGV4ZXMgPSBpdGVtcy5maW5kKGE9PmEucXVhbGl0eSA9PSBuKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGV4ZXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWZpbGUpIGZpbGUgPSBleGVzLmZpbGVcblxuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eVtuICsgJ3AnXSA9IGV4ZXMuZmlsZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgbGV0IHByZWZlcmFibHkgPSBMYW1wYS5TdG9yYWdlLmdldCgndmlkZW9fcXVhbGl0eV9kZWZhdWx0JywnMTA4MCcpICsgJ3AnXG4gICAgICAgIFxuICAgICAgICAgICAgaWYocXVhbGl0eVtwcmVmZXJhYmx5XSkgZmlsZSA9IHF1YWxpdHlbcHJlZmVyYWJseV1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgcXVhbGl0eTogcXVhbGl0eVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J/QvtGB0YLRgNC+0LjRgtGMINGE0LjQu9GM0YLRgFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZpbHRlcigpe1xuICAgICAgICBmaWx0ZXJfaXRlbXMgID0ge1xuICAgICAgICAgICAgc2Vhc29uOiBbXSxcbiAgICAgICAgICAgIHZvaWNlOiBbXSxcbiAgICAgICAgICAgIHZvaWNlX2luZm86IFtdXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJlc3VsdHMuc2xpY2UoMCwxKS5mb3JFYWNoKG1vdmllID0+IHtcbiAgICAgICAgICAgIGlmKG1vdmllLnNlYXNvbl9jb3VudCl7XG4gICAgICAgICAgICAgICAgbGV0IHMgPSBtb3ZpZS5zZWFzb25fY291bnRcblxuICAgICAgICAgICAgICAgIHdoaWxlKHMtLSl7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcl9pdGVtcy5zZWFzb24ucHVzaChMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndG9ycmVudF9zZXJpYWxfc2Vhc29uJykgKyAnICcgKyAobW92aWUuc2Vhc29uX2NvdW50IC0gcykpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihmaWx0ZXJfaXRlbXMuc2Vhc29uLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgbW92aWUuZXBpc29kZXMuZm9yRWFjaChlcGlzb2RlPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKGVwaXNvZGUuc2Vhc29uX251bSA9PSBjaG9pY2Uuc2Vhc29uICsgMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcGlzb2RlLm1lZGlhLmZvckVhY2gobWVkaWE9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighZmlsdGVyX2l0ZW1zLnZvaWNlX2luZm8uZmluZCh2PT52LmlkID09IG1lZGlhLnRyYW5zbGF0aW9uLmlkKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcl9pdGVtcy52b2ljZS5wdXNoKG1lZGlhLnRyYW5zbGF0aW9uLnNob3J0ZXJfdGl0bGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcl9pdGVtcy52b2ljZV9pbmZvLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG1lZGlhLnRyYW5zbGF0aW9uLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYoY2hvaWNlLnZvaWNlX25hbWUpe1xuICAgICAgICAgICAgbGV0IGlueCA9IC0xXG5cbiAgICAgICAgICAgIGlmKGNob2ljZS52b2ljZV9pZCl7XG4gICAgICAgICAgICAgICAgbGV0IHZvaWNlID0gZmlsdGVyX2l0ZW1zLnZvaWNlX2luZm8uZmluZCh2PT52LmlkID09IGNob2ljZS52b2ljZV9pZClcblxuICAgICAgICAgICAgICAgIGlmKHZvaWNlKSBpbnggPSBmaWx0ZXJfaXRlbXMudm9pY2VfaW5mby5pbmRleE9mKHZvaWNlKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihpbnggPT0gLTEpIGlueCA9IGZpbHRlcl9pdGVtcy52b2ljZS5pbmRleE9mKGNob2ljZS52b2ljZV9uYW1lKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihpbnggPT0gLTEpIGNob2ljZS52b2ljZSA9IDBcbiAgICAgICAgICAgIGVsc2UgaWYoaW54ICE9PSBjaG9pY2Uudm9pY2Upe1xuICAgICAgICAgICAgICAgIGNob2ljZS52b2ljZSA9IGlueFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9uZW50LmZpbHRlcihmaWx0ZXJfaXRlbXMsIGNob2ljZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQntGC0YTQuNC70YzRgtGA0L7QstCw0YLRjCDRhNCw0LnQu9GLXG4gICAgICogQHJldHVybnMgYXJyYXlcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmaWx0cmVkKCl7XG4gICAgICAgIGxldCBmaWx0cmVkID0gW11cblxuICAgICAgICBsZXQgZmlsdGVyX2RhdGEgPSBMYW1wYS5TdG9yYWdlLmdldCgnb25saW5lX2ZpbHRlcicsJ3t9JylcbiAgICAgICAgXG4gICAgICAgIGlmKG9iamVjdC5tb3ZpZS5udW1iZXJfb2Zfc2Vhc29ucyl7XG4gICAgICAgICAgICByZXN1bHRzLnNsaWNlKDAsMSkuZm9yRWFjaChtb3ZpZT0+e1xuICAgICAgICAgICAgICAgIG1vdmllLmVwaXNvZGVzLmZvckVhY2goZXBpc29kZT0+e1xuICAgICAgICAgICAgICAgICAgICBpZihlcGlzb2RlLnNlYXNvbl9udW0gPT0gZmlsdGVyX2RhdGEuc2Vhc29uICsgMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcCAgID0gZXBpc29kZS5tZWRpYS5tYXAobT0+bSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1bmlxdWUgPSBbXVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wLnNvcnQoKGEsYik9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYi5tYXhfcXVhbGl0eSAtIGEubWF4X3F1YWxpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAuZm9yRWFjaChtPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXVuaXF1ZS5maW5kKGE9PmEudHJhbnNsYXRpb24uaWQgPT0gbS50cmFuc2xhdGlvbi5pZCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmlxdWUucHVzaChtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVwaXNvZGUubWVkaWEuZm9yRWFjaChtZWRpYT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1lZGlhLnRyYW5zbGF0aW9uLmlkID09IGZpbHRlcl9pdGVtcy52b2ljZV9pbmZvW2ZpbHRlcl9kYXRhLnZvaWNlXS5pZCAmJiB1bmlxdWUuaW5kZXhPZihtZWRpYSkgIT09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdHJlZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVwaXNvZGU6IHBhcnNlSW50KGVwaXNvZGUubnVtKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXNvbjogZXBpc29kZS5zZWFzb25fbnVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGVwaXNvZGUubnVtICsgJyAtICcgKyBlcGlzb2RlLnJ1X3RpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eTogbWVkaWEubWF4X3F1YWxpdHkgKyAncCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogbWVkaWEudHJhbnNsYXRpb25faWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJlc3VsdHMuc2xpY2UoMCwxKS5mb3JFYWNoKG1vdmllPT57XG4gICAgICAgICAgICAgICAgbW92aWUubWVkaWEuZm9yRWFjaChlbGVtZW50PT57XG4gICAgICAgICAgICAgICAgICAgIGZpbHRyZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZWxlbWVudC50cmFuc2xhdGlvbi50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6IGVsZW1lbnQubWF4X3F1YWxpdHkgKyAncCcgKyAoZWxlbWVudC5zb3VyY2VfcXVhbGl0eSA/ICcgLSAnICsgZWxlbWVudC5zb3VyY2VfcXVhbGl0eS50b1VwcGVyQ2FzZSgpIDogJycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IGVsZW1lbnQudHJhbnNsYXRpb25faWRcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmaWx0cmVkXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JTQvtCx0LDQstC40YLRjCDQstC40LTQtdC+XG4gICAgICogQHBhcmFtIHtBcnJheX0gaXRlbXMgXG4gICAgICovXG4gICAgZnVuY3Rpb24gYXBwZW5kKGl0ZW1zKXtcbiAgICAgICAgY29tcG9uZW50LnJlc2V0KClcblxuICAgICAgICBpZihnZXRfbGlua3Nfd2FpdCkgY29tcG9uZW50LmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwiYnJvYWRjYXN0X19zY2FuXCI+PGRpdj48L2Rpdj48L2Rpdj4nKSlcblxuICAgICAgICBsZXQgdmlld2VkID0gTGFtcGEuU3RvcmFnZS5jYWNoZSgnb25saW5lX3ZpZXcnLCA1MDAwLCBbXSlcblxuICAgICAgICBsZXQgbGFzdF9lcGlzb2RlID0gY29tcG9uZW50LmdldExhc3RFcGlzb2RlKGl0ZW1zKVxuXG4gICAgICAgIGl0ZW1zLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBpZihlbGVtZW50LnNlYXNvbikgZWxlbWVudC50aXRsZSA9ICdTJytlbGVtZW50LnNlYXNvbiArICcgLyAnICsgTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RvcnJlbnRfc2VyaWFsX2VwaXNvZGUnKSArICcgJyArIGVsZW1lbnQudGl0bGVcblxuICAgICAgICAgICAgZWxlbWVudC5pbmZvID0gZWxlbWVudC5zZWFzb24gPyAnIC8gJyArIGZpbHRlcl9pdGVtcy52b2ljZVtjaG9pY2Uudm9pY2VdIDogJydcblxuICAgICAgICAgICAgaWYoZWxlbWVudC5zZWFzb24pe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQudHJhbnNsYXRlX2VwaXNvZGVfZW5kID0gbGFzdF9lcGlzb2RlXG4gICAgICAgICAgICAgICAgZWxlbWVudC50cmFuc2xhdGVfdm9pY2UgICAgICAgPSBmaWx0ZXJfaXRlbXMudm9pY2VbY2hvaWNlLnZvaWNlXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaGFzaCA9IExhbXBhLlV0aWxzLmhhc2goZWxlbWVudC5zZWFzb24gPyBbZWxlbWVudC5zZWFzb24sZWxlbWVudC5lcGlzb2RlLG9iamVjdC5tb3ZpZS5vcmlnaW5hbF90aXRsZV0uam9pbignJykgOiBvYmplY3QubW92aWUub3JpZ2luYWxfdGl0bGUpXG4gICAgICAgICAgICBsZXQgdmlldyA9IExhbXBhLlRpbWVsaW5lLnZpZXcoaGFzaClcbiAgICAgICAgICAgIGxldCBpdGVtID0gTGFtcGEuVGVtcGxhdGUuZ2V0KCdvbmxpbmUnLGVsZW1lbnQpXG5cbiAgICAgICAgICAgIGxldCBoYXNoX2ZpbGUgPSBMYW1wYS5VdGlscy5oYXNoKGVsZW1lbnQuc2Vhc29uID8gW2VsZW1lbnQuc2Vhc29uLGVsZW1lbnQuZXBpc29kZSxvYmplY3QubW92aWUub3JpZ2luYWxfdGl0bGUsZmlsdGVyX2l0ZW1zLnZvaWNlW2Nob2ljZS52b2ljZV1dLmpvaW4oJycpIDogb2JqZWN0Lm1vdmllLm9yaWdpbmFsX3RpdGxlICsgZWxlbWVudC50aXRsZSlcblxuICAgICAgICAgICAgaXRlbS5hZGRDbGFzcygndmlkZW8tLXN0cmVhbScpXG5cbiAgICAgICAgICAgIGVsZW1lbnQudGltZWxpbmUgPSB2aWV3XG5cbiAgICAgICAgICAgIGl0ZW0uYXBwZW5kKExhbXBhLlRpbWVsaW5lLnJlbmRlcih2aWV3KSlcblxuICAgICAgICAgICAgaWYoTGFtcGEuVGltZWxpbmUuZGV0YWlscyl7XG4gICAgICAgICAgICAgICAgaXRlbS5maW5kKCcub25saW5lX19xdWFsaXR5JykuYXBwZW5kKExhbXBhLlRpbWVsaW5lLmRldGFpbHModmlldywnIC8gJykpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHZpZXdlZC5pbmRleE9mKGhhc2hfZmlsZSkgIT09IC0xKSBpdGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cInRvcnJlbnQtaXRlbV9fdmlld2VkXCI+JytMYW1wYS5UZW1wbGF0ZS5nZXQoJ2ljb25fc3Rhcicse30sdHJ1ZSkrJzwvZGl2PicpXG5cbiAgICAgICAgICAgIGl0ZW0ub24oJ2hvdmVyOmVudGVyJywoKT0+e1xuICAgICAgICAgICAgICAgIGlmKG9iamVjdC5tb3ZpZS5pZCkgTGFtcGEuRmF2b3JpdGUuYWRkKCdoaXN0b3J5Jywgb2JqZWN0Lm1vdmllLCAxMDApXG5cbiAgICAgICAgICAgICAgICBsZXQgZXh0cmEgPSBnZXRGaWxlKGVsZW1lbnQsIGVsZW1lbnQucXVhbGl0eSAsdHJ1ZSlcblxuICAgICAgICAgICAgICAgIGlmKGV4dHJhLmZpbGUpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGxheWxpc3QgPSBbXVxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGV4dHJhLmZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5OiBleHRyYS5xdWFsaXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmU6IHZpZXcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZWxlbWVudC5zZWFzb24gPyBlbGVtZW50LnRpdGxlIDogb2JqZWN0Lm1vdmllLnRpdGxlICsgJyAvICcgKyBlbGVtZW50LnRpdGxlXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50LnNlYXNvbil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5mb3JFYWNoKGVsZW09PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXggPSBnZXRGaWxlKGVsZW0sIGVsZW0ucXVhbGl0eSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZWxlbS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBleC5maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5OiBleC5xdWFsaXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZTogZWxlbS50aW1lbGluZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdC5wdXNoKGZpcnN0KVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYocGxheWxpc3QubGVuZ3RoID4gMSkgZmlyc3QucGxheWxpc3QgPSBwbGF5bGlzdFxuXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLlBsYXllci5wbGF5KGZpcnN0KVxuXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLlBsYXllci5wbGF5bGlzdChwbGF5bGlzdClcblxuICAgICAgICAgICAgICAgICAgICBpZih2aWV3ZWQuaW5kZXhPZihoYXNoX2ZpbGUpID09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdlZC5wdXNoKGhhc2hfZmlsZSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJ0b3JyZW50LWl0ZW1fX3ZpZXdlZFwiPicrTGFtcGEuVGVtcGxhdGUuZ2V0KCdpY29uX3N0YXInLHt9LHRydWUpKyc8L2Rpdj4nKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5TdG9yYWdlLnNldCgnb25saW5lX3ZpZXcnLCB2aWV3ZWQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBMYW1wYS5Ob3R5LnNob3coTGFtcGEuTGFuZy50cmFuc2xhdGUoZ2V0X2xpbmtzX3dhaXQgPyAnb25saW5lX3dhaXRsaW5rJyA6ICdvbmxpbmVfbm9saW5rJykpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBjb21wb25lbnQuYXBwZW5kKGl0ZW0pXG5cbiAgICAgICAgICAgIGNvbXBvbmVudC5jb250ZXh0bWVudSh7XG4gICAgICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgICAgICB2aWV3LFxuICAgICAgICAgICAgICAgIHZpZXdlZCxcbiAgICAgICAgICAgICAgICBoYXNoX2ZpbGUsXG4gICAgICAgICAgICAgICAgZWxlbWVudCxcbiAgICAgICAgICAgICAgICBmaWxlOiAoY2FsbCk9PntjYWxsKGdldEZpbGUoZWxlbWVudCwgZWxlbWVudC5xdWFsaXR5ICx0cnVlKSl9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbXBvbmVudC5zdGFydCh0cnVlKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdmlkZW9jZG4iLCJmdW5jdGlvbiByZXprYShjb21wb25lbnQsIF9vYmplY3Qpe1xuICAgIGxldCBuZXR3b3JrICAgID0gbmV3IExhbXBhLlJlZ3Vlc3QoKVxuICAgIGxldCBleHRyYWN0ICAgID0ge31cbiAgICBsZXQgZW1iZWQgICAgICA9IGNvbXBvbmVudC5wcm94eSgncmV6a2EnKSArICdodHRwczovL3ZvaWRib29zdC5uZXQvJ1xuICAgIGxldCBvYmplY3QgICAgID0gX29iamVjdFxuXG4gICAgbGV0IHNlbGVjdF90aXRsZSA9ICcnXG4gICAgbGV0IHNlbGVjdF9pZCAgICA9ICcnXG4gICAgbGV0IGZpbHRlcl9pdGVtcyA9IHt9XG5cbiAgICBsZXQgY2hvaWNlID0ge1xuICAgICAgICBzZWFzb246IDAsXG4gICAgICAgIHZvaWNlOiAwLFxuICAgICAgICB2b2ljZV9uYW1lOiAnJ1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0L7QuNGB0LpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gX29iamVjdCBcbiAgICAgKi9cbiAgICB0aGlzLnNlYXJjaCA9IGZ1bmN0aW9uKF9vYmplY3QsIGtpbm9wb2lza19pZCl7XG4gICAgICAgIG9iamVjdCA9IF9vYmplY3RcblxuICAgICAgICBzZWxlY3RfaWQgICAgPSBraW5vcG9pc2tfaWRcbiAgICAgICAgc2VsZWN0X3RpdGxlID0gb2JqZWN0Lm1vdmllLnRpdGxlXG5cbiAgICAgICAgZ2V0Rmlyc3RUcmFubGF0ZShraW5vcG9pc2tfaWQsICh2b2ljZSk9PntcbiAgICAgICAgICAgIGdldEZpbG0oa2lub3BvaXNrX2lkLCB2b2ljZSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmV4dGVuZENob2ljZSA9IGZ1bmN0aW9uKHNhdmVkKXtcbiAgICAgICAgTGFtcGEuQXJyYXlzLmV4dGVuZChjaG9pY2UsIHNhdmVkLCB0cnVlKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCh0LHRgNC+0YEg0YTQuNC70YzRgtGA0LBcbiAgICAgKi9cbiAgICAgdGhpcy5yZXNldCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbXBvbmVudC5yZXNldCgpXG5cbiAgICAgICAgY2hvaWNlID0ge1xuICAgICAgICAgICAgc2Vhc29uOiAwLFxuICAgICAgICAgICAgdm9pY2U6IDAsXG4gICAgICAgICAgICB2b2ljZV9uYW1lOiAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9uZW50LmxvYWRpbmcodHJ1ZSlcblxuICAgICAgICBnZXRGaWxtKHNlbGVjdF9pZClcblxuICAgICAgICBjb21wb25lbnQuc2F2ZUNob2ljZShjaG9pY2UpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J/RgNC40LzQtdC90LjRgtGMINGE0LjQu9GM0YLRgFxuICAgICAqIEBwYXJhbSB7Kn0gdHlwZSBcbiAgICAgKiBAcGFyYW0geyp9IGEgXG4gICAgICogQHBhcmFtIHsqfSBiIFxuICAgICAqL1xuICAgICB0aGlzLmZpbHRlciA9IGZ1bmN0aW9uKHR5cGUsIGEsIGIpe1xuICAgICAgICBjaG9pY2VbYS5zdHlwZV0gPSBiLmluZGV4XG5cbiAgICAgICAgaWYoYS5zdHlwZSA9PSAndm9pY2UnKSBjaG9pY2Uudm9pY2VfbmFtZSA9IGZpbHRlcl9pdGVtcy52b2ljZVtiLmluZGV4XVxuXG4gICAgICAgIGNvbXBvbmVudC5yZXNldCgpXG5cbiAgICAgICAgZmlsdGVyKClcblxuICAgICAgICBjb21wb25lbnQubG9hZGluZyh0cnVlKVxuXG4gICAgICAgIGdldEZpbG0oc2VsZWN0X2lkLCBleHRyYWN0LnZvaWNlW2Nob2ljZS52b2ljZV0udG9rZW4pXG5cbiAgICAgICAgY29tcG9uZW50LnNhdmVDaG9pY2UoY2hvaWNlKVxuXG4gICAgICAgIHNldFRpbWVvdXQoY29tcG9uZW50LmNsb3NlRmlsdGVyLDEwKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCj0L3QuNGH0YLQvtC20LjRgtGMXG4gICAgICovXG4gICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgbmV0d29yay5jbGVhcigpXG5cbiAgICAgICAgZXh0cmFjdCA9IG51bGxcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZWFzb25zKHZvaWNlLCBjYWxsKXtcbiAgICAgICAgbGV0IHVybCA9IGVtYmVkICsgJ3NlcmlhbC8nK3ZvaWNlKycvaWZyYW1lP2g9Z2lkb25saW5lLmlvJ1xuXG4gICAgICAgIG5ldHdvcmsuY2xlYXIoKVxuICAgICAgICBuZXR3b3JrLnRpbWVvdXQoMTAwMDApXG5cbiAgICAgICAgbmV0d29yay5uYXRpdmUodXJsLChzdHIpPT57XG4gICAgICAgICAgICBleHRyYWN0RGF0YShzdHIpXG5cbiAgICAgICAgICAgIGNhbGwoKVxuICAgICAgICB9LChhLGMpPT57XG4gICAgICAgICAgICBjb21wb25lbnQuZW1wdHkobmV0d29yay5lcnJvckRlY29kZShhLCBjKSlcbiAgICAgICAgfSxmYWxzZSx7XG4gICAgICAgICAgICBkYXRhVHlwZTogJ3RleHQnXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Rmlyc3RUcmFubGF0ZShpZCwgY2FsbCl7XG4gICAgICAgIG5ldHdvcmsuY2xlYXIoKVxuICAgICAgICBuZXR3b3JrLnRpbWVvdXQoMTAwMDApXG5cbiAgICAgICAgbmV0d29yay5uYXRpdmUoZW1iZWQgKyAnZW1iZWQvJytpZCArICc/cz0xJywoc3RyKT0+e1xuICAgICAgICAgICAgZXh0cmFjdERhdGEoc3RyKVxuXG4gICAgICAgICAgICBpZihleHRyYWN0LnZvaWNlLmxlbmd0aCkgY2FsbChleHRyYWN0LnZvaWNlWzBdLnRva2VuKVxuICAgICAgICAgICAgZWxzZSBjb21wb25lbnQuZW1wdHlGb3JRdWVyeShzZWxlY3RfdGl0bGUpXG4gICAgICAgIH0sKGEsYyk9PntcbiAgICAgICAgICAgIGNvbXBvbmVudC5lbXB0eShuZXR3b3JrLmVycm9yRGVjb2RlKGEsIGMpKVxuICAgICAgICB9LGZhbHNlLHtcbiAgICAgICAgICAgIGRhdGFUeXBlOiAndGV4dCdcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRFbWJlZCh1cmwpe1xuICAgICAgICBuZXR3b3JrLmNsZWFyKClcbiAgICAgICAgbmV0d29yay50aW1lb3V0KDEwMDAwKVxuXG4gICAgICAgIG5ldHdvcmsubmF0aXZlKHVybCwoc3RyKT0+e1xuICAgICAgICAgICAgY29tcG9uZW50LmxvYWRpbmcoZmFsc2UpXG5cbiAgICAgICAgICAgIGV4dHJhY3REYXRhKHN0cilcblxuICAgICAgICAgICAgZmlsdGVyKClcblxuICAgICAgICAgICAgYXBwZW5kKClcbiAgICAgICAgfSwoYSxjKT0+e1xuICAgICAgICAgICAgY29tcG9uZW50LmVtcHR5KG5ldHdvcmsuZXJyb3JEZWNvZGUoYSwgYykpXG4gICAgICAgIH0sZmFsc2Use1xuICAgICAgICAgICAgZGF0YVR5cGU6ICd0ZXh0J1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCX0LDQv9GA0L7RgdC40YLRjCDRhNC40LvRjNC8XG4gICAgICogQHBhcmFtIHtJbnR9IGlkIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2b2ljZSBcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRGaWxtKGlkLCB2b2ljZSl7XG4gICAgICAgIG5ldHdvcmsuY2xlYXIoKVxuXG4gICAgICAgIG5ldHdvcmsudGltZW91dCgxMDAwMClcblxuICAgICAgICBsZXQgdXJsID0gZW1iZWRcblxuICAgICAgICBpZih2b2ljZSl7XG4gICAgICAgICAgICBpZihleHRyYWN0LnNlYXNvbi5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIGxldCBzZXMgPSBleHRyYWN0LnNlYXNvbltNYXRoLm1pbihleHRyYWN0LnNlYXNvbi5sZW5ndGgtMSxjaG9pY2Uuc2Vhc29uKV0uaWRcblxuICAgICAgICAgICAgICAgIHVybCArPSAnc2VyaWFsLycrdm9pY2UrJy9pZnJhbWU/cz0nK3NlcysnJmg9Z2lkb25saW5lLmlvJ1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldFNlYXNvbnModm9pY2UsICgpPT57XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGVjayA9IGV4dHJhY3Quc2Vhc29uLmZpbHRlcihzPT5zLmlkID09IHNlcylcblxuICAgICAgICAgICAgICAgICAgICBpZighY2hlY2subGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNob2ljZS5zZWFzb24gPSBleHRyYWN0LnNlYXNvbi5sZW5ndGggLSAxXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IGVtYmVkICsgJ3NlcmlhbC8nK3ZvaWNlKycvaWZyYW1lP3M9JytleHRyYWN0LnNlYXNvbltNYXRoLm1pbihleHRyYWN0LnNlYXNvbi5sZW5ndGgtMSxjaG9pY2Uuc2Vhc29uKV0uaWQrJyZoPWdpZG9ubGluZS5pbydcbiAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGdldEVtYmVkKHVybClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB1cmwgKz0gJ21vdmllLycrdm9pY2UrJy9pZnJhbWU/aD1naWRvbmxpbmUuaW8nXG5cbiAgICAgICAgICAgICAgICBnZXRFbWJlZCh1cmwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHVybCArPSAnZW1iZWQvJytpZFxuICAgICAgICAgICAgdXJsICs9ICc/cz0xJ1xuXG4gICAgICAgICAgICBnZXRFbWJlZCh1cmwpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9C+0YHRgtGA0L7QuNGC0Ywg0YTQuNC70YzRgtGAXG4gICAgICovXG4gICAgIGZ1bmN0aW9uIGZpbHRlcigpe1xuICAgICAgICBmaWx0ZXJfaXRlbXMgID0ge1xuICAgICAgICAgICAgc2Vhc29uOiBleHRyYWN0LnNlYXNvbi5tYXAodj0+di5uYW1lKSxcbiAgICAgICAgICAgIHZvaWNlOiBleHRyYWN0LnNlYXNvbi5sZW5ndGggPyBleHRyYWN0LnZvaWNlLm1hcCh2PT52Lm5hbWUpIDogW11cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNob2ljZS52b2ljZV9uYW1lKXtcbiAgICAgICAgICAgIGxldCBpbnggPSBmaWx0ZXJfaXRlbXMudm9pY2UuaW5kZXhPZihjaG9pY2Uudm9pY2VfbmFtZSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoaW54ID09IC0xKSBjaG9pY2Uudm9pY2UgPSAwXG4gICAgICAgICAgICBlbHNlIGlmKGlueCAhPT0gY2hvaWNlLnZvaWNlKXtcbiAgICAgICAgICAgICAgICBjaG9pY2Uudm9pY2UgPSBpbnhcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29tcG9uZW50LmZpbHRlcihmaWx0ZXJfaXRlbXMsIGNob2ljZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVN1YnRpdGxlcyhzdHIpe1xuICAgICAgICBsZXQgc3VidGl0bGUgPSBzdHIubWF0Y2goXCJzdWJ0aXRsZSc6ICcoLio/KSdcIilcblxuICAgICAgICBpZihzdWJ0aXRsZSl7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAtMVxuXG4gICAgICAgICAgICByZXR1cm4gc3VidGl0bGVbMV0uc3BsaXQoJywnKS5tYXAoKHNiKT0+e1xuICAgICAgICAgICAgICAgIGxldCBzcCA9IHNiLnNwbGl0KCddJylcblxuICAgICAgICAgICAgICAgIGluZGV4KytcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBzcFswXS5zbGljZSgxKSxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBzcC5wb3AoKSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0L7Qu9GD0YfQuNGC0Ywg0L/QvtGC0L7QulxuICAgICAqIEBwYXJhbSB7Kn0gZWxlbWVudCBcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRTdHJlYW0oZWxlbWVudCwgY2FsbCwgZXJyb3Ipe1xuICAgICAgICBpZihlbGVtZW50LnN0cmVhbSkgcmV0dXJuIGNhbGwoZWxlbWVudC5zdHJlYW0pXG5cbiAgICAgICAgbGV0IHVybCA9IGVtYmVkXG5cbiAgICAgICAgaWYoZWxlbWVudC5zZWFzb24pe1xuICAgICAgICAgICAgdXJsICs9ICdzZXJpYWwvJytleHRyYWN0LnZvaWNlW2Nob2ljZS52b2ljZV0udG9rZW4rJy9pZnJhbWU/cz0nK2VsZW1lbnQuc2Vhc29uKycmZT0nK2VsZW1lbnQuZXBpc29kZSsnJmg9Z2lkb25saW5lLmlvJ1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB1cmwgKz0gJ21vdmllLycrZWxlbWVudC52b2ljZS50b2tlbisnL2lmcmFtZT9oPWdpZG9ubGluZS5pbydcbiAgICAgICAgfVxuXG4gICAgICAgIG5ldHdvcmsuY2xlYXIoKVxuXG4gICAgICAgIG5ldHdvcmsudGltZW91dCgzMDAwKVxuXG4gICAgICAgIG5ldHdvcmsubmF0aXZlKHVybCwoc3RyKT0+e1xuICAgICAgICAgICAgdmFyIHZpZGVvcyA9IHN0ci5tYXRjaChcImZpbGUnOiAnKC4qPyknXCIpXG5cbiAgICAgICAgICAgIGlmKHZpZGVvcyl7XG4gICAgICAgICAgICAgICAgbGV0IHZpZGVvID0gZGVjb2RlKHZpZGVvc1sxXSksXG4gICAgICAgICAgICAgICAgICAgIHF1c2VkID0gJycsXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gJycsXG4gICAgICAgICAgICAgICAgICAgIG1hc3MgPSBbJzIxNjBwJywnMTQ0MHAnLCcxMDgwcCBVbHRyYScsJzEwODBwJywnNzIwcCcsJzQ4MHAnLCczNjBwJ11cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvL9GD0YXQvdGPINGC0YPRgiDQv9GA0L7QuNGB0YXQvtC00LjRgiwg0YXRgNC10L0g0LfQvdCw0LXRgiDQv9C+0YfQtdC80YMg0L/QvtGB0LvQtSAuam9pbigpINCy0L7Qt9Cy0YDQvtGI0LDQtdGCINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C10LTQvdC40Y4g0YHRgdGL0LvQutGDXG4gICAgICAgICAgICAgICAgdmlkZW8gPSB2aWRlby5zbGljZSgxKS5zcGxpdCgvLFxcWy8pLm1hcCgocyk9PntcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHMuc3BsaXQoJ10nKVswXSArICddJyArIChzLmluZGV4T2YoJyBvciAnKSA+IC0xID8gcy5zcGxpdCgnIG9yJykucG9wKCkudHJpbSgpIDogcy5zcGxpdCgnXScpLnBvcCgpKVxuICAgICAgICAgICAgICAgIH0pLmpvaW4oJ1snKVxuXG4gICAgICAgICAgICAgICAgZWxlbWVudC5xdWFsaXR5cyA9IHt9XG5cbiAgICAgICAgICAgICAgICBsZXQgcHJlZmVyYWJseSA9IExhbXBhLlN0b3JhZ2UuZ2V0KCd2aWRlb19xdWFsaXR5X2RlZmF1bHQnLCcxMDgwJylcblxuICAgICAgICAgICAgICAgIG1hc3MuZm9yRWFjaCgobik9PntcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmsgPSB2aWRlby5tYXRjaChuZXcgUmVnRXhwKG4gKyBcIl0oLio/KW1wNFwiKSlcblxuICAgICAgICAgICAgICAgICAgICBpZihsaW5rKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFmaXJzdCkgZmlyc3QgPSBsaW5rWzFdKydtcDQnXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucXVhbGl0eXNbbl0gPSBsaW5rWzFdKydtcDQnXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG4uaW5kZXhPZihwcmVmZXJhYmx5KSA+PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdXNlZCA9IGxpbmtbMV0rJ21wNCdcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gcXVzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgaWYoIWZpcnN0KSBlbGVtZW50LnF1YWxpdHlzID0gZmFsc2VcblxuICAgICAgICAgICAgICAgIGlmKGZpcnN0KXtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHJlYW0gPSBxdXNlZCB8fCBmaXJzdFxuXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3VidGl0bGVzID0gcGFyc2VTdWJ0aXRsZXMoc3RyKVxuXG4gICAgICAgICAgICAgICAgICAgIGNhbGwoZWxlbWVudC5zdHJlYW0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgZXJyb3IoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBlcnJvcigpXG5cbiAgICAgICAgfSxlcnJvcixmYWxzZSx7XG4gICAgICAgICAgICBkYXRhVHlwZTogJ3RleHQnXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVjb2RlKGRhdGEpIHtcbiAgICAgICAgZnVuY3Rpb24gcHJvZHVjdChpdGVyYWJsZXMsIHJlcGVhdCkge1xuICAgICAgICAgICAgdmFyIGFyZ3YgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLFxuICAgICAgICAgICAgICAgIGFyZ2MgPSBhcmd2Lmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChhcmdjID09PSAyICYmICFpc05hTihhcmd2W2FyZ2MgLSAxXSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29waWVzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd2W2FyZ2MgLSAxXTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvcGllcy5wdXNoKGFyZ3ZbMF0uc2xpY2UoKSk7IC8vIENsb25lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFyZ3YgPSBjb3BpZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXJndi5yZWR1Y2UoZnVuY3Rpb24gdGwoYWNjdW11bGF0b3IsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRtcCA9IFtdO1xuICAgICAgICAgICAgICAgIGFjY3VtdWxhdG9yLmZvckVhY2goZnVuY3Rpb24oYTApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbihhMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wLnB1c2goYTAuY29uY2F0KGExKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0bXA7XG4gICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgICAgW11cbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGZ1bmN0aW9uIHVuaXRlKGFycikge1xuICAgICAgICAgICAgdmFyIGZpbmFsID0gW107XG4gICAgICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZmluYWwucHVzaChlLmpvaW4oXCJcIikpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIGZpbmFsO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0cmFzaExpc3QgPSBbXCJAXCIsIFwiI1wiLCBcIiFcIiwgXCJeXCIsIFwiJFwiXTtcbiAgICAgICAgdmFyIHR3byA9IHVuaXRlKHByb2R1Y3QodHJhc2hMaXN0LCAyKSk7XG4gICAgICAgIHZhciB0cmVlID0gdW5pdGUocHJvZHVjdCh0cmFzaExpc3QsIDMpKTtcbiAgICAgICAgdmFyIHRyYXNoQ29kZXNTZXQgPSB0d28uY29uY2F0KHRyZWUpO1xuICAgIFxuICAgICAgICB2YXIgYXJyID0gZGF0YS5yZXBsYWNlKFwiI2hcIiwgXCJcIikuc3BsaXQoXCIvL18vL1wiKTtcbiAgICAgICAgdmFyIHRyYXNoU3RyaW5nID0gYXJyLmpvaW4oJycpO1xuICAgIFxuICAgICAgICB0cmFzaENvZGVzU2V0LmZvckVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICAgICAgdHJhc2hTdHJpbmcgPSB0cmFzaFN0cmluZy5yZXBsYWNlKG5ldyBSZWdFeHAoYnRvYShpKSwnZycpLCcnKVxuICAgICAgICB9KVxuXG4gICAgICAgIHZhciByZXN1bHQgPSAnJ1xuXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIHJlc3VsdCA9IGF0b2IodHJhc2hTdHJpbmcuc3Vic3RyKDIpKVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoKGUpe31cblxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuXG4gICAgLypcbiAgICBmdW5jdGlvbiBkZWNvZGUoeCl7XG4gICAgICAgIGxldCBmaWxlID0geC5yZXBsYWNlKCdKQ1FrSXlNakl5RWhJU0VoSVNFPScsICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UoJ1FDTWhRRUJBSXlNa0pFQkEnLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKCdRQ0ZlWGlGQUkwQkFKQ1FrSkNRPScsICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UoJ1hsNGpRRUFoSVVBaklTUT0nLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKCdYbDVlWGw1ZUl5TkF6TjJGa1ptUm0nLCAnJylcbiAgICAgICAgICAgIC5zcGxpdCgnLy9fLy8nKVxuICAgICAgICAgICAgLmpvaW4oJycpXG4gICAgICAgICAgICAuc3Vic3RyKDIpXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXRvYihmaWxlKVxuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRW5jcnlwdCBlcnJvcjogXCIsIGZpbGUpXG4gICAgICAgICAgICByZXR1cm4gJydcbiAgICAgICAgfVxuICAgIH1cbiAgICAqL1xuXG4gICAgLyoqXG4gICAgICog0J/QvtC70YPRh9C40YLRjCDQtNCw0L3QvdGL0LUg0L4g0YTQuNC70YzQvNC1XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciBcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBleHRyYWN0RGF0YShzdHIpe1xuICAgICAgICBleHRyYWN0LnZvaWNlICAgPSBbXVxuICAgICAgICBleHRyYWN0LnNlYXNvbiAgPSBbXVxuICAgICAgICBleHRyYWN0LmVwaXNvZGUgPSBbXVxuXG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9cXG4vZywnJylcblxuICAgICAgICBsZXQgdm9pY2VzID0gc3RyLm1hdGNoKCc8c2VsZWN0IG5hbWU9XCJ0cmFuc2xhdG9yXCJbXj5dKz4oLio/KTwvc2VsZWN0PicpXG4gICAgICAgIGxldCBzZXNvbnMgPSBzdHIubWF0Y2goJzxzZWxlY3QgbmFtZT1cInNlYXNvblwiW14+XSs+KC4qPyk8L3NlbGVjdD4nKVxuICAgICAgICBsZXQgZXBpc29kID0gc3RyLm1hdGNoKCc8c2VsZWN0IG5hbWU9XCJlcGlzb2RlXCJbXj5dKz4oLio/KTwvc2VsZWN0PicpXG5cbiAgICAgICAgaWYoc2Vzb25zKXtcbiAgICAgICAgICAgIGxldCBzZWxlY3QgPSAkKCc8c2VsZWN0Picrc2Vzb25zWzFdKyc8L3NlbGVjdD4nKVxuXG4gICAgICAgICAgICAkKCdvcHRpb24nLHNlbGVjdCkuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGV4dHJhY3Quc2Vhc29uLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogJCh0aGlzKS5hdHRyKCd2YWx1ZScpLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAkKHRoaXMpLnRleHQoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodm9pY2VzKXtcbiAgICAgICAgICAgIGxldCBzZWxlY3QgPSAkKCc8c2VsZWN0Picrdm9pY2VzWzFdKyc8L3NlbGVjdD4nKVxuXG4gICAgICAgICAgICAkKCdvcHRpb24nLHNlbGVjdCkuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGxldCB0b2tlbiA9ICQodGhpcykuYXR0cignZGF0YS10b2tlbicpXG5cbiAgICAgICAgICAgICAgICBpZih0b2tlbil7XG4gICAgICAgICAgICAgICAgICAgIGV4dHJhY3Qudm9pY2UucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAkKHRoaXMpLnRleHQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAkKHRoaXMpLnZhbCgpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGVwaXNvZCl7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ID0gJCgnPHNlbGVjdD4nK2VwaXNvZFsxXSsnPC9zZWxlY3Q+JylcblxuICAgICAgICAgICAgJCgnb3B0aW9uJyxzZWxlY3QpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBleHRyYWN0LmVwaXNvZGUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAkKHRoaXMpLmF0dHIoJ3ZhbHVlJyksXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICQodGhpcykudGV4dCgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9C+0LrQsNC30LDRgtGMINGE0LDQudC70YtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhcHBlbmQoKXtcbiAgICAgICAgY29tcG9uZW50LnJlc2V0KClcblxuICAgICAgICBsZXQgaXRlbXMgID0gW11cbiAgICAgICAgbGV0IHZpZXdlZCA9IExhbXBhLlN0b3JhZ2UuY2FjaGUoJ29ubGluZV92aWV3JywgNTAwMCwgW10pXG5cbiAgICAgICAgaWYoZXh0cmFjdC5zZWFzb24ubGVuZ3RoKXtcbiAgICAgICAgICAgIGV4dHJhY3QuZXBpc29kZS5mb3JFYWNoKGVwaXNvZGU9PntcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdTJyArIGV4dHJhY3Quc2Vhc29uW01hdGgubWluKGV4dHJhY3Quc2Vhc29uLmxlbmd0aC0xLGNob2ljZS5zZWFzb24pXS5pZCArICcgLyAnICsgZXBpc29kZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBxdWFsaXR5OiAnNzIwcCB+IDEwODBwJyxcbiAgICAgICAgICAgICAgICAgICAgc2Vhc29uOiBleHRyYWN0LnNlYXNvbltNYXRoLm1pbihleHRyYWN0LnNlYXNvbi5sZW5ndGgtMSxjaG9pY2Uuc2Vhc29uKV0uaWQsXG4gICAgICAgICAgICAgICAgICAgIGVwaXNvZGU6IHBhcnNlSW50KGVwaXNvZGUuaWQpLFxuICAgICAgICAgICAgICAgICAgICBpbmZvOiAnIC8gJyArIGV4dHJhY3Qudm9pY2VbY2hvaWNlLnZvaWNlXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICB2b2ljZTogZXh0cmFjdC52b2ljZVtjaG9pY2Uudm9pY2VdXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4dHJhY3Qudm9pY2UuZm9yRWFjaCh2b2ljZSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB2b2ljZS5uYW1lLmxlbmd0aCA+IDMgPyB2b2ljZS5uYW1lIDogc2VsZWN0X3RpdGxlLFxuICAgICAgICAgICAgICAgICAgICBxdWFsaXR5OiAnNzIwcCB+IDEwODBwJyxcbiAgICAgICAgICAgICAgICAgICAgdm9pY2U6IHZvaWNlLFxuICAgICAgICAgICAgICAgICAgICBpbmZvOiAnJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxhc3RfZXBpc29kZSA9IGNvbXBvbmVudC5nZXRMYXN0RXBpc29kZShpdGVtcylcblxuICAgICAgICBpdGVtcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgbGV0IGhhc2ggPSBMYW1wYS5VdGlscy5oYXNoKGVsZW1lbnQuc2Vhc29uID8gW2VsZW1lbnQuc2Vhc29uLGVsZW1lbnQuZXBpc29kZSxvYmplY3QubW92aWUub3JpZ2luYWxfdGl0bGVdLmpvaW4oJycpIDogb2JqZWN0Lm1vdmllLm9yaWdpbmFsX3RpdGxlKVxuICAgICAgICAgICAgbGV0IHZpZXcgPSBMYW1wYS5UaW1lbGluZS52aWV3KGhhc2gpXG4gICAgICAgICAgICBsZXQgaXRlbSA9IExhbXBhLlRlbXBsYXRlLmdldCgnb25saW5lJyxlbGVtZW50KVxuXG4gICAgICAgICAgICBsZXQgaGFzaF9maWxlID0gTGFtcGEuVXRpbHMuaGFzaChlbGVtZW50LnNlYXNvbiA/IFtlbGVtZW50LnNlYXNvbixlbGVtZW50LmVwaXNvZGUsb2JqZWN0Lm1vdmllLm9yaWdpbmFsX3RpdGxlLGVsZW1lbnQudm9pY2UubmFtZV0uam9pbignJykgOiBvYmplY3QubW92aWUub3JpZ2luYWxfdGl0bGUgKyBlbGVtZW50LnZvaWNlLm5hbWUpXG5cbiAgICAgICAgICAgIGVsZW1lbnQudGltZWxpbmUgPSB2aWV3XG5cbiAgICAgICAgICAgIGlmKGVsZW1lbnQuc2Vhc29uKXtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnRyYW5zbGF0ZV9lcGlzb2RlX2VuZCA9IGxhc3RfZXBpc29kZVxuICAgICAgICAgICAgICAgIGVsZW1lbnQudHJhbnNsYXRlX3ZvaWNlICAgICAgID0gZWxlbWVudC52b2ljZS5uYW1lXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0uYXBwZW5kKExhbXBhLlRpbWVsaW5lLnJlbmRlcih2aWV3KSlcblxuICAgICAgICAgICAgaWYoTGFtcGEuVGltZWxpbmUuZGV0YWlscyl7XG4gICAgICAgICAgICAgICAgaXRlbS5maW5kKCcub25saW5lX19xdWFsaXR5JykuYXBwZW5kKExhbXBhLlRpbWVsaW5lLmRldGFpbHModmlldywnIC8gJykpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHZpZXdlZC5pbmRleE9mKGhhc2hfZmlsZSkgIT09IC0xKSBpdGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cInRvcnJlbnQtaXRlbV9fdmlld2VkXCI+JytMYW1wYS5UZW1wbGF0ZS5nZXQoJ2ljb25fc3Rhcicse30sdHJ1ZSkrJzwvZGl2PicpXG5cbiAgICAgICAgICAgIGl0ZW0ub24oJ2hvdmVyOmVudGVyJywoKT0+e1xuICAgICAgICAgICAgICAgIGlmKG9iamVjdC5tb3ZpZS5pZCkgTGFtcGEuRmF2b3JpdGUuYWRkKCdoaXN0b3J5Jywgb2JqZWN0Lm1vdmllLCAxMDApXG5cbiAgICAgICAgICAgICAgICBnZXRTdHJlYW0oZWxlbWVudCwoc3RyZWFtKT0+e1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHN0cmVhbSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lOiB2aWV3LFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eTogZWxlbWVudC5xdWFsaXR5cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBlbGVtZW50LnRpdGxlXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBMYW1wYS5QbGF5ZXIucGxheShmaXJzdClcblxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50LnNlYXNvbiAmJiBMYW1wYS5QbGF0Zm9ybS52ZXJzaW9uKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwbGF5bGlzdCA9IFtdXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGwgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogKGNhbGwpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRTdHJlYW0oZWxlbSwoc3RyZWFtKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwudXJsID0gc3RyZWFtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5xdWFsaXR5ID0gZWxlbS5xdWFsaXR5c1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC51cmwgPSAnJ1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZTogZWxlbS50aW1lbGluZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGVsZW0udGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbSA9PSBlbGVtZW50KSBjZWxsLnVybCA9IHN0cmVhbVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWxpc3QucHVzaChjZWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuUGxheWVyLnBsYXlsaXN0KHBsYXlsaXN0KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5QbGF5ZXIucGxheWxpc3QoW2ZpcnN0XSlcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuc3VidGl0bGVzICYmIExhbXBhLlBsYXllci5zdWJ0aXRsZXMpIExhbXBhLlBsYXllci5zdWJ0aXRsZXMoZWxlbWVudC5zdWJ0aXRsZXMpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYodmlld2VkLmluZGV4T2YoaGFzaF9maWxlKSA9PSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3ZWQucHVzaChoYXNoX2ZpbGUpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYXBwZW5kKCc8ZGl2IGNsYXNzPVwidG9ycmVudC1pdGVtX192aWV3ZWRcIj4nK0xhbXBhLlRlbXBsYXRlLmdldCgnaWNvbl9zdGFyJyx7fSx0cnVlKSsnPC9kaXY+JylcblxuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoJ29ubGluZV92aWV3Jywgdmlld2VkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwoKT0+e1xuICAgICAgICAgICAgICAgICAgICBMYW1wYS5Ob3R5LnNob3coTGFtcGEuTGFuZy50cmFuc2xhdGUoJ29ubGluZV9ub2xpbmsnKSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgY29tcG9uZW50LmFwcGVuZChpdGVtKVxuXG4gICAgICAgICAgICBjb21wb25lbnQuY29udGV4dG1lbnUoe1xuICAgICAgICAgICAgICAgIGl0ZW0sXG4gICAgICAgICAgICAgICAgdmlldyxcbiAgICAgICAgICAgICAgICB2aWV3ZWQsXG4gICAgICAgICAgICAgICAgaGFzaF9maWxlLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgZmlsZTogKGNhbGwpPT57IGdldFN0cmVhbShlbGVtZW50LChzdHJlYW0pPT57Y2FsbCh7ZmlsZTpzdHJlYW0scXVhbGl0eTplbGVtZW50LnF1YWxpdHlzfSl9KX1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29tcG9uZW50LnN0YXJ0KHRydWUpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCByZXprYSIsImZ1bmN0aW9uIGtpbm9iYXNlKGNvbXBvbmVudCwgX29iamVjdCkge1xuICAgIGxldCBuZXR3b3JrID0gbmV3IExhbXBhLlJlZ3Vlc3QoKVxuICAgIGxldCBleHRyYWN0ID0ge31cbiAgICBsZXQgZW1iZWQgICA9IGNvbXBvbmVudC5wcm94eSgna2lub2Jhc2UnKSArICAnaHR0cHM6Ly9raW5vYmFzZS5vcmcvJ1xuICAgIGxldCBvYmplY3QgID0gX29iamVjdFxuXG4gICAgbGV0IHNlbGVjdF90aXRsZSA9ICcnXG4gICAgbGV0IHNlbGVjdF9pZCA9ICcnXG5cbiAgICBsZXQgZmlsdGVyX2l0ZW1zID0ge31cblxuICAgIGxldCBjaG9pY2UgPSB7XG4gICAgICAgIHNlYXNvbjogMCxcbiAgICAgICAgdm9pY2U6IC0xLFxuICAgICAgICBxdWFsaXR5OiAtMVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0L7QuNGB0LpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gX29iamVjdFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBraW5vcG9pc2tfaWRcbiAgICAgKi9cbiAgICB0aGlzLnNlYXJjaCA9IGZ1bmN0aW9uIChfb2JqZWN0LCBrcF9pZCwgc2ltKSB7XG4gICAgICAgIGlmKHRoaXMud2FpdF9zaW1pbGFycyAmJiBzaW0pIHJldHVybiBnZXRQYWdlKHNpbVswXS5saW5rKVxuXG4gICAgICAgIG9iamVjdCAgICAgPSBfb2JqZWN0XG5cbiAgICAgICAgc2VsZWN0X3RpdGxlID0gb2JqZWN0Lm1vdmllLnRpdGxlXG5cbiAgICAgICAgbGV0IHVybCA9IGVtYmVkICsgXCJzZWFyY2g/cXVlcnk9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoY2xlYW5UaXRsZShzZWxlY3RfdGl0bGUpKVxuXG4gICAgICAgIG5ldHdvcmsubmF0aXZlKHVybCwgKHN0cikgPT4ge1xuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL1xcbi8sJycpXG5cbiAgICAgICAgICAgIGxldCBsaW5rcyAgICAgPSBvYmplY3QubW92aWUubnVtYmVyX29mX3NlYXNvbnMgPyBzdHIubWF0Y2goLzxhIGhyZWY9XCJcXC9zZXJpYWxcXC8oLio/KVwiPiguKj8pPFxcL2E+L2cpIDogc3RyLm1hdGNoKC88YSBocmVmPVwiXFwvZmlsbVxcLyguKj8pXCIgY2xhc3M9XCJsaW5rXCJbXj5dKz4oLio/KTxcXC9hPi9nKVxuICAgICAgICAgICAgbGV0IHJlbGlzZSAgICA9IG9iamVjdC5zZWFyY2hfZGF0ZSB8fCAob2JqZWN0Lm1vdmllLm51bWJlcl9vZl9zZWFzb25zID8gb2JqZWN0Lm1vdmllLmZpcnN0X2Fpcl9kYXRlIDogb2JqZWN0Lm1vdmllLnJlbGVhc2VfZGF0ZSkgfHwgJzAwMDAnXG4gICAgICAgICAgICBsZXQgbmVlZF95ZWFyID0gcGFyc2VJbnQoKHJlbGlzZSArICcnKS5zbGljZSgwLDQpKVxuICAgICAgICAgICAgbGV0IGZvdW5kX3VybCA9ICcnXG5cbiAgICAgICAgICAgIGlmKGxpbmtzKXtcbiAgICAgICAgICAgICAgICBsZXQgY2FyZHMgPSBbXVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxpbmtzLmZpbHRlcihsPT57XG4gICAgICAgICAgICAgICAgICAgIGxldCBsaW5rID0gJChsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGwgPSBsaW5rLmF0dHIoJ3RpdGxlJykgfHwgbGluay50ZXh0KCkgfHwgJydcblxuICAgICAgICAgICAgICAgICAgICBsZXQgeWVhciA9IHBhcnNlSW50KHRpdGwuc3BsaXQoJygnKS5wb3AoKS5zbGljZSgwLC0xKSlcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoeWVhciA+IG5lZWRfeWVhciAtIDIgJiYgeWVhciA8IG5lZWRfeWVhciArIDIpIGNhcmRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgeWVhcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsLnNwbGl0KC9cXChcXGR7NH1cXCkvKVswXS50cmltKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiBsaW5rLmF0dHIoJ2hyZWYnKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBsZXQgY2FyZCA9IGNhcmRzLmZpbmQoYz0+Yy55ZWFyID09IG5lZWRfeWVhcilcblxuICAgICAgICAgICAgICAgIGlmKCFjYXJkKSBjYXJkID0gY2FyZHMuZmluZChjPT5jLnRpdGxlID09IHNlbGVjdF90aXRsZSlcblxuICAgICAgICAgICAgICAgIGlmKCFjYXJkICYmIGNhcmRzLmxlbmd0aCA9PSAxKSBjYXJkID0gY2FyZHNbMF1cblxuICAgICAgICAgICAgICAgIGlmKGNhcmQpIGZvdW5kX3VybCA9IGNhcmRzWzBdLmxpbmtcblxuICAgICAgICAgICAgICAgIGlmKGZvdW5kX3VybCkgZ2V0UGFnZShmb3VuZF91cmwpXG4gICAgICAgICAgICAgICAgZWxzZSBpZihsaW5rcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0X3NpbWlsYXJzID0gdHJ1ZVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzaW1pbGFycyA9IFtdXG5cbiAgICAgICAgICAgICAgICAgICAgbGlua3MuZm9yRWFjaChsPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGluayA9ICQobCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bCA9IGxpbmsuYXR0cigndGl0bGUnKSB8fCBsaW5rLnRleHQoKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzaW1pbGFycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGl0bCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiBsaW5rLmF0dHIoJ2hyZWYnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxtSWQ6ICdzaW1pbGFycydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LnNpbWlsYXJzKHNpbWlsYXJzKVxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQubG9hZGluZyhmYWxzZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBjb21wb25lbnQuZW1wdHlGb3JRdWVyeShzZWxlY3RfdGl0bGUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGNvbXBvbmVudC5lbXB0eUZvclF1ZXJ5KHNlbGVjdF90aXRsZSlcbiAgICAgICAgfSwgKGEsYyk9PntcbiAgICAgICAgICAgIGNvbXBvbmVudC5lbXB0eShuZXR3b3JrLmVycm9yRGVjb2RlKGEsIGMpKVxuICAgICAgICB9LCBmYWxzZSx7XG4gICAgICAgICAgICBkYXRhVHlwZTogJ3RleHQnXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5leHRlbmRDaG9pY2UgPSBmdW5jdGlvbihzYXZlZCl7XG4gICAgICAgIExhbXBhLkFycmF5cy5leHRlbmQoY2hvaWNlLCBzYXZlZCwgdHJ1ZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQodCx0YDQvtGBINGE0LjQu9GM0YLRgNCwXG4gICAgICovXG4gICAgdGhpcy5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29tcG9uZW50LnJlc2V0KClcblxuICAgICAgICBjaG9pY2UgPSB7XG4gICAgICAgICAgICBzZWFzb246IDAsXG4gICAgICAgICAgICB2b2ljZTogLTFcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGVuZChmaWx0cmVkKCkpXG5cbiAgICAgICAgY29tcG9uZW50LnNhdmVDaG9pY2UoY2hvaWNlKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0YDQuNC80LXQvdC40YLRjCDRhNC40LvRjNGC0YBcbiAgICAgKiBAcGFyYW0geyp9IHR5cGVcbiAgICAgKiBAcGFyYW0geyp9IGFcbiAgICAgKiBAcGFyYW0geyp9IGJcbiAgICAgKi9cbiAgICB0aGlzLmZpbHRlciA9IGZ1bmN0aW9uICh0eXBlLCBhLCBiKSB7XG4gICAgICAgIGNob2ljZVthLnN0eXBlXSA9IGIuaW5kZXhcblxuICAgICAgICBjb21wb25lbnQucmVzZXQoKVxuXG4gICAgICAgIGZpbHRlcigpXG5cbiAgICAgICAgYXBwZW5kKGZpbHRyZWQoKSlcblxuICAgICAgICBjb21wb25lbnQuc2F2ZUNob2ljZShjaG9pY2UpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KPQvdC40YfRgtC+0LbQuNGC0YxcbiAgICAgKi9cbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG5ldHdvcmsuY2xlYXIoKVxuXG4gICAgICAgIGV4dHJhY3QgPSBudWxsXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW5UaXRsZShzdHIpe1xuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoJy4nLCAnJykucmVwbGFjZSgnOicsICcnKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRlcigpe1xuICAgICAgICBmaWx0ZXJfaXRlbXMgPSB7XG4gICAgICAgICAgICBzZWFzb246IFtdLFxuICAgICAgICAgICAgdm9pY2U6IFtdLFxuICAgICAgICAgICAgcXVhbGl0eTogW11cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG9iamVjdC5tb3ZpZS5udW1iZXJfb2Zfc2Vhc29ucyl7XG4gICAgICAgICAgICBpZihleHRyYWN0WzBdLnBsYXlsaXN0KXtcbiAgICAgICAgICAgICAgICBleHRyYWN0LmZvckVhY2goKGl0ZW0pPT57XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcl9pdGVtcy5zZWFzb24ucHVzaChpdGVtLmNvbW1lbnQpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuXG4gICAgICAgIH1cblxuICAgICAgICBjb21wb25lbnQuZmlsdGVyKGZpbHRlcl9pdGVtcywgY2hvaWNlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRyZWQoKXtcbiAgICAgICAgbGV0IGZpbHRyZWQgPSBbXVxuXG4gICAgICAgIGlmKG9iamVjdC5tb3ZpZS5udW1iZXJfb2Zfc2Vhc29ucyl7XG4gICAgICAgICAgICBsZXQgcGxheWxpc3QgPSBleHRyYWN0W2Nob2ljZS5zZWFzb25dLnBsYXlsaXN0IHx8IGV4dHJhY3RcblxuICAgICAgICAgICAgbGV0IHNlYXNvbiA9IHBhcnNlSW50KGV4dHJhY3RbY2hvaWNlLnNlYXNvbl0uY29tbWVudClcblxuICAgICAgICAgICAgcGxheWxpc3QuZm9yRWFjaCgoc2VyaWFsKT0+e1xuICAgICAgICAgICAgICAgIGxldCBxdWFsaXR5ID0gc2VyaWFsLmZpbGUubWF0Y2goL1xcWyhcXGQrKXBcXF0vZykucG9wKCkucmVwbGFjZSgvXFxbfFxcXS9nLCcnKVxuICAgICAgICAgICAgICAgIGxldCB2b2ljZSAgID0gc2VyaWFsLmZpbGUubWF0Y2goXCJ7KFtefV0rKX1cIilcblxuICAgICAgICAgICAgICAgIGZpbHRyZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IHNlcmlhbC5maWxlLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogc2VyaWFsLmNvbW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6IHF1YWxpdHksXG4gICAgICAgICAgICAgICAgICAgIHNlYXNvbjogaXNOYU4oc2Vhc29uKSA/IDEgOiBzZWFzb24sXG4gICAgICAgICAgICAgICAgICAgIGluZm86IHZvaWNlID8gJyAvICcgKyB2b2ljZVsxXSA6ICcnLFxuICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZXM6IHBhcnNlU3VicyhzZXJpYWwuc3VidGl0bGUgfHwgJycpLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleHRyYWN0LmZvckVhY2goKGVsZW0pPT57XG4gICAgICAgICAgICAgICAgbGV0IHF1YWxpdHkgPSBlbGVtLmZpbGUubWF0Y2goL1xcWyhcXGQrKXBcXF0vZykucG9wKCkucmVwbGFjZSgvXFxbfFxcXS9nLCcnKVxuICAgICAgICAgICAgICAgIGxldCB2b2ljZSAgID0gZWxlbS5maWxlLm1hdGNoKFwieyhbXn1dKyl9XCIpXG5cbiAgICAgICAgICAgICAgICBpZighZWxlbS50aXRsZSkgICBlbGVtLnRpdGxlICAgPSBlbGVtLmNvbW1lbnQgfHwgKHZvaWNlID8gdm9pY2VbMV0gOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnbm9uYW1lJykpXG4gICAgICAgICAgICAgICAgaWYoIWVsZW0ucXVhbGl0eSkgZWxlbS5xdWFsaXR5ID0gcXVhbGl0eVxuICAgICAgICAgICAgICAgIGlmKCFlbGVtLmluZm8pICAgIGVsZW0uaW5mbyAgICA9ICcnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmaWx0cmVkID0gZXh0cmFjdFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpbHRyZWRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVN1YnModm9kKXtcbiAgICAgICAgbGV0IHN1YnRpdGxlcyA9IFtdXG5cbiAgICAgICAgdm9kLnNwbGl0KCcsJykuZm9yRWFjaCgocyk9PntcbiAgICAgICAgICAgIGxldCBuYW0gPSBzLm1hdGNoKFwiXFxcXFsoLio/KV1cIilcblxuICAgICAgICAgICAgaWYobmFtKXtcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gcy5yZXBsYWNlKC9cXFsuKj9cXF0vLCcnKS5zcGxpdCgnIG9yICcpWzBdXG5cbiAgICAgICAgICAgICAgICBpZih1cmwpe1xuICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogbmFtWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHN1YnRpdGxlcy5sZW5ndGggPyBzdWJ0aXRsZXMgOiBmYWxzZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0L7Qu9GD0YfQuNGC0Ywg0LTQsNC90L3Ri9C1INC+INGE0LjQu9GM0LzQtVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBleHRyYWN0RGF0YShzdHIsIHBhZ2Upe1xuICAgICAgICBsZXQgdm9kID0gc3RyLnNwbGl0KCd8JylcblxuICAgICAgICBpZih2b2RbMF0gPT0gJ2ZpbGUnKXtcbiAgICAgICAgICAgIGxldCBmaWxlICA9IHN0ci5tYXRjaChcImZpbGVcXFxcfChbXlxcXFx8XSspXFxcXHxcIilcbiAgICAgICAgICAgIGxldCBmb3VuZCA9IFtdXG4gICAgICAgICAgICBsZXQgc3VidGlsZXMgPSBwYXJzZVN1YnModm9kWzJdKVxuICAgICAgICAgICAgbGV0IHF1YWxpdHlfdHlwZSA9IHBhZ2UucmVwbGFjZSgvXFxuL2csJycpLnJlcGxhY2UoLyAvZywnJykubWF0Y2goLzxsaT48Yj7QmtCw0YfQtdGB0YLQstC+OjxcXC9iPihcXHcrKTxcXC9saT4vaSlcblxuICAgICAgICAgICAgaWYoZmlsZSl7XG4gICAgICAgICAgICAgICAgc3RyID0gZmlsZVsxXS5yZXBsYWNlKC9cXG4vZywnJylcblxuICAgICAgICAgICAgICAgIHN0ci5zcGxpdCgnLCcpLmZvckVhY2goKGVsKT0+e1xuICAgICAgICAgICAgICAgICAgICBsZXQgcXVhbGl0eSA9IGVsLm1hdGNoKFwiXFxcXFsoXFxcXGQrKXBcIilcblxuICAgICAgICAgICAgICAgICAgICBlbC5zcGxpdCgnOycpLmZvckVhY2goKGVsMik9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2b2ljZSA9IGVsMi5tYXRjaChcInsoW159XSspfVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmtzID0gdm9pY2UgPyBlbDIubWF0Y2goXCJ9KFteO10rKVwiKSA6IGVsMi5tYXRjaChcIlxcXFxdKFteO10rKVwiKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiBmaWxlWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBvYmplY3QubW92aWUudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eTogcXVhbGl0eVsxXSArICdwJyArIChxdWFsaXR5X3R5cGUgPyAnIC0gJyArIHF1YWxpdHlfdHlwZVsxXSA6ICcnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2ljZTogdm9pY2UgPyB2b2ljZVsxXSA6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbTogbGlua3NbMV0uc3BsaXQoJyBvciAnKVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZXM6IHN1YnRpbGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm86ICcgJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGZvdW5kLnJldmVyc2UoKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBleHRyYWN0ID0gZm91bmRcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHZvZFswXSA9PSAncGwnKSBleHRyYWN0ID0gTGFtcGEuQXJyYXlzLmRlY29kZUpzb24odm9kWzFdLFtdKVxuICAgICAgICBlbHNlIGNvbXBvbmVudC5lbXB0eUZvclF1ZXJ5KHNlbGVjdF90aXRsZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQYWdlKHVybCl7XG4gICAgICAgIG5ldHdvcmsuY2xlYXIoKVxuXG4gICAgICAgIG5ldHdvcmsudGltZW91dCgxMDAwICogMTApXG4gICAgICAgIFxuICAgICAgICBuZXR3b3JrLm5hdGl2ZShlbWJlZCt1cmwsIChzdHIpPT57XG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFxuL2csICcnKVxuXG4gICAgICAgICAgICBsZXQgTU9WSUVfSUQgPSBzdHIubWF0Y2goJ3ZhciBNT1ZJRV9JRCA9IChbXjtdKyk7JylcbiAgICAgICAgICAgIGxldCBJREVOVElGSUVSID0gc3RyLm1hdGNoKCd2YXIgSURFTlRJRklFUiA9IFwiKFteXCJdKylcIicpXG4gICAgICAgICAgICBsZXQgUExBWUVSX0NVSUQgPSBzdHIubWF0Y2goJ3ZhciBQTEFZRVJfQ1VJRCA9IFwiKFteXCJdKylcIicpXG5cbiAgICAgICAgICAgIGlmIChNT1ZJRV9JRCAmJiBJREVOVElGSUVSICYmIFBMQVlFUl9DVUlEKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0X2lkID0gTU9WSUVfSURbMV1cblxuICAgICAgICAgICAgICAgIGxldCBpZGVudGlmaWVyICA9IElERU5USUZJRVJbMV1cbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyX2N1aWQgPSBQTEFZRVJfQ1VJRFsxXVxuXG5cbiAgICAgICAgICAgICAgICBsZXQgZGF0YV91cmwgPSBcInVzZXJfZGF0YVwiXG4gICAgICAgICAgICAgICAgICAgIGRhdGFfdXJsID0gTGFtcGEuVXRpbHMuYWRkVXJsQ29tcG9uZW50KGRhdGFfdXJsLCBcInBhZ2U9bW92aWVcIilcbiAgICAgICAgICAgICAgICAgICAgZGF0YV91cmwgPSBMYW1wYS5VdGlscy5hZGRVcmxDb21wb25lbnQoZGF0YV91cmwsIFwibW92aWVfaWQ9XCIgKyBzZWxlY3RfaWQpXG4gICAgICAgICAgICAgICAgICAgIGRhdGFfdXJsID0gTGFtcGEuVXRpbHMuYWRkVXJsQ29tcG9uZW50KGRhdGFfdXJsLCBcImN1aWQ9XCIgKyBwbGF5ZXJfY3VpZClcbiAgICAgICAgICAgICAgICAgICAgZGF0YV91cmwgPSBMYW1wYS5VdGlscy5hZGRVcmxDb21wb25lbnQoZGF0YV91cmwsIFwiZGV2aWNlPURFU0tUT1BcIilcbiAgICAgICAgICAgICAgICAgICAgZGF0YV91cmwgPSBMYW1wYS5VdGlscy5hZGRVcmxDb21wb25lbnQoZGF0YV91cmwsIFwiXz1cIitEYXRlLm5vdygpKVxuXG4gICAgICAgICAgICAgICAgbmV0d29yay5jbGVhcigpXG5cbiAgICAgICAgICAgICAgICBuZXR3b3JrLnRpbWVvdXQoMTAwMCAqIDEwKVxuXG4gICAgICAgICAgICAgICAgbmV0d29yay5uYXRpdmUoZW1iZWQgKyBkYXRhX3VybCwgKHVzZXJfZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHVzZXJfZGF0YS52b2RfaGFzaCA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZV91cmwgPSBcInZvZC9cIiArIHNlbGVjdF9pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfdXJsID0gTGFtcGEuVXRpbHMuYWRkVXJsQ29tcG9uZW50KGZpbGVfdXJsLCBcImlkZW50aWZpZXI9XCIgKyBpZGVudGlmaWVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfdXJsID0gTGFtcGEuVXRpbHMuYWRkVXJsQ29tcG9uZW50KGZpbGVfdXJsLCBcInBsYXllcl90eXBlPW5ld1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfdXJsID0gTGFtcGEuVXRpbHMuYWRkVXJsQ29tcG9uZW50KGZpbGVfdXJsLCBcImZpbGVfdHlwZT1tcDRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlX3VybCA9IExhbXBhLlV0aWxzLmFkZFVybENvbXBvbmVudChmaWxlX3VybCwgXCJzdD1cIiArIHVzZXJfZGF0YS52b2RfaGFzaClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlX3VybCA9IExhbXBhLlV0aWxzLmFkZFVybENvbXBvbmVudChmaWxlX3VybCwgXCJlPVwiICsgdXNlcl9kYXRhLnZvZF90aW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfdXJsID0gTGFtcGEuVXRpbHMuYWRkVXJsQ29tcG9uZW50KGZpbGVfdXJsLCBcIl89XCIrRGF0ZS5ub3coKSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29yay5jbGVhcigpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmsudGltZW91dCgxMDAwICogMTApXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmsubmF0aXZlKGVtYmVkICsgZmlsZV91cmwsIChmaWxlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5sb2FkaW5nKGZhbHNlKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmFjdERhdGEoZmlsZXMsIHN0cilcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcigpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmQoZmlsdHJlZCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGEsIGMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuZW1wdHkobmV0d29yay5lcnJvckRlY29kZShhLCBjKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZhbHNlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGNvbXBvbmVudC5lbXB0eShMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndG9ycmVudF9wYXJzZXJfbm9faGFzaCcpKVxuXG4gICAgICAgICAgICAgICAgfSwgKGEsYykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuZW1wdHkobmV0d29yay5lcnJvckRlY29kZShhLCBjKSlcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGNvbXBvbmVudC5lbXB0eUZvclF1ZXJ5KHNlbGVjdF90aXRsZSlcbiAgICAgICAgfSwoYSxjKT0+e1xuICAgICAgICAgICAgY29tcG9uZW50LmVtcHR5KG5ldHdvcmsuZXJyb3JEZWNvZGUoYSwgYykpXG4gICAgICAgIH0sIGZhbHNlLCB7XG4gICAgICAgICAgICBkYXRhVHlwZTogJ3RleHQnXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RmlsZShlbGVtZW50KXtcbiAgICAgICAgbGV0IHF1YWxpdHkgPSB7fSxcbiAgICAgICAgICAgIGZpcnN0ICAgPSAnJ1xuXG4gICAgICAgIGxldCBwcmVmZXJhYmx5ID0gTGFtcGEuU3RvcmFnZS5nZXQoJ3ZpZGVvX3F1YWxpdHlfZGVmYXVsdCcsJzEwODAnKVxuXG4gICAgICAgIGVsZW1lbnQuZmlsZS5zcGxpdCgnLCcpLnJldmVyc2UoKS5mb3JFYWNoKGZpbGU9PntcbiAgICAgICAgICAgIGxldCBxID0gZmlsZS5tYXRjaChcIlxcXFxbKFxcXFxkKylwXCIpXG5cbiAgICAgICAgICAgIGlmKHEpe1xuICAgICAgICAgICAgICAgIHF1YWxpdHlbcVsxXSsncCddID0gZmlsZS5yZXBsYWNlKC9cXFtcXGQrcFxcXS8sJycpLnJlcGxhY2UoL3soW159XSspfS8sJycpLnNwbGl0KCcgb3IgJylbMF1cblxuICAgICAgICAgICAgICAgIGlmKCFmaXJzdCB8fCBxWzFdID09IHByZWZlcmFibHkpIGZpcnN0ID0gcXVhbGl0eVtxWzFdKydwJ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBlbGVtZW50LnN0cmVhbSAgICA9IGZpcnN0XG4gICAgICAgIGVsZW1lbnQucXVhbGl0eXMgID0gcXVhbGl0eVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmaWxlOiBmaXJzdCxcbiAgICAgICAgICAgIHF1YWxpdHk6IHF1YWxpdHlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0L7QutCw0LfQsNGC0Ywg0YTQsNC50LvRi1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFwcGVuZChpdGVtcykge1xuICAgICAgICBjb21wb25lbnQucmVzZXQoKVxuXG4gICAgICAgIGxldCB2aWV3ZWQgPSBMYW1wYS5TdG9yYWdlLmNhY2hlKCdvbmxpbmVfdmlldycsIDUwMDAsIFtdKVxuXG4gICAgICAgIGl0ZW1zLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZihlbGVtZW50LnNlYXNvbikgZWxlbWVudC50aXRsZSA9ICdTJytlbGVtZW50LnNlYXNvbiArICcgLyAnICsgZWxlbWVudC50aXRsZVxuICAgICAgICAgICAgaWYoZWxlbWVudC52b2ljZSkgIGVsZW1lbnQudGl0bGUgPSBlbGVtZW50LnZvaWNlXG5cbiAgICAgICAgICAgIGlmKHR5cGVvZiBlbGVtZW50LmVwaXNvZGUgPT0gJ3VuZGVmaW5lZCcpIGVsZW1lbnQuZXBpc29kZSA9IGluZGV4ICsgMVxuXG4gICAgICAgICAgICBsZXQgaGFzaCA9IExhbXBhLlV0aWxzLmhhc2goZWxlbWVudC5zZWFzb24gPyBbZWxlbWVudC5zZWFzb24sIGVsZW1lbnQuZXBpc29kZSwgb2JqZWN0Lm1vdmllLm9yaWdpbmFsX3RpdGxlXS5qb2luKCcnKSA6IG9iamVjdC5tb3ZpZS5vcmlnaW5hbF90aXRsZSlcbiAgICAgICAgICAgIGxldCB2aWV3ID0gTGFtcGEuVGltZWxpbmUudmlldyhoYXNoKVxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBMYW1wYS5UZW1wbGF0ZS5nZXQoJ29ubGluZScsIGVsZW1lbnQpXG5cbiAgICAgICAgICAgIGxldCBoYXNoX2ZpbGUgPSBMYW1wYS5VdGlscy5oYXNoKGVsZW1lbnQuc2Vhc29uID8gW2VsZW1lbnQuc2Vhc29uLGVsZW1lbnQuZXBpc29kZSxvYmplY3QubW92aWUub3JpZ2luYWxfdGl0bGUsZWxlbWVudC50aXRsZSwna2lub2Jhc2UnXS5qb2luKCcnKSA6IG9iamVjdC5tb3ZpZS5vcmlnaW5hbF90aXRsZSArIGVsZW1lbnQucXVhbGl0eSArICdraW5vYmFzZScpXG5cbiAgICAgICAgICAgIGVsZW1lbnQudGltZWxpbmUgPSB2aWV3XG5cbiAgICAgICAgICAgIGl0ZW0uYXBwZW5kKExhbXBhLlRpbWVsaW5lLnJlbmRlcih2aWV3KSlcblxuICAgICAgICAgICAgaWYoTGFtcGEuVGltZWxpbmUuZGV0YWlscyl7XG4gICAgICAgICAgICAgICAgaXRlbS5maW5kKCcub25saW5lX19xdWFsaXR5JykuYXBwZW5kKExhbXBhLlRpbWVsaW5lLmRldGFpbHModmlldywnIC8gJykpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHZpZXdlZC5pbmRleE9mKGhhc2hfZmlsZSkgIT09IC0xKSBpdGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cInRvcnJlbnQtaXRlbV9fdmlld2VkXCI+JytMYW1wYS5UZW1wbGF0ZS5nZXQoJ2ljb25fc3Rhcicse30sdHJ1ZSkrJzwvZGl2PicpXG5cbiAgICAgICAgICAgIGl0ZW0ub24oJ2hvdmVyOmVudGVyJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvYmplY3QubW92aWUuaWQpIExhbXBhLkZhdm9yaXRlLmFkZCgnaGlzdG9yeScsIG9iamVjdC5tb3ZpZSwgMTAwKVxuXG4gICAgICAgICAgICAgICAgZ2V0RmlsZShlbGVtZW50KVxuXG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudC5zdHJlYW0pe1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGxheWxpc3QgPSBbXVxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGVsZW1lbnQuc3RyZWFtLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmU6IHZpZXcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZWxlbWVudC5zZWFzb24gPyBlbGVtZW50LnRpdGxlIDogKGVsZW1lbnQudm9pY2UgPyBvYmplY3QubW92aWUudGl0bGUgKyAnIC8gJyArIGVsZW1lbnQudGl0bGUgOiBlbGVtZW50LnRpdGxlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlczogZWxlbWVudC5zdWJ0aXRsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5OiBlbGVtZW50LnF1YWxpdHlzXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50LnNlYXNvbil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5mb3JFYWNoKGVsZW09PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRGaWxlKGVsZW0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGVsZW0udGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogZWxlbS5zdHJlYW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lOiBlbGVtLnRpbWVsaW5lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZXM6IGVsZW0uc3VidGl0bGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5OiBlbGVtLnF1YWxpdHlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0LnB1c2goZmlyc3QpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihwbGF5bGlzdC5sZW5ndGggPiAxKSBmaXJzdC5wbGF5bGlzdCA9IHBsYXlsaXN0XG5cbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuUGxheWVyLnBsYXkoZmlyc3QpXG5cbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuUGxheWVyLnBsYXlsaXN0KHBsYXlsaXN0KVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHZpZXdlZC5pbmRleE9mKGhhc2hfZmlsZSkgPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlld2VkLnB1c2goaGFzaF9maWxlKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cInRvcnJlbnQtaXRlbV9fdmlld2VkXCI+JytMYW1wYS5UZW1wbGF0ZS5nZXQoJ2ljb25fc3Rhcicse30sdHJ1ZSkrJzwvZGl2PicpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdvbmxpbmVfdmlldycsIHZpZXdlZClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIExhbXBhLk5vdHkuc2hvdyhMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnb25saW5lX25vbGluaycpKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgY29tcG9uZW50LmFwcGVuZChpdGVtKVxuXG4gICAgICAgICAgICBjb21wb25lbnQuY29udGV4dG1lbnUoe1xuICAgICAgICAgICAgICAgIGl0ZW0sXG4gICAgICAgICAgICAgICAgdmlldyxcbiAgICAgICAgICAgICAgICB2aWV3ZWQsXG4gICAgICAgICAgICAgICAgaGFzaF9maWxlLFxuICAgICAgICAgICAgICAgIGZpbGU6IChjYWxsKT0+e2NhbGwoZ2V0RmlsZShlbGVtZW50KSl9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbXBvbmVudC5zdGFydCh0cnVlKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQga2lub2Jhc2UiLCJmdW5jdGlvbiBjb2xsYXBzKGNvbXBvbmVudCwgX29iamVjdCl7XG4gICAgbGV0IG5ldHdvcmsgICAgPSBuZXcgTGFtcGEuUmVndWVzdCgpXG4gICAgbGV0IGV4dHJhY3QgICAgPSB7fVxuICAgIGxldCBlbWJlZCAgICAgID0gY29tcG9uZW50LnByb3h5KCdjb2xsYXBzJykgKyAgJ2h0dHBzOi8vYXBpLmRlbGl2ZW1iZC53cy9lbWJlZC8nXG4gICAgbGV0IG9iamVjdCAgICAgPSBfb2JqZWN0XG5cbiAgICBsZXQgc2VsZWN0X3RpdGxlID0gJydcbiAgICBsZXQgc2VsZWN0X2lkICAgID0gJydcbiAgICBsZXQgZmlsdGVyX2l0ZW1zID0ge31cblxuICAgIGxldCBjaG9pY2UgPSB7XG4gICAgICAgIHNlYXNvbjogMCxcbiAgICAgICAgdm9pY2U6IDBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9C+0LjRgdC6XG4gICAgICogQHBhcmFtIHtPYmplY3R9IF9vYmplY3QgXG4gICAgICovXG4gICAgdGhpcy5zZWFyY2ggPSBmdW5jdGlvbihfb2JqZWN0LCBraW5vcG9pc2tfaWQpe1xuICAgICAgICBvYmplY3QgPSBfb2JqZWN0XG5cbiAgICAgICAgc2VsZWN0X2lkICAgID0ga2lub3BvaXNrX2lkXG4gICAgICAgIHNlbGVjdF90aXRsZSA9IG9iamVjdC5tb3ZpZS50aXRsZVxuXG4gICAgICAgIGxldCB1cmwgPSBlbWJlZCArICdrcC8nICsga2lub3BvaXNrX2lkXG5cbiAgICAgICAgbmV0d29yay5zaWxlbnQodXJsLCAoc3RyKSA9PiB7XG4gICAgICAgICAgICBpZihzdHIpe1xuICAgICAgICAgICAgICAgIHBhcnNlKHN0cilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgY29tcG9uZW50LmVtcHR5Rm9yUXVlcnkoc2VsZWN0X3RpdGxlKVxuXG4gICAgICAgICAgICBjb21wb25lbnQubG9hZGluZyhmYWxzZSlcbiAgICAgICAgfSwgKGEsYyk9PntcbiAgICAgICAgICAgIGNvbXBvbmVudC5lbXB0eShuZXR3b3JrLmVycm9yRGVjb2RlKGEsIGMpKVxuICAgICAgICB9LCBmYWxzZSx7XG4gICAgICAgICAgICBkYXRhVHlwZTogJ3RleHQnXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5leHRlbmRDaG9pY2UgPSBmdW5jdGlvbihzYXZlZCl7XG4gICAgICAgIExhbXBhLkFycmF5cy5leHRlbmQoY2hvaWNlLCBzYXZlZCwgdHJ1ZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQodCx0YDQvtGBINGE0LjQu9GM0YLRgNCwXG4gICAgICovXG4gICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbigpe1xuICAgICAgICBjb21wb25lbnQucmVzZXQoKVxuXG4gICAgICAgIGNob2ljZSA9IHtcbiAgICAgICAgICAgIHNlYXNvbjogMCxcbiAgICAgICAgICAgIHZvaWNlOiAwXG4gICAgICAgIH1cblxuICAgICAgICBmaWx0ZXIoKVxuXG4gICAgICAgIGFwcGVuZChmaWx0cmVkKCkpXG5cbiAgICAgICAgY29tcG9uZW50LnNhdmVDaG9pY2UoY2hvaWNlKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0YDQuNC80LXQvdC40YLRjCDRhNC40LvRjNGC0YBcbiAgICAgKiBAcGFyYW0geyp9IHR5cGUgXG4gICAgICogQHBhcmFtIHsqfSBhIFxuICAgICAqIEBwYXJhbSB7Kn0gYiBcbiAgICAgKi9cbiAgICAgdGhpcy5maWx0ZXIgPSBmdW5jdGlvbih0eXBlLCBhLCBiKXtcbiAgICAgICAgY2hvaWNlW2Euc3R5cGVdID0gYi5pbmRleFxuXG4gICAgICAgIGNvbXBvbmVudC5yZXNldCgpXG5cbiAgICAgICAgZmlsdGVyKClcblxuICAgICAgICBhcHBlbmQoZmlsdHJlZCgpKVxuXG4gICAgICAgIGNvbXBvbmVudC5zYXZlQ2hvaWNlKGNob2ljZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQo9C90LjRh9GC0L7QttC40YLRjFxuICAgICAqL1xuICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIG5ldHdvcmsuY2xlYXIoKVxuXG4gICAgICAgIGV4dHJhY3QgPSBudWxsXG4gICAgfVxuXG4gICAgXG5cbiAgICBmdW5jdGlvbiBwYXJzZShzdHIpe1xuICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFxuL2csJycpXG5cbiAgICAgICAgbGV0IGZpbmQgPSBzdHIubWF0Y2goJ21ha2VQbGF5ZXJcXFxcKHsoLio/KX1cXFxcKTsnKVxuXG4gICAgICAgIGlmKGZpbmQpe1xuICAgICAgICAgICAgbGV0IGpzb25cblxuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgIGpzb24gPSBldmFsKCcoeycrZmluZFsxXSsnfSknKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2goZSl7fVxuXG4gICAgICAgICAgICBpZihqc29uKXtcbiAgICAgICAgICAgICAgICBleHRyYWN0ID0ganNvblxuXG4gICAgICAgICAgICAgICAgZmlsdGVyKClcblxuICAgICAgICAgICAgICAgIGFwcGVuZChmaWx0cmVkKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGNvbXBvbmVudC5lbXB0eUZvclF1ZXJ5KHNlbGVjdF90aXRsZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0L7RgdGC0YDQvtC40YLRjCDRhNC40LvRjNGC0YBcbiAgICAgKi9cbiAgICAgZnVuY3Rpb24gZmlsdGVyKCl7XG4gICAgICAgIGZpbHRlcl9pdGVtcyA9IHtcbiAgICAgICAgICAgIHNlYXNvbjogW10sXG4gICAgICAgICAgICB2b2ljZTogW10sXG4gICAgICAgICAgICBxdWFsaXR5OiBbXVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoZXh0cmFjdC5wbGF5bGlzdCl7XG4gICAgICAgICAgICBpZihleHRyYWN0LnBsYXlsaXN0LnNlYXNvbnMpe1xuICAgICAgICAgICAgICAgIGV4dHJhY3QucGxheWxpc3Quc2Vhc29ucy5mb3JFYWNoKChzZWFzb24pPT57XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcl9pdGVtcy5zZWFzb24ucHVzaChMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndG9ycmVudF9zZXJpYWxfc2Vhc29uJykgKyAnICcgKyBzZWFzb24uc2Vhc29uKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcblxuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9uZW50LmZpbHRlcihmaWx0ZXJfaXRlbXMsIGNob2ljZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQntGC0YTQuNC70YzRgtGA0L7QstCw0YLRjCDRhNCw0LnQu9GLXG4gICAgICogQHJldHVybnMgYXJyYXlcbiAgICAgKi9cbiAgICAgZnVuY3Rpb24gZmlsdHJlZCgpe1xuICAgICAgICBsZXQgZmlsdHJlZCA9IFtdXG5cbiAgICAgICAgbGV0IGZpbHRlcl9kYXRhID0gTGFtcGEuU3RvcmFnZS5nZXQoJ29ubGluZV9maWx0ZXInLCd7fScpXG4gICAgICAgIFxuICAgICAgICBpZihleHRyYWN0LnBsYXlsaXN0KXtcbiAgICAgICAgICAgIGV4dHJhY3QucGxheWxpc3Quc2Vhc29ucy5mb3JFYWNoKChzZWFzb24sIGkpPT57XG4gICAgICAgICAgICAgICAgaWYoaSA9PSBmaWx0ZXJfZGF0YS5zZWFzb24pe1xuICAgICAgICAgICAgICAgICAgICBzZWFzb24uZXBpc29kZXMuZm9yRWFjaChlcGlzb2RlPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0cmVkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IGVwaXNvZGUuaGxzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVwaXNvZGU6IHBhcnNlSW50KGVwaXNvZGUuZXBpc29kZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vhc29uOiBzZWFzb24uc2Vhc29uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBlcGlzb2RlLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm86IGVwaXNvZGUuYXVkaW8ubmFtZXMuc2xpY2UoMCw1KS5qb2luKCcsICcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlczogZXBpc29kZS5jYyA/IGVwaXNvZGUuY2MubWFwKGM9PnsgcmV0dXJuIHtsYWJlbDogYy5uYW1lLCB1cmw6IGMudXJsfX0pIDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZXh0cmFjdC5zb3VyY2Upe1xuICAgICAgICAgICAgbGV0IHJlc29sdXRpb24gID0gTGFtcGEuQXJyYXlzLmdldEtleXMoZXh0cmFjdC5xdWFsaXR5QnlXaWR0aCkucG9wKClcbiAgICAgICAgICAgIGxldCBtYXhfcXVhbGl0eSA9IGV4dHJhY3QucXVhbGl0eUJ5V2lkdGggPyBleHRyYWN0LnF1YWxpdHlCeVdpZHRoW3Jlc29sdXRpb25dIHx8IDAgOiAwXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZpbHRyZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgZmlsZTogZXh0cmFjdC5zb3VyY2UuaGxzLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBleHRyYWN0LnRpdGxlLFxuICAgICAgICAgICAgICAgIHF1YWxpdHk6IG1heF9xdWFsaXR5ID8gbWF4X3F1YWxpdHkgKyAncCAvICcgOiAnJyxcbiAgICAgICAgICAgICAgICBpbmZvOiBleHRyYWN0LnNvdXJjZS5hdWRpby5uYW1lcy5zbGljZSgwLDUpLmpvaW4oJywgJyksXG4gICAgICAgICAgICAgICAgc3VidGl0bGVzOiBleHRyYWN0LnNvdXJjZS5jYyA/IGV4dHJhY3Quc291cmNlLmNjLm1hcChjPT57IHJldHVybiB7bGFiZWw6IGMubmFtZSwgdXJsOiBjLnVybH19KSA6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpbHRyZWRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9C+0LrQsNC30LDRgtGMINGE0LDQudC70YtcbiAgICAgKi9cbiAgICAgZnVuY3Rpb24gYXBwZW5kKGl0ZW1zKSB7XG4gICAgICAgIGNvbXBvbmVudC5yZXNldCgpXG5cbiAgICAgICAgbGV0IHZpZXdlZCA9IExhbXBhLlN0b3JhZ2UuY2FjaGUoJ29ubGluZV92aWV3JywgNTAwMCwgW10pXG5cbiAgICAgICAgaXRlbXMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGxldCBoYXNoID0gTGFtcGEuVXRpbHMuaGFzaChlbGVtZW50LnNlYXNvbiA/IFtlbGVtZW50LnNlYXNvbiwgZWxlbWVudC5lcGlzb2RlLCBvYmplY3QubW92aWUub3JpZ2luYWxfdGl0bGVdLmpvaW4oJycpIDogb2JqZWN0Lm1vdmllLm9yaWdpbmFsX3RpdGxlKVxuICAgICAgICAgICAgbGV0IHZpZXcgPSBMYW1wYS5UaW1lbGluZS52aWV3KGhhc2gpXG4gICAgICAgICAgICBsZXQgaXRlbSA9IExhbXBhLlRlbXBsYXRlLmdldCgnb25saW5lJywgZWxlbWVudClcblxuICAgICAgICAgICAgbGV0IGhhc2hfZmlsZSA9IExhbXBhLlV0aWxzLmhhc2goZWxlbWVudC5zZWFzb24gPyBbZWxlbWVudC5zZWFzb24sZWxlbWVudC5lcGlzb2RlLG9iamVjdC5tb3ZpZS5vcmlnaW5hbF90aXRsZSxlbGVtZW50LnRpdGxlXS5qb2luKCcnKSA6IG9iamVjdC5tb3ZpZS5vcmlnaW5hbF90aXRsZSArICdjb2xsYXBzJylcblxuICAgICAgICAgICAgZWxlbWVudC50aW1lbGluZSA9IHZpZXdcblxuICAgICAgICAgICAgaXRlbS5hcHBlbmQoTGFtcGEuVGltZWxpbmUucmVuZGVyKHZpZXcpKVxuXG4gICAgICAgICAgICBpZihMYW1wYS5UaW1lbGluZS5kZXRhaWxzKXtcbiAgICAgICAgICAgICAgICBpdGVtLmZpbmQoJy5vbmxpbmVfX3F1YWxpdHknKS5hcHBlbmQoTGFtcGEuVGltZWxpbmUuZGV0YWlscyh2aWV3LCcgLyAnKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodmlld2VkLmluZGV4T2YoaGFzaF9maWxlKSAhPT0gLTEpIGl0ZW0uYXBwZW5kKCc8ZGl2IGNsYXNzPVwidG9ycmVudC1pdGVtX192aWV3ZWRcIj4nK0xhbXBhLlRlbXBsYXRlLmdldCgnaWNvbl9zdGFyJyx7fSx0cnVlKSsnPC9kaXY+JylcblxuICAgICAgICAgICAgaXRlbS5vbignaG92ZXI6ZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdC5tb3ZpZS5pZCkgTGFtcGEuRmF2b3JpdGUuYWRkKCdoaXN0b3J5Jywgb2JqZWN0Lm1vdmllLCAxMDApXG5cbiAgICAgICAgICAgICAgICBpZihlbGVtZW50LmZpbGUpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGxheWxpc3QgPSBbXVxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGVsZW1lbnQuZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lOiB2aWV3LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGVsZW1lbnQuc2Vhc29uID8gZWxlbWVudC50aXRsZSA6IChlbGVtZW50LnZvaWNlID8gb2JqZWN0Lm1vdmllLnRpdGxlICsgJyAvICcgKyBlbGVtZW50LnRpdGxlIDogZWxlbWVudC50aXRsZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZXM6IGVsZW1lbnQuc3VidGl0bGVzXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50LnNlYXNvbil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5mb3JFYWNoKGVsZW09PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGVsZW0udGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogZWxlbS5maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZTogZWxlbS50aW1lbGluZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VidGl0bGVzOiBlbGVtLnN1YnRpdGxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdC5wdXNoKGZpcnN0KVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYocGxheWxpc3QubGVuZ3RoID4gMSkgZmlyc3QucGxheWxpc3QgPSBwbGF5bGlzdFxuXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLlBsYXllci5wbGF5KGZpcnN0KVxuXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLlBsYXllci5wbGF5bGlzdChwbGF5bGlzdClcblxuICAgICAgICAgICAgICAgICAgICBpZih2aWV3ZWQuaW5kZXhPZihoYXNoX2ZpbGUpID09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdlZC5wdXNoKGhhc2hfZmlsZSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJ0b3JyZW50LWl0ZW1fX3ZpZXdlZFwiPicrTGFtcGEuVGVtcGxhdGUuZ2V0KCdpY29uX3N0YXInLHt9LHRydWUpKyc8L2Rpdj4nKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5TdG9yYWdlLnNldCgnb25saW5lX3ZpZXcnLCB2aWV3ZWQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBMYW1wYS5Ob3R5LnNob3coTGFtcGEuTGFuZy50cmFuc2xhdGUoJ29ubGluZV9ub2xpbmsnKSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGNvbXBvbmVudC5hcHBlbmQoaXRlbSlcblxuICAgICAgICAgICAgY29tcG9uZW50LmNvbnRleHRtZW51KHtcbiAgICAgICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgICAgIHZpZXcsXG4gICAgICAgICAgICAgICAgdmlld2VkLFxuICAgICAgICAgICAgICAgIGhhc2hfZmlsZSxcbiAgICAgICAgICAgICAgICBmaWxlOiAoY2FsbCk9PntjYWxsKHtmaWxlOiBlbGVtZW50LmZpbGV9KX1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29tcG9uZW50LnN0YXJ0KHRydWUpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb2xsYXBzIiwiZnVuY3Rpb24gY2RubW92aWVzKGNvbXBvbmVudCwgX29iamVjdCl7XG4gICAgbGV0IG5ldHdvcmsgID0gbmV3IExhbXBhLlJlZ3Vlc3QoKVxuICAgIGxldCBleHRyYWN0ICA9IHt9XG4gICAgbGV0IHJlc3VsdHMgID0gW11cbiAgICBsZXQgb2JqZWN0ICAgPSBfb2JqZWN0XG4gICAgbGV0IHNlbGVjdF90aXRsZSA9ICcnXG5cbiAgICBsZXQgZW1iZWQgPSBjb21wb25lbnQucHJveHkoJ2Nkbm1vdmllcycpICsgICdodHRwczovL2Nkbm1vdmllcy5uZXQvYXBpL3Nob3J0LydcbiAgICBsZXQgdG9rZW4gPSAnMDJkNTYwOTkwODJhZDVhZDU4NmQ3ZmU0ZTI0OTNkZDknXG5cbiAgICBsZXQgZmlsdGVyX2l0ZW1zID0ge31cblxuICAgIGxldCBjaG9pY2UgPSB7XG4gICAgICAgIHNlYXNvbjogMCxcbiAgICAgICAgdm9pY2U6IDAsXG4gICAgICAgIHZvaWNlX25hbWU6ICcnXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J3QsNGH0LDRgtGMINC/0L7QuNGB0LpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gX29iamVjdCBcbiAgICAgKi9cbiAgICB0aGlzLnNlYXJjaCA9IGZ1bmN0aW9uKF9vYmplY3QsIGRhdGEpe1xuICAgICAgICBpZih0aGlzLndhaXRfc2ltaWxhcnMpIHJldHVybiB0aGlzLmZpbmQoZGF0YVswXS5pZnJhbWVfc3JjKVxuXG4gICAgICAgIG9iamVjdCAgPSBfb2JqZWN0XG5cbiAgICAgICAgc2VsZWN0X3RpdGxlID0gb2JqZWN0Lm1vdmllLnRpdGxlXG5cbiAgICAgICAgbGV0IHVybCAgPSBlbWJlZFxuICAgICAgICBsZXQgaXRtICA9IGRhdGFbMF1cblxuICAgICAgICBpZihpdG0uaWZyYW1lX3NyYyl7XG4gICAgICAgICAgICBsZXQgdHlwZSA9IGl0bS5pZnJhbWVfc3JjLnNwbGl0KCcvJykuc2xpY2UoLTIpWzBdXG5cbiAgICAgICAgICAgIGlmKHR5cGUgPT0gJ21vdmllJykgdHlwZSA9ICdtb3ZpZXMnXG5cbiAgICAgICAgICAgIHVybCArPSB0eXBlXG5cbiAgICAgICAgICAgIHVybCA9IExhbXBhLlV0aWxzLmFkZFVybENvbXBvbmVudCh1cmwsICd0b2tlbj0nICsgdG9rZW4pXG4gICAgICAgICAgICB1cmwgPSBMYW1wYS5VdGlscy5hZGRVcmxDb21wb25lbnQodXJsLGl0bS5pbWRiX2lkID8gJ2ltZGJfaWQ9JytlbmNvZGVVUklDb21wb25lbnQoaXRtLmltZGJfaWQpIDogJ3RpdGxlPScrZW5jb2RlVVJJQ29tcG9uZW50KGl0bS50aXRsZSkpXG4gICAgICAgICAgICB1cmwgPSBMYW1wYS5VdGlscy5hZGRVcmxDb21wb25lbnQodXJsLCdmaWVsZD0nK2VuY29kZVVSSUNvbXBvbmVudCgnZ2xvYmFsJykpXG5cbiAgICAgICAgICAgIG5ldHdvcmsuc2lsZW50KHVybCwgKGpzb24pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYXJyYXlfZGF0YSA9IFtdXG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4ganNvbi5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5X2RhdGEucHVzaChqc29uLmRhdGFba2V5XSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBqc29uLmRhdGEgPSBhcnJheV9kYXRhXG5cbiAgICAgICAgICAgICAgICBpZihqc29uLmRhdGEubGVuZ3RoID4gMSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdF9zaW1pbGFycyA9IHRydWVcblxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuc2ltaWxhcnMoanNvbi5kYXRhKVxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQubG9hZGluZyhmYWxzZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihqc29uLmRhdGEubGVuZ3RoID09IDEpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmQoanNvbi5kYXRhWzBdLmlmcmFtZV9zcmMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5lbXB0eUZvclF1ZXJ5KHNlbGVjdF90aXRsZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LChhLCBjKT0+e1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5lbXB0eShuZXR3b3JrLmVycm9yRGVjb2RlKGEsIGMpKVxuICAgICAgICAgICAgfSxmYWxzZSx7XG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgY29tcG9uZW50LmVtcHR5Rm9yUXVlcnkoc2VsZWN0X3RpdGxlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5maW5kID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICBuZXR3b3JrLmNsZWFyKClcbiAgICAgICAgbmV0d29yay5zaWxlbnQoJ2h0dHA6Jyt1cmwsIChqc29uKT0+e1xuICAgICAgICAgICAgcGFyc2UoanNvbilcblxuICAgICAgICAgICAgY29tcG9uZW50LmxvYWRpbmcoZmFsc2UpXG4gICAgICAgIH0sIChhLCBjKT0+e1xuICAgICAgICAgICAgY29tcG9uZW50LmVtcHR5KG5ldHdvcmsuZXJyb3JEZWNvZGUoYSwgYykpXG4gICAgICAgIH0sZmFsc2Use1xuICAgICAgICAgICAgZGF0YVR5cGU6ICd0ZXh0J1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZXh0ZW5kQ2hvaWNlID0gZnVuY3Rpb24oc2F2ZWQpe1xuICAgICAgICBMYW1wYS5BcnJheXMuZXh0ZW5kKGNob2ljZSwgc2F2ZWQsIHRydWUpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KHQsdGA0L7RgSDRhNC40LvRjNGC0YDQsFxuICAgICAqL1xuICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbigpe1xuICAgICAgICBjb21wb25lbnQucmVzZXQoKVxuXG4gICAgICAgIGNob2ljZSA9IHtcbiAgICAgICAgICAgIHNlYXNvbjogMCxcbiAgICAgICAgICAgIHZvaWNlOiAwLFxuICAgICAgICAgICAgdm9pY2VfbmFtZTogJydcbiAgICAgICAgfVxuXG4gICAgICAgIGZpbHRlcigpXG5cbiAgICAgICAgYXBwZW5kKGZpbHRyZWQoKSlcblxuICAgICAgICBjb21wb25lbnQuc2F2ZUNob2ljZShjaG9pY2UpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J/RgNC40LzQtdC90LjRgtGMINGE0LjQu9GM0YLRgFxuICAgICAqIEBwYXJhbSB7Kn0gdHlwZSBcbiAgICAgKiBAcGFyYW0geyp9IGEgXG4gICAgICogQHBhcmFtIHsqfSBiIFxuICAgICAqL1xuICAgIHRoaXMuZmlsdGVyID0gZnVuY3Rpb24odHlwZSwgYSwgYil7XG4gICAgICAgIGNob2ljZVthLnN0eXBlXSA9IGIuaW5kZXhcblxuICAgICAgICBpZihhLnN0eXBlID09ICd2b2ljZScpIGNob2ljZS52b2ljZV9uYW1lID0gZmlsdGVyX2l0ZW1zLnZvaWNlW2IuaW5kZXhdXG5cbiAgICAgICAgY29tcG9uZW50LnJlc2V0KClcblxuICAgICAgICBmaWx0ZXIoKVxuXG4gICAgICAgIGFwcGVuZChmaWx0cmVkKCkpXG5cbiAgICAgICAgY29tcG9uZW50LnNhdmVDaG9pY2UoY2hvaWNlKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCj0L3QuNGH0YLQvtC20LjRgtGMXG4gICAgICovXG4gICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgbmV0d29yay5jbGVhcigpXG5cbiAgICAgICAgcmVzdWx0cyA9IG51bGxcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL1xcbi9nLCAnJylcblxuICAgICAgICBsZXQgZmluZCAgID0gc3RyLm1hdGNoKCdQbGF5ZXJqc1xcXFwoeyguKj8pfVxcXFwpOycpXG4gICAgICAgIGxldCB2aWRlb3MgPSBzdHIubWF0Y2goXCJmaWxlOicoLio/KSd9XCIpXG5cbiAgICAgICAgaWYodmlkZW9zKXtcbiAgICAgICAgICAgIGxldCB2aWRlbyAgPSBkZWNvZGUodmlkZW9zWzFdKSB8fCB2aWRlb3NbMV1cblxuICAgICAgICAgICAgaWYgKGZpbmQpIHtcbiAgICAgICAgICAgICAgICBsZXQganNvblxuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAganNvbiA9IEpTT04ucGFyc2UodmlkZW8pXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICAgICAgICAgIGlmIChqc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4dHJhY3QgPSBqc29uXG5cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyKClcblxuICAgICAgICAgICAgICAgICAgICBhcHBlbmQoZmlsdHJlZCgpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGNvbXBvbmVudC5lbXB0eUZvclF1ZXJ5KHNlbGVjdF90aXRsZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGNvbXBvbmVudC5lbXB0eUZvclF1ZXJ5KHNlbGVjdF90aXRsZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWNvZGUoZGF0YSkge1xuICAgICAgICBkYXRhID0gZGF0YS5yZXBsYWNlKCcjMicsICcnKS5yZXBsYWNlKCcvL05UUjJhbVpvWTJka1luSjVaR3RqWm10dVpIbzFOamcwTXpabWNtVmtLeXBrJywgJycpLnJlcGxhY2UoJy8vWVhvckxXVnlkeW96TkRVM1pXUm5kR3BrTFdabGNYTndkR1l2Y21VcWNTcFonLCAnJykucmVwbGFjZSgnLy9MU3BtY205bWNITmpjSEp3WVcxbWNGRXFORFUyTVRJdU16STFObVJtY21kaycsICcnKS5yZXBsYWNlKCcvL1pHWTRkbWMyT1hJNWVuaFhaR3g1WmlzcVptZDRORFUxWnpobWFEbDZMV1VxVVE9PScsICcnKS5yZXBsYWNlKCcvL2JIWm1lV05uYm1SeFkzbGtjbU5uWTJabkt6azFNVFEzWjJaa1oyWXRlbVFxJywgJycpO1xuICAgICAgICBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoYXRvYihkYXRhKS5zcGxpdChcIlwiKS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIlXCIgKyAoXCIwMFwiICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpXG4gICAgICAgICAgICB9KS5qb2luKFwiXCIpKVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gJydcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCd0LDQudGC0Lgg0L/QvtGC0L7QulxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IFxuICAgICAqIEBwYXJhbSB7SW50fSBtYXhfcXVhbGl0eVxuICAgICAqIEByZXR1cm5zIHN0cmluZ1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldEZpbGUoZWxlbWVudCkge1xuICAgICAgICBsZXQgZmlsZSAgICAgICAgPSAnJ1xuICAgICAgICBsZXQgcXVhbGl0eSAgICAgPSBmYWxzZVxuICAgICAgICBsZXQgbWF4X3F1YWxpdHkgPSAxMDgwXG4gICAgICAgIGxldCBwYXRoICAgICAgICA9IGVsZW1lbnQuc2xpY2UoMCwgZWxlbWVudC5sYXN0SW5kZXhPZignLycpKSArICcvJ1xuXG4gICAgICAgIGlmIChmaWxlLnNwbGl0KCcvJykucG9wKCkucmVwbGFjZSgnLm1wNCcsICcnKSAhPT0gbWF4X3F1YWxpdHkpIHtcbiAgICAgICAgICAgIGZpbGUgPSBwYXRoICsgbWF4X3F1YWxpdHkgKyAnLm1wNCdcbiAgICAgICAgfVxuXG4gICAgICAgIHF1YWxpdHkgPSB7fVxuXG4gICAgICAgIGxldCBtYXNzID0gWzEwODAsIDcyMCwgNDgwLCAzNjBdXG5cbiAgICAgICAgbWFzcyA9IG1hc3Muc2xpY2UobWFzcy5pbmRleE9mKG1heF9xdWFsaXR5KSlcblxuICAgICAgICBtYXNzLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgICAgIHF1YWxpdHlbbiArICdwJ10gPSBwYXRoICsgbiArICcubXA0J1xuICAgICAgICB9KVxuXG4gICAgICAgIGxldCBwcmVmZXJhYmx5ID0gTGFtcGEuU3RvcmFnZS5nZXQoJ3ZpZGVvX3F1YWxpdHlfZGVmYXVsdCcsJzEwODAnKSArICdwJ1xuICAgICAgICAgICAgXG4gICAgICAgIGlmKHF1YWxpdHlbcHJlZmVyYWJseV0pIGZpbGUgPSBxdWFsaXR5W3ByZWZlcmFibHldXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICBxdWFsaXR5OiBxdWFsaXR5XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9C+0YHRgtGA0L7QuNGC0Ywg0YTQuNC70YzRgtGAXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmlsdGVyKCl7XG4gICAgICAgIGZpbHRlcl9pdGVtcyAgPSB7XG4gICAgICAgICAgICBzZWFzb246IFtdLFxuICAgICAgICAgICAgdm9pY2U6IFtdLFxuICAgICAgICAgICAgcXVhbGl0eTogW11cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChleHRyYWN0WzBdLmZvbGRlciB8fCBvYmplY3QubW92aWUubnVtYmVyX29mX3NlYXNvbnMpIHtcbiAgICAgICAgICAgIGV4dHJhY3QuZm9yRWFjaCgoc2Vhc29uKT0+e1xuICAgICAgICAgICAgICAgIGZpbHRlcl9pdGVtcy5zZWFzb24ucHVzaChzZWFzb24udGl0bGUpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBleHRyYWN0W2Nob2ljZS5zZWFzb25dLmZvbGRlci5mb3JFYWNoKGY9PntcbiAgICAgICAgICAgICAgICBmLmZvbGRlci5mb3JFYWNoKHQ9PntcbiAgICAgICAgICAgICAgICAgICAgaWYoZmlsdGVyX2l0ZW1zLnZvaWNlLmluZGV4T2YodC50aXRsZSkgPT0gLTEpIGZpbHRlcl9pdGVtcy52b2ljZS5wdXNoKHQudGl0bGUpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmKCFmaWx0ZXJfaXRlbXMudm9pY2VbY2hvaWNlLnZvaWNlXSkgY2hvaWNlLnZvaWNlID0gMFxuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2hvaWNlLnZvaWNlX25hbWUpe1xuICAgICAgICAgICAgbGV0IGlueCA9IGZpbHRlcl9pdGVtcy52b2ljZS5pbmRleE9mKGNob2ljZS52b2ljZV9uYW1lKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihpbnggPT0gLTEpIGNob2ljZS52b2ljZSA9IDBcbiAgICAgICAgICAgIGVsc2UgaWYoaW54ICE9PSBjaG9pY2Uudm9pY2Upe1xuICAgICAgICAgICAgICAgIGNob2ljZS52b2ljZSA9IGlueFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9uZW50LmZpbHRlcihmaWx0ZXJfaXRlbXMsIGNob2ljZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQntGC0YTQuNC70YzRgtGA0L7QstCw0YLRjCDRhNCw0LnQu9GLXG4gICAgICogQHJldHVybnMgYXJyYXlcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmaWx0cmVkKCl7XG4gICAgICAgIGxldCBmaWx0cmVkID0gW11cblxuICAgICAgICBsZXQgZmlsdGVyX2RhdGEgPSBMYW1wYS5TdG9yYWdlLmdldCgnb25saW5lX2ZpbHRlcicsICd7fScpXG5cbiAgICAgICAgaWYgKGV4dHJhY3RbMF0uZm9sZGVyIHx8IG9iamVjdC5tb3ZpZS5udW1iZXJfb2Zfc2Vhc29ucykge1xuICAgICAgICAgICAgZXh0cmFjdC5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHQudGl0bGUgPT0gZmlsdGVyX2l0ZW1zLnNlYXNvbltmaWx0ZXJfZGF0YS5zZWFzb25dKSB7XG4gICAgICAgICAgICAgICAgICAgIHQuZm9sZGVyLmZvckVhY2goZnVuY3Rpb24gKHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZS5mb2xkZXIuZm9yRWFjaChmdW5jdGlvbiAoZXBzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVwcy50aXRsZSA9PSBmaWx0ZXJfaXRlbXMudm9pY2VbY2hvaWNlLnZvaWNlXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0cmVkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogZXBzLmZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcGlzb2RlOiBwYXJzZUludChzZS50aXRsZS5tYXRjaCgvXFxkKy8pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXNvbjogcGFyc2VJbnQodC50aXRsZS5tYXRjaCgvXFxkKy8pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6ICczNjBwIH4gMTA4MHAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mbzogJyAvICcgKyBMYW1wYS5VdGlscy5zaG9ydFRleHQoZXBzLnRpdGxlLDUwKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXh0cmFjdC5mb3JFYWNoKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgZmlsdHJlZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogZGF0YS5maWxlLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogZGF0YS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgcXVhbGl0eTogJzM2MHAgfiAxMDgwcCcsXG4gICAgICAgICAgICAgICAgICAgIGluZm86ICcnLFxuICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZXM6IGRhdGEuc3VidGl0bGUgPyBkYXRhLnN1YnRpdGxlLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBjLnNwbGl0KCddJylbMF0uc2xpY2UoMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBjLnNwbGl0KCddJylbMV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkgOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpbHRyZWRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQlNC+0LHQsNCy0LjRgtGMINCy0LjQtNC10L5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBpdGVtcyBcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhcHBlbmQoaXRlbXMpe1xuICAgICAgICBjb21wb25lbnQucmVzZXQoKVxuXG4gICAgICAgIGxldCB2aWV3ZWQgPSBMYW1wYS5TdG9yYWdlLmNhY2hlKCdvbmxpbmVfdmlldycsIDUwMDAsIFtdKVxuXG4gICAgICAgIGl0ZW1zLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBpZihlbGVtZW50LnNlYXNvbikgZWxlbWVudC50aXRsZSA9ICdTJytlbGVtZW50LnNlYXNvbiArICcgLyAnICsgTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RvcnJlbnRfc2VyaWFsX2VwaXNvZGUnKSArICcgJyArIGVsZW1lbnQuZXBpc29kZVxuXG4gICAgICAgICAgICBlbGVtZW50LmluZm8gPSBlbGVtZW50LnNlYXNvbiA/ICcgLyAnICsgTGFtcGEuVXRpbHMuc2hvcnRUZXh0KGZpbHRlcl9pdGVtcy52b2ljZVtjaG9pY2Uudm9pY2VdLCA1MCkgOiAnJ1xuXG4gICAgICAgICAgICBsZXQgaGFzaCA9IExhbXBhLlV0aWxzLmhhc2goZWxlbWVudC5zZWFzb24gPyBbZWxlbWVudC5zZWFzb24sZWxlbWVudC5lcGlzb2RlLG9iamVjdC5tb3ZpZS5vcmlnaW5hbF90aXRsZV0uam9pbignJykgOiBvYmplY3QubW92aWUub3JpZ2luYWxfdGl0bGUpXG4gICAgICAgICAgICBsZXQgdmlldyA9IExhbXBhLlRpbWVsaW5lLnZpZXcoaGFzaClcbiAgICAgICAgICAgIGxldCBpdGVtID0gTGFtcGEuVGVtcGxhdGUuZ2V0KCdvbmxpbmUnLGVsZW1lbnQpXG5cbiAgICAgICAgICAgIGxldCBoYXNoX2ZpbGUgPSBMYW1wYS5VdGlscy5oYXNoKGVsZW1lbnQuc2Vhc29uID8gW2VsZW1lbnQuc2Vhc29uLGVsZW1lbnQuZXBpc29kZSxvYmplY3QubW92aWUub3JpZ2luYWxfdGl0bGUsZmlsdGVyX2l0ZW1zLnZvaWNlW2Nob2ljZS52b2ljZV1dLmpvaW4oJycpIDogb2JqZWN0Lm1vdmllLm9yaWdpbmFsX3RpdGxlICsgZWxlbWVudC50aXRsZSlcblxuICAgICAgICAgICAgaXRlbS5hZGRDbGFzcygndmlkZW8tLXN0cmVhbScpXG5cbiAgICAgICAgICAgIGVsZW1lbnQudGltZWxpbmUgPSB2aWV3XG5cbiAgICAgICAgICAgIGl0ZW0uYXBwZW5kKExhbXBhLlRpbWVsaW5lLnJlbmRlcih2aWV3KSlcblxuICAgICAgICAgICAgaWYoTGFtcGEuVGltZWxpbmUuZGV0YWlscyl7XG4gICAgICAgICAgICAgICAgaXRlbS5maW5kKCcub25saW5lX19xdWFsaXR5JykuYXBwZW5kKExhbXBhLlRpbWVsaW5lLmRldGFpbHModmlldywnIC8gJykpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHZpZXdlZC5pbmRleE9mKGhhc2hfZmlsZSkgIT09IC0xKSBpdGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cInRvcnJlbnQtaXRlbV9fdmlld2VkXCI+JytMYW1wYS5UZW1wbGF0ZS5nZXQoJ2ljb25fc3Rhcicse30sdHJ1ZSkrJzwvZGl2PicpXG5cbiAgICAgICAgICAgIGl0ZW0ub24oJ2hvdmVyOmVudGVyJywoKT0+e1xuICAgICAgICAgICAgICAgIGlmKG9iamVjdC5tb3ZpZS5pZCkgTGFtcGEuRmF2b3JpdGUuYWRkKCdoaXN0b3J5Jywgb2JqZWN0Lm1vdmllLCAxMDApXG5cbiAgICAgICAgICAgICAgICBsZXQgZXh0cmEgPSBnZXRGaWxlKGVsZW1lbnQuZmlsZSlcblxuICAgICAgICAgICAgICAgIGlmKGV4dHJhLmZpbGUpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGxheWxpc3QgPSBbXVxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGV4dHJhLmZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5OiBleHRyYS5xdWFsaXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmU6IHZpZXcsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZXM6IGVsZW1lbnQuc3VidGl0bGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGVsZW1lbnQuc2Vhc29uID8gZWxlbWVudC50aXRsZSA6IG9iamVjdC5tb3ZpZS50aXRsZSArICcgLyAnICsgZWxlbWVudC50aXRsZVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC5zZWFzb24pe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMuZm9yRWFjaChlbGVtPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGV4ID0gZ2V0RmlsZShlbGVtLmZpbGUpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGVsZW0udGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogZXguZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eTogZXgucXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VidGl0bGVzOiBlbGVtLnN1YnRpdGxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmU6IGVsZW0udGltZWxpbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWxpc3QucHVzaChmaXJzdClcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHBsYXlsaXN0Lmxlbmd0aCA+IDEpIGZpcnN0LnBsYXlsaXN0ID0gcGxheWxpc3RcblxuICAgICAgICAgICAgICAgICAgICBMYW1wYS5QbGF5ZXIucGxheShmaXJzdClcblxuICAgICAgICAgICAgICAgICAgICBMYW1wYS5QbGF5ZXIucGxheWxpc3QocGxheWxpc3QpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYodmlld2VkLmluZGV4T2YoaGFzaF9maWxlKSA9PSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3ZWQucHVzaChoYXNoX2ZpbGUpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYXBwZW5kKCc8ZGl2IGNsYXNzPVwidG9ycmVudC1pdGVtX192aWV3ZWRcIj4nK0xhbXBhLlRlbXBsYXRlLmdldCgnaWNvbl9zdGFyJyx7fSx0cnVlKSsnPC9kaXY+JylcblxuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoJ29ubGluZV92aWV3Jywgdmlld2VkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgTGFtcGEuTm90eS5zaG93KExhbXBhLkxhbmcudHJhbnNsYXRlKCdvbmxpbmVfbm9saW5rJykpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBjb21wb25lbnQuYXBwZW5kKGl0ZW0pXG5cbiAgICAgICAgICAgIGNvbXBvbmVudC5jb250ZXh0bWVudSh7XG4gICAgICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgICAgICB2aWV3LFxuICAgICAgICAgICAgICAgIHZpZXdlZCxcbiAgICAgICAgICAgICAgICBoYXNoX2ZpbGUsXG4gICAgICAgICAgICAgICAgZmlsZTogKGNhbGwpPT57Y2FsbChnZXRGaWxlKGVsZW1lbnQuZmlsZSkpfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICBjb21wb25lbnQuc3RhcnQodHJ1ZSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNkbm1vdmllcyIsImZ1bmN0aW9uIGZpbG1peChjb21wb25lbnQsIF9vYmplY3Qpe1xuICAgIGxldCBuZXR3b3JrICA9IG5ldyBMYW1wYS5SZWd1ZXN0KClcbiAgICBsZXQgZXh0cmFjdCAgPSB7fVxuICAgIGxldCByZXN1bHRzICA9IFtdXG4gICAgbGV0IG9iamVjdCAgID0gX29iamVjdFxuICAgIGxldCBlbWJlZCAgICA9ICdodHRwOi8vZmlsbWl4YXBwLmN5b3UvYXBpL3YyLyc7XG4gICAgbGV0IHNlbGVjdF90aXRsZSA9ICcnXG5cbiAgICBsZXQgZmlsdGVyX2l0ZW1zID0ge31cblxuICAgIGxldCBjaG9pY2UgPSB7XG4gICAgICAgIHNlYXNvbjogMCxcbiAgICAgICAgdm9pY2U6IDAsXG4gICAgICAgIHZvaWNlX25hbWU6ICcnXG4gICAgfVxuXG4gICAgbGV0IHRva2VuID0gTGFtcGEuU3RvcmFnZS5nZXQoJ2ZpbG1peF90b2tlbicsJycpXG5cbiAgICBpZiAoIXdpbmRvdy5maWxtaXgpe1xuICAgICAgICB3aW5kb3cuZmlsbWl4ID0ge1xuICAgICAgICAgICAgbWF4X3F1YWxpdGllOiA3MjAsXG4gICAgICAgICAgICBpc19tYXhfcXVhbGl0aWU6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9IFxuXG4gICAgbGV0IGRldl90b2tlbiA9ICd1c2VyX2Rldl9hcGs9Mi4wLjEmdXNlcl9kZXZfaWQ9JnVzZXJfZGV2X25hbWU9WGlhb21pJnVzZXJfZGV2X29zPTExJnVzZXJfZGV2X3Rva2VuPScrdG9rZW4rJyZ1c2VyX2Rldl92ZW5kb3I9WGlhb21pJ1xuXG4gICAgLyoqXG4gICAgICog0J3QsNGH0LDRgtGMINC/0L7QuNGB0LpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gX29iamVjdCBcbiAgICAgKi9cbiAgICB0aGlzLnNlYXJjaCA9IGZ1bmN0aW9uKF9vYmplY3QsIGRhdGEpe1xuICAgICAgICBpZih0aGlzLndhaXRfc2ltaWxhcnMpIHJldHVybiB0aGlzLmZpbmQoZGF0YVswXS5pZClcblxuICAgICAgICBvYmplY3QgID0gX29iamVjdFxuXG4gICAgICAgIHNlbGVjdF90aXRsZSA9IG9iamVjdC5tb3ZpZS50aXRsZVxuXG4gICAgICAgIGxldCBpdGVtID0gZGF0YVswXVxuICAgICAgICBsZXQgeWVhciA9IHBhcnNlSW50KChvYmplY3QubW92aWUucmVsZWFzZV9kYXRlIHx8IG9iamVjdC5tb3ZpZS5maXJzdF9haXJfZGF0ZSB8fCAnMDAwMCcpLnNsaWNlKDAsNCkpXG4gICAgICAgIGxldCBvcmlnID0gb2JqZWN0Lm1vdmllLm9yaWdpbmFsX3RpdGxlIHx8IG9iamVjdC5tb3ZpZS5vcmlnaW5hbF9uYW1lXG5cbiAgICAgICAgbGV0IHVybCA9IGVtYmVkICsgJ3NlYXJjaCdcbiAgICAgICAgICAgIHVybCA9IExhbXBhLlV0aWxzLmFkZFVybENvbXBvbmVudCh1cmwsICdzdG9yeT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGl0ZW0udGl0bGUpKVxuICAgICAgICAgICAgdXJsID0gTGFtcGEuVXRpbHMuYWRkVXJsQ29tcG9uZW50KHVybCwgZGV2X3Rva2VuKVxuXG4gICAgICAgIG5ldHdvcmsuY2xlYXIoKVxuICAgICAgICBuZXR3b3JrLnNpbGVudCh1cmwsIChqc29uKT0+IHtcbiAgICAgICAgICAgIGxldCBjYXJkcyA9IGpzb24uZmlsdGVyKGM9PntcbiAgICAgICAgICAgICAgICBjLnllYXIgPSBwYXJzZUludChjLmFsdF9uYW1lLnNwbGl0KCctJykucG9wKCkpXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYy55ZWFyID4geWVhciAtIDIgJiYgYy55ZWFyIDwgeWVhciArIDJcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGxldCBjYXJkID0gY2FyZHMuZmluZChjPT5jLnllYXIgPT0geWVhcilcblxuICAgICAgICAgICAgaWYoIWNhcmQpe1xuICAgICAgICAgICAgICAgIGNhcmQgPSBjYXJkcy5maW5kKGM9PmMub3JpZ2luYWxfdGl0bGUgPT0gb3JpZylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIWNhcmQgJiYgY2FyZHMubGVuZ3RoID09IDEpIGNhcmQgPSBjYXJkc1swXVxuXG4gICAgICAgICAgICBpZihjYXJkKSB0aGlzLmZpbmQoY2FyZC5pZClcbiAgICAgICAgICAgIGVsc2UgaWYoanNvbi5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIHRoaXMud2FpdF9zaW1pbGFycyA9IHRydWVcblxuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5zaW1pbGFycyhqc29uKVxuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5sb2FkaW5nKGZhbHNlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBjb21wb25lbnQuZW1wdHlGb3JRdWVyeShzZWxlY3RfdGl0bGUpXG4gICAgICAgIH0sIChhLCBjKT0+IHtcbiAgICAgICAgICAgIGNvbXBvbmVudC5lbXB0eShuZXR3b3JrLmVycm9yRGVjb2RlKGEsIGMpKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZmluZCA9IGZ1bmN0aW9uIChmaWxtaXhfaWQpIHtcbiAgICAgICAgdmFyIHVybCA9IGVtYmVkO1xuICAgICAgICBpZiAoIXdpbmRvdy5maWxtaXguaXNfbWF4X3F1YWxpdGllICYmIHRva2VuKSB7XG4gICAgICAgICAgICB3aW5kb3cuZmlsbWl4LmlzX21heF9xdWFsaXRpZSA9IHRydWVcblxuICAgICAgICAgICAgbmV0d29yay5jbGVhcigpXG4gICAgICAgICAgICBuZXR3b3JrLnRpbWVvdXQoMTAwMDApXG4gICAgICAgICAgICBuZXR3b3JrLnNpbGVudCh1cmwgKyAndXNlcl9wcm9maWxlPycgKyBkZXZfdG9rZW4sIGZ1bmN0aW9uIChmb3VuZCkge1xuICAgICAgICAgICAgICAgIGlmIChmb3VuZCAmJiBmb3VuZC51c2VyX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kLnVzZXJfZGF0YS5pc19wcm8pIHdpbmRvdy5maWxtaXgubWF4X3F1YWxpdGllICAgICAgPSAxMDgwXG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZC51c2VyX2RhdGEuaXNfcHJvX3BsdXMpIHdpbmRvdy5maWxtaXgubWF4X3F1YWxpdGllID0gMjE2MFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVuZF9zZWFyY2goZmlsbWl4X2lkKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGVuZF9zZWFyY2goZmlsbWl4X2lkKVxuXG4gICAgICAgIGZ1bmN0aW9uIGVuZF9zZWFyY2goZmlsbWl4X2lkKSB7XG4gICAgICAgICAgICBuZXR3b3JrLmNsZWFyKCk7XG4gICAgICAgICAgICBuZXR3b3JrLnRpbWVvdXQoMTAwMDApO1xuICAgICAgICAgICAgbmV0d29yay5zaWxlbnQoKHdpbmRvdy5maWxtaXguaXNfbWF4X3F1YWxpdGllID8gdXJsICsgJ3Bvc3QvJyArIGZpbG1peF9pZCA6IHVybCArICdwb3N0LycgKyBmaWxtaXhfaWQpICsgJz8nICsgZGV2X3Rva2VuLCBmdW5jdGlvbiAoZm91bmQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm91bmQgJiYgT2JqZWN0LmtleXMoZm91bmQpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKGZvdW5kKVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5sb2FkaW5nKGZhbHNlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGNvbXBvbmVudC5lbXB0eUZvclF1ZXJ5KHNlbGVjdF90aXRsZSlcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChhLCBjKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LmVtcHR5KG5ldHdvcmsuZXJyb3JEZWNvZGUoYSwgYykpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5leHRlbmRDaG9pY2UgPSBmdW5jdGlvbihzYXZlZCl7XG4gICAgICAgIExhbXBhLkFycmF5cy5leHRlbmQoY2hvaWNlLCBzYXZlZCwgdHJ1ZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQodCx0YDQvtGBINGE0LjQu9GM0YLRgNCwXG4gICAgICovXG4gICAgdGhpcy5yZXNldCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbXBvbmVudC5yZXNldCgpXG5cbiAgICAgICAgY2hvaWNlID0ge1xuICAgICAgICAgICAgc2Vhc29uOiAwLFxuICAgICAgICAgICAgdm9pY2U6IDAsXG4gICAgICAgICAgICB2b2ljZV9uYW1lOiAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgZXh0cmFjdERhdGEocmVzdWx0cylcblxuICAgICAgICBmaWx0ZXIoKVxuXG4gICAgICAgIGFwcGVuZChmaWx0cmVkKCkpXG5cbiAgICAgICAgY29tcG9uZW50LnNhdmVDaG9pY2UoY2hvaWNlKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0YDQuNC80LXQvdC40YLRjCDRhNC40LvRjNGC0YBcbiAgICAgKiBAcGFyYW0geyp9IHR5cGUgXG4gICAgICogQHBhcmFtIHsqfSBhIFxuICAgICAqIEBwYXJhbSB7Kn0gYiBcbiAgICAgKi9cbiAgICB0aGlzLmZpbHRlciA9IGZ1bmN0aW9uKHR5cGUsIGEsIGIpe1xuICAgICAgICBjaG9pY2VbYS5zdHlwZV0gPSBiLmluZGV4XG5cbiAgICAgICAgaWYoYS5zdHlwZSA9PSAndm9pY2UnKSBjaG9pY2Uudm9pY2VfbmFtZSA9IGZpbHRlcl9pdGVtcy52b2ljZVtiLmluZGV4XVxuXG4gICAgICAgIGNvbXBvbmVudC5yZXNldCgpXG5cbiAgICAgICAgZXh0cmFjdERhdGEocmVzdWx0cylcblxuICAgICAgICBmaWx0ZXIoKVxuXG4gICAgICAgIGFwcGVuZChmaWx0cmVkKCkpXG5cbiAgICAgICAgY29tcG9uZW50LnNhdmVDaG9pY2UoY2hvaWNlKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCj0L3QuNGH0YLQvtC20LjRgtGMXG4gICAgICovXG4gICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgbmV0d29yay5jbGVhcigpXG5cbiAgICAgICAgcmVzdWx0cyA9IG51bGxcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQo9GB0L/QtdGI0L3Qviwg0LXRgdGC0Ywg0LTQsNC90L3Ri9C1XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGpzb25cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdWNjZXNzKGpzb24pIHtcbiAgICAgICAgcmVzdWx0cyA9IGpzb25cblxuICAgICAgICBleHRyYWN0RGF0YShqc29uKVxuXG4gICAgICAgIGZpbHRlcigpXG5cbiAgICAgICAgYXBwZW5kKGZpbHRyZWQoKSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9C+0LvRg9GH0LjRgtGMINC40L3RhNC+0YDQvNCw0YbQuNGOINC+INGE0LjQu9GM0LzQtVxuICAgICAqIEBwYXJhbSB7QXJyYXlzfSBkYXRhXG4gICAgICovXG4gICAgZnVuY3Rpb24gZXh0cmFjdERhdGEoZGF0YSkge1xuICAgICAgICBleHRyYWN0ID0ge31cblxuICAgICAgICBsZXQgcGxfbGlua3MgPSBkYXRhLnBsYXllcl9saW5rc1xuXG4gICAgICAgIGlmIChwbF9saW5rcy5wbGF5bGlzdCAmJiBPYmplY3Qua2V5cyhwbF9saW5rcy5wbGF5bGlzdCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IHNlYXNfbnVtID0gMFxuXG4gICAgICAgICAgICBmb3IgKGxldCBzZWFzb24gaW4gcGxfbGlua3MucGxheWxpc3QpIHtcbiAgICAgICAgICAgICAgICBsZXQgZXBpc29kZSA9IHBsX2xpbmtzLnBsYXlsaXN0W3NlYXNvbl1cblxuICAgICAgICAgICAgICAgICsrc2Vhc19udW1cblxuICAgICAgICAgICAgICAgIGxldCB0cmFuc2xfaWQgPSAwXG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCB2b2ljZSBpbiBlcGlzb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlcGlzb2RlX3ZvaWNlID0gZXBpc29kZVt2b2ljZV1cbiAgICAgICAgICAgICAgICAgICAgKyt0cmFuc2xfaWRcblxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVwaXNfbnVtID0gMFxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IElEIGluIGVwaXNvZGVfdm9pY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWxlX2VwaXNvZCA9IGVwaXNvZGVfdm9pY2VbSURdXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICsrZXBpc19udW1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHF1YWxpdHlfZXBzID0gZmlsZV9lcGlzb2QucXVhbGl0aWVzLmZpbHRlcihmdW5jdGlvbiAocXVhbGl0eXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVhbGl0eXMgPD0gd2luZG93LmZpbG1peC5tYXhfcXVhbGl0aWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYXhfcXVhbGl0eSA9IE1hdGgubWF4LmFwcGx5KG51bGwsIHF1YWxpdHlfZXBzKVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0cmVhbV91cmwgPSBmaWxlX2VwaXNvZC5saW5rLnJlcGxhY2UoJyVzLm1wNCcsIG1heF9xdWFsaXR5ICsgJy5tcDQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNfZSA9IHN0cmVhbV91cmwuc2xpY2UoMCAtIHN0cmVhbV91cmwubGVuZ3RoICsgc3RyZWFtX3VybC5sYXN0SW5kZXhPZignLycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0cl9zX2UgPSBzX2UubWF0Y2goL3MoXFxkKyllKFxcZCs/KV9cXGQrXFwubXA0L2kpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHJfc19lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlYXNfbnVtID0gcGFyc2VJbnQoc3RyX3NfZVsxXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXBpc19udW0gPSBwYXJzZUludChzdHJfc19lWzJdKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBzZWFzX251bSArICdfJyArIGVwaXNfbnVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50OiBlcGlzX251bSArICcgJyArIExhbXBhLkxhbmcudHJhbnNsYXRlKCd0b3JyZW50X3NlcmlhbF9lcGlzb2RlJykgKyAnIDxpPicgKyBJRCArICc8L2k+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogc3RyZWFtX3VybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXBpc29kZTogZXBpc19udW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXNvbjogc2Vhc19udW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6IG1heF9xdWFsaXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXRpZXM6IHF1YWxpdHlfZXBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogdHJhbnNsX2lkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWV4dHJhY3RbdHJhbnNsX2lkXSkgZXh0cmFjdFt0cmFuc2xfaWRdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAganNvbjogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiAnJ1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZXh0cmFjdFt0cmFuc2xfaWRdLmpzb24ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogc2Vhc19udW0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50OiBzZWFzX251bSArICcgJyArIExhbXBhLkxhbmcudHJhbnNsYXRlKCd0b3JyZW50X3NlcmlhbF9zZWFzb24nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbGRlcjogaXRlbXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogdHJhbnNsX2lkXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgICBcbiAgICAgICAgZWxzZSBpZiAocGxfbGlua3MubW92aWUgJiYgcGxfbGlua3MubW92aWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IHRyYW5zbF9pZCA9IDBcblxuICAgICAgICAgICAgZm9yIChsZXQgSUQgaW4gcGxfbGlua3MubW92aWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgZmlsZV9lcGlzb2QgPSBwbF9saW5rcy5tb3ZpZVtJRF1cblxuICAgICAgICAgICAgICAgICsrdHJhbnNsX2lkXG5cbiAgICAgICAgICAgICAgICBsZXQgcXVhbGl0eV9lcHMgPSBmaWxlX2VwaXNvZC5saW5rLm1hdGNoKC8uK1xcWyguK1tcXGRdKSw/XFxdLisvaSlcblxuICAgICAgICAgICAgICAgIGlmIChxdWFsaXR5X2VwcykgcXVhbGl0eV9lcHMgPSBxdWFsaXR5X2Vwc1sxXS5zcGxpdCgnLCcpLmZpbHRlcihmdW5jdGlvbiAocXVhbGl0eV8pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHlfIDw9IHdpbmRvdy5maWxtaXgubWF4X3F1YWxpdGllXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIGxldCBtYXhfcXVhbGl0eSA9IE1hdGgubWF4LmFwcGx5KG51bGwsIHF1YWxpdHlfZXBzKVxuICAgICAgICAgICAgICAgIGxldCBmaWxlX3VybCA9IGZpbGVfZXBpc29kLmxpbmsucmVwbGFjZSgvXFxbKC4rW1xcZF0pLD9cXF0vaSwgbWF4X3F1YWxpdHkpXG5cbiAgICAgICAgICAgICAgICBleHRyYWN0W3RyYW5zbF9pZF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IGZpbGVfdXJsLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZmlsZV9lcGlzb2QudHJhbnNsYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6IG1heF9xdWFsaXR5LFxuICAgICAgICAgICAgICAgICAgICBxdWFsaXRpZXM6IHF1YWxpdHlfZXBzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDQndCw0LnRgtC4INC/0L7RgtC+0LpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudFxuICAgICAqIEBwYXJhbSB7SW50fSBtYXhfcXVhbGl0eVxuICAgICAqIEByZXR1cm5zIHN0cmluZ1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldEZpbGUoZWxlbWVudCwgbWF4X3F1YWxpdHkpIHtcbiAgICAgICAgbGV0IHRyYW5zbGF0ID0gZXh0cmFjdFtlbGVtZW50LnRyYW5zbGF0aW9uXVxuICAgICAgICBsZXQgaWQgICAgICAgPSBlbGVtZW50LnNlYXNvbiArICdfJyArIGVsZW1lbnQuZXBpc29kZVxuICAgICAgICBsZXQgZmlsZSAgICAgPSAnJ1xuICAgICAgICBsZXQgcXVhbGl0eSAgPSBmYWxzZVxuXG4gICAgICAgIGlmICh0cmFuc2xhdCkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuc2Vhc29uKVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdHJhbnNsYXQuanNvbikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbSA9IHRyYW5zbGF0Lmpzb25baV1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbS5mb2xkZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBmIGluIGVsZW0uZm9sZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvbGRlciA9IGVsZW0uZm9sZGVyW2ZdXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9sZGVyLmlkID09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUgPSBmb2xkZXIuZmlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW0uaWQgPT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZSA9IGVsZW0uZmlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIGVsc2UgZmlsZSA9IHRyYW5zbGF0LmZpbGVcbiAgICAgICAgfVxuXG4gICAgICAgIG1heF9xdWFsaXR5ID0gcGFyc2VJbnQobWF4X3F1YWxpdHkpXG5cbiAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgIGxldCBsaW5rID0gZmlsZS5zbGljZSgwLCBmaWxlLmxhc3RJbmRleE9mKCdfJykpICsgJ18nXG4gICAgICAgICAgICBsZXQgb3JpbiA9IGZpbGUuc3BsaXQoJz8nKVxuICAgICAgICAgICAgICAgIG9yaW4gPSBvcmluLmxlbmd0aCA+IDEgPyAnPycrb3Jpbi5zbGljZSgxKS5qb2luKCc/JykgOiAnJ1xuXG4gICAgICAgICAgICBpZiAoZmlsZS5zcGxpdCgnXycpLnBvcCgpLnJlcGxhY2UoJy5tcDQnLCAnJykgIT09IG1heF9xdWFsaXR5KSB7XG4gICAgICAgICAgICAgICAgZmlsZSA9IGxpbmsgKyBtYXhfcXVhbGl0eSArICcubXA0JyArIG9yaW5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcXVhbGl0eSA9IHt9XG5cbiAgICAgICAgICAgIGxldCBtYXNzID0gWzIxNjAsIDE0NDAsIDEwODAsIDcyMCwgNDgwLCAzNjBdXG5cbiAgICAgICAgICAgIG1hc3MgPSBtYXNzLnNsaWNlKG1hc3MuaW5kZXhPZihtYXhfcXVhbGl0eSkpXG5cbiAgICAgICAgICAgIG1hc3MuZm9yRWFjaChmdW5jdGlvbiAobikge1xuICAgICAgICAgICAgICAgIHF1YWxpdHlbbiArICdwJ10gPSBsaW5rICsgbiArICcubXA0JyArIG9yaW5cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGxldCBwcmVmZXJhYmx5ID0gTGFtcGEuU3RvcmFnZS5nZXQoJ3ZpZGVvX3F1YWxpdHlfZGVmYXVsdCcsJzEwODAnKSArICdwJ1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihxdWFsaXR5W3ByZWZlcmFibHldKSBmaWxlID0gcXVhbGl0eVtwcmVmZXJhYmx5XVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICBxdWFsaXR5OiBxdWFsaXR5XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9C+0YHRgtGA0L7QuNGC0Ywg0YTQuNC70YzRgtGAXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmlsdGVyKCl7XG4gICAgICAgIGZpbHRlcl9pdGVtcyA9IHtcbiAgICAgICAgICAgIHNlYXNvbjogW10sXG4gICAgICAgICAgICB2b2ljZTogW10sXG4gICAgICAgICAgICB2b2ljZV9pbmZvOiBbXVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdHMubGFzdF9lcGlzb2RlICYmIHJlc3VsdHMubGFzdF9lcGlzb2RlLnNlYXNvbikge1xuICAgICAgICAgICAgbGV0IHMgPSByZXN1bHRzLmxhc3RfZXBpc29kZS5zZWFzb25cblxuICAgICAgICAgICAgd2hpbGUgKHMtLSkge1xuICAgICAgICAgICAgICAgIGZpbHRlcl9pdGVtcy5zZWFzb24ucHVzaChMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndG9ycmVudF9zZXJpYWxfc2Vhc29uJykgKyAnICcgKyAocmVzdWx0cy5sYXN0X2VwaXNvZGUuc2Vhc29uIC0gcykpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaSA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgSWQgaW4gcmVzdWx0cy5wbGF5ZXJfbGlua3MucGxheWxpc3QpIHtcbiAgICAgICAgICAgIGxldCBzZWFzb24gPSByZXN1bHRzLnBsYXllcl9saW5rcy5wbGF5bGlzdFtJZF1cblxuICAgICAgICAgICAgKytpXG5cbiAgICAgICAgICAgIGxldCBkID0gMFxuXG4gICAgICAgICAgICBmb3IgKGxldCB2b2ljIGluIHNlYXNvbikge1xuICAgICAgICAgICAgICAgICsrZFxuXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcl9pdGVtcy52b2ljZS5pbmRleE9mKHZvaWMpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcl9pdGVtcy52b2ljZS5wdXNoKHZvaWMpO1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJfaXRlbXMudm9pY2VfaW5mby5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBkXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2hvaWNlLnZvaWNlX25hbWUpe1xuICAgICAgICAgICAgbGV0IGlueCA9IGZpbHRlcl9pdGVtcy52b2ljZS5pbmRleE9mKGNob2ljZS52b2ljZV9uYW1lKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihpbnggPT0gLTEpIGNob2ljZS52b2ljZSA9IDBcbiAgICAgICAgICAgIGVsc2UgaWYoaW54ICE9PSBjaG9pY2Uudm9pY2Upe1xuICAgICAgICAgICAgICAgIGNob2ljZS52b2ljZSA9IGlueFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9uZW50LmZpbHRlcihmaWx0ZXJfaXRlbXMsIGNob2ljZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQntGC0YTQuNC70YzRgtGA0L7QstCw0YLRjCDRhNCw0LnQu9GLXG4gICAgICogQHJldHVybnMgYXJyYXlcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmaWx0cmVkKCl7XG4gICAgICAgIGxldCBmaWx0cmVkID0gW107XG4gICAgICAgIGxldCBmaWx0ZXJfZGF0YSA9IExhbXBhLlN0b3JhZ2UuZ2V0KCdvbmxpbmVfZmlsdGVyJywgJ3t9JylcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMocmVzdWx0cy5wbGF5ZXJfbGlua3MucGxheWxpc3QpLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgdHJhbnNsIGluIGV4dHJhY3QpIHtcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IGV4dHJhY3RbdHJhbnNsXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzZWFzb25faWQgaW4gZWxlbWVudC5qc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlcGlzb2RlID0gZWxlbWVudC5qc29uW3NlYXNvbl9pZF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcGlzb2RlLmlkID09IGZpbHRlcl9kYXRhLnNlYXNvbiArIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVwaXNvZGUuZm9sZGVyLmZvckVhY2goZnVuY3Rpb24gKG1lZGlhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lZGlhLnRyYW5zbGF0aW9uID09IGZpbHRlcl9pdGVtcy52b2ljZV9pbmZvW2ZpbHRlcl9kYXRhLnZvaWNlXS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0cmVkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXBpc29kZTogcGFyc2VJbnQobWVkaWEuZXBpc29kZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFzb246IG1lZGlhLnNlYXNvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBtZWRpYS5lcGlzb2RlICsgKG1lZGlhLnRpdGxlID8gJyAtICcgKyBtZWRpYS50aXRsZSA6ICcnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6IG1lZGlhLnF1YWxpdHkgKyAncCAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IG1lZGlhLnRyYW5zbGF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZiAoT2JqZWN0LmtleXMocmVzdWx0cy5wbGF5ZXJfbGlua3MubW92aWUpLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgdHJhbnNsX2lkIGluIGV4dHJhY3QpIHtcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IGV4dHJhY3RbdHJhbnNsX2lkXVxuXG4gICAgICAgICAgICAgICAgZmlsdHJlZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGVsZW1lbnQudHJhbnNsYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6IGVsZW1lbnQucXVhbGl0eSArICdwICcsXG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHlzOiBlbGVtZW50LnF1YWxpdGllcyxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IHRyYW5zbF9pZFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmlsdHJlZFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCU0L7QsdCw0LLQuNGC0Ywg0LLQuNC00LXQvlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGl0ZW1zIFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFwcGVuZChpdGVtcyl7XG4gICAgICAgIGNvbXBvbmVudC5yZXNldCgpXG5cbiAgICAgICAgbGV0IHZpZXdlZCA9IExhbXBhLlN0b3JhZ2UuY2FjaGUoJ29ubGluZV92aWV3JywgNTAwMCwgW10pXG5cbiAgICAgICAgbGV0IGxhc3RfZXBpc29kZSA9IGNvbXBvbmVudC5nZXRMYXN0RXBpc29kZShpdGVtcylcblxuICAgICAgICBpdGVtcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgaWYoZWxlbWVudC5zZWFzb24pIGVsZW1lbnQudGl0bGUgPSAnUycrZWxlbWVudC5zZWFzb24gKyAnIC8gJyArIExhbXBhLkxhbmcudHJhbnNsYXRlKCd0b3JyZW50X3NlcmlhbF9lcGlzb2RlJykgKyAnICcgKyBlbGVtZW50LmVwaXNvZGVcblxuICAgICAgICAgICAgZWxlbWVudC5pbmZvID0gZWxlbWVudC5zZWFzb24gPyAnIC8gJyArIExhbXBhLlV0aWxzLnNob3J0VGV4dChmaWx0ZXJfaXRlbXMudm9pY2VbY2hvaWNlLnZvaWNlXSwgNTApIDogJydcblxuICAgICAgICAgICAgaWYoZWxlbWVudC5zZWFzb24pe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQudHJhbnNsYXRlX2VwaXNvZGVfZW5kID0gbGFzdF9lcGlzb2RlXG4gICAgICAgICAgICAgICAgZWxlbWVudC50cmFuc2xhdGVfdm9pY2UgICAgICAgPSBmaWx0ZXJfaXRlbXMudm9pY2VbY2hvaWNlLnZvaWNlXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaGFzaCA9IExhbXBhLlV0aWxzLmhhc2goZWxlbWVudC5zZWFzb24gPyBbZWxlbWVudC5zZWFzb24sZWxlbWVudC5lcGlzb2RlLG9iamVjdC5tb3ZpZS5vcmlnaW5hbF90aXRsZV0uam9pbignJykgOiBvYmplY3QubW92aWUub3JpZ2luYWxfdGl0bGUpXG4gICAgICAgICAgICBsZXQgdmlldyA9IExhbXBhLlRpbWVsaW5lLnZpZXcoaGFzaClcbiAgICAgICAgICAgIGxldCBpdGVtID0gTGFtcGEuVGVtcGxhdGUuZ2V0KCdvbmxpbmUnLGVsZW1lbnQpXG5cbiAgICAgICAgICAgIGxldCBoYXNoX2ZpbGUgPSBMYW1wYS5VdGlscy5oYXNoKGVsZW1lbnQuc2Vhc29uID8gW2VsZW1lbnQuc2Vhc29uLGVsZW1lbnQuZXBpc29kZSxvYmplY3QubW92aWUub3JpZ2luYWxfdGl0bGUsZmlsdGVyX2l0ZW1zLnZvaWNlW2Nob2ljZS52b2ljZV1dLmpvaW4oJycpIDogb2JqZWN0Lm1vdmllLm9yaWdpbmFsX3RpdGxlICsgZWxlbWVudC50aXRsZSlcblxuICAgICAgICAgICAgaXRlbS5hZGRDbGFzcygndmlkZW8tLXN0cmVhbScpXG5cbiAgICAgICAgICAgIGVsZW1lbnQudGltZWxpbmUgPSB2aWV3XG5cbiAgICAgICAgICAgIGl0ZW0uYXBwZW5kKExhbXBhLlRpbWVsaW5lLnJlbmRlcih2aWV3KSlcblxuICAgICAgICAgICAgaWYoTGFtcGEuVGltZWxpbmUuZGV0YWlscyl7XG4gICAgICAgICAgICAgICAgaXRlbS5maW5kKCcub25saW5lX19xdWFsaXR5JykuYXBwZW5kKExhbXBhLlRpbWVsaW5lLmRldGFpbHModmlldywnIC8gJykpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHZpZXdlZC5pbmRleE9mKGhhc2hfZmlsZSkgIT09IC0xKSBpdGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cInRvcnJlbnQtaXRlbV9fdmlld2VkXCI+JytMYW1wYS5UZW1wbGF0ZS5nZXQoJ2ljb25fc3Rhcicse30sdHJ1ZSkrJzwvZGl2PicpXG5cbiAgICAgICAgICAgIGl0ZW0ub24oJ2hvdmVyOmVudGVyJywoKT0+e1xuICAgICAgICAgICAgICAgIGlmKG9iamVjdC5tb3ZpZS5pZCkgTGFtcGEuRmF2b3JpdGUuYWRkKCdoaXN0b3J5Jywgb2JqZWN0Lm1vdmllLCAxMDApXG5cbiAgICAgICAgICAgICAgICBsZXQgZXh0cmEgPSBnZXRGaWxlKGVsZW1lbnQsIGVsZW1lbnQucXVhbGl0eSlcblxuICAgICAgICAgICAgICAgIGlmKGV4dHJhLmZpbGUpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGxheWxpc3QgPSBbXVxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGV4dHJhLmZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5OiBleHRyYS5xdWFsaXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmU6IHZpZXcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZWxlbWVudC5zZWFzb24gPyBlbGVtZW50LnRpdGxlIDogb2JqZWN0Lm1vdmllLnRpdGxlICsgJyAvICcgKyBlbGVtZW50LnRpdGxlXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50LnNlYXNvbil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5mb3JFYWNoKGVsZW09PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXggPSBnZXRGaWxlKGVsZW0sIGVsZW0ucXVhbGl0eSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZWxlbS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBleC5maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5OiBleC5xdWFsaXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZTogZWxlbS50aW1lbGluZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdC5wdXNoKGZpcnN0KVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYocGxheWxpc3QubGVuZ3RoID4gMSkgZmlyc3QucGxheWxpc3QgPSBwbGF5bGlzdFxuXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLlBsYXllci5wbGF5KGZpcnN0KVxuXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLlBsYXllci5wbGF5bGlzdChwbGF5bGlzdClcblxuICAgICAgICAgICAgICAgICAgICBpZih2aWV3ZWQuaW5kZXhPZihoYXNoX2ZpbGUpID09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdlZC5wdXNoKGhhc2hfZmlsZSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJ0b3JyZW50LWl0ZW1fX3ZpZXdlZFwiPicrTGFtcGEuVGVtcGxhdGUuZ2V0KCdpY29uX3N0YXInLHt9LHRydWUpKyc8L2Rpdj4nKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5TdG9yYWdlLnNldCgnb25saW5lX3ZpZXcnLCB2aWV3ZWQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBMYW1wYS5Ob3R5LnNob3coTGFtcGEuTGFuZy50cmFuc2xhdGUoJ29ubGluZV9ub2xpbmsnKSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGNvbXBvbmVudC5hcHBlbmQoaXRlbSlcblxuICAgICAgICAgICAgY29tcG9uZW50LmNvbnRleHRtZW51KHtcbiAgICAgICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgICAgIHZpZXcsXG4gICAgICAgICAgICAgICAgdmlld2VkLFxuICAgICAgICAgICAgICAgIGhhc2hfZmlsZSxcbiAgICAgICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgICAgIGZpbGU6IChjYWxsKT0+e2NhbGwoZ2V0RmlsZShlbGVtZW50LCBlbGVtZW50LnF1YWxpdHkpKX1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29tcG9uZW50LnN0YXJ0KHRydWUpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmaWxtaXgiLCJpbXBvcnQgdmlkZW9jZG4gZnJvbSAnLi92aWRlb2NkbidcbmltcG9ydCByZXprYSBmcm9tICcuL3JlemthJ1xuaW1wb3J0IGtpbm9iYXNlIGZyb20gJy4va2lub2Jhc2UnXG5pbXBvcnQgY29sbGFwcyBmcm9tICcuL2NvbGxhcHMnXG5pbXBvcnQgY2RubW92aWVzIGZyb20gJy4vY2RubW92aWVzJ1xuaW1wb3J0IGZpbG1peCBmcm9tICcuL2ZpbG1peCdcblxuZnVuY3Rpb24gY29tcG9uZW50KG9iamVjdCl7XG4gICAgbGV0IG5ldHdvcmsgID0gbmV3IExhbXBhLlJlZ3Vlc3QoKVxuICAgIGxldCBzY3JvbGwgICA9IG5ldyBMYW1wYS5TY3JvbGwoe21hc2s6dHJ1ZSxvdmVyOiB0cnVlfSlcbiAgICBsZXQgZmlsZXMgICAgPSBuZXcgTGFtcGEuRmlsZXMob2JqZWN0KVxuICAgIGxldCBmaWx0ZXIgICA9IG5ldyBMYW1wYS5GaWx0ZXIob2JqZWN0KVxuICAgIGxldCBiYWxhbnNlciA9IExhbXBhLlN0b3JhZ2UuZ2V0KCdvbmxpbmVfYmFsYW5zZXInLCAndmlkZW9jZG4nKVxuICAgIGxldCBsYXN0X2JscyA9IExhbXBhLlN0b3JhZ2UuY2FjaGUoJ29ubGluZV9sYXN0X2JhbGFuc2VyJywgMjAwLCB7fSlcblxuICAgIGlmKGxhc3RfYmxzW29iamVjdC5tb3ZpZS5pZF0pe1xuICAgICAgICBiYWxhbnNlciA9IGxhc3RfYmxzW29iamVjdC5tb3ZpZS5pZF1cbiAgICB9XG5cbiAgICB0aGlzLnByb3h5ID0gZnVuY3Rpb24obmFtZSl7XG4gICAgICAgIGxldCBwcm94ID0gTGFtcGEuU3RvcmFnZS5nZXQoJ29ubGluZV9wcm94eV9hbGwnKVxuICAgICAgICBsZXQgbmVlZCA9IExhbXBhLlN0b3JhZ2UuZ2V0KCdvbmxpbmVfcHJveHlfJytuYW1lKVxuXG4gICAgICAgIGlmKG5lZWQpIHByb3ggPSBuZWVkXG5cbiAgICAgICAgaWYocHJveCAmJiBwcm94LnNsaWNlKC0xKSAhPT0gJy8nKXtcbiAgICAgICAgICAgIHByb3ggKz0gJy8nXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJveFxuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZXMgPSB7XG4gICAgICAgIHZpZGVvY2RuOiBuZXcgdmlkZW9jZG4odGhpcywgb2JqZWN0KSxcbiAgICAgICAgcmV6a2E6IG5ldyByZXprYSh0aGlzLCBvYmplY3QpLFxuICAgICAgICBraW5vYmFzZTogbmV3IGtpbm9iYXNlKHRoaXMsIG9iamVjdCksXG4gICAgICAgIGNvbGxhcHM6IG5ldyBjb2xsYXBzKHRoaXMsIG9iamVjdCksXG4gICAgICAgIGNkbm1vdmllczogbmV3IGNkbm1vdmllcyh0aGlzLCBvYmplY3QpLFxuICAgICAgICBmaWxtaXg6IG5ldyBmaWxtaXgodGhpcywgb2JqZWN0KVxuICAgIH1cblxuICAgIGxldCBsYXN0XG4gICAgbGV0IGxhc3RfZmlsdGVyXG4gICAgbGV0IGV4dGVuZGVkXG4gICAgbGV0IHNlbGVjdGVkX2lkXG5cbiAgICBsZXQgZmlsdGVyX3RyYW5zbGF0ZSA9IHtcbiAgICAgICAgc2Vhc29uOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndG9ycmVudF9zZXJpYWxfc2Vhc29uJyksXG4gICAgICAgIHZvaWNlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndG9ycmVudF9wYXJzZXJfdm9pY2UnKSxcbiAgICAgICAgc291cmNlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnc2V0dGluZ3NfcmVzdF9zb3VyY2UnKVxuICAgIH1cblxuICAgIGxldCBmaWx0ZXJfc291cmNlcyA9IFsndmlkZW9jZG4nLCdyZXprYScsJ2tpbm9iYXNlJywnY29sbGFwcycsJ2ZpbG1peCddXG4gICAgbGV0IGlnbm9yZV9zb3VyY2VzID0gWydmaWxtaXgnLCdraW5vYmFzZSddXG4gICAgbGV0IGtpcG9za19zb3VyY2VzID0gWydyZXprYScsJ2NvbGxhcHMnXVxuXG4gICAgLy8g0YjQsNC70L7QstC70LjQstGL0LUg0YDRg9GH0LrQuFxuICAgIGlmKGZpbHRlcl9zb3VyY2VzLmluZGV4T2YoYmFsYW5zZXIpID09IC0xKXtcbiAgICAgICAgYmFsYW5zZXIgPSAndmlkZW9jZG4nXG5cbiAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoJ29ubGluZV9iYWxhbnNlcicsICd2aWRlb2NkbicpXG4gICAgfVxuXG4gICAgc2Nyb2xsLmJvZHkoKS5hZGRDbGFzcygndG9ycmVudC1saXN0JylcblxuICAgIGZ1bmN0aW9uIG1pbnVzKCl7XG4gICAgICAgIHNjcm9sbC5taW51cyh3aW5kb3cuaW5uZXJXaWR0aCA+IDU4MCA/IGZhbHNlIDogZmlsZXMucmVuZGVyKCkuZmluZCgnLmZpbGVzX19sZWZ0JykpXG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsbWludXMsZmFsc2UpXG5cbiAgICBtaW51cygpXG5cbiAgICAvKipcbiAgICAgKiDQn9C+0LTQs9C+0YLQvtCy0LrQsFxuICAgICAqL1xuICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5hY3Rpdml0eS5sb2FkZXIodHJ1ZSlcblxuICAgICAgICBmaWx0ZXIub25TZWFyY2ggPSAodmFsdWUpPT57XG4gICAgICAgICAgICBMYW1wYS5BY3Rpdml0eS5yZXBsYWNlKHtcbiAgICAgICAgICAgICAgICBzZWFyY2g6IHZhbHVlLFxuICAgICAgICAgICAgICAgIGNsYXJpZmljYXRpb246IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBmaWx0ZXIub25CYWNrID0gKCk9PntcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKVxuICAgICAgICB9XG5cbiAgICAgICAgZmlsdGVyLnJlbmRlcigpLmZpbmQoJy5zZWxlY3RvcicpLm9uKCdob3Zlcjpmb2N1cycsKGUpPT57XG4gICAgICAgICAgICBsYXN0X2ZpbHRlciA9IGUudGFyZ2V0XG4gICAgICAgIH0pXG5cbiAgICAgICAgZmlsdGVyLm9uU2VsZWN0ID0gKHR5cGUsIGEsIGIpPT57XG4gICAgICAgICAgICBpZih0eXBlID09ICdmaWx0ZXInKXtcbiAgICAgICAgICAgICAgICBpZihhLnJlc2V0KXtcbiAgICAgICAgICAgICAgICAgICAgaWYoZXh0ZW5kZWQpIHNvdXJjZXNbYmFsYW5zZXJdLnJlc2V0KClcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB0aGlzLnN0YXJ0KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlc1tiYWxhbnNlcl0uZmlsdGVyKHR5cGUsIGEsIGIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0eXBlID09ICdzb3J0Jyl7XG4gICAgICAgICAgICAgICAgYmFsYW5zZXIgPSBhLnNvdXJjZVxuXG4gICAgICAgICAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoJ29ubGluZV9iYWxhbnNlcicsIGJhbGFuc2VyKVxuXG4gICAgICAgICAgICAgICAgbGFzdF9ibHNbb2JqZWN0Lm1vdmllLmlkXSA9IGJhbGFuc2VyXG5cbiAgICAgICAgICAgICAgICBMYW1wYS5TdG9yYWdlLnNldCgnb25saW5lX2xhc3RfYmFsYW5zZXInLCBsYXN0X2JscylcblxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoKClcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoTGFtcGEuU2VsZWN0LmNsb3NlLDEwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZmlsdGVyLnJlbmRlcigpLmZpbmQoJy5maWx0ZXItLXNvcnQgc3BhbicpLnRleHQoTGFtcGEuTGFuZy50cmFuc2xhdGUoJ29ubGluZV9iYWxhbnNlcicpKVxuXG4gICAgICAgIGZpbHRlci5yZW5kZXIoKVxuXG4gICAgICAgIGZpbGVzLmFwcGVuZChzY3JvbGwucmVuZGVyKCkpXG5cbiAgICAgICAgc2Nyb2xsLmFwcGVuZChmaWx0ZXIucmVuZGVyKCkpXG5cbiAgICAgICAgdGhpcy5zZWFyY2goKVxuXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcigpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J3QsNGH0LDRgtGMINC/0L7QuNGB0LpcbiAgICAgKi9cbiAgICB0aGlzLnNlYXJjaCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuYWN0aXZpdHkubG9hZGVyKHRydWUpXG5cbiAgICAgICAgdGhpcy5maWx0ZXIoe1xuICAgICAgICAgICAgc291cmNlOiBmaWx0ZXJfc291cmNlc1xuICAgICAgICB9LHtzb3VyY2U6IDB9KVxuXG4gICAgICAgIHRoaXMucmVzZXQoKVxuXG4gICAgICAgIHRoaXMuZmluZCgpXG4gICAgfVxuXG4gICAgdGhpcy5maW5kID0gZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0IHVybCAgID0gdGhpcy5wcm94eSgndmlkZW9jZG4nKSArICdodHRwOi8vY2RuLnN2ZXRhY2RuLmluL2FwaS9zaG9ydCdcbiAgICAgICAgbGV0IHF1ZXJ5ID0gb2JqZWN0LnNlYXJjaFxuXG4gICAgICAgIHVybCA9IExhbXBhLlV0aWxzLmFkZFVybENvbXBvbmVudCh1cmwsJ2FwaV90b2tlbj0zaTQwRzVUU0VDbUxGNzdvQXFuRWdieDYxWldhT1lhRScpXG4gICAgICAgIFxuICAgICAgICBjb25zdCBkaXNwbGF5ID0gKGpzb24pPT57XG4gICAgICAgICAgICBpZihvYmplY3QubW92aWUuaW1kYl9pZCl7XG4gICAgICAgICAgICAgICAgbGV0IGltZGIgPSBqc29uLmRhdGEuZmlsdGVyKGVsZW09PmVsZW0uaW1kYl9pZCA9PSBvYmplY3QubW92aWUuaW1kYl9pZClcblxuICAgICAgICAgICAgICAgIGlmKGltZGIubGVuZ3RoKSBqc29uLmRhdGEgPSBpbWRiXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGpzb24uZGF0YSAmJiBqc29uLmRhdGEubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBpZihqc29uLmRhdGEubGVuZ3RoID09IDEgfHwgb2JqZWN0LmNsYXJpZmljYXRpb24pe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4dGVuZENob2ljZSgpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoYmFsYW5zZXIgPT0gJ3ZpZGVvY2RuJyB8fCBiYWxhbnNlciA9PSAnZmlsbWl4J3x8IGJhbGFuc2VyID09ICdjZG5tb3ZpZXMnKSBzb3VyY2VzW2JhbGFuc2VyXS5zZWFyY2gob2JqZWN0LCBqc29uLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgIGVsc2Ugc291cmNlc1tiYWxhbnNlcl0uc2VhcmNoKG9iamVjdCwganNvbi5kYXRhWzBdLmtwX2lkIHx8IGpzb24uZGF0YVswXS5maWxtSWQsIGpzb24uZGF0YSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaW1pbGFycyhqc29uLmRhdGEpXG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nKGZhbHNlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgdGhpcy5lbXB0eUZvclF1ZXJ5KHF1ZXJ5KVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGlsbG93ID0gKGEsIGMpPT57XG4gICAgICAgICAgICBuZXR3b3JrLnRpbWVvdXQoMTAwMCoxNSlcblxuICAgICAgICAgICAgaWYoYmFsYW5zZXIgIT09ICd2aWRlb2Nkbicpe1xuICAgICAgICAgICAgICAgIG5ldHdvcmsubmF0aXZlKCdodHRwczovL2tpbm9wb2lza2FwaXVub2ZmaWNpYWwudGVjaC9hcGkvdjIuMS9maWxtcy9zZWFyY2gtYnkta2V5d29yZD9rZXl3b3JkPScrZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KSwoanNvbik9PntcbiAgICAgICAgICAgICAgICAgICAganNvbi5kYXRhID0ganNvbi5maWxtc1xuXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXkoanNvbilcbiAgICAgICAgICAgICAgICB9LChhLCBjKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5KG5ldHdvcmsuZXJyb3JEZWNvZGUoYSxjKSlcbiAgICAgICAgICAgICAgICB9LGZhbHNlLHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1gtQVBJLUtFWSc6ICcyZDU1YWRmZC0wMTlkLTQ1NjctYmJmNy02N2Q1MDNmNjFiNWEnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmVtcHR5KG5ldHdvcmsuZXJyb3JEZWNvZGUoYSxjKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxldGdvID0gKGltZGJfaWQpPT57XG4gICAgICAgICAgICBsZXQgdXJsX2VuZCA9IExhbXBhLlV0aWxzLmFkZFVybENvbXBvbmVudCh1cmwsIGltZGJfaWQgPyAnaW1kYl9pZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGltZGJfaWQpIDogJ3RpdGxlPScrZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KSlcblxuICAgICAgICAgICAgbmV0d29yay50aW1lb3V0KDEwMDAqMTUpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG5ldHdvcmsubmF0aXZlKHVybF9lbmQsKGpzb24pPT57XG4gICAgICAgICAgICAgICAgaWYoanNvbi5kYXRhICYmIGpzb24uZGF0YS5sZW5ndGgpIGRpc3BsYXkoanNvbilcbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBuZXR3b3JrLm5hdGl2ZShMYW1wYS5VdGlscy5hZGRVcmxDb21wb25lbnQodXJsLCAndGl0bGU9JytlbmNvZGVVUklDb21wb25lbnQocXVlcnkpKSxkaXNwbGF5LmJpbmQodGhpcykscGlsbG93LmJpbmQodGhpcykpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxwaWxsb3cuYmluZCh0aGlzKSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbmV0d29yay5jbGVhcigpXG5cbiAgICAgICAgbmV0d29yay50aW1lb3V0KDEwMDAqMTUpXG5cbiAgICAgICAgaWYoaWdub3JlX3NvdXJjZXMuaW5kZXhPZihiYWxhbnNlcikgPj0gMCl7XG4gICAgICAgICAgICBkaXNwbGF5KHtcbiAgICAgICAgICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogb2JqZWN0Lm1vdmllLnRpdGxlIHx8IG9iamVjdC5tb3ZpZS5uYW1lLFxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYob2JqZWN0Lm1vdmllLmtpbm9wb2lza19pZCAmJiBraXBvc2tfc291cmNlcy5pbmRleE9mKGJhbGFuc2VyKSA+PSAwKXtcbiAgICAgICAgICAgIHNvdXJjZXNbYmFsYW5zZXJdLnNlYXJjaChvYmplY3QsIG9iamVjdC5tb3ZpZS5raW5vcG9pc2tfaWQpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihvYmplY3QubW92aWUuaW1kYl9pZCl7XG4gICAgICAgICAgICBsZXRnbyhvYmplY3QubW92aWUuaW1kYl9pZClcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZihvYmplY3QubW92aWUuc291cmNlID09ICd0bWRiJyB8fCBvYmplY3QubW92aWUuc291cmNlID09ICdjdWInKXtcbiAgICAgICAgICAgIGxldCB0bWRidXJsID0gKG9iamVjdC5tb3ZpZS5uYW1lID8gJ3R2JyA6ICdtb3ZpZScpICsgJy8nICsgb2JqZWN0Lm1vdmllLmlkICsgJy9leHRlcm5hbF9pZHM/YXBpX2tleT00ZWYwZDczNTVkOWZmYjUxNTFlOTg3NzY0NzA4Y2U5NiZsYW5ndWFnZT1ydSdcbiAgICAgICAgICAgIGxldCBiYXNldXJsID0gdHlwZW9mIExhbXBhLlRNREIgIT09ICd1bmRlZmluZWQnID8gTGFtcGEuVE1EQi5hcGkodG1kYnVybCkgOiAnaHR0cDovL2FwaS50aGVtb3ZpZWRiLm9yZycgKyB0bWRidXJsXG5cbiAgICAgICAgICAgIG5ldHdvcmsubmF0aXZlKGJhc2V1cmwsIGZ1bmN0aW9uICh0dGlkKSB7XG4gICAgICAgICAgICAgICAgbGV0Z28odHRpZC5pbWRiX2lkKVxuICAgICAgICAgICAgfSwoYSwgYyk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmVtcHR5KG5ldHdvcmsuZXJyb3JEZWNvZGUoYSxjKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGxldGdvKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZXh0ZW5kQ2hvaWNlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0IGRhdGEgPSBMYW1wYS5TdG9yYWdlLmNhY2hlKCdvbmxpbmVfY2hvaWNlXycrYmFsYW5zZXIsIDUwMCwge30pXG4gICAgICAgIGxldCBzYXZlID0gZGF0YVtzZWxlY3RlZF9pZCB8fCBvYmplY3QubW92aWUuaWRdIHx8IHt9XG5cbiAgICAgICAgZXh0ZW5kZWQgPSB0cnVlXG5cbiAgICAgICAgc291cmNlc1tiYWxhbnNlcl0uZXh0ZW5kQ2hvaWNlKHNhdmUpXG4gICAgfVxuXG4gICAgdGhpcy5zYXZlQ2hvaWNlID0gZnVuY3Rpb24oY2hvaWNlKXtcbiAgICAgICAgbGV0IGRhdGEgPSBMYW1wYS5TdG9yYWdlLmNhY2hlKCdvbmxpbmVfY2hvaWNlXycrYmFsYW5zZXIsIDUwMCwge30pXG5cbiAgICAgICAgICAgIGRhdGFbc2VsZWN0ZWRfaWQgfHwgb2JqZWN0Lm1vdmllLmlkXSA9IGNob2ljZVxuXG4gICAgICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdvbmxpbmVfY2hvaWNlXycrYmFsYW5zZXIsIGRhdGEpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JXRgdGC0Ywg0L/QvtGF0L7QttC40LUg0LrQsNGA0YLQvtGH0LrQuFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBqc29uIFxuICAgICAqL1xuICAgICB0aGlzLnNpbWlsYXJzID0gZnVuY3Rpb24oanNvbil7XG4gICAgICAgIGpzb24uZm9yRWFjaChlbGVtPT57XG4gICAgICAgICAgICBsZXQgeWVhciA9IGVsZW0uc3RhcnRfZGF0ZSB8fCBlbGVtLnllYXIgfHwgJydcblxuICAgICAgICAgICAgZWxlbS50aXRsZSAgID0gZWxlbS50aXRsZSB8fCBlbGVtLnJ1X3RpdGxlIHx8IGVsZW0uZW5fdGl0bGUgfHwgZWxlbS5uYW1lUnUgfHwgZWxlbS5uYW1lRW5cbiAgICAgICAgICAgIGVsZW0ucXVhbGl0eSA9IHllYXIgPyAoeWVhciArICcnKS5zbGljZSgwLDQpIDogJy0tLS0nXG4gICAgICAgICAgICBlbGVtLmluZm8gICAgPSAnJ1xuXG4gICAgICAgICAgICBsZXQgaXRlbSA9IExhbXBhLlRlbXBsYXRlLmdldCgnb25saW5lX2ZvbGRlcicsZWxlbSlcblxuICAgICAgICAgICAgaXRlbS5vbignaG92ZXI6ZW50ZXInLCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpdml0eS5sb2FkZXIodHJ1ZSlcblxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKVxuXG4gICAgICAgICAgICAgICAgb2JqZWN0LnNlYXJjaF9kYXRlID0geWVhclxuXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRfaWQgPSBlbGVtLmlkXG5cbiAgICAgICAgICAgICAgICB0aGlzLmV4dGVuZENob2ljZSgpXG5cbiAgICAgICAgICAgICAgICBpZihiYWxhbnNlciA9PSAndmlkZW9jZG4nIHx8IGJhbGFuc2VyID09ICdmaWxtaXgnIHx8IGJhbGFuc2VyID09ICdjZG5tb3ZpZXMnKSBzb3VyY2VzW2JhbGFuc2VyXS5zZWFyY2gob2JqZWN0LCBbZWxlbV0pXG4gICAgICAgICAgICAgICAgZWxzZSBzb3VyY2VzW2JhbGFuc2VyXS5zZWFyY2gob2JqZWN0LCBlbGVtLmtwX2lkIHx8IGVsZW0uZmlsbUlkLCBbZWxlbV0pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB0aGlzLmFwcGVuZChpdGVtKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCe0YfQuNGB0YLQuNGC0Ywg0YHQv9C40YHQvtC6INGE0LDQudC70L7QslxuICAgICAqL1xuICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbigpe1xuICAgICAgICBsYXN0ID0gZmFsc2VcblxuICAgICAgICBzY3JvbGwucmVuZGVyKCkuZmluZCgnLmVtcHR5JykucmVtb3ZlKClcblxuICAgICAgICBmaWx0ZXIucmVuZGVyKCkuZGV0YWNoKClcblxuICAgICAgICBzY3JvbGwuY2xlYXIoKVxuXG4gICAgICAgIHNjcm9sbC5hcHBlbmQoZmlsdGVyLnJlbmRlcigpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCX0LDQs9GA0YPQt9C60LBcbiAgICAgKi9cbiAgICB0aGlzLmxvYWRpbmcgPSBmdW5jdGlvbihzdGF0dXMpe1xuICAgICAgICBpZihzdGF0dXMpIHRoaXMuYWN0aXZpdHkubG9hZGVyKHRydWUpXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5LmxvYWRlcihmYWxzZSlcblxuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eS50b2dnbGUoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J/QvtGB0YLRgNC+0LjRgtGMINGE0LjQu9GM0YLRgFxuICAgICAqL1xuICAgIHRoaXMuZmlsdGVyID0gZnVuY3Rpb24oZmlsdGVyX2l0ZW1zLCBjaG9pY2Upe1xuICAgICAgICBsZXQgc2VsZWN0ID0gW11cblxuICAgICAgICBsZXQgYWRkID0gKHR5cGUsIHRpdGxlKT0+e1xuICAgICAgICAgICAgbGV0IG5lZWQgICAgID0gTGFtcGEuU3RvcmFnZS5nZXQoJ29ubGluZV9maWx0ZXInLCd7fScpXG4gICAgICAgICAgICBsZXQgaXRlbXMgICAgPSBmaWx0ZXJfaXRlbXNbdHlwZV1cbiAgICAgICAgICAgIGxldCBzdWJpdGVtcyA9IFtdXG4gICAgICAgICAgICBsZXQgdmFsdWUgICAgPSBuZWVkW3R5cGVdXG5cbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goKG5hbWUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBzdWJpdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiB2YWx1ZSA9PSBpLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogaVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBzZWxlY3QucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgICAgIHN1YnRpdGxlOiBpdGVtc1t2YWx1ZV0sXG4gICAgICAgICAgICAgICAgaXRlbXM6IHN1Yml0ZW1zLFxuICAgICAgICAgICAgICAgIHN0eXBlOiB0eXBlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgZmlsdGVyX2l0ZW1zLnNvdXJjZSA9IGZpbHRlcl9zb3VyY2VzXG5cbiAgICAgICAgY2hvaWNlLnNvdXJjZSA9IGZpbHRlcl9zb3VyY2VzLmluZGV4T2YoYmFsYW5zZXIpXG5cbiAgICAgICAgc2VsZWN0LnB1c2goe1xuICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCd0b3JyZW50X3BhcnNlcl9yZXNldCcpLFxuICAgICAgICAgICAgcmVzZXQ6IHRydWVcbiAgICAgICAgfSlcblxuICAgICAgICBMYW1wYS5TdG9yYWdlLnNldCgnb25saW5lX2ZpbHRlcicsIGNob2ljZSlcblxuICAgICAgICBpZihmaWx0ZXJfaXRlbXMudm9pY2UgJiYgZmlsdGVyX2l0ZW1zLnZvaWNlLmxlbmd0aCkgYWRkKCd2b2ljZScsTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RvcnJlbnRfcGFyc2VyX3ZvaWNlJykpXG5cbiAgICAgICAgaWYoZmlsdGVyX2l0ZW1zLnNlYXNvbiAmJiBmaWx0ZXJfaXRlbXMuc2Vhc29uLmxlbmd0aCkgYWRkKCdzZWFzb24nLExhbXBhLkxhbmcudHJhbnNsYXRlKCd0b3JyZW50X3NlcmlhbF9zZWFzb24nKSlcblxuICAgICAgICBmaWx0ZXIuc2V0KCdmaWx0ZXInLCBzZWxlY3QpIFxuICAgICAgICBmaWx0ZXIuc2V0KCdzb3J0JywgZmlsdGVyX3NvdXJjZXMubWFwKGU9PntyZXR1cm4ge3RpdGxlOmUsc291cmNlOmUsc2VsZWN0ZWQ6ZT09YmFsYW5zZXJ9fSkpIFxuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQoZmlsdGVyX2l0ZW1zKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCX0LDQutGA0YvRgtGMINGE0LjQu9GM0YLRgFxuICAgICAqL1xuICAgIHRoaXMuY2xvc2VGaWx0ZXIgPSBmdW5jdGlvbigpe1xuICAgICAgICBpZigkKCdib2R5JykuaGFzQ2xhc3MoJ3NlbGVjdGJveC0tb3BlbicpKSBMYW1wYS5TZWxlY3QuY2xvc2UoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0L7QutCw0LfQsNGC0Ywg0YfRgtC+INCy0YvQsdGA0LDQvdC+INCyINGE0LjQu9GM0YLRgNC1XG4gICAgICovXG4gICAgdGhpcy5zZWxlY3RlZCA9IGZ1bmN0aW9uKGZpbHRlcl9pdGVtcyl7XG4gICAgICAgIGxldCBuZWVkICAgPSBMYW1wYS5TdG9yYWdlLmdldCgnb25saW5lX2ZpbHRlcicsJ3t9JyksXG4gICAgICAgICAgICBzZWxlY3QgPSBbXVxuXG4gICAgICAgIGZvcihsZXQgaSBpbiBuZWVkKXtcbiAgICAgICAgICAgIGlmKGZpbHRlcl9pdGVtc1tpXSAmJiBmaWx0ZXJfaXRlbXNbaV0ubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBpZihpID09ICd2b2ljZScpe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3QucHVzaChmaWx0ZXJfdHJhbnNsYXRlW2ldICsgJzogJyArIGZpbHRlcl9pdGVtc1tpXVtuZWVkW2ldXSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihpICE9PSAnc291cmNlJyl7XG4gICAgICAgICAgICAgICAgICAgIGlmKGZpbHRlcl9pdGVtcy5zZWFzb24ubGVuZ3RoID49IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnB1c2goZmlsdGVyX3RyYW5zbGF0ZS5zZWFzb24gKyAnOiAnICsgZmlsdGVyX2l0ZW1zW2ldW25lZWRbaV1dKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZmlsdGVyLmNob3NlbignZmlsdGVyJywgc2VsZWN0KVxuICAgICAgICBmaWx0ZXIuY2hvc2VuKCdzb3J0JywgW2JhbGFuc2VyXSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQlNC+0LHQsNCy0LjRgtGMINGE0LDQudC7XG4gICAgICovXG4gICAgdGhpcy5hcHBlbmQgPSBmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgaXRlbS5vbignaG92ZXI6Zm9jdXMnLChlKT0+e1xuICAgICAgICAgICAgbGFzdCA9IGUudGFyZ2V0XG5cbiAgICAgICAgICAgIHNjcm9sbC51cGRhdGUoJChlLnRhcmdldCksdHJ1ZSlcbiAgICAgICAgfSlcblxuICAgICAgICBzY3JvbGwuYXBwZW5kKGl0ZW0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JzQtdC90Y5cbiAgICAgKi9cbiAgICB0aGlzLmNvbnRleHRtZW51ID0gZnVuY3Rpb24ocGFyYW1zKXtcbiAgICAgICAgcGFyYW1zLml0ZW0ub24oJ2hvdmVyOmxvbmcnLCgpPT57XG4gICAgICAgICAgICBmdW5jdGlvbiBzaG93KGV4dHJhKXtcbiAgICAgICAgICAgICAgICBsZXQgZW5hYmxlZCA9IExhbXBhLkNvbnRyb2xsZXIuZW5hYmxlZCgpLm5hbWVcblxuICAgICAgICAgICAgICAgIGxldCBtZW51ID0gW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RvcnJlbnRfcGFyc2VyX2xhYmVsX3RpdGxlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndG9ycmVudF9wYXJzZXJfbGFiZWxfY2FuY2VsX3RpdGxlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhcm1hcms6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCd0aW1lX3Jlc2V0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lY2xlYXI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cblxuICAgICAgICAgICAgICAgIGlmKExhbXBhLlBsYXRmb3JtLmlzKCd3ZWJvcycpKXtcbiAgICAgICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgncGxheWVyX2xhdWNoJykgKyAnIC0gV2Vib3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyOiAnd2Vib3MnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKExhbXBhLlBsYXRmb3JtLmlzKCdhbmRyb2lkJykpe1xuICAgICAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdwbGF5ZXJfbGF1Y2gnKSArICcgLSBBbmRyb2lkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjogJ2FuZHJvaWQnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgncGxheWVyX2xhdWNoJykgKyAnIC0gTGFtcGEnLFxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXI6ICdsYW1wYSdcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgaWYoZXh0cmEpe1xuICAgICAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdjb3B5X2xpbmsnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcHlsaW5rOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoTGFtcGEuQWNjb3VudC53b3JraW5nKCkgJiYgcGFyYW1zLmVsZW1lbnQgJiYgdHlwZW9mIHBhcmFtcy5lbGVtZW50LnNlYXNvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgTGFtcGEuQWNjb3VudC5zdWJzY3JpYmVUb1RyYW5zbGF0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnb25saW5lX3ZvaWNlX3N1YnNjcmliZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgTGFtcGEuU2VsZWN0LnNob3coe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RpdGxlX2FjdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICBpdGVtczogbWVudSxcbiAgICAgICAgICAgICAgICAgICAgb25CYWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoZW5hYmxlZClcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6IChhKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYS5jbGVhcm1hcmspe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLkFycmF5cy5yZW1vdmUocGFyYW1zLnZpZXdlZCwgcGFyYW1zLmhhc2hfZmlsZSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdvbmxpbmVfdmlldycsIHBhcmFtcy52aWV3ZWQpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMuaXRlbS5maW5kKCcudG9ycmVudC1pdGVtX192aWV3ZWQnKS5yZW1vdmUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhLm1hcmspe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBhcmFtcy52aWV3ZWQuaW5kZXhPZihwYXJhbXMuaGFzaF9maWxlKSA9PSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy52aWV3ZWQucHVzaChwYXJhbXMuaGFzaF9maWxlKVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLml0ZW0uYXBwZW5kKCc8ZGl2IGNsYXNzPVwidG9ycmVudC1pdGVtX192aWV3ZWRcIj4nK0xhbXBhLlRlbXBsYXRlLmdldCgnaWNvbl9zdGFyJyx7fSx0cnVlKSsnPC9kaXY+JylcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdvbmxpbmVfdmlldycsIHBhcmFtcy52aWV3ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhLnRpbWVjbGVhcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnZpZXcucGVyY2VudCAgPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnZpZXcudGltZSAgICAgPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnZpZXcuZHVyYXRpb24gPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuVGltZWxpbmUudXBkYXRlKHBhcmFtcy52aWV3KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZShlbmFibGVkKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhLnBsYXllcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuUGxheWVyLnJ1bmFzKGEucGxheWVyKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLml0ZW0udHJpZ2dlcignaG92ZXI6ZW50ZXInKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhLmNvcHlsaW5rKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihleHRyYS5xdWFsaXR5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHF1YWwgPSBbXVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSBpbiBleHRyYS5xdWFsaXR5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YWwucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogZXh0cmEucXVhbGl0eVtpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLlNlbGVjdC5zaG93KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn0KHRgdGL0LvQutC4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBxdWFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25CYWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKGVuYWJsZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6IChiKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLlV0aWxzLmNvcHlUZXh0VG9DbGlwYm9hcmQoYi5maWxlLCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLk5vdHkuc2hvdyhMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnY29weV9zZWN1c2VzJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Ob3R5LnNob3coTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2NvcHlfZXJyb3InKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5VdGlscy5jb3B5VGV4dFRvQ2xpcGJvYXJkKGV4dHJhLmZpbGUsKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLk5vdHkuc2hvdyhMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnY29weV9zZWN1c2VzJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLk5vdHkuc2hvdyhMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnY29weV9lcnJvcicpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYS5zdWJzY3JpYmUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLkFjY291bnQuc3Vic2NyaWJlVG9UcmFuc2xhdGlvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQ6IG9iamVjdC5tb3ZpZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vhc29uOiBwYXJhbXMuZWxlbWVudC5zZWFzb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVwaXNvZGU6IHBhcmFtcy5lbGVtZW50LnRyYW5zbGF0ZV9lcGlzb2RlX2VuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pY2U6IHBhcmFtcy5lbGVtZW50LnRyYW5zbGF0ZV92b2ljZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuTm90eS5zaG93KExhbXBhLkxhbmcudHJhbnNsYXRlKCdvbmxpbmVfdm9pY2Vfc3VjY2VzcycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuTm90eS5zaG93KExhbXBhLkxhbmcudHJhbnNsYXRlKCdvbmxpbmVfdm9pY2VfZXJyb3InKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGFyYW1zLmZpbGUoc2hvdylcbiAgICAgICAgfSkub24oJ2hvdmVyOmZvY3VzJywoKT0+e1xuICAgICAgICAgICAgaWYoTGFtcGEuSGVscGVyKSBMYW1wYS5IZWxwZXIuc2hvdygnb25saW5lX2ZpbGUnLExhbXBhLkxhbmcudHJhbnNsYXRlKCdoZWxwZXJfb25saW5lX2ZpbGUnKSxwYXJhbXMuaXRlbSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9C+0LrQsNC30LDRgtGMINC/0YPRgdGC0L7QuSDRgNC10LfRg9C70YzRgtCw0YJcbiAgICAgKi9cbiAgICB0aGlzLmVtcHR5ID0gZnVuY3Rpb24obXNnKXtcbiAgICAgICAgbGV0IGVtcHR5ID0gTGFtcGEuVGVtcGxhdGUuZ2V0KCdsaXN0X2VtcHR5JylcblxuICAgICAgICBpZihtc2cpIGVtcHR5LmZpbmQoJy5lbXB0eV9fZGVzY3InKS50ZXh0KG1zZylcblxuICAgICAgICBzY3JvbGwuYXBwZW5kKGVtcHR5KVxuXG4gICAgICAgIHRoaXMubG9hZGluZyhmYWxzZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9C+0LrQsNC30LDRgtGMINC/0YPRgdGC0L7QuSDRgNC10LfRg9C70YzRgtCw0YIg0L/QviDQutC70Y7Rh9C10LLQvtC80YMg0YHQu9C+0LLRg1xuICAgICAqL1xuICAgIHRoaXMuZW1wdHlGb3JRdWVyeSA9IGZ1bmN0aW9uKHF1ZXJ5KXtcbiAgICAgICAgdGhpcy5lbXB0eShMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnb25saW5lX3F1ZXJ5X3N0YXJ0JykgKyAnICgnICsgcXVlcnkgKyAnKSAnICsgTGFtcGEuTGFuZy50cmFuc2xhdGUoJ29ubGluZV9xdWVyeV9lbmQnKSlcbiAgICB9XG5cbiAgICB0aGlzLmdldExhc3RFcGlzb2RlID0gZnVuY3Rpb24oaXRlbXMpe1xuICAgICAgICBsZXQgbGFzdF9lcGlzb2RlID0gMFxuXG4gICAgICAgIGl0ZW1zLmZvckVhY2goZT0+e1xuICAgICAgICAgICAgaWYodHlwZW9mIGUuZXBpc29kZSAhPT0gJ3VuZGVmaW5lZCcpIGxhc3RfZXBpc29kZSA9IE1hdGgubWF4KGxhc3RfZXBpc29kZSwgcGFyc2VJbnQoZS5lcGlzb2RlKSlcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gbGFzdF9lcGlzb2RlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J3QsNGH0LDRgtGMINC90LDQstC40LPQsNGG0LjRjiDQv9C+INGE0LDQudC70LDQvFxuICAgICAqL1xuICAgIHRoaXMuc3RhcnQgPSBmdW5jdGlvbihmaXJzdF9zZWxlY3Qpe1xuICAgICAgICBpZihMYW1wYS5BY3Rpdml0eS5hY3RpdmUoKS5hY3Rpdml0eSAhPT0gdGhpcy5hY3Rpdml0eSkgcmV0dXJuIC8v0L7QsdGP0LfQsNGC0LXQu9GM0L3Qviwg0LjQvdCw0YfQtSDQvdCw0LHQu9GO0LTQsNC10YLRgdGPINCx0LDQsywg0LDQutGC0LjQstC90L7RgdGC0Ywg0YHQvtC30LTQsNC10YLRgdGPINC90L4g0L3QtSDRgdGC0LDRgNGC0YPQtdGCLCDQsiDRgtC+INCy0YDQtdC80Y8g0LrQsNC6INC60L7QvNC/0L7QvdC10L3RgiDQt9Cw0LPRgNGD0LbQsNC10YLRgdGPINC4INGB0YLQsNGA0YLRg9C10YIg0YHQsNC80L7Qs9C+INGB0LXQsdGPLlxuXG4gICAgICAgIGlmKGZpcnN0X3NlbGVjdCl7XG4gICAgICAgICAgICBsZXQgbGFzdF92aWV3cyA9IHNjcm9sbC5yZW5kZXIoKS5maW5kKCcuc2VsZWN0b3Iub25saW5lJykuZmluZCgnLnRvcnJlbnQtaXRlbV9fdmlld2VkJykucGFyZW50KCkubGFzdCgpXG5cbiAgICAgICAgICAgIGlmIChvYmplY3QubW92aWUubnVtYmVyX29mX3NlYXNvbnMgJiYgbGFzdF92aWV3cy5sZW5ndGgpIGxhc3QgPSBsYXN0X3ZpZXdzLmVxKDApWzBdXG4gICAgICAgICAgICBlbHNlIGxhc3QgPSBzY3JvbGwucmVuZGVyKCkuZmluZCgnLnNlbGVjdG9yJykuZXEoMylbMF1cbiAgICAgICAgfVxuXG4gICAgICAgIExhbXBhLkJhY2tncm91bmQuaW1tZWRpYXRlbHkoTGFtcGEuVXRpbHMuY2FyZEltZ0JhY2tncm91bmQob2JqZWN0Lm1vdmllKSlcblxuICAgICAgICBMYW1wYS5Db250cm9sbGVyLmFkZCgnY29udGVudCcse1xuICAgICAgICAgICAgdG9nZ2xlOiAoKT0+e1xuICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuY29sbGVjdGlvblNldChzY3JvbGwucmVuZGVyKCksZmlsZXMucmVuZGVyKCkpXG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jb2xsZWN0aW9uRm9jdXMobGFzdCB8fCBmYWxzZSxzY3JvbGwucmVuZGVyKCkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXA6ICgpPT57XG4gICAgICAgICAgICAgICAgaWYoTmF2aWdhdG9yLmNhbm1vdmUoJ3VwJykpe1xuICAgICAgICAgICAgICAgICAgICBpZihzY3JvbGwucmVuZGVyKCkuZmluZCgnLnNlbGVjdG9yJykuc2xpY2UoMykuaW5kZXgobGFzdCkgPT0gMCAmJiBsYXN0X2ZpbHRlcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLmNvbGxlY3Rpb25Gb2N1cyhsYXN0X2ZpbHRlcixzY3JvbGwucmVuZGVyKCkpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBOYXZpZ2F0b3IubW92ZSgndXAnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdoZWFkJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkb3duOiAoKT0+e1xuICAgICAgICAgICAgICAgIE5hdmlnYXRvci5tb3ZlKCdkb3duJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByaWdodDogKCk9PntcbiAgICAgICAgICAgICAgICBpZihOYXZpZ2F0b3IuY2FubW92ZSgncmlnaHQnKSkgTmF2aWdhdG9yLm1vdmUoJ3JpZ2h0JylcbiAgICAgICAgICAgICAgICBlbHNlIGZpbHRlci5zaG93KExhbXBhLkxhbmcudHJhbnNsYXRlKCd0aXRsZV9maWx0ZXInKSwnZmlsdGVyJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWZ0OiAoKT0+e1xuICAgICAgICAgICAgICAgIGlmKE5hdmlnYXRvci5jYW5tb3ZlKCdsZWZ0JykpIE5hdmlnYXRvci5tb3ZlKCdsZWZ0JylcbiAgICAgICAgICAgICAgICBlbHNlIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdtZW51JylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYWNrOiB0aGlzLmJhY2tcbiAgICAgICAgfSlcblxuICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnY29udGVudCcpXG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXIgPSBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gZmlsZXMucmVuZGVyKClcbiAgICB9XG5cbiAgICB0aGlzLmJhY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICBMYW1wYS5BY3Rpdml0eS5iYWNrd2FyZCgpXG4gICAgfVxuXG4gICAgdGhpcy5wYXVzZSA9IGZ1bmN0aW9uKCl7fVxuXG4gICAgdGhpcy5zdG9wID0gZnVuY3Rpb24oKXt9XG5cbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICBuZXR3b3JrLmNsZWFyKClcblxuICAgICAgICBmaWxlcy5kZXN0cm95KClcblxuICAgICAgICBzY3JvbGwuZGVzdHJveSgpXG5cbiAgICAgICAgbmV0d29yayA9IG51bGxcblxuICAgICAgICBzb3VyY2VzLnZpZGVvY2RuLmRlc3Ryb3koKVxuICAgICAgICBzb3VyY2VzLnJlemthLmRlc3Ryb3koKVxuICAgICAgICBzb3VyY2VzLmtpbm9iYXNlLmRlc3Ryb3koKVxuICAgICAgICBzb3VyY2VzLmNvbGxhcHMuZGVzdHJveSgpXG4gICAgICAgIHNvdXJjZXMuY2RubW92aWVzLmRlc3Ryb3koKVxuICAgICAgICBzb3VyY2VzLmZpbG1peC5kZXN0cm95KClcblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJyxtaW51cylcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudFxuIiwiaW1wb3J0IE9ubGluZSBmcm9tICcuL2NvbXBvbmVudCdcblxuaWYoIUxhbXBhLkxhbmcpe1xuICAgIGxldCBsYW5nX2RhdGEgPSB7fVxuXG4gICAgTGFtcGEuTGFuZyA9IHtcbiAgICAgICAgYWRkOiAoZGF0YSk9PntcbiAgICAgICAgICAgIGxhbmdfZGF0YSA9IGRhdGFcbiAgICAgICAgfSxcbiAgICAgICAgdHJhbnNsYXRlOiAoa2V5KT0+e1xuICAgICAgICAgICAgcmV0dXJuIGxhbmdfZGF0YVtrZXldID8gbGFuZ19kYXRhW2tleV0ucnUgOiBrZXlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTGFtcGEuTGFuZy5hZGQoe1xuICAgIG9ubGluZV9ub2xpbms6IHtcbiAgICAgICAgcnU6ICfQndC1INGD0LTQsNC70L7RgdGMINC40LfQstC70LXRh9GMINGB0YHRi9C70LrRgycsXG4gICAgICAgIHVrOiAn0J3QtdC80L7QttC70LjQstC+INC+0YLRgNC40LzQsNGC0Lgg0L/QvtGB0LjQu9Cw0L3QvdGPJyxcbiAgICAgICAgZW46ICdGYWlsZWQgdG8gZmV0Y2ggbGluaycsXG4gICAgICAgIHpoOiAn6I635Y+W6ZO+5o6l5aSx6LSlJyxcbiAgICAgICAgYmc6ICfQndC1INC80L7QttC1INC00LAg0YHQtSDQuNC30LLQu9C10YfQtSDQstGA0YrQt9C60LDRgtCwJyxcbiAgICB9LFxuICAgIG9ubGluZV93YWl0bGluazoge1xuICAgICAgICBydTogJ9Cg0LDQsdC+0YLQsNC10Lwg0L3QsNC0INC40LfQstC70LXRh9C10L3QuNC10Lwg0YHRgdGL0LvQutC4LCDQv9C+0LTQvtC20LTQuNGC0LUuLi4nLFxuICAgICAgICB1azogJ9Cf0YDQsNGG0Y7RlNC80L4g0L3QsNC0INC+0YLRgNC40LzQsNC90L3Rj9C8INC/0L7RgdC40LvQsNC90L3Rjywg0LfQsNGH0LXQutCw0LnRgtC1Li4uJyxcbiAgICAgICAgZW46ICdXb3JraW5nIG9uIGV4dHJhY3RpbmcgdGhlIGxpbmssIHBsZWFzZSB3YWl0Li4uJyxcbiAgICAgICAgemg6ICfmraPlnKjmj5Dlj5bpk77mjqXvvIzor7fnqI3lgJkuLi4nLFxuICAgICAgICBiZzogJ9Cg0LDQsdC+0YLRjyDQv9C+INC40LfQstC70LjRh9C90LDQtdGC0L4g0L3QsCDQu9C40L3QutCwLCDQvNC+0LvRjyDQv9C+0YfQsNC60LDQudGC0LUuLi4nLFxuICAgIH0sXG4gICAgb25saW5lX2JhbGFuc2VyOiB7XG4gICAgICAgIHJ1OiAn0JHQsNC70LDQvdGB0LXRgCcsXG4gICAgICAgIHVrOiAn0JHQsNC70LDQvdGB0LXRgCcsXG4gICAgICAgIGVuOiAnQmFsYW5jZXInLFxuICAgICAgICB6aDogJ+W5s+ihoeWZqCcsXG4gICAgICAgIGJnOiAn0JHQsNC70LDQvdGB0YrRgCcsXG4gICAgfSxcbiAgICBoZWxwZXJfb25saW5lX2ZpbGU6IHtcbiAgICAgICAgcnU6ICfQo9C00LXRgNC20LjQstCw0LnRgtC1INC60LvQsNCy0LjRiNGDIFwi0J7QmlwiINC00LvRjyDQstGL0LfQvtCy0LAg0LrQvtC90YLQtdC60YHRgtC90L7Qs9C+INC80LXQvdGOJyxcbiAgICAgICAgdWs6ICfQo9GC0YDQuNC80YPQudGC0LUg0LrQu9Cw0LLRltGI0YMgXCLQntCaXCIg0LTQu9GPINCy0LjQutC70LjQutGDINC60L7QvdGC0LXQutGB0YLQvdC+0LPQviDQvNC10L3RjicsXG4gICAgICAgIGVuOiAnSG9sZCB0aGUgXCJPS1wiIGtleSB0byBicmluZyB1cCB0aGUgY29udGV4dCBtZW51JyxcbiAgICAgICAgemg6ICfmjInkvY/igJznoa7lrprigJ3plK7osIPlh7rkuIrkuIvmlofoj5zljZUnLFxuICAgICAgICBiZzogJ9CX0LDQtNGA0YrQttGC0LUg0LHRg9GC0L7QvSBcItCe0JpcIiDQt9CwINC00LAg0L7RgtCy0L7RgNC40YLQtSDQutC+0L3RgtC10LrRgdGC0L3QvtGC0L4g0LzQtdC90Y4nLFxuICAgIH0sXG4gICAgb25saW5lX3F1ZXJ5X3N0YXJ0OiB7XG4gICAgICAgIHJ1OiAn0J/QviDQt9Cw0L/RgNC+0YHRgycsXG4gICAgICAgIHVrOiAn0J3QsCDQt9Cw0L/QuNGCJyxcbiAgICAgICAgZW46ICdPbiByZXF1ZXN0JyxcbiAgICAgICAgemg6ICfmoLnmja7opoHmsYInLFxuICAgICAgICBiZzogJ9Cf0L4g0LfQsNC/0LjRgtCy0LDQvdC1JyxcbiAgICB9LFxuICAgIG9ubGluZV9xdWVyeV9lbmQ6IHtcbiAgICAgICAgcnU6ICfQvdC10YIg0YDQtdC30YPQu9GM0YLQsNGC0L7QsicsXG4gICAgICAgIHVrOiAn0L3QtdC80LDRlCDRgNC10LfRg9C70YzRgtCw0YLRltCyJyxcbiAgICAgICAgZW46ICdubyByZXN1bHRzJyxcbiAgICAgICAgemg6ICfmsqHmnInnu5PmnpwnLFxuICAgICAgICBiZzogJ9C90Y/QvNCwINGA0LXQt9GD0LvRgtCw0YLQuCcsXG4gICAgfSxcbiAgICB0aXRsZV9vbmxpbmU6IHtcbiAgICAgICAgcnU6ICfQntC90LvQsNC50L0nLFxuICAgICAgICB1azogJ9Ce0L3Qu9Cw0LnQvScsXG4gICAgICAgIGVuOiAnT25saW5lJyxcbiAgICAgICAgemg6ICflnKjnur/nmoQnLFxuICAgICAgICBiZzogJ9Ce0L3Qu9Cw0LnQvScsXG4gICAgfSxcbiAgICB0aXRsZV9wcm94eToge1xuICAgICAgICBydTogJ9Cf0YDQvtC60YHQuCcsXG4gICAgICAgIHVrOiAn0J/RgNC+0LrRgdGWJyxcbiAgICAgICAgZW46ICdQcm94eScsXG4gICAgICAgIHpoOiAn5Luj55CG5Lq6JyxcbiAgICAgICAgYmc6ICfQn9GA0L7QutGB0LgnLFxuICAgIH0sXG4gICAgb25saW5lX3Byb3h5X3RpdGxlOiB7XG4gICAgICAgIHJ1OiAn0J7RgdC90L7QstC90L7QuSDQv9GA0L7QutGB0LgnLFxuICAgICAgICB1azogJ9Ce0YHQvdC+0LLQvdC40Lkg0L/RgNC+0LrRgdGWJyxcbiAgICAgICAgZW46ICdNYWluIHByb3h5JyxcbiAgICAgICAgemg6ICfkuLvopoHku6PnkIYnLFxuICAgICAgICBiZzogJ9Ce0YHQvdC+0LLQvdC+INC/0YDQvtC60YHQuCcsXG4gICAgICAgIFxuICAgIH0sXG4gICAgb25saW5lX3Byb3h5X2Rlc2NyOntcbiAgICAgICAgcnU6ICfQkdGD0LTQtdGCINC40YHQv9C+0LvRjNC30L7QstCw0YLRjNGB0Y8g0LTQu9GPINCy0YHQtdGFINCx0LDQu9Cw0L3RgdC10YDQvtCyJyxcbiAgICAgICAgdWs6ICfQktC40LrQvtGA0LjRgdGC0L7QstGD0LLQsNGC0LjQvNC10YLRjNGB0Y8g0LTQu9GPINCy0YHRltGFINCx0LDQu9Cw0L3RgdC10YDRltCyJyxcbiAgICAgICAgZW46ICdXaWxsIGJlIHVzZWQgZm9yIGFsbCBiYWxhbmNlcnMnLFxuICAgICAgICB6aDogJ+WwhueUqOS6juaJgOacieW5s+ihoeWZqCcsXG4gICAgICAgIGJnOiAn0KnQtSDQsdGK0LTQtSDQuNC30L/QvtC70LfQstCw0L3QviDQvtGCINCy0YHQuNGH0LrQuCDQsdCw0LvQsNC90YHRitGA0LgnLFxuICAgIH0sXG4gICAgb25saW5lX3Byb3h5X3BsYWNlaG9sZGVyOiB7XG4gICAgICAgIHJ1OiAn0J3QsNC/0YDQuNC80LXRgDogaHR0cDovL3Byb3h5LmNvbScsXG4gICAgICAgIHVrOiAn0J3QsNC/0YDQuNC60LvQsNC0OiBodHRwOi8vcHJveHkuY29tJyxcbiAgICAgICAgZW46ICdGb3IgZXhhbXBsZTogaHR0cDovL3Byb3h5LmNvbScsXG4gICAgICAgIHpoOiAn5L6L5aaC77yaaHR0cDovL3Byb3h5LmNvbScsXG4gICAgICAgIGJnOiAn0J3QsNC/0YDQuNC80LXRgDogaHR0cDovL3Byb3h5LmNvbScsXG4gICAgfSxcbiAgICBmaWxtaXhfcGFyYW1fYWRkX3RpdGxlOiB7XG4gICAgICAgIHJ1OiAn0JTQvtCx0LDQstC40YLRjCDQotCe0JrQldCdINC+0YIgRmlsbWl4JyxcbiAgICAgICAgdWs6ICfQlNC+0LTQsNGC0Lgg0KLQntCa0JXQnSDQstGW0LQgRmlsbWl4JyxcbiAgICAgICAgZW46ICdBZGQgVE9LRU4gZnJvbSBGaWxtaXgnLFxuICAgICAgICB6aDogJ+S7jiBGaWxtaXgg5re75YqgIFRPS0VOJyxcbiAgICAgICAgYmc6ICfQlNC+0LHQsNCy0LggVE9LRU4g0L7RgiBGaWxtaXgnLCAgXG4gICAgfSxcbiAgICBmaWxtaXhfcGFyYW1fYWRkX2Rlc2NyOiB7XG4gICAgICAgIHJ1OiAn0JTQvtCx0LDQstGM0YLQtSDQotCe0JrQldCdINC00LvRjyDQv9C+0LTQutC70Y7Rh9C10L3QuNGPINC/0L7QtNC/0LjRgdC60LgnLFxuICAgICAgICB1azogJ9CU0L7QtNCw0LnRgtC1INCi0J7QmtCV0J0g0LTQu9GPINC/0ZbQtNC60LvRjtGH0LXQvdC90Y8g0L/QtdGA0LXQtNC/0LvQsNGC0LgnLFxuICAgICAgICBlbjogJ0FkZCBhIFRPS0VOIHRvIGNvbm5lY3QgYSBzdWJzY3JpcHRpb24nLFxuICAgICAgICB6aDogJ+a3u+WKoCBUT0tFTiDku6Xov57mjqXorqLpmIUnLFxuICAgICAgICBiZzogJ9CU0L7QsdCw0LLQuCBUT0tFTiDQt9CwINCy0LrQu9GO0LLQsNC90LUg0L3QsCDQsNCx0L7QvdCw0LzQtdC90YLQsCcsXG4gICAgfSxcbiAgICBmaWxtaXhfcGFyYW1fcGxhY2Vob2xkZXI6IHtcbiAgICAgICAgcnU6ICfQndCw0L/RgNC40LzQtdGAOiBueGpla2ViNTczODViLi4nLFxuICAgICAgICB1azogJ9Cd0LDQv9GA0LjQutC70LDQtDogbnhqZWtlYjU3Mzg1Yi4uJyxcbiAgICAgICAgZW46ICdGb3IgZXhhbXBsZTogbnhqZWtlYjU3Mzg1Yi4uJyxcbiAgICAgICAgemg6ICfkvovlpoLvvJpueGpla2ViNTczODViLi4nLFxuICAgICAgICBiZzogJ9Cd0LDQv9GA0LjQvNC10YA6IG54amVrZWI1NzM4NWIuLicsXG4gICAgfSxcbiAgICBmaWxtaXhfcGFyYW1fYWRkX2RldmljZToge1xuICAgICAgICBydTogJ9CU0L7QsdCw0LLQuNGC0Ywg0YPRgdGC0YDQvtC50YHRgtCy0L4g0L3QsCBGaWxtaXgnLFxuICAgICAgICB1azogJ9CU0L7QtNCw0YLQuCDQv9GA0LjRgdGC0YDRltC5INC90LAgRmlsbWl4JyxcbiAgICAgICAgZW46ICdBZGQgRGV2aWNlIHRvIEZpbG1peCcsXG4gICAgICAgIHpoOiAn5bCG6K6+5aSH5re75Yqg5YiwIEZpbG1peCcsXG4gICAgICAgIGJnOiAn0JTQvtCx0LDQstC4INGD0YHRgtGA0L7QudGB0YLQstC+INCyIEZpbG1peCcsXG4gICAgfSxcbiAgICBmaWxtaXhfbW9kYWxfdGV4dDoge1xuICAgICAgICBydTogJ9CS0LLQtdC00LjRgtC1INC10LPQviDQvdCwINGB0YLRgNCw0L3QuNGG0LUgaHR0cHM6Ly9maWxtaXguYWMvY29uc29sZXMg0LIg0LLQsNGI0LXQvCDQsNCy0YLQvtGA0LjQt9C+0LLQsNC90L3QvtC8INCw0LrQutCw0YPQvdGC0LUhJyxcbiAgICAgICAgdWs6ICfQktCy0LXQtNGW0YLRjCDQudC+0LPQviDQvdCwINGB0YLQvtGA0ZbQvdGG0ZYgaHR0cHM6Ly9maWxtaXguYWMvY29uc29sZXMg0YMg0LLQsNGI0L7QvNGDINCw0LLRgtC+0YDQuNC30L7QstCw0L3QvtC80YMg0L7QsdC70ZbQutC+0LLQvtC80YMg0LfQsNC/0LjRgdGWIScsXG4gICAgICAgIGVuOiAnRW50ZXIgaXQgYXQgaHR0cHM6Ly9maWxtaXguYWMvY29uc29sZXMgaW4geW91ciBhdXRob3JpemVkIGFjY291bnQhJyxcbiAgICAgICAgemg6ICflnKjmgqjnmoTmjojmnYPluJDmiLfkuK3nmoQgaHR0cHM6Ly9maWxtaXguYWMvY29uc29sZXMg5Lit6L6T5YWl77yBJyxcbiAgICAgICAgYmc6ICfQktGK0LLQtdC00LXRgtC1INCz0L4g0L3QsCDRgdGC0YDQsNC90LjRhtCw0YLQsCBodHRwczovL2ZpbG1peC5hYy9jb25zb2xlcyDQstGK0LIg0LLQsNGI0LjRj9GCINCw0LrQsNGD0L3RgicsXG4gICAgfSxcbiAgICBmaWxtaXhfbW9kYWxfd2FpdDoge1xuICAgICAgICBydTogJ9Ce0LbQuNC00LDQtdC8INC60L7QtCcsXG4gICAgICAgIHVrOiAn0J7Rh9GW0LrRg9GU0LzQviDQutC+0LQnLFxuICAgICAgICBlbjogJ1dhaXRpbmcgZm9yIHRoZSBjb2RlJyxcbiAgICAgICAgemg6ICfmiJHku6zmraPlnKjnrYnlvoXku6PnoIEnLFxuICAgICAgICBiZzogJ9Ce0YfQsNC60LLQsNC8INC60L7QtCcsXG4gICAgfSxcbiAgICBmaWxtaXhfY29weV9zZWN1c2VzOiB7XG4gICAgICAgIHJ1OiAn0JrQvtC0INGB0LrQvtC/0LjRgNC+0LLQsNC9INCyINCx0YPRhNC10YAg0L7QsdC80LXQvdCwJyxcbiAgICAgICAgdWs6ICfQmtC+0LQg0YHQutC+0L/RltC50L7QstCw0L3QviDQsiDQsdGD0YTQtdGAINC+0LHQvNGW0L3RgycsXG4gICAgICAgIGVuOiAnQ29kZSBjb3BpZWQgdG8gY2xpcGJvYXJkJyxcbiAgICAgICAgemg6ICfku6PnoIHlpI3liLbliLDliarotLTmnb8nLFxuICAgICAgICBiZzogJ9Ca0L7QtNCwINC1INC60L7Qv9C40YDQsNC9INCyINCx0YPRhNC10YDQsCDQt9CwINC+0LHQvNC10L0nLFxuICAgIH0sXG4gICAgZmlsbWl4X2NvcHlfZmFpbDoge1xuICAgICAgICBydTogJ9Ce0YjQuNCx0LrQsCDQv9GA0Lgg0LrQvtC/0LjRgNC+0LLQsNC90LjQuCcsXG4gICAgICAgIHVrOiAn0J/QvtC80LjQu9C60LAg0L/RgNC4INC60L7Qv9GW0Y7QstCw0L3QvdGWJyxcbiAgICAgICAgZW46ICdDb3B5IGVycm9yJyxcbiAgICAgICAgemg6ICflpI3liLbplJnor68nLFxuICAgICAgICBiZzogJ9CT0YDQtdGI0LrQsCDQv9GA0Lgg0LrQvtC/0LjRgNCw0L3QtScsXG4gICAgfSxcbiAgICBmaWxtaXhfbm9kZXZpY2U6IHtcbiAgICAgICAgcnU6ICfQo9GB0YLRgNC+0LnRgdGC0LLQviDQvdC1INCw0LLRgtC+0YDQuNC30L7QstCw0L3QvicsXG4gICAgICAgIHVrOiAn0J/RgNC40YHRgtGA0ZbQuSDQvdC1INCw0LLRgtC+0YDQuNC30L7QstCw0L3QuNC5JyxcbiAgICAgICAgZW46ICdEZXZpY2Ugbm90IGF1dGhvcml6ZWQnLFxuICAgICAgICB6aDogJ+iuvuWkh+acquaOiOadgycsXG4gICAgICAgIGJnOiAn0KPRgdGC0YDQvtC50YHRgtCy0L7RgtC+INC90LUg0LUg0L7RgtC+0YDQuNC30LjRgNCw0L3QvicsXG4gICAgfSxcbiAgICB0aXRsZV9zdGF0dXM6IHtcbiAgICAgICAgcnU6ICfQodGC0LDRgtGD0YEnLFxuICAgICAgICB1azogJ9Ch0YLQsNGC0YPRgScsXG4gICAgICAgIGVuOiAnU3RhdHVzJyxcbiAgICAgICAgemg6ICflnLDkvY0nLFxuICAgICAgICBiZzogJ9Ch0YLQsNGC0YPRgScsXG4gICAgfSxcbiAgICBvbmxpbmVfdm9pY2Vfc3Vic2NyaWJlOiB7XG4gICAgICAgIHJ1OiAn0J/QvtC00L/QuNGB0LDRgtGM0YHRjyDQvdCwINC/0LXRgNC10LLQvtC0JyxcbiAgICAgICAgdWs6ICfQn9GW0LTQv9C40YHQsNGC0LjRgdGPINC90LAg0L/QtdGA0LXQutC70LDQtCcsXG4gICAgICAgIGVuOiAnU3Vic2NyaWJlIHRvIHRyYW5zbGF0aW9uJyxcbiAgICAgICAgemg6ICforqLpmIXnv7vor5EnLFxuICAgICAgICBiZzogJ9CQ0LHQvtC90LjRgNCw0Lkg0YHQtSDQt9CwINC/0YDQtdCy0L7QtNCwJyxcbiAgICB9LFxuICAgIG9ubGluZV92b2ljZV9zdWNjZXNzOiB7XG4gICAgICAgIHJ1OiAn0JLRiyDRg9GB0L/QtdGI0L3QviDQv9C+0LTQv9C40YHQsNC70LjRgdGMJyxcbiAgICAgICAgdWs6ICfQktC4INGD0YHQv9GW0YjQvdC+INC/0ZbQtNC/0LjRgdCw0LvQuNGB0Y8nLFxuICAgICAgICBlbjogJ1lvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzdWJzY3JpYmVkJyxcbiAgICAgICAgemg6ICfmgqjlt7LmiJDlip/orqLpmIUnXG4gICAgfSxcbiAgICBvbmxpbmVfdm9pY2VfZXJyb3I6IHtcbiAgICAgICAgcnU6ICfQktC+0LfQvdC40LrQu9CwINC+0YjQuNCx0LrQsCcsXG4gICAgICAgIHVrOiAn0JLQuNC90LjQutC70LAg0L/QvtC80LjQu9C60LAnLFxuICAgICAgICBlbjogJ0FuIGVycm9yIGhhcyBvY2N1cnJlZCcsXG4gICAgICAgIHpoOiAn5Y+R55Sf5LqG6ZSZ6K+vJyxcbiAgICAgICAgYmc6ICfQktGK0LfQvdC40LrQvdCwINCz0YDQtdGI0LrQsCcsXG4gICAgfVxufSlcblxuZnVuY3Rpb24gcmVzZXRUZW1wbGF0ZXMoKXtcbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ29ubGluZScsYDxkaXYgY2xhc3M9XCJvbmxpbmUgc2VsZWN0b3JcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm9ubGluZV9fYm9keVwiPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTtsZWZ0OiAwO3RvcDogLTAuM2VtO3dpZHRoOiAyLjRlbTtoZWlnaHQ6IDIuNGVtXCI+XG4gICAgICAgICAgICAgICAgPHN2ZyBzdHlsZT1cImhlaWdodDogMi40ZW07IHdpZHRoOiAgMi40ZW07XCIgdmlld0JveD1cIjAgMCAxMjggMTI4XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI2NFwiIGN5PVwiNjRcIiByPVwiNTZcIiBzdHJva2U9XCJ3aGl0ZVwiIHN0cm9rZS13aWR0aD1cIjE2XCIvPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTkwLjUgNjQuMzgyN0w1MCA4Ny43NjU0TDUwIDQxTDkwLjUgNjQuMzgyN1pcIiBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvbmxpbmVfX3RpdGxlXCIgc3R5bGU9XCJwYWRkaW5nLWxlZnQ6IDIuMWVtO1wiPnt0aXRsZX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvbmxpbmVfX3F1YWxpdHlcIiBzdHlsZT1cInBhZGRpbmctbGVmdDogMy40ZW07XCI+e3F1YWxpdHl9e2luZm99PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmApXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ29ubGluZV9mb2xkZXInLGA8ZGl2IGNsYXNzPVwib25saW5lIHNlbGVjdG9yXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJvbmxpbmVfX2JvZHlcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7bGVmdDogMDt0b3A6IC0wLjNlbTt3aWR0aDogMi40ZW07aGVpZ2h0OiAyLjRlbVwiPlxuICAgICAgICAgICAgICAgIDxzdmcgc3R5bGU9XCJoZWlnaHQ6IDIuNGVtOyB3aWR0aDogIDIuNGVtO1wiIHZpZXdCb3g9XCIwIDAgMTI4IDExMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgICAgICA8cmVjdCB5PVwiMjBcIiB3aWR0aD1cIjEyOFwiIGhlaWdodD1cIjkyXCIgcng9XCIxM1wiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0yOS45OTYzIDhIOTguMDAzN0M5Ni4wNDQ2IDMuMzAyMSA5MS40MDc5IDAgODYgMEg0MkMzNi41OTIxIDAgMzEuOTU1NSAzLjMwMjEgMjkuOTk2MyA4WlwiIGZpbGw9XCJ3aGl0ZVwiIGZpbGwtb3BhY2l0eT1cIjAuMjNcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIxMVwiIHk9XCI4XCIgd2lkdGg9XCIxMDZcIiBoZWlnaHQ9XCI3NlwiIHJ4PVwiMTNcIiBmaWxsPVwid2hpdGVcIiBmaWxsLW9wYWNpdHk9XCIwLjUxXCIvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib25saW5lX190aXRsZVwiIHN0eWxlPVwicGFkZGluZy1sZWZ0OiAyLjFlbTtcIj57dGl0bGV9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib25saW5lX19xdWFsaXR5XCIgc3R5bGU9XCJwYWRkaW5nLWxlZnQ6IDMuNGVtO1wiPntxdWFsaXR5fXtpbmZvfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5gKVxufVxuXG5cbmNvbnN0IGJ1dHRvbiA9IGA8ZGl2IGNsYXNzPVwiZnVsbC1zdGFydF9fYnV0dG9uIHNlbGVjdG9yIHZpZXctLW9ubGluZVwiIGRhdGEtc3VidGl0bGU9XCJ2MS41NFwiPlxuICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbG5zOnN2Z2pzPVwiaHR0cDovL3N2Z2pzLmNvbS9zdmdqc1wiIHZlcnNpb249XCIxLjFcIiB3aWR0aD1cIjUxMlwiIGhlaWdodD1cIjUxMlwiIHg9XCIwXCIgeT1cIjBcIiB2aWV3Qm94PVwiMCAwIDMwLjA1MSAzMC4wNTFcIiBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMlwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgY2xhc3M9XCJcIj5cbiAgICA8ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNMTkuOTgyLDE0LjQzOGwtNi4yNC00LjUzNmMtMC4yMjktMC4xNjYtMC41MzMtMC4xOTEtMC43ODQtMC4wNjJjLTAuMjUzLDAuMTI4LTAuNDExLDAuMzg4LTAuNDExLDAuNjY5djkuMDY5ICAgYzAsMC4yODQsMC4xNTgsMC41NDMsMC40MTEsMC42NzFjMC4xMDcsMC4wNTQsMC4yMjQsMC4wODEsMC4zNDIsMC4wODFjMC4xNTQsMCwwLjMxLTAuMDQ5LDAuNDQyLTAuMTQ2bDYuMjQtNC41MzIgICBjMC4xOTctMC4xNDUsMC4zMTItMC4zNjksMC4zMTItMC42MDdDMjAuMjk1LDE0LjgwMywyMC4xNzcsMTQuNTgsMTkuOTgyLDE0LjQzOHpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIvPlxuICAgICAgICA8cGF0aCBkPVwiTTE1LjAyNiwwLjAwMkM2LjcyNiwwLjAwMiwwLDYuNzI4LDAsMTUuMDI4YzAsOC4yOTcsNi43MjYsMTUuMDIxLDE1LjAyNiwxNS4wMjFjOC4yOTgsMCwxNS4wMjUtNi43MjUsMTUuMDI1LTE1LjAyMSAgIEMzMC4wNTIsNi43MjgsMjMuMzI0LDAuMDAyLDE1LjAyNiwwLjAwMnogTTE1LjAyNiwyNy41NDJjLTYuOTEyLDAtMTIuNTE2LTUuNjAxLTEyLjUxNi0xMi41MTRjMC02LjkxLDUuNjA0LTEyLjUxOCwxMi41MTYtMTIuNTE4ICAgYzYuOTExLDAsMTIuNTE0LDUuNjA3LDEyLjUxNCwxMi41MThDMjcuNTQxLDIxLjk0MSwyMS45MzcsMjcuNTQyLDE1LjAyNiwyNy41NDJ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiLz5cbiAgICA8L2c+PC9zdmc+XG5cbiAgICA8c3Bhbj4je3RpdGxlX29ubGluZX08L3NwYW4+XG4gICAgPC9kaXY+YFxuXG4vLyDQvdGD0LbQvdCwINC30LDQs9C70YPRiNC60LAsINCwINGC0L4g0L/RgNC4INGB0YLRgNCw0YLQtSDQu9Cw0LzQv9GLINCz0L7QstC+0YDQuNGCINC/0YPRgdGC0L5cbkxhbXBhLkNvbXBvbmVudC5hZGQoJ29ubGluZScsIE9ubGluZSlcblxuLy/RgtC+INC20LUg0YHQsNC80L7QtVxucmVzZXRUZW1wbGF0ZXMoKVxuXG5MYW1wYS5MaXN0ZW5lci5mb2xsb3coJ2Z1bGwnLChlKT0+e1xuICAgIGlmKGUudHlwZSA9PSAnY29tcGxpdGUnKXtcbiAgICAgICAgbGV0IGJ0biA9ICQoTGFtcGEuTGFuZy50cmFuc2xhdGUoYnV0dG9uKSlcblxuICAgICAgICBidG4ub24oJ2hvdmVyOmVudGVyJywoKT0+e1xuICAgICAgICAgICAgcmVzZXRUZW1wbGF0ZXMoKVxuXG4gICAgICAgICAgICBMYW1wYS5Db21wb25lbnQuYWRkKCdvbmxpbmUnLCBPbmxpbmUpXG5cbiAgICAgICAgICAgIExhbXBhLkFjdGl2aXR5LnB1c2goe1xuICAgICAgICAgICAgICAgIHVybDogJycsXG4gICAgICAgICAgICAgICAgdGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCd0aXRsZV9vbmxpbmUnKSxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6ICdvbmxpbmUnLFxuICAgICAgICAgICAgICAgIHNlYXJjaDogZS5kYXRhLm1vdmllLnRpdGxlLFxuICAgICAgICAgICAgICAgIHNlYXJjaF9vbmU6IGUuZGF0YS5tb3ZpZS50aXRsZSxcbiAgICAgICAgICAgICAgICBzZWFyY2hfdHdvOiBlLmRhdGEubW92aWUub3JpZ2luYWxfdGl0bGUsXG4gICAgICAgICAgICAgICAgbW92aWU6IGUuZGF0YS5tb3ZpZSxcbiAgICAgICAgICAgICAgICBwYWdlOiAxXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGUub2JqZWN0LmFjdGl2aXR5LnJlbmRlcigpLmZpbmQoJy52aWV3LS10b3JyZW50JykuYWZ0ZXIoYnRuKVxuICAgIH1cbn0pXG5cblxuLy8vLy8vL09OTElORS8vLy8vLy8vL1xuXG5MYW1wYS5QYXJhbXMuc2VsZWN0KCdvbmxpbmVfcHJveHlfYWxsJywnJywnJylcbkxhbXBhLlBhcmFtcy5zZWxlY3QoJ29ubGluZV9wcm94eV92aWRlb2NkbicsJycsJycpXG5MYW1wYS5QYXJhbXMuc2VsZWN0KCdvbmxpbmVfcHJveHlfcmV6a2EnLCcnLCcnKVxuTGFtcGEuUGFyYW1zLnNlbGVjdCgnb25saW5lX3Byb3h5X2tpbm9iYXNlJywnJywnJylcbkxhbXBhLlBhcmFtcy5zZWxlY3QoJ29ubGluZV9wcm94eV9jb2xsYXBzJywnJywnJylcbkxhbXBhLlBhcmFtcy5zZWxlY3QoJ29ubGluZV9wcm94eV9jZG5tb3ZpZXMnLCcnLCcnKVxuXG5MYW1wYS5UZW1wbGF0ZS5hZGQoJ3NldHRpbmdzX3Byb3h5JyxgPGRpdj5cbiAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW0gc2VsZWN0b3JcIiBkYXRhLXR5cGU9XCJpbnB1dFwiIGRhdGEtbmFtZT1cIm9ubGluZV9wcm94eV9hbGxcIiBwbGFjZWhvbGRlcj1cIiN7b25saW5lX3Byb3h5X3BsYWNlaG9sZGVyfVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX25hbWVcIj4je29ubGluZV9wcm94eV90aXRsZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtX192YWx1ZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX2Rlc2NyXCI+I3tvbmxpbmVfcHJveHlfZGVzY3J9PC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW0gc2VsZWN0b3JcIiBkYXRhLXR5cGU9XCJpbnB1dFwiIGRhdGEtbmFtZT1cIm9ubGluZV9wcm94eV92aWRlb2NkblwiIHBsYWNlaG9sZGVyPVwiI3tvbmxpbmVfcHJveHlfcGxhY2Vob2xkZXJ9XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbV9fbmFtZVwiPlZpZGVvY2RuPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbV9fdmFsdWVcIj48L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbSBzZWxlY3RvclwiIGRhdGEtdHlwZT1cImlucHV0XCIgZGF0YS1uYW1lPVwib25saW5lX3Byb3h5X3JlemthXCIgcGxhY2Vob2xkZXI9XCIje29ubGluZV9wcm94eV9wbGFjZWhvbGRlcn1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtX19uYW1lXCI+UmV6a2E8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtX192YWx1ZVwiPjwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtIHNlbGVjdG9yXCIgZGF0YS10eXBlPVwiaW5wdXRcIiBkYXRhLW5hbWU9XCJvbmxpbmVfcHJveHlfa2lub2Jhc2VcIiBwbGFjZWhvbGRlcj1cIiN7b25saW5lX3Byb3h5X3BsYWNlaG9sZGVyfVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX25hbWVcIj5LaW5vYmFzZTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX3ZhbHVlXCI+PC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW0gc2VsZWN0b3JcIiBkYXRhLXR5cGU9XCJpbnB1dFwiIGRhdGEtbmFtZT1cIm9ubGluZV9wcm94eV9jb2xsYXBzXCIgcGxhY2Vob2xkZXI9XCIje29ubGluZV9wcm94eV9wbGFjZWhvbGRlcn1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtX19uYW1lXCI+Q29sbGFwczwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX3ZhbHVlXCI+PC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW0gc2VsZWN0b3JcIiBkYXRhLXR5cGU9XCJpbnB1dFwiIGRhdGEtbmFtZT1cIm9ubGluZV9wcm94eV9jZG5tb3ZpZXNcIiBwbGFjZWhvbGRlcj1cIiN7b25saW5lX3Byb3h5X3BsYWNlaG9sZGVyfVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX25hbWVcIj5DZG5tb3ZpZXM8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtX192YWx1ZVwiPjwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+YClcblxuZnVuY3Rpb24gYWRkU2V0dGluZ3NQcm94eSgpe1xuICAgIGlmKExhbXBhLlNldHRpbmdzLm1haW4gJiYgIUxhbXBhLlNldHRpbmdzLm1haW4oKS5yZW5kZXIoKS5maW5kKCdbZGF0YS1jb21wb25lbnQ9XCJwcm94eVwiXScpLmxlbmd0aCl7XG4gICAgICAgIGxldCBmaWVsZCA9ICQoTGFtcGEuTGFuZy50cmFuc2xhdGUoYDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1mb2xkZXIgc2VsZWN0b3JcIiBkYXRhLWNvbXBvbmVudD1cInByb3h5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtZm9sZGVyX19pY29uXCI+XG4gICAgICAgICAgICAgICAgPHN2ZyBoZWlnaHQ9XCI0NlwiIHZpZXdCb3g9XCIwIDAgNDIgNDZcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PVwiMS41XCIgeT1cIjI2LjVcIiB3aWR0aD1cIjM5XCIgaGVpZ2h0PVwiMThcIiByeD1cIjEuNVwiIHN0cm9rZT1cIndoaXRlXCIgc3Ryb2tlLXdpZHRoPVwiM1wiLz5cbiAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PVwiOS41XCIgY3k9XCIzNS41XCIgcj1cIjMuNVwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PVwiMjYuNVwiIGN5PVwiMzUuNVwiIHI9XCIyLjVcIiBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjMyLjVcIiBjeT1cIjM1LjVcIiByPVwiMi41XCIgZmlsbD1cIndoaXRlXCIvPlxuICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9XCIyMS41XCIgY3k9XCI1LjVcIiByPVwiNS41XCIgZmlsbD1cIndoaXRlXCIvPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIzMVwiIHk9XCI0XCIgd2lkdGg9XCIxMVwiIGhlaWdodD1cIjNcIiByeD1cIjEuNVwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgICAgICA8cmVjdCB5PVwiNFwiIHdpZHRoPVwiMTFcIiBoZWlnaHQ9XCIzXCIgcng9XCIxLjVcIiBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICAgICAgPHJlY3QgeD1cIjIwXCIgeT1cIjE0XCIgd2lkdGg9XCIzXCIgaGVpZ2h0PVwiN1wiIHJ4PVwiMS41XCIgZmlsbD1cIndoaXRlXCIvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtZm9sZGVyX19uYW1lXCI+I3t0aXRsZV9wcm94eX08L2Rpdj5cbiAgICAgICAgPC9kaXY+YCkpXG4gICAgICAgIFxuICAgICAgICBMYW1wYS5TZXR0aW5ncy5tYWluKCkucmVuZGVyKCkuZmluZCgnW2RhdGEtY29tcG9uZW50PVwibW9yZVwiXScpLmFmdGVyKGZpZWxkKVxuICAgICAgICBMYW1wYS5TZXR0aW5ncy5tYWluKCkudXBkYXRlKClcbiAgICB9XG59XG5cbmlmKHdpbmRvdy5hcHByZWFkeSkgYWRkU2V0dGluZ3NQcm94eSgpXG5lbHNle1xuICAgIExhbXBhLkxpc3RlbmVyLmZvbGxvdygnYXBwJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYoZS50eXBlID09J3JlYWR5JykgYWRkU2V0dGluZ3NQcm94eSgpXG4gICAgfSlcbn1cblxuLy8vLy8vL0ZJTE1JWC8vLy8vLy8vL1xuXG5sZXQgbmV0d29yayAgPSBuZXcgTGFtcGEuUmVndWVzdCgpXG5sZXQgYXBpX3VybCAgPSAnaHR0cDovL2ZpbG1peGFwcC5jeW91L2FwaS92Mi8nXG5sZXQgdXNlcl9kZXYgPSAnP3VzZXJfZGV2X2Fwaz0xLjEuMyZ1c2VyX2Rldl9pZD0nICsgTGFtcGEuVXRpbHMudWlkKDE2KSArICcmdXNlcl9kZXZfbmFtZT1YaWFvbWkmdXNlcl9kZXZfb3M9MTEmdXNlcl9kZXZfdmVuZG9yPVhpYW9taSZ1c2VyX2Rldl90b2tlbj0nXG5sZXQgcGluZ19hdXRoXG5cbkxhbXBhLlBhcmFtcy5zZWxlY3QoJ2ZpbG1peF90b2tlbicsJycsJycpXG5cbkxhbXBhLlRlbXBsYXRlLmFkZCgnc2V0dGluZ3NfZmlsbWl4JyxgPGRpdj5cbiAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW0gc2VsZWN0b3JcIiBkYXRhLW5hbWU9XCJmaWxtaXhfdG9rZW5cIiBkYXRhLXR5cGU9XCJpbnB1dFwiIHBsYWNlaG9sZGVyPVwiI3tmaWxtaXhfcGFyYW1fcGxhY2Vob2xkZXJ9XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbV9fbmFtZVwiPiN7ZmlsbWl4X3BhcmFtX2FkZF90aXRsZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtX192YWx1ZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX2Rlc2NyXCI+I3tmaWxtaXhfcGFyYW1fYWRkX2Rlc2NyfTwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1wYXJhbSBzZWxlY3RvclwiIGRhdGEtbmFtZT1cImZpbG1peF9hZGRcIiBkYXRhLXN0YXRpYz1cInRydWVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtX19uYW1lXCI+I3tmaWxtaXhfcGFyYW1fYWRkX2RldmljZX08L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PmApXG5cblxuTGFtcGEuU3RvcmFnZS5saXN0ZW5lci5mb2xsb3coJ2NoYW5nZScsKGUpPT57XG4gICAgaWYoZS5uYW1lID09ICdmaWxtaXhfdG9rZW4nKXtcbiAgICAgICAgaWYoZS52YWx1ZSkgY2hlY2tQcm8oZS52YWx1ZSlcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIExhbXBhLlN0b3JhZ2Uuc2V0KFwiZmlsbWl4X3N0YXR1c1wiLCB7fSlcblxuICAgICAgICAgICAgc2hvd1N0YXR1cygpXG4gICAgICAgIH1cbiAgICB9XG59KVxuXG5mdW5jdGlvbiBhZGRTZXR0aW5nc0ZpbG1peCgpe1xuICAgIGlmKExhbXBhLlNldHRpbmdzLm1haW4gJiYgIUxhbXBhLlNldHRpbmdzLm1haW4oKS5yZW5kZXIoKS5maW5kKCdbZGF0YS1jb21wb25lbnQ9XCJmaWxtaXhcIl0nKS5sZW5ndGgpe1xuICAgICAgICBsZXQgZmllbGQgPSAkKGA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtZm9sZGVyIHNlbGVjdG9yXCIgZGF0YS1jb21wb25lbnQ9XCJmaWxtaXhcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1mb2xkZXJfX2ljb25cIj5cbiAgICAgICAgICAgICAgICA8c3ZnIGhlaWdodD1cIjU3XCIgdmlld0JveD1cIjAgMCA1OCA1N1wiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjAgMjAuMzczNVY0NUgyNi44MjgxVjM0LjEyNjJIMzYuNzI0VjI2Ljk4MDZIMjYuODI4MVYyNC4zOTE2QzI2LjgyODEgMjEuNTk1NSAyOC45MDYyIDE5LjgzNSAzMS4xODIzIDE5LjgzNUgzOVYxM0gyNi44MjgxQzIzLjY2MTUgMTMgMjAgMTUuNDg1NCAyMCAyMC4zNzM1WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PVwiMlwiIHk9XCIyXCIgd2lkdGg9XCI1NFwiIGhlaWdodD1cIjUzXCIgcng9XCI1XCIgc3Ryb2tlPVwid2hpdGVcIiBzdHJva2Utd2lkdGg9XCI0XCIvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtZm9sZGVyX19uYW1lXCI+RmlsbWl4PC9kaXY+XG4gICAgICAgIDwvZGl2PmApXG4gICAgICAgIFxuICAgICAgICBMYW1wYS5TZXR0aW5ncy5tYWluKCkucmVuZGVyKCkuZmluZCgnW2RhdGEtY29tcG9uZW50PVwibW9yZVwiXScpLmFmdGVyKGZpZWxkKVxuICAgICAgICBMYW1wYS5TZXR0aW5ncy5tYWluKCkudXBkYXRlKClcbiAgICB9XG59XG5cbmlmKHdpbmRvdy5hcHByZWFkeSkgYWRkU2V0dGluZ3NGaWxtaXgoKVxuZWxzZXtcbiAgICBMYW1wYS5MaXN0ZW5lci5mb2xsb3coJ2FwcCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmKGUudHlwZSA9PSdyZWFkeScpIGFkZFNldHRpbmdzRmlsbWl4KClcbiAgICB9KVxufVxuXG5cbkxhbXBhLlNldHRpbmdzLmxpc3RlbmVyLmZvbGxvdygnb3BlbicsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYoZS5uYW1lID09ICdmaWxtaXgnKXtcbiAgICAgICAgZS5ib2R5LmZpbmQoJ1tkYXRhLW5hbWU9XCJmaWxtaXhfYWRkXCJdJykudW5iaW5kKCdob3ZlcjplbnRlcicpLm9uKCdob3ZlcjplbnRlcicsKCk9PntcbiAgICAgICAgICAgIGxldCB1c2VyX2NvZGUgID0gJydcbiAgICAgICAgICAgIGxldCB1c2VyX3Rva2VuID0gJydcblxuICAgICAgICAgICAgbGV0IG1vZGFsID0gJCgnPGRpdj48ZGl2IGNsYXNzPVwiYnJvYWRjYXN0X190ZXh0XCI+JytMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnZmlsbWl4X21vZGFsX3RleHQnKSsnPC9kaXY+PGRpdiBjbGFzcz1cImJyb2FkY2FzdF9fZGV2aWNlIHNlbGVjdG9yXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXJcIj4nK0xhbXBhLkxhbmcudHJhbnNsYXRlKCdmaWxtaXhfbW9kYWxfd2FpdCcpKycuLi48L2Rpdj48YnI+PGRpdiBjbGFzcz1cImJyb2FkY2FzdF9fc2NhblwiPjxkaXY+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+JylcblxuICAgICAgICAgICAgTGFtcGEuTW9kYWwub3Blbih7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICAgICAgICAgIGh0bWw6IG1vZGFsLFxuICAgICAgICAgICAgICAgIG9uQmFjazogKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIExhbXBhLk1vZGFsLmNsb3NlKClcblxuICAgICAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnc2V0dGluZ3NfY29tcG9uZW50JylcblxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHBpbmdfYXV0aClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uU2VsZWN0OiAoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuVXRpbHMuY29weVRleHRUb0NsaXBib2FyZCh1c2VyX2NvZGUsICgpPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuTm90eS5zaG93KExhbXBhLkxhbmcudHJhbnNsYXRlKCdmaWxtaXhfY29weV9zZWN1c2VzJykpXG4gICAgICAgICAgICAgICAgICAgIH0sICgpPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuTm90eS5zaG93KExhbXBhLkxhbmcudHJhbnNsYXRlKCdmaWxtaXhfY29weV9mYWlsJykpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgcGluZ19hdXRoID0gc2V0SW50ZXJ2YWwoKCk9PiB7XG4gICAgICAgICAgICAgICAgY2hlY2tQcm8odXNlcl90b2tlbiwgKCk9PntcbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuTW9kYWwuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocGluZ19hdXRoKVxuXG4gICAgICAgICAgICAgICAgICAgIExhbXBhLlN0b3JhZ2Uuc2V0KFwiZmlsbWl4X3Rva2VuXCIsIHVzZXJfdG9rZW4pXG5cbiAgICAgICAgICAgICAgICAgICAgZS5ib2R5LmZpbmQoJ1tkYXRhLW5hbWU9XCJmaWxtaXhfdG9rZW5cIl0gLnNldHRpbmdzLXBhcmFtX192YWx1ZScpLnRleHQodXNlcl90b2tlbilcblxuICAgICAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnc2V0dGluZ3NfY29tcG9uZW50JylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSwgMTAwMDApXG5cbiAgICAgICAgICAgIG5ldHdvcmsuY2xlYXIoKVxuICAgICAgICAgICAgbmV0d29yay50aW1lb3V0KDEwMDAwKVxuXG4gICAgICAgICAgICBuZXR3b3JrLnF1aWV0KGFwaV91cmwgKyAndG9rZW5fcmVxdWVzdCcgKyB1c2VyX2RldiwgKGZvdW5kKT0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZm91bmQuc3RhdHVzID09ICdvaycpIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl90b2tlbiA9IGZvdW5kLmNvZGVcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9jb2RlICA9IGZvdW5kLnVzZXJfY29kZVxuXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsLmZpbmQoJy5zZWxlY3RvcicpLnRleHQodXNlcl9jb2RlKVxuICAgICAgICAgICAgICAgICAgICAvL21vZGFsLmZpbmQoJy5icm9hZGNhc3RfX3NjYW4nKS5yZW1vdmUoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBMYW1wYS5Ob3R5LnNob3coZm91bmQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwoYSwgYyk9PntcbiAgICAgICAgICAgICAgICBMYW1wYS5Ob3R5LnNob3cobmV0d29yay5lcnJvckRlY29kZShhLCBjKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgc2hvd1N0YXR1cygpXG4gICAgfVxufSlcblxuXG5cblxuZnVuY3Rpb24gc2hvd1N0YXR1cygpe1xuICAgIGxldCBzdGF0dXMgPSBMYW1wYS5TdG9yYWdlLmdldChcImZpbG1peF9zdGF0dXNcIiwgJ3t9JylcbiAgICBsZXQgaW5mbyAgID0gTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2ZpbG1peF9ub2RldmljZScpXG5cbiAgICBpZiAoc3RhdHVzLmxvZ2luKXtcbiAgICAgICAgaWYgKHN0YXR1cy5pc19wcm8pICAgICAgICAgICBpbmZvID0gc3RhdHVzLmxvZ2luICsgJyAtIFBSTyAnK0xhbXBhLkxhbmcudHJhbnNsYXRlKCdmaWx0ZXJfcmF0aW5nX3RvJykrJyAtICcgKyBzdGF0dXMucHJvX2RhdGVcbiAgICAgICAgZWxzZSBpZiAoc3RhdHVzLmlzX3Byb19wbHVzKSBpbmZvID0gc3RhdHVzLmxvZ2luICsgJyAtIFBST19QTFVTICcrTGFtcGEuTGFuZy50cmFuc2xhdGUoJ2ZpbHRlcl9yYXRpbmdfdG8nKSsnIC0gJyArIHN0YXR1cy5wcm9fZGF0ZVxuICAgICAgICBlbHNlICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8gPSBzdGF0dXMubG9naW4gKyAnIC0gTk8gUFJPJ1xuICAgIH1cblxuICAgIGxldCBmaWVsZCAgPSAkKExhbXBhLkxhbmcudHJhbnNsYXRlKGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtXCIgZGF0YS1uYW1lPVwiZmlsbWl4X3N0YXR1c1wiIGRhdGEtc3RhdGljPVwidHJ1ZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXBhcmFtX19uYW1lXCI+I3t0aXRsZV9zdGF0dXN9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX3ZhbHVlXCI+JHtpbmZvfTwvZGl2PlxuICAgICAgICA8L2Rpdj5gKSlcblxuICAgICQoJy5zZXR0aW5ncyBbZGF0YS1uYW1lPVwiZmlsbWl4X3N0YXR1c1wiXScpLnJlbW92ZSgpXG4gICAgJCgnLnNldHRpbmdzIFtkYXRhLW5hbWU9XCJmaWxtaXhfYWRkXCJdJykuYWZ0ZXIoZmllbGQpXG59XG5cbmZ1bmN0aW9uIGNoZWNrUHJvKHRva2VuLCBjYWxsKSB7XG4gICAgbmV0d29yay5jbGVhcigpXG4gICAgbmV0d29yay50aW1lb3V0KDgwMDApXG4gICAgbmV0d29yay5zaWxlbnQoYXBpX3VybCArICd1c2VyX3Byb2ZpbGUnICsgdXNlcl9kZXYgKyB0b2tlbiwgZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgaWYgKGpzb24pIHtcbiAgICAgICAgICAgIGlmKGpzb24udXNlcl9kYXRhKSB7XG4gICAgICAgICAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoXCJmaWxtaXhfc3RhdHVzXCIsIGpzb24udXNlcl9kYXRhKVxuXG4gICAgICAgICAgICAgICAgaWYoY2FsbCkgY2FsbCgpXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoXCJmaWxtaXhfc3RhdHVzXCIsIHt9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzaG93U3RhdHVzKClcbiAgICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChhLCBjKSB7XG4gICAgICAgIExhbXBhLk5vdHkuc2hvdyhuZXR3b3JrLmVycm9yRGVjb2RlKGEsIGMpKVxuICAgIH0pXG59XG4iXSwibmFtZXMiOlsidmlkZW9jZG4iLCJjb21wb25lbnQiLCJfb2JqZWN0IiwibmV0d29yayIsIkxhbXBhIiwiUmVndWVzdCIsImV4dHJhY3QiLCJyZXN1bHRzIiwib2JqZWN0Iiwic2VsZWN0X3RpdGxlIiwiZ2V0X2xpbmtzX3dhaXQiLCJmaWx0ZXJfaXRlbXMiLCJjaG9pY2UiLCJzZWFzb24iLCJ2b2ljZSIsInZvaWNlX25hbWUiLCJ2b2ljZV9pZCIsInNlYXJjaCIsImRhdGEiLCJtb3ZpZSIsInRpdGxlIiwidXJsIiwicHJveHkiLCJpdG0iLCJ0eXBlIiwiaWZyYW1lX3NyYyIsInNwbGl0Iiwic2xpY2UiLCJVdGlscyIsImFkZFVybENvbXBvbmVudCIsImltZGJfaWQiLCJlbmNvZGVVUklDb21wb25lbnQiLCJzaWxlbnQiLCJmb3VuZCIsImZpbHRlciIsImVsZW0iLCJpZCIsInN1Y2Nlc3MiLCJsb2FkaW5nIiwibGVuZ3RoIiwiZW1wdHlGb3JRdWVyeSIsImEiLCJjIiwiZW1wdHkiLCJlcnJvckRlY29kZSIsImV4dGVuZENob2ljZSIsInNhdmVkIiwiQXJyYXlzIiwiZXh0ZW5kIiwicmVzZXQiLCJhcHBlbmQiLCJmaWx0cmVkIiwic2F2ZUNob2ljZSIsImIiLCJzdHlwZSIsImluZGV4Iiwidm9pY2VfaW5mbyIsImRlc3Ryb3kiLCJjbGVhciIsImpzb24iLCJleHRyYWN0RGF0YSIsImV4dHJhY3RJdGVtcyIsInN0ciIsIm1heF9xdWFsaXR5IiwiaXRlbXMiLCJtYXAiLCJpdGVtIiwicXVhbGl0eSIsInBhcnNlSW50IiwibWF0Y2giLCJmaWxlIiwicmVwbGFjZSIsInNvcnQiLCJlIiwidGltZW91dCIsInNyYyIsInJhdyIsInJlbmRlciIsImZpbmQiLCJyZW1vdmUiLCJtYXRoIiwiZGVjb2RlSnNvbiIsInRleHQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJfbG9vcCIsImkiLCJfbW92aWUkbWVkaWEiLCJpbm5lckhUTUwiLCJ2YWx1ZSIsIm1lZGlhIiwib2JqIiwidHJhbnNsYXRpb25faWQiLCJfbW92aWUkdHJhbnNsYXRpb25zIiwidHJhbnNsYXRpb25zIiwiZm9sZGVyIiwiZiIsImRhdGFUeXBlIiwiZ2V0RmlsZSIsImVsZW1lbnQiLCJ0cmFuc2xhdCIsInRyYW5zbGF0aW9uIiwiZXBpc29kZSIsIm1hc3MiLCJpbmRleE9mIiwiZm9yRWFjaCIsIm4iLCJleGVzIiwicHJlZmVyYWJseSIsIlN0b3JhZ2UiLCJnZXQiLCJzZWFzb25fY291bnQiLCJzIiwicHVzaCIsIkxhbmciLCJ0cmFuc2xhdGUiLCJlcGlzb2RlcyIsInNlYXNvbl9udW0iLCJ2Iiwic2hvcnRlcl90aXRsZSIsImlueCIsImZpbHRlcl9kYXRhIiwibnVtYmVyX29mX3NlYXNvbnMiLCJ0ZW1wIiwibSIsInVuaXF1ZSIsIm51bSIsInJ1X3RpdGxlIiwic291cmNlX3F1YWxpdHkiLCJ0b1VwcGVyQ2FzZSIsIiQiLCJ2aWV3ZWQiLCJjYWNoZSIsImxhc3RfZXBpc29kZSIsImdldExhc3RFcGlzb2RlIiwiaW5mbyIsInRyYW5zbGF0ZV9lcGlzb2RlX2VuZCIsInRyYW5zbGF0ZV92b2ljZSIsImhhc2giLCJvcmlnaW5hbF90aXRsZSIsImpvaW4iLCJ2aWV3IiwiVGltZWxpbmUiLCJUZW1wbGF0ZSIsImhhc2hfZmlsZSIsImFkZENsYXNzIiwidGltZWxpbmUiLCJkZXRhaWxzIiwib24iLCJGYXZvcml0ZSIsImFkZCIsImV4dHJhIiwicGxheWxpc3QiLCJmaXJzdCIsImV4IiwiUGxheWVyIiwicGxheSIsInNldCIsIk5vdHkiLCJzaG93IiwiY29udGV4dG1lbnUiLCJjYWxsIiwic3RhcnQiLCJyZXprYSIsImVtYmVkIiwic2VsZWN0X2lkIiwia2lub3BvaXNrX2lkIiwiZ2V0Rmlyc3RUcmFubGF0ZSIsImdldEZpbG0iLCJ0b2tlbiIsInNldFRpbWVvdXQiLCJjbG9zZUZpbHRlciIsImdldFNlYXNvbnMiLCJnZXRFbWJlZCIsInNlcyIsIk1hdGgiLCJtaW4iLCJjaGVjayIsIm5hbWUiLCJwYXJzZVN1YnRpdGxlcyIsInN1YnRpdGxlIiwic2IiLCJzcCIsImxhYmVsIiwicG9wIiwiZ2V0U3RyZWFtIiwiZXJyb3IiLCJzdHJlYW0iLCJ2aWRlb3MiLCJ2aWRlbyIsImRlY29kZSIsInF1c2VkIiwidHJpbSIsInF1YWxpdHlzIiwibGluayIsIlJlZ0V4cCIsInN1YnRpdGxlcyIsInByb2R1Y3QiLCJpdGVyYWJsZXMiLCJyZXBlYXQiLCJhcmd2IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJhcmd1bWVudHMiLCJhcmdjIiwiaXNOYU4iLCJjb3BpZXMiLCJyZWR1Y2UiLCJ0bCIsImFjY3VtdWxhdG9yIiwidG1wIiwiYTAiLCJhMSIsImNvbmNhdCIsInVuaXRlIiwiYXJyIiwiZmluYWwiLCJ0cmFzaExpc3QiLCJ0d28iLCJ0cmVlIiwidHJhc2hDb2Rlc1NldCIsInRyYXNoU3RyaW5nIiwiYnRvYSIsInJlc3VsdCIsImF0b2IiLCJzdWJzdHIiLCJ2b2ljZXMiLCJzZXNvbnMiLCJlcGlzb2QiLCJzZWxlY3QiLCJlYWNoIiwiYXR0ciIsInZhbCIsIlBsYXRmb3JtIiwidmVyc2lvbiIsImNlbGwiLCJraW5vYmFzZSIsImtwX2lkIiwic2ltIiwiX3RoaXMiLCJ3YWl0X3NpbWlsYXJzIiwiZ2V0UGFnZSIsImNsZWFuVGl0bGUiLCJsaW5rcyIsInJlbGlzZSIsInNlYXJjaF9kYXRlIiwiZmlyc3RfYWlyX2RhdGUiLCJyZWxlYXNlX2RhdGUiLCJuZWVkX3llYXIiLCJmb3VuZF91cmwiLCJjYXJkcyIsImwiLCJ0aXRsIiwieWVhciIsImNhcmQiLCJzaW1pbGFycyIsImZpbG1JZCIsImNvbW1lbnQiLCJzZXJpYWwiLCJwYXJzZVN1YnMiLCJ2b2QiLCJuYW0iLCJwYWdlIiwic3VidGlsZXMiLCJxdWFsaXR5X3R5cGUiLCJlbCIsImVsMiIsInJldmVyc2UiLCJNT1ZJRV9JRCIsIklERU5USUZJRVIiLCJQTEFZRVJfQ1VJRCIsImlkZW50aWZpZXIiLCJwbGF5ZXJfY3VpZCIsImRhdGFfdXJsIiwiRGF0ZSIsIm5vdyIsInVzZXJfZGF0YSIsInZvZF9oYXNoIiwiZmlsZV91cmwiLCJ2b2RfdGltZSIsImZpbGVzIiwicSIsImNvbGxhcHMiLCJwYXJzZSIsImV2YWwiLCJzZWFzb25zIiwiaGxzIiwiYXVkaW8iLCJuYW1lcyIsImNjIiwic291cmNlIiwicmVzb2x1dGlvbiIsImdldEtleXMiLCJxdWFsaXR5QnlXaWR0aCIsImNkbm1vdmllcyIsImFycmF5X2RhdGEiLCJrZXkiLCJKU09OIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiY2hhckNvZGVBdCIsInRvU3RyaW5nIiwicGF0aCIsImxhc3RJbmRleE9mIiwidCIsInNlIiwiZXBzIiwic2hvcnRUZXh0IiwiZmlsbWl4Iiwid2luZG93IiwibWF4X3F1YWxpdGllIiwiaXNfbWF4X3F1YWxpdGllIiwiZGV2X3Rva2VuIiwib3JpZyIsIm9yaWdpbmFsX25hbWUiLCJhbHRfbmFtZSIsImZpbG1peF9pZCIsImlzX3BybyIsImlzX3Byb19wbHVzIiwiZW5kX3NlYXJjaCIsIk9iamVjdCIsImtleXMiLCJwbF9saW5rcyIsInBsYXllcl9saW5rcyIsInNlYXNfbnVtIiwidHJhbnNsX2lkIiwiZXBpc29kZV92b2ljZSIsIklEIiwiZmlsZV9lcGlzb2QiLCJxdWFsaXR5X2VwcyIsInF1YWxpdGllcyIsIm1heCIsImFwcGx5Iiwic3RyZWFtX3VybCIsInNfZSIsInN0cl9zX2UiLCJlcGlzX251bSIsInF1YWxpdHlfIiwib3JpbiIsIklkIiwiZCIsInZvaWMiLCJ0cmFuc2wiLCJzZWFzb25faWQiLCJzY3JvbGwiLCJTY3JvbGwiLCJtYXNrIiwib3ZlciIsIkZpbGVzIiwiRmlsdGVyIiwiYmFsYW5zZXIiLCJsYXN0X2JscyIsInByb3giLCJuZWVkIiwic291cmNlcyIsImxhc3QiLCJsYXN0X2ZpbHRlciIsImV4dGVuZGVkIiwic2VsZWN0ZWRfaWQiLCJmaWx0ZXJfdHJhbnNsYXRlIiwiZmlsdGVyX3NvdXJjZXMiLCJpZ25vcmVfc291cmNlcyIsImtpcG9za19zb3VyY2VzIiwiYm9keSIsIm1pbnVzIiwiaW5uZXJXaWR0aCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjcmVhdGUiLCJhY3Rpdml0eSIsImxvYWRlciIsIm9uU2VhcmNoIiwiQWN0aXZpdHkiLCJjbGFyaWZpY2F0aW9uIiwib25CYWNrIiwidGFyZ2V0Iiwib25TZWxlY3QiLCJTZWxlY3QiLCJjbG9zZSIsIl90aGlzMiIsInF1ZXJ5IiwiZGlzcGxheSIsImltZGIiLCJwaWxsb3ciLCJmaWxtcyIsImhlYWRlcnMiLCJsZXRnbyIsInVybF9lbmQiLCJiaW5kIiwidG1kYnVybCIsImJhc2V1cmwiLCJUTURCIiwiYXBpIiwidHRpZCIsInNhdmUiLCJfdGhpczMiLCJzdGFydF9kYXRlIiwiZW5fdGl0bGUiLCJuYW1lUnUiLCJuYW1lRW4iLCJkZXRhY2giLCJzdGF0dXMiLCJ0b2dnbGUiLCJzdWJpdGVtcyIsInNlbGVjdGVkIiwiaGFzQ2xhc3MiLCJjaG9zZW4iLCJ1cGRhdGUiLCJwYXJhbXMiLCJlbmFibGVkIiwiQ29udHJvbGxlciIsIm1lbnUiLCJtYXJrIiwiY2xlYXJtYXJrIiwidGltZWNsZWFyIiwiaXMiLCJwbGF5ZXIiLCJjb3B5bGluayIsIkFjY291bnQiLCJ3b3JraW5nIiwic3Vic2NyaWJlVG9UcmFuc2xhdGlvbiIsInN1YnNjcmliZSIsInBlcmNlbnQiLCJ0aW1lIiwiZHVyYXRpb24iLCJydW5hcyIsInRyaWdnZXIiLCJxdWFsIiwiY29weVRleHRUb0NsaXBib2FyZCIsIkhlbHBlciIsIm1zZyIsImZpcnN0X3NlbGVjdCIsImFjdGl2ZSIsImxhc3Rfdmlld3MiLCJwYXJlbnQiLCJlcSIsIkJhY2tncm91bmQiLCJpbW1lZGlhdGVseSIsImNhcmRJbWdCYWNrZ3JvdW5kIiwiY29sbGVjdGlvblNldCIsImNvbGxlY3Rpb25Gb2N1cyIsInVwIiwiTmF2aWdhdG9yIiwiY2FubW92ZSIsIm1vdmUiLCJkb3duIiwicmlnaHQiLCJsZWZ0IiwiYmFjayIsImJhY2t3YXJkIiwicGF1c2UiLCJzdG9wIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImxhbmdfZGF0YSIsInJ1Iiwib25saW5lX25vbGluayIsInVrIiwiZW4iLCJ6aCIsImJnIiwib25saW5lX3dhaXRsaW5rIiwib25saW5lX2JhbGFuc2VyIiwiaGVscGVyX29ubGluZV9maWxlIiwib25saW5lX3F1ZXJ5X3N0YXJ0Iiwib25saW5lX3F1ZXJ5X2VuZCIsInRpdGxlX29ubGluZSIsInRpdGxlX3Byb3h5Iiwib25saW5lX3Byb3h5X3RpdGxlIiwib25saW5lX3Byb3h5X2Rlc2NyIiwib25saW5lX3Byb3h5X3BsYWNlaG9sZGVyIiwiZmlsbWl4X3BhcmFtX2FkZF90aXRsZSIsImZpbG1peF9wYXJhbV9hZGRfZGVzY3IiLCJmaWxtaXhfcGFyYW1fcGxhY2Vob2xkZXIiLCJmaWxtaXhfcGFyYW1fYWRkX2RldmljZSIsImZpbG1peF9tb2RhbF90ZXh0IiwiZmlsbWl4X21vZGFsX3dhaXQiLCJmaWxtaXhfY29weV9zZWN1c2VzIiwiZmlsbWl4X2NvcHlfZmFpbCIsImZpbG1peF9ub2RldmljZSIsInRpdGxlX3N0YXR1cyIsIm9ubGluZV92b2ljZV9zdWJzY3JpYmUiLCJvbmxpbmVfdm9pY2Vfc3VjY2VzcyIsIm9ubGluZV92b2ljZV9lcnJvciIsInJlc2V0VGVtcGxhdGVzIiwiYnV0dG9uIiwiQ29tcG9uZW50IiwiT25saW5lIiwiTGlzdGVuZXIiLCJmb2xsb3ciLCJidG4iLCJzZWFyY2hfb25lIiwic2VhcmNoX3R3byIsImFmdGVyIiwiUGFyYW1zIiwiYWRkU2V0dGluZ3NQcm94eSIsIlNldHRpbmdzIiwibWFpbiIsImZpZWxkIiwiYXBwcmVhZHkiLCJhcGlfdXJsIiwidXNlcl9kZXYiLCJ1aWQiLCJwaW5nX2F1dGgiLCJsaXN0ZW5lciIsImNoZWNrUHJvIiwic2hvd1N0YXR1cyIsImFkZFNldHRpbmdzRmlsbWl4IiwidW5iaW5kIiwidXNlcl9jb2RlIiwidXNlcl90b2tlbiIsIm1vZGFsIiwiTW9kYWwiLCJvcGVuIiwiaHRtbCIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInF1aWV0IiwiY29kZSIsImxvZ2luIiwicHJvX2RhdGUiXSwibWFwcGluZ3MiOiI7OztJQUFBLFNBQVNBLFFBQVFBLENBQUNDLFNBQVMsRUFBRUMsT0FBTyxFQUFDO01BQ2pDLElBQUlDLE9BQU8sR0FBSSxJQUFJQyxLQUFLLENBQUNDLE9BQU8sRUFBRTtNQUNsQyxJQUFJQyxPQUFPLEdBQUksRUFBRTtNQUNqQixJQUFJQyxPQUFPLEdBQUksRUFBRTtNQUNqQixJQUFJQyxNQUFNLEdBQUtOLE9BQU87TUFDdEIsSUFBSU8sWUFBWSxHQUFHLEVBQUU7TUFDckIsSUFBSUMsY0FBYyxHQUFHLEtBQUs7TUFFMUIsSUFBSUMsWUFBWSxHQUFHLEVBQUU7TUFFckIsSUFBSUMsTUFBTSxHQUFHO1FBQ1RDLE1BQU0sRUFBRSxDQUFDO1FBQ1RDLEtBQUssRUFBRSxDQUFDO1FBQ1JDLFVBQVUsRUFBRSxFQUFFO1FBQ2RDLFFBQVEsRUFBRTtPQUNiOzs7SUFHTDtJQUNBO0lBQ0E7TUFDSSxJQUFJLENBQUNDLE1BQU0sR0FBRyxVQUFTZixPQUFPLEVBQUVnQixJQUFJLEVBQUM7UUFDakNWLE1BQU0sR0FBR04sT0FBTztRQUVoQk8sWUFBWSxHQUFHRCxNQUFNLENBQUNXLEtBQUssQ0FBQ0MsS0FBSztRQUVqQ1YsY0FBYyxHQUFHLElBQUk7UUFFckIsSUFBSVcsR0FBRyxHQUFJcEIsU0FBUyxDQUFDcUIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLDZCQUE2QjtRQUN0RSxJQUFJQyxHQUFHLEdBQUlMLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSU0sSUFBSSxHQUFHRCxHQUFHLENBQUNFLFVBQVUsQ0FBQ0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakQsSUFBR0gs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