const AWS = require("aws-sdk");

const document = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = async (event) => {
    const primo = [1, 2, 8, 14, 15, 17, 19, 20];

    let response = {
        statusCode: 0,
        body: '',
    };

    let i = 0;
    let flag = true;
    for (i = 1; i <= 20; i++) {
        flag = true;
        let j = 0;
        for (j = 0; j < primo.length; j++) {
            if (primo[j] === i) {
                flag = false;
                break;
            }
        }

        if (flag) {
            await actualizaPrimo(i).then(data => {
            }).catch(error => {
                //console.log("entra aqui ERROR " + error);
                return error.response;
            });
        }
    }

    response = {
        statusCode: 200,
        body: JSON.stringify('Primazos'),
    };
    return response;

};

function actualizaPrimo(primo) {
    console.log("PRIMOOOO: "+primo);
    const params = {
        TableName: "Primos",
        Key: {
            "primoId": primo
        },
        UpdateExpression: "set votoPor = :v, yaVoto = :y",
        ExpressionAttributeValues: {
            ":v": 0,
            ":y": 0
        },
        ReturnValues: "UPDATED_NEW"
    };

    return document.update(params).promise();
}