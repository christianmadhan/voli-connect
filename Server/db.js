const postgres = require('postgres')

const sql = postgres('postgres://username:password@host:port/database', {
  host        : 'localhost',
  port        : 5432,       // Postgres server port
  database    : 'voli_connect',         // Name of database to connect to
  username    : 'postgres',         // Username of database user
  password    : 'Voli123#',         // Password of database user
  ssl         : false,      // True, or options for tls.connect
  max         : 10,         // Max number of connections
  timeout     : 0,          // Idle connection timeout in seconds
  types       : [],         // Array of custom types, see more below
});

module.exports = sql