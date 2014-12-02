$(function () {
    /*
     * lgoin
     * 流程：设置化客户端ui数据——发起登录验证请求(点击登录)(loginSubmitListener)
     *      ——登录请求回调(loginSuccessCallback)
     *      ——初始化权限按钮（更多）(refreshMoreViewData——>formatData)
     *      ——发起个人信息请求(-)
     *      ——个人信息请求回调(userInfoSuccessCallback)
     *      ——初始化个人中心按钮(-)
     *      ——发送初始化后的客户端ui数据(sendClientUIdata)
     *      ——登录结束
     * */
    //dom
    var loginSubmit = $('#login-submit');//登录
    var rigisterBtn = $('#rigister');//注册
    var skipBtn = $('#skip'); //跳过
    var backpwdBtn = $('#backpwd'); //忘记密码
    var username;
    var password;
    var roleId = '0001';
    var urlPre = 'adapter?open&url=';
    var loginRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/userLogin.json';//登录验证请求地址
    var userinfoRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/getUserInfo.json';//用户信息请求地址
    var rigisterPageUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/config/html/rigister.jsp';  //注册页地址
    var backpwdPageUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/config/html/backpwd.jsp'; //找回密码页地址
    loginSubmit.on('click', loginSubmitListener);
    rigisterBtn.on('click', rigisterListener);
    skipBtn.length && skipBtn.on('click', skipListener);
    backpwdBtn.length && backpwdBtn.on('click', backpwdListener);

    //登录事件函数
    function loginSubmitListener() {
        username = $('#username').val();
        password = $('#password').val();
        loginSubmit.off('click');
        /*App.UI('buttonHover',{//移除按钮点击效果
         "dom":loginSubmit,
         "off":true
         });*/
        if ( username === '' ) {
            alert('用户名不能为空！');
            loginSubmit.on('click', loginSubmitListener);
        } else if ( password === '' ) {
            alert('密码不能为空！');
            loginSubmit.on('click', loginSubmitListener);
        } else {
            Wisp.UI.progressDialog.show('登录中，请稍后！');
            //发起登录请求
            App.getAjaxData(loginRequestUrl, {
                "userName": username,
                "password": password,
                "roleId"  : roleId
            }, function (data) {//登录请求回调
                if(data==='error'){//ajax 失败回调
                    loginSubmit.on('click', loginSubmitListener);
                    return;
                }
                var msg = data.loginResponse;
                if ( msg.loginSuccess === 'true' ) {
                    loginSuccessCallback(msg, jnjjApp.footbarDatas);
                } else if ( msg.loginSuccess === 'false' ) {
                    Wisp.UI.progressDialog.remove();
                    alert(msg.loginContent + '!');
                    loginSubmit.on('click', loginSubmitListener);
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert('登录失败!');
                    loginSubmit.on('click', loginSubmitListener);
                }
            });
        }
    }

    //注册事件函数
    function rigisterListener() {
        rigisterBtn.off('click');
        window.open(rigisterPageUrl);
        rigisterBtn.on('click', rigisterListener);
    }

    //找回密码事件
    function backpwdListener() {
        backpwdBtn.off('click');
        window.open(backpwdPageUrl);
        backpwdBtn.on('click', backpwdListener);
    }

    //跳过事件函数
    function skipListener() {
        console.dir(jnjjApp.footbarDatas);
        console.dir(jnjjApp.siderDatas);
        Wisp.UI.progressDialog.show('数据加载中，请稍后！');
        skipBtn.off('click');
        sendClientUIdata(jnjjApp.footbarDatas, jnjjApp.siderDatas);//发送默认配置按钮
        Wisp.UI.progressDialog.remove();
        Wisp.UI.loginResult.success();
        skipBtn.on('click', skipListener);
    }

    //登录成功回调函数
    function loginSuccessCallback(data, footbarDatas) {
        console.dir(data);
        if ( data.loginSuccess ) {//登陆成功
            //初始化footbarDatas
            var MoreViewData = refreshMoreViewData(footbarDatas, data.authList);//刷新更多按钮
            console.dir(MoreViewData);
            //请求用户信息
            App.getAjaxData(userinfoRequestUrl, {
                "registerName": username
            }, function (data) {//用户信息请求回调
                var msg = data.userCenterResponse;
                if ( msg ) {
                    userInfoSuccessCallback(msg, jnjjApp.siderDatas);
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert('登录失败!(个人信息初始化失败)');
                    loginSubmit.on('click', loginSubmitListener);
                }
            });
        } else {//登录失败
            Wisp.UI.progressDialog.remove();
            alert(msg.loginContent + "!");
            loginSubmit.on('click', loginSubmitListener);
        }
    }

    //获取个人信息回调函数
    function userInfoSuccessCallback(data, siderDatas) {
        console.dir(data);
        data.userName && (siderDatas.sider.info.name = data.userName);
        data.userImage && (siderDatas.sider.info.img = data.userImage);
        siderDatas.sider.info.url = '';
        var l=siderDatas.sider.list.length;
        for(var i=0;i<l;i++){
            siderDatas.sider.list[i].enable='true';
        }
        sendClientUIdata(jnjjApp.footbarDatas, siderDatas);//发送客户端ui数据
        Wisp.UI.progressDialog.remove();//移除加载框，登录流程结束
        Wisp.UI.loginResult.success();
        App.Cookie.SetCookie('username', username);
        console.log('login END!!!!');
    }

    //发送客户端初始化ui
    function sendClientUIdata(footbarDatas, siderDatas) {
        Wisp.UI.Init({
            'type' : 'footbar',
            'datas': footbarDatas
        });
        Wisp.UI.Init({
            'type' : 'sider',
            'datas': siderDatas
        });
    }

    //刷新更多按钮数据
    function refreshMoreViewData(defaultdata, resdata) {
        console.dir(defaultdata);
        console.dir(resdata);
        var l = defaultdata.footbar.length - 1;
        console.dir(l);
        var more_btns = defaultdata.footbar[l].shortcutBtns;
        var cur_btn;
        for ( var i = resdata.length - 1; i >= 0; i-- ) {
            cur_btn = resdata[i].authcontent;
            formatData(cur_btn, more_btns);
        }
        return defaultdata;
    }

    //格式化更多按钮数据
    function formatData(curdata, arr) {
        var suArr;
        var name;
        for ( var i = arr.length - 1; i >= 0; i-- ) {
            suArr = arr[i].data;
            for ( var j = suArr.length - 1; j >= 0; j-- ) {
                name = suArr[j].name;
                if ( curdata === name ) {
                    suArr[j].enable = 'true';
                    return;
                }
            }
        }
    }

    /*
     * --------------------页面效果------------------------
     * */
    App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : loginSubmit,
        "hoverClassName": 'ui_btn_01_hover'
    });
    App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : rigisterBtn,
        "hoverClassName": 'ui_btn_hover'
    });
    skipBtn.length && App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : skipBtn,
        "hoverClassName": 'ui_btn_02_hover'
    });
    backpwdBtn.length && App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : backpwdBtn,
        "hoverClassName": 'ui_btn_02_hover'
    });
});