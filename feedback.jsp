    <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <meta content="telephone=no,email=no" name="format-detection" />
    <title>意见建议</title>
        <link rel="stylesheet" href="lib/css/aio.css">
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
        <script src="js/zepto.min.js"></script>
        <script src="js/WISPComponents_v3.0.js"></script>
        <script src="js/appConfig.js"></script>
        <script src="js/common.js"></script>
        <script src="js/feedback.js"></script>
</html>