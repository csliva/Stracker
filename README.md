# Stracker

### ~~Get things done~~

* Bottom bar hover functionality
* Login Errors
* Board Invites
* Alert System Complete
* Task Search
* Exporting Data
* Home Sales Page Complete


### Setup instructions

You will need two terminal windows open. One for the web react app, and one for the phoenix api.

#### Installs
* npm | http://blog.npmjs.org/post/85484771375/how-to-install-npm
* elixir / erlang | http://elixir-lang.org/install.html
* postgres | https://www.postgresql.org/download/

#### Web directory (React frontend)
* cd into the web directory
* `npm install`
* create a .env file in the web directory that contains the path to api `REACT_APP_API_URL=http://localhost:4000/api`
* `npm start` to run a localhost node server which will be served at http://localhost:3000 (After running npm start, it will automatically pull up the url. It also has a hotloader which will reload the files after every change)

#### Api directory (Elixir |> Phoenix API)
* create a dev.secret.exs file under the config folder which contains Mix.Config info such as postgres user and pass
```
use Mix.Config

config :stracker, Stracker.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "YOUR_PGSQL_USERNAME",
  password: "YOUR_PASS",
  database: "stracker_dev",
  hostname: "localhost",
  pool_size: 10
```
* `mix deps.get` (C compiler like gcc is needed to compile comeonin. See below)
* `mix ecto.create` run once to create database
* `mix ecto.migrate`
* In order to start the server, run `mix phoenix.server`

**C Compiler**
If having problems on windows, this is a great solution https://github.com/riverrun/comeonin/issues/75

On mac you can install with `brew install gcc` or get it through xcode

#### Populate Data
To populate data normally:
* You may create a new user with http://localhost:3000/signup
* Create a board
* Fill out the task forms

To populate data programmatically:
* `cd` into the api directory
* edit api/priv/repo/seeds.exs with an elixir script to fill data. insert_post() and insert_user() functions are available in the script currently.
* run `mix run priv/repo/seeds.exs` to populate user with content
* Note: Seeds is currently empty and not worth running
