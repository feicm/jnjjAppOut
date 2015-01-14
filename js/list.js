$(function () {
    /*
     * 列表
     * */
    var userName = App.LS.get('App_userName');
    var PageId_lv02 = (new Date()).getTime();
    var pageId = App.getPageId(window.location.href);
    var urlPre = 'adapter?open&url=';
    var carlistRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryCar.json';//用户车辆列表请求地址
    var cardlistRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryLicense.json';//用户驾照列表请求地址
    var v_car_listUrl = urlPre   //&register=user2A&carNumType=01&carNum=鲁AE2751&jkbj=1
        + jnjjApp.config.requestUrl
        + '/jnpublic/electIllegalquery.json';//车辆电子监控违法信息
    var v_card_listUrl = urlPre
        + jnjjApp.config.requestUrl //&register=user2A&indentyid=370181199403014414&jkbj=1
        + '/jnpublic/violationQuery.json';//驾照现场违法信息
    var v_card_listUrl02 = urlPre
        + jnjjApp.config.requestUrl   //&register=user2A&indentyid=370181199001012475&cjbj=1
        + '/jnpublic/vioforcequery.json';//驾照强制措施信息
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
    //列表对象
    var listModule = {
        "moduleCH"       : {
            "car"           : '车辆',
            "card"          : '驾照',
            "violation_car" : '已绑定车辆',
            "violation_card": '已绑定驾照',
            "v_car_list"    : '车辆电子监控',
            "v_card_list"   : '驾照现场违法信息'
        },
        "dialog"         : null,
        "currentBtn"     : null,
        "preQuestUrl"    : 'adapter?open&url=' + jnjjApp.config.requestUrl,
        "urlRouter"      : {
            "v_car_list" : "resultlist.jsp", //结果页，列表形式
            "v_card_list": "resultlisttab.jsp" //结果页，tab列表形式
        },
        "resultUrl"      : 'adapter?open&url=' + jnjjApp.config.requestUrl + '/jnpublic/config/html/infodetails.jsp',
        "init"           : function (opts, callback) {
            this.listWrap = opts.listWrap;
            this.tipsWrap = opts.tipsWrap;
            this.defaultBtn = opts.defaultBtn || null;
            this.module = opts.module;
            this.requestUrl = opts.requestUrl;
            this.params = opts.datas;
            this.callback = callback || null;
            var _self = this;
            _self.requestData(_self.requestUrl, _self.params, function (data) {
                var listData = [];
                data.carList && (listData = data.carList);
                data.licenseList && (listData = data.licenseList);
                if ( data.success === 'true' ) {
                    listData = data.msg;
                }
                if ( listData.length ) {
                    _self.defaultBtn && _self.hideDefaultBtn();
                    _self.renderList(listData);
                    _self.bindEvent();
                    _self.callback && _self.callback();
                } else {
                    _self.renderList();
                    _self.callback && _self.callback();
                }
            });
        },
        //渲染数据
        "renderList"     : function (data) {
            var _self = this;
            var args = Array.prototype.slice.call(arguments);
            var listWrap = _self.listWrap;
            var tipsWrap = _self.tipsWrap;
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
                if ( _self.module === 'car' || _self.module === 'card' ) {
                    defautlhtml = [
                        '<i class="fl icon icon-larger' + _self.module + '"></i>',
                        '<h2>查询更便捷，绑定' + _self.moduleCH[_self.module] + '</h2>'].join("");
                    tipsWrap.append(defautlhtml);
                } else {
                    listStr = _self.getHtmlNoResult();
                    listWrap.append(listStr);
                }
                //Wisp.UI.progressDialog.remove();
                _self.dialog.remove();
            }
        },
        //隐藏默认按钮，用于车辆、驾照列表
        "hideDefaultBtn" : function () {
            var _self = this;
            _self.defaultBtn && _self.defaultBtn.remove();
        },
        //事件绑定
        "bindEvent"      : function () {
            var _self = this;
            //注册事件
            var _list = _self.listWrap;
            var _mode = _self.module;
            if ( _mode === 'car' ) {//我的车辆列表
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
            if ( _mode === 'card' ) {//我的驾照列表
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
            if ( _mode === 'violation_car' ) { //我的违法-车辆列表
                var url = _self.preQuestUrl + '/jnpublic/config/html/' + _self.urlRouter['v_car_list'];
                _list.on('click', 'li', function (e) {
                    var _me = $(this);
                    var jkbj;
                    $('#nodo01').prop('checked') ? jkbj = 0 : jkbj = '';
                    var data = _me.data('opt');
                    var params = '#' + data + '@jkbj=' + jkbj;
                    window.open(url + params);//通过url hash传参
                })
            }
            if ( _mode === 'violation_card' ) { //我的违法-驾照列表
                var url = _self.preQuestUrl + '/jnpublic/config/html/' + _self.urlRouter['v_card_list'];
                _list.on('click', 'li', function (e) {
                    var _me = $(this);
                    var jkbj;
                    $('#nodo02').prop('checked') ? jkbj = 0 : jkbj = '';
                    var data = _me.data('opt');
                    var params = '#' + data + '@jkbj=' + jkbj;
                    window.open(url + params);//通过url hash传参
                })
            }
            if ( _mode === 'v_car_list' || _mode === 'v_card_list' ) {//我的违法-车辆、驾照-结果列表
                _list.on('click', 'li', function (e) {
                    var _me = $(this);
                    var opt = _me.data('opt');
                    var params = '#mode=' + _mode + opt;
                    window.open(_self.resultUrl + params);//通过url hash传参
                })
            }
        },
        //获取列表html字符串
        "getListHtml"    : function (data, mode) {
            var _self = this;
            var html;
            var l = data.length;
            var listhtml;
            var btnHtml;
            var listArr = [];
            switch ( mode ) {
                case 'car': //我的车辆列表
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
                case 'card'://我的驾照列表
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
                case 'violation_car'://我的违法-车辆列表
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
                case 'violation_card'://我的违法-驾照列表
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
                case 'v_car_list': //我的违法-车辆-结果列表
                case 'v_card_list': //我的违法-驾照-结果列表
                    var msg = data;//Array
                    var al;
                    var li = '';
                    var opt = '';
                    var liArr = [];
                    if ( msg !== 'NO_RESULT' ) {
                        msg = _self.formatData(msg);
                        al = msg.length;
                        for ( var i = 0; i < al; i++ ) {
                            opt = '@wfxw=' + msg[i].wfxw//违法行为
                            + '@wfsj=' + msg[i].wfsj  //违法时间
                            + '@wfdd=' + msg[i].wfdd;  //违法地点
                            if ( mode === 'v_car_list' ) {
                                opt += '@clqk=' + msg[i].clqk //处理情况
                                + '@clsj=' + msg[i].clsj//处理时间
                                + '@jkqk=' + msg[i].jkqk//交款情况
                                + '@jksj=' + msg[i].jksj;//交款时间
                            }
                            if ( mode === 'v_card_list' ) {
                                opt += '@wfjfs=' + msg[i].wfjfs//违法记分数
                                + '@fkje=' + msg[i].fkje //罚款金额
                                + '@clsj=' + msg[i].clsj //处理时间
                                + '@clqk=' + msg[i].clqk //处理情况
                                + '@jksj=' + msg[i].jksj//交款时间
                                + '@jscjsj=' + msg[i].jscjsj //接收裁决时间
                                + '@cjbj=' + msg[i].cjbj //裁决标记
                                + '@cjsj=' + msg[i].cjsj; //裁决时间
                            }
                            li = [
                                '<li class="list_hover" data-opt="' + opt + '">',
                                '    <div class="top"><b>' + msg[i].hphm + '</b></div>',
                                '    <div class="item-content ovh db">',
                                '        <h1 class="h1 bg_arr_r">',
                                '            <b class="fw"><i class="icon icon-action"></i>违法行为</b><b class="fw fr mr2 wfxw">' + msg[i].wfxw + '</b><br>',
                                '            <b class="fw"><i class="icon icon-time"></i>违法时间</b><b class="fw fr mr2">' + _self.formatTime(msg[i].wfsj) + '</b>',
                                '        </h1>',
                                '    </div>',
                                '</li>'].join("");
                            liArr.push(li);
                        }
                    }
                    html = liArr.join("");
                    break;
            }
            return html;
        },
        //获取绑定按钮html，用于我的车辆、驾照列表中
        "getBtnHtml"     : function (mode) {
            var btnHtml = [
                '<a class="ui_btn ui_btn_01 ui_radius ui_btn_block" data-mode="' + mode + '">',
                '    +添加绑定',
                '</a>'].join("");
            return btnHtml;
        },
        //无结果时返回html
        "getHtmlNoResult": function (msg) {
            var text;
            if ( msg === 'NO_RESULT' || msg === undefined ) {
                text = '无记录！';
            } else {
                text = msg;
            }
            var _html = [
                ' <div class="noresult">',
                '     <b>' + text + '</b>',
                ' </div>'].join("");
            return _html;
        },
        //设置新加按钮事件，用于我的车辆、驾照列表中
        "setCurrentBtn"  : function (mode) {
            var _self = this;
            if ( $('.ui_btn').data('mode') === mode ) {
                _self.currentBtn = $('.ui_btn');
                App.UI('buttonHover', {//添加按钮点击效果
                    "dom"           : _self.currentBtn,
                    "hoverClassName": 'ui_btn_01_hover'
                });
            } else {
                return;
            }
        },
        //格式化返回数据msg
        "formatData"     : function (data) {
            var sData = data.substring(1, data.length - 1);
            var aData = sData.split(',{');
            var l = aData.length;
            for ( var i = 0; i < l; i++ ) {
                i && (aData[i] = '{' + aData[i]);
                aData[i] = $.parseJSON(aData[i]);
            }
            console.dir(aData);
            return aData;
        },
        //格式化时间，去除时分秒
        "formatTime"     : function (Date) {
            return Date.split(' ')[0];
        },
        //ajax请求函数
        "requestData"    : function (url, params, callback) {
            var _self = this;
            var _url = url;
            var _params = params;
            var _callback = callback;
            var _module = _self.module;
            _self.dialog = App.UI('dialog', {
                msg: '数据加载中···'
            });
            App.getAjaxData(_url, _params, function (data) {//用户车辆列表请求回调
                var msg;
                data.carQueryResponse && (msg = data.carQueryResponse);//车辆列表
                data.licenseQueryResponse && (msg = data.licenseQueryResponse);//驾照列表
                data.electIllegalResponse && (msg = data.electIllegalResponse); //车辆违法列表
                data.violationInfoResponse && (msg = data.violationInfoResponse); //驾照违法列表
                data.vioforceResponse && (msg = data.vioforceResponse); //驾照违法（强制措施）列表
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
    var module = $('.c').data('mode');//模块名获取
    App.LS.set(module, pageId);//pageid 写入localstorage
    var hash = window.location.hash,
        oHash = {};
    if ( hash ) {
        oHash = App.getHash(hash); //格式化hash 对象
    } else {
        console.log('传参失败！');
    }
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
    if ( module === 'v_car_list' ) {
        if ( hasKey('cartype', oHash)
            && hasKey('carid', oHash)
            && hasKey('jkbj', oHash) ) {
            //&register=user2A&carNumType=01&carNum=鲁AE2751&jkbj=1
            params = {
                "register"  : userName,
                "carNumType": oHash.cartype,
                "carNum"    : decodeURI(oHash.carid),
                "jkbj"      : oHash.jkbj
            };
            listModule.init({
                "listWrap"  : $('.list-block ul'),
                "module"    : module,
                "requestUrl": v_car_listUrl,
                "datas"     : params
            });
        }
    }
    if ( module === 'v_card_list' ) {
        if ( hasKey('licenseid', oHash) && hasKey('jkbj', oHash) ) {
            //&register=user2A&indentyid=370181199403014414&jkbj=1
            //&register=user2A&indentyid=370181199001012475&cjbj=1
            var params = {
                "register" : userName,
                "indentyid": oHash.licenseid,
                "jkbj"     : oHash.jkbj
            };
            if ( oHash.jkbj !== '' ) {
                var params02 = {
                    "register" : userName,
                    "indentyid": oHash.licenseid,
                    "cjbj"     : oHash.jkbj
                };
            } else {
                var params02 = {
                    "register" : userName,
                    "indentyid": oHash.licenseid,
                    "cjbj"     : null
                };
            }
            listModule.init({ //初始化驾照现场违法信息
                "listWrap"  : $('#tab-item-01 ul'),
                "module"    : module,
                "requestUrl": v_card_listUrl,
                "datas"     : params
            }, function () {
                listModule.init({ //初始化驾照强制措施信息
                    "listWrap"  : $('#tab-item-02 ul'),
                    "module"    : module,
                    "requestUrl": v_card_listUrl02,
                    "datas"     : params02
                });
            });
            App.UI('tabToggle', {
                "dom"        : $('#tab_violation'),
                "activeClass": 'active'
            });
        }
    }
    //返回对象o是否存在属性keyname
    function hasKey(keyname, o) {
        return keyname in o;
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