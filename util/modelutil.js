let { EmayUser, AuthRole, AuthOper, AuthPage, AuthNavigation } = require('../models');
class ModelUtil {
    constructor() { }
}
/**
 * 根据用户名查询用户信息
 * @param {String} username
 */
ModelUtil.prototype.userInfo = function (username) {
    let EmayUserConfig = {
        where: {
            username: username
        },
        include: [{
            model: AuthRole,
            /* 不查询/隐藏 关联表信息 */
            through: {
                attributes: []
            },
            include: [{
                model: AuthPage,
                through: {
                    attributes: [],
                    where: {
                        type: 'PAGE'
                    }
                },
                include: [{
                    model: AuthNavigation
                }]
            }, {
                model: AuthOper,
                through: {
                    attributes: [],
                    where: {
                        type: 'OPER'
                    }
                }
            }]
        }]
    }
    return EmayUser.findOne(EmayUserConfig)
}
/**
 * 根据用户id查询用户信息
 * @param {Number} userId
 */
ModelUtil.prototype.upDateUserInfo = function (userId) {
    return EmayUser.findByPk(userId)
}
/**
 * 根据用户id查询用户信息和当前用户角色信息
 * @param {Number} userId
 */
ModelUtil.prototype.userRoleInfo = function (userId) {
    let EmayUserConfig = {
        include: [{
            model: AuthRole,
            /* 不查询/隐藏 关联表信息 */
            through: {
                attributes: []
            }
        }]
    }
    return EmayUser.findByPk(userId, EmayUserConfig)
}
module.exports = new ModelUtil()