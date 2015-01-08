$(function () {
    /*
     * 个人信息
     * */
    /*var edituserinfoRequestUrl = urlPre
     + jnjjApp.config.requestUrl
     + '/jnpublic/updUserInfo.json';//用户信息修改请求地址*/
    console.log('username：' + App.LS.get('App_userName'));
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
        "ip_edit_phone"           : $('#edit_phone'),
        "ip_mover"                : $('#mover'),
        "ip_m_name"               : $('#m_name'),
        "ip_m_phone"              : $('#m_phone'),
        "ip_closer"               : $('#closer'),
        "ip_c_name"               : $('#c_name'),
        "ip_c_phone"              : $('#c_phone'),
        "ip_c_sfzh"               : $('#c_sfzh'),
        "saveBtn"                 : $('#save'),
        "progressDialog"          : null,//状态框
        "interval"                : null,//定时器
        "isUpdate"                : true,//更新标识
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
            "p_closeContacts": "closepeople.jsp", //密切联系人页面
            "p_phoneNum"     : "editphonenum.jsp" //手机编辑页面
        },
        "PageId_lv"               : (new Date()).getTime(),
        "init"                    : function (opts) {
            this.list = opts.list;
            this.mode = opts.mode;
            var _self = this;
            if ( _self.mode === 'personalinfo' ) {
                _self.interval = setInterval(function () {//定时器监听localstorage 更新标识
                    _self.renderPersonalInfoPage('personalinfo');
                }, 1000);
            } else {
                _self.renderPersonalInfoPage(_self.mode);
            }
            this.bindEvent(this.mode);
            return this;
        },
        //渲染个人信息页
        "renderPersonalInfoPage"  : function (mode) {
            var _self = this;
            var i = 0;
            console.log(i++);
            if ( App.LS.get('p_hasUpdate') === 'true' ) {//监听localstorage中的 更新标识
                _self.isUpdate = true;
                _self.App_moveCar_Name = App.LS.get("App_moveCar_Name");
            }
            if ( _self.isUpdate ) { //更新时触发 true 时更新 否则 返回
                if ( mode === 'personalinfo' ) {//个人中心
                    _self.ip_username.text(_self.App_userName);//用户名
                    _self.ip_name.text(_self.App_name);//姓名
                    //_self.ip_photo.attr('src', _self.App_userImage);
                    if ( _self.getGender(_self.App_identityId) ) {
                        _self.ip_gender.addClass('icon-user-men')
                    } else {
                        _self.ip_gender.addClass('icon-user-women')
                    }
                    _self.ip_idnum.text(_self.App_identityId);
                    _self.ip_email.val(_self.App_email);
                    _self.ip_time.text(_self.App_registerTime);
                    if(_self.App_phoneNum!=='null'){
                        _self.ip_phone.text(_self.App_phoneNum);
                        if ( App.LS.get('p_hasUpdate') === 'true' ) {
                            App.LS.set('p_hasUpdate', 'false');//重置 p_hasUpdate
                        }
                        _self.isUpdate = false;//设置更新触发标识为 false
                    }
                    if ( _self.App_moveCar_Name !== 'null' ) {
                        _self.ip_mover.text(_self.App_moveCar_Name);
                        if ( App.LS.get('p_hasUpdate') === 'true' ) {
                            App.LS.set('p_hasUpdate', 'false');//重置 p_hasUpdate
                        }
                        _self.isUpdate = false;//设置更新触发标识为 false
                    }
                    if ( _self.App_closeUser_Name !== 'null' ) {
                        _self.ip_closer.text(_self.App_closeUser_Name);
                    }
                }
            } else {
                return false;
            }
            if ( mode === 'p_moveContacts' ) {//移车联系人
                if ( _self.App_moveCar_Name !== 'null' ) {
                    _self.ip_m_name.val(_self.App_moveCar_Name);
                    _self.ip_m_phone.val(_self.App_moveCar_phoneNum);
                }
            }
            if ( mode === 'p_closeContacts' ) {//密切联系人
                if ( _self.App_closeUser_Name !== 'null' ) {
                    _self.ip_c_name.val(_self.App_closeUser_Name);
                    _self.ip_c_phone.val(_self.App_closeUser_PhoneNum);
                    _self.ip_c_sfzh.val(_self.App_closeUser_IdentityId);
                }
            }
            if ( mode === 'p_phoneNum' ) {//密切联系人
                if ( _self.App_phoneNum !== 'null' ) {
                    _self.ip_edit_phone.val(_self.App_phoneNum);
                }
            }
        },
        "bindEvent"               : function (mode) {
            var _self = this;
            var _list = _self.list;
            if ( mode === 'personalinfo' ) {
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
            } else {
                App.UI('btnHighlightWithInput', {
                    "btn"         : _self.saveBtn,
                    "inputs"      : $('.J_btnHighlightWithInput input'),
                    "hoverClass"  : 'ui_btn_01_hover',
                    "disableClass": 'ui_btn_01_disable'
                }, function (btn) {//按钮可用后回调
                    btn.on('click', function () {
                        _self.updataInfo(btn);
                    });
                });
            }
        },
        "updataInfo"              : function (btn) {
            var _self = this;
            var _url = PreQuestUrl + '/jnpublic/updUserInfo.json';//用户信息修改请求地址*/
            var _params = {
                "registerName": _self.App_userName,
                "phonenum"    : _self.ip_phone.val() || _self.App_phoneNum,
                "movecarname" : _self.ip_m_name.val() || _self.App_moveCar_Name,
                "movecarphone": _self.ip_m_phone.val() || _self.App_moveCar_phoneNum
            };
            btn.off('click');//事件移除
            _self.progressDialog = App.UI('dialog', {msg: '保存中，请稍后！'});
            App.getAjaxData(_url, _params, function (data) {
                if ( data === 'error' ) {//ajax 失败回调
                    _self.saveBtn.on('click', function () {//事件绑定
                        _self.updataInfo(_self.saveBtn);
                    });
                    return;
                }
                var msg = data.userUpdateResponse;
                //_self.progressDialog.remove();
                if ( msg ) {
                    console.log('更新成功！');
                    /*App.UI('dialog', {
                     type : 'alert',
                     title: '公众服务平台',
                     msg  : '保存成功！'
                     });*/
                    _self.progressDialog = _self.progressDialog.resetMsg('保存成功！');
                    //新数据写入localStorage
                    App.LS.set('p_hasUpdate', 'true');// 写入localstorage
                    App.LS.set("App_phoneNum", _params.phonenum);
                    App.LS.set("App_moveCar_Name", _params.movecarname);
                    App.LS.set("App_moveCar_phoneNum", _params.movecarphone);
                    _self.saveBtn.on('click', function () { //事件绑定
                        _self.updataInfo(_self.saveBtn);
                    });
                } else {
                    /*App.UI('dialog', {
                     type : 'alert',
                     title: '公众服务平台',
                     msg  : '保存失败！'
                     });*/
                    _self.progressDialog.resetMsg('保存失败！');
                    _self.saveBtn.on('click', function () { //事件绑定
                        _self.updataInfo(_self.saveBtn);
                    });
                }
                setTimeout(function () {
                    _self.progressDialog.remove();
                }, 500);
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
    var PageId = App.getPageId(window.location.href);
    var module = $('.c').data('mode');//模块名获取
    App.LS.set(module, PageId);//pageid 写入localstorage
    App.LS.set('p_hasUpdate', 'false');// 写入localstorage
    var oPersonal = Personal.init({
        "list": $('.list-block li'),
        "mode": module
    });

    /*
     * --------------------页面效果------------------------
     * */
    App.UI('inputClose', {//个人资料页面切换效果
        "doms": $('.list-block')
    });

})