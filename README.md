# Chat Bot

Chatbot system using ultimate.ai API.

It will handle incoming visitor message on Messages API, then request to ultimate AI its intents and, finally, request messages replies on Replies API to be returned to the visitor.

On Replies API the user can also create, delete and query for reply messages.

## How to run

### Development mode

```console
yarn start:mongodb
yarn dev:replies
yarn dev:messages
```

### Production mode

```console
yarn start:mongodb
yarn start:replies
yarn start:messages
```

### Using DOCKER

```console
docker-compose up
```

## Test

Run the following command for testing:

```console
yarn test:messages
yarn test:replies
```

## Initial database

When starting the mongodb it will create initial data.
Please check ./db/mongo-init.js to a better understanding.

## Documentation

This API generate swagger JSON documentation on /api-docs.json for each API.
Please, check localhost:3000/api-docs.json for Messages API.
Please, check localhost:3001/api-docs.json for Replies API.
