require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.db_user,
    "password": process.env.db_pass,
    "database": process.env.db,
    "host": 'localhost',
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.db_user,
    "password": process.env.db_pass,
    "database": process.env.db,
    "host": 'localhost',
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.db_user,
    "password": process.env.db_pass,
    "database": process.env.db,
    "host": 'localhost',
    "dialect": "mysql"
  }
}
