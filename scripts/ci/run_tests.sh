#!/bin/bash
echo "=== Code-To-JSON [Run Tests] ==="
if [ "$TRAVIS" != "" -a "$TRAVIS_PULL_REQUEST" == "false"  -a "$TRAVIS_BRANCH" == "master" ]
then
    echo "TRAVIS: We are on master. Attempting publish after successful tests"
    npm run test:ci && ./node_modules/.bin/travis-deploy-once .travis/_publish.sh
elif [ "$TRAVIS" != "" -a "$TRAVIS_PULL_REQUEST" != "false" ]
then
    echo "TRAVIS: PR build (branch)"

elif [ "$TRAVIS" != "" -a "$TRAVIS_PULL_REQUEST" != "false" -a "$TRAVIS_BRANCH" == "master" ]
then
    echo "TRAVIS: PR build (master)"
    npm run test:ci
else
    echo "NON-TRAVIS: Non master, non-pr build"
  bash ./scripts/test/ci.sh
fi