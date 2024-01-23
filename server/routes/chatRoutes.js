const express = require("express");
const router = express.Router();
const {
  accessChat,
  fetchChats,
  seekersChat,
  employeesChat,
  sendMessage,
} = require("../controllers/chatControllers");

router.post("/", accessChat);
router.get("/:id", fetchChats);
router.get("/:model/:id", seekersChat);
router.get("/:id", employeesChat);
router.post("/sendMessage/:id", sendMessage);
module.exports = router;
