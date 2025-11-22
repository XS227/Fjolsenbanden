export class SectionModel {
  constructor(id, content = '') {
    this.id = id;
    this.content = content;
    this.updatedAt = new Date();
  }

  update(content) {
    this.content = content;
    this.updatedAt = new Date();
  }
}
