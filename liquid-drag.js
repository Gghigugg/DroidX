/* DroidX Liquid Drag — touch the floating liquid, drag it onto a control, release to activate */
(()=>{
  const boot=()=>{
    if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
    const orb=document.createElement('div');
    orb.className='liquid-drag-orb';
    orb.innerHTML='<span class="liquid-drag-core"></span><span class="liquid-drag-shine"></span><small>DRAG</small>';
    orb.setAttribute('aria-label','Drag the liquid onto a button to activate it');
    document.body.appendChild(orb);
    let dragging=false,activeTarget=null,pointerId=null,startX=0,startY=0,baseX=0,baseY=0;
    const targets=()=>[...document.querySelectorAll('button:not([hidden]):not(.favorite-btn),a.nav-item,a.secondary,a.primary,.card')].filter(el=>el.offsetParent!==null&&!el.disabled);
    const setPos=(x,y)=>{orb.style.setProperty('--x',x+'px');orb.style.setProperty('--y',y+'px')};
    const home=()=>{const r=orb.getBoundingClientRect();setPos(window.innerWidth-r.width-22,window.innerHeight-r.height-128)};
    const hit=(x,y)=>targets().find(el=>{const r=el.getBoundingClientRect();return x>=r.left-12&&x<=r.right+12&&y>=r.top-12&&y<=r.bottom+12});
    const highlight=el=>{if(activeTarget===el)return;activeTarget?.classList.remove('liquid-drop-target');activeTarget=el;if(el)el.classList.add('liquid-drop-target')};
    const end=(activate)=>{if(!dragging)return;const target=activeTarget;dragging=false;orb.classList.remove('dragging');activeTarget?.classList.remove('liquid-drop-target');activeTarget=null;document.body.classList.remove('liquid-dragging');if(activate&&target){orb.classList.add('liquid-snap');setTimeout(()=>{orb.classList.remove('liquid-snap');target.click()},180)}else{orb.classList.add('liquid-return');setTimeout(()=>{orb.classList.remove('liquid-return');home()},280)}};
    orb.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;e.preventDefault();pointerId=e.pointerId;dragging=true;startX=e.clientX;startY=e.clientY;const r=orb.getBoundingClientRect();baseX=r.left;baseY=r.top;orb.setPointerCapture?.(pointerId);orb.classList.add('dragging');document.body.classList.add('liquid-dragging');});
    orb.addEventListener('pointermove',e=>{if(!dragging||e.pointerId!==pointerId)return;e.preventDefault();const dx=e.clientX-startX,dy=e.clientY-startY;setPos(baseX+dx,baseY+dy);highlight(hit(e.clientX,e.clientY));});
    orb.addEventListener('pointerup',e=>{if(e.pointerId===pointerId){const target=activeTarget;end(!!target)}});
    orb.addEventListener('pointercancel',()=>end(false));
    window.addEventListener('resize',()=>{if(!dragging)home()});
    setTimeout(home,80);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
