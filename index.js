const ApiBuilder = require('claudia-api-builder')
const AWS = require('aws-sdk')

const api = new ApiBuilder()
const dynamoDb = new AWS.DynamoDB.DocumentClient()

api.post('/recipes', function (request) {
  console.log('in post')
  const params = {
    TableName: 'recipes',
    Item: {
      recipeId: request.body.recipeId,
      name: request.body.name
    }
  }
  return dynamoDb.put(params).promise()
}, { success: 201 }) // returns HTTP status 201 - Created if successful

api.get('/recipes', function (request) {
  console.log('in get')
  return dynamoDb.scan({ TableName: 'recipes' }).promise()
    .then(response => response.Items)
})

module.exports = api
