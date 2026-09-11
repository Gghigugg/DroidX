/* DroidX Liquid Material — unified touch depth for glass controls */
(()=>{
  const boot=()=>{
    const nodes=[...document.querySelectorAll('.glass,.card,.primary,.secondary,.command-trigger,.nav-item,.search-box')];
    nodes.forEach(el=>{
      if(el.dataset.liquidMaterial)return;
      el.dataset.liquidMaterial='1';
      el.addEventListener('pointermove',e=>{
        const r=el.getBoundingClientRect();
        const x=((e.clientX-r.left)/r.width)*100;
        const y=((e.clientY-r.top)/r.height)*100;
        el.style.setProperty('--mx',x.toFixed(1)+'%');
        el.style.setProperty('--my',y.toFixed(1)+'%');
        el.style.setProperty('--liquid-tilt',(((x-50)/50)*1.4).toFixed(2)+'deg');
      },{passive:true});
      el.addEventListener('pointerdown',()=>el.classList.add('liquid-pressed'));
      const release=()=>el.classList.remove('liquid-pressed');
      el.addEventListener('pointerup',release);el.addEventListener('pointercancel',release);el.addEventListener('pointerleave',release);
    });
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
