const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const { mongoURL, PORT } = require('./mongo')
const authRouter = require('./routes/auth');

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
app.use('/genre/:category',express.static(__dirname + '/public'));
//app.set
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static('pages'));
app.set('view engine','ejs');
app.use(authRouter)

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))