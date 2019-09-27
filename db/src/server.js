const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')

let app = express()
app.use(cors())
app.use(bodyParser.json())

// For ease of this tutorial, we are going to use SQLite to limit dependencies
let database = new Sequelize({
  dialect: 'sqlite',
  storage: './brewkit.sqlite',
  operatorsAliases: Sequelize.Op,
})

// Define our Post model
// id, createdAt, and updatedAt are added by sequelize automatically
let Configuration = database.define('configuration', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  // Just a string, not a DATE or anything fancy
  date: Sequelize.STRING,
  mode: Sequelize.STRING,
  slackChannel: Sequelize.STRING,
  slackWebhook: Sequelize.STRING,
  RTUs: Sequelize.JSON
}, {
  // I'm not sure i need this but i'm too lazy to check
  timestamps: false
})

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: database
})

// Create the dynamic REST resource for our Configuration model
let userResource = epilogue.resource({
  model: Configuration,
  endpoints: ['/configuration', '/configuration/:id']
})

// Resets the database if true and launches the express app on :8081
database
  .sync({ force: true })
  .then(() => {
    app.listen(8081, () => {
      console.log('listening to port localhost:8081')
    })
  });
