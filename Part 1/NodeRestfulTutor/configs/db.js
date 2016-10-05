/**
 * Created by hynra on 10/5/16.
 */
var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;


var dbName = process.env.DB_NAME || 'panicbutton';
var dbHost = process.env.DB_HOST || 'MacBookPro.local'
var dbPort = process.env.DB_PORT || 27017;

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
db.open(function(e, d){
    if (e) {
        console.log(e);
    } else {
        if (process.env.NODE_ENV == 'live') {
            db.authenticate(process.env.DB_USER, process.env.DB_PASS, function(e, res) {
                if (e) {
                    console.log('mongo : error: not authenticated', e);
                }
                else {
                    console.log('mongo : authenticated and connected to database :: "'+dbName+'"');
                }
            });
        }	else{
            console.log('mongo : connected to database :: "'+dbName+'"');
        }
    }
});

module.exports = {
    db: db
};