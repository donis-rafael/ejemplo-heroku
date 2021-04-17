const AWS = require("aws-sdk");
const translate = new AWS.Translate({ region: 'us-east-2' });

exports.handler = async (event, context, callback) => {
    const mensaje = event.msg;//.queryStringParameters.msg;
    const idioma1 = event.leng1;//.queryStringParameters.leng1;
    const idioma2 = event.leng2;//.queryStringParameters.leng2;
    let result = '';
    let message = '';

    var params = {
        Text: mensaje,
        SourceLanguageCode: idioma1,
        TargetLanguageCode: idioma2
    };


    await translate.translateText(params, function (err, data) {
        if (err) {
            console.log("Error calling Translate. " + err.message + err.stack);
            message = err.message;
            result = 'malo';
        }
        if (data) {
            console.log("Mensaje Inicial: " + mensaje);
            console.log("Mensaje Traducido: " + data.TranslatedText);
            message = data.TranslatedText;
            result = 'bueno';
        }
    }).promise();

    let response = {
        statusCode: 200,
        body: JSON.stringify(message)
    };

    if (result === 'malo') {
        response = {
            statusCode: 500,
            body: message,
        };
    }

    return response;
};