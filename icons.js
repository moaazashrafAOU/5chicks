window.upgradeIcons = (root = document.body) => {
  const paths = {'↗':'M5 19 19 5M5 5h14v14','↘':'M5 5 19 19M5 19h14V5','↓':'M12 4v16m-7-7 7 7 7-7','↑':'M12 20V4m-7 7 7-7 7 7','←':'M20 12H4m7-7-7 7 7 7','→':'M4 12h16m-7-7 7 7-7 7','↳':'M6 4v13h14m-6-6 6 6-6 6'};
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes=[];let node;
  while(node=walker.nextNode()) if(/[↗↘↓↑←→↳]/.test(node.nodeValue) && !node.parentElement.closest('script,style,svg')) nodes.push(node);
  nodes.forEach(text=>{
    const fragment=document.createDocumentFragment();
    text.nodeValue.split(/([↗↘↓↑←→↳])/).forEach(part=>{
      if(!paths[part]){fragment.append(document.createTextNode(part));return;}
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('class','arrow-icon');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
      if(part==='↗'||part==='↘')svg.classList.add('directional-icon');
      const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',paths[part]);svg.append(path);fragment.append(svg);
    });text.replaceWith(fragment);
  });
};
