//timtamtemtil

const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser');
const request = require('request')
const crypto = require('crypto')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

app.set('views', path.join(__dirname, 'public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

function hashString(string) {
  return crypto.createHash('sha512').update(string).digest('hex')
}

function dbInteract(sql) {
  var clientServerOptions = {
    uri: process.env.DB_URL,
    body: JSON.stringify({ "operation": "sql", "sql": sql }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "authorization": "Basic " + process.env.DB_AUTH,
      "cache-control": "no-cache"
    }
  }
  return new Promise((resolve, reject) => {
    var returnVal = ''
    request(clientServerOptions, function (error, response) {
      if (error != null) {
        console.log(error)
        reject(response.body)
      }
      resolve(response.body)
    })
  })
}

async function getUserId() {
  var data = await dbInteract('SELECT * FROM accounts.accountCount')
  console.log(data)
  var dataObject = JSON.parse(data)
  var jsonData = dataObject[0]
  var numberCount = jsonData.numberCount
  return numberCount
}

getUserId()

app.get('/', (req, res) => {
  console.log('Sending [GET]: Index')
  res.render('index')
})

app.get('/signin', (req, res) => {
  console.log('Sending [GET]: Signin')
  res.render('signin')
})

app.get('/signup', (req, res) => {
  console.log('Sending [GET]: Signup')
  res.render('signup')
})

app.post('/signup-new', async (req, res) => {
  const data = req.body
  var username = data.username
  var password = data.password
  var hashedPassword = hashString(password)
  var checkUsername = username.toLowerCase()
  var userId = await getUserId() + 1

  console.log('Sending [POST]: Signup')
  res.send(req.body)
})

app.listen(3000, () => {
  console.log('TemTem started on port 3000.')
})