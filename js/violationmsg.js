$(function () {
    var urlPre = 'adapter?open&url=';
    var carlistRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryCar.json';//用户车辆列表请求地址
    var cardlistRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryLicense.json';//用户驾照列表请求地址
    var userName = App.Cookie.GetCookie('username');
    App.UI('tabToggle', {
        "dom"        : $('#tab_violation'),
        "activeClass": 'active'
    });
    App.UI('select', {
        "dom"     : $('#hphm'),
        "url"     : carlistRequestUrl,
        "data"    : {'rigister': userName, 'axisFlag': true},
        "module": 'car'
    });
    App.UI('select', {
        "dom"     : $('#jzxm'),
        "url"     : cardlistRequestUrl,
        "data"    : {'rigister': userName, 'axisFlag': true},
        "module": 'license'
    });
});