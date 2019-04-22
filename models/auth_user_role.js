/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('auth_user_role', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    role_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    }
  }, {
    tableName: 'auth_user_role'
  });
};