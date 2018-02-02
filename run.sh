#!/bin/bash
cd web && yarn start &
cd api && mix phoenix.server
