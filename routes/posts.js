const express= require("express");
const router = express.Router();

router.get("/test",(req,res)=>{
    res.json("this is posts");
});

module.exports = router;