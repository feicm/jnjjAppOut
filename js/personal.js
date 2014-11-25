$(function () {
    /*
     * 个人信息维护
     * */
    var saveinfoBtn = $('#saveinfo_btn');
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
    var urlPre = 'adapter?open&url=';
    var userinfoRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/getUserInfo.json';//用户信息请求地址
    var edituserinfoRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/updUserInfo.json';//用户信息修改请求地址
    console.log('用户名：' + userName);
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
    }

    //registerName=测试用户2A
    // &phonenum=18555555555
    // &movecarname=吗1
    // &movecarphone=m2
    saveinfoBtn.on('click', saveinfoListener);
    function saveinfoListener() {
        var params = {
            "registerName": userName,
            "phonenum"    : ip_phone.val(),
            "movecarname" : ip_y_name.val(),
            "movecarphone": ip_y_phone.val()
        };
        saveinfoBtn.off('click');
        if ( !params.phonenum ) {
            alert('手机号码不能为空！');
            saveinfoBtn.on('click', saveinfoListener);
            return;
        }
        Wisp.UI.progressDialog.show('信息保存中，请稍后！');
        App.getAjaxData(edituserinfoRequestUrl, params, function (data) {
            var msg = data.userUpdateResponse;
            if ( msg ) {
                console.log('更新成功！');
                alert('信息已保存！');
                Wisp.UI.progressDialog.remove();
                saveinfoBtn.on('click', saveinfoListener);
            } else {
                alert('保存失败！');
                saveinfoBtn.on('click', saveinfoListener);
                Wisp.UI.progressDialog.remove();
            }
        });
    }

    /*
     * --------------------页面效果------------------------
     * */
    App.UI('inputClose', {//个人资料页面切换效果
        "doms": $('.list-block')
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