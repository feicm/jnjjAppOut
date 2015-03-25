$(function () {
    /*
     * 单个车辆、驾照信息、违法信息、考试预约/成绩查询、年鉴预约查询等内容，通过列表页传过来的hash 作为请求参数
     * */
    if ( !App.addOnlineStatusListener() ) { //添加网络状态检测
        return false
    }
    var baseDomain = App.LS.get('App_baseDomain'); //从本地存储中获取当前域
    var userName = App.LS.get('App_userName');
    var urlPre = 'adapter?open&url=';
    var carOnlyUrl = jnjjApp.config.requestUrl
        + '/jnpublic/queryOneCar.json';//单车辆查询请求
    var cardOnlyUrl = jnjjApp.config.requestUrl
        + '/jnpublic/queryOneLicense.json';//单驾照驾照查询请求地址
    var ksyyqueryRequestUrl = jnjjApp.config.requestUrl
        + '/jnpublic/ksyyquery.json';//考试预约查询提交接口
    var kscjqueryRequestUrl = jnjjApp.config.requestUrl
        + '/jnpublic/kscjquery.json';//考试成绩查询提交接口
    var njyyqueryRequestUrl = jnjjApp.config.requestUrl
        + '/jnpublic/njyycx.json';//年检预约查询提交接口
    var sgkcqueryRequestUrl = jnjjApp.config.wechatServer
        + '/recordServlet?';//事故快处查询提交接口
    var hash = decodeURI(window.location.hash),
        cartype, //车辆类型
        carid, //车牌号码
        licenserecord, //驾照代码
        oHash = {},
        params,
        modeName;//加载模块名
    console.dir(hash);
    //内容块加载对象
    var detailsBlock = {
        "loading"        : null,
        "init"           : function (opts) {
            this.dom = opts.dom;
            this.type = opts.type;
            this.url = opts.url || null;
            this.params = opts.data;
            this.load();
        },
        "load"           : function (dom, url, params) {
            var _self = this;
            var _url = url || _self.url;
            var _params = params || _self.params;
            var _dom = dom || _self.dom;
            _self.loading = App.UI('dialog', {'msg': "数据加载中"});
            if ( !_url && _params ) {//url 为空 直接渲染
                _self.render(_params, _dom);//渲染结果
                _self.bindEvent();
                _self.loading.remove();
            }
            _url && App.getAjaxData(_url, _params, function (data) {
                var msg;
                data.carQueryResponse && (msg = data.carQueryResponse);//车辆查询
                data.licenseQueryResponse && (msg = data.licenseQueryResponse);//驾照查询
                data.cgsCommonResponse && (msg = data.cgsCommonResponse);//车管所
                if ( data.success === true || data.success === false ) {
                    msg = data.msg;
                }//考试成绩/预约查询/年检预约查询/事故快处查询
                if ( msg ) {
                    _self.render(msg, _dom);//渲染结果
                    _self.bindEvent();
                    _self.loading.remove();
                } else {
                    _self.loading = _self.loading.resetMsg('加载失败');
                    setTimeout(function () {
                        _self.loading.remove();
                    }, 500);
                }
            });
        },
        "render"         : function (data, selector) {
            //console.dir(data);
            var _self = this;
            var _selector = selector;
            var _trStr;
            var type = _self.type;
            _trStr = _self.getHtml(type, data);
            _selector.append(_trStr);
        },
        "bindEvent"      : function () {
            var _self = this;
            var _images = [];
            var _btnNames = [];
            var _list = _self.dom.find('.ui-pic img');//事故快处
            var _btns = _self.dom.find('.ui_btn'); //电子监控违法处理
            if ( !_list.length && !_btns.length ) return false;
            _list.length && _list.each(function (index) {//事故快处
                var $this = $(this);
                _images.push($this.attr('src'));
                $this.on('click', function () {
                    Wisp.UI.Gallery.open({
                        active: index,
                        images: _images.join('|')
                    });
                })
            });
            _btns.length && _btns.each(function (index) {
                var $this = $(this);
                var dataFor = $this.data('for');
                _btnNames.push(dataFor);
                if ( dataFor === "handle" ) {
                    //处理
                    $this.on('click', function () {
                        //提交处理请求
                        App.UI('dialog', {
                            type : 'confirm',
                            title: '公众服务平台',
                            msg  : '确定处理？'
                        }, function (action) {
                            if ( action === 'OK' ) { //提交处理请求
                                App.UI('dialog', {
                                    type     : 'confirm',
                                    title    : '公众服务平台',
                                    msg      : '处理成功！',
                                    OkTxt    : '去缴费',
                                    CancelTxt: '暂不'
                                }, function (action) {
                                    if ( action === 'OK' ) {
                                        //打开缴费信息
                                        window.open('pay.html');
                                    }
                                    if ( action === 'CANCEL' ) {
                                        //修改hash并刷新页面
                                        hash.replace(/clqk=0/g,'clqk=1');
                                        location.reload();
                                    }
                                });
                            }
                        });
                    })
                }
                else if ( dataFor === "pay" && $.inArray("handle", _btnNames) !== -1 ) {
                    //先处理
                    $this.on('click', function () {
                        App.UI('dialog', {
                            type : 'alert',
                            title: '公众服务平台',
                            msg  : '违法尚未处理，无法缴费，请先处理！'
                        });
                    })
                }
                else if ( dataFor === "pay" && $.inArray("handle", _btnNames) === -1 ) {
                    //缴费
                    $this.on('click', function () {
                        window.open('pay.html');
                    })
                }
            })
        },
        "getHtml"        : function (type, data) {
            var _self = this;
            var html;
            var msg;
            switch ( type ) {
                case 'carquery': //车辆查询结果内容模板
                    if ( data.carList[0].msg !== 'NO_RESULT' ) {
                        msg = $.parseJSON(data.carList[0].msg);//Object
                        html = [
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">号牌种类</div>',
                            '                    <div class="item-after">' + msg.hpzl + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">号牌号码</div>',
                            '                    <div class="item-after">' + msg.hphm + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">车辆状态</div>',
                            '                    <div class="item-after">' + msg.clzt + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>',
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">姓名</div>',
                            '                    <div class="item-after">' + msg.xm + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>',
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">检验有效期止</div>',
                            '                    <div class="item-after">' + _self.formatTime(msg.jyyxqz) + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">强制报废期止</div>',
                            '                    <div class="item-after">' + _self.formatTime(msg.qzbfqz) + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>',
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">逾期检验强制报废期止</div>',
                            '                    <div class="item-after">' + _self.formatTime(msg.yqjyqzbfqz) + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">逾期两个检验周期期止</div>',
                            '                    <div class="item-after">' + _self.formatTime(msg.yqjybfqz2) + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>',
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">保险终止日期(参考)</div>',
                            '                    <div class="item-after">' + _self.formatTime(msg.bxzzrq) + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">环保达标情况(参考)</div>',
                            '                    <div class="item-after">' + msg.hbdbqk + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>',
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">更新日期</div>',
                            '                    <div class="item-after">' + _self.formatTime(msg.gxsj) + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>'].join("");
                    } else {
                        html = _self.getHtmlNoResult();
                    }
                    break;
                case 'cardquery': //驾照查询结果内容模板
                    if ( data.licenseList[0].msg !== 'NO_RESULT' ) {
                        msg = $.parseJSON(data.licenseList[0].msg);//Object
                        //{\"gxsj\":\"2012-12-18 00:00:00\",\"jszzt\":\"正常\",\"ljjf\":\"0\",\"xyqfrq\":\"2014-12-18 00:00:00\",\"xysyrq\":\"2018-12-18 00:00:00\",\"zjcx\":\"C1\"}
                        html = [
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">准驾车型</div>',
                            '                    <div class="item-after">' + msg.zjcx + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">驾驶证状态</div>',
                            '                    <div class="item-after">' + msg.jszzt + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>',
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">累计记分</div>',
                            '                    <div class="item-after">' + msg.ljjf + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>',
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">下一清分日期</div>',
                            '                    <div class="item-after">' + _self.formatTime(msg.xyqfrq) + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">下一审验日期</div>',
                            '                    <div class="item-after">' + _self.formatTime(msg.xysyrq) + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>',
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">更新日期</div>',
                            '                    <div class="item-after">' + _self.formatTime(msg.gxsj) + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>'].join("");
                    } else {
                        html = _self.getHtmlNoResult();
                    }
                    break;
                case 'v_car_list'://我的违法-车辆-结果列表-内容模板
                    html = [
                        '<div class="list-block">',
                        '    <ul>',
                        '        <li>',
                        '            <div class="item-content">',
                        '                <div class="item-media"><i class="icon icon-position"></i></div>',
                        '                <div class="item-inner">',
                        '                    <div class="item-title label">违法地点</div>',
                        '                    <div class="item-after wfdd fs08">' + data.wfdd + '</div>',
                        '                </div>',
                        '            </div>',
                        '        </li>',
                        '        <li>',
                        '            <div class="item-content">',
                        '                <div class="item-media"><i class="icon icon-action"></i></div>',
                        '                <div class="item-inner">',
                        '                    <div class="item-title label">违法行为</div>',
                        '                    <div class="item-after wfdd fs08">' + data.wfxw + '</div>',
                        '                </div>',
                        '            </div>',
                        '        </li>',
                        '        <li>',
                        '            <div class="item-content">',
                        '                <div class="item-media"><i class="icon icon-time"></i></div>',
                        '                <div class="item-inner">',
                        '                    <div class="item-title label">违法时间</div>',
                        '                    <div class="item-after">' + _self.formatTime(data.wfsj) + '</div>',
                        '                </div>',
                        '            </div>',
                        '        </li>',
                        '    </ul>',
                        '</div>',
                        '<div class="list-block">',
                        '    <ul>',
                        '        <li>',
                        '            <div class="item-content">',
                        '                <div class="item-media"><i class="icon icon-tag"></i></div>',
                        '                <div class="item-inner">',
                        '                    <div class="item-title label">处理情况</div>',
                        '                    <div class="item-after">' + (data.clqk === '1' ? "已处理" : "未处理<a data-for='handle' class='ui_btn ui_btn_01 ui_radius'>处理</a>") + '</div>',
                        '                </div>',
                        '            </div>',
                        '        </li>',
                        '        <li>',
                        '            <div class="item-content">',
                        '                <div class="item-media"><i class="icon icon-time"></i></div>',
                        '                <div class="item-inner">',
                        '                    <div class="item-title label">处理时间</div>',
                        '                    <div class="item-after">' + _self.formatTime(data.clsj) + '</div>',
                        '                </div>',
                        '            </div>',
                        '        </li>',
                        '    </ul>',
                        '</div>',
                        '<div class="list-block">',
                        '    <ul>',
                        '        <li>',
                        '            <div class="item-content">',
                        '                <div class="item-media"><i class="icon icon-tag"></i></div>',
                        '                <div class="item-inner">',
                        '                    <div class="item-title label">交款情况</div>',
                        '                    <div class="item-after">' + (data.jkqk === '1' ? "已交款" : "未交款<a data-for='pay' class='ui_btn ui_btn_01 ui_radius'>缴费</a>") + '</div>',
                        '                </div>',
                        '            </div>',
                        '        </li>',
                        '        <li>',
                        '            <div class="item-content">',
                        '                <div class="item-media"><i class="icon icon-time"></i></div>',
                        '                <div class="item-inner">',
                        '                    <div class="item-title label">交款时间</div>',
                        '                    <div class="item-after">' + _self.formatTime(data.jksj) + '</div>',
                        '                </div>',
                        '            </div>',
                        '        </li>',
                        '    </ul>',
                        '</div>'].join("");
                    break;
                case 'v_card_list'://我的违法-驾照-结果列表-内容模板
                    html = [
                        '<div class="list-block">',
                        '    <ul>',
                        '        <li>',
                        '            <div class="item-content">',
                        '                <div class="item-media"><i class="icon icon-position"></i></div>',
                        '                <div class="item-inner">',
                        '                    <div class="item-title label">违法地点</div>',
                        '                    <div class="item-after wfdd fs08">' + data.wfdd + '</div>',
                        '                </div>',
                        '            </div>',
                        '        </li>',
                        '        <li>',
                        '            <div class="item-content">',
                        '                <div class="item-media"><i class="icon icon-action"></i></div>',
                        '                <div class="item-inner">',
                        '                    <div class="item-title label">违法行为</div>',
                        '                    <div class="item-after wfdd fs08">' + data.wfxw + '</div>',
                        '                </div>',
                        '            </div>',
                        '        </li>',
                        '        <li>',
                        '            <div class="item-content">',
                        '                <div class="item-media"><i class="icon icon-time"></i></div>',
                        '                <div class="item-inner">',
                        '                    <div class="item-title label">违法时间</div>',
                        '                    <div class="item-after">' + _self.formatTime(data.wfsj) + '</div>',
                        '                </div>',
                        '            </div>',
                        '        </li>',
                        '    </ul>',
                        '</div>'].join("");
                    if ( data.wfjfs !== 'undefined' ) {//驾照违法信息内容
                        html += [
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-record"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">违法记分数</div>',
                            '                    <div class="item-after">' + data.wfjfs + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-money"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">罚款金额</div>',
                            '                    <div class="item-after">￥' + data.fkje + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-time"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">交款时间</div>',
                            '                    <div class="item-after">' + _self.formatTime(data.jksj) + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>',
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-tag"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">处理情况</div>',
                            '                    <div class="item-after">' + (data.jkqk === '1' ? "已处理" : "未处理") + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-time"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">处理时间</div>',
                            '                    <div class="item-after">' + _self.formatTime(data.clsj) + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>'].join("");
                    }
                    if ( data.jscjsj !== 'undefined' ) { //驾照强制措施内容
                        html += [
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-time"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title fw">接受处理时间</div>',
                            '                    <div class="item-after">' + _self.formatTime(data.jscjsj) + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-tag"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">裁决标记</div>',
                            '                    <div class="item-after">' + data.cjbj + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-time"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">裁决时间</div>',
                            '                    <div class="item-after">' + _self.formatTime(data.cjsj) + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>'].join("");
                    }
                    break;
                case 'query_ksyy': //考试预约查询结果内容模板
                    if ( data.cgsCommonList !== null ) {
                        msg = data.cgsCommonList[0];//Object
                        html = [
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-user"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">姓 名</div>',
                            '                    <div class="item-after">' + msg.xm + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-cardnum"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">证件号码</div>',
                            '                    <div class="item-after">' + msg.sfzmhm + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>',
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-calendar2"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">预约日期</div>',
                            '                    <div class="item-after">' + msg.yyrq + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-calendar2"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">考试日期</div>',
                            '                    <div class="item-after">' + msg.ksrq + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>',
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-position2"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">考试地点</div>',
                            '                    <div class="item-after">' + msg.kcmc + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>'].join("");
                    } else {
                        html = _self.getHtmlNoResult(data.msg);
                    }
                    break;
                case 'query_kscj': //考试预约查询结果内容模板
                    if ( data.cgsCommonList !== null ) {
                        msg = data.cgsCommonList[0];//Object
                        html = [
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-user"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">姓 名</div>',
                            '                    <div class="item-after">' + msg.xm + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-cardnum"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">证件号码</div>',
                            '                    <div class="item-after">' + msg.sfzmhm + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>',
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-record2"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">考试成绩</div>',
                            '                    <div class="item-after">' + msg.kscj + '分</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-flag"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">是否合格</div>',
                            '                    <div class="item-after">' + (msg.zt + 0 === 1 ? '合格' : '不合格') + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>',
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-calendar2"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">考试日期</div>',
                            '                    <div class="item-after">' + msg.ksrq + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-position2"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">考试地点</div>',
                            '                    <div class="item-after wfdd fs08">' + msg.kcmc + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>',
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-nail"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">考试场次</div>',
                            '                    <div class="item-after">' + (msg.kscc + 0 === 1 ? '上午' : '下午') + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>'].join("");
                    } else {
                        html = _self.getHtmlNoResult(data.msg);
                    }
                    break;
                case 'query_njyy': //年检预约查询结果内容模板
                    if ( data instanceof Array ) {
                        msg = $.parseJSON(data[0].msg);//Object
                        html = [
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-pen"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">预约编号</div>',
                            '                    <div class="item-after">' + msg.yybh + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-cartype"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">号牌种类</div>',
                            '                    <div class="item-after">' + msg.hpzl + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-carnum2"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">号牌号码</div>',
                            '                    <div class="item-after">' + msg.hphm + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>',
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-cardnum"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">业务类型</div>',
                            '                    <div class="item-after">' + msg.ywlx + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>',
                            '<div class="list-block">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-calendar2"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label w6">预约办理日期</div>',
                            '                    <div class="item-after">' + msg.yyblrq + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-time"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label w6">预约办理时间</div>',
                            '                    <div class="item-after">' + msg.yyblsj + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>'].join("");
                    } else {
                        html = _self.getHtmlNoResult(data);
                    }
                    break;
                case 'query_sgkc': //事故快处查询结果内容模板
                    if ( data instanceof Array ) {
                        msg = data[0];//Object
                        html = [
                            '<div class="list-block sgkc">',
                            '    <ul>',
                            '        <li>',
                            '            <div class="item-content ovh db">',
                            '                <div class="ui-pic">',
                            '                    <img src="' + msg.pic1 + '">',
                            '                    <img src="' + msg.pic2 + '">',
                            '                    <img src="' + msg.pic3 + '">',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-time"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">时间</div>',
                            '                    <div class="item-after">' + msg.recordtime + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '        <li>',
                            '            <div class="item-content">',
                            '                <div class="item-media"><i class="icon icon-position"></i></div>',
                            '                <div class="item-inner">',
                            '                    <div class="item-title label">地点</div>',
                            '                    <div class="item-after wfdd fs08">' + msg.location + '</div>',
                            '                </div>',
                            '            </div>',
                            '        </li>',
                            '    </ul>',
                            '</div>'].join("");
                    } else {
                        html = _self.getHtmlNoResult(data);
                    }
                    break;
                default:
                    html = _self.getHtmlNoResult();
                    break;
            }
            return html;
        },
        "getHtmlNoResult": function (msg) {
            var text;
            if ( msg === 'NO_RESULT' || msg === undefined ) {
                text = '无记录！';
            } else {
                text = msg;
            }
            var _html = [
                ' <div class="noresult">',
                '     <b>' + text + '</b>',
                ' </div>'].join("");
            return _html;
        },
        "formatData"     : function (data) {
            var sData = data.substring(1, data.length - 1);
            var aData = sData.split(',{');
            var l = aData.length;
            for ( var i = 0; i < l; i++ ) {
                i && (aData[i] = '{' + aData[i]);
                aData[i] = $.parseJSON(aData[i]);
            }
            console.dir(aData);
            return aData;
        },
        "formatTime"     : function (Date) {
            return Date.split(' ')[0];
        }
    };
    if ( hash ) {
        oHash = App.getHash(hash); //格式化hash 对象
        modeName = oHash.mode;
        modeName && showMode(modeName);

    } else {
        console.log('传参失败！');
    }
    function showMode(modename) {
        switch ( modename ) {
            case 'carquery': //单绑定车辆内容加载
                if ( hasKey('cartype', oHash) && hasKey('carid', oHash) ) {
                    //加载单车辆信息
                    //&register=user2A&cartype=01&carid=AR0327
                    params = {
                        "register"  : userName,
                        "cartype"   : oHash.cartype,
                        "carid"     : decodeURI(oHash.carid),
                        "baseDomain": baseDomain
                    };
                    detailsBlock.init({
                        "dom" : $('#c_Table_b'),
                        "type": 'carquery',
                        "url" : carOnlyUrl,
                        "data": params
                    });
                }
                break;
            case 'cardquery': //单绑定驾照内容加载
                if ( hasKey('licenserecord', oHash) ) {
                    //加载单驾照信息
                    //&register=user2A&licenceRecord=370102335479
                    params = {
                        "register"     : userName,
                        "licenceRecord": oHash.licenserecord,
                        "baseDomain"   : baseDomain
                    };
                    detailsBlock.init({
                        "dom" : $('#c_Table_b'),
                        "type": 'cardquery',
                        "url" : cardOnlyUrl,
                        "data": params
                    });
                }
                break;
            case 'v_car_list'://违法信息-按车辆-内容结果加载
            case 'v_card_list'://违法信息-按驾照-内容结果加载
                detailsBlock.init({
                    "dom" : $('#c_Table_b'),
                    "type": modename,
                    "data": oHash
                });
                break;
            case 'query_ksyy'://考试预约查询-结果
            case 'query_kscj'://考试预约查询-结果
                if ( hasKey('sfzmmc', oHash)
                    && hasKey('sfzmhm', oHash)
                    && hasKey('lsh', oHash)
                    && hasKey('ksyy', oHash)
                    && hasKey('kskm', oHash) ) {

                    //&sfzmhm=370100201020102002&sfzmmc=A&lsh=10212&ksyy=xxx&kskm=xxx
                    params = {
                        "register"  : userName,
                        "sfzmmc"    : oHash.sfzmmc,
                        "sfzmhm"    : oHash.sfzmhm,
                        "lsh"       : oHash.lsh,
                        "ksyy"      : oHash.ksyy,
                        "kskm"      : oHash.kskm,
                        "baseDomain": baseDomain
                    };
                    if ( modename === 'query_ksyy' ) {//加载考试预约结果
                        detailsBlock.init({
                            "dom" : $('#c_Table_b'),
                            "type": 'query_ksyy',
                            "url" : ksyyqueryRequestUrl,
                            "data": params
                        });
                    }
                    if ( modename === 'query_kscj' ) {//加载考试成绩结果
                        detailsBlock.init({
                            "dom" : $('#c_Table_b'),
                            "type": 'query_kscj',
                            "url" : kscjqueryRequestUrl,
                            "data": params
                        });
                    }
                }
                break;
            case 'query_njyy':
                if ( hasKey('hpzl', oHash)
                    && hasKey('hphm', oHash)
                    && hasKey('clsbdh', oHash) ) {

                    //。。。
                    params = {
                        "register"  : userName,
                        "hpzl"      : oHash.hpzl,
                        "hphm"      : oHash.hphm,
                        "clsbdh"    : oHash.clsbdh,
                        "baseDomain": baseDomain
                    };
                    detailsBlock.init({
                        "dom" : $('#c_Table_b'),
                        "type": 'query_njyy',
                        "url" : njyyqueryRequestUrl,
                        "data": params
                    });
                }
                break;
            case 'query_sgkc'://事故快处查询-内容结果加载
                if ( hasKey('flowid', oHash) ) {
                    //flowid=99C143B5515AA43F630A53BCF1173C74
                    params = {
                        "baseDomain": baseDomain,
                        "flowid"    : oHash.flowid,
                        "baseDomain": baseDomain
                    };
                }
                detailsBlock.init({
                    "dom" : $('#c_Table_b'),
                    "type": modename,
                    "url" : sgkcqueryRequestUrl,
                    "data": params
                });
                break;
            default :
                console.log("it's not this mode!!");
        }
    }

    //返回对象o是否存在属性keyname
    function hasKey(keyname, o) {
        return keyname in o;
    }

    /*
     * --------------------页面效果------------------------
     * */
    App.UI('tabToggle', {
        "dom"        : $('#tab_violation'),
        "activeClass": 'active'
    });
});