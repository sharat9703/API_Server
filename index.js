const express = require("express");
const app = express();

app.listen(8500,()=>{
    console.log("app is running on port 8500");
});
app.get("/",(req,res)=>{
    res.status(200).send("Hello! from API server");
});

