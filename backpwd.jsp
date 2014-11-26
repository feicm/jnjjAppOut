    <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <title>找回密码</title>
    <link rel="stylesheet" href="config/html/css/reset.css">
    <link rel="stylesheet" href="config/html/css/app_p.css">
    <!--select组件 css-->
    <link href="config/html/css/mobiscroll.scroller.css" rel="stylesheet" type="text/css"/>
    <link href="config/html/css/mobiscroll.scroller.ios7.css" rel="stylesheet" type="text/css"/>
    <link href="config/html/css/mobiscroll.animation.css" rel="stylesheet" type="text/css"/>
    <!--select组件 css end-->
</head>
<body>
<form class="rigister_f" action="" method="post" id="backpwd_form">
    <div class="list-block">
        <ul>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">找回方式</div>
                        <div class="item-input">
                            <select id="backpwd_methon">
                                <option value="fromphone">通过手机号</option>
                                <option value="fromemail">通过邮箱</option>
                                <option value="fromcloser">通过密切联系人</option>
                            </select>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div id="fromphone" class="list-block">
        <ul>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">邮 箱</div>
                        <div class="item-input">
                            <input id="email" data-type="mail" type="text" placeholder="请输入邮箱名">
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div id="fromemail" class="list-block">
        <ul>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">手 机</div>
                        <div class="item-input">
                            <input id="phone" data-type="mobile" type="text" placeholder="请输入密切联系人电话">
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div id="fromcloser">
        <div class="ipt_lable">
            注册时填写的密切联系人信息
        </div>
        <div class="list-block">
            <ul>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">姓 名</div>
                            <div class="item-input">
                                <input id="mqlxrxm" data-type="cnuser" type="text" placeholder="请输入密切联系人姓名">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">手 机</div>
                            <div class="item-input">
                                <input id="mqlxrdh" data-type="mobile" type="text" placeholder="请输入密切联系人电话">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">身份证号</div>
                            <div class="item-input">
                                <input id="mqlxrsfzh" data-type="card" type="text" placeholder="请输入密切联系人身份证号">
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="ft w100">
        <a class="ui_btn ui_btn_01 ui_radius ui_btn_block" id="backpwd_btn">
            确认
        </a>
    </div>
</form>
</body>
        <script src="config/html/js/zepto.min.js"></script>
        <script src="config/html/js/WISPComponents_v3.0.js"></script>
        <script src="config/html/js/appConfig.js"></script>
        <script src="config/html/js/common.js"></script>
        <script src="config/html/js/pwd.js"></script>
        <!--select组件-->
        <script src="config/html/js/mobiscroll.all.js" type="text/javascript"></script>
        <!--select组件 end-->
</html>