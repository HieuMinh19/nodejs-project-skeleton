require('dotenv').config()
import routes from './routers'
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
require('dotenv').config()

// Express Initialize
const app = express();
const port = process.env.PORT

const router = express.Router();

app.server = http.createServer(app);

app.listen(port, () => {
    console.log('listen port', port);
})

app.use('/api/v1', router);

// parse application/x - www - form - urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Router will all be prefixed with /api/v1
app.use('/api/v1', routes);
