const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const { mongoURL, PORT } = require('./mongo')
const beritaKitaRouter = require('./routes/beritaKitaRouter');
const beritaKitaAuth = require('./routes/beritaKitaAuth')
var cookieParser = require('cookie-parser');
var session = require('express-session');


mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err))


//set configuration
app.use(expressLayouts);
app.set('layout', './layouts/layout');

//static file
app.use(express.static(__dirname + '/public'));
app.use('/genre',express.static(__dirname + '/public'));
app.use('/news', express.static(__dirname + '/public'));
app.use('/search', express.static(__dirname + '/public'));
app.use('/sign', express.static(__dirname + '/public'));




//app.set
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static('pages'));
app.set('view engine','ejs');

// Set Views
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));
//configure the options however you need them, obviously
app.use(cookieParser());

app.use(beritaKitaRouter)
app.use('/sign', beritaKitaAuth)
app.get('*', (req,res) => {
    res.render('pages/404')
  })

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))