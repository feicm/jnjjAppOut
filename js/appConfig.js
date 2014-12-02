var jnjjApp = jnjjApp || {};
jnjjApp.config = {
    "domain"       : "rjsoft.gnway.cc",
    "httpPort"     : "9087",
    "requestUrl"   : "http://rjsoft.gnway.cc:9087",
    "msgRequestUrl": "http://rjsoft.gnway.cc:9093"
};
jnjjApp.footbarDatas= {
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
                            "beforeImg" : "config/html/images/wispui/wzxx_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/hover.png", //点击时图标
                            "disableImg": "config/html/images/wispui/wzxx_dis.png",
                            "enable"    : "false",
                            "name"      : "违法信息",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "adapter?open&url="+jnjjApp.config.requestUrl+"/wispcms/config/html/violation.jsp"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/clxx_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/hover.png", //点击时图标
                            "disableImg": "config/html/images/wispui/clxx_dis.png",
                            "enable"    : "false",
                            "name"      : "车辆信息",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "adapter?open&url="+jnjjApp.config.requestUrl+"/wispcms/config/html/carlist.jsp"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/ryxx_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/hover.png", //点击时图标
                            "disableImg": "config/html/images/wispui/ryxx_dis.png",
                            "enable"    : "false",
                            "name"      : "驾照信息",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "adapter?open&url="+jnjjApp.config.requestUrl+"/wispcms/config/html/cardlist.jsp"
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
                            "url"       : "adapter?open&url="+jnjjApp.config.requestUrl+"/wispcms/config/html/tips.jsp"
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
                            "url"       : "adapter?open&url="+jnjjApp.config.requestUrl+"/wispcms/config/html/bindcar.jsp"
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
                            "url"       : "adapter?open&url="+jnjjApp.config.requestUrl+"/wispcms/config/html/bindcard.jsp"
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
                            "url"       : "adapter?open&url="+jnjjApp.config.requestUrl+"/wispcms/config/html/tips.jsp"
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
                            "url"       : "adapter?open&url="+jnjjApp.config.requestUrl+"/wispcms/config/html/tips.jsp"
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
                            "url"       : "adapter?open&url="+jnjjApp.config.requestUrl+"/wispcms/config/html/tips.jsp"
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
                            "url"       : "adapter?open&url="+jnjjApp.config.requestUrl+"/wispcms/config/html/tips.jsp"
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
                            "url"       : "adapter?open&url="+jnjjApp.config.requestUrl+"/wispcms/config/html/tips.jsp"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/kscjcx_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/hover.png", //点击时图标
                            "disableImg": "config/html/images/wispui/kscjcx_dis.png",
                            "enable"    : "true",
                            "name"      : "地图",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "/jnpublic/cgsquery.json?action=map"
                        }
                    ]
                }
            ]
        }
    ]
};
jnjjApp.siderDatas = {
    "sider": {
        "info": {
            "id"  : '',
            "img" : '',
            "name": '',
            "url" : 'adapter?url=' + jnjjApp.config.requestUrl + '/wispcms/config/html/loginnoskip.jsp'
        },
        "list": [
            {
                "beforeImg" : "config/html/images/wispui/personal_normal.png",
                "afterImg"  : "config/html/images/wispui/hover.png",
                "name"      : "个人资料维护",
                "clickEvent": "",
                "url"       : "adapter?url=" + jnjjApp.config.requestUrl + "/wispcms/config/html/personalinfo.jsp",
                "subBtns"   : []
            },
            {
                "beforeImg" : "config/html/images/wispui/mycar_normal.png",
                "afterImg"  : "config/html/images/wispui/hover.png",
                "name"      : "我的车辆",
                "clickEvent": "",
                "url"       : "adapter?url=" + jnjjApp.config.requestUrl + "/wispcms/config/html/carlist.jsp",
                "subBtns"   : []
            },
            {
                "beforeImg" : "config/html/images/wispui/mycard_normal.png",
                "afterImg"  : "config/html/images/wispui/hover.png",
                "name"      : "我的驾照",
                "clickEvent": "",
                "url"       : "adapter?url=" + jnjjApp.config.requestUrl + "/wispcms/config/html/cardlist.jsp",
                "subBtns"   : []
            },
            {
                "beforeImg" : "config/html/images/wispui/myviolation_normal.png",
                "afterImg"  : "config/html/images/wispui/hover.png",
                "name"      : "我的违法",
                "clickEvent": "",
                "url"       : "adapter?url=" + jnjjApp.config.requestUrl + "/wispcms/config/html/violation.jsp",
                "subBtns"   : []
            },
            {
                "beforeImg" : "config/html/images/wispui/msg_normal.png",
                "afterImg"  : "config/html/images/wispui/hover.png",
                "name"      : "消息查看",
                "clickEvent": "",
                "url"       : "",
                "requestUrl": jnjjApp.config.msgRequestUrl + "/wispcms/content/list.do?cid=65&type=Android",
                "subBtns"   : []
            }
        ]
    }
};

