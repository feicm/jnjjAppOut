$(function(){function e(){A=$("#name").val(h),f=$("#hphm").val(),_=$("#hpzl").val(),I=$("#clsbdh").val(),j=$("#idnum").val(v),U=$("#phone").val(),d={name:$("#name"),hphm:$("#hphm"),clsbdh:$("#clsbdh"),idnum:$("#idnum"),phone:$("#phone")};var n,p="band";k.off("click"),App.verify(d)?(n={register:i,carowner:A,carNumType:_,carNum:f,indentityid:j,phoneNum:U,carFramId:I,optiontype:p,baseDomain:App.LS.get("App_baseDomain")},a=App.UI("dialog",{msg:"车辆绑定中，请稍后！"}),App.getAjaxData(l,n,function(n){if("error"===n)return a.remove(),void(k&&k.on("click",e));var i=n.carBandResponse;console.dir(i),"true"===i.bandSuccess?(t(i),k.on("click",e)):"false"===i.bandSuccess?(a.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:i.bandContent+"!"}),k.on("click",e)):(a.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"提交失败！"}),k.on("click",e))})):k.on("click",e)}function n(){A=h,U=$("#phone").val(),j=v,S=$("#dabh").val(),d={name:$("#name"),idnum:$("#idnum"),phone:$("#phone"),dabh:$("#dabh")};var e,p="Y";C.off("click"),App.verify(d)?(e={register:i,licensename:A,licenseid:j,licensephone:U,licenseRecord:S,optiontype:p,baseDomain:App.LS.get("App_baseDomain")},a=App.UI("dialog",{msg:"驾照绑定中，请稍后！"}),App.getAjaxData(s,e,function(e){if("error"===e)return a.remove(),void(C&&C.on("click",n));var i=e.licenseBandResponse;console.dir(i),"true"===i.bandSuccess?(t(i),C.on("click",n)):"false"===i.bandSuccess?(a.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:i.bandContent+"!"}),C.on("click",n)):(a.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"提交失败！"}),C.on("click",n))})):C.on("click",n)}function t(e){console.dir(e),a.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:e.bandContent+"！"},function(e){if("OK"===e){var n=Wisp.UI.Webview.init({PageId:p});n.close();var t=Wisp.UI.Webview.init({PageId:c});t.refresh()}})}if(!App.addOnlineStatusListener())return!1;var i=App.LS.get("App_userName");Wisp.UI.Webview.getBaseDomain("Wisp.ClientCallback.setBaseDomain");var a,p=App.getPageId(window.location.href),l=jnjjApp.config.requestUrl+"/jnpublic/bandCar.json",s=jnjjApp.config.requestUrl+"/jnpublic/bandLicense.json",o=jnjjApp.config.requestUrl+"/jnpublic/carType.json",r=$(".c").attr("data-mode"),c=App.LS.get(r),d={},u=$("#name"),b=$("#idnum"),g=$("#phone"),h=App.LS.get("App_name"),m="",v=App.LS.get("App_identityId");if("car"===r){var A,f,_,I,j,U,k=$("#bindinfo_btn"),y="";y=v.substring(0,4)+"******"+v.substr(v.length-2),m=2===h.length?h.substr(0,1)+"*":h.substr(0,1)+"*"+h.substr(h.length-1),u.val(m),b.val(y),g.val(App.LS.get("App_phoneNum")),k.on("click",e)}if("card"===r){var A,U,j,S,C=$("#bindcard_btn"),y="";y=v.substring(0,4)+"******"+v.substr(v.length-2),m=2===h.length?h.substr(0,1)+"*":h.substr(0,1)+"*"+h.substr(h.length-1),u.val(m),b.val(y),g.val(App.LS.get("App_phoneNum")),u.attr("readonly","true"),b.attr("readonly","true"),C.on("click",n)}App.UI("inputClose",{doms:$(".list-block")}),k&&App.UI("btnHighlightWithInput",{btn:k,listener:e,inputs:$(".J_btnHighlightWithInput input"),hoverClass:"ui_btn_01_hover",disableClass:"ui_btn_01_disable"}),C&&App.UI("btnHighlightWithInput",{btn:C,listener:n,inputs:$(".J_btnHighlightWithInput input"),hoverClass:"ui_btn_01_hover",disableClass:"ui_btn_01_disable"});var L=$("#hpzl");L.length&&App.UI("select",{dom:L,url:o+"?baseDomain="+App.LS.get("App_baseDomain"),module:"carType"})});