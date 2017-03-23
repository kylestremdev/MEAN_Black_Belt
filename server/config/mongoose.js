var mongoose  = require('mongoose'),
    path      = require('path'),
    fs        = require('fs');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/mean_black_belt');

var models_path = path.join(__dirname, "./../models");

fs.readdirSync(models_path).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(models_path + '/' + file);
  }
})
