$(function(){if(!App.addOnlineStatusListener())return!1;Wisp.UI.Webview.getBaseDomain("Wisp.ClientCallback.setBaseDomain");var e=$("#login-submit"),i=$("#rigister"),t=$("#skip"),s=$("#backpwd"),r=$("#submit_rigister"),n={curWebView:Wisp.UI.Webview.init({PageId:App.getPageId(window.location.href)}),PageId_lv:(new Date).getTime(),loginBtn:e||null,rigisterBtn:i||null,skipBtn:t||null,backpwdBtn:s||null,rigisterSubmitBtn:r||null,footbarDatas:jnjjApp.footbarDatas,siderDatas:jnjjApp.siderDatas,roleId:"0001",username:App.LS.get("App_userName")||"",password:null,baseDomain:App.LS.get("App_baseDomain"),isColInfoGetSuccess:!0,isgalleryGetSuccess:!0,progressDialog:null,PageId_lv01:(new Date).getTime(),loginRequestUrl:jnjjApp.config.requestUrl+"/jnpublic/userLogin.json",userinfoRequestUrl:jnjjApp.config.requestUrl+"/jnpublic/getUserInfo.json",updateHeadPhoto:jnjjApp.config.requestUrl+"/jnpublic/updateHeadPhoto.json",rigisterPageUrl:"rigister.html",backpwdPageUrl:"backpwd.html",loginPageUrl:"login.html",rigisterRequestUrl:jnjjApp.config.requestUrl+"/jnpublic/userGegister.json",init:function(e){return this.btn=e.btn,this.mode=e.mode,this.autoFill(),this.bindEvent(),this},bindEvent:function(e,i){var t=this,s=e||t.btn,r=i||t.mode;s.on("click",function(){t[r+"Listener"]()}),"rigisterSubmit"===r&&($("#setpwd_01").on("blur",function(){var e=$(this).val(),i=$("#setpwd_02").val();""===i||t.ispwdAgreement(e,i)||App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"两次密码输入不一致！"})}),$("#setpwd_02").on("blur",function(){var e=$(this).val(),i=$("#setpwd_01").val();""===i||t.ispwdAgreement(e,i)||App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"两次密码输入不一致！"})}))},loginListener:function(){var e,i=this,t=i.loginBtn,s=$("#username").val(),r=$("#password").val();t.off("click"),""===s?(App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"用户名不能为空！"}),i.bindEvent(t,"login")):""===r?(App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"密码不能为空！"}),i.bindEvent(t,"login")):(i.progressDialog=App.UI("dialog",{msg:"登录中，请稍后！"}),e={userName:s,password:r,roleId:i.roleId,baseDomain:i.baseDomain||App.LS.get("App_baseDomain")},this.username=s,this.password=r,App.getAjaxData(i.loginRequestUrl,e,function(e){if("error"===e)return i.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"登录失败！"}),void i.bindEvent(t,"login");var s=e.loginResponse;"true"===s.loginSuccess?i.loginSuccessCallback(s):"false"===s.loginSuccess?(i.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:s.loginContent+"!"}),i.bindEvent(t,"login")):(i.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"登录失败！"}),i.bindEvent(t,"login"))}))},rigisterListener:function(){var e=this,i=e.rigisterBtn,t=e.rigisterPageUrl+"#@@webViewPageId="+e.PageId_lv+Wisp.CommenFunc.getRandom()+"@@";i.off("click"),window.open(t),e.bindEvent(i,"rigister")},backpwdListener:function(){var e=this,i=e.backpwdBtn;i.off("click"),window.open(e.backpwdPageUrl),e.bindEvent(i,"backpwd")},rigisterSubmitListener:function(){var e,i,t=this,s=t.rigisterSubmitBtn,r=$("#setusername").val(),n=($("#setpwd_01").val(),$("#setpwd_02").val()),a=$("#setname").val(),p=$("#setphone").val(),o=$("#setidnum").val(),l=t.roleId;e={username:$("#setusername"),pwd1:$("#setpwd_01"),pwd2:$("#setpwd_02"),name:$("#setname"),phone:$("#setphone"),idnum:$("#setidnum")},s.off("click"),App.verify(e)?(i={registerName:r,userName:a,password:n,identityId:o,phoneNum:p,roleId:l,baseDomain:t.baseDomain||App.LS.get("App_baseDomain")},t.progressDialog=App.UI("dialog",{msg:"注册中，请稍后！"}),App.getAjaxData(t.rigisterRequestUrl,i,function(e){if("error"===e)return t.progressDialog.remove(),void t.bindEvent(s,"rigisterSubmit");var r=e.registerResponse;console.dir(r),"true"===r.loginSuccess?(t.progressDialog.remove(),App.UI("dialog",{type:"confirm",title:"公众服务平台",msg:"注册成功，直接进入应用？"},function(e){"OK"===e&&(t.progressDialog=App.UI("dialog",{msg:"正在登录，请稍后！"}),t.username=i.registerName,t.loginSuccessCallback(r)),"CANCEL"===e&&t.curWebView.close()}),t.bindEvent(s,"rigisterSubmit")):"false"===r.loginSuccess?(t.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:r.loginContent+"!"}),t.bindEvent(s,"rigisterSubmit")):(t.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"登录失败！"}),t.bindEvent(s,"rigisterSubmit"))})):t.bindEvent(s,"rigisterSubmit")},loginSuccessCallback:function(e){var i,t=this,s=t.loginBtn;console.dir(e),i={registerName:t.username,baseDomain:t.baseDomain||App.LS.get("App_baseDomain")},App.getAjaxData(t.userinfoRequestUrl,i,function(e){if("error"===e)return t.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"登录失败！"}),void t.bindEvent(s,"login");var i=e.userCenterResponse;i?(t.saveInfo(i),t.userInfoSuccessCallback(i),t.bindEvent(s,"login")):(t.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"登录失败!(个人信息初始化失败)"}),t.bindEvent(s,"login"))})},userInfoSuccessCallback:function(e){var i=this;i.updataPersonalInfo(e),i.isColInfoGetSuccess&&i.isgalleryGetSuccess&&i.sendClientUIdata(i.footbarDatas,i.siderDatas),console.log("login success END!!!!")},updataPersonalInfo:function(e){var i=this;e.registerId&&(i.siderDatas.sider.info.id=e.registerId),e.userName&&(i.siderDatas.sider.info.name=e.userName),e.registerName&&(i.siderDatas.sider.info.registerName=e.registerName),e.userImage&&(i.siderDatas.sider.info.img=e.userImage),i.siderDatas.sider.info.roleid=i.roleId,i.siderDatas.sider.info.url="",i.siderDatas.sider.info.upload=i.updateHeadPhoto,i.footbarDatas.footbar[4].siderView[0].data[0]=i.siderDatas.sider.info;for(var t=i.footbarDatas.footbar[4].siderView[1].data,s=t.length,r=0;s>r;r++)"false"===t[r].enable?t[r].enable="true":!0},saveInfo:function(e){var i=this;App.LS.set("App_userName",e.registerName),App.LS.set("App_userId",e.registerId),App.LS.set("App_pwd",i.password),App.LS.set("App_name",e.userName),App.LS.set("App_identityId",e.identityId),App.LS.set("App_userImage",e.userImage),App.LS.set("App_phoneNum",e.phoneNum),App.LS.set("App_email",e.email),App.LS.set("App_registerTime",e.registerTime),App.LS.set("App_moveCar_Name",e.moveCarName),App.LS.set("App_moveCar_phoneNum",e.moveCarPhone),App.LS.set("App_closeUser_Name",e.closeUserName),App.LS.set("App_closeUser_PhoneNum",e.closePhoneNum),App.LS.set("App_closeUser_IdentityId",e.closeIdentityId)},resetInfo:function(){App.LS.remove("App_userName"),App.LS.remove("App_userId"),App.LS.remove("App_pwd"),App.LS.remove("App_name"),App.LS.remove("App_identityId"),App.LS.remove("App_userImage"),App.LS.remove("App_phoneNum"),App.LS.remove("App_email"),App.LS.remove("App_registerTime"),App.LS.remove("App_moveCar_Name"),App.LS.remove("App_moveCar_phoneNum"),App.LS.remove("App_closeUser_Name"),App.LS.remove("App_closeUser_PhoneNum"),App.LS.remove("App_closeUser_IdentityId")},sendClientUIdata:function(e,i){var t=this;Wisp.UI.Init({type:"sider",datas:i}),Wisp.UI.Init({type:"footbar",datas:e}),this.footbarDatas=jnjjApp.footbarDatas,this.siderDatas=jnjjApp.siderDatas,t.progressDialog.remove(),Wisp.UI.loginResult.success()},ispwdAgreement:function(e,i){return e===i},autoFill:function(){var e=this,i=$("#username"),t=e.username;i.focus(),t&&i.val(t)}};e.length&&n.init({btn:e,mode:"login"}),i.length&&n.init({btn:i,mode:"rigister"}),s.length&&n.init({btn:s,mode:"backpwd"});var a;r.length&&(a=n.init({btn:r,mode:"rigisterSubmit"})),e.length&&App.UI("buttonHover",{dom:e,hoverClassName:"ui_btn_01_hover"}),r.length&&(App.UI("inputClose",{doms:$(".list-block")}),App.UI("btnHighlightWithInput",{btn:r,inputs:$(".J_btnHighlightWithInput input"),hoverClass:"ui_btn_01_hover",disableClass:"ui_btn_01_disable"},function(e){a.bindEvent(e,"rigisterSubmit")}))});