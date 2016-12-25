/**
 * Created by Tran Tien on 28/11/2016.
 */

var array = [];
for(var i=1; i<=100; i++){
    array.push('http://chatvl.tv/new/'+i);
}

//goi ham doc so chan truoc le sau
var request = require('request');
function  getContent() {
    if(array.length%2==0) {
        for (var i = 0; i < array.length; i+2) {
            request(array[i], function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    console.log(body);
                    if(i==(array.length-2)){
                        getContentSub();
                    }
                }
            });
        }
    }else{
        for (var i = 0; i < array.length; i+2) {
            request(array[i], function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    console.log(body);
                    if(i==(array.length-1)){
                        getContentSub();
                    }
                }
            });
        }
    }
}

function getContentSub() {
    for (var i = 1; i < array.length; i+2) {
        request(array[i], function (error, res, body) {
            if (!error && res.statusCode == 200) {
                console.log(body);
            }
        });
    }
}

// luu noi dung vao file
var fs =require('fs');
function SaveToFile() {
    for (var i = 1; i < array.length; i++) {
        request( array[i], function (error, res, body) {
            if (!error && res.statusCode == 200) {
                fs.appendFile('./result.txt',body, function (err) {
                    if(err) throw err;
                });
            }
        });
    }
     console.log('it is saved');
}

// tim ra cac url bi thay doi
var cheerio = require('cheerio');
function getTitle(url) {
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            $('div.uinfo').each(function(i, element){
                var a = $(this).prev();
                console.log(a.text());
                fs.appendFile('./result_tempority.txt',a.text(), function (err) {
                    if(err) throw err;
                });
            });
        }
        fs.appendFile('./result_tempority.txt','|-|', function (err) {
            if(err) throw err;
        });
    });
}

fs = require('fs');

// for(var i=0; i<array.length; i++){
//     getTitle(array[i]);
// }

function  FindUrlDifferent() {
    fs.readFile('./result_tempority.txt', 'utf8', function (err,data) {
        if (err) throw err;
        var arr  = data.split('|-|');
    for(var i=0; i<array.length; i++){
        request(array[i], function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                $('div.uinfo').each(function(i, element){
                    var a = $(this).prev();
                    if(typeof arr[i] == 'undefined'){
                        console.log(array[i]);
                    }else {
                        if (a.text() != arr[i]) {
                            console.log(array[i]);
                        }
                    }
                });
            }
        });
    }
    });
}

//các hàm chạy đây chạy hàm nào thì mở hàm đấy ra

//getContent();
//SaveToFile();
FindUrlDifferent();


