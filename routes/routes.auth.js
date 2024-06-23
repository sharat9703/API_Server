const express= require("express");
const {auth} = require("../controllers/controller.auth.js");

const router = express.Router();

router.post("/register",auth.register)
router.post("/login",auth.login)
router.post("/logout",auth.logout)

module.exports = router;