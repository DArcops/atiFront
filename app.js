var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var mongoose     = require ('mongoose');

var routes = require('./routes/index');
var providers  = require('./routes/providers');
var dashboard = require('./routes/dashboard');

var app = express();

// view engine setup
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.use('/courses',express.static(path.join(__dirname,'public')));
app.use('/course',express.static(path.join(__dirname,'public')));
app.use('/lesson',express.static(path.join(__dirname,'public')));
app.use('/exercise',express.static(path.join(__dirname,'public')));
app.use('/exercise/update',express.static(path.join(__dirname,'public')));
app.use('/exercise/update/:exercise_id',express.static(path.join(__dirname,'public')));
app.use('/lesson/update',express.static(path.join(__dirname,'public')));
app.use('/course/update',express.static(path.join(__dirname,'public')));
app.use('/courses/:course_id',express.static(path.join(__dirname,'public')));
app.use('/courses/:course_id/lessons',express.static(path.join(__dirname,'public')));
app.use('/courses/:course_id/lessons/:lesson_id/exercises',express.static(path.join(__dirname,'public')));

app.use('/providers/:provider_id/devices',express.static(path.join(__dirname,'public')));


//////////OOOOLLLLLDDDD//////////////////////////////
app.use('/lessons',express.static(path.join(__dirname,'public')));
app.use('/exercises',express.static(path.join(__dirname,'public')));


app.use('/', routes);
app.use('/providers', providers);
app.use('/dashboard', dashboard);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

mongoose.connect("mongodb://localhost/users",function(err,res){
  if(err)
    console.log("no se pudo conectar a la base de datos");
    else {
      console.log("ya se conecto a la base de datos");
    }
});


module.exports = app;
