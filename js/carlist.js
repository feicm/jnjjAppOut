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
        "axisFlag": true
    };
    //绑定（车辆、驾照）列表对象
    var listModule = {
        "moduleCH"   : {
            "car" : '车辆',
            "card": '驾照'
        },
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
                Wisp.UI.progressDialog.remove();
            } else {
                //渲染默认
                defautlhtml = [
                    '<div class="carimg">',
                    '    <img src="config/html/images/' + _self.module + '.png" />',
                    '</div>',
                    '<h2>您还未绑定' + _self.moduleCH[_self.module] + '，快去绑定吧！</h2>'].join("");
                tipsWrap.append(defautlhtml);
                Wisp.UI.progressDialog.remove();
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
                    for ( var i = 0; i < l; i++ ) {
                        /*var o = [{ //data 示例
                         "msg"     : "{\"bxzzrq\":\"2015-01-17 00:00:00\",\"clzt\":\"正常\",\"gxsj\":\"2014-10-09 00:00:00\",\"hbdbqk\":\"GB17691-2005国Ⅳ,GB3847-2005\",\"hphm\":\"AR0327\",\"hpzl\":\"01\",\"jyyxqz\":\"2015-02-28 00:00:00\",\"qzbfqz\":\"2029-02-12 00:00:00\",\"xm\":\"山东中寰网络科技有限公司\",\"yqjybfqz2\":\"2017-02-28 00:00:00\",\"yqjyqzbfqz\":\"2018-02-28 00:00:00\"}",
                         "carowner": "山东中寰网络科技有限公司",
                         "carid"   : "AR0327"
                         }];*/
                        listhtml = [
                            '<li data-cartype="' + data[i].carNumType + '" data-carid="' + data[i].carid + '">',
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
                            '        <b>车辆' + (i + 0 + 1) + '</b>',
                            '    </aside>',
                            '    <aside class="ui-g-fly0-b-r">',
                            '        <i class="icon01 icon01_arr_r"></i>',
                            '    </aside>',
                            '</li>'].join("");
                        listArr.push(listhtml);
                    }
                    html = listArr.join("");
                    break;
                case 'card':
                    /*var o1 = [{ //data 示例
                     "licenseid"    : "370181199403103425",
                     "licensephone" : "18842657483",
                     "licenseRecord": "370102335479",
                     "msg"          : "{\"gxsj\":\"2012-12-18 00:00:00\",\"jszzt\":\"正常\",\"ljjf\":\"0\",\"xyqfrq\":\"2014-12-18 00:00:00\",\"xysyrq\":\"2018-12-18 00:00:00\",\"zjcx\":\"C1\"}",
                     "licenseName"  : "李莹"
                     }];*/
                    for ( var i = 0; i < l; i++ ) {
                        listhtml = [
                            '<li data-licenserecord="' + data[i].licenseRecord + '">',
                            '    <section class="ui-g-fly0-b">',
                            '        <p>',
                            '            姓名：<em class="name">' + data[i].licenseName + '</em>',
                            '        </p>',
                            '        <p>',
                            '            身份证号：<em class="name">' + data[i].licenseid + '</em>',
                            '        </p>',
                            '    </section>',
                            '    <aside class="ui-g-fly0-b-l">',
                            '        <img src="config/html/images/ico_card.png"></br>',
                            '        <b>驾照' + (i + 0 + 1) + '</b>',
                            '    </aside>',
                            '    <aside class="ui-g-fly0-b-r">',
                            '        <i class="icon01 icon01_arr_r"></i>',
                            '    </aside>',
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
            Wisp.UI.progressDialog.show('请求' + _self.moduleCH[_self.module] + '列表中，请稍后！');
            App.getAjaxData(_url, _params, function (data) {//用户车辆列表请求回调
                var msg;
                data.carQueryResponse && (msg = data.carQueryResponse);
                data.licenseQueryResponse && (msg = data.licenseQueryResponse);
                if ( msg ) {
                    _callback && _callback(msg);
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert(_self.moduleCH[_self.module] + '列表初始化失败！');
                }
            });
        }
    };
    var module = $('.c').attr('data-mode');//模块名获取
    var isSinglePage = $('.c').attr('data-issinglepage');//是否为单一绑定页
    var cancelbindBtn = $('#cancel_btn');
    var opts = {};
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
            Wisp.UI.progressDialog.show('车辆绑定中，请稍后！');
            //提交表单
            App.getAjaxData(carbindRequestUrl, params, function (data) {
                if ( data === 'error' ) {//ajax 失败回调
                    bindinfoBtn && bindinfoBtn.on('click', bindcarListerner);
                    return;
                }
                var msg = data.carBandResponse;
                console.dir(msg);
                if ( msg.bandSuccess === 'true' ) {
                    bindSuccessCallback(msg);
                    bindinfoBtn.on('click', bindcarListerner);
                } else if ( msg.bandSuccess === 'false' ) {
                    Wisp.UI.progressDialog.remove();
                    alert(msg.bandContent + '!');
                    bindinfoBtn.on('click', bindcarListerner);
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert('提交失败!');
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
            Wisp.UI.progressDialog.show('驾照绑定中，请稍后！');
            //提交表单
            App.getAjaxData(cardbindRequestUrl, params, function (data) {
                if ( data === 'error' ) {//ajax 失败回调
                    bindcardBtn && bindcardBtn.on('click', bindcardListerner);
                    return;
                }
                var msg = data.licenseBandResponse;
                console.dir(msg);
                if ( msg.bandSuccess === 'true' ) {
                    bindSuccessCallback(msg);
                    bindcardBtn.on('click', bindcardListerner);
                } else if ( msg.bandSuccess === 'false' ) {
                    Wisp.UI.progressDialog.remove();
                    alert(msg.bandContent + '!');
                    bindcardBtn.on('click', bindcardListerner);
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert('提交失败!');
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
        //history.go(0); //直接刷新获取最新列表
        Wisp.UI.progressDialog.remove();
        alert('绑定成功！');
    }

    //表单与提交按钮联动效果函数
    function initBtnHighlightWithInput(btn,listener){
        var _btn=btn;
        var _listener=listener;
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
                btn.on('click', _listener);//注册事件
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
    bindinfoBtn && initBtnHighlightWithInput(bindinfoBtn,bindcarListerner);
    goCardbindpage && App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : goCardbindpage,
        "hoverClassName": 'ui_btn_01_hover'
    });
    bindcardBtn && initBtnHighlightWithInput(bindcardBtn,bindcardListerner);
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