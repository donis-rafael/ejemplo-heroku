const AWS = require("aws-sdk");

const document = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = async (event) => {

    let response = {
        statusCode: 0,
        body: '',
    };
    
    let i = 0;
    for(i = 1; i <= 20; i++){
        await actualizaPrimo(i).then(data => {
        }).catch(error => {
            //console.log("entra aqui ERROR " + error);
            return error.response;
        });
    }
    
    response = {
        statusCode: 200,
        body: JSON.stringify('Primazos')
    };
    return response;

};

function actualizaPrimo(primo) {
    const params = {
        TableName: "Primos",
        Key: {
            "primoId": primo
        },
        UpdateExpression: "set votoPor = :v, yaVoto = :y, loVotaron = :l",
        ExpressionAttributeValues:{
            ":v":0,
            ":y":0,
            ":l":0
        },
        ReturnValues:"UPDATED_NEW"
    };

    return document.update(params).promise();
}