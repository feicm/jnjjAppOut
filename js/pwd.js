$(function () {
    console.log('module pwd js');
    var userName = App.Cookie.GetCookie('username');
    var backpwdMethonSelect = $('#backpwd_methon'); //找回密码——下拉
    var backpwdBtn = $('#backpwd_btn');//找回密码——提交按钮
    var repwdBtn = $('#repwd_btn'); //密码修改--提交按钮
    var urlPre = 'adapter?open&url=';
    var repwdRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/oldPassSetPass.json';//密码修改
    var mailRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/mailSetPass.json';//邮箱找回
    var phoneRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/phoneSetPass.json';//手机找回
    var closerRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/closeSetPass.json';//密切联系人找回
    //TODO 流程代码
    repwdBtn.length && repwdBtn.on('click', repwdListener);
    backpwdBtn.length && backpwdBtn.on('click', backpwdListener);

    //密码找回事件函数
    function backpwdListener() {
        var getMethon = $('#backpwd_methon').val();
        var ip_email = $('#email').val();
        var ip_phone = $('#phone').val();
        var ip_mqlxrxm = $('#mqlxrxm').val();
        var ip_mqlxrdh = $('#mqlxrdh').val();
        var ip_mqlxrsfzh = $('#mqlxrsfzh').val();
        var opts = {};
        var params;
        backpwdBtn.off('click');
        switch ( getMethon ) {
            case 'fromemail':
                opts = {
                    "email": $('#email')//邮箱
                };
                if ( App.verify(opts) ) {
                    //&userName=测试用户1A&email=xx@xx.com
                    params = {
                        "userName": userName,
                        "email"   : ip_email
                    };
                    sendBackpwdRequest(mailRequestUrl, params);
                } else {
                    backpwdBtn.on('click', backpwdListener);
                }
                break;
            case 'fromphone':
                opts = {
                    "phone": $('#phone')//手机
                };
                if ( App.verify(opts) ) {
                    //&userName=测试用户3A&phoneNum=18888888888
                    params = {
                        "userName": userName,
                        "phoneNum": ip_phone
                    };
                    sendBackpwdRequest(phoneRequestUrl, params);
                } else {
                    backpwdBtn.on('click', backpwdListener);
                }
                break;
            case 'fromcloser':
                opts = {
                    "closername"  : $('#mqlxrxm'),//密切联系人姓名
                    "closerphone" : $('#mqlxrdh'),//手机
                    "closeridcard": $('#mqlxrsfzh')//身份证
                };
                if ( App.verify(opts) ) {
                    //&userName=测试用户3A
                    // &closeUserName=closeUserName
                    // &closeIdentityId=closeIdentityId
                    // &closePhoneNum=closePhoneNum
                    params = {
                        "userName"       : userName,
                        "closeUserName"  : ip_mqlxrxm,
                        "closePhoneNum"  : ip_mqlxrdh,
                        "closeIdentityId": ip_mqlxrsfzh
                    };
                    sendBackpwdRequest(closerRequestUrl, params);
                } else {
                    backpwdBtn.on('click', backpwdListener);
                }
                break;
            default :
                console.log('这是一个彩蛋，还愣着干嘛，买彩票去啊！！');
                backpwdBtn.on('click', backpwdListener);
        }
    }

    //修改密码事件函数
    function repwdListener() {
        var pwdOld = $('#repwd_old').val();
        var pwdNew = $('#repwd_new').val();
        var opts = {};
        repwdBtn.off('click');
        opts = {
            "pwdold" : $('#repwd_old'),//用户名
            "pwdnew1": $('#repwd_new'),//密码1
            "pwdnew2": $('#repwd_new2')//密码2
        };
        var params;//注册表单提交参数对象
        if ( !pwdOld ) {
            alert('请填写旧密码！');
            repwdBtn.on('click', repwdListener);
        } else if ( App.verify(opts) ) {
            //&userName=测试用户3A
            // &oldPass=closeUserName
            // &newPass=closeIdentityId
            params = {
                "userName": userName,
                "oldPass" : pwdOld,
                "newPass" : pwdNew
            };
            Wisp.UI.progressDialog.show('密码修改中，请稍后！');
            //提交表单
            App.getAjaxData(repwdRequestUrl, params, function (data) {
                if ( data === 'error' ) {//ajax 失败回调
                    repwdBtn.on('click', repwdListener);
                    return;
                }
                var msg = data.passwordRestResponse;
                console.dir(msg);
                if ( msg.result === 'success' ) {
                    Wisp.UI.progressDialog.remove();
                    alert(msg.resultContent + '!');
                    repwdBtn.on('click', repwdListener);
                } else if ( msg.result === 'false' ) {
                    Wisp.UI.progressDialog.remove();
                    alert(msg.resultContent + '!');
                    repwdBtn.on('click', repwdListener);
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert('密码修改失败!');
                    repwdBtn.on('click', repwdListener);
                }
            })
        }else{
            repwdBtn.on('click', repwdListener);
        }
    }

    //发送密码修改请求
    function sendBackpwdRequest(url, data) {
        Wisp.UI.progressDialog.show('找回密码中，请稍后！');
        //提交表单
        App.getAjaxData(url, data, function (data) {
            if ( data === 'error' ) {//ajax 失败回调
                backpwdBtn.on('click', backpwdListener);
                return;
            }
            var msg = data.passwordRestResponse;
            console.dir(msg);
            if ( msg.result === 'true' ) {
                Wisp.UI.progressDialog.remove();
                alert(msg.resultContent + '!');
                backpwdBtn.on('click', backpwdListener);
            } else if ( msg.result === 'false' ) {
                Wisp.UI.progressDialog.remove();
                alert(msg.resultContent + '!');
                backpwdBtn.on('click', backpwdListener);
            } else {
                Wisp.UI.progressDialog.remove();
                alert('找回密码失败!');
                backpwdBtn.on('click', backpwdListener);
            }
        })
    }

    $('#repwd_new').on('blur', function () {
        var v1 = $(this).val(),
            v2 = $('#repwd_new2').val();
        if ( v2 !== '' && !ispwdAgreement(v1, v2) ) {
            alert('两次密码输入不一致！');
        }
    });
    $('#repwd_new2').on('blur', function () {
        var v1 = $(this).val(),
            v2 = $('#repwd_new').val();
        if ( v2 !== '' && !ispwdAgreement(v1, v2) ) {
            alert('两次密码输入不一致！');
        }
    });
    //验证两次密码一致性
    function ispwdAgreement(pwd1, pwd2) {
        return pwd1 === pwd2;
    }

    /*
     * --------------------页面效果------------------------
     * */
    App.UI('inputClose', {//页面输入校验
        "doms": $('.list-block')
    });
    if ( backpwdMethonSelect.length && backpwdBtn.length ) {   //密码找回
        backpwdMethonSelect.mobiscroll().select({ //下拉底部弹出
            theme   : 'ios7',
            lang    : 'zh',
            display : 'bottom',
            mode    : 'scroller',
            minWidth: 200
        });
        App.UI('toggleSelectBlock', {//下拉选项联动切换
            "dom": backpwdMethonSelect
        });
        App.UI('buttonHover', {//添加按钮点击效果
            "dom"           : backpwdBtn,
            "hoverClassName": 'ui_btn_01_hover'
        });
    }
    if ( repwdBtn.length ) {  //密码修改
        App.UI('buttonHover', {//添加按钮点击效果
            "dom"           : repwdBtn,
            "hoverClassName": 'ui_btn_01_hover'
        });
    }
});