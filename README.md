# be-workbench
[![Build Status](https://drone.prod-bip-ci.ssb.no/api/badges/statisticsnorway/be-workbench/status.svg)](https://drone.prod-bip-ci.ssb.no/statisticsnorway/be-workbench)

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
- Create database with ``yarn run db:migrate``

- Add an environment variable to the ``.env`` file, e.g: 
```NODE_ENV=development```

- Start the app with ``yarn run start:dev``

## CORS
If you plan to access this application from another application on the same server, you need to add the url (inlcuding http(s)) and port to 
the env variable CORS_WHITELIST in the aforementioned ``.env`` file, e.g:
```
CORS_WHITELIST=http://localhost:3000
``` 
