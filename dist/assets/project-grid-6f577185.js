import{_ as d,i as a,o as s,e as o,f as t,h as m,b as u,E as w,r as c,g as l,p as y,l as x,A as j,B as D,q as f,c as S}from"./index-35aadbb8.js";import{h as P}from"./heading-item-cf18a184.js";const I={props:{text:{type:String,validator:a}}},b={class:"text"},A={class:"text__content"};function k(r,g,i,h,e,n){return s(),o("div",b,[t("p",A,m(i.text),1)])}const z=d(I,[["render",k]]),T={props:{title:{type:String,validator:a},img:{type:String,validator:a},imgSize:{type:Object,validator:u},text:{type:String,validator:a},slogan:{type:String,validator:a}},components:{headingItem:P,textItem:z},computed:{domain(){return w}}},V={class:"project-article"},B={class:"project-article__wrapper"},N={class:"project-article__heading-wrapper"},E={class:"project-article__content-wrapper"},O={class:"project-article__img-wrapper"},$=["src","width","height"],M={class:"project-article__text-wrapper"},R={class:"slogan"};function q(r,g,i,h,e,n){const _=c("headingItem"),p=c("textItem");return s(),o("article",V,[t("div",B,[t("div",N,[l(_,{title:i.title},null,8,["title"])]),t("div",E,[t("div",O,[t("img",{class:"project-article__img",src:`${n.domain+i.img}`,alt:"",width:i.imgSize.width,height:i.imgSize.height},null,8,$)]),t("div",M,[l(p,{text:i.text},null,8,["text"]),t("span",R,m(i.slogan),1)])])])])}const U=d(T,[["render",q]]),W={data(){return{articleData:null,articlePreviewData:null,dataIsReady:!1}},props:{typePage:{type:String,requared:!0,validator:a},typePreview:{type:String,validator:a}},components:{projectArticle:U,previewArticle:y,loadItem:x},async created(){this.articleData=await j(this.typePage),this.articlePreviewData=await D(this.typePreview),this.articleData&&this.articlePreviewData&&(this.dataIsReady=!0)},computed:{...f({deviceTypeVuex:"deviceType"})}},C={class:"project"},G={key:0,class:"project__grid"},F={class:"similar project__similar"},H={class:"similar__wrapper"},J={class:"similar__heading"};function K(r,g,i,h,e,n){const _=c("projectArticle"),p=c("previewArticle"),v=c("loadItem");return s(),o("div",C,[e.dataIsReady?(s(),o("div",G,[l(_,{class:"project__article-main",title:e.articleData.title,img:e.articleData.img.desktop,imgSize:e.articleData.img.desktop_dementions,slogan:e.articleData.slogan,text:e.articleData.text},null,8,["title","img","imgSize","slogan","text"]),t("div",F,[t("div",H,[t("span",J,m(e.articlePreviewData.heading_preview),1),l(p,{class:"project__article-preview project__horizontal project__about-project-rec",imgUrl:e.articlePreviewData.img.desktop_wide,imgSize:e.articleData.img.desktop_dementions,isTablet:r.deviceTypeVuex==="tablet",isMobile:r.deviceTypeVuex==="mobile",isWideArticleDescription:!r.deviceTypeVuex==="mobile",header:e.articlePreviewData.heading_preview,text:e.articlePreviewData.text_preview,page:i.typePreview},null,8,["imgUrl","imgSize","isTablet","isMobile","isWideArticleDescription","header","text","page"])])])])):(s(),S(v,{key:1}))])}const X=d(W,[["render",K]]);export{X as p};
