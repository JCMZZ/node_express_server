/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('auth_page', {
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
    navigation_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    page_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'auth_page'
  });
};
