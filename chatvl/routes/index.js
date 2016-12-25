var express = require('express');
var router = express.Router();
var chatvl = require('../models/dataModel.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    chatvl.getAllPost(function(error, items){
        var dataToView = {items : items};
        res.render('index', dataToView);
    });


});

module.exports = router;
