async function loadPartials() {
  const host = document.querySelector('[data-partials-root]')?.dataset.partialsRoot || '../partials';
  const targets = document.querySelectorAll('[data-partial]');

  for (const target of targets) {
    const name = target.dataset.partial;
    try {
      const res = await fetch(`${host}/${name}.html`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      target.innerHTML = await res.text();
    } catch (err) {
      target.innerHTML = `<div class="card"><p>Kunne ikke laste seksjonen <strong>${name}</strong> (${err.message}).</p></div>`;
      console.error(`Feil ved lasting av partial '${name}':`, err);
    }
  }
}

document.addEventListener('DOMContentLoaded', loadPartials);
