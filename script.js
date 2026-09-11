// DroidX: Android Settings shortcut controller
const ACTIONS={
 settings:'android.settings.SETTINGS',wifi:'android.settings.WIFI_SETTINGS',bluetooth:'android.settings.BLUETOOTH_SETTINGS',location:'android.settings.LOCATION_SOURCE_SETTINGS',display:'android.settings.DISPLAY_SETTINGS',sound:'android.settings.SOUND_SETTINGS',security:'android.settings.SECURITY_SETTINGS',battery:'android.settings.BATTERY_SAVER_SETTINGS',apps:'android.settings.APPLICATION_SETTINGS',language:'android.settings.LOCALE_SETTINGS',datetime:'android.settings.DATE_SETTINGS',home:'android.settings.HOME_SETTINGS',keyboard:'android.settings.INPUT_METHOD_SETTINGS',data:'android.settings.DATA_USAGE_SETTINGS',accessibility:'android.settings.ACCESSIBILITY_SETTINGS',search:'android.settings.SEARCH_SETTINGS',device:'android.settings.DEVICE_INFO_SETTINGS',biometrics:'android.settings.BIOMETRIC_ENROLL',network:'android.settings.WIRELESS_SETTINGS',privacy:'android.settings.PRIVACY_SETTINGS',notifications:'android.settings.APP_NOTIFICATION_SETTINGS'
};
const FALLBACK='Your browser/device does not support this shortcut.';
const toast=document.getElementById('toast');
let toastTimer;
function showToast(message=FALLBACK){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3600)}
function openAndroidSetting(key){
  const action=ACTIONS[key];
  if(!action){showToast();return}
  if(!/Android/i.test(navigator.userAgent)){showToast(FALLBACK);return}
  let failed=true;
  const onHide=()=>{failed=false;document.removeEventListener('visibilitychange',onHide)};
  document.addEventListener('visibilitychange',onHide);
  const timer=setTimeout(()=>{document.removeEventListener('visibilitychange',onHide);if(failed)showToast()},1500);
  try{
    // Chrome/Android may accept intent:// deep links; support varies by browser/version.
    window.location.href=`intent:#Intent;action=${action};end`;
  }catch(e){clearTimeout(timer);document.removeEventListener('visibilitychange',onHide);showToast()}
}
document.querySelectorAll('[data-intent]').forEach(el=>el.addEventListener('click',()=>openAndroidSetting(el.dataset.intent)));
document.getElementById('year').textContent=new Date().getFullYear();
// Keyboard users can activate shortcut cards like normal buttons.
document.querySelectorAll('.card').forEach(card=>card.setAttribute('aria-label',card.textContent.trim().replace(/\s+/g,' ')));
