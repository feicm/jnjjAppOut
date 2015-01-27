$(function () {
    /*
     * 查询
     * */
    var userName = App.LS.get('App_userName');
    Wisp.UI.Webview.getBaseDomain('Wisp.ClientCallback.setBaseDomain');//当前域写入localstorage key:App_baseDomain
    var urlPre = 'adapter?open&url=';
    var identityTypeRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/identityType.json';//身份证明类型获取地址
    var ksreasonRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/ksreason.json';//考试原因获取接口
    var kscourseRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/kscourse.json';//考试科目获取接口
    var infoPageUrl = 'config/html/infodetails.html';//查询结果页地址
    var carTypeRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/carType.json';//号牌种类请求地址
    var hash = window.location.hash;
    var modeName;
    if ( hash ) {
        oHash = App.getHash(hash); //格式化hash 对象
        /*
         * 考试预约查询 modeName='query_ksyy';
         * 考试成绩查询 modeName='query_kscj'
         * */
        modeName = oHash.mode;
    } else {
        console.log('传参失败！');
    }
    var ksquerySubmit = $('#ksquery_btn');//考试成绩查询提交按钮
    var njyycxquerySubmit = $('#njyycx_btn');//年检预约查询提交按钮
    var sgkcquerySubmit = $('#sgkc_btn');//事故快出查询提交按钮
    ksquerySubmit.length && App.UI('btnHighlightWithInput', { //初始化 btnHighlightWithInput 控件
        "btn"         : ksquerySubmit,
        "listener"    : ksqueryListener,
        "listenerArg" : modeName,
        "inputs"      : $('.J_btnHighlightWithInput input'),
        "hoverClass"  : 'ui_btn_01_hover',
        "disableClass": 'ui_btn_01_disable'
    });
    njyycxquerySubmit.length && App.UI('btnHighlightWithInput', { //初始化 btnHighlightWithInput 控件
        "btn"         : njyycxquerySubmit,
        "listener"    : njyyqueryListener,
        "listenerArg" : modeName,
        "inputs"      : $('.J_btnHighlightWithInput input'),
        "hoverClass"  : 'ui_btn_01_hover',
        "disableClass": 'ui_btn_01_disable'
    });
    sgkcquerySubmit.length && App.UI('btnHighlightWithInput', { //初始化 btnHighlightWithInput 控件
        "btn"         : sgkcquerySubmit,
        "listener"    : sgkcqueryListener,
        "listenerArg" : modeName,
        "inputs"      : $('.J_btnHighlightWithInput input'),
        "hoverClass"  : 'ui_btn_01_hover',
        "disableClass": 'ui_btn_01_disable'
    });
    //年检预约查询提交事件
    function njyyqueryListener(mode) {
        var ip_hphm = $('#hphm').val(),
            ip_hpzl = $('#hpzl').val(),
            ip_clsbdh = $('#clsbdh').val();
        var opts;
        njyycxquerySubmit.off('click');
        opts = {
            "hphm"  : $('#hphm'),//号牌号码
            "clsbdh": $('#clsbdh')//车辆识别代号
        };
        if ( App.verify(opts) ) {
            //&sfzmhm=370100201020102002&sfzmmc=A&lsh=10212&ksyy=xxx&kskm=xxx
            var params = '#mode=' + mode + '@hphm=' + ip_hphm
                + '@hpzl=' + ip_hpzl
                + '@clsbdh=' + ip_clsbdh;
            window.open(infoPageUrl + params);//通过url hash传参
            njyycxquerySubmit.on('click', function () {
                njyyqueryListener(modeName);
            });
        } else {
            njyycxquerySubmit.on('click', function () {
                njyyqueryListener(modeName);
            });
        }
    }

    //考试预约/成绩查询 提交事件
    function ksqueryListener(mode) {
        var ip_sfzmmc = $('#ksyy_sfzmmc').val();
        var ip_sfzmhm = $('#ksyy_sfzmhm').val();
        var ip_lsh = $('#ksyy_lsh').val();
        var ip_ksyy = $('#ksyy_ksyy').val();
        var ip_kskm = $('#ksyy_kskm').val();
        var opts = {};
        ksquerySubmit.off('click');
        opts = {
            "sfzmhm": $('#ksyy_sfzmhm'),//身份证明号码
            "lsh"   : $('#ksyy_lsh')//流水号
        };
        if ( App.verify(opts) ) {
            //&sfzmhm=370100201020102002&sfzmmc=A&lsh=10212&ksyy=xxx&kskm=xxx
            var params = '#mode=' + mode + '@sfzmmc=' + ip_sfzmmc
                + '@sfzmhm=' + ip_sfzmhm
                + '@lsh=' + ip_lsh
                + '@ksyy=' + ip_ksyy
                + '@kskm=' + ip_kskm;
            window.open(infoPageUrl + params);//通过url hash传参
            ksquerySubmit.on('click', function () {
                ksqueryListener(modeName);
            });
        } else {
            ksquerySubmit.on('click', function () {
                ksqueryListener(modeName);
            });
        }
    }

    //事故快处查询提交事件
    function sgkcqueryListener(mode) {
        var ip_record = $('#q_record').val();
        var opts;
        sgkcquerySubmit.off('click');
        opts = {
            "sgkcjlh"  : $('#q_record')//记录号
        };
        if ( App.verify(opts) ) {
            //&sfzmhm=370100201020102002&sfzmmc=A&lsh=10212&ksyy=xxx&kskm=xxx
            var params = '#mode=' + mode + '@flowid=' + ip_record;
            window.open(infoPageUrl + params);//通过url hash传参
            sgkcquerySubmit.on('click', function () {
                sgkcqueryListener(modeName);
            });
        } else {
            sgkcquerySubmit.on('click', function () {
                sgkcqueryListener(modeName);
            });
        }
    }

    /*
     * --------------------页面效果------------------------
     * */

    if ( modeName === 'query_kscj' || modeName === 'query_ksyy' ) {
        App.UI('select', {
                "dom"     : $('#ksyy_sfzmmc'),
                "url"     : identityTypeRequestUrl,
                "data"    : {'register': userName},
                "dataType": 'Object'
            });
        App.UI('select', {
            "dom"     : $('#ksyy_ksyy'),
            "url"     : ksreasonRequestUrl,
            "data"    : {'register': userName},
            "dataType": 'Object'
        });
        App.UI('select', {
            "dom"     : $('#ksyy_kskm'),
            "url"     : kscourseRequestUrl,
            "data"    : {'register': userName},
            "dataType": 'Object'
        });
        App.UI('buttonHover', {//添加按钮点击效果
            "dom"           : ksquerySubmit,
            "hoverClassName": 'ui_btn_01_hover'
        });
    }
    if ( modeName === 'query_njyy' ) {
        App.UI('select', {
            "dom"     : $('#hpzl'),
            "url"     : carTypeRequestUrl,
            "dataType": 'Object'
        });
    }
    if ( modeName === 'query_sgkc' ) {
        App.UI('buttonHover', {//添加按钮点击效果
            "dom"           : sgkcquerySubmit,
            "hoverClassName": 'ui_btn_01_hover'
        });
    }
    App.UI('inputClose', {//页面输入校验
        "doms": $('.list-block')
    });
});