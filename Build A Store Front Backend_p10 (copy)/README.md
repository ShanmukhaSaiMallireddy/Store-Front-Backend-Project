# storeFrontBackend

## These are the required Technologies

Application must make use of these libraries:

1 Postgres for database

2 Node/Express for application logic

3 db-migrate from npm for the migrations

4 dotenv from npm for to managing environment variables

5 jsonwebtoken from npm for working with JWTs

6 jasmine from npm for testing


# we can open two terminals 

## In a terminal tab, we can create and run the database:

1 run `su postgres` to connection for the postgres

2 run `psql postgres` for the connection of sql

3 run `CREATE USER dev_user WITH PASSWORD 'password123';` for creating a new user

4 `CREATE DATABASE store;` which is a database for store

5 `CREATE DATABASE store_test;` a database for store_test

6 `\c store` connect to the database 

7 `GRANT ALL PRIVILEGES ON DATABASE store TO dev_user;  `


### database and server port

The database is running on PORT 5432

Server is running on PORT 3000

## In the second terminal:

 =>sequence of steps

1 install yarn `npm install yarn -g`

2 install db-migrate on the machine for terminal commands `npm install db-migrate -g`

3 check node version `node -v` - it needs to be 10 or 12 level

4 IF node was not 10 or 12 level, run
    1 `npm install -g n`
    2 `n 10.18.0`
    3 `PATH="$PATH"`
    4 `node -v` to check that the version is 10 or 12

5 install all project dependencies `yarn`

check all dependencies installed from following.

if anyone is missing from following list run following command

for following dependencies run `npm install <dependencies name>`

  "dependencies": {
    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "db-migrate": "^0.11.13",
    "db-migrate-pg": "^1.2.2",
    "dotenv": "^16.0.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "pg": "^8.5.1",
    "supertest": "^6.2.2",
    "typescript": "^4.1.3"

for following dependecies run `npm install --save-dev <dependencies name>` to add in dev dependency
  "devDependencies": {
    "@types/bcrypt": "^5.0.0",
    "@types/express": "^4.17.9",
    "@types/jasmine": "^3.6.3",
    "@types/jsonwebtoken": "^8.5.8",
    "@types/pg": "^7.14.7",
    "@types/supertest": "^2.0.11",
    "jasmine": "^3.6.4",
    "jasmine-spec-reporter": "^6.0.0",
    "jasmine-ts": "^0.3.0",
    "ts-node": "^9.1.1",
    "tsc-watch": "^4.2.9"

6 to test that it is working, run `yarn watch` should show an app starting on `0.0.0.0:3000`

## Prerequisite

PostgreSQL

crate database 1. store   2. store_test

install dotenv

Install all dependencies


## test 

npm run test

### Run server

npm run start


## API List


####  User API

1 Create new user (POST)

  http://localhost:3000/users/

  Request body to be
  {
    first_name: string;
    last_name: string;
    user_name: string
    password: string;
  }

  Response is
  {
    id: number
    first_name: string;
    last_name: string;
    user_name: string
    password: string;
  }

2 Authenticate (POST)

  http://localhost:3000/users/authenticate/

  Request body to be
  {
    "user_name": string,
    "password": (string)
  }

  Response
  {
    jwt_token or "invaild credentials"
  }

3 Get all users (GET)

  http://localhost:3000/users/

  Request body: None

  Response is an array
  [
    {
       id: number
        first_name: string;
        last_name: string;
        user_name: string
    },other ...  ]

4 Get single user by user_id (GET)

  http://localhost:3000/users/:id

  Request body: None

  Response
  {
        id: number
        first_name: string;
        last_name: string;
        user_name: string
  }



####  Product API

1 Create new product (POST)

  
  http://localhost:3000/product/

   Request body is
  {
    name: (string),
    price: (integer),
  }
  

  Response is
  {
    id: string,
    name: string,
    price: string,
  }

2 Get all products (GET)

  http://localhost:3000/product/
  ```

  Request body: None

  Response is an array
  [
    {
        id: string,
        name: string,
        price: string,
    }, other items if any..]

3 Get single product by product_id (GET)

  http://localhost:3000/product/:id

  Request body: None

  Response is 
  {
        id: string,
        name: string,
        price: string,
  }

#### Order API

- Create new order (POST)

  http://localhost:3000/orders/
  
  Request body is
  {
        quantity: number,
        user_id: number,
        status: string,
  }

  Response is
  {
        quantity: number,
        user_id: number,
        status: string,
  }

4 Get all orders (GET)

  http://localhost:3000/orders/

  Request body: None

  Response is an array
  [
    {
      quantity: number,
        user_id: number,
        status: string,
    },other items...  ]
  ```

5 Get single order by order_id (GET)

  http://localhost:3000/orders/:id


  Request body: None

  Response is
  {
    quantity: number,
        user_id: number,
        status: string,
  }

