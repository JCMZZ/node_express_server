/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('auth_oper', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    auth_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    l_index: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    page_auth_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'auth_oper'
  });
};
