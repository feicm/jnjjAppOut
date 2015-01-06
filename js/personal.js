$(function () {
    /*
     * 个人信息维护
     * */
    var saveinfoBtn = $('#saveinfo_btn');//保存
    var gorepwdBtn = $('#go_repwd');//修改密码
    var moveContacts = $('#moveContacts');//移车联系人信息
    var closeContacts = $('#closeContacts');//密切联系人信息
    var userName = App.LS.get('username');
    var ip_username = $('#username');//用户名
    var ip_name = $('#name');//姓名
    var ip_photo = $('#photo');//头像
    var ip_gender = $('#gender');//性别
    var ip_phone = $('#phone'); //手机
    var ip_idnum = $('#idnum');//身份证
    //var ip_email = $('#email'); //邮箱
    var ip_time = $('#time'); //注册时间
    //var ip_y_name = $('#y_name');//移车人姓名
    //var ip_y_phone = $('#y_phone');//移车人电话
    //var ip_m_name = $('#m_name'); //密切联系姓名
    //var ip_m_phone = $('#m_phone'); //密切联系人电话
    //var ip_m_innum = $('#m_innum');//密切联系人身份证
    //var cur_ip_phone = '';//手机号初始值
    //var cur_ip_y_name = '';//移车人姓名初始值
    //var cur_ip_y_phone = '';//移车人电话初始值
    var urlPre = 'adapter?open&url=';
    var progressDialog;
    var userinfoRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/getUserInfo.json';//用户信息请求地址
    var edituserinfoRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/updUserInfo.json';//用户信息修改请求地址
    var repwdPageUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/config/html/repwd.jsp';//修改密码页url
    console.log('username：' + userName);
    //请求用户信息
    App.getAjaxData(userinfoRequestUrl, {
        "registerName": userName
    }, function (data) {//用户信息请求回调
        var msg = data.userCenterResponse;
        if ( msg ) {
            renderPersonalInfoPage(msg);
        } else {
            App.UI('dialog', {
                type : 'alert',
                title: '公众服务平台',
                msg  : '用户信息初始化失败!'
            });
        }
    });
    //填充个人信息
    function renderPersonalInfoPage(data) {
        ip_username.text(App.LS.get('username'));
        data.userName && ip_name.text(data.userName);
        data.userImage && ip_photo.attr('src', data.userImage);
        getGender(data.identityId) ? ip_gender.addClass('icon-user-men') : ip_gender.addClass('icon-user-women');
        data.phoneNum && ip_phone.text(data.phoneNum);
        data.identityId && ip_idnum.text(data.identityId);
        //data.email && ip_email.val(data.email);
        data.registerTime && ip_time.text(data.registerTime);
        //data.moveCarName && ip_y_name.val(data.moveCarName);
        //data.moveCarPhone && ip_y_phone.val(data.moveCarPhone);
        //data.closeUserName && ip_m_name.val(data.closeUserName);
        //data.closePhoneNum && ip_m_phone.val(data.closePhoneNum);
        //data.closeIdentityId && ip_m_innum.val(data.closeIdentityId);
        //cur_ip_phone = ip_phone.val();//手机号初始值
        //cur_ip_y_name = ip_y_name.val();//移车人姓名初始值
        //cur_ip_y_phone = ip_y_phone.val();//移车人电话初始值
    }

    // 更新修改信息函数

    //修改密码事件函数
    function gorepwdListener() {
        gorepwdBtn.off('click');
        window.open(repwdPageUrl);
        gorepwdBtn.on('click', gorepwdListener);
    }

    function getGender(UUserCard) {
        if ( parseInt(UUserCard.substr(16, 1)) % 2 == 1 ) {
            return 1;
        } else {
            return 0;
        }
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
})