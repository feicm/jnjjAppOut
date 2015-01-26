    <%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
        <meta content="telephone=no,email=no" name="format-detection" />
        <title>车辆绑定</title>
        <link rel="stylesheet" href="config/html/lib/css/aio.css">
        </head>
        <body>
        <div class="c" data-mode='bindcar'>
        <form class="rigister_f" action="" method="post">
        <div class="list-block J_btnHighlightWithInput">
        <ul>
        <li>
        <div class="item-content">
        <div class="item-media"><i class="icon icon-user-men"></i></div>
        <div class="item-inner">
        <div class="item-title label">车主姓名</div>
        <div class="item-input">
        <input id="name" data-type="cnuser" type="text" placeholder="请输入车主姓名">
        </div>
        </div>
        </div>
        </li>
        <li>
        <div class="item-content">
        <div class="item-media"><i class="icon icon-carnum"></i></div>
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
        <div class="item-media"><i class="icon icon-cardnum"></i></div>
        <div class="item-inner">
        <div class="item-title label">身份证号</div>
        <div class="item-input">
        <input id="idnum" data-type="card" type="text" placeholder="请输入身份证号">
        </div>
        </div>
        </div>
        </li>
        <li>
        <div class="item-content">
        <div class="item-media"><i class="icon icon-phone3"></i></div>
        <div class="item-inner">
        <div class="item-title label">手 机 </div>
        <div class="item-input">
        <input id="phone" data-type="mobile" type="text" placeholder="请输入手机号码" />
        </div>
        </div>
        </div>
        </li>
        </ul>
        </div>
        <div class="ft w100">
        <a class="ui_btn ui_btn_01 ui_radius ui_btn_block ui_btn_01_disable" id="bindinfo_btn">
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
        <script src="config/html/js/bind.js"></script>
        <!--select组件-->
        <script src="config/html/js/mobiscroll.all.js"></script>
        <!--select组件 end-->
        </html>