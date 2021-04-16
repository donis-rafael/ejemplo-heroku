const AWS = require("aws-sdk");

const document = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = async (event, callback) => {
    let result = [];
    await readAll().then(data => {
        data.Items.forEach(element => {
            if (element.yaVoto == 0 && element.activo == 1) {
                result.push(element);
            }
        });

        result.sort((unPrimo, otroPrimo) => unPrimo.primoId - otroPrimo.primoId);

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