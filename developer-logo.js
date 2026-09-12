/* DroidX developer logo source.
   Upload the real image to ./assets/developer/developer.png */
(()=>{
  const src='./assets/developer/developer.png?v=1';
  window.DROIDX_DEVELOPER_IMAGE=src;
  const apply=()=>{
    document.querySelectorAll('.developer-avatar').forEach(el=>{
      if(el.querySelector('img'))return;
      const img=document.createElement('img');
      img.src=src;
      img.alt='SOMESH — DroidX Developer';
      img.loading='eager';
      img.decoding='async';
      img.onerror=()=>{img.remove()};
      el.replaceChildren(img);
    });
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();
