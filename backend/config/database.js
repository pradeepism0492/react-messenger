const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const databaseConnect = () => {
  mongoose
    .connect("mongodb://localhost:27017/messenger", {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Mongodb Database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = databaseConnect;
