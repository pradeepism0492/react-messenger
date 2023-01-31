const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const databaseConnect = require("./config/database");
const authRouter = require("./routes/authRoute");
const messengerRoute = require("./routes/messengerRoute");

dotenv.config({
  path: "server/config/config.env",
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/messenger", authRouter);
app.use("/api/messenger", messengerRoute);

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("This is frodddm  Sever");
});

databaseConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
