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
    <!--select组件 css-->
    <link href="config/html/css/mobiscroll.scroller.css" rel="stylesheet" type="text/css"/>
    <link href="config/html/css/mobiscroll.scroller.ios7.css" rel="stylesheet" type="text/css"/>
    <link href="config/html/css/mobiscroll.animation.css" rel="stylesheet" type="text/css"/>
    <!--select组件 css end-->
</head>
<body>
    <div class="ui-buttons-row fixed-top" id="tab_violation">
        <a class="button active" data-for="tab-item-01">车辆</a>
        <a class="button" data-for="tab-item-02">驾照</a>
    </div>
<div class='c' id="tab-item-01" data-mode="violation">
    <div class="print pt18">
        <input type="checkbox" id="nodo01" name="jkbj">
        <label for="nodo01">未处理/未交款</label>
    </div>
    <div class="list-block">
        <ul id="violation_car">
        </ul>
    </div>
</div>
<div style="display: none" class='c' data-mode="violation_card" id="tab-item-02">
    <div class="print pt18">
        <input type="checkbox" id="nodo02" name="jkbj">
        <label for="nodo02">未交款</label>
    </div>
    <div class="list-block">
        <ul id="violation_card">
        </ul>
    </div>
</div>
</body>
    <script src="config/html/js/zepto.min.js"></script>
    <script src="config/html/js/WISPComponents_v3.0.js"></script>
    <script src="config/html/js/appConfig.js"></script>
    <script src="config/html/js/common.js"></script>
    <script src="config/html/js/list.js"></script>
    <!--select组件-->
    <script src="config/html/js/mobiscroll.all.js" type="text/javascript"></script>
    <!--select组件 end-->
</html>