$(function(){function e(){var t,n=document.getElementById("hphm"),o=n.selectedIndex,i=n.options[o].text,c=n.options[o].getAttribute("data-type");t=$("#nodo01").prop("checked")?0:"",a.off("click");var p="#mode=wf_car@cartype="+c+"@carid="+i+"@jkbj="+t;window.open(r+p),a.on("click",e)}function t(){var e,n=$("#jzxm"),o=n.val();s.off("click"),e=$("#nodo02").prop("checked")?0:"";var i="#mode=wf_card@licenseid="+o+"@jkbj="+e;window.open(l+i),s.on("click",t)}function n(e,t,n){var o=e.val(),i=t,c=n;"未绑定"!==o&&(App.UI("buttonHover",{dom:i,hoverClassName:"ui_btn_01_hover"}),i.removeClass("ui_btn_01_disable"),i.on("click",c))}if(!App.addOnlineStatusListener())return!1;var o=App.LS.get("App_userName"),i="adapter?open&url=",c=i+jnjjApp.config.requestUrl+"/jnpublic/queryCar.json",p=i+jnjjApp.config.requestUrl+"/jnpublic/queryLicense.json",r=i+jnjjApp.config.requestUrl+"/jnpublic/config/html/resultlist.jsp",l=i+jnjjApp.config.requestUrl+"/jnpublic/config/html/resultlisttab.jsp",a=$("#clxc_submit"),s=$("#jzcx_submit");App.UI("tabToggle",{dom:$("#tab_violation"),activeClass:"active"}),App.UI("select",{dom:$("#hphm"),url:c,data:{register:o,axisFlag:!0},module:"car"},function(){n($("#hphm"),a,e)}),App.UI("select",{dom:$("#jzxm"),url:p,data:{register:o,axisFlag:!0},module:"license"},function(){n($("#jzxm"),s,t)})});