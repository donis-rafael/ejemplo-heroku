const AWS = require("aws-sdk");

const document = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = async (event, callback) => {
    let result = '';
    let message = '';
    const usuario = event.id;
    const contra = event.contra;
    await add(usuario, contra).then(data => {
        result = 'bueno';
        message = 'success';

    }).catch((err) => {
        console.error(err);
        result = 'malo';
        message = err;
    });

    let response = {
        statusCode: 200,
        body: JSON.stringify('success')
    };

    if (result === 'malo') {
        response = {
            statusCode: 500,
            body: message,
        };
    }

    return response;
};

function add(user, pasword) {
    const params = {
        TableName: "login",
        Item: {
            "usuario": user,
            "pass": pasword
        }
    };

    return document.put(params).promise();
}