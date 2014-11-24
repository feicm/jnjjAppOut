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
                    infoDetailsSuccessCallback(msg,'car');
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
                    infoDetailsSuccessCallback(msg,'card');
                } else {
                    alert('查询失败!');
                }
            });
            break;
    }
    function infoDetailsSuccessCallback(data,type){
        console.dir(data);
        var UL=$('#violationList');
        var li;
        var liArr;
        var liStr;
        var datas=data.msg;
        var l=datas.length;
        if(type==='car'){
            for(var i=0;i<l;i++){
                li=[
                    '<li>',
                    '    <h1>'+datas[i].wfdz+','+datas[i].wfxw+'</h1>',
                    '    <b>'+datas[i].jkrq+'</b>',
                    '</li>'].join("");
                liArr.push(li);
            }
        }
        if(type==='card'){
            for(var i=0;i<l;i++){
                li=[
                    '<li>',
                    '    <h1>'+datas[i].wfdz+','+datas[i].wfxw+'</h1>',
                    '    <b>'+datas[i].gxsj+'</b>',
                    '</li>'].join("");
                liArr.push(li);
            }
        }
        liStr=liArr.join("");
        Ul.append(liStr);
    }
});