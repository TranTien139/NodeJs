/**
 * Created by Tran Tien on 02/12/2016.
 */
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'cms'
// });
//
// connection.connect();
//
// connection.query('SELECT * from articles', function(err, rows, fields) {
//     if (!err)
//         console.log('The solution is: ', rows);
//     else
//         console.log('Error while performing Query.');
// });
//
// connection.end();
var cheerio = require('cheerio');
var request = require('request');

function  get(url,selector,callback) {
    request(url,function (err, res, body) {
        if(!err && res.statusCode == 200){
            var $=cheerio.load(body);
            var imags=[];
            $(selector).each(function(){
                imags.push($(this).attr('src'));
             });
           // var title = $(selector).text();
            callback(err, imags);
        }else {
            callback(err);
        }
    });
}
get('http://chatvl.com/','.post-info a.jump_focus',function (res,imags) {
    console.log(res);
    console.log(imags);
});
