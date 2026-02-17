# book-store-api

Book Store API backend built with NestJS, PostgreSQL, and Prisma. This service exposes CRUD endpoints for managing books and uses Prisma as the data access layer.

## Tech Stack

- Framework: NestJS
- Database: PostgreSQL
- ORM: Prisma
- Validation: class-validator, class-transformer

## Features

- Full CRUD for books
- Input validation with DTOs
- Prisma schema-backed persistence
- Consistent error handling for missing records

## Project Structure

- src/books: Book CRUD module (controller, service, DTOs)
- src/prisma: Prisma module and service
- prisma/schema.prisma: Database schema

## Data Model

The `Book` model is defined in [prisma/schema.prisma](prisma/schema.prisma):

- `id`: Int, auto-increment
- `title`: String (required)
- `author`: String (required)
- `genre`: String (optional)
- `published`: Int (optional)
- `createdAt`: DateTime (auto)
- `updatedAt`: DateTime (auto)

## CRUD Implementation (Books)

Routes are defined in [src/books/books.controller.ts](src/books/books.controller.ts).

### Endpoints

- `POST /books` - Create a book
- `GET /books` - List all books (sorted by newest)
- `GET /books/:id` - Get a book by id
- `PATCH /books/:id` - Update a book
- `DELETE /books/:id` - Delete a book (returns 204)

### Request Validation

DTOs are defined in [src/books/dto](src/books/dto):

- `CreateBookDto`: `title` and `author` required; `genre` optional; `published` optional with minimum of 1000
- `UpdateBookDto`: partial of `CreateBookDto`

### Service Behavior

The service logic in [src/books/books.service.ts](src/books/books.service.ts) implements:

- `create`: inserts a book using Prisma
- `findAll`: returns all books ordered by `createdAt` desc
- `findOne`: throws 404 if book does not exist
- `update`: checks existence before update
- `remove`: checks existence before delete

## Setup

1. Install dependencies

```bash
npm install
```

2. Configure PostgreSQL connection

Create a `.env` file with a Prisma `DATABASE_URL` value, for example:

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/book_store?schema=public"
```

3. Generate Prisma client (required)

```bash
npx prisma generate
```

4. Apply migrations (if using Prisma migrations)

```bash
npx prisma migrate dev --name init
```

## Running the App

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Example Requests

Create a book:

```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Clean Architecture\",\"author\":\"Robert C. Martin\",\"genre\":\"Software\",\"published\":2017}"
```

Update a book:

```bash
curl -X PATCH http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d "{\"genre\":\"Architecture\"}"
```

Delete a book:

```bash
curl -X DELETE http://localhost:3000/books/1
```

## Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# coverage
npm run test:cov
```
