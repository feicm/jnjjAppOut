$(function () {
    var urlPre = 'adapter?open&url=';
    var carlistRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryCar.json';//用户车辆列表请求地址
    var cardlistRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryLicense.json';//用户驾照列表请求地址
    var carinfoRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryOneCar.json';//用户车辆信息请求地址
    var cardinfoRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryOneLicense.json';//用户驾照信息请求地址
    var infoPageUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/violationlist.jsp';//用户驾照信息请求地址
    var userName = App.Cookie.GetCookie('username');
    var clxcSubmit = $('#clxc_submit');
    var jzcxSubmit = $('#jzcx_submit');
    clxcSubmit.on('click', clxcListener);
    jzcxSubmit.on('click', jzcxListener);
    function clxcListener() {
        var ip_hphm = $('#hphm');
        var hphm = ip_hphm.text();
        var hpzl = ip_hphm.val();
        var jkbj;
        $('#nodo01').prop('checked') ? jkbj = 1 : jkbj = 0;
        var params = {
            "register": userName,
            "cartype" : hpzl,
            "carid"   : hphm
        };
        clxcSubmit.off('click');
        if ( hpzl ) {
            App.Cookie.SetCookie('modulename', "car");
            App.Cookie.SetCookie('cartype', hpzl);
            App.Cookie.SetCookie('carid', hphm);
            App.Cookie.SetCookie('jkbj', jkbj);
            clxcSubmit.on('click', clxcListener);
            window.open(infoPageUrl);
        } else {
            alert('未绑定车辆！');
            clxcSubmit.on('click', clxcListener);
        }
    }

    function jzcxListener() {
        var ip_hphm = $('#jzcx');
        var licenseid = ip_hphm.val();
        var jkbj;
        $('#nodo02').prop('checked') ? jkbj = 1 : jkbj = 0;
        if ( licenceRecord ) {
            App.Cookie.SetCookie('modulename', "card");
            App.Cookie.SetCookie('licenseid', licenseid);
            App.Cookie.SetCookie('jkbj', jkbj);
            jzcxSubmit.on('click', jzcxListener);
            window.open(infoPageUrl);
        } else {
            alert('未绑定驾照！');
            jzcxSubmit.on('click', clxcListener);
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
        "data"  : {'rigister': userName, 'axisFlag': true},
        "module": 'car'
    }, function () {
        alert('未绑定车辆！');
    });
    App.UI('select', {
        "dom"   : $('#jzxm'),
        "url"   : cardlistRequestUrl,
        "data"  : {'rigister': userName, 'axisFlag': true},
        "module": 'license'
    }, function () {
        alert('未绑定驾照！');
    });
});