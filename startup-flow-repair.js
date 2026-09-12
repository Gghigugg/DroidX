/* DroidX startup flow repair
   Loading -> Developer popup -> Location popup -> clean Live Device Info.
   Camera permission is intentionally not part of this flow. */
(()=>{
  const hidePermissionControls=()=>{
    const style=document.createElement('style');
    style.id='droidxStartupCleanStyle';
    style.textContent='#liveDeviceCard .live-device-footer{display:none!important}';
    if(!document.getElementById(style.id))document.head.appendChild(style);
  };
  let shown=false;
  const showLocationAfterDeveloper=()=>{
    if(shown)return;
    shown=true;
    hidePermissionControls();
    const btn=document.getElementById('requestLocation');
    if(btn){setTimeout(()=>btn.click(),220);return}
    setTimeout(()=>{
      const retry=document.getElementById('requestLocation');
      if(retry)retry.click();
    },500);
  };
  const watch=()=>{
    hidePermissionControls();
    const find=()=>document.getElementById('developerPopup');
    let popup=find();
    if(!popup){
      const observer=new MutationObserver(()=>{
        popup=find();
        if(!popup)return;
        observer.disconnect();
        const removal=new MutationObserver(()=>{
          if(!find()){removal.disconnect();showLocationAfterDeveloper()}
        });
        removal.observe(document.body,{childList:true,subtree:true});
      });
      observer.observe(document.body,{childList:true,subtree:true});
      return;
    }
    const removal=new MutationObserver(()=>{
      if(!find()){removal.disconnect();showLocationAfterDeveloper()}
    });
    removal.observe(document.body,{childList:true,subtree:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watch,{once:true});else watch();
})();
