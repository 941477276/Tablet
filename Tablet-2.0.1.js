/*!
* Tablet
* Tablet是一个基于canvas的在线画板，内置精简版jQuery，无其他依赖，传统网站或vue、react、angular等单页面应用皆可使用！兼容各种移动设备！
* github: https://github.com/941477276/Tablet
*/
(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require());
  } else {
    window.Tablet = factory();
    try {
      if (typeof define === "function") {
        define(function (require) {
          return factory(require());
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
})(function () {
  var $ = window.jquip;
  // 精简版jQuery，这里只包含jQuery的最核心部分 选择器、css
  if(!window.jquip){
    window.jquip=function(){function t(t,e){for(var n,r=0,i=Me.length;i>r;r++)if(Me[r].apply(this,arguments))return this;return t?O(t)?(V?t():ee.push(t),this):q(t)?this.make(t):t.nodeType||B(t)?this.make([t]):"body"==t&&!e&&Z.body?(this.context=t.context,this[0]=Z.body,this.length=1,this.selector=t,this):void 0!==t.selector?(this.context=t.context,this.selector=t.selector,this.make(t)):(t=k(t)&&"<"===t.charAt(0)?(n=ge.exec(t))?[Z.createElement(n[1])]:_(t).childNodes:c(this.selector=t,e),this.make(t),L(e)&&this.attr(e),this):this}function e(e,n){return new t(e,n)}function n(t){return!t||!t.parentNode||11==t.parentNode.nodeType}function r(t,n,r){if(n=n||0,O(n))return N(t,function(t,e){return!!n.call(t,e,t)===r});if(n.nodeType)return N(t,function(t){return t===n===r});if(k(n)){var i=":"==n.charAt(0)&&e.Expr[n.substring(1)];return N(t,function(t){var e,r=t.parentNode,o=!r;return o&&(r=_e,r.appendChild(t)),e=i?i(t):t.parentNode&&y(c(n,t.parentNode),t)>=0,o&&r.removeChild(t),e})}return N(t,function(t){return y(n,t)>=0===r})}function i(t,e,n){var r=t[Ie];return E(n)?(r||(r=t[Ie]=He++),(We[r]||(We[r]={}))[e]=n):r&&We[r]&&(e?We[r][e]:We[r])}function o(t){if(!Qe[t]){var n=e("<"+t+">").appendTo(Z.body),r=e.css&&e.css(n[0],"display")||n[0].style.display;n.remove(),Qe[t]=r}return Qe[t]}function s(t,e){if(t.length=e&&e.length||0,0===t.length)return t;for(var n=0,r=e.length;r>n;n++)t[n]=e[n];return t}function u(t,e){e=" "+e+" ";for(var n=0,r=t.length;r>n;n++)if(a(t[n],e))return!0;return!1}function a(t,e){return 1===t.nodeType&&(" "+t.className+" ").replace(ue," ").indexOf(e)>-1}function l(t,e,n){e=e||Z,n=n||[],1==e.nodeType&&t(e)&&n.push(e);for(var r=e.childNodes,i=0,o=r.length;o>i;i++){var s=r[i];1==s.nodeType&&l(t,s,n)}return n}function c(t,n,r){if(t&&k(t)){n instanceof e&&(n=n[0]),n=n||Z,r=r||e.query;var i,o=t.substring(1);return le.test(t)&&n===Z?(i=Z.getElementById(o))?[i]:[]:I(ce.test(t)&&n.getElementsByClassName?n.getElementsByClassName(o):ae.test(t)?n.getElementsByTagName(t):r(t,n))}return 1==t.nodeType||9==t.nodeType?[t]:[]}function f(t,e,n){var r,i=Z.head||Z.getElementsByTagName("head")[0]||te,o=Z.createElement("script");n&&(o.async="async"),o.onreadystatechange=function(){(r=o.readyState)&&"loaded"!=r&&"complete"!=r||(o.onload=o.onreadystatechange=null,i&&o.parentNode&&i.removeChild(o),o=void 0,e&&e())},o.onload=e,o.src=t,i.insertBefore(o,i.firstChild)}function h(){K.console&&K.console.warn(arguments)}function d(t,e,n){if(null!=t)if(Le&&t.forEach===Le)t.forEach(e,n);else if(t.length===+t.length){for(var r=0,i=t.length;i>r;r++)if(r in t&&e.call(n,t[r],r,t)===ke)return}else for(var o in t)if(qe.call(t,o)&&e.call(n,t[o],o,t)===ke)return}function p(t,e){if(t&&t.getAttribute&&e){var n=t.hasAttribute&&t.hasAttribute(e)?t.getAttribute(e):t[e];return null===n?void 0:n}}function g(t,n){return E(t)?e(n).filter(t):e(n)}function y(t,e){if(null==t)return-1;var n,r;if(ze&&t.indexOf===ze)return t.indexOf(e);for(n=0,r=t.length;r>n;n++)if(t[n]===e)return n;return-1}function m(t,e,n){var r=[];return null==t?r:Pe&&t.filter===Pe?t.filter(e,n):(d(t,function(t,i,o){e.call(n,t,i,o)&&(r[r.length]=t)}),r)}function v(t,n,r){for(var i=[],o=t[n];o&&9!==o.nodeType&&(void 0===r||1!==o.nodeType||!e(o).is(r));)1===o.nodeType&&i.push(o),o=o[n];return i}function b(t,e,n){e=e||1;for(var r=0;t&&(1!==t.nodeType||++r!==e);t=t[n]);return t}function x(t,e){for(var n=[];t;t=t.nextSibling)1===t.nodeType&&t!==e&&n.push(t);return n}function N(t,e,n){var r,i=[];n=!!n;for(var o=0,s=t.length;s>o;o++)r=!!e(t[o],o),n!==r&&i.push(t[o]);return i}function T(t,n,r){var i,o,s=[],u=0,a=t.length,l=t instanceof e||"number"==typeof a&&(a>0&&t[0]&&t[a-1]||0===a||q(t));if(l)for(;a>u;u++)i=n(t[u],u,r),null!=i&&(s[s.length]=i);else for(o in t)i=n(t[o],o,r),null!=i&&(s[s.length]=i);return s.concat.apply([],s)}function w(t,e,n){if(!t)return{};var r=i(t,e,n);return r||C(t)["data-"+e]}function C(t){var e={};if(1==t.nodeType)for(var n=0,r=t.attributes,i=r.length;i>n;n++)e[r.item(n).nodeName]=r.item(n).nodeValue;return e}function A(t,e){return t&&e?t.toLowerCase()===e.toLowerCase():t==e}function S(t){return null==t?String(t):Ce[we.call(t)]||"object"}function E(t){return void 0!==t}function k(t){return"string"==typeof t}function j(t){return"object"==typeof t}function O(t){return"function"==typeof t||"function"===S(t)}function q(t){return"array"===S(t)}function D(t){return!k(t)&&"number"==typeof t.length}function B(t){return t&&"object"==typeof t&&"setInterval"in t}function $(t){return null==t||!he.test(t)||isNaN(t)}function L(t){if(!t||"object"!==S(t)||t.nodeType||B(t))return!1;try{if(t.constructor&&!qe.call(t,"constructor")&&!qe.call(t.constructor.prototype,"isPrototypeOf"))return!1}catch(e){return!1}var n;for(n in t);return void 0===n||qe.call(t,n)}function P(t,e){var n=t.length,r=0;if("number"==typeof e.length)for(var i=e.length;i>r;r++)t[n++]=e[r];else for(;void 0!==e[r];)t[n++]=e[r++];return t.length=n,t}function z(){var t,e,n,r,i,o,s=arguments,u=s[0]||{},a=1,l=s.length,c=!1;for("boolean"==typeof u&&(c=u,u=s[1]||{},a=2),"object"==typeof u||O(u)||(u={}),l===a&&(u=this,--a);l>a;a++)if(null!=(t=s[a]))for(e in t)n=u[e],r=t[e],u!==r&&(c&&r&&(L(r)||(i=q(r)))?(i?(i=!1,o=n&&q(n)?n:[]):o=n&&L(n)?n:{},u[e]=z(c,o,r)):void 0!==r&&(u[e]=r));return u}function I(t,e){var n=e||[];if(null!=t){var r=S(t);null==t.length||"string"==r||"function"==r||"regexp"===r||B(t)?Be.call(n,t):P(n,t)}return n}function _(t,e,n){if(e=e||Z||e.ownerDocument||e[0]&&e[0].ownerDocument||Z,n=n||e.createDocumentFragment(),D(t))return M(t,e,n)&&n;for(var r=F(t);r.firstChild;)n.appendChild(r.firstChild);return n}function F(t,e){var n=(e||Z).createElement("div"),r=(se.exec(t)||["",""])[1].toLowerCase(),i=Ee[r]||Ee._default,o=i[0];for(n.innerHTML=i[1]+t+i[2];o--;)n=n.lastChild;return n}function M(t,e,n){var r,i,o=[];for(r=0;null!=(i=t[r]);r++)k(i)&&(i=F(i,e)),i.nodeType?o.push(i):o=P(o,i);if(n)for(r=0;r<o.length;r++)o[r].nodeType&&n.appendChild(o[r]);return o}function U(t){if(J&&(Ae=Se,t.sort(J),Ae))for(var e=1;e<t.length;e++)t[e]===t[e-1]&&t.splice(e--,1);return t}function H(){if(!Z.body)return null;var t=Z.createElement("div");Z.body.appendChild(t),t.style.width="20px",t.style.padding="10px";var e=t.offsetWidth;return Z.body.removeChild(t),40==e}function W(t,e){ne.push({url:t,cb:e})}function Q(){d(ee,function(t){t()}),V=!0}var V,R,G,J,K=window,X="http://cdnjs.cloudflare.com/ajax/libs/sizzle/1.4.4/sizzle.min.js",Y=function(){return K.Sizzle||K.qwery},Z=document,te=Z.documentElement,ee=[],ne=[],re=/Until$/,ie=/,/,oe=/^(?:parents|prevUntil|prevAll)/,se=/<([\w:]+)/,ue=/[\n\t\r]/g,ae=/^[\w-]+$/,le=/^#[\w-]+$/,ce=/^\.[\w-]+$/,fe=/\s+/,he=/\d/,de=/\S/,pe=/\r\n/g,ge=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,ye=/\r?\n/g,me=/^(?:select|textarea)/i,ve=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,be=String.prototype.trim,xe=/^\s+/,Ne=/\s+$/,Te={children:!0,contents:!0,next:!0,prev:!0},we=Object.prototype.toString,Ce={},Ae=!1,Se=!0,Ee={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},ke={},je=Array.prototype,Oe=Object.prototype,qe=Oe.hasOwnProperty,De=je.slice,Be=je.push,$e=je.indexOf,Le=je.forEach,Pe=je.filter,ze=je.indexOf,Ie="jq-"+ +new Date,_e=Z.createElement("p");de.test(" ")&&(xe=/^[\s\xA0]+/,Ne=/[\s\xA0]+$/);var Fe,Me=[],Ue={},He=1,We={_id:0},Qe={};Fe=t.prototype=e.prototype=e.fn={constructor:e,selector:"",length:0,dm:function(t,e,n){var r,i,o,s,u,a=t[0];if(a&&this[0]){if(!(i=3===a.nodeType&&a)&&(r=a&&a.parentNode,i=r&&11===r.nodeType&&r.childNodes.length===this.length?r:_(a),o=i.firstChild,1===i.childNodes.length&&(i=o),!o))return this;for(u=0,s=this.length;s>u;u++)n.call(this[u],0==u?i:i.cloneNode(!0))}return this},ps:function(t,e,n){var r=this.constructor();return q(t)?Be.apply(r,t):P(r,t),r.prevObject=this,r.context=this.context,"find"===e?r.selector=this.selector+(this.selector?" ":"")+n:e&&(r.selector=this.selector+"."+e+"("+n+")"),r}},Fe.make=function(t){return s(this,t),this},Fe.toArray=function(){return De.call(this,0)},Fe.get=function(t){return E(t)?0>t?this[this.length+t]:this[t]:this.toArray()},Fe.add=function(t,r){var i="string"==typeof t?e(t,r):I(t&&t.nodeType?[t]:t),o=P(this.get(),i);return this.ps(n(i[0])||n(o[0])?o:U(o))},Fe.each=function(t){if(!O(t))return this;for(var e=0,n=this.length;n>e;e++)t.call(this[e],e,this[e]);return this},Fe.attr=function(t,e){var n=this[0];return k(t)&&void 0===e?p(n,t):this.each(function(n){var r=this.nodeType;if(3!==r&&8!==r&&2!==r)if(j(t))for(var i in t)null===e?this.removeAttribute(t):this.setAttribute(i,t[i]);else this.setAttribute(t,O(e)?e.call(this,n,this.getAttribute(t)):e)})},Fe.removeAttr=function(t){return this.each(function(){1==this.nodeType&&this.removeAttribute(t)})},Fe.data=function(t,e){return void 0===e?w(this[0],t):this.each(function(){w(this,t,e)})},Fe.append=function(){return this.dm(arguments,!0,function(t){1===this.nodeType&&this.appendChild(t)})},Fe.prepend=function(){return this.dm(arguments,!0,function(t){1===this.nodeType&&this.insertBefore(t,this.firstChild)})},Fe.before=function(){return this[0]&&this[0].parentNode?this.dm(arguments,!1,function(t){this.parentNode.insertBefore(t,this)}):this},Fe.after=function(){return this[0]&&this[0].parentNode?this.dm(arguments,!1,function(t){this.parentNode.insertBefore(t,this.nextSibling)}):this},Fe.replaceWith=function(t){var n=this,r=O(t);return this.each(function(i){var o=this.nextSibling,s=this.parentNode,u=r?t.call(this,i,this):t;s&&11!=s.nodeType?(s.removeChild(this),o?e(o).before(u):e(s).append(u)):n[i]=e(u).clone()[0]})},Fe.hide=function(){return this.each(function(){"none"!=this.style.display&&(i(this,"display",this.style.display),this.style.display="none")})},Fe.show=function(){return this.each(function(){this.style.display=i(this,"display")||o(this.tagName)})},Fe.toggle=function(){return this.each(function(){var t=e(this);e.Expr.hidden(this)?t.show():t.hide()})},Fe.eq=function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},Fe.first=function(){return this.eq(0)},Fe.last=function(){return this.eq(-1)},Fe.slice=function(){return this.ps(De.apply(this,arguments),"slice",De.call(arguments).join(","))},Fe.map=function(t){return this.ps(T(this,function(e,n){return t.call(e,n,e)}))},Fe.find=function(t){var n,r,i=this;if(!k(t))return e(t).filter(function(){for(n=0,r=i.length;r>n;n++)if(G(i[n],this))return!0});var o,s,u,a=this.ps("","find",t);for(n=0,r=this.length;r>n;n++)if(o=a.length,P(a,e(t,this[n])),0===n)for(s=o;s<a.length;s++)for(u=0;o>u;u++)if(a[u]===a[s]){a.splice(s--,1);break}return a},Fe.not=function(t){return this.ps(r(this,t,!1),"not",t)},Fe.filter=function(t){return this.ps(r(this,t,!0),"filter",t)},Fe.indexOf=function(t){return y(this,t)},Fe.is=function(t){return this.length>0&&e(this[0]).filter(t).length>0},Fe.remove=function(){for(var t,e=0;E(t=this[e]);e++)t.parentNode&&t.parentNode.removeChild(t);return this},Fe.closest=function(t,e){var n,r,i,o=[];for(n=0,r=this.length;r>n;n++)for(i=this[n];i;){if(g(t,[i]).length>0){o.push(i);break}if(i=i.parentNode,!i||!i.ownerDocument||i===e||11===i.nodeType)break}return o=o.length>1?U(o):o,this.ps(o,"closest",t)},Fe.val=function(t){return E(t)?this.each(function(){this.value=t}):this[0]&&this[0].value||""},Fe.html=function(t){return E(t)?this.each(function(){this.innerHTML=t}):this[0]&&this[0].innerHTML||""},Fe.text=function(t){var e,n=this[0];return E(t)?this.empty().append((n&&n.ownerDocument||Z).createTextNode(t)):n&&(e=n.nodeType)?1===e||9===e?k(n.textContent)?n.textContent:n.innerText.replace(pe,""):3===e||4===e?n.nodeValue:null:null},Fe.empty=function(){var t,e;for(t=0;E(e=this[t]);t++)for(;e.firstChild;)e.removeChild(e.firstChild);return this},Fe.addClass=function(t){var n,r,i,o,s,u,a;if(O(t))return this.each(function(n){e(this).addClass(t.call(this,n,this.className))});if(t&&k(t))for(n=t.split(fe),r=0,i=this.length;i>r;r++)if(o=this[r],o&&1===o.nodeType)if(o.className||1!==n.length){for(s=" "+o.className+" ",u=0,a=n.length;a>u;u++)~s.indexOf(" "+n[u]+" ")||(s+=n[u]+" ");o.className=R(s)}else o.className=t;return this},Fe.removeClass=function(t){var n,r,i,o,s,u,a;if(O(t))return this.each(function(n){e(this).removeClass(t.call(this,n,this.className))});if(t&&k(t)||void 0===t)for(n=(t||"").split(fe),r=0,i=this.length;i>r;r++)if(o=this[r],1===o.nodeType&&o.className)if(t){for(s=(" "+o.className+" ").replace(ue," "),u=0,a=n.length;a>u;u++)s=s.replace(" "+n[u]+" "," ");o.className=R(s)}else o.className="";return this},Fe.hasClass=function(t){return u(this,t)},Fe.fadeIn=function(){this.each(function(){e(this).show()})},Fe.fadeOut=function(){this.each(function(){e(this).hide()})},Fe.serializeArray=function(){return this.map(function(){return this.elements?I(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||me.test(this.nodeName)||ve.test(this.type))}).map(function(t,n){var r=e(this).val();return null==r||q(r)?T(r,function(t){return{name:n.name,value:t.replace(ye,"\r\n")}}):{name:n.name,value:r.replace(ye,"\r\n")}}).get()},Fe.wrap=function(t){return this.each(function(){var n=e(e(t)[0].cloneNode(!1));e(this).before(n),n.append(e(this))})},Fe.prop=function(t,e){return E(e)?this.each(function(){this[t]=e}):this[0]&&this[0][t]},Fe.clone=function(){return e(this.map(function(){return this.cloneNode(!0)}))},Fe.toggleClass=function(t,n){return this.each(function(){var r=e(this);(E(n)?n:!r.hasClass(t))?r.addClass(t):r.removeClass(t)})},e.Expr={hidden:function(t){return"none"===(e.css&&e.css(t,"display")||t.style.display)},visible:function(t){return!e.Expr.hidden(t)}},e.hasClass=u,e.walk=l,e.$$=c,e.setQuery=function(t){e.query=function(e,n){return c(e,n,t||function(t,e){return e.querySelectorAll(t)})}};var Ve=Y();e.setQuery(Ve||function(t,e){return(e=e||Z).querySelectorAll?I(e.querySelectorAll(t)):[]}),e.loadScript=f,e.each=function(t,e,n){var r,i=0,o=t.length,s=void 0===o||O(t);if(n)if(s){for(r in t)if(e.apply(t[r],n)===!1)break}else for(;o>i&&e.apply(t[i++],n)!==!1;);else if(s){for(r in t)if(e.call(t[r],r,t[r])===!1)break}else for(;o>i&&e.call(t[i],i,t[i++])!==!1;);return t},e._each=d,e.filter=g,e._indexOf=y,e._defaults=function(t){return d(De.call(arguments,1),function(e){for(var n in e)null==t[n]&&(t[n]=e[n])}),t},e._filter=m,e.proxy=function(t,e){if("string"==typeof e){var n=t[e];e=t,t=n}if(O(t)){var r=De.call(arguments,2),i=function(){return t.apply(e,r.concat(De.call(arguments)))};return i.guid=t.guid=t.guid||i.guid||He++,i}},e.dir=v,e.nth=b,e.sibling=x,e.grep=N,e.map=T,e.data=w,e.attrs=C,e.eqSI=A,R=be?function(t){return null==t?"":be.call(t)}:function(t){return null==t?"":t.toString().replace(xe,"").replace(Ne,"")},e.trim=R,e.indexOf=e.inArray=function(t,e){if(!e)return-1;if($e)return $e.call(e,t);for(var n=0,r=e.length;r>n;n++)if(e[n]===t)return n;return-1},d("Boolean Number String Function Array Date RegExp Object".split(" "),function(t){return Ce["[object "+t+"]"]=t.toLowerCase(),this}),e.type=S,e.isFunction=O,e.isArray=Array.isArray||q,e.isWindow=B,e.isNaN=$,e.merge=P,e.extend=e.fn.extend=z,e.makeArray=I,e.htmlFrag=_;var Re=function(t,e,n){if(t===e)return n;for(var r=t.nextSibling;r;){if(r===e)return-1;r=r.nextSibling}return 1};return G=e.contains=te.contains?function(t,e){return t!==e&&(t.contains?t.contains(e):!0)}:function(){return!1},J=te.compareDocumentPosition?(G=function(t,e){return!!(16&t.compareDocumentPosition(e))})&&function(t,e){return t===e?(Ae=!0,0):t.compareDocumentPosition&&e.compareDocumentPosition?4&t.compareDocumentPosition(e)?-1:1:t.compareDocumentPosition?-1:1}:function(t,e){if(t===e)return Ae=!0,0;if(t.sourceIndex&&e.sourceIndex)return t.sourceIndex-e.sourceIndex;var n,r,i=[],o=[],s=t.parentNode,u=e.parentNode,a=s;if(s===u)return Re(t,e);if(!s)return-1;if(!u)return 1;for(;a;)i.unshift(a),a=a.parentNode;for(a=u;a;)o.unshift(a),a=a.parentNode;n=i.length,r=o.length;for(var l=0;n>l&&r>l;l++)if(i[l]!==o[l])return Re(i[l],o[l]);return l===n?Re(t,o[l],-1):Re(i[l],e,1)},e.unique=U,d({parent:function(t){var e=t.parentNode;return e&&11!==e.nodeType?e:null},parents:function(t){return v(t,"parentNode")},parentsUntil:function(t,e,n){return v(t,"parentNode",n)},next:function(t){return b(t,2,"nextSibling")},prev:function(t){return b(t,2,"previousSibling")},nextAll:function(t){return v(t,"nextSibling")},prevAll:function(t){return v(t,"previousSibling")},nextUntil:function(t,e,n){return v(t,"nextSibling",n)},prevUntil:function(t,e,n){return v(t,"previousSibling",n)},siblings:function(t){return x(t.parentNode.firstChild,t)},children:function(t){return x(t.firstChild)},contents:function(t){return"iframe"===t.nodeName?t.contentDocument||t.contentWindow["document "]:I(t.childNodes)}},function(t,n){e.fn[n]=function(e,r){var i=T(this,t,e),o=De.call(arguments);return re.test(n)||(r=e),k(r)&&(i=I(g(r,i))),i=this.length>1&&!Te[n]?U(i):i,(this.length>1||ie.test(r))&&oe.test(n)&&(i=i.reverse()),this.ps(i,n,o.join(","))}}),d({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after"},function(t,n){e.fn[n]=function(r){var i,o,s,u=[],a=e(r),l=1===this.length&&this[0].parentNode;if(l&&11===l.nodeType&&1===l.childNodes.length&&1===a.length)return a[t](this[0]),this;for(i=0,s=a.length;s>i;i++)o=(i>0?this.clone(!0):this).get(),e(a[i])[t](o),u=u.concat(o);return this.ps(u,n,a.selector)}}),function(){var t=document.createElement("div");t.style.display="none",t.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";var n=t.getElementsByTagName("a")[0];e.support={boxModel:null,opacity:/^0.55$/.test(n.style.opacity),cssFloat:!!n.style.cssFloat};var r,i=/(webkit)[ \/]([\w.]+)/,o=/(opera)(?:.*version)?[ \/]([\w.]+)/,s=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,a=navigator.userAgent.toLowerCase(),l=i.exec(a)||o.exec(a)||s.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];r=e.browser={version:l[2]||"0"},r[l[1]||""]=!0}(),e.scriptsLoaded=function(t){O(t)&&ee.push(t)},e.loadAsync=W,Ve||Z.querySelectorAll||W(X,function(){e.setQuery(Y())}),e.init=!1,e.onload=function(){if(!e.init)try{e.support.boxModel=H();var t=0;d(ne,function(e){t++,f(e.url,function(){try{e.cb&&e.cb()}catch(n){}--t||Q()})}),e.init=!0,t||Q()}catch(n){h(n)}},Z.body&&!e.init&&setTimeout(e.onload,1),e.hook=function(t){Me.push(t)},e.plug=function(t,n){var r=k(t)?t:t.name;if(n=O(t)?t:n,!O(n))throw"Plugin fn required";r&&n&&(Ue[r]=n),n(e)},e}();
    $ = jquip;
    $.plug("css",function(t){function e(e,o,i){var r="width"===o?e.offsetWidth:e.offsetHeight,s="width"===o?T:w;return r>0?("border"!==i&&t.each(s,function(){i||(r-=parseFloat(n(e,"padding"+this))||0),"margin"===i?r+=parseFloat(n(e,i+this))||0:r-=parseFloat(n(e,"border"+this+"Width"))||0}),r+"px"):""}function o(e,o,n,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var s,l=r(o),f=e.style,a=t.cssHooks[l];if(o=t.cssProps[l]||l,void 0===n)return a&&"get"in a&&void 0!==(s=a.get(e,!1,i))?s:f[o];if(!("number"==typeof n&&isNaN(n)||null==n||("number"!=typeof n||t.cssNumber[l]||(n+="px"),a&&"set"in a&&void 0===(n=a.set(e,n)))))try{f[o]=n}catch(p){}}}function n(e,o,n){var i,s=r(o),l=t.cssHooks[s];return o=t.cssProps[s]||s,l&&"get"in l&&void 0!==(i=l.get(e,!0,n))?i:f?f(e,o,s):void 0}function i(t,e,o){var n,i={};for(var n in e)i[n]=t.style[n],t.style[n]=e[n];o.call(t);for(n in e)t.style[n]=i[n]}function r(t){return t.replace(y,F)}function s(e,o,n,i,r,l){var f=e.length;if("object"==typeof o){for(var a in o)s(e,a,o[a],i,r,n);return e}if(void 0!==n){i=!l&&i&&t.isFunction(n);for(var p=0;f>p;p++)r(e[p],o,i?n.call(e[p],p,r(e[p],o)):n,l);return e}return f?r(e[0],o):void 0}function l(e){return t.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}var f,a,p,u=document,c=u.documentElement,d=/alpha\([^)]*\)/i,h=/opacity=([^)]*)/,y=/-([a-z])/gi,m=/([A-Z])/g,v=/^-?\d+(?:px)?$/i,g=/^-?\d/,b=/^(?:body|html)$/i,x={position:"absolute",visibility:"hidden",display:"block"},T=["Left","Right"],w=["Top","Bottom"],F=function(t,e){return e.toUpperCase()};t.cssHooks={opacity:{get:function(t,e){if(!e)return t.style.opacity;var o=f(t,"opacity","opacity");return""===o?"1":o}}},t._each(["height","width"],function(o){t.cssHooks[o]={get:function(t,n,r){var s;return n?0!==t.offsetWidth?e(t,o,r):(i(t,x,function(){s=e(t,o,r)}),s):void 0},set:function(t,e){return v.test(e)?(e=parseFloat(e),e>=0?e+"px":void 0):e}}}),t.support.opacity||(t.support.opacity={get:function(t,e){return h.test((e&&t.currentStyle?t.currentStyle.filter:t.style.filter)||"")?parseFloat(RegExp.$1)/100+"":e?"1":""},set:function(e,o){var n=e.style;n.zoom=1;var i=t.isNaN(o)?"":"alpha(opacity="+100*o+")",r=n.filter||"";n.filter=d.test(r)?r.replace(d,i):n.filter+" "+i}}),u.defaultView&&u.defaultView.getComputedStyle&&(a=function(e,o,n){var i,r,s;return n=n.replace(m,"-$1").toLowerCase(),(r=e.ownerDocument.defaultView)?((s=r.getComputedStyle(e,null))&&(i=s.getPropertyValue(n),""!==i||t.contains(e.ownerDocument.documentElement,e)||(i=t.style(e,n))),i):void 0}),u.documentElement.currentStyle&&(p=function(t,e){var o,n=t.currentStyle&&t.currentStyle[e],i=t.runtimeStyle&&t.runtimeStyle[e],r=t.style;return!v.test(n)&&g.test(n)&&(o=r.left,i&&(t.runtimeStyle.left=t.currentStyle.left),r.left="fontSize"===e?"1em":n||0,n=r.pixelLeft+"px",r.left=o,i&&(t.runtimeStyle.left=i)),""===n?"auto":n}),f=a||p,t.fn.css=function(t,e){return 2===arguments.length&&void 0===e?this:s(this,t,e,!0,function(t,e,i){return void 0!==i?o(t,e,i):n(t,e)})},t.cssNumber={zIndex:!0,fontWeight:!0,opacity:!0,zoom:!0,lineHeight:!0},t.cssProps={"float":t.support.cssFloat?"cssFloat":"styleFloat"},t.style=o,t.css=n,t.swap=i,t.camelCase=r;var S,C,L,E,N,W,H=function(){if(!S){var e,o,i,r=u.body,s=u.createElement("div"),l=parseFloat(n(r,"marginTop"))||0,f="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";t.extend(s.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),s.innerHTML=f,r.insertBefore(s,r.firstChild),e=s.firstChild,o=e.firstChild,i=e.nextSibling.firstChild.firstChild,N=5!==o.offsetTop,W=5===i.offsetTop,o.style.position="fixed",o.style.top="20px",E=20===o.offsetTop||15===o.offsetTop,o.style.position=o.style.top="",e.style.overflow="hidden",e.style.position="relative",L=-5===o.offsetTop,C=r.offsetTop!==l,r.removeChild(s),S=!0}},P=function(t){var e=t.offsetTop,o=t.offsetLeft;return H(),C&&(e+=parseFloat(n(t,"marginTop"))||0,o+=parseFloat(n(t,"marginLeft"))||0),{top:e,left:o}};t.fn.offset=function(){var e,o=this[0];if(!o||!o.ownerDocument)return null;if(o===o.ownerDocument.body)return P(o);try{e=o.getBoundingClientRect()}catch(n){}if(!e||!t.contains(c,o))return e?{top:e.top,left:e.left}:{top:0,left:0};var i=u.body,r=l(u),s=c.clientTop||i.clientTop||0,f=c.clientLeft||i.clientLeft||0,a=r.pageYOffset||t.support.boxModel&&c.scrollTop||i.scrollTop,p=r.pageXOffset||t.support.boxModel&&c.scrollLeft||i.scrollLeft,d=e.top+a-s,h=e.left+p-f;return{top:d,left:h}},t.fn.position=function(){if(!this[0])return null;var t=this[0],e=this.offsetParent(),o=this.offset(),i=b.test(e[0].nodeName)?{top:0,left:0}:e.offset();return o.top-=parseFloat(n(t,"marginTop"))||0,o.left-=parseFloat(n(t,"marginLeft"))||0,i.top+=parseFloat(n(e[0],"borderTopWidth"))||0,i.left+=parseFloat(n(e[0],"borderLeftWidth"))||0,{top:o.top-i.top,left:o.left-i.left}},t.fn.offsetParent=function(){return this.map(function(){for(var t=this.offsetParent||u.body;t&&!b.test(t.nodeName)&&"static"===n(t,"position");)t=t.offsetParent;return t})},t._each(["Height","Width"],function(e){var o=e.toLowerCase();t.fn["inner"+e]=function(){var t=this[0];return t&&t.style?parseFloat(n(t,o,"padding")):null},t.fn["outer"+e]=function(t){var e=this[0];return e&&e.style?parseFloat(n(e,o,t?"margin":"border")):null},t.fn[o]=function(i){var r=this[0];if(!r)return null==i?null:this;if(t.isFunction(i))return this.each(function(e){var n=t(this);n[o](i.call(this,e,n[o]()))});if(t.isWindow(r)){var s=r.document.documentElement["client"+e],l=r.document.body;return"CSS1Compat"===r.document.compatMode&&s||l&&l["client"+e]||s}if(9===r.nodeType)return Math.max(r.documentElement["client"+e],r.body["scroll"+e],r.documentElement["scroll"+e],r.body["offset"+e],r.documentElement["offset"+e]);if(void 0===i){var f=n(r,o),a=parseFloat(f);return t.isNaN(a)?f:a}return this.css(o,"string"==typeof i?i:i+"px")}}),t._each(["Left","Top"],function(e,o){var n="scroll"+e;t.fn[n]=function(e){var i,r;return void 0===e?(i=this[0])?(r=l(i),r?"pageXOffset"in r?r[o?"pageYOffset":"pageXOffset"]:t.support.boxModel&&r.document.documentElement[n]||r.document.body[n]:i[n]):null:this.each(function(){r=l(this),r?r.scrollTo(o?t(r).scrollLeft():e,o?e:t(r).scrollTop()):this[n]=e})}})});
    $.plug("events",function(n){function e(n){return n._jquid||(n._jquid=d++)}function t(n,e,t){n.addEventListener?n.addEventListener(e,t,!1):(n["e"+e+t]=t,n[e+t]=function(){n["e"+e+t](window.event)},n.attachEvent("on"+e,n[e+t]))}function i(n,e,t){n.removeEventListener?n.removeEventListener(e,t,!1):(n.detachEvent("on"+e,n[e+t]),n[e+t]=null)}function r(n){var e=(""+n).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function u(n){return new RegExp("(?:^| )"+n.replace(" "," .* ?")+"(?: |$)")}function o(t,i,o,c){if(i=r(i),i.ns)var s=u(i.ns);return n._filter(l[e(t)]||[],function(n){return!(!n||i.e&&n.e!=i.e||i.ns&&!s.test(n.ns)||o&&n.fn!=o||c&&n.sel!=c)})}function c(i,u,o,c,s){var a=e(i),f=l[a]||(l[a]=[]);n._each(u.split(/\s/),function(e){var u=n.extend(r(e),{fn:o,sel:c,del:s,i:f.length});f.push(u),t(i,u.e,s||o)}),i=null}function s(t,r,u,c){var s=e(t);n._each((r||"").split(/\s/),function(e){n._each(o(t,e,u,c),function(n){delete l[s][n.i],i(t,n.e,n.del||n.fn)})})}function a(e){var t=n.extend({originalEvent:e},e);return n._each(h,function(n){e[n]&&(t[n]=function(){return e[n].apply(e,arguments)})}),t}var f=document,l={},d=1;n.bind=t,n.unbind=i;var h=["preventDefault","stopImmediatePropagation","stopPropagation"],v=n.fn;n._each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(n){v[n]=function(e,t){return arguments.length>0?this.bind(n,e,t):this.trigger(n)}}),v.bind=function(n,e){return this.each(function(){c(this,n,e)})},v.unbind=function(n,e){return this.each(function(){s(this,n,e)})},v.one=function(n,e){return this.each(function(){var t=this;c(this,n,function(){e.apply(t,arguments),s(t,n,arguments.callee)})})},v.delegate=function(e,t,i){return this.each(function(r,u){c(u,t,i,e,function(t){for(var r=t.target||t.srcElement,o=n.$$(e,u);r&&n._indexOf(o,r)<0;)r=r.parentNode;r&&r!==u&&r!==document&&i.call(r,n.extend(a(t||window.event),{currentTarget:r,liveFired:u}))})})},v.undelegate=function(n,e,t){return this.each(function(){s(this,e,t,n)})},v.live=function(e,t){return n(f.body).delegate(this.selector,e,t),this},v.die=function(e,t){return n(f.body).undelegate(this.selector,e,t),this},v.on=function(n,e,t){return"function"==typeof e?this.bind(n,e):this.delegate(e,n,t)},v.off=function(n,e,t){return"string"==typeof e?this.undelegate(e,n,t):this.unbind(n,t)},v.trigger=function(n){return this.each(function(){if(("click"==n||"blur"==n||"focus"==n)&&this[n])return this[n]();if(f.createEvent){var e=f.createEvent("Events");this.dispatchEvent(e,e.initEvent(n,!0,!0))}else if(this.fireEvent)try{"ready"!==n&&this.fireEvent("on"+n)}catch(e){}})},n.init||n(window).bind("load",n.onload)});
  }
  /**
   * 线条构造函数
   * @param ctx 主画布上下文
   * @param ctxBack 副画布上下文
   * @param lineConfig 画笔设置
   * @param bgConfig 背景设置
   * @constructor
   */
  function Line (ctx, ctxBack, lineConfig, bgConfig) {
    this.ctx = ctx;
    this.ctxBack = ctxBack;
    this.lineConfig = lineConfig || {}; // 画笔配置
    this.bgConfig = bgConfig || {}; // 画布背景配置
    this.points = [];
  }

  Line.prototype.draw = function (widthRate, heightRate, onlyCtxBackDraw) {
    widthRate = typeof widthRate === 'undefined' ? 1 : parseFloat(widthRate);
    heightRate = typeof heightRate === 'undefined' ? 1 : parseFloat(heightRate);
    widthRate = widthRate > 0 ? widthRate : 1;
    heightRate = heightRate > 0 ? heightRate : 1;
    onlyCtxBackDraw = typeof onlyCtxBackDraw === 'undefined' ? false : !!onlyCtxBackDraw;
    var lineConfig = this.lineConfig;
    var ctxBack = this.ctxBack;
    var ctx = onlyCtxBackDraw ? this.ctxBack : this.ctx;
    ctx.beginPath();
    // 设置画笔样式
    for (var attr in lineConfig) {
      ctx[attr] = lineConfig[attr];
    }
    ctx.lineWidth = lineConfig.lineWidth * Math.min(widthRate, heightRate);
    // 如果points的长度为1，则说明这是一个点
    if (this.points.length == 1) {
      var point = this.points[0];
      ctx.moveTo(point.x * widthRate, point.y * heightRate);
      ctx.lineTo(point.x * widthRate, point.y * heightRate);
      ctx.stroke();
      return;
    }
    this.points.forEach(function (point, index) {
      ctx[index > 0 ? 'lineTo' : 'moveTo'](point.x * widthRate, point.y * heightRate);
      // 这里必须及时绘制，如果将绘制放到循环外面，那么在重绘过程中线条会变细
      if (index > 0) {
        ctx.stroke();
      }
    });
  }
  Line.prototype.addPoint = function (x, y) {
    this.points.push({ x: x, y: y });
  }


  function OperationRecord (options) {
    this.tablet = options.tablet;
    this.type = options.type;
    this.linesIndex = typeof options.linesIndex === 'undefined' ? -1 : options.linesIndex; // 记录线条的下标
    this.lines = [].concat(options.lines);
    this.lineConfig = options.lineConfig ? $.extend({}, options.lineConfig) : null;
    this.bgConfig = options.bgConfig ? $.extend({}, options.bgConfig) : null;
  }

  OperationRecord.prototype.exec = function () {
    var that = this;
    var tablet = this.tablet;
    var ctx = tablet.ctx;
    var ctxBack = this.tablet.ctxBack;
    // 画线操作
    var drawLine = function (onlyCtxBackDraw) {
      console.log('画线')
      onlyCtxBackDraw = typeof onlyCtxBackDraw == 'undefined' ? false : !!onlyCtxBackDraw;
      that.lines.forEach(function (line) {
        if (line) {
          line.draw(tablet.widthZoomRate, tablet.heightZoomRate, onlyCtxBackDraw);
        }
      });
    }
    // 画背景
    var drawBg = function (bgConfig) {
      if (bgConfig.bgType == 'color') {
        tablet.setBackgroundColor(bgConfig.bgColor, bgConfig.x, bgConfig.y, bgConfig.width, bgConfig.height, false);
      } else if (bgConfig.bgType == 'img') {
        tablet.setBackgroundImage(bgConfig.bgImg, bgConfig.x, bgConfig.y, bgConfig.width, bgConfig.height, null, null, false);
      }
    }
    switch (this.type) {
      case 'drawLine':
        ctxBack.clearRect(0, 0, tablet.width, tablet.height);
        drawLine(true);
        drawBg(that.bgConfig);
        /*ctx.clearRect(0, 0, tablet.width, tablet.height);
        ctx.drawImage(tablet.canvasBack, 0, 0);*/
        break;
      // case 'lineConfig':
      //  break;
      case 'bgColor':
      case 'bgImg':
        // 先在副本画布画线
        ctxBack.clearRect(0, 0, tablet.width, tablet.height);
        drawLine(true);
        // 再执行画背景操作
        drawBg(that.bgConfig);
        break;
    }
  }

  /**
   * 画板构造函数
   * @param container 画板所在容器
   * @param config 画板配置
   * @constructor
   */
  function Tablet (container, config) {
    this._init(container, config);
    this._ctxInit();
  }

  Tablet._conut = 0;
  /* 内部使用，初始化前面板 */
  Tablet.prototype._init = function (_container, config) {
    var container = $(_container);

    if (container.length == 0) {
      throw "第一个参数必须是包裹画布的选择器或dom元素！";
    }
    container = container.eq(0);

    var that = this;
    this.config = {
      // canvas画布是否响应式
      response: true,
      // canvas的宽度，宽高都可以传递函数
      width: 0,
      height: 0,
      // 前面板的额外class
      extraClass: "",
      // 默认字体颜色
      defaultColor: "#000",
      // 默认背景色
      defaultBackgroundColor: "transparent",
      defaultBgType: 'color', // 默认背景类型
      defaultBgImg: null, // 默认背景图片 // 背景类型，有color、img两种
      autoResize: true, // 浏览器窗口改变时是否重新绘制
      // 设置获取到的图片的类型，可选值png、jpg，默认png
      imgType: "png",
      // 初始化完毕后执行的函数
      onInit: function () {
      },
      // 清除画布前执行的函数，如果该函数返回false，则不会进行清除
      onBeforeClear: function () {
      },
      // 清除画布后执行的函数
      onClear: function () {
      }
    }
    if (config && ({}).toString.call(config) === "[object Object]") {
      $.extend(true, this.config, config);
    }
    this.container = container;
    this.id = "Tablet_LYN_" + (Tablet._conut++);


    this.isMobile = isMobile = /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent);
    this.lineConfig = {
      strokeStyle: this.config.defaultColor,
      lineWidth: 8,
      lineWidthZoomRate: 1, // 画笔缩放比例，窗口大小改变后会改变
      lineCap: "round",
      lineJoin: "round",
      shadowBlur: 1,
      shadowColor: this.config.defaultColor
    }
    this.bgConfig = {
      bgColor: this.config.defaultBackgroundColor, // 背景色
      bgImg: this.config.bgImg, // 背景图片
      bgType: this.config.bgType, // 背景类型，有color、img两种
      x: 0,
      y: 0,
      width: -1,
      height: -1
    }
    this.container.append($(this.buildTablet()));
    this.$tablet = $("#" + this.id);
    this.$canvas = this.$tablet.find("canvas").eq(0);
    this.canvas = this.$canvas[0];
    this.ctx = this.canvas.getContext("2d");
    this.$canvasBack = this.$tablet.find(".backup-canvas");
    this.$canvasBack.hide();
    this.canvasBack = this.$canvasBack[0];
    this.ctxBack = this.canvasBack.getContext("2d");
    // 用于记录当前绘制的坐标
    this.point = { x: 0, y: 0 };
    this.lines = []; // 线条记录
    this.operationRecords = []; // 操作记录
    // 旋转的角度
    this.degree = 0;
    this.version = '2.0.1';

    if (typeof this.config.width === "function") {
      this.width = this.config.width();
    } else {
      this.width = this.config.width;
    }
    if (typeof this.config.height === "function") {
      this.height = this.config.height();
    } else {
      this.height = this.config.height;
    }

    // 设置canvas画布的宽高
    that.setCanvasWH(that.width, that.height);
    this.widthOrigin = this.width;
    this.heightOrigin = this.height;
    this.widthZoomRate = 1; // 画布宽度缩放比例
    this.heightZoomRate = 1;
    // 画布随浏览器窗口大小响应
    if (this.config.autoResize) {
      this._removeResizeEventFn = this._bindResizeEvent();
    }
    var winW = $(window).width();
    if (this.isMobile) {
      if (winW >= 768) {
        that.lineConfig.lineWidth = 8;
      } else if (winW < 768 && winW >= 414) {
        that.lineConfig.lineWidth = 6;
      } else if (winW < 414 && winW >= 375) {
        that.lineConfig.lineWidth = 4;
      } else if (winW < 375 && winW >= 320) {
        that.lineConfig.lineWidth = 2;
      }
    }

    this.config.onInit && (typeof this.config.onInit === "function") && this.config.onInit.call(this);
  }
  /* 内部使用，给canvas进行一些初始化设置 */
  Tablet.prototype._ctxInit = function () {
    var lines = this.lines;
    var that = this,
      // 画线函数
      pait = function (singal) {
        switch (singal) {
          case 1:
            /*如果是1，则表明是鼠标按下或是触摸开始，只要是鼠标按下或触摸开始则清楚之前绘制的路径，从按下的点重新开始*/
            that.ctx.beginPath();
            that.ctx.moveTo(that.point.x, that.point.y);
            /* that.ctxBack.beginPath();
            that.ctxBack.moveTo(that.point.x, that.point.y);*/

            lines.push(new Line(that.ctx, that.ctxBack, $.extend({}, that.lineConfig), $.extend({}, that.bgConfig)));
          case 2:
            // 重新设置画笔大小，当浏览器大小改变后，再在画布上画线如果不重新设置画笔的话则会出问题
            that.ctx.lineWidth = that.lineConfig.lineWidth * that.lineConfig.lineWidthZoomRate;
            that.ctx.lineTo(that.point.x, that.point.y);
            that.ctx.stroke();
            /*that.ctxBack.lineTo(that.point.x, that.point.y);
            that.ctxBack.stroke();*/
            // 在添加点的时候，点的实际位置要根据画布缩放比例来计算，这样在画布缩放时才能更好的重画
            lines[lines.length - 1].addPoint(that.point.x / that.widthZoomRate, that.point.y / that.heightZoomRate);
            break;
          default:
        }
      },
      // 标记鼠标是否按钮或手指是否按下
      pressed = this.pressed = false,
      create = function (singal) {
        return function (e) {
          e.preventDefault();

          if (singal === 1) {
            that.pressed = true;
          }
          /* 如果鼠标刚按下(手指刚触摸)，或鼠标在移动中(手指在滑动中)则立即画线 */
          if (singal === 1 || that.pressed) {
            e = that.isMobile ? e.touches[0] : e;
            var canvasScroll = that.$canvas.offset();
            var scrollTop = $(document.documentElement).scrollTop();
            var scrollLeft = $(document.documentElement).scrollLeft();
            // 设置坐标值 不加0.5，整数坐标处绘制直线，直线宽度将会多1px
            that.point.x = e.clientX - ((canvasScroll.left + 0.5) - scrollLeft);
            that.point.y = e.clientY - ((canvasScroll.top + 0.5) - scrollTop);
            pait(singal);
          }
        }
      };
    var lineConfig = that.lineConfig;
    // 设置画笔样式
    for (var attr in lineConfig) {
      that.ctx[attr] = lineConfig[attr];
      that.ctxBack[attr] = lineConfig[attr];
    }
    // 移动端性能太弱, 不适合模糊，去掉模糊可以提高手写渲染速度。pc端添加模糊为了去除锯齿
    if (!that.isMobile) {
      that.ctx.shadowBlur = lineConfig.shadowBlur;
      that.ctx.shadowColor = lineConfig.shadowColor;
      that.ctxBack.shadowBlur = lineConfig.shadowBlur;
      that.ctxBack.shadowColor = lineConfig.shadowColor;
    }

    var start = create(1),
      move = create(2),
      // 为了避免UI过度绘制，让move操作执行得更加流畅，因此使用requestAnimationFrame优化
      animationMove = window.requestAnimationFrame ? function (e) {
        requestAnimationFrame(function () {
          move(e);
        });
      } : move,
      endEvent = function () {
        that.pressed = false;
        if (lines.length > 0) {
          if (lines[lines.length - 1]) {
            // 每次鼠标弹起时都将最近一次绘制的内容绘制到副本画布中
            lines[lines.length - 1].draw(0, 0, true);
          }
        }
      },
      addOperationRecordFn = function () {
        if (lines.length > 0) {
          console.log('addOperationRecord drawLine')
          that.operationRecords.push(new OperationRecord({
            type: 'drawLine',
            tablet: that,
            lines: lines,
            bgConfig: that.bgConfig,
            linesIndex: lines.length - 1
          }));
        }
      };
    // 绘制背景
    var drawBg = function (bgConfig) {
      if (bgConfig.bgType == 'color') {
        that.setBackgroundColor(bgConfig.bgColor, -1, -1, -1, -1, false);
      } else if (bgConfig.bgType == 'img') {
        that.setBackgroundImage(bgConfig.bgImg, -1, -1, -1, -1, null, null, false);
      }
    }
    drawBg({ bgType: this.config.defaultBgType, bgColor: this.config.defaultBackgroundColor, bgImg: this.config.defaultBgImg });

    if (isMobile) {
      this.$canvas.on("touchstart", start);
      this.$canvas.on("touchmove", move);
    } else {
      this.$canvas.on("mousedown", start);
      this.$canvas.on("mousemove", move);
    }
    ["touchend", "mouseleave", "mouseup"].forEach(function (event, index) {
      that.$canvas.on(event, endEvent);
    });
    ["touchend", "mouseup"].forEach(function (event, index) {
      that.$canvas.on(event, addOperationRecordFn);
    });
  }
  /**
   * 浏览器窗口大小改变时重新绘制
   * @returns {eventFn}
   * @private
   */
  Tablet.prototype._bindResizeEvent = function () {
    var event = "resize";
    var that = this;
    var lastUpdateTime = 0;
    var tabletLastWidth = this.width;
    event += window.onorientationchange ? " orientationchange" : "";
    console.log('resize event')
    var eventFn = function () {
      var now = new Date().getTime();
      if (lastUpdateTime == 0 || (now - lastUpdateTime) > 100) {
        lastUpdateTime = now;
        var tablet = that.$tablet,
          bl = parseFloat(tablet.css('border-left-width')),
          br = parseFloat(tablet.css('border-right-width')),
          bt = parseFloat(tablet.css('border-top-width')),
          bb = parseFloat(tablet.css('border-bottom-width')),
          pl = parseFloat(tablet.css('padding-left')),
          pr = parseFloat(tablet.css('padding-right')),
          pt = parseFloat(tablet.css('padding-top')),
          pb = parseFloat(tablet.css('padding-bottom'));
        var tabletW = tablet.width() - bl - br - pl - pr;
        var tabletH = tablet.height() - bt - bb - pt - pb;
        if (tabletLastWidth == tabletW) {
          console.info('container width not changed!');
          return;
        }

        tabletLastWidth = tabletW;
        that.setCanvasWH();
        // 刷新画布
        that.refresh();
      }
    }
    $(window).on(event, eventFn);

    return function () {
      $(window).off(event, eventFn);
    };
  }
  /**
   * 刷新画布
   * @returns {Tablet}
   */
  Tablet.prototype.refresh = function (refreshWH) {
    var that = this;
    refreshWH = typeof refreshWH == 'undefined' ? false : !!refreshWH;
    if (refreshWH) {
      this.setCanvasWH();
    }
    var widthRate = that.width / that.widthOrigin;
    var heightRate = that.height / that.heightOrigin;
    var bgConfig = that.bgConfig;
    var dragBg = function () {
      console.log('重绘背景！')
      if (bgConfig.bgType == 'color') {
        that.setBackgroundColor(bgConfig.bgColor, bgConfig.x, bgConfig.y, bgConfig.width, bgConfig.height, false);
      } else if (bgConfig.bgType == 'img') {
        that.setBackgroundImage(bgConfig.bgImg, bgConfig.x, bgConfig.y, bgConfig.width, bgConfig.height, null, null, false);
      }
    }
    that.lineConfig.lineWidthZoomRate = Math.min(widthRate, heightRate);
    that.widthZoomRate = widthRate;
    that.heightZoomRate = heightRate;
    console.log('rate', Math.min(widthRate, heightRate));
    var hasCanUseLines = that.hasCanUseLine();
    console.log('有可用线条', hasCanUseLines);
    // 如果没有画任何内容，则重置画布
    if (!hasCanUseLines) {
      that.canvasReset();
      dragBg();
      return;
    }
    that.ctxBack.clearRect(0, 0, that.width, that.height);
    // 重绘
    that.lines.forEach(item => {
      if (item) {
        // 使用副本画布进行绘制，以方便后面绘制背景色/图
        item.draw(widthRate, heightRate, true);
      }
    });

    that.ctx.clearRect(0, 0, that.width, that.height);
    // 重绘背景
    if (bgConfig.bgType == 'color' && bgConfig.bgColor == 'transparent') {
      that.ctx.drawImage(that.canvasBack, 0, 0);
      return;
    }
    dragBg();
    return this;
  }
  /**
   * 获取画布位置及宽高
   * @returns {{x: number, width: number, y: number, height: number}}
   */
  Tablet.prototype.getRect = function () {
    var w = this.width,
      h = this.height;
    if (this.degree == 90 || this.degree == -90) {
      w = this.height;
      h = this.width;
    }
    var offset = this.$canvas.offset();
    return {
      x: offset.left,
      y: offset.top,
      width: w,
      height: h
    }
  }
  /**
   * 判断是否有可用线条
   * @returns {boolean}
   */
  Tablet.prototype.hasCanUseLine = function () {
    var hasCanUseLines = this.lines.some(function (line) {
      return !!line;
    });
    return hasCanUseLines;
  }
  /**
   * 设置画笔颜色
   * @param color 颜色值，可以是任何css的颜色表达式
   * @returns {Tablet}
   */
  Tablet.prototype.setColor = function (color) {
    var that = this;
    that.ctx.beginPath();
    if (!color) {
      console.error('color is required!')
      return this;
    }
    that.lineConfig.strokeStyle = color;

    that.ctx.strokeStyle = color;
    that.ctxBack.strokeStyle = color;
    if (!that.isMobile) {
      that.lineConfig.shadowColor = color;
      that.ctx.shadowColor = color;
      that.ctxBack.shadowColor = color;
    }
    return this;
  }
  /**
   * 设置画笔粗细
   * @param number 画笔的粗细，必须是一个数值
   * @returns {Tablet}
   */
  Tablet.prototype.setLineWidth = function (number) {
    var that = this;
    number = parseFloat(number);
    if (isNaN(number)) {
      console.error('number is required a Number!');
      return this;
    }

    that.lineConfig.lineWidth = number;

    that.ctx.beginPath();
    that.ctxBack.beginPath();

    that.ctx.lineWidth = number;
    that.ctxBack.lineWidth = number;
    return this;
  }
  /**
   * 设置背景颜色
   * @param bgColor 颜色值
   * @param {x: number} 绘制起始x点
   * @param {y: number} 绘制起始y点
   * @param {width: number} 绘制的宽度
   * @param {height: number} 绘制的高度
   * * @param {addToOperationRecord: boolean} 是否将此操作添加到操作历史中
   * @returns {Tablet}
   */
  Tablet.prototype.setBackgroundColor = function (bgColor, x, y, width, height, addToOperationRecord) {
    var canvasRect = this.getRect();
    var x = x || 0,
      y = y || 0,
      that = this,
      newWidth = width > 0 ? width : canvasRect.width,
      newHeight = height > 0 ? height : canvasRect.height;

    this.bgConfig.bgType = 'color';
    this.bgConfig.bgColor = bgColor;
    this.bgConfig.bgImg = null;
    this.bgConfig.x = x;
    this.bgConfig.y = y;
    this.bgConfig.width = width;
    this.bgConfig.height = height;

    // 清除原先绘制的内容
    this.ctx.clearRect(x, y, newWidth, newHeight);

    // 设置背景颜色
    this.ctx.fillStyle = bgColor;
    this.ctx.fillRect(x, y, newWidth, newHeight);

    // this.ctx.beginPath();
    if (this.hasCanUseLine()) {
      // 将原先绘制的内容绘制回去
      this.ctx.drawImage(this.canvasBack, x, y, newWidth, newWidth, x, y, newWidth, newWidth);
    }
    addToOperationRecord = typeof addToOperationRecord == 'undefined' ? true : false;
    if (addToOperationRecord) {
      console.log('addOperationRecord bgColor')
      this.operationRecords.push(new OperationRecord({
        type: 'bgColor',
        tablet: this,
        lines: this.lines,
        bgConfig: this.bgConfig
      }));
    }
    return this;
  }
  /**
   * 设置背景图片
   * @param {img: dom|url} img dom对象或图片地址
   * @param {x: number} 绘制起始x点
   * @param {y: number} 绘制起始y点
   * @param {width: number} 绘制的宽度
   * @param {height: number} 绘制的高度
   * @param {onImgLoading: function} 图片加载中回调
   * @param {onFail: function} 绘制失败回调
   * @param {addToOperationRecord: boolean} 是否将此操作添加到操作历史中
   * @returns {boolean}
   */
  Tablet.prototype.setBackgroundImage = function (img, x, y, width, height, onImgLoading, onFail, addToOperationRecord) {
    if (!img) {
      console.error('setBackgroundImage函数必须传递一个图片url地址或图片dom对象！');
      return false;
    }

    var that = this;
    var imgLoad = function () {
      var canvasRect = that.getRect();
      x = x || 0;
      y = y || 0;
      var newWidth = width > 0 ? width : canvasRect.width;
      var newHeight = height > 0 ? height : canvasRect.height;
      that.bgConfig.bgType = 'img';
      that.bgConfig.bgImg = img;
      that.bgConfig.bgColor = '';
      that.bgConfig.x = x;
      that.bgConfig.y = y;
      that.bgConfig.width = width;
      that.bgConfig.height = height;
      typeof onImgLoading === 'function' && onImgLoading({ statusCode: 2, status: 'ok', img: img });
      // 清除原先绘制的内容
      that.ctx.clearRect(x, y, newWidth, newHeight);
      // 绘制图片
      that.ctx.drawImage(img, x, y, newWidth, newHeight);
      // 将原先绘制的内容绘制回去
      that.ctx.drawImage(that.canvasBack, x, y, newWidth, newHeight, x, y, newWidth, newHeight);
      addToOperationRecord = typeof addToOperationRecord == 'undefined' ? true : false;
      if (addToOperationRecord) {
        console.log('addOperationRecord bgImg')
        that.operationRecords.push(new OperationRecord({
          type: 'bgImg',
          tablet: that,
          lines: that.lines,
          // linesIndex: that.lines.length - 1,
          bgConfig: that.bgConfig
        }));
      }
      console.log('图片绘制完成');
    };
    var imgLoadError = function () {
      console.error('图片加载失败,不能进行绘制');
      typeof onFail === 'function' && onFail();
    };
    if (typeof img == 'string') {
      typeof onImgLoading === 'function' && onImgLoading({ statusCode: 1, status: 'loading' });
      var url = img;
      img = new Image();
      img.onload = imgLoad;
      img.onerror = imgLoadError;
      img.src = url;
    } else {
      // complete属性若为true，则表示图片已经加载完成
      if (!img.complete) {
        img.onload = imgLoad;
        img.onerror = imgLoadError;
      } else {
        imgLoad();
      }
    }
  }
  /**
   * 设置canvas的宽高
   * @param { width: number } canvas的宽度
   * @param { height: number } canvas的高度
   * @returns {Tablet}
   */
  Tablet.prototype.setCanvasWH = function (width, height) {
    if (!width || !height) {
      var tablet = this.$tablet;
      var bl = parseFloat(tablet.css('border-left-width')),
        br = parseFloat(tablet.css('border-right-width')),
        bt = parseFloat(tablet.css('border-top-width')),
        bb = parseFloat(tablet.css('border-bottom-width')),
        pl = parseFloat(tablet.css('padding-left')),
        pr = parseFloat(tablet.css('padding-right')),
        pt = parseFloat(tablet.css('padding-top')),
        pb = parseFloat(tablet.css('padding-bottom'));
      this.width = tablet.width() - bl - br - pl - pr;
      this.height = tablet.height() - bt - bb - pt - pb;
    } else {
      console.log(1111)
      this.width = width;
      this.height = height;
    }
    var lineConfig = this.lineConfig;
    // 根据屏幕像素比优化canvas
    var devicePixelRatio = this.devicePixelRatio = window.devicePixelRatio;
    if (devicePixelRatio && devicePixelRatio > 1) {
      var canvasW = this.width * devicePixelRatio;
      var canvasH = this.height * devicePixelRatio;
      this.canvas.width = canvasW;
      this.canvas.height = canvasH;
      this.canvasBack.width = canvasW;
      this.canvasBack.height = canvasH;
      this.ctx.scale(devicePixelRatio, devicePixelRatio);
      this.ctxBack.scale(devicePixelRatio, devicePixelRatio);
      this.ctx.clearRect(0, 0, canvasW, canvasH);
      this.ctxBack.clearRect(0, 0, canvasW, canvasH);
    } else {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.canvasBack.width = this.width;
      this.canvasBack.height = this.height;
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctxBack.clearRect(0, 0, this.width, this.height);
    }
    // 重置画笔样式
    for (var attr in lineConfig) {
      this.ctx[attr] = lineConfig[attr];
      this.ctxBack[attr] = lineConfig[attr];
    }
    return this;
  }
  /**
   * canvas重置。重置时会使用最后一次的属性进行重置
   * @returns {Tablet}
   */
  Tablet.prototype.canvasReset = function () {
    var that = this;
    var lineConfig = this.lineConfig;
    for (var attr in lineConfig) {
      that.ctx[attr] = lineConfig[attr];
      that.ctxBack[attr] = lineConfig[attr];
    }
    // 移动端性能太弱, 不适合模糊，去掉模糊可以提高手写渲染速度。pc端添加模糊为了去除锯齿
    if (!that.isMobile) {
      that.ctx.shadowBlur = lineConfig.shadowBlur;
      that.ctx.shadowColor = lineConfig.shadowColor;
      that.ctxBack.shadowBlur = lineConfig.shadowBlur;
      that.ctxBack.shadowColor = lineConfig.shadowColor;
    }
    return this;
  }
  /**
   * 回退步骤
   * @returns {Tablet}
   */
  Tablet.prototype.revoke = function () {
    var operationRecords = this.operationRecords;
    var that = this;
    if (operationRecords.length == 0) {
      return this;
    }
    var step = operationRecords.length - 1;
    var operation = operationRecords.splice(step, 1);
    console.log('step', step, operation[0], operation[0].linesIndex)
    // 移除操作步骤中对应的线条
    if (operation[0].linesIndex > -1) {
      this.removeLine(operation[0].linesIndex);
    }
    // 如果没有操作步骤了，则清空画布
    if (operationRecords.length == 0) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctxBack.clearRect(0, 0, this.width, this.height);
      // 绘制默认背景
      var drawBg = function (bgConfig) {
        if (bgConfig.bgType == 'color') {
          that.setBackgroundColor(bgConfig.bgColor, -1, -1, -1, -1, false);
        } else if (bgConfig.bgType == 'img') {
          that.setBackgroundImage(bgConfig.bgImg, -1, -1, -1, -1, null, null, false);
        }
      }
      drawBg({ bgType: this.config.defaultBgType, bgColor: this.config.defaultBackgroundColor, bgImg: this.config.defaultBgImg });
      return this;
    }
    var nextOperation = operationRecords[step - 1];
    nextOperation.exec();
    return this;
  }
  /**
   * 清屏
   * @returns {Tablet}
   */
  Tablet.prototype.clear = function (clearPoints) {
    var w = this.width,
      h = this.height;
    clearPoints = typeof clearPoints === 'undefined' ? false : !!clearPoints;
    if (this.config.onBeforeClear && (typeof this.config.onBeforeClear === "function")) {
      var flag = this.config.onBeforeClear.call(this);
      if (flag === false) {
        return;
      }
    }
    if (this.degree == 90 || this.degree == -90) {
      w = this.height;
      h = this.width;
    }
    this.ctx.clearRect(0, 0, w, h);
    this.ctxBack.clearRect(0, 0, w, h);
    if (clearPoints) {
      this.operationRecords = [];
      this.lines = [];
    }

    this.config.onClear && (typeof this.config.onClear === "function") && this.config.onClear.call(this);
    return this;
  }
  /**
   * 移除线条
   * @param indexOrLine 线条索引或线条对象
   * @returns {Tablet}
   */
  Tablet.prototype.removeLine = function (indexOrLine) {
    var lines = this.lines;
    console.log('indexOrLine', indexOrLine);
    if (typeof indexOrLine == 'number') {
      lines.splice(indexOrLine, 1, null);
      console.log('lines', lines);
    } else if (typeof indexOrLine == 'object') {
      var index = -1;
      for (var i = 0, len = lines.length; i < len; i++) {
        if (lines[i] == indexOrLine) {
          index = i;
          break;
        }
      }
      lines.splice(index, 1, null);
    }
    return this;
  }
  /**
   * 获取图片的base64数据
   * @param {type: string} 生成的图片格式，只有png、jpg两个选项
   * @returns {string}
   */
  Tablet.prototype.getBase64 = function (type) {
    var that = this;
    if (!type) {
      type = "image/png";
    } else {
      var _type = type.toLowerCase();
      if (_type === "png") {
        type = "image/png";
      } else if (_type === "jpg" || _type === "jpeg") {
        type = "image/jpg";
      }
    }
    var base64Img = this.canvas.toDataURL(type, 1);
    return base64Img;
  }
  /**
   * 获取图片的二进制数据
   * @param {type: string} 图片的后缀
   * @returns {Blob}
   */
  Tablet.prototype.getBlob = function (type) {
    var that = this,
      base64Img = this.getBase64(type),
      arr = base64Img.split(","),
      // mime类型
      mime = arr[0].match(/:(.*?);/)[1],
      bStr = atob(arr[1]),
      len = bStr.length,
      u8arr = new Uint8Array(len);
    while (len--) {
      u8arr[len] = bStr.charCodeAt(len);
    }
    return new Blob([u8arr], { type: mime });
  }
  /*
      生成前面板html
  */
  Tablet.prototype.buildTablet = function () {
    var that = this,
      html = '',
      flex = '';
    if (this.isMobile) {
      flex = 'flex ';
    }
    html += '<div class="-tablet ' + flex + this.config.extraClass + '" id="' + this.id + '">';
    html += '    <div class="-canvas-wrapper">';
    html += '        <canvas style="cursor: crosshair;"></canvas>';
    html += '        <canvas class="backup-canvas"></canvas>';
    html += '    </div>';
    html += '</div>';
    return html;
  }
  /**
   *  获取x、y轴的最大、最小值，并返回一个对象
   * @param { xPoints: array } x轴的所有坐标点
   * @param { yPoints: array } y轴的所有坐标点
   * @returns {{top: number, left: number, bottom: number, right: number}}
   */
  Tablet.getMax = function (xPoints, yPoints) {
    var obj = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
    if (({}).toString.call(xPoints) !== "[object Array]" || ({}).toString.call(yPoints) !== "[object Array]") {
      return obj;
    }
    obj.left = Math.min.apply(null, xPoints);
    obj.right = Math.max.apply(null, xPoints);
    obj.top = Math.min.apply(null, yPoints);
    obj.bottom = Math.max.apply(null, yPoints);
    return obj;
  }
  /**
   * 销毁画布
   */
  Tablet.prototype.destroy = function () {
    this.$canvas.css('cursor', 'default');
    this.$canvas.off();
    this.$canvasBack.off();
    this.canvas = null;
    this.$canvas = null;
    this.ctx = null;
    this.canvasBack = null;
    this.$canvasBack = null;
    this.ctxBack = null;
    this.$tablet = null;
    this.container = null;
    this.lines = [];
    this.operationRecords = [];
    if (typeof this._removeResizeEventFn === 'function') {
      this._removeResizeEventFn();
      this._removeResizeEventFn = null;
    }
  }

  return Tablet;
});
