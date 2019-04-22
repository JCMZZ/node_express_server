let express = require('express');
let router = express.Router();
/* GET home page. */
router.get('/log', function(req, res, next) {
  res.template('log');
});

module.exports = router;
