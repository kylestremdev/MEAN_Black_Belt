// Controllers
var users   = require('./../controllers/users.js'),
    entries = require('./../controllers/entries.js');

module.exports = function (app) {
  app.get('/users', users.index);
  app.post('/users', users.login);
  app.get('/users/:id', users.show);
  app.post('/entry', entries.create);
  app.put('/entry/:entry_id', entries.update);
}
