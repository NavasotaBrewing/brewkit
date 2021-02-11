# Brewkit
This project is a web front end for [NavasotaBrewing/brewdrivers](https://github.com/NavasotaBrewing/brewdrivers). It runs on NPM and VueJS, and communicates with an API provided by the `brewdrivers` Rust crate. This package just provides a pretty web interface for the devices supported by `brewdrivers`.

    Note: There's a good chance this will get completely rewritten soon.

See [`NavasotaBrewing/readme`](https://github.com/NavasotaBrewing/readme) for a more high level overview.

# Usage
## Setup
This is meant to be run on Linux. It *probably* works on Windows and MacOS, but i'm not sure. You'll need:
  * [`npm`](https://www.npmjs.com/)
  * `sqlite3`

```
$ git clone https://github.com/NavasotaBrewing/brewkit.git

# Install deps for db
$ cd brewkit/db
$ npm install
# Run this and leave it running
$ npm run dev

# In another shell...
# Install deps for main package
$ cd brewkit
$ npm install
$ npm run serve
```

You should have one shell running `db`, and another running `brewkit`. Visit `localhost:8080`.

This package will communicate with a master server, which is `brewdrivers` job. I won't go over that here.