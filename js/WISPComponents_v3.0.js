!function(){Wisp=window.Wisp||{},Wisp.ClientCallback={setBaseDomain:function(n){App.LS.set("App_baseDomain",n)},fillQRcodeText:function(n,t){var i=document.getElementById(n);i.value=t}},Wisp.UI=function(){var n=function(n){var s=n.type,c=n.datas;switch(s){case"footbar":new t(c);break;case"toolbar":new i(c);break;case"sider":new e(c);break;case"dialog":new o(c);break;default:console.log("地球已经不适合你，回火星去吧！！！")}},t=function(n){this._config=n,this._init()};t.prototype._init=function(){console.dir(this._config),Wisp.CommenFunc.SendToWISPClient("post","@@footbar@@",JSON.stringify(this._config),!1)};var i=function(n){this._config=n,this._init()};i.prototype._init=function(){console.dir(this._config),Wisp.CommenFunc.SendToWISPClient("post","@@toolbar@@",JSON.stringify(this._config),!1)};var e=function(n){this._config=n,this._init()};e.prototype._init=function(){console.dir(this._config),Wisp.CommenFunc.SendToWISPClient("post","@@sider@@",JSON.stringify(this._config),!1)};var o=function(n){this._config=n,this._init()};o.prototype._init=function(){console.dir(this._config),Wisp.CommenFunc.SendToWISPClient("post","@@dialog@@",JSON.stringify(this._config),!1)};var s={show:function(n){this.content=n,Wisp.CommenFunc.SendToWISPClient("post","@@showProgressDialog@@",JSON.stringify(this),!1)},remove:function(){Wisp.CommenFunc.SendToWISPClient("post","@@dismissProgressDialog@@","",!1)}},c={success:function(){Wisp.CommenFunc.SendToWISPClient("post","@@loginSuccess@@","",!1)},fail:function(){Wisp.CommenFunc.SendToWISPClient("post","@@loginFail@@","",!1)}},r={pageId:null,init:function(n){return this.pageId=n.PageId,this.callback=n.callback||null,this},close:function(){Wisp.CommenFunc.SendToWISPClient("post","@@closeWebviewWidget@@",JSON.stringify(this),!1)},refresh:function(){Wisp.CommenFunc.SendToWISPClient("post","@@refreshWebviewWidget@@",JSON.stringify(this),!1)},getBaseDomain:function(n){this.callback=n||null,Wisp.CommenFunc.SendToWISPClient("post","@@getBaseDomain@@",JSON.stringify(this),!1)}},a={open:function(n){this.currentPage=n.active+"",this.images=n.images,Wisp.CommenFunc.SendToWISPClient("post","@@openGallery@@",JSON.stringify(this),!1)}},l={open:function(){},close:function(){}},p={zoomIn:function(){},zoomOut:function(){}};return{Init:n,progressDialog:s,loginResult:c,Webview:r,Gallery:a,fullScreen:l,zoomWindow:p}}(),Wisp.CommenFunc=function(){function n(){return parseInt(100*Math.random())}var t=function(){function n(){for(var n=0;n<e.length;n++){try{var t=new ActiveXObject(e[n]);typeFlag=!1}catch(i){continue}return t}throw{message:"XMLHttp ActiveX Unsurported."}}var t;try{t=new window.XMLHttpRequest,typeFlag=!0}catch(i){var e=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp.5.0","MSXML2.XMLHttp.4.0","Msxml2.XMLHTTP","MSXML.XMLHttp","Microsoft.XMLHTTP"];try{t=new n,typeFlag=!1}catch(i){throw new Error(0,"XMLHttpRequest Unsurported.")}}return t},i=function(n,i,e,o){var s="AjAxSocketIFC/"+i+"?",c=c||{};c&&void 0!==c.localHost&&(s=c.localHost+"/"+s),"get"==n&&""!=e&&(s+=encodeURIComponent(e)+"&"),s+="date="+new Date;var r=t(),a="";o&&(r.onreadystatechange=function(){if(4==r.readyState&&200==r.status){var n=r.responseText;console.dir(n),a=n}});try{r.open(n,s,o),"post"==n?(r.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),console.info("Request client UI:"+i+" start!"),r.send(e),console.info("Request client UI:"+i+" end!")):r.send()}catch(l){}if(!o)try{var p=r.responseText;a=p}catch(l){return e}return a},e=function(n){this.path=n.path,this.posturl=n.postUrl,this.callback=n.callback||null};return e.prototype={uploadFile:function(){var n=this;Wisp.CommenFunc.SendToWISPClient("post","@@uploadfile@@",JSON.stringify(n),!1)},uploadSuccess:function(){Wisp.CommenFunc.SendToWISPClient("post","@@uploadsuccess@@","",!1)},uploadFail:function(){Wisp.CommenFunc.SendToWISPClient("post","@@uploadfail@@","",!1)}},{SendToWISPClient:i,getRandom:n,PostFile:e}}(),Wisp.ClientResource=function(){var n=function(){};n.prototype={open:function(n){this.callback=n,Wisp.CommenFunc.SendToWISPClient("post","@@openCamera@@",JSON.stringify(this),!1)}};var t=function(n){this.username=n.username,this.pwd=n.pwd,this.ip=n.ip,this.port=n.port,this.fileServerUrl=n.fileServerUrl};t.prototype={send:function(n){this.callback=n||null,Wisp.CommenFunc.SendToWISPClient("post","@@sendPersonalInfo@@",JSON.stringify(this),!1)}};var i=function(n,t,i){var e={open:"open"};if(n&&t){var o={init:function(){var o=n;this.url=t.targetpage,i&&(this.callback=i),e[o]&&this[e[o]]()},open:function(){Wisp.CommenFunc.SendToWISPClient("post","@@openPrinter@@",JSON.stringify(this),!1)}};return o.init(),o}},e=function(n,t,i){var e={open:"open"};arguments.length<3&&!arguments[1]instanceof Object&&(i=arguments[1]);var o={init:function(){var o=n;this.domId=t.domId,i&&(this.callback=i),e[o]&&this[e[o]]()},open:function(){Wisp.CommenFunc.SendToWISPClient("post","@@openQRcode@@",JSON.stringify(this),!1)}};return o.init(),o};return{Camera:n,PersonalInfo:t,Printer:i,QRcode:e}}()}();