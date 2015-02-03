$(function () {
    if ( !App.addOnlineStatusListener() ) { //添加网络状态检测
        return false
    }
    Wisp.UI.Webview.getBaseDomain('Wisp.ClientCallback.setBaseDomain');//当前域写入localstorage key:App_baseDomain
    var loginSubmit = $('#login-submit');//登录
    var rigisterBtn = $('#rigister');//注册
    var skipBtn = $('#skip'); //跳过
    var backpwdBtn = $('#backpwd'); //忘记密码
    var rigisterSubmit = $('#submit_rigister'); //注册提交
    var urlPre = 'adapter?open&url=';
    //定义登录对象
    var Loginer = {
        "curWebView"             : Wisp.UI.Webview.init({PageId: App.getPageId(window.location.href)}),
        "PageId_lv"              : (new Date()).getTime(),
        "loginBtn"               : loginSubmit || null, //登录按钮
        "rigisterBtn"            : rigisterBtn || null,//打开注册页按钮
        "skipBtn"                : skipBtn || null,//跳过按钮
        "backpwdBtn"             : backpwdBtn || null, //找回密码按钮
        "rigisterSubmitBtn"      : rigisterSubmit || null,//提交注册按钮
        "footbarDatas"           : jnjjApp.footbarDatas, //客户端ui数据 页脚
        "siderDatas"             : jnjjApp.siderDatas,//客户端ui数据 个人中心
        "roleId"                 : '0001',//角色标识 默认0001
        "username"               : App.LS.get('App_userName') || '', //用户名
        "password"               : null, //密码
        "baseDomain"             : App.LS.get("App_baseDomain"), //当前域
        "isColInfoGetSuccess"    : false, //标识栏目信息获取是否成功
        "isgalleryGetSuccess"    : false, //首页大轮播数据获取是否成功
        "progressDialog"         : null,
        "PageId_lv01"            : (new Date()).getTime(),
        "loginRequestUrl"        : jnjjApp.config.requestUrl + '/jnpublic/userLogin.json',//登录验证请求地址
        "userinfoRequestUrl"     : jnjjApp.config.requestUrl + '/jnpublic/getUserInfo.json',//用户信息请求地址
        "colInfoRequestUrl"      : jnjjApp.config.msgRequestUrl + '/wispcms/channel/tree.do',//信息栏目数据获取地址
        "galleryRequestUrl"      : jnjjApp.config.msgRequestUrl + '/wispcms/content/shuffling_jj.do',//首页大轮播数据获取地址
        "rigisterPageUrl"        : jnjjApp.config.requestUrl + '/jnpublic/config/html/rigister.jsp',//注册页地址
        "backpwdPageUrl"         : jnjjApp.config.requestUrl + '/jnpublic/config/html/backpwd.jsp',//找回密码页地址
        "loginPageUrl"           : 'config/html/login.html',//登录页地址
        "rigisterRequestUrl"     : jnjjApp.config.requestUrl + '/jnpublic/userGegister.json',//注册提交
        "init"                   : function (opts) {
            this.btn = opts.btn;
            this.mode = opts.mode;
            this.autoFill();
            this.bindEvent();
            if ( this.mode === 'login' ) {
                this.initColInfo();
                this.initGalleryInfo();
            }
            return this;
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
                        App.UI('dialog', {
                            type : 'alert',
                            title: '公众服务平台',
                            msg  : '两次密码输入不一致！'
                        });
                    }
                });
                $('#setpwd_02').on('blur', function () {
                    var v1 = $(this).val(),
                        v2 = $('#setpwd_01').val();
                    if ( v2 !== '' && !_self.ispwdAgreement(v1, v2) ) {
                        App.UI('dialog', {
                            type : 'alert',
                            title: '公众服务平台',
                            msg  : '两次密码输入不一致！'
                        });
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
            _btn.off('click');
            if ( _username === '' ) {
                App.UI('dialog', {
                    type : 'alert',
                    title: '公众服务平台',
                    msg  : '用户名不能为空！'
                });
                _self.bindEvent(_btn, 'login');
            } else if ( _password === '' ) {
                App.UI('dialog', {
                    type : 'alert',
                    title: '公众服务平台',
                    msg  : '密码不能为空！'
                });
                _self.bindEvent(_btn, 'login');
            } else {
                //Wisp.UI.progressDialog.show('登录中，请稍后！');
                _self.progressDialog = App.UI('dialog', {msg: '登录中，请稍后！'});
                _params = {
                    "userName": _username,
                    "password": _password,
                    "roleId"  : _self.roleId,
                    "baseDomain"  : _self.baseDomain || App.LS.get("App_baseDomain")
                };
                this.username = _username;
                //发起登录请求
                App.getAjaxData(_self.loginRequestUrl, _params, function (data) {//登录请求回调
                    if ( data === 'error' ) {//ajax 失败回调
                        _self.progressDialog.remove();
                        App.UI('dialog', {
                            type : 'alert',
                            title: '公众服务平台',
                            msg  : '登录失败！'
                        });
                        _self.bindEvent(_btn, 'login');
                        return;
                    }
                    var msg = data.loginResponse;
                    if ( msg.loginSuccess === 'true' ) {
                        _self.loginSuccessCallback(msg);
                    } else if ( msg.loginSuccess === 'false' ) {
                        //Wisp.UI.progressDialog.remove();
                        _self.progressDialog.remove();
                        App.UI('dialog', {
                            type : 'alert',
                            title: '公众服务平台',
                            msg  : msg.loginContent + '!'
                        });
                        _self.bindEvent(_btn, 'login');
                    } else {
                        // Wisp.UI.progressDialog.remove();
                        _self.progressDialog.remove();
                        App.UI('dialog', {
                            type : 'alert',
                            title: '公众服务平台',
                            msg  : '登录失败！'
                        });
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
            var _url = _self.rigisterPageUrl + '&@@webViewPageId=' + _self.PageId_lv + Wisp.CommenFunc.getRandom() + '@@';
            _btn.off('click');
            window.open(_url);
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
            //Wisp.UI.progressDialog.show('数据加载中，请稍后！');
            _self.progressDialog = App.UI('dialog', {msg: '数据加载中，请稍后！'});
            _btn.off('click');
            if ( _self.isColInfoGetSuccess ) { //加载登陆页时已请求到，则直接发送，否则再次请求
                _self.sendClientUIdata(_self.footbarDatas, _self.siderDatas);//发送客户端ui数据
            } else {
                _self.initColInfo(function () {
                    _self.sendClientUIdata(_self.footbarDatas, _self.siderDatas);//发送客户端ui数据
                });
            }
            _self.bindEvent(_btn, 'skip');
            _self.resetInfo();
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
                _roleId = _self.roleId,
                _opts,
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
                    "registerName": _setusername,
                    "userName"    : _setname,
                    "password"    : _setpwd_02,
                    "identityId"  : _setidnum,
                    "phoneNum"    : _setphone,
                    "roleId"      : _roleId,
                    "baseDomain"  : _self.baseDomain || App.LS.get("App_baseDomain")
                };
                _self.progressDialog = App.UI('dialog', {msg: '注册中，请稍后！'});
                //提交表单
                App.getAjaxData(_self.rigisterRequestUrl, _params, function (data) {
                    if ( data === 'error' ) {//ajax 失败回调
                        _self.progressDialog.remove();
                        _self.bindEvent(_btn, 'rigisterSubmit');
                        return;
                    }
                    var msg = data.registerResponse;
                    console.dir(msg);
                    if ( msg.loginSuccess === 'true' ) {
                        //Wisp.UI.progressDialog.remove();
                        _self.progressDialog.remove();
                        App.UI('dialog', {
                            type : 'confirm',
                            title: '公众服务平台',
                            msg  : '注册成功，直接进入应用？'
                        }, function (action) {
                            if ( action === 'OK' ) {
                                _self.progressDialog = App.UI('dialog', {msg: '正在登录，请稍后！'});
                                _self.username = _params.registerName;
                                _self.loginSuccessCallback(msg);
                            }
                            if ( action === 'CANCEL' ) {
                                _self.curWebView.close();
                            }
                        });
                        _self.bindEvent(_btn, 'rigisterSubmit');
                    } else if ( msg.loginSuccess === 'false' ) {
                        //Wisp.UI.progressDialog.remove();
                        _self.progressDialog.remove();
                        App.UI('dialog', {
                            type : 'alert',
                            title: '公众服务平台',
                            msg  : msg.loginContent + '!'
                        });
                        _self.bindEvent(_btn, 'rigisterSubmit');
                    } else {
                        //Wisp.UI.progressDialog.remove();
                        _self.progressDialog.remove();
                        App.UI('dialog', {
                            type : 'alert',
                            title: '公众服务平台',
                            msg  : '登录失败！'
                        });
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
            _self.refreshHomebtnsGallery(_self.footbarDatas, data.authList);//刷新首页菜单按钮
            _self.refreshMoreViewData(_self.footbarDatas, data.authList);//刷新更多按钮
            _params = {
                "registerName": _self.username,
                "baseDomain"  : _self.baseDomain || App.LS.get("App_baseDomain")
            };
            //请求用户信息
            App.getAjaxData(_self.userinfoRequestUrl, _params, function (data) {//用户信息请求回调
                if ( data === 'error' ) {//ajax 失败回调
                    _self.progressDialog.remove();
                    App.UI('dialog', {
                        type : 'alert',
                        title: '公众服务平台',
                        msg  : '登录失败！'
                    });
                    _self.bindEvent(_btn, 'login');
                    return;
                }
                var msg = data.userCenterResponse;
                if ( msg ) {
                    _self.saveInfo(msg);//保存个人信息
                    _self.userInfoSuccessCallback(msg);
                    _self.bindEvent(_btn, 'login');
                } else {
                    //Wisp.UI.progressDialog.remove();
                    _self.progressDialog.remove();
                    App.UI('dialog', {
                        type : 'alert',
                        title: '公众服务平台',
                        msg  : '登录失败!(个人信息初始化失败)'
                    });
                    _self.bindEvent(_btn, 'login');
                }
            });
        },
        //获取个人信息成功回调函数
        "userInfoSuccessCallback": function (data) {
            var _self = this;
            _self.updataPersonalInfo(data);//更新个人中心按钮属性
            if ( _self.isColInfoGetSuccess && _self.isgalleryGetSuccess ) { //加载登陆页时已请求到，则直接发送，否则再次请求
                _self.sendClientUIdata(_self.footbarDatas, _self.siderDatas);//发送客户端ui数据
            } else if ( !_self.isColInfoGetSuccess && !_self.isgalleryGetSuccess ) {
                _self.initColInfo(function () {
                    _self.initGalleryInfo(function () {
                        _self.sendClientUIdata(_self.footbarDatas, _self.siderDatas);//发送客户端ui数据
                    });
                });
            } else if ( !_self.isColInfoGetSuccess ) {
                _self.initColInfo(function () {
                    _self.sendClientUIdata(_self.footbarDatas, _self.siderDatas);//发送客户端ui数据
                });
            } else if ( !_self.isgalleryGetSuccess ) {
                _self.initGalleryInfo(function () {
                    _self.sendClientUIdata(_self.footbarDatas, _self.siderDatas);//发送客户端ui数据
                });
            }
            console.log('login success END!!!!');
        },
        //更新个人中心属性
        "updataPersonalInfo"     : function (data) {
            var _self = this;
            data.userName && (_self.siderDatas.sider.info.name = data.userName);
            data.userImage && (_self.siderDatas.sider.info.img = data.userImage);
            _self.siderDatas.sider.info.roleid = _self.roleId;
            _self.siderDatas.sider.info.url = '';
            _self.footbarDatas.footbar[4].siderView[0].data[0] = _self.siderDatas.sider.info;//个人中心顶部
            var _data = _self.footbarDatas.footbar[4].siderView[1].data;//个人中心列表
            var l = _data.length;
            for ( var i = 0; i < l; i++ ) {//更新个人中心按钮属性
                _data[i].enable === 'false' ? _data[i].enable = 'true' : true;
            }
        },
        //保存用户信息
        "saveInfo"               : function (data) {
            App.LS.set("App_userName", data.registerName);//用户名
            App.LS.set("App_name", data.userName);//姓名
            App.LS.set("App_identityId", data.identityId);//姓名
            App.LS.set("App_userImage", data.userImage); //头像地址
            App.LS.set("App_phoneNum", data.phoneNum);//手机号
            App.LS.set("App_email", data.email); //邮箱
            App.LS.set("App_registerTime", data.registerTime);//注册时间
            App.LS.set("App_moveCar_Name", data.moveCarName);//移车联系人姓名
            App.LS.set("App_moveCar_phoneNum", data.moveCarPhone);//移车联系人电话
            App.LS.set("App_closeUser_Name", data.closeUserName); //密切联系人姓名
            App.LS.set("App_closeUser_PhoneNum", data.closePhoneNum);//密切联系人电话
            App.LS.set("App_closeUser_IdentityId", data.closeIdentityId);//密切联系人身份证号
        },
        //重置用户信息
        "resetInfo"              : function () {
            App.LS.remove("App_userName");//用户名
            App.LS.remove("App_name");//姓名
            App.LS.remove("App_identityId");//姓名
            App.LS.remove("App_userImage"); //头像地址
            App.LS.remove("App_phoneNum");//手机号
            App.LS.remove("App_email"); //邮箱
            App.LS.remove("App_registerTime");//注册时间
            App.LS.remove("App_moveCar_Name");//移车联系人姓名
            App.LS.remove("App_moveCar_phoneNum");//移车联系人电话
            App.LS.remove("App_closeUser_Name"); //密切联系人姓名
            App.LS.remove("App_closeUser_PhoneNum");//密切联系人电话
            App.LS.remove("App_closeUser_IdentityId");//密切联系人身份证号
        },
        //发送客户端ui数据函数
        "sendClientUIdata"       : function (footbarDatas, siderDatas) {
            var _self = this;
            Wisp.UI.Init({
                'type' : 'sider',
                'datas': siderDatas
            });
            Wisp.UI.Init({
                'type' : 'footbar',
                'datas': footbarDatas
            });
            this.footbarDatas = jnjjApp.footbarDatas;
            this.siderDatas = jnjjApp.siderDatas;
            //_self.setBaseDomain();
            _self.progressDialog.remove();
            Wisp.UI.loginResult.success();
        },
        // 刷新首页轮播菜单项
        "refreshHomebtnsGallery" : function (defaultdata, resdata) {
            var _self = this;
            var home_btnsGallery = defaultdata.footbar[0].view[1].data;
            var cur_btn;
            var name;
            for ( var i = resdata.length - 1; i >= 0; i-- ) {
                cur_btn = resdata[i].authcontent;
                for ( var j = home_btnsGallery.length - 1; j >= 0; j-- ) {
                    name = home_btnsGallery[j].name;
                    if ( cur_btn === name ) {
                        home_btnsGallery[j].enable = 'true';
                        break;
                    }
                }
            }
            return defaultdata;
        },
        /*
         * 刷新更多视图数据函数
         * defaultdata 默认数据源
         * resdata 服务器返回数据
         * return 新数据
         * */
        "refreshMoreViewData"    : function (defaultdata, resdata) {
            var _self = this;
            console.dir(defaultdata);
            console.dir(resdata);
            var more_btns = defaultdata.footbar[2].shortcutBtns;
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
                        break;
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
        },
        //初始化首页大轮播数据
        "initGalleryInfo"        : function (callback) {
            var _self = this;
            var _btn = _self.loginBtn;
            var _url = _self.galleryRequestUrl;
            var _params = {
                baseDomain: _self.baseDomain || App.LS.get("App_baseDomain")
            };
            App.getAjaxData(_url, _params, function (data) {//信息请求回调
                if ( (data === 'error' || !data.success) && callback ) {//ajax 失败回调
                    _self.progressDialog.remove();
                    App.UI('dialog', {
                        type : 'alert',
                        title: '公众服务平台',
                        msg  : '登录失败！'
                    });
                    _self.bindEvent(_btn, 'login');
                    return;
                }
                if ( data.success ) {
                    _self.isgalleryGetSuccess = true;
                    _self.footbarDatas.footbar[0].view[0].data = data.gallery;
                    callback && callback();
                }
            });
        },
        //初始化信息栏目数据
        "initColInfo"            : function (callback) {
            var _self = this;
            var _btn = _self.loginBtn;
            var _url = _self.colInfoRequestUrl;
            var _params = {
                baseDomain: _self.baseDomain || App.LS.get("App_baseDomain")
            };
            App.getAjaxData(_url, _params, function (data) {//信息请求回调
                if ( (data === 'error' || !data.success) && callback ) {//ajax 失败回调
                    _self.progressDialog.remove();
                    App.UI('dialog', {
                        type : 'alert',
                        title: '公众服务平台',
                        msg  : '登录失败！'
                    });
                    _self.bindEvent(_btn, 'login');
                    return;
                }
                if ( data.success ) {
                    _self.isColInfoGetSuccess = true;
                    var datas = _self.formatColInfoData(data.msg);//格式化栏目数据源
                    _self.footbarDatas.footbar[1].subBtns = datas;
                    callback && callback();
                }
            });
        },
        //格式化栏目数据源函数
        "formatColInfoData"      : function (data) {
            var colDate = [],//栏目数据，即二级菜单数据
                colItem;//栏目数据项
            for ( var i in data ) {
                colItem = {
                    "name"      : data[i].name,
                    "requestUrl": data[i].url + "Android"
                };
                colDate.push(colItem);
            }
            return colDate;
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
    var Rigister;
    rigisterSubmit.length && (Rigister = Loginer.init({//注册流程
        "btn" : rigisterSubmit,
        "mode": 'rigisterSubmit'
    }));
    /*
     * --------------------页面效果------------------------
     * */
    if ( loginSubmit.length ) { //登陆页
        App.UI('buttonHover', {//添加按钮点击效果
            "dom"           : loginSubmit,
            "hoverClassName": 'ui_btn_02_hover'
        });
        if ( rigisterBtn.hasClass('ui_btn_02') ) {
            App.UI('buttonHover', {//添加按钮点击效果
                "dom"           : rigisterBtn,
                "hoverClassName": 'ui_btn_02_hover'
            });
        }
        skipBtn.length && App.UI('buttonHover', {//添加按钮点击效果
            "dom"           : skipBtn,
            "hoverClassName": 'ui_btn_02_hover'
        });
    }
    if ( rigisterSubmit.length ) {//注册流程页特有
        App.UI('inputClose', {//注册页面输入校验
            "doms": $('.list-block')
        });
        App.UI('btnHighlightWithInput', {
            "btn"         : rigisterSubmit,
            "inputs"      : $('.J_btnHighlightWithInput input'),
            "hoverClass"  : 'ui_btn_01_hover',
            "disableClass": 'ui_btn_01_disable'
        }, function (btn) {
            Rigister.bindEvent(btn, 'rigisterSubmit');
        });
    }
});