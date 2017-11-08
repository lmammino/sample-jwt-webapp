# sample-jwt-webapp

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A sample JWT web app that can be use to demonstrate how to escalate permissions by cracking and forging JWT tokens

## Idea

This is a simple application where you can login as a user with normal privileges (so normal that you can't do anything!) and by hacking the session id (which is a simple JWT) you should try to escalate your privileges to being an admin.

## How to run it

  1. Clone this repo
  2. Install dependencies (`npm install`)
  3. Run the server (`npm start`)
  4. Have fun (on [localhost:3000](http://localhost:3000))

## Configuration

The app can be configured through environment variables before running the server.

The configuration variables available are:

  - `USERNAME`: the username accepted for login (default `luciano`)
  - `PASSWORD`: the password to pass for the login (default `mariobros`)
  - `SECRET`: the secret used to sign the jwt token (default `secret`)


## Hint

To understand better why this project exists and how to take advantage of it you should have a  look at the following slides deck:

  - [Cracking JWT tokens: a tale of magic, Node.js and parallel computing](https://slides.com/lucianomammino/cracking-jwt-tokens-a-tale-of-magic-nodejs-and-parallel-computing)

You should also check (and maybe use) [`lmammino/distributed-jwt-cracker`](https://github.com/lmammino/distributed-jwt-cracker)


## Contributing

Everyone is very welcome to contribute to this project.
You can contribute just by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/lmammino/sample-jwt-webapp/issues).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
