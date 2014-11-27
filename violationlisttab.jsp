<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <title>违法信息</title>
    <link rel="stylesheet" href="config/html/css/reset.css">
    <link rel="stylesheet" href="config/html/css/app_p.css">
</head>
<body>
    <div class="ui-grid-a tab" id="tab_violation">
        <a class="ui-block-a active" data-for="tab-item-01">驾照违法</a>
        <a class="ui-block-b" data-for="tab-item-02">驾照强制措施</a>
    </div>
    <ul class='details_list' id="tab-item-01">

    </ul>
    <ul class='details_list' style="display: none" id="tab-item-02">

    </ul>
</body>
    <script src="config/html/js/zepto.min.js"></script>
    <script src="config/html/js/WISPComponents_v3.0.js"></script>
    <script src="config/html/js/appConfig.js"></script>
    <script src="config/html/js/common.js"></script>
    <script src="config/html/js/infodetails.js"></script>
</html>