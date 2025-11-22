import { sortVisibleSections, SectionModel } from '../../models/SectionModel.js';

const DATA_PATH = '../static/data/sections.json';
const PARTIAL_ROOT = '../partials';

async function fetchSections() {
  const res = await fetch(DATA_PATH);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function renderList(items = []) {
  return items.map((item) => `<li>${item}</li>`).join('');
}

const renderers = {
  hero: (section) => {
    const { title, subtitle, cta_text, cta_link, tagline, hero_image } = section.content;
    return `
      <section id="hero" class="section hero">
        <div class="container hero-grid">
          <div class="hero-text">
            <span class="pill">Velkommen</span>
            <h1>${title}</h1>
            <p class="lead">${subtitle}</p>
            <div class="hero-actions">
              <a href="${cta_link}" class="btn btn-primary">${cta_text}</a>
              <a href="#about" class="btn btn-ghost">Les mer</a>
            </div>
          </div>
          <div class="hero-card">
            <img src="${hero_image}" alt="Fjolsenbanden" />
            <p class="hero-card-caption">${tagline || ''}</p>
          </div>
        </div>
      </section>
    `;
  },
  about: (section) => {
    const { lede, items = [] } = section.content;
    return `
      <section id="about" class="section">
        <div class="container grid-two">
          <div>
            <span class="pill">Om oss</span>
            <h2>${section.title}</h2>
            <p class="lead">${lede}</p>
          </div>
          <ul class="feature-list">${renderList(items)}</ul>
        </div>
      </section>
    `;
  },
  'player-cards': (section) => {
    const cards = section.content.cards || [];
    return `
      <section id="player-cards" class="section alt">
        <div class="container">
          <div class="section-heading">
            <span class="pill">Medlemskap</span>
            <h2>${section.title}</h2>
          </div>
          <div class="card-grid">
            ${cards
              .map(
                (card) => `
                  <article class="card pricing">
                    <h3>${card.title}</h3>
                    <p class="price">${card.price}</p>
                    <ul>${renderList(card.perks || [])}</ul>
                  </article>
                `
              )
              .join('')}
          </div>
        </div>
      </section>
    `;
  },
  partners: (section) => {
    const { logos = [] } = section.content;
    return `
      <section id="partners" class="section">
        <div class="container">
          <div class="section-heading">
            <span class="pill">Partnere</span>
            <h2>${section.title}</h2>
            <p class="lead">Sammen gjør vi gaming enda bedre.</p>
          </div>
          <div class="logo-grid">
            ${logos.map((logo) => `<div class="logo-pill"><img src="${logo}" alt="Partner-logo" /></div>`).join('')}
          </div>
        </div>
      </section>
    `;
  },
  'vipps-info': (section) => {
    const { number, description } = section.content;
    return `
      <section id="vipps-info" class="section alt">
        <div class="container grid-two">
          <div>
            <span class="pill">Vipps</span>
            <h2>${section.title}</h2>
            <p class="lead">${description}</p>
          </div>
          <div class="vipps-box">
            <img src="../static/images/vipps-placeholder.svg" alt="Vipps" />
            <p class="lead"><strong>${number}</strong></p>
          </div>
        </div>
      </section>
    `;
  },
  footer: (section) => {
    const { links = [], copyright } = section.content;
    return `
      <footer class="section">
        <div class="container footer-grid">
          <div>
            <img src="../../favicon.svg" alt="Fjolsenbanden" class="footer-logo" />
            <p>Gamingglede, fellesskap og trygghet.</p>
          </div>
          <ul>
            ${links.map((link) => `<li><a href="${link.href}">${link.label}</a></li>`).join('')}
          </ul>
          <div class="footer-meta">${copyright || ''}</div>
        </div>
      </footer>
    `;
  },
};

async function loadSectionsFromJson() {
  const rawSections = await fetchSections();
  const sections = sortVisibleSections(rawSections.map((section) => SectionModel.fromJSON(section)));
  const targets = document.querySelectorAll('[data-partial]');

  for (const target of targets) {
    const key = target.dataset.partial;
    const renderer = renderers[key];
    if (renderer) {
      target.innerHTML = renderer(sections.find((section) => section.key === key) || { content: {}, title: '' });
    }
  }
}

async function loadPartialsFallback() {
  const host = document.querySelector('[data-partials-root]')?.dataset.partialsRoot || PARTIAL_ROOT;
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

async function loadPartials() {
  try {
    await loadSectionsFromJson();
  } catch (err) {
    console.warn('JSON-basert lasting feilet, prøver HTML-partials', err);
    await loadPartialsFallback();
  }
}

document.addEventListener('DOMContentLoaded', loadPartials);
