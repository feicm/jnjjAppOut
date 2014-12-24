<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <meta content="telephone=no,email=no" name="format-detection" />
    <title>注册</title>
    <link rel="stylesheet" href="config/html/css/reset.css">
    <link rel="stylesheet" href="config/html/css/app_p.css">
</head>
<body>

<form class="c" action="" method="post" id="rigister_form">
    <div class="rigister_f">
        <div class="list-block J_btnHighlightWithInput">
            <ul>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">用 户 名</div>
                            <div class="item-input">
                                <input id="setusername" data-type="user" type="text" placeholder="请输入用户名">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">密 码</div>
                            <div class="item-input">
                                <input id="setpwd_01" data-type="psd" type="password" placeholder="请设置您的密码">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">确认密码</div>
                            <div class="item-input">
                                <input id="setpwd_02" data-type="psd" type="password" placeholder="请再次输入您的密码">
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="list-block J_btnHighlightWithInput">
            <ul>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">姓 名</div>
                            <div class="item-input">
                                <input id="setname" data-type="cnuser" type="text" placeholder="请输入您的姓名">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">手 机</div>
                            <div class="item-input">
                                <input id="setphone" data-type="mobile" type="text" placeholder="请输入您的手机号码">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">身份证号</div>
                            <div class="item-input">
                                <input id="setidnum" data-type="card" type="text" placeholder="请输入您的身份证号">
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="ft w100">
            <a class="ui_btn ui_btn_01 ui_radius ui_btn_block ui_btn_01_disable" id="submit_rigister">
                提交
            </a>
        </div>
    </div>
</form>
</body>
<script src="config/html/js/zepto.min.js"></script>
<script src="config/html/js/WISPComponents_v3.0.js"></script>
<script src="config/html/js/appConfig.js"></script>
<script src="config/html/js/common.js"></script>
<script src="config/html/js/login.js"></script>
</html>