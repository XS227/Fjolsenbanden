// Tema-velger
document.addEventListener('click', e=>{
  const btn = e.target.closest('.js-theme');
  if(!btn) return;
  document.querySelector('[data-preview]')?.setAttribute('data-theme', btn.dataset.theme);
});

// Walkthrough-steps for portalen
window.walkthroughPortal = [
  { sel:'#hero-portal .actions', text:'Start her – se demo eller kjør veiviser.' },
  { sel:'#themes', text:'Velg et tema – du kan endre senere.' },
  { sel:'#plans', text:'Velg pakken som passer.' },
  { sel:'#contact-portal', text:'Send inn innholdet ditt og gå live.' }
];
if (window.startWalkthrough) document.getElementById('js-walkthrough-start')
  ?.addEventListener('click', ()=> window.startWalkthrough(window.walkthroughPortal));
