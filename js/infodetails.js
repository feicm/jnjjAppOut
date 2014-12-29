$(function () {
    /*
     * 单个车辆、驾照信息、违法信息、考试预约/成绩查询、年鉴预约查询等内容，通过列表页传过来的hash 作为请求参数
     * */
    //var userName = App.Cookie.GetCookie('username');
    var userName = App.LS.get('username');
    var urlPre = 'adapter?open&url=';
    var carOnlyUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryOneCar.json';//单车辆查询请求
    var cardOnlyUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryOneLicense.json';//单驾照驾照查询请求地址
    var wf_car_url = urlPre   //&register=user2A&carNumType=01&carNum=鲁AE2751&jkbj=1
        + jnjjApp.config.requestUrl
        + '/jnpublic/electIllegalquery.json';//车辆电子监控违法信息
    var wf_card_url = urlPre
        + jnjjApp.config.requestUrl //&register=user2A&indentyid=370181199403014414&jkbj=1
        + '/jnpublic/violationQuery.json';//驾照现场违法信息
    var wf_card_url02 = urlPre
        + jnjjApp.config.requestUrl   //&register=user2A&indentyid=370181199001012475&cjbj=1
        + '/jnpublic/vioforcequery.json';//驾照强制措施信息
    var ksyyqueryRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/ksyyquery.json';//考试预约查询提交接口
    var kscjqueryRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/kscjquery.json';//考试成绩查询提交接口
    var njyyqueryRequestUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/njyycx.json';//年检预约查询提交接口
    var hash = window.location.hash,
        cartype, //车辆类型
        carid, //车牌号码
        licenserecord, //驾照代码
        oHash = {},
        params,
        modeName;//加载模块名
    console.dir(hash);
    //内容块加载对象
    var detailsBlock = {
        "init"           : function (opts) {
            this.dom = opts.dom;
            this.type = opts.type;
            this.url = opts.url;
            this.params = opts.data;
            if ( this.type === 'wf_card' ) {
                this.loadMulti();
            } else {
                this.load();
            }
        },
        "load"           : function (dom, url, params) {
            var _self = this;
            var _url = url || _self.url;
            var _params = params || _self.params;
            var _dom = dom || _self.dom;
            App.getAjaxData(_url, _params, function (data) {
                var msg;
                var type;
                data.carQueryResponse && (msg = data.carQueryResponse);//车辆查询
                data.licenseQueryResponse && (msg = data.licenseQueryResponse);//驾照查询
                data.electIllegalResponse && (msg = data.electIllegalResponse); //车辆违法
                //data.success && (msg = data.msg); //年检预约查询、考试成绩/预约查询
                if ( data.success === true || data.success === false ) {
                    msg = data.msg;
                }//考试成绩/预约查询/年检预约查询
                if ( data.violationInfoResponse ) {
                    msg = data.violationInfoResponse;
                    type = 'wf_card_t1';
                }//驾照违法
                if ( data.vioforceResponse ) {
                    msg = data.vioforceResponse;
                    type = 'wf_card_t2';
                } //驾照违法-强制措施
                if ( msg ) {
                    _self.render(msg, _dom, type);//渲染结果
                } else {
                    App.UI('dialog', {
                        type : 'alert',
                        title: '公众服务平台',
                        msg  : '加载失败！'
                    });
                }
            });
        },
        "render"         : function (data, selector, type) {
            console.dir(data);
            var _self = this;
            var _selector = selector;
            var _trStr;
            var type = type || _self.type;
            _trStr = _self.getHtml(type, data);
            _selector.append(_trStr);
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
                            '<tr>',
                            '     <td>姓名</td>',
                            '     <td>' + msg.xm + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>更新时间</td>',
                            '     <td>' + msg.gxsj + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>号牌号码</td>',
                            '     <td>' + msg.hphm + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>号牌种类</td>',
                            '     <td>' + msg.hpzl + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>车辆状态</td>',
                            '     <td>' + msg.clzt + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>检验有效期止</td>',
                            '     <td>' + msg.jyyxqz + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>强制报废期止</td>',
                            '     <td>' + msg.qzbfqz + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>逾期检验强制报废期止</td>',
                            '     <td>' + msg.yqjyqzbfqz + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>逾期2个检验周期期止</td>',
                            '     <td>' + msg.yqjybfqz2 + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>环保达标情况</td>',
                            '     <td>' + msg.hbdbqk + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>保险终止日期</td>',
                            '     <td>' + msg.bxzzrq + '</td>',
                            ' </tr>'].join("");
                    } else {
                        html = _self.getHtmlNoResult();
                    }
                    break;
                case 'cardquery': //驾照查询结果内容模板
                    if ( data.licenseList[0].msg !== 'NO_RESULT' ) {
                        msg = $.parseJSON(data.licenseList[0].msg);//Object
                        //{\"gxsj\":\"2012-12-18 00:00:00\",\"jszzt\":\"正常\",\"ljjf\":\"0\",\"xyqfrq\":\"2014-12-18 00:00:00\",\"xysyrq\":\"2018-12-18 00:00:00\",\"zjcx\":\"C1\"}
                        html = [
                            '<tr>',
                            '     <td>更新时间</td>',
                            '     <td>' + msg.gxsj + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>准驾车型</td>',
                            '     <td>' + msg.zjcx + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>驾驶证状态</td>',
                            '     <td>' + msg.jszzt + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>累积记分</td>',
                            '     <td>' + msg.ljjf + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>下一清分日期</td>',
                            '     <td>' + msg.xyqfrq + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>下一审验日期</td>',
                            '     <td>' + msg.xysyrq + '</td>',
                            ' </tr>'].join("");
                    } else {
                        html = _self.getHtmlNoResult();
                    }
                    break;
                case 'wf_car':
                    msg = data.msg;//Array
                    var al;
                    var li = '';
                    var liArr = [];
                    if ( msg !== 'NO_RESULT' ) {
                        msg = _self.formatData(msg);
                        al = msg.length;
                        for ( var i = 0; i < al; i++ ) {
                            li = [
                                '<li>',
                                '    <h1>违法行为：' + msg[i].wfxw + '</h1>',
                                '    <h1>违法地点：' + msg[i].wfdd + '</h1>',
                                '    <h1>违法时间：' + msg[i].wfsj + '</h1>',
                                '    <h1>处理时间：' + msg[i].clsj + '</h1>',
                                '    <h1>处理情况：' + msg[i].clqk + '</h1>',
                                '    <h1>交款情况：' + msg[i].jkqk + '</h1>',
                                '    <h1>交款时间：' + msg[i].jksj + '</h1>',
                                '</li>'].join("");
                            liArr.push(li);
                        }
                    } else {
                        li = _self.getHtmlNoResult();
                        liArr.push(li);
                    }
                    html = '<h1>' + data.carNum + '</h1>' + liArr.join("");
                    break;
                case 'wf_card_t1':
                    msg = data.msg;//Array
                    var l = msg.length;
                    var al;
                    var li = '';
                    var liArr = [];
                    if ( msg !== 'NO_RESULT' ) {
                        msg = _self.formatData(msg);
                        al = msg.length;
                        for ( var i = 0; i < al; i++ ) {
                            li = [
                                '<li>',
                                '    <h1>违法行为：' + msg[i].wfxw + '</h1>',
                                '    <h1>违法地点：' + msg[i].wfdd + '</h1>',
                                '    <h1>违法时间：' + msg[i].wfsj + '</h1>',
                                '    <h1>交款时间：' + msg[i].jksj + '</h1>',
                                '    <h1>交款情况：' + msg[i].jkqk + '</h1>',
                                '    <h1>处理时间：' + msg[i].clsj + '</h1>',
                                '    <h1>违法记分数：' + msg[i].wfjfs + '</h1>',
                                '    <h1>罚款金额：' + msg[i].fkje + '</h1>',
                                '</li>'].join("");
                            liArr.push(li);
                        }
                    } else {
                        li = _self.getHtmlNoResult();
                        liArr.push(li);
                    }
                    html = liArr.join("");
                    break;
                case 'wf_card_t2':
                    msg = data.msg;//Array
                    var l = msg.length;
                    var al;
                    var li = '';
                    var liArr = [];
                    if ( msg !== 'NO_RESULT' ) {
                        msg = _self.formatData(msg);
                        al = msg.length;
                        for ( var i = 0; i < al; i++ ) {
                            li = [
                                '<li>',
                                '    <h1>违法行为：' + msg[i].wfxw + '</h1>',
                                '    <h1>违法地点：' + msg[i].wfdd + '</h1>',
                                '    <h1>违法时间：' + msg[i].wfsj + '</h1>',
                                '    <h1>接受处理时间：' + msg[i].jsclsj + '</h1>',
                                '    <h1>裁决时间：' + msg[i].cjbj + '</h1>',
                                '    <h1>裁决时间：' + msg[i].cjsj + '</h1>',
                                '</li>'].join("");
                            liArr.push(li);
                        }
                    } else {
                        li = _self.getHtmlNoResult();
                        liArr.push(li);
                    }
                    html = liArr.join("");
                    break;
                case 'query_ksyy': //考试预约查询结果内容模板
                    data;
                    if ( data instanceof Array) {
                        msg = data[0];//Object
                        html = [
                            '<tr>',
                            '     <td>姓名</td>',
                            '     <td>' + msg.xm + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>身份证明号码</td>',
                            '     <td>' + msg.sfzmhm + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>预约日期</td>',
                            '     <td>' + msg.yyrq + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>考试日期</td>',
                            '     <td>' + msg.ksrq + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>考试地点</td>',
                            '     <td>' + msg.kcmc + '</td>',
                            ' </tr>'].join("");
                    } else {
                        html = _self.getHtmlNoResult(data);
                    }
                    break;
                case 'query_kscj': //考试预约查询结果内容模板
                    data;
                    if ( data instanceof Array) {
                        msg = data[0];//Object
                        html = [
                            '<tr>',
                            '     <td>姓名</td>',
                            '     <td>' + msg.xm + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>身份证明号码</td>',
                            '     <td>' + msg.sfzmhm + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>考试成绩</td>',
                            '     <td>' + msg.kscj + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>是否合格</td>',
                            '     <td>' + (msg.zt + 0 === 1 ? '合格' : '不合格') + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>考试日期</td>',
                            '     <td>' + msg.ksrq + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>考试场次</td>',
                            '     <td>' + (msg.kscc + 0 === 1 ? '上午' : '下午') + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>考试地点</td>',
                            '     <td>' + msg.kcmc + '</td>',
                            ' </tr>'].join("");
                    } else {
                        html = _self.getHtmlNoResult(data);
                    }
                    break;
                case 'query_njyy': //年检预约查询结果内容模板
                    data;//Array
                    if ( data instanceof Array ) {
                        msg = $.parseJSON(data[0].msg);//Object
                        html = [
                            ' <tr>',
                            '     <td>预约编号</td>',
                            '     <td>' + msg.yybh + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>号牌种类</td>',
                            '     <td>' + msg.hpzl + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>号牌号码</td>',
                            '     <td>' + msg.hphm + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>业务类型</td>',
                            '     <td>' + msg.ywlx + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>预约办理日期</td>',
                            '     <td>' + msg.yyblrq + '</td>',
                            ' </tr>',
                            ' <tr>',
                            '     <td>预约办理时间</td>',
                            '     <td>' + msg.yyblsj + '</td>',
                            ' </tr>'].join("");
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
        "loadMulti"      : function () {
            var _self = this;
            var _type = _self.type;
            var _dom = _self.dom;
            var _urlArr = _self.url.split('@@');
            var _paramsArr = _self.params;
            var _tabs;
            var _blockid;
            _tabs = _dom.children();
            _tabs.each(function (index) {
                _blockid = $(this).attr('data-for');
                _self.load($('#' + _blockid), _urlArr[index], _paramsArr[index]);
            })
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
                        "register": userName,
                        "cartype" : oHash.cartype,
                        "carid"   : decodeURI(oHash.carid)
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
                        "licenceRecord": oHash.licenserecord
                    };
                    detailsBlock.init({
                        "dom" : $('#c_Table_b'),
                        "type": 'cardquery',
                        "url" : cardOnlyUrl,
                        "data": params
                    });
                }
                break;
            case 'wf_car'://违法信息-按车辆-内容结果加载
                if ( hasKey('cartype', oHash)
                    && hasKey('carid', oHash)
                    && hasKey('jkbj', oHash) ) {
                    //&register=user2A&carNumType=01&carNum=鲁AE2751&jkbj=1
                    params = {
                        "register"  : userName,
                        "carNumType": oHash.cartype,
                        "carNum"    : decodeURI(oHash.carid),
                        "jkbj"      : oHash.jkbj
                    };
                    detailsBlock.init({
                        "dom" : $('#violation-list'),
                        "type": 'wf_car',
                        "url" : wf_car_url,
                        "data": params
                    });
                }
                break;
            case 'wf_card'://违法信息-按驾照-内容结果加载
                if ( hasKey('licenseid', oHash) && hasKey('jkbj', oHash) ) {
                    //&register=user2A&indentyid=370181199403014414&jkbj=1
                    //&register=user2A&indentyid=370181199001012475&cjbj=1
                    if ( oHash.jkbj !== '' ) {
                        params = [
                            {
                                "register" : userName,
                                "indentyid": oHash.licenseid,
                                "jkbj"     : oHash.jkbj
                            }, {
                                "register" : userName,
                                "indentyid": oHash.licenseid,
                                "cjbj"     : oHash.jkbj
                            }
                        ];
                    } else {
                        params = [
                            {
                                "register" : userName,
                                "indentyid": oHash.licenseid,
                                "jkbj"     : oHash.jkbj
                            }, {
                                "register" : userName,
                                "indentyid": oHash.licenseid,
                                "cjbj"     : null
                            }
                        ];
                    }
                    detailsBlock.init({
                        "dom" : $('#tab_violation'),
                        "type": 'wf_card',
                        "url" : wf_card_url + '@@' + wf_card_url02,
                        "data": params
                    });
                }
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
                        "register": userName,
                        "sfzmmc"  : oHash.sfzmmc,
                        "sfzmhm"  : oHash.sfzmhm,
                        "lsh"     : oHash.lsh,
                        "ksyy"    : oHash.ksyy,
                        "kskm"    : oHash.kskm
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
                    params = { //TODO 参数确认
                        "register": userName,
                        "hpzl"    : oHash.hpzl,
                        "hphm"    : oHash.hphm,
                        "clsbdh"  : oHash.clsbdh
                    };
                    detailsBlock.init({
                        "dom" : $('#c_Table_b'),
                        "type": 'query_njyy',
                        "url" : njyyqueryRequestUrl,
                        "data": params
                    });
                }
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