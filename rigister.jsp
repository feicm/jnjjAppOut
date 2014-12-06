<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <meta content="telephone=no,email=no" name="format-detection" />
    <title>注册</title>
    <link rel="stylesheet" href="config/html/css/reset.css">
    <link rel="stylesheet" href="config/html/css/app_p.css">
</head>
<body>

<form class="c" action="" method="post" id="rigister_form">
    <div class="rigister_f">
        <div class="list-block">
            <ul>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">用 户 名</div>
                            <div class="item-input">
                                <input id="setusername" data-type="user" type="text" placeholder="请输入用户名">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">密 码</div>
                            <div class="item-input">
                                <input id="setpwd_01" data-type="psd" type="password" placeholder="请设置您的密码">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">确认密码</div>
                            <div class="item-input">
                                <input id="setpwd_02" data-type="psd" type="password" placeholder="请再次输入您的密码">
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
                        <div class="item-inner">
                            <div class="item-title label">姓 名</div>
                            <div class="item-input">
                                <input id="setname" data-type="cnuser" type="text" placeholder="请输入您的姓名">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">手 机</div>
                            <div class="item-input">
                                <input id="setphone" data-type="mobile" type="text" placeholder="请输入您的手机号码">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">身份证号</div>
                            <div class="item-input">
                                <input id="setidnum" data-type="card" type="text" placeholder="请输入您的身份证号">
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="ft w100">
            <a class="ui_btn ui_btn_01 ui_radius ui_btn_block" data-rel='next' id="c1_btn">
                下一步
            </a>
        </div>
    </div>
    <div class="rigister_f">
        <div class="ipt_lable">
            移车联系人信息<b class="color_01">(选填)</b>
        </div>
        <div class="list-block">
            <ul>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">姓 名</div>
                            <div class="item-input">
                                <input id="yclxxm" data-type="cnuser" type="text" placeholder="请输入移车联系姓名">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">手 机</div>
                            <div class="item-input">
                                <input id="yclxdh" data-type="mobile" type="text" placeholder="请输入移车联系人电话">
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
                        <div class="item-inner">
                            <div class="item-title label">邮 箱</div>
                            <div class="item-input">
                                <input id="setemail" data-type="mail" type="text" placeholder="请输入邮箱名">
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="ipt_lable">
            密切联系人信息<b class="color_01">(选填)</b>
        </div>
        <div class="list-block">
            <ul>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">姓 名</div>
                            <div class="item-input">
                                <input id="mqlxrxm" data-type="cnuser" type="text" placeholder="请输入密切联系人姓名">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">手 机</div>
                            <div class="item-input">
                                <input id="mqlxrdh" data-type="mobile" type="text" placeholder="请输入密切联系人电话">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">身份证号</div>
                            <div class="item-input">
                                <input id="mqlxrsfzh" data-type="card" type="text" placeholder="请输入密切联系人身份证号">
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="ft w100">
            <a class="ui_btn ui_btn_01 ui_radius fl" data-rel='pre' id="c2_btn">
                上一步
            </a>
            <a class="ui_btn ui_btn_01 ui_radius fr" id="submit_rigister">
                提交
            </a>
            <b class="txt01">注册即视为同意《济南交警用户注册协议》</b>
        </div>
    </div>

</form>
</body>
<script src="config/html/js/zepto.min.js"></script>
<script src="config/html/js/WISPComponents_v3.0.js"></script>
<script src="config/html/js/appConfig.js"></script>
<script src="config/html/js/common.js"></script>
<script src="config/html/js/login.js"></script>
</html>