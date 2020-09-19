var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var cors = require('cors')
var engines = require('consolidate');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var meetingRouter = require('./routes/meeting');
var profileRouter = require('./routes/profile');
var userRouter = require('./routes/user');
var testmailRouter = require('./routes/testmail');
var videourlRouter = require('./routes/videourl');
var adminRouter = require('./routes/admin');
var pembayaranRouter = require('./routes/pembayaran');
var rajaongkirRouter = require('./routes/rajaongkir');
var testRouter = require('./routes/test');

var app = express();

require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', engines.swig);
app.set('view engine', 'html');
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: [
        'https://dieng.mice.id',
        'https://dieng.primakom.co.id',
        'http://localhost:4000',
        'http://localhost:8080', 
        'http://localhost:8080/#/checkout', 
        ]
}));


//app.use(cors({origin: '*'}));
app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/meeting', meetingRouter);
app.use('/profile', profileRouter);
app.use('/user', userRouter);
app.use('/testmail', testmailRouter);
app.use('/videourl', videourlRouter);
app.use('/admin', adminRouter);
app.use('/pembayaran', pembayaranRouter);
app.use('/rajaongkir', rajaongkirRouter);
app.use('/test', testRouter);
app.use(function(req, res, next) {
    const allowedOrigins = ['https://dieng.mice.id', 'http://localhost:8080'];
    // Website you wish to allow to connect
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
});

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
    res.render('error.pug');
});

module.exports = app;
