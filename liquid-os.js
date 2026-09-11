/* DroidX Liquid OS — lightweight navigation + moving liquid selection */
(()=>{
  const init=()=>{
    const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const ripple=(x,y)=>{
      if(reduced)return;
      const r=document.createElement('span');r.className='liquid-os-ripple';r.style.left=x+'px';r.style.top=y+'px';document.body.appendChild(r);setTimeout(()=>r.remove(),420);
    };
    document.addEventListener('click',e=>{
      const target=e.target.closest('a[href^="#"],button[data-intent],.card[data-intent],.command-item,.nav-item');
      if(!target||target.closest('.favorite-btn'))return;
      ripple(e.clientX||innerWidth/2,e.clientY||innerHeight/2);
    },true);

    document.addEventListener('click',e=>{
      const a=e.target.closest('a[href^="#"]');
      if(!a)return;
      const id=a.getAttribute('href').slice(1);if(!id)return;
      const el=document.getElementById(id);if(!el)return;
      e.preventDefault();
      const y=el.getBoundingClientRect().top+scrollY-18;
      scrollTo(0,y);
      history.pushState(null,'','#'+id);
    },true);

    const nav=document.querySelector('.bottom-nav');
    if(nav){
      const items=[...nav.querySelectorAll('.nav-item')];
      let indicator=nav.querySelector('.nav-liquid');
      if(!indicator){indicator=document.createElement('span');indicator.className='nav-liquid';indicator.setAttribute('aria-hidden','true');nav.prepend(indicator)}
      const moveIndicator=(item,animate=true)=>{
        if(!item)return;
        const nb=nav.getBoundingClientRect(),b=item.getBoundingClientRect();
        indicator.style.transitionDuration=animate&&!reduced?'240ms':'0ms';
        indicator.style.left=Math.round(b.left-nb.left)+'px';
        indicator.style.width=Math.round(b.width)+'px';
        indicator.style.top=Math.round(b.top-nb.top)+'px';
        indicator.style.height=Math.round(b.height)+'px';
      };
      const sync=()=>moveIndicator(nav.querySelector('.nav-item.active')||items[0],false);
      items.forEach(item=>item.addEventListener('click',()=>requestAnimationFrame(()=>moveIndicator(item,true)),{passive:true}));
      const observer=new MutationObserver(sync);
      items.forEach(item=>observer.observe(item,{attributes:true,attributeFilter:['class']}));
      requestAnimationFrame(sync);
      addEventListener('resize',()=>requestAnimationFrame(sync),{passive:true});
    }
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
