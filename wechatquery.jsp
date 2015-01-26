<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <meta content="telephone=no,email=no" name="format-detection"/>
    <title>快处查询</title>
    <link rel="stylesheet" href="config/html/lib/css/aio.css">
</head>
<body>
<form class="rigister_f c" data-mode="query_sgkc" action="" method="post" >
<div class="list-block J_btnHighlightWithInput">
    <ul>
        <li>
            <div class="item-content">
                <div class="item-media"><i class="icon icon-record"></i></div>
                <div class="item-inner">
                    <div class="item-title label">记 录 号</div>
                    <div class="item-input">
                        <input id="q_record" data-type="record" type="text" placeholder="请输入记录号">
                    </div>
                </div>
            </div>
        </li>
    </ul>
</div>
    <div class="ft w100">
        <a class="ui_btn ui_btn_01 ui_radius ui_btn_block ui_btn_01_disable" id="sgkc_btn">
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
</html>