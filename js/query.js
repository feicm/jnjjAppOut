$(function () {
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
    var ksyyqueryRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/config/html/ksyyquery.jsp';//考试预约查询提交接口
    var infoPageUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/config/html/violationlist.jsp';//查询结果页地址
    //TODO 考试预约 年鉴预约 年鉴预约查询
    var ksyySubmit = $('#ksyy_btn');//考试预约提交按钮
    ksyySubmit.on('click', ksyyListener);
    //考试预约查询 提交事件
    function ksyyListener() {
        var ip_sfzmmc = $('#ksyy_sfzmmc').val();
        var ip_sfzmhm = $('#ksyy_sfzmhm').val();
        var ip_lsh = $('#ksyy_lsh').val();
        var ip_ksyy = $('#ksyy_ksyy').val();
        var ip_kskm = $('#ksyy_kskm').val();
        ksyySubmit.off('click');
        if ( true ) { //TODO　表单验证
            //&sfzmhm=370100201020102002&sfzmmc=A&lsh=10212&ksyy=xxx&kskm=xxx
            var params = '#mode=query_ks@sfzmmc=' + ip_sfzmmc
                + '@sfzmhm=' + ip_sfzmhm
                + '@lsh=' + ip_lsh
                + '@ksyy=' + ip_ksyy
                + '@kskm=' + ip_kskm;
            window.open(infoPageUrl + params);//通过url hash传参
            ksyySubmit.on('click', ksyyListener);
        } else {
            ksyySubmit.on('click', ksyyListener);
        }
    }

    /*
     * --------------------页面效果------------------------
     * */
    App.UI('select', {
        "dom"   : $('#ksyy_sfzmmc'),
        "url"   : identityTypeRequestUrl,
        "dataType": 'Object'
    });
    App.UI('select', {
        "dom"   : $('#ksyy_ksyy'),
        "url"   : ksreasonRequestUrl,
        "data"  : {'register': userName},
        "module": 'query'
    });
    App.UI('select', {
        "dom"   : $('#ksyy_kskm'),
        "url"   : kscourseRequestUrl,
        "data"  : {'register': userName},
        "module": 'query'
    });
});