// DroidX Command Center — keyboard/touch quick actions
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
  function recent(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}}
  function save(k){try{localStorage.setItem(KEY,JSON.stringify([k,...recent().filter(x=>x!==k)].slice(0,5)))}catch{}}
  function run(k){if(typeof window.openAndroidSetting==='function'){save(k);window.openAndroidSetting(k)}else{location.hash='settings'}}
  const modal=document.createElement('div');modal.id='commandCenter';modal.className='command-modal';modal.hidden=true;
  modal.innerHTML='<div class="command-backdrop"></div><div class="command-dialog glass" role="dialog" aria-modal="true" aria-labelledby="commandTitle"><button class="command-close" type="button" aria-label="Close">×</button><div class="eyebrow">DROIDX COMMAND CENTER</div><h2 id="commandTitle">Quick Actions</h2><p class="command-hint">Tap an action or use ↑ ↓ and Enter.</p><div id="commandList" class="command-list"></div><div class="command-foot"><span>⌨️ Keyboard ready</span><span>ESC Close</span></div></div>';
  document.body.appendChild(modal);
  const list=modal.querySelector('#commandList');
  function render(){
    const r=recent();const ordered=[...r,...ACTIONS.map(x=>x[0]).filter(x=>!r.includes(x))];
    list.innerHTML=ordered.map(k=>{const x=ACTIONS.find(a=>a[0]===k);if(!x)return '';return `<button class="command-item" type="button" data-key="${esc(x[0])}"><b>${x[1]}</b><span><strong>${esc(x[2])}</strong><small>${esc(x[3])}</small></span>${r.includes(k)?'<i>Recent</i>':''}</button>`}).join('');
    list.querySelectorAll('.command-item').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.key;close();run(k)}));
  }
  function open(){render();modal.hidden=false;document.body.classList.add('modal-open');setTimeout(()=>list.querySelector('.command-item')?.focus(),30)}
  function close(){modal.hidden=true;document.body.classList.remove('modal-open')}
  modal.querySelector('.command-close').addEventListener('click',close);modal.querySelector('.command-backdrop').addEventListener('click',close);
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&!modal.hidden){e.preventDefault();close();return}
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();open();return}
    if(modal.hidden)return;
    const items=[...list.querySelectorAll('.command-item')],i=items.indexOf(document.activeElement);
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();items[(i+(e.key==='ArrowDown'?1:-1)+items.length)%items.length]?.focus()}
  });
  window.DroidXCommand={open,close};
  const button=document.getElementById('openCommandCenter');if(button)button.addEventListener('click',open);
})();
