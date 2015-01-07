$(function () {
    /*
     * 绑定模块
     * */
    var userName = App.LS.get('App_userName');
    var pageId=App.getPageId(window.location.href);
    var curWebView=Wisp.UI.Webview.init({
        PageId:pageId
    });
    var urlPre = 'adapter?open&url=';
    var carbindRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/bandCar.json';//车辆绑定请求地址
    var cardbindRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/bandLicense.json';//驾照绑定请求地址
    var carTypeRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/carType.json';//号牌种类请求地址
    var module = $('.c').attr('data-mode');//模块名获取
    var listPageId=App.LS.get(module);
    var listWebView=Wisp.UI.Webview.init({
        PageId:listPageId
    });
    var opts = {};
    var progressDialog;
    if ( module === 'car' ) { //绑定车辆 参数初始化
        var bindinfoBtn = $('#bindinfo_btn');
        var ip_name;
        var ip_hphm;
        var ip_hpzl;
        var ip_clsbdh;
        var ip_idnum;
        var ip_phone;
        bindinfoBtn.on('click', bindcarListerner);
    }
    if ( module === 'card' ) { //绑定驾照 参数初始化
        var bindcardBtn = $('#bindcard_btn');
        var ip_name;
        var ip_phone;
        var ip_idnum;
        var ip_dabh;
        bindcardBtn.on('click', bindcardListerner);
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
        },function(action){
            if ( action === 'OK' ) {
                //关闭当前页并刷新列表页
                curWebView.close();
                listWebView.refresh();
            }
        });
    }

    /*
     * --------------------页面效果------------------------
     * */
    App.UI('inputClose', {//绑定页面输入校验
        "doms": $('.list-block')
    });
    bindinfoBtn && App.UI('btnHighlightWithInput', { //初始化 btnHighlightWithInput 控件
        "btn"         : bindinfoBtn,
        "listener"    : bindcarListerner,
        "inputs"      : $('.J_btnHighlightWithInput input'),
        "hoverClass"  : 'ui_btn_01_hover',
        "disableClass": 'ui_btn_01_disable'
    });
    bindcardBtn && App.UI('btnHighlightWithInput', { //初始化 btnHighlightWithInput 控件
        "btn"         : bindcardBtn,
        "listener"    : bindcardListerner,
        "inputs"      : $('.J_btnHighlightWithInput input'),
        "hoverClass"  : 'ui_btn_01_hover',
        "disableClass": 'ui_btn_01_disable'
    });
    var type = $('#hpzl');
    type.length && App.UI('select', {
        "dom"     : type,
        "url"     : carTypeRequestUrl,
        "dataType": 'Object'
    });
});