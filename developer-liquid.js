/* DroidX Developer Liquid + compatibility button bridge */
(()=>{
  const boot=()=>{
    const card=document.querySelector('.developer-liquid');
    if(card&&!card.dataset.ready){
      card.dataset.ready='1';
      const avatar=card.querySelector('.developer-avatar');
      if(avatar&&window.DROIDX_DEVELOPER_IMAGE){avatar.innerHTML='<img src="'+window.DROIDX_DEVELOPER_IMAGE+'" alt="SOMESH — DroidX developer">';avatar.setAttribute('aria-hidden','false')}
      card.addEventListener('pointerdown',()=>card.classList.add('developer-liquid-pressed'),{passive:true});
      const up=()=>card.classList.remove('developer-liquid-pressed');
      card.addEventListener('pointerup',up,{passive:true});card.addEventListener('pointercancel',up,{passive:true});
    }
    const ACTIONS={settings:'android.settings.SETTINGS',wifi:'android.settings.WIFI_SETTINGS',bluetooth:'android.settings.BLUETOOTH_SETTINGS',location:'android.settings.LOCATION_SOURCE_SETTINGS',display:'android.settings.DISPLAY_SETTINGS',sound:'android.settings.SOUND_SETTINGS',audio:'android.settings.SOUND_SETTINGS',security:'android.settings.SECURITY_SETTINGS',battery:'android.settings.BATTERY_SAVER_SETTINGS',apps:'android.settings.APPLICATION_SETTINGS',appsettings:'android.settings.MANAGE_APPLICATIONS_SETTINGS',appnotifications:'android.settings.APP_NOTIFICATION_SETTINGS',defaultapps:'android.settings.MANAGE_DEFAULT_APPS_SETTINGS',storage:'android.settings.INTERNAL_STORAGE_SETTINGS',permissions:'android.settings.MANAGE_SPECIAL_APP_ACCESSES',unknownapps:'android.settings.MANAGE_UNKNOWN_APP_SOURCES',specialaccess:'android.settings.MANAGE_SPECIAL_APP_ACCESSES',usage:'android.settings.USAGE_ACCESS_SETTINGS',batteryusage:'android.settings.BATTERY_SAVER_SETTINGS',appsearch:'android.settings.APPLICATION_SETTINGS',manageapps:'android.settings.MANAGE_APPLICATIONS_SETTINGS',language:'android.settings.LOCALE_SETTINGS',datetime:'android.settings.DATE_SETTINGS',home:'android.settings.HOME_SETTINGS',keyboard:'android.settings.INPUT_METHOD_SETTINGS',data:'android.settings.DATA_USAGE_SETTINGS',accessibility:'android.settings.ACCESSIBILITY_SETTINGS',search:'android.settings.SEARCH_SETTINGS',device:'android.settings.DEVICE_INFO_SETTINGS',biometrics:'android.settings.BIOMETRIC_ENROLL',network:'android.settings.WIRELESS_SETTINGS',privacy:'android.settings.PRIVACY_SETTINGS',notifications:'android.settings.NOTIFICATION_SETTINGS'};
    window.DROIDX_ACTIONS=ACTIONS;
    /* Keep the known-working Android intent bridge while covering every shortcut key. */
    window.openAndroidSetting=(key)=>{
      const action=ACTIONS[key];
      if(!action){if(typeof window.showToast==='function')window.showToast('Shortcut not available.');return;}
      if(!/Android/i.test(navigator.userAgent)){if(typeof window.showToast==='function')window.showToast('This shortcut is available on Android devices.');return;}
      try{
        const list=JSON.parse(localStorage.getItem('droidx-recent-v1')||'[]');
        localStorage.setItem('droidx-recent-v1',JSON.stringify([key,...list.filter(x=>x!==key)].slice(0,6)));
      }catch{}
      const uri=key==='settings'?'intent://com.android.settings/#Intent;scheme=android-app;end':`intent://com.android.settings/#Intent;scheme=android-app;action=${action};end`;
      try{window.location.assign(uri)}catch(e){if(typeof window.showToast==='function')window.showToast('This browser blocked the Android shortcut. Try Chrome.')}
    };
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
