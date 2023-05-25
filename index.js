const express = require('express')
const dataBaseConnected = require('./config/dbConnection')
const routes = require('./routes')
var cors = require('cors')
const app = express()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
dataBaseConnected()
app.use(routes)

app.get('/', function (req, res) {
  res.send('Hello World')
})


app.listen(3000)