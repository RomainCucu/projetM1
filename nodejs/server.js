var http = require("http");
var util = require("util");
var charts = require("./highchart-data.js");
var charts2 = require("./highchart-data-intraday.js");
var charts3 = require("./highchart-SG.js");
var db = require("./db.js");

charts.fetch_info();
charts2.fetch_info();
charts3.fetch_info();



var server = {}; //Server object. This object is use to stock everything owned by the server.
server.r = require("../nodejs/router.js"); server.port = 1337;
server.address = "127.0.0.1";
/**
* This method is called each times a request arrives on the server * @param req (Object) request object for this request
* @param resp (Object) response object for this request
*/
server.receive_request = function (req, resp) { server.r.router(req, resp);
};
http.createServer(server.receive_request).listen(server.port, "0.0.0.0");
util.log("INFO - Server started, listening " + server.address + ":" + server.port);
var prout = function(){
	//util.log("okokookokokokookookokokokook");
	db.check_all_cookies();
};

setInterval(prout,60000);