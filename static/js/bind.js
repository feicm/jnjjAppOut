$(function(){function e(){u=k,b=$("#hphm").val(),g=$("#hpzl").val(),m=$("#clsbdh").val(),h=S,v=$("#phone").val(),d={name:$("#name"),hphm:$("#hphm"),clsbdh:$("#clsbdh"),idnum:$("#idnum"),phone:$("#phone")};var n,a="band";A.off("click"),App.verify(d)?(n={register:t,carowner:u,carNumType:g,carNum:b,indentityid:h,phoneNum:v,carFramId:m,optiontype:a,baseDomain:App.LS.get("App_baseDomain")},p=App.UI("dialog",{msg:"车辆绑定中，请稍后！"}),App.getAjaxData(o,n,function(n){if("error"===n)return p.remove(),void(A&&A.on("click",e));var t=n.carBandResponse;console.dir(t),"true"===t.bandSuccess?(i(t),A.on("click",e)):"false"===t.bandSuccess?(p.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:t.bandContent+"!"}),A.on("click",e)):(p.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"提交失败！"}),A.on("click",e))})):A.on("click",e)}function n(){u=k,v=$("#phone").val(),h=S,f=$("#dabh").val(),d={name:$("#name"),idnum:$("#idnum"),phone:$("#phone"),dabh:$("#dabh")};var e,a="Y";I.off("click"),App.verify(d)?(e={register:t,licensename:u,licenseid:h,licensephone:v,licenseRecord:f,optiontype:a,baseDomain:App.LS.get("App_baseDomain")},p=App.UI("dialog",{msg:"驾照绑定中，请稍后！"}),App.getAjaxData(l,e,function(e){if("error"===e)return p.remove(),void(I&&I.on("click",n));var t=e.licenseBandResponse;console.dir(t),"true"===t.bandSuccess?(i(t),I.on("click",n)):"false"===t.bandSuccess?(p.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:t.bandContent+"!"}),I.on("click",n)):(p.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"提交失败！"}),I.on("click",n))})):I.on("click",n)}function i(e){console.dir(e),p.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"绑定成功！"},function(e){if("OK"===e){var n=Wisp.UI.Webview.init({PageId:a});n.close();var i=Wisp.UI.Webview.init({PageId:c});i.refresh()}})}if(!App.addOnlineStatusListener())return!1;var t=App.LS.get("App_userName");Wisp.UI.Webview.getBaseDomain("Wisp.ClientCallback.setBaseDomain");var p,a=App.getPageId(window.location.href),o=jnjjApp.config.requestUrl+"/jnpublic/bandCar.json",l=jnjjApp.config.requestUrl+"/jnpublic/bandLicense.json",r=jnjjApp.config.requestUrl+"/jnpublic/carType.json",s=$(".c").attr("data-mode"),c=App.LS.get(s),d={};if("car"===s){var u,b,g,m,h,v,A=$("#bindinfo_btn");A.on("click",e)}if("card"===s){var u,v,h,f,I=$("#bindcard_btn");I.on("click",n)}var _=$("#name"),j=$("#idnum"),U=$("#phone"),k=App.LS.get("App_name"),y="",S=App.LS.get("App_identityId"),W="";W=S.substring(0,4)+"******"+S.substr(S.length-2),y=2===k.length?k.substr(0,1)+"*":k.substr(0,1)+"*"+k.substr(k.length-1),_.val(y),j.val(W),U.val(App.LS.get("App_phoneNum")),_.attr("readonly","true"),j.attr("disabled","true"),App.UI("inputClose",{doms:$(".list-block")}),A&&App.UI("btnHighlightWithInput",{btn:A,listener:e,inputs:$(".J_btnHighlightWithInput input"),hoverClass:"ui_btn_01_hover",disableClass:"ui_btn_01_disable"}),I&&App.UI("btnHighlightWithInput",{btn:I,listener:n,inputs:$(".J_btnHighlightWithInput input"),hoverClass:"ui_btn_01_hover",disableClass:"ui_btn_01_disable"});var C=$("#hpzl");C.length&&App.UI("select",{dom:C,url:r+"?baseDomain="+App.LS.get("App_baseDomain"),module:"carType"})});