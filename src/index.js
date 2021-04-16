const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

//index route
app.get('/', (req, res) => {
    res.redirect('/auth/login');
});
// routes
app.use('/auth', require('./routes/login'));
app.use('/sort', require('./routes/sorteo'));
//app.use('/clients', require('./routes/clients'));

const port = process.env.PORT || 3000;

app.listen(port, console.log('Servidor corriendo en puerto '+port));