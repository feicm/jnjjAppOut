$(function () {
    var userName = App.Cookie.GetCookie('username');
    var urlPre = 'adapter?open&url=';
    var carlistRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryCar.json';//用户车辆列表请求地址
    var carbindRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/bandCar.json';//车辆绑定请求地址
    var cardbindRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/bandLicense.json';//驾照绑定请求地址
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
                l = data.length;
                console.dir(data);
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
    var opts = {};
    if ( module === 'car' ) {
        var goCarbindpage = $('#go_carbindpage');
        var bindinfoBtn = $('#bindinfo_btn');
        var ip_name;
        var ip_hphm;
        var ip_hpzl;
        var ip_clsbdh;
        var ip_idnum;
        var ip_phone;
        bindinfoBtn.on('click', bindcarListerner);
    }
    if ( module === 'card' ) {
        var goCardbindpage = $('#go_cardbindpage');
        var bindcardBtn = $('#bindcard_btn');
        var ip_name;
        var ip_phone;
        var ip_idnum;
        var ip_dabh;
        bindcardBtn.on('click', bindcardListerner);
    }
    listModule.init({
        "listWrap"  : $('.ui-list'),
        "tipsWrap"  : $('.tips'),
        "module"    : module,
        "requestUrl": carlistRequestUrl,
        "datas"     : params
    });

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
        if ( verify(opts) ) {
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
                var msg = data.carBandResponse;
                console.dir(msg);
                if ( msg.bindSuccess === 'true' ) {
                    bindSuccessCallback(msg);
                    bindinfoBtn.on('click', bindcarListerner);
                } else if ( msg.bindSuccess === 'false' ) {
                    Wisp.UI.progressDialog.remove();
                    alert(msg.bandContent + '!');
                    bindinfoBtn.on('click', bindcarListerner);
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert('提交失败!');
                    bindinfoBtn.on('click', bindcarListerner);
                }
            })
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
        if ( verify(opts) ) {
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
                var msg = data.licenseBandResponse;
                console.dir(msg);
                if ( msg.bindSuccess === 'true' ) {
                    bindSuccessCallback(msg);
                    bindcardBtn.on('click', bindcardListerner);
                } else if ( msg.bindSuccess === 'false' ) {
                    Wisp.UI.progressDialog.remove();
                    alert(msg.bandContent + '!');
                    bindcardBtn.on('click', bindcardListerner);
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert('提交失败!');
                    bindcardBtn.on('click', bindcardListerner);
                }
            })
        }
    }

    function bindSuccessCallback(data) {
        console.dir(data);
        history.go(0); //直接刷新获取最新列表
        Wisp.UI.progressDialog.remove();
        alert('绑定成功！');
    }

    //校验函数
    function verify(opts) {
        console.dir(opts);
        if ( opts.username && (opts.username.val() === '' || opts.username.find('.tips').length) ) {
            alert('提交失败！（请检查您的用户名）');
            return false;
        }
        if ( opts.pwd1
            && opts.pwd2
            && (opts.pwd1.val() === ''
            || opts.pwd2.val() === ''
            || opts.pwd1.find('.tips').length
            || opts.pwd2.find('.tips').length ) ) {
            alert('提交失败！（请检查您的密码）');
            return false;
        }
        if ( opts.name && (opts.name.val() === '' || opts.name.find('.tips').length) ) {
            alert('提交失败！（请检查您的姓名）');
            return false;
        }
        if ( opts.phone && (opts.phone.val() === '' || opts.phone.find('.tips').length) ) {
            alert('提交失败！（请检查您的手机号码）');
            return false;
        }
        if ( opts.idnum && (opts.idnum.val() === '' || opts.idnum.find('.tips').length) ) {
            alert('提交失败！（请检查您的身份证号）');
            return false;
        }
        if ( opts.clsbdh && (opts.clsbdh.val() === '' || opts.clsbdh.find('.tips').length) ) {
            alert('提交失败！（请检查您的车辆识别代号）');
            return false;
        }
        if ( opts.hphm && (opts.hphm.val() === '' || opts.hphm.find('.tips').length) ) {
            alert('提交失败！（请检查您的号牌号码）');
            return false;
        }
        if ( opts.dabh && (opts.dabh.val() === '' || opts.dabh.find('.tips').length) ) {
            alert('提交失败！（请检查您的档案编号）');
            return false;
        }
        return true;
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