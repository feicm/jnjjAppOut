var App = (function () {
    function UI(name, opts, callback) {
        var changePage = {
            "init"       : function () {
                this.name = name;
                opts.wrap && (this.wrap = opts.wrap);
                this.currentpage = this.wrap.children().eq(0);
                this.initDomFlag();
                callback && (this.callback = callback);
            },
            "initDomFlag": function () {
                var self = this;
                var wrap = self.wrap;
                var childrenList = wrap.children();
                var l = childrenList.length;
                wrap.css('position', 'relative');
                childrenList.each(function (index) {
                    var Index = index - 0;
                    var left = Index * 100 + '%';
                    $(this).attr('id', "page_" + Index);
                    $(this).css({
                        "position": 'absolute',
                        "left"    : left,
                        "top"     : 0
                    });
                });
                childrenList.each(function (index) {
                    var Index = index;
                    var btns = $(this).find(".ui_btn[data-rel]");
                    btns.each(function (index) {
                        if ( $(this).attr("data-rel") === 'pre' ) {
                            self.bindEvent($(this), Index, Index - 1);
                        }
                        if ( $(this).attr("data-rel") === 'next' ) {
                            self.bindEvent($(this), Index, Index + 1);
                        }
                    });
                });
            },
            "bindEvent"  : function (dom, currentpage, gopage) {
                var self = this;
                var btn = dom;
                var cur_page = $('#page_' + currentpage);
                var go_page = $('#page_' + gopage);
                if ( currentpage > gopage ) {
                    //点击后退
                    btn.on('click', function () {
                        console.log('go back');
                        self.toggle(cur_page, go_page, "right");
                    });
                } else {
                    //点击前进
                    btn.on('click', function () {
                        console.log('go ahead');
                        self.toggle(cur_page, go_page, "left");
                    });
                }
            },
            "toggle"     : function (curpage, gopage, action) {
                switch ( action ) {
                    case 'left':
                        curpage.animate({
                            left: '-100%'
                        }, 500, 'ease-out');
                        gopage.animate({
                            left: '0'
                        }, 500, 'ease-out');
                        break;
                    case 'right':
                        curpage.animate({
                            left: '100%'
                        }, 500, 'ease-out');
                        gopage.animate({
                            left: '0'
                        }, 500, 'ease-out');
                        break;
                }

            }
        };
        var inputClose = {
            "tipsMap"     : {
                "card"   : '身份证号格式错误！',
                "mail"   : '邮箱格式错误！',
                "user"   : '用户名含6-11位的数字或字母',
                "cnuser" : '姓名含1-20字',
                "psd"    : '请输入6-20位的密码！',
                "mobile" : '手机号码格式错误！',
                "car"    : '车牌号码格式错误',
                "archive": '档案编号12位纯数字',
                "car2"   : '车辆识别代号17位'
            },
            "init"        : function () {
                this.doms = opts.doms;
                this.render();
                this.bindEvent();
            },
            "render"      : function () {
                var self = this;
                var inputWrap;
                var closeHtml = '<a class="close">X</a>';
                self.doms.each(function (index) {
                    inputWrap = $(this).find('.item-input');
                    inputWrap.append(closeHtml);
                });
            },
            "bindEvent"   : function () {
                var self = this;
                var value;
                var inputWrap;
                //console.dir(self.doms);
                self.doms.each(function (index) {
                    inputWrap = $(this).find('.item-input');
                    inputWrap.each(function (index) {
                        var close;
                        var input;
                        var type;
                        var result;
                        var tipstxt;
                        var value;
                        var edit;
                        input = $(this).find('input');
                        close = $(this).find('a.close');
                        edit = $(this).find('b.edit');
                        edit.length && close.css('right', '35px');
                        close.on('click', function () {
                            var curInput = $(this).parent().children('input');
                            curInput.val('');
                            $(this).css('display', 'none');
                        })
                        input.on('focus', function (e) {
                            //console.log('focus');
                            close.css('display', 'block');
                        })
                        input.on('blur', function (e) {
                            //console.log('blur')
                            type = $(this).attr('data-type');
                            value = $(this).val();
                            if ( type ) {
                                result = self.validationer(type, value);
                                if ( !result ) { //没验证通过，弹出提示
                                    tipstxt = self.tipsMap[type];
                                    self.popTips($(this), tipstxt);
                                } else {//验证通过，原有提示，则移除
                                    self.removeTips($(this));
                                }
                            }
                            !value && close.css('display', 'none');
                        })
                    })
                });
            },
            "validationer": function (type, value) {
                var result;
                switch ( type ) {
                    case "card":
                        result = cidInfo(value);
                        break;
                    case "mail":
                        result = isEmail(value);
                        break;
                    case "user":
                        result = isENUser(value);
                        break;
                    case "cnuser":
                        result = isCNUser(value);
                        break;
                    case "psd":
                        result = ispsd(value);
                        break;
                    case "mobile":
                        result = isMonbile(value);
                        break;
                    case "car":
                        result = iscarid(value);
                        break;
                    case "archive":
                        result = isArchiveid(value);
                        break;
                    case "car2":
                        result = iscarid2(value);
                        break;
                    default:
                        console.log('这是一个彩蛋，买彩票去吧！');
                }
                return result;
            },
            "popTips"     : function (cur_input, txt) {
                var self = this;
                var wrap = cur_input.parent();
                var tipshtml = '<b class="tips">' + txt + '</b>';
                var tipsdom = wrap.find('.tips');
                if ( tipsdom.length ) return;
                wrap.append(tipshtml);
            },
            "removeTips"  : function (cur_input) {
                var wrap = cur_input.parent();
                var tipsdom = wrap.find('.tips');
                tipsdom && tipsdom.remove();//有提示则移除
            }
        };
        var buttonHover = {
            "init"       : function () {
                this.dom = opts.dom;
                opts.hoverClassName && (this.hoverClassName = opts.hoverClassName);
                this.off = opts.off || false;
                !this.off && this.bindEvent();
                this.off && this.removeEvent();
            },
            "bindEvent"  : function (e) {
                var _self = this;
                var _dom = _self.dom;
                var _classname = _self.hoverClassName;
                _dom.on('touchstart', function () {
                    $(this).addClass(_classname);
                });
                _dom.on('touchend', function () {
                    $(this).removeClass(_classname);
                });
            },
            "removeEvent": function () {
                var _self = this;
                var _dom = _self.dom;
                _dom.off('touchstart');
                _dom.off('touchend');
            }
        };
        var select = {
            "init"      : function () {
                this.dom = opts.dom;
                this.url = opts.url;
                this.dataType = opts.dataType || null;
                this.params = opts.data;
                this.module = opts.module || null;
                this.callback = callback || null;
                var _self = this;
                getAjaxData(_self.url, _self.params, function (data) {
                    _self.initSelect(data);
                });
            },
            "initSelect": function (data) {
                var _self = this;
                var list;
                var selectArr = [];
                var selectStr;
                var _module = _self.module;
                data.msg && (list = data.msg);
                data[_module+'QueryResponse'] && (list = data[_module+'QueryResponse'][_module+'List']);
                if ( _self.dataType === 'Object' ) {
                    for ( var j in list ) {
                        selectArr.push("<option value='" + list[j].key + "'>" + list[j].name + "</option>");
                    }
                }
                /* 违法抓拍地点*/
                else if ( _self.dataType === 'Wfddbh' ) {
                    for ( var j in list ) {
                        selectArr.push("<option value='" + list[j].ddbh + "'>" + list[j].ddmc + "</option>");
                    }
                }
                if ( _module ) {
                    if ( _module === 'car' ) {  //按车辆
                        for ( var j in list ) {
                            selectArr.push("<option value='" + list[j].carNumType + "'>" + list[j].carid + "</option>");
                        }
                    }
                    if ( _module === 'card' ) {
                        for ( var j in list ) { //按驾照
                            selectArr.push("<option value='" + list[j].licenseid + "'>" + list[j].licenseName + "</option>");
                        }
                    }
                    if ( !list.length ) {
                        selectArr.push("<option>未绑定</option>");
                        selectStr = selectArr.join('');
                        _self.dom.append(selectStr);
                        _self.dom.attr('disabled', 'disabled');
                        return;
                    }
                }
                selectStr = selectArr.join('');
                _self.dom.append(selectStr);
                selectStr && _self.dom.mobiscroll().select({
                    theme   : 'ios7',
                    lang    : 'zh',
                    display : 'bottom',
                    mode    : 'scroller',
                    minWidth: 200
                });
                _self.callback && _self.callback();
            }
        };
        var tabToggle = {
            "init"     : function () {
                this.dom = opts.dom;
                this.activeClass = opts.activeClass;
                this.defaultClass = opts.defaultClass || null;
                this.bindEvent();
            },
            "bindEvent": function (e) {
                var _self = this;
                var _activeClass = _self.activeClass;
                var _defaultClass = _self.defaultClass;
                var tabItem = _self.dom.children();
                tabItem.each(function (index) {
                    $(this).on('click', function (e) {
                        var me = $(this);
                        var dataFor = me.attr('data-for');
                        var currentTabContent = $('#' + dataFor);
                        if ( me.hasClass(_activeClass) ) {
                            _defaultClass && me.removeClass(_defaultClass);
                        }
                        me.addClass(_activeClass);
                        currentTabContent.show();
                        tabItem.each(function (index) {
                            var me = $(this);
                            if ( me.attr('data-for') !== dataFor ) {
                                me.removeClass(_activeClass);
                                _defaultClass && me.addClass(_defaultClass);
                                $('#' + me.attr('data-for')).hide();
                            }
                        });
                    });
                });
            }
        };
        var toggleSelectBlock = {
            "curBlock"   : null,
            "init"       : function () {
                this.dom = opts.dom;
                this.bindEvent();
            },
            "bindEvent"  : function () {
                var _self = this;
                var _val = _self.dom.val();
                _self.dom.on('change', function (e) {
                    var selcetVal = $(this).val();
                    _self.toggleBlock(selcetVal);
                });
                _val && _self.toggleBlock(_val);
            },
            "toggleBlock": function (targetid) {
                if ( !targetid ) return;
                var _self = this;
                var _targetBlock = $('#' + targetid);
                if ( this.curBlock && (this.curBlock.selector === _targetBlock.selector) ) return;
                this.curBlock && this.curBlock.hide('linear');
                _targetBlock.show('linear');
                this.curBlock = _targetBlock;
            }
        };
        var moduleNameMap = {
            "changePage"       : changePage,
            "inputClose"       : inputClose,
            "buttonHover"      : buttonHover,
            "tabToggle"        : tabToggle,
            "select"           : select,
            "toggleSelectBlock": toggleSelectBlock
        };
        name && moduleNameMap[name].init();
    }

    /*
     * 操作cookie
     * */
    var Cookie = {
        "SetCookie"   : function (name, value, expires) {
            var argv = arguments;
            var argc = arguments.length;
            var expires = (argc > 2) ? argv[2] : null;
            var path = (argc > 3) ? argv[3] : null;
            var domain = (argc > 4) ? argv[4] : null;
            var secure = (argc > 5) ? argv[5] : false;
            document.cookie = name + "=" + escape(value) + ((expires == null) ?
                "" : ("; expires=" + expires.toGMTString())) + ((path == null) ?
                "" : ("; path=" + path)) + ((domain == null) ?
                "" : ("; domain=" + domain)) + ((secure == true) ?
                "; secure" : "");
        },
        "GetCookie"   : function (name) {
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while ( i < clen ) {
                var j = i + alen;
                //alert(j);
                if ( document.cookie.substring(i, j) == arg ) return this.getCookieVal(j);
                i = document.cookie.indexOf(" ", i) + 1;
                if ( i == 0 ) break;
            }
            return null;
        },
        "getCookieVal": function (offset) {
            var endstr = document.cookie.indexOf(";", offset);
            if ( endstr == -1 ) endstr = document.cookie.length;
            return unescape(document.cookie.substring(offset, endstr));
        },
        "ResetCookie" : function () {
            var usr = document.getElementById('username').value;
            var expdate = new Date();
            this.SetCookie(usr, null, expdate);
        }
    };
    //ajax 请求封装
    function getAjaxData(url, params, callback, type) {
        $.ajax({ //登录验证请求
            type    : type || 'GET',
            url     : url,
            data    : params,
            dataType: 'json'
        }).done(function (data) {//登录表单提交
            if ( data ) {//验证返回数据
                callback && callback(data);
            }
        }).fail(function (data) {
            alert('数据请求失败，请检查网络连接！');
            history.go(0);
        });
    }

    //hash
    function getHash(str) {
        var oHash = {},
            aHash = [],
            aItem,
            l;
        aHash = str.split('#');
        l = aHash.length;
        for ( var i = 1; i < l; i++ ) {
            aItem = aHash[i].split('=');
            oHash[aItem[0]] = aItem[1];
        }
        return aHash;
    }

    //车辆识别代号号检测
    function iscarid2(str) {
        var reg = /^[a-zA-Z0-9]{17}$/;
        return reg.test(str);
    }

    //档案号检测
    function isArchiveid(str) {
        var reg = /^\d{12}$/;
        return reg.test(str);
    }

    //号牌号码
    function iscarid(str) {
        var reg = /^[a-zA-Z0-9]{5}$/;
        return reg.test(str);
    }

    //手机号
    function isMonbile(str) {
        var reg = /^(13[0-9]|15[0|2|3|5|6|7|8|9]|18[0|5|6|8|9]|177)\d{8}$/;
        return reg.test(str);
    }

    //中文名
    function isCNUser(str) {
        var reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9]){1,20}$/;
        return reg.test(str);
    }

    //英文名字母、数字
    function isENUser(str) {
        var reg = /^[a-zA-Z0-9]{6,11}$/;
        return reg.test(str);
    }

    //密码
    function ispsd(str) {
        var reg = /^\S{6,20}$/;
        return reg.test(str);
    }

    //邮箱
    function isEmail(str) {
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        return reg.test(str);
    }

    //身份证检测
    function cidInfo(sId) {
        var aCity = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        };
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        var iSum = 0;
        if ( reg.test(sId) === false )return false;
        sId = sId.replace(/x$/i, "a");
        if ( aCity[parseInt(sId.substr(0, 2))] == null )return false;
        sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
        var d = new Date(sBirthday.replace(/-/g, "/"));
        if ( sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()) )return false;
        for ( var i = 17; i >= 0; i-- )iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
        if ( iSum % 11 != 1 )return false;
        return true;
    }

    //验证必填项
    /*var opts = {
     "username": $('#setusername'),//用户名
     "pwd1"    : $('#setpwd_01'),//密码1
     "pwd2"    : $('#setpwd_02'),//密码2
     "name"    : $('#setname'),//姓名
     "phone"   : $('#setphone'),//手机
     "idnum"   : $('#setidnum')//身份证
     };*/
    function verify(opts) {
        console.dir(opts);
        if ( opts.username && (opts.username.val() === '' || opts.username.parent().find('.tips').length) ) {
            alert('提交失败！（请检查您的用户名）');
            return false;
        }
        if ( opts.pwdold && (opts.pwdold.val() === '' || opts.pwdold.parent().find('.tips').length) ) {
            alert('提交失败！（请检查您的旧用户名）');
            return false;
        }
        if ( opts.pwd1
            && opts.pwd2
            && (opts.pwd1.val() === ''
            || opts.pwd2.val() === ''
            || opts.pwd1.parent().find('.tips').length
            || opts.pwd2.parent().find('.tips').length ) ) {
            alert('提交失败！（请检查您的密码）');
            return false;
        }
        if ( opts.pwdnew1
            && opts.pwdnew2
            && (opts.pwdnew1.val() === ''
            || opts.pwdnew2.val() === ''
            || opts.pwdnew1.parent().find('.tips').length
            || opts.pwdnew2.parent().find('.tips').length ) ) {
            alert('提交失败！（请检查您的密码）');
            return false;
        }
        if ( opts.name && (opts.name.val() === '' || opts.name.parent().find('.tips').length) ) {
            alert('提交失败！（请检查您的姓名）');
            return false;
        }
        if ( opts.phone && (opts.phone.val() === '' || opts.phone.parent().find('.tips').length) ) {
            alert('提交失败！（请检查您的手机号码）');
            return false;
        }
        if ( opts.idnum && (opts.idnum.val() === '' || opts.idnum.parent().find('.tips').length) ) {
            alert('提交失败！（请检查您的身份证号）');
            return false;
        }
        if ( opts.clsbdh && (opts.clsbdh.val() === '' || opts.clsbdh.parent().find('.tips').length) ) {
            alert('提交失败！（请检查您的车辆识别代号）');
            return false;
        }
        if ( opts.hphm && (opts.hphm.val() === '' || opts.hphm.parent().find('.tips').length) ) {
            alert('提交失败！（请检查您的号牌号码）');
            return false;
        }
        if ( opts.dabh && (opts.dabh.val() === '' || opts.dabh.parent().find('.tips').length) ) {
            alert('提交失败！（请检查您的档案编号）');
            return false;
        }
        if ( opts.email && (opts.email.val() === '' || opts.email.parent().find('.tips').length) ) {
            alert('提交失败！（请检查您的邮箱）');
            return false;
        }
        if ( opts.closername && (opts.closername.val() === '' || opts.closername.parent().find('.tips').length) ) {
            alert('提交失败！（请检查您的密切联系人姓名）');
            return false;
        }
        if ( opts.closerphone && (opts.closerphone.val() === '' || opts.closerphone.parent().find('.tips').length) ) {
            alert('提交失败！（请检查您的密切联系人电话）');
            return false;
        }
        if ( opts.closeridcard && (opts.closeridcard.val() === '' || opts.closeridcard.parent().find('.tips').length) ) {
            alert('提交失败！（请检查您的密切联系人身份证号）');
            return false;
        }
        if ( opts.movecarname && (opts.movecarname.val() === '' || opts.movecarname.parent().find('.tips').length) ) {
            alert('提交失败！（请检查您的移车联系人姓名）');
            return false;
        }
        if ( opts.movecarphone && (opts.movecarphone.val() === '' || opts.movecarphone.parent().find('.tips').length) ) {
            alert('提交失败！（请检查您的移车联系人电话）');
            return false;
        }
        return true;
    }

    return {
        "UI"         : UI,
        "getAjaxData": getAjaxData,
        "getHash"    : getHash,
        "verify"     : verify,
        "Cookie"     : Cookie
    };
})();