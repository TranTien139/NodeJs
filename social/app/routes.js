var User = require('../app/models/user');
var Friend = require('../app/models/friend');
var async = require("async");
var path = require('path'),
    fs = require('fs');
module.exports = function (app, passport, server) {
    app.get('/user', auth, function (request, response) {
        response.render('user.html', {
            user: request.user
        });
    });

    app.get('/image.png', function (req, res) {
        res.sendfile(path.resolve('./uploads/image_' + req.user._id));
    });

    app.get('/edit', auth, function (request, response) {
        response.render('edit.html', {
            user: request.user
        });
    });
    app.get('/home', auth, function (request, response) {
        response.render('index.html', {
            user: request.user
        });
    });
    app.get('/logout', function (request, response) {
        request.logout();
        response.redirect('/');
    });

    app.get('/login', function (request, response) {
        response.render('login.html', {message: request.flash('error')});
    });
    app.get('/', function (request, response) {
        response.render('login.html', {message: request.flash('error')});
    });
    app.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup', function (request, response) {
        response.render('signup.html', {message: request.flash('signuperror')});
    });


    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    app.get('/edit', function (request, response) {
        response.render('edit.html', {message: request.flash('updateerror')});
    });


    app.post('/editprofile', function (req, res) {
        User.findOne({'user.email': req.body.txtemail}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user)
                user.updateUser(req, res)

        });
    });


    app.get('/profile/:id_member', auth, function (request, response) {
        response.render('profile.html', {
            user: request.user,
            user_member: request.params.id_member
        });
    });


    app.get("/search_friend", auth, function (req, res) {
        var regex = new RegExp(req.query["keyword"], 'i');
        var query = User.find({$or: [{'user.username': regex}, {'user.email': regex}]}).limit(100);
        query.exec(function (err, users) {
            if (!err) {
                // res.send(users, {
                //     'Content-Type': 'application/json'
                // }, 200);
                res.render('search.html', {
                    key: req.query.keyword,
                    result: users,
                    user: req.user
                });

            } else {
                res.send(JSON.stringify(err), {
                    'Content-Type': 'application/json'
                }, 404);
            }
        });

    });


    app.post('/friend', function (request, response) {
        Friend.findOne({$and: [{'friend.mainfriendid': request.param('mainfriendid')}, {'friend.anotherfriendid': request.param('anotherfriendid')}]}, function (err, friend) {
            if (err) {
                return done(err);
            }
            if (friend) {
                response.redirect('/profile');

            } else {
                if (request.param('anotherfriendid') != '') {
                    var newFriend = new Friend();
                    newFriend.friend.mainfriendid = request.param('mainfriendid');
                    newFriend.friend.anotherfriendid = request.param('anotherfriendid');
                    newFriend.save();
                }
                response.redirect('/profile');
            }
        });
    });

    app.get('/auth/facebook',
        passport.authenticate('facebook', {scope: 'email'}));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/home',
            failureRedirect: '/login'
        }));


    app.get('/auth/google',
        passport.authenticate('google', {scope: ['profile', 'email']}));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/home',
            failureRedirect: '/login'
        }));


    var io = require('socket.io').listen(server);

    var usernames = {};

    io.sockets.on('connection', function (socket) {

        socket.on('adduser', function (username) {
            socket.username = username;
            usernames[username] = username;
            io.sockets.emit('updateusers', usernames);
        });

        socket.on('disconnect', function () {
            delete usernames[socket.username];
            io.sockets.emit('updateusers', usernames);
            socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
        });
    });

};
function auth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}
