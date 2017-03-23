var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
    unique: true
  },
  bucketList: [{
    type: Schema.Types.ObjectId,
    ref: 'Entry',
  }]
}, {timestamps:true});

mongoose.model('User', UserSchema);
