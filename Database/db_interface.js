const Pool = require('pg').Pool;
//const result = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const pgPool = new Pool({
    host: 'localhost',//process.env.POSTGRES_HOST,
    user: 'postgres',//process.env.POSTGRES_USER,
    database: 'postgres',// process.env.POSTGRES_DATABASE,
    password: 'myPassword',//process.env.POSTGRES_PASS,
    port: '5432'//process.env.POSTGRES_PORT
});

const insertTemp = function (temp, res) {
    console.log("inserting temperatures");
    let pg_string = "INSERT into \"SaunaBuddy\" (temp, humidity, time, timestamp, run) VALUES (" + temp + ", 0,0,now(),'somerun');";
    console.log(pg_string);
    pgPool.query(pg_string)
        .then(resu => {  console.log("inserted temperature");
            res.status(200).json({"current_temp": "updated", "succsess": true});
        })
        .catch(err => {
            console.log("inserted temperature FAILED");
            res.status(500).json({"current_temp": "insert failed", "succsess": false});
        })
};


const insertData = function(current_temp, current_humidity, current_time, current_run, res){
    console.log("Inserting data");

    let pg_string = "INSERT into \"SaunaBuddy\" (temp, humidity, time, timestamp, run) " +
        "VALUES (" + current_temp +
        ", " + current_humidity +
        ", " + current_time + "" +
        ", now()," +
        "\'" + current_run + "\');";

    console.log(pg_string);

    pgPool.query(pg_string)
        .then(resu => {
            console.log("inserted data");
            res.status(200).json({"data": "inserted", "succsess": true});
    })
        .catch( err => {
            console.log("error inserting data ");
            res.status(500).json({"data": "insert failed", "succsess": false});
        })

};

const get_time = function(res){
    console.log("Geting current time");
    let pg_string = "SELECT  now();";
    pgPool.query(pg_string).then(resu => {
        console.log("Retuning current time");
        res.status(200).json({"time": resu.rows[0].now, "succsess": true});
    })
        .catch(err => {
            console.log("error retuning current time");
            res.status(500).json({"time": "get failed", "succsess": false});
        })
};
 function get_last_hours(){
    console.log("Getting past 2 hour entrys");
    let pg_string = "SELECT * FROM \"SaunaBuddy\" WHERE timestamp  BETWEEN NOW() - INTERVAL '2 HOURS' AND NOW() order by timestamp;"
    pgPool.query(pg_string).then(resu => {
        console.log("Retuning past 2 hour entrys");
        return resu;
    }).catch(err => {
        console.log("error retuning past 2 hour entrys");
        return err;
    })
};
module.exports = {
    insertTemp,
    insertData,
    get_time,
    get_last_hours,
    query: (text, params) => pgPool.query(text, params),
};