$(function(){function e(){u=$("#name").val(),b=$("#hphm").val(),m=$("#hpzl").val(),g=$("#clsbdh").val(),h=$("#idnum").val(),v=$("#phone").val(),d={name:$("#name"),hphm:$("#hphm"),clsbdh:$("#clsbdh"),idnum:$("#idnum"),phone:$("#phone")};var n,p="band";A.off("click"),App.verify(d)?(n={register:t,carowner:u,carNumType:m,carNum:b,indentityid:h,phoneNum:v,carFramId:g,optiontype:p,baseDomain:App.LS.get("App_baseDomain")},a=App.UI("dialog",{msg:"车辆绑定中，请稍后！"}),App.getAjaxData(l,n,function(n){if("error"===n)return a.remove(),void(A&&A.on("click",e));var t=n.carBandResponse;console.dir(t),"true"===t.bandSuccess?(i(t),A.on("click",e)):"false"===t.bandSuccess?(a.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:t.bandContent+"!"}),A.on("click",e)):(a.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"提交失败！"}),A.on("click",e))})):A.on("click",e)}function n(){u=$("#name").val(),v=$("#phone").val(),h=$("#idnum").val(),f=$("#dabh").val(),d={name:$("#name"),idnum:$("#idnum"),phone:$("#phone"),dabh:$("#dabh")};var e,p="Y";I.off("click"),App.verify(d)?(e={register:t,licensename:u,licenseid:h,licensephone:v,licenseRecord:f,optiontype:p,baseDomain:App.LS.get("App_baseDomain")},a=App.UI("dialog",{msg:"驾照绑定中，请稍后！"}),App.getAjaxData(o,e,function(e){if("error"===e)return a.remove(),void(I&&I.on("click",n));var t=e.licenseBandResponse;console.dir(t),"true"===t.bandSuccess?(i(t),I.on("click",n)):"false"===t.bandSuccess?(a.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:t.bandContent+"!"}),I.on("click",n)):(a.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"提交失败！"}),I.on("click",n))})):I.on("click",n)}function i(e){console.dir(e),a.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"绑定成功！"},function(e){if("OK"===e){var n=Wisp.UI.Webview.init({PageId:p});n.close();var i=Wisp.UI.Webview.init({PageId:c});i.refresh()}})}if(!App.addOnlineStatusListener())return!1;var t=App.LS.get("App_userName");Wisp.UI.Webview.getBaseDomain("Wisp.ClientCallback.setBaseDomain");var a,p=App.getPageId(window.location.href),l=jnjjApp.config.requestUrl+"/jnpublic/bandCar.json",o=jnjjApp.config.requestUrl+"/jnpublic/bandLicense.json",s=jnjjApp.config.requestUrl+"/jnpublic/carType.json",r=$(".c").attr("data-mode"),c=App.LS.get(r),d={};if("car"===r){var u,b,m,g,h,v,A=$("#bindinfo_btn");A.on("click",e)}if("card"===r){var u,v,h,f,I=$("#bindcard_btn");I.on("click",n)}var _=$("#name"),j=$("#idnum"),U=$("#phone"),k=App.LS.get("App_name"),y="",S=App.LS.get("App_identityId");y=2===k.length?k.substr(0,1)+"*":k.substr(0,1)+"*"+k.substr(k.length-2),_.val(y),j.val(S.substring(0,4)+"******"+S.substring(16,18)),U.val(App.LS.get("App_phoneNum")),_.attr("disabled","true"),j.attr("disabled","true"),App.UI("inputClose",{doms:$(".list-block")}),A&&App.UI("btnHighlightWithInput",{btn:A,listener:e,inputs:$(".J_btnHighlightWithInput input"),hoverClass:"ui_btn_01_hover",disableClass:"ui_btn_01_disable"}),I&&App.UI("btnHighlightWithInput",{btn:I,listener:n,inputs:$(".J_btnHighlightWithInput input"),hoverClass:"ui_btn_01_hover",disableClass:"ui_btn_01_disable"});var W=$("#hpzl");W.length&&App.UI("select",{dom:W,url:s+"?baseDomain="+App.LS.get("App_baseDomain"),module:"carType"})});