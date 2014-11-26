<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <title>密码修改</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/app_p.css">
</head>
<body>
<form class="rigister_f" action="" method="post" id="repwd_form">
    <div class="list-block">
        <ul>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">旧 密 码</div>
                        <div class="item-input">
                            <input id="repwd_old" type="password" placeholder="请输入旧密码">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">新 密 码</div>
                        <div class="item-input">
                            <input id="repwd_new" type="password" placeholder="请输入新密码">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">再次输入</div>
                        <div class="item-input">
                            <input id="repwd_new2" type="password" placeholder="请再次输入新密码">
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="ft w100">
        <a class="ui_btn ui_btn_01 ui_radius ui_btn_block" id="repwd_btn">
            确认修改
        </a>
    </div>
</form>
</body>
<script src="js/zepto.min.js"></script>
<script src="js/WISPComponents_v3.0.js"></script>
<script src="js/login.js"></script>
</html>