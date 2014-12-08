    <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <meta content="telephone=no,email=no" name="format-detection" />
    <title>考试预约</title>
    <link rel="stylesheet" href="config/html/css/reset.css">
    <link rel="stylesheet" href="config/html/css/app_p.css">
    <!--select组件 css-->
    <link href="config/html/css/mobiscroll.scroller.css" rel="stylesheet" type="text/css"/>
    <link href="config/html/css/mobiscroll.scroller.ios7.css" rel="stylesheet" type="text/css"/>
    <link href="config/html/css/mobiscroll.animation.css" rel="stylesheet" type="text/css"/>
    <!--select组件 css end-->
</head>
<body>
<form class="rigister_f" action="" method="post" id="examAppointment_form">
    <div class="list-block J_btnHighlightWithInput">
        <ul>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label w6">身份证明名称</div>
                        <div class="item-input">
                            <select id="ksyy_sfzmmc">
                            </select>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">证件号码</div>
                        <div class="item-input">
                            <input id="ksyy_sfzmhm" type="text" placeholder="请输入身份证明号码">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">流 水 号</div>
                        <div class="item-input">
                            <input id="ksyy_lsh" type="text" placeholder="请输入流水号">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">考试原因</div>
                        <div class="item-input">
                            <select id="ksyy_ksyy">
                            </select>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">考试科目</div>
                        <div class="item-input">
                            <select id="ksyy_kskm">
                            </select>
                        </div>
                    </div>
                </div>
            </li>

        </ul>
    </div>
    <div class="ft w100">
        <a class="ui_btn ui_btn_01 ui_radius ui_btn_block" id="ksyy_btn">
            查询
        </a>
    </div>
</form>
</body>
<script src="config/html/js/zepto.min.js"></script>
<script src="config/html/js/WISPComponents_v3.0.js"></script>
<script src="config/html/js/appConfig.js"></script>
<script src="config/html/js/common.js"></script>
<script src="config/html/js/query.js"></script>
<!--select组件-->
<script src="config/html/js/mobiscroll.all.js" type="text/javascript"></script>
<!--select组件 end-->
</html>