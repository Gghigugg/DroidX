/* DroidX — Android shortcut reliability layer
   Keeps the existing UI but replaces the fragile intent launcher with
   Android Chrome-friendly intent formats and a safe Settings fallback. */
(()=>{
  const ACTIONS={
    settings:'android.settings.SETTINGS',wifi:'android.settings.WIFI_SETTINGS',bluetooth:'android.settings.BLUETOOTH_SETTINGS',location:'android.settings.LOCATION_SOURCE_SETTINGS',display:'android.settings.DISPLAY_SETTINGS',sound:'android.settings.SOUND_SETTINGS',audio:'android.settings.SOUND_SETTINGS',security:'android.settings.SECURITY_SETTINGS',battery:'android.settings.BATTERY_SETTINGS',apps:'android.settings.APPLICATION_SETTINGS',appsettings:'android.settings.MANAGE_APPLICATIONS_SETTINGS',appnotifications:'android.settings.APP_NOTIFICATION_SETTINGS',defaultapps:'android.settings.MANAGE_DEFAULT_APPS_SETTINGS',storage:'android.settings.INTERNAL_STORAGE_SETTINGS',permissions:'android.settings.MANAGE_SPECIAL_APP_ACCESSES',unknownapps:'android.settings.MANAGE_UNKNOWN_APP_SOURCES',specialaccess:'android.settings.MANAGE_SPECIAL_APP_ACCESSES',usage:'android.settings.USAGE_ACCESS_SETTINGS',batteryusage:'android.settings.BATTERY_SAVER_SETTINGS',appsearch:'android.settings.APPLICATION_SETTINGS',manageapps:'android.settings.MANAGE_APPLICATIONS_SETTINGS',language:'android.settings.LOCALE_SETTINGS',datetime:'android.settings.DATE_SETTINGS',home:'android.settings.HOME_SETTINGS',keyboard:'android.settings.INPUT_METHOD_SETTINGS',data:'android.settings.DATA_USAGE_SETTINGS',accessibility:'android.settings.ACCESSIBILITY_SETTINGS',search:'android.settings.SEARCH_SETTINGS',device:'android.settings.DEVICE_INFO_SETTINGS',biometrics:'android.settings.BIOMETRIC_ENROLL',network:'android.settings.WIRELESS_SETTINGS',privacy:'android.settings.PRIVACY_SETTINGS',notifications:'android.settings.APP_NOTIFICATION_SETTINGS'
  };
  const FALLBACK='This Android shortcut is not supported on this device.';
  const MAIN='android.settings.SETTINGS';
  const toast=()=>document.getElementById('toast');
  const notify=(msg)=>{const t=toast();if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(window.__droidxToastTimer);window.__droidxToastTimer=setTimeout(()=>t.classList.remove('show'),3200)};
  const save=(key)=>{try{const k='droidx-recent-v1';const a=JSON.parse(localStorage.getItem(k)||'[]');localStorage.setItem(k,JSON.stringify([key,...a.filter(x=>x!==key)].slice(0,6)))}catch{}};
  const launch=(action)=>{
    const urls=[
      `intent://#Intent;action=${action};package=com.android.settings;end`,
      `intent://com.android.settings/#Intent;scheme=android-app;action=${action};end`
    ];
    return new Promise(resolve=>{
      let done=false;
      const finish=ok=>{if(done)return;done=true;document.removeEventListener('visibilitychange',vis);clearTimeout(timer);resolve(ok)};
      const vis=()=>{if(document.visibilityState==='hidden')finish(true)};
      document.addEventListener('visibilitychange',vis);
      let index=0;
      const tryNext=()=>{
        if(index>=urls.length){finish(false);return}
        try{window.location.href=urls[index++]}catch{tryNext();return}
        setTimeout(()=>{if(!done)tryNext()},850);
      };
      const timer=setTimeout(()=>finish(false),2200);
      tryNext();
    });
  };
  window.openAndroidSetting=async function(key){
    const action=ACTIONS[key];
    if(!action){notify(FALLBACK);return false}
    if(!/Android/i.test(navigator.userAgent)){notify('Android shortcuts are available on Android devices.');return false}
    save(key);
    const ok=await launch(action);
    if(ok)return true;
    if(action!==MAIN){
      notify('That screen is restricted on this Android version — opening Settings instead.');
      const fallbackOk=await launch(MAIN);
      if(fallbackOk)return true;
    }
    notify(FALLBACK);
    return false;
  };

  const repairUtilities=()=>{
    const section=document.getElementById('utilities');
    if(!section)return;
    if(section.querySelector('#utilityGrid'))return;
    const grid=document.createElement('div');
    grid.id='utilityGrid';grid.className='grid utility-grid';
    grid.innerHTML='<button class="card mini-card" id="utilityShare" type="button"><b>↗️</b><span>Share DroidX</span><small>Share this utility</small></button><button class="card mini-card" id="utilityCopy" type="button"><b>🔗</b><span>Copy Link</span><small>Copy site address</small></button><button class="card mini-card" id="utilityDevice" type="button"><b>📱</b><span>Device Info</span><small>Browser & device basics</small></button><button class="card mini-card" id="utilityNetwork" type="button"><b>🌐</b><span>Network Status</span><small>Online / offline state</small></button>';
    section.appendChild(grid);
    const click=(id,handler)=>document.getElementById(id)?.addEventListener('click',handler);
    click('utilityShare',()=>document.getElementById('shareDroidX')?.click());
    click('utilityCopy',()=>document.getElementById('copyDroidX')?.click());
    click('utilityDevice',()=>document.getElementById('deviceInfo')?.click());
    click('utilityNetwork',()=>document.getElementById('networkStatus')?.click());
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',repairUtilities,{once:true});else repairUtilities();
  // Load the final capture-layer last so existing shortcut-card handlers also use the repaired launcher.
  const repairScript=document.createElement('script');repairScript.src='./button-repair.js?v=1';repairScript.defer=false;document.body.appendChild(repairScript);
})();