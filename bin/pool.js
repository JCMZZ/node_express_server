let Sequelize = require('sequelize');
/**
 * 数据库配置
 */
let pool = new Sequelize('example', 'root', '666666', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	define: {
		timestamps: false
	}
});
module.exports = pool