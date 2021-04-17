const AWS = require("aws-sdk");

const document = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = async (event, callback) => {
    let result = '';
    let message = '';
    const usuario = event.id;
    const msg1 = event.msg1;
    const msg2 = event.msg2;
    let index = 0;

    await readAll(usuario).then(data => {
        index = data.Count + 1;

        await add(usuario, msg1, msg2, index).then(data => {
            result = 'bueno';
            message = 'success';
    
        }).catch((err) => {
            console.error(err);
            result = 'malo';
            message = err;
        });
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

function add(user, txt1, txt2, index) {
    const params = {
        TableName: "historial",
        Item: {
            "usuario": user,
            "msg1": txt1,
            "msg2": txt2,
            "traduccionNo": index
        }
    };

    return document.put(params).promise();
}

function readAll(user) {
    const params = {
        TableName: "historial",
        FilterExpression: "usuario = :uss",
        ExpressionAttributeValues: {
            ":uss": user
        },
        ProjectionExpression: "usuario"
    };

    return document.scan(params).promise();
}