/* DroidX Real Water interaction — lightweight SVG displacement + pointer ripples */
(()=>{
  const boot=()=>{
    if(document.getElementById('droidx-water-filter'))return;
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('aria-hidden','true');svg.style.cssText='position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
    svg.innerHTML='<defs><filter id="droidx-water-filter" x="-20%" y="-30%" width="140%" height="160%"><feTurbulence type="fractalNoise" baseFrequency="0.018 0.028" numOctaves="2" seed="7" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation=".35"/></filter></defs>';
    document.body.prepend(svg);
    const hero=document.querySelector('.hero');
    if(!hero)return;
    const water=document.createElement('div');water.className='hero-water';water.setAttribute('aria-hidden','true');hero.prepend(water);
    let lastRipple=0;
    const ripple=(clientX,clientY)=>{
      const now=performance.now();if(now-lastRipple<90)return;lastRipple=now;
      const r=water.getBoundingClientRect();
      if(clientX<r.left||clientX>r.right||clientY<r.top||clientY>r.bottom)return;
      const el=document.createElement('i');el.className='water-ripple';el.style.left=(clientX-r.left)+'px';el.style.top=(clientY-r.top)+'px';water.appendChild(el);setTimeout(()=>el.remove(),1200);
    };
    const move=(e)=>{
      const r=hero.getBoundingClientRect();const x=(e.clientX-r.left)/r.width*100;const y=(e.clientY-r.top)/r.height*100;
      hero.style.setProperty('--water-x',x.toFixed(1)+'%');hero.style.setProperty('--water-y',y.toFixed(1)+'%');
      const dx=(x-50)*.035,dy=(y-50)*.025;water.style.transform=`translate(calc(-50% + ${dx}px),calc(-48% + ${dy}px))`;
      ripple(e.clientX,e.clientY);
    };
    hero.addEventListener('pointermove',move,{passive:true});
    hero.addEventListener('pointerdown',e=>{ripple(e.clientX,e.clientY);water.style.borderRadius='46% 54% 48% 52%/55% 46% 54% 45%'});
    hero.addEventListener('pointerup',()=>{water.style.borderRadius='52% 48% 58% 42%/48% 55% 45% 52%'});
    hero.addEventListener('pointerleave',()=>{water.style.transform='translate(-50%,-48%)';water.style.borderRadius='52% 48% 58% 42%/48% 55% 45% 52%'});
    window.addEventListener('resize',()=>{water.style.transform='translate(-50%,-48%)'});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
