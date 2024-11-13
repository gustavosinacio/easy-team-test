# Easy Team Test

This repository contains all the necessary data to run a backend api, a database
and a react native application.

- The code for the **API**, navigate to `easy-team-test-api` folder
- The code for the react native application is inside `easy-team-test`
- The Database was developed using `postgres`. There is a docker config inside
  the api folder.

## First steps for the API and Database

The api was developed utlizing [nestJS](https://nestjs.com/).

### ENV

Inside the `easy-team-test-api` folder there is an `.env.example` file with a
few variables and example values for them. Use it to create a `.env` file.
These configs are just for show, you can set up any config you have in your machine.

<span style="color: red">IMPORTANT</span>: Make sure the `.env` has all the variables
laid out in the `.env.example` **before** running the `docker compose` container,
as it will use those value to set up your container.

If postgres is already running on your machine and using port `5432`, make sure
to turn it off before running the container, as it will also use this port. You
can also run this without docker, just make sure to configure your db information
in the `.env` file.

After configured, your `.env` file should look something like this:

```env
PGADMIN_DEFAULT_EMAIL=admin@email.com
PGADMIN_DEFAULT_PASSWORD=admin
DB_NAME=easy_team
DB_USER=postgres
DB_PASSWORD=easy_team_api
DB_HOST=localhost
DB_PORT=5432

EASY_TEAM_PARTNER_ID="<PARTNER_ID>"
```

After everything is setup, to run docker use:

```bash
docker compose up
```

or

```bash
docker compose up -d # to not hang your terminal
```

### Private key

It is also necessary to have a private RSA key inside the `easy-team-test-api`
folder. The file should be named `priv.key`. This key will be used for JWT signing
