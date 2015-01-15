var jnjjApp = jnjjApp || {};
jnjjApp.config = {
    "domain"       : "rjsoft.gnway.cc",
    "httpPort"     : "9087",
    "requestUrl"   : "http://rjsoft.gnway.cc:9087",
    "msgRequestUrl": "http://rjsoft.gnway.cc:9093"
};
var PreQuestUrl = "adapter?open&url=" + jnjjApp.config.requestUrl;
var PageId_lv01 = (new Date()).getTime();
jnjjApp.footbarDatas = {
    "footbar": [
        {
            "beforeImg": "config/html/images/wispui/home_normal.png",
            "afterImg" : "config/html/images/wispui/home_hover.png",
            "name"     : "首页",
            "view"     : [
                {
                    "type": 'picGallery',//图片轮播
                    "size": 'Larger', //尺寸标识 Larger Middle Smaller
                    "data": [
                        {
                            "imgUrl": "http://rjsoft.gnway.cc:9093/wispcms/dbfile.svl?n=/u/cms/www/201501/14151206zvn9.jpg",
                            "url"   : "http://rjsoft.gnway.cc:9093/wispcms/static/ZXJJDT/20150114/3843.html"
                        },
                        {
                            "imgUrl": "http://i2.sinaimg.cn/dy/c/2014-08-11/1407776507_TBWOVy.jpg",
                            "url"   : "http://rjsoft.gnway.cc:9093/wispcms/appContent.jspx?id=2243&uid=&type=Android"
                        },
                        {
                            "imgUrl": "http://www.bjjtgl.gov.cn/Portals/0/images/20130415xw01.jpg",
                            "url"   : "http://rjsoft.gnway.cc:9093/wispcms/appContent.jspx?id=2245&uid=&type=Android"
                        }
                    ]
                },
                {
                    "type": "btnsGallery",//菜单轮播
                    "data": [
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/home/h_violation_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/home/h_violation_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "违法信息",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/violation.jsp&@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
                        },
                        /*{
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/sgkc_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/sgkc_hover.png", //点击时图标
                            "disableImg": "config/html/images/wispui/sgkc_dis.png",
                            "enable"    : "false",
                            "name"      : "事故快处",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/tips.jsp"
                        },*/
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/home/h_inspec_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/home/h_inspec_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "年检预约",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/inspectionAppointment.jsp&@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/home/h_examquery01_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/home/h_examquery01_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "考试预约查询",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/examquery.jsp&@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@#mode=query_ksyy"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/home/h_inspec_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/home/h_inspec_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "年检预约查询",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/inspectionquery.jsp&@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@#mode=query_njyy"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/home/h_examquery01_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/home/h_examquery01_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "考试成绩查询",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/examquery.jsp&@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@#mode=query_kscj"
                        }/*,
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/home/cgswz_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/home/cgswz_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "车管所位置",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : jnjjApp.config.requestUrl + "/jnpublic/cgsquery.json?action=map"
                        }*/
                    ]
                },
                {
                    "type": 'picGallery',//图片轮播
                    "size": 'Middle', //尺寸标识 Larger Middle Smaller
                    "data": [
                        {
                            "imgUrl": "http://rjsoft.gnway.cc:9093/wispcms/unicom.jpg",
                            "url"   : ""
                        }
                    ]
                }
            ]
        },
        {
            "beforeImg" : "config/html/images/wispui/message_normal.png",
            "afterImg"  : "config/html/images/wispui/message_hover.png",
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
            "beforeImg"   : "config/html/images/wispui/traffic_normal.png",
            "afterImg"    : "config/html/images/wispui/traffic_hover.png",
            "name"        : "交管",
            "clickEvent"  : "",
            "subBtns"     : [],
            "shortcutBtns": [
                {
                    "divider": {
                        "title": "自助服务",
                        "ico"  : ""
                    },//用于分组，为空时不显示
                    "data"   : [
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/traffic/t_violation_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/traffic/t_violation_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "违法信息",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/violation.jsp&@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/traffic/t_accident_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/traffic/t_accident_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "事故快处",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/tips.jsp"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/traffic/t_bindcar_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/traffic/t_bindcar_hover.png", //点击时图标
                            "disableImg": "config/html/images/wispui/clbd_dis.png",
                            "enable"    : "false",
                            "name"      : "车辆绑定",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/bindcar.jsp&@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
                        }
                    ]
                },
                {
                    "divider": {
                        "title": "业务大厅",
                        "ico"  : ""
                    },//用于分组，为空时不显示
                    "data"   : [
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/traffic/t_inspec_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/traffic/t_inspec_hover.png", //点击时图标
                            "disableImg": "config/html/images/wispui/njyy_dis.png",
                            "enable"    : "false",
                            "name"      : "年检预约",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/inspectionAppointment.jsp&@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/traffic/t_examquery_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/traffic/t_examquery_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "考试预约查询",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/examquery.jsp&@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@#mode=query_ksyy"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/traffic/t_inspecquery_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/traffic/t_inspecquery_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "年检预约查询",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/inspectionquery.jsp&@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@#mode=query_njyy"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/traffic/t_examresult_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/traffic/t_examresult_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "考试成绩查询",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/examquery.jsp&@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@#mode=query_kscj"
                        }
                    ]
                },
                {
                    "divider": {
                        "title": "周边服务",
                        "ico"  : ""
                    },//用于分组，为空时不显示
                    "data"   : [
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/traffic/t_position_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/traffic/t_position__hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "车管所位置",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : jnjjApp.config.requestUrl + "/jnpublic/cgsquery.json?action=map"
                        }
                    ]
                }
            ]
        },
        {
            "beforeImg" : "config/html/images/wispui/find_normal.png",
            "afterImg"  : "config/html/images/wispui/find_hover.png",
            "name"      : "发现",
            "clickEvent": "",
            "view"      : [ //发现 视图数据
                {
                    "type": "RectangleWithIcoLeft",
                    "data": [
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/find/f_wzts.png",//点击前图标
                            "afterImg"  : "", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "违章推送",
                            "summary"   : "违章主动推送",
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/tips.jsp"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/find/f_jyyh.png",//点击前图标
                            "afterImg"  : "", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "加油优惠",
                            "summary"   : "商谈后确定",
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/tips.jsp"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/find/f_xcyh.png",//点击前图标
                            "afterImg"  : "", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "洗车优惠",
                            "summary"   : "联创冰点价",
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/tips.jsp"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/find/f_dj.png",//点击前图标
                            "afterImg"  : "", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "代驾",
                            "summary"   : "泽安冰点价",
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/tips.jsp"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/find/f_byyh.png",//点击前图标
                            "afterImg"  : "", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "保养优惠",
                            "summary"   : "商谈后确定",
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/tips.jsp"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/find/f_clns.png",//点击前图标
                            "afterImg"  : "", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "车辆年审",
                            "summary"   : "无需排队等候",
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/tips.jsp"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/find/f_dljy.png",//点击前图标
                            "afterImg"  : "", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "道路救援",
                            "summary"   : "免费全国救援",
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/tips.jsp"
                        }
                    ]
                }
            ]
        },
        {
            "beforeImg" : "config/html/images/wispui/my_normal.png",
            "afterImg"  : "config/html/images/wispui/my_hover.png",
            "name"      : "我的",
            "clickEvent": "",
            "siderView" : [
                {
                    "type": "personalPic",
                    "data": [
                        {
                            "id"    : '',
                            "img"   : '',
                            "name"  : '',
                            "url"   : PreQuestUrl + '/jnpublic/config/html/loginnoskip.jsp',
                            "roleid": '0000'//角色权限标识
                        }
                    ]
                },
                {
                    "type": "list",
                    "data": [
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/my/m_personal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/my/m_personal.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "资料维护",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/personalinfo.jsp&@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/my/m_car.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/my/m_car.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "我的车辆",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/carlist.jsp&@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/my/m_card.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/my/m_card.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "我的驾照",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/cardlist.jsp&@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/my/m_msg.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/my/m_msg.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "消息查看",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : jnjjApp.config.msgRequestUrl + "/wispcms/content/list.do?cid=65&type=Android&action=message"
                        } ,
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/my/m_feedback.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/my/m_feedback.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "意见建议",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : PreQuestUrl + "/jnpublic/config/html/feedback.jsp&@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
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
            "id"    : '',
            "img"   : '',
            "name"  : '',
            "url"   : PreQuestUrl + '/jnpublic/config/html/loginnoskip.jsp',
            "roleid": '0000'//角色权限标识
        }
    }
};

