import express from 'express';
import api from './api/index.js';
import { notFoundHandler, errorHandler } from './api/middlewares/error-handlers.js';

const app = express();

// Web sivusto tarjoillaan public-kansiosta
//app.use('/sivusto', express.static('public')); // aliosoite /sivusto
// tai palvelimen juuri /
app.use(express.static('public'));

// parsii json-datan http-pyynnöstä
app.use(express.json());
// formdataa varten
app.use(express.urlencoded({extended: true}));

// lisää prefixin ja ohjaa siten kaikkki api-routerin sisällä oleville reiteille
app.use('/api/v1', api);

// yksinkertainen middleware
app.get(
  '/example/middleware',
  (req, res, next) => {
    console.log('Moro olen täällä;');
    next();
  },
  (req, res, next) => {
    console.log('Olen middleware ja käsittelen dataa');
    next();
  },
  (req, res) => {
    console.log('Moikka, pääsin perille asti');
    res.send('Tiedosto upattu ja käsitelty');
  }
);

app.use(notFoundHandler); // 404 käsittelijä
app.use(errorHandler); // yleinen virheiden käsittelijä

export default app;