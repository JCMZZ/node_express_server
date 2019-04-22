/**
 * 页面默认数据配置
 */
const CONFIG = {
    STATIC_PATH: 'http://localhost:3000',
    SERVER_PATH: 'http://localhost:3000/web',
    DOMAIN: 'localhost',
    account: '总管'
}
/**
 * 配置工程路径
 */
const PROJECT = '/web'
/**
 * 秘钥
 */
const SECRET = 'JCM'
/**
 * 排除拦截配置
 */
const EXCLUDE = ['/login', '/login/**']

module.exports = { CONFIG, PROJECT, SECRET, EXCLUDE };