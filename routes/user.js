let express = require('express');
let crypto = require('crypto');
let router = express.Router();
let { pool, AuthOper, AuthPage, AuthRole, AuthRoleAuth, AuthUserRole, EmayUser } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let { UtilResponse, WebUtil, ModelUtil } = require('../util');
/**
 *  GET user page
 * */
router.get('/user', function (req, res, next) {
  res.template('user', { currentPageId: 1 });
});
/**
 * 用户列表
 */
router.post('/user/ajax/list', async function (req, res) {
  let response = new UtilResponse(res);
  let { username, state, limit, start } = req.body;
  let where = {};
  username && (where['username'] = { [Op.like]: '%' + username + '%' });
  state && (where['user_state'] = state);
  let { count, rows } = await EmayUser.findAndCountAll({ where, offset: Number(start), limit: Number(limit) });
  let result = {
    currentPage: Number(start) / Number(limit) + 1,
    limit: Number(limit),
    list: rows.map(item => item.get({ plain: true })),
    start: Number(start),
    totalCount: count,
    totalPage: Math.ceil(count / limit)
  };
  response.setResult(result);
  res.json(response);
});
/**
 * 角色信息列表
 */
router.post('/user/ajax/allroles', async function (req, res) {
  let response = new UtilResponse(res);
  let allroles = await AuthRole.findAll();
  allroles || (allroles = []);
  response.setResult({ allroles });
  res.json(response);
});
/**
 * 添加用户
 */
router.post('/user/ajax/add', async function (req, res) {
  let response = new UtilResponse(res);
  let { username, password, nickname, mobile: mobile = '', email, roles } = req.body;
  let message = null;
  WebUtil.isEmpty(username) && (message = '用户名不能为空！');
  WebUtil.isEmpty(password) && (message = '密码不能为空！');
  WebUtil.isEmpty(nickname) && (message = '姓名不能为空！');
  WebUtil.isEmpty(mobile) && (message = '手机号不能为空！');
  !/^1[3,5,8]\d{9}$/.test(mobile) && (message = '手机号码不正确！');
  WebUtil.isEmpty(email) && (message = 'Email不能为空！');
  !/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email) && (message = 'Email格式不正确！');
  WebUtil.isEmpty(roles) && (message = '角色不能为空！');
  if (message) {
    response.setSuccess(false).setMessage(message);
    res.json(response);
    return;
  }
  let addUserOption = {
    where: { username },
    defaults: {
      username, nickname, mobile, email,
      password: crypto.createHash('md5').update(password).digest('hex'),
      user_state: 2,
      create_time: WebUtil.date().now,
      create_user_id: ''
    }
  };
  /* 事务 */
  pool.transaction(transaction => {
    return EmayUser.findOrCreate({ ...addUserOption, transaction })
      .then(([user, isNewRecord]) => {
        if (isNewRecord) {
          return AuthUserRole.create({ role_id: 1, user_id: user.get({ plain: true }).id }, { transaction })
        }
        throw new Error();
      });
  })
    .then(result => {
      response.setMessage('用户添加成功！');
      response.setMessage('用户已存在！');
      res.json(response);
    })
    .catch(err => {
      response.setSuccess(false).setMessage('用户已存在！');
      res.json(response);
    })
});
/**
 * 用户信息
 */
router.post('/user/ajax/userinfo', async function (req, res) {
  let response = new UtilResponse(res);
  let { userId } = req.body;
  let userRoleInfo = await ModelUtil.userRoleInfo(userId);
  // let userRoleInfo
  response.setSuccess(false).setMessage('用户已存在！');
  res.json(response);
  userRoleInfo.get({ plain: true })
});


module.exports = router;
