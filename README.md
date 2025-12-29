# TAKE HOME CHALLENGE - YARITAFT COURSE

You will develop a basic Notification management system for authenticated users. The system must allow each user to manage and send notifications through different channels.

### Badges

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/DE5HiRDsw9ehnDCC2oEPAS/F36DUgdsSRgpnLxjzPgBC2/tree/main.svg?style=svg&circle-token=CCIPRJ_1LLohAsd6yrauvpah62kK_ebc9c2c88715464aa2daf504e3fe7526136ceaae)](https://dl.circleci.com/status-badge/redirect/circleci/DE5HiRDsw9ehnDCC2oEPAS/F36DUgdsSRgpnLxjzPgBC2/tree/main)

[![Coverage Status](https://coveralls.io/repos/github/MVCorreas/take-home-challenge-yaritaft/badge.svg?branch=main)](https://coveralls.io/github/MVCorreas/take-home-challenge-yaritaft)

### Features

#### Authentication features

- Register User with email and password
- Sign in that returns a validation token

#### Notifications features

- Create a notification
- Get all notifications
- Update a notification
- Delete a notification 

### Pre-requisites

- Docker installed without SUDO Permission
- Docker compose installed without SUDO
- Ports available: 3001, 5033 and 5434

### How to run the App

Run the following commands to build and run the application using Docker:

```bash
docker compose build
```

```bash
docker compose up
```

Once the containers are running, you can visit the Swagger site on http://localhost:3001/api-docs/

### How to run the Tests

#### Running tests in Docker (recommended for evaluators)

To run the test suite in Docker with the correct environment configuration:

```bash
docker compose up -d
docker compose exec app npm run test:docker
```

This command will:
1. Run database migrations on the test database
2. Execute all tests with the proper Docker network configuration

#### Running tests locally

To run tests on your local machine (requires PostgreSQL running on port 5434):

```bash
npm test
```

### Space for improvement

- **Error handling**: Extend error scenarios in [src/utils/errors.js](src/utils/errors.js) (e.g., database connection errors, external service failures)
- **Repository Layer**: Implement a repository pattern to separate database logic from business logic for better testability and maintainability
- **Notification queue**: Use a message queue (Redis, RabbitMQ) for async notification processing instead of fire-and-forget
- **Test coverage**: Add edge case tests, integration tests for notification channels, and performance tests
- **API versioning**: Implement API versioning (e.g., `/api/v1/`) for backward compatibility
- **Database migrations**: Add rollback scripts and data migrations for production deployments 

### Tech stack

- **Runtime**: Node.js v22
- **Framework**: Express.js v5
- **Database**: PostgreSQL 13
- **ORM**: Prisma v7 with PostgreSQL adapter (@prisma/adapter-pg)
- **Authentication**: JWT (jsonwebtoken) + bcryptjs for password hashing
- **Testing**: Jest v29 with Supertest for HTTP testing
- **Documentation**: Swagger (swagger-jsdoc + swagger-ui-express)
- **Code Quality**: ESLint v9 + Prettier v3
- **Containerization**: Docker + Docker Compose

### Architectural Decisions

**Controller-Service Pattern**  
The application follows a clean architecture approach with a Controller-Service pattern. A Repository layer was intentionally omitted since Prisma already provides an abstraction layer over the database, allowing direct PrismaClient injection into services. This keeps the architecture simpler while maintaining proper separation of concerns.

**Channel Factory Pattern**  
Notification channels (Email, SMS, Push) are implemented using the Factory pattern ([src/utils/channels/channelFactory.js](src/utils/channels/channelFactory.js)), making the project scalable by extending with new notification types without modifying the existing code.

**Database Strategy**  
Separate databases for development and testing were implemented in order to ensure test isolation.

**Testing Strategy**  
Integration tests cover all API endpoints with proper database cleanup between tests.

### Route

- **API Swagger** --> http://localhost:3001/api-docs/