const mysql = require('mysql');
const config = require('./config');

let db = mysql.createConnection({
    host: 'fec-hallowes-search.cgmhnhykd7qi.us-east-2.rds.amazonaws.com',
    user: config.username,
    password: config.password,
    database: 'fec_hallowes_search'
})

db.connect(function (err) {
    if (err) {
        console.log('error: ' + err);
        return;
    } 
    console.log("Connected to database");
})

const getItems = function(callback) {
    let queryString = "SELECT * FROM items";
    db.query(queryString, [], (err, results, field) => {
        if (err) {
            callback (err, null);
        } else {
            callback (null, results);
        }
    })
}

module.exports.getItems = getItems;