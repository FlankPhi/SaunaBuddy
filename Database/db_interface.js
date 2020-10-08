const Pool = require('pg').Pool;
//const result = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const pgPool = new Pool({
    host: 'localhost',//process.env.POSTGRES_HOST,
    user: 'postgres',//process.env.POSTGRES_USER,
    database: 'postgres',// process.env.POSTGRES_DATABASE,
    password: 'myPassword',//process.env.POSTGRES_PASS,
    port: '5432'//process.env.POSTGRES_PORT
});

const insertTemp = function (temp) {
    console.log("inserting temperatures");
    let pg_string = "INSERT into \"SaunaBuddy\" (temp, humidity, time, timestamp, run) VALUES (" + temp + ", 0,0,now(),'somerun');";
    console.log(pg_string);
    pgPool.query(pg_string)
        .then(res =>   console.log("inserted temperature"))
        .catch(err => console.log("inserted temperature FAILED"))
};

module.exports = {
  insertTemp
};