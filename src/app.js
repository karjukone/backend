import express from 'express';
import api from './api/index.js';
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

export default app;