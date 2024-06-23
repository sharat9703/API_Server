const express= require("express");
const {methods} = require("../controllers/controller.post.js");
const router = express.Router();

router.get("/",methods.getPosts);
router.get("/:id",methods.getPost);
router.post("/",methods.addPost);
router.put("/:id",methods.editPost);
router.delete("/:id",methods.deletePost);


module.exports = router;