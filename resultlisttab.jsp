<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <meta content="telephone=no,email=no" name="format-detection" />
    <title>违法信息</title>
    <link rel="stylesheet" href="config/html/css/reset.css">
    <link rel="stylesheet" href="config/html/css/app_p.css">
</head>
<body>
    <div class="ui-buttons-row c" id="tab_violation" data-mode='v_card_list'>
        <a class="button active" data-for="tab-item-01">驾照违法</a>
        <a class="button" data-for="tab-item-02">驾照强制措施</a>
    </div>
    <div class="list-block mt05" id="tab-item-01">
        <ul>
        </ul>
    </div>
    <div class="list-block mt05" style="display: none" id="tab-item-02">
        <ul>
        </ul>
    </div>
</body>
    <script src="config/html/js/zepto.min.js"></script>
    <script src="config/html/js/WISPComponents_v3.0.js"></script>
    <script src="config/html/js/appConfig.js"></script>
    <script src="config/html/js/common.js"></script>
    <script src="config/html/js/list.js"></script>
</html>