/**
 * Created by Tran Tien on 04/12/2016.
 */

var request = require('request');
var cheerio = require('cheerio');
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'chatvl'
});
connection.connect();
var k=0;

var arr = [];
function getcontent(url,callback) {
    request(url, function (error, res,body) {
        if(!error && res.statusCode == 200){
            k++;
            var $ = cheerio.load(body);
            $('.gag-link').each(function () {
                var img = $(this).children().find('.content img').eq(0).attr('src');
                var title = $(this).children().find('.post-info h1 a').text();
                var metadata = {
                    img: img,
                    title: title
                }
                arr.push(metadata);
            });
            var pagenext = $('#paging-buttons').find('a.older').attr('href');
            console.log(k);
            if(k<=10) {
                getcontent(pagenext);
            }
            callback(arr);
        }else {
           callback(error);
        }
    });

}


 getcontent('http://chatvl.com', function (err,arr) {
     console.log(err);
     console.log(arr);
});




function save(data, callback) {
    for (var i=0; i<data.length; i++){
        connection.query('INSERT INTO data SET?',data[i], function(err, result) {
            if (!err)
                console.log('is saved');
            else
                console.log('error saved');
        });
    }
}

connection.end();

    
