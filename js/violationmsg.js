$(function () {
    var urlPre = 'adapter?open&url=';
    var carlistRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryCar.json';//用户车辆列表请求地址 select
    var cardlistRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryLicense.json';//用户驾照列表请求地址 select
    var infoPageUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/config/html/violationlist.jsp';//查询结果页地址
    var userName = App.Cookie.GetCookie('username');
    var clxcSubmit = $('#clxc_submit');
    var jzcxSubmit = $('#jzcx_submit');
    clxcSubmit.on('click', clxcListener);
    jzcxSubmit.on('click', jzcxListener);
    //按车辆 提交事件
    function clxcListener() {
        var ip_hphm = $('#hphm');
        var hphm = ip_hphm.text();
        var hpzl = ip_hphm.val();
        var jkbj;
        $('#nodo01').prop('checked') ? jkbj = 1 : jkbj = 0;
        /*var params = {
         "register": userName,
         "cartype" : hpzl,
         "carid"   : hphm
         };*/
        clxcSubmit.off('click');
        if ( hpzl !== '未绑定' ) {
            var params = '#mode=wf_car#cartype=' + hpzl + '#carid=' + hphm + '#jkbj=' + jkbj;
            window.open(infoPageUrl + params);//通过url hash传参
        } else {
            alert('未绑定车辆！');
            clxcSubmit.on('click', clxcListener);
        }
    }
    //按驾照查询提交事件
    function jzcxListener() {
        var ip_jzxm = $('#jzxm');
        var licenseid = ip_jzxm.val();
        var jkbj;
        jzcxSubmit.off('click');
        $('#nodo02').prop('checked') ? jkbj = 1 : jkbj = 0;
        if ( licenseid !== '未绑定' ) {
            var params = '#mode=wf_card#licenseid=' + licenseid + '#jkbj=' + jkbj;
            window.open(infoPageUrl + params);//通过url hash传参
        } else {
            alert('未绑定驾照！');
            jzcxSubmit.on('click', jzcxListener);
        }
    }

    /*
     * --------------------页面效果------------------------
     * */
    App.UI('tabToggle', {
        "dom"        : $('#tab_violation'),
        "activeClass": 'active'
    });
    App.UI('select', {
        "dom"   : $('#hphm'),
        "url"   : carlistRequestUrl,
        "data"  : {'register': userName, 'axisFlag': true},
        "module": 'car'
    });
    App.UI('select', {
        "dom"   : $('#jzxm'),
        "url"   : cardlistRequestUrl,
        "data"  : {'register': userName, 'axisFlag': true},
        "module": 'license'
    });
});