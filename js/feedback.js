$(function () {
    var feedbackArea=$('#feedback_area');
    var feedbackBtn=$('#feedback_btn');
    feedbackArea.focus();
    App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : feedbackBtn,
        "hoverClassName": 'ui_btn_01_hover'
    });
});