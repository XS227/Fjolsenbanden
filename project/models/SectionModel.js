/**
 * Modell for en enkel CMS-seksjon i one-page editoren.
 * Dekker all metadata (nøkkel, rekkefølge, synlighet) og selve JSON-innholdet.
 */
export class SectionModel {
  constructor({ id, key, title, content = {}, order = 0, visible = true }) {
    this.id = Number(id);
    this.key = key;
    this.title = title;
    this.content = content;
    this.order = Number(order);
    this.visible = Boolean(visible);
  }

  updateContent(content) {
    this.content = { ...this.content, ...content };
  }

  toggleVisibility(forceState) {
    this.visible = typeof forceState === 'boolean' ? forceState : !this.visible;
  }

  setOrder(order) {
    this.order = Number(order);
  }

  toJSON() {
    return {
      id: this.id,
      key: this.key,
      title: this.title,
      content: this.content,
      order: this.order,
      visible: this.visible,
    };
  }

  static fromJSON(data) {
    if (!data || !data.key) {
      throw new Error('SectionModel krever minst en key');
    }
    return new SectionModel(data);
  }
}

/**
 * Hjelpefunksjon for å sortere og filtrere seksjoner slik de skal gjengis på siden.
 */
export function sortVisibleSections(sections = []) {
  return sections
    .filter((section) => section.visible)
    .sort((a, b) => a.order - b.order);
}
