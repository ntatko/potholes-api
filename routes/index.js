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

// non-prod ssl cert-bot ownership verification
router.get('/.well-known/acme-challenge/njHSIYK7Ldae56llNmIFYX6frJEV9vc41QGyHj_TWH4', (req, res) => {
  res.send('njHSIYK7Ldae56llNmIFYX6frJEV9vc41QGyHj_TWH4.pBmTC1lYIVqg6-3hOkTol4MqZStH_3UoSDuIm-F21PI');
})

// prod ssl cert-bot ownership verification
router.get('/.well-known/acme-challenge/8Marfd4Pv7pWUfuBjOVy_mPj-jaxu7F_60ubEZPHFe0', (req, res) => {
  res.send('8Marfd4Pv7pWUfuBjOVy_mPj-jaxu7F_60ubEZPHFe0.pBmTC1lYIVqg6-3hOkTol4MqZStH_3UoSDuIm-F21PI')
})

module.exports = router;
