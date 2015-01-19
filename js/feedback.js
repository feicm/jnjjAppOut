$(function () {
    var feedbackArea = $('#feedback_area');
    var feedbackBtn = $('#feedback_btn');
    var url = jnjjApp.config.requestUrl + "/wisp_jn_pubmgr/system/advice_saveAddAdvice?registername=";
    var username = App.LS.get("App_userName");
    if ( username === 'null' ) {
        url += jnjjApp.sider.info.roleid;
    } else {
        url += username;
    }
    feedbackArea.focus();
    feedbackBtn.on('click', function () {
        var progress;
        var text = feedbackArea.val();
        if ( text ) {
            progress = App.UI('dialog', {'msg': "正在提交"});
            App.getAjaxData(url, {"content": text}, function (data) {
                if ( data.success ) {
                    progress.resetMsg('提交成功');
                } else {
                    progress.resetMsg('提交失败');
                }
                setTimeout(function () {
                    progress.remove();
                }, 500)
            })
        } else {
            progress = App.UI('dialog', {'msg': "反馈内容不能为空！"});
            setTimeout(function () {
                progress.remove();
            }, 500)
        }
    })
    App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : feedbackBtn,
        "hoverClassName": 'ui_btn_01_hover'
    });
});