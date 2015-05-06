# DGKeep
[![Build Status](https://travis-ci.org/eprouty/dgkeep.svg?branch=master)](https://travis-ci.org/eprouty/dgkeep)
[![Coverage Status](https://coveralls.io/repos/eprouty/dgkeep/badge.svg?branch=master)](https://coveralls.io/r/eprouty/dgkeep?branch=master)

Configurable API for tracking game scores

## Environment
This project uses NPM to manage its dependencies, to set up your development environment run `npm install`

This project using Sequalize as an RDBMS so it can handle most relational databases, the test suite is run against a PostgreSQL backend so that must be setup as well.

```bash
brew install postgresql
initdb /usr/local/var/postgres -E utf8
mkdir -p ~/Library/LaunchAgents
cp /usr/local/Cellar/postgresql/9.4.1/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
createdb dgkeep_test
psql -c 'CREATE ROLE postgres LOGIN;' dgkeep_test
```

Install dependencies by running `npm install`
Run the tests using `npm test`
