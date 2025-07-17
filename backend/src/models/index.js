const fs = require('fs')
const path = require('path')
const sequelize = require('../config/database')

const models = {}

fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.model.js'))
  .forEach(file => {
    const defineModel = require(path.join(__dirname, file))
    const model = defineModel(sequelize)
    models[model.name] = model
  })

Object.values(models).forEach(model => {
  if (model.associate) model.associate(models)
})

models.sequelize = sequelize
models.Sequelize = sequelize.Sequelize

module.exports = models
