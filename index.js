const bodyParser = require('body-parser');
const { response } = require('express');
const express = require('express');
const { request } = require('http');
const expressLayouts = require('express-ejs-layouts');
const authRouter = require('./routes/auth');
const edukasiRouter = require('./routers/edukasi');
const foodRouter = require('./routers/food');
const healthRouter = require('./routers/health');
const hypeRouter = require('./routers/hype');
const keuanganRouter = require('./routers/keuangan');



const app = express();
app.use(bodyParser.json());
app.use(expressLayouts);

app.set('layout', './layouts/layout');
app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));
app.use('/edukasi',express.static(__dirname + '/public'));
app.use('/food',express.static(__dirname + '/public'));
app.use('/health',express.static(__dirname + '/public'));
app.use('/hype',express.static(__dirname + '/public'));
app.use('/keuangan',express.static(__dirname + '/public'));


app.use(bodyParser.urlencoded());
app.use(express.static('pages'));


//GET http://localhost:3000/about
app.get('/about',(request,response) =>{
    response.send('About us!!!');
});

//GET http://localhost:3000/test/500
app.get('/test/:id',(request,response) =>{
    const data = request.params.id;
    response.send(`Request data = ${data}`);
});

//GET http://localhost:3000/login => menampilkan form login
app.get('/login',(request,response) =>{
    response.send('Masukkan username dan password')
});


//POST http://localhost:3000/login => melakukan login, cek username dan password yang diketik user
app.post('/login', async (request,response) =>{
    const username = request.body.password;
    const password = request.body.password;
    response.send(`Request POST login: ${username} and ${passowrd}`);
});



//use router
app.use(authRouter);
app.use(edukasiRouter,'/edukasi');
app.use(foodRouter,'/food');
app.use(healthRouter,'/health');
app.use(hypeRouter,'/hype');
app.use(keuanganRouter,'/keuangan');


app.listen(3000);
console.log('Server runs at port 3000');