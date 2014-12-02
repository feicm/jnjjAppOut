$(function () {
    /*
     * 个人信息维护
     * */
    var saveinfoBtn = $('#saveinfo_btn');//保存
    var gorepwdBtn = $('#go_repwd');//修改密码
    var userName = App.Cookie.GetCookie('username');
    var ip_username = $('#username');//用户名
    var ip_name = $('#name');//姓名
    var ip_photo = $('#photo');//手机
    var ip_gender = $('#gender');//性别
    var ip_phone = $('#phone'); //手机
    var ip_idnum = $('#idnum');//身份证
    var ip_email = $('#email'); //邮箱
    var ip_time = $('#time'); //注册时间
    var ip_y_name = $('#y_name');//移车人姓名
    var ip_y_phone = $('#y_phone');//移车人电话
    var ip_m_name = $('#m_name'); //密切联系姓名
    var ip_m_phone = $('#m_phone'); //密切联系人电话
    var ip_m_innum = $('#m_innum');//密切联系人身份证
    var cur_ip_phone='';//手机号初始值
    var cur_ip_y_name='';//移车人姓名初始值
    var cur_ip_y_phone='';//移车人电话初始值
    var urlPre = 'adapter?open&url=';
    var userinfoRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/getUserInfo.json';//用户信息请求地址
    var edituserinfoRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/updUserInfo.json';//用户信息修改请求地址
    var repwdPageUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/config/html/repwd.jsp';//修改密码页url
    var loginPageUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/config/html/loginnoskip.jsp';//修改密码页url
    console.log('用户名：' + userName);
    if(!userName){
        alert('请先登录！');
        window.open(loginPageUrl);
        return;
    }
    //请求用户信息
    App.getAjaxData(userinfoRequestUrl, {
        "registerName": userName
    }, function (data) {//用户信息请求回调
        var msg = data.userCenterResponse;
        if ( msg ) {
            renderPersonalInfoPage(msg);
        } else {
            alert('用户信息初始化失败！');
        }
    });
    //填充个人信息
    function renderPersonalInfoPage(data) {
        data.userName && ip_username.val(data.userName);
        data.registerName && ip_name.val(data.registerName);
        data.userImage && ip_photo.attr('src', data.userImage);
        data.sex && ip_gender.val(data.sex);
        data.phoneNum && ip_phone.val(data.phoneNum);
        data.identityId && ip_idnum.val(data.identityId);
        data.email && ip_email.val(data.email);
        data.registerTime && ip_time.val(data.registerTime);
        data.moveCarName && ip_y_name.val(data.moveCarName);
        data.moveCarPhone && ip_y_phone.val(data.moveCarPhone);
        data.closeUserName && ip_m_name.val(data.closeUserName);
        data.closePhoneNum && ip_m_phone.val(data.closePhoneNum);
        data.closeIdentityId && ip_m_innum.val(data.closeIdentityId);
        cur_ip_phone =ip_phone.val();//手机号初始值
        cur_ip_y_name = ip_y_name.val();//移车人姓名初始值
        cur_ip_y_phone = ip_y_phone.val();//移车人电话初始值
    }

    gorepwdBtn.on('click', gorepwdListener);
    saveinfoBtn.on('click', saveinfoListener);
    //保存按钮事件函数
    function saveinfoListener() {

        //registerName=测试用户2A
        // &phonenum=18555555555
        // &movecarname=吗1
        // &movecarphone=m2
        var params = {
            "registerName": userName,
            "phonenum"    : ip_phone.val(),
            "movecarname" : ip_y_name.val(),
            "movecarphone": ip_y_phone.val()
        };
        var opts;
        saveinfoBtn.off('click');
        if ( params.phonenum === cur_ip_phone
            && params.movecarname === cur_ip_y_name
            && params.movecarphone === cur_ip_y_phone ) {
            alert('信息未修改！');
            saveinfoBtn.on('click', saveinfoListener);
            return;
        }
        if ( params.phonenum !== cur_ip_phone ) {//修改过的项视为必填项，经过校验
            opts = {
                "phone": ip_phone
            };//校验字段
            updataInfo(edituserinfoRequestUrl, params, opts);
        }
        if ( params.movecarname !== cur_ip_y_name ) {
            opts = {
                "movecarname": ip_y_name
            };//校验字段
            updataInfo(edituserinfoRequestUrl, params, opts);
        }
        if ( params.movecarphone !== cur_ip_y_phone ) {
            opts = {
                "movecarphone": ip_y_phone
            };//校验字段
            updataInfo(edituserinfoRequestUrl, params, opts);
        }
    }

    // 更新修改信息函数
    function updataInfo(url, params, opts) {
        if ( App.verify(opts) ) {
            Wisp.UI.progressDialog.show('信息保存中，请稍后！');
            App.getAjaxData(url, params, function (data) {
                if ( data === 'error' ) {//ajax 失败回调
                    saveinfoBtn.on('click', saveinfoListener);
                    return;
                }
                var msg = data.userUpdateResponse;
                if ( msg ) {
                    console.log('更新成功！');
                    alert('信息已保存！');
                    Wisp.UI.progressDialog.remove();
                    saveinfoBtn.on('click', saveinfoListener);
                    params.phonenum && (cur_ip_phone=params.phonenum);
                    params.movecarname && (cur_ip_y_name=params.movecarname);
                    params.movecarphone && (cur_ip_y_phone=params.movecarphone);
                } else {
                    alert('保存失败！');
                    saveinfoBtn.on('click', saveinfoListener);
                    Wisp.UI.progressDialog.remove();
                }
            });
        } else {
            saveinfoBtn.on('click', saveinfoListener);
        }
    }

    //修改密码事件函数
    function gorepwdListener() {
        gorepwdBtn.off('click');
        window.open(repwdPageUrl);
        gorepwdBtn.on('click', gorepwdListener);
    }

    /*
     * --------------------页面效果------------------------
     * */
    App.UI('inputClose', {//个人资料页面切换效果
        "doms": $('.list-block')
    });
    App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : gorepwdBtn,
        "hoverClassName": 'ui_btn_02_hover'
    });
    App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : saveinfoBtn,
        "hoverClassName": 'ui_btn_01_hover'
    });
    var edits = $('.edit');
    edits.each(function (index) {
        var input;
        $(this).on('click', function (e) {
            input = $(this).parent().find('input');
            input.css('border', '1px dashed #e00');
            input.on('blur', function (e) {
                $(this).css('border', 'none')
            })
        })
    })
})