let express = require('express');
let router = express.Router();
router.get('/role', function (req, res, next) {
  res.template('role', { currentPageId: 2 });
});

module.exports = router;
 