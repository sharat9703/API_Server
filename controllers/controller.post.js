const { JsonWebTokenError } = require("jsonwebtoken");
const {db} = require("../db.js");
const jwt = require("jsonwebtoken");
const methods = {
    getPosts : (req,res)=>{
        const q = req.query.cat ? 'SELECT * FROM posts WHERE cat = ?' : 'SELECT * FROM posts';
        db.query(q,[req.query.cat],(err,data)=>{
            if(err) return res.status(500).send(err);
            return res.status(200).json(data);
        })        
        
    },
    getPost : (req,res)=>{
        const q = "select u.username,p.title,p.desc,p.img as postImg,u.img as userImg,p.cat,p.date from users u join posts p on u.id = p.uid where p.id = ?"
        db.query(q,[req.params.id],(err,data)=>{
            if(err) return res.status(500).send(err);
            return res.status(200).json(data[0]);
        });    
    },
    addPost : (req,res)=>{
        res.json()
    },
    editPost : (req,res)=>{
        res.json()
    },
    deletePost : (req,res)=>{
        const token = req.cookies.access_token;
        if(!token) return res.status(401).json("Not Authenticated!");
        
        jwt.verify(token,"jwt_Secret_Key",(err,data)=>{
            if(err) return res.status(403).json("Not a valid token!!");

            const postId = req.params.id;
            const q = `DELETE FROM posts WHERE 'id' = ? AND 'uid' = ?`;

            db.query(q,[postId,data.id],(err,dat)=>{
                if(err) return res.status(403).json("You can only delete your post!");

                return res.status(200).json("Post has been deleted!");
            });
        });
    }    
}

module.exports = {methods};