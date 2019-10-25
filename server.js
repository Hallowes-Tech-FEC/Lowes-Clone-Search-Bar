const express = require('express');
const cors = require('cors');
const db = require ('./db.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use(express.static(__dirname + '/client/dist'));

app.get("/searches", (req, res) => {
    db.getItems((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send (data);
        }
    })
})

let port = 3005;
app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port " + port);
    }
})