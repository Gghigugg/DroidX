/* DroidX Liquid OS 2.0 — fluid navigation, expanding liquid and advanced morph */
(()=>{
  const init=()=>{
    const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const ripple=(x,y)=>{
      if(reduced)return;
      const r=document.createElement('span');r.className='liquid-os-ripple';r.style.left=x+'px';r.style.top=y+'px';document.body.appendChild(r);setTimeout(()=>r.remove(),760);
    };
    const expand=(x,y)=>{
      if(reduced)return;
      const el=document.createElement('span');el.className='liquid-os-expanding';el.style.left=x+'px';el.style.top=y+'px';
      const size=Math.max(innerWidth,innerHeight)*1.35;el.style.width=size+'px';el.style.height=size+'px';document.body.appendChild(el);setTimeout(()=>el.remove(),680);
    };
    document.addEventListener('click',e=>{
      const target=e.target.closest('a[href^="#"],button[data-intent],.card[data-intent],.command-item');
      if(!target||target.closest('.favorite-btn'))return;
      const x=e.clientX||innerWidth/2,y=e.clientY||innerHeight/2;ripple(x,y);target.classList.remove('liquid-os-active');void target.offsetWidth;target.classList.add('liquid-os-active');setTimeout(()=>target.classList.remove('liquid-os-active'),550);
      if(target.matches('button[data-intent],.card[data-intent],.command-item'))expand(x,y);
    },true);
    document.addEventListener('click',e=>{
      const a=e.target.closest('a[href^="#"]');if(!a)return;const id=a.getAttribute('href').slice(1);if(!id)return;const el=document.getElementById(id);if(!el)return;e.preventDefault();
      const y=el.getBoundingClientRect().top+scrollY-18;
      if(reduced)scrollTo(0,y);else{document.body.classList.add('liquid-os-transitioning');scrollTo({top:y,behavior:'smooth'});setTimeout(()=>document.body.classList.remove('liquid-os-transitioning'),520)}
      history.pushState(null,'','#'+id);
    },true);
    const modal=document.getElementById('commandCenter');
    if(modal&&window.DroidXCommand){
      const originalOpen=window.DroidXCommand.open,originalClose=window.DroidXCommand.close;
      window.DroidXCommand.open=()=>{modal.classList.remove('os-closing');originalOpen();if(!reduced){modal.classList.remove('os-morph');void modal.offsetWidth;modal.classList.add('os-morph')}};
      window.DroidXCommand.close=()=>{if(reduced){originalClose();return}modal.classList.add('os-closing');setTimeout(()=>{modal.classList.remove('os-closing','os-morph');originalClose()},250)};
    }
    window.DroidXLiquidOS={ripple,expand};
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
