const expressLoader = require("./express");
const databaseLoader = require("./db");
const loadMocks = require("./helpers/load-mocks");

module.exports = async app => {
  // Connect to database
  await databaseLoader();
  await loadMocks();
  console.log("Loading... database");

  // Define routes
  await expressLoader(app);
  console.log("Loading... express");
};
