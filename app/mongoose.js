/*

This file is for initializing mongoose

*/
const Mongoose = require("mongoose");
Mongoose.connect(process.env.ATLAS_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  module.exports = Mongoose;