/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: pleroux <pleroux@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/07/13 14:55:45 by pleroux           #+#    #+#             */
/*   Updated: 2018/07/14 12:11:58 by pleroux          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const mongoose    = require('mongoose');
const jwt         = require('jsonwebtoken');
const config      = require('./config'); // get our config file

const port        = process.env.PORT || 8080;
const indexRouter = require('./routes/root.js');
const apiRouter   = require('./routes/api/api.js');

mongoose.connect(config.db, { useNewUrlParser: true }); // connect to database

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// pictures directory static
// user avatar directory static
app.use(express.static('static'));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => console.log('Listening on port 8080!'));
