$(function () {
    var urlPre = 'adapter?open&url=';
    var wf_car_url = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/electIllegalquery.json;';//车辆电子监控违法信息
    var wf_card_url = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/violationQuery.json;';//驾照现场违法信息
    var wf_card_url02 = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/vioforcequery.json;';//驾照强制措施信息
    var userName = App.Cookie.GetCookie('username');
    //TODO　封装结果表格
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
        var liArr=[];
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
        U.append(liStr);
    }
});