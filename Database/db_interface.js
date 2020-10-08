const Pool = require('pg').Pool;
const result = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const pgPool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASS,
    port: process.env.POSTGRES_PORT
});

const insertTemp = function (temp) {
    console.log("inserting temperatures");
    let pg_string = "INSERT into \"SaunaBuddy\" (temp, humidity, time, timestamp, run) VALUES (" + temp + ", 0,0,now(),'somerun');";
    console.log(pg_string);
    pgPool.query(pg_string, (error, result) => {
        if (error) {
            console.log("inserted temperature FAILED");
            //response.status(500).json({ "Error": "internal error querying totes", "msg": error });
            // throw error;
            return false;
        }
        if (result) {
            console.log("inserted temperature");
            //result.rows[0].bins = JSON.parse(result.rows[0].bins);
            //result.rows[0].updated_line_items = JSON.parse(result.rows[0].updated_line_items);
            //result.rows[0].order_id = result.rows[0].order_id[0];
            //response.status(200).json(result.rows[0]);
            return true;
        }
    });

};

module.exports = {
  insertTemp
};