/* DroidX — screenshot-reference interaction layer */
(()=>{
  const load=()=>{
    const top=document.querySelector('.topbar');
    if(top&&!top.querySelector('.dx-chat-top')){
      top.innerHTML='<div class="dx-chat-top"><button id="dxChatMenu" aria-label="Open menu">☰</button><div class="dx-chat-title">DroidX</div><div class="dx-chat-actions"><button id="dxChatEdit" aria-label="Open search">✎</button><button id="dxChatMoreBtn" aria-label="More">⋮</button></div></div>';
    }
    if(!document.querySelector('.dx-chat-composer')){
      const bar=document.createElement('div');bar.className='dx-chat-composer';bar.innerHTML='<button id="dxChatPlus" aria-label="Open menu">＋</button><input id="dxChatInput" type="search" placeholder="Ask DroidX" autocomplete="off"/><button id="dxChatMic" aria-label="Voice search">⌕</button><button id="dxChatSend" class="dx-chat-send" aria-label="Go">↑</button>';document.body.appendChild(bar);
    }
    if(!document.querySelector('.dx-chat-drawer')){
      const d=document.createElement('div');d.className='dx-chat-drawer';d.id='dxChatDrawer';d.innerHTML='<div class="dx-chat-sheet"><button class="close" id="dxChatDrawerClose">×</button><div class="eyebrow">DROIDX</div><h2 style="margin:6px 0 18px;color:#fff">Quick navigation</h2><a href="#top">⌂ Home</a><a href="#global-search">⌕ Search</a><a href="#settings">⚙ Settings</a><a href="#apps">▦ Apps</a><a href="#utilities">✦ Utilities</a></div>';document.body.appendChild(d);
    }
    if(!document.querySelector('.dx-chat-more')){
      const m=document.createElement('div');m.className='dx-chat-more';m.id='dxChatMore';m.innerHTML='<button id="dxMoreCommand">⚡ Quick Actions</button><button id="dxMoreDevice">📱 Live Device Info</button><button id="dxMoreHome">⌂ Go Home</button>';document.body.appendChild(m);
    }
    const openDrawer=()=>document.getElementById('dxChatDrawer')?.classList.add('open');
    const closeDrawer=()=>document.getElementById('dxChatDrawer')?.classList.remove('open');
    document.getElementById('dxChatMenu')?.addEventListener('click',openDrawer);
    document.getElementById('dxChatPlus')?.addEventListener('click',openDrawer);
    document.getElementById('dxChatDrawerClose')?.addEventListener('click',closeDrawer);
    document.getElementById('dxChatDrawer')?.addEventListener('click',e=>{if(e.target.id==='dxChatDrawer')closeDrawer()});
    document.querySelectorAll('#dxChatDrawer a').forEach(a=>a.addEventListener('click',closeDrawer));
    const input=document.getElementById('dxChatInput');
    const focusSearch=()=>{const s=document.getElementById('globalSearch')||document.getElementById('shortcutSearch');if(s){s.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>s.focus(),350)}};
    document.getElementById('dxChatEdit')?.addEventListener('click',focusSearch);
    document.getElementById('dxChatMic')?.addEventListener('click',focusSearch);
    input?.addEventListener('focus',focusSearch);
    const more=document.getElementById('dxChatMore');
    document.getElementById('dxChatMoreBtn')?.addEventListener('click',()=>more?.classList.toggle('open'));
    document.getElementById('dxMoreCommand')?.addEventListener('click',()=>{more?.classList.remove('open');document.getElementById('openCommandCenter')?.click()});
    document.getElementById('dxMoreDevice')?.addEventListener('click',()=>{more?.classList.remove('open');document.getElementById('liveDeviceCard')?.scrollIntoView({behavior:'smooth',block:'center'})});
    document.getElementById('dxMoreHome')?.addEventListener('click',()=>{more?.classList.remove('open');window.scrollTo({top:0,behavior:'smooth'})});
    document.getElementById('dxChatSend')?.addEventListener('click',()=>{if(input?.value.trim()){const q=input.value.trim();input.value='';const s=document.getElementById('globalSearch')||document.getElementById('shortcutSearch');if(s){s.value=q;s.dispatchEvent(new Event('input',{bubbles:true}));s.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>s.focus(),350)}}else focusSearch()});
    document.addEventListener('click',e=>{if(more&&!e.target.closest('.dx-chat-more')&&!e.target.closest('#dxChatMoreBtn'))more.classList.remove('open')},{passive:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
})();
