/* DroidX Liquid OS Experience — fluid navigation and shortcut activation */
(()=>{
  const init=()=>{
    const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const pulse=(el,e)=>{
      if(reduced||!el)return;
      const x=e?.clientX??(innerWidth/2),y=e?.clientY??(innerHeight/2);
      const r=document.createElement('span');r.className='liquid-os-ripple';r.style.left=x+'px';r.style.top=y+'px';
      document.body.appendChild(r);setTimeout(()=>r.remove(),700);
    };
    document.addEventListener('click',e=>{
      const target=e.target.closest('a[href^="#"],button[data-intent],.card[data-intent],.command-item');
      if(!target)return;
      if(target.closest('.favorite-btn'))return;
      pulse(target,e);
      target.classList.remove('liquid-os-active');void target.offsetWidth;target.classList.add('liquid-os-active');
      setTimeout(()=>target.classList.remove('liquid-os-active'),550);
    },true);
    document.addEventListener('click',e=>{
      const a=e.target.closest('a[href^="#"]');if(!a)return;
      const id=a.getAttribute('href').slice(1);if(!id)return;
      const el=document.getElementById(id);if(!el)return;
      e.preventDefault();
      const y=el.getBoundingClientRect().top+scrollY-18;
      if(reduced)scrollTo(0,y);else{
        document.body.classList.add('liquid-os-transitioning');
        scrollTo({top:y,behavior:'smooth'});
        setTimeout(()=>document.body.classList.remove('liquid-os-transitioning'),420);
      }
      history.pushState(null,'','#'+id);
    },true);
    const modal=document.getElementById('commandCenter');
    if(modal&&window.DroidXCommand){
      const originalOpen=window.DroidXCommand.open,originalClose=window.DroidXCommand.close;
      window.DroidXCommand.open=()=>{modal.classList.remove('os-closing');originalOpen()};
      window.DroidXCommand.close=()=>{if(reduced){originalClose();return}modal.classList.add('os-closing');setTimeout(()=>{modal.classList.remove('os-closing');originalClose()},240)};
    }
    window.DroidXLiquidOS={pulse};
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
