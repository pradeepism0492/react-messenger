const router = require("express").Router();

const { userRegister, userLogin } = require("../controller/authController");
const {
  getFriends,
  messageUploadDB,
} = require("../controller/messengerController");
const { authMiddleware } = require("../middleware/authMiddleware");
router.get("/get-friends", authMiddleware, getFriends);
router.post("/send-message", authMiddleware, messageUploadDB);

module.exports = router;
