Todo List Manager API

A containerised RESTful API built with Node.js, Express, and PostgreSQL for managing todo tasks.
This app demonstrates modern development practices including Docker containerisation, environment variable security, and clean API architecture.

Features:

    Full CRUD support for todo items

    Filter todos by completed status

    Filter uncompleted todos by due date

    Uses PostgreSQL for persistent storage

    Clean RESTful API structure

    Secure use of .env and .dockerignore

    Containerised using Docker and docker-compose

Project Structure:

todo-list-manager/
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── db/
│ ├── .env
│ ├── .dockerignore
│ ├── Dockerfile
│ └── app.js
├── .gitignore
├── .env
├── docker-compose.yml
└── README.md

![Application Architecture Diagram](./architecture-diagram.png)


Running the App with Docker:

    Clone the repo:

git clone <https://github.com/Coderaccangus/todo-list-manager>
cd todo-list-manager

    Add your environment variables:

Create a .env file in the root:

PORT=5000
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=todos

    Start the app:

docker-compose up -d --build

The backend API will be available at:
http://localhost:5000/api/todos