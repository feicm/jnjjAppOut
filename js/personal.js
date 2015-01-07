$(function () {
    /*
     * 个人信息
     * */
    /*var edituserinfoRequestUrl = urlPre
     + jnjjApp.config.requestUrl
     + '/jnpublic/updUserInfo.json';//用户信息修改请求地址*/
    console.log('username：' + App.LS.get('username'));
    var PageId = App.getPageId(window.location.href);
    var module = $('.c').data('mode');//模块名获取
    App.LS.set(module, PageId);//pageid 写入localstorage
    //个人信息对象
    var Personal = {
        "preQuestUrl"           : 'adapter?open&url=' + jnjjApp.config.requestUrl,
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
        "urlRouter"             : {
            "p_moveContacts" : "movecarpeople.jsp", //移车联系人页面
            "p_closeContacts": "closepeople.jsp" //密切联系人页面
        },
        "PageId_lv"             : (new Date()).getTime(),
        "init"                  : function (opts) {
            this.list = opts.list;
            this.oInit();
            this.bindEvent();
            return this;
        },
        "oInit"                 : function () {//请求用户信息
            var _self = this;
            var _url = _self.preQuestUrl + '/jnpublic/getUserInfo.json';
            App.getAjaxData(_url, {
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
            //data.userImage && _self.ip_photo.attr('src', data.userImage);
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
        "bindEvent"             : function () {
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
        "openPage"              : function (mode) {
            var _self = this;
            var _pageName = _self.urlRouter[mode];
            var _pageUrl = _self.preQuestUrl
                + '/jnpublic/config/html/' + _pageName + '&@@webViewPageId='
                + _self.PageId_lv + Wisp.CommenFunc.getRandom() + '@@';
            _pageName && window.open(_pageUrl);
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
})