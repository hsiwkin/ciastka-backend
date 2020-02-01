const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true
};

module.exports = () => {
  const connectionString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/ciastkazon`;

  mongoose.connection.on("error", err => {
    console.error(err);
    throw err;
  });

  // mongoose.set('debug', true);
  mongoose.connect(connectionString, options);
};
