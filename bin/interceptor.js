let { CONFIG, PROJECT, SECRET, EXCLUDE } = require('../bin/config')
let { WebUtil } = require('../util')
let crypto = require('crypto');
module.exports = function () {
  return function (req, res, next) {
    /* res封装template方法，解决模板共用参数传递问题 */
    res.template = function (view, data) {
      data === undefined && (data = {});
      Object.assign(data, CONFIG);
      let operAuth = WebUtil.sessionEMSD(req, 'get', 'operAuth');
      let nvgs = WebUtil.sessionEMSD(req, 'get', 'navs');
      let currentPage = {};
      nvgs.forEach(item => {
        let active = item.pages.find(val => val.id === data.currentPageId)
        active !== undefined && (currentPage = active)
      });
      data = Object.assign({ nvgs, operAuth: JSON.stringify(operAuth), currentPage }, data);
      this.render(view, data);
    }
    /* 客户端cookie */
    let cookie = req.cookies
    let hash = cookie.EMSD ? cookie.EMSD : crypto.createHmac('sha256', SECRET).update('EMSD' + new Date().getTime() + Math.random()).digest('hex').toUpperCase();
    res.cookie('EMSD', hash, { domain: CONFIG.DOMAIN, httpOnly: true, path: PROJECT })
    /* 路径拦截 */
    let path = req.path;
    path = path.match(new RegExp('^(?:' + PROJECT.replace(/(\/)/g, '\\/') + ')([^\\?#]*)'));
    path && (path = path[1]);
    let isNext = EXCLUDE.some(val => {
      if (/\*\*/.test(val) && path) {
        val = val.replace(/(\/)/g, '\\/').replace(/(\*\*)/g, '');
        return new RegExp('^' + val).test(path);
      }
      return path === val;
    })
    let { username, password } = WebUtil.sessionEMSD(req, 'get');
    let checkLogin = !WebUtil.isEmpty(username) && !WebUtil.isEmpty(password) && cookie.TCDI === WebUtil.getToken({ username: username, password: password });
    if (checkLogin || isNext) {
      if (checkLogin && req.path === PROJECT + '/login') {
        res.redirect(PROJECT);
      } else {
        next();
      }
    } else {
      req.session[hash] = null;
      res.redirect(PROJECT + '/login');
    }
  }
}