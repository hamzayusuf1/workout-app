const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("dotenv").config();

console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
