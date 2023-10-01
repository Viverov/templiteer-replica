#!/bin/bash
docker-compose --file docker-compose.test.yml up --exit-code-from server

status=$(docker inspect templiteer_test_runner --format='{{.State.ExitCode}}')
docker-compose --file docker-compose.test.yml down

exit $status
