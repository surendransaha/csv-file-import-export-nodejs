module.exports = (app) => {
  const worker = require("../worker/worker.js");

  var router = require("express").Router();

  const upload = require("../worker/common.js");

  // parse
  router.post("/parse", worker.parse);

  // upload
  router.post("/upload", upload.single("file"), worker.upload);

  app.use("/api", router);
};
