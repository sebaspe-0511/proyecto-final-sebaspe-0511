const express = require('express');
const app = express();
const path = require('path');
const puerto = 3000;
const datosCartelera = require('./data.json');
app.use(express.static(path.join(__dirname, '/')));
app.get('/api/cartelera', (req, res) => {
    res.json(datosCartelera);
});
app.listen(puerto, () => {
    console.log(`¡Servidor encendido y listo!`);
    console.log(`Abre tu navegador y entra a: http://localhost:${puerto}/Cartelera.html`);
});