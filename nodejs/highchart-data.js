var fs = require ("fs");
var http = require("http");
var util = require("util");

exports.fetch_info = function () {
	process();
	setInterval(process, 60000);
};


var process = function () {
	var file = fs.createWriteStream("./table.csv");

	http.get("http://ichart.finance.yahoo.com/table.csv?s=GLE.PA", function(res) {
		res.pipe(file);
  		setTimeout(gold_retrieve, 10000);;
	}).on('error', function(e) {
  		console.log("Got error: " + e.message);
	});
		
};


var gold_retrieve = function () {
	var a = fs.readFileSync("./table.csv"); // on charge le fichier dans a (dans le Buffer)

	a = a+""; // on toString a

	a = a.split("\n");
	a.splice(0,1);
	var arr = new Array();

	for (var b in a) {
		var c = a[b].split(",");
		var tmp = new Array();
		tmp.push(new Date(c[0]).valueOf());
		tmp.push(parseFloat(c[1])); 
		arr.push(tmp);
	}
	
	arr.splice(arr.length-1, 1);

	arr.reverse();

	fs.writeFileSync("../data.json", JSON.stringify(arr));

	
	util.log("INFO - New gold charts");
};






