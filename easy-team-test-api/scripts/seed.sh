#!/bin/bash

export $(grep -v '^#' .env | xargs)

if [[ -z "$DB_HOST" || -z "$DB_PORT" || -z "$DB_NAME" || -z "$DB_USER" || -z "$DB_PASSWORD" ]]; then
  echo "One or more environment variables are missing in the .env file."
  exit 1
fi

SQL_INSERT_LOCATIONS="
INSERT INTO public.location(id, name, address) VALUES
(4, 'location name', 'location address');"

SQL_INSERT_EMPLOYEES="
INSERT INTO employee (id, name, picture, \"locationId\") VALUES
  (1, 'Alice Johnson', 'https://example.com/pictures/alice.jpg', 4),
  (3, 'Bob Smith', 'https://example.com/pictures/bob.jpg', 4),
  (4, 'Charlie Brown', 'https://example.com/pictures/charlie.jpg', 4);
"

PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "
  $SQL_INSERT_EMPLOYEES
  "
