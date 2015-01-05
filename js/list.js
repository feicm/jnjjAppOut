$(function () {
    /*
     * 列表
     * */
    var userName = App.LS.get('username');
    var PageId_lv02 = (new Date()).getTime();
    var pageId = App.getPageId(window.location.href);
    var urlPre = 'adapter?open&url=';
    var carlistRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryCar.json';//用户车辆列表请求地址
    var cardlistRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryLicense.json';//用户驾照列表请求地址
    var bindcarPageUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/config/html/bindcar.jsp&@@webViewPageId=' + PageId_lv02 + Wisp.CommenFunc.getRandom() + '@@';//绑定车辆页url
    var bindcardPageUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/config/html/bindcard.jsp&@@webViewPageId=' + PageId_lv02 + Wisp.CommenFunc.getRandom() + '@@';//绑定驾照页url
    //&register=user2A&axisFlag=true
    var params = {
        "register": userName,
        "axisFlag": false
    };
    //绑定（车辆、驾照）列表对象
    var listModule = {
        "moduleCH"      : {
            "car"           : '车辆',
            "card"          : '驾照',
            "violation_car" : '已绑定车辆',
            "violation_card": '已绑定驾照'
        },
        "dialog"        : null,
        "currentBtn"    : null,
        "resultUrl"     : 'adapter?open&url=' + jnjjApp.config.requestUrl + '/jnpublic/config/html/infodetails.jsp',
        "init"          : function (opts, callback) {
            this.listWrap = opts.listWrap;
            this.tipsWrap = opts.tipsWrap;
            this.defaultBtn = opts.defaultBtn || null;
            this.module = opts.module;
            this.requestUrl = opts.requestUrl;
            this.params = opts.datas;
            this.callback = callback || null;
            var _self = this;
            _self.requestData(_self.requestUrl, _self.params, function (data) {
                var listData;
                data.carList && (listData = data.carList);
                data.licenseList && (listData = data.licenseList);
                if ( listData.length ) {
                    _self.hideDefautoBtn();
                    _self.renderList(listData);
                    _self.bindEvent();
                    _self.callback && _self.callback();
                } else {
                    _self.renderList();
                    _self.callback && _self.callback();
                }
            });
        },
        "renderList"    : function (data) {
            var _self = this;
            var args = Array.prototype.slice.call(arguments);
            var listWrap = _self.listWrap;
            var tipsWrap = _self.tipsWrap;
            var listArr = [];
            var listStr = '';
            var defautlhtml = '';
            if ( args.length ) {
                //渲染列表
                listStr = _self.getListHtml(data, _self.module);
                listWrap.append(listStr);
                _self.setCurrentBtn(_self.module);
                _self.dialog.remove();
            } else {
                //渲染默认
                defautlhtml = [
                    '<i class="fl icon icon-larger' + _self.module + '"></i>',
                    '<h2>查询更便捷，绑定' + _self.moduleCH[_self.module] + '</h2>'].join("");
                tipsWrap.append(defautlhtml);
                //Wisp.UI.progressDialog.remove();
                _self.dialog.remove();
            }
        },
        "hideDefautoBtn": function () {
            var _self = this;
            _self.defaultBtn && _self.defaultBtn.remove();
        },
        "bindEvent"     : function () {
            var _self = this;
            //注册事件
            var _list = _self.listWrap;
            var _mode = _self.module;
            if ( _mode === 'car' ) {
                _list.on('click', 'li', function (e) {
                    var _me = $(this);
                    var cartype = _me.attr('data-cartype');
                    var carid = _me.attr('data-carid');
                    var params = '#mode=carquery@cartype=' + cartype + '@carid=' + carid;
                    window.open(_self.resultUrl + params);//通过url hash传参
                })
                _self.currentBtn.on('click', function () {
                    window.open(bindcarPageUrl);
                });
            }
            if ( _mode === 'card' ) {
                _list.on('click', 'li', function (e) {
                    var _me = $(this);
                    var licenseRecord = _me.attr('data-licenserecord');
                    var params = '#mode=cardquery@licenserecord=' + licenseRecord;
                    window.open(_self.resultUrl + params);//通过url hash传参
                })
                _self.currentBtn.on('click', function () {
                    window.open(bindcardPageUrl);
                });
            }
        },
        "getListHtml"   : function (data, mode) {
            var _self = this;
            var html;
            var l = data.length;
            var listhtml;
            var btnHtml;
            var listArr = [];
            switch ( mode ) {
                case 'car':
                    /*var o = [{
                     "carNumType" : "02",
                     "indentityid": "370827198902022860",
                     "phoneNum"   : "13356680181",
                     "carowner"   : "巩丽纳",
                     "carFramId"  : "LS5A3ABR4EA114966",
                     "msg"        : null,
                     "carid"      : "鲁AG051L"
                     }];*/
                    for ( var i = 0; i < l; i++ ) {
                        listhtml = [
                            '<li data-cartype="' + data[i].carNumType + '" data-carid="' + data[i].carid + '">',
                            '    <h1 class="t1">',
                            '        <i class="icon icon-car2 fl"></i>',
                            '        <b>' + data[i].carid + '</b>',
                            '    </h1>',
                            '    <p class="p1">',
                            '        <b class="label01 fl">车主</b>',
                            '        <b class="txt02 fr">' + data[i].carowner + '</b>',
                            '    </p>',
                            '    <p class="p1">',
                            '        <b class="label01 fl">身份证</b>',
                            '        <b class="txt02 fr">' + data[i].indentityid.substring(0, 4) + '******' + data[i].indentityid.substring(16, 18) + '</b>',
                            '    </p>',
                            '    <i class="icon01 icon01_arr_r"></i>',
                            '</li>'].join("");
                        listArr.push(listhtml);
                    }
                    btnHtml = _self.getBtnHtml(mode);
                    html = listArr.join("") + btnHtml;
                    break;
                case 'card':
                    /*var o1 = [{
                     "licenseid"    : "370122197505086815",
                     "licensephone" : "13864192246",
                     "licenseRecord": "370100209596",
                     "msg"          : null,
                     "licenseName"  : "于加顺"
                     }];*/
                    for ( var i = 0; i < l; i++ ) {
                        listhtml = [
                            '<li data-licenserecord="' + data[i].licenseRecord + '">',
                            '    <h1 class="t1">',
                            '        <i class="icon icon-card2 fl"></i>',
                            '        <b>' + data[i].licenseRecord + '</b>',
                            '    </h1>',
                            '    <p class="p1">',
                            '        <b class="label01 fl">驾驶人</b>',
                            '        <b class="txt02 fr">' + data[i].licenseName + '</b>',
                            '    </p>',
                            '    <p class="p1">',
                            '        <b class="label01 fl">身份证</b>',
                            '        <b class="txt02 fr">' + data[i].licenseid.substring(0, 4) + '******' + data[i].licenseid.substring(16, 18) + '</b>',
                            '    </p>',
                            '    <i class="icon01 icon01_arr_r"></i>',
                            '</li>'].join("");
                        listArr.push(listhtml);
                    }
                    btnHtml = _self.getBtnHtml(mode);
                    html = listArr.join("") + btnHtml;
                    break;
                case 'violation_car':
                    /*var o = [{
                     "carNumType" : "02",
                     "indentityid": "370827198902022860",
                     "phoneNum"   : "13356680181",
                     "carowner"   : "巩丽纳",
                     "carFramId"  : "LS5A3ABR4EA114966",
                     "msg"        : null,
                     "carid"      : "鲁AG051L"
                     }];*/
                    for ( var i = 0; i < l; i++ ) {
                        listhtml = [
                            '<li class="list_hover" data-opt="@cartype=' + data[i].carNumType + '@carid=' + data[i].carid + '">',
                            '    <div class="item-content ovh db">',
                            '        <div class="ui-pic fl">',
                            '            <img src="config/html/images/ico_car2.png">',
                            '        </div>',
                            '        <h1 class="h1 bg_arr_r">',
                            '            <b class="fw f12">车主姓名</b>&nbsp;&nbsp;<b class="fw f12">' + data[i].carowner + '</b><br>',
                            '            <b class="txt02">号牌号码</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b class="txt02">' + data[i].carid + '</b>',
                            '        </h1>',
                            '    </div>',
                            '</li>'].join("");
                        listArr.push(listhtml);
                    }
                    html = listArr.join("");
                    break;
                case 'violation_card':
                    /*var o1 = [{
                     "licenseid"    : "370122197505086815",
                     "licensephone" : "13864192246",
                     "licenseRecord": "370100209596",
                     "msg"          : null,
                     "licenseName"  : "于加顺"
                     }];*/
                    for ( var i = 0; i < l; i++ ) {
                        listhtml = [
                            '<li class="list_hover" data-opt="@licenseid=' + data[i].licenseid + '">',
                            '    <div class="item-content ovh db">',
                            '        <div class="ui-pic fl">',
                            '            <img src="config/html/images/ico_card2.png">',
                            '        </div>',
                            '        <h1 class="h1 bg_arr_r">',
                            '            <b class="fw f12">驾驶人</b>&nbsp;&nbsp;<b class="fw f12">' + data[i].licenseName + '</b><br>',
                            '            <b class="txt02">' + data[i].licenseid.substring(0, 4) + '******' + data[i].licenseid.substring(16, 18) + '</b>',
                            '        </h1>',
                            '    </div>',
                            '</li>'].join("");
                        listArr.push(listhtml);
                    }
                    html = listArr.join("");
                    break;
            }
            return html;
        },
        "getBtnHtml"    : function (mode) {
            var btnHtml = [
                '<a class="ui_btn ui_btn_01 ui_radius ui_btn_block" data-mode="' + mode + '">',
                '    +添加绑定',
                '</a>'].join("");
            return btnHtml;
        },
        "setCurrentBtn" : function (mode) {
            var _self = this;
            if ( $('.ui_btn').data('mode') === mode ) {
                _self.currentBtn = $('.ui_btn');
                App.UI('buttonHover', {//添加按钮点击效果
                    "dom"           : _self.currentBtn,
                    "hoverClassName": 'ui_btn_01_hover'
                });
            }
        },
        "requestData"   : function (url, params, callback) {
            var _self = this;
            var _url = url;
            var _params = params;
            var _callback = callback;
            var _module = _self.module;
            _self.dialog = App.UI('dialog', {
                msg: '请求' + _self.moduleCH[_self.module] + '列表中，请稍后！'
            });
            //Wisp.UI.progressDialog.show('请求' + _self.moduleCH[_self.module] + '列表中，请稍后！');
            App.getAjaxData(_url, _params, function (data) {//用户车辆列表请求回调
                var msg;
                data.carQueryResponse && (msg = data.carQueryResponse);
                data.licenseQueryResponse && (msg = data.licenseQueryResponse);
                if ( msg ) {
                    _callback && _callback(msg);
                } else {
                    _self.dialog.remove();
                    App.UI('dialog', {
                        type : 'alert',
                        title: '公众服务平台',
                        msg  : _self.moduleCH[_self.module] + '列表初始化失败！'
                    });
                }
            });
        }
    };
    var module = $('.c').attr('data-mode');//模块名获取
    App.LS.set(module, pageId);//pageid 写入localstorage
    if ( module === 'car' ) { //车辆列表
        var goCarbindpage = $('#go_carbindpage');
        goCarbindpage.on('click', function () {
            window.open(bindcarPageUrl);
        });
        listModule.init({
            "listWrap"  : $('.ui-list'),
            "tipsWrap"  : $('.tips'),
            "defaultBtn": goCarbindpage,
            "module"    : module,
            "requestUrl": carlistRequestUrl,
            "datas"     : params
        });
    }
    if ( module === 'card' ) { //驾照列表
        var goCardbindpage = $('#go_cardbindpage');
        goCardbindpage.on('click', function () {
            window.open(bindcardPageUrl);
        });
        listModule.init({
            "listWrap"  : $('.ui-list'),
            "tipsWrap"  : $('.tips'),
            "defaultBtn": goCardbindpage,
            "module"    : module,
            "requestUrl": cardlistRequestUrl,
            "datas"     : params
        });
    }
    if ( module === 'violation' ) {//违法信息
        listModule.init({ //初始化已绑定车辆列表
            "listWrap"  : $('#violation_car'),
            "tipsWrap"  : $('.tips'),
            "module"    : 'violation_car',
            "requestUrl": carlistRequestUrl,
            "datas"     : params
        }, function () {
            listModule.init({ //初始化已绑定驾照列表
                "listWrap"  : $('#violation_card'),
                "tipsWrap"  : $('.tips'),
                "module"    : 'violation_card',
                "requestUrl": cardlistRequestUrl,
                "datas"     : params
            });
        });
        App.UI('tabToggle', {
            "dom"        : $('#tab_violation'),
            "activeClass": 'active'
        });
    }
    /*
     * --------------------页面效果------------------------
     * */
    goCarbindpage && App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : goCarbindpage,
        "hoverClassName": 'ui_btn_03_hover'
    });

    goCardbindpage && App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : goCardbindpage,
        "hoverClassName": 'ui_btn_03_hover'
    });
});