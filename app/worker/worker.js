var fs = require("fs");
const csv = require("fast-csv");
const path = require("path");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Agent = require("../models/agent.model");
const Useraccount = require("../models/useraccount.model");
const Policycarrier = require("../models/policycarrier.model");
const Policycategory = require("../models/policycategory.model");
const Policyinfo = require("../models/policyinfo.models");

// CSV upload function

exports.upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let pathValue = path.join(__dirname, "../../public/") + req.file.filename;

    //console.log("pathValue==>", pathValue)

    var csvdata = [];

    fs.createReadStream(pathValue)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        csvdata.push(row);
      })
      .on("end", async () => {
        //console.log("tutorials-->", tutorials);

        for (data of csvdata) {
          // agent detail insert

          if ("agentname" in data) {
            const agentData = new Agent({
              agent_name: data.agentname,
            });

            const agentResponse = await agentData.save();

            // user detail insert
            var userObj = {
              // _id : mongoose.Types.ObjectId(),
              first_name: data.user_firstname,
              DOB: data.user_dob,
              address: data.user_address,
              phone_number: data.user_ph,
              state: data.user_state,
              zipcode: data.user_zipcode,
              email: data.user_email,
              gender: data.user_gender,
              userType: data.user_type,
              agentId: agentResponse._id,
            };

            const userData = new User(userObj);
            const userResponse = await userData.save();

            var userAccObj = {
              account_name: data.account_name,
              userId: userResponse._id,
            };
            const userAccData = new Useraccount(userAccObj);
            await userAccData.save();

            var policycarrierObj = {
              company_name: data.company_name,
              userId: userResponse._id,
            };
            const PolicycarrierData = new Policycarrier(policycarrierObj);
            await PolicycarrierData.save();

            var policycategoryObj = {
              category_name: data.category_name,
              userId: userResponse._id,
            };
            const PolicycategoryData = new Policycategory(policycategoryObj);
            await PolicycategoryData.save();

            var policyinfoObj = {
              policy_number: data.policy_number,
              policy_start_date: data.policy_start_date,
              policy_end_date: data.policy_end_date,
              policy_category: data.policy_category,
              collection_id: mongoose.Types.ObjectId(),
              company_collection_id: mongoose.Types.ObjectId(),
              userId: userResponse._id,
            };
            const PolicyinfoData = new Policyinfo(policyinfoObj);
            await PolicyinfoData.save();
          }
        }
      });

      res.json({ result: "Successfully csv file added !" });
      
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: ",
    });
  }
};

// parse function

exports.parse = async (req, res) => {
  const { template, data } = req.body;


  if (!template) {
    res.status(400).send({ message: "Template can not be empty!" });
    return;
  }

  if (!data) {
    res.status(400).send({ message: "Data can not be empty!" });
    return;
  }

  const parsedTemplate = TemplateEngine(template, data);
  res.json({ result: parsedTemplate });
};

// Template
function TemplateEngine(template, data) {
  const regex = /<%([^%>]+)?%>/g;
  return template.replace(regex, (match, p1) => {
    return data[p1.trim()] || "";
  });
}
