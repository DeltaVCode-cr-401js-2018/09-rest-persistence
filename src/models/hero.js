'use strict';

const Storage = require('../lib/storage');
const heroStore = new Storage('resources');

class Hero {
  constructor(obj) {
    this.name = obj.name;
    this.universe = obj.universe;
    this.power = obj.power;
  }

  save() {
    return heroStore.save(this);
  }

  static fetchAll() {
    return heroStore.getAll();
  }

  static findById(id) {
    return heroStore.get(id);
  }
}

module.exports = Hero;