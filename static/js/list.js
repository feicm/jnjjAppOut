$(function(){function e(e,i){return e in i}if(!App.addOnlineStatusListener())return!1;var i=App.LS.get("App_userName"),a=App.LS.get("App_baseDomain"),t=(new Date).getTime(),s=App.getPageId(window.location.href),n=jnjjApp.config.requestUrl+"/jnpublic/queryCar.json",r=jnjjApp.config.requestUrl+"/jnpublic/queryLicense.json",l=jnjjApp.config.requestUrl+"/jnpublic/electIllegalquery.json",c=jnjjApp.config.requestUrl+"/jnpublic/violationQuery.json",o=jnjjApp.config.requestUrl+"/jnpublic/vioforcequery.json",d="bindcar.html?@@webViewPageId="+t+Wisp.CommenFunc.getRandom()+"@@",p="bindcard.html?@@webViewPageId="+t+Wisp.CommenFunc.getRandom()+"@@",u={register:i,axisFlag:!1,baseDomain:a},b={moduleCH:{car:"车辆",card:"驾照",violation_car:"已绑定车辆",violation_card:"已绑定驾照",v_car_list:"车辆电子监控",v_card_list:"驾照现场违法信息"},dialog:null,currentBtn:null,preQuestUrl:"adapter?open&url="+jnjjApp.config.requestUrl,urlRouter:{bindcar:"bindcar.html?@@webViewPageId="+t+Wisp.CommenFunc.getRandom()+"@@",bindcard:"bindcard.html?@@webViewPageId="+t+Wisp.CommenFunc.getRandom()+"@@",v_car_list:"resultlist.html",v_card_list:"resultlisttab.html",bandCar:jnjjApp.config.requestUrl+"/jnpublic/bandCar.json",bandLicense:jnjjApp.config.requestUrl+"/jnpublic/bandLicense.json"},resultUrl:"infodetails.html",init:function(e,i){this.listWrap=e.listWrap,this.tipsWrap=e.tipsWrap,this.defaultBtn=e.defaultBtn||null,this.module=e.module,this.requestUrl=e.requestUrl,this.params=e.datas,this.callback=i||null;var a=this;a.requestData(a.requestUrl,a.params,function(e){var i=[];e.carList&&(i=e.carList),e.licenseList&&(i=e.licenseList),"true"===e.success&&(i=e.msg),i.length?(a.defaultBtn&&a.hideDefaultBtn(),a.renderList(i),a.bindEvent(),a.callback&&a.callback()):(a.renderList(),a.callback&&a.callback())})},renderList:function(e){var i=this,a=Array.prototype.slice.call(arguments),t=i.listWrap,s=i.tipsWrap,n="",r="";a.length?(n=i.getListHtml(e,i.module),t.append(n),i.setCurrentBtn(i.module),i.dialog.remove()):("car"===i.module||"card"===i.module?(r=['<i class="fl icon icon-larger'+i.module+'"></i>',"<h2>查询更便捷，绑定"+i.moduleCH[i.module]+"</h2>"].join(""),s.append(r)):(n=i.getHtmlNoResult(),t.append(n)),i.dialog.remove())},hideDefaultBtn:function(){var e=this;e.defaultBtn&&e.defaultBtn.remove()},bindEvent:function(){var e=this,a=e.listWrap,t=e.module;return"car"===t||"card"===t?(a.children("li").find("a.db").on("click",function(){e.listListener(t,$(this))}),e.currentBtn.on("click",function(){window.open(e.urlRouter["bind"+t])}),"car"===t?$(".button").each(function(){var a=$(this),t=a.data("opts"),s=e.urlRouter.bandCar,n={register:i,carNumType:t.carNumType,carNum:t.carid.substring(1),carFramId:t.carFramId,optiontype:"N"};a.on("click",function(){e.unbind(a,s,n)})}):"card"===t&&$(".button").each(function(){var a=$(this),t=a.data("opts"),s=e.urlRouter.bandLicense,n={register:i,licenseid:t.licenseid,optiontype:"N"};a.on("click",function(){e.unbind(a,s,n)})}),!1):void a.children("li").on("click",function(){e.listListener(t,$(this))})},unbind:function(e,i,a){var t=this;t.dialog=App.UI("dialog",{msg:"解绑中···"}),App.getAjaxData(i,a,function(i){var a;return"error"===i?(t.dialog.remove(),void App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"解绑失败！"})):(i.licenseBandResponse&&(a=i.licenseBandResponse),i.carBandResponse&&(a=i.carBandResponse),void("true"===a.bandSuccess?(t.dialog.resetMsg("解绑成功！"),setTimeout(function(){t.dialog.remove(),e.parents("li").remove()},500)):(t.dialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"解绑失败！"}))))})},listListener:function(e,i){var a=this,t=i;switch(t.off("click"),e){case"car":var s=t.parent("li").attr("data-cartype"),n=t.parent("li").attr("data-carid"),r=encodeURI("#mode=carquery@cartype="+s+"@carid="+n);window.open(a.resultUrl+r);break;case"card":var l=t.parent("li").attr("data-licenserecord"),r=encodeURI("#mode=cardquery@licenserecord="+l);window.open(a.resultUrl+r);break;case"violation_car":var c;c=$("#nodo01").prop("checked")?0:"";var o=t.data("opt"),r=encodeURI("?@@webViewPageId="+(new Date).getTime()+"@@#"+o+"@jkbj="+c);window.open(a.urlRouter.v_car_list+r);break;case"violation_card":var c;c=$("#nodo02").prop("checked")?0:"";var o=t.data("opt"),r=encodeURI("#"+o+"@jkbj="+c);window.open(a.urlRouter.v_card_list+r);break;case"v_car_list":case"v_card_list":var d=t.data("opt"),r=encodeURI("#mode="+e+d);window.open(a.resultUrl+"?@@webViewPageId="+(new Date).getTime()+"@@"+r)}t.on("click",function(){a.listListener(e,$(this))})},getListHtml:function(e,i){var a,t,s,n=this,r=e.length,l=[];switch(i){case"car":for(var c=0;r>c;c++)t=['<li data-cartype="'+e[c].carNumType+'" data-carid="'+e[c].carid+'">','    <h1 class="t1">','        <i class="icon icon-car2 fl"></i>',"        <b>"+e[c].carid+"</b>","        <a data-opts="+JSON.stringify(e[c])+' class="button fr fs08">解绑</a>',"    </h1>",'    <a class="db">','        <p class="p1">','            <b class="label01 fl">车主</b>','            <b class="txt02 fr">'+e[c].carowner+"</b>","        </p>",'        <p class="p1">','            <b class="label01 fl">身份证</b>','            <b class="txt02 fr">'+e[c].indentityid.substring(0,4)+"******"+e[c].indentityid.substring(16,18)+"</b>","        </p>",'        <i class="icon01 icon01_arr_r"></i>',"    </a>","</li>"].join(""),l.push(t);s=n.getBtnHtml(i),a=l.join("")+s;break;case"card":for(var c=0;r>c;c++)t=['<li data-licenserecord="'+e[c].licenseRecord+'">','    <h1 class="t1">','        <i class="icon icon-card2 fl"></i>',"        <b>"+e[c].licenseRecord+"</b>","        <a data-opts="+JSON.stringify(e[c])+' class="button fr fs08">解绑</a>',"    </h1>",'    <a class="db">','        <p class="p1">','            <b class="label01 fl">驾驶人</b>','            <b class="txt02 fr">'+e[c].licenseName+"</b>","        </p>",'        <p class="p1">','            <b class="label01 fl">身份证</b>','            <b class="txt02 fr">'+e[c].licenseid.substring(0,4)+"******"+e[c].licenseid.substring(16,18)+"</b>","        </p>",'        <i class="icon01 icon01_arr_r"></i>',"    </a>","</li>"].join(""),l.push(t);s=n.getBtnHtml(i),a=l.join("")+s;break;case"violation_car":for(var c=0;r>c;c++)t=['<li class="list_hover" data-opt="@cartype='+e[c].carNumType+"@carid="+e[c].carid+'">','    <div class="item-content ovh db">','        <div class="ui-pic fl">','            <img src="images/ico_car2.png">',"        </div>",'        <h1 class="h1 bg_arr_r">','            <b class="fw f12">车主姓名</b>&nbsp;&nbsp;<b class="fw f12">'+e[c].carowner+"</b><br>",'            <b class="txt02">号牌号码</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b class="txt02">'+e[c].carid+"</b>","        </h1>","    </div>","</li>"].join(""),l.push(t);a=l.join("");break;case"violation_card":for(var c=0;r>c;c++)t=['<li class="list_hover" data-opt="@licenseid='+e[c].licenseid+'">','    <div class="item-content ovh db">','        <div class="ui-pic fl">','            <img src="images/ico_card2.png">',"        </div>",'        <h1 class="h1 bg_arr_r">','            <b class="fw f12">驾驶人</b>&nbsp;&nbsp;<b class="fw f12">'+e[c].licenseName+"</b><br>",'            <b class="txt02">'+e[c].licenseid.substring(0,4)+"******"+e[c].licenseid.substring(16,18)+"</b>","        </h1>","    </div>","</li>"].join(""),l.push(t);a=l.join("");break;case"v_car_list":case"v_card_list":var o,d=e,p="",u="",b=[];if("NO_RESULT"!==d){d=n.formatData(d),o=d.length;for(var c=0;o>c;c++)u="@wfxw="+d[c].wfxw+"@wfsj="+d[c].wfsj+"@wfdd="+d[c].wfdd,"v_car_list"===i&&(u+="@clqk="+d[c].clqk+"@clsj="+d[c].clsj+"@fkje="+d[c].fkje+"@jkqk="+d[c].jkqk+"@jksj="+d[c].jksj),"v_card_list"===i&&(u+="@wfjfs="+d[c].wfjfs+"@fkje="+d[c].fkje+"@clsj="+d[c].clsj+"@jkqk="+d[c].jkqk+"@jksj="+d[c].jksj+"@jscjsj="+d[c].jscjsj+"@cjbj="+d[c].cjbj+"@cjsj="+d[c].cjsj),p=['<li class="list_hover" data-opt="'+u+'">','    <span class="ui-seal m-list-c1-sts '+("1"===d[c].jkqk?"dbn":"")+'">未处理</span>','    <div class="top">'+d[c].hphm+"</div>",'    <div class="item-content ovh db">','        <h1 class="h1 bg_arr_r">','            <b class="fw"><i class="icon icon-action"></i>违法行为</b><b class="fw fr mr2 wfxw">'+d[c].wfxw+"</b><br>",'            <b class="fw"><i class="icon icon-time"></i>违法时间</b><b class="fw fr mr2">'+n.formatTime(d[c].wfsj)+"</b>","        </h1>","    </div>","</li>"].join(""),b.push(p)}a=b.join("")}return a},getBtnHtml:function(e){var i=['<a class="ui_btn ui_btn_01 ui_radius ui_btn_block" data-mode="'+e+'">',"    +添加绑定","</a>"].join("");return i},getHtmlNoResult:function(e){var i;i="NO_RESULT"===e||void 0===e?"无记录！":e;var a=[' <div class="noresult">',"     <b>"+i+"</b>"," </div>"].join("");return a},setCurrentBtn:function(e){var i=this;$(".ui_btn").data("mode")===e&&(i.currentBtn=$(".ui_btn"),App.UI("buttonHover",{dom:i.currentBtn,hoverClassName:"ui_btn_01_hover"}))},formatData:function(e){for(var i=e.substring(1,e.length-1),a=i.split(",{"),t=a.length,s=0;t>s;s++)s&&(a[s]="{"+a[s]),a[s]=$.parseJSON(a[s]);return console.dir(a),a},formatTime:function(e){return e.split(" ")[0]},requestData:function(e,i,a){{var t=this,s=e,n=i,r=a;t.module}t.dialog=App.UI("dialog",{msg:"数据加载中···"}),App.getAjaxData(s,n,function(e){var i;e.carQueryResponse&&(i=e.carQueryResponse),e.licenseQueryResponse&&(i=e.licenseQueryResponse),e.electIllegalResponse&&(i=e.electIllegalResponse),e.violationInfoResponse&&(i=e.violationInfoResponse),e.vioforceResponse&&(i=e.vioforceResponse),i?r&&r(i):(t.dialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:t.moduleCH[t.module]+"列表初始化失败！"}))})}},f=$(".c").data("mode");App.LS.set(f,s);var m=decodeURI(window.location.hash),v={};if(m?v=App.getHash(m):console.log("传参失败！"),"car"===f){var j=$("#go_carbindpage");j.on("click",function(){window.open(d)}),b.init({listWrap:$(".ui-list"),tipsWrap:$(".tips"),defaultBtn:j,module:f,requestUrl:n,datas:u})}if("card"===f){var g=$("#go_cardbindpage");g.on("click",function(){window.open(p)}),b.init({listWrap:$(".ui-list"),tipsWrap:$(".tips"),defaultBtn:g,module:f,requestUrl:r,datas:u})}if(("violation"===f||"violationHandle"===f)&&(b.init({listWrap:$("#violation_car"),tipsWrap:$(".tips"),module:"violation_car",requestUrl:n,datas:u},function(){"violationHandle"!==f&&b.init({listWrap:$("#violation_card"),tipsWrap:$(".tips"),module:"violation_card",requestUrl:r,datas:u})}),App.UI("tabToggle",{dom:$("#tab_violation"),activeClass:"active"})),"v_car_list"===f&&e("cartype",v)&&e("carid",v)&&e("jkbj",v)&&(u={register:i,carNumType:v.cartype,carNum:decodeURI(v.carid),jkbj:v.jkbj,baseDomain:a},b.init({listWrap:$(".list-block ul"),module:f,requestUrl:l,datas:u})),"v_card_list"===f&&e("licenseid",v)&&e("jkbj",v)){var u={register:i,indentyid:v.licenseid,jkbj:v.jkbj,baseDomain:a};if(""!==v.jkbj)var h={register:i,indentyid:v.licenseid,cjbj:v.jkbj,baseDomain:a};else var h={register:i,indentyid:v.licenseid,cjbj:null,baseDomain:a};b.init({listWrap:$("#tab-item-01 ul"),module:f,requestUrl:c,datas:u},function(){b.init({listWrap:$("#tab-item-02 ul"),module:f,requestUrl:o,datas:h})}),App.UI("tabToggle",{dom:$("#tab_violation"),activeClass:"active"})}j&&App.UI("buttonHover",{dom:j,hoverClassName:"ui_btn_03_hover"}),g&&App.UI("buttonHover",{dom:g,hoverClassName:"ui_btn_03_hover"})});