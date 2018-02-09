defmodule Stracker.UserEmail do
    import Bamboo.Email
    def send_welcome(email) do
      new_email
      |> to(email)
      |> from("colt@stracker.io")
      |> subject("Stracker Automated Email")
      |> html_body("Stracker.io emails are now live!")
      |> text_body("Stracker.io emails are now live!")
    end
end
