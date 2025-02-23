
const express= require("express");
const {auth} = require("../middleware/auth.js")
const {getMessages, getAllUsers, sendMessage} = require("../controllers/Message.js")

const router = express.Router();

router.get("/users", auth, getAllUsers);
router.get("/:id", auth, getMessages);
router.post("/send/:id", auth, sendMessage);

module.exports = router;