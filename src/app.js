const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv-safe').config();

const db = require('./database/mongoConfig');
const filmeRoutes = require('./routes/filmesRoutes');

db.connect() ;

app.use(cors());
app.use(express.json());
app.use("/filmes", filmeRoutes);

module.exports = app;