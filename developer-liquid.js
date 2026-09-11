/* DroidX Developer Liquid + compatibility button bridge */
(()=>{
  const boot=()=>{
    const card=document.querySelector('.developer-liquid');
    if(card&&!card.dataset.ready){
      card.dataset.ready='1';
      card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=((e.clientX-r.left)/r.width)*100;const y=((e.clientY-r.top)/r.height)*100;card.style.setProperty('--mx',x+'%');card.style.setProperty('--my',y+'%');card.style.setProperty('--water-x',((x-50)/50*7).toFixed(2)+'px');card.style.setProperty('--water-y',((y-50)/50*5).toFixed(2)+'px')},{passive:true});
      card.addEventListener('pointerdown',()=>card.classList.add('developer-liquid-pressed'));
      const up=()=>card.classList.remove('developer-liquid-pressed');
      card.addEventListener('pointerup',up);card.addEventListener('pointercancel',up);card.addEventListener('pointerleave',up);
    }
    /* Restore the known-working Android intent pattern supplied for DroidX. */
    window.openAndroidSetting=(key)=>{
      const action=window.DROIDX_ACTIONS?.[key]||({settings:'android.settings.SETTINGS',wifi:'android.settings.WIFI_SETTINGS',bluetooth:'android.settings.BLUETOOTH_SETTINGS',location:'android.settings.LOCATION_SOURCE_SETTINGS',display:'android.settings.DISPLAY_SETTINGS',sound:'android.settings.SOUND_SETTINGS',battery:'android.settings.BATTERY_SAVER_SETTINGS',apps:'android.settings.APPLICATION_SETTINGS',language:'android.settings.LOCALE_SETTINGS',datetime:'android.settings.DATE_SETTINGS',home:'android.settings.HOME_SETTINGS',keyboard:'android.settings.INPUT_METHOD_SETTINGS',data:'android.settings.DATA_USAGE_SETTINGS',accessibility:'android.settings.ACCESSIBILITY_SETTINGS',search:'android.settings.SEARCH_SETTINGS',device:'android.settings.DEVICE_INFO_SETTINGS',biometrics:'android.settings.BIOMETRIC_ENROLL',network:'android.settings.WIRELESS_SETTINGS',privacy:'android.settings.PRIVACY_SETTINGS',notifications:'android.settings.APP_NOTIFICATION_SETTINGS',audio:'android.settings.SOUND_SETTINGS'})[key];
      if(!action){if(typeof window.showToast==='function')window.showToast();return;}
      const uri=key==='settings'?'intent://com.android.settings/#Intent;scheme=android-app;end':`intent://com.android.settings/#Intent;scheme=android-app;action=${action};end`;
      try{window.location.assign(uri)}catch(e){if(typeof window.showToast==='function')window.showToast('This browser blocked the Android shortcut. Try Chrome.')}
    };
    window.DROIDX_ACTIONS={settings:'android.settings.SETTINGS',wifi:'android.settings.WIFI_SETTINGS',bluetooth:'android.settings.BLUETOOTH_SETTINGS',location:'android.settings.LOCATION_SOURCE_SETTINGS',display:'android.settings.DISPLAY_SETTINGS',sound:'android.settings.SOUND_SETTINGS',battery:'android.settings.BATTERY_SAVER_SETTINGS',apps:'android.settings.APPLICATION_SETTINGS',language:'android.settings.LOCALE_SETTINGS',datetime:'android.settings.DATE_SETTINGS',home:'android.settings.HOME_SETTINGS',keyboard:'android.settings.INPUT_METHOD_SETTINGS',data:'android.settings.DATA_USAGE_SETTINGS',accessibility:'android.settings.ACCESSIBILITY_SETTINGS',search:'android.settings.SEARCH_SETTINGS',device:'android.settings.DEVICE_INFO_SETTINGS',biometrics:'android.settings.BIOMETRIC_ENROLL',network:'android.settings.WIRELESS_SETTINGS',privacy:'android.settings.PRIVACY_SETTINGS',notifications:'android.settings.APP_NOTIFICATION_SETTINGS',audio:'android.settings.SOUND_SETTINGS'};
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
