var fs = require ("fs");
var http = require("http");
var util = require("util");
var tableauglobal = new Array();

exports.fetch_info = function () {
	process();
	setInterval(process, 6000);
};


var process = function () {
	var file = fs.createWriteStream("./tableintraday.csv");

	http.get("http://www.google.com/finance?q=NASDAQ%3AGOLD&sq=gold&sp=10&ei=t0BuU7jJGer5wAP0-4GgDw", function(res) {
		res.pipe(file);
  		setTimeout(gold_retrieve, 5000);
  		
	}).on('error', function(e) {
  		console.log("Got error: " + e.message);
	});
		
};


var gold_retrieve = function () {
	var d=new Date();
	
	if ( (d.getHours()>=15 && d.getMinutes()>=30) || (d.getHours()>=16 && d.getHours()<22) || (d.getHours()>=22 && d.getMinutes()<=30))
		{
		var a = fs.readFileSync("./tableintraday.csv"); // on charge le fichier dans a (dans le Buffer)

		a = a+""; // on toString a
	
		var positionofmyvalue = a.indexOf("ref_676163_l");
		var newfile = a.slice(positionofmyvalue, (positionofmyvalue+30));
		if (newfile){
		var res = newfile.split(">");
		res = res[1];
		res = res.split("<");
		res=res[0];
		console.log ("valeur actuelle de l'or : "+res);
			//console.log(a);
		var arr = new Array();
	

		 {
			//var c = a[b].split(",");
			var tmp = new Array();
			tmp.push(new Date().valueOf());
			tmp.push(parseFloat(res)); 
			//arr.push(tmp);
		}
	
	
		/*
		arr.splice(arr.length-1, 1);

		arr.reverse();
		*/
		tableauglobal.push(tmp);
		//console.log(tableauglobal);
		fs.writeFileSync("../dataintraday.json", JSON.stringify(tableauglobal));
	
	
		util.log("INFO - New gold charts - Intraday");
		}
		}else{
		 tableauglobal = new Array();
		 fs.writeFileSync("../dataintraday.json", JSON.stringify(tableauglobal));
		 console.log("marché fermé");
		 }
};






