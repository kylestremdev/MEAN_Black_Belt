var mongoose = require('mongoose');

// Models
var User  = mongoose.model('User'),
    Entry = mongoose.model('Entry');

module.exports = {
  index: function (req, res) {
    User.find({})
    .populate("bucketList")
    .populate({
      path: "bucketList",
      populate: {path: "tags"}
    })
    .exec()
    .then(function (users) {
      res.json(users)
    }, function (err) {
      res.status(400).send(err);
    })
  },
  login: function (req, res) {
    User.findOne({name: req.body.name})
    .exec()
    .then(function (user) {
      if (user) res.json(user);
      else {
        var newUser = new User({
          name: req.body.name,
        })

        newUser.save().then(function (newUser) {
          res.json(newUser);
        }, function (err){
          res.status(400).send(err);
        })
      }
    }, function (err) {
      res.status(400).send(err);
    })
  },
  show: function (req, res) {
    User.findById(req.params.id)
    .populate("bucketList")
    .populate({
      path: 'bucketList',
      populate: { path: "tags" }
    })
    .exec()
    .then(function (user) {
      res.json(user);
    }, function (err) {
      res.status(400).send(err);
    })
  }
}
