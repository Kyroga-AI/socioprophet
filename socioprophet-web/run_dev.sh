#!/usr/bin/env bash

#start mongodb ('&' runs process in background)
mongod &

#start-up socioprophet-web
yarn run dev
