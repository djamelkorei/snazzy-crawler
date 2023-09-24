const pgp = require('pg-promise')();
const db = pgp('postgres://djamel:password@localhost:5432/postgres');


module.exports = {
    db
}