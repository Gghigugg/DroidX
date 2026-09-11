/* DroidX — final button reliability layer
   Runs last so shortcut cards, hero actions and Command Center all use one launcher. */
(()=>{
  const ACTIONS={
    settings:'android.settings.SETTINGS',wifi:'android.settings.WIFI_SETTINGS',bluetooth:'android.settings.BLUETOOTH_SETTINGS',location:'android.settings.LOCATION_SOURCE_SETTINGS',display:'android.settings.DISPLAY_SETTINGS',sound:'android.settings.SOUND_SETTINGS',audio:'android.settings.SOUND_SETTINGS',security:'android.settings.SECURITY_SETTINGS',battery:'android.settings.BATTERY_SAVER_SETTINGS',apps:'android.settings.APPLICATION_SETTINGS',appsettings:'android.settings.MANAGE_APPLICATIONS_SETTINGS',appnotifications:'android.settings.APP_NOTIFICATION_SETTINGS',defaultapps:'android.settings.MANAGE_DEFAULT_APPS_SETTINGS',storage:'android.settings.INTERNAL_STORAGE_SETTINGS',permissions:'android.settings.MANAGE_SPECIAL_APP_ACCESSES',unknownapps:'android.settings.MANAGE_UNKNOWN_APP_SOURCES',specialaccess:'android.settings.MANAGE_SPECIAL_APP_ACCESSES',usage:'android.settings.USAGE_ACCESS_SETTINGS',batteryusage:'android.settings.BATTERY_SAVER_SETTINGS',appsearch:'android.settings.APPLICATION_SETTINGS',manageapps:'android.settings.MANAGE_APPLICATIONS_SETTINGS',language:'android.settings.LOCALE_SETTINGS',datetime:'android.settings.DATE_SETTINGS',home:'android.settings.HOME_SETTINGS',keyboard:'android.settings.INPUT_METHOD_SETTINGS',data:'android.settings.DATA_USAGE_SETTINGS',accessibility:'android.settings.ACCESSIBILITY_SETTINGS',search:'android.settings.SEARCH_SETTINGS',device:'android.settings.DEVICE_INFO_SETTINGS',biometrics:'android.settings.BIOMETRIC_ENROLL',network:'android.settings.WIRELESS_SETTINGS',privacy:'android.settings.PRIVACY_SETTINGS',notifications:'android.settings.APP_NOTIFICATION_SETTINGS'
  };
  const toast=(msg)=>{const t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(window.__dxButtonToast);window.__dxButtonToast=setTimeout(()=>t.classList.remove('show'),3000)};
  const save=(key)=>{try{const k='droidx-recent-v1';const a=JSON.parse(localStorage.getItem(k)||'[]');localStorage.setItem(k,JSON.stringify([key,...a.filter(x=>x!==key)].slice(0,6)))}catch{}};
  const launch=(action)=>new Promise(resolve=>{
    const urls=[`intent:#Intent;action=${action};end`,`intent://#Intent;action=${action};package=com.android.settings;end`,`intent://com.android.settings/#Intent;scheme=android-app;action=${action};end`];
    let i=0,done=false,timer;
    const finish=ok=>{if(done)return;done=true;clearTimeout(timer);document.removeEventListener('visibilitychange',onHide);resolve(ok)};
    const onHide=()=>{if(document.visibilityState==='hidden')finish(true)};
    document.addEventListener('visibilitychange',onHide);
    const next=()=>{if(done)return;if(i>=urls.length){finish(false);return}try{location.href=urls[i++]}catch{next();return}setTimeout(next,700)};
    timer=setTimeout(()=>finish(false),2600);next();
  });
  async function open(key){
    const action=ACTIONS[key];
    if(!action){toast('Shortcut is not configured.');return false}
    if(!/Android/i.test(navigator.userAgent)){toast('These Android shortcuts work on Android devices.');return false}
    save(key);
    if(await launch(action))return true;
    if(action!=='android.settings.SETTINGS'){
      toast('This shortcut is unavailable here. Opening Android Settings…');
      if(await launch('android.settings.SETTINGS'))return true;
    }
    toast('Android could not open this shortcut on this device.');return false;
  }
  window.openAndroidSetting=open;

  // Capture shortcut clicks before older handlers can launch the fragile implementation.
  document.addEventListener('click',e=>{
    const target=e.target.closest('[data-intent],.card[data-key],.command-item');
    if(!target)return;
    const key=target.dataset.intent||target.dataset.key||target.dataset.shortcutKey;
    if(!key||!ACTIONS[key])return;
    if(target.matches('.favorite-btn'))return;
    e.preventDefault();e.stopImmediatePropagation();open(key);
  },true);

  // Repair the accidentally empty Utilities section without duplicating existing tools.
  function repairUtilities(){
    const section=document.getElementById('utilities');if(!section||section.querySelector('#utilityGrid'))return;
    const grid=document.createElement('div');grid.id='utilityGrid';grid.className='grid utility-grid';
    grid.innerHTML='<button class="card mini-card" id="utilityShare" type="button"><b>↗️</b><span>Share DroidX</span><small>Share this utility</small></button><button class="card mini-card" id="utilityCopy" type="button"><b>🔗</b><span>Copy Link</span><small>Copy site address</small></button><button class="card mini-card" id="utilityDevice" type="button"><b>📱</b><span>Device Info</span><small>Browser & device basics</small></button><button class="card mini-card" id="utilityNetwork" type="button"><b>🌐</b><span>Network Status</span><small>Online / offline state</small></button>';
    section.appendChild(grid);
    document.getElementById('utilityShare').onclick=()=>document.getElementById('shareDroidX')?.click();
    document.getElementById('utilityCopy').onclick=()=>document.getElementById('copyDroidX')?.click();
    document.getElementById('utilityDevice').onclick=()=>document.getElementById('deviceInfo')?.click();
    document.getElementById('utilityNetwork').onclick=()=>document.getElementById('networkStatus')?.click();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',repairUtilities,{once:true});else repairUtilities();
})();
