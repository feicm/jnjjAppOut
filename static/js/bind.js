$(function(){function e(){A=$("#name").val(),f=$("#hphm").val(),_=$("#hpzl").val(),I=$("#clsbdh").val(),j=$("#idnum").val(),U=$("#phone").val(),d={name:$("#name"),hphm:$("#hphm"),clsbdh:$("#clsbdh"),idnum:$("#idnum"),phone:$("#phone")};var n,p="band";k.off("click"),App.verify(d)?(n={register:t,carowner:A,carNumType:_,carNum:f,indentityid:j,phoneNum:U,carFramId:I,optiontype:p,baseDomain:App.LS.get("App_baseDomain")},a=App.UI("dialog",{msg:"车辆绑定中，请稍后！"}),App.getAjaxData(l,n,function(n){if("error"===n)return a.remove(),void(k&&k.on("click",e));var t=n.carBandResponse;console.dir(t),"true"===t.bandSuccess?(i(t),k.on("click",e)):"false"===t.bandSuccess?(a.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:t.bandContent+"!"}),k.on("click",e)):(a.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"提交失败！"}),k.on("click",e))})):k.on("click",e)}function n(){A=g,U=$("#phone").val(),j=v,y=$("#dabh").val(),d={name:$("#name"),idnum:$("#idnum"),phone:$("#phone"),dabh:$("#dabh")};var e,p="Y";S.off("click"),App.verify(d)?(e={register:t,licensename:A,licenseid:j,licensephone:U,licenseRecord:y,optiontype:p,baseDomain:App.LS.get("App_baseDomain")},a=App.UI("dialog",{msg:"驾照绑定中，请稍后！"}),App.getAjaxData(o,e,function(e){if("error"===e)return a.remove(),void(S&&S.on("click",n));var t=e.licenseBandResponse;console.dir(t),"true"===t.bandSuccess?(i(t),S.on("click",n)):"false"===t.bandSuccess?(a.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:t.bandContent+"!"}),S.on("click",n)):(a.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"提交失败！"}),S.on("click",n))})):S.on("click",n)}function i(e){console.dir(e),a.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:e.bandContent+"！"},function(e){if("OK"===e){var n=Wisp.UI.Webview.init({PageId:p});n.close();var i=Wisp.UI.Webview.init({PageId:c});i.refresh()}})}if(!App.addOnlineStatusListener())return!1;var t=App.LS.get("App_userName");Wisp.UI.Webview.getBaseDomain("Wisp.ClientCallback.setBaseDomain");var a,p=App.getPageId(window.location.href),l=jnjjApp.config.requestUrl+"/jnpublic/bandCar.json",o=jnjjApp.config.requestUrl+"/jnpublic/bandLicense.json",r=jnjjApp.config.requestUrl+"/jnpublic/carType.json",s=$(".c").attr("data-mode"),c=App.LS.get(s),d={},u=$("#name"),b=$("#idnum"),m=$("#phone"),g=App.LS.get("App_name"),h="",v=App.LS.get("App_identityId");if("car"===s){var A,f,_,I,j,U,k=$("#bindinfo_btn");u.val(g),b.val(v),m.val(App.LS.get("App_phoneNum")),k.on("click",e)}if("card"===s){var A,U,j,y,S=$("#bindcard_btn"),C="";C=v.substring(0,4)+"******"+v.substr(v.length-2),h=2===g.length?g.substr(0,1)+"*":g.substr(0,1)+"*"+g.substr(g.length-1),u.val(h),b.val(C),m.val(App.LS.get("App_phoneNum")),u.attr("readonly","true"),b.attr("readonly","true"),S.on("click",n)}App.UI("inputClose",{doms:$(".list-block")}),k&&App.UI("btnHighlightWithInput",{btn:k,listener:e,inputs:$(".J_btnHighlightWithInput input"),hoverClass:"ui_btn_01_hover",disableClass:"ui_btn_01_disable"}),S&&App.UI("btnHighlightWithInput",{btn:S,listener:n,inputs:$(".J_btnHighlightWithInput input"),hoverClass:"ui_btn_01_hover",disableClass:"ui_btn_01_disable"});var L=$("#hpzl");L.length&&App.UI("select",{dom:L,url:r+"?baseDomain="+App.LS.get("App_baseDomain"),module:"carType"})});