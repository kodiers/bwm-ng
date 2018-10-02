const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    max: [128, 'Too long, max is 128 characters'],
    min: [4, 'Too short, min is 4 characters']
  },
  email: {
    type: String,
    required: true,
    max: [128, 'Too long, max is 128 characters'],
    min: [4, 'Too short, min is 4 characters'],
    unique: true,
    lowercase: true,
    match: [/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/]
  },
  password: {
    type: String,
    required: true,
    max: [128, 'Too long, max is 128 characters'],
    min: [4, 'Too short, min is 4 characters']
  },
  rentals: [{type: Schema.Types.ObjectId, ref: 'Rental'}]
});

module.exports = mongoose.model('User', userSchema);
