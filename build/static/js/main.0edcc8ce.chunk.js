(this["webpackJsonpexercise1.1"]=this["webpackJsonpexercise1.1"]||[]).push([[0],{44:function(e,n,t){},45:function(e,n,t){"use strict";t.r(n);var c=t(1),r=t(19),a=t.n(r),u=t(20),o=t(10),i=t(3),s=t(0),l=function(e){var n=e.personFilter,t=e.handlerDelete;return Object(s.jsx)("ul",{children:n.map((function(e){return Object(s.jsxs)("li",{children:[e.name," ",e.number,Object(s.jsx)("button",{onClick:function(){return t(e.id,e.name)},children:"delete"})]},e.name)}))})},d=function(e){var n=e.name,t=e.currentValue,c=e.handleOnChange;return Object(s.jsxs)("div",{children:[n,": ",Object(s.jsx)("input",{value:t,onChange:c})]})},h=function(e){var n=e.handlerOnSubmit,t=e.newName,c=e.handlerOnChangeName,r=e.newPhone,a=e.handlerOnChangePhone;return Object(s.jsxs)("form",{onSubmit:n,children:[Object(s.jsx)(d,{name:"Name",currentValue:t,handleOnChange:c}),Object(s.jsx)(d,{name:"Phone",currentValue:r,handleOnChange:a}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},f=function(e){var n=e.currentValue,t=e.handleOnchage;return Object(s.jsxs)("div",{children:[Object(s.jsx)("span",{children:"Filter by name"}),Object(s.jsx)("input",{value:n,onChange:t})]})},j=t(5),m=t.n(j),b="/api/persons",O=function(){return m.a.get("".concat(b,"?_sort=name&_order=asc")).then((function(e){return e.data}))},g=function(e){return m.a.post(b,e).then((function(e){return e.data}))},p=function(e,n){return m.a.put(b,n).then((function(e){return e.data}))},v=function(e){return m.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))},x=function(e){var n=e.message,t=e.type;return null===n?null:Object(s.jsx)("div",{className:t,children:n})},y=function(e){return{message:e,type:"success"}},w=function(e){return{message:e,type:"error"}},C=function(){var e=Object(c.useState)(""),n=Object(i.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(""),d=Object(i.a)(a,2),j=d[0],m=d[1],b=Object(c.useState)(""),C=Object(i.a)(b,2),S=C[0],N=C[1],D=Object(c.useState)([]),P=Object(i.a)(D,2),T=P[0],V=P[1],k=Object(c.useState)({message:null,type:null}),F=Object(i.a)(k,2),A=F[0],E=F[1];Object(c.useEffect)((function(){O().then((function(e){V(e)}))}),[]);var I="undefined"===typeof S||0===S.length?T:T.filter((function(e){return console.log(e.name,S),e.name.toLowerCase().includes(S.toLowerCase())}));return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(x,{message:A.message,type:A.type}),Object(s.jsx)(f,{currentValue:S,handleOnchage:function(e){e.preventDefault(),N(e.target.value)}}),Object(s.jsx)("h2",{children:"Add a new "}),Object(s.jsx)(h,{handlerOnSubmit:function(e){e.preventDefault();var n={name:t,number:j},c=T.find((function(e){return e.name===t}));if(c){if(!window.confirm("Seguro que desea actualizar los datos de ".concat(t)))return;p(c.id,Object(o.a)(Object(o.a)({},c),{},{number:j})).then((function(e){var n=T.filter((function(n){return n.id!==e.id}));V([].concat(Object(u.a)(n),[e])),r(""),m(""),E(y("Modificated ".concat(t))),setTimeout((function(){E({message:null,type:null})}),5e3)})).catch((function(e){var n=e.response.data.error||e.message;E(w(n)),setTimeout((function(){E({message:null,type:null})}),5e3)}))}else g(n).then((function(e){r(""),m("")})).then((function(){return O().then((function(e){return V(e)}))})).then((function(){E(y("Added ".concat(t))),setTimeout((function(){E({message:null,type:null})}),5e3)})).catch((function(e){var n=e.response.data.error||e.message;E(w(n)),setTimeout((function(){E({message:null,type:null})}),5e3)}))},newName:t,handlerOnChangeName:function(e){r(e.target.value)},newPhone:j,handlerOnChangePhone:function(e){m(e.target.value)}}),Object(s.jsx)("h2",{children:"Number"}),Object(s.jsx)(l,{personFilter:I,handlerDelete:function(e,n){window.confirm("Do you delete ".concat(n," person"))&&v(e).then((function(t){E(y("Deleted ".concat(n))),setTimeout((function(){E({message:null,type:null})}),5e3);var c=T.filter((function(n){return n.id!==e}));V(c)})).catch((function(e){E(w("Information of ".concat(n," has alredy removed from server"))),setTimeout((function(){E({message:null,type:null})}),15e3),console.log(e)}))}})]})};t(44);a.a.render(Object(s.jsx)(C,{}),document.getElementById("root"))}},[[45,1,2]]]);
//# sourceMappingURL=main.0edcc8ce.chunk.js.map