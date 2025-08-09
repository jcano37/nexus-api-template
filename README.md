## Nexus API Template

Starter NestJS REST API with MongoDB, Redis, RabbitMQ, structured logging, health checks, and admin test endpoint.

### Quick Start

1. Copy `.env.example` to `.env` and adjust if needed.
2. Install deps and run:

```bash
npm i
npm run build
npm run start:dev
```

API served at `http://localhost:8000/api/v1`.

- Health: `GET /api/v1/health`
- Admin test: `GET /api/v1/admin/test`

### Docker Compose (Mongo, Redis, RabbitMQ)

```bash
docker compose up -d
```

### Tech

- NestJS 10
- Mongoose, ioredis, @golevelup/nestjs-rabbitmq
- nest-winston logging
- Config with Joi validation
- Terminus health checks

### Project Structure

- `src/config` config and env validation
- `src/core` logging, exceptions, interceptors
- `src/integrations` mongo, redis, rabbitmq
- `src/modules` health, admin
- `src/shared` shared utilities


