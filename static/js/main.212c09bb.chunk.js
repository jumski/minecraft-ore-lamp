(this["webpackJsonpminecraft-ore-lamp-settings"]=this["webpackJsonpminecraft-ore-lamp-settings"]||[]).push([[0],{202:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(75),o=n.n(c),i=(n(89),n(7)),s=n.n(i),u=n(13),l=n(17),p=(n(91),n.p,n.p+"static/media/logo.1bbe2a8c.png"),d=n(82),b=n(49),f=n(80),m=n(81),g=n(28),h=n(84),j=n(83),O={start:function(){this.decoder=new TextDecoder(this.encoding,this.options)},transform:function(e,t){t.enqueue(this.decoder.decode(e,{stream:!0}))}},v=new WeakMap,w=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(){var e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"utf-8",a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=Object.assign({},a);Object(f.a)(this,n);var o=Object(b.a)(Object(b.a)({},O),{},{encoding:r,options:c});return e=t.call(this,o),v.set(Object(g.a)(e),o),e}return Object(m.a)(n,[{key:"encoding",get:function(){return v.get(this).decoder.encoding}},{key:"fatal",get:function(){return v.get(this).decoder.fatal}},{key:"ignoreBOM",get:function(){return v.get(this).decoder.ignoreBOM}}]),n}(window.TransformStream);function x(e,t){var n="",r=new WritableStream({write:function(e){var r=(n+=e).split("\n");if(r.length>1){n=r.pop();var a=r.pop().trim();t(a)}}});e.readable.pipeThrough(new w).pipeTo(r)}function k(e,t){return y.apply(this,arguments)}function y(){return(y=Object(u.a)(s.a.mark((function e(t,n){var r,a,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t||!t.writable){e.next=8;break}return r=t.writable.getWriter(),a=new TextEncoder,c=a.encode(n),console.log("writing to port",n,c),e.next=7,r.write(c);case 7:r.releaseLock();case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n(200);var N=n(4),C=[{name:"Redstone",color:{r:255,g:0,b:0}},{name:"Emerald",color:{r:0,g:255,b:0}},{name:"Lapis Lazuli",color:{r:0,g:0,b:255}},{name:"Gold",color:{r:255,g:100,b:0}},{name:"Diamond",color:{r:100,g:245,b:228}}];var S=function(){var e,t=Object(r.useState)(!1),n=Object(l.a)(t,2),a=n[0],c=n[1],o=Object(r.useState)(!0),i=Object(l.a)(o,2),b=(i[0],i[1]),f=Object(r.useState)(!1),m=Object(l.a)(f,2),g=m[0],h=m[1];function j(e){return O.apply(this,arguments)}function O(){return(O=Object(u.a)(s.a.mark((function e(t){var n,r,a,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.r,r=t.g,a=t.b,c=[n,r,a].join(",")+"\n",e.next=4,k(g,c);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(e){return w.apply(this,arguments)}function w(){return(w=Object(u.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.rgb,b(!1),console.log("rgb",n),c(n),e.next=6,j(n);case 6:b(!0);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(){return(y=Object(u.a)(s.a.mark((function e(){var t,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.serial.requestPort({});case 2:return t=e.sent,e.next=5,t.open({baudRate:9600});case 5:h(t),n=!1,x(t,(function(e){if(e.match(/\d+,\d+,\d+/)){var t=e.split(/,/),r=Object(l.a)(t,3),a=r[0],o=r[1],i=r[2],s={r:Number(a),g:Number(o),b:Number(i)};n||(console.log("newColor",s),c(s),n=!0)}}));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return a?(e=C.map((function(e){return Object(N.jsx)("div",{className:"mc-button full",onClick:function(){return v({rgb:e.color})},children:Object(N.jsx)("div",{className:"title",children:e.name})},e.name)}))).push(Object(N.jsx)("div",{className:"picker-container",children:Object(N.jsx)(d.a,{color:a,onChange:function(e){var t=e.rgb;b(!1),c(t)},onChangeComplete:v})},"Paleta barw")):e=[Object(N.jsx)("div",{className:"mc-button full",onClick:function(){return y.apply(this,arguments)},children:Object(N.jsx)("div",{className:"title",children:"Pod\u0142\u0105cz lampk\u0119!"})},"Pod\u0142\u0105cz lampk\u0119!")],Object(N.jsxs)("div",{className:"App container",children:[Object(N.jsx)("div",{className:"header",children:Object(N.jsx)("img",{style:{},src:p,alt:"Lampka Franka"})}),Object(N.jsx)("div",{className:"menu mc-menu",children:e})]})},T=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,204)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),r(e),a(e),c(e),o(e)}))};o.a.render(Object(N.jsx)(a.a.StrictMode,{children:Object(N.jsx)(S,{})}),document.getElementById("root")),T()},89:function(e,t,n){},91:function(e,t,n){}},[[202,1,2]]]);
//# sourceMappingURL=main.212c09bb.chunk.js.map