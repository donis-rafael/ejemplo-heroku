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
    let successes = [];

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
    } else if (Password1 != Password2) {
        errors.push({
            text: 'Las contraseñas no coinciden'
        });
        res.render('registro', {
            errors
        });
    } else {
        const endpoint = '/ej-registro';
        api.post(endpoint, {
            "id": user,
            "contra": Password1
        }).then(resp => {
            if (resp.data.statusCode == 200) {
                successes.push({
                    text: 'Usuario Creado con Exito'
                });
                res.render('login', {
                    successes
                });
            } else {
                errors.push({
                    text: 'Usuario No Creado'
                });
                res.render('registro', {
                    errors
                });
            }
        }).catch(err => {
            console.log('err: ' + err);
            errors.push({
                text: err
            });
            errors.push('Usuario No Creado');
            res.render('registro', {
                errors
            });
        });
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
                res.redirect('/using/inicio?user=' + user + '&txt=');
            } else {
                errors.push({
                    text: 'Usuario o Contraseña Incorrectos'
                });
                res.render('login', {
                    errors
                });
            }
        }).catch(err => {
            console.log('err: ' + err);
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
    const { user, txt } = req.query;
    res.render('inicio', {
        usuario: user,
        traducido: txt
    });
}

controller.traducir = (req, res) => {
    const { idioma1Selecto, idioma2Selecto, texto, user } = req.body;
    let errors = [];

    if (!texto) {
        errors.push({
            text: 'Por Favor Ingrese Texto a Traducir'
        });
    }
    if (idioma1Selecto === idioma2Selecto) {
        errors.push({
            text: 'Por Favor Seleccione Diferente Idioma a Traducir'
        });
    }
    if (errors.length > 0) {
        res.render('inicio', {
            errors,
            texto,
            idioma1Selecto,
            idioma2Selecto
        });
    } else {
        console.log('user: ' + user);
        const endpoint = '/ej-traducir';//?msg=' + texto + '&leng1=' + idioma1Selecto + '&leng2=' + idioma2Selecto;
        api.post(endpoint, {
            "msg": texto,
            "leng1": idioma1Selecto,
            "leng2": idioma2Selecto
        }).then(resp => {
            const mensajeT = resp.data.body;

            const endpoint2 = '/ej-historial';
            api.post(endpoint2, {
                "id": user,
                "msg1": texto,
                "msg1": mensajeT
            }).then(resp => {
            }).catch(err => {
                console.log(err);
                res.render('login', {
                    err
                });
            });

            res.redirect('/using/inicio?user=' + user + '&txt=' + mensajeT);
        }).catch(err => {
            console.log(err);
            res.render('login', {
                err
            });
        });
    }
}


module.exports = controller;