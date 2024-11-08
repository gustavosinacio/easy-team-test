#!/bin/bash

export $(grep -v '^#' .env | xargs)

if [[ -z "$DB_HOST" || -z "$DB_PORT" || -z "$DB_NAME" || -z "$DB_USER" || -z "$DB_PASSWORD" ]]; then
	echo "One or more environment variables are missing in the .env file."
	exit 1
fi

SQL_DROP_TABLES="
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS location;
"

PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "
  $SQL_DROP_TABLES
"
