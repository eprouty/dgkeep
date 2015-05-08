# DGKeep
[![Build Status](https://travis-ci.org/eprouty/dgkeep.svg?branch=master)](https://travis-ci.org/eprouty/dgkeep)
[![Coverage Status](https://coveralls.io/repos/eprouty/dgkeep/badge.svg?branch=master)](https://coveralls.io/r/eprouty/dgkeep?branch=master)

Configurable API for tracking golf scores

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
createdb dgkeep_dev
psql -c 'CREATE ROLE postgres LOGIN;' dgkeep_test
```

Install dependencies by running `npm install`
Run the tests using `npm test`

## Testing
All tests are run against the dgkeep_test database which will be wiped clean before each test.

Please note that all Sequelize logging is routed to `logs/sequelize.log`, in order to make debugging clearer, this log is wiped at the start of testing. If you are doing development and wish to hold onto this log make sure to create a copy before running `npm test`.
