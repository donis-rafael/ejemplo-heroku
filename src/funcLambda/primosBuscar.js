const AWS = require("aws-sdk");

const document = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = async (event, callback) => {
    const primo = event.queryStringParameters.primo;
    let result = [];
    await readAll().then(data => {
        data.Items.forEach(element => {
            if (primo == element.primoId) {
                result.push(element);
            }
        });

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