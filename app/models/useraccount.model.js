const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UseraccountSchema = new Schema({
  account_name: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User' } // Reference to the Agent model
});


const Useraccount = mongoose.model('Useraccount', UseraccountSchema);
module.exports = Useraccount;
