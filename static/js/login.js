$(function(){if(!App.addOnlineStatusListener())return!1;Wisp.UI.Webview.getBaseDomain("Wisp.ClientCallback.setBaseDomain");var e=$("#login-submit"),t=$("#rigister"),i=$("#skip"),s=$("#backpwd"),n=$("#submit_rigister"),a={curWebView:Wisp.UI.Webview.init({PageId:App.getPageId(window.location.href)}),PageId_lv:(new Date).getTime(),loginBtn:e||null,rigisterBtn:t||null,skipBtn:i||null,backpwdBtn:s||null,rigisterSubmitBtn:n||null,footbarDatas:jnjjApp.footbarDatas,siderDatas:jnjjApp.siderDatas,roleId:"0001",username:App.LS.get("App_userName")||"",password:null,baseDomain:App.LS.get("App_baseDomain"),isColInfoGetSuccess:!1,isgalleryGetSuccess:!1,progressDialog:null,PageId_lv01:(new Date).getTime(),loginRequestUrl:jnjjApp.config.requestUrl+"/jnpublic/userLogin.json",userinfoRequestUrl:jnjjApp.config.requestUrl+"/jnpublic/getUserInfo.json",galleryRequestUrl:jnjjApp.config.msgRequestUrl+"/wispcms/content/shuffling_jj.do",rigisterPageUrl:"rigister.html",backpwdPageUrl:"backpwd.html",loginPageUrl:"login.html",rigisterRequestUrl:jnjjApp.config.requestUrl+"/jnpublic/userGegister.json",init:function(e){return this.btn=e.btn,this.mode=e.mode,this.autoFill(),this.bindEvent(),this},bindEvent:function(e,t){var i=this,s=e||i.btn,n=t||i.mode;s.on("click",function(){i[n+"Listener"]()}),"rigisterSubmit"===n&&($("#setpwd_01").on("blur",function(){var e=$(this).val(),t=$("#setpwd_02").val();""===t||i.ispwdAgreement(e,t)||App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"两次密码输入不一致！"})}),$("#setpwd_02").on("blur",function(){var e=$(this).val(),t=$("#setpwd_01").val();""===t||i.ispwdAgreement(e,t)||App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"两次密码输入不一致！"})}))},loginListener:function(){var e,t=this,i=t.loginBtn,s=$("#username").val(),n=$("#password").val();i.off("click"),""===s?(App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"用户名不能为空！"}),t.bindEvent(i,"login")):""===n?(App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"密码不能为空！"}),t.bindEvent(i,"login")):(t.progressDialog=App.UI("dialog",{msg:"登录中，请稍后！"}),e={userName:s,password:n,roleId:t.roleId,baseDomain:t.baseDomain||App.LS.get("App_baseDomain")},this.username=s,this.password=n,App.getAjaxData(t.loginRequestUrl,e,function(e){if("error"===e)return t.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"登录失败！"}),void t.bindEvent(i,"login");var s=e.loginResponse;"true"===s.loginSuccess?t.loginSuccessCallback(s):"false"===s.loginSuccess?(t.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:s.loginContent+"!"}),t.bindEvent(i,"login")):(t.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"登录失败！"}),t.bindEvent(i,"login"))}))},rigisterListener:function(){var e=this,t=e.rigisterBtn,i=e.rigisterPageUrl+"#@@webViewPageId="+e.PageId_lv+Wisp.CommenFunc.getRandom()+"@@";t.off("click"),window.open(i),e.bindEvent(t,"rigister")},backpwdListener:function(){var e=this,t=e.backpwdBtn;t.off("click"),window.open(e.backpwdPageUrl),e.bindEvent(t,"backpwd")},skipListener:function(){var e=this,t=e.skipBtn;console.dir(jnjjApp.footbarDatas),console.dir(jnjjApp.siderDatas),e.progressDialog=App.UI("dialog",{msg:"数据加载中，请稍后！"}),t.off("click"),e.isColInfoGetSuccess?e.sendClientUIdata(e.footbarDatas,e.siderDatas):e.initColInfo(function(){e.sendClientUIdata(e.footbarDatas,e.siderDatas)}),e.bindEvent(t,"skip"),e.resetInfo()},rigisterSubmitListener:function(){var e,t,i=this,s=i.rigisterSubmitBtn,n=$("#setusername").val(),a=($("#setpwd_01").val(),$("#setpwd_02").val()),r=$("#setname").val(),o=$("#setphone").val(),p=$("#setidnum").val(),l=i.roleId;e={username:$("#setusername"),pwd1:$("#setpwd_01"),pwd2:$("#setpwd_02"),name:$("#setname"),phone:$("#setphone"),idnum:$("#setidnum")},s.off("click"),App.verify(e)?(t={registerName:n,userName:r,password:a,identityId:p,phoneNum:o,roleId:l,baseDomain:i.baseDomain||App.LS.get("App_baseDomain")},i.progressDialog=App.UI("dialog",{msg:"注册中，请稍后！"}),App.getAjaxData(i.rigisterRequestUrl,t,function(e){if("error"===e)return i.progressDialog.remove(),void i.bindEvent(s,"rigisterSubmit");var n=e.registerResponse;console.dir(n),"true"===n.loginSuccess?(i.progressDialog.remove(),App.UI("dialog",{type:"confirm",title:"公众服务平台",msg:"注册成功，直接进入应用？"},function(e){"OK"===e&&(i.progressDialog=App.UI("dialog",{msg:"正在登录，请稍后！"}),i.username=t.registerName,i.loginSuccessCallback(n)),"CANCEL"===e&&i.curWebView.close()}),i.bindEvent(s,"rigisterSubmit")):"false"===n.loginSuccess?(i.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:n.loginContent+"!"}),i.bindEvent(s,"rigisterSubmit")):(i.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"登录失败！"}),i.bindEvent(s,"rigisterSubmit"))})):i.bindEvent(s,"rigisterSubmit")},loginSuccessCallback:function(e){var t,i=this,s=i.loginBtn;console.dir(e),i.refreshHomebtnsGallery(i.footbarDatas,e.authList),i.refreshMoreViewData(i.footbarDatas,e.authList),t={registerName:i.username,baseDomain:i.baseDomain||App.LS.get("App_baseDomain")},App.getAjaxData(i.userinfoRequestUrl,t,function(e){if("error"===e)return i.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"登录失败！"}),void i.bindEvent(s,"login");var t=e.userCenterResponse;t?(i.saveInfo(t),i.userInfoSuccessCallback(t),i.bindEvent(s,"login")):(i.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"登录失败!(个人信息初始化失败)"}),i.bindEvent(s,"login"))})},userInfoSuccessCallback:function(e){var t=this;t.updataPersonalInfo(e),t.isColInfoGetSuccess&&t.isgalleryGetSuccess?t.sendClientUIdata(t.footbarDatas,t.siderDatas):t.isColInfoGetSuccess||t.isgalleryGetSuccess?t.isColInfoGetSuccess?t.isgalleryGetSuccess||t.initGalleryInfo(function(){t.sendClientUIdata(t.footbarDatas,t.siderDatas)}):t.initColInfo(function(){t.sendClientUIdata(t.footbarDatas,t.siderDatas)}):t.initColInfo(function(){t.initGalleryInfo(function(){t.sendClientUIdata(t.footbarDatas,t.siderDatas)})}),console.log("login success END!!!!")},updataPersonalInfo:function(e){var t=this;e.userName&&(t.siderDatas.sider.info.name=e.userName),e.userImage&&(t.siderDatas.sider.info.img=e.userImage),t.siderDatas.sider.info.roleid=t.roleId,t.siderDatas.sider.info.url="",t.footbarDatas.footbar[4].siderView[0].data[0]=t.siderDatas.sider.info;for(var i=t.footbarDatas.footbar[4].siderView[1].data,s=i.length,n=0;s>n;n++)"false"===i[n].enable?i[n].enable="true":!0},saveInfo:function(e){var t=this;App.LS.set("App_userName",e.registerName),App.LS.set("App_pwd",t.password),App.LS.set("App_name",e.userName),App.LS.set("App_identityId",e.identityId),App.LS.set("App_userImage",e.userImage),App.LS.set("App_phoneNum",e.phoneNum),App.LS.set("App_email",e.email),App.LS.set("App_registerTime",e.registerTime),App.LS.set("App_moveCar_Name",e.moveCarName),App.LS.set("App_moveCar_phoneNum",e.moveCarPhone),App.LS.set("App_closeUser_Name",e.closeUserName),App.LS.set("App_closeUser_PhoneNum",e.closePhoneNum),App.LS.set("App_closeUser_IdentityId",e.closeIdentityId)},resetInfo:function(){App.LS.remove("App_userName"),App.LS.remove("App_pwd"),App.LS.remove("App_name"),App.LS.remove("App_identityId"),App.LS.remove("App_userImage"),App.LS.remove("App_phoneNum"),App.LS.remove("App_email"),App.LS.remove("App_registerTime"),App.LS.remove("App_moveCar_Name"),App.LS.remove("App_moveCar_phoneNum"),App.LS.remove("App_closeUser_Name"),App.LS.remove("App_closeUser_PhoneNum"),App.LS.remove("App_closeUser_IdentityId")},sendClientUIdata:function(e,t){var i=this;Wisp.UI.Init({type:"sider",datas:t}),Wisp.UI.Init({type:"footbar",datas:e}),this.footbarDatas=jnjjApp.footbarDatas,this.siderDatas=jnjjApp.siderDatas,i.progressDialog.remove(),Wisp.UI.loginResult.success()},refreshHomebtnsGallery:function(e,t){for(var i,s,n=e.footbar[0].view[1].data,a=t.length-1;a>=0;a--){i=t[a].authcontent;for(var r=n.length-1;r>=0;r--)if(s=n[r].name,i===s){n[r].enable="true";break}}return e},refreshMoreViewData:function(e,t){var i=this;console.dir(e),console.dir(t);for(var s,n=e.footbar[2].shortcutBtns,a=t.length-1;a>=0;a--)s=t[a].authcontent,i.formatData(s,n);return e},formatData:function(e,t){for(var i,s,n=t.length-1;n>=0;n--){i=t[n].data;for(var a=i.length-1;a>=0;a--)if(s=i[a].name,e===s){i[a].enable="true";break}}},ispwdAgreement:function(e,t){return e===t},autoFill:function(){var e=this,t=$("#username"),i=e.username;t.focus(),i&&t.val(i)},initGalleryInfo:function(e){var t=this,i=t.loginBtn,s=t.galleryRequestUrl,n={baseDomain:t.baseDomain||App.LS.get("App_baseDomain")};App.getAjaxData(s,n,function(s){return"error"!==s&&s.success||!e?void(s.success&&(t.isgalleryGetSuccess=!0,t.footbarDatas.footbar[0].view[0].data=s.gallery,e&&e())):(t.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"登录失败！"}),void t.bindEvent(i,"login"))})},initColInfo:function(e){var t=this,i=t.loginBtn,s=t.colInfoRequestUrl,n={baseDomain:t.baseDomain||App.LS.get("App_baseDomain")};App.getAjaxData(s,n,function(s){if(("error"===s||!s.success)&&e)return t.progressDialog.remove(),App.UI("dialog",{type:"alert",title:"公众服务平台",msg:"登录失败！"}),void t.bindEvent(i,"login");if(s.success){t.isColInfoGetSuccess=!0;var n=t.formatColInfoData(s.msg);t.footbarDatas.footbar[1].subBtns=n,e&&e()}})},formatColInfoData:function(e){var t,i=[];for(var s in e)t={name:e[s].name,requestUrl:e[s].requestUrl+"Android"},i.push(t);return i}};e.length&&a.init({btn:e,mode:"login"}),t.length&&a.init({btn:t,mode:"rigister"}),i.length&&a.init({btn:i,mode:"skip"}),s.length&&a.init({btn:s,mode:"backpwd"});var r;n.length&&(r=a.init({btn:n,mode:"rigisterSubmit"})),e.length&&(App.UI("buttonHover",{dom:e,hoverClassName:"ui_btn_01_hover"}),t.hasClass("ui_btn_02")&&App.UI("buttonHover",{dom:t,hoverClassName:"ui_btn_02_hover"}),i.length&&App.UI("buttonHover",{dom:i,hoverClassName:"ui_btn_02_hover"})),n.length&&(App.UI("inputClose",{doms:$(".list-block")}),App.UI("btnHighlightWithInput",{btn:n,inputs:$(".J_btnHighlightWithInput input"),hoverClass:"ui_btn_01_hover",disableClass:"ui_btn_01_disable"},function(e){r.bindEvent(e,"rigisterSubmit")}))});