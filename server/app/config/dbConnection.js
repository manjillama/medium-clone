/*
** Postgres Sql Database connection
** https://node-postgres.com/features/pooling
*/
const Sequelize = require('sequelize');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/sample_db';

const sequelize = new Sequelize(connectionString, {
  define: {
    timestamps: false, // true by default
  },
  // disable logging; default: console.log
  logging: false,
});

module.exports = sequelize;
