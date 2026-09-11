/* DroidX location permission — explicit user action only */
(()=>{
  const boot=()=>{
    const card=document.getElementById('locationCard');
    if(!card||card.dataset.ready)return;
    card.dataset.ready='1';
    const getBtn=document.getElementById('getLocation');
    const removeBtn=document.getElementById('removeLocation');
    const manageBtn=document.getElementById('manageLocation');
    const status=document.getElementById('locationStatus');
    const data=document.getElementById('locationData');
    const setStatus=(text,type='')=>{status.textContent=text;status.className='location-status '+type};
    const clear=()=>{data.hidden=true;data.innerHTML='';card.classList.remove('has-location');setStatus('Location data cleared. DroidX will not request it again unless you tap Get Location.')};
    const show=(pos)=>{const c=pos.coords;data.innerHTML=`<div><span>Latitude</span><b>${c.latitude.toFixed(6)}</b></div><div><span>Longitude</span><b>${c.longitude.toFixed(6)}</b></div><div><span>Accuracy</span><b>±${Math.round(c.accuracy)} m</b></div>`;data.hidden=false;card.classList.add('has-location');setStatus('Location permission granted. This page only uses it after your action.','success')};
    getBtn?.addEventListener('click',()=>{
      if(!navigator.geolocation){setStatus('Geolocation is not supported by this browser.','error');return}
      setStatus('Requesting location permission…');
      navigator.geolocation.getCurrentPosition(show,err=>{
        if(err.code===1)setStatus('Permission denied. No location was accessed.','error');
        else if(err.code===2)setStatus('Location is unavailable right now.','error');
        else setStatus('Location request timed out. Try again.','error');
      },{enableHighAccuracy:true,timeout:12000,maximumAge:0});
    });
    removeBtn?.addEventListener('click',clear);
    manageBtn?.addEventListener('click',()=>{
      setStatus('To fully revoke the browser permission, open your browser site settings and set Location to Block.');
      try{navigator.clipboard?.writeText(location.origin)}catch{}
    });
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();