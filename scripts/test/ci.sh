#!/bin/bash
./node_modules/.bin/commitlint-travis && ./node_modules/.bin/lerna run lint && ./node_modules/.bin/lerna run test:coverage