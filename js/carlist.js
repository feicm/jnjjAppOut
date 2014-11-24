$(function () {
    var userName = App.Cookie.GetCookie('username');
    var urlPre = 'adapter?open&url=';
    var carlistRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryCar.json';//用户车辆列表请求地址
    var params = {
        "registerName": userName,
        "axisFlag"    : true
    };
    var listModule = {
        "init"       : function (opts) {
            this.listWrap = opts.listWrap;
            this.tipsWrap = opts.tipsWrap;
            this.module = opts.module;
            this.requestUrl = opts.requestUrl;
            this.params = opts.datas;
            var _self = this;
            _self.requestData(_self.requestUrl, _self.params, function (data) {
                var listData = data.carList;
                console.dir(listData);
                if ( listData.length ) {
                    _self.renderList(listData);
                    _self.bindEvent();
                } else {
                    _self.renderList();
                }
            });
        },
        "renderList" : function (data) {
            var _self = this;
            var args = Array.prototype.slice.call(arguments);
            var listWrap = _self.listWrap;
            var tipsWrap = _self.tipsWrap;
            var l;
            var listArr = [];
            var listStr = '';
            var defautlhtml = '';
            if ( args.length ) {
                l = data.length
                //渲染列表
                for ( var i = 0; i < l; i++ ) {
                    listhtml = [
                        '<li>',
                        '    <section class="ui-g-fly0-b">',
                        '        <p>',
                        '            车主姓名：<em class="name">' + data[i].carowner + '</em>',
                        '        </p>',
                        '        <p>',
                        '            号牌号码：<em class="name">' + data[i].carid + '</em>',
                        '        </p>',
                        '    </section>',
                        '    <aside class="ui-g-fly0-b-l">',
                        '        <img src="config/html/images/ico_car.png"></br>',
                        '        <b>车辆' + i + '</b>',
                        '    </aside>',
                        '    <aside class="ui-g-fly0-b-r">',
                        '        <i class="icon01 icon01_arr_r"></i>',
                        '    </aside>',
                        '</li>'].join("");
                    listArr.push(listhtml);
                }
                listStr = listArr.join("");
                listWrap.append(listStr);
                Wisp.UI.progressDialog.remove();
            } else {
                //渲染默认
                defautlhtml = [
                    '<div class="carimg">',
                    '    <img src="config/html/images/' + _self.module + '.png" />',
                    '</div>',
                    '<h2>您还未绑定' + _self.module + '，快去绑定吧！</h2>'].join("");
                tipsWrap.append(defautlhtml);
                Wisp.UI.progressDialog.remove();
            }
        },
        "bindEvent"  : function () {
            var _self = this;
            //TODO 注册事件
        },
        "requestData": function (url, params, callback) {
            var _self = this;
            var _url = url;
            var _params = params;
            var _callback = callback;
            var _module = _self.module;
            Wisp.UI.progressDialog.show('请求' + _module + '列表中，请稍后！');
            App.getAjaxData(_url, _params, function (data) {//用户车辆列表请求回调
                var msg = data.carQueryResponse;
                if ( msg ) {
                    _callback && _callback(msg);
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert(_module + '列表初始化失败！');
                }
            });
        }
    };
    var module = $('.c').attr('data-mode');
    if ( module === 'car' ) {
        var goCarbindpage = $('#go_carbindpage');
        var bindinfoBtn = $('#bindinfo_btn');
    }
    if ( module === 'card' ) {
        var goCardbindpage = $('#go_cardbindpage');
        var bindcardBtn = $('#bindcard_btn');
    }
    listModule.init({
        "listWrap"  : $('.ui-list'),
        "tipsWrap"  : $('.tips'),
        "module"    : module,
        "requestUrl": carlistRequestUrl,
        "params"    : params
    });
    /*init();//初始化
     function init() {
     Wisp.UI.progressDialog.show('请求车辆列表中，请稍后！');
     App.getAjaxData(carlistRequestUrl, params, function (data) {//用户车辆列表请求回调
     var msg = data.carQueryResponse;
     if ( msg ) {
     listSuccessCallback(msg);
     } else {
     Wisp.UI.progressDialog.remove();
     alert('车辆列表初始化失败！');
     }
     });
     }

     //获取车辆列表回调
     function listSuccessCallback(data) {
     var listData = data.carList;
     console.dir(listData);
     if ( listData.length ) {
     renderList(listData);
     } else {
     renderList();
     }
     }

     //渲染列表
     function renderList(data) {
     var args = Array.prototype.slice.call(arguments);
     var listWrap = $('.ui-list');
     var tipsWrap = $('.tips');
     var l = data.length;
     var listArr = [];
     var listStr = '';
     var defautlhtml = '';
     if ( args.length ) {
     //渲染列表
     for ( var i = 0; i < l; i++ ) {
     listhtml = [
     '<li>',
     '    <section class="ui-g-fly0-b">',
     '        <p>',
     '            车主姓名：<em class="name">' + data[i].carowner + '</em>',
     '        </p>',
     '        <p>',
     '            号牌号码：<em class="name">' + data[i].carid + '</em>',
     '        </p>',
     '    </section>',
     '    <aside class="ui-g-fly0-b-l">',
     '        <img src="config/html/images/ico_car.png"></br>',
     '        <b>车辆一</b>',
     '    </aside>',
     '    <aside class="ui-g-fly0-b-r">',
     '        <i class="icon01 icon01_arr_r"></i>',
     '    </aside>',
     '</li>'].join("");
     listArr.push(listhtml);
     }
     listStr = listArr.join("");
     listWrap.append(listStr);
     bindEvent(listWrap);
     } else {
     //渲染默认
     defautlhtml = [
     '<div class="carimg">',
     '    <img src="config/html/images/car.png" />',
     '</div>',
     '<h2>您还未绑定车辆，快去绑定吧！</h2>'].join("");
     tipsWrap.append(defautlhtml);
     }
     }*/

    /*
     * --------------------页面效果------------------------
     * */
    App.UI('changePage', {//注册页面切换效果
        "wrap": $('.c')
    });
    App.UI('inputClose', {//绑定页面输入校验
        "doms": $('.list-block')
    });
    goCarbindpage && App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : goCarbindpage,
        "hoverClassName": 'ui_btn_01_hover'
    });
    bindinfoBtn && App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : bindinfoBtn,
        "hoverClassName": 'ui_btn_01_hover'
    });
    goCardbindpage && App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : goCardbindpage,
        "hoverClassName": 'ui_btn_01_hover'
    });
    bindcardBtn && App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : bindcardBtn,
        "hoverClassName": 'ui_btn_01_hover'
    });
});