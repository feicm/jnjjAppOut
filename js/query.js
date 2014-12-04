$(function () {
    /*
    * 考试预约查询、考试成绩查询
    * */
    //var userName = App.Cookie.GetCookie('username');
    var userName = App.LS.get('username');
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
    var infoPageUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/config/html/infodetails.jsp';//查询结果页地址
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
    //TODO 考试预约 年鉴预约 年鉴预约查询
    var ksquerySubmit = $('#ksquery_btn');//考试预约提交按钮
    ksquerySubmit.on('click', function(){
        ksqueryListener(modeName);
    });
    //考试预约/成绩查询 提交事件
    function ksqueryListener(mode) {
        var ip_sfzmmc = $('#ksyy_sfzmmc').val();
        var ip_sfzmhm = $('#ksyy_sfzmhm').val();
        var ip_lsh = $('#ksyy_lsh').val();
        var ip_ksyy = $('#ksyy_ksyy').val();
        var ip_kskm = $('#ksyy_kskm').val();
        var opts={};
        ksquerySubmit.off('click');
        opts = {
            "sfzmhm": $('#ksyy_sfzmhm'),//身份证明号码
            "lsh": $('#ksyy_lsh')//流水号
        };
        if ( App.verify(opts) ) {
            //&sfzmhm=370100201020102002&sfzmmc=A&lsh=10212&ksyy=xxx&kskm=xxx
            var params = '#mode='+mode+'@sfzmmc=' + ip_sfzmmc
                + '@sfzmhm=' + ip_sfzmhm
                + '@lsh=' + ip_lsh
                + '@ksyy=' + ip_ksyy
                + '@kskm=' + ip_kskm;
            window.open(infoPageUrl + params);//通过url hash传参
            ksquerySubmit.on('click', function(){
                ksqueryListener(modeName);
            });
        } else {
            ksquerySubmit.on('click', function(){
                ksqueryListener(modeName);
            });
        }
    }

    /*
     * --------------------页面效果------------------------
     * */
    App.UI('select', {
        "dom"   : $('#ksyy_sfzmmc'),
        "url"   : identityTypeRequestUrl,
        "data"  : {'register': userName},
        "dataType": 'Object'
    });
    App.UI('select', {
        "dom"   : $('#ksyy_ksyy'),
        "url"   : ksreasonRequestUrl,
        "data"  : {'register': userName},
        "dataType": 'Object'
    });
    App.UI('select', {
        "dom"   : $('#ksyy_kskm'),
        "url"   : kscourseRequestUrl,
        "data"  : {'register': userName},
        "dataType": 'Object'
    });
    App.UI('inputClose', {//页面输入校验
        "doms": $('.list-block')
    });
    App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : ksquerySubmit,
        "hoverClassName": 'ui_btn_01_hover'
    });
});