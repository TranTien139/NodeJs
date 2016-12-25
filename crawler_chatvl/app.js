
var cheerio = require('cheerio');
var request = require('request');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'chatvl'
});
connection.connect();
var k=0;
function geturl(url, callback) {
    request(url, function (err,res, body) {
        if(!err && res.statusCode == 200) {
            var $ = cheerio.load(body);
            $('.gag-link').each(function () {
                var img = $(this).children().find('.content img').eq(0).attr('src');
                var title = $(this).children().find('.post-info h1 a').text();
                var metadata = {
                    img: img,
                    title: title
                }
                console.log(metadata);
                connection.query('INSERT INTO data SET ?',metadata,function (error,result) {
                    if(!error){
                        console.log('insert success');
                    }else {
                        console.log('insert error');
                    }
                })
            });
            var pagenext = $('#paging-buttons').find('a.older').attr('href');
            console.log(k);
            k++;
            if(k<=50) {
                geturl(pagenext);
            }
        }else {
            console.log(err);
        }
    });
}

geturl('http://chatvl.com/');