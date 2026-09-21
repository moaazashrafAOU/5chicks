(() => {
  const section = document.getElementById('clients');
  const track = document.getElementById('clientsTrack');
  const toggle = document.getElementById('clientsToggle');
  const note = document.getElementById('clientsNote');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const clients = (window.CLIENTS || []).filter(client => client.name && client.logo);
  let paused = reduce.matches;
  let explicitlyPlaying = false;
  const ar = () => document.documentElement.lang === 'ar';
  function updateControls() {
    toggle.textContent = ar() ? (paused ? 'تشغيل الحركة' : 'إيقاف الحركة مؤقتًا') : (paused ? 'Play motion' : 'Pause motion');
    toggle.setAttribute('aria-pressed', String(paused));
    section.classList.toggle('clients-paused', paused);
    section.classList.toggle('clients-manual-play', explicitlyPlaying);
  }
  function render() {
    track.replaceChildren();
    section.querySelector('.clients-window').setAttribute('aria-label', ar() ? 'لوجوهات العملاء' : 'Client logos');
    note.textContent = clients.length ? '' : ar() ? 'مساحات مؤقتة للعرض — لوجوهات العملاء هتضاف قريبًا.' : 'Preview spaces — client logos will be added soon.';
    note.hidden = clients.length > 0;
    const source = clients.length ? clients : Array.from({length:6}, () => null);
    const minimum = Math.ceil(section.clientWidth / (innerWidth < 600 ? 170 : 228)) + 1;
    const count = Math.max(source.length, Math.ceil(minimum / source.length) * source.length);
    for (let groupIndex=0;groupIndex<2;groupIndex++) {
      const group = document.createElement('div');group.className='clients-group';group.setAttribute('role','list');
      if(groupIndex){group.setAttribute('aria-hidden','true');group.inert=true;}
      for(let i=0;i<count;i++) {
        const client=source[i%source.length];
        const card=document.createElement('div');card.className='client-logo';card.setAttribute('role','listitem');
        if(i>=source.length || !client)card.setAttribute('aria-hidden','true');
        if(client) {
          if(client.theme==='dark')card.classList.add('client-logo-dark');
          const img=document.createElement('img');img.src=client.logo;img.alt=ar()?(client.nameAr || client.name):client.name;img.decoding='async';
          img.addEventListener('error',()=>{const fallback=document.createElement('span');fallback.className='client-name';fallback.textContent=img.alt;img.replaceWith(fallback);},{once:true});
          card.append(img);
        } else {
          card.classList.add('client-placeholder');
          const mark=document.createElement('span');mark.className='placeholder-mark';mark.textContent='LOGO';
          const caption=document.createElement('span');caption.textContent=ar()?'لوجو العميل قريبًا':'CLIENT LOGO COMING SOON';
          card.append(mark,caption);
        }
        group.append(card);
      }
      track.append(group);
    }
    // Identical groups share one translation cycle, so the loop has no blank frame.
    track.style.setProperty('--clients-duration', Math.max(24,count*3.5)+'s');
    updateControls();
  }
  toggle.addEventListener('click',()=>{paused=!paused;explicitlyPlaying=!paused;updateControls();});
  reduce.addEventListener('change',()=>{paused=reduce.matches;explicitlyPlaying=false;updateControls();});
  new IntersectionObserver(entries=>section.classList.toggle('clients-offscreen',!entries[0].isIntersecting),{threshold:0}).observe(section);
  document.addEventListener('visibilitychange',()=>section.classList.toggle('clients-background',document.hidden));
  let previousWidth=0;
  new ResizeObserver(entries=>{const width=Math.round(entries[0].contentRect.width);if(width!==previousWidth){previousWidth=width;render();}}).observe(section);
  window.refreshClientsLanguage=render;
  render();
})();
