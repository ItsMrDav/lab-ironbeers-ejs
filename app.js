const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res, next) => {
  res.render('index');
});
app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersApi => {
      res.render('beers', { beersApi });
    })
    .catch(err => console.log(err));
});

app.get('/randomBeer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      console.log('Heres a random beer', randomBeer);
      res.render('randomBeer', { randomBeer });
    })
    .catch(err => console.log(err));
});

app.get('/beerId/:id', (req, res) => {
  const { id } = req.params;
  punkAPI
    .getBeer(id)
    .then(singleBeer => {
      console.log('Heres a single beer', singleBeer);
      res.render('singleBeer', { singleBeer });
    })
    .catch(err => console.log(err));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
