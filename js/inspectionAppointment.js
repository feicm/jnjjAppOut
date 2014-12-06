$(function () {
    /*
     * 年检预约
     * */
    var userName = App.LS.get('username');
    var urlPre = 'adapter?open&url=';
    var ksyytjRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/ksyytj.json';//预约资格认证请求地址
    var njyypcRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/njyypc.json';//根据日期返回批次请求地址
    var njyysjdRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/njyysjd.json';//选择的预约日期、检测地点查询检测时间段
    var njyyrkRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/njyyrk.json';//年检预约提交地址
    var carTypeRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/carType.json';//号牌种类请求地址
    var c1_btn = $('#c1_btn');//第一步，认证
    var c2_btn = $('#c2_btn');//第二步，返回上一步按钮
    var c3_btn = $('#c3_btn');//第二步，下一步按钮，隐藏
    var c4_btn = $('#c4_btn');//第三步，返回上一步按钮
    var njyySubmitbtn = $('#njyy_btn'); //提交按钮
    var njyyLogic = {
        "hpzl"                 : $('#hpzl'), //号牌种类
        "hphm"                 : $('#hphm'), //号牌号码
        "clsbdh"               : $('#clsbdh'),//车辆识别代号
        "name"                 : $('#name'), //联系人
        "phone"                : $('#phone'), //联系人电话
        "jcxcode"              : $('#jcxdz'),//检测线代码
        "yyrq"                 : $('#yyrq'), //预约日期
        "kxsjd"                : $('#kxsjd'), //可选时间段
        "date"                 : $('#date'), //日期
        "init"                 : function (opts) {
            this.firstBtn = opts.firstBtn || null;
            this.secondBtn = opts.secondsBtn || null;
            this.thirdBtn = opts.thirdBtn || null;
            this.lastBtn = opts.lastBtn || null;
            this.bindEvent('first');
        },
        "bindEvent"            : function (type) {
            var _self = this;
            var _firstBtn = _self.firstBtn;
            var _secondBtn = _self.secondBtn;
            var _thirdBtn = _self.thirdBtn;
            var _lastBtn = _self.lastBtn;
            switch ( type ) {
                case 'first':
                    _firstBtn.on('click', function () {
                        _self.firstListener(_firstBtn);
                    })
                    break;
                case 'last':
                    _lastBtn.on('click', function () {
                        _self.lastListener(_lastBtn);
                    })
                case 'dateItem':
                    $('#njyypc_list').on('click', 'li', function () {
                        _self.dateItemListener($(this));
                    })
                    break;
            }
        },
        "render"               : function (type, wrap, data) {
            var _self = this;
            var _type = type;
            var _data = data;
            var _wrap = wrap;
            var _html;
            switch ( _type ) {
                case 'list':
                    _html = _self.getHtml(_type, _data);
                    _wrap.append(_html);
                    break;
                case 'inputs':
                    var _aOption = [];
                    var _kxsjd = _self.kxsjd;
                    var _ip_jcxdz = $('#jcxdz');
                    var _ip_yyrq = $('#yyrq');
                    var _ip_rsxz = $('#rsxz');
                    var _ip_yyyrs = $('#yyyrs');
                    var _msg;
                    if ( data instanceof Array ) {
                        _msg = data[0];
                        _ip_jcxdz.val(_msg.glbm);
                        _ip_yyrq.val(_msg.blrq);
                        _ip_rsxz.val(_msg.rsxz);
                        _ip_yyyrs.val(_msg.yyrs);
                        _l = data.length;
                        for ( var i = 0; i < _l; i++ ) {
                            _aOption.push('<option value="' + data[i].blsj + '">' + data[i].blsj + '</option>');
                        }
                        _kxsjd.append(_aOption.join(''));
                        _kxsjd.mobiscroll().select({
                            theme   : 'ios7',
                            lang    : 'zh',
                            display : 'bottom',
                            mode    : 'scroller',
                            minWidth: 200
                        });
                        _self.bindEvent('last');
                    } else {
                        console.log('data格式错误');
                    }
            }
        },
        "getHtml"              : function (type, data) {
            var _self = this;
            var _html;
            var _l,
                _slist,
                _alist = [];
            switch ( type ) {
                case 'list':
                    if ( data instanceof Array ) {
                        _l = data.length;
                        for ( var i = 0; i < _l; i++ ) {
                            _slist = [
                                '<li data-code=' + data[i].jcxcode + '>',
                                '    <section class="ui-g-fly2-b">',
                                '        <h1>检测线地点：<b>' + data[i].jcx + '</b></h1>',
                                '        <h1>预约人数：<b>' + data[i].yyrs + '人</b></h1>',
                                '        <h1>人数限制：<b>' + data[i].rsxz + '人</b></h1>',
                                '    </section>',
                                '    <aside class="ui-g-fly0-b-r">',
                                '        <i class="icon01 icon01_arr_r"></i>',
                                '    </aside>',
                                '</li>'].join("");
                            _alist.push(_slist);
                        }
                    } else {
                        console.log('data格式错误');
                    }
                    break;
            }
            _html = _alist.join('');
            return _html;
        },
        "firstListener"        : function (btn) {
            var _self = this;
            var _ip_hpzl = _self.hpzl.val();
            var _ip_hphm = _self.hphm.val();
            var _ip_clsbdh = _self.clsbdh.val();
            var _ip_name = _self.name.val();
            var _ip_phone = _self.phone.val();
            var _opts = {};
            var _params;
            var _btn = btn || _self.firstBtn;
            _btn.off('click');
            _opts = {
                "hphm"  : $('#hphm'),
                "clsbdh": $('#clsbdh'),
                "name"  : $('#name'),
                "phone" : $('#phone')
            };
            if ( App.verify(_opts) ) {
                _params = {
                    "hpzl"    : _ip_hpzl,
                    "hphm"    : _ip_hphm,
                    "clsbdh"  : _ip_clsbdh,
                    "register": userName
                };
                Wisp.UI.progressDialog.show('预约资格审查中，请稍后！');
                //提交表单
                App.getAjaxData(ksyytjRequestUrl, _params, function (data) {
                    if ( data === 'error' ) {//ajax 失败回调
                        _self.bindEvent('first');
                        return;
                    }
                    if ( data.success ) {//审查通过
                        App.UI('changePage', {//年检预约切换效果
                            "wrap": $('#inspectionAppointment_form')
                        });
                        App.UI('buttonHover', {//添加按钮点击效果
                            "dom"           : _btn,
                            "hoverClassName": 'ui_btn_01_hover'
                        });
                        _btn.trigger('click');
                        //进入第二页
                        _self.date.on('change', function () {
                            _self.dateChangeValListener();
                        });
                    } else {//审查被拒
                        Wisp.UI.progressDialog.remove();
                        alert(data.msg);
                        _self.bindEvent('first');
                    }
                })
            }
        },
        "dateChangeValListener": function () {
            var _self = this;
            var _wrap = $('#njyypc_list');
            var _curVal = _self.date.val();
            var _params = {
                'register': userName,
                'yyrq'    : _curVal
            };
            Wisp.UI.progressDialog.show('预约批次查询中，请稍后！');
            App.getAjaxData(njyypcRequestUrl, _params, function (data) {
                if ( data.success ) {
                    _self.render('list', _wrap, data.msg);
                    _self.bindEvent('dateItem');
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert(data.msg);
                }
            })
        },
        "dateItemListener"     : function (target) {
            var _self = this;
            var _params;
            var _li = target;
            _self.thirdBtn.trigger('click');//触发下一步按钮
            //&yyrq=2014-10-12&jcxcode=370015
            _params = {
                'yyrq'   : _self.date.val(),
                'jcxcode': _li.attr('data-code')
            };
            Wisp.UI.progressDialog.show('预约时间段查询中，请稍后！');
            App.getAjaxData(njyysjdRequestUrl, _params, function (data) {
                if ( data.success ) {
                    _self.render('inputs', '', data.msg);
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert(data.msg);
                }
            })
        },
        "lastListener"         : function (btn) {
            /*hpzl	号牌种类
             hphm	号牌号码
             clsbdh	车辆识别代号
             lxdhhm	联系电话
             lxr	联系人
             yyblbm	预约检测线代码
             yyblrq	预约日期
             yyblsj	预约办理时间段代码
             * */
            var _self = this;
            var _btn = btn || _self.lastBtn;
            var _params = {
                'hpzl'  : _self.hpzl.val(),
                'hphm'  : _self.hphm.val(),
                'clsbdh': _self.clsbdh.val(),
                'lxdhhm': _self.phone.val(),
                'lxr'   : _self.name.val(),
                'yyblbm': _self.jcxcode.val(),
                'yyblrq': _self.yyrq.val(),
                'yyblsj': _self.kxsjd.val()
            };
            _btn.off('click');
            Wisp.UI.progressDialog.show('提交预约信息中，请稍后！');
            App.getAjaxData(njyyrkRequestUrl, _params, function (data) {
                if ( data.success ) {
                    Wisp.UI.progressDialog.remove();
                    alert(data.msg);
                    _self.bindEvent('last');
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert(data.msg);
                    _self.bindEvent('last');
                }
            })
        }
    };
    njyyLogic.init({
        firstBtn: c1_btn,
        thirdBtn: c3_btn,
        lastBtn : njyySubmitbtn
    });
    /*//第一步按钮事件，预约资格审查
    function c1_btnListener() {
        var ip_hpzl = $('#hpzl').val();
        var ip_hphm = $('#hphm').val();
        var ip_clsbdh = $('#clsbdh').val();
        var ip_name = $('#name').val();
        var ip_phone = $('#phone').val();
        var opts = {};
        var params;
        c1_btn.off('click');
        opts = {
            "hphm"  : $('#hphm'),
            "clsbdh": $('#clsbdh'),
            "name"  : $('#name'),
            "phone" : $('#phone')
        };
        if ( App.verify(opts) ) {
            params = {
                "hpzl"    : ip_hpzl,
                "hphm"    : ip_hphm,
                "clsbdh"  : ip_clsbdh,
                "register": userName
            };
            Wisp.UI.progressDialog.show('预约资格审查中，请稍后！');
            //提交表单
            App.getAjaxData(ksyytjRequestUrl, params, function (data) {
                if ( data === 'error' ) {//ajax 失败回调
                    c1_btn.on('click', c1_btnListener);
                    return;
                }
                if ( data.success ) {//审查通过
                    App.UI('changePage', {//年检预约切换效果
                        "wrap": $('#inspectionAppointment_form')
                    });
                    App.UI('buttonHover', {//添加按钮点击效果
                        "dom"           : c1_btn,
                        "hoverClassName": 'ui_btn_01_hover'
                    });
                    c1_btn.trigger('click');
                    //进入第二页
                    secInit();
                } else {//审查被拒
                    Wisp.UI.progressDialog.remove();
                    alert(data.msg);
                    c1_btn.on('click', c1_btnListener);
                }
            })
        }
    }

    //进入第二步，初始化函数
    function secInit() {
        var ip_date = $('#date');
        ip_date.on('change', dateChangeValListener);
    }

    function dateChangeValListener() {
        var curVal = $(this).val();
        var params = {
            'register': userName,
            'yyrq'    : curVal
        };
        Wisp.UI.progressDialog.show('预约批次查询中，请稍后！');
        App.getAjaxData(njyypcRequestUrl, params, function (data) {
            if ( data.success ) {
                renderList(data.msg);
            } else {
                Wisp.UI.progressDialog.remove();
                alert(data.msg);
            }
        })
    }

    //批次请求回调函数
    function renderList(data) {
        var l,
            slist,
            alist = [];
        var listWrap = $('#njyypc_list');
        if ( data instanceof Array ) {
            l = data.length;
            for ( var i = 0; i < l; i++ ) {
                slist = [
                    '<li data-code=' + data[i].jcxcode + '>',
                    '    <section class="ui-g-fly2-b">',
                    '        <h1>检测线地点：<b>' + data[i].jcx + '</b></h1>',
                    '        <h1>预约人数：<b>' + data[i].yyrs + '人</b></h1>',
                    '        <h1>人数限制：<b>' + data[i].rsxz + '人</b></h1>',
                    '    </section>',
                    '    <aside class="ui-g-fly0-b-r">',
                    '        <i class="icon01 icon01_arr_r"></i>',
                    '    </aside>',
                    '</li>'].join("");
                alist.push(slist);
            }
            listWrap.append(alist.join(''));
            bindItemEvent();
        } else {
            Wisp.UI.progressDialog.remove();
            alert('该天无预约批次，请选择其他日期');
        }
    }

    //批次列表项事件绑定
    function bindItemEvent() {
        var params;
        $('#njyypc_list').on('click', 'li', function () {
            c3_btn.trigger('click');//触发下一步按钮
            //&yyrq=2014-10-12&jcxcode=370015
            params = {
                'yyrq'   : $('#date').val(),
                'jcxcode': $(this).attr('data-code')
            };
            Wisp.UI.progressDialog.show('预约时间段查询中，请稍后！');
            App.getAjaxData(njyysjdRequestUrl, params, function (data) {
                if ( data.success ) {
                    renderContent(data.msg);
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert(data.msg);
                }
            })
        })
    }

    //渲染批次项返回结果
    function renderContent(data) {
        var l;
        var aOption = [];
        var kxsjd = $('#kxsjd');
        var ip_jcxdz = $('#jcxdz');
        var ip_yyrq = $('#yyrq');
        var ip_rsxz = $('#rsxz');
        var ip_yyyrs = $('#yyyrs');
        var msg;
        if ( data instanceof Array ) {
            msg = data[0];
            ip_jcxdz.val(msg.glbm);
            ip_yyrq.val(msg.blrq);
            ip_rsxz.val(msg.rsxz);
            ip_yyyrs.val(msg.yyrs);
            l = data.length;
            for ( var i = 0; i < l; i++ ) {
                aOption.push('<option value="' + data[i].blsj + '">' + data[i].blsj + '</option>');
            }
            kxsjd.append(aOption.join(''));
            kxsjd.mobiscroll().select({
                theme   : 'ios7',
                lang    : 'zh',
                display : 'bottom',
                mode    : 'scroller',
                minWidth: 200
            });
            njyySubmitbtn.on('click', njyySubmitbtnListener);
        } else {
            Wisp.UI.progressDialog.remove();
            alert('该批次时间段不存在！');
        }
    }

    //年检预约提交按钮事件
    function njyySubmitbtnListener() {
        *//*hpzl	号牌种类
         hphm	号牌号码
         clsbdh	车辆识别代号
         lxdhhm	联系电话
         lxr	联系人
         yyblbm	预约检测线代码
         yyblrq	预约日期
         yyblsj	预约办理时间段代码
         * *//*
        var params = {
            'hpzl'  : $('#hpzl').val(),
            'hphm'  : $('#hphm').val(),
            'clsbdh': $('#clsbdh').val(),
            'lxdhhm': $('#phone').val(),
            'lxr'   : $('#name').val(),
            'yyblbm': $('#jcxdz').val(),
            'yyblrq': $('#yyrq').val(),
            'yyblsj': $('#kxsjd').val()
        };
        njyySubmitbtn.off('click');
        Wisp.UI.progressDialog.show('提交预约信息中，请稍后！');
        App.getAjaxData(njyyrkRequestUrl, params, function (data) {
            if ( data.success ) {
                Wisp.UI.progressDialog.remove();
                alert(data.msg);
                njyySubmitbtn.on('click', njyySubmitbtnListener);
            } else {
                Wisp.UI.progressDialog.remove();
                alert(data.msg);
                njyySubmitbtn.on('click', njyySubmitbtnListener);
            }
        })
    }*/

    /*
     * --------------------页面效果------------------------
     * */
    App.UI('changePage', {//年检预约切换效果初始化
        "wrap": $('#inspectionAppointment_form')
    });

    App.UI('btnHighlightWithInput', {
        "btn"         : c1_btn,
        "inputs"      : $('.J_btnHighlightWithInput input'),
        "disableClass": 'ui_btn_01_disable'
    }, function (status, btn) {
        if ( status === 'enable' ) {
            App.UI('buttonHover', {//添加按钮点击效果
                "dom"           : btn,
                "hoverClassName": 'ui_btn_01_hover'
            });
            App.UI('changePage', {//注册页面切换效果
                "wrap": $('#rigister_form')
            });
            njyyLogic.bindEvent('first');
        }
        if ( status === 'disable' ) {
            App.UI('buttonHover', {//移除按钮点击效果
                "dom"           : btn,
                "hoverClassName": 'ui_btn_01_hover',
                "off"           : true
            });
            btn.off('click');
        }
    });
    var curr = new Date().getFullYear();
    $('#date').mobiscroll().date({
        theme     : 'ios7',
        lang      : 'zh',
        display   : 'bottom',
        mode      : 'scroller',
        dateFormat: 'yy-mm-dd',
        startYear : curr,
        endYear   : curr + 5
    });

    App.UI('select', {
        "dom"     : $('#hpzl'),
        "url"     : carTypeRequestUrl,
        "dataType": 'Object'
    });
    App.UI('inputClose', {//页面输入校验
        "doms": $('.list-block')
    });
});