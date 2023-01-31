const User = require("../models/authModel");
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
