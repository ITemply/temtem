const express = require('express');
const path = require('node:path'); 
const app = express();

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/signin', (req, res) => {
  res.render('signin');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});