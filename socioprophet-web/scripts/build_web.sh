#!/usr/bin/env bash

#build prophet-web
cd socioprophet-web && yarn
cd ../socrioprophet-web/client && yarn
cd ../docs && yarn
