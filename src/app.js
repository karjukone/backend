import express from 'express';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

// mock-data

const cats = [
  {
    cat_id: 2,
    name: 'Kisu',
    birthdate: '2023-10-08',
    weight: 6,
    owner: 'Hessu',
    image: 'https://loremflickr.com/320/240/cat',
  },
  {
    cat_id: 3,
    name: 'Misu',
    birthdate: '2021-11-18',
    weight: 7,
    owner: 'Hessu',
    image: 'https://loremflickr.com/320/240/cat3',
  },
];

// Web sivusto tarjoillaan public-kansiosta
//app.use('/sivusto', express.static('public')); // aliosoite /sivusto
// tai palvelimen juuri /
app.use(express.static('public'));

// parsii json-datan http-pyynnöstä
app.use(express.json());

// '/api'-polun juuri
app.get('/api/v1', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.get('/api/test', (request, response) => {
  const responseData = {vastaus: 'toimii myös näin'};
  response.send(responseData);
});

// Cats endpoints
app.get('/api/v1/cats', (req, res) => {
  res.json(cats);
});

app.get('/api/v1/cats/:id', (req, res) => {
  //console.log('cat id', req.params.id);
  const cat = cats.find(cat => cat.cat_id === parseInt(req.params.id));
  if (cat) {
    res.json(cat);
  } else {
    //res.sendStatus(404);
    res.status(404).json({message: 'cat not found'});
  }
});

app.post('/api/v1/cats', (req, res) => {
  console.log(req.body);
  // TODO: add posted cat to data
  res.sendStatus(201);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});