let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let { captcha, UtilResponse, WebUtil, ModelUtil } = require('../util');
let { CONFIG, PROJECT } = require('../bin/config');
/**
 * 登陆页面
 */
router.get('/login', function (req, res, next) {
  res.render('login', { ...CONFIG, currentPage: { name: '登陆' }, operAuth: JSON.stringify([]) });
});

/**
 * 验证码
 */
router.get('/login/captcha', function (req, res, next) {
  res.setHeader('Content-Type', 'image/jpeg')
  res.send(captcha(req, res));
});
/**
 * 登陆
 */
router.post('/login', function (req, res) {
  let response = new UtilResponse(res);
  let { username, password, captcha } = req.body;
  if (WebUtil.isEmpty(username) || WebUtil.isEmpty(password) || WebUtil.isEmpty(captcha)) {
    response.setSuccess(false).setMessage('用户名称、密码、验证码不能为空');
    res.json(response);
    return
  }
  let checkCaptcha = WebUtil.sessionEMSD(req, 'get', 'captcha') === captcha;
  if (!checkCaptcha) {
    response.setSuccess(false).setMessage('验证码不正确');
    res.json(response);
    return
  }
  ModelUtil.userInfo(username).then(userInfo => {
    if (userInfo === null) {
      response.setSuccess(false).setMessage('用户不存在');
      res.json(response);
      return false;
    }
    userInfo = userInfo.get({ plain: true });
    let currentPassword = crypto.createHash('md5').update(password).digest('hex');
    if (currentPassword === userInfo.password) {
      (async () => {
        await WebUtil.setEMSDUserInfo(req, { authRoles: userInfo.auth_roles, username, currentPassword, userId: userInfo.id })
        res.cookie('TCDI', WebUtil.getToken(userInfo), { domain: CONFIG.DOMAIN, httpOnly: true, path: PROJECT });
        response.setSuccess(true).setResult({ nickname: userInfo.nickname, username: userInfo.username });
        res.json(response);
      })();
    } else {
      response.setSuccess(false).setMessage('密码不正确');
      res.json(response);
    }
  }).catch(err => {
    response.setSuccess(false).setMessage('数据服务错误请重试');
    res.json(response);
  })
});
/**
 * 登出
 */
router.get('/logout', function (req, res) {
  let response = new UtilResponse(res);
  WebUtil.sessionEMSD(req, 'clear')
  response.setSuccess(true)
  res.json(response)
})

module.exports = router;
