$(function(){function n(e){var i,s=$("#hphm").val(),t=$("#hpzl").val(),o=$("#clsbdh").val();if(_.off("click"),i={hphm:$("#hphm"),clsbdh:$("#clsbdh")},App.verify(i)){var p="#mode="+e+"@hphm="+s+"@hpzl="+t+"@clsbdh="+o;window.open(c+p),_.on("click",function(){n(l)})}else _.on("click",function(){n(l)})}function e(n){var i=$("#ksyy_sfzmmc").val(),s=$("#ksyy_sfzmhm").val(),t=$("#ksyy_lsh").val(),o=$("#ksyy_ksyy").val(),p=$("#ksyy_kskm").val(),a={};if(u.off("click"),a={sfzmhm:$("#ksyy_sfzmhm"),lsh:$("#ksyy_lsh")},App.verify(a)){var r="#mode="+n+"@sfzmmc="+i+"@sfzmhm="+s+"@lsh="+t+"@ksyy="+o+"@kskm="+p;window.open(c+r),u.on("click",function(){e(l)})}else u.on("click",function(){e(l)})}function i(n){var e,s=$("#q_record").val();if(m.off("click"),e={sgkcjlh:$("#q_record")},App.verify(e)){var t="#mode="+n+"@flowid="+s;window.open(c+t),m.on("click",function(){i(l)})}else m.on("click",function(){i(l)})}function s(n){var e,i=$("#q_punish"),t=i.val();if(b.off("click"),e={cfjdsh:i},App.verify(e)){var o="#mode="+n+"@punishNum="+t;window.open("pay.html"+o),b.on("click",function(){s(l)})}else b.on("click",function(){s(l)})}if(!App.addOnlineStatusListener())return!1;var t=App.LS.get("App_userName");Wisp.UI.Webview.getBaseDomain("Wisp.ClientCallback.setBaseDomain");var l,o=jnjjApp.config.requestUrl+"/jnpublic/identityType.json",p=jnjjApp.config.requestUrl+"/jnpublic/ksreason.json",a=jnjjApp.config.requestUrl+"/jnpublic/kscourse.json",c="infodetails.html",r=jnjjApp.config.requestUrl+"/jnpublic/carType.json",h=window.location.hash;h?(oHash=App.getHash(h),l=oHash.mode):console.log("传参失败！");var u=$("#ksquery_btn"),_=$("#njyycx_btn"),m=$("#sgkc_btn"),b=$("#punish_btn");u.length&&App.UI("btnHighlightWithInput",{btn:u,listener:e,listenerArg:l,inputs:$(".J_btnHighlightWithInput input"),hoverClass:"ui_btn_01_hover",disableClass:"ui_btn_01_disable"}),_.length&&App.UI("btnHighlightWithInput",{btn:_,listener:n,listenerArg:l,inputs:$(".J_btnHighlightWithInput input"),hoverClass:"ui_btn_01_hover",disableClass:"ui_btn_01_disable"}),m.length&&App.UI("btnHighlightWithInput",{btn:m,listener:i,listenerArg:l,inputs:$(".J_btnHighlightWithInput input"),hoverClass:"ui_btn_01_hover",disableClass:"ui_btn_01_disable"}),b.length&&App.UI("btnHighlightWithInput",{btn:b,listener:s,listenerArg:l,inputs:$(".J_btnHighlightWithInput input"),hoverClass:"ui_btn_01_hover",disableClass:"ui_btn_01_disable"}),$("#q_record").focus(),$("#q_punish").focus(),$("#q_punish").length&&$("#qrcode").on("click",function(){Wisp.ClientResource.QRcode("open",{domId:"q_punish"},"Wisp.ClientCallback.fillQRcodeText")}),("query_kscj"===l||"query_ksyy"===l)&&(App.UI("select",{dom:$("#ksyy_sfzmmc"),url:o,data:{register:t,baseDomain:App.LS.get("App_baseDomain")},module:"identityType"}),App.UI("select",{dom:$("#ksyy_ksyy"),url:p,data:{register:t,baseDomain:App.LS.get("App_baseDomain")},module:"cgsCommon"}),App.UI("select",{dom:$("#ksyy_kskm"),url:a,data:{register:t,baseDomain:App.LS.get("App_baseDomain")},module:"cgsCommon"}),App.UI("buttonHover",{dom:u,hoverClassName:"ui_btn_01_hover"})),"query_njyy"===l&&App.UI("select",{dom:$("#hpzl"),url:r+"?baseDomain="+App.LS.get("App_baseDomain"),module:"carType"}),"query_sgkc"===l&&App.UI("buttonHover",{dom:m,hoverClassName:"ui_btn_01_hover"}),"query_punish"===l&&App.UI("buttonHover",{dom:b,hoverClassName:"ui_btn_01_hover"}),App.UI("inputClose",{doms:$(".list-block")})});