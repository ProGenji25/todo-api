# Node.js todo-api
A Node.js based "todo" REST API.
Allows for user sign-in via Google and CRUD requests to internal Mongo database.

Server site @ http://nodejs-golde3.it210.it.et.byu.edu

## /api/v1/
Available endpoints

### /auth/google
Initiates OAuth 2.0 login through Google services.
Request type: GET

### /user
Retrieves logged in user from Azure in JSON format.
Request type: GET
Typical response body:
`{
  "Id": "e97bf212-e23f-4142-b76d-f40c31ff97c5",
  "UserName": "goldengeek14@gmail.com",
  "NormalizedUserName": "GOLDENGEEK14@GMAIL.COM",
  "Email": "goldengeek14@gmail.com",
  "NormalizedEmail": "GOLDENGEEK14@GMAIL.COM",
  "EmailConfirmed": true,
  "PasswordHash": null,
  "SecurityStamp": "P5ASPX4J2VCVHM4UUH3NPVYTQMNV5BOJ",
  "ConcurrencyStamp": "d8b09593-8c46-4f9c-a550-730564af81f5",
  "PhoneNumber": null,
  "PhoneNumberConfirmed": false,
  "TwoFactorEnabled": false,
  "LockoutEnd": null,
  "LockoutEnabled": true,
  "AccessFailedCount": 0
}`

### /items
Requests data of collection items from internal Mongo database in JSON format.
|Request types|Description                    |Path parameters|
|-------------|-------------------------------|---------------|
|GET          |Retrieve item database contents|('/:id')       |
|POST         |Create item in item database   |               |
|PUT          |Update item in item database   |('/:id')       |
|DELETE       |Delete item from item database |('/:id')       |
