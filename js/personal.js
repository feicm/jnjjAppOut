$(function () {
    /*
     * 个人信息
     * */
    /*var edituserinfoRequestUrl = urlPre
     + jnjjApp.config.requestUrl
     + '/jnpublic/updUserInfo.json';//用户信息修改请求地址*/
    console.log('username：' + App.LS.get('App_userName'));
    var PageId = App.getPageId(window.location.href);
    var module = $('.c').data('mode');//模块名获取
    App.LS.set(module, PageId);//pageid 写入localstorage
    //个人信息对象
    var Personal = {
        "preQuestUrl"             : 'adapter?open&url=' + jnjjApp.config.requestUrl,
        "ip_username"             : $('#username'),
        "ip_name"                 : $('#name'),
        "ip_photo"                : $('#photo'),
        "ip_gender"               : $('#gender'),
        "ip_phone"                : $('#phone'),
        "ip_idnum"                : $('#idnum'),
        "ip_email"                : $('#email'),
        "ip_time"                 : $('#time'),
        "ip_mover"                : $('#mover'),
        "ip_m_name"               : $('#m_name'),
        "ip_m_phone"              : $('#m_phone'),
        "ip_closer"               : $('#closer'),
        "ip_c_name"               : $('#c_name'),
        "ip_c_phone"              : $('#c_phone'),
        "ip_c_sfzh"               : $('#c_sfzh'),
        "App_userName"            : App.LS.get('App_userName'),
        "App_name"                : App.LS.get('App_name'),
        "App_identityId"          : App.LS.get('App_identityId'),
        "App_userImage"           : App.LS.get('App_userImage'),
        "App_phoneNum"            : App.LS.get('App_phoneNum'),
        "App_email"               : App.LS.get('App_email'),
        "App_registerTime"        : App.LS.get('App_registerTime'),
        "App_moveCar_Name"        : App.LS.get('App_moveCar_Name'),
        "App_moveCar_phoneNum"    : App.LS.get('App_moveCar_phoneNum'),
        "App_closeUser_Name"      : App.LS.get('App_closeUser_Name'),
        "App_closeUser_PhoneNum"  : App.LS.get('App_closeUser_PhoneNum'),
        "App_closeUser_IdentityId": App.LS.get('App_closeUser_IdentityId'),
        "urlRouter"               : {
            "p_moveContacts" : "movecarpeople.jsp", //移车联系人页面
            "p_closeContacts": "closepeople.jsp" //密切联系人页面
        },
        "PageId_lv"               : (new Date()).getTime(),
        "init"                    : function (opts) {
            this.list = opts.list;
            this.renderPersonalInfoPage();
            this.bindEvent();
            return this;
        },
        //渲染个人信息页
        "renderPersonalInfoPage"  : function () {
            var _self = this;
            if ( _self.ip_username.length ) {//个人中心
                _self.ip_username.text(_self.App_userName);//用户名
                _self.ip_name.text(_self.App_name);//姓名
                _self.ip_photo.attr('src', _self.App_userImage);
                if ( _self.getGender(_self.App_identityId) ) {
                    _self.ip_gender.addClass('icon-user-men')
                } else {
                    _self.ip_gender.addClass('icon-user-women')
                }
                _self.ip_phone.text(_self.App_phoneNum);
                _self.ip_idnum.text(_self.App_identityId);
                _self.ip_email.val(_self.App_email);
                _self.ip_time.text(_self.App_registerTime);
                if ( _self.App_moveCar_Name !== 'null' ) {
                    _self.ip_mover.text(_self.App_moveCar_Name);
                }
                if ( _self.App_closeUser_Name !== 'null' ) {
                    _self.ip_closer.text(_self.App_closeUser_Name);
                }
            }
            if ( _self.ip_m_name.length && _self.App_moveCar_Name !== 'null' ) {//移车联系人
                _self.ip_m_name.val(_self.App_moveCar_Name);
                _self.ip_m_phone.val(_self.App_moveCar_phoneNum);
            }
            if ( _self.ip_c_name.length && _self.App_closeUser_Name !== 'null' ) {//密切联系人
                _self.ip_c_name.val(_self.App_closeUser_Name);
                _self.ip_c_phone.val(_self.App_closeUser_PhoneNum);
                _self.ip_c_sfzh.val(_self.App_closeUser_IdentityId);
            }
        },
        "bindEvent"               : function () {
            var _self = this;
            var _list = _self.list;
            _list.each(function (index) {
                var $this = $(this);
                var _mode = $this.data('rel');
                if ( _mode !== undefined ) {
                    $this.on('click', function () {
                        _self.openPage(_mode);
                    });
                    App.UI('buttonHover', {//添加按钮点击效果
                        "dom"           : $this,
                        "hoverClassName": 'ui_btn_list_01_hover'
                    });
                }
            });
        },
        "openPage"                : function (mode) {
            var _self = this;
            var _pageName = _self.urlRouter[mode];
            var _pageUrl = _self.preQuestUrl
                + '/jnpublic/config/html/' + _pageName + '&@@webViewPageId='
                + _self.PageId_lv + Wisp.CommenFunc.getRandom() + '@@';
            _pageName && window.open(_pageUrl);
        },
        "updataItemVal"           : function (mode) {

        },
        //通过身份证获取性别
        "getGender"               : function (UUserCard) {
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
})