const bodyParser = require('body-parser');
const { response } = require('express');
const express = require('express');
const { request } = require('http');
const authRouter = require('./routes/auth');
const expressLayouts = require('express-ejs-layouts')

const app = express();
app.use(bodyParser.json());
app.use(expressLayouts);

app.set('layout', './layouts/layout');
app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));
app.use('/auth',express.static(__dirname + '/public'));
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



//GET http://localhost:3000/
app.use(authRouter);


app.listen(3000);
console.log('Server runs at port 3000');