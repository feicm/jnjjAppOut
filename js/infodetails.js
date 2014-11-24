$(function () {
    var urlPre = 'adapter?open&url=';
    var wf_car_url = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/electIllegalquery.json;';//违法 车辆查询请求
    var wf_car_url = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/violationQuery.json;';//违法 驾照查询请求地址
    var userName = App.Cookie.GetCookie('username');
    var moduleName = App.Cookie.GetCookie('modulename');
    switch ( moduleName ) {
        case 'car':
            //&register=user2A&carNumType=01&carNum=鲁AE2751&jkbj=1
            //&register=user2A&indentyid=370181199403014414&jkbj=1
            var params={
                "register":userName,
                "carNumType":App.Cookie.GetCookie('cartype'),
                "carNum":App.Cookie.GetCookie('carid'),
                "jkbj":App.Cookie.GetCookie('jkbj')
            };
            App.getAjaxData(wf_car_url, params, function (data) {//用户信息请求回调
                var msg = data.electIllegalResponse;
                if ( msg ) {
                    infoDetailsSuccessCallback(msg);
                } else {
                    alert('查询失败!');
                }
            });
            break;
        case 'card':
            var params={
                "register":userName,
                "indentyid":App.Cookie.GetCookie('licenseid'),
                "jkbj":App.Cookie.GetCookie('jkbj')
            };
            App.getAjaxData(wf_car_url, params, function (data) {//用户信息请求回调
                var msg = data.violationInfoResponse;
                if ( msg ) {
                    infoDetailsSuccessCallback(msg);
                } else {
                    alert('查询失败!');
                }
            });
            break;
    }
    function infoDetailsSuccessCallback(data){
        console.dir(data);
        var table=$('#c_Table_b');
        var trArr;
        trArr=[
            '<tr>',
            '    <td>姓名</td>',
            '    <td>张三</td>',
            '</tr>'].join("");
    }
});