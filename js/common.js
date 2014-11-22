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
            "init"     : function () {
                this.doms = opts.doms;
                this.render();
                this.bindEvent();
            },
            "render"   : function () {
                var self = this;
                var inputWrap;
                var closeHtml = '<a class="close">X</a>';
                self.doms.each(function (index) {
                    inputWrap = $(this).find('.item-input');
                    inputWrap.append(closeHtml);
                });
            },
            "bindEvent": function () {
                var self = this;
                var value;
                var inputWrap;
                //console.dir(self.doms);
                self.doms.each(function (index) {
                    inputWrap = $(this).find('.item-input');
                    inputWrap.each(function (index) {
                        var close;
                        var input;
                        input = $(this).find('input');
                        close = $(this).find('a.close');
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
                            close.css('display', 'none');
                        })
                    })
                });
            }
        };
        var moduleNameMap = {
            "changePage": changePage,
            "inputClose": inputClose
        }
        name && moduleNameMap[name].init();
    }

    function getAjaxData(url, params, callback) {
        $.ajax({ //登录验证请求
            type    : 'POST',
            url     : url,
            data    : params,
            dataType: 'json'
        }).done(function (data) {//登录表单提交
            if ( data ) {//验证返回数据
                callback && callback(data);
            }
        }).fail(function (data) {
            alert('数据请求失败，请检查网络连接！');
        });
    }

    return {
        "UI"         : UI,
        "getAjaxData": getAjaxData
    };
})();