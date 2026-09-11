/* DroidX Liquid Physics 2.0 — elastic water drag with velocity, stretch, attraction and release */
(()=>{
  const boot=()=>{
    if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
    if(document.querySelector('.liquid-drag-orb'))return;
    const orb=document.createElement('div');
    orb.className='liquid-drag-orb';
    orb.innerHTML='<span class="liquid-drag-core"></span><span class="liquid-drag-shine"></span><span class="liquid-drag-wave"></span><small>DRAG</small>';
    orb.setAttribute('aria-label','Drag the liquid onto a button to activate it');
    document.body.appendChild(orb);
    let dragging=false,activeTarget=null,pointerId=null,startX=0,startY=0,baseX=0,baseY=0,lastX=0,lastY=0,lastT=0,vx=0,vy=0,raf=0;
    const targets=()=>[...document.querySelectorAll('button:not([hidden]):not(.favorite-btn),a.nav-item,a.secondary,a.primary,.card')].filter(el=>el.offsetParent!==null&&!el.disabled);
    const setPos=(x,y)=>{orb.style.setProperty('--x',x+'px');orb.style.setProperty('--y',y+'px')};
    const home=()=>{const w=orb.offsetWidth||74,h=orb.offsetHeight||74;setPos(window.innerWidth-w-22,window.innerHeight-h-128)};
    const hit=(x,y)=>targets().find(el=>{const r=el.getBoundingClientRect();return x>=r.left-14&&x<=r.right+14&&y>=r.top-14&&y<=r.bottom+14});
    const highlight=el=>{if(activeTarget===el)return;activeTarget?.classList.remove('liquid-drop-target');activeTarget=el;if(el)el.classList.add('liquid-drop-target')};
    const physics=()=>{
      if(!dragging)return;
      const speed=Math.min(1,Math.hypot(vx,vy)/2.2);
      const angle=Math.max(-14,Math.min(14,vx*3));
      const stretch=1+speed*.22;
      const squash=1-speed*.08;
      orb.style.setProperty('--tilt',angle.toFixed(2)+'deg');
      orb.style.setProperty('--stretch',stretch.toFixed(3));
      orb.style.setProperty('--squash',squash.toFixed(3));
      orb.style.setProperty('--vx',Math.max(-1,Math.min(1,vx/3)).toFixed(3));
      orb.style.setProperty('--vy',Math.max(-1,Math.min(1,vy/3)).toFixed(3));
      raf=requestAnimationFrame(physics);
    };
    const end=(activate)=>{
      if(!dragging)return;
      const target=activeTarget;
      dragging=false;cancelAnimationFrame(raf);orb.classList.remove('dragging');
      activeTarget?.classList.remove('liquid-drop-target');activeTarget=null;document.body.classList.remove('liquid-dragging');
      if(activate&&target){
        orb.classList.add('liquid-snap');
        setTimeout(()=>{orb.classList.remove('liquid-snap');target.click();home()},260);
      }else{
        orb.classList.add('liquid-return');
        setTimeout(()=>{orb.classList.remove('liquid-return');orb.style.setProperty('--tilt','0deg');orb.style.setProperty('--stretch','1');orb.style.setProperty('--squash','1');home()},420);
      }
    };
    orb.addEventListener('pointerdown',e=>{
      if(e.pointerType==='mouse'&&e.button!==0)return;
      e.preventDefault();pointerId=e.pointerId;dragging=true;startX=e.clientX;startY=e.clientY;
      const r=orb.getBoundingClientRect();baseX=r.left;baseY=r.top;lastX=e.clientX;lastY=e.clientY;lastT=performance.now();vx=vy=0;
      orb.setPointerCapture?.(pointerId);orb.classList.add('dragging');document.body.classList.add('liquid-dragging');cancelAnimationFrame(raf);raf=requestAnimationFrame(physics);
    });
    orb.addEventListener('pointermove',e=>{
      if(!dragging||e.pointerId!==pointerId)return;e.preventDefault();
      const now=performance.now(),dt=Math.max(8,now-lastT);const dx=e.clientX-startX,dy=e.clientY-startY;
      const instX=(e.clientX-lastX)/(dt/16.67),instY=(e.clientY-lastY)/(dt/16.67);vx=vx*.68+instX*.32;vy=vy*.68+instY*.32;
      lastX=e.clientX;lastY=e.clientY;lastT=now;setPos(baseX+dx,baseY+dy);highlight(hit(e.clientX,e.clientY));
    });
    orb.addEventListener('pointerup',e=>{if(e.pointerId===pointerId){const target=activeTarget;end(!!target)}});
    orb.addEventListener('pointercancel',()=>end(false));
    window.addEventListener('resize',()=>{if(!dragging)home()});
    setTimeout(home,80);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
