const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  first_name: { type: String },
  DOB: { type: Date},
  address: { type: String},
  phone_number: { type: Number },
  state: { type: String },
  zipcode: { type: String },
  email: { type: String },
  gender: { type: String },
  userType: { type: String },
  agentId: { type: Schema.Types.ObjectId, ref: 'Agent' } // Reference to the Agent model
});


const User = mongoose.model('User', userSchema);
module.exports = User;
