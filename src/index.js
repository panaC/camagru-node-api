/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: pleroux <pleroux@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/07/13 14:55:45 by pleroux           #+#    #+#             */
/*   Updated: 2018/07/13 16:27:24 by pleroux          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const mongoose    = require('mongoose');
const jwt         = require('jsonwebtoken');
const config      = require('../config'); // get our config file
const os          = require('os')
const port        = process.env.PORT || 8080;

mongoose.connect(config.db, { useNewUrlParser: true }); // connect to database

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// pictures directory static
// user avatar directory static
app.use(express.static('static'));

// basic route
app.get('/', (req, res) => {
  res.send('Hello! The API is at : https://' + req.headers.host + '/api');
});

app.get('/api/getUsername', (req, res) => {
  res.send({ username: os.userInfo().username })
});

app.listen(port, () => console.log('Listening on port 8080!'));
