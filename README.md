# On market E-commorece

## graphql api

##### E commerce api using nestjs, typescript, postgres, sequelize orm, jwt token and graphql

## Features

- Signup and login using jwt token.
- Crud for items by dashboard admin.
- Cart api.
- Orders and Order lines
- Security groups to make admin permissions

## Installation

##### Need to install postgres db

- create db
- Add your carditials on .env file

> In the proberties below

```sh
B_USER=
DB_HOST=
DB_PORT=
DB_PASS=
```

Install the dependencies and devDependencies and start the server.

```sh
npm i
```

## How to use

run server:

```sh
npm start
```

There is one end poit

- https://{HOST}/graphql
  > In the proberties on .env file

```sh
HOST=localhost
```

### This end point contains:

- queries: find one or find all for every functions.
- mutations: the rest crud operations like create, update and delete.
- docs tap: cantain the self documentation for graphql api
- schema tap: contain all types created by default using schema first approach

#### Example for using graqhql api

When you go to end point {host/graphql}
you need to write your query or mutation on playground

### An expample for mutation

```sh
mutation{
  signup(input:{
    firstName:"on",
    lastName:"market",
    phone:"+201011122233",
    birthDate:1645151221010,s
    password: "123456",
    country:"eg"
  }){
    data {
        id
        firstName
        token
    }
    message
    code
    success
  }
}
```

> This mutation return token with its result data.
> the token used on Authorization header for queries and mutations that need to be authorized

### To make the request authorized

- Add authorization key to http headers
- Pass token

```sh
{
  "authorization" : "Bearer current user token"
}
```

## Live demo

[Live demo end point link](https://dry-refuge-06691.herokuapp.com/graphql)
