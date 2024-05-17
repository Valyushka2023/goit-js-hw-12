import{a as g,i as w,S as b}from"./assets/vendor-09d7c26e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const L="43767722-bbce12454ab409ccbfe76519c",v="https://pixabay.com/api/";async function S(e,r=1){e.includes(" ")&&(e=e.replace(/\s+/g,"+"));const n=new URLSearchParams({key:L,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15});try{return(await g.get(`${v}?${n}`)).data}catch(s){throw new Error(s.response.statusText)}}function P(e){return`
    <div class="gallery-item">
      <a href="${e.largeImageURL}" class="gallery-link">
        <img src="${e.webformatURL}" alt="${e.tags}" class="gallery-image" />
      </a>
      <div class="thumb-block">
        ${a("Likes",e.likes)}
        ${a("Views",e.views)}
        ${a("Comments",e.comments)}
        ${a("Downloads",e.downloads)}
      </div>
    </div>
  `}function a(e,r){return`
    <div class="block">
      <h2 class="title">${e}</h2>
      <p class="amount">${r}</p>
    </div>
  `}function q(e){const r=document.querySelector(".gallery"),n=e.map(s=>P(s)).join("");r.insertAdjacentHTML("beforeend",n)}function d(e){w.error({title:"Error",message:e})}function E(){const e=document.querySelector(".loader");e&&(e.style.display="block")}function m(){const e=document.querySelector(".loader");e&&(e.style.display="none")}const $=new b(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlay:!0,close:!0,className:"custom-lightbox"}),k=document.querySelector(".js-search"),x=document.querySelector(".gallery"),c=document.querySelector(".btn-load-more"),u=document.querySelector(".up-btn"),y=document.querySelector(".end-loader");let f="",l=1,h=0;k.addEventListener("submit",e=>{if(e.preventDefault(),x.innerHTML="",c.style.display="none",y.style.display="none",f=e.target.elements.search.value.trim(),l=1,!f){d("Please enter a valid search term!");return}p()});c.addEventListener("click",()=>{l+=1,p()});async function p(){try{E(),c.style.display="none",y.style.display="none";const e=await S(f,l);if(m(),l===1&&!e.hits.length){d("Sorry, there are no images matching your search query. Please try again!");return}q(e.hits),$.refresh(),h=e.totalHits,e.hits.length<15||h<=l*15?y.style.display="block":c.style.display="block",B()}catch(e){m(),d("Something went wrong. Please try again."),console.error(e)}}function B(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}window.addEventListener("scroll",()=>{window.scrollY>300?u.classList.add("show"):u.classList.remove("show")});u.addEventListener("click",e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})});
//# sourceMappingURL=commonHelpers.js.map
