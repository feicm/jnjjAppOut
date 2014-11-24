<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <title>车辆绑定</title>
    <link rel="stylesheet" href="config/html/css/reset.css">
    <link rel="stylesheet" href="config/html/css/app_p.css">
</head>
<body>
<form class="rigister_f" action="" method="post" id="bindinfo_form">
    <div class="list-block">
        <ul>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">车主名称</div>
                        <div class="item-input">
                            <input id="name" type="text" placeholder="请输入车主姓名">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">号牌号码</div>
                        <div class="item-input">
                            <input id="hphm" type="text" placeholder="请输入车牌号码">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">号牌种类</div>
                        <div class="item-input">
                            <select id="hpzl">
                                <option>小型汽车</option>
                                <option>大型汽车</option>
                                <option>普通摩托车</option>
                            </select>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">车识别号</div>
                        <div class="item-input">
                            <input id="clsbdh" type="text" placeholder="请输入车辆识别代号">
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="list-block">
        <ul>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">身份证号</div>
                        <div class="item-input">
                            <input id="idnum" type="text" placeholder="请输入身份证号">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">手 机</div>
                        <div class="item-input">
                            <input id="phone" type="text" placeholder="请输入手机号码">
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="ft w100">
        <a class="ui_btn ui_btn_01 ui_radius ui_btn_block" id="bindinfo_btn">
            绑定
        </a>
    </div>
</form>
</body>
<script src="config/html/js/zepto.min.js"></script>
<script src="config/html/js/WISPComponents_v3.0.js"></script>
<script src="config/html/js/appConfig.js"></script>
<script src="config/html/js/common.js"></script>
<script src="config/html/js/carlist.js"></script>
</html>