var express = require('express');
var router = express.Router();

const Pool = require('pg').Pool;
//const result = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const pgPool = new Pool({
    host: 'localhost',//process.env.POSTGRES_HOST,
    user: 'postgres',//process.env.POSTGRES_USER,
    database: 'postgres',// process.env.POSTGRES_DATABASE,
    password: 'myPassword',//process.env.POSTGRES_PASS,
    port: '5432'//process.env.POSTGRES_PORT
});


/* GET users listing. */
router.get('/', function(req, res, next) {
    let pg_string = "SELECT distinct run FROM \"SaunaBuddy\"";
    pgPool.query(pg_string).then(resu => {
        console.log(resu.rows);
        res.render('histroy', { title: 'SaunaBuddy', entry: resu.rows});
    });
});

module.exports = router;