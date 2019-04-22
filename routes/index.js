let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let { UtilResponse, WebUtil, ModelUtil} = require('../util');
/**
 * GET index page
 */
router.get('/', function(req, res, next) {
  res.template('index',{currentPage:{name:'欢迎'}});
});
/**
 * 修改密码
 */
router.post('/changepass', function(req, res) {
  let response = new UtilResponse(res);
  response.setSuccess(false)
  let {userId, password: currentPassword} = WebUtil.sessionEMSD(req, 'get');
  let {password, newpass} = req.body;
  if(WebUtil.isEmpty(password) || WebUtil.isEmpty(newpass)){
    response.setMessage('密码不能为空');
    res.json(response);
    return;
  }
  password = crypto.createHash('md5').update(password).digest('hex');
  if (currentPassword === password) {
    ModelUtil.upDateUserInfo(userId).then(userInfo => {
      if(userInfo) {
        (async ()=>{
          let result = await userInfo.update({password: crypto.createHash('md5').update(newpass).digest('hex')});
          if(result) {
            response.setSuccess(true).setMessage('密码更改成功');
          } else {
            response.setMessage('密码更改失败');
          }
          res.json(response);
        })();
      } else {
        response.setMessage('密码更改失败');
        res.json(response);
      }
    })
    .catch(err => {
      response.setMessage('数据服务错误请重试');
      res.json(response);
    })
  } else {
    response.setMessage('密码不正确');
    res.json(response);
  }
});

module.exports = router;
