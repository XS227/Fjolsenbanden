// Enkel client-side include: <section data-include="/fragments/...html"></section>
document.querySelectorAll('[data-include]').forEach(async el => {
  try {
    const res = await fetch(el.dataset.include, { cache: "no-store" });
    el.outerHTML = await res.text();
  } catch(e) {
    el.innerHTML = `<div style="color:#c00">Kunne ikke laste ${el.dataset.include}</div>`;
  }
});
