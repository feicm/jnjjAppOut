$(function () {
    /*
     * lgoin
     * 流程：设置化客户端ui数据——发起登录验证请求(点击登录)(loginSubmitListener)
     *      ——登录请求回调(loginSuccessCallback)
     *      ——初始化权限按钮（更多）(refreshMoreViewData——>formatData)
     *      ——发起个人信息请求(-)
     *      ——个人信息请求回调(userInfoSuccessCallback)
     *      ——初始化个人中心按钮(-)
     *      ——发送初始化后的客户端ui数据(sendClientUIdata)
     *      ——登录结束
     * */
    var footbarDatas = {
        "footbar": [
            {
                "beforeImg" : "config/html/images/wispui/xinxi_normal.png",
                "afterImg"  : "config/html/images/wispui/xinxi_hover.png",
                "name"      : "信息",
                "clickEvent": "",
                "subBtns"   : [   //客户端直接和服务端通信
                    {
                        "name"      : "交管新闻",
                        "requestUrl": jnjjApp.config.msgRequestUrl + "/wispcms/content/list.do?cid=64&type=Android" //客户端向服务器发起数据请求
                    },
                    {
                        "name"      : "道路状况",
                        "requestUrl": jnjjApp.config.msgRequestUrl + "/wispcms/content/list.do?cid=65&type=Android"
                    },
                    {
                        "name"      : "交通事故",
                        "requestUrl": jnjjApp.config.msgRequestUrl + "/wispcms/content/list.do?cid=65&type=Android"
                    }
                ]
            },
            {
                "beforeImg"   : "config/html/images/wispui/more_normal.png",
                "afterImg"    : "config/html/images/wispui/more_hover.png",
                "name"        : "更多",
                "clickEvent"  : "",
                "subBtns"     : [],
                "shortcutBtns": [
                    {
                        "divider": {
                            "title": "自助服务",
                            "ico"  : "config/html/images/wispui/d_zzfw.png"
                        },//用于分组，为空时不显示
                        "data"   : [
                            {
                                "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                                "beforeImg" : "config/html/images/wispui/ryxx_normal.png",//点击前图标
                                "afterImg"  : "config/html/images/wispui/hover.png", //点击时图标
                                "disableImg": "config/html/images/wispui/ryxx_dis.png",//按钮不可用图片，即 "enable"    : "false"
                                "enable"    : "false",
                                "name"      : "人员信息",
                                "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                                "clickEvent": "",
                                "url"       : "adapter?open&url=/wispcms/config/html/querycar.jsp"
                            },
                            {
                                "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                                "beforeImg" : "config/html/images/wispui/wzxx_normal.png",//点击前图标
                                "afterImg"  : "config/html/images/wispui/hover.png", //点击时图标
                                "disableImg": "config/html/images/wispui/wzxx_dis.png",
                                "enable"    : "false",
                                "name"      : "违法信息",
                                "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                                "clickEvent": "",
                                "url"       : "adapter?open&url=/wispcms/config/html/querycard.jsp"
                            },
                            {
                                "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                                "beforeImg" : "config/html/images/wispui/clcx_normal.png",//点击前图标
                                "afterImg"  : "config/html/images/wispui/hover.png", //点击时图标
                                "disableImg": "config/html/images/wispui/clcx_dis.png",
                                "enable"    : "false",
                                "name"      : "车辆信息",
                                "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                                "clickEvent": "",
                                "url"       : "adapter?open&url=/wispcms/config/html/queryviolation.jsp"
                            },
                            {
                                "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                                "beforeImg" : "config/html/images/wispui/sgkc_normal.png",//点击前图标
                                "afterImg"  : "config/html/images/wispui/hover.png", //点击时图标
                                "disableImg": "config/html/images/wispui/sgkc_dis.png",
                                "enable"    : "false",
                                "name"      : "事故快处",
                                "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                                "clickEvent": "",
                                "url"       : "adapter?open&url=/wispcms/config/html/queryviolation.jsp"
                            },
                            {
                                "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                                "beforeImg" : "config/html/images/wispui/clbd_normal.png",//点击前图标
                                "afterImg"  : "config/html/images/wispui/hover.png", //点击时图标
                                "disableImg": "config/html/images/wispui/clbd_dis.png",
                                "enable"    : "false",
                                "name"      : "车辆绑定",
                                "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                                "clickEvent": "",
                                "url"       : "adapter?open&url=/wispcms/config/html/queryviolation.jsp"
                            },
                            {
                                "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                                "beforeImg" : "config/html/images/wispui/jzbd_normal.png",//点击前图标
                                "afterImg"  : "config/html/images/wispui/hover.png", //点击时图标
                                "disableImg": "config/html/images/wispui/jzbd_dis.png",
                                "enable"    : "false",
                                "name"      : "驾照绑定",
                                "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                                "clickEvent": "",
                                "url"       : "adapter?open&url=/wispcms/config/html/queryviolation.jsp"
                            }
                        ]
                    },
                    {
                        "divider": {
                            "title": "车管所",
                            "ico"  : "config/html/images/wispui/d_cgs.png"
                        },//用于分组，为空时不显示
                        "data"   : [
                            {
                                "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                                "beforeImg" : "config/html/images/wispui/ksyy_normal.png",//点击前图标
                                "afterImg"  : "config/html/images/wispui/hover.png", //点击时图标
                                "disableImg": "config/html/images/wispui/ksyy_dis.png",
                                "enable"    : "false",
                                "name"      : "考试预约",
                                "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                                "clickEvent": "",
                                "url"       : "adapter?open&url=/wispcms/config/html/queryviolation.jsp"
                            },
                            {
                                "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                                "beforeImg" : "config/html/images/wispui/njyy_normal.png",//点击前图标
                                "afterImg"  : "config/html/images/wispui/hover.png", //点击时图标
                                "disableImg": "config/html/images/wispui/njyy_dis.png",
                                "enable"    : "false",
                                "name"      : "年检预约",
                                "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                                "clickEvent": "",
                                "url"       : "adapter?open&url=/wispcms/config/html/queryviolation.jsp"
                            },
                            {
                                "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                                "beforeImg" : "config/html/images/wispui/ksyycx_normal.png",//点击前图标
                                "afterImg"  : "config/html/images/wispui/hover.png", //点击时图标
                                "disableImg": "config/html/images/wispui/ksyycx_dis.png",
                                "enable"    : "false",
                                "name"      : "考试预约查询",
                                "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                                "clickEvent": "",
                                "url"       : "adapter?open&url=/wispcms/config/html/queryviolation.jsp"
                            },
                            {
                                "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                                "beforeImg" : "config/html/images/wispui/njyycx_normal.png",//点击前图标
                                "afterImg"  : "config/html/images/wispui/hover.png", //点击时图标
                                "disableImg": "config/html/images/wispui/njyycx_dis.png",
                                "enable"    : "false",
                                "name"      : "年检预约查询",
                                "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                                "clickEvent": "",
                                "url"       : "adapter?open&url=/wispcms/config/html/queryviolation.jsp"
                            },
                            {
                                "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                                "beforeImg" : "config/html/images/wispui/kscjcx_normal.png",//点击前图标
                                "afterImg"  : "config/html/images/wispui/hover.png", //点击时图标
                                "disableImg": "config/html/images/wispui/kscjcx_dis.png",
                                "enable"    : "false",
                                "name"      : "考试成绩查询",
                                "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                                "clickEvent": "",
                                "url"       : "adapter?open&url=/wispcms/config/html/queryviolation.jsp"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    var siderDatas = {
        "sider": {
            "info": {
                "id"  : '',
                "img" : '',
                "name": '',
                "url" : 'adapter?url=' + jnjjApp.config.requestUrl + '/wispcms/config/html/login.jsp'
            },
            "list": [
                {
                    "beforeImg" : "config/html/images/wispui/clxx_normal.png",
                    "afterImg"  : "config/html/images/wispui/hover.png",
                    "name"      : "我的车辆",
                    "clickEvent": "",
                    "url"       : "adapter?url=" + jnjjApp.config.requestUrl + "/wispcms/config/html/repwd.jsp",
                    "subBtns"   : []
                }
            ]
        }
    };
    //dom
    var loginSubmit = $('#login-submit');//登录
    var rigisterBtn = $('#rigister');//注册
    var skipBtn = $('#skip'); //跳过
    var username;
    var password;
    var roleId = '0001';
    var urlPre = 'adapter?open&url=';
    var loginRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/userLogin.json';//登录验证请求地址
    var userinfoRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/getUserInfo.json';//用户信息请求地址
    var rigisterPageUrl=urlPre
        +jnjjApp.config.requestUrl
        +'/jnpublic/config/html/rigister.jsp';
    loginSubmit.on('click', loginSubmitListener);
    rigisterBtn.on('click', rigisterListener);
    skipBtn.on('click', skipListener);
    //rigisterBtn.attr('href',rigisterPageUrl);//注册按钮初始化跳转
    App.UI('buttonHover',{//添加按钮点击效果
        "dom":loginSubmit,
        "hoverClassName":'ui_btn_01_hover'
    });
    App.UI('buttonHover',{//添加按钮点击效果
        "dom":rigisterBtn,
        "hoverClassName":'ui_btn_hover'
    });
    App.UI('buttonHover',{//添加按钮点击效果
        "dom":skipBtn,
        "hoverClassName":'ui_btn_02_hover'
    });
    //登录事件函数
    function loginSubmitListener() {
        username = $('#username').val();
        password = $('#password').val();
        loginSubmit.off('click');
        /*App.UI('buttonHover',{//移除按钮点击效果
         "dom":loginSubmit,
         "off":true
         });*/
        if ( username === '' ) {
            alert('用户名不能为空！');
            loginSubmit.on('click', loginSubmitListener);
        } else if ( password === '' ) {
            alert('密码不能为空！');
            loginSubmit.on('click', loginSubmitListener);
        } else {
            Wisp.UI.progressDialog.show('登录中，请稍后！');
            //发起登录请求
            App.getAjaxData(loginRequestUrl, {
                "userName": username,
                "password": password,
                "roleId"  : roleId
            }, function (data) {//登录请求回调
                var msg = data.loginResponse;
                if ( msg.loginSuccess === 'true' ) {
                    loginSuccessCallback(msg, footbarDatas);
                } else if ( msg.loginSuccess === 'false' ) {
                    Wisp.UI.progressDialog.remove();
                    alert(msg.loginContent + '!');
                    loginSubmit.on('click', loginSubmitListener);
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert('登录失败!');
                    loginSubmit.on('click', loginSubmitListener);
                }
            });
        }
    }
    //注册事件函数
    function rigisterListener(){
         window.open(rigisterPageUrl);
     }
    //跳过事件函数
    function skipListener(){
        console.dir(footbarDatas);
        console.dir(siderDatas);
        skipBtn.off('click');
        sendClientUIdata( footbarDatas, siderDatas);//发送默认配置按钮
        alert('我是游客，选择跳过。');
    }
    //登录成功回调函数
    function loginSuccessCallback(data, footbarDatas) {
        console.dir(data);
        if ( data.loginSuccess ) {//登陆成功
            //初始化footbarDatas
            var MoreViewData = refreshMoreViewData(footbarDatas, data.authList);//刷新更多按钮
            console.dir(MoreViewData);
            //请求用户信息
            App.getAjaxData(userinfoRequestUrl, {
                "registerName": username
            }, function (data) {//用户信息请求回调
                var msg = data.userCenterResponse;
                if ( msg ) {
                    userInfoSuccessCallback(msg, siderDatas);
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert('登录失败!(个人信息初始化失败)');
                    loginSubmit.on('click', loginSubmitListener);
                }
            });
        } else {//登录失败
            Wisp.UI.progressDialog.remove();
            alert(msg.loginContent + "!");
            loginSubmit.on('click', loginSubmitListener);
        }
    }

    //获取个人信息回调函数
    function userInfoSuccessCallback(data, siderDatas) {
        console.dir(data);
        data.userName && (siderDatas.sider.info.name = data.userName);
        data.userImage && (siderDatas.sider.info.img = data.userImage);
        siderDatas.sider.info.url = '';
        sendClientUIdata(footbarDatas, siderDatas);//发送客户端ui数据
        Wisp.UI.progressDialog.remove();//移除加载框，登录流程结束
        Wisp.UI.loginResult.success();
        App.Cookie.SetCookie('username',username);
        console.log('login END!!!!');

    }

    //发送客户端初始化ui
    function sendClientUIdata(footbarDatas, siderDatas) {
        Wisp.UI.Init({
            'type' : 'footbar',
            'datas': footbarDatas
        });
        Wisp.UI.Init({
            'type' : 'sider',
            'datas': siderDatas
        });
    }

    //刷新更多按钮数据
    function refreshMoreViewData(defaultdata, resdata) {
        console.dir(defaultdata);
        console.dir(resdata);
        var l=defaultdata.footbar.length-1;
        console.dir(l);
        var more_btns = defaultdata.footbar[l].shortcutBtns;
        var cur_btn;
        for ( var i = resdata.length - 1; i >= 0; i-- ) {
            cur_btn = resdata[i].authcontent;
            formatData(cur_btn, more_btns);
        }
        return defaultdata;
    }

    //格式化更多按钮数据
    function formatData(curdata, arr) {
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


})