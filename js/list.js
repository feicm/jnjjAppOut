$(function () {
    /*
     * 绑定模块列表
     * */
    //var userName = App.Cookie.GetCookie('username');
    var userName = App.LS.get('username');
    var urlPre = 'adapter?open&url=';
    var carlistRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryCar.json';//用户车辆列表请求地址
    var cardlistRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryLicense.json';//用户驾照列表请求地址
    var carbindRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/bandCar.json';//车辆绑定请求地址
    var cardbindRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/bandLicense.json';//驾照绑定请求地址
    var carTypeRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/carType.json';//号牌种类请求地址
    //&register=user2A&axisFlag=true
    var params = {
        "register": userName,
        "axisFlag": false
    };
    //绑定（车辆、驾照）列表对象
    var listModule = {
        "moduleCH"   : {
            "car" : '车辆',
            "card": '驾照',
            "violation_car": '已绑定车辆',
            "violation_card": '已绑定驾照'
        },
        "dialog"     : null,
        "resultUrl"  : 'adapter?open&url=' + jnjjApp.config.requestUrl + '/jnpublic/config/html/infodetails.jsp',
        "init"       : function (opts) {
            this.listWrap = opts.listWrap;
            this.tipsWrap = opts.tipsWrap;
            this.module = opts.module;
            this.requestUrl = opts.requestUrl;
            this.params = opts.datas;
            var _self = this;
            _self.requestData(_self.requestUrl, _self.params, function (data) {
                var listData;
                data.carList && (listData = data.carList);
                data.licenseList && (listData = data.licenseList);
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
            var listArr = [];
            var listStr = '';
            var defautlhtml = '';
            if ( args.length ) {
                console.dir(data);
                //渲染列表
                listStr = _self.getListHtml(data, _self.module);
                listWrap.append(listStr);
                //Wisp.UI.progressDialog.remove();
                _self.dialog.remove();
            } else {
                //渲染默认
                defautlhtml = [
                    '<div class="carimg">',
                    '    <img src="config/html/images/' + _self.module + '.png" />',
                    '</div>',
                    '<h2>您还未绑定' + _self.moduleCH[_self.module] + '，快去绑定吧！</h2>'].join("");
                tipsWrap.append(defautlhtml);
                //Wisp.UI.progressDialog.remove();
                _self.dialog.remove();
            }
        },
        "bindEvent"  : function () {
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
                    /* var newPage=window.open("");//通过url hash传参
                     newPage.location=_self.resultUrl + params;*/
                })
            }
            if ( _mode === 'card' ) {
                _list.on('click', 'li', function (e) {
                    var _me = $(this);
                    var licenseRecord = _me.attr('data-licenserecord');
                    var params = '#mode=cardquery@licenserecord=' + licenseRecord;
                    window.open(_self.resultUrl + params);//通过url hash传参
                    //var newPage=window.open("");//通过url hash传参
                    //newPage.location=_self.resultUrl + params;
                })
            }
        },
        "getListHtml": function (data, mode) {
            var html;
            var l = data.length;
            var listhtml;
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
                            '        <i class="icon icon-car fl"></i>',
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
                    html = listArr.join("");
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
                            '        <i class="icon icon-card fl"></i>',
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
                    html = listArr.join("");
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
                            '<li class="list_hover" data-opt="@cartype='+data[i].carNumType+'@carid='+data[i].carid+'">',
                            '    <div class="item-content ovh db">',
                            '        <div class="ui-pic fl">',
                            '            <img src="images/ico_car2.png">',
                            '        </div>',
                            '        <h1 class="h1 bg_arr_r">',
                            '            <b class="fw f12">车主姓名</b>&nbsp;&nbsp;<b class="fw f12">'+data[i].carowner+'</b><br>',
                            '            <b class="txt02">号牌号码</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b class="txt02">'+data[i].carid+'</b>',
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
                            '<li class="list_hover" data-opt="@licenseid='+data[i].licenseid+'">',
                            '    <div class="item-content ovh db">',
                            '        <div class="ui-pic fl">',
                            '            <img src="images/ico_card2.png">',
                            '        </div>',
                            '        <h1 class="h1 bg_arr_r">',
                            '            <b class="fw f12">驾驶人</b>&nbsp;&nbsp;<b class="fw f12">'+data[i].licenseName+'</b><br>',
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
        "requestData": function (url, params, callback) {
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
    var isSinglePage = $('.c').attr('data-issinglepage');//是否为单一绑定页
    var cancelbindBtn = $('#cancel_btn');
    var opts = {};
    var progressDialog;
    if ( module === 'car' ) { //绑定车辆 参数初始化
        var goCarbindpage = $('#go_carbindpage');
        var bindinfoBtn = $('#bindinfo_btn');
        var ip_name;
        var ip_hphm;
        var ip_hpzl;
        var ip_clsbdh;
        var ip_idnum;
        var ip_phone;
        bindinfoBtn.on('click', bindcarListerner);
        !isSinglePage && listModule.init({
            "listWrap"  : $('.ui-list'),
            "tipsWrap"  : $('.tips'),
            "module"    : module,
            "requestUrl": carlistRequestUrl,
            "datas"     : params
        });
    }
    if ( module === 'card' ) { //绑定驾照 参数初始化
        var goCardbindpage = $('#go_cardbindpage');
        var bindcardBtn = $('#bindcard_btn');
        var ip_name;
        var ip_phone;
        var ip_idnum;
        var ip_dabh;
        bindcardBtn.on('click', bindcardListerner);
        !isSinglePage && listModule.init({
            "listWrap"  : $('.ui-list'),
            "tipsWrap"  : $('.tips'),
            "module"    : module,
            "requestUrl": cardlistRequestUrl,
            "datas"     : params
        });
    }
    if ( module === 'violation' ) {
        listModule.init({
            "listWrap"  : $('#violation_car'),
            "tipsWrap"  : $('.tips'),
            "module"    : 'violation_car',
            "requestUrl": carlistRequestUrl,
            "datas"     : params
        });
        listModule.init({
            "listWrap"  : $('#violation_card'),
            "tipsWrap"  : $('.tips'),
            "module"    : 'violation_card',
            "requestUrl": cardlistRequestUrl,
            "datas"     : params
        });
    }
    //车辆绑定事件函数
    function bindcarListerner() {
        ip_name = $('#name').val();
        ip_hphm = $('#hphm').val();
        ip_hpzl = $('#hpzl').val();
        ip_clsbdh = $('#clsbdh').val();
        ip_idnum = $('#idnum').val();
        ip_phone = $('#phone').val();
        opts = {
            "name"  : $('#name'),//姓名
            "hphm"  : $('#hphm'),//号牌号码
            "clsbdh": $('#clsbdh'),//车辆识别代号
            "idnum" : $('#idnum'),//身份证
            "phone" : $('#phone')//手机
        };
        var optiontype = 'band';
        var params;
        bindinfoBtn.off('click');
        if ( App.verify(opts) ) {
            params = {
                "register"   : userName,
                "carowner"   : ip_name,
                "carNumType" : ip_hpzl,
                "carNum"     : ip_hphm,
                "indentityid": ip_idnum,
                "phoneNum"   : ip_phone,
                "carFramId"  : ip_clsbdh,
                "optiontype" : optiontype
            };
            //Wisp.UI.progressDialog.show('车辆绑定中，请稍后！');
            progressDialog = App.UI('dialog', {msg: '车辆绑定中，请稍后！'});
            //提交表单
            App.getAjaxData(carbindRequestUrl, params, function (data) {
                if ( data === 'error' ) {//ajax 失败回调
                    progressDialog.remove();
                    bindinfoBtn && bindinfoBtn.on('click', bindcarListerner);
                    return;
                }
                var msg = data.carBandResponse;
                console.dir(msg);
                if ( msg.bandSuccess === 'true' ) {
                    bindSuccessCallback(msg);
                    bindinfoBtn.on('click', bindcarListerner);
                } else if ( msg.bandSuccess === 'false' ) {
                    //Wisp.UI.progressDialog.remove();
                    progressDialog.remove();
                    App.UI('dialog', {
                        type : 'alert',
                        title: '公众服务平台',
                        msg  : msg.bandContent + '!'
                    });
                    bindinfoBtn.on('click', bindcarListerner);
                } else {
                    //Wisp.UI.progressDialog.remove();
                    progressDialog.remove();
                    App.UI('dialog', {
                        type : 'alert',
                        title: '公众服务平台',
                        msg  : '提交失败！'
                    });
                    bindinfoBtn.on('click', bindcarListerner);
                }
            })
        } else {
            bindinfoBtn.on('click', bindcarListerner);
        }
    }

    //驾照绑定事件函数
    function bindcardListerner() {
        ip_name = $('#name').val();
        ip_phone = $('#phone').val();
        ip_idnum = $('#idnum').val();
        ip_dabh = $('#dabh').val();
        opts = {
            "name" : $('#name'),//姓名
            "idnum": $('#idnum'),//身份证
            "phone": $('#phone'),//手机
            "dabh" : $('#dabh')//档案编号
        };
        var dotype = 'band';
        var params;
        bindcardBtn.off('click');
        if ( App.verify(opts) ) {
            params = {
                "register"     : userName,
                "licensename"  : ip_name,
                "licenseid"    : ip_idnum,
                "licensephone" : ip_phone,
                "licenseRecord": ip_dabh,
                "dotype"       : dotype
            };
            //Wisp.UI.progressDialog.show('驾照绑定中，请稍后！');
            progressDialog = App.UI('dialog', {msg: '驾照绑定中，请稍后！'});
            //提交表单
            App.getAjaxData(cardbindRequestUrl, params, function (data) {
                if ( data === 'error' ) {//ajax 失败回调
                    progressDialog.remove();
                    bindcardBtn && bindcardBtn.on('click', bindcardListerner);
                    return;
                }
                var msg = data.licenseBandResponse;
                console.dir(msg);
                if ( msg.bandSuccess === 'true' ) {
                    bindSuccessCallback(msg);
                    bindcardBtn.on('click', bindcardListerner);
                } else if ( msg.bandSuccess === 'false' ) {
                    //Wisp.UI.progressDialog.remove();
                    progressDialog.remove();
                    App.UI('dialog', {
                        type : 'alert',
                        title: '公众服务平台',
                        msg  : msg.bandContent + '!'
                    });
                    bindcardBtn.on('click', bindcardListerner);
                } else {
                    //Wisp.UI.progressDialog.remove();
                    progressDialog.remove();
                    App.UI('dialog', {
                        type : 'alert',
                        title: '公众服务平台',
                        msg  : '提交失败！'
                    });
                    bindcardBtn.on('click', bindcardListerner);
                }
            })
        } else {
            bindcardBtn.on('click', bindcardListerner);
        }
    }

    //绑定成功回调函数
    function bindSuccessCallback(data) {
        console.dir(data);
        //Wisp.UI.progressDialog.remove();
        progressDialog.remove();
        App.UI('dialog', {
            type : 'alert',
            title: '公众服务平台',
            msg  : '绑定成功！'
        });
        history.go(0); //直接刷新获取最新列表
    }

    //表单与提交按钮联动效果函数
    function initBtnHighlightWithInput(btn, listener, arg) {
        var _btn = btn;
        var _listener = listener;
        App.UI('btnHighlightWithInput', { //初始化 btnHighlightWithInput 控件
            "btn"         : _btn,
            "inputs"      : $('.J_btnHighlightWithInput input'),
            "disableClass": 'ui_btn_01_disable'
        }, function (status, btn) { //btnHighlightWithInput控件回调
            if ( status === 'enable' ) {//激活按钮
                App.UI('buttonHover', {//添加按钮点击效果
                    "dom"           : btn,
                    "hoverClassName": 'ui_btn_01_hover'
                });

                btn.on('click', function () {
                    args ? _listener(arg) : _listener();
                });//注册事件
            }
            if ( status === 'disable' ) {//按钮置为不可用
                App.UI('buttonHover', {//移除按钮点击效果
                    "dom"           : btn,
                    "hoverClassName": 'ui_btn_01_hover',
                    "off"           : true
                });
                btn.off('click'); //移除事件
            }
        });
    }

    /*
     * --------------------页面效果------------------------
     * */
    App.UI('changePage', {//页面切换效果
        "wrap": $('.c')
    });
    App.UI('tabToggle', {
        "dom"        : $('#tab_violation'),
        "activeClass": 'active'
    });
    App.UI('inputClose', {//绑定页面输入校验
        "doms": $('.list-block')
    });
    goCarbindpage && App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : goCarbindpage,
        "hoverClassName": 'ui_btn_01_hover'
    });
    bindinfoBtn && App.UI('btnHighlightWithInput', { //初始化 btnHighlightWithInput 控件
        "btn"         : bindinfoBtn,
        "listener"    : bindcarListerner,
        "inputs"      : $('.J_btnHighlightWithInput input'),
        "hoverClass"  : 'ui_btn_01_hover',
        "disableClass": 'ui_btn_01_disable'
    });
    goCardbindpage && App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : goCardbindpage,
        "hoverClassName": 'ui_btn_01_hover'
    });
    bindcardBtn && App.UI('btnHighlightWithInput', { //初始化 btnHighlightWithInput 控件
        "btn"         : bindcardBtn,
        "listener"    : bindcardListerner,
        "inputs"      : $('.J_btnHighlightWithInput input'),
        "hoverClass"  : 'ui_btn_01_hover',
        "disableClass": 'ui_btn_01_disable'
    });
    cancelbindBtn && App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : cancelbindBtn,
        "hoverClassName": 'ui_btn_01_hover'
    });
    var type = $('#hpzl');
    type.length && App.UI('select', {
        "dom"     : type,
        "url"     : carTypeRequestUrl,
        "dataType": 'Object'
    });
});