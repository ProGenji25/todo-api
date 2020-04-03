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

### /items
Requests data of collection items from internal Mongo database in JSON format.
|Request types|Description                    |Path parameters|
|-------------|-------------------------------|---------------|
|GET          |Retrieve item database contents|('/:id')       |
|POST         |Create item in item database   |               |
|PUT          |Update item in item database   |('/:id')       |
|DELETE       |Delete item from item database |('/:id')       |
