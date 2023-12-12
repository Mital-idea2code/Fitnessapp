"use strict";(self.webpackChunkfitnessapp=self.webpackChunkfitnessapp||[]).push([[8149],{86522:function(e,r,t){t(47313);var n=t(8047),a=t(19641),s=t(46417);r.Z=function(e){var r=e.name,t=e.label,i=e.inputRef,l=e.InputProps,d=e.error,c=e.helperText,u=e.xs,o=e.sm,x=e.m,f=e.placeholder,h=e.id,p=e.defaultValue,m=e.readOnly,b=e.disabled,j=e.onChange;return(0,s.jsx)(a.ZP,{item:!0,xs:u,sm:o,m:x,children:(0,s.jsx)(n.Z,{InputLabelProps:{shrink:!0},variant:"outlined",margin:"normal",fullWidth:!0,label:t,id:h,name:r,inputRef:i,InputProps:l,error:d,helperText:c,placeholder:f,defaultValue:p,readOnly:m,disabled:b,onChange:j})})}},88149:function(e,r,t){t.r(r);var n=t(74165),a=t(15861),s=t(29439),i=t(47313),l=t(19641),d=t(47605),c=t(32530),u=t(85281),o=t(48104),x=t(42832),f=t(75627),h=t(24083),p=t(31387),m=(t(88282),t(80472)),b=t(86522),j=t(46417);r.default=function(){var e=(0,i.useState)(!1),r=(0,s.Z)(e,2),t=r[0],Z=r[1],g=(0,i.useState)(!0),P=(0,s.Z)(g,2),v=P[0],C=P[1],S=(0,i.useState)(!0),V=(0,s.Z)(S,2),y=V[0],q=V[1],F=(0,f.cI)(),A=F.register,I=F.getValues,k=F.setValue,w=F.handleSubmit,R=F.formState.errors,T=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,h.r6)().then((function(e){k("protein",e.data.info[0].protein),k("carb",e.data.info[0].carb),k("fat",e.data.info[0].fat),k("fibre",e.data.info[0].fibre),q(e.data.info[0]._id),C(!1)})).catch((function(){C(!1)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){T()}),[k,I]);return(0,j.jsx)(l.ZP,{container:!0,xs:5,children:(0,j.jsxs)(l.ZP,{item:!0,xs:12,md:6,lg:6,children:[(0,j.jsxs)(l.ZP,{container:!0,alignItems:"center",justifyContent:"space-between",children:[(0,j.jsx)(l.ZP,{item:!0,children:(0,j.jsx)(d.Z,{variant:"h5",children:"Nutrition Settings"})}),(0,j.jsx)(l.ZP,{item:!0})]}),(0,j.jsx)(m.Z,{sx:{mt:2},content:!1,children:(0,j.jsx)(x.Z,{spacing:3,children:(0,j.jsxs)(l.ZP,{xs:12,sx:{p:3},children:[(0,j.jsx)(p.Ix,{}),(0,j.jsx)("form",{onSubmit:w((function(e){Z(!0),(0,h.LK)(e,y).then((function(e){e.data.isSuccess&&200===e.data.status?(Z(!1),p.Am.success("Updated successfully!")):(e.data.status,e.data.isSuccess||(p.Am.error(e.data.message),Z(!1)))})).catch((function(e){p.Am.error(e.response.data),e.response.data.isSuccess?(p.Am.error("Something Went Wrong!"),Z(!1)):400===e.response.data.status?(p.Am.error(e.response.data.message),Z(!1)):(p.Am.error("Something is wrong in an input."),Z(!1))}))})),children:v?(0,j.jsx)("p",{children:"Loading..."}):(0,j.jsxs)("div",{children:[(0,j.jsx)(c.Z,{mb:2,children:(0,j.jsx)(d.Z,{color:"#FF0000"})}),(0,j.jsx)(p.Ix,{}),(0,j.jsxs)(l.ZP,{container:!0,xs:12,children:[(0,j.jsx)(l.ZP,{xs:10,children:(0,j.jsx)(b.Z,{xs:12,id:"protein",name:"protein",label:"Protein",inputRef:A("protein",{required:!0}),error:!!R.protein,helperText:R.protein&&"Protein is required",placeholder:"Protein",defaultValue:I("protein"),onChange:function(e){return k("protein",e.target.value)}})}),(0,j.jsx)(l.ZP,{xs:2,children:(0,j.jsx)(b.Z,{xs:12,placeholder:"%",defaultValue:"%",disabled:!0})})]}),(0,j.jsxs)(l.ZP,{container:!0,xs:12,children:[(0,j.jsx)(l.ZP,{xs:10,mt:2,children:(0,j.jsx)(b.Z,{xs:12,id:"carb",name:"carb",label:"Carb",inputRef:A("carb",{required:!0}),error:!!R.carb,helperText:R.carb&&"Carb is required",placeholder:"Carb",defaultValue:I("carb"),onChange:function(e){return k("carb",e.target.value)}})}),(0,j.jsx)(l.ZP,{xs:2,mt:2,children:(0,j.jsx)(b.Z,{xs:12,placeholder:"%",defaultValue:"%",disabled:!0})})]}),(0,j.jsxs)(l.ZP,{container:!0,xs:12,children:[(0,j.jsx)(l.ZP,{xs:10,mt:2,children:(0,j.jsx)(b.Z,{xs:12,id:"fat",name:"fat",label:"Fat",inputRef:A("fat",{required:!0}),error:!!R.fat,helperText:R.fat&&"Fat is required",placeholder:"Fat",defaultValue:I("fat"),onChange:function(e){return k("fat",e.target.value)}})}),(0,j.jsx)(l.ZP,{xs:2,mt:2,children:(0,j.jsx)(b.Z,{xs:12,placeholder:"%",defaultValue:"%",disabled:!0})})]}),(0,j.jsxs)(l.ZP,{container:!0,xs:12,children:[(0,j.jsx)(l.ZP,{xs:10,mt:2,children:(0,j.jsx)(b.Z,{xs:12,id:"fibre",name:"fibre",label:"Fibre",inputRef:A("fibre",{required:!0}),error:!!R.fibre,helperText:R.fibre&&"Fibre is required",placeholder:"Fibre",defaultValue:I("fibre"),onChange:function(e){return k("fibre",e.target.value)}})}),(0,j.jsx)(l.ZP,{xs:2,mt:2,children:(0,j.jsx)(b.Z,{xs:12,placeholder:"%",defaultValue:"g",disabled:!0})})]}),(0,j.jsx)("div",{style:{textAlign:"center"},children:t?(0,j.jsx)(l.ZP,{item:!0,xs:12,mt:2,children:(0,j.jsx)(u.Z,{size:26,fullWidth:!0,style:{"margin-top":"40px"}})}):(0,j.jsx)(o.Z,{type:"submit",variant:"contained",color:"primary",size:"large",style:{"margin-top":"40px"},children:"Update"})})]})})]})})})]})})}}}]);