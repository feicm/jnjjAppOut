    <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <meta content="telephone=no,email=no" name="format-detection" />
    <title>意见建议</title>
    <link rel="stylesheet" href="config/html/css/reset.css">
    <link rel="stylesheet" href="config/html/css/app_p.css">
</head>
<body>
<form class="rigister_f" action="" method="post" id="repwd_form">
        <textarea class="feedback ui-radius" id='feedback_area'></textarea>
        <b class='txt01'>请输入您的宝贵意见</b>
    <div class="ft w100 mt05">
        <a class="ui_btn ui_btn_01 ui_radius ui_btn_block" id="feedback_btn">
            提交反馈
        </a>
    </div>
</form>
</body>
        <script src="config/html/js/zepto.min.js"></script>
        <script src="config/html/js/common.js"></script>
        <script src="config/html/js/feedback.js"></script>
</html>