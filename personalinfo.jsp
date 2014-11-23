<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <title>个人资料</title>
    <link rel="stylesheet" href="config/html/css/reset.css">
    <link rel="stylesheet" href="config/html/css/app_p.css">
</head>
<body>
<form class="rigister_f" action="" method="post" id="personalinfo_form">
    <div class="list-block">
        <ul>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">用 户 名</div>
                        <div class="item-input">
                            <input id="username" disabled type="text" value="金毛狮王">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">姓 名</div>
                        <div class="item-input">
                            <input id="name" disabled type="text" value="谢逊">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">头 像</div>
                        <div class="item-input">
                            <div class="ui-circle-pic">
                                <img id='photo' src="images/pic.jpg">
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">性 别</div>
                        <div class="item-input">
                            <input id="gender" disabled type="text" value="男"/>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">手 机</div>
                        <div class="item-input">
                            <input id="phone" type="text" value="12345678900">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">身份证号</div>
                        <div class="item-input">
                            <input id="idnum" disabled type="text" value="123456789098765432">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">邮 箱</div>
                        <div class="item-input">
                            <input id="email" disabled type="text" value="admin@hostname.com">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">注册时间</div>
                        <div class="item-input">
                            <input id="time" disabled type="text" value="2014-1-1">
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="list-block-title">
        移车联系人信息
    </div>
    <div class="list-block">
        <ul>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">姓 名</div>
                        <div class="item-input">
                            <input id="y_name" type="text" value="张无忌">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">电 话</div>
                        <div class="item-input">
                            <input id="y_phone" type="text">
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="list-block-title">
        密切联系人信息
    </div>
    <div class="list-block">
        <ul>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">姓 名</div>
                        <div class="item-input">
                            <input id="m_name" type="text" placeholder="+点击添加">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">电 话</div>
                        <div class="item-input">
                            <input id="m_phone" type="text" placeholder="+点击添加">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">身份证号</div>
                        <div class="item-input">
                            <input id="m_innum" type="text" placeholder="+点击添加">
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="ft w100">
        <a class="ui_btn ui_btn_01 ui_radius ui_btn_block" id="saveinfo_btn">
            保存
        </a>
    </div>
</form>
</body>
<script src="config/html/js/zepto.min.js"></script>
<script src="config/html/js/WISPComponents_v3.0.js"></script>
<script src="config/html/js/appConfig.js"></script>
<script src="config/html/js/common.js"></script>
<script src="config/html/js/personal.js"></script>
</html>