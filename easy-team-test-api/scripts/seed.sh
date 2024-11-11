#!/bin/bash

export $(grep -v '^#' .env | xargs)

if [[ -z "$DB_HOST" || -z "$DB_PORT" || -z "$DB_NAME" || -z "$DB_USER" || -z "$DB_PASSWORD" ]]; then
  echo "One or more environment variables are missing in the .env file."
  exit 1
fi

SQL_INSERT_LOCATIONS="
INSERT INTO public.locations(id, name, address) VALUES
  ('5b73735b-d8ba-4038-8cc7-885f88841aaf', 'location A', 'location address A'),
  ('191e50ed-5c45-4392-bd9d-94a3bb84bf66', 'Location B', 'Location address B');
"

SQL_INSERT_EMPLOYEES="
INSERT INTO public.employees (id, name, picture, \"locationId\") VALUES
  ('187d9b97-5cc4-4f00-92f8-c3565c68b660', 'Alice Johnson', 'https://example.com/pictures/alice.jpg', '5b73735b-d8ba-4038-8cc7-885f88841aaf'),
  ('bb04b343-2492-4c26-911d-ad4a50219c2a', 'Bob Smith', 'https://example.com/pictures/bob.jpg', '5b73735b-d8ba-4038-8cc7-885f88841aaf'),
  ('c6b1d2e0-50fe-4e05-a570-f19164e027b2', 'Charlie Brown', 'https://example.com/pictures/charlie.jpg', '5b73735b-d8ba-4038-8cc7-885f88841aaf'),
  ('52bec0f4-38b0-405a-906e-228fbdebebd3', 'James Smith', 'https://example.com/pictures/james.jpg', '5b73735b-d8ba-4038-8cc7-885f88841aaf'),
  ('2c101b2c-fdbb-4529-9a00-6f679cd983a9', 'Lilian Jones', 'https://example.com/pictures/lilian.jpg', '5b73735b-d8ba-4038-8cc7-885f88841aaf');
"

PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "
  $SQL_INSERT_LOCATIONS
  $SQL_INSERT_EMPLOYEES
"
