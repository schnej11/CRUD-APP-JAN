CRUD Application
Overview
Welcome to my CRUD App! Folow the steps to get started. 

Getting Started
1. Repository Setup
Clone the repository to your local machine

2. Frontend Setup
Install dependencies in the frontend directory:

cd CRUD-APP-JAN/frontend
npm install
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled

3. Database Setup with Docker
Utilize PostgreSQL within a Docker container:

Use the following code in your terminal to create an image and container. 

docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

Make sure Docker is running on your system.

Create the Database

docker exec -it pg-docker psql -U postgres -c "CREATE DATABASE inventory;"

4. Backend Setup
Set up the backend in the server directory:

cd CRUD-APP-JAN/server
npm install
npm i express pg knex
In package.json under server directory, add:

Run migrations and seeds for database setup:

knex migrate:latest
knex seed:run


5. Starting the Application
Run the frontend and backend servers:
npm install in other the Backend and Frontend directories. 

Additional Information

Database Management in Docker

Manage your PostgreSQL database with these commands:

Access PostgreSQL CLI in Docker:

docker exec -it pg-docker psql -U postgres

Stop and remove the container:

docker stop pg-docker

