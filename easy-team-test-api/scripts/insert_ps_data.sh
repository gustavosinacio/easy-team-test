#!/bin/bash

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
export $(grep -v '^#' $SCRIPT_DIR/../.env | xargs)

if [[ -z "$DB_HOST" || -z "$DB_PORT" || -z "$DB_NAME" || -z "$DB_USER" || -z "$DB_PASSWORD" ]]; then
  echo "One or more environment variables are missing in the .env file."
  exit 1
fi
CONTAINER_NAME="easy_team_postgres"
DUMP_FILE="easy_team_ps.dump"

docker cp $SCRIPT_DIR/../$DUMP_FILE $CONTAINER_NAME:/$DUMP_FILE
docker exec -it "$CONTAINER_NAME" bash -c "pg_restore -U $DB_USER -d $DB_NAME -v $DUMP_FILE"
