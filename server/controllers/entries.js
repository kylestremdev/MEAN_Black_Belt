var mongoose = require('mongoose');

// Models
var User  = mongoose.model('User'),
    Entry = mongoose.model('Entry');

module.exports = {
  create: function (req, res) {
    var newEntry = new Entry({
      title: req.body.title,
      description: req.body.description,
    })

    newEntry.tags = req.body.tags;

    newEntry.tags.forEach(function (user_id) {
      User.findById(user_id).then(function (user) {
        user.bucketList.push(newEntry);

        user.save().catch(function (err) {
          console.log(err);
        }, function (err) {
          console.log(err);
        })
      })
    })

    newEntry.save()
    .then(function (newEntry) {
      res.redirect('/users/' + req.body.user_id);
    }, function (err) {
      res.status(400).send(err);
    })
  },
  update: function (req, res) {
    Entry.findById(req.params.entry_id)
    .then(function (entry) {
      entry.finished = req.body.finished_status;
      entry.save().then(function (updated_entry) {
        res.redirect(303,('/users/' + req.body.user_id))
      },function (err) {
        res.status(400).send(err);
      }, function (err) {
        console.log(err);
      })
    })
  }
}
