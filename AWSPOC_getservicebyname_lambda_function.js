'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getservicebyname = (event, context, callback) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        FilterExpression: "#service = :serviceName",
        ExpressionAttributeNames: {
            "#service": "serviceName",
        },
        ExpressionAttributeValues: {
            ":serviceName": event.pathParameters.serviceName
        }
    };

    dynamoDb.scan(params, (error, result) => {
        if(error){
            console.error(error);
            callback(new Error('Couldnt fetch the service record.'));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items)
        }

        callback(null, response);
    })
}