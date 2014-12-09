$(function () {
    //var userName = App.Cookie.GetCookie('username');
    var userName = App.LS.get('username');
    var urlPre = 'adapter?open&url=';
    var carlistRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryCar.json';//用户车辆列表请求地址 select
    var cardlistRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryLicense.json';//用户驾照列表请求地址 select
    var infoPageUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/config/html/resultlist.jsp';//查询结果页地址
    var infoTabPageUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/config/html/resultlisttab.jsp';//查询结果页地址(带选项卡)
    var clxcSubmit = $('#clxc_submit');
    var jzcxSubmit = $('#jzcx_submit');
    /*clxcSubmit.on('click', clxcListener);
     jzcxSubmit.on('click', jzcxListener);*/
    //按车辆 提交事件
    function clxcListener() {
        var ip_hphm = document.getElementById('hphm');
        var index = ip_hphm.selectedIndex;
        var hphm = ip_hphm.options[index].text;
        var hpzl = ip_hphm.options[index].getAttribute('data-type');
        var jkbj;
        $('#nodo01').prop('checked') ? jkbj = 0 : jkbj = '';
        /*var params = {
         "register": userName,
         "cartype" : hpzl,
         "carid"   : hphm
         };*/
        clxcSubmit.off('click');
        var params = '#mode=wf_car@cartype=' + hpzl + '@carid=' + hphm + '@jkbj=' + jkbj;
        window.open(infoPageUrl + params);//通过url hash传参
        clxcSubmit.on('click', clxcListener);

    }

    //按驾照查询提交事件
    function jzcxListener() {
        var ip_jzxm = $('#jzxm');
        var licenseid = ip_jzxm.val();
        var jkbj;
        jzcxSubmit.off('click');
        $('#nodo02').prop('checked') ? jkbj = 0 : jkbj = '';
        var params = '#mode=wf_card@licenseid=' + licenseid + '@jkbj=' + jkbj;
        window.open(infoTabPageUrl + params);//通过url hash传参
        jzcxSubmit.on('click', jzcxListener);
    }

    initSubmitBtn();
    //init select
    function initSubmitBtn() {
        clxcSubmit.addClass('ui_btn_01_disable');
        jzcxSubmit.addClass('ui_btn_01_disable');
    }

    //bindEvent
    function bindEvent(input, btn, listener) {
        var inputVal = input.val();
        var _btn = btn;
        var _listener = listener;
        if ( inputVal !== '未绑定' ) {
            App.UI('buttonHover', {//添加按钮点击效果
                "dom"           : _btn,
                "hoverClassName": 'ui_btn_01_hover'
            });
            _btn.removeClass('ui_btn_01_disable');
            _btn.on('click', _listener);
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
    }, function () {
        bindEvent($('#hphm'), clxcSubmit, clxcListener);
    });
    App.UI('select', {
        "dom"   : $('#jzxm'),
        "url"   : cardlistRequestUrl,
        "data"  : {'register': userName, 'axisFlag': true},
        "module": 'license'
    }, function () {
        bindEvent($('#jzxm'), jzcxSubmit, jzcxListener);
    });
});