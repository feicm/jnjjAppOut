$(function () {
    /*
     * 个人信息
     * */
    var moveContacts = $('#moveContacts');//移车联系人信息
    var closeContacts = $('#closeContacts');//密切联系人信息
    var urlPre = 'adapter?open&url=';
    var userinfoRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/getUserInfo.json';//用户信息请求地址
    var edituserinfoRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/updUserInfo.json';//用户信息修改请求地址
    console.log('username：' + App.LS.get('username'));
    //个人信息对象
    var Personal = {
        "userName"              : App.LS.get('username'),
        "ip_username"           : $('#username'),
        "ip_name"               : $('#name'),
        "ip_photo"              : $('#photo'),
        "ip_gender"             : $('#gender'),
        "ip_phone"              : $('#phone'),
        "ip_idnum"              : $('#idnum'),
        "ip_email"              : $('#email'),
        "ip_time"               : $('#time'),
        "ip_mover"              : $('#mover'),
        "ip_closer"             : $('#closer'),
        "init"                  : function (opts) {
            this.list = opts.list;
            this.oInit();
            this.bindEvent(this.mode);
            return this;
        },
        "oInit"                 : function () {//请求用户信息
            var _self = this;
            App.getAjaxData(userinfoRequestUrl, {
                "registerName": _self.userName
            }, function (data) {//用户信息请求回调
                var msg = data.userCenterResponse;
                if ( msg ) {
                    _self.renderPersonalInfoPage(msg);
                } else {
                    App.UI('dialog', {
                        type : 'alert',
                        title: '公众服务平台',
                        msg  : '用户信息初始化失败!'
                    });
                }
            });
        },
        //渲染个人信息页
        "renderPersonalInfoPage": function (data) {
            var _self = this;
            _self.ip_username.text(_self.userName);
            data.userName && _self.ip_name.text(data.userName);
            data.userImage && _self.ip_photo.attr('src', data.userImage);
            if ( _self.getGender(data.identityId) ) {
                _self.ip_gender.addClass('icon-user-men')
            } else {
                _self.ip_gender.addClass('icon-user-women')
            }
            data.phoneNum && _self.ip_phone.text(data.phoneNum);
            data.identityId && _self.ip_idnum.text(data.identityId);
            data.email && _self.ip_email.val(data.email);
            data.registerTime && _self.ip_time.text(data.registerTime);
            data.moveCarName && _self.ip_mover.text(data.moveCarName);
            data.closeUserName && _self.ip_closer.text(data.closeUserName);
        },
        "bindEvent"             : function (mode) {
            var _self = this;
        },
        "getModeName"           : function (item) {
            return item.data('rel');
        },
        "updataItemVal"         : function (mode) {

        },
        //通过身份证获取性别
        "getGender"             : function (UUserCard) {
            if ( parseInt(UUserCard.substr(16, 1)) % 2 == 1 ) {
                return 1;
            } else {
                return 0;
            }
        }
    };
    var oPersonal = Personal.init({
        "list": $('.list-block li')
    });

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