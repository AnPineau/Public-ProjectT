(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["account"],{3072:function(e,t,r){"use strict";var n=r("391f"),s=r.n(n);s.a},"391f":function(e,t,r){},4938:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"root"},[r("div",{staticClass:"informations"},[r("h1",{staticClass:"username"},[e._v(e._s(e.user.username))]),r("h2",{staticClass:"email"},[e._v(e._s(e.user.email))]),r("h3",{staticClass:"createdat"},[e._v("Member since "+e._s(new Date(e.user.createdAt).toLocaleString().substr(0,10)))])]),r("div",{staticClass:"tournois"},[r("div",{staticClass:"tournois-title"},[e._v("Tourneys")]),e._l(e.tournois,(function(t,n){return r("router-link",{key:t._id,staticClass:"tournois-list-item",attrs:{to:"/play/"+t._id,item:t,index:n}},[r("div",{staticClass:"tournois-list-item-title"},[e._v(e._s(t.title))]),r("div",{staticClass:"tournois-list-item-createdat"},[e._v(" "+e._s(new Date(t.createdAt).toLocaleString().substr(0,10))+" ")])])}))],2)])},s=[],a=(r("96cf"),r("1da1")),u=r("d4ec"),i=r("bee2"),c=r("bc3a"),o=r.n(c),l="/api/users/",p=function(){function e(){Object(u["a"])(this,e)}return Object(i["a"])(e,null,[{key:"getUser",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.a.get(l+t,{withCredentials:!0});case 3:return r=e.sent,console.log("getuser"),console.log(r.data),e.abrupt("return",r.data);case 9:e.prev=9,e.t0=e["catch"](0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getUsers",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.a.get(l,{withCredentials:!0});case 3:return t=e.sent,e.abrupt("return",t.data);case 7:e.prev=7,e.t0=e["catch"](0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"deleteUser",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.a.delete(l+t,{withCredentials:!0});case 3:e.next=8;break;case 5:e.prev=5,e.t0=e["catch"](0),console.log(e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));function t(t){return e.apply(this,arguments)}return t}()}]),e}(),v=p,d=r("0dcd"),f={name:"AccountView",data:function(){return{user:Object,tournois:[]}},created:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.$store.state.isLogged){t.next=2;break}return t.abrupt("return",e.$router.push("/"));case 2:return t.prev=2,console.log("username store: "+e.$store.state.username),t.next=6,v.getUser(e.$store.state.username);case 6:return r=t.sent,e.user=r,t.next=10,d["a"].getTournoiByUsername(e.user.username);case 10:e.tournois=t.sent,t.next=17;break;case 13:t.prev=13,t.t0=t["catch"](2),e.$router.push("/"),console.log(t.t0.response);case 17:case"end":return t.stop()}}),t,null,[[2,13]])})))()}},m=f,h=(r("3072"),r("2877")),g=Object(h["a"])(m,n,s,!1,null,"ffd163a4",null);t["default"]=g.exports}}]);
//# sourceMappingURL=account.750e79bb.js.map