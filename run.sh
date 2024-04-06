#!/bin/bash

docker build -t app-db ./docker && docker run --rm -it -d -p 5432:5432 app-db
# docker run -it -rf $(docker build -q ./docker)