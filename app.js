var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});
//const PORT = process.env.PORT || 5000;

var session = require('express-session');

// var indexRouter = require('./routes/index');
// var loginRouter = require('./routes/login');
// var signupRouter = require('./routes/signup');

var app = express();
const { config } = require('process');

app.use(session({
  secret : 'webslesson',
  resave : true,
  saveUninitialized : true
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', require('./routes/index.js'));
// app.use('/auth', require('./routes/auth.js'));
// app.use('/login', loginRouter);
// app.use('/signup', signupRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


//app.listen(PORT, () => {
//    console.log(`Our app is running on port ${ PORT }`);
//});

module.exports = app;
