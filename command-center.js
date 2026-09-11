// DroidX Command Center — fast, responsive quick actions
(function(){
  const ACTIONS=[
    ['settings','⚙️','Open Settings','System settings'],
    ['wifi','📶','Wi-Fi','Wireless settings'],
    ['bluetooth','🔵','Bluetooth','Connected devices'],
    ['location','📍','Location','Location services'],
    ['battery','🔋','Battery','Power settings'],
    ['apps','📱','All Apps','Installed apps'],
    ['display','🖥️','Display','Screen & brightness'],
    ['privacy','🛡️','Privacy','Privacy settings']
  ];
  const KEY='droidx-command-recent-v1';
  const esc=v=>String(v).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\\':'&#92;','"':'&quot;'}[c]));
  const recent=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}};
  const save=k=>{try{localStorage.setItem(KEY,JSON.stringify([k,...recent().filter(x=>x!==k)].slice(0,5)))}catch{}};
  const run=k=>{save(k);if(typeof window.openAndroidSetting==='function')window.openAndroidSetting(k);else location.hash='settings'};

  const style=document.createElement('style');
  style.textContent=`
  .command-modal{position:fixed;inset:0;z-index:1500;display:grid;place-items:center;padding:18px}
  .command-modal[hidden]{display:none!important}
  .command-backdrop{position:absolute;inset:0;background:rgba(2,5,28,.48);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px)}
  .command-dialog{position:relative;width:min(680px,calc(100vw - 28px));max-height:min(78vh,700px);overflow:auto;padding:24px;border-radius:32px!important;background:linear-gradient(135deg,rgba(27,48,135,.76),rgba(45,27,123,.68),rgba(0,164,203,.44))!important;border:1px solid rgba(190,244,255,.55)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.34),0 24px 70px rgba(0,0,50,.42)!important}
  .command-close{position:absolute;right:14px;top:14px;width:40px;height:40px;border-radius:50%;border:1px solid rgba(210,250,255,.45);background:rgba(255,255,255,.10);color:#fff;font-size:26px;line-height:1;cursor:pointer;z-index:3}
  .command-dialog h2{margin:8px 0 10px;font-size:clamp(32px,7vw,48px);color:#fff}
  .command-hint{margin:0 0 18px;color:rgba(245,250,255,.78);font-size:16px}
  .command-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
  .command-item{width:100%;min-height:70px;display:grid;grid-template-columns:46px 1fr auto;align-items:center;gap:10px;padding:11px 13px;border:1px solid rgba(190,244,255,.36);border-radius:22px;background:linear-gradient(135deg,rgba(61,105,220,.42),rgba(73,47,169,.34),rgba(0,192,225,.20));color:#fff;text-align:left;cursor:pointer;box-shadow:inset 0 1px 0 rgba(255,255,255,.24),0 8px 22px rgba(0,0,50,.16);-webkit-tap-highlight-color:transparent}
  .command-item>b{width:44px;height:44px;display:grid;place-items:center;border-radius:15px;background:rgba(255,255,255,.13);font-size:22px}
  .command-item span{min-width:0;display:grid;gap:3px}.command-item strong{font-size:16px;line-height:1.1}.command-item small{color:rgba(240,247,255,.68);font-size:12px}.command-item i{font-size:10px;font-style:normal;color:#9ff7ff;border:1px solid rgba(159,247,255,.35);padding:4px 7px;border-radius:99px}
  .command-foot{display:flex;justify-content:space-between;gap:10px;margin-top:15px;color:rgba(235,245,255,.62);font-size:12px}
  @media(max-width:560px){.command-modal{padding:10px}.command-dialog{padding:18px!important;border-radius:26px!important;max-height:84vh}.command-list{grid-template-columns:1fr}.command-item{min-height:64px}.command-foot{font-size:11px}}
  `;
  document.head.appendChild(style);

  const modal=document.createElement('div');
  modal.id='commandCenter';modal.className='command-modal';modal.hidden=true;
  modal.innerHTML='<div class="command-backdrop"></div><div class="command-dialog glass" role="dialog" aria-modal="true" aria-labelledby="commandTitle"><button class="command-close" type="button" aria-label="Close">×</button><div class="eyebrow">DROIDX COMMAND CENTER</div><h2 id="commandTitle">Quick Actions</h2><p class="command-hint">Tap an action or use ↑ ↓ and Enter.</p><div id="commandList" class="command-list"></div><div class="command-foot"><span>⌨️ Keyboard ready</span><span>ESC Close</span></div></div>';
  document.body.appendChild(modal);
  const list=modal.querySelector('#commandList');

  function render(){
    const r=recent();
    const ordered=[...r,...ACTIONS.map(x=>x[0]).filter(x=>!r.includes(x))];
    list.innerHTML=ordered.map(k=>{const x=ACTIONS.find(a=>a[0]===k);if(!x)return '';return `<button class="command-item" type="button" data-key="${esc(x[0])}"><b>${x[1]}</b><span><strong>${esc(x[2])}</strong><small>${esc(x[3])}</small></span>${r.includes(k)?'<i>Recent</i>':''}</button>`}).join('');
  }
  function open(){render();modal.hidden=false;document.body.classList.add('modal-open');requestAnimationFrame(()=>list.querySelector('.command-item')?.focus())}
  function close(){modal.hidden=true;document.body.classList.remove('modal-open')}

  list.addEventListener('click',e=>{const b=e.target.closest('.command-item');if(!b)return;const k=b.dataset.key;close();run(k)});
  modal.querySelector('.command-close').addEventListener('click',close);
  modal.querySelector('.command-backdrop').addEventListener('click',close);
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&!modal.hidden){e.preventDefault();close();return}
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();open();return}
    if(modal.hidden)return;
    const items=[...list.querySelectorAll('.command-item')],i=items.indexOf(document.activeElement);
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();items[(i+(e.key==='ArrowDown'?1:-1)+items.length)%items.length]?.focus()}
    if(e.key==='Enter'&&document.activeElement?.classList.contains('command-item')){e.preventDefault();document.activeElement.click()}
  });
  window.DroidXCommand={open,close};
  document.getElementById('openCommandCenter')?.addEventListener('click',open);
})();
