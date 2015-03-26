// Zepto 1.1.4 (generated with Zepto Builder) - zepto event ajax form ie callbacks deferred fx fx_methods - zeptojs.com/license 
var Zepto=function(){function t(t){return null==t?t+"":X[B.call(t)]||"object"}function n(n){return"function"==t(n)}function e(t){return null!=t&&t==t.window}function i(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function r(n){return"object"==t(n)}function o(t){return r(t)&&!e(t)&&Object.getPrototypeOf(t)==Object.prototype}function s(t){return"number"==typeof t.length}function a(t){return P.call(t,function(t){return null!=t})}function u(t){return t.length>0?j.fn.concat.apply([],t):t}function c(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function l(t){return t in k?k[t]:k[t]=RegExp("(^|\\s)"+t+"(\\s|$)")}function f(t,n){return"number"!=typeof n||L[c(t)]?n:n+"px"}function h(t){var n,e;return Z[t]||(n=A.createElement(t),A.body.appendChild(n),e=getComputedStyle(n,"").getPropertyValue("display"),n.parentNode.removeChild(n),"none"==e&&(e="block"),Z[t]=e),Z[t]}function p(t){return"children"in t?O.call(t.children):j.map(t.childNodes,function(t){return 1==t.nodeType?t:w})}function d(t,n,e){for(E in n)e&&(o(n[E])||G(n[E]))?(o(n[E])&&!o(t[E])&&(t[E]={}),G(n[E])&&!G(t[E])&&(t[E]=[]),d(t[E],n[E],e)):n[E]!==w&&(t[E]=n[E])}function m(t,n){return null==n?j(t):j(t).filter(n)}function g(t,e,i,r){return n(e)?e.call(t,i,r):e}function v(t,n,e){null==e?t.removeAttribute(n):t.setAttribute(n,e)}function y(t,n){var e=t.className||"",i=e&&e.baseVal!==w;return n===w?i?e.baseVal:e:(i?e.baseVal=n:t.className=n,w)}function x(t){var n;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(n=Number(t))?/^[\[\{]/.test(t)?j.parseJSON(t):t:n):t}catch(e){return t}}function b(t,n){n(t);for(var e=0,i=t.childNodes.length;i>e;e++)b(t.childNodes[e],n)}var w,E,j,T,C,N,S=[],O=S.slice,P=S.filter,A=window.document,Z={},k={},L={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},$=/^\s*<(\w+|!)[^>]*>/,_=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,F=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,D=/^(?:body|html)$/i,z=/([A-Z])/g,M=["val","css","html","text","data","width","height","offset"],R=["after","prepend","before","append"],q=A.createElement("table"),W=A.createElement("tr"),H={tr:A.createElement("tbody"),tbody:q,thead:q,tfoot:q,td:W,th:W,"*":A.createElement("div")},I=/complete|loaded|interactive/,V=/^[\w-]*$/,X={},B=X.toString,U={},J=A.createElement("div"),Y={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},G=Array.isArray||function(t){return t instanceof Array};return U.matches=function(t,n){if(!n||!t||1!==t.nodeType)return!1;var e=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(e)return e.call(t,n);var i,r=t.parentNode,o=!r;return o&&(r=J).appendChild(t),i=~U.qsa(r,n).indexOf(t),o&&J.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,n){return n?n.toUpperCase():""})},N=function(t){return P.call(t,function(n,e){return t.indexOf(n)==e})},U.fragment=function(t,n,e){var i,r,s;return _.test(t)&&(i=j(A.createElement(RegExp.$1))),i||(t.replace&&(t=t.replace(F,"<$1></$2>")),n===w&&(n=$.test(t)&&RegExp.$1),n in H||(n="*"),s=H[n],s.innerHTML=""+t,i=j.each(O.call(s.childNodes),function(){s.removeChild(this)})),o(e)&&(r=j(i),j.each(e,function(t,n){M.indexOf(t)>-1?r[t](n):r.attr(t,n)})),i},U.Z=function(t,n){return t=t||[],t.__proto__=j.fn,t.selector=n||"",t},U.isZ=function(t){return t instanceof U.Z},U.init=function(t,e){var i;if(!t)return U.Z();if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&$.test(t))i=U.fragment(t,RegExp.$1,e),t=null;else{if(e!==w)return j(e).find(t);i=U.qsa(A,t)}else{if(n(t))return j(A).ready(t);if(U.isZ(t))return t;if(G(t))i=a(t);else if(r(t))i=[t],t=null;else if($.test(t))i=U.fragment(t.trim(),RegExp.$1,e),t=null;else{if(e!==w)return j(e).find(t);i=U.qsa(A,t)}}return U.Z(i,t)},j=function(t,n){return U.init(t,n)},j.extend=function(t){var n,e=O.call(arguments,1);return"boolean"==typeof t&&(n=t,t=e.shift()),e.forEach(function(e){d(t,e,n)}),t},U.qsa=function(t,n){var e,r="#"==n[0],o=!r&&"."==n[0],s=r||o?n.slice(1):n,a=V.test(s);return i(t)&&a&&r?(e=t.getElementById(s))?[e]:[]:1!==t.nodeType&&9!==t.nodeType?[]:O.call(a&&!r?o?t.getElementsByClassName(s):t.getElementsByTagName(n):t.querySelectorAll(n))},j.contains=A.documentElement.contains?function(t,n){return t!==n&&t.contains(n)}:function(t,n){for(;n&&(n=n.parentNode);)if(n===t)return!0;return!1},j.type=t,j.isFunction=n,j.isWindow=e,j.isArray=G,j.isPlainObject=o,j.isEmptyObject=function(t){var n;for(n in t)return!1;return!0},j.inArray=function(t,n,e){return S.indexOf.call(n,t,e)},j.camelCase=C,j.trim=function(t){return null==t?"":String.prototype.trim.call(t)},j.uuid=0,j.support={},j.expr={},j.map=function(t,n){var e,i,r,o=[];if(s(t))for(i=0;t.length>i;i++)e=n(t[i],i),null!=e&&o.push(e);else for(r in t)e=n(t[r],r),null!=e&&o.push(e);return u(o)},j.each=function(t,n){var e,i;if(s(t)){for(e=0;t.length>e;e++)if(n.call(t[e],e,t[e])===!1)return t}else for(i in t)if(n.call(t[i],i,t[i])===!1)return t;return t},j.grep=function(t,n){return P.call(t,n)},window.JSON&&(j.parseJSON=JSON.parse),j.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,n){X["[object "+n+"]"]=n.toLowerCase()}),j.fn={forEach:S.forEach,reduce:S.reduce,push:S.push,sort:S.sort,indexOf:S.indexOf,concat:S.concat,map:function(t){return j(j.map(this,function(n,e){return t.call(n,e,n)}))},slice:function(){return j(O.apply(this,arguments))},ready:function(t){return I.test(A.readyState)&&A.body?t(j):A.addEventListener("DOMContentLoaded",function(){t(j)},!1),this},get:function(t){return t===w?O.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return S.every.call(this,function(n,e){return t.call(n,e,n)!==!1}),this},filter:function(t){return n(t)?this.not(this.not(t)):j(P.call(this,function(n){return U.matches(n,t)}))},add:function(t,n){return j(N(this.concat(j(t,n))))},is:function(t){return this.length>0&&U.matches(this[0],t)},not:function(t){var e=[];if(n(t)&&t.call!==w)this.each(function(n){t.call(this,n)||e.push(this)});else{var i="string"==typeof t?this.filter(t):s(t)&&n(t.item)?O.call(t):j(t);this.forEach(function(t){0>i.indexOf(t)&&e.push(t)})}return j(e)},has:function(t){return this.filter(function(){return r(t)?j.contains(this,t):j(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!r(t)?t:j(t)},last:function(){var t=this[this.length-1];return t&&!r(t)?t:j(t)},find:function(t){var n,e=this;return n=t?"object"==typeof t?j(t).filter(function(){var t=this;return S.some.call(e,function(n){return j.contains(n,t)})}):1==this.length?j(U.qsa(this[0],t)):this.map(function(){return U.qsa(this,t)}):[]},closest:function(t,n){var e=this[0],r=!1;for("object"==typeof t&&(r=j(t));e&&!(r?r.indexOf(e)>=0:U.matches(e,t));)e=e!==n&&!i(e)&&e.parentNode;return j(e)},parents:function(t){for(var n=[],e=this;e.length>0;)e=j.map(e,function(t){return(t=t.parentNode)&&!i(t)&&0>n.indexOf(t)?(n.push(t),t):w});return m(n,t)},parent:function(t){return m(N(this.pluck("parentNode")),t)},children:function(t){return m(this.map(function(){return p(this)}),t)},contents:function(){return this.map(function(){return O.call(this.childNodes)})},siblings:function(t){return m(this.map(function(t,n){return P.call(p(n.parentNode),function(t){return t!==n})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return j.map(this,function(n){return n[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=h(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=n(t);if(this[0]&&!e)var i=j(t).get(0),r=i.parentNode||this.length>1;return this.each(function(n){j(this).wrapAll(e?t.call(this,n):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){j(this[0]).before(t=j(t));for(var n;(n=t.children()).length;)t=n.first();j(t).append(this)}return this},wrapInner:function(t){var e=n(t);return this.each(function(n){var i=j(this),r=i.contents(),o=e?t.call(this,n):t;r.length?r.wrapAll(o):i.append(o)})},unwrap:function(){return this.parent().each(function(){j(this).replaceWith(j(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var n=j(this);(t===w?"none"==n.css("display"):t)?n.show():n.hide()})},prev:function(t){return j(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return j(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(n){var e=this.innerHTML;j(this).empty().append(g(this,t,n,e))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(n){var e=g(this,t,n,this.textContent);this.textContent=null==e?"":""+e}):0 in this?this[0].textContent:null},attr:function(t,n){var e;return"string"!=typeof t||1 in arguments?this.each(function(e){if(1===this.nodeType)if(r(t))for(E in t)v(this,E,t[E]);else v(this,t,g(this,n,e,this.getAttribute(t)))}):this.length&&1===this[0].nodeType?!(e=this[0].getAttribute(t))&&t in this[0]?this[0][t]:e:w},removeAttr:function(t){return this.each(function(){1===this.nodeType&&v(this,t)})},prop:function(t,n){return t=Y[t]||t,1 in arguments?this.each(function(e){this[t]=g(this,n,e,this[t])}):this[0]&&this[0][t]},data:function(t,n){var e="data-"+t.replace(z,"-$1").toLowerCase(),i=1 in arguments?this.attr(e,n):this.attr(e);return null!==i?x(i):w},val:function(t){return 0 in arguments?this.each(function(n){this.value=g(this,t,n,this.value)}):this[0]&&(this[0].multiple?j(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(n){var e=j(this),i=g(this,t,n,e.offset()),r=e.offsetParent().offset(),o={top:i.top-r.top,left:i.left-r.left};"static"==e.css("position")&&(o.position="relative"),e.css(o)});if(!this.length)return null;var n=this[0].getBoundingClientRect();return{left:n.left+window.pageXOffset,top:n.top+window.pageYOffset,width:Math.round(n.width),height:Math.round(n.height)}},css:function(n,e){if(2>arguments.length){var i=this[0],r=getComputedStyle(i,"");if(!i)return;if("string"==typeof n)return i.style[C(n)]||r.getPropertyValue(n);if(G(n)){var o={};return j.each(n,function(t,n){o[n]=i.style[C(n)]||r.getPropertyValue(n)}),o}}var s="";if("string"==t(n))e||0===e?s=c(n)+":"+f(n,e):this.each(function(){this.style.removeProperty(c(n))});else for(E in n)n[E]||0===n[E]?s+=c(E)+":"+f(E,n[E])+";":this.each(function(){this.style.removeProperty(c(E))});return this.each(function(){this.style.cssText+=";"+s})},index:function(t){return t?this.indexOf(j(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?S.some.call(this,function(t){return this.test(y(t))},l(t)):!1},addClass:function(t){return t?this.each(function(n){if("className"in this){T=[];var e=y(this),i=g(this,t,n,e);i.split(/\s+/g).forEach(function(t){j(this).hasClass(t)||T.push(t)},this),T.length&&y(this,e+(e?" ":"")+T.join(" "))}}):this},removeClass:function(t){return this.each(function(n){if("className"in this){if(t===w)return y(this,"");T=y(this),g(this,t,n,T).split(/\s+/g).forEach(function(t){T=T.replace(l(t)," ")}),y(this,T.trim())}})},toggleClass:function(t,n){return t?this.each(function(e){var i=j(this),r=g(this,t,e,y(this));r.split(/\s+/g).forEach(function(t){(n===w?!i.hasClass(t):n)?i.addClass(t):i.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var n="scrollTop"in this[0];return t===w?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var n="scrollLeft"in this[0];return t===w?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],n=this.offsetParent(),e=this.offset(),i=D.test(n[0].nodeName)?{top:0,left:0}:n.offset();return e.top-=parseFloat(j(t).css("margin-top"))||0,e.left-=parseFloat(j(t).css("margin-left"))||0,i.top+=parseFloat(j(n[0]).css("border-top-width"))||0,i.left+=parseFloat(j(n[0]).css("border-left-width"))||0,{top:e.top-i.top,left:e.left-i.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||A.body;t&&!D.test(t.nodeName)&&"static"==j(t).css("position");)t=t.offsetParent;return t})}},j.fn.detach=j.fn.remove,["width","height"].forEach(function(t){var n=t.replace(/./,function(t){return t[0].toUpperCase()});j.fn[t]=function(r){var o,s=this[0];return r===w?e(s)?s["inner"+n]:i(s)?s.documentElement["scroll"+n]:(o=this.offset())&&o[t]:this.each(function(n){s=j(this),s.css(t,g(this,r,n,s[t]()))})}}),R.forEach(function(n,e){var i=e%2;j.fn[n]=function(){var n,r,o=j.map(arguments,function(e){return n=t(e),"object"==n||"array"==n||null==e?e:U.fragment(e)}),s=this.length>1;return 1>o.length?this:this.each(function(t,n){r=i?n:n.parentNode,n=0==e?n.nextSibling:1==e?n.firstChild:2==e?n:null;var a=j.contains(A.documentElement,r);o.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!r)return j(t).remove();r.insertBefore(t,n),a&&b(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},j.fn[i?n+"To":"insert"+(e?"Before":"After")]=function(t){return j(t)[n](this),this}}),U.Z.prototype=j.fn,U.uniq=N,U.deserializeValue=x,j.zepto=U,j}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function n(n,e,i){var r=t.Event(e);return t(n).trigger(r,i),!r.isDefaultPrevented()}function e(t,e,i,r){return t.global?n(e||y,i,r):void 0}function i(n){n.global&&0===t.active++&&e(n,null,"ajaxStart")}function r(n){n.global&&!--t.active&&e(n,null,"ajaxStop")}function o(t,n){var i=n.context;return n.beforeSend.call(i,t,n)===!1||e(n,i,"ajaxBeforeSend",[t,n])===!1?!1:(e(n,i,"ajaxSend",[t,n]),void 0)}function s(t,n,i,r){var o=i.context,s="success";i.success.call(o,t,s,n),r&&r.resolveWith(o,[t,s,n]),e(i,o,"ajaxSuccess",[n,i,t]),u(s,n,i)}function a(t,n,i,r,o){var s=r.context;r.error.call(s,i,n,t),o&&o.rejectWith(s,[i,n,t]),e(r,s,"ajaxError",[i,r,t||n]),u(n,i,r)}function u(t,n,i){var o=i.context;i.complete.call(o,n,t),e(i,o,"ajaxComplete",[n,i]),r(i)}function c(){}function l(t){return t&&(t=t.split(";",2)[0]),t&&(t==j?"html":t==E?"json":b.test(t)?"script":w.test(t)&&"xml")||"text"}function f(t,n){return""==n?t:(t+"&"+n).replace(/[&?]{1,2}/,"?")}function h(n){n.processData&&n.data&&"string"!=t.type(n.data)&&(n.data=t.param(n.data,n.traditional)),!n.data||n.type&&"GET"!=n.type.toUpperCase()||(n.url=f(n.url,n.data),n.data=void 0)}function p(n,e,i,r){return t.isFunction(e)&&(r=i,i=e,e=void 0),t.isFunction(i)||(r=i,i=void 0),{url:n,data:e,success:i,dataType:r}}function d(n,e,i,r){var o,s=t.isArray(e),a=t.isPlainObject(e);t.each(e,function(e,u){o=t.type(u),r&&(e=i?r:r+"["+(a||"object"==o||"array"==o?e:"")+"]"),!r&&s?n.add(u.name,u.value):"array"==o||!i&&"object"==o?d(n,u,i,e):n.add(e,u)})}var m,g,v=0,y=window.document,x=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,b=/^(?:text|application)\/javascript/i,w=/^(?:text|application)\/xml/i,E="application/json",j="text/html",T=/^\s*$/;t.active=0,t.ajaxJSONP=function(n,e){if(!("type"in n))return t.ajax(n);var i,r,u=n.jsonpCallback,c=(t.isFunction(u)?u():u)||"jsonp"+ ++v,l=y.createElement("script"),f=window[c],h=function(n){t(l).triggerHandler("error",n||"abort")},p={abort:h};return e&&e.promise(p),t(l).on("load error",function(o,u){clearTimeout(r),t(l).off().remove(),"error"!=o.type&&i?s(i[0],p,n,e):a(null,u||"error",p,n,e),window[c]=f,i&&t.isFunction(f)&&f(i[0]),f=i=void 0}),o(p,n)===!1?(h("abort"),p):(window[c]=function(){i=arguments},l.src=n.url.replace(/\?(.+)=\?/,"?$1="+c),y.head.appendChild(l),n.timeout>0&&(r=setTimeout(function(){h("timeout")},n.timeout)),p)},t.ajaxSettings={type:"GET",beforeSend:c,success:c,error:c,complete:c,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:E,xml:"application/xml, text/xml",html:j,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(n){var e=t.extend({},n||{}),r=t.Deferred&&t.Deferred();for(m in t.ajaxSettings)void 0===e[m]&&(e[m]=t.ajaxSettings[m]);i(e),e.crossDomain||(e.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(e.url)&&RegExp.$2!=window.location.host),e.url||(e.url=""+window.location),h(e);var u=e.dataType,p=/\?.+=\?/.test(e.url);if(p&&(u="jsonp"),e.cache!==!1&&(n&&n.cache===!0||"script"!=u&&"jsonp"!=u)||(e.url=f(e.url,"_="+Date.now())),"jsonp"==u)return p||(e.url=f(e.url,e.jsonp?e.jsonp+"=?":e.jsonp===!1?"":"callback=?")),t.ajaxJSONP(e,r);var d,v=e.accepts[u],y={},x=function(t,n){y[t.toLowerCase()]=[t,n]},b=/^([\w-]+:)\/\//.test(e.url)?RegExp.$1:window.location.protocol,w=e.xhr(),E=w.setRequestHeader;if(r&&r.promise(w),e.crossDomain||x("X-Requested-With","XMLHttpRequest"),x("Accept",v||"*/*"),(v=e.mimeType||v)&&(v.indexOf(",")>-1&&(v=v.split(",",2)[0]),w.overrideMimeType&&w.overrideMimeType(v)),(e.contentType||e.contentType!==!1&&e.data&&"GET"!=e.type.toUpperCase())&&x("Content-Type",e.contentType||"application/x-www-form-urlencoded"),e.headers)for(g in e.headers)x(g,e.headers[g]);if(w.setRequestHeader=x,w.onreadystatechange=function(){if(4==w.readyState){w.onreadystatechange=c,clearTimeout(d);var n,i=!1;if(w.status>=200&&300>w.status||304==w.status||0==w.status&&"file:"==b){u=u||l(e.mimeType||w.getResponseHeader("content-type")),n=w.responseText;try{"script"==u?(1,eval)(n):"xml"==u?n=w.responseXML:"json"==u&&(n=T.test(n)?null:t.parseJSON(n))}catch(o){i=o}i?a(i,"parsererror",w,e,r):s(n,w,e,r)}else a(w.statusText||null,w.status?"error":"abort",w,e,r)}},o(w,e)===!1)return w.abort(),a(null,"abort",w,e,r),w;if(e.xhrFields)for(g in e.xhrFields)w[g]=e.xhrFields[g];var j="async"in e?e.async:!0;w.open(e.type,e.url,j,e.username,e.password);for(g in y)E.apply(w,y[g]);return e.timeout>0&&(d=setTimeout(function(){w.onreadystatechange=c,w.abort(),a(null,"timeout",w,e,r)},e.timeout)),w.send(e.data?e.data:null),w},t.get=function(){return t.ajax(p.apply(null,arguments))},t.post=function(){var n=p.apply(null,arguments);return n.type="POST",t.ajax(n)},t.getJSON=function(){var n=p.apply(null,arguments);return n.dataType="json",t.ajax(n)},t.fn.load=function(n,e,i){if(!this.length)return this;var r,o=this,s=n.split(/\s/),a=p(n,e,i),u=a.success;return s.length>1&&(a.url=s[0],r=s[1]),a.success=function(n){o.html(r?t("<div>").html(n.replace(x,"")).find(r):n),u&&u.apply(o,arguments)},t.ajax(a),this};var C=encodeURIComponent;t.param=function(t,n){var e=[];return e.add=function(t,n){this.push(C(t)+"="+C(n))},d(e,t,n),e.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.Callbacks=function(n){n=t.extend({},n);var e,i,r,o,s,a,u=[],c=!n.once&&[],l=function(t){for(e=n.memory&&t,i=!0,a=o||0,o=0,s=u.length,r=!0;u&&s>a;++a)if(u[a].apply(t[0],t[1])===!1&&n.stopOnFalse){e=!1;break}r=!1,u&&(c?c.length&&l(c.shift()):e?u.length=0:f.disable())},f={add:function(){if(u){var i=u.length,a=function(e){t.each(e,function(t,e){"function"==typeof e?n.unique&&f.has(e)||u.push(e):e&&e.length&&"string"!=typeof e&&a(e)})};a(arguments),r?s=u.length:e&&(o=i,l(e))}return this},remove:function(){return u&&t.each(arguments,function(n,e){for(var i;(i=t.inArray(e,u,i))>-1;)u.splice(i,1),r&&(s>=i&&--s,a>=i&&--a)}),this},has:function(n){return!(!u||!(n?t.inArray(n,u)>-1:u.length))},empty:function(){return s=u.length=0,this},disable:function(){return u=c=e=void 0,this},disabled:function(){return!u},lock:function(){return c=void 0,e||f.disable(),this},locked:function(){return!c},fireWith:function(t,n){return!u||i&&!c||(n=n||[],n=[t,n.slice?n.slice():n],r?c.push(n):l(n)),this},fire:function(){return f.fireWith(this,arguments)},fired:function(){return!!i}};return f}}(Zepto),function(t){function n(e){var i=[["resolve","done",t.Callbacks({once:1,memory:1}),"resolved"],["reject","fail",t.Callbacks({once:1,memory:1}),"rejected"],["notify","progress",t.Callbacks({memory:1})]],r="pending",o={state:function(){return r},always:function(){return s.done(arguments).fail(arguments),this},then:function(){var e=arguments;return n(function(n){t.each(i,function(i,r){var a=t.isFunction(e[i])&&e[i];s[r[1]](function(){var e=a&&a.apply(this,arguments);if(e&&t.isFunction(e.promise))e.promise().done(n.resolve).fail(n.reject).progress(n.notify);else{var i=this===o?n.promise():this,s=a?[e]:arguments;n[r[0]+"With"](i,s)}})}),e=null}).promise()},promise:function(n){return null!=n?t.extend(n,o):o}},s={};return t.each(i,function(t,n){var e=n[2],a=n[3];o[n[1]]=e.add,a&&e.add(function(){r=a},i[1^t][2].disable,i[2][2].lock),s[n[0]]=function(){return s[n[0]+"With"](this===s?o:this,arguments),this},s[n[0]+"With"]=e.fireWith}),o.promise(s),e&&e.call(s,s),s}var e=Array.prototype.slice;t.when=function(i){var r,o,s,a=e.call(arguments),u=a.length,c=0,l=1!==u||i&&t.isFunction(i.promise)?u:0,f=1===l?i:n(),h=function(t,n,i){return function(o){n[t]=this,i[t]=arguments.length>1?e.call(arguments):o,i===r?f.notifyWith(n,i):--l||f.resolveWith(n,i)}};if(u>1)for(r=Array(u),o=Array(u),s=Array(u);u>c;++c)a[c]&&t.isFunction(a[c].promise)?a[c].promise().done(h(c,s,a)).fail(f.reject).progress(h(c,o,r)):--l;return l||f.resolveWith(s,a),f.promise()},t.Deferred=n}(Zepto),function(t){function n(t){return t._zid||(t._zid=h++)}function e(t,e,o,s){if(e=i(e),e.ns)var a=r(e.ns);return(g[n(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!a.test(t.ns)||o&&n(t.fn)!==n(o)||s&&t.sel!=s)})}function i(t){var n=(""+t).split(".");return{e:n[0],ns:n.slice(1).sort().join(" ")}}function r(t){return RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function o(t,n){return t.del&&!y&&t.e in x||!!n}function s(t){return b[t]||y&&x[t]||t}function a(e,r,a,u,l,h,p){var d=n(e),m=g[d]||(g[d]=[]);r.split(/\s/).forEach(function(n){if("ready"==n)return t(document).ready(a);var r=i(n);r.fn=a,r.sel=l,r.e in b&&(a=function(n){var e=n.relatedTarget;return!e||e!==this&&!t.contains(this,e)?r.fn.apply(this,arguments):f}),r.del=h;var d=h||a;r.proxy=function(t){if(t=c(t),!t.isImmediatePropagationStopped()){t.data=u;var n=d.apply(e,t._args==f?[t]:[t].concat(t._args));return n===!1&&(t.preventDefault(),t.stopPropagation()),n}},r.i=m.length,m.push(r),"addEventListener"in e&&e.addEventListener(s(r.e),r.proxy,o(r,p))})}function u(t,i,r,a,u){var c=n(t);(i||"").split(/\s/).forEach(function(n){e(t,n,r,a).forEach(function(n){delete g[c][n.i],"removeEventListener"in t&&t.removeEventListener(s(n.e),n.proxy,o(n,u))})})}function c(n,e){return(e||!n.isDefaultPrevented)&&(e||(e=n),t.each(T,function(t,i){var r=e[t];n[t]=function(){return this[i]=w,r&&r.apply(e,arguments)},n[i]=E}),(e.defaultPrevented!==f?e.defaultPrevented:"returnValue"in e?e.returnValue===!1:e.getPreventDefault&&e.getPreventDefault())&&(n.isDefaultPrevented=w)),n}function l(t){var n,e={originalEvent:t};for(n in t)j.test(n)||t[n]===f||(e[n]=t[n]);return c(e,t)}var f,h=1,p=Array.prototype.slice,d=t.isFunction,m=function(t){return"string"==typeof t},g={},v={},y="onfocusin"in window,x={focus:"focusin",blur:"focusout"},b={mouseenter:"mouseover",mouseleave:"mouseout"};v.click=v.mousedown=v.mouseup=v.mousemove="MouseEvents",t.event={add:a,remove:u},t.proxy=function(e,i){var r=2 in arguments&&p.call(arguments,2);if(d(e)){var o=function(){return e.apply(i,r?r.concat(p.call(arguments)):arguments)};return o._zid=n(e),o}if(m(i))return r?(r.unshift(e[i],e),t.proxy.apply(null,r)):t.proxy(e[i],e);throw new TypeError("expected function")},t.fn.bind=function(t,n,e){return this.on(t,n,e)},t.fn.unbind=function(t,n){return this.off(t,n)},t.fn.one=function(t,n,e,i){return this.on(t,n,e,i,1)};var w=function(){return!0},E=function(){return!1},j=/^([A-Z]|returnValue$|layer[XY]$)/,T={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,n,e){return this.on(n,t,e)},t.fn.undelegate=function(t,n,e){return this.off(n,t,e)},t.fn.live=function(n,e){return t(document.body).delegate(this.selector,n,e),this},t.fn.die=function(n,e){return t(document.body).undelegate(this.selector,n,e),this},t.fn.on=function(n,e,i,r,o){var s,c,h=this;return n&&!m(n)?(t.each(n,function(t,n){h.on(t,e,i,n,o)}),h):(m(e)||d(r)||r===!1||(r=i,i=e,e=f),(d(i)||i===!1)&&(r=i,i=f),r===!1&&(r=E),h.each(function(h,d){o&&(s=function(t){return u(d,t.type,r),r.apply(this,arguments)}),e&&(c=function(n){var i,o=t(n.target).closest(e,d).get(0);return o&&o!==d?(i=t.extend(l(n),{currentTarget:o,liveFired:d}),(s||r).apply(o,[i].concat(p.call(arguments,1)))):f}),a(d,n,r,i,e,c||s)}))},t.fn.off=function(n,e,i){var r=this;return n&&!m(n)?(t.each(n,function(t,n){r.off(t,e,n)}),r):(m(e)||d(i)||i===!1||(i=e,e=f),i===!1&&(i=E),r.each(function(){u(this,n,i,e)}))},t.fn.trigger=function(n,e){return n=m(n)||t.isPlainObject(n)?t.Event(n):c(n),n._args=e,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(n):t(this).triggerHandler(n,e)})},t.fn.triggerHandler=function(n,i){var r,o;return this.each(function(s,a){r=l(m(n)?t.Event(n):n),r._args=i,r.target=a,t.each(e(a,n.type||n),function(t,n){return o=n.proxy(r),r.isImmediatePropagationStopped()?!1:f})}),o},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(n){t.fn[n]=function(t){return t?this.bind(n,t):this.trigger(n)}}),["focus","blur"].forEach(function(n){t.fn[n]=function(t){return t?this.bind(n,t):this.each(function(){try{this[n]()}catch(t){}}),this}}),t.Event=function(t,n){m(t)||(n=t,t=n.type);var e=document.createEvent(v[t]||"Events"),i=!0;if(n)for(var r in n)"bubbles"==r?i=!!n[r]:e[r]=n[r];return e.initEvent(t,i,!0),c(e)}}(Zepto),function(t){t.fn.serializeArray=function(){var n,e,i=[];return t([].slice.call(this.get(0).elements)).each(function(){n=t(this),e=n.attr("type"),this.name&&"fieldset"!=this.nodeName.toLowerCase()&&!this.disabled&&"submit"!=e&&"reset"!=e&&"button"!=e&&("radio"!=e&&"checkbox"!=e||this.checked)&&i.push({name:n.attr("name"),value:n.val()})}),i},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(n){t.push(encodeURIComponent(n.name)+"="+encodeURIComponent(n.value))}),t.join("&")},t.fn.submit=function(n){if(n)this.bind("submit",n);else if(this.length){var e=t.Event("submit");this.eq(0).trigger(e),e.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(t,n){function e(t){return t.replace(/([a-z])([A-Z])/,"$1-$2").toLowerCase()}function i(t){return r?r+t:t.toLowerCase()}var r,o,s,a,u,c,l,f,h,p,d="",m={Webkit:"webkit",Moz:"",O:"o"},g=window.document,v=g.createElement("div"),y=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,x={};t.each(m,function(t,e){return v.style[t+"TransitionProperty"]!==n?(d="-"+t.toLowerCase()+"-",r=e,!1):n}),o=d+"transform",x[s=d+"transition-property"]=x[a=d+"transition-duration"]=x[c=d+"transition-delay"]=x[u=d+"transition-timing-function"]=x[l=d+"animation-name"]=x[f=d+"animation-duration"]=x[p=d+"animation-delay"]=x[h=d+"animation-timing-function"]="",t.fx={off:r===n&&v.style.transitionProperty===n,speeds:{_default:400,fast:200,slow:600},cssPrefix:d,transitionEnd:i("TransitionEnd"),animationEnd:i("AnimationEnd")},t.fn.animate=function(e,i,r,o,s){return t.isFunction(i)&&(o=i,r=n,i=n),t.isFunction(r)&&(o=r,r=n),t.isPlainObject(i)&&(r=i.easing,o=i.complete,s=i.delay,i=i.duration),i&&(i=("number"==typeof i?i:t.fx.speeds[i]||t.fx.speeds._default)/1e3),s&&(s=parseFloat(s)/1e3),this.anim(e,i,r,o,s)},t.fn.anim=function(i,r,d,m,g){var v,b,w,E={},j="",T=this,C=t.fx.transitionEnd,N=!1;if(r===n&&(r=t.fx.speeds._default/1e3),g===n&&(g=0),t.fx.off&&(r=0),"string"==typeof i)E[l]=i,E[f]=r+"s",E[p]=g+"s",E[h]=d||"linear",C=t.fx.animationEnd;else{b=[];for(v in i)y.test(v)?j+=v+"("+i[v]+") ":(E[v]=i[v],b.push(e(v)));j&&(E[o]=j,b.push(o)),r>0&&"object"==typeof i&&(E[s]=b.join(", "),E[a]=r+"s",E[c]=g+"s",E[u]=d||"linear")}return w=function(e){if(e!==n){if(e.target!==e.currentTarget)return;t(e.target).unbind(C,w)}else t(this).unbind(C,w);N=!0,t(this).css(x),m&&m.call(this)},r>0&&(this.bind(C,w),setTimeout(function(){N||w.call(T)},1e3*r+25)),this.size()&&this.get(0).clientLeft,this.css(E),0>=r&&setTimeout(function(){T.each(function(){w.call(this)})},0),this},v=null}(Zepto),function(t,n){function e(e,i,r,o,s){"function"!=typeof i||s||(s=i,i=n);var a={opacity:r};return o&&(a.scale=o,e.css(t.fx.cssPrefix+"transform-origin","0 0")),e.animate(a,i,null,s)}function i(n,i,r,o){return e(n,i,0,r,function(){s.call(t(this)),o&&o.call(this)})}var r=window.document,o=(r.documentElement,t.fn.show),s=t.fn.hide,a=t.fn.toggle;t.fn.show=function(t,i){return o.call(this),t===n?t=0:this.css("opacity",0),e(this,t,1,"1,1",i)},t.fn.hide=function(t,e){return t===n?s.call(this):i(this,t,"0,0",e)},t.fn.toggle=function(e,i){return e===n||"boolean"==typeof e?a.call(this,e):this.each(function(){var n=t(this);n["none"==n.css("display")?"show":"hide"](e,i)})},t.fn.fadeTo=function(t,n,i){return e(this,t,n,null,i)},t.fn.fadeIn=function(t,n){var e=this.css("opacity");return e>0?this.css("opacity",0):e=1,o.call(this).fadeTo(t,e,n)},t.fn.fadeOut=function(t,n){return i(this,t,null,n)},t.fn.fadeToggle=function(n,e){return this.each(function(){var i=t(this);i[0==i.css("opacity")||"none"==i.css("display")?"fadeIn":"fadeOut"](n,e)})}}(Zepto),function(t){"__proto__"in{}||t.extend(t.zepto,{Z:function(n,e){return n=n||[],t.extend(n,t.fn),n.selector=e||"",n.__Z=!0,n},isZ:function(n){return"array"===t.type(n)&&"__Z"in n}});try{getComputedStyle(void 0)}catch(n){var e=getComputedStyle;window.getComputedStyle=function(t){try{return e(t)}catch(n){return null}}}}(Zepto);
;(function () {
    Wisp = window.Wisp || {};
    /*
     * 客户端回调函数数据对象集
     * */
    Wisp.ClientCallback = {
        setBaseDomain : function (baseDomain) { //(客户端)当前域写入localstorage
            App.LS.set("App_baseDomain", baseDomain);
        },
        fillQRcodeText: function (domId, txt) {//二维码扫描回调
            var input=document.getElementById(domId);
            input.value=txt;
        }
    };
    /*
     * 客户端UI组件对象集
     * */
    Wisp.UI = (function () {
        var Init = function (opts) {
            var type = opts.type,
                datas = opts.datas;
            switch ( type ) {
                case 'footbar':
                    new Footbar(datas);
                    break;
                case 'toolbar':
                    new Toolbar(datas);
                    break;
                case 'sider':
                    new Sider(datas);
                    break;
                case 'dialog':
                    new Dialog(datas);
                    break;
                default:
                    console.log('地球已经不适合你，回火星去吧！！！');
            }
        };
        /*
         * UI.Toolbar 工具栏组件
         * */
        var Footbar = function (opts) {
            this._config = opts;//ui配置信息
            this._init();
        };
        Footbar.prototype._init = function () {
            console.dir(this._config);
            Wisp.CommenFunc.SendToWISPClient('post', '@@footbar@@', JSON.stringify(this._config), false);
        };
        /*
         * UI.Toolbar 工具栏组件
         * */
        var Toolbar = function (opts) {
            this._config = opts;//ui配置信息
            this._init();
        };
        Toolbar.prototype._init = function () {
            console.dir(this._config);
            Wisp.CommenFunc.SendToWISPClient('post', '@@toolbar@@', JSON.stringify(this._config), false);
        };
        /*
         * UI.Sider 侧边栏组件
         * */
        var Sider = function (opts) {
            this._config = opts;//ui配置信息
            this._init();
        };
        Sider.prototype._init = function () {
            console.dir(this._config);
            Wisp.CommenFunc.SendToWISPClient('post', '@@sider@@', JSON.stringify(this._config), false);
        };
        /*
         * UI.Dialog 对话框组件
         * */
        var Dialog = function (opts) {
            this._config = opts;//ui配置信息
            this._init();
        };
        Dialog.prototype._init = function () {
            console.dir(this._config);
            Wisp.CommenFunc.SendToWISPClient('post', '@@dialog@@', JSON.stringify(this._config), false);
        };

        var progressDialog = {   //加载对话框
            "show"  : function (content) {
                this.content = content;
                Wisp.CommenFunc.SendToWISPClient('post', '@@showProgressDialog@@', JSON.stringify(this), false);
            }, //打开
            "remove": function () {
                Wisp.CommenFunc.SendToWISPClient('post', '@@dismissProgressDialog@@', '', false);
            } //移除加载对话框
        };
        var loginResult = {   //登录结果
            "success": function () {
                Wisp.CommenFunc.SendToWISPClient('post', '@@loginSuccess@@', '', false);
            }, //成功
            "fail"   : function () {
                Wisp.CommenFunc.SendToWISPClient('post', '@@loginFail@@', '', false);
            } //失败
        };
        var Webview = {   //webview操作 即window 操作
            "pageId"       : null,
            "init"         : function (opts) {
                this.pageId = opts.PageId;
                this.callback = opts.callback || null;
                return this;
            },
            "close"        : function () {
                Wisp.CommenFunc.SendToWISPClient('post', '@@closeWebviewWidget@@', JSON.stringify(this), false);
            }, //关闭指定webview
            "refresh"      : function () {
                Wisp.CommenFunc.SendToWISPClient('post', '@@refreshWebviewWidget@@', JSON.stringify(this), false);
            }, //刷新指定webview
            "getBaseDomain": function (callback) {
                this.callback = callback || null;
                Wisp.CommenFunc.SendToWISPClient('post', '@@getBaseDomain@@', JSON.stringify(this), false);
            }
        };
        var Gallery = {   //打开轮播
            "open": function (opts) {
                this.currentPage = opts.active + '';
                this.images = opts.images;
                Wisp.CommenFunc.SendToWISPClient('post', '@@openGallery@@', JSON.stringify(this), false);
            }
        };
        var fullScreen = {   //全屏控制
            "open" : function () {
            }, //打开
            "close": function () {
            } //关闭
        };
        var zoomWindow = {  //窗口缩放
            "zoomIn" : function () {
            },//放大
            "zoomOut": function () {
            }//缩小
        };
        return {
            "Init"          : Init, //初始化
            "progressDialog": progressDialog,//加载对话框
            "loginResult"   : loginResult,//登录结果
            "Webview"       : Webview,//webview操作
            "Gallery"       : Gallery,//实例化相册
            "fullScreen"    : fullScreen,//TODO 全屏
            "zoomWindow"    : zoomWindow //TODO 窗口缩放
        }
    })();
    /*
     * 客户端接口公共函数对象
     * */
    Wisp.CommenFunc = (function () {
        var GetXmlhttpWISPClient = function () {
            var xmlhttp;
            try {
                xmlhttp = new window.XMLHttpRequest();
                typeFlag = true;
            } catch ( e ) {
                var ActiveXName = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0',
                    'MSXML2.XMLHttp.5.0', 'MSXML2.XMLHttp.4.0', 'Msxml2.XMLHTTP',
                    'MSXML.XMLHttp', 'Microsoft.XMLHTTP']

                function XMLHttpActiveX() {
                    var e;
                    for ( var i = 0; i < ActiveXName.length; i++ ) {
                        try {
                            var ret = new ActiveXObject(ActiveXName[i]);
                            typeFlag = false;
                        } catch ( e ) {
                            continue;
                        }
                        return ret;
                    }
                    throw {
                        "message": "XMLHttp ActiveX Unsurported."
                    };
                }

                try {
                    xmlhttp = new XMLHttpActiveX();
                    typeFlag = false;
                } catch ( e ) {
                    throw new Error(0, "XMLHttpRequest Unsurported.");
                }
            }
            return xmlhttp;
        };
        var SendToWISPClient = function (method, type, param, async) {
            var urlPre = "AjAxSocketIFC/" + type + "?";
            var App = App || {};
            if ( App && App.localHost !== undefined ) {
                urlPre = App.localHost + '/' + urlPre;
            }
            if ( method == 'get' && param != '' ) {
                urlPre += encodeURIComponent(param) + '&';
            }
            urlPre += "date="
            + new Date();
            var xmlhttp = GetXmlhttpWISPClient();
            var result = "";
            if ( async ) {
                // 异步
                xmlhttp.onreadystatechange = function () {
                    if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
                        var text = xmlhttp.responseText;
                        console.dir(text);//打印返回信息
                        result = text;
                    }
                }
            }
            try {
                xmlhttp.open(method, urlPre, async);
                if ( method == 'post' ) {
                    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    console.info("Request client UI:" + type + " start!");
                    xmlhttp.send(param);
                    console.info("Request client UI:" + type + " end!");
                } else {
                    //get请求
                    xmlhttp.send();
                }
            }
            catch ( e ) {
            }
            if ( !async ) { // 同步
                try {
                    var text = xmlhttp.responseText;
                    result = text;
                } catch ( e ) {
                    return param;
                }
            }
            return result;
        };

        function getRandom() {//获取0-100随机数
            return parseInt(Math.random() * 100);
        }

        /*
         * 附件上传接口
         * @param path 文件路径
         * @param posturl 文件上传地址
         * @param callback 上传回调函数 参数(key,value)：eg:(Result,Success/Fail)  或 (ImageID,value)
         * */
        var PostFile = function (opts) {
            this.path = opts.path;
            this.posturl = opts.postUrl;
            this.callback = opts.callback || null;
        };//通用上传接口
        PostFile.prototype = {
            "uploadFile"   : function () {
                var self = this;
                Wisp.CommenFunc.SendToWISPClient('post', '@@uploadfile@@', JSON.stringify(self), false);
            },
            "uploadSuccess": function () {
                Wisp.CommenFunc.SendToWISPClient('post', '@@uploadsuccess@@', '', false);
            },
            "uploadFail"   : function () {
                Wisp.CommenFunc.SendToWISPClient('post', '@@uploadfail@@', '', false);
            }
        };
        return {
            "SendToWISPClient": SendToWISPClient,//网客户端发送资源共有方法
            "getRandom"       : getRandom,//获取0-100随机数
            "PostFile"        : PostFile//通用上传接口
        }
    })();
    /*
     * 客户端资源接口对象集
     * */
    Wisp.ClientResource = (function () {
        var HandWriting = function () {
        };//客户端手写功能
        var MeetingMobi = function () {
        };//移动会议功能
        var DocRevision = function () {
        };//正文批阅功能
        var PDFNotation = function () {
        };//PDF批注功能
        var DocReader = function () {
        };//文档阅读器
        var Camera = function () {
        };//客户端拍照功能
        Camera.prototype = {
            "open": function (callback) {
                this.callback = callback;
                Wisp.CommenFunc.SendToWISPClient('post', '@@openCamera@@', JSON.stringify(this), false);
            }
        };
        var PersonalInfo = function (opts) {
            this.username = opts.username;
            this.pwd = opts.pwd;
            this.ip = opts.ip;
            this.port = opts.port;
            this.fileServerUrl = opts.fileServerUrl;
        };//个人信息接口
        PersonalInfo.prototype = {
            "send": function (callback) {
                this.callback = callback || null;
                Wisp.CommenFunc.SendToWISPClient('post', '@@sendPersonalInfo@@', JSON.stringify(this), false);
            }
        };
        /*
         * 打印功能
         * @param event 事件名称
         * @param opts 接口参数
         * @param callback 回调函数
         * @return Printer 返回打印对象
         * */
        var Printer = function (event, opts, callback) {
            var type = {
                "open": "open"
            };//event事件映射表
            if ( !(event && opts) ) {
                return;
            }
            var P = {
                "init": function () {
                    var index = event;
                    this.url = opts.targetpage;
                    callback && (this.callback = callback);
                    type[index] && this[type[index]]();
                },
                "open": function () {
                    Wisp.CommenFunc.SendToWISPClient('post', '@@openPrinter@@', JSON.stringify(this), false);
                }
            };
            P.init();//打印接口初始化
            return P;//返回打印对象
        };
        /*
         * 二维码功能
         * @param event 事件名称
         * @param opts 接口参数
         * @param callback 回调函数
         * @return QRcode 返回二维码对象
         * */
        var QRcode = function (event, opts, callback) {
            var type = {
                "open": "open"
            };//event事件映射表
            if ( arguments.length < 3 ) {
                if ( !arguments[1] instanceof Object ) {
                    callback = arguments[1]
                }
            }
            var QR = {
                "init": function () {
                    var index = event;
                    this.domId = opts.domId;//input id
                    callback && (this.callback = callback); //回调函数
                    type[index] && this[type[index]]();
                },
                "open": function () {
                    Wisp.CommenFunc.SendToWISPClient('post', '@@openQRcode@@', JSON.stringify(this), false);
                }
            };
            QR.init();//二维码接口初始化
            return QR;//返回二维码对象
        };
        return {
            "Camera"      : Camera, //调用照相机
            "PersonalInfo": PersonalInfo, //获取个人信息
            "Printer"     : Printer, //打印接口
            "QRcode"      : QRcode //二维码扫描功能
        }
    })();
})();
;var jnjjApp = jnjjApp || {};
jnjjApp.config = {
    "domain"       : "rjsoft.gnway.cc",
    "httpPort"     : "9087",
    "requestUrl"   : "http://rjsoft.gnway.cc:9087",
    "msgRequestUrl": "http://rjsoft.gnway.cc:9093",
    "wechatServer" : "http://220.250.1.46/WISP_JN_WECHAT"
};
jnjjApp.callback = {};
var PageId_lv01 = (new Date()).getTime();
jnjjApp.footbarDatas = {
    "footbar": [
        {
            "beforeImg": "config/html/images/wispui/home_normal.png",
            "afterImg" : "config/html/images/wispui/home_hover.png",
            "name"     : "首页",
            "view"     : [
                {
                    "type": 'picGallery',//图片轮播
                    "size": 'Larger', //尺寸标识 Larger Middle Smaller
                    "data": []
                },
                {
                    "type": "btnsGallery",//菜单轮播
                    "data": [
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/home/h_violation_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/home/h_violation_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "违法信息",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "config/html/violation.html?@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/home/h_kccx_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/home/h_kccx_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "快处查询",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "config/html/wechatquery.html?@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@#mode=query_sgkc"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/home/h_bindcar_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/home/h_bindcar_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "车辆绑定",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "config/html/bindcar.html?@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/home/h_bindcard_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/home/h_bindcard_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "驾照绑定",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "config/html/bindcard.html?@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/home/h_ksyycx_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/home/h_ksyycx_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "考试预约查询",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "config/html/examquery.html?@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@#mode=query_ksyy"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/home/h_kscjcx_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/home/h_kscjcx_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "考试成绩查询",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "config/html/examquery.html?@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@#mode=query_kscj"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/home/h_position_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/home/h_position_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "车管所位置",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : jnjjApp.config.requestUrl + "/jnpublic/cgsquery.json?action=map"
                        }
                    ]
                },
                {
                    "type": 'picGallery',//图片轮播
                    "size": 'Middle', //尺寸标识 Larger Middle Smaller
                    "data": [
                        {
                            "imgUrl": "http://rjsoft.gnway.cc:9093/wispcms/unicom.jpg",
                            "url"   : "config/html/tips.html"
                        }
                    ]
                }
            ]
        },
        {
            "beforeImg" : "config/html/images/wispui/message_normal.png",
            "afterImg"  : "config/html/images/wispui/message_hover.png",
            "name"      : "信息",
            "clickEvent": "",
            "subBtns"   : []
        },
        {
            "beforeImg"   : "config/html/images/wispui/traffic_normal.png",
            "afterImg"    : "config/html/images/wispui/traffic_hover.png",
            "name"        : "交管",
            "clickEvent"  : "",
            "subBtns"     : [],
            "shortcutBtns": [
                {
                    "divider": {
                        "title": "自助服务",
                        "ico"  : ""
                    },//用于分组，为空时不显示
                    "data"   : [
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/traffic/t_violation_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/traffic/t_violation_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "违法信息",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "config/html/violation.html?@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/traffic/t_accident_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/traffic/t_accident_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "快处查询",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "config/html/wechatquery.html?@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@#mode=query_sgkc"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/traffic/t_bindcar_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/traffic/t_bindcar_hover.png", //点击时图标
                            "disableImg": "config/html/images/wispui/clbd_dis.png",
                            "enable"    : "false",
                            "name"      : "车辆绑定",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "config/html/bindcar.html?@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/traffic/t_bindcard_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/traffic/t_bindcard_hover.png", //点击时图标
                            "disableImg": "config/html/images/wispui/jzbd_dis.png",
                            "enable"    : "false",
                            "name"      : "驾照绑定",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "config/html/bindcard.html?@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
                        }
                    ]
                },
                {
                    "divider": {
                        "title": "业务大厅",
                        "ico"  : ""
                    },//用于分组，为空时不显示
                    "data"   : [
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/traffic/t_inspec_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/traffic/t_inspec_hover.png", //点击时图标
                            "disableImg": "config/html/images/wispui/njyy_dis.png",
                            "enable"    : "false",
                            "name"      : "年检预约",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "config/html/inspectionAppointment.html?@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/traffic/t_examquery_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/traffic/t_examquery_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "考试预约查询",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "config/html/examquery.html?@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@#mode=query_ksyy"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/traffic/t_inspecquery_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/traffic/t_inspecquery_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "年检预约查询",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "config/html/inspectionquery.html?@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@#mode=query_njyy"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/traffic/t_examresult_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/traffic/t_examresult_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "考试成绩查询",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "config/html/examquery.html?@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@#mode=query_kscj"
                        }
                    ]
                },
                {
                    "divider": {
                        "title": "周边服务",
                        "ico"  : ""
                    },//用于分组，为空时不显示
                    "data"   : [
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/traffic/t_position_normal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/traffic/t_position_hover.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "车管所位置",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : jnjjApp.config.requestUrl + "/jnpublic/cgsquery.json?action=map"
                        }
                    ]
                }
            ]
        },
        {
            "beforeImg" : "config/html/images/wispui/find_normal.png",
            "afterImg"  : "config/html/images/wispui/find_hover.png",
            "name"      : "发现",
            "clickEvent": "",
            "view"      : [ //发现 视图数据
                {
                    "type": "RectangleWithIcoLeft",
                    "data": [
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/find/f_wzts.png",//点击前图标
                            "afterImg"  : "", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "违法推送",
                            "summary"   : "违法主动推送",
                            "clickEvent": "",
                            "url"       : "config/html/tips.html"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/find/f_jyyh.png",//点击前图标
                            "afterImg"  : "", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "加油优惠",
                            "summary"   : "商谈后确定",
                            "clickEvent": "",
                            "url"       : "config/html/tips.html"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/find/f_xcyh.png",//点击前图标
                            "afterImg"  : "", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "洗车优惠",
                            "summary"   : "联创冰点价",
                            "clickEvent": "",
                            "url"       : "config/html/tips.html"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/find/f_dj.png",//点击前图标
                            "afterImg"  : "", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "代驾",
                            "summary"   : "泽安冰点价",
                            "clickEvent": "",
                            "url"       : "config/html/tips.html"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/find/f_byyh.png",//点击前图标
                            "afterImg"  : "", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "保养优惠",
                            "summary"   : "商谈后确定",
                            "clickEvent": "",
                            "url"       : "config/html/tips.html"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/find/f_clns.png",//点击前图标
                            "afterImg"  : "", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "车辆年审",
                            "summary"   : "无需排队等候",
                            "clickEvent": "",
                            "url"       : "config/html/tips.html"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/find/f_dljy.png",//点击前图标
                            "afterImg"  : "", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "道路救援",
                            "summary"   : "免费全国救援",
                            "clickEvent": "",
                            "url"       : "config/html/tips.html"
                        }
                    ]
                }
            ]
        },
        {
            "beforeImg" : "config/html/images/wispui/my_normal.png",
            "afterImg"  : "config/html/images/wispui/my_hover.png",
            "name"      : "我的",
            "clickEvent": "",
            "siderView" : [
                {
                    "type": "personalPic",
                    "data": [
                        {
                            "id"    : '',
                            "img"   : '',
                            "name"  : '',
                            "url"   : 'config/html/loginnoskip.html',
                            "roleid": '0000'//角色权限标识
                        }
                    ]
                },
                {
                    "type": "list",
                    "data": [
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/my/m_personal.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/my/m_personal.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "资料维护",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "config/html/personalinfo.html?@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/my/m_car.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/my/m_car.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "我的车辆",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "config/html/carlist.html?@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/my/m_card.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/my/m_card.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "false",
                            "name"      : "我的驾照",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "config/html/cardlist.html?@@webViewPageId=" + PageId_lv01 + Wisp.CommenFunc.getRandom() + "@@"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/my/m_msg.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/my/m_msg.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "消息查看",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : jnjjApp.config.msgRequestUrl + "/wispcms/content/list.do?cid=65&type=Android&action=message"
                        },
                        {
                            "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                            "beforeImg" : "config/html/images/wispui/my/m_feedback.png",//点击前图标
                            "afterImg"  : "config/html/images/wispui/my/m_feedback.png", //点击时图标
                            "disableImg": "",
                            "enable"    : "true",
                            "name"      : "意见建议",
                            "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                            "clickEvent": "",
                            "url"       : "config/html/feedback.html"
                        }
                    ]
                }
            ]
        }
    ]
};
jnjjApp.siderDatas = {
    "sider": {
        "info": {
            "id"    : '',
            "img"   : '',
            "name"  : '',
            "url"   : 'config/html/loginnoskip.html',
            "roleid": '0000'//角色权限标识
        }
    }
};


;/*
 * js异常监控，语法、运行时错误
 * */
/*window.onerror = function(msg,url,line,col,error){
 //没有URL不上报！上报也不知道错误
 if (msg != "Script error." && !url){
 return true;
 }
 //采用异步的方式
 //我遇到过在window.onunload进行ajax的堵塞上报
 //由于客户端强制关闭webview导致这次堵塞上报有Network Error
 //我猜测这里window.onerror的执行流在关闭前是必然执行的
 //而离开文章之后的上报对于业务来说是可丢失的
 //所以我把这里的执行流放到异步事件去执行
 //脚本的异常数降低了10倍
 setTimeout(function(){
 var data = {};
 //不一定所有浏览器都支持col参数
 col = col || (window.event && window.event.errorCharacter) || 0;

 data.url = url;
 data.line = line;
 data.col = col;
 if (!!error && !!error.stack){
 //如果浏览器有堆栈信息
 //直接使用
 data.msg = error.stack.toString();
 }else if (!!arguments.callee){
 //尝试通过callee拿堆栈信息
 var ext = [];
 var f = arguments.callee.caller, c = 3;
 //这里只拿三层堆栈信息
 while (f && (--c>0)) {
 ext.push(f.toString());
 if (f  === f.caller) {
 break;//如果有环
 }
 f = f.caller;
 }
 ext = ext.join(",");
 data.msg = ext;
 }
 //把data上报到后台！

 },0);

 return true;
 };*/
var App = (function () {
    function UI(name, opts, callback) {
        var changePage = {
            "curHeight"       : null,
            "init"            : function () {
                this.name = name;
                opts.wrap && (this.wrap = opts.wrap);
                this.currentpage = this.wrap.children().eq(0);
                this.initDomFlag();
                callback && (this.callback = callback);
            },
            "initDomFlag"     : function () {
                var self = this;
                var wrap = self.wrap;
                var childrenList = wrap.children();
                var l = childrenList.length;
                wrap.css('position', 'relative');
                self.setCurPageHeight();
                childrenList.each(function (index) {
                    var Index = index - 0;
                    var left = Index * 100 + '%';
                    $(this).attr('id', "page_" + Index);
                    $(this).css({
                        "position": 'absolute',
                        "left"    : left,
                        "top"     : 0
                    });
                });
                childrenList.each(function (index) {
                    var Index = index;
                    var btns = $(this).find(".ui_btn[data-rel]");
                    btns.each(function (index) {
                        if ( $(this).attr("data-rel") === 'pre' ) {
                            self.bindEvent($(this), Index, Index - 1);
                        }
                        if ( $(this).attr("data-rel") === 'next' ) {
                            self.bindEvent($(this), Index, Index + 1);
                        }
                    });
                });
            },
            "bindEvent"       : function (dom, currentpage, gopage) {
                var self = this;
                var btn = dom;
                var cur_page = $('#page_' + currentpage);
                var go_page = $('#page_' + gopage);
                if ( currentpage > gopage ) {
                    //点击后退
                    btn.on('click', function () {
                        console.log('go back');
                        self.toggle(cur_page, go_page, "right");
                    });
                } else {
                    //点击前进
                    btn.on('click', function () {
                        console.log('go ahead');
                        self.toggle(cur_page, go_page, "left");
                    });
                }
            },
            "toggle"          : function (curpage, gopage, action) {
                switch ( action ) {
                    case 'left':
                        curpage.animate({
                            left     : '-100%',
                            opacity  : '0',
                            'z-index': '0'
                        }, 200, 'ease-out');
                        gopage.animate({
                            left   : '0',
                            opacity: '1'
                        }, 200, 'ease-out');
                        break;
                    case 'right':
                        curpage.animate({
                            left     : '100%',
                            opacity  : '0',
                            'z-index': '0'
                        }, 200, 'ease-out');
                        gopage.animate({
                            left   : '0',
                            opacity: '1'
                        }, 200, 'ease-out');
                        break;
                }
                this.currentpage = gopage;
                this.setCurPageHeight();
            },
            //android webview中软键盘弹出后父容器随最高子容器高度决定是否出现滚动条，如果当前显示容器高度小于最高子容器高度
            // 而父容器又因为弹出键盘而随最高子容器高度出现滚动条，导致出现父容器overflowX属性失效 bug,表现为可左右拖动页面
            //在父容器设置overflow:hidden前提下，通过切面切换时重置父容器高度为当前显示容器高度规避该bug
            "setCurPageHeight": function () {
                var _self = this;
                _self.curHeight = _self.currentpage.height();
                _self.currentpage.css('z-index', 1111);
                _self.wrap.css({
                    'height': _self.curHeight
                })
            }
        };
        var inputClose = {
            "tipsMap"     : {
                "card"   : '格式:3701XXXXXXXXXXXXXX',
                "mail"   : '格式:name@domain.com',
                "user"   : '用户名含6-11位的数字或字母',
                "cnuser" : '姓名含1-20字',
                "psd"    : '密码含6-20位',
                "mobile" : '手机号码含11位数字',
                "car"    : '格式:M1111',
                "archive": '档案编号12位纯数字',
                "car2"   : '车辆识别代号17位',
                "lsh"    : '流水号1-13位',
                "record" : '记录号12位字母或数字'
            },
            "init"        : function () {
                this.doms = opts.doms;
                this.render();
                this.bindEvent();
            },
            "render"      : function () {
                var self = this;
                var inputWrap;
                var isReadonly;
                var closeHtml = '<a class="close">X</a>';
                self.doms.each(function (index) {
                    inputWrap = $(this).find('.item-input');
                    isReadonly = inputWrap.find('input').prop('readonly');
                    !isReadonly && inputWrap.append(closeHtml);
                });
            },
            "bindEvent"   : function () {
                var self = this;
                var value;
                var inputWrap;
                //console.dir(self.doms);
                self.doms.each(function (index) {
                    inputWrap = $(this).find('.item-input');
                    inputWrap.each(function (index) {
                        var close;
                        var input;
                        var type;
                        var result;
                        var tipstxt;
                        var value;
                        input = $(this).find('input');
                        close = $(this).find('a.close');
                        close.on('click', function () {
                            var curInput = $(this).parent().children('input');
                            curInput.val('');
                            curInput.focus();
                            $(this).css('display', 'none');
                        })
                        input.on('focus', function (e) {
                            //console.log('focus');
                            close.css('display', 'block');
                        })
                        input.on('blur', function (e) {
                            self.verify($(this), close);
                        })
                        input.on('input', function (e) {
                            self.verify($(this), close);
                        })
                    })
                });
            },
            "verify"      : function (target, closeDom) {
                var self = this;
                var result,
                    value,
                    tipstxt,
                    type;
                type = target.attr('data-type');
                value = target.val();
                if ( type ) {
                    result = self.validationer(type, value);
                    if ( !result ) { //没验证通过，弹出提示
                        tipstxt = self.tipsMap[type];
                        self.popTips(target, tipstxt);
                    } else {//验证通过，原有提示，则移除
                        self.removeTips(target);
                    }
                }
                !value && closeDom.css('display', 'none');
            },
            "validationer": function (type, value) {
                var result;
                switch ( type ) {
                    case "card":
                        result = cidInfo(value);
                        break;
                    case "mail":
                        result = isEmail(value);
                        break;
                    case "user":
                        result = isENUser(value);
                        break;
                    case "cnuser":
                        result = isCNUser(value);
                        break;
                    case "psd":
                        result = ispsd(value);
                        break;
                    case "mobile":
                        result = isMonbile(value);
                        break;
                    case "car":
                        result = iscarid(value);
                        break;
                    case "archive":
                        result = isArchiveid(value);
                        break;
                    case "car2":
                        result = iscarid2(value);
                        break;
                    case "lsh":
                        result = islsh(value);
                        break;
                    case "record":
                        result = isrecord(value);
                        break;
                    default:
                        console.log('这是一个彩蛋，买彩票去吧！');
                }
                return result;
            },
            "popTips"     : function (cur_input, txt) {
                var self = this;
                var wrap = cur_input.parent();
                var tipshtml = '<b class="tips">' + txt + '</b>';
                var tipsdom = wrap.find('.tips');
                if ( tipsdom.length ) return;
                wrap.append(tipshtml);
            },
            "removeTips"  : function (cur_input) {
                var wrap = cur_input.parent();
                var tipsdom = wrap.find('.tips');
                tipsdom && tipsdom.remove();//有提示则移除
            }
        };
        var buttonHover = {
            "init"       : function () {
                this.dom = opts.dom;
                opts.hoverClassName && (this.hoverClassName = opts.hoverClassName);
                this.off = opts.off || false;
                !this.off && this.bindEvent();
                this.off && this.removeEvent();
            },
            "bindEvent"  : function (e) {
                var _self = this;
                var _dom = _self.dom;
                var _classname = _self.hoverClassName;
                _dom.on('touchstart', function () {
                    $(this).addClass(_classname);
                });
                _dom.on('touchend', function () {
                    $(this).removeClass(_classname);
                });
            },
            "removeEvent": function () {
                var _self = this;
                var _dom = _self.dom;
                _dom.off('touchstart');
                _dom.off('touchend');
            }
        };
        var select = {
            "init"      : function () {
                this.dom = opts.dom;
                this.url = opts.url;
                this.dataType = opts.dataType || null;
                this.params = opts.data;
                this.module = opts.module || null;
                this.callback = callback || null;
                var _self = this;
                getAjaxData(_self.url, _self.params, function (data) {
                    _self.initSelect(data);
                });
            },
            "initSelect": function (data) {
                var _self = this;
                var list;
                var selectArr = [];
                var selectStr;
                var _module = _self.module;
                data.msg && (list = data.msg);
                data[_module + 'QueryResponse'] && (list = data[_module + 'QueryResponse'][_module + 'List']);
                data[_module + 'Response'] && (list = data[_module + 'Response'][_module + 'List']);
                if ( _self.dataType === 'Object' ) {
                    for ( var j in list ) {
                        selectArr.push("<option value='" + list[j].key + "'>" + list[j].name + "</option>");
                    }
                }
                /* 违法抓拍地点*/
                else if ( _self.dataType === 'Wfddbh' ) {
                    for ( var j in list ) {
                        selectArr.push("<option value='" + list[j].ddbh + "'>" + list[j].ddmc + "</option>");
                    }
                }
                if ( _module ) {
                    if ( _module === 'car' ) {  //按车辆
                        for ( var j in list ) {
                            selectArr.push("<option data-type='" + list[j].carNumType + "' value='" + list[j].carid + "'>" + list[j].carid + "</option>");
                        }
                    }
                    if ( _module === 'license' ) {
                        for ( var j in list ) { //按驾照
                            selectArr.push("<option value='" + list[j].licenseid + "'>" + list[j].licenseName + "</option>");
                        }
                    }
                    if ( _module === 'carType' || _module === 'identityType' || _module === 'cgsCommon' ) {
                        for ( var j in list ) { //车辆类型
                            selectArr.push("<option value='" + list[j].key + "'>" + list[j].name + "</option>");
                        }
                    }
                    if ( !list.length ) {
                        selectArr.push("<option>未绑定</option>");
                        selectStr = selectArr.join('');
                        _self.dom.append(selectStr);
                        _self.dom.attr('disabled', 'disabled');
                        return;
                    }
                }
                selectStr = selectArr.join('');
                _self.dom.append(selectStr);
                selectStr && _self.dom.mobiscroll().select({
                    theme   : 'ios7',
                    lang    : 'zh',
                    display : 'bottom',
                    mode    : 'scroller',
                    minWidth: 200
                });
                _self.callback && _self.callback();
            }
        };
        var tabToggle = {
            "init"     : function () {
                this.dom = opts.dom;
                this.activeClass = opts.activeClass;
                this.defaultClass = opts.defaultClass || null;
                this.bindEvent();
            },
            "bindEvent": function (e) {
                var _self = this;
                var _activeClass = _self.activeClass;
                var _defaultClass = _self.defaultClass;
                var tabItem = _self.dom.children();
                tabItem.each(function (index) {
                    $(this).on('click', function (e) {
                        var me = $(this);
                        var dataFor = me.attr('data-for');
                        var currentTabContent = $('#' + dataFor);
                        if ( me.hasClass(_activeClass) ) {
                            _defaultClass && me.removeClass(_defaultClass);
                        }
                        me.addClass(_activeClass);
                        currentTabContent.show();
                        tabItem.each(function (index) {
                            var me = $(this);
                            if ( me.attr('data-for') !== dataFor ) {
                                me.removeClass(_activeClass);
                                _defaultClass && me.addClass(_defaultClass);
                                $('#' + me.attr('data-for')).hide();
                            }
                        });
                    });
                });
            }
        };
        var toggleSelectBlock = {
            "curBlock"   : null,
            "init"       : function () {
                this.dom = opts.dom;
                this.bindEvent();
            },
            "bindEvent"  : function () {
                var _self = this;
                var _val = _self.dom.val();
                _self.dom.on('change', function (e) {
                    var selcetVal = $(this).val();
                    _self.toggleBlock(selcetVal);
                });
                _val && _self.toggleBlock(_val);
            },
            "toggleBlock": function (targetid) {
                if ( !targetid ) return;
                var _self = this;
                var _targetBlock = $('#' + targetid);
                if ( this.curBlock && (this.curBlock.selector === _targetBlock.selector) ) return;
                this.curBlock && this.curBlock.hide('linear');
                _targetBlock.show('linear');
                this.curBlock = _targetBlock;
            }
        };
        var btnHighlightWithInput = {
            "oldVal"            : '',
            "newVal"            : '',
            "init"              : function () {
                this.btn = opts.btn;
                this.listener = opts.listener || null;
                this.listenerArg = opts.listenerArg || null;
                this.inputs = opts.inputs;
                this.disableClass = opts.disableClass;
                this.hoverClass = opts.hoverClass;
                this.callback = callback;
                this.disableBtn();
                this.bindEvent();
            },
            "bindEvent"         : function () {
                var self = this;
                var value;
                var _curInput;
                var _curInputVal;
                //console.dir(self.doms);
                self.inputs.each(function (index) {
                    _curInput = $(this);
                    _curInputVal = _curInput.val();
                    _curInput.on('focus', function () {
                        self.oldVal = $(this).val();
                        //self.newVal = self.oldVal;
                        self.toggleBtnHighlight();
                        self.newVal = '';
                    });
                    _curInput.on('blur', function () {
                        self.newVal = $(this).val();
                        self.toggleBtnHighlight();
                        self.oldVal = self.newVal;
                    });
                    if ( _curInput.attr('type') === 'checkbox' ) {
                        self.oldVal = '';
                        _curInput.on('change', function () {
                            $(this).prop('checked') ? self.newVal = 'checked' : self.newVal = '';
                            self.toggleBtnHighlight();
                        })
                    }
                    /*_curInput.on('input', function () {
                     self.toggleBtnHighlight();
                     })*/// input 值长度为1时，有bug
                });
            },
            "toggleBtnHighlight": function () {
                var self = this;
                var btnStauts = self.getBtnStatus();
                var toActive = self.getInputsStatus();
                var hasChangeVal = self.hasChangeVal(self.oldVal, self.newVal);
                if ( toActive && hasChangeVal ) {//按钮需可用
                    self.newVal = '';
                    if ( btnStauts === 'active' ) { //本来就可以用，则返回
                        return;
                    } else { //本来不可用，则点亮并绑定事件
                        self.enableBtn();
                    }
                } else {//按钮需不可用
                    self.newVal = '';
                    if ( btnStauts === '' ) { //本来不可用，则返回
                        return;
                    } else { //本来可用，则转为不可用并绑定事件
                        self.disableBtn();
                    }
                }
            },
            "enableBtn"         : function () {
                var self = this;
                var _btn = self.btn;
                var _listener = self.listener;
                var _listenerArg = self.listenerArg;
                var _disableClass = self.disableClass;
                var _hoverClass = self.hoverClass;
                var _callback = self.callback;
                _btn.removeClass(_disableClass);
                _btn.attr('data-status', 'active');
                App.UI('buttonHover', {//添加按钮点击效果
                    "dom"           : _btn,
                    "hoverClassName": _hoverClass
                });
                _listener && _btn.on('click', function () {
                    _listenerArg ? _listener(_listenerArg) : _listener();
                });//注册事件
                _callback && _callback(_btn);//回调函数中添加其他绑定事件
            },
            "disableBtn"        : function () {
                var self = this;
                var _btn = self.btn;
                var _disableClass = self.disableClass;
                var _hoverClass = self.hoverClass;
                _btn.addClass(_disableClass);
                _btn.attr('data-status', '');
                App.UI('buttonHover', {//移除按钮点击效果
                    "dom"           : _btn,
                    "hoverClassName": _hoverClass,
                    "off"           : true
                });
                _btn.off('click'); //移除事件
            },
            "getBtnStatus"      : function () {
                return this.btn.attr('data-status');
            },
            "getInputsStatus"   : function () {
                var self = this;
                var _inputs = self.inputs;
                var result = false;
                var l;
                var curVal;
                _inputs.each(function (index) {
                    var $this = $(this);
                    l = $this.parent().find('.tips').length;
                    curVal = $this.val();
                    if ( curVal && !l ) {
                        if ( $this.attr('type') === 'checkbox' ) {
                            if ( $this.prop('checked') ) {
                                result = true;
                            } else {
                                result = false;
                            }
                        } else {
                            result = true;
                        }
                    } else {
                        result = false;
                    }
                })
                return result;
            },
            "hasChangeVal"      : function (oldval, newval) {
                return !(oldval === newval);
            }
        };
        var dialog = {
            "current"  : null,
            "init"     : function () {
                this.type = opts.type || null;
                this.title = opts.title || null;
                this.msg = opts.msg || '';
                this.OkTxt = opts.OkTxt || '确定';
                this.CancelTxt = opts.CancelTxt || '取消';
                this.callback = callback || null;
                this.show();
                return this;
            },
            "show"     : function () {
                var _self = this;
                var _html = $(_self.getHtml());
                $('body').append(_html);
                setTimeout(function () {
                    _html.addClass('modal-in');
                }, 10);
                this.current = _html;
                this.bindEvent();
            },
            "bindEvent": function () {
                var _self = this;
                var _current = _self.current;
                var _btn = _current.find('.modal-button');
                var _pwdval;
                if ( !_btn.length ) return;
                _btn.on('click', function (e) {
                    var $this = $(this);
                    var _action = $this.data('action');
                    if ( _action === 'OK' ) {
                        if ( _self.type === 'password' ) {
                            _pwdval = $this.parents('.modal').find('input').val();
                            if ( _pwdval === undefined || _pwdval==='') {
                                _self.current.addClass('shake');
                                setTimeout(function () {
                                    _self.current.removeClass('shake');
                                }, 1000)
                            } else {
                                _self.remove();
                                _self.callback('OK', _pwdval);
                            }
                        } else {
                            _self.remove();
                            _self.callback && _self.callback('OK');
                        }
                    } else if ( _action === 'CANCEL' ) {
                        _self.remove();
                        _self.callback && _self.callback('CANCEL');
                    }
                    return true;
                })
            },
            "remove"   : function () {
                var _self = this;
                _self.current.removeClass('modal-in').addClass('modal-out');
                _self.current.remove();
            },
            "getHtml"  : function () {
                var _self = this;
                var _type = _self.type;
                var _title = _self.title;
                var _msg = _self.msg;
                var _OkTxt = _self.OkTxt;
                var _CancelTxt = _self.CancelTxt;
                var result;
                switch ( _type ) {
                    case 'alert':
                        result = [
                            '<div class="modal">',
                            '    <div class="modal-inner">',
                            '        <div class="modal-title">' + _title + '</div>',
                            '        <div class="modal-text">' + _msg + '</div>',
                            '    </div>',
                            '    <div class="modal-buttons ">' +
                            '        <span class="modal-button modal-button-bold" data-action="OK">确定</span>' +
                            '    </div>',
                            '</div>',
                            '<div class="ui-layer ui-layer-01"></div>'].join("");
                        break;
                    case 'confirm':
                        result = [
                            '<div class="modal">',
                            '    <div class="modal-inner">',
                            '        <div class="modal-title">' + _title + '</div>',
                            '        <div class="modal-text">' + _msg + '</div>',
                            '    </div>',
                            '    <div class="modal-buttons ">',
                            '        <span class="modal-button modal-button-bold" data-action="CANCEL">' + _CancelTxt + '</span>',
                            '        <span class="modal-button modal-button-bold" data-action="OK">' + _OkTxt + '</span>',
                            '    </div>',
                            '</div>',
                            '<div class="ui-layer ui-layer-01"></div>'].join("");
                        break;
                    case 'password':
                        result = [
                            '<div class="modal animated">',
                            '    <div class="modal-inner">',
                            '        <div class="modal-title">' + _title + '</div>',
                            '        <div class="modal-text">' + _msg + '</div>',
                            '        <input type="password" name="modal-password" placeholder="密码" class="modal-text-input">' +
                            '    </div>',
                            '    <div class="modal-buttons ">',
                            '        <span class="modal-button modal-button-bold" data-action="CANCEL">' + _CancelTxt + '</span>',
                            '        <span class="modal-button modal-button-bold" data-action="OK">' + _OkTxt + '</span>',
                            '    </div>',
                            '</div>',
                            '<div class="ui-layer ui-layer-01"></div>'].join("");
                        break;
                    default :
                        result = [
                            '<div class="ui-loading">',
                            '    <div class="ico-loading"></div>',
                            '    <b class="msg">' + _msg + '</b>',
                            '</div>',
                            '<div class="ui-layer"></div>'].join("");

                }
                return result;
            },
            "resetMsg" : function (text) {
                var _self = this;
                text && (_self.msg = text);
                _self.remove();
                _self.show();
                return this;
            }
        };
        var moduleNameMap = {
            "changePage"           : changePage,
            "inputClose"           : inputClose,
            "buttonHover"          : buttonHover,
            "tabToggle"            : tabToggle,
            "select"               : select,
            "toggleSelectBlock"    : toggleSelectBlock,
            "btnHighlightWithInput": btnHighlightWithInput,
            "dialog"               : dialog
        };
        return name && moduleNameMap[name].init();
    }

    /*
     * 操作cookie
     * */
    var Cookie = {
        "SetCookie"   : function (name, value, expires) {
            var argv = arguments;
            var argc = arguments.length;
            var expires = (argc > 2) ? argv[2] : null;
            var path = (argc > 3) ? argv[3] : null;
            var domain = (argc > 4) ? argv[4] : null;
            var secure = (argc > 5) ? argv[5] : false;
            document.cookie = name + "=" + escape(value) + ((expires == null) ?
                "" : ("; expires=" + expires.toGMTString())) + ((path == null) ?
                "" : ("; path=" + path)) + ((domain == null) ?
                "" : ("; domain=" + domain)) + ((secure == true) ?
                "; secure" : "");
        },
        "GetCookie"   : function (name) {
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while ( i < clen ) {
                var j = i + alen;
                //alert(j);
                if ( document.cookie.substring(i, j) == arg ) return this.getCookieVal(j);
                i = document.cookie.indexOf(" ", i) + 1;
                if ( i == 0 ) break;
            }
            return null;
        },
        "getCookieVal": function (offset) {
            var endstr = document.cookie.indexOf(";", offset);
            if ( endstr == -1 ) endstr = document.cookie.length;
            return unescape(document.cookie.substring(offset, endstr));
        },
        "ResetCookie" : function () {
            var usr = document.getElementById('username').value;
            var expdate = new Date();
            this.SetCookie(usr, null, expdate);
        }
    };
    /*
     *   localStorage 封装
     * */
    var LS = {
        set   : function (key, value) {
            //在iPhone/iPad上有时设置setItem()时会出现诡异的QUOTA_EXCEEDED_ERR错误
            //这时一般在setItem之前，先removeItem()就ok了
            if ( this.get(key) !== null )
                this.remove(key);
            localStorage.setItem(key, value);
        },
        //查询不存在的key时，有的浏览器返回undefined，这里统一返回null
        get   : function (key) {
            var v = localStorage.getItem(key);
            return v === undefined ? null : v;
        },
        remove: function (key) {
            localStorage.removeItem(key);
        },
        clear : function () {
            localStorage.clear();
        },
        each  : function (fn) {
            var n = localStorage.length, i = 0, fn = fn || function () {
                }, key;
            for ( ; i < n; i++ ) {
                key = localStorage.key(i);
                if ( fn.call(this, key, this.get(key)) === false )
                    break;
                //如果内容被删除，则总长度和索引都同步减少
                if ( localStorage.length < n ) {
                    n--;
                    i--;
                }
            }
        }
    };
    //ajax 请求封装
    function getAjaxData(url, params, callback, type) {
        var _params = { //通用请求
            type    : type || 'GET',
            url     : url,
            data    : params,
            dataType: 'json'
        };
        $.ajax(_params).done(function (data) {
            if ( data ) {//验证返回数据
                callback && callback(data);
            }
        }).fail(function (data) {
            //Wisp.UI.progressDialog.remove();
            callback && callback('error');
        });
    }

    //hash
    function getHash(str) {
        var oHash = {},
            aHash = [],
            aItem,
            str_sub,
            l;
        str_sub = str.substring(1, str.length);
        aHash = str_sub.split('@');
        //aHash = str.substring(1, str.length).split('@');
        l = aHash.length;
        if ( l ) {
            for ( var i = 0; i < l; i++ ) {
                aItem = aHash[i].split('=');
                oHash[aItem[0]] = $.trim(aItem[1]);
            }
        } else {
            aItem = str_sub.split('=');
            oHash[aItem[0]] = $.trim(aItem[1]);
        }
        return oHash;
    }

    //get pageid  return pageid
    function getPageId(url) {
        //http://.../violation.jsp&@@webViewPageId=141993237706568@@
        var skey, v, a = [];
        skey = url.split('@@');
        if ( skey.length > 1 ) {
            a = skey[1].split('=');
            if ( a[0] === 'webViewPageId' ) {
                v = a[1];
            } else {
                console.log('pageid is not find!');
                return false;
            }
        } else {
            return false;
        }
        return v;
    }

    //网络状态检测
    function isOnline() {
        if ( navigator.onLine ) {
            return true;
        } else {
            return false;
        }
    }

    //网络状态改变监听
    function addOnlineStatusListener(pageId) {
        window.addEventListener("offline", function (e) {
            App.UI('dialog', {
                type : 'alert',
                title: '公众服务平台',
                msg  : '您当前处于离线状态，请检查网络连接！'
            });
        }, true);
        window.addEventListener("online", function (e) {
            history.go(0);
        }, true);
        if ( !navigator.onLine ) {
            App.UI('dialog', {
                type : 'alert',
                title: '公众服务平台',
                msg  : '您当前处于离线状态，请检查网络连接！'
            });
            return false;
        } else {
            return true;
        }
    }

    //事故快处记录号检测
    function isrecord(str) {
        var reg = /^[a-zA-Z0-9]{12}$/;
        return reg.test(str);
    }

    //车辆识别代号号检测
    function iscarid2(str) {
        var reg = /^[a-zA-Z0-9]{17}$/;
        return reg.test(str);
    }

    //档案号检测
    function isArchiveid(str) {
        var reg = /^\d{12}$/;
        return reg.test(str);
    }

    //号牌号码
    function iscarid(str) {
        var reg = /^[a-zA-Z0-9]{5}$/;
        return reg.test(str);
    }

    //手机号
    function isMonbile(str) {
        var reg = /^(13[0-9]|15[0|2|3|5|6|7|8|9]|18[0|5|6|8|9]|177)\d{8}$/;
        return reg.test(str);
    }

    //中文名
    function isCNUser(str) {
        var reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9]){1,20}$/;
        return reg.test(str);
    }

    //英文名字母、数字
    function isENUser(str) {
        var reg = /^[a-zA-Z0-9]{6,11}$/;
        return reg.test(str);
    }

    //密码
    function ispsd(str) {
        var reg = /^\S{6,20}$/;
        return reg.test(str);
    }

    //邮箱
    function isEmail(str) {
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        return reg.test(str);
    }

    //身份证检测
    function cidInfo(sId) {
        var aCity = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        };
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        var iSum = 0;
        if ( reg.test(sId) === false )return false;
        sId = sId.replace(/x$/i, "a");
        if ( aCity[parseInt(sId.substr(0, 2))] == null )return false;
        sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
        var d = new Date(sBirthday.replace(/-/g, "/"));
        if ( sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()) )return false;
        for ( var i = 17; i >= 0; i-- )iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
        if ( iSum % 11 != 1 )return false;
        return true;
    }

    //流水号
    function islsh(str) {
        var reg = /^\S{1,13}$/;
        return reg.test(str);
    }

    //验证必填项
    /*var opts = {
     "username": $('#setusername'),//用户名
     "pwd1"    : $('#setpwd_01'),//密码1
     "pwd2"    : $('#setpwd_02'),//密码2
     "name"    : $('#setname'),//姓名
     "phone"   : $('#setphone'),//手机
     "idnum"   : $('#setidnum')//身份证
     };*/
    function verify(opts) {
        var tipsmsg = function (msg) {
            App.UI('dialog', {
                type : 'alert',
                title: '公众服务平台',
                msg  : msg
            });
        };
        if ( opts.username && (opts.username.val() === '' || opts.username.parent().find('.tips').length) ) {
            //alert('提交失败！（请检查您的用户名）');
            tipsmsg('用户名错误!');
            return false;
        }
        if ( opts.pwdold && (opts.pwdold.val() === '' || opts.pwdold.parent().find('.tips').length) ) {
            //alert('提交失败！（请检查您的旧密码）');
            tipsmsg('旧密码错误!');
            return false;
        }
        if ( opts.pwd1
            && opts.pwd2
            && (opts.pwd1.val() === ''
            || opts.pwd2.val() === ''
            || opts.pwd1.parent().find('.tips').length
            || opts.pwd2.parent().find('.tips').length ) ) {
            //alert('提交失败！（请检查您的密码）');
            tipsmsg('密码错误!');
            return false;
        }
        if ( opts.pwdnew1
            && opts.pwdnew2
            && (opts.pwdnew1.val() === ''
            || opts.pwdnew2.val() === ''
            || opts.pwdnew1.parent().find('.tips').length
            || opts.pwdnew2.parent().find('.tips').length ) ) {
            //alert('提交失败！（请检查您的密码）');
            tipsmsg('密码错误!');
            return false;
        }
        if ( opts.name && (opts.name.val() === '' || opts.name.parent().find('.tips').length) ) {
            //alert('提交失败！（请检查您的姓名）');
            tipsmsg('姓名填写错误!');
            return false;
        }
        if ( opts.phone && (opts.phone.val() === '' || opts.phone.parent().find('.tips').length) ) {
            //alert('提交失败！（请检查您的手机号码）');
            tipsmsg('手机号码错误!');
            return false;
        }
        if ( opts.idnum && (opts.idnum.val() === '' || opts.idnum.parent().find('.tips').length) ) {
            //alert('提交失败！（请检查您的身份证号）');
            tipsmsg('身份证号码错误!');
            return false;
        }
        if ( opts.clsbdh && (opts.clsbdh.val() === '' || opts.clsbdh.parent().find('.tips').length) ) {
            //alert('提交失败！（请检查您的车辆识别代号）');
            tipsmsg('车辆识别代号错误!');
            return false;
        }
        if ( opts.hphm && (opts.hphm.val() === '' || opts.hphm.parent().find('.tips').length) ) {
            //alert('提交失败！（请检查您的号牌号码）');
            tipsmsg('号牌号码错误!');
            return false;
        }
        if ( opts.dabh && (opts.dabh.val() === '' || opts.dabh.parent().find('.tips').length) ) {
            //alert('提交失败！（请检查您的档案编号）');
            tipsmsg('档案编号错误!');
            return false;
        }
        if ( opts.email && (opts.email.val() === '' || opts.email.parent().find('.tips').length) ) {
            //alert('提交失败！（请检查您的邮箱）');
            tipsmsg('邮箱格式错误!');
            return false;
        }
        if ( opts.closername && (opts.closername.val() === '' || opts.closername.parent().find('.tips').length) ) {
            //alert('提交失败！（请检查您的密切联系人姓名）');
            tipsmsg('密切联系人姓名错误!');
            return false;
        }
        if ( opts.closerphone && (opts.closerphone.val() === '' || opts.closerphone.parent().find('.tips').length) ) {
            //alert('提交失败！（请检查您的密切联系人电话）');
            tipsmsg('密切联系人电话错误!');
            return false;
        }
        if ( opts.closeridcard && (opts.closeridcard.val() === '' || opts.closeridcard.parent().find('.tips').length) ) {
            //alert('提交失败！（请检查您的密切联系人身份证号）');
            tipsmsg('密切联系人身份证号错误!');
            return false;
        }
        if ( opts.movecarname && (opts.movecarname.val() === '' || opts.movecarname.parent().find('.tips').length) ) {
            //alert('提交失败！（请检查您的移车联系人姓名）');
            tipsmsg('移车联系人姓名错误!');
            return false;
        }
        if ( opts.movecarphone && (opts.movecarphone.val() === '' || opts.movecarphone.parent().find('.tips').length) ) {
            //alert('提交失败！（请检查您的移车联系人电话）');
            tipsmsg('密切联系人电话号码错误!');
            return false;
        }
        if ( opts.sfzmhm && (opts.sfzmhm.val() === '' || opts.sfzmhm.parent().find('.tips').length) ) {
            //alert('提交失败！（请检查您的身份证明号码）');
            tipsmsg('身份证明号码错误!');
            return false;
        }
        if ( opts.lsh && (opts.lsh.val() === '' || opts.lsh.parent().find('.tips').length) ) {
            //alert('提交失败！（请检查您的流水号）');
            tipsmsg('流水号错误!');
            return false;
        }
        if ( opts.sgkcjlh && (opts.sgkcjlh.val() === '' || opts.sgkcjlh.parent().find('.tips').length) ) {
            tipsmsg('记录号错误!');
            return false;
        }
        return true;
    }

    return {
        "UI"                     : UI,
        "getAjaxData"            : getAjaxData,
        "getHash"                : getHash,
        "getPageId"              : getPageId,
        "addOnlineStatusListener": addOnlineStatusListener,
        "verify"                 : verify,
        "Cookie"                 : Cookie,
        "LS"                     : LS   //本地存储
    };
})();