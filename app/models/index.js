const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.agent = require("./agent.model.js")(mongoose);
db.user = require("./user.model.js")(mongoose);
db.useraccount = require("./useraccount.model.js")(mongoose);
db.policycategory = require("./policycategory.model.js")(mongoose);
db.policycarrier = require("./policycarrier.model.js")(mongoose);
db.policyinfo = require("./policyinfo.models.js")(mongoose);

module.exports = db;
