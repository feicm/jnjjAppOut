<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <meta content="telephone=no,email=no" name="format-detection" />
    <title>登录</title>
    <link rel="stylesheet" href="config/html/lib/css/aio.css">
</head>
    <style>
    ::-webkit-input-placeholder{
        color: #fff;
    }
    </style>
<body>
<form class="login_f" action="" method="post" id="login_form">
    <div class="app_ico">
        <i class="icon icon-appicon"></i>
    </div>
    <div class="list-block">
        <ul>
            <li>
                <div class="item-content">
                    <div class="item-media"><i class="icon icon-form-name"></i></div>
                    <div class="item-inner">
                        <div class="item-input">
                            <input type="text" placeholder="用户名" id="username">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-media">
                        <i class="icon icon-form-password"></i>
                    </div>
                    <div class="item-inner">
                        <div class="item-input">
                            <input type="password" placeholder="密码" id="password">
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="ft w100">
    <button onclick="return false" class="ui_btn ui_btn_01 ui_radius ui_btn_block" id="login-submit" type="submit">
        登录
    </button>
    <div class="backpwd">
        <a class="fl" id="rigister">快速注册</a>
        <a id='backpwd'>找回密码</a>
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