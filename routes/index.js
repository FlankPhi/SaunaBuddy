var express = require('express');
var router = express.Router();

const WebSocket = require('ws');
var _ws;

const db = require('../Database/db_interface');

let current_temp = 0;
let current_humidity = 0;
let current_time = 0;
let current_run = 0;

const wss = new WebSocket.Server({
    port: 8080,
    perMessageDeflate: {
        zlibDeflateOptions: {
            // See zlib defaults.
            chunkSize: 1024,
            memLevel: 7,
            level: 3
        },
        zlibInflateOptions: {
            chunkSize: 10 * 1024
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        serverMaxWindowBits: 10, // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10, // Limits zlib concurrency for perf.
        threshold: 1024 // Size (in bytes) below which messages
        // should not be compressed.
    }
});

wss.on("connection", ws => {
   console.log("New client connected");
   _ws = ws;
   ws.on("close", () => {
      console.log("Client disconneted");
   });

});

/* GET home page. */
router.get('/', async function(req, res, next) {
    //console.log("calling function");
    let resu = await db.query("SELECT * FROM \"SaunaBuddy\" WHERE timestamp  BETWEEN NOW() - INTERVAL '2 HOURS' AND NOW() order by timestamp;");
    //console.log("rendering");
    //console.log(resu);
  res.render('index', { title: 'SaunaBuddy',
      current_temp: current_temp, current_humidity: current_humidity, current_time: current_time,
      last_res_data: resu.rows});
});

router.get('/time', function(req, res, next) {
    db.get_time(res);
});

router.post('/temp', (req, res) => {

        if (req.body.current_temp){
            current_temp = req.body.current_temp;
            if (_ws) {
                _ws.send(JSON.stringify({"current_temp": current_temp}));
            }else {
                console.log("no Client connected");
            }
             db.insertTemp(current_temp, res);

        }else {
            console.log("body: ");
            console.log(req.body);
            res.status(401).json({"current_temp": "missing", "succsess": false});
        }
});

router.post('/humidity', function (req, res) {
    if (req.body.current_humidity){
        current_humidity = req.body.current_humidity;
        if (_ws) {
            _ws.send(JSON.stringify({"current_humidity": current_humidity}));
        }else {
            console.log("no Client connected");
        }
        res.status(200).json({"current_humidity": "updated", "succsess": true});
    }else {
        res.status(401).json({"current_humidity": "missing", "succsess": false});
    }
});

router.post('/time', function (req, res) {
    if (req.body.current_time){
        current_time = req.body.current_time;
        if (_ws) {
            _ws.send(JSON.stringify({"current_time": current_time}));
        }else {
            console.log("no Client connected");
        }
        res.status(200).json({"current_time": "updated", "succsess": true});
    }else {
        res.status(401).json({"current_time": "missing", "succsess": false});
    }
});

router.post('/data', function (req, res) {
    if (req.body.current_time && req.body.current_humidity && req.body.current_temp && req.body.current_run){
        current_time = req.body.current_time;
        current_humidity = req.body.current_humidity;
        current_temp = req.body.current_temp;
        current_run = req.body.current_run;
        if (_ws) {
            _ws.send(JSON.stringify({
                "current_temp": current_temp,
                "current_humidity": current_humidity,
                "current_time": current_time,
                "current_run": current_run
            }));
        }else {
            console.log("no Client connected");
        }
        db.insertData(current_temp, current_humidity, current_time, current_run, res);
        //res.status(200).json({"current_time": "updated", "current_temp": "updated", "current_humidity": "updated", "succsess": true});
    }else {
        res.status(401).json({"data": "missing", "succsess": false});
    }
});

module.exports = router;
