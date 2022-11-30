const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  'comentesobre',
  'root',
  '', {
  host: 'localhost',
  dialect: 'mysql',
})

try {
  sequelize.authenticate()
  console.log('Conectou com sucesso!')
} catch (err) {
  console.log(`Erro ao conectar: ${err}`)
}

module.exports = sequelize