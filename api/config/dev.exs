use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :stracker, Stracker.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: []


# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

config :guardian, Guardian,
  secret_key: "UUM8UpQUtRafnGe1nJSCCxKutbkWqjKq6sYdgMATZkr8oqjIc7uH0ZquUgpbmSey"

config :stracker, Stracker.Mailer,
  adapter: Bamboo.MailgunAdapter,
  domain: "mg.stracker.io",
  api_key: "key-5cdf461acccade606f95fc667fe444ad"

# Configure your database
import_config "dev.secret.exs"
