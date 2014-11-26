$(function () {
    console.log('module pwd js');
    var backpwdMethonSelect = $('#backpwd_methon'); //找回密码——下拉
    var backpwdBtn = $('#backpwd_btn');//找回密码——提交按钮
    var repwdBtn = $('#repwd_btn'); //密码修改--提交按钮
    //TODO 流程代码

    /*
     * --------------------页面效果------------------------
     * */
    if ( backpwdMethonSelect.length && backpwdBtn.length ) {   //密码找回
        backpwdMethonSelect.mobiscroll().select({ //下拉底部弹出
            theme   : 'ios7',
            lang    : 'zh',
            display : 'bottom',
            mode    : 'scroller',
            minWidth: 200
        });
        App.UI('toggleSelectBlock', {//下拉选项联动切换
            "dom": backpwdMethonSelect
        });
        App.UI('buttonHover', {//添加按钮点击效果
            "dom"           : backpwdBtn,
            "hoverClassName": 'ui_btn_01_hover'
        });
    }
    if(repwdBtn.length){  //密码修改
        App.UI('buttonHover', {//添加按钮点击效果
            "dom"           : repwdBtn,
            "hoverClassName": 'ui_btn_01_hover'
        });
    }
});