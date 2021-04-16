const AWS = require("aws-sdk");

const document = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = async (event) => {
    const primo1 = parseInt(event.cou, 10);
    const primo2 = parseInt(event.to, 10);

    let response = {
        statusCode: 0,
        body: '',
    };

    await actualizaPrimo(primo1, primo2).then(data => {
    }).catch(error => {
        //console.log("entra aqui ERROR " + error);
        return error.response;
    });
    
    await actualizaOtroPrimo(primo2).then(data => {
    }).catch(error => {
        //console.log("entra aqui ERROR " + error);
        return error.response;
    });
    
    response = {
        statusCode: 200,
        body: JSON.stringify('Primazos'),
    };
    return response;

};

function actualizaPrimo(primo1, primo2) {
    const params = {
        TableName: "Primos",
        Key: {
            "primoId": primo1
        },
        UpdateExpression: "set votoPor = :v, yaVoto = :y",
        ExpressionAttributeValues:{
            ":v":primo2,
            ":y":1
        },
        ReturnValues:"UPDATED_NEW"
    };

    return document.update(params).promise();
}

function actualizaOtroPrimo(primo2) {
    const params = {
        TableName: "Primos",
        Key: {
            "primoId": primo2
        },
        UpdateExpression: "set loVotaron = :x",
        ExpressionAttributeValues:{
            ":x":1
        },
        ReturnValues:"UPDATED_NEW"
    };

    return document.update(params).promise();
}