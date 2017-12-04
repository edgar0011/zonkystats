// @flow

import express from 'express';
import bodyParser from 'body-parser';

const app = express();

/* global __dirname */
/* global process */

app.use(express.static(`${__dirname}/dist`));
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 8080);

