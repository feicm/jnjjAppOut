<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <meta content="telephone=no,email=no" name="format-detection"/>
    <title>密切联系人</title>
    <link rel="stylesheet" href="config/html/css/reset.css">
    <link rel="stylesheet" href="config/html/css/app_p.css">
</head>
<body>
<form class="rigister_f" action="" method="post" id="personalinfo_form">
    <div class="list-block">
        <ul>
            <li>
                <div class="item-content">
                    <div class="item-media"><i class="icon icon-user"></i></div>
                    <div class="item-inner">
                        <div class="item-title label">姓 名</div>
                        <div class="item-input">
                            <input id="c_name" class="tr" type="text" placeholder="+添加">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-media"><i class="icon icon-phone2"></i></div>
                    <div class="item-inner">
                        <div class="item-title label">手 机</div>
                        <div class="item-input">
                            <input id="c_phone" class="tr" type="text" placeholder="+添加">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-media"><i class="icon icon-idcard2"></i></div>
                    <div class="item-inner">
                        <div class="item-title label">身份证号</div>
                        <div class="item-input">
                            <input id="c_sfzh" class="tr" type="text" placeholder="+添加">
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</form>
</body>
    <script src="config/html/js/zepto.min.js"></script>
    <script src="config/html/js/WISPComponents_v3.0.js"></script>
    <script src="config/html/js/appConfig.js"></script>
    <script src="config/html/js/common.js"></script>
    <script src="config/html/js/personal.js"></script>
</html>