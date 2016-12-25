var fs = require('fs');

// var data = fs.readFileSync('./index.js');
// console.log(data.toString());

var array = ['test.js','index.js'];

function  readMultifile(array,index) {
    if(index < array.length) {
        fs.readFile(array[index], function (err, data) {
            console.log(index);
            if (!err) {
                console.log(data.toString());
                readMultifile(array,index);
            } else {
                console.log(err);
            }
            index++;
        });
    }else {
        console.log('da duyet xong');
    }
}

readMultifile(array,0);

