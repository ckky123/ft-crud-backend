This is the documentation for an API for storing and retrieving company records

Live API endpoints are all relative to https://gentle-fjord-95536.herokuapp.com
For example, to GET all companies, a GET request should be sent to https://gentle-fjord-95536.herokuapp.com/companies

There is also a (very basic) frontend at https://ft-frontend.herokuapp.com/ which allows for UI interaction with some (although not all) of the endpoints

## The Records

Objects are stored in a MongoDB database with the following elements: 
* name: The company name, 
* yearFounded: The year the company was founded
* revenue: Annual revenue, nominally in Dollars

Records also have a unique ID, auto-generated when they are first inserted into the database. This ID is the primary method for users to interact with the database

## Endpoints
As mentioned above, all endpoints are relative to https://gentle-fjord-95536.herokuapp.com

|Method Type| Endpoint       | Description          | Example URL                              |
|-----------|----------------|----------------------|------------------------------------------|
|     GET   | /companies     |Retrieve all companies| https://gentle-fjord-95536.herokuapp.com |
|     GET   |/company/:id    |Retrieve a single company by ID |https://gentle-fjord-95536.herokuapp.com/company/5d0fb23ab0ed1b32d8984acb|
|     GET   |/companies/date |Retrieve all companies in an inclusive year range, with query string giving that range. minDate and maxDate are required|https://gentle-fjord-95536.herokuapp.com/companies/date?minDate=1970&maxDate=1980|
|     PUT   |/company/:id    |Update a single company by ID   |https://gentle-fjord-95536.herokuapp.com/company/5d0fb23ab0ed1b32d8984acb|
|     POST  |/company        |Create a new company record. Body must contain the following fields: name, yearFounded, revenue                      |https://gentle-fjord-95536.herokuapp.com/company/|
|  DELETE   |/company/:id    |Delete a single company by ID   |https://gentle-fjord-95536.herokuapp.com/company/5d0fb23ab0ed1b32d8984acb|


## Using the frontend

The frontend is intended as a demonstration of the basics of the API. On load, all of the database is queried and displayed. The basic operations of Creating, Reading, Updating and Deleting entries is provided (although the Read only makes the request and receives at the frontend, it doesn't display at current)

## Running locally

If you would like to run the node backend locally, you will need to navigate to the root of the project and run 
```
npm install
```
This will install the prerequisite packages, you can then run
```
nodemon server.js
````
Your local server should automatically connect (and authenticate to) the pre-existing MongoDB on MongoAtlas, using the disposable credentials hard coded into the source code. It will likely be listening on LocalHost:4000, but the port will be reported to the console. Obviously, in the real world, this would be handled by environment variables, but for simplicity they are there.

If you want to connect to a separate database, then you will need to change the mongoose URL to a known database