#!/bin/bash
set -e

yarn run db:migrate
yarn start