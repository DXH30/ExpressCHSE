'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  pembayaran.init({
    userid: DataTypes.INTEGER,
    keterangan: DataTypes.TEXT,
    nominal: DataTypes.BIGINT,
    nama_file: DataTypes.STRING,
    no_rek: DataTypes.STRING,
    kurir: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pembayaran',
  });
  return pembayaran;
};
