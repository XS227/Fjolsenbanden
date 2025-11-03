// KPI count-up
const kpis=[...document.querySelectorAll('[data-kpi]')];
const tick=(el,target)=>{
  const now=+el.textContent.replace(/\D/g,'')||0;
  const next=Math.ceil(now+(target-now)*0.12);
  el.textContent=next.toLocaleString();
  if(next<target) requestAnimationFrame(()=>tick(el,target));
};
kpis.forEach(el=>tick(el,+el.dataset.kpi));

// Simple charts (bruk Chart.js om tilgjengelig)
document.querySelectorAll('.js-chart').forEach(c=>{
  const type=c.dataset.chart, labels=JSON.parse(c.dataset.labels), data=JSON.parse(c.dataset.values);
  if(window.Chart){
    new Chart(c.getContext('2d'),{type,data:{labels,datasets:[{data,tension:.35}]},
      options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}});
  }else{
    const fb=document.createElement('div'); fb.style.display='grid';
    data.forEach((v,i)=>{const bar=document.createElement('div'); bar.title=labels[i];
      bar.style.height='8px'; bar.style.margin='8px 0'; bar.style.width=(v*2)+'px';
      bar.style.background='currentColor'; fb.appendChild(bar);});
    c.replaceWith(fb);
  }
});
