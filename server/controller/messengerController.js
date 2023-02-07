const User = require("../models/authModel");
const messageModel = require("../models/messageModel");
module.exports.getFriends = async (req, res) => {
  const myId = req.myId;
  try {
    const friendsGet = await User.find({});
    const filter = friendsGet.filter((d) => d.id != myId);
    console.log(filter);
    res.status(200).json({ success: true, friends: filter });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: ["Internal Server error"],
      },
    });
  }
};

module.exports.messageUploadDB = async (req, res) => {
  const senderId = req.myId;
  console.log(req.body, req.myId);
  const { senderName, reseverId, message } = req.body;
  // check the user Exist or not
  try {
    const inserMessage = await messageModel.create({
      senderId: senderId,
      senderName: senderName,
      reseverId: reseverId,
      message: {
        text: message,
        image: "",
      },
    });
    res.status(200).json({
      success: true,
      message: inserMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        errorMessage: ["Internal Server error"],
      },
    });
  }
};
