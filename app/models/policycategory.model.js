const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PolicycategorySchema = new Schema({
  category_name: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User' } // Reference to the Agent model
});


const Policycategory = mongoose.model('Policycategory', PolicycategorySchema);
module.exports = Policycategory;
