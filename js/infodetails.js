$(function () {
    /*
    * 单个车辆、驾照信息内容，通过列表页传过来的hash 作为请求参数
    * */
    var urlPre = 'adapter?open&url=';
    var carOnlyUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryOneCar.json;';//单车辆查询请求
    var cardOnlyUrl = urlPre
        + jnjjApp.config.requestUrl
        + '/jnpublic/queryOneLicense.json;';//单驾照驾照查询请求地址
    var userName = App.Cookie.GetCookie('username');
    var hash = window.location.hash,
        cartype, //车辆类型
        carid, //车牌号码
        licenserecord, //驾照代码
        oHash = {},
        params;
    console.dir(hash);
    //内容块加载对象
    var detailsBlock = {
        "init"   : function (opts) {
            this.dom = opts.dom;
            this.type = opts.type;
            this.url = opts.url;
            this.params = this.data;
            this.load();
        },
        "load"   : function () {
            var _self = this;
            var _url = _self.url;
            var _params = _self.params;
            App.getAjaxData(_url, _params, function (data) {
                var msg;
                data.carQueryResponse && (msg = data.carQueryResponse);
                data.licenseQueryResponse && (msg = data.licenseQueryResponse);
                if ( msg ) {
                    _self.render(msg);
                } else {
                    alert('加载失败!');
                }
            });
        },
        "render" : function (data) {
            console.dir(datas);
            var _self = this;
            var _table = _self.dom;
            var _trStr;
            var type = _self.type;
            _trStr = _self.getHtml(type,data);
            _table.append(_trStr);
        },
        "getHtml": function (type,data) {
            var html;
            var msg = data[0].msg;
            switch ( type ) {
                case 'car':
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
                case 'card':
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
                default:
                    html = [
                        ' <tr>',
                        '     <td>类型未选择！</td>',
                        ' </tr>'].join("");
                    break;
            }
            return html;
        }
    };
    if ( hash ) {
        oHash = App.getHash(hash); //格式化hash 对象
        if ( hasKey('cartype', oHash) && hasKey('carid', oHash) ) {
            //加载单车辆信息
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
        if ( hasKey('licenserecord', oHash) ) {
            //加载单驾照信息
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
    }else{
        console.log('传参失败！');
    }

    //返回对象o是否存在属性keyname
    function hasKey(keyname, o) {
        return keyname in o;
    }
});