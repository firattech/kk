(function () {
    'use strict';

    function Collection(data) {
      this.data = data;
      function remove(elem) {
        if (elem) elem.remove();
      }
      this.build = function () {
        this.item = Lampa.Template.js('cub_collection');
        this.img = this.item.find('.card__img');
        this.icon = this.item.find('.cub-collection-card__user-icon img');
        this.item.find('.card__title').text(Lampa.Utils.capitalizeFirstLetter(data.title));
        this.item.find('.cub-collection-card__items').text(data.items_count);
        this.item.find('.cub-collection-card__date').text(Lampa.Utils.parseTime(data.time).full);
        this.item.find('.cub-collection-card__views').text(Lampa.Utils.bigNumberToShort(data.views));
        this.item.find('.full-review__like-counter').text(Lampa.Utils.bigNumberToShort(data.liked));
        this.item.find('.cub-collection-card__user-name').text(data.username);
        this.item.addEventListener('visible', this.visible.bind(this));
      };

      /**
       * Загрузить картинку
       */
      this.image = function () {
        var _this = this;
        this.img.onload = function () {
          _this.item.classList.add('card--loaded');
        };
        this.img.onerror = function () {
          _this.img.src = './img/img_broken.svg';
        };
        this.icon.onload = function () {
          _this.item.find('.cub-collection-card__user-icon').classList.add('loaded');
        };
        this.icon.onerror = function () {
          _this.icon.src = './img/img_broken.svg';
        };
      };

      /**
       * Создать
       */
      this.create = function () {
        var _this2 = this;
        this.build();
        this.item.addEventListener('hover:focus', function () {
          if (_this2.onFocus) _this2.onFocus(_this2.item, data);
        });
        this.item.addEventListener('hover:touch', function () {
          if (_this2.onTouch) _this2.onTouch(_this2.item, data);
        });
        this.item.addEventListener('hover:hover', function () {
          if (_this2.onHover) _this2.onHover(_this2.item, data);
        });
        this.item.addEventListener('hover:enter', function () {
          Lampa.Activity.push({
            url: data.id,
            collection: data,
            title: Lampa.Utils.capitalizeFirstLetter(data.title),
            component: 'cub_collections_view',
            page: 1
          });
        });
        this.item.addEventListener('hover:long', function () {
          var items = [];
          var voited = Lampa.Storage.cache('collections_voited', 100, []);
          items.push({
            title: 'Коллeкции @' + data.username,
            user: data.cid
          });
          if (voited.indexOf(data.id) == -1) {
            items = items.concat([{
              title: '<span class="settings-param__label">+1</span> ' + Lampa.Lang.translate('title_like'),
              like: 1
            }, {
              title: Lampa.Lang.translate('reactions_shit'),
              like: -1
            }]);
          }
          Lampa.Select.show({
            title: Lampa.Lang.translate('title_action'),
            items: items,
            onSelect: function onSelect(item) {
              Lampa.Controller.toggle('content');
              if (item.user) {
                Lampa.Activity.push({
                  url: 'user_' + item.user,
                  title: 'Коллeкции @' + data.username,
                  component: 'cub_collections_collection',
                  page: 1
                });
              } else {
                Api.liked({
                  id: data.id,
                  dir: item.like
                }, function () {
                  voited.push(data.id);
                  Lampa.Storage.set('collections_voited', voited);
                  data.liked += item.like;
                  _this2.item.find('.full-review__like-counter').text(Lampa.Utils.bigNumberToShort(data.liked));
                  Lampa.Bell.push({
                    text: Lampa.Lang.translate('discuss_voited')
                  });
                });
              }
            },
            onBack: function onBack() {
              Lampa.Controller.toggle('content');
            }
          });
        });
        this.image();
      };

      /**
       * Загружать картинку если видна карточка
       */
      this.visible = function () {
        this.img.src = Lampa.Api.img(data.backdrop_path, 'w500');
        this.icon.src = Lampa.Utils.protocol() + Lampa.Manifest.cub_domain + '/img/profiles/' + data.icon + '.png';
        if (this.onVisible) this.onVisible(this.item, data);
      };

      /**
       * Уничтожить
       */
      this.destroy = function () {
        this.img.onerror = function () {};
        this.img.onload = function () {};
        this.img.src = '';
        remove(this.item);
        this.item = null;
        this.img = null;
      };

      /**
       * Рендер
       * @returns {object}
       */
      this.render = function (js) {
        return js ? this.item : $(this.item);
      };
    }

    var network = new Lampa.Reguest();
    var api_url = Lampa.Utils.protocol() + Lampa.Manifest.cub_domain + '/api/collections/';
    var collections = [{
      hpu: 'user',
      title: 'Мои коллекции'
    }, {
      hpu: 'new',
      title: 'Новинки'
    }, {
      hpu: 'top',
      title: 'В топе'
    }, {
      hpu: 'week',
      title: 'Популярные за неделю'
    }, {
      hpu: 'month',
      title: 'Популярные за месяц'
    }, {
      hpu: 'big',
      title: 'Большие коллекции'
    }, {
      hpu: 'all',
      title: 'Все коллекции'
    }];
    function header() {
      var user = Lampa.Storage.get('account', '{}');
      if (!user.token) return false;
      return {
        headers: {
          token: user.token,
          profile: user.id
        }
      };
    }
    function main(params, oncomplite, onerror) {
      var user = Lampa.Storage.get('account', '{}');
      var status = new Lampa.Status(collections.length);
      status.onComplite = function () {
        var keys = Object.keys(status.data);
        var sort = collections.map(function (a) {
          return a.hpu;
        });
        if (keys.length) {
          var fulldata = [];
          keys.sort(function (a, b) {
            return sort.indexOf(a) - sort.indexOf(b);
          });
          keys.forEach(function (key) {
            var data = status.data[key];
            data.title = collections.find(function (item) {
              return item.hpu == key;
            }).title;
            data.cardClass = function (elem, param) {
              return new Collection(elem, param);
            };
            fulldata.push(data);
          });
          oncomplite(fulldata);
        } else onerror();
      };
      collections.forEach(function (item) {
        if (item.hpu == 'user' && !user.token) return status.error();
        var url = api_url + 'list?category=' + item.hpu;
        if (item.hpu == 'user') url = api_url + 'list?cid=' + user.id;
        network.silent(url, function (data) {
          data.collection = true;
          data.line_type = 'collection';
          data.category = item.hpu;
          status.append(item.hpu, data);
        }, status.error.bind(status), false, header());
      });
    }
    function collection(params, oncomplite, onerror) {
      var url = api_url + 'list?category=' + params.url + '&page=' + params.page;
      if (params.url.indexOf('user') >= 0) {
        url = api_url + 'list?cid=' + params.url.split('_').pop() + '&page=' + params.page;
      }
      network.silent(url, function (data) {
        data.collection = true;
        data.total_pages = data.total_pages || 15;
        data.cardClass = function (elem, param) {
          return new Collection(elem, param);
        };
        oncomplite(data);
      }, onerror, false, header());
    }
    function liked(params, callaback) {
      network.silent(api_url + 'liked', callaback, function (a, e) {
        Lampa.Noty.show(network.errorDecode(a, e));
      }, params, header());
    }
    function full(params, oncomplite, onerror) {
      network.silent(api_url + 'view/' + params.url + '?page=' + params.page, function (data) {
        data.total_pages = data.total_pages || 15;
        oncomplite(data);
      }, onerror, false, header());
    }
    function clear() {
      network.clear();
    }
    var Api = {
      main: main,
      collection: collection,
      full: full,
      clear: clear,
      liked: liked
    };

    function component$2(object) {
      var comp = new Lampa.InteractionMain(object);
      comp.create = function () {
        var _this = this;
        this.activity.loader(true);
        Api.main(object, function (data) {
          _this.build(data);
        }, this.empty.bind(this));
        return this.render();
      };
      comp.onMore = function (data) {
        Lampa.Activity.push({
          url: data.category + (data.category == 'user' ? '_' + data.cid : ''),
          title: data.title,
          component: 'cub_collections_collection',
          page: 1
        });
      };
      return comp;
    }

    function component$1(object) {
      var comp = new Lampa.InteractionCategory(object);
      comp.create = function () {
        var _this = this;
        Api.full(object, function (data) {
          _this.build(data);
          comp.render().find('.category-full').addClass('mapping--grid cols--6');
        }, this.empty.bind(this));
      };
      comp.nextPageReuest = function (object, resolve, reject) {
        Api.full(object, resolve.bind(comp), reject.bind(comp));
      };
      return comp;
    }

    function component(object) {
      var comp = new Lampa.InteractionCategory(object);
      comp.create = function () {
        Api.collection(object, this.build.bind(this), this.empty.bind(this));
      };
      comp.nextPageReuest = function (object, resolve, reject) {
        Api.collection(object, resolve.bind(comp), reject.bind(comp));
      };
      comp.cardRender = function (object, element, card) {
        card.onMenu = false;
        card.onEnter = function () {
          Lampa.Activity.push({
            url: element.id,
            title: element.title,
            component: 'cub_collection',
            page: 1
          });
        };
      };
      return comp;
    }

    function startPlugin() {
      var manifest = {
        type: 'video',
        version: '1.1.2',
        name: 'Коллекции',
        description: '',
        component: 'cub_collections'
      };
      Lampa.Manifest.plugins = manifest;
      Lampa.Component.add('cub_collections_main', component$2);
      Lampa.Component.add('cub_collections_collection', component);
      Lampa.Component.add('cub_collections_view', component$1);
      Lampa.Template.add('cub_collection', "<div class=\"card cub-collection-card selector layer--visible layer--render card--collection\">\n        <div class=\"card__view\">\n            <img src=\"./img/img_load.svg\" class=\"card__img\">\n            <div class=\"cub-collection-card__head\">\n                <div class=\"cub-collection-card__items\"></div>\n                <div class=\"cub-collection-card__date\"></div>\n            </div>\n            <div class=\"cub-collection-card__bottom\">\n                <div class=\"cub-collection-card__views\"></div>\n                <div class=\"cub-collection-card__liked\">\n                    <div class=\"full-review__like-icon\">\n                        <svg width=\"29\" height=\"27\" viewBox=\"0 0 29 27\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.0131 9.05733H3.75799C2.76183 9.05903 1.80696 9.45551 1.10257 10.1599C0.39818 10.8643 0.00170332 11.8192 0 12.8153V23.0778C0.00170332 24.074 0.39818 25.0289 1.10257 25.7333C1.80696 26.4377 2.76183 26.8341 3.75799 26.8358H23.394C24.2758 26.8354 25.1294 26.5252 25.8056 25.9594C26.4819 25.3936 26.9379 24.6082 27.094 23.7403L28.9408 13.4821C29.038 12.9408 29.0153 12.3849 28.8743 11.8534C28.7333 11.3218 28.4774 10.8277 28.1247 10.4058C27.7721 9.98391 27.3311 9.6445 26.833 9.41151C26.3349 9.17852 25.7918 9.05762 25.2419 9.05733H18.5043V3.63509C18.5044 2.90115 18.2824 2.18438 17.8673 1.57908C17.4522 0.973783 16.8636 0.508329 16.179 0.243966C15.4943 -0.0203976 14.7456 -0.0712821 14.0315 0.0980078C13.3173 0.267298 12.6712 0.648829 12.178 1.1924L12.1737 1.19669C10.5632 2.98979 9.70849 5.78681 8.79584 7.79142C8.6423 8.14964 8.45537 8.49259 8.23751 8.81574C8.16898 8.90222 8.09358 8.98301 8.01203 9.05733H8.0131ZM6.54963 23.6147H3.75799C3.68706 23.6147 3.61686 23.6005 3.55156 23.5728C3.48626 23.5452 3.42719 23.5046 3.37789 23.4536C3.32786 23.4047 3.28819 23.3463 3.26126 23.2817C3.23433 23.2171 3.22068 23.1478 3.22113 23.0778V12.8164C3.22068 12.7464 3.23433 12.6771 3.26126 12.6125C3.28819 12.548 3.32786 12.4895 3.37789 12.4406C3.42719 12.3896 3.48626 12.3491 3.55156 12.3214C3.61686 12.2937 3.68706 12.2795 3.75799 12.2795H6.54963V23.6147ZM9.77077 11.7599C10.3704 11.336 10.8649 10.7803 11.216 10.1353C11.8221 8.94289 12.3599 7.71687 12.8265 6.46324C13.2315 5.33852 13.818 4.28775 14.5627 3.3527C14.6197 3.29181 14.6935 3.24913 14.7747 3.23003C14.8559 3.21093 14.9409 3.21625 15.0191 3.24533C15.0976 3.27557 15.165 3.32913 15.2122 3.3988C15.2594 3.46848 15.2842 3.55093 15.2832 3.63509V10.6679C15.2831 10.8794 15.3246 11.0889 15.4055 11.2844C15.4864 11.4799 15.605 11.6575 15.7546 11.8071C15.9042 11.9566 16.0818 12.0753 16.2773 12.1562C16.4727 12.237 16.6822 12.2786 16.8938 12.2785H25.2419C25.3207 12.2784 25.3986 12.2961 25.4698 12.3301C25.5409 12.3641 25.6036 12.4136 25.6531 12.4749C25.7042 12.5345 25.7411 12.6049 25.7612 12.6807C25.7813 12.7566 25.784 12.836 25.7691 12.913L23.9223 23.1723C23.8993 23.296 23.834 23.4077 23.7376 23.4885C23.6412 23.5692 23.5197 23.6138 23.394 23.6147H9.77077V11.7599Z\" fill=\"currentColor\"></path>\n                        </svg>\n                    </div>\n                    <div class=\"full-review__like-counter\"></div>\n                </div>\n                <div class=\"cub-collection-card__user-name\"></div>\n                <div class=\"cub-collection-card__user-icon\">\n                    <img >\n                </div>\n            </div>\n        </div>\n        <div class=\"card__title\"></div>\n    </div>");
      var style = "\n        <style>\n        .cub-collection-card__head{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;padding:.5em 1em;color:#fff;font-size:1em;font-weight:500;position:absolute;top:0;left:0;width:100%}.cub-collection-card__bottom{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:.5em 1em;background-color:rgba(0,0,0,0.5);color:#fff;font-size:1em;font-weight:400;-webkit-border-radius:1em;border-radius:1em;position:absolute;bottom:0;left:0;width:100%}.cub-collection-card__liked{padding-left:1em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.cub-collection-card__liked .full-review__like-icon{margin-top:-0.2em}.cub-collection-card__liked .full-review__like-counter{font-weight:600}.cub-collection-card__items{background:rgba(0,0,0,0.5);padding:.3em;-webkit-border-radius:.2em;border-radius:.2em}.cub-collection-card__user-name{padding:0 1em;margin-left:auto}.cub-collection-card__user-icon{width:2em;height:2em;-webkit-border-radius:100%;border-radius:100%;background-color:#fff;border:.2em solid #fff}.cub-collection-card__user-icon img{width:100%;height:100%;-webkit-border-radius:100%;border-radius:100%;opacity:0}.cub-collection-card__user-icon.loaded img{opacity:1}.category-full .cub-collection-card{padding-bottom:2em}body.glass--style .cub-collection-card__bottom,body.glass--style .cub-collection-card__items{background-color:rgba(0,0,0,0.3);-webkit-backdrop-filter:blur(1.6em);backdrop-filter:blur(1.6em)}body.light--version .cub-collection-card__bottom{-webkit-border-radius:0;border-radius:0}@media screen and (max-width:767px){.category-full .cub-collection-card{width:33.3%}}@media screen and (max-width:580px){.category-full .cub-collection-card{width:50%}}@media screen and (max-width:991px){body.light--version .category-full .cub-collection-card{width:33.3%}}@media screen and (max-width:580px){body.light--version .category-full .cub-collection-card{width:50%}}@media screen and (max-width:991px){body.light--version.size--bigger .category-full .cub-collection-card{width:50%}}\n        </style>\n    ";
      Lampa.Template.add('cub_collections_css', style);
      $('body').append(Lampa.Template.get('cub_collections_css', {}, true));
      function add() {
        var button = $("<li class=\"menu__item selector\">\n            <div class=\"menu__ico\">\n                <svg width=\"191\" height=\"239\" viewBox=\"0 0 191 239\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M35.3438 35.3414V26.7477C35.3438 19.9156 38.0594 13.3543 42.8934 8.51604C47.7297 3.68251 54.2874 0.967027 61.125 0.966431H164.25C171.086 0.966431 177.643 3.68206 182.482 8.51604C187.315 13.3524 190.031 19.91 190.031 26.7477V186.471C190.031 189.87 189.022 193.192 187.133 196.018C185.245 198.844 182.561 201.046 179.421 202.347C176.28 203.647 172.825 203.988 169.492 203.325C166.158 202.662 163.096 201.026 160.692 198.623L155.656 193.587V220.846C155.656 224.245 154.647 227.567 152.758 230.393C150.87 233.219 148.186 235.421 145.046 236.722C141.905 238.022 138.45 238.363 135.117 237.7C131.783 237.037 128.721 235.401 126.317 232.998L78.3125 184.993L30.3078 232.998C27.9041 235.401 24.8419 237.037 21.5084 237.7C18.1748 238.363 14.7195 238.022 11.5794 236.722C8.43922 235.421 5.75517 233.219 3.86654 230.393C1.9779 227.567 0.969476 224.245 0.96875 220.846V61.1227C0.96875 54.2906 3.68437 47.7293 8.51836 42.891C13.3547 38.0575 19.9124 35.342 26.75 35.3414H35.3438ZM138.469 220.846V61.1227C138.469 58.8435 137.563 56.6576 135.952 55.046C134.34 53.4343 132.154 52.5289 129.875 52.5289H26.75C24.4708 52.5289 22.2849 53.4343 20.6733 55.046C19.0617 56.6576 18.1562 58.8435 18.1562 61.1227V220.846L66.1609 172.841C69.3841 169.619 73.755 167.809 78.3125 167.809C82.87 167.809 87.2409 169.619 90.4641 172.841L138.469 220.846ZM155.656 169.284L172.844 186.471V26.7477C172.844 24.4685 171.938 22.2826 170.327 20.671C168.715 19.0593 166.529 18.1539 164.25 18.1539H61.125C58.8458 18.1539 56.6599 19.0593 55.0483 20.671C53.4367 22.2826 52.5312 24.4685 52.5312 26.7477V35.3414H129.875C136.711 35.3414 143.268 38.0571 148.107 42.891C152.94 47.7274 155.656 54.285 155.656 61.1227V169.284Z\" fill=\"currentColor\"/>\n                </svg>\n            </div>\n            <div class=\"menu__text\">".concat(manifest.name, "</div>\n        </li>"));
        button.on('hover:enter', function () {
          Lampa.Activity.push({
            url: '',
            title: manifest.name,
            component: 'cub_collections_main',
            page: 1
          });
        });
        $('.menu .menu__list').eq(0).append(button);
      }
      if (window.appready) add();else {
        Lampa.Listener.follow('app', function (e) {
          if (e.type == 'ready') add();
        });
      }
    }
    if (!window.cub_collections_ready && Lampa.Manifest.app_digital >= 242) startPlugin();

})();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbnMuanMiLCJzb3VyY2VzIjpbImNvbGxlY3Rpb25zL2NvbGxlY3Rpb24uanMiLCJjb2xsZWN0aW9ucy9hcGkuanMiLCJjb2xsZWN0aW9ucy9tYWluLmpzIiwiY29sbGVjdGlvbnMvdmlldy5qcyIsImNvbGxlY3Rpb25zL2NhdGVnb3J5LmpzIiwiY29sbGVjdGlvbnMvY29sbGVjdGlvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwaSBmcm9tICcuL2FwaSdcblxuZnVuY3Rpb24gQ29sbGVjdGlvbihkYXRhLCBwYXJhbXMgPSB7fSl7XG4gICAgdGhpcy5kYXRhID0gZGF0YVxuICAgIFxuICAgIGZ1bmN0aW9uIHJlbW92ZShlbGVtKXtcbiAgICAgICAgaWYoZWxlbSkgZWxlbS5yZW1vdmUoKVxuICAgIH1cblxuICAgIHRoaXMuYnVpbGQgPSBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLml0ZW0gID0gTGFtcGEuVGVtcGxhdGUuanMoJ2N1Yl9jb2xsZWN0aW9uJylcbiAgICAgICAgdGhpcy5pbWcgICA9IHRoaXMuaXRlbS5maW5kKCcuY2FyZF9faW1nJylcbiAgICAgICAgdGhpcy5pY29uICA9IHRoaXMuaXRlbS5maW5kKCcuY3ViLWNvbGxlY3Rpb24tY2FyZF9fdXNlci1pY29uIGltZycpXG5cbiAgICAgICAgdGhpcy5pdGVtLmZpbmQoJy5jYXJkX190aXRsZScpLnRleHQoTGFtcGEuVXRpbHMuY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKGRhdGEudGl0bGUpKVxuICAgICAgICB0aGlzLml0ZW0uZmluZCgnLmN1Yi1jb2xsZWN0aW9uLWNhcmRfX2l0ZW1zJykudGV4dChkYXRhLml0ZW1zX2NvdW50KVxuICAgICAgICB0aGlzLml0ZW0uZmluZCgnLmN1Yi1jb2xsZWN0aW9uLWNhcmRfX2RhdGUnKS50ZXh0KExhbXBhLlV0aWxzLnBhcnNlVGltZShkYXRhLnRpbWUpLmZ1bGwpXG4gICAgICAgIHRoaXMuaXRlbS5maW5kKCcuY3ViLWNvbGxlY3Rpb24tY2FyZF9fdmlld3MnKS50ZXh0KExhbXBhLlV0aWxzLmJpZ051bWJlclRvU2hvcnQoZGF0YS52aWV3cykpXG4gICAgICAgIHRoaXMuaXRlbS5maW5kKCcuZnVsbC1yZXZpZXdfX2xpa2UtY291bnRlcicpLnRleHQoTGFtcGEuVXRpbHMuYmlnTnVtYmVyVG9TaG9ydChkYXRhLmxpa2VkKSlcbiAgICAgICAgdGhpcy5pdGVtLmZpbmQoJy5jdWItY29sbGVjdGlvbi1jYXJkX191c2VyLW5hbWUnKS50ZXh0KGRhdGEudXNlcm5hbWUpXG4gICAgICAgIFxuICAgICAgICB0aGlzLml0ZW0uYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJsZScsdGhpcy52aXNpYmxlLmJpbmQodGhpcykpXG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqINCX0LDQs9GA0YPQt9C40YLRjCDQutCw0YDRgtC40L3QutGDXG4gICAgICovXG4gICAgdGhpcy5pbWFnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuaW1nLm9ubG9hZCA9ICgpPT57XG4gICAgICAgICAgICB0aGlzLml0ZW0uY2xhc3NMaXN0LmFkZCgnY2FyZC0tbG9hZGVkJylcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB0aGlzLmltZy5vbmVycm9yID0gKCk9PntcbiAgICAgICAgICAgIHRoaXMuaW1nLnNyYyA9ICcuL2ltZy9pbWdfYnJva2VuLnN2ZydcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaWNvbi5vbmxvYWQgPSAoKT0+e1xuICAgICAgICAgICAgdGhpcy5pdGVtLmZpbmQoJy5jdWItY29sbGVjdGlvbi1jYXJkX191c2VyLWljb24nKS5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIHRoaXMuaWNvbi5vbmVycm9yID0gKCk9PntcbiAgICAgICAgICAgIHRoaXMuaWNvbi5zcmMgPSAnLi9pbWcvaW1nX2Jyb2tlbi5zdmcnXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqINCh0L7Qt9C00LDRgtGMXG4gICAgICovXG4gICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmJ1aWxkKClcblxuICAgICAgICB0aGlzLml0ZW0uYWRkRXZlbnRMaXN0ZW5lcignaG92ZXI6Zm9jdXMnLCgpPT57XG4gICAgICAgICAgICBpZih0aGlzLm9uRm9jdXMpIHRoaXMub25Gb2N1cyh0aGlzLml0ZW0sIGRhdGEpXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5pdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2hvdmVyOnRvdWNoJywoKT0+e1xuICAgICAgICAgICAgaWYodGhpcy5vblRvdWNoKSB0aGlzLm9uVG91Y2godGhpcy5pdGVtLCBkYXRhKVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgdGhpcy5pdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2hvdmVyOmhvdmVyJywoKT0+e1xuICAgICAgICAgICAgaWYodGhpcy5vbkhvdmVyKSB0aGlzLm9uSG92ZXIodGhpcy5pdGVtLCBkYXRhKVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuaXRlbS5hZGRFdmVudExpc3RlbmVyKCdob3ZlcjplbnRlcicsKCk9PntcbiAgICAgICAgICAgIExhbXBhLkFjdGl2aXR5LnB1c2goe1xuICAgICAgICAgICAgICAgIHVybDogZGF0YS5pZCxcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uOiBkYXRhLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5VdGlscy5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoZGF0YS50aXRsZSksXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiAnY3ViX2NvbGxlY3Rpb25zX3ZpZXcnLFxuICAgICAgICAgICAgICAgIHBhZ2U6IDFcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICB0aGlzLml0ZW0uYWRkRXZlbnRMaXN0ZW5lcignaG92ZXI6bG9uZycsKCk9PntcbiAgICAgICAgICAgIGxldCBpdGVtcyA9IFtdXG4gICAgICAgICAgICBsZXQgdm9pdGVkID0gTGFtcGEuU3RvcmFnZS5jYWNoZSgnY29sbGVjdGlvbnNfdm9pdGVkJywxMDAsW10pXG5cbiAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn0JrQvtC70Ltl0LrRhtC40LggQCcgKyBkYXRhLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIHVzZXI6IGRhdGEuY2lkXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZih2b2l0ZWQuaW5kZXhPZihkYXRhLmlkKSA9PSAtMSl7XG4gICAgICAgICAgICAgICAgaXRlbXMgPSBpdGVtcy5jb25jYXQoW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJzxzcGFuIGNsYXNzPVwic2V0dGluZ3MtcGFyYW1fX2xhYmVsXCI+KzE8L3NwYW4+ICcgKyBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndGl0bGVfbGlrZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGlrZTogMVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3JlYWN0aW9uc19zaGl0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWtlOiAtMVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgTGFtcGEuU2VsZWN0LnNob3coe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgndGl0bGVfYWN0aW9uJyksXG4gICAgICAgICAgICAgICAgaXRlbXM6IGl0ZW1zLFxuICAgICAgICAgICAgICAgIG9uU2VsZWN0OiAoaXRlbSk9PntcbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ2NvbnRlbnQnKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0udXNlcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5BY3Rpdml0eS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICd1c2VyXycgKyBpdGVtLnVzZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfQmtC+0LvQu2XQutGG0LjQuCBAJyArIGRhdGEudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiAnY3ViX2NvbGxlY3Rpb25zX2NvbGxlY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFwaS5saWtlZCh7aWQ6IGRhdGEuaWQsIGRpcjogaXRlbS5saWtlfSwoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvaXRlZC5wdXNoKGRhdGEuaWQpXG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdjb2xsZWN0aW9uc192b2l0ZWQnLCB2b2l0ZWQpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxpa2VkICs9IGl0ZW0ubGlrZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtLmZpbmQoJy5mdWxsLXJldmlld19fbGlrZS1jb3VudGVyJykudGV4dChMYW1wYS5VdGlscy5iaWdOdW1iZXJUb1Nob3J0KGRhdGEubGlrZWQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuQmVsbC5wdXNoKHt0ZXh0OkxhbXBhLkxhbmcudHJhbnNsYXRlKCdkaXNjdXNzX3ZvaXRlZCcpfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQmFjazogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ2NvbnRlbnQnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5pbWFnZSgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JfQsNCz0YDRg9C20LDRgtGMINC60LDRgNGC0LjQvdC60YMg0LXRgdC70Lgg0LLQuNC00L3QsCDQutCw0YDRgtC+0YfQutCwXG4gICAgICovXG4gICAgdGhpcy52aXNpYmxlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5pbWcuc3JjICA9IExhbXBhLkFwaS5pbWcoZGF0YS5iYWNrZHJvcF9wYXRoLCAndzUwMCcpXG4gICAgICAgIHRoaXMuaWNvbi5zcmMgPSBMYW1wYS5VdGlscy5wcm90b2NvbCgpICsgTGFtcGEuTWFuaWZlc3QuY3ViX2RvbWFpbiArICcvaW1nL3Byb2ZpbGVzLycgKyBkYXRhLmljb24gKyAnLnBuZydcblxuICAgICAgICBpZih0aGlzLm9uVmlzaWJsZSkgdGhpcy5vblZpc2libGUodGhpcy5pdGVtLCBkYXRhKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCj0L3QuNGH0YLQvtC20LjRgtGMXG4gICAgICovXG4gICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5pbWcub25lcnJvciA9ICgpPT57fVxuICAgICAgICB0aGlzLmltZy5vbmxvYWQgPSAoKT0+e31cblxuICAgICAgICB0aGlzLmltZy5zcmMgPSAnJ1xuXG4gICAgICAgIHJlbW92ZSh0aGlzLml0ZW0pXG5cbiAgICAgICAgdGhpcy5pdGVtID0gbnVsbFxuXG4gICAgICAgIHRoaXMuaW1nID0gbnVsbFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCg0LXQvdC00LXRgFxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5yZW5kZXIgPSBmdW5jdGlvbihqcyl7XG4gICAgICAgIHJldHVybiBqcyA/IHRoaXMuaXRlbSA6ICQodGhpcy5pdGVtKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29sbGVjdGlvbiIsImltcG9ydCBDb2xsZWN0aW9uIGZyb20gJy4vY29sbGVjdGlvbi5qcydcblxubGV0IG5ldHdvcmsgPSBuZXcgTGFtcGEuUmVndWVzdCgpXG5sZXQgYXBpX3VybCA9IExhbXBhLlV0aWxzLnByb3RvY29sKCkgKyBMYW1wYS5NYW5pZmVzdC5jdWJfZG9tYWluICsgJy9hcGkvY29sbGVjdGlvbnMvJ1xuXG5sZXQgY29sbGVjdGlvbnMgPSBbXG4gICAge1xuICAgICAgICBocHU6ICd1c2VyJyxcbiAgICAgICAgdGl0bGU6ICfQnNC+0Lgg0LrQvtC70LvQtdC60YbQuNC4JyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaHB1OiAnbmV3JyxcbiAgICAgICAgdGl0bGU6ICfQndC+0LLQuNC90LrQuCcsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGhwdTogJ3RvcCcsXG4gICAgICAgIHRpdGxlOiAn0JIg0YLQvtC/0LUnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBocHU6ICd3ZWVrJyxcbiAgICAgICAgdGl0bGU6ICfQn9C+0L/Rg9C70Y/RgNC90YvQtSDQt9CwINC90LXQtNC10LvRjicsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGhwdTogJ21vbnRoJyxcbiAgICAgICAgdGl0bGU6ICfQn9C+0L/Rg9C70Y/RgNC90YvQtSDQt9CwINC80LXRgdGP0YYnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBocHU6ICdiaWcnLFxuICAgICAgICB0aXRsZTogJ9CR0L7Qu9GM0YjQuNC1INC60L7Qu9C70LXQutGG0LjQuCcsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGhwdTogJ2FsbCcsXG4gICAgICAgIHRpdGxlOiAn0JLRgdC1INC60L7Qu9C70LXQutGG0LjQuCcsXG4gICAgfVxuXVxuXG5mdW5jdGlvbiBoZWFkZXIoKXtcbiAgICBsZXQgdXNlciA9IExhbXBhLlN0b3JhZ2UuZ2V0KCdhY2NvdW50JywgJ3t9JylcblxuICAgIGlmKCF1c2VyLnRva2VuKSByZXR1cm4gZmFsc2VcblxuICAgIHJldHVybiB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIHRva2VuOiB1c2VyLnRva2VuLFxuICAgICAgICAgICAgcHJvZmlsZTogdXNlci5pZFxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBtYWluKHBhcmFtcywgb25jb21wbGl0ZSwgb25lcnJvcil7XG4gICAgbGV0IHVzZXIgICA9IExhbXBhLlN0b3JhZ2UuZ2V0KCdhY2NvdW50JywgJ3t9JylcbiAgICBsZXQgc3RhdHVzID0gbmV3IExhbXBhLlN0YXR1cyhjb2xsZWN0aW9ucy5sZW5ndGgpXG5cbiAgICBzdGF0dXMub25Db21wbGl0ZSA9ICgpPT57XG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMoc3RhdHVzLmRhdGEpXG4gICAgICAgIGxldCBzb3J0ID0gY29sbGVjdGlvbnMubWFwKGE9PmEuaHB1KVxuXG4gICAgICAgIGlmKGtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgZnVsbGRhdGEgPSBbXVxuXG4gICAgICAgICAgICBrZXlzLnNvcnQoKGEsYik9PntyZXR1cm4gc29ydC5pbmRleE9mKGEpIC0gc29ydC5pbmRleE9mKGIpfSlcblxuICAgICAgICAgICAga2V5cy5mb3JFYWNoKGtleT0+e1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gc3RhdHVzLmRhdGFba2V5XVxuICAgICAgICAgICAgICAgICAgICBkYXRhLnRpdGxlID0gY29sbGVjdGlvbnMuZmluZChpdGVtPT5pdGVtLmhwdSA9PSBrZXkpLnRpdGxlXG5cbiAgICAgICAgICAgICAgICAgICAgZGF0YS5jYXJkQ2xhc3MgPSAoZWxlbSwgcGFyYW0pPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbGxlY3Rpb24oZWxlbSwgcGFyYW0pXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZ1bGxkYXRhLnB1c2goZGF0YSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIG9uY29tcGxpdGUoZnVsbGRhdGEpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBvbmVycm9yKClcbiAgICB9XG5cbiAgICBjb2xsZWN0aW9ucy5mb3JFYWNoKGl0ZW09PntcbiAgICAgICAgaWYoaXRlbS5ocHUgPT0gJ3VzZXInICYmICF1c2VyLnRva2VuKSByZXR1cm4gc3RhdHVzLmVycm9yKClcbiAgICAgICAgXG4gICAgICAgIGxldCB1cmwgPSBhcGlfdXJsICsgJ2xpc3Q/Y2F0ZWdvcnk9JyArIGl0ZW0uaHB1XG5cbiAgICAgICAgaWYoaXRlbS5ocHUgPT0gJ3VzZXInKSB1cmwgPSBhcGlfdXJsICsgJ2xpc3Q/Y2lkPScgKyB1c2VyLmlkIFxuXG4gICAgICAgIG5ldHdvcmsuc2lsZW50KHVybCwgKGRhdGEpPT57XG4gICAgICAgICAgICBkYXRhLmNvbGxlY3Rpb24gID0gdHJ1ZVxuICAgICAgICAgICAgZGF0YS5saW5lX3R5cGUgICA9ICdjb2xsZWN0aW9uJ1xuICAgICAgICAgICAgZGF0YS5jYXRlZ29yeSAgICA9IGl0ZW0uaHB1XG5cbiAgICAgICAgICAgIHN0YXR1cy5hcHBlbmQoaXRlbS5ocHUsIGRhdGEpXG4gICAgICAgIH0sIHN0YXR1cy5lcnJvci5iaW5kKHN0YXR1cyksIGZhbHNlLCBoZWFkZXIoKSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBjb2xsZWN0aW9uKHBhcmFtcywgb25jb21wbGl0ZSwgb25lcnJvcil7XG4gICAgbGV0IHVybCAgPSBhcGlfdXJsICsgJ2xpc3Q/Y2F0ZWdvcnk9JytwYXJhbXMudXJsKycmcGFnZT0nICsgcGFyYW1zLnBhZ2VcblxuICAgIGlmKHBhcmFtcy51cmwuaW5kZXhPZigndXNlcicpID49IDApe1xuICAgICAgICB1cmwgPSBhcGlfdXJsICsgJ2xpc3Q/Y2lkPScgKyBwYXJhbXMudXJsLnNwbGl0KCdfJykucG9wKCkgKyAnJnBhZ2U9JyArIHBhcmFtcy5wYWdlXG4gICAgfVxuXG4gICAgbmV0d29yay5zaWxlbnQodXJsLCAoZGF0YSk9PntcbiAgICAgICAgZGF0YS5jb2xsZWN0aW9uICA9IHRydWVcbiAgICAgICAgZGF0YS50b3RhbF9wYWdlcyA9IGRhdGEudG90YWxfcGFnZXMgfHwgMTVcbiAgICAgICAgZGF0YS5jYXJkQ2xhc3MgPSAoZWxlbSwgcGFyYW0pPT57XG4gICAgICAgICAgICByZXR1cm4gbmV3IENvbGxlY3Rpb24oZWxlbSwgcGFyYW0pXG4gICAgICAgIH1cblxuICAgICAgICBvbmNvbXBsaXRlKGRhdGEpXG4gICAgfSwgb25lcnJvciwgZmFsc2UsIGhlYWRlcigpKVxufVxuXG5mdW5jdGlvbiBsaWtlZChwYXJhbXMsIGNhbGxhYmFjayl7XG4gICAgbmV0d29yay5zaWxlbnQoYXBpX3VybCArICdsaWtlZCcsIGNhbGxhYmFjaywgKGEsZSk9PntcbiAgICAgICAgTGFtcGEuTm90eS5zaG93KG5ldHdvcmsuZXJyb3JEZWNvZGUoYSxlKSlcbiAgICB9LCBwYXJhbXMsIGhlYWRlcigpKVxufVxuXG5mdW5jdGlvbiBmdWxsKHBhcmFtcywgb25jb21wbGl0ZSwgb25lcnJvcil7XG4gICAgbmV0d29yay5zaWxlbnQoYXBpX3VybCArICd2aWV3LycrcGFyYW1zLnVybCsnP3BhZ2U9JyArIHBhcmFtcy5wYWdlLCAoZGF0YSk9PntcbiAgICAgICAgZGF0YS50b3RhbF9wYWdlcyA9IGRhdGEudG90YWxfcGFnZXMgfHwgMTVcblxuICAgICAgICBvbmNvbXBsaXRlKGRhdGEpXG4gICAgfSwgb25lcnJvciwgZmFsc2UsIGhlYWRlcigpKVxufVxuXG5mdW5jdGlvbiBjbGVhcigpe1xuICAgIG5ldHdvcmsuY2xlYXIoKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbWFpbixcbiAgICBjb2xsZWN0aW9uLFxuICAgIGZ1bGwsXG4gICAgY2xlYXIsXG4gICAgbGlrZWRcbn0iLCJpbXBvcnQgQXBpIGZyb20gJy4vYXBpJ1xuXG5mdW5jdGlvbiBjb21wb25lbnQob2JqZWN0KXtcbiAgICBsZXQgY29tcCA9IG5ldyBMYW1wYS5JbnRlcmFjdGlvbk1haW4ob2JqZWN0KVxuXG4gICAgY29tcC5jcmVhdGUgPSBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmFjdGl2aXR5LmxvYWRlcih0cnVlKVxuXG4gICAgICAgIEFwaS5tYWluKG9iamVjdCwoZGF0YSk9PntcbiAgICAgICAgICAgIHRoaXMuYnVpbGQoZGF0YSlcbiAgICAgICAgfSx0aGlzLmVtcHR5LmJpbmQodGhpcykpXG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKClcbiAgICB9XG5cbiAgICBjb21wLm9uTW9yZSA9IGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICBMYW1wYS5BY3Rpdml0eS5wdXNoKHtcbiAgICAgICAgICAgIHVybDogZGF0YS5jYXRlZ29yeSArIChkYXRhLmNhdGVnb3J5ID09ICd1c2VyJyA/ICdfJyArIGRhdGEuY2lkIDogJycpLFxuICAgICAgICAgICAgdGl0bGU6IGRhdGEudGl0bGUsXG4gICAgICAgICAgICBjb21wb25lbnQ6ICdjdWJfY29sbGVjdGlvbnNfY29sbGVjdGlvbicsXG4gICAgICAgICAgICBwYWdlOiAxXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXBcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50IiwiaW1wb3J0IEFwaSBmcm9tICcuL2FwaSdcblxuZnVuY3Rpb24gY29tcG9uZW50KG9iamVjdCl7XG4gICAgbGV0IGNvbXAgPSBuZXcgTGFtcGEuSW50ZXJhY3Rpb25DYXRlZ29yeShvYmplY3QpXG5cbiAgICBjb21wLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIEFwaS5mdWxsKG9iamVjdCwgKGRhdGEpPT57XG4gICAgICAgICAgICB0aGlzLmJ1aWxkKGRhdGEpXG5cbiAgICAgICAgICAgIGNvbXAucmVuZGVyKCkuZmluZCgnLmNhdGVnb3J5LWZ1bGwnKS5hZGRDbGFzcygnbWFwcGluZy0tZ3JpZCBjb2xzLS02JylcbiAgICAgICAgfSx0aGlzLmVtcHR5LmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgY29tcC5uZXh0UGFnZVJldWVzdCA9IGZ1bmN0aW9uKG9iamVjdCwgcmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgICAgQXBpLmZ1bGwob2JqZWN0LCByZXNvbHZlLmJpbmQoY29tcCksIHJlamVjdC5iaW5kKGNvbXApKVxuICAgIH1cblxuICAgIHJldHVybiBjb21wXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudCIsImltcG9ydCBBcGkgZnJvbSAnLi9hcGknXG5cbmZ1bmN0aW9uIGNvbXBvbmVudChvYmplY3Qpe1xuICAgIGxldCBjb21wID0gbmV3IExhbXBhLkludGVyYWN0aW9uQ2F0ZWdvcnkob2JqZWN0KVxuXG4gICAgY29tcC5jcmVhdGUgPSBmdW5jdGlvbigpe1xuICAgICAgICBBcGkuY29sbGVjdGlvbihvYmplY3QsIHRoaXMuYnVpbGQuYmluZCh0aGlzKSx0aGlzLmVtcHR5LmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgY29tcC5uZXh0UGFnZVJldWVzdCA9IGZ1bmN0aW9uKG9iamVjdCwgcmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgICAgQXBpLmNvbGxlY3Rpb24ob2JqZWN0LCByZXNvbHZlLmJpbmQoY29tcCksIHJlamVjdC5iaW5kKGNvbXApKVxuICAgIH1cblxuICAgIGNvbXAuY2FyZFJlbmRlciA9IGZ1bmN0aW9uKG9iamVjdCwgZWxlbWVudCwgY2FyZCl7XG4gICAgICAgIGNhcmQub25NZW51ID0gZmFsc2VcblxuICAgICAgICBjYXJkLm9uRW50ZXIgPSAoKT0+e1xuICAgICAgICAgICAgTGFtcGEuQWN0aXZpdHkucHVzaCh7XG4gICAgICAgICAgICAgICAgdXJsOiBlbGVtZW50LmlkLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBlbGVtZW50LnRpdGxlLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogJ2N1Yl9jb2xsZWN0aW9uJyxcbiAgICAgICAgICAgICAgICBwYWdlOiAxXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXBcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50IiwiaW1wb3J0IE1haW4gZnJvbSAnLi9tYWluJ1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3J1xuaW1wb3J0IENhdGVnb3J5IGZyb20gJy4vY2F0ZWdvcnknXG5cblxuZnVuY3Rpb24gc3RhcnRQbHVnaW4oKSB7XG4gICAgbGV0IG1hbmlmZXN0ID0ge1xuICAgICAgICB0eXBlOiAndmlkZW8nLFxuICAgICAgICB2ZXJzaW9uOiAnMS4xLjInLFxuICAgICAgICBuYW1lOiAn0JrQvtC70LvQtdC60YbQuNC4JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICBjb21wb25lbnQ6ICdjdWJfY29sbGVjdGlvbnMnLFxuICAgIH1cbiAgICBcbiAgICBMYW1wYS5NYW5pZmVzdC5wbHVnaW5zID0gbWFuaWZlc3RcblxuICAgIExhbXBhLkNvbXBvbmVudC5hZGQoJ2N1Yl9jb2xsZWN0aW9uc19tYWluJywgTWFpbilcbiAgICBMYW1wYS5Db21wb25lbnQuYWRkKCdjdWJfY29sbGVjdGlvbnNfY29sbGVjdGlvbicsIENhdGVnb3J5KVxuICAgIExhbXBhLkNvbXBvbmVudC5hZGQoJ2N1Yl9jb2xsZWN0aW9uc192aWV3JywgVmlldylcblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgnY3ViX2NvbGxlY3Rpb24nLCBgPGRpdiBjbGFzcz1cImNhcmQgY3ViLWNvbGxlY3Rpb24tY2FyZCBzZWxlY3RvciBsYXllci0tdmlzaWJsZSBsYXllci0tcmVuZGVyIGNhcmQtLWNvbGxlY3Rpb25cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX3ZpZXdcIj5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9pbWcvaW1nX2xvYWQuc3ZnXCIgY2xhc3M9XCJjYXJkX19pbWdcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjdWItY29sbGVjdGlvbi1jYXJkX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImN1Yi1jb2xsZWN0aW9uLWNhcmRfX2l0ZW1zXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImN1Yi1jb2xsZWN0aW9uLWNhcmRfX2RhdGVcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImN1Yi1jb2xsZWN0aW9uLWNhcmRfX2JvdHRvbVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjdWItY29sbGVjdGlvbi1jYXJkX192aWV3c1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjdWItY29sbGVjdGlvbi1jYXJkX19saWtlZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnVsbC1yZXZpZXdfX2xpa2UtaWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjI5XCIgaGVpZ2h0PVwiMjdcIiB2aWV3Qm94PVwiMCAwIDI5IDI3XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTguMDEzMSA5LjA1NzMzSDMuNzU3OTlDMi43NjE4MyA5LjA1OTAzIDEuODA2OTYgOS40NTU1MSAxLjEwMjU3IDEwLjE1OTlDMC4zOTgxOCAxMC44NjQzIDAuMDAxNzAzMzIgMTEuODE5MiAwIDEyLjgxNTNWMjMuMDc3OEMwLjAwMTcwMzMyIDI0LjA3NCAwLjM5ODE4IDI1LjAyODkgMS4xMDI1NyAyNS43MzMzQzEuODA2OTYgMjYuNDM3NyAyLjc2MTgzIDI2LjgzNDEgMy43NTc5OSAyNi44MzU4SDIzLjM5NEMyNC4yNzU4IDI2LjgzNTQgMjUuMTI5NCAyNi41MjUyIDI1LjgwNTYgMjUuOTU5NEMyNi40ODE5IDI1LjM5MzYgMjYuOTM3OSAyNC42MDgyIDI3LjA5NCAyMy43NDAzTDI4Ljk0MDggMTMuNDgyMUMyOS4wMzggMTIuOTQwOCAyOS4wMTUzIDEyLjM4NDkgMjguODc0MyAxMS44NTM0QzI4LjczMzMgMTEuMzIxOCAyOC40Nzc0IDEwLjgyNzcgMjguMTI0NyAxMC40MDU4QzI3Ljc3MjEgOS45ODM5MSAyNy4zMzExIDkuNjQ0NSAyNi44MzMgOS40MTE1MUMyNi4zMzQ5IDkuMTc4NTIgMjUuNzkxOCA5LjA1NzYyIDI1LjI0MTkgOS4wNTczM0gxOC41MDQzVjMuNjM1MDlDMTguNTA0NCAyLjkwMTE1IDE4LjI4MjQgMi4xODQzOCAxNy44NjczIDEuNTc5MDhDMTcuNDUyMiAwLjk3Mzc4MyAxNi44NjM2IDAuNTA4MzI5IDE2LjE3OSAwLjI0Mzk2NkMxNS40OTQzIC0wLjAyMDM5NzYgMTQuNzQ1NiAtMC4wNzEyODIxIDE0LjAzMTUgMC4wOTgwMDc4QzEzLjMxNzMgMC4yNjcyOTggMTIuNjcxMiAwLjY0ODgyOSAxMi4xNzggMS4xOTI0TDEyLjE3MzcgMS4xOTY2OUMxMC41NjMyIDIuOTg5NzkgOS43MDg0OSA1Ljc4NjgxIDguNzk1ODQgNy43OTE0MkM4LjY0MjMgOC4xNDk2NCA4LjQ1NTM3IDguNDkyNTkgOC4yMzc1MSA4LjgxNTc0QzguMTY4OTggOC45MDIyMiA4LjA5MzU4IDguOTgzMDEgOC4wMTIwMyA5LjA1NzMzSDguMDEzMVpNNi41NDk2MyAyMy42MTQ3SDMuNzU3OTlDMy42ODcwNiAyMy42MTQ3IDMuNjE2ODYgMjMuNjAwNSAzLjU1MTU2IDIzLjU3MjhDMy40ODYyNiAyMy41NDUyIDMuNDI3MTkgMjMuNTA0NiAzLjM3Nzg5IDIzLjQ1MzZDMy4zMjc4NiAyMy40MDQ3IDMuMjg4MTkgMjMuMzQ2MyAzLjI2MTI2IDIzLjI4MTdDMy4yMzQzMyAyMy4yMTcxIDMuMjIwNjggMjMuMTQ3OCAzLjIyMTEzIDIzLjA3NzhWMTIuODE2NEMzLjIyMDY4IDEyLjc0NjQgMy4yMzQzMyAxMi42NzcxIDMuMjYxMjYgMTIuNjEyNUMzLjI4ODE5IDEyLjU0OCAzLjMyNzg2IDEyLjQ4OTUgMy4zNzc4OSAxMi40NDA2QzMuNDI3MTkgMTIuMzg5NiAzLjQ4NjI2IDEyLjM0OTEgMy41NTE1NiAxMi4zMjE0QzMuNjE2ODYgMTIuMjkzNyAzLjY4NzA2IDEyLjI3OTUgMy43NTc5OSAxMi4yNzk1SDYuNTQ5NjNWMjMuNjE0N1pNOS43NzA3NyAxMS43NTk5QzEwLjM3MDQgMTEuMzM2IDEwLjg2NDkgMTAuNzgwMyAxMS4yMTYgMTAuMTM1M0MxMS44MjIxIDguOTQyODkgMTIuMzU5OSA3LjcxNjg3IDEyLjgyNjUgNi40NjMyNEMxMy4yMzE1IDUuMzM4NTIgMTMuODE4IDQuMjg3NzUgMTQuNTYyNyAzLjM1MjdDMTQuNjE5NyAzLjI5MTgxIDE0LjY5MzUgMy4yNDkxMyAxNC43NzQ3IDMuMjMwMDNDMTQuODU1OSAzLjIxMDkzIDE0Ljk0MDkgMy4yMTYyNSAxNS4wMTkxIDMuMjQ1MzNDMTUuMDk3NiAzLjI3NTU3IDE1LjE2NSAzLjMyOTEzIDE1LjIxMjIgMy4zOTg4QzE1LjI1OTQgMy40Njg0OCAxNS4yODQyIDMuNTUwOTMgMTUuMjgzMiAzLjYzNTA5VjEwLjY2NzlDMTUuMjgzMSAxMC44Nzk0IDE1LjMyNDYgMTEuMDg4OSAxNS40MDU1IDExLjI4NDRDMTUuNDg2NCAxMS40Nzk5IDE1LjYwNSAxMS42NTc1IDE1Ljc1NDYgMTEuODA3MUMxNS45MDQyIDExLjk1NjYgMTYuMDgxOCAxMi4wNzUzIDE2LjI3NzMgMTIuMTU2MkMxNi40NzI3IDEyLjIzNyAxNi42ODIyIDEyLjI3ODYgMTYuODkzOCAxMi4yNzg1SDI1LjI0MTlDMjUuMzIwNyAxMi4yNzg0IDI1LjM5ODYgMTIuMjk2MSAyNS40Njk4IDEyLjMzMDFDMjUuNTQwOSAxMi4zNjQxIDI1LjYwMzYgMTIuNDEzNiAyNS42NTMxIDEyLjQ3NDlDMjUuNzA0MiAxMi41MzQ1IDI1Ljc0MTEgMTIuNjA0OSAyNS43NjEyIDEyLjY4MDdDMjUuNzgxMyAxMi43NTY2IDI1Ljc4NCAxMi44MzYgMjUuNzY5MSAxMi45MTNMMjMuOTIyMyAyMy4xNzIzQzIzLjg5OTMgMjMuMjk2IDIzLjgzNCAyMy40MDc3IDIzLjczNzYgMjMuNDg4NUMyMy42NDEyIDIzLjU2OTIgMjMuNTE5NyAyMy42MTM4IDIzLjM5NCAyMy42MTQ3SDkuNzcwNzdWMTEuNzU5OVpcIiBmaWxsPVwiY3VycmVudENvbG9yXCI+PC9wYXRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnVsbC1yZXZpZXdfX2xpa2UtY291bnRlclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjdWItY29sbGVjdGlvbi1jYXJkX191c2VyLW5hbWVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3ViLWNvbGxlY3Rpb24tY2FyZF9fdXNlci1pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fdGl0bGVcIj48L2Rpdj5cbiAgICA8L2Rpdj5gKVxuXG4gICAgbGV0IHN0eWxlID0gYFxuICAgICAgICA8c3R5bGU+XG4gICAgICAgIEBAaW5jbHVkZSgnLi4vcGx1Z2lucy9jb2xsZWN0aW9ucy9jc3Mvc3R5bGUuY3NzJylcbiAgICAgICAgPC9zdHlsZT5cbiAgICBgXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ2N1Yl9jb2xsZWN0aW9uc19jc3MnLCBzdHlsZSlcblxuICAgICQoJ2JvZHknKS5hcHBlbmQoTGFtcGEuVGVtcGxhdGUuZ2V0KCdjdWJfY29sbGVjdGlvbnNfY3NzJyx7fSx0cnVlKSlcblxuICAgIGZ1bmN0aW9uIGFkZCgpe1xuICAgICAgICBsZXQgYnV0dG9uID0gJChgPGxpIGNsYXNzPVwibWVudV9faXRlbSBzZWxlY3RvclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVfX2ljb1wiPlxuICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxOTFcIiBoZWlnaHQ9XCIyMzlcIiB2aWV3Qm94PVwiMCAwIDE5MSAyMzlcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTM1LjM0MzggMzUuMzQxNFYyNi43NDc3QzM1LjM0MzggMTkuOTE1NiAzOC4wNTk0IDEzLjM1NDMgNDIuODkzNCA4LjUxNjA0QzQ3LjcyOTcgMy42ODI1MSA1NC4yODc0IDAuOTY3MDI3IDYxLjEyNSAwLjk2NjQzMUgxNjQuMjVDMTcxLjA4NiAwLjk2NjQzMSAxNzcuNjQzIDMuNjgyMDYgMTgyLjQ4MiA4LjUxNjA0QzE4Ny4zMTUgMTMuMzUyNCAxOTAuMDMxIDE5LjkxIDE5MC4wMzEgMjYuNzQ3N1YxODYuNDcxQzE5MC4wMzEgMTg5Ljg3IDE4OS4wMjIgMTkzLjE5MiAxODcuMTMzIDE5Ni4wMThDMTg1LjI0NSAxOTguODQ0IDE4Mi41NjEgMjAxLjA0NiAxNzkuNDIxIDIwMi4zNDdDMTc2LjI4IDIwMy42NDcgMTcyLjgyNSAyMDMuOTg4IDE2OS40OTIgMjAzLjMyNUMxNjYuMTU4IDIwMi42NjIgMTYzLjA5NiAyMDEuMDI2IDE2MC42OTIgMTk4LjYyM0wxNTUuNjU2IDE5My41ODdWMjIwLjg0NkMxNTUuNjU2IDIyNC4yNDUgMTU0LjY0NyAyMjcuNTY3IDE1Mi43NTggMjMwLjM5M0MxNTAuODcgMjMzLjIxOSAxNDguMTg2IDIzNS40MjEgMTQ1LjA0NiAyMzYuNzIyQzE0MS45MDUgMjM4LjAyMiAxMzguNDUgMjM4LjM2MyAxMzUuMTE3IDIzNy43QzEzMS43ODMgMjM3LjAzNyAxMjguNzIxIDIzNS40MDEgMTI2LjMxNyAyMzIuOTk4TDc4LjMxMjUgMTg0Ljk5M0wzMC4zMDc4IDIzMi45OThDMjcuOTA0MSAyMzUuNDAxIDI0Ljg0MTkgMjM3LjAzNyAyMS41MDg0IDIzNy43QzE4LjE3NDggMjM4LjM2MyAxNC43MTk1IDIzOC4wMjIgMTEuNTc5NCAyMzYuNzIyQzguNDM5MjIgMjM1LjQyMSA1Ljc1NTE3IDIzMy4yMTkgMy44NjY1NCAyMzAuMzkzQzEuOTc3OSAyMjcuNTY3IDAuOTY5NDc2IDIyNC4yNDUgMC45Njg3NSAyMjAuODQ2VjYxLjEyMjdDMC45Njg3NSA1NC4yOTA2IDMuNjg0MzcgNDcuNzI5MyA4LjUxODM2IDQyLjg5MUMxMy4zNTQ3IDM4LjA1NzUgMTkuOTEyNCAzNS4zNDIgMjYuNzUgMzUuMzQxNEgzNS4zNDM4Wk0xMzguNDY5IDIyMC44NDZWNjEuMTIyN0MxMzguNDY5IDU4Ljg0MzUgMTM3LjU2MyA1Ni42NTc2IDEzNS45NTIgNTUuMDQ2QzEzNC4zNCA1My40MzQzIDEzMi4xNTQgNTIuNTI4OSAxMjkuODc1IDUyLjUyODlIMjYuNzVDMjQuNDcwOCA1Mi41Mjg5IDIyLjI4NDkgNTMuNDM0MyAyMC42NzMzIDU1LjA0NkMxOS4wNjE3IDU2LjY1NzYgMTguMTU2MiA1OC44NDM1IDE4LjE1NjIgNjEuMTIyN1YyMjAuODQ2TDY2LjE2MDkgMTcyLjg0MUM2OS4zODQxIDE2OS42MTkgNzMuNzU1IDE2Ny44MDkgNzguMzEyNSAxNjcuODA5QzgyLjg3IDE2Ny44MDkgODcuMjQwOSAxNjkuNjE5IDkwLjQ2NDEgMTcyLjg0MUwxMzguNDY5IDIyMC44NDZaTTE1NS42NTYgMTY5LjI4NEwxNzIuODQ0IDE4Ni40NzFWMjYuNzQ3N0MxNzIuODQ0IDI0LjQ2ODUgMTcxLjkzOCAyMi4yODI2IDE3MC4zMjcgMjAuNjcxQzE2OC43MTUgMTkuMDU5MyAxNjYuNTI5IDE4LjE1MzkgMTY0LjI1IDE4LjE1MzlINjEuMTI1QzU4Ljg0NTggMTguMTUzOSA1Ni42NTk5IDE5LjA1OTMgNTUuMDQ4MyAyMC42NzFDNTMuNDM2NyAyMi4yODI2IDUyLjUzMTIgMjQuNDY4NSA1Mi41MzEyIDI2Ljc0NzdWMzUuMzQxNEgxMjkuODc1QzEzNi43MTEgMzUuMzQxNCAxNDMuMjY4IDM4LjA1NzEgMTQ4LjEwNyA0Mi44OTFDMTUyLjk0IDQ3LjcyNzQgMTU1LjY1NiA1NC4yODUgMTU1LjY1NiA2MS4xMjI3VjE2OS4yODRaXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVfX3RleHRcIj4ke21hbmlmZXN0Lm5hbWV9PC9kaXY+XG4gICAgICAgIDwvbGk+YClcblxuICAgICAgICBidXR0b24ub24oJ2hvdmVyOmVudGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgTGFtcGEuQWN0aXZpdHkucHVzaCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnJyxcbiAgICAgICAgICAgICAgICB0aXRsZTogbWFuaWZlc3QubmFtZSxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6ICdjdWJfY29sbGVjdGlvbnNfbWFpbicsXG4gICAgICAgICAgICAgICAgcGFnZTogMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICAkKCcubWVudSAubWVudV9fbGlzdCcpLmVxKDApLmFwcGVuZChidXR0b24pXG4gICAgfVxuXG4gICAgaWYod2luZG93LmFwcHJlYWR5KSBhZGQoKVxuICAgIGVsc2V7XG4gICAgICAgIExhbXBhLkxpc3RlbmVyLmZvbGxvdygnYXBwJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLnR5cGUgPT0gJ3JlYWR5JykgYWRkKClcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmlmKCF3aW5kb3cuY3ViX2NvbGxlY3Rpb25zX3JlYWR5ICYmIExhbXBhLk1hbmlmZXN0LmFwcF9kaWdpdGFsID49IDI0Mikgc3RhcnRQbHVnaW4oKSJdLCJuYW1lcyI6WyJDb2xsZWN0aW9uIiwiZGF0YSIsInJlbW92ZSIsImVsZW0iLCJidWlsZCIsIml0ZW0iLCJMYW1wYSIsIlRlbXBsYXRlIiwianMiLCJpbWciLCJmaW5kIiwiaWNvbiIsInRleHQiLCJVdGlscyIsImNhcGl0YWxpemVGaXJzdExldHRlciIsInRpdGxlIiwiaXRlbXNfY291bnQiLCJwYXJzZVRpbWUiLCJ0aW1lIiwiZnVsbCIsImJpZ051bWJlclRvU2hvcnQiLCJ2aWV3cyIsImxpa2VkIiwidXNlcm5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwidmlzaWJsZSIsImJpbmQiLCJpbWFnZSIsIl90aGlzIiwib25sb2FkIiwiY2xhc3NMaXN0IiwiYWRkIiwib25lcnJvciIsInNyYyIsImNyZWF0ZSIsIl90aGlzMiIsIm9uRm9jdXMiLCJvblRvdWNoIiwib25Ib3ZlciIsIkFjdGl2aXR5IiwicHVzaCIsInVybCIsImlkIiwiY29sbGVjdGlvbiIsImNvbXBvbmVudCIsInBhZ2UiLCJpdGVtcyIsInZvaXRlZCIsIlN0b3JhZ2UiLCJjYWNoZSIsInVzZXIiLCJjaWQiLCJpbmRleE9mIiwiY29uY2F0IiwiTGFuZyIsInRyYW5zbGF0ZSIsImxpa2UiLCJTZWxlY3QiLCJzaG93Iiwib25TZWxlY3QiLCJDb250cm9sbGVyIiwidG9nZ2xlIiwiQXBpIiwiZGlyIiwic2V0IiwiQmVsbCIsIm9uQmFjayIsImJhY2tkcm9wX3BhdGgiLCJwcm90b2NvbCIsIk1hbmlmZXN0IiwiY3ViX2RvbWFpbiIsIm9uVmlzaWJsZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCIkIiwibmV0d29yayIsIlJlZ3Vlc3QiLCJhcGlfdXJsIiwiY29sbGVjdGlvbnMiLCJocHUiLCJoZWFkZXIiLCJnZXQiLCJ0b2tlbiIsImhlYWRlcnMiLCJwcm9maWxlIiwibWFpbiIsInBhcmFtcyIsIm9uY29tcGxpdGUiLCJzdGF0dXMiLCJTdGF0dXMiLCJsZW5ndGgiLCJvbkNvbXBsaXRlIiwia2V5cyIsIk9iamVjdCIsInNvcnQiLCJtYXAiLCJhIiwiZnVsbGRhdGEiLCJiIiwiZm9yRWFjaCIsImtleSIsImNhcmRDbGFzcyIsInBhcmFtIiwiZXJyb3IiLCJzaWxlbnQiLCJsaW5lX3R5cGUiLCJjYXRlZ29yeSIsImFwcGVuZCIsInNwbGl0IiwicG9wIiwidG90YWxfcGFnZXMiLCJjYWxsYWJhY2siLCJlIiwiTm90eSIsImVycm9yRGVjb2RlIiwiY2xlYXIiLCJvYmplY3QiLCJjb21wIiwiSW50ZXJhY3Rpb25NYWluIiwiYWN0aXZpdHkiLCJsb2FkZXIiLCJlbXB0eSIsIm9uTW9yZSIsIkludGVyYWN0aW9uQ2F0ZWdvcnkiLCJhZGRDbGFzcyIsIm5leHRQYWdlUmV1ZXN0IiwicmVzb2x2ZSIsInJlamVjdCIsImNhcmRSZW5kZXIiLCJlbGVtZW50IiwiY2FyZCIsIm9uTWVudSIsIm9uRW50ZXIiLCJzdGFydFBsdWdpbiIsIm1hbmlmZXN0IiwidHlwZSIsInZlcnNpb24iLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJwbHVnaW5zIiwiQ29tcG9uZW50IiwiTWFpbiIsIkNhdGVnb3J5IiwiVmlldyIsInN0eWxlIiwiYnV0dG9uIiwib24iLCJlcSIsIndpbmRvdyIsImFwcHJlYWR5IiwiTGlzdGVuZXIiLCJmb2xsb3ciLCJjdWJfY29sbGVjdGlvbnNfcmVhZHkiLCJhcHBfZGlnaXRhbCJdLCJtYXBwaW5ncyI6Ijs7O0lBRUEsU0FBU0EsVUFBVUEsQ0FBQ0MsSUFBSSxFQUFjO01BQ2xDLElBQUksQ0FBQ0EsSUFBSSxHQUFHQSxJQUFJO01BRWhCLFNBQVNDLE1BQU1BLENBQUNDLElBQUksRUFBQztRQUNqQixJQUFHQSxJQUFJLEVBQUVBLElBQUksQ0FBQ0QsTUFBTSxFQUFFOztNQUcxQixJQUFJLENBQUNFLEtBQUssR0FBRyxZQUFVO1FBQ25CLElBQUksQ0FBQ0MsSUFBSSxHQUFJQyxLQUFLLENBQUNDLFFBQVEsQ0FBQ0MsRUFB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