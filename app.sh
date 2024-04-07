#!/bin/bash

if [ $1 = start ]; then
    docker build -t app-db ./docker && docker run --rm -it -d -p 5432:5432 app-db
fi

if [ $1 = stop ]; then
    docker stop $(docker ps -a -q ./docker)
fi

if [ $1 = restart ]; then
    docker stop $(docker ps -a -q)
    docker run --rm -it -d -p 5432:5432 app-db
fi