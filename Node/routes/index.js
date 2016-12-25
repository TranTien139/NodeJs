var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:order', function(req, res, next) {
  var order = req.param.order;
  chatVLModel.getNewItems(order, function (err, dsItem) {
      var dataToView = {items:dsItem};
  });
  res.render('index', dataToView);
});

router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/', function(req, res, next) {
    var items = [{
        'image':'http://chatvl.tv/pdata/t/426948.jpg',
        'title' : 'Giải thích hộ em với?'
    },
        {
            'image':'http://chatvl.tv/pdata/t/426948.jpg',
            'title' : 'Giải thích hộ em với?'
        }
    ]
    res.json(items);
});

module.exports = router;
