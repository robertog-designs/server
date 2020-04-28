const express = require('express');
const app = express();
const path = require('path');

var cors = require('cors');

// routes
const email = require('../routes/api/sendemail');

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/api-server', (req, res) => res.send('API de fisdesigns'));

// use Routes
app.use('/api/sendemail', email);

const port = process.env.PORT || 3050;
app.listen(port, () => console.log(`Server running on port ${port}`));