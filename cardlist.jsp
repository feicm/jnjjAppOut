<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <title>我的驾照</title>
    <link rel="stylesheet" href="config/html/css/reset.css">
    <link rel="stylesheet" href="config/html/css/app_p.css">
</head>
<body>
    <div class="c"  data-mode='card'>
        <div class="carlist_c">
            <div class="tips">

            </div>
            <a class="ui_btn ui_btn_01 ui_radius ui_btn_block" data-rel='next' id="go_cardbindpage">
                添加绑定
            </a>
        </div>
    <form class="rigister_f" action="" method="post" id="bindcard_form">
    <div class="list-block">
    <ul>
    <li>
    <div class="item-content">
    <div class="item-inner">
    <div class="item-title label">姓 名</div>
    <div class="item-input">
    <input id="name" data-type="cnuser" type="text" placeholder="请输入驾驶人姓名">
    </div>
    </div>
    </div>
    </li>
    <li>
    <div class="item-content">
    <div class="item-inner">
    <div class="item-title label">手 机</div>
    <div class="item-input">
    <input id="phone" data-type="mobile" type="text" placeholder="请输入驾驶人手机号码">
    </div>
    </div>
    </div>
    </li>
    <li>
    <div class="item-content">
    <div class="item-inner">
    <div class="item-title label">身份证号</div>
    <div class="item-input">
    <input id="idnum" data-type="card" type="text" placeholder="请输入驾驶人身份证号">
    </div>
    </div>
    </div>
    </li>
    <li>
    <div class="item-content">
    <div class="item-inner">
    <div class="item-title label">档案编号</div>
    <div class="item-input">
    <input id="dabh" data-type="archive" type="text" placeholder="请输入驾驶证档案编号">
    </div>
    </div>
    </div>
    </li>
    </ul>
    </div>
    <div class="ft w100">
    <a class="ui_btn ui_btn_01 ui_radius ui_btn_block" data-rel='pre' id="bindcard_btn">
    确认
    </a>
    </div>
    </form>
    </div>
</body>
<script src="config/html/js/zepto.min.js"></script>
<script src="config/html/js/WISPComponents_v3.0.js"></script>
<script src="config/html/js/appConfig.js"></script>
<script src="config/html/js/common.js"></script>
<script src="config/html/js/carlist.js"></script>
</html>