"use strict";(self.webpackChunkfitnessapp=self.webpackChunkfitnessapp||[]).push([[2013],{86522:function(e,t,s){s(47313);var i=s(8047),r=s(19641),n=s(46417);t.Z=function(e){var t=e.name,s=e.label,l=e.inputRef,a=e.InputProps,o=e.error,c=e.helperText,d=e.xs,u=e.sm,g=e.m,p=e.placeholder,h=e.id,x=e.defaultValue,m=e.readOnly,f=e.disabled,j=e.onChange;return(0,n.jsx)(r.ZP,{item:!0,xs:d,sm:u,m:g,children:(0,n.jsx)(i.Z,{InputLabelProps:{shrink:!0},variant:"outlined",margin:"normal",fullWidth:!0,label:s,id:h,name:t,inputRef:l,InputProps:a,error:o,helperText:c,placeholder:p,defaultValue:x,readOnly:m,disabled:f,onChange:j})})}},32013:function(e,t,s){s.r(t);var i=s(1413),r=s(29439),n=s(58467),l=s(19641),a=s(47605),o=s(56605),c=s(15480),d=s(85281),u=s(48104),g=s(42832),p=s(86522),h=s(80472),x=s(75627),m=s(47313),f=s(24083),j=s(31387),b=(s(88282),s(84726)),Z=s(46417);t.default=function(){var e=(0,n.TH)().state,t=(0,m.useState)(!0),s=(0,r.Z)(t,2),y=s[0],v=s[1],S=(0,m.useState)(!1),I=(0,r.Z)(S,2),P=I[0],w=I[1],A=(0,m.useState)(""),R=(0,r.Z)(A,2),C=R[0],k=R[1],O=(0,n.s0)(),T=(0,m.useState)(!1),V=(0,r.Z)(T,2),q=V[0],L=V[1],M=(0,m.useState)(null),W=(0,r.Z)(M,2),U=W[0],E=W[1],F=(0,m.useState)(b),H=(0,r.Z)(F,2),z=H[0],B=H[1],D=(0,m.useState)(!1),Y=(0,r.Z)(D,2),_=Y[0],G=Y[1],J=(0,x.cI)(),K=J.register,N=J.getValues,Q=J.setValue,X=J.handleSubmit,$=J.formState.errors;(0,m.useEffect)((function(){if(e){var t=e.editdata,s=e.imageurl;k(t._id),Q("title",t.title),B(s+t.image),E(s+t.video)}v(!1)}),[]);return(0,Z.jsx)(l.ZP,{container:!0,rowSpacing:4.5,columnSpacing:2.75,children:(0,Z.jsxs)(l.ZP,{item:!0,xs:12,md:6,lg:6,children:[(0,Z.jsxs)(l.ZP,{container:!0,alignItems:"center",justifyContent:"space-between",children:[(0,Z.jsx)(l.ZP,{item:!0,children:(0,Z.jsxs)(a.Z,{variant:"h5",children:[""===C?"Add":"Update"," Reel"]})}),(0,Z.jsx)(l.ZP,{item:!0})]}),(0,Z.jsx)(h.Z,{sx:{mt:2},content:!1,children:(0,Z.jsx)(g.Z,{spacing:3,children:(0,Z.jsxs)(l.ZP,{xs:12,sx:{p:3},children:[(0,Z.jsx)(j.Ix,{}),(0,Z.jsx)("form",{onSubmit:X((function(e){w(!1);var t=new FormData;Object.keys(e).forEach((function(s){"video"===s||"image"===s?t.append(s,e[s][0]):t.append(s,e[s])})),""===C?(0,f.we)(t).then((function(){localStorage.setItem("redirectSuccess","true"),localStorage.setItem("redirectMessage","Added successfully!"),O("/reels")})).catch((function(e){e.response.data.isSuccess?j.Am.error("Something Went Wrong!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!1,pauseOnHover:!0,draggable:!0,progress:void 0}):j.Am.error(e.response.data.message),w(!1)})):(0,f.I6)(t,C).then((function(){localStorage.setItem("redirectSuccess","true"),localStorage.setItem("redirectMessage","Updated successfully!"),O("/reels")})).catch((function(e){e.response.data.isSuccess?j.Am.error("Something Went Wrong!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!1,pauseOnHover:!0,draggable:!0,progress:void 0}):j.Am.error(e.response.data.message),w(!1)}))})),children:y?(0,Z.jsx)("p",{children:"Loading..."}):(0,Z.jsxs)("div",{children:[(0,Z.jsx)(p.Z,{xs:12,m:2,spacing:3,id:"title",name:"title",label:"Title",inputRef:K("title",{required:!0}),error:!!$.title,helperText:$.title&&"Title is required",placeholder:"Title",defaultValue:N("title"),onChange:function(e){return Q("title",e.target.value)}}),(0,Z.jsxs)(l.ZP,{xs:12,mt:2,spacing:3,container:!0,children:[(0,Z.jsx)(l.ZP,{item:!0,xs:6,mt:2,style:{textAlign:"center"},children:(0,Z.jsxs)(g.Z,{direction:"row",alignItems:"center",style:{display:"block"},spacing:2,sx:6,onMouseOver:function(){G(!0)},onMouseOut:function(){G(!1)},children:[(0,Z.jsxs)("label",{htmlFor:"icon-button-file-icon",style:{textAlign:"center"},children:[(0,Z.jsx)(o.Z,(0,i.Z)((0,i.Z)({name:"image",accept:"image/*"},K("image",{required:!C})),{},{id:"icon-button-file-icon",type:"file",onChange:function(e){var t=e.target.files[0],s=new FileReader;s.onloadend=function(){B(s.result)},s.readAsDataURL(t)},alignItems:"center",style:{top:"-9999px",left:"-9999px"}})),_?(0,Z.jsx)("img",{src:b,alt:"Reel",width:"100",height:100,style:{borderRadius:"50%"}}):(0,Z.jsx)("img",{src:z,alt:"Reel",width:"100",height:100,style:{borderRadius:"50%"}})]}),(0,Z.jsx)("br",{}),(0,Z.jsx)("span",{children:"Image"}),(0,Z.jsx)(c.Z,{error:!0,style:{textAlign:"center"},children:$.image&&"Image is required"})]})}),(0,Z.jsx)(l.ZP,{item:!0,xs:6,mt:2,style:{textAlign:"center"},children:(0,Z.jsxs)(g.Z,{direction:"row",alignItems:"center",style:{display:"block"},spacing:2,sx:6,onMouseOver:function(){L(!0)},onMouseOut:function(){L(!1)},children:[(0,Z.jsxs)("label",{htmlFor:"icon-button-file",style:{textAlign:"center"},children:[(0,Z.jsx)(o.Z,(0,i.Z)((0,i.Z)({name:"video",accept:"video/*"},K("video",{required:!C})),{},{id:"icon-button-file",type:"file",onChange:function(e){var t=e.target.files[0];if(t){var s=URL.createObjectURL(t);E(s)}},alignItems:"center",style:{top:"-9999px",left:"-9999px"}})),q?(0,Z.jsx)("img",{src:b,alt:"Reel",width:"100",height:100,style:{borderRadius:"50%"}}):U?(0,Z.jsxs)("video",{controls:!0,width:"150",height:"100",style:{margin:"0 20px"},children:[(0,Z.jsx)("source",{src:U,type:"video/mp4"}),(0,Z.jsx)("track",{label:"English Captions",kind:"subtitles",srcLang:"en",src:"captions.vtt",default:!0}),"Your browser does not support the video tag."]}):(0,Z.jsx)("img",{src:b,alt:"Essentials",width:"100",height:100,style:{borderRadius:"50%"}})]}),(0,Z.jsx)("br",{}),(0,Z.jsx)("span",{children:"Video"}),(0,Z.jsx)(c.Z,{error:!0,children:$.video&&"Video is required"})]})})]}),P?(0,Z.jsx)(l.ZP,{item:!0,xs:12,mt:2,style:{textAlign:"center"},children:(0,Z.jsx)(d.Z,{size:26,fullWidth:!0,style:{"margin-top":"15px"}})}):(0,Z.jsx)(l.ZP,{item:!0,xs:12,mt:2,style:{textAlign:"center"},children:(0,Z.jsx)(u.Z,{type:"submit",variant:"contained",color:"primary",size:"large",style:{"margin-top":"15px",textAlign:"center"},children:"Submit"})})]})})]})})})]})})}},84726:function(e,t,s){e.exports=s.p+"static/media/upload3.bba22052686782d8edb3.jpg"}}]);