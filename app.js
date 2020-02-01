const express = require("express");

require("dotenv").config();

const app = express();

(async () => {
  await require("./loaders")(app);

  app.listen(process.env.PORT, () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);
  });
})();
