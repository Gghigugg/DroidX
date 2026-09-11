/* DroidX physical water interaction — pointer force, elastic deformation and ripples */
(()=>{
 const boot=()=>{
  if(document.getElementById('droidx-water-filter'))return;
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('aria-hidden','true');svg.style.cssText='position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
  svg.innerHTML='<defs><filter id="droidx-water-filter" x="-25%" y="-35%" width="150%" height="170%"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.020" numOctaves="3" seed="11" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" result="warp"/><feGaussianBlur in="warp" stdDeviation=".28"/></filter></defs>';document.body.prepend(svg);
  const hero=document.querySelector('.hero');if(!hero)return;const water=document.createElement('div');water.className='hero-water';water.setAttribute('aria-hidden','true');hero.prepend(water);
  let last=0,press=false,px=50,py=50,raf=0;
  const ripple=(x,y,force=1)=>{const now=performance.now();if(now-last<70)return;last=now;const r=water.getBoundingClientRect();if(x<r.left||x>r.right||y<r.top||y>r.bottom)return;const el=document.createElement('i');el.className='water-ripple';el.style.left=(x-r.left)+'px';el.style.top=(y-r.top)+'px';el.style.setProperty('--force',Math.min(1.8,Math.max(.65,force)));water.appendChild(el);setTimeout(()=>el.remove(),1400)};
  const move=e=>{const r=hero.getBoundingClientRect();const x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100;const vx=x-px,vy=y-py;px=x;py=y;hero.style.setProperty('--water-x',x+'%');hero.style.setProperty('--water-y',y+'%');const dx=(x-50)*.045+vx*1.8,dy=(y-50)*.035+vy*1.8;const sx=1+Math.min(.055,Math.abs(vx)*.004),sy=1+Math.min(.055,Math.abs(vy)*.004);cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{water.style.transform=`translate(calc(-50% + ${dx}px),calc(-48% + ${dy}px)) scale(${sx},${sy})`;water.style.setProperty('--wave-x',x+'%');water.style.setProperty('--wave-y',y+'%')});if(press)ripple(e.clientX,e.clientY,1+Math.hypot(vx,vy)*.04)};
  hero.addEventListener('pointermove',move,{passive:true});
  hero.addEventListener('pointerdown',e=>{press=true;px=50;py=50;ripple(e.clientX,e.clientY,1.35);water.style.transition='transform .12s cubic-bezier(.2,.9,.2,1),border-radius .2s';water.style.borderRadius='42% 58% 46% 54%/57% 43% 57% 43%';water.style.transform='translate(-50%,-48%) scale(1.035,.965)'});
  const release=()=>{if(!press)return;press=false;water.style.transition='transform .75s cubic-bezier(.16,.84,.2,1),border-radius .9s cubic-bezier(.2,.8,.2,1)';water.style.transform='translate(-50%,-48%) scale(1,1)';water.style.borderRadius='54% 46% 58% 42%/47% 58% 42% 53%'};
  hero.addEventListener('pointerup',release);hero.addEventListener('pointercancel',release);hero.addEventListener('pointerleave',()=>{if(!press){water.style.transform='translate(-50%,-48%) scale(1,1)'}});
  window.addEventListener('resize',()=>{water.style.transform='translate(-50%,-48%) scale(1,1)'});
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
