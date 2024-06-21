const mysql =require("mysql2");

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Michigan_10",
    database :"blog"
})

module.exports = {db}