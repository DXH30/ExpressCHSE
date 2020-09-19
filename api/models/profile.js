'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  profile.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    user_id: DataTypes.INTEGER,
    alamat: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    provinsi: DataTypes.STRING,
    kabupaten: DataTypes.STRING,
    kode_pos: DataTypes.STRING,
    prov_id: DataTypes.INTEGER,
    kab_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'profile',
  });
  return profile;
};
