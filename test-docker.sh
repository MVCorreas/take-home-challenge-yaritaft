#!/bin/sh

# Run Prisma migrations on test database
echo "Running migrations on test database..."
DATABASE_URL="postgresql://postgres:postgres@db-test:5432/notifications_db_test" npx prisma migrate deploy

# Run tests with Docker environment variables - run jest directly to properly pass DATABASE_URL
echo "Running tests..."
DATABASE_URL="postgresql://postgres:postgres@db-test:5432/notifications_db_test" NODE_ENV=test NODE_OPTIONS=--experimental-vm-modules npx jest --runInBand --detectOpenHandles
