const { Pool } = require('pg');

const pool = new Pool({
    user: 'djamel',
    host: 'localhost',
    database: 'ygg',
    password: 'password',
    port: 5432,
});

const getAllOffices =  async  () => {
    let offices = [];
    try {
        const query = 'select * from offices where processed = false';
        const { rows } = await pool.query(query);
        offices = rows;
    } catch (err) {
        console.error('Error executing query', err);
    }
    return offices;
}

const updateOfficeToProcessed = (id) =>  {
    pool.query('update offices set processed = true where id = $1', [id], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return false;
        } else {
            console.log('office updated successfully');
            return true;
        }
    });
}

const createDocument = (officeId, content, embedding) =>  {
    const query = 'insert into documents (office_id, content, embedding) VALUES ($1, $2, $3::vector)';
    const params = [officeId, content, `[${embedding.toString()}]`];
    pool.query(query, params, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return false;
        } else {
            console.log('Data inserted successfully');
            return true;
        }
    });
}

module.exports = {
    createDocument,
    updateOfficeToProcessed,
    getAllOffices
};