/* DroidX lightweight water interaction — no SVG filters, no pointermove loop */
(()=>{
  const boot=()=>{
    const hero=document.querySelector('.hero');
    if(!hero || hero.dataset.waterBooted)return;
    hero.dataset.waterBooted='1';
    const water=hero.querySelector('.hero-water')||(()=>{const el=document.createElement('div');el.className='hero-water';el.setAttribute('aria-hidden','true');hero.prepend(el);return el})();

    // Block the old high-frequency pointermove handlers. They were causing
    // getBoundingClientRect + requestAnimationFrame work on every touch.
    document.addEventListener('pointermove',e=>{
      if(e.pointerType==='touch' || e.pointerType==='mouse') e.stopPropagation();
    },{capture:true,passive:true});

    let lastRipple=0;
    const ripple=(x,y)=>{
      const now=performance.now();
      if(now-lastRipple<90)return;
      lastRipple=now;
      const r=water.getBoundingClientRect();
      if(x<r.left||x>r.right||y<r.top||y>r.bottom)return;
      const el=document.createElement('i');
      el.className='water-ripple';
      el.style.left=(x-r.left)+'px';
      el.style.top=(y-r.top)+'px';
      water.appendChild(el);
      setTimeout(()=>el.remove(),1000);
    };

    hero.addEventListener('pointerdown',e=>{
      ripple(e.clientX,e.clientY);
      water.classList.add('water-pressed');
    },{passive:true});
    const release=()=>water.classList.remove('water-pressed');
    hero.addEventListener('pointerup',release,{passive:true});
    hero.addEventListener('pointercancel',release,{passive:true});
    hero.addEventListener('pointerleave',release,{passive:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
