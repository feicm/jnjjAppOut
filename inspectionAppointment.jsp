    <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <meta content="telephone=no,email=no" name="format-detection" />
    <title>年检预约</title>
    <link rel="stylesheet" href="config/html/css/reset.css">
    <link rel="stylesheet" href="config/html/css/app_p.css">
    <!--select组件 css-->
    <link href="config/html/css/mobiscroll.scroller.css" rel="stylesheet" type="text/css"/>
    <link href="config/html/css/mobiscroll.scroller.ios7.css" rel="stylesheet" type="text/css"/>
    <link href="config/html/css/mobiscroll.animation.css" rel="stylesheet" type="text/css"/>
    <!--select组件 css end-->
</head>
<body>
<form class="c" action="" method="post" id="inspectionAppointment_form">
    <div class="rigister_f">
        <div class="list-block J_btnHighlightWithInput">
            <ul>
                <li>
                    <div class="item-content">
                    <div class="item-media"><i class="icon icon-cartype"></i></div>
                        <div class="item-inner select">
                            <div class="item-title label">号牌种类</div>
                            <div class="item-input">
                                <select id="hpzl">
                                </select>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                    <div class="item-media"><i class="icon icon-carnum2"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">号牌号码</div>
                            <div class="item-input">
                                <em class="preText">鲁A</em>
                                <input id="hphm" data-type="car" type="text" placeholder="请输入车牌号码">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-clsbdh"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">车识别号</div>
                            <div class="item-input">
                                <input id="clsbdh" data-type="car2" type="text" placeholder="请输入车辆识别代号">
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="list-block J_btnHighlightWithInput">
            <ul>
                <li>
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-user"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">联 系 人 </div>
                            <div class="item-input">
                                <input id="name" data-type="cnuser" type="text" placeholder="请输入联系人姓名">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-phone4"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">联系电话</div>
                            <div class="item-input">
                                <input id="phone" data-type="mobile" type="text" placeholder="请输入联系电话">
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="ft w100">
            <a class="ui_btn ui_btn_01 ui_radius ui_btn_block ui_btn_01_disable" data-rel='next' id="c1_btn">
                下一步
            </a>
        </div>
    </div>
    <div class="rigister_f" style="opacity: 0">
        <div class="list-block">
            <ul>
                <li>
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-calendar2"></i></div>
                        <div class="item-inner select">
                            <div class="item-title label">预约日期</div>
                            <div class="item-input">
                                <input id="date" type="text" placeholder="请选择预约日期" readonly>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <ul class="ui-list ui-list-02" id='njyypc_list'>

        </ul>
        <div class="ft w100">
            <a class="ui_btn ui_btn_01 ui_radius ui_btn_block" data-rel='pre' id="c2_btn">
                上一步
            </a>
            <a class="ui_btn ui_btn_01 ui_radius ui_btn_block" data-rel='next' id="c3_btn" style='display:none'>
                下一步
            </a>
        </div>
    </div>
    <div class="rigister_f" style="opacity: 0">
        <div class="list-block">
            <ul>
                <li>
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-position2"></i></div>
                        <div class="item-inner">
                            <div class="item-title label w6">检测线地址</div>
                            <div class="item-input">
                                <input id="jcxdz" disabled type="text">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-calendar2"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">预约日期</div>
                            <div class="item-input">
                                <input id="yyrq" type="text" disabled>
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
                        <div class="item-media"><i class="icon icon-time"></i></div>
                        <div class="item-inner select">
                            <div class="item-title label w6">可选时间段</div>
                            <div class="item-input">
                                <select id="kxsjd"></select>
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
                        <div class="item-media"><i class="icon icon-nail"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">人数限制</div>
                            <div class="item-input">
                                <input id="rsxz" type="text" disabled>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-pen"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">已预约人数</div>
                            <div class="item-input">
                                <input id="yyyrs" type="text" disabled>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="ft w100">
            <a class="ui_btn ui_btn_01 ui_radius fl" data-rel='pre' id="c4_btn">
                上一步
            </a>
            <a class="ui_btn ui_btn_01 ui_radius fr" id="njyy_btn">
                确认预约
            </a>
        </div>
    </div>
</form>
</body>
<script src="config/html/js/zepto.min.js"></script>
<script src="config/html/js/WISPComponents_v3.0.js"></script>
<script src="config/html/js/appConfig.js"></script>
<script src="config/html/js/common.js"></script>
<script src="config/html/js/inspectionAppointment.js"></script>
<!--select组件-->
<script src="config/html/js/mobiscroll.all.js" type="text/javascript"></script>
<!--select组件 end-->
</html>