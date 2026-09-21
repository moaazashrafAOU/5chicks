(() => {
  'use strict';
  const items = window.WORK_ITEMS || [];
  const t = text => window.translateUI?.(text) || text;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const dialog = document.getElementById('portfolioDialog');
  const rows = [];
  let muted = true;
  let scrollFrame = 0;
  let manualRow = null;
  const create = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = t(text);
    return node;
  };
  function visibility(row) {
    const card = row.cards[row.active];
    if (!card) return null;
    if (document.fullscreenElement === card.slide) return {row, distance: -1};
    const rect = card.slide.getBoundingClientRect();
    const visible = Math.max(0, Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 80));
    if (visible < Math.min(rect.height, innerHeight - 80) * .5) return null;
    return {row, distance: Math.abs((rect.top + rect.bottom) / 2 - (innerHeight + 80) / 2)};
  }
  function desiredVideo() {
    if (document.hidden || dialog.open) return null;
    const candidates = rows.map(visibility).filter(Boolean).sort((a,b) => a.distance - b.distance);
    const full = candidates.find(candidate => candidate.distance === -1);
    const row = full?.row || (manualRow && visibility(manualRow) ? manualRow : candidates[0]?.row);
    if (!row || row.transitioning || row.userPaused || (reducedMotion.matches && !row.manual)) return null;
    const card = row.cards[row.active];
    return card.error ? null : card.video;
  }
  function syncPlayback() {
    const target = desiredVideo();
    rows.forEach(row => row.cards.forEach(card => {
      if (card.video !== target) {
        card.video.pause();
        if (card.video.hasAttribute('src')) {
          card.resumeTime = card.video.currentTime || 0;
          card.video.removeAttribute('src');
          card.video.load();
        }
      }
    }));
    if (target && target.paused) {
      const card = rows.flatMap(row => row.cards).find(card => card.video === target);
      if (!card.pending) {
        card.pending = true;
        if (!target.hasAttribute('src')) target.src = target.dataset.src;
        target.play().catch(() => {}).finally(() => { card.pending = false; });
      }
    }
  }
  document.querySelectorAll('.carousel[data-collection]').forEach(carousel => {
    const category = carousel.dataset.collection;
    const row = {carousel, stage:carousel.querySelector('.carousel-stage'), items:items.filter(item=>item.category===category && item.src), cards:[], active:0, userPaused:false, manual:false, transitioning:false, timer:0};
    rows.push(row);
    let suppressClickUntil = 0;
    row.items.forEach((item, index) => {
      const slide = create('article','slide');
      slide.dataset.category = category;
      slide.setAttribute('role','group');
      slide.setAttribute('aria-roledescription','slide');
      slide.setAttribute('aria-label',`${index+1} of ${row.items.length}: ${item.title}`);
      const video = create('video');
      video.dataset.src=item.src;
      if (item.poster) video.dataset.poster=item.poster;
      video.preload='none';video.muted=true;video.loop=true;video.playsInline=true;
      video.setAttribute('aria-label',item.title);
      const top=create('div','slide-top');
      const status=create('span','slide-live','READY TO PLAY');
      top.append(create('span','slide-badge',item.label || category.toUpperCase()),status);
      const activate=create('button','slide-activate');activate.type='button';activate.setAttribute('aria-label',`Show ${item.title}`);activate.append(create('span','',item.title+' ↗'));
      activate.addEventListener('click',()=>{if(Date.now()>suppressClickUntil) select(index);});
      const controls=create('div','video-controls');
      const play=create('button','play-button','▶');play.type='button';play.setAttribute('aria-label','Play video');
      const sound=create('button','sound-button','♪');sound.type='button';sound.setAttribute('aria-label','Unmute video');sound.setAttribute('aria-pressed','false');
      const full=create('button','fullscreen-button','⛶');full.type='button';full.setAttribute('aria-label','Show video fullscreen');
      controls.append(play,create('span','video-status','SOUND OFF'),sound,full);
      slide.append(video,top,activate,controls);row.stage.append(slide);
      const card={slide,video,status,play,sound,full,activate,controls,error:false,pending:false};row.cards.push(card);
      video.addEventListener('loadedmetadata',()=>{
        if(card.resumeTime>0 && card.resumeTime<video.duration) video.currentTime=card.resumeTime;
      });
      const update=()=>{const playing=!video.paused&&!video.ended;play.textContent=playing?'Ⅱ':'▶';play.setAttribute('aria-label',t(playing?'Pause video':'Play video')); status.textContent=t(card.error?'VIDEO UNAVAILABLE':playing?'● NOW PLAYING':'READY TO PLAY');};
      video.addEventListener('play',()=>{
        if(desiredVideo()!==video){video.pause();return;}
        rows.forEach(other=>other.cards.forEach(c=>{if(c.video!==video)c.video.pause();}));update();
      });
      video.addEventListener('pause',update);
      video.addEventListener('error',()=>{card.error=true;update();controls.querySelector('.video-status').textContent=t('VIDEO UNAVAILABLE');});
      play.addEventListener('click',()=>{
        if(index!==row.active)return;
        manualRow=row;
        if(video.paused){row.userPaused=false;row.manual=true;syncPlayback();}
        else{row.userPaused=true;video.pause();}
      });
      sound.addEventListener('click',()=>{
        muted=!muted;
        rows.forEach(other=>other.cards.forEach(c=>{c.video.muted=muted;c.sound.setAttribute('aria-label',t(muted?'Unmute video':'Mute video'));c.sound.setAttribute('aria-pressed',String(!muted));if(!c.error)c.controls.querySelector('.video-status').textContent=t(muted?'SOUND OFF':'SOUND ON');}));
      });
      full.addEventListener('click',async()=>{
        try {if(document.fullscreenElement)await document.exitFullscreen();else if(slide.requestFullscreen)await slide.requestFullscreen();else if(video.webkitEnterFullscreen)video.webkitEnterFullscreen();}
        catch{status.textContent=t('FULLSCREEN UNAVAILABLE');}
      });
    });
    row.updateLabels=()=>{
      const ar=document.documentElement.lang==='ar';
      row.cards.forEach((card,i)=>{
        const item=row.items[i];const title=ar?(item.titleAr || t(item.title)):item.title;
        card.video.setAttribute('aria-label',title);
        card.slide.setAttribute('aria-label',ar?`${i+1} من ${row.cards.length}: ${title}`:`${i+1} of ${row.cards.length}: ${title}`);
        card.slide.setAttribute('aria-roledescription',ar?'شريحة':'slide');
        card.activate.setAttribute('aria-label',(ar?'عرض ':'Show ')+title);
        card.activate.querySelector('span').textContent=title+' ↗';
        card.slide.querySelector('.slide-badge').textContent=ar?(item.labelAr || t(item.label || category.toUpperCase())):(item.label || category.toUpperCase());
        card.status.textContent=t(card.error?'VIDEO UNAVAILABLE':!card.video.paused?'● NOW PLAYING':'READY TO PLAY');
        card.play.setAttribute('aria-label',t(card.video.paused?'Play video':'Pause video'));
        card.sound.setAttribute('aria-label',t(muted?'Unmute video':'Mute video'));
        card.full.setAttribute('aria-label',t('Show video fullscreen'));
        card.controls.querySelector('.video-status').textContent=t(card.error?'VIDEO UNAVAILABLE':muted?'SOUND OFF':'SOUND ON');
      });
      if(row.items.length){const item=row.items[row.active];carousel.querySelector('.slide-caption').textContent=ar?(item.titleAr||t(item.title)):item.title;}
      else {const empty=carousel.querySelector('.empty-collection');if(empty)empty.textContent=t('New stories are on the way.');}
      window.upgradeIcons?.(carousel);
    };
    row.layout=()=>{
      if(!row.cards.length)return;
      const centerWidth=row.cards[row.active].slide.offsetWidth;
      row.cards.forEach((card,index)=>{
        let offset=(index-row.active+row.cards.length)%row.cards.length;
        if(offset>row.cards.length/2)offset-=row.cards.length;
        const distance=offset===0?0:Math.sign(offset)*(centerWidth/2+card.slide.offsetWidth/2+(innerWidth<600?22:36)+(Math.abs(offset)-1)*(card.slide.offsetWidth+36));
        card.slide.style.transform=`translateX(calc(-50% + ${distance}px)) scale(${offset===0?1:.88})`;
        card.slide.style.zIndex=offset===0?5:4-Math.min(Math.abs(offset),3);
        const visible=Math.abs(offset)<=1;
        card.slide.style.visibility=visible?'visible':'hidden';
        card.slide.setAttribute('aria-hidden',String(!visible));
        card.activate.tabIndex=visible&&offset!==0?0:-1;
        if(visible && row.inRange && card.video.dataset.poster) {
          if(!card.video.hasAttribute('poster'))card.video.poster=card.video.dataset.poster;
        } else card.video.removeAttribute('poster');
      });
    };
    function select(index) {
      if(!row.cards.length)return;
      row.cards.forEach(card=>card.video.pause());
      row.active=(index+row.cards.length)%row.cards.length;
      row.transitioning=true;row.userPaused=false;row.manual=false;
      if(manualRow===row)manualRow=null;
      row.cards.forEach((card,i)=>{const active=i===row.active;card.slide.classList.toggle('is-active',active);[card.play,card.sound,card.full].forEach(button=>button.tabIndex=active?0:-1);});
      carousel.querySelector('.slide-number').textContent=String(row.active+1).padStart(2,'0');
      carousel.querySelector('.slide-total').textContent=String(row.cards.length).padStart(2,'0');
      carousel.querySelector('.progress-line i').style.width=`${(row.active+1)/row.cards.length*100}%`;
      row.updateLabels();
      row.layout();
      clearTimeout(row.timer);
      row.timer=setTimeout(()=>{row.transitioning=false;syncPlayback();},reducedMotion.matches?0:650);
    }
    const previous=carousel.querySelector('.previous-slide'), next=carousel.querySelector('.next-slide');
    previous.disabled=next.disabled=row.cards.length<2;
    previous.addEventListener('click',()=>select(row.active-1));next.addEventListener('click',()=>select(row.active+1));
    carousel.addEventListener('keydown',event=>{
      if(row.cards.length<2)return;
      if(['ArrowRight','ArrowLeft','Home','End'].includes(event.key)){
        event.preventDefault();select(event.key==='Home'?0:event.key==='End'?row.cards.length-1:row.active+(event.key==='ArrowRight'?1:-1));
      }
    });
    let pointerStart=null;
    row.stage.addEventListener('pointerdown',event=>{if(!event.target.closest('.video-controls'))pointerStart={x:event.clientX,y:event.clientY,id:event.pointerId};});
    window.addEventListener('pointerup',event=>{
      if(!pointerStart||event.pointerId!==pointerStart.id)return;
      const x=event.clientX-pointerStart.x,y=event.clientY-pointerStart.y;
      if(row.cards.length>1&&Math.abs(x)>45&&Math.abs(x)>Math.abs(y)*1.3){suppressClickUntil=Date.now()+400;select(row.active+(x<0?1:-1));}
      pointerStart=null;
    });
    window.addEventListener('pointercancel',()=>pointerStart=null);
    if(row.cards.length)select(0);
    else {
      row.stage.append(create('p','empty-collection','New stories are on the way.'));
      carousel.querySelector('.slide-number').textContent='00';carousel.querySelector('.slide-total').textContent='00';
      carousel.querySelector('.progress-line i').style.width='0';
    }
  });
  // Covers are fetched only for the three nearby cards in a collection near the viewport.
  const coverObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      const row=rows.find(r=>r.stage===entry.target);
      row.inRange=entry.isIntersecting;row.layout();
    });
  },{rootMargin:'250px 0px'});
  rows.forEach(row=>coverObserver.observe(row.stage));
  window.refreshWorkLanguage=()=>rows.forEach(row=>{row.updateLabels();row.layout();});
  const schedulePlayback=()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;if(manualRow&&!visibility(manualRow))manualRow=null;syncPlayback();});};
  window.addEventListener('scroll',schedulePlayback,{passive:true});
  window.addEventListener('resize',()=>{rows.forEach(row=>row.layout());schedulePlayback();});
  document.addEventListener('visibilitychange',syncPlayback);
  document.addEventListener('fullscreenchange',()=>{rows.forEach(row=>row.layout());syncPlayback();});
  reducedMotion.addEventListener('change',syncPlayback);
  document.getElementById('year').textContent=new Date().getFullYear();
  const pdfFrame=document.getElementById('portfolioFrame');
  document.getElementById('openPortfolio').addEventListener('click',()=>{dialog.showModal();document.body.classList.add('modal-open');if(!pdfFrame.getAttribute('src'))pdfFrame.src='portfolio-preview.html?lang='+document.documentElement.lang;syncPlayback();});
  document.getElementById('closePortfolio').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');syncPlayback();});
})();
