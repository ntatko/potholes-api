var express = require('express');
var router = express.Router();
const getSignedUrl = require('../aws/getSignedUrl.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getSignedUrl', (req, res) => {
  getSignedUrl(req, res)
})

module.exports = router;
