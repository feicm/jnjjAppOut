$(function(){function n(e){var i,s=$("#hphm").val(),o=$("#hpzl").val(),l=$("#clsbdh").val();if(_.off("click"),i={hphm:$("#hphm"),clsbdh:$("#clsbdh")},App.verify(i)){var p="#mode="+e+"@hphm="+s+"@hpzl="+o+"@clsbdh="+l;window.open(a+p),_.on("click",function(){n(t)})}else _.on("click",function(){n(t)})}function e(n){var i=$("#ksyy_sfzmmc").val(),s=$("#ksyy_sfzmhm").val(),o=$("#ksyy_lsh").val(),l=$("#ksyy_ksyy").val(),p=$("#ksyy_kskm").val(),c={};if(h.off("click"),c={sfzmhm:$("#ksyy_sfzmhm"),lsh:$("#ksyy_lsh")},App.verify(c)){var r="#mode="+n+"@sfzmmc="+i+"@sfzmhm="+s+"@lsh="+o+"@ksyy="+l+"@kskm="+p;window.open(a+r),h.on("click",function(){e(t)})}else h.on("click",function(){e(t)})}function i(n){var e,s=$("#q_record").val();if(m.off("click"),e={sgkcjlh:$("#q_record")},App.verify(e)){var o="#mode="+n+"@flowid="+s;window.open(a+o),m.on("click",function(){i(t)})}else m.on("click",function(){i(t)})}function s(n){console.dir(this);var e,i=$("#q_punish"),o=i.val();if(b.off("click"),e={cfjdsh:i},App.verify(e)){var l="#mode="+n+"@punishNum="+o;window.open("pay.html"+l),b.on("click",function(){s(t)})}else b.on("click",function(){s(t)})}if(!App.addOnlineStatusListener())return!1;var o=App.LS.get("App_userName");Wisp.UI.Webview.getBaseDomain("Wisp.ClientCallback.setBaseDomain");var t,l=jnjjApp.config.requestUrl+"/jnpublic/identityType.json",p=jnjjApp.config.requestUrl+"/jnpublic/ksreason.json",c=jnjjApp.config.requestUrl+"/jnpublic/kscourse.json",a="infodetails.html",r=jnjjApp.config.requestUrl+"/jnpublic/carType.json",u=window.location.hash;u?(oHash=App.getHash(u),t=oHash.mode):console.log("传参失败！");var h=$("#ksquery_btn"),_=$("#njyycx_btn"),m=$("#sgkc_btn"),b=$("#punish_btn");h.length&&App.UI("btnHighlightWithInput",{btn:h,listener:e,listenerArg:t,inputs:$(".J_btnHighlightWithInput input"),hoverClass:"ui_btn_01_hover",disableClass:"ui_btn_01_disable"}),_.length&&App.UI("btnHighlightWithInput",{btn:_,listener:n,listenerArg:t,inputs:$(".J_btnHighlightWithInput input"),hoverClass:"ui_btn_01_hover",disableClass:"ui_btn_01_disable"}),m.length&&App.UI("btnHighlightWithInput",{btn:m,listener:i,listenerArg:t,inputs:$(".J_btnHighlightWithInput input"),hoverClass:"ui_btn_01_hover",disableClass:"ui_btn_01_disable"}),$("#q_record").focus(),$("#q_punish").focus(),$("#q_punish").length&&$("#qrcode").on("click",function(){Wisp.ClientResource.QRcode("open",{domId:"q_punish"},"Wisp.ClientCallback.fillQRcodeText")}),b.on("click",s.bind(b,t)),"query_kscj"===t||"query_ksyy"===t?(App.UI("select",{dom:$("#ksyy_sfzmmc"),url:l,data:{register:o,baseDomain:App.LS.get("App_baseDomain")},module:"identityType"}),App.UI("select",{dom:$("#ksyy_ksyy"),url:p,data:{register:o,baseDomain:App.LS.get("App_baseDomain")},module:"cgsCommon"}),App.UI("select",{dom:$("#ksyy_kskm"),url:c,data:{register:o,baseDomain:App.LS.get("App_baseDomain")},module:"cgsCommon"}),App.UI("buttonHover",{dom:h,hoverClassName:"ui_btn_01_hover"})):"query_njyy"===t?App.UI("select",{dom:$("#hpzl"),url:r+"?baseDomain="+App.LS.get("App_baseDomain"),module:"carType"}):"query_sgkc"===t?App.UI("buttonHover",{dom:m,hoverClassName:"ui_btn_01_hover"}):"query_punish"===t&&App.UI("buttonHover",{dom:b,hoverClassName:"ui_btn_01_hover"}),App.UI("inputClose",{doms:$(".list-block")})});