<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <meta content="telephone=no,email=no" name="format-detection" />
    <title>个人资料</title>
    <link rel="stylesheet" href="config/html/css/reset.css">
    <link rel="stylesheet" href="config/html/css/app_p.css">
</head>
<body>
<form class="rigister_f" action="" method="post" id="personalinfo_form">
    <div class="list-block">
        <ul>
            <li>
                <div class="item-content ovh db">
                    <div class="ui-pic fl">
                        <img id="photo">
                    </div>
                    <h1 class="h1">
                        <b class="fw f12" id='name'>张三丰</b><i class="icon" id='gender'></i></br>
                        <b class="txt02" id='username'>feijcmmm</b>
                    </h1>
                </div>
            </li>
        </ul>
    </div>
    <div class="list-block">
        <ul>
            <li data-rel="p_phone">
                <div class="item-content">
                    <div class="item-media"><i class="icon icon-phone2"></i></div>
                    <div class="item-inner">
                        <div class="item-title label">手机号码</div>
                        <div class="item-after" id='phone'>13458565265</div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-media"><i class="icon icon-idcard2"></i></div>
                    <div class="item-inner">
                        <div class="item-title label">身份证号</div>
                        <div class="item-after" id='idnum'>350565859526535652</div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-media"><i class="icon icon-calendar"></i></div>
                    <div class="item-inner">
                        <div class="item-title label">注册时间</div>
                        <div class="item-after" id='time'>2012-01-01</div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-media"><i class="icon icon-email"></i></div>
                    <div class="item-inner">
                        <div class="item-title label">邮箱</div>
                        <div class="item-after" id='email'>无</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="list-block">
        <ul>
            <li data-rel="p_moveContacts">
                <div class="item-content">
                    <div class="item-media"><i class="icon icon-user"></i></div>
                    <div class="item-inner bg_arr_r">
                        <div class="item-title fw">移车联系人</div>
                    </div>
                </div>
            </li>
            <li data-rel="p_closeContacts">
                <div class="item-content">
                    <div class="item-media"><i class="icon icon-user"></i></div>
                    <div class="item-inner bg_arr_r">
                        <div class="item-title fw">密切联系人</div>
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