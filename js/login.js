$(function () {
    //定义登录对象
    var loginPage = {
        "roleId"                 : '0001',//角色标识 默认0001
        "username"               : null,
        "password"               : null,
        "footbarDatas"           : jnjjApp.footbarDatas,
        "siderDatas"             : jnjjApp.siderDatas,
        "urlPre"                 : 'adapter?open&url=',
        "loginRequestUrl"        : this.urlPre + jnjjApp.config.requestUrl + '/jnpublic/userLogin.json',//登录验证请求地址
        "userinfoRequestUrl"     : this.urlPre + jnjjApp.config.requestUrl + '/jnpublic/getUserInfo.json',//用户信息请求地址
        "rigisterPageUrl"        : this.urlPre + jnjjApp.config.requestUrl + '/jnpublic/config/html/rigister.jsp',//注册页地址
        "backpwdPageUrl"         : this.urlPre + jnjjApp.config.requestUrl + '/jnpublic/config/html/backpwd.jsp',//找回密码页地址
        "init"                   : function (opts) {
            this.btn = opts.btn;
            this.mode = opts.mode;
            this.bindEvent();
        },
        //事件绑定函数
        "bindEvent"              : function () {
            var _self = this;
            var _btn = _self.btn;
            _btn.on('click', _self[_self.mode + 'Listener']);
        },
        //事件移除函数
        "removeEvent"            : function () {
            var _self = this;
            _self.off('click');
        },
        /*
         * mode login 登录按钮事件函数
         * 流程：设置化客户端ui数据——发起登录验证请求(点击登录)(loginSubmitListener)
         *      ——登录请求回调(loginSuccessCallback)
         *      ——初始化权限按钮（更多）(refreshMoreViewData——>formatData)
         *      ——发起个人信息请求(-)
         *      ——个人信息请求回调(userInfoSuccessCallback)
         *      ——初始化个人中心按钮(-)
         *      ——发送初始化后的客户端ui数据(sendClientUIdata)
         *      ——登录结束
         * */
        "loginListener"          : function () {
            var _self = this;
            var _username = $('#username').val();
            var _password = $('#password').val();
            var _params;
            _self.removeEvent();
            if ( _username === '' ) {
                alert('用户名不能为空！');
                _self.bindEvent();
            } else if ( _password === '' ) {
                alert('密码不能为空！');
                _self.bindEvent();
            } else {
                Wisp.UI.progressDialog.show('登录中，请稍后！');
                _params = {
                    "userName": _username,
                    "password": _password,
                    "roleId"  : _self.roleId
                };
                this.username = _username;
                //发起登录请求
                App.getAjaxData(_self.loginRequestUrl, _params, function (data) {//登录请求回调
                    if ( data === 'error' ) {//ajax 失败回调
                        _self.bindEvent();
                        return;
                    }
                    var msg = data.loginResponse;
                    if ( msg.loginSuccess === 'true' ) {
                        _self.loginSuccessCallback(msg);
                    } else if ( msg.loginSuccess === 'false' ) {
                        Wisp.UI.progressDialog.remove();
                        alert(msg.loginContent + '!');
                        _self.bindEvent();
                    } else {
                        Wisp.UI.progressDialog.remove();
                        alert('登录失败!');
                        _self.bindEvent();
                    }
                });
            }
        },
        /*
         * mode rigister 注册事件函数
         * 流程：跳转至注册页面
         * */
        "rigisterListener"       : function () {
            var _self = this;
            _self.removeEvent();
            window.open(_self.rigisterPageUrl);
            _self.bindEvent();
        },
        /*
         * mode backpwd  找回密码事件函数
         * 流程：跳转至找回密码页面
         * */
        "backpwdListener"        : function () {
            var _self = this;
            _self.removeEvent();
            window.open(_self.backpwdPageUrl);
            _self.bindEvent();
        },
        /*
         * mode skip  跳过按钮事件函数
         * 流程：直接往客户端发送默认ui配置数据
         * */
        "skipListener"           : function () {
            var _self = this;
            console.dir(jnjjApp.footbarDatas);
            console.dir(jnjjApp.siderDatas);
            Wisp.UI.progressDialog.show('数据加载中，请稍后！');
            _self.removeEvent();
            _self.sendClientUIdata(_self.footbarDatas, _self.siderDatas);//发送默认配置按钮
            Wisp.UI.progressDialog.remove();
            Wisp.UI.loginResult.success();
            _self.bindEvent();
        },
        //登录成功回调函数
        "loginSuccessCallback"   : function (data) {
            var _self = this;
            var _params;
            console.dir(data);
            //初始化footbarDatas
            var _MoreViewData = _self.refreshMoreViewData(_self.footbarDatas, data.authList);//刷新更多按钮
            console.dir(_MoreViewData);
            _params = {
                "registerName": _self.username
            }
            //请求用户信息
            App.getAjaxData(_self.userinfoRequestUrl, _params, function (data) {//用户信息请求回调
                var msg = data.userCenterResponse;
                if ( msg ) {
                    _self.userInfoSuccessCallback(msg);
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert('登录失败!(个人信息初始化失败)');
                    _self.bindEvent();
                }
            });
        },
        //获取个人信息成功回调函数
        "userInfoSuccessCallback": function (data) {
            var _self = this;
            console.dir(data);
            data.userName && (_self.siderDatas.sider.info.name = data.userName);
            data.userImage && (_self.siderDatas.sider.info.img = data.userImage);
            _self.siderDatas.sider.info.url = '';
            var l = _self.siderDatas.sider.list.length;
            for ( var i = 0; i < l; i++ ) {
                _self.siderDatas.sider.list[i].enable = 'true';
            }
            _self.sendClientUIdata(_self.footbarDatas, _self.siderDatas);//发送客户端ui数据
            Wisp.UI.progressDialog.remove();//移除加载框，登录流程结束
            Wisp.UI.loginResult.success();
            //App.Cookie.SetCookie('username', username); //原cookie储存无法实现退出应用保存
            App.LS.set('username', _self.username);
            console.log('login END!!!!');
        },
        //发送客户端ui数据函数
        "sendClientUIdata"       : function (footbarDatas, siderDatas) {
            Wisp.UI.Init({
                'type' : 'footbar',
                'datas': footbarDatas
            });
            Wisp.UI.Init({
                'type' : 'sider',
                'datas': siderDatas
            });
        },
        /*
         * 刷新更多视图数据函数
         * defaultdata 服务器返回数据
         * resdata 默认数据源
         * return 新数据
         * */
        "refreshMoreViewData"    : function (defaultdata, resdata) {
            var _self = this;
            console.dir(defaultdata);
            console.dir(resdata);
            var l = defaultdata.footbar.length - 1;
            console.dir(l);
            var more_btns = defaultdata.footbar[l].shortcutBtns;
            var cur_btn;
            for ( var i = resdata.length - 1; i >= 0; i-- ) {
                cur_btn = resdata[i].authcontent;
                _self.formatData(cur_btn, more_btns);
            }
            return defaultdata;
        },
        //格式化数据函数 reset btn's enable from false to true
        "formatData"             : function (curdata, arr) {
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
    };
    var loginSubmit = $('#login-submit');//登录
    var rigisterBtn = $('#rigister');//注册
    var skipBtn = $('#skip'); //跳过
    var backpwdBtn = $('#backpwd'); //忘记密码
    loginPage.init({ //初始化登录流程
        "btn" : loginSubmit,
        "mode": 'login'
    });
    loginPage.init({ //初始化登陆页注册流程
        "btn" : rigisterBtn,
        "mode": 'rigister'
    });
    skipBtn.length && loginPage.init({//初始化登陆页跳过流程
        "btn" : skipBtn,
        "mode": 'skip'
    });
    backpwdBtn.length && loginPage.init({//初始化登陆页找回密码流程
        "btn" : backpwdBtn,
        "mode": 'backpwd'
    });

    /*
     * --------------------页面效果------------------------
     * */
    App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : loginSubmit,
        "hoverClassName": 'ui_btn_01_hover'
    });
    App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : rigisterBtn,
        "hoverClassName": 'ui_btn_hover'
    });
    skipBtn.length && App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : skipBtn,
        "hoverClassName": 'ui_btn_02_hover'
    });
    backpwdBtn.length && App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : backpwdBtn,
        "hoverClassName": 'ui_btn_02_hover'
    });
});