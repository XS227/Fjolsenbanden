// Enkel klientside-stub for å håndtere åpning og lagring av partials i beta-oppsettet.
// Her kan du senere koble på en admin-modul som henter og oppdaterer HTML-seksjoner via API-et i /api/sections.

export async function loadSection(name) {
  const res = await fetch(`../partials/${name}.html`);
  if (!res.ok) throw new Error(`Kunne ikke hente partial ${name}`);
  return res.text();
}

export async function saveSection(name, content) {
  const res = await fetch(`/api/sections/${name}`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/html' },
    body: content,
  });

  if (!res.ok) {
    throw new Error(`Kunne ikke lagre ${name}: ${res.status}`);
  }
}
