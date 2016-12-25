/**
 * Created by Tran Tien on 05/12/2016.
 */

var mysql =  require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user :'root',
    password:'',
    database:'nodejs_chatvl'
});
connection.connect();

var request = require('request');
var cheerio  = require('cheerio');
var http = require('http');
var fs = require('fs');

function getAllPage(url,callback) {
    request(url,function (error, response, body) {
        if(!error && response.statusCode == 200){
            var link_url = (response.request.uri.href);
            var $=cheerio.load(body);
            var doc = $('body #entries-content-ul');
        }
        callback(error,doc,$,link_url);
    })
}

function getDulieu(dulieudauvao,$,link_url) {
    var array_list_item = [];
    var element_du_lieu = dulieudauvao.find('.gag-link');
    element_du_lieu.each(function () {
        var content_data = {
            //  url:link_url,
            img : $(this).find('.content .img-wrap a img').attr('src'),
            title : $(this).find('.post-info').find('.info').find('h1').find('a').text().trim()
        };
        array_list_item.push(content_data);
    });
    return array_list_item;
}

//var index = 0;
//var ketqua = "";
function getDataPage(array_url,index,callback) {
    if (index < array_url.length) {
        getAllPage(array_url[index], function (error, doc, $,link_url) {
            console.log(array_url[index]);
            if (!error) {
                var ketqua = getDulieu(doc, $, link_url);
                index++;
                getDataPage(array_url,index,callback);
                callback(error,ketqua);
            }else {
                console.log(error);
            }
        });
    }
}

// getDataPage(array_url, 0,function (error, ketqua) {
//     console.log("111111111111");
//     console.log(ketqua);
// });

function saveData(ketqua,j,callback) {
    if(j < ketqua.length){
        connection.query('insert into chatvl SET?',ketqua[j], function(error, result){
            console.log("done");
            j++;
            saveData(ketqua,j,callback);
        });
    }else{
        callback("Ghi d? li?u c?a 1 url dã Xong");
    }
}


function loadDataPage(table,callback) {
    connection.query('SELECT url FROM '+table+' ORDER BY url  DESC LIMIT 1', function(error, result) {
        if(!error){
            if (result[0] == undefined){
                var index = 0;
            }else {
                var index = result[0].url;
                index = index.substr(21, index.length);
            }
            var url = 'http://chatvl.tv/new/';
            var array_url = [];
            index = parseInt(index);
            for(var i = 1; i<= 5; i++){
                array_url.push(url+(index+i));
            }
            //console.log(array_url);
            getDataPage(array_url,0, function (error,ketqua) {
                //console.log(ketqua);
                saveData(ketqua,0,function (result) {
                    if(result != null){
                        callback(error,result);
                    }else{
                        callback(error);
                    }
                });
            })
        }
    })
}

var timeOut = setInterval(function () {
    loadDataPage('chatvl',function (error,result) {
        console.log(result);
    });
},2000);

console.log(timeOut);








