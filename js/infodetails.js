$(function () {
    /*
     * 单个车辆、驾照信息内容，通过列表页传过来的hash 作为请求参数
     * */
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
    var userName = App.Cookie.GetCookie('username');
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
        "init"     : function (opts) {
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
        "load"     : function (dom, url, params) {
            var _self = this;
            var _url = url || _self.url;
            var _params = params || _self.params;
            var _dom = dom || _self.dom;
            App.getAjaxData(_url, _params, function (data) {
                var msg;
                data.carQueryResponse && (msg = data.carQueryResponse);//车辆查询
                data.licenseQueryResponse && (msg = data.licenseQueryResponse);//驾照查询
                data.electIllegalResponse && (msg = data.electIllegalResponse); //车辆违法
                data.violationInfoResponse && (msg = data.violationInfoResponse);//驾照违法
                if ( msg ) {
                    _self.render(msg, _dom);
                } else {
                    alert('加载失败!');
                }
            });
        },
        "render"   : function (data, selector) {
            console.dir(data);
            var _self = this;
            var _selector = selector;
            var _trStr;
            var type = _self.type;
            _trStr = _self.getHtml(type, data);
            _selector.append(_trStr);
        },
        "getHtml"  : function (type, data) {
            var html;
            var msg;
            switch ( type ) {
                case 'carquery': //车辆查询结果内容模板
                    msg = data.carList[0];//Object
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
                    break;
                case 'cardquery': //驾照查询结果内容模板
                    msg = data.licenseList[0];//Object
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
                    break;
                case 'wf_car':
                    msg = data.msg;//Array
                    var l = msg.length;
                    var li = '';
                    var liArr = [];
                    if ( msg instanceof Array ) {
                        for ( var i = 0; i < l; i++ ) {
                            li = [
                                '<li>',
                                '    <h1>违法行为：' + msg[i].wfxw + '</h1>',
                                '    <h1>违法地点：' + msg[i].wfdz + '</h1>',
                                '    <h1>违法时间：' + msg[i].wfsj + '</h1>',
                                '    <h1>处理时间：' + msg[i].clsj + '</h1>',
                                '    <h1>处理情况：' + msg[i].clqk + '</h1>',
                                '    <h1>交款情况：' + msg[i].jkqk + '</h1>',
                                '    <h1>交款时间：' + msg[i].jksj + '</h1>',
                                '</li>'].join("");
                            liArr.push(li);
                        }
                    } else {
                        li = [
                            '<li>',
                            '    <h1>违法行为：测试测试</h1>',
                            '    <h1>违法地点：测试测试</h1>',
                            '    <h1>违法时间：测试测试</h1>',
                            '    <h1>处理时间：测试测试</h1>',
                            '    <h1>处理情况：测试测试</h1>',
                            '    <h1>交款情况：测试测试</h1>',
                            '    <h1>交款时间：测试测试</h1>',
                            '</li>'].join("");
                        liArr.push(li);
                    }
                    html = '<h1>' + data.carNum + '</h1>' + liArr.join("");
                    break;
                case 'wf_card':
                    msg = data.msg;//Array
                    var l = msg.length;
                    var li = '';
                    var liArr = [];
                    if ( msg instanceof Array ) {
                        for ( var i = 0; i < l; i++ ) {
                            li = [
                                '<li>',
                                '    <h1>违法行为：' + msg[i].wfxw + '</h1>',
                                '    <h1>违法地点：' + msg[i].wfdz + '</h1>',
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
                        li = [
                            '<li>',
                            '    <h1>违法行为：测试</h1>',
                            '    <h1>违法地点：测试</h1>',
                            '    <h1>违法时间：测试</h1>',
                            '    <h1>交款时间：测试</h1>',
                            '    <h1>交款情况：测试</h1>',
                            '    <h1>处理时间：测试</h1>',
                            '    <h1>违法记分数：测试</h1>',
                            '    <h1>罚款金额：测试</h1>',
                            '</li>'].join("");
                        liArr.push(li);
                    }
                    html = liArr.join("");
                    break;
                default:
                    html = [
                        ' <div>',
                        '     <b>无记录！</b>',
                        ' </div>'].join("");
                    break;
            }
            /*if(type==='wf_card'){ // 强制措施
             var tabnav='';
             tabnav=['<div class="ui-grid-a tab" id="tab_content">',
             '    <a class="ui-block-a active" data-for="tab-item-01">驾照违法</a>',
             '    <a class="ui-block-b" data-for="tab-item-02">驾照强制措施</a>',
             '</div>'].join("");
             }*/
            return html;
        },
        "loadMulti": function () {
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
                for ( var i = _urlArr.length - 1; i >= 0; i-- ) {
                    _self.load($('#' + _blockid), _urlArr[i], _paramsArr[i]);
                }
            })
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
                        "carid"   : oHash.carid
                    };
                    detailsBlock.init({
                        "dom" : $('#c_Table_b'),
                        "type": 'car',
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
                        "type": 'card',
                        "url" : cardOnlyUrl,
                        "data": params
                    });
                }
                break;
            case 'wf_car'://违法信息-按车辆-内容结果加载
                if ( hasKey('cartype', oHash) && hasKey('carid', oHash) && hasKey('jkbj', oHash) ) {
                    //&register=user2A&carNumType=01&carNum=鲁AE2751&jkbj=1
                    params = {
                        "register"  : userName,
                        "carNumType": oHash.cartype,
                        "carNum"    : oHash.carid,
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
                    if ( oHash.jkbj !== '0' ) {
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
        }

    }

    //返回对象o是否存在属性keyname
    function hasKey(keyname, o) {
        return keyname in o;
    }
});