$(function () {
    /*
     * 个人信息
     * */
    console.log('username：' + App.LS.get('App_userName'));
    Wisp.UI.Webview.getBaseDomain('Wisp.ClientCallback.setBaseDomain');//当前域写入localstorage key:App_baseDomain
    //个人信息对象
    var Personal = {
        "preQuestUrl"             : 'adapter?open&url=' + jnjjApp.config.requestUrl,
        "curWebView"              : Wisp.UI.Webview.init({PageId: App.getPageId(window.location.href)}),
        "indexPageId"             : App.getPageId(window.location.href),
        "ip_username"             : $('#username'),//用户名
        "ip_name"                 : $('#name'), //姓名
        "ip_photo"                : $('#photo'),//头像
        "ip_gender"               : $('#gender'),//性别
        "ip_phone"                : $('#phone'), //手机
        "ip_idnum"                : $('#idnum'), //身份证
        "ip_email"                : $('#email'), //邮箱
        "ip_time"                 : $('#time'),  //注册时间
        "ip_edit_phone"           : $('#edit_phone'), //修改手机输入框
        "ip_mover"                : $('#mover'),  //移车联系人
        "ip_m_name"               : $('#m_name'), //修改移车联系人姓名输入项
        "ip_m_phone"              : $('#m_phone'),//修改移车联系人电话输入项
        "ip_closer"               : $('#closer'),//密切联系人
        "ip_c_name"               : $('#c_name'), //修改密切联系人姓名输入项
        "ip_c_phone"              : $('#c_phone'),//修改密切联系人电话输入项
        "ip_c_sfzh"               : $('#c_sfzh'), //修改密切联系人身份证输入项
        "saveBtn"                 : $('#save'), //保存按钮
        "progressDialog"          : null,//状态框
        "interval"                : null,//定时器
        "isUpdate"                : true,//更新标识
        "baseDomain"              : App.LS.get('App_baseDomain'),//当前域
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
            "p_moveContacts" : "movecarpeople.html", //移车联系人页面
            "p_closeContacts": "closepeople.html", //密切联系人页面
            "p_phoneNum"     : "editphonenum.html", //手机编辑页面
            "p_repwd"        : "repwd.html" //密码修改页面
        },
        "PageId_lv"               : (new Date()).getTime(),
        "init"                    : function (opts) {
            this.list = opts.list;
            this.mode = opts.mode;
            var _self = this;
            if ( _self.mode === 'personalinfo' ) {
                _self.progressDialog = App.UI('dialog', {msg: '加载中···'});
                App.LS.set(_self.mode, _self.indexPageId);//pageid 写入localstorage
                _self.interval = setInterval(function () {//定时器监听localstorage 更新标识
                    _self.renderPersonalInfoPage('personalinfo');
                }, 1000);
            } else {
                _self.renderPersonalInfoPage(_self.mode);
            }
            _self.renderPersonalInfoPage(_self.mode);
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
                _self.App_moveCar_Name = App.LS.get("App_moveCar_Name");//更新移车联系人姓名
                _self.App_phoneNum = App.LS.get("App_phoneNum");//更新手机号
            }
            if ( _self.isUpdate ) { //更新时触发 true 时更新 否则 返回
                if ( mode === 'personalinfo' ) {//填充个人中心
                    _self.ip_username.text(_self.App_userName);//用户名
                    _self.ip_name.text(_self.App_name);//姓名
                    _self.ip_photo.attr('src', _self.App_userImage);
                    if ( _self.getGender(_self.App_identityId) ) {
                        _self.ip_gender.addClass('icon-user-men')
                    } else {
                        _self.ip_gender.addClass('icon-user-women')
                    }
                    _self.ip_idnum.text(_self.App_identityId);
                    _self.ip_email.val(_self.App_email);
                    _self.ip_time.text(_self.App_registerTime);
                    if ( _self.App_phoneNum !== 'null' ) {
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
                    setTimeout(function () {
                        _self.progressDialog.remove();
                    }, 500)
                }

            } else {
                return false;
            }
            if ( mode === 'p_moveContacts' ) {//填充移车联系人
                if ( _self.App_moveCar_Name !== 'null' ) {
                    _self.ip_m_name.val(_self.App_moveCar_Name);
                    _self.ip_m_phone.val(_self.App_moveCar_phoneNum);
                }
            }
            if ( mode === 'p_closeContacts' ) {//填充密切联系人
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
            var _url = jnjjApp.config.requestUrl + '/jnpublic/updUserInfo.json';//用户信息修改请求地址*/
            var _params = {
                "registerName": _self.App_userName,
                "baseDomain"  : _self.baseDomain,
                "phonenum"    : _self.ip_edit_phone.val() || _self.App_phoneNum,
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
                if ( msg ) {
                    console.log('更新成功！');
                    _self.progressDialog = _self.progressDialog.resetMsg('保存成功！');
                    //新数据写入localStorage
                    App.LS.set('p_hasUpdate', 'true');// 写入localstorage
                    App.LS.set("App_phoneNum", _params.phonenum);
                    App.LS.set("App_moveCar_Name", _params.movecarname);
                    App.LS.set("App_moveCar_phoneNum", _params.movecarphone);
                    _self.saveBtn.on('click', function () { //事件绑定
                        _self.updataInfo(_self.saveBtn);
                    });
                    _self.curWebView.close();
                    //Wisp.UI.Webview.init({PageId: App.LS.get('personalinfo')}).refresh();
                } else {
                    _self.progressDialog.resetMsg('保存失败！');
                    _self.saveBtn.on('click', function () { //事件绑定
                        _self.updataInfo(_self.saveBtn);
                    });
                }
                setTimeout(function () {//0.5s后移除状态提示框
                    _self.progressDialog.remove();
                }, 500);
            });
        },
        "openPage"                : function (mode) {
            var _self = this;
            var _pageName = _self.urlRouter[mode];
            var _pageUrl = jnjjApp.config.requestUrl
                + '/jnpublic/config/html/' + _pageName + '?@@webViewPageId='
                + _self.PageId_lv + Wisp.CommenFunc.getRandom() + '@@';
            _pageName && window.open(_pageUrl);
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
    Personal.init({//初始化个人资料对象
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