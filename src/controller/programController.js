const controller = {};
const con = require('../config/connection');

const direccion = 'https://tul6nj3s0e.execute-api.us-east-2.amazonaws.com/github-heroku';
const api = con(direccion);

/*controller.fito = (req, res) => {
    res.render('fito');
}*/

controller.registro = (req, res) => {
    res.render('registro');
}

controller.registroS = (req, res) => {
    const { user, Password1, Password2 } = req.body;
    let errors = [];

    if (!user) {
        errors.push({
            text: 'Por Favor Ingrese Usuario'
        });
    }
    if (!Password1) {
        errors.push({
            text: 'Por Favor Ingrese Contraseña'
        });
    }
    if (!Password2) {
        errors.push({
            text: 'Por Favor Ingrese Confirmación Contraseña'
        });
    }

    if (errors.length > 0) {
        res.render('registro', {
            errors,
            user,
            Password1,
            Password2
        });
    } else {
        res.redirect('/sort/sorteo?primo=' + primoSelecto + '&pert=0&vec=3&to=0');
    }
}

controller.login = (req, res) => {
    res.render('login');
}

controller.inicioS = (req, res) => {
    const { user, Password1 } = req.body;
    let errors = [];

    console.log(user, Password1);
    if (!user) {
        errors.push({
            text: 'Por Favor Ingrese Usuario'
        });

    }
    if (!Password1) {
        errors.push({
            text: 'Por Favor Ingrese Contraseña'
        });
    }

    if (errors.length > 0) {
        res.render('login', {
            errors,
            user,
            Password1
        });
    } else {
        const endpoint = '/ej-login';
        api.post(endpoint, {
            "id": user,
            "contra": Password1
        }).then(resp => {
            if (resp.data.statusCode == 200) {
                res.redirect('/using/inicio');
            } else {
                errors.push({
                    text: 'Usuario o Contraseña Incorrectos'
                });
                res.render('login', {
                    errors
                });
            }
        }).catch(err => {
            console.log('err: '+err);
            errors.push({
                text: err
            });
            errors.push('Usuario o Contraseña Incorrectos');
            res.render('login', {
                errors
            });
        });
    }
}

controller.inicio = (req, res) => {
    res.render('inicio');
}


module.exports = controller;