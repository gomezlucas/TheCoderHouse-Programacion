
var express = require('express');
var app = express();


app.use(express.static('public'));

app.set('view engine', 'pug');
app.get('/', function (req, res) {
  res.render('index');
});

app.set('view engine', 'pug');
app.get('/species', function (req, res) {
  res.render('species');
});

app.set('view engine', 'pug');
app.get('/planets', function (req, res) {
  res.render('planets');
});

app.set('view engine', 'pug');
app.get('/contact', function (req, res) {
  res.render('contact');
});

app.listen(3000, function () {
  console.log(' Holaaa Example app listening on port 3000!');
});


