/* DroidX Liquid OS — lightweight navigation + moving liquid selection + fast Android intents */
(()=>{
  const init=()=>{
    const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const ripple=(x,y)=>{
      if(reduced)return;
      const r=document.createElement('span');r.className='liquid-os-ripple';r.style.left=x+'px';r.style.top=y+'px';document.body.appendChild(r);setTimeout(()=>r.remove(),420);
    };

    // Fast Android settings launcher. Navigation is requested immediately;
    // the short timer only reports unsupported intents and never delays launch.
    const FAST_ACTIONS={settings:'android.settings.SETTINGS',wifi:'android.settings.WIFI_SETTINGS',bluetooth:'android.settings.BLUETOOTH_SETTINGS',location:'android.settings.LOCATION_SOURCE_SETTINGS',display:'android.settings.DISPLAY_SETTINGS',sound:'android.settings.SOUND_SETTINGS',audio:'android.settings.SOUND_SETTINGS',security:'android.settings.SECURITY_SETTINGS',battery:'android.settings.BATTERY_SAVER_SETTINGS',apps:'android.settings.APPLICATION_SETTINGS',appsettings:'android.settings.MANAGE_APPLICATIONS_SETTINGS',appnotifications:'android.settings.APP_NOTIFICATION_SETTINGS',defaultapps:'android.settings.MANAGE_DEFAULT_APPS_SETTINGS',storage:'android.settings.INTERNAL_STORAGE_SETTINGS',permissions:'android.settings.MANAGE_SPECIAL_APP_ACCESSES',unknownapps:'android.settings.MANAGE_UNKNOWN_APP_SOURCES',specialaccess:'android.settings.MANAGE_SPECIAL_APP_ACCESSES',usage:'android.settings.USAGE_ACCESS_SETTINGS',batteryusage:'android.settings.BATTERY_SAVER_SETTINGS',appsearch:'android.settings.APPLICATION_SETTINGS',manageapps:'android.settings.MANAGE_APPLICATIONS_SETTINGS',language:'android.settings.LOCALE_SETTINGS',datetime:'android.settings.DATE_SETTINGS',home:'android.settings.HOME_SETTINGS',keyboard:'android.settings.INPUT_METHOD_SETTINGS',data:'android.settings.DATA_USAGE_SETTINGS',accessibility:'android.settings.ACCESSIBILITY_SETTINGS',search:'android.settings.SEARCH_SETTINGS',device:'android.settings.DEVICE_INFO_SETTINGS',biometrics:'android.settings.BIOMETRIC_ENROLL',network:'android.settings.WIRELESS_SETTINGS',privacy:'android.settings.PRIVACY_SETTINGS',notifications:'android.settings.NOTIFICATION_SETTINGS'};
    const oldOpen=window.openAndroidSetting;
    window.openAndroidSetting=(key)=>{
      const action=FAST_ACTIONS[key];
      if(!action){if(typeof window.showToast==='function')window.showToast();return}
      if(!/Android/i.test(navigator.userAgent)){if(typeof window.showToast==='function')window.showToast('This shortcut is available on Android devices.');return}
      try{
        const list=JSON.parse(localStorage.getItem('droidx-recent-v1')||'[]');localStorage.setItem('droidx-recent-v1',JSON.stringify([key,...list.filter(x=>x!==key)].slice(0,6)));
      }catch{}
      let left=true;
      const hidden=()=>{left=false;document.removeEventListener('visibilitychange',hidden)};
      document.addEventListener('visibilitychange',hidden,{once:true});
      const timer=setTimeout(()=>{document.removeEventListener('visibilitychange',hidden);if(left&&typeof window.showToast==='function')window.showToast('This Android shortcut is not supported on this device.');},650);
      try{window.location.href=`intent:#Intent;action=${action};end`}
      catch(e){clearTimeout(timer);document.removeEventListener('visibilitychange',hidden);if(oldOpen)oldOpen(key)}
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
        indicator.style.left=Math.round(b.left-nb.left)+'px';indicator.style.width=Math.round(b.width)+'px';
        indicator.style.top=Math.round(b.top-nb.top)+'px';indicator.style.height=Math.round(b.height)+'px';
      };
      const sync=()=>moveIndicator(nav.querySelector('.nav-item.active')||items[0],false);
      items.forEach(item=>item.addEventListener('click',()=>requestAnimationFrame(()=>moveIndicator(item,true)),{passive:true}));
      const observer=new MutationObserver(sync);items.forEach(item=>observer.observe(item,{attributes:true,attributeFilter:['class']}));
      requestAnimationFrame(sync);addEventListener('resize',()=>requestAnimationFrame(sync),{passive:true});
    }
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
