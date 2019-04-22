let pool = require('../bin/pool');
let auth_navigation = require('./auth_navigation');
let AuthNavigation = pool.import('auth_navigation', auth_navigation);
let auth_oper = require('./auth_oper');
let AuthOper = pool.import('auth_oper', auth_oper);
let auth_page = require('./auth_page');
let AuthPage = pool.import('auth_page', auth_page);
let auth_role = require('./auth_role');
let AuthRole = pool.import('auth_role', auth_role);
let auth_role_auth = require('./auth_role_auth');
let AuthRoleAuth = pool.import('auth_role_auth', auth_role_auth);
let auth_user_role = require('./auth_user_role');
let AuthUserRole = pool.import('auth_user_role', auth_user_role);
let emay_user = require('./emay_user');
let EmayUser = pool.import('emay_user', emay_user);
/* 用户与角色多对多关联 */
EmayUser.belongsToMany(AuthRole, {through: AuthUserRole, foreignKey: 'user_id'});
AuthRole.belongsToMany(EmayUser, {through: AuthUserRole, foreignKey: 'role_id'});
/* 导航与页面单对多关联 */
AuthNavigation.hasMany(AuthPage, {foreignKey: 'navigation_id'})
AuthPage.belongsTo(AuthNavigation, {foreignKey: 'navigation_id'})
/* 角色与页面多对多关联 */
AuthRole.belongsToMany(AuthPage, {through: AuthRoleAuth, foreignKey: 'role_id'});
AuthPage.belongsToMany(AuthRole, {through: AuthRoleAuth, foreignKey: 'auth_id'});
/* 角色与操作多对多关联 */
AuthRole.belongsToMany(AuthOper, {through: AuthRoleAuth, foreignKey: 'role_id'});
AuthOper.belongsToMany(AuthRole, {through: AuthRoleAuth, foreignKey: 'auth_id'});

module.exports = { pool, AuthNavigation, AuthOper, AuthPage, AuthRole, AuthRoleAuth, AuthUserRole, EmayUser }