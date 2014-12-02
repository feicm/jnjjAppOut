$(function () {
    var rigisterSubmit = $('#submit_rigister');
    var c1_btn = $('#c1_btn');
    var c2_btn = $('#c2_btn');
    var urlPre = 'adapter?open&url=';
    var rigisterRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/userGegister.json';//用户注册请求地址
    var userinfoRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/getUserInfo.json';//用户信息请求地址
    var opts = {};
    rigisterSubmit.on('click', rigisterListener);//注册按钮事件注册
    //注册按钮事件
    function rigisterListener() {
        var setusername = $('#setusername').val(),//设置用户名
            setpwd_01 = $('#setpwd_01').val(),//设置密码
            setpwd_02 = $('#setpwd_02').val(),//设置密码02
            setname = $('#setname').val(),//设置姓名
            setphone = $('#setphone').val(),//设置手机号
            setidnum = $('#setidnum').val(), //设置身份证号
            yclxxm = $('#yclxxm').val(), //设置移车联系人姓名
            yclxdh = $('#yclxdh').val(), //设置移车联系人电话
            setemail = $('#setemail').val(), //设置邮箱
            mqlxrxm = $('#mqlxrxm').val(), //设置密切联系人姓名
            mqlxrdh = $('#mqlxrdh').val(), //设置密切联系人电话
            mqlxrsfzh = $('#mqlxrsfzh').val(), //设置密切联系人身份证号
            roleId = '0001';
        opts = {
            "username": $('#setusername'),//用户名
            "pwd1"    : $('#setpwd_01'),//密码1
            "pwd2"    : $('#setpwd_02'),//密码2
            "name"    : $('#setname'),//姓名
            "phone"   : $('#setphone'),//手机
            "idnum"   : $('#setidnum')//身份证
        };
        var params;//注册表单提交参数对象

        if ( App.verify(opts) ) {
            //registerName=测试用户2A
            // &userName=测试2
            // &password=1111
            // &identityId=35071111111111111
            // &phoneNum=18888888888
            // &email=xx@xx.com
            // &closeUserName=closeUserName
            // &closeIdentityId=closeIdentityId
            // &closePhoneNum=closePhoneNum
            // &roleId=0001
            params = {
                "registerName"   : setusername,
                "userName"       : setname,
                "password"       : setpwd_02,
                "identityId"     : setidnum,
                "phoneNum"       : setphone,
                "email"          : setemail || '',
                "moveCarName "   : yclxxm || '',
                "moveCarPhone"   : yclxdh || '',
                "closeUserName"  : mqlxrxm || '',
                "closeIdentityId": mqlxrsfzh || '',
                "closePhoneNum"  : mqlxrdh || '',
                "roleId"         : roleId
            };
            Wisp.UI.progressDialog.show('注册中，请稍后！');
            //提交表单
            App.getAjaxData(rigisterRequestUrl, params, function (data) {
                if ( data === 'error' ) {//ajax 失败回调
                    rigisterSubmit.on('click', rigisterListener);
                    return;
                }
                var msg = data.registerResponse;
                console.dir(msg);
                if ( msg.loginSuccess === 'true' ) {
                    loginSuccessCallback(msg, jnjjApp.footbarDatas);
                    rigisterSubmit.on('click', rigisterListener);
                } else if ( msg.loginSuccess === 'false' ) {
                    Wisp.UI.progressDialog.remove();
                    alert(msg.loginContent + '!');
                    rigisterSubmit.on('click', rigisterListener);
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert('提交失败!');
                    rigisterSubmit.on('click', rigisterListener);
                }
            })
        }
    }

    $('#setpwd_01').on('blur', function () {
        var v1 = $(this).val(),
            v2 = $('#setpwd_02').val();
        if ( v2 !== '' && !ispwdAgreement(v1, v2) ) {
            alert('两次密码输入不一致！');
        }
    });
    $('#setpwd_02').on('blur', function () {
        var v1 = $(this).val(),
            v2 = $('#setpwd_01').val();
        if ( v2 !== '' && !ispwdAgreement(v1, v2) ) {
            alert('两次密码输入不一致！');
        }
    });
    /*
     *  --------------------功能函数------------------------
     * */

    //验证两次密码一致性
    function ispwdAgreement(pwd1, pwd2) {
        return pwd1 === pwd2;
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
                "registerName": opts.username.val()
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

    //获取个人信息回调函数
    function userInfoSuccessCallback(data, siderDatas) {
        console.dir(data);
        data.userName && (siderDatas.sider.info.name = data.userName);
        data.userImage && (siderDatas.sider.info.img = data.userImage);
        siderDatas.sider.info.url = '';
        sendClientUIdata(jnjjApp.footbarDatas, siderDatas);//发送客户端ui数据
        Wisp.UI.progressDialog.remove();//移除加载框，登录流程结束
        Wisp.UI.loginResult.success();
        console.log('END!!!!');

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

    /*
     * --------------------页面效果------------------------
     * */
    App.UI('changePage', {//注册页面切换效果
        "wrap": $('#rigister_form')
    });
    App.UI('inputClose', {//注册页面输入校验
        "doms": $('.list-block')
    });
    App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : rigisterSubmit,
        "hoverClassName": 'ui_btn_01_hover'
    });
    App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : c1_btn,
        "hoverClassName": 'ui_btn_01_hover'
    });
    App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : c2_btn,
        "hoverClassName": 'ui_btn_01_hover'
    });
})