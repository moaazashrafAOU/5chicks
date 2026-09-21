5CHICKS — Creative House

Rebuilt static website with the supplied original brand assets and neon palette.
Open index.html or serve this directory with a static server.

Included:
- Responsive brand-led hero with chrome artwork and neon identity accents
- Our Work navigation and three independent centred, swipeable video carousels
- Only the selected, visible video plays; keyboard, pause, mute and fullscreen controls
- Reduced-motion support, focus states, skip link and mobile layouts
- Original five dynamic logos, pattern, characters and identity elements
- In-page PDF portfolio viewer, direct PDF fallback and download
- Telephone contact from the supplied company portfolio

EDIT VIDEOS: work-data.js
GUIDE (Arabic): VIDEO-GUIDE.md
PDF: assets/5chicks-portfolio.pdf

Current videos are procedural DEMO motion clips from the original site, not client work.
Browser-compatible copies and covers are in assets/videos. Original assets remain intact.
Replace the demo media and descriptions with final projects before publishing.

Deploy: index.html, styles.css, script.js, work-data.js and assets/.
Do not deploy tmp/ or the original design-source folders.
Portfolio preview: portfolio-preview.html + assets/portfolio (faithful, lazy-loaded images of the original PDF).
Include portfolio-preview.html in deployment. When replacing the PDF content, regenerate its preview images too.

Company and services content: content-data.js
Content editing guide (Arabic): CONTENT-GUIDE.md
Service rendering: content.js (include this and content-data.js in deployment)
Page order: company, services, three work collections, PDF portfolio, creative DNA, contact.

Arabic/English support: content-ar.js, language.js, icons.js (include all in deployment).
Default language: Arabic, with a persistent language switch and ?lang=ar / ?lang=en overrides.
Arrow buttons use inline SVG; decorative section/service numbering has been removed.
Client-logo carousel: clients-data.js, clients.js and assets/clients/ (include in deployment).
Empty client data shows clearly labelled preview spaces. Add supplied client logos to replace them.

REAL MEDIA UPDATE: 69 supplied videos replace the demos (55 reels / 6 films / 8 sketches).
Optimized files: assets/web-videos. Original files: assets/videos/<category> (do not publish originals).
See MEDIA-REPORT.md and VIDEO-GUIDE.md for current media instructions; earlier demo notes are superseded.
Videos now load only on active playback; only nearby covers load near the viewport.
