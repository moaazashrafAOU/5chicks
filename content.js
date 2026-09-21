window.renderContent = (language = "en") => {
  const base = window.SITE_CONTENT || {};
  const translated = language === 'ar' ? window.SITE_CONTENT_AR || {} : {};
  const content = {company: {...base.company, ...translated.company}, services: (base.services || []).map(service => ({...service, ...(translated.services?.[service.id] || {})}))};
  const arabic = language === 'ar';
  const create = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const company = content.company || {};
  for (const [key, id] of Object.entries({heroDescription:'companyHero',lead:'companyLead',mission:'companyMission',vision:'companyVision'})) {
    if (company[key]) document.getElementById(id).textContent = company[key];
  }
  if (company.paragraphs?.length) document.getElementById('companyParagraphs').replaceChildren(...company.paragraphs.map(text => create('p', '', text)));
  const container = document.getElementById('serviceCards');
  container.replaceChildren();
  (content.services || []).forEach((service, index) => {
    const article = create('article', 'service-card');
    article.id = service.id;
    article.style.setProperty('--service-color', service.color || '#00ff87');
    const visual = create('div', 'service-visual');
    const image = create('img');
    image.src = service.image || service.icon;
    image.alt = service.image ? (service.imageAlt || service.title) : '';
    image.loading = 'lazy';
    if (service.image) visual.classList.add('has-project-image');
    visual.append(image);
    const body = create('div','service-body');
    body.append(create('h3','',service.title),create('p','service-tagline',service.tagline),create('p','service-description',service.description));
    const list = create('ul','service-deliverables');
    (service.deliverables || []).forEach(text => list.append(create('li','',text)));
    body.append(list);
    const actions = create('div','service-actions');
    const contact = create('a','',arabic ? 'خلّينا نتكلم عن مشروعك ↗' : 'Let’s discuss your project ↗');contact.href='#contact';actions.append(contact);
    if (service.workLink && service.workLink !== '#contact') {const work=create('a','',arabic ? 'شوف الأعمال ↓' : 'Explore work ↓');work.href=service.workLink;actions.append(work);}
    body.append(actions);
    article.append(visual,body);
    if (service.projects?.length) {
      const projects = create('div','service-projects');
      service.projects.forEach(project => {
        const figure = create('figure');
        if (project.image) { const img=create('img');img.src=project.image;img.alt=project.title || service.title;img.loading='lazy';figure.append(img); }
        const caption=create('figcaption');caption.append(create('h4','',(arabic ? project.titleAr || project.title : project.title)),create('p','',(arabic ? project.descriptionAr || project.description : project.description)));
        if (project.url) {const link=create('a','',arabic ? 'شوف المشروع ↗' : 'View project ↗');link.href=project.url;caption.append(link);}
        figure.append(caption);projects.append(figure);
      });
      article.append(projects);
    }
    container.append(article);
  });
  window.upgradeIcons?.(container);
};
window.renderContent();
