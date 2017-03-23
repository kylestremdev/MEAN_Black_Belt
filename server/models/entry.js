var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var EntrySchema = new Schema({
  title: {
    type: String,
    required: [true, "Entry needs a title"]
  },
  description: {
    type: String,
    required: [true, "Entry needs a description"]
  },
  finished: {
    type: Boolean,
    default: false,
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }]
}, {timestamps: true});

mongoose.model('Entry', EntrySchema);
