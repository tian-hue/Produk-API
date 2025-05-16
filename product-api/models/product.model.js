const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    field: 'ID' // Pastikan nama kolom di database
  },
  Nama: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Nama' // Sesuaikan dengan nama kolom di database
  },
  Deskripsi: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Deskripsi'
  },
  Harga: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Harga'
  },
  Kategori: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Kategori'
  },
  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'CreatedAt'
  },
  UpdatedAt: {
    type: DataTypes.DATE,
    field: 'UpdatedAt'
  },
  DeletedAt: {
    type: DataTypes.DATE,
    field: 'DeletedAt'
  }
}, {
  timestamps: false,
  tableName: 'products'
});

module.exports = Product;