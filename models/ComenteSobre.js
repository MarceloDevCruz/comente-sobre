const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const ComenteSobre = db.define('ComenteSobre', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  commentary: {
    type: DataTypes.TEXT,
    allowNull: false,
    require: true,
  },
})

ComenteSobre.belongsTo(User)
User.hasMany(ComenteSobre)

module.exports = ComenteSobre