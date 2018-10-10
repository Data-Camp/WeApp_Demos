const AV = require('../utils/leancloud-storage');

class Todo extends AV.Object {
  get done() {
    return this.get('done');
  }
  set done(value) {
    this.set('done', value);
  }

  get content() {
    return this.get('content');
  }
  set content(value) {
    this.set('content', value);
  }
}

AV.Object.register(Todo);
module.exports = Todo;