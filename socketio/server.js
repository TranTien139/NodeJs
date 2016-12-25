/**
 * Created by Tran Tien on 16/12/2016.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var nicknames = [];

var users={};

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/socket.io.js', function(req, res){
    res.sendFile(__dirname + '/socket.io.js');
});

app.get('/jquery-1.11.1.js', function(req, res){
    res.sendFile(__dirname + '/jquery-1.11.1.js');
});

io.on('connection', function(socket){
    socket.on('new user', function (data, callback) {
        if(data in users){
            callback(false);
        } else{
            callback(true);
            socket.nickname = data;
            users[socket.nickname] = socket;
            UpdateNickName();
        }
    });
    socket.on('chat message', function(msg){
        if(msg.chat_with !='') {
            users[msg.chat_with].emit('gui-lai', {nick: socket.nickname, msg: msg.msg});
        }else {}
    });

    function UpdateNickName() {
        io.sockets.emit('usernames',Object.keys(users));
    }

    socket.on('disconnect', function (data) {
        if(!socket.nickname) return;
        delete users[socket.nickname];
        UpdateNickName();
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});