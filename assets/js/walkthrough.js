window.startWalkthrough = steps=>{
  let i=0, tip=document.createElement('div');
  tip.style.position='fixed'; tip.style.zIndex=9999; tip.style.background='#111'; tip.style.color='#fff';
  tip.style.padding='12px 16px'; tip.style.borderRadius='10px';
  const next=()=>{ if(i>=steps.length){ tip.remove(); return;}
    const s=steps[i++], t=document.querySelector(s.sel); if(!t) return next();
    const r=t.getBoundingClientRect(); tip.textContent=s.text;
    tip.style.left=r.left+'px'; tip.style.top=(r.top-48)+'px'; document.body.appendChild(tip);
    tip.onclick=next;
  }; next();
};
