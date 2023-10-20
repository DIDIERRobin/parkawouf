#!/bin/bash

export NODE_ENV='dev' && npm install
npx nx build api
rm -rf api
rm -rf front
rm -rf node_modules
