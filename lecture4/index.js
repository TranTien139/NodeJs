/**
 * Created by Tran Tien on 25/11/2016.
 */
// var sinhvien={
//     ho:'tran',
//     ten:'tien',
// }
//
// var stringstudent = JSON.stringify(sinhvien);
// console.log(stringstudent);
//
// var string = JSON.parse(stringstudent);
// console.log(string);


var request = require('request');
request('http://dantri.com', function (error, res, body) {
    if(!error && res.statusCode == 200) {
        console.log(body);
        gettext();
    }
});

function gettext(){
    request('http://vnexpress.net', function (error, res, body) {
        if(!error && res.statusCode == 200) {
            console.log(body);
        }
    });
}
