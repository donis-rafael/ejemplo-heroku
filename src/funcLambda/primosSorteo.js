const AWS = require("aws-sdk");

const document = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = async (event, callback) => {
    const pertenece = event.queryStringParameters.perten;
    let result = [];
    let primos = [];
    await readAll().then(data => {
        data.Items.forEach(element => {
            if (element.loVotaron == 0 && element.activo == 1 && element.pertenece != pertenece) {
                primos.push(element);
            }
        });

        result.push(primos[Math.floor(Math.random() * primos.length)]);

    }).catch((err) => {
        console.error(err);

        const response = {
            statusCode: 500,
            body: err,
        };

        return response;
    });

    const response = {
        statusCode: 200,
        body: JSON.stringify(result)
    };

    return response;
};

function readAll() {
    const params = {
        TableName: "Primos",
    };

    return document.scan(params).promise();
}