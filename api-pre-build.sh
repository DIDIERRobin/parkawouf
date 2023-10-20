#!/bin/bash

npm --production=false install
npx nx build api
npx nx build front
rm -rf api
rm -rf front
rm -rf node_modules
