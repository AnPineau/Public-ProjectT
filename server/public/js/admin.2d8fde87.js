(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["admin"],{"4de4":function(e,t,r){"use strict";var n=r("23e7"),i=r("b727").filter,o=r("1dde"),s=r("ae40"),u=o("filter"),a=s("filter");n({target:"Array",proto:!0,forced:!u||!a},{filter:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}})},"7cbf":function(e,t,r){"use strict";var n=r("d091"),i=r.n(n);i.a},"89b3":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h1",[e._v("Admin Panel")]),e.loaded_tournois?r("div",[r("table",[e._m(0),e._l(this.tournois,(function(t,n){return r("tr",{key:t._id,attrs:{item:t,index:n}},[r("td",[e._v(e._s(t._id))]),r("td",[e._v(e._s(t.title))]),r("td",[e._v(e._s(t.author))]),r("td",[r("button",{on:{click:function(r){return e.deleteTournoi(t._id)}}},[e._v("🚮")])])])}))],2)]):e._e(),r("br"),e.loaded_users?r("div",[r("table",[e._m(1),e._l(this.users,(function(t,n){return r("tr",{key:t._id,attrs:{item:t,index:n}},[r("td",[e._v(e._s(t._id))]),r("td",[e._v(e._s(t.username))]),r("td",[r("button",{on:{click:function(r){return e.deleteUser(t._id)}}},[e._v("🚮")])])])}))],2)]):e._e()])},i=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("tr",[r("th",[e._v("Tournois")]),r("th",[e._v("Titles")]),r("th",[e._v("Authors")]),r("th",[e._v("Actions")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("tr",[r("th",[e._v("User ID")]),r("th",[e._v("Username")]),r("th",[e._v("Actions")])])}],o=(r("4de4"),r("96cf"),r("1da1")),s=r("0dcd"),u=r("bc3a"),a=r.n(u),c={name:"AdminView",data:function(){return{tournois:[],users:[],loaded_tournois:!1,loaded_users:!1}},created:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s["a"].getTournois();case 3:e.tournois=t.sent,e.loaded_tournois=!0,t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),console.log(t.t0);case 10:return t.prev=10,t.next=13,a.a.get("http://localhost:8081/api/users/",{withCredentials:!0});case 13:r=t.sent,e.users=r.data,e.loaded_users=!0,t.next=21;break;case 18:t.prev=18,t.t1=t["catch"](10),console.log(t.t1.response);case 21:case"end":return t.stop()}}),t,null,[[0,7],[10,18]])})))()},methods:{deleteTournoi:function(e){console.log(e),this.tournois=this.tournois.filter((function(t){return t._id!=e})),s["a"].deleteTournoi(e)},deleteUser:function(e){console.log(e),this.users=this.users.filter((function(t){return t._id!=e})),a.a.delete("http://localhost:8081/api/users/".concat(e),{withCredentials:!0})}}},d=c,l=(r("7cbf"),r("2877")),f=Object(l["a"])(d,n,i,!1,null,"4b4ae38d",null);t["default"]=f.exports},ae40:function(e,t,r){var n=r("83ab"),i=r("d039"),o=r("5135"),s=Object.defineProperty,u={},a=function(e){throw e};e.exports=function(e,t){if(o(u,e))return u[e];t||(t={});var r=[][e],c=!!o(t,"ACCESSORS")&&t.ACCESSORS,d=o(t,0)?t[0]:a,l=o(t,1)?t[1]:void 0;return u[e]=!!r&&!i((function(){if(c&&!n)return!0;var e={length:-1};c?s(e,1,{enumerable:!0,get:a}):e[1]=1,r.call(e,d,l)}))}},b727:function(e,t,r){var n=r("0366"),i=r("44ad"),o=r("7b0b"),s=r("50c4"),u=r("65f0"),a=[].push,c=function(e){var t=1==e,r=2==e,c=3==e,d=4==e,l=6==e,f=5==e||l;return function(_,v,h,p){for(var b,m,w=o(_),g=i(w),x=n(v,h,3),k=s(g.length),A=0,C=p||u,E=t?C(_,k):r?C(_,0):void 0;k>A;A++)if((f||A in g)&&(b=g[A],m=x(b,A,w),e))if(t)E[A]=m;else if(m)switch(e){case 3:return!0;case 5:return b;case 6:return A;case 2:a.call(E,b)}else if(d)return!1;return l?-1:c||d?d:E}};e.exports={forEach:c(0),map:c(1),filter:c(2),some:c(3),every:c(4),find:c(5),findIndex:c(6)}},d091:function(e,t,r){}}]);
//# sourceMappingURL=admin.2d8fde87.js.map