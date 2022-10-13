const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
var drop = true;

dotenv.config({
    path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
});

var con = mysql.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PWD || 'root',
    port: process.env.DATABASE_PORT || 3306,
});

con.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = con

if (drop == true) {
    var sql = "DROP DATABASE IF EXISTS file_website";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("DATABASE file_website dropped");
    });

    var sql = "CREATE DATABASE file_website";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("DATABASE file_website created");
    });
}
con.changeUser({database : 'file_website'}, function(err) {
    if (err) throw err;
    console.log("Switched to file_website");
});

// var sql = "DROP TABLE IF EXISTS files";
// con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("TABLE files dropped");
// });

// var sql = "DROP TABLE IF EXISTS users";
// con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("TABLE user dropped");
// });

var sql = "CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(255) NOT NULL, \
last_name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, \
type INT NOT NULL DEFAULT 1, PRIMARY KEY(id)) ";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE user created");
});

var sql = 
"CREATE TABLE files (id INT NOT NULL AUTO_INCREMENT, user_id INT NOT NULL, file_key VARCHAR(255) NOT NULL, \
description VARCHAR(255),\
upload_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, updatetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \
PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users(id))";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE files created");
});

var sql = "INSERT INTO users (first_name, last_name, email, password) VALUES ('Cody', 'SB', 'cody@sb.com', '$2b$10$X/zruJudGuCAwm6DbzcKVundUlCgJ1vG3gGQ/Lo/cboerLXyFJrtW')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("row added to TABLE user");
});

var sql = "INSERT INTO users (first_name, last_name, email, password, type) VALUES ('admin', 'admin', 'admin@admin.com', '$2b$10$X/zruJudGuCAwm6DbzcKVundUlCgJ1vG3gGQ/Lo/cboerLXyFJrtW', 0)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("row added to TABLE user");
});

