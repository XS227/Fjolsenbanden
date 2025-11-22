// Klientside-stub for å hente og lagre seksjoner i beta-oppsettet.
// Bruker SectionModel for å sikre at all metadata (order/visible) følger med.
import { SectionModel } from '../models/SectionModel.js';

const API_BASE = '/api/sections';
const STATIC_FALLBACK = '../static/data/sections.json';

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Kunne ikke hente ${url}: ${res.status}`);
  return res.json();
}

export async function loadSections() {
  const raw = await getJson(API_BASE).catch(() => getJson(STATIC_FALLBACK));
  return raw.map((item) => SectionModel.fromJSON(item));
}

export async function loadSection(key) {
  const sections = await loadSections();
  const match = sections.find((section) => section.key === key);
  if (!match) throw new Error(`Fant ingen seksjon med key '${key}'`);
  return match;
}

export async function saveSection(section) {
  const payload = section instanceof SectionModel ? section.toJSON() : section;
  const res = await fetch(`${API_BASE}/${payload.key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Kunne ikke lagre ${payload.key}: ${res.status}`);
  }

  return res.json().catch(() => payload);
}
