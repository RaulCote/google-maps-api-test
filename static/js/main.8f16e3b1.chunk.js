(this["webpackJsonpgoogle-maps-api-test"]=this["webpackJsonpgoogle-maps-api-test"]||[]).push([[0],{21:function(e,t,n){},23:function(e,t,n){},30:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n(0),o=n.n(c),r=n(5),i=n.n(r),s=(n(21),n(3)),l=n(4),u=Object(c.createContext)(null),p="PLACE",d=function(e,t){switch(t.type){case"MAP":return Object(l.a)(Object(l.a)({},e),{},{map:t.payload});case p:return Object(l.a)(Object(l.a)({},e),{},{place:t.payload});default:return e}};function m(){var e=Object(c.useContext)(u),t=e.state,n=t.map,a=t.place,o=e.dispatch;return{map:n,place:a,loadMap:Object(c.useCallback)((function(e){o({type:"MAP",payload:e})}),[o]),updatePlace:Object(c.useCallback)((function(e){o({type:p,payload:e})}),[o])}}var j=function(e){var t=e.children,n=Object(c.useReducer)(d,{map:null,place:null}),o=Object(s.a)(n,2),r=o[0],i=o[1];return Object(a.jsx)(u.Provider,{value:{state:r,dispatch:i},children:t})},b={country:"es"};function f(){var e=m(),t=e.map,n=e.updatePlace,o=window.google,r=Object(c.useRef)(null);return Object(c.useEffect)((function(){var e=new o.maps.places.Autocomplete(r.current,{componentRestrictions:b}),a=t.addListener("bounds_changed",(function(){e.setBounds(t.getBounds())})),c=e.addListener("place_changed",(function(){var t=e.getPlace();n(t)}));return function(){o.maps.event.removeListener(a),o.maps.event.removeListener(c)}}),[o,t,n]),Object(a.jsx)("input",{id:"autocomplete",type:"text",placeholder:"Search...",ref:r})}var h=n(10),O=n.n(h),g=n(13),v=(n(23),n(15)),y={es:{center:{lat:41.294856,lng:-4.055685},zoom:5}},w={center:y.es.center,zoom:y.es.zoom,streetViewControl:!1,mapTypeControl:!1,fullscreenControl:!1,zoomControl:!1};var x=function(e){var t=e.apiKey,n=e.children,o=e.style,r=Object(c.useState)(!1),i=Object(s.a)(r,2),l=i[0],u=i[1],p=Object(c.useRef)(),d=m(),j=d.map,b=d.loadMap;return Object(c.useEffect)((function(){function e(){return(e=Object(g.a)(O.a.mark((function e(){var n,a,c;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=new v.a({apiKey:t,version:"weekly",libraries:["places"]}),e.next=4,n.load();case 4:a=window.google,c=new a.maps.Map(p.current,w),b(c),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),u(!0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[t,b]),l?Object(a.jsx)("h1",{children:"Something went wrong..."}):Object(a.jsx)("div",{id:"map",ref:p,style:o,children:j?n:Object(a.jsx)(a.Fragment,{})})},k=n(6),C=n(7),M=Object(C.b)({name:"map",initialState:{markers:[]},reducers:{addMarkerToStatistics:function(e,t){e.markers.push(t.payload)}}}),S=M.actions.addMarkerToStatistics,B=M.reducer;function L(){var e=Object(c.useState)([]),t=Object(s.a)(e,2)[1],n=Object(k.b)(),o=m(),r=o.map,i=o.place,l=window.google,u=Object(c.useCallback)((function(e){if(e&&e.geometry){var a=new l.maps.LatLngBounds;t((function(e){return e.forEach((function(e){e.setMap(null)})),[]})),n(S({position:{lat:e.geometry.location.lat(),lng:e.geometry.location.lng()},title:e.name})),t([new l.maps.Marker({map:r,position:e.geometry.location,title:e.name})]),e.geometry.viewport?a.union(e.geometry.viewport):a.extend(e.geometry.location),r.fitBounds(a)}}),[n,l,r]);return Object(c.useEffect)((function(){i&&u(i)}),[i,u]),Object(a.jsx)(a.Fragment,{})}var P=function(){return Object(a.jsx)(j,{children:Object(a.jsxs)(x,{apiKey:"AIzaSyD64ZCHBJBBaaGqTRubdCfmSdg-iQDei0I",style:{width:"100%",height:"100vh"},children:[Object(a.jsx)(f,{}),Object(a.jsx)(L,{})]})})},E=Object(C.a)({reducer:{map:B}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(a.jsx)(o.a.StrictMode,{children:Object(a.jsx)(k.a,{store:E,children:Object(a.jsx)(P,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[30,1,2]]]);
//# sourceMappingURL=main.8f16e3b1.chunk.js.map