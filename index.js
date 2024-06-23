const express= require("express");
const postRoutes = require("./routes/routes.posts.js");
const  authRoutes= require("./routes/routes.auth.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/posts',postRoutes);
app.use('/api/auth',authRoutes);

app.listen(8500,()=>{
    console.log("app is running on port 8500");
});
app.get("/test",(req,res)=>{
    res.status(200).send("Hello! from API server");
});

