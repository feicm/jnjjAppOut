$(function () {
    var loginSubmit = $('#login-submit');//登录
    var rigisterBtn = $('#rigister');//注册
    var skipBtn = $('#skip'); //跳过
    var backpwdBtn = $('#backpwd'); //忘记密码
    var rigisterSubmit = $('#submit_rigister'); //注册提交
    var c1_btn = $('#c1_btn');
    var c2_btn = $('#c2_btn');
    var urlPre = 'adapter?open&url=';
    //定义登录对象
    var Loginer = {
        "loginBtn"               : loginSubmit || null, //登录按钮
        "rigisterBtn"            : rigisterBtn || null,//打开注册页按钮
        "skipBtn"                : skipBtn || null,//跳过按钮
        "backpwdBtn"             : backpwdBtn || null, //找回密码按钮
        "rigisterSubmitBtn"      : rigisterSubmit || null,//提交注册按钮
        "footbarDatas"           : jnjjApp.footbarDatas, //客户端ui数据 页脚
        "siderDatas"             : jnjjApp.siderDatas,//客户端ui数据 个人中心
        "roleId"                 : '0001',//角色标识 默认0001
        "username"               : App.LS.get('username') || null, //用户名 存入本地存储
        "password"               : null, //密码
        "loginRequestUrl"        : urlPre + jnjjApp.config.requestUrl + '/jnpublic/userLogin.json',//登录验证请求地址
        "userinfoRequestUrl"     : urlPre + jnjjApp.config.requestUrl + '/jnpublic/getUserInfo.json',//用户信息请求地址
        "rigisterPageUrl"        : urlPre + jnjjApp.config.requestUrl + '/jnpublic/config/html/rigister.jsp',//注册页地址
        "backpwdPageUrl"         : urlPre + jnjjApp.config.requestUrl + '/jnpublic/config/html/backpwd.jsp',//找回密码页地址
        "loginPageUrl"           : urlPre + jnjjApp.config.requestUrl + '/jnpublic/config/html/loginnoskip.jsp',//找回密码页地址
        "rigisterRequestUrl"     : urlPre + jnjjApp.config.requestUrl + '/jnpublic/userGegister.json',//注册提交
        "init"                   : function (opts) {
            this.btn = opts.btn;
            this.mode = opts.mode;
            this.autoFill();
            this.bindEvent();
        },
        //事件绑定函数
        "bindEvent"              : function (btn, mode) {
            var _self = this;
            var _btn = btn || _self.btn;
            var _mode = mode || _self.mode;
            _btn.on('click', function () {
                _self[_mode + 'Listener']();
            });
            if ( _mode === 'rigisterSubmit' ) { //注册流程特有双密码验证
                $('#setpwd_01').on('blur', function () {
                    var v1 = $(this).val(),
                        v2 = $('#setpwd_02').val();
                    if ( v2 !== '' && !_self.ispwdAgreement(v1, v2) ) {
                        alert('两次密码输入不一致！');
                    }
                });
                $('#setpwd_02').on('blur', function () {
                    var v1 = $(this).val(),
                        v2 = $('#setpwd_01').val();
                    if ( v2 !== '' && !_self.ispwdAgreement(v1, v2) ) {
                        alert('两次密码输入不一致！');
                    }
                });
            }
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
            var _btn = _self.loginBtn;
            var _username = $('#username').val();
            var _password = $('#password').val();
            var _params;
            _btn.off('click')
            if ( _username === '' ) {
                alert('用户名不能为空！');
                _self.bindEvent(_btn, 'login');
            } else if ( _password === '' ) {
                alert('密码不能为空！');
                _self.bindEvent(_btn, 'login');
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
                        alert('登录失败！');
                        _self.bindEvent(_btn, 'login');
                        return;
                    }
                    var msg = data.loginResponse;
                    if ( msg.loginSuccess === 'true' ) {
                        _self.loginSuccessCallback(msg);
                    } else if ( msg.loginSuccess === 'false' ) {
                        Wisp.UI.progressDialog.remove();
                        alert(msg.loginContent + '!');
                        _self.bindEvent(_btn, 'login');
                    } else {
                        Wisp.UI.progressDialog.remove();
                        alert('登录失败!');
                        _self.bindEvent(_btn, 'login');
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
            var _btn = _self.rigisterBtn;
            _btn.off('click');
            window.open(_self.rigisterPageUrl);
            _self.bindEvent(_btn, 'rigister');
        },
        /*
         * mode backpwd  找回密码事件函数
         * 流程：跳转至找回密码页面
         * */
        "backpwdListener"        : function () {
            var _self = this;
            var _btn = _self.backpwdBtn;
            _btn.off('click');
            window.open(_self.backpwdPageUrl);
            _self.bindEvent(_btn, 'backpwd');
        },
        /*
         * mode skip  跳过按钮事件函数
         * 流程：直接往客户端发送默认ui配置数据
         * */
        "skipListener"           : function () {
            var _self = this;
            var _btn = _self.skipBtn;
            console.dir(jnjjApp.footbarDatas);
            console.dir(jnjjApp.siderDatas);
            Wisp.UI.progressDialog.show('数据加载中，请稍后！');
            _btn.off('click');
            _self.sendClientUIdata(_self.footbarDatas, _self.siderDatas);//发送默认配置按钮
            Wisp.UI.progressDialog.remove();
            Wisp.UI.loginResult.success();
            _self.bindEvent(_btn, 'skip');
        },
        /*
         * mode rigisterSubmit 注册提交事件
         * 流程：校验——提交表单——注册成功后回调登录成功逻辑
         * */
        "rigisterSubmitListener" : function () {
            var _self = this;
            var _btn = _self.rigisterSubmitBtn;
            var _setusername = $('#setusername').val(),//设置用户名
                _setpwd_01 = $('#setpwd_01').val(),//设置密码
                _setpwd_02 = $('#setpwd_02').val(),//设置密码02
                _setname = $('#setname').val(),//设置姓名
                _setphone = $('#setphone').val(),//设置手机号
                _setidnum = $('#setidnum').val(), //设置身份证号
                _yclxxm = $('#yclxxm').val(), //设置移车联系人姓名
                _yclxdh = $('#yclxdh').val(), //设置移车联系人电话
                _setemail = $('#setemail').val(), //设置邮箱
                _mqlxrxm = $('#mqlxrxm').val(), //设置密切联系人姓名
                _mqlxrdh = $('#mqlxrdh').val(), //设置密切联系人电话
                _mqlxrsfzh = $('#mqlxrsfzh').val(), //设置密切联系人身份证号
                _roleId = _self.roleId,
                _opts = {},
                _params;//注册表单提交参数对象
            _opts = {
                "username": $('#setusername'),//用户名
                "pwd1"    : $('#setpwd_01'),//密码1
                "pwd2"    : $('#setpwd_02'),//密码2
                "name"    : $('#setname'),//姓名
                "phone"   : $('#setphone'),//手机
                "idnum"   : $('#setidnum')//身份证
            };
            _btn.off('click');
            if ( App.verify(_opts) ) {
                //registerName=测试用户2A
                // &userName=测试2
                // &password=1111
                // &identityId=35071111111111111
                // &phoneNum=18888888888
                // &email=xx@xx.com
                // &closeUserName=closeUserName
                // &closeIdentityId=closeIdentityId
                // &closePhoneNum=closePhoneNum
                // &roleId=0001
                _params = {
                    "registerName"   : _setusername,
                    "userName"       : _setname,
                    "password"       : _setpwd_02,
                    "identityId"     : _setidnum,
                    "phoneNum"       : _setphone,
                    "email"          : _setemail || '',
                    "moveCarName "   : _yclxxm || '',
                    "moveCarPhone"   : _yclxdh || '',
                    "closeUserName"  : _mqlxrxm || '',
                    "closeIdentityId": _mqlxrsfzh || '',
                    "closePhoneNum"  : _mqlxrdh || '',
                    "roleId"         : _roleId
                };
                Wisp.UI.progressDialog.show('注册中，请稍后！');
                //提交表单
                App.getAjaxData(_self.rigisterRequestUrl, _params, function (data) {
                    if ( data === 'error' ) {//ajax 失败回调
                        _self.bindEvent(_btn, 'rigisterSubmit');
                        return;
                    }
                    var msg = data.registerResponse;
                    console.dir(msg);
                    if ( msg.loginSuccess === 'true' ) {
                        if ( confirm('注册成功，直接登录？') ) {
                            _self.username = _params.registerName;
                            _self.loginSuccessCallback(msg);
                        } else {
                            window.open(_self.loginPageUrl);
                        }
                        _self.bindEvent(_btn, 'rigisterSubmit');
                    } else if ( msg.loginSuccess === 'false' ) {
                        Wisp.UI.progressDialog.remove();
                        alert(msg.loginContent + '!');
                        _self.bindEvent(_btn, 'rigisterSubmit');
                    } else {
                        Wisp.UI.progressDialog.remove();
                        alert('提交失败!');
                        _self.bindEvent(_btn, 'rigisterSubmit');
                    }
                })
            } else {
                _self.bindEvent(_btn, 'rigisterSubmit');
            }
        },
        //登录成功回调函数
        "loginSuccessCallback"   : function (data) {
            var _self = this;
            var _params;
            var _btn = _self.loginBtn;
            console.dir(data);
            //初始化footbarDatas
            var _MoreViewData = _self.refreshMoreViewData(_self.footbarDatas, data.authList);//刷新更多按钮
            console.dir(_MoreViewData);
            _params = {
                "registerName": _self.username
            };
            //请求用户信息
            App.getAjaxData(_self.userinfoRequestUrl, _params, function (data) {//用户信息请求回调
                var msg = data.userCenterResponse;
                if ( msg ) {
                    _self.userInfoSuccessCallback(msg);
                    _self.bindEvent(_btn, 'login');
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert('登录失败!(个人信息初始化失败)');
                    _self.bindEvent(_btn, 'login');
                }
            });
        },
        //获取个人信息成功回调函数
        "userInfoSuccessCallback": function (data) {
            var _self = this;
            console.dir(data);
            data.userName && (_self.siderDatas.sider.info.name = data.userName);
            data.userImage && (_self.siderDatas.sider.info.img = data.userImage);
            _self.siderDatas.sider.info.roleid = _self.roleId;
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
            this.footbarDatas = jnjjApp.footbarDatas;
            this.siderDatas = jnjjApp.siderDatas;
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
        },
        //验证两次密码一致性
        "ispwdAgreement"         : function (pwd1, pwd2) {
            return pwd1 === pwd2;
        },
        //用户名自动填充
        "autoFill"               : function () {
            var _self = this;
            var _usernameInput = $('#username');
            var _username = _self.username;
            _username && _usernameInput.val(_username);
        }
    };
    loginSubmit.length && Loginer.init({ //初始化登录流程
        "btn" : loginSubmit,
        "mode": 'login'
    });
    rigisterBtn.length && Loginer.init({ //初始化登陆页跳转注册流程
        "btn" : rigisterBtn,
        "mode": 'rigister'
    });
    skipBtn.length && Loginer.init({//初始化登陆页跳过流程
        "btn" : skipBtn,
        "mode": 'skip'
    });
    backpwdBtn.length && Loginer.init({//初始化登陆页找回密码流程
        "btn" : backpwdBtn,
        "mode": 'backpwd'
    });
    rigisterSubmit.length && Loginer.init({//注册流程
        "btn" : rigisterSubmit,
        "mode": 'rigisterSubmit'
    });
    /*
     * --------------------页面效果------------------------
     * */
    if ( loginSubmit.length ) { //登陆页
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
    }
    if ( rigisterSubmit.length ) {//注册流程页特有
        App.UI('changePage', {//注册页面切换效果
            "wrap": $('#rigister_form')
        });
        App.UI('inputClose', {//注册页面输入校验
            "doms": $('.list-block')
        });
        App.UI('buttonHover', {//添加按钮点击效果
            "dom"           : rigisterSubmit,
            "hoverClassName": 'ui_btn_01_hover'
        });
        App.UI('buttonHover', {//添加按钮点击效果
            "dom"           : c2_btn,
            "hoverClassName": 'ui_btn_01_hover'
        });
        App.UI('btnHighlightWithInput', {
            "btn"         : c1_btn,
            "inputs"      : $('.J_btnHighlightWithInput input'),
            "hoverClass"  : 'ui_btn_01_hover',
            "disableClass": 'ui_btn_01_disable'
        }, function (btn) {
            App.UI('changePage', {//注册页面切换效果
                "wrap": $('#rigister_form')
            });
        });
    }
});