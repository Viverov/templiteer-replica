#!/bin/bash

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

yarn

/bin/bash $SCRIPTPATH/wait_for_postgresql.sh
status=$?
if [ $status -ne 0 ]; then
  exit $status
fi

yarn run migration:run
if [[ ${DEBUGGER} -eq 1  ]]
then
  node --inspect-brk=0.0.0.0:9229 $(yarn bin jest) --config ./test/jest-e2e.json --verbose --forceExit --testTimeout=100000000
else
  yarn run jest --config ./test/jest-e2e.json --verbose --forceExit
fi
exit $?
