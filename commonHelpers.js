import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as T,i as g}from"./assets/vendor-77e16229.js";function S(e){const p=Math.floor(e/864e5),y=Math.floor(e%864e5/36e5),h=Math.floor(e%864e5%36e5/6e4),M=Math.floor(e%864e5%36e5%6e4/1e3);return{days:p,hours:y,minutes:h,seconds:M}}function s(e){return e.toString().padStart(2,"0")}const a=document.querySelector("#datetime-picker"),r=document.querySelector("button[data-start]"),u=document.querySelector("span[data-days]"),d=document.querySelector("span[data-hours]"),l=document.querySelector("span[data-minutes]"),m=document.querySelector("span[data-seconds]");let t,n;const f={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){if(e[0]<new Date){r.disabled=!0,g.error({backgroundColor:"red",title:"Error",theme:"dark",iconUrl:"./img/bi_x-octagon.svg",iconColor:"#ffffff",message:"Please choose a date in the future",position:"topCenter"});return}n=f.defaultDate,t=e[0],r.disabled=!1}};r.disabled=!0;T(a,f);r.addEventListener("click",()=>{r.disabled=!0,a.disabled=!0,new Date<t&&(n=new Date),t.toString().slice(0,15)!==n.toString().slice(0,15)&&(t.setHours(n.getHours()),t.setMinutes(n.getMinutes()),t.setSeconds(n.getSeconds()));let e=t.getTime()-n.getTime();const i=setInterval(()=>{if(e>0){const o=S(e);u.innerHTML=s(o.days),d.innerHTML=s(o.hours),l.innerHTML=s(o.minutes),m.innerHTML=s(o.seconds),e-=1e3}else clearInterval(i),a.disabled=!1},1e3),c=document.querySelector(".timer");c.onclick=function(){clearInterval(i),a.disabled=!1,u.innerHTML="00",d.innerHTML="00",l.innerHTML="00",m.innerHTML="00",console.log("finis")}});
//# sourceMappingURL=commonHelpers.js.map
