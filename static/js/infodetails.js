$(function(){function i(i){switch(i){case"carquery":s("cartype",f)&&s("carid",f)&&(e={register:d,cartype:f.cartype,carid:decodeURI(f.carid),baseDomain:t},b.init({dom:$("#c_Table_b"),type:"carquery",url:a,data:e}));break;case"cardquery":s("licenserecord",f)&&(e={register:d,licenceRecord:f.licenserecord,baseDomain:t},b.init({dom:$("#c_Table_b"),type:"cardquery",url:c,data:e}));break;case"v_car_list":case"v_card_list":case"flow_car_list":case"flow_card_list":b.init({dom:$("#c_Table_b"),type:i,data:f});break;case"query_ksyy":case"query_kscj":s("sfzmmc",f)&&s("sfzmhm",f)&&s("lsh",f)&&s("ksyy",f)&&s("kskm",f)&&(e={register:d,sfzmmc:f.sfzmmc,sfzmhm:f.sfzmhm,lsh:f.lsh,ksyy:f.ksyy,kskm:f.kskm,baseDomain:t},"query_ksyy"===i&&b.init({dom:$("#c_Table_b"),type:"query_ksyy",url:v,data:e}),"query_kscj"===i&&b.init({dom:$("#c_Table_b"),type:"query_kscj",url:n,data:e}));break;case"query_njyy":s("hpzl",f)&&s("hphm",f)&&s("clsbdh",f)&&(e={register:d,hpzl:f.hpzl,hphm:f.hphm,clsbdh:f.clsbdh,baseDomain:t},b.init({dom:$("#c_Table_b"),type:"query_njyy",url:m,data:e}));break;case"query_sgkc":s("flowid",f)&&(e={baseDomain:t,flowid:f.flowid,baseDomain:t}),b.init({dom:$("#c_Table_b"),type:i,url:o,data:e});break;default:console.log("it's not this mode!!")}}function s(i,s){return i in s}if(!App.addOnlineStatusListener())return!1;var e,l,t=App.LS.get("App_baseDomain"),d=App.LS.get("App_userName"),a=jnjjApp.config.requestUrl+"/jnpublic/queryOneCar.json",c=jnjjApp.config.requestUrl+"/jnpublic/queryOneLicense.json",v=jnjjApp.config.requestUrl+"/jnpublic/ksyyquery.json",n=jnjjApp.config.requestUrl+"/jnpublic/kscjquery.json",m=jnjjApp.config.requestUrl+"/jnpublic/njyycx.json",o=jnjjApp.config.wechatServer+"/recordServlet?",r=decodeURI(window.location.hash),f={},u=App.getPageId(window.location.href);console.dir(r);var b={loading:null,init:function(i){this.dom=i.dom,this.type=i.type,this.url=i.url||null,this.params=i.data,this.load()},load:function(i,s,e){var l=this,t=s||l.url,d=e||l.params,a=i||l.dom;l.loading=App.UI("dialog",{msg:"数据加载中"}),!t&&d&&(l.render(d,a),l.bindEvent(),l.loading.remove()),t&&App.getAjaxData(t,d,function(i){var s;i.carQueryResponse&&(s=i.carQueryResponse),i.licenseQueryResponse&&(s=i.licenseQueryResponse),i.cgsCommonResponse&&(s=i.cgsCommonResponse),(i.success===!0||i.success===!1)&&(s=i.msg),s?(l.render(s,a),l.bindEvent(),l.loading.remove()):(l.loading=l.loading.resetMsg("加载失败"),setTimeout(function(){l.loading.remove()},500))})},render:function(i,s){var e,l=this,t=s,d=l.type;e=l.getHtml(d,i),t.append(e)},bindEvent:function(){var i=this,s=[],e=[],l=i.dom.find(".ui-pic img"),t=i.dom.find(".ui_btn");return l.length||t.length?(l.length&&l.each(function(i){var e=$(this);s.push(e.attr("src")),e.on("click",function(){Wisp.UI.Gallery.open({active:i,images:s.join("|")})})}),void(t.length&&t.each(function(){var s=$(this),l=s.data("for");e.push(l),"handle"===l?s.on("click",function(){App.UI("dialog",{type:"confirm",title:"公众服务平台",msg:"确定处理？"},function(e){"OK"===e&&(i.loading=App.UI("dialog",{msg:"违法处理中"}),setTimeout(function(){i.loading.remove(),App.UI("dialog",{type:"confirm",title:"公众服务平台",msg:"处理成功！马上缴费？",OkTxt:"去缴费",CancelTxt:"暂不"},function(e){if("OK"===e&&window.open("pay.html"),"CANCEL"===e){var l=Wisp.UI.Webview.init({PageId:u});l.close();var d=Wisp.UI.Webview.init({PageId:p});d.refresh(),l=null,d=null}s.parent().text("已处理"),t.off("click"),i.bindEvent()})},1200))})}):"pay"===l&&-1!==$.inArray("handle",e)?s.on("click",function(){App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"违法尚未处理，无法缴费，请先处理！"})}):"pay"===l&&-1===$.inArray("handle",e)&&s.on("click",function(){window.open("pay.html")})}))):!1},getHtml:function(i,s){var e,l,t=this;switch(i){case"carquery":"NO_RESULT"!==s.carList[0].msg?(l=$.parseJSON(s.carList[0].msg),e=['<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">号牌种类</div>','                    <div class="item-after">'+l.hpzl+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">号牌号码</div>','                    <div class="item-after">'+l.hphm+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">车辆状态</div>','                    <div class="item-after">'+l.clzt+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">姓名</div>','                    <div class="item-after">'+l.xm+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">检验有效期止</div>','                    <div class="item-after">'+t.formatTime(l.jyyxqz)+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">强制报废期止</div>','                    <div class="item-after">'+t.formatTime(l.qzbfqz)+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">逾期检验强制报废期止</div>','                    <div class="item-after">'+t.formatTime(l.yqjyqzbfqz)+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">逾期两个检验周期期止</div>','                    <div class="item-after">'+t.formatTime(l.yqjybfqz2)+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">保险终止日期(参考)</div>','                    <div class="item-after">'+t.formatTime(l.bxzzrq)+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">环保达标情况(参考)</div>','                    <div class="item-after">'+l.hbdbqk+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">更新日期</div>','                    <div class="item-after">'+t.formatTime(l.gxsj)+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>"].join("")):e=t.getHtmlNoResult();break;case"cardquery":"NO_RESULT"!==s.licenseList[0].msg?(l=$.parseJSON(s.licenseList[0].msg),e=['<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">准驾车型</div>','                    <div class="item-after">'+l.zjcx+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">驾驶证状态</div>','                    <div class="item-after">'+l.jszzt+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">累计记分</div>','                    <div class="item-after">'+l.ljjf+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">下一清分日期</div>','                    <div class="item-after">'+t.formatTime(l.xyqfrq)+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">下一审验日期</div>','                    <div class="item-after">'+t.formatTime(l.xysyrq)+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">更新日期</div>','                    <div class="item-after">'+t.formatTime(l.gxsj)+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>"].join("")):e=t.getHtmlNoResult();break;case"v_car_list":e=['<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-position"></i></div>','                <div class="item-inner">','                    <div class="item-title label">违法地点</div>','                    <div class="item-after wfdd fs08">'+s.wfdd+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-action"></i></div>','                <div class="item-inner">','                    <div class="item-title label">违法行为</div>','                    <div class="item-after wfdd fs08">'+s.wfxw+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-time"></i></div>','                <div class="item-inner">','                    <div class="item-title label">违法时间</div>','                    <div class="item-after">'+t.formatTime(s.wfsj)+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-money"></i></div>','                <div class="item-inner">','                    <div class="item-title fw">罚款金额</div>','                    <div class="item-after">￥'+s.fkje+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-tag"></i></div>','                <div class="item-inner">','                    <div class="item-title label">处理情况</div>','                    <div class="item-after">'+("1"===s.clqk?"已处理":"未处理<a data-for='handle' class='ui_btn ui_btn_01 ui_radius'>处理</a>")+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-time"></i></div>','                <div class="item-inner">','                    <div class="item-title label">处理时间</div>','                    <div class="item-after">'+t.formatTime(s.clsj)+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-tag"></i></div>','                <div class="item-inner">','                    <div class="item-title label">缴款情况</div>','                    <div class="item-after">'+("1"===s.jkqk?"已缴款":"未缴款")+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-time"></i></div>','                <div class="item-inner">','                    <div class="item-title label">缴款时间</div>','                    <div class="item-after">'+t.formatTime(s.jksj)+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>"].join("");break;case"v_card_list":e=['<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-position"></i></div>','                <div class="item-inner">','                    <div class="item-title label">违法地点</div>','                    <div class="item-after wfdd fs08">'+s.wfdd+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-action"></i></div>','                <div class="item-inner">','                    <div class="item-title label">违法行为</div>','                    <div class="item-after wfdd fs08">'+s.wfxw+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-time"></i></div>','                <div class="item-inner">','                    <div class="item-title label">违法时间</div>','                    <div class="item-after">'+t.formatTime(s.wfsj)+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>"].join(""),"undefined"!==s.wfjfs&&(e+=['<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-record"></i></div>','                <div class="item-inner">','                    <div class="item-title fw">违法记分数</div>','                    <div class="item-after">'+s.wfjfs+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-money"></i></div>','                <div class="item-inner">','                    <div class="item-title label">罚款金额</div>','                    <div class="item-after">￥'+s.fkje+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-time"></i></div>','                <div class="item-inner">','                    <div class="item-title label">处理时间</div>','                    <div class="item-after">'+t.formatTime(s.clsj)+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-tag"></i></div>','                <div class="item-inner">','                    <div class="item-title label">缴款情况</div>','                    <div class="item-after">'+("1"===s.jkqk?"已缴款":"未缴款")+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-time"></i></div>','                <div class="item-inner">','                    <div class="item-title label">缴款时间</div>','                    <div class="item-after">'+t.formatTime(s.jksj)+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>"].join("")),"undefined"!==s.jscjsj&&(e+=['<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-time"></i></div>','                <div class="item-inner">','                    <div class="item-title fw">接受处理时间</div>','                    <div class="item-after">'+t.formatTime(s.jscjsj)+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-tag"></i></div>','                <div class="item-inner">','                    <div class="item-title label">裁决标记</div>','                    <div class="item-after">'+("0"===s.cjbj?"未裁决":"已裁决")+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-time"></i></div>','                <div class="item-inner">','                    <div class="item-title label">裁决时间</div>','                    <div class="item-after">'+t.formatTime(s.cjsj)+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>"].join(""));break;case"query_ksyy":null!==s.cgsCommonList?(l=s.cgsCommonList[0],e=['<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-user"></i></div>','                <div class="item-inner">','                    <div class="item-title label">姓 名</div>','                    <div class="item-after">'+l.xm+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-cardnum"></i></div>','                <div class="item-inner">','                    <div class="item-title label">证件号码</div>','                    <div class="item-after">'+l.sfzmhm+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-calendar2"></i></div>','                <div class="item-inner">','                    <div class="item-title label">预约日期</div>','                    <div class="item-after">'+l.yyrq+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-calendar2"></i></div>','                <div class="item-inner">','                    <div class="item-title label">考试日期</div>','                    <div class="item-after">'+l.ksrq+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-position2"></i></div>','                <div class="item-inner">','                    <div class="item-title label">考试地点</div>','                    <div class="item-after">'+l.kcmc+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>"].join("")):e=t.getHtmlNoResult(s.msg);break;case"query_kscj":null!==s.cgsCommonList?(l=s.cgsCommonList[0],e=['<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-user"></i></div>','                <div class="item-inner">','                    <div class="item-title label">姓 名</div>','                    <div class="item-after">'+l.xm+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-cardnum"></i></div>','                <div class="item-inner">','                    <div class="item-title label">证件号码</div>','                    <div class="item-after">'+l.sfzmhm+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-record2"></i></div>','                <div class="item-inner">','                    <div class="item-title label">考试成绩</div>','                    <div class="item-after">'+l.kscj+"分</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-flag"></i></div>','                <div class="item-inner">','                    <div class="item-title label">是否合格</div>','                    <div class="item-after">'+(l.zt+0===1?"合格":"不合格")+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-calendar2"></i></div>','                <div class="item-inner">','                    <div class="item-title label">考试日期</div>','                    <div class="item-after">'+l.ksrq+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-position2"></i></div>','                <div class="item-inner">','                    <div class="item-title label">考试地点</div>','                    <div class="item-after wfdd fs08">'+l.kcmc+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-nail"></i></div>','                <div class="item-inner">','                    <div class="item-title label">考试场次</div>','                    <div class="item-after">'+(l.kscc+0===1?"上午":"下午")+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>"].join("")):e=t.getHtmlNoResult(s.msg);break;case"query_njyy":s instanceof Array?(l=$.parseJSON(s[0].msg),e=['<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-pen"></i></div>','                <div class="item-inner">','                    <div class="item-title label">预约编号</div>','                    <div class="item-after">'+l.yybh+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-cartype"></i></div>','                <div class="item-inner">','                    <div class="item-title label">号牌种类</div>','                    <div class="item-after">'+l.hpzl+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-carnum2"></i></div>','                <div class="item-inner">','                    <div class="item-title label">号牌号码</div>','                    <div class="item-after">'+l.hphm+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-cardnum"></i></div>','                <div class="item-inner">','                    <div class="item-title label">业务类型</div>','                    <div class="item-after">'+l.ywlx+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-calendar2"></i></div>','                <div class="item-inner">','                    <div class="item-title label w6">预约办理日期</div>','                    <div class="item-after">'+l.yyblrq+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-time"></i></div>','                <div class="item-inner">','                    <div class="item-title label w6">预约办理时间</div>','                    <div class="item-after">'+l.yyblsj+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>"].join("")):e=t.getHtmlNoResult(s);break;case"query_sgkc":s instanceof Array?(l=s[0],e=['<div class="list-block sgkc">',"    <ul>","        <li>",'            <div class="item-content ovh db">','                <div class="ui-pic">','                    <img src="'+l.pic1+'">','                    <img src="'+l.pic2+'">','                    <img src="'+l.pic3+'">',"                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-time"></i></div>','                <div class="item-inner">','                    <div class="item-title label">时间</div>','                    <div class="item-after">'+l.recordtime+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-media"><i class="icon icon-position"></i></div>','                <div class="item-inner">','                    <div class="item-title label">地点</div>','                    <div class="item-after wfdd fs08">'+l.location+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>"].join("")):e=t.getHtmlNoResult(s);break;case"flow_car_list":e=['<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">流水号</div>','                    <div class="item-after">'+s.lsh+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">业务类型</div>','                    <div class="item-after">'+s.ywlx+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">号牌种类</div>','                    <div class="item-after">'+s.hpzl+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">号牌号码</div>','                    <div class="item-after">鲁'+s.hphm+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">机动车所有人</div>','                    <div class="item-after">'+s.syr+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">中文品牌</div>','                    <div class="item-after">'+s.clpp1+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">申办日前</div>','                    <div class="item-after">'+t.formatTime(s.sqrq)+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">办结日期</div>','                    <div class="item-after">'+t.formatTime(s.bjrq)+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">下一岗位</div>','                    <div class="item-after">'+s.xygw+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>"].join("");break;case"flow_card_list":e=['<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">流水号</div>','                    <div class="item-after">'+s.lsh+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">业务类型</div>','                    <div class="item-after">'+s.ywlx+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">姓名</div>','                    <div class="item-after">'+s.xm+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">身份证明号码</div>','                    <div class="item-after">'+s.sfzmhm+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">开始时间</div>','                    <div class="item-after">'+t.formatTime(s.kssj)+"</div>","                </div>","            </div>","        </li>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">结束时间</div>','                    <div class="item-after">'+t.formatTime(s.jssj)+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>",'<div class="list-block">',"    <ul>","        <li>",'            <div class="item-content">','                <div class="item-inner">','                    <div class="item-title fw">下一岗位</div>','                    <div class="item-after">'+s.xygw+"</div>","                </div>","            </div>","        </li>","    </ul>","</div>"].join("");break;default:e=t.getHtmlNoResult()}return e},getHtmlNoResult:function(i){var s;s="NO_RESULT"===i||void 0===i?"无记录！":i;var e=[' <div class="noresult">',"     <b>"+s+"</b>"," </div>"].join("");return e},formatData:function(i){for(var s=i.substring(1,i.length-1),e=s.split(",{"),l=e.length,t=0;l>t;t++)t&&(e[t]="{"+e[t]),e[t]=$.parseJSON(e[t]);return console.dir(e),e},formatTime:function(i){return i.split(" ")[0]}};if(r){f=App.getHash(r),l=f.mode,l&&i(l);var p=App.LS.get(l)}else console.log("传参失败！");App.UI("tabToggle",{dom:$("#tab_violation"),activeClass:"active"})});