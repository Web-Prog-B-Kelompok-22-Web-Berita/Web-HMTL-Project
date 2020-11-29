const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const { mongoURL, PORT } = require('./mongo')
const authRouter = require('./routes/auth');
const edukasiRouter = require('./routes/edukasi');
const foodRouter = require('./routes/food');
const healthRouter = require('./routes/health');
const hypeRouter = require('./routes/hype');
const keuanganRouter = require('./routes/keuangan');

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
app.use('/edukasi',express.static(__dirname + '/public'));
app.use('/food',express.static(__dirname + '/public'));
app.use('/health',express.static(__dirname + '/public'));
app.use('/hype',express.static(__dirname + '/public'));
app.use('/keuangan',express.static(__dirname + '/public'));

//app.set
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static('pages'));
app.set('view engine','ejs');
app.use(authRouter)
app.use('/edukasi',edukasiRouter)
app.use('/food',foodRouter)
app.use('/health',healthRouter)
app.use('/hype',hypeRouter)
app.use('/keuangan',keuanganRouter)

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))