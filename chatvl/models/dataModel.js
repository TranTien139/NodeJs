var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'chatvl'
});
connection.connect();

function getAllPost(callback) {
    connection.query('SELECT * FROM data', function (err, rows) {
        callback(err,rows);
    });
}

module.exports.getAllPost = getAllPost;