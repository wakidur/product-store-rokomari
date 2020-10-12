const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
// require and configure dotenv, will load vars in .env in PROCESS.ENV
dotenv.config({ path: '.env' });

const app = express();
app.use(bodyParser.json());

const port = process.env.SERVER_PORT || 4000;
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
