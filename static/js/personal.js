$(function(){App.addOnlineStatusListener(),Wisp.UI.Webview.getBaseDomain("Wisp.ClientCallback.setBaseDomain");var e={preQuestUrl:"adapter?open&url="+jnjjApp.config.requestUrl,curWebView:Wisp.UI.Webview.init({PageId:App.getPageId(window.location.href)}),indexPageId:App.getPageId(window.location.href),loginRequestUrl:jnjjApp.config.requestUrl+"/jnpublic/userLogin.json",roleId:"0001",ip_username:$("#username"),ip_name:$("#name"),ip_photo:$("#photo"),ip_gender:$("#gender"),ip_phone:$("#phone"),ip_idnum:$("#idnum"),ip_email:$("#email"),ip_edit_email:$("#edit_email"),ip_time:$("#time"),ip_edit_phone:$("#edit_phone"),ip_mover:$("#mover"),ip_m_name:$("#m_name"),ip_m_phone:$("#m_phone"),ip_closer:$("#closer"),ip_c_name:$("#c_name"),ip_c_phone:$("#c_phone"),ip_c_sfzh:$("#c_sfzh"),saveBtn:$("#save"),progressDialog:null,interval:null,isUpdate:!0,baseDomain:App.LS.get("App_baseDomain"),App_userName:App.LS.get("App_userName"),App_name:App.LS.get("App_name"),App_identityId:App.LS.get("App_identityId"),App_userImage:App.LS.get("App_userImage"),App_phoneNum:App.LS.get("App_phoneNum"),App_email:App.LS.get("App_email"),App_registerTime:App.LS.get("App_registerTime"),App_moveCar_Name:App.LS.get("App_moveCar_Name"),App_moveCar_phoneNum:App.LS.get("App_moveCar_phoneNum"),App_closeUser_Name:App.LS.get("App_closeUser_Name"),App_closeUser_PhoneNum:App.LS.get("App_closeUser_PhoneNum"),App_closeUser_IdentityId:App.LS.get("App_closeUser_IdentityId"),urlRouter:{p_moveContacts:"movecarpeople.html",p_closeContacts:"closepeople.html",p_phoneNum:"editphonenum.html",p_email:"editemail.html",p_repwd:"repwd.html"},PageId_lv:(new Date).getTime(),init:function(e){this.list=e.list,this.mode=e.mode;var p=this;return"personalinfo"===p.mode?(App.LS.set(p.mode,p.indexPageId),p.interval=setInterval(function(){p.renderPersonalInfoPage("personalinfo")},1e3)):p.renderPersonalInfoPage(p.mode),this.bindEvent(this.mode),this},renderPersonalInfoPage:function(e){var p=this,o=0;return console.log(o++),"true"===App.LS.get("p_hasUpdate")&&(p.isUpdate=!0,p.App_moveCar_Name=App.LS.get("App_moveCar_Name"),p.App_phoneNum=App.LS.get("App_phoneNum"),p.App_email=App.LS.get("App_email"),p.App_closeUser_Name=App.LS.get("App_closeUser_Name"),p.App_closeUser_PhoneNum=App.LS.get("App_closeUser_PhoneNum"),p.App_closeUser_IdentityId=App.LS.get("App_closeUser_IdentityId")),p.isUpdate?("personalinfo"===e&&(p.ip_username.text(p.App_userName),p.ip_name.text(p.App_name),p.ip_photo.attr("src",p.App_userImage),p.ip_gender.addClass(p.getGender(p.App_identityId)?"icon-user-men":"icon-user-women"),p.ip_idnum.text(p.App_identityId),p.ip_time.text(p.App_registerTime),"null"!==p.App_phoneNum&&(p.ip_phone.text(p.App_phoneNum),"true"===App.LS.get("p_hasUpdate")&&App.LS.set("p_hasUpdate","false"),p.isUpdate=!1),"null"!==p.App_moveCar_Name&&(p.ip_mover.text(p.App_moveCar_Name),"true"===App.LS.get("p_hasUpdate")&&App.LS.set("p_hasUpdate","false"),p.isUpdate=!1),"null"!==p.App_closeUser_Name&&(p.ip_closer.text(p.App_closeUser_Name),"true"===App.LS.get("p_hasUpdate")&&App.LS.set("p_hasUpdate","false"),p.isUpdate=!1),"null"!==p.App_email&&(p.ip_email.text(p.App_email),"true"===App.LS.get("p_hasUpdate")&&App.LS.set("p_hasUpdate","false"),p.isUpdate=!1)),"p_moveContacts"===e&&"null"!==p.App_moveCar_Name&&(p.ip_m_name.val(p.App_moveCar_Name),p.ip_m_phone.val(p.App_moveCar_phoneNum)),"p_closeContacts"===e&&"null"!==p.App_closeUser_Name&&(p.ip_c_name.val(p.App_closeUser_Name),p.ip_c_phone.val(p.App_closeUser_PhoneNum),p.ip_c_sfzh.val(p.App_closeUser_IdentityId)),"p_phoneNum"===e&&(p.progressDialog=App.UI("dialog",{type:"password",title:"公众服务平台",msg:"请输入登录密码验证!"},function(e,o){"OK"===e&&(p.userVerify(o)?"null"!==p.App_phoneNum&&p.ip_edit_phone.val(p.App_phoneNum):(p.progressDialog.show(),p.progressDialog.resetMsg("密码错误，请重新输入！"))),"CANCEL"===e&&p.curWebView.close()})),void("p_email"===e&&(p.progressDialog=App.UI("dialog",{type:"password",title:"公众服务平台",msg:"请输入登录密码验证!"},function(e,o){"OK"===e&&(p.userVerify(o)?"null"!==p.App_email&&p.ip_edit_email.val(p.App_email):(p.progressDialog.show(),p.progressDialog.resetMsg("密码错误，请重新输入！"))),"CANCEL"===e&&p.curWebView.close()})))):!1},bindEvent:function(e){var p=this,o=p.list;"personalinfo"===e?o.each(function(){var e=$(this),o=e.data("rel");void 0!==o&&(e.on("click",function(){e.off("click"),p.openPage(o,e)}),App.UI("buttonHover",{dom:e,hoverClassName:"ui_btn_list_01_hover"}))}):App.UI("btnHighlightWithInput",{btn:p.saveBtn,inputs:$(".J_btnHighlightWithInput input"),hoverClass:"ui_btn_01_hover",disableClass:"ui_btn_01_disable"},function(e){e.on("click",function(){p.updataInfo(e)})})},updataInfo:function(e){var p=this,o=jnjjApp.config.requestUrl+"/jnpublic/updUserInfo.json",t="",a={registerName:p.App_userName,baseDomain:p.baseDomain,phonenum:p.ip_edit_phone.val()?(t="phonenum",p.ip_edit_phone.val()):p.App_phoneNum,email:p.ip_edit_email.val()?(t="email",p.ip_edit_email.val()):p.App_email,movecarname:p.ip_m_name.val()?(t="move",p.ip_m_name.val()):p.App_moveCar_Name,movecarphone:p.ip_m_phone.val()?(t="move",p.ip_m_phone.val()):p.App_moveCar_phoneNum,closeUserName:p.ip_c_name.val()?(t="close",p.ip_c_name.val()):p.App_closeUser_Name,closePhoneNum:p.ip_c_phone.val()?(t="close",p.ip_c_phone.val()):p.App_closeUser_PhoneNum,closeIdentityId:p.ip_c_sfzh.val()?(t="close",p.ip_c_sfzh.val()):p.App_closeUser_IdentityId,updatatype:t};e.off("click"),p.progressDialog=App.UI("dialog",{msg:"保存中，请稍后！"}),App.getAjaxData(o,a,function(e){if("error"===e)return void p.saveBtn.on("click",function(){p.updataInfo(p.saveBtn)});var o=e.userUpdateResponse;o?(console.log("更新成功！"),p.progressDialog=p.progressDialog.resetMsg("保存成功！"),App.LS.set("p_hasUpdate","true"),App.LS.set("App_phoneNum",a.phonenum),App.LS.set("App_email",a.email),App.LS.set("App_moveCar_Name",a.movecarname),App.LS.set("App_moveCar_phoneNum",a.movecarphone),App.LS.set("App_closeUser_Name",a.closeUserName),App.LS.set("App_closeUser_PhoneNum",a.closePhoneNum),App.LS.set("App_closeUser_IdentityId",a.closeIdentityId),p.saveBtn.on("click",function(){p.updataInfo(p.saveBtn)}),setTimeout(function(){p.curWebView.close()},1e3)):(p.progressDialog.resetMsg("保存失败！"),p.saveBtn.on("click",function(){p.updataInfo(p.saveBtn)})),setTimeout(function(){p.progressDialog.remove()},500)})},openPage:function(e,p){var o=this,t=o.urlRouter[e],a=t+"?@@webViewPageId="+o.PageId_lv+Wisp.CommenFunc.getRandom()+"@@";p.on("click",function(){p.off("click"),o.openPage(e,p)}),t&&window.open(a)},getGender:function(e){return parseInt(e.substr(16,1))%2==1?1:0},userVerify:function(e){var p=App.LS.get("App_pwd");return p===e?!0:!1}},p=App.getPageId(window.location.href),o=$(".c").data("mode");App.LS.set(o,p),App.LS.set("p_hasUpdate","false"),e.init({list:$(".list-block li"),mode:o}),App.UI("inputClose",{doms:$(".list-block")})});