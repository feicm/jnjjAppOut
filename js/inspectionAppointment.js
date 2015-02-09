$(function () {
    /*
     * 年检预约
     * */
    if ( !App.addOnlineStatusListener() ) { //添加网络状态检测
        return false
    }
    var userName = App.LS.get('App_userName');
    var urlPre = 'adapter?open&url=';
    var ksyytjRequestUrl = jnjjApp.config.requestUrl
        + '/jnpublic/ksyytj.json';//预约资格认证请求地址
    var njyypcRequestUrl = jnjjApp.config.requestUrl
        + '/jnpublic/njyypc.json';//根据日期返回批次请求地址
    var njyysjdRequestUrl = jnjjApp.config.requestUrl
        + '/jnpublic/njyysjd.json';//选择的预约日期、检测地点查询检测时间段
    var njyyrkRequestUrl = jnjjApp.config.requestUrl
        + '/jnpublic/njyyrk.json';//年检预约提交地址
    var carTypeRequestUrl = jnjjApp.config.requestUrl
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
        "curDate"              : null,
        "progressDialog"       : null,
        "baseDomain"           : App.LS.get('App_baseDomain'), //从本地存储中获取当前域
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
                    $('#njyypc_list li').on('click', function () {
                        var $this = $(this);
                        _self.dateItemListener($this);
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
                        _kxsjd.mobiscroll().destroy();
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
                        _self.progressDialog.remove();
                        _self.bindEvent('last');
                        window.scrollTo(0,0);
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
                                '<li class="list_hover" data-code=' + data[i].jcxcode + '>',
                                '    <section class="ui-g-fly2-b">',
                                '        <h1 class="txt02">预约人数<b class="fr">' + data[i].yyrs + '人</b></h1>',
                                '        <h1 class="txt02">人数限制<b class="fr">' + data[i].rsxz + '人</b></h1>',
                                '        <div class="txt02">',
                                '            <h2>检测线地点</h2>',
                                '            <p>' + data[i].jcx + '</p>',
                                '        </div>',
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
                    "hpzl"      : _ip_hpzl,
                    "hphm"      : 'A' + _ip_hphm,
                    "clsbdh"    : _ip_clsbdh,
                    "register"  : userName,
                    "baseDomain": _self.baseDomain
                };
                //Wisp.UI.progressDialog.show('预约资格审查中，请稍后！');
                _self.progressDialog = App.UI('dialog', {msg: '预约资格审查中，请稍后！'});
                //提交表单
                App.getAjaxData(ksyytjRequestUrl, _params, function (data) {
                    if ( data === 'error' ) {//ajax 失败回调
                        _self.progressDialog.remove();
                        App.UI('dialog', {
                            type : 'alert',
                            title: '公众服务平台',
                            msg  : '资格审查失败！'
                        });
                        _self.bindEvent('first');
                        return;
                    }
                    if ( data.cgsCommonResponse.msg === '该车允许预约！' ) {//审查通过
                        //Wisp.UI.progressDialog.remove();//debug
                        _self.progressDialog.remove();
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
                        //Wisp.UI.progressDialog.remove();
                        _self.progressDialog.remove();
                        App.UI('dialog', {
                            type : 'alert',
                            title: '公众服务平台',
                            msg  : data.cgsCommonResponse.msg
                        });
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
                'register'  : userName,
                'yyrq'      : _curVal,
                "baseDomain": _self.baseDomain
            };
            //Wisp.UI.progressDialog.show('预约批次查询中，请稍后！');
            _self.progressDialog = App.UI('dialog', {msg: '预约批次查询中，请稍后！'});
            App.getAjaxData(njyypcRequestUrl, _params, function (data) {
                if ( data === 'error' ) {//ajax 失败回调
                    _self.progressDialog.remove();
                    App.UI('dialog', {
                        type : 'alert',
                        title: '公众服务平台',
                        msg  : '批次查询失败！'
                    });
                    _self.bindEvent('dateItem');
                    return;
                }
                if ( data.cgsCommonResponse.cgsCommonList ) {
                    //Wisp.UI.progressDialog.remove();
                    _self.progressDialog.remove();
                    _self.render('list', _wrap, data.cgsCommonResponse.cgsCommonList);
                    _self.bindEvent('dateItem');
                    _self.resetHeight(_wrap);
                    _self.curDate = _curVal;
                } else {
                    //Wisp.UI.progressDialog.remove();
                    _self.progressDialog.remove();
                    App.UI('dialog', {
                        type : 'alert',
                        title: '公众服务平台',
                        msg  : data.cgsCommonResponse.msg
                    });
                }
            })
        },
        "dateItemListener"     : function (target) {
            var _self = this;
            var _params;
            var _li = target;
            target.off('click');
            _self.thirdBtn.trigger('click');//触发下一步按钮
            //&yyrq=2014-10-12&jcxcode=370015
            _params = {
                'yyrq'      : _self.curDate,
                'jcxcode'   : _li.attr('data-code'),
                "baseDomain": _self.baseDomain
            };
            _self.progressDialog = App.UI('dialog', {msg: '预约时间段查询中，请稍后！'});
            App.getAjaxData(njyysjdRequestUrl, _params, function (data) {
                if ( data === 'error' ) {//ajax 失败回调
                    _self.progressDialog.remove();
                    App.UI('dialog', {
                        type : 'alert',
                        title: '公众服务平台',
                        msg  : '预约时间段查询失败！'
                    }, function () {
                        c4_btn.trigger('click');
                    });

                }
                if ( data.cgsCommonResponse.msg!=='本检测站当天已经超过可预约时间范围，不能够预约。' ) {
                    _self.render('inputs', '', data.cgsCommonResponse.cgsCommonList);
                } else {
                    _self.progressDialog.remove();
                    App.UI('dialog', {
                        type : 'alert',
                        title: '公众服务平台',
                        msg  : data.cgsCommonResponse.msg
                    }, function () {
                        c4_btn.trigger('click');
                    });
                }
                target.on('click', function () {
                    _self.dateItemListener($(this));
                });
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
            //Wisp.UI.progressDialog.show('提交预约信息中，请稍后！');
            _self.progressDialog = App.UI('dialog', {msg: '提交预约信息中，请稍后！'});
            App.getAjaxData(njyyrkRequestUrl, _params, function (data) {
                if ( data === 'error' ) {//ajax 失败回调
                    _self.progressDialog.remove();
                    App.UI('dialog', {
                        type : 'alert',
                        title: '公众服务平台',
                        msg  : '提交失败！'
                    }, function (status) {
                        status === 'OK' && c4_btn.trigger('click');
                    });

                }
                if ( data.success ) {
                    //Wisp.UI.progressDialog.remove();
                    _self.progressDialog.remove();
                    App.UI('dialog', {
                        type : 'alert',
                        title: '公众服务平台',
                        msg  : data.msg
                    });
                    _self.bindEvent('last');
                } else {
                    //Wisp.UI.progressDialog.remove();
                    _self.progressDialog.remove();
                    App.UI('dialog', {
                        type : 'alert',
                        title: '公众服务平台',
                        msg  : data.msg
                    });
                    _self.bindEvent('last');
                }
            })
        },
        "resetHeight"          : function (wrap) {
            var _self = this;
            var _h = wrap.height() - 0 + 200;
            var _form = wrap.parents('form');
            _form.height(_h);
        }
    };
    njyyLogic.init({
        firstBtn: c1_btn,
        thirdBtn: c3_btn,
        lastBtn : njyySubmitbtn
    });

    /*
     * --------------------页面效果------------------------
     * */
    App.UI('changePage', {//年检预约切换效果初始化
        "wrap": $('#inspectionAppointment_form')
    });

    App.UI('btnHighlightWithInput', {
        "btn"         : c1_btn,
        "inputs"      : $('.J_btnHighlightWithInput input'),
        "disableClass": 'ui_btn_01_disable',
        "hoverClass"  : 'ui_btn_01_hover'
    }, function (btn) {
        App.UI('changePage', {//注册页面切换效果
            "wrap": $('#rigister_form')
        });
        njyyLogic.bindEvent('first');
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
    App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : c2_btn,
        "hoverClassName": 'ui_btn_01_hover'
    });
    App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : c4_btn,
        "hoverClassName": 'ui_btn_01_hover'
    });
    App.UI('buttonHover', {//添加按钮点击效果
        "dom"           : njyySubmitbtn,
        "hoverClassName": 'ui_btn_01_hover'
    });
    App.UI('select', {
        "dom"   : $('#hpzl'),
        "url"   : carTypeRequestUrl + '?baseDomain=' + App.LS.get('App_baseDomain'),
        "module": "carType"
    });
    App.UI('inputClose', {//页面输入校验
        "doms": $('.list-block')
    });
});