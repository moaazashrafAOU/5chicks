(() => {
  const translations = [
    ['#clients .eyebrow','عملاؤنا'],['#clients .small-note','إبداع يجمعنا. وطموح مشترك.'],['#clients-title','عملاء اشتغلنا<br><span>معاهم.</span>'],['.clients-intro>p','علامات تجارية شاركنا رحلتها. <br>وحكايات ساعدنا إنها توصل.'],
    ['.skip-link','انتقل إلى أعمالنا'],
    ['.nav nav a[href="#work"]','أعمالنا <span>↘</span>'],['.nav nav a[href="#services"]','خدماتنا'],['.nav nav a[href="#portfolio"]','البورتفوليو'],['.nav nav a[href="#about"]','عن الشركة'],['.nav nav a[href="#chicks"]','شخصياتنا'],['.nav-contact','خلّينا نتكلم <span>↗</span>'],
    ['.hero-topline>span:first-child','<i class="live-dot"></i> اتعرّف على 5CHICKS / بيتك الإبداعي'],['.hero-topline>span:last-child','بيت إبداعي متكامل'],
    ['#hero-title','حجمنا صغير.<br><span class="energy">إبداعنا كبير<span class="period">.</span></span>'],
    ['.hero-copy>.button','اكتشف خدماتنا <span>↘</span>'],['.coordinate-top','من الفكرة للتأثير ↗'],['.coordinate-bottom','خمس قوى إبداعية في حركة'],['.art-sticker>span','اختلاف في التفكير.<br>شخصية في كل تفصيلة.'],['.art-label','<span>إبداع</span> في كل تفصيلة'],['.hero-bottom>span','استراتيجية بروح إبداعية.'],['.hero-bottom>a','اكتشف أكتر <span>↓</span>'],
    ['.ticker-track>span','هنا بتبدأ الأفكار <b>✳</b> اتخلقنا علشان نتميّز <b>✳</b> خمس عقول. بلا حدود. <b>✳</b> '],
    ['#about .eyebrow','إحنا مين'],['#about-title','خمس قوى.<br><span>بيت<br>واحد.</span>'],['.about-details>.text-link','اكتشف الخدمة المناسبة لمشروعك <span>↓</span>'],['.company-principles article:first-child>span','رسالتنا'],['.company-principles article:last-child>span','رؤيتنا'],
    ['#services .eyebrow','بنقدّم إيه'],['#services .small-note','من أول فكرة لآخر تفصيلة.'],['#services-title','خمس طرق<br><span class="outline">نطوّر بيها فكرتك.</span>'],['#services .work-heading>p','تفكير إبداعي. خدمات متكاملة.<br>صورة كاملة لعلامتك التجارية.'],
    ['#work>.section-top .eyebrow','أعمالنا'],['#work>.section-top .small-note','كلام أقل. شغل أكتر.'],['#work-title','شغل يستاهل<br><span class="outline">توقف عنده.</span>'],['#work>.work-heading>p','ثلاثة أشكال. لكل واحد مساحته.<br>اكتشف كل مجموعة بنفسك.'],
    ['.work-jumps a[href="#reels"]','ريلز ↓'],['.work-jumps a[href="#films"]','أفلام ↓'],['.work-jumps a[href="#sketches"]','سكتشات ↓'],['.row-heading .eyebrow','من أعمالنا'],['#reels-title','ريلز'],['#films-title','أفلام'],['#sketches-title','سكتشات'],['#reels .row-heading>p','حكايات قصيرة. معمولة للحظة.'],['#films .row-heading>p','رؤية سينمائية. وحكايات تستاهل وقتك.'],['#sketches .row-heading>p','شخصيات ومشاهد وأفكار ليها روح.'],['.preview-note','مختارات من الريلز والأفلام والسكتشات من أعمالنا'],
    ['.portfolio-art>span','الشركة. الشغل. الحكاية كاملة.'],['.portfolio-copy>.eyebrow','خد نظرة أقرب'],['#portfolio-title','الصورة<br><span>الكاملة.</span>'],['.portfolio-copy>p','اتعرّف على شركتنا وخدماتنا ومختارات من أعمالنا. كلها في بورتفوليو واحد.'],['#openPortfolio','شوف البورتفوليو <span>↗</span>'],['.download-link','تحميل PDF <span>↓</span>'],['.pdf-detail','بورتفوليو الشركة / PDF / 40.8 MB'],
    ['#chicks .eyebrow','شخصيتنا الإبداعية'],['#chicks .small-note','خمس شخصيات. روح واحدة.'],['#chicks-title','مش أي<br><span>فريق وخلاص.</span>'],['.crew-side:first-child','مختلفين في تفكيرنا.'],['.crew-side:last-child','أقوى مع بعض.'],
    ['.dna-grid article:nth-child(1)>span','المرونة'],['.dna-grid article:nth-child(2)>span','التفكير'],['.dna-grid article:nth-child(3)>span','الإبداع'],['.dna-grid article:nth-child(4)>span','الثبات'],['.dna-grid article:nth-child(5)>span','الإتقان'],
    ['.dna-grid article:nth-child(1)>p','تحدّي جديد؟<br>هنلاقي طريق جديد.'],['.dna-grid article:nth-child(2)>p','نظرة مختلفة.<br>وفكرة أوضح.'],['.dna-grid article:nth-child(3)>p','فضول بلا حدود.<br>وفرص في كل اتجاه.'],['.dna-grid article:nth-child(4)>p','أساس قوي.<br>ومساحة للتطور.'],['.dna-grid article:nth-child(5)>p','اهتمام بكل تفصيلة.<br>وإتقان في كل خطوة.'],
    ['#contact .eyebrow','فكرتك الكبيرة الجاية بتبدأ هنا.'],['#contact-title','يلا نبدأ<br>حاجة <span>كبيرة.</span>'],['.contact-bottom>.button','خلّينا نتكلم <span>↗</span>'],['.contact-bottom>p','هات الفكرة.<br>وإحنا نجيب الإبداع.'],['footer>span','© <span id="year">'+new Date().getFullYear()+'</span> 5CHICKS — بيت إبداعي'],['footer>a:last-child','الرجوع للأعلى ↑'],
    ['#portfolioDialogTitle','5CHICKS / البورتفوليو'],['.pdf-toolbar>a:not([download])','افتح PDF ↗'],['.pdf-toolbar>a[download]','تحميل ↓'],['.pdf-help','مرّر لاستكشاف الأعمال. استخدم + للتكبير، أو افتح وحمّل ملف PDF الأصلي.']
  ];
  const ui = {
    'Play video':'تشغيل الفيديو','Pause video':'إيقاف الفيديو مؤقتًا','Unmute video':'تشغيل الصوت','Mute video':'كتم الصوت','Show video fullscreen':'عرض الفيديو بملء الشاشة','READY TO PLAY':'جاهز للتشغيل','● NOW PLAYING':'● يعرض الآن','VIDEO UNAVAILABLE':'الفيديو غير متاح','FULLSCREEN UNAVAILABLE':'ملء الشاشة غير متاح','SOUND OFF':'الصوت مكتوم','SOUND ON':'الصوت شغّال','New stories are on the way.':'حكايات جديدة في الطريق.',
    'Made for the moment.':'حكايات على قدّ اللحظة.','Think in cinema.':'فكّر بصورة سينمائية.','Every story starts somewhere.':'كل حكاية بتبدأ بفكرة.',
    'REELS / MOTION PREVIEW':'ريلز / نموذج تجريبي','FILMS / MOTION PREVIEW':'أفلام / نموذج تجريبي','SKETCHES / MOTION PREVIEW':'سكتشات / نموذج تجريبي'
  };
  const attributes = [
    ['.nav nav','aria-label','التنقل الرئيسي'],['.logo-link,footer>a:first-child','aria-label','الصفحة الرئيسية لـ 5CHICKS'],['.work-jumps','aria-label','أقسام الأعمال'],['#closePortfolio','aria-label','إغلاق البورتفوليو'],['#portfolioFrame','title','بورتفوليو شركة 5CHICKS'],
    ['.heart-element','alt','قلبان باللون الأخضر داخل فقاعات زجاجية'],['.crew-stage>img','alt','خمس شخصيات تمثل المرونة والتفكير والإبداع والثبات والإتقان']
  ];
  translations.forEach(([selector,arabic])=>document.querySelectorAll(selector).forEach(node=>{node.dataset.english=node.innerHTML;node.dataset.arabic=arabic;}));
  attributes.forEach(([selector,attribute,arabic])=>document.querySelectorAll(selector).forEach(node=>{node.setAttribute('data-en-'+attribute,node.getAttribute(attribute)||'');}));
  window.translateUI = text => document.documentElement.lang==='ar' ? ui[text] || text : text;
  function setLanguage(language) {
    const ar=language==='ar';
    document.documentElement.lang=language;document.documentElement.dir=ar?'rtl':'ltr';
    document.title=ar?'5CHICKS — حجمنا صغير. إبداعنا كبير.':'5CHICKS — Small chicks. Big energy.';
    document.querySelector('meta[name="description"]').content=ar?'5CHICKS بيت إبداعي يجمع الهوية التجارية والتسويق الرقمي والبرمجيات والإنتاج الإعلامي والفنون البصرية.':'5CHICKS is a creative house powered by five creative forces. Branding, digital marketing, software, media production and visual art.';
    document.querySelectorAll('[data-english]').forEach(node=>{node.innerHTML=ar?node.dataset.arabic:node.dataset.english;});
    attributes.forEach(([selector,attribute,arabic])=>document.querySelectorAll(selector).forEach(node=>node.setAttribute(attribute,ar?arabic:node.getAttribute('data-en-'+attribute))));
    window.renderContent(language);
    document.querySelectorAll('.carousel').forEach(row=>{
      const type=row.dataset.collection;const label={reels:'الريلز',films:'الأفلام',sketches:'السكتشات'}[type];
      row.setAttribute('aria-label',ar?'مجموعة '+label:type+' video collection');
      row.setAttribute('aria-roledescription',ar?'سلايدر':'carousel');
      row.querySelector('.previous-slide').setAttribute('aria-label',ar?'الفيديو السابق في '+label:'Previous '+type+' video');
      row.querySelector('.next-slide').setAttribute('aria-label',ar?'الفيديو التالي في '+label:'Next '+type+' video');
    });
    window.refreshWorkLanguage?.();
    window.refreshClientsLanguage?.();
    window.upgradeIcons();
    const toggle=document.getElementById('languageToggle');toggle.textContent=ar?'English':'العربية';toggle.lang=ar?'en':'ar';toggle.setAttribute('aria-label',ar?'Switch to English':'التبديل للعربية');
    try{localStorage.setItem('5chicks-language',language);}catch{}
    const frame=document.getElementById('portfolioFrame');if(frame.getAttribute('src'))frame.src='portfolio-preview.html?lang='+language;
  }
  document.getElementById('languageToggle').addEventListener('click',()=>setLanguage(document.documentElement.lang==='ar'?'en':'ar'));
let initial='en';try{initial=localStorage.getItem('5chicks-language')||'en';}catch{}
const query=new URLSearchParams(location.search).get('lang');if(query==='ar'||query==='en')initial=query;
  setLanguage(initial==='en'?'en':'ar');
})();
