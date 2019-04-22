let crypto = require('crypto');
let { SECRET } = require('../bin/config');
let { pool, AuthOper, AuthPage, AuthRole, AuthRoleAuth, AuthUserRole, EmayUser } = require('../models');
class WebUtil {
    constructor() { }
}
WebUtil.prototype.isEmpty = function (str) {
    return str === '' || str === undefined || str === null ? true : false
}
WebUtil.prototype.date = function (str) {
    let now = new Date().toLocaleString('chinese', { hour12: false }).replace(/\//g, '-')
    return { now }
}
WebUtil.prototype.getToken = function ({ username, password }) {
    return crypto.createHash('md5').update(username + SECRET + password).digest('hex').toUpperCase();
}
WebUtil.prototype.sessionEMSD = function (req, cmd, key, value) {
    let EMSD = req.cookies['EMSD'];
    let currentData = req.session[EMSD] || req.session[EMSD] === 'null' ? JSON.parse(req.session[EMSD]) : {}
    let returnedValue = null
    switch (cmd) {
        case 'set':
            currentData[key] = value
            returnedValue = currentData
            req.session[EMSD] = JSON.stringify(currentData)
            return returnedValue
        case 'del':
            returnedValue = currentData[key]
            delete currentData[key]
            req.session[EMSD] = JSON.stringify(currentData)
            return returnedValue
        case 'get':
            returnedValue = key === undefined ? currentData : currentData[key]
            return returnedValue
        case 'clear':
            req.session[EMSD] = null
            return true
    }
}
/**
 * 保存用户信息
 * authRoles 角色与操作权限信息
 * username 用户名
 * currentPassword 加密后密码
 */
WebUtil.prototype.setEMSDUserInfo = async function (req, { authRoles, username, currentPassword, userId }) {
    /* 页面与操作权限合并 */
    authRoles = authRoles.map(function (item) {
        item.auth_pages = item.auth_pages.map(function (val) {
            val.opers = item.auth_opers.filter(function (valItem) {
                return valItem.page_auth_id === val.id
            })
            return val
        })
        delete item.auth_opers
        return item
    });
    /* 过滤出导航、角色 */
    let navs = []
    let roles = []
    let operAuth = []
    authRoles.forEach(val => {
        roles.push(val.name)
        val.auth_pages.forEach(item => {
            let currentNav = navs.find(findVal => findVal.id === item.auth_navigation.id)
            currentNav = currentNav ? currentNav : { pages: [] }
            currentNav.id || (navs.push(currentNav))
            Object.assign(currentNav, item.auth_navigation)
            delete item.auth_navigation
            currentNav.pages.push(item)
        })
    });
    navs.forEach(item => {
        let pages = item.pages.map(stringify => JSON.stringify(stringify))
        pages = Array.from(new Set(pages))
        item.pages = pages.map(parse => JSON.parse(parse))
        item.pages.forEach(val => {
            operAuth = operAuth.concat(val.opers)
        });
    });
    let operAll = await AuthOper.findAll()
    operAll = operAll.map(oper => {
        oper = oper.get({ plain: true });
        oper.isAuth = operAuth.find(itemVal => itemVal.auth_code === oper.auth_code) ? true : false;
        return oper;
    })
    this.sessionEMSD(req, 'set', 'navs', navs);
    this.sessionEMSD(req, 'set', 'roles', roles);
    this.sessionEMSD(req, 'set', 'operAuth', operAll);
    this.sessionEMSD(req, 'set', 'username', username);
    this.sessionEMSD(req, 'set', 'password', currentPassword);
    this.sessionEMSD(req, 'set', 'userId', userId);
}
module.exports = new WebUtil()