$(function(){if(!App.addOnlineStatusListener())return!1;var e=App.LS.get("App_userName"),t=jnjjApp.config.requestUrl+"/jnpublic/ksyytj.json",s=jnjjApp.config.requestUrl+"/jnpublic/njyypc.json",n=jnjjApp.config.requestUrl+"/jnpublic/njyysjd.json",i=jnjjApp.config.requestUrl+"/jnpublic/njyyrk.json",o=jnjjApp.config.requestUrl+"/jnpublic/carType.json",r=$("#c1_btn"),a=$("#c2_btn"),l=$("#c3_btn"),p=$("#c4_btn"),c=$("#njyy_btn"),g={hpzl:$("#hpzl"),hphm:$("#hphm"),clsbdh:$("#clsbdh"),name:$("#name"),phone:$("#phone"),jcxcode:$("#jcxdz"),yyrq:$("#yyrq"),kxsjd:$("#kxsjd"),date:$("#date"),curDate:null,progressDialog:null,baseDomain:App.LS.get("App_baseDomain"),init:function(e){this.firstBtn=e.firstBtn||null,this.secondBtn=e.secondsBtn||null,this.thirdBtn=e.thirdBtn||null,this.lastBtn=e.lastBtn||null,this.bindEvent("first")},bindEvent:function(e){var t=this,s=t.firstBtn,n=(t.secondBtn,t.thirdBtn,t.lastBtn);switch(e){case"first":s.on("click",function(){t.firstListener(s)});break;case"last":n.on("click",function(){t.lastListener(n)});case"dateItem":$("#njyypc_list li").on("click",function(){var e=$(this);t.dateItemListener(e)})}},render:function(e,t,s){var n,i=this,o=e,r=s,a=t;switch(o){case"list":n=i.getHtml(o,r),a.append(n);break;case"inputs":var l,p=[],c=i.kxsjd,g=$("#jcxdz"),m=$("#yyrq"),d=$("#rsxz"),h=$("#yyyrs");if(s instanceof Array){l=s[0],g.val(l.glbm),m.val(l.blrq),d.val(l.rsxz),h.val(l.yyrs),c.mobiscroll("clear"),c.html(""),_l=s.length;for(var v=0;_l>v;v++)p.push('<option value="'+s[v].blsj+'">'+s[v].blsj+"</option>");c.append(p.join("")),c.mobiscroll().select({theme:"ios7",lang:"zh",display:"bottom",mode:"scroller",minWidth:200}),i.progressDialog.remove(),i.bindEvent("last"),window.scrollTo(0,0)}else console.log("data格式错误")}},getHtml:function(e,t){var s,n,i,o=[];switch(e){case"list":if(t instanceof Array){n=t.length;for(var r=0;n>r;r++)i=['<li class="list_hover" data-code='+t[r].jcxcode+">",'    <section class="ui-g-fly2-b">','        <h1 class="txt02">预约人数<b class="fr">'+t[r].yyrs+"人</b></h1>",'        <h1 class="txt02">人数限制<b class="fr">'+t[r].rsxz+"人</b></h1>",'        <div class="txt02">',"            <h2>检测线地点</h2>","            <p>"+t[r].jcx+"</p>","        </div>","    </section>",'    <aside class="ui-g-fly0-b-r">','        <i class="icon01 icon01_arr_r"></i>',"    </aside>","</li>"].join(""),o.push(i)}else console.log("data格式错误")}return s=o.join("")},firstListener:function(s){var n,i=this,o=i.hpzl.val(),r=i.hphm.val(),a=i.clsbdh.val(),l=(i.name.val(),i.phone.val(),{}),p=s||i.firstBtn;p.off("click"),l={hphm:$("#hphm"),clsbdh:$("#clsbdh"),name:$("#name"),phone:$("#phone")},App.verify(l)&&(n={hpzl:o,hphm:"A"+r,clsbdh:a,register:e,baseDomain:i.baseDomain},i.progressDialog=App.UI("dialog",{msg:"预约资格审查中，请稍后！"}),App.getAjaxData(t,n,function(e){return"error"===e?(i.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"资格审查失败！"}),void i.bindEvent("first")):void("该车允许预约！"===e.cgsCommonResponse.msg?(i.progressDialog.remove(),App.UI("changePage",{wrap:$("#inspectionAppointment_form")}),App.UI("buttonHover",{dom:p,hoverClassName:"ui_btn_01_hover"}),p.trigger("click"),i.date.on("change",function(){i.dateChangeValListener()})):(i.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:e.cgsCommonResponse.msg}),i.bindEvent("first")))}))},dateChangeValListener:function(){var t=this,n=$("#njyypc_list"),i=t.date.val(),o={register:e,yyrq:i,baseDomain:t.baseDomain};t.progressDialog=App.UI("dialog",{msg:"预约批次查询中，请稍后！"}),App.getAjaxData(s,o,function(e){return"error"===e?(t.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"批次查询失败！"}),void t.bindEvent("dateItem")):void(e.cgsCommonResponse.cgsCommonList?(t.progressDialog.remove(),t.render("list",n,e.cgsCommonResponse.cgsCommonList),t.bindEvent("dateItem"),t.resetHeight(n),t.curDate=i):(t.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:e.cgsCommonResponse.msg})))})},dateItemListener:function(e){var t,s=this,i=e;e.off("click"),s.thirdBtn.trigger("click"),t={yyrq:s.curDate,jcxcode:i.attr("data-code"),baseDomain:s.baseDomain},s.progressDialog=App.UI("dialog",{msg:"预约时间段查询中，请稍后！"}),App.getAjaxData(n,t,function(t){"error"===t&&(s.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"预约时间段查询失败！"},function(){p.trigger("click")})),"本检测站当天已经超过可预约时间范围，不能够预约。"!==t.cgsCommonResponse.msg?s.render("inputs","",t.cgsCommonResponse.cgsCommonList):(s.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:t.cgsCommonResponse.msg},function(){p.trigger("click")})),e.on("click",function(){s.dateItemListener($(this))})})},lastListener:function(e){var t=this,s=e||t.lastBtn,n={hpzl:t.hpzl.val(),hphm:t.hphm.val(),clsbdh:t.clsbdh.val(),lxdhhm:t.phone.val(),lxr:t.name.val(),yyblbm:t.jcxcode.val(),yyblrq:t.yyrq.val(),yyblsj:t.kxsjd.val()};s.off("click"),t.progressDialog=App.UI("dialog",{msg:"提交预约信息中，请稍后！"}),App.getAjaxData(i,n,function(e){"error"===e&&(t.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"提交失败！"},function(e){"OK"===e&&p.trigger("click")})),e.success?(t.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:e.msg}),t.bindEvent("last")):(t.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:e.msg}),t.bindEvent("last"))})},resetHeight:function(e){var t=e.height()-0+200,s=e.parents("form");s.height(t)}};g.init({firstBtn:r,thirdBtn:l,lastBtn:c}),App.UI("changePage",{wrap:$("#inspectionAppointment_form")}),App.UI("btnHighlightWithInput",{btn:r,inputs:$(".J_btnHighlightWithInput input"),disableClass:"ui_btn_01_disable",hoverClass:"ui_btn_01_hover"},function(){App.UI("changePage",{wrap:$("#rigister_form")}),g.bindEvent("first")});var m=(new Date).getFullYear();$("#date").mobiscroll().date({theme:"ios7",lang:"zh",display:"bottom",mode:"scroller",dateFormat:"yy-mm-dd",startYear:m,endYear:m+5}),App.UI("buttonHover",{dom:a,hoverClassName:"ui_btn_01_hover"}),App.UI("buttonHover",{dom:p,hoverClassName:"ui_btn_01_hover"}),App.UI("buttonHover",{dom:c,hoverClassName:"ui_btn_01_hover"}),App.UI("select",{dom:$("#hpzl"),url:o+"?baseDomain="+App.LS.get("App_baseDomain"),module:"carType"}),App.UI("inputClose",{doms:$(".list-block")})});