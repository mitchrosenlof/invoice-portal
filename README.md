# invoice-portal
A local application that allows a user to login and view their pending invoices.

# Getting started

## Prerequisites
- NodeJs >= 20 (https://github.com/nodenv/nodenv)
- Docker and Docker Compose (https://docs.docker.com/compose/install/)

## Steps for running application
### Backend (Nest/Prisma/Docker/Postgres)
1. Navigate to /server/nest
2. Place `.env` file here (reach out to me if you have not recieved it)
3. Run `docker compose -f docker-compose.postgres.yml up -d`
4. Run `npm i && npm run db:deploy`
5. Run `npm run db:seed`
6. (Optional) You can run `docker exec -it <container-id> sh` and then `psql -U postgres` to interact with the database.
7. Run `npm run start`
8. (Optional) You can query the nest api in Postman `localhost:3000`. Routes are `auth/login` `/invoices` `/invoices/:id`

### Frontend (Vite)
1. Navigate to /client/vite
2. Run `npm i && npm run dev`
3. Open `localhost:5173` in a browser, then log in!

