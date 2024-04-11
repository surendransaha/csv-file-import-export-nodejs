const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PolicyinfoSchema = new Schema({
  policy_number: { type: String },
  policy_start_date: { type: Date },
  policy_end_date: { type: Date },
  policy_category: { type: String },
  collection_id: { type: Schema.Types.ObjectId },
  company_collection_id: { type: Schema.Types.ObjectId },
  userId: { type: Schema.Types.ObjectId, ref: 'User' } 
});


const Policyinfo = mongoose.model('Policyinfo', PolicyinfoSchema);
module.exports = Policyinfo;
