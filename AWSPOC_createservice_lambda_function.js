'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createservice = (event, context, callback) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            serviceName: data.serviceName,
            status: data.status
        }
    }
    
    dynamoDb.put(params,(error, result) => {
        if(error){
            console.error(error);
            callback(new Error('faild to create service.'));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        }

        callback(null, response);
    });
}