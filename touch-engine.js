/* DroidX lightweight touch feedback — delegated, no MutationObserver */
(()=>{
  const init=()=>{
    if(document.documentElement.dataset.touchEngineReady)return;
    document.documentElement.dataset.touchEngineReady='1';
    const selector='.primary,.secondary,.command-trigger,.nav-item,.card,.favorite-btn';
    document.addEventListener('pointerdown',e=>{
      const el=e.target.closest?.(selector);
      if(el)el.classList.add('touch-press');
    },{passive:true});
    const release=e=>{
      const el=e.target.closest?.(selector);
      if(el)el.classList.remove('touch-press');
    };
    document.addEventListener('pointerup',release,{passive:true});
    document.addEventListener('pointercancel',release,{passive:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
