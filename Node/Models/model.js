/**
 * Created by Tran Tien on 09/12/2016.
 */

var mysql = require('mysql');

var connetion = mysql.createConnection({
   host: "localhost",
    user: "root",
    database:'cms',
});


connetion.connection();

function  chatVLModel(callback) {
    query = 'SELECT*FROM articles';
    connetion.query(query,function (err, result) {
        callback(err, result);
    });
}

module.exports.chatVLModel = chatVLModel;