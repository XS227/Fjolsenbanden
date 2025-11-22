import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { SectionModel } from '../../models/SectionModel.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sectionsFile = path.resolve(__dirname, '../../static/data/sections.json');

function readSections() {
  const raw = fs.readFileSync(sectionsFile, 'utf-8');
  return JSON.parse(raw).map(SectionModel.fromJSON);
}

function writeSections(sections) {
  fs.writeFileSync(
    sectionsFile,
    JSON.stringify(sections.map((section) => section.toJSON()), null, 2),
    'utf-8',
  );
}

/**
 * POST /api/sections/:key/update
 * Body: { title: string, content: object }
 */
export function updateSectionHandler(req, res) {
  const { key } = req.params;
  const { title, content = {} } = req.body || {};

  if (!key) {
    return res.status(400).json({ error: 'Manglende section key' });
  }

  const sections = readSections();
  const existing = sections.find((section) => section.key === key);

  if (!existing) {
    return res.status(404).json({ error: `Fant ikke seksjon med key "${key}"` });
  }

  if (typeof title === 'string') {
    existing.title = title;
  }
  if (typeof content === 'object' && content !== null) {
    existing.updateContent(content);
  }

  writeSections(sections);

  return res.status(200).json({ success: true, section: existing.toJSON() });
}
