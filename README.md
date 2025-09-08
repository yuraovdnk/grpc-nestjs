# NestJS gRPC

This repository is a **NestJS** project using **gRPC** for communication between microservices and **Buf** for generating TypeScript types from `.proto` files.

---

## Running Services

Firstly, create `.env` file from `.env.example`, like this:

```bash
cp .env.example .env
```

And fill required environment variables, like this:

```dotenv
NODE_ENV=development
GRPC_SERVER_HOST=0.0.0.0
GRPC_SERVER_PORT=5000
API_PORT=3000
```

After that, you can start services.

### Using Docker Compose

To start all services, run:

```bash
make up
```

or

```bash
docker compose up -d --build
```

This will start all microservices

### Running Locally (without Docker)

```bash
# Producer service
yarn start:producer

# Consumer service
yarn start:consumer
```

---

## Testing Filtered Users Endpoint

After starting the service, you can make a request to get filtered users:

### Endpoint

```
GET http://localhost:3000/app
```
> Only users that pass the filter criteria will be returned.

### Example `curl` request

```bash
curl http://localhost:3000/app
```

Or open in your browser:

```
http://localhost:3000/app
```
### Example Response

```json
{
  "users": [
    { "id": 1, "name": "Alice", "age": 25 },
    { "id": 3, "name": "Charlie", "age": 30 }
  ]
}
```