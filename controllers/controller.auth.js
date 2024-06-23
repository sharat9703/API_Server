const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../db.js");
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${year}-${month}-${day}`;

const auth = {
  register: (req, res) => {
    //check exiting user
    const q = `SELECT * FROM users WHERE email = ? OR username = ?`;
    db.query(q, [req.body.email, req.body.username], (err, data) => {
      if (err) return res.json({ message: err.message });
      if (data.length) return res.status(409).json("User already exists!");
      // hash password  && create user
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(req.body.password, salt);
      const q =
        "INSERT INTO users(`username`,`email`,`password`,`date`) VALUES (?)";
      const values = [req.body.username, req.body.email, hash, currentDate];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    });
  },
  login: (req, res) => {
    const q = `select * from blog.users where username = ?`;
    const values = [req.body.username];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");

      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );

      if (!isPasswordCorrect)
        return res.status(400).json("wrong username or password!");

      const token = jwt.sign({ id: data[0].id }, "jwt_Secret_Key");

      const { password, ...other } = data[0];

      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(other);
    });
  },
  logout: (req, res) => {
     return res.cookie("access_token",{
        same_site : "none",
        secure : true
     }).status(200)
     .json("User has been successfully logged out");
  },
};

module.exports = { auth };
