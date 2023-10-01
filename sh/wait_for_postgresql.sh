#!/bin/bash

iterations=0
echo >&2 "Wait for postgresql..."
until psql $DATABASE_URL -c '\q'; do
  echo >&2 "Postgres is unavailable - sleeping"
  sleep 1
  iterations=$((iterations+1))
  if [ $iterations -ge 30 ]; then
    echo "Timeout: exit from script"
    exit 1
  fi
done
echo >&2 "Postgres is up"
exit 0
