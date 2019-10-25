const mysql = require('mysql');
const config = require('./config');

let db_pool = mysql.createPool({
    connectionLimit: 100,
    host: 'fec-hallowes-searchbar.cgmhnhykd7qi.us-east-2.rds.amazonaws.com',
    user: 'atgeorge11',
    password: 'atgeorge11',
    database: 'fec_hallowes_searchbar'
})

// db.connect(function (err) {
//     if (err) {
//         console.log('error: ' + err);
//         return;
//     } 
//     console.log("Connected to database");
// })

const getItems = function(callback) {
    db_pool.getConnection(function(err, connection){
        if (err) {
            connection.end();
            console.log("Error getting db_pool connection: " + err);
            throw err;
        }
        let queryString = "SELECT * FROM items";
        connection.query(queryString, [], (err2, results, field) => {
            if (err2) {
                callback (err, null);
            } else {
                callback (null, results);
            }
            console.log("Releasing connection");
            connection.end();
        })
        connection.end();
    })
}

module.exports.getItems = getItems;