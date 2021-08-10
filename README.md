# HEALS Persona Store

Storage and a REST api for HEALS persona data.

## Setup

### Docker

To run a mongo instance with the API on port 8080:

```
docker-compose up
```

See docker-compose files as reference for integration into other docker applications.

### Native

Requires Nodejs 16 and a mongodb instance.

Run `npm install` and then `npm start` with the following environment variables set:

- `MONGO_URL` - URL pointing to mongodb instance
- `MONGO_DB` - Name of database
- `PORT` - port to expose REST api, default 8080

## REST API

The stock personas, Jennifer and Bob are pre-loaded into the store.

### Get a list of all personas

`(GET) /persona`

### Get a persona by id

`(GET) /persona/:personaId`

### Add a new persona

`(POST) /persona`

Include persona json as request body.

### Replace a persona

`(PUT) /persona/:personaId`

Include persona json as request body.

### Delete a persona

`(DELETE) /persona/:personaId`
