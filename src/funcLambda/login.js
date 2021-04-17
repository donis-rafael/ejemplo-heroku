const AWS = require("aws-sdk");

const document = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = async (event, callback) => {
    let result = '';
    let message = '';
    const usuario = event.id;
    const contra = event.contra;
    await readAll(usuario, contra).then(data => {
        console.log(data);
        if (data.Count > 0) {
            result = 'bueno';
            message = 'success';
        } else {
            result = 'malo';
            message = 'Error';
        }

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

function readAll(user, pasword) {
    const params = {
        TableName: "login",
        FilterExpression: "usuario = :uss AND pass = :pss",
        ExpressionAttributeValues: {
            ":uss": user,
            ":pss": pasword
        },
        ProjectionExpression: "usuario, pass"
    };

    return document.scan(params).promise();
}