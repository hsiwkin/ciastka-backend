const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = app => {
  // Middleware Functions
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Routing
  require("../routes/auth.router")(app);
  require("../routes/base.router")(app);
  require("../routes/offers.router")(app);
};
