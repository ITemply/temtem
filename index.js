const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser');
const request = require('request')
const app = express()
const dotenv = require("dotenv")

dotenv.config()

app.set('views', path.join(__dirname, 'public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

function dbInteract(sql){
  var clientServerOptions = {
    uri: process.env.DB_URL,
    body: JSON.stringify({"operation": "sql", "sql": sql}),
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "authorization": "Basic " + process.env.DB_AUTH,
        "cache-control": "no-cache"
    }
  }
  request(clientServerOptions, function (error, response) {
    if (error != null) {
      console.log(error)
      return error
    }
    return response.body
  })
}

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/signin', (req, res) => {
  res.render('signin')
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.post('/signup', (req, res) => {
  data = req.body
  username = data.username
  password = data.password
  res.send(req.body)
})

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000')
})