# Quanta Stack

### Setup instructions

#### Installs
* npm | http://blog.npmjs.org/post/85484771375/how-to-install-npm
* elixir / erlang | http://elixir-lang.org/install.html
* postgres | https://www.postgresql.org/download/

#### Web (React frontend)
* cd into the web directory
* `npm install`
* create a .env file in the web directory that contains the path to api (REACT_APP_API_URL=http://localhost:4000/api)

#### api
* create a dev.secret.exs file under the config folder which contains Mix.Config info such as postgres user and pass
```
use Mix.Config

config :stracker, Stracker.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "YOUR_PGSQL_USERNAME",
  password: "YOU_PASS",
  database: "stracker_dev",
  hostname: "localhost",
  pool_size: 10
```
* `mix deps.get`
* `mix ecto.migrate`
