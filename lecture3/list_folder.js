/**
 * Created by Tran Tien on 24/11/2016.
 */

var fs = require('fs');
function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
           //files_.push(name);
            console.log(name);
        }
    }
   // return files_;
}

getFiles('./');

