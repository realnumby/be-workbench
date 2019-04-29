# be-workbench
This is the backend application for the workbench UI

## Getting started

- Use a local postgres database. The best option is to start up a local docker container:
```
docker run --name mypostgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```
- Configure the ``.env`` file with correct settings for the local database, e.g:
```
DB_HOST=localhost
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=password
```
- Create database with ``npm run db:migrate``
- Start the app with ``npm run start:dev``
