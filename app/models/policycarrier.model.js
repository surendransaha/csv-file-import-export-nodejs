const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PolicycarrierSchema = new Schema({
  company_name: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User' } // Reference to the Agent model
});


const Policycarrier = mongoose.model('Policycarrier', PolicycarrierSchema);
module.exports = Policycarrier;
