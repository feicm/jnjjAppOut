$(function(){function e(e,a){return e in a}if(!App.addOnlineStatusListener())return!1;var a=App.LS.get("App_userName"),t=App.LS.get("App_baseDomain"),s=(new Date).getTime(),i=App.getPageId(window.location.href),r=jnjjApp.config.requestUrl+"/jnpublic/queryCar.json",l=jnjjApp.config.requestUrl+"/jnpublic/queryLicense.json",n=jnjjApp.config.requestUrl+"/jnpublic/vehFlow.json",c=jnjjApp.config.requestUrl+"/jnpublic/drvFlow.json",o=jnjjApp.config.requestUrl+"/jnpublic/electIllegalquery.json",d="http://119.163.106.187:9087/jnpublic/violationQueryByCar.json",p=jnjjApp.config.requestUrl+"/jnpublic/violationQuery.json",u=jnjjApp.config.requestUrl+"/jnpublic/vioforcequery.json",b=jnjjApp.config.requestUrl+"/jnpublic/queryCar.json",f="bindcar.html?@@webViewPageId="+s+Wisp.CommenFunc.getRandom()+"@@",m="bindcard.html?@@webViewPageId="+s+Wisp.CommenFunc.getRandom()+"@@",_={register:a,axisFlag:!1,baseDomain:t},j={moduleCH:{car:"车辆",card:"驾照",violation_car:"已绑定车辆",violation_card:"已绑定驾照",v_car_list:"车辆电子监控",v_card_list:"驾照现场违法信息"},dialog:null,currentBtn:null,listHtml:{},listIndex:{},listWrapObj:{},preQuestUrl:"adapter?open&url="+jnjjApp.config.requestUrl,urlRouter:{bindcar:"bindcar.html?@@webViewPageId="+s+Wisp.CommenFunc.getRandom()+"@@",bindcard:"bindcard.html?@@webViewPageId="+s+Wisp.CommenFunc.getRandom()+"@@",v_car_list:"v_car_tablist.html",v_card_list:"v_card_tablist.html",flow_car_list:"flow_car_list.html",flow_card_list:"flow_card_list.html",bandCar:jnjjApp.config.requestUrl+"/jnpublic/bandCar.json",bandLicense:jnjjApp.config.requestUrl+"/jnpublic/bandLicense.json",authOK:jnjjApp.config.requestUrl+"/jnpublic/todo.json",authNO:jnjjApp.config.requestUrl+"/jnpublic/todo.json"},resultUrl:"infodetails.html",init:function(e,a){this.listWrap=e.listWrap,this.tipsWrap=e.tipsWrap,this.defaultBtn=e.defaultBtn||null,this.module=e.module,this.checkHandle=e.checkHandle||null,this.requestUrl=e.requestUrl,this.params=e.datas,this.callback=a||null;var t=this;t.requestData(t.requestUrl,t.params,function(e){var a=[];e.carList&&(a=e.carList),e.licenseList&&(a=e.licenseList),e.vehFlowList&&(a=e.vehFlowList,e=a),e.drvFlowList&&(a=e.drvFlowList,e=a),"true"===e.success&&(a=e.msg),a.length&&null!==a?(t.defaultBtn&&t.hideDefaultBtn(),t.renderList(a),t.bindEvent(),t.callback&&t.callback()):(t.renderList(),t.callback&&t.callback())})},renderList:function(e){var a=this,t=Array.prototype.slice.call(arguments),s=a.listWrap,i=a.tipsWrap,r="",l="",n=[[],[]];t.length?(n=a.getMultData(e,a.module),s instanceof Array?a.renderTabList(n):(r=a.getListHtml(e,a.module),s.append(r),a.listWrapObj[a.module]=s,a.setCurrentBtn(a.module)),a.dialog.remove()):("car"===a.module||"card"===a.module?(l=['<i class="fl icon icon-larger'+a.module+'"></i>',"<h2>查询更便捷，绑定"+a.moduleCH[a.module]+"</h2>"].join(""),i.append(l)):s instanceof Array?a.renderTabList(n):(r=a.getHtmlNoResult(),s.append(r)),a.dialog.remove())},renderTabList:function(e){for(var a=this,t="",s=0;s<e.length;s++)e[s].length?(t=a.getListHtml(e[s],a.module),a.listWrap[s].append(t)):(t=a.getHtmlNoResult(),a.listWrap[s].append(t))},hideDefaultBtn:function(){var e=this;e.defaultBtn&&e.defaultBtn.remove()},bindEvent:function(e){var s=this,i=e||s.listWrap,r=s.module;if("car"===r||"card"===r)return i.children("li").find("a.db").on("click",function(){s.listListener(r,$(this))}),s.currentBtn.on("click",function(){window.open(s.urlRouter["bind"+r])}),"car"===r?$(".button").each(function(){var e=$(this),i=e.data("opts"),r=s.urlRouter.bandCar,l={register:a,carNumType:i.carNumType,carNum:i.carid.substring(1),carFramId:i.carFramId,optiontype:"N",baseDomain:t};e.on("click",function(){s.unbind(e,r,l)})}):"card"===r&&$(".button").each(function(){var e=$(this),i=e.data("opts"),r=s.urlRouter.bandLicense,l={register:a,licenseid:i.licenseid,optiontype:"N",baseDomain:t};e.on("click",function(){s.unbind(e,r,l)})}),!1;if("authlist"===r)return i.children("li").find("a.db").on("click",function(){s.listListener(r,$(this))}),$(".button").each(function(){var e=$(this),i=e.data("opts"),r=e.data("isok")-0,l=r?"同意":"拒绝",n=r?s.urlRouter.authOK:s.urlRouter.authNO,c={register:a,carNumType:i.carNumType,carNum:i.carid.substring(1),carFramId:i.carFramId,optiontype:"N",baseDomain:t};e.on("click",function(){s.authAction(e,n,c,l)})}),!1;if(s.checkHandle&&s.checkHandle.on("change",function(){s.checkboxChanger(r,$(this).prop("checked"))}),i instanceof Array)for(var l=0;l<i.length;l++)i[l].children("li").on("click",function(){s.listListener(r,$(this))});else i.children("li").on("click",function(){s.listListener(r,$(this))})},unbind:function(e,a,t){var s=this;App.UI("dialog",{type:"confirm",title:"公众服务平台",msg:"你确定要取消绑定？"},function(i){return"OK"===i&&(s.dialog=App.UI("dialog",{msg:"解绑中···"}),App.getAjaxData(a,t,function(a){var t;return"error"===a?(s.dialog.remove(),void App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"解绑失败！"})):(a.licenseBandResponse&&(t=a.licenseBandResponse),a.carBandResponse&&(t=a.carBandResponse),void("true"===t.bandSuccess?(s.dialog.resetMsg("解绑成功！"),setTimeout(function(){s.dialog.remove(),e.parents("li").remove()},500)):(s.dialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"解绑失败！"}))))})),"CANCEL"===i?!1:void 0})},authAction:function(e,a,t,s){var i=this;App.UI("dialog",{type:"confirm",title:"公众服务平台",msg:"你确定要"+s+"授权？"},function(r){return"OK"===r&&(i.dialog=App.UI("dialog",{msg:s+"授权中···"}),App.getAjaxData(a,t,function(a){var t;return"error"===a?(i.dialog.remove(),void App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"操作失败！"})):(a.licenseBandResponse&&(t=a.licenseBandResponse),a.carBandResponse&&(t=a.carBandResponse),void("true"===t.bandSuccess?(i.dialog.resetMsg(s+"授权成功！"),setTimeout(function(){i.dialog.remove(),e.parents("li").remove()},500)):(i.dialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:s+"授权失败！"}))))})),"CANCEL"===r?!1:void 0})},listListener:function(e,a){var t=this,s=a;switch(s.off("click"),e){case"car":var i=s.parent("li").data("cartype"),r=s.parent("li").data("carid"),l=s.parent("li").data("carframid"),n=s.parent("li").data("indentityid"),c=encodeURI("#mode=carquery@cartype="+i+"@carid="+r+"@indentityid="+n+"@carFramId="+l);window.open(t.resultUrl+c);break;case"card":var o=s.parent("li").attr("data-licenserecord"),c=encodeURI("#mode=cardquery@licenserecord="+o+s.parent("li").data("opts"));window.open(t.resultUrl+c);break;case"violation_car":case"violationHandle_car":var d;d=$("#nodo01").prop("checked")?0:"";var p=s.data("opt"),c=encodeURI("?@@webViewPageId="+(new Date).getTime()+"@@#"+p+"@jkbj="+d);window.open(t.urlRouter.v_car_list+c);break;case"violation_card":var d;d=$("#nodo02").prop("checked")?0:"";var p=s.data("opt"),c=encodeURI("#"+p+"@jkbj="+d);window.open(t.urlRouter.v_card_list+c);break;case"v_car_list_t1":case"v_car_list_t2":case"v_card_list_t1":case"v_card_list_t2":case"flow_car_list":case"flow_card_list":var u=s.data("opt"),c=encodeURI("#mode="+e+u);window.open(t.resultUrl+"?@@webViewPageId="+(new Date).getTime()+"@@"+c);break;case"flow_car":var p=s.data("opt"),c=encodeURI("?@@webViewPageId="+(new Date).getTime()+"@@#"+p);window.open(t.urlRouter.flow_car_list+c);break;case"flow_card":var p=s.data("opt"),c=encodeURI("#"+p);window.open(t.urlRouter.flow_card_list+c);break;case"flow_car_list":case"flow_card_list":var u=s.data("opt"),c=encodeURI("#mode="+e+u);window.open(t.resultUrl+"?@@webViewPageId="+(new Date).getTime()+"@@"+c)}s.on("click",function(){t.listListener(e,$(this))})},checkboxChanger:function(e,a){var t=this,s=t.listHtml[e],i=t.listIndex[e],r=t.listWrapObj[e],l=[];if(a){t.removeList(r);for(var n=0,c=i.length;c>n;n++)l.push(s[i[n]]);r.append(l.join(""))}else t.removeList(r),r.append(s.join(""));t.bindEvent(r)},removeList:function(e){e.html("")},getListHtml:function(e,a){var t,s,i,r=this,l=e.length,n=[],c=1,o='<span class="ui-status ui-status-doing m-list-c1-sts ">申请中</span>';switch(a){case"car":for(var d=0;l>d;d++)s=['<li data-status="1" data-cartype="'+e[d].carNumType+'" data-indentityid="'+e[d].indentityid+'" data-carid="'+e[d].carid+'" data-carframid="'+e[d].carFramId+'">','    <h1 class="t1">','        <i class="icon icon-car2 fl"></i>',"        <b>"+e[d].carid+"</b>","        <a data-opts="+JSON.stringify(e[d])+' class="button fr fs08">解绑</a>',"    </h1>",'    <a class="db">','        <p class="p1">','            <b class="label01 fl">车主</b>','            <b class="txt02 fr">'+e[d].carowner+"</b>","        </p>",'        <p class="p1">','            <b class="label01 fl">身份证</b>','            <b class="txt02 fr">'+e[d].indentityid.substring(0,4)+"******"+e[d].indentityid.substring(16,18)+"</b>","        </p>",'        <i class="icon01 icon01_arr_r"></i>',"    </a>",1===c?o:"","</li>"].join(""),n.push(s);i=r.getBtnHtml(a),t=n.join("")+i;break;case"card":for(var d=0;l>d;d++)s=['<li data-opts="@licenseid='+e[d].licenseid+"@licenseName="+e[d].licenseName+'" data-licenserecord="'+e[d].licenseRecord+'">','    <h1 class="t1">','        <i class="icon icon-card2 fl"></i>',"        <b>"+e[d].licenseRecord+"</b>","        <a data-opts="+JSON.stringify(e[d])+' class="button fr fs08">解绑</a>',"    </h1>",'    <a class="db">','        <p class="p1">','            <b class="label01 fl">驾驶人</b>','            <b class="txt02 fr">'+e[d].licenseName+"</b>","        </p>",'        <p class="p1">','            <b class="label01 fl">身份证</b>','            <b class="txt02 fr">'+e[d].licenseid.substring(0,4)+"******"+e[d].licenseid.substring(16,18)+"</b>","        </p>",'        <i class="icon01 icon01_arr_r"></i>',"    </a>","</li>"].join(""),n.push(s);i=r.getBtnHtml(a),t=n.join("")+i;break;case"violation_car":case"violationHandle_car":case"flow_car":for(var d=0;l>d;d++)s=['<li class="list_hover" data-opt="@cartype='+e[d].carNumType+"@carid="+e[d].carid+'">','    <div class="item-content ovh db">','        <div class="ui-pic fl">','            <img src="images/ico_car2.png">',"        </div>",'        <h1 class="h1 bg_arr_r">','            <b class="fw f12">车主姓名</b>&nbsp;&nbsp;<b class="fw f12">'+e[d].carowner+"</b><br>",'            <b class="txt02">号牌号码</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b class="txt02">'+e[d].carid+"</b>","        </h1>","    </div>","</li>"].join(""),n.push(s);t=n.join("");break;case"violation_card":case"flow_card":for(var d=0;l>d;d++)s=['<li class="list_hover" data-opt="@licenseid='+e[d].licenseid+"@licenseName="+e[d].licenseName+'">','    <div class="item-content ovh db">','        <div class="ui-pic fl">','            <img src="images/ico_card2.png">',"        </div>",'        <h1 class="h1 bg_arr_r">','            <b class="fw f12">驾驶人</b>&nbsp;&nbsp;<b class="fw f12">'+e[d].licenseName+"</b><br>",'            <b class="txt02">'+e[d].licenseid.substring(0,4)+"******"+e[d].licenseid.substring(16,18)+"</b>","        </h1>","    </div>","</li>"].join(""),n.push(s);t=n.join("");break;case"v_car_list_t1":case"v_car_list_t2":case"v_card_list_t1":case"v_card_list_t2":var p,u=e,b="",f="",m=[];if(r.listIndex[a]=[],"NO_RESULT"!==u){u=r.formatData(u),p=u.length;for(var d=0;p>d;d++)f="@wfxw="+u[d].wfxw+"@wfsj="+u[d].wfsj+"@wfdd="+u[d].wfdd,("v_car_list_t1"===a||"v_car_list_t2"===a)&&("0"===u[d].jkqk&&r.listIndex[a].push(d),f+="@clqk="+u[d].clqk+"@clsj="+u[d].clsj+"@fkje="+u[d].fkje+"@jkqk="+u[d].jkqk+"@jksj="+u[d].jksj),("v_card_list_t1"===a||"v_card_list_t2"===a)&&("0"===u[d].jkqk&&r.listIndex[a].push(d),"0"===u[d].cjbj&&r.listIndex[a].push(d),f+="@wfjfs="+u[d].wfjfs+"@fkje="+u[d].fkje+"@clsj="+u[d].clsj+"@jkqk="+u[d].jkqk+"@jksj="+u[d].jksj+"@jscjsj="+u[d].jscjsj+"@cjbj="+u[d].cjbj+"@cjsj="+u[d].cjsj),b=['<li class="list_hover" data-opt="'+f+'">','    <span class="ui-status ui-status-seal m-list-c1-sts '+("1"===u[d].jkqk||"1"===u[d].cjbj?"dbn":"")+'">未处理</span>','    <div class="top">'+u[d].hphm+"</div>",'    <div class="item-content ovh db">','        <h1 class="h1 bg_arr_r">','            <b class="fw"><i class="icon icon-action"></i>违法行为</b><b class="fw fr mr2 wfxw">'+u[d].wfxw+"</b><br>",'            <b class="fw"><i class="icon icon-time"></i>违法时间</b><b class="fw fr mr2">'+r.formatTime(u[d].wfsj)+"</b>","        </h1>","    </div>","</li>"].join(""),m.push(b)}r.listHtml[a]=m,t=m.join("");break;case"flow_car_list":for(var d=0;l>d;d++)s=['<li data-opt="@lsh='+e[d].lsh+"@ywlx="+e[d].ywlx+"@syr="+e[d].syr+"@hpzl="+e[d].hpzl+"@hphm="+e[d].hphm+"@clpp1="+e[d].clpp1+"@sqrq="+e[d].sqrq+"@bjrq="+e[d].bjrq+"@xygw="+e[d].xygw+'">','    <article class="m_list_c1">',"        <h1>",'            <strong class="label-success fs10 mr05 fl">'+e[d].lsh+"</strong>",'            <em class="fl w100 mt05">业务类型 <b class="fr mr05 color_03">'+e[d].ywlx+"</b></em>",'            <em class="fl w100 mt05">机动车所有人 <b class="fr mr05 color_03">'+e[d].syr+"</b></em>","        </h1>","    </article>","</li>"].join(""),n.push(s);t=n.join("");break;case"flow_card_list":for(var d=0;l>d;d++)s=['<li data-opt="@lsh='+e[d].lsh+"@sfzmhm="+e[d].sfzmhm+"@xm="+e[d].xm+"@ywlx="+e[d].ywlx+"@kssj="+e[d].kssj+"@jssj="+e[d].jssj+"@xygw="+e[d].xygw+'">','    <article class="m_list_c1">',"        <h1>",'            <strong class="label-success fs10 mr05 fl">'+e[d].lsh+"</strong>",'            <em class="fl w100 mt05">业务类型 <b class="fr mr05 color_03">'+e[d].ywlx+"</b></em>",'            <em class="fl w100 mt05">姓名 <b class="fr mr05 color_03">'+e[d].xm+"</b></em>","        </h1>","    </article>","</li>"].join(""),n.push(s);t=n.join("");break;case"authlist":o='<span class="ui-status ui-status-doing m-list-c1-sts ">待授权</span>';for(var d=0;l>d;d++)s=['<li data-status="1" data-cartype="'+e[d].carNumType+'" data-indentityid="'+e[d].indentityid+'" data-carid="'+e[d].carid+'" data-carframid="'+e[d].carFramId+'">','    <h1 class="t1">','        <i class="icon icon-car2 fl"></i>',"        <b>"+e[d].carid+"</b>",'        <a data-isok="1" data-opts='+JSON.stringify(e[d])+' class="button fr fs08">同意授权</a>','        <a data-isok="0" data-opts='+JSON.stringify(e[d])+' class="button fr fs08">拒绝授权</a>',"    </h1>",'    <a class="db">','        <p class="p1">','            <b class="label01 fl">申请人</b>','            <b class="txt02 fr">'+e[d].carowner+"</b>","        </p>",'        <p class="p1">','            <b class="label01 fl">身份证</b>','            <b class="txt02 fr">'+e[d].indentityid.substring(0,4)+"******"+e[d].indentityid.substring(16,18)+"</b>","        </p>",'        <i class="icon01 icon01_arr_r"></i>',"    </a>",o,"</li>"].join(""),n.push(s);t=n.join("")}return t},getBtnHtml:function(e){var a=['<a class="ui_btn ui_btn_01 ui_radius ui_btn_block" data-mode="'+e+'">',"    +添加绑定","</a>"].join("");return a},getHtmlNoResult:function(e){var a;a="NO_RESULT"===e||void 0===e?"无记录！":e;var t=[' <div class="noresult">',"     <b>"+a+"</b>"," </div>"].join("");return t},setCurrentBtn:function(e){var a=this;$(".ui_btn").data("mode")===e&&(a.currentBtn=$(".ui_btn"),App.UI("buttonHover",{dom:a.currentBtn,hoverClassName:"ui_btn_01_hover"}))},formatData:function(e){for(var a=e.substring(1,e.length-1),t=a.split(",{"),s=t.length,i=0;s>i;i++)i&&(t[i]="{"+t[i]),t[i]=$.parseJSON(t[i]);return console.dir(t),t},formatTime:function(e){return e.split(" ")[0]},getMultData:function(e,a){var t=[[],[]];switch(a){case"flow_car_list":for(var s=0;s<e.length;s++)""===e[s].bjrq?t[0].push(e[s]):t[1].push(e[s]);break;case"flow_card_list":for(var s=0;s<e.length;s++)""===e[s].jssj?t[0].push(e[s]):t[1].push(e[s])}return t},requestData:function(e,a,t){{var s=this,i=e,r=a,l=t;s.module}s.dialog=App.UI("dialog",{msg:"数据加载中···"}),App.getAjaxData(i,r,function(e){var a;e.carQueryResponse&&(a=e.carQueryResponse),e.licenseQueryResponse&&(a=e.licenseQueryResponse),e.electIllegalResponse&&(a=e.electIllegalResponse),e.violationInfoResponse&&(a=e.violationInfoResponse),e.vioforceResponse&&(a=e.vioforceResponse),e.vehFlowResponse&&(a=e.vehFlowResponse),e.drvFlowResponse&&(a=e.drvFlowResponse),a?l&&l(a):(s.dialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:s.moduleCH[s.module]+"列表初始化失败！"}))})}},v=$(".c").data("mode");App.LS.set(v,i);var h=decodeURI(window.location.hash),g={};if(h?g=App.getHash(h):console.log("传参失败！"),"car"===v){var w=$("#go_carbindpage");w.on("click",function(){window.open(f)}),j.init({listWrap:$(".ui-list"),tipsWrap:$(".tips"),defaultBtn:w,module:v,requestUrl:r,datas:_})}else if("card"===v){var k=$("#go_cardbindpage");k.on("click",function(){window.open(m)}),j.init({listWrap:$(".ui-list"),tipsWrap:$(".tips"),defaultBtn:k,module:v,requestUrl:l,datas:_})}else if("violation"===v||"flow"===v||"violationHandle"===v)j.init({listWrap:$("#"+v+"_car"),tipsWrap:$(".tips"),module:v+"_car",requestUrl:r,datas:_},function(){"violationHandle"!==v&&j.init({listWrap:$("#"+v+"_card"),tipsWrap:$(".tips"),module:v+"_card",requestUrl:l,datas:_})}),App.UI("tabToggle",{dom:$("#tab_violation"),activeClass:"active"});else if("v_car_list"===v)e("cartype",g)&&e("carid",g)&&e("jkbj",g)&&(_={register:a,carNumType:g.cartype,carNum:decodeURI(g.carid),jkbj:g.jkbj,baseDomain:t},j.init({listWrap:$("#tab-item-01 ul"),module:"v_car_list_t1",checkHandle:$("#node01"),requestUrl:o,datas:_},function(){_={register:a,hpzl:g.cartype,hphm:decodeURI(g.carid),jkbj:g.jkbj,baseDomain:t},j.init({listWrap:$("#tab-item-02 ul"),module:"v_car_list_t2",checkHandle:$("#node02"),requestUrl:d,datas:_})}),App.UI("tabToggle",{dom:$("#tab_violation"),activeClass:"active"}));else if("v_card_list"===v){if(e("licenseid",g)&&e("jkbj",g)){var _={register:a,indentyid:g.licenseid,jkbj:g.jkbj,baseDomain:t};if(""!==g.jkbj)var y={register:a,indentyid:g.licenseid,cjbj:0,baseDomain:t};else var y={register:a,indentyid:g.licenseid,cjbj:"",baseDomain:t};j.init({listWrap:$("#tab-item-01 ul"),module:"v_card_list_t1",checkHandle:$("#node01"),requestUrl:p,datas:_},function(){j.init({listWrap:$("#tab-item-02 ul"),module:"v_card_list_t2",checkHandle:$("#node02"),requestUrl:u,datas:y})}),App.UI("tabToggle",{dom:$("#tab_violation"),activeClass:"active"})}}else"flow_car_list"===v?e("cartype",g)&&e("carid",g)&&(_={register:a,hpzl:g.cartype,hphm:decodeURI(g.carid).substr(1),baseDomain:t},j.init({listWrap:[$("#flow_car_list_01"),$("#flow_car_list_02")],module:v,requestUrl:n,datas:_})):"flow_card_list"===v?e("licenseid",g)&&e("licenseName",g)&&(_={register:a,sfzmhm:g.licenseid,xm:decodeURI(g.licenseName),baseDomain:t},j.init({listWrap:[$("#flow_card_list_01"),$("#flow_card_list_02")],module:v,requestUrl:c,datas:_})):"authlist"===v&&(_={register:a,baseDomain:t},j.init({listWrap:$(".ui-list"),module:v,requestUrl:b,datas:_}));w&&App.UI("buttonHover",{dom:w,hoverClassName:"ui_btn_03_hover"}),k&&App.UI("buttonHover",{dom:k,hoverClassName:"ui_btn_03_hover"}),App.UI("tabToggle",{dom:$("#tab"),activeClass:"active"})});