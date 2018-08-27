'use strict';

const Storage = require('../lib/storage');
const resourceStore = new Storage('resources');

class Resource {
  constructor(obj) {
    this.name = obj.name;
    this.content = obj.content;
    this.author = obj.author;
  }

  save() {
    return resourceStore.save(this);
  }

  static fetchAll() {
    return resourceStore.getAll();
  }

  static findById(id) {
    return resourceStore.get(id);
  }
}

module.exports = Resource;