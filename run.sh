#!/bin/sh
echo "Hello Stracker" &

cd api && mix phoenix.server &

cd web && yarn start
