var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");
var util = require("util");

exports.create = function () {
	db.run("CREATE TABLE test (id varchar(50) PRIMARY KEY, pw varchar(50), mail varchar(100) UNIQUE, cookie_id varchar(15) , cookie_date varchar(13), money varchar(10), stock varchar(10), nbstock varchar (10), accountstatue varchar (2))");
    /* ================================================POUR LE FORUM============================================ */
   //CREATE TABLE forum (id varchar(50), content varchar(1000))
    /* ======================================================================================================================== */
    //db.close();
   // db.run("CREATE TABLE forum (id varchar(50), content varchar(1000))");
};

exports.create2 = function (){
	db.run("CREATE TABLE forum (id varchar(50), content varchar(1000), date varchar(20))");
};

//insertion d'un nouvel utilisateur

exports.insert = function (l, p, m, res) {
    db.serialize(function () {
  
        var stmt = db.prepare("INSERT INTO test VALUES (?, ?, ?, 1, 1, 10000, 0, 0, 0)");
      
        
        stmt.run(l, p, m, function (e) {
        	if (e) {
        		util.log("ERROR - DB doublon  : " + e);
        		res.end(JSON.stringify({message: "ko"}));
        	} else {
        		res.end(JSON.stringify({message: "ok"}));
        	}
        		
        });
        stmt.finalize();
    });

    //db.close();
};

exports.insert_admin_from_terminal = function (l, p, m) {
    db.serialize(function () {
  
        var stmt = db.prepare("INSERT INTO test VALUES (?, ?, ?, 1, 1, 10000, 0, 0, 1)");
      
        
        stmt.run(l, p, m, function (e) {
        	if (e) {
        		util.log("ERROR - DB doublon  : " + e);
        		//res.end(JSON.stringify({message: "ko"}));
        	} else {
        		util.log("ok ");
        		//res.end(JSON.stringify({message: "ok"}));
        	}
        		
        });
        stmt.finalize();
    });

    //db.close();
};


/* =======================Insert Message in Forum============================================================== */
	exports.insert_message_forum = function (l, m, d, res) {
    db.serialize(function () {
  
        var stmt = db.prepare("INSERT INTO forum VALUES (?, ?,?)");

        stmt.run(l, m, d, function (e) {
        	if (e) {
        		util.log("ERROR - DB : " + e);
        		
        		res.end(JSON.stringify({message: "ko"}));
        	} else {
        		res.writeHead(200, {"Content -Type": "application/json"});
        		res.end(JSON.stringify({message: "ok"}));
        	}
        		
        });
        stmt.finalize();
    });

    //db.close();
};
/* =======================Get Message to show it============================================================== */



	
	
	exports.get_message_forum = function (res) {
	
		var stmt = "SELECT id, content, date FROM forum";
		//console.log(stmt);
		var arrC = new Array();
		var arrI = new Array();
		var arrD = new Array();
	
		db.each(stmt, function (e,r){			
		if (r) {
			arrC.push(r.content);
			arrI.push(r.id);
			arrD.push(r.date);
		
			//res.end(JSON.stringify(arrC));
			
		}
		else return;
	}
	, function(e,r){
		if(r){
				var arrT = new Array(arrI,arrC,arrD);
				//console.log(arrT);
				res.end(JSON.stringify(arrT));
			}
		}
	); 
	
	
};
		
/* =======================Get id to show it============================================================== */
exports.get_id_chat = function (res) {	
	var stmt = "SELECT id, cookie_id FROM test";
	var arrC = new Array();
	
	db.each(stmt, function (e,r){			
		if (r) {
			if (r.cookie_id != "0")
			{
				arrC.push(r.id);
				
			}		
		}
		else return;
	}
	, function(e,r){
		if(r){
			//	console.log("==================" + arrC);
				res.end(JSON.stringify(arrC));
			}
		}
	); 
	
	
};

/* =================================PAGE ADMIN========================================================== */


/* ==============get id to show it============================ */

exports.get_id_admin = function (res) {  
	var stmt = "SELECT id,accountstatue FROM test";
	var arrID = new Array();
	var arrS = new Array();

	db.each (stmt, function (e,r){
		if (r) { // si on a une rep de la db

			arrID.push(r.id); // on récup sous forme de tableau tous les id de la DB (au fur et a mesure des tours de boucle (des réponses reçues)
			arrS.push(r.accountstatue);
		}else return;
			}, function(e,r){
			if(r){
			res.end(JSON.stringify(arrT=[arrID,arrS]));
		}
		}

	);
};
/* ==============delete account============================ */
exports.delete_account_admin = function(l,res){
	db.run("DELETE FROM test WHERE id = ?", l);
	res.end(JSON.stringify({message: "deleted"}));
};
/* ==============set account============================ */
exports.set_account_admin = function (s, l, res){
	//console.log('0000000000000004');
	db.run("UPDATE test SET accountstatue = ? WHERE id = ?", l, s);
	if (l =="1"){
		res.end(JSON.stringify({message: "up"}));
	}else if(l =="0"){
		res.end(JSON.stringify({message: "down"}));
	}else if(l =="2"){
		res.end(JSON.stringify({message: "suspend"}));
	}
	
};
/* ==============niveau router method GET============================ */
exports.valid_admin = function(c, o , cb){
	if(c){
		var m = c.split("=");
		var stmt = "SELECT accountstatue FROM test WHERE cookie_id=\"" + m[1] + "\"";
		db.each(stmt, function (e, r) {
			if(r.accountstatue == "1"){
			o[cb](true);
			}else{
			o[cb](false);
			}
		});
	}
};







/* ================================SETTINGS ================================================================================ */

		/* ================================Changer de MDP=========================================== */

		
// "l" correspond au cookie

exports.change_mdp = function (l, op, np, res){
	
	var m = l.split("=");
	var stmt = "SELECT pw FROM test WHERE cookie_id=\""+  m[1] + "\""; // on récup le pssword du cookie
	console.log(stmt);
	db.each(stmt, function (e, r) {
		console.log(r); 
		console.log(r.pw); // le mdp de la db
		console.log(op); // ce que l'utilisateur a rentré (son mdp)
		if(r){
			if (r.pw == op){
	
				db.run("UPDATE test SET pw = ? WHERE cookie_id = ?", np, m[1]);
				res.end(JSON.stringify({message: "OK"}));
			}else{
				res.end(JSON.stringify({message: "pwdiff"}));
			}
		}
		else{
			res.end(JSON.stringify({message: "KO"}));
		}
	});
};


			/* ================================Changer d'email =========================================== */

// "c" correspond au cookie

exports.change_email = function (c, em, pwz, res){
	
	var m = c.split("=");
	var stmt = "SELECT mail, pw FROM test WHERE cookie_id=\""+  m[1] + "\""; // on récup le email et le mdp
	console.log(stmt);
	db.each(stmt, function (e, r) {
		console.log('objet de reponse r:' + r); 
		console.log('email de la base de donneeé' + r.mail); // l'email de la db
		console.log('email que luser a rentré' + em); // ce que l'utilisateur a rentré (son email)
		console.log('pw de la bdd' + r.pw);
		console.log('pw que luser a rentre' + pwz);
		if(r){ // si on a une réponse de la base de donnée
		
				if ( r.pw == pwz ){
					db.run("UPDATE test SET mail = ? WHERE cookie_id = ?", em, m[1]);
					res.end(JSON.stringify({message: "OK"}));
				}
				else {
					res.end(JSON.stringify({message: "ERRORMDP"}));
				}
			}
		else{
				res.end(JSON.stringify({message: "KO"}));
			}
		
	});
};

		/* ================================Changer d'email =========================================== */

// "c" correspond au cookie

exports.delete_account = function (c, mdp, res){
	
	var m = c.split("=");
	var stmt = "SELECT pw FROM test WHERE cookie_id=\""+  m[1] + "\""; // on récup le email et le mdp
	console.log('objet de la bdd ' + stmt);
	db.each(stmt, function (e, r) {
		console.log('objet de reponse r: ' + r.pw); 
		console.log('pw de la base de donneeé' + r.mail); // le mdp de la db
		console.log('pw que luser a rentré' + mdp); // ce que l'utilisateur a rentré (son mdp)
	
		if(r){ // si on a une réponse de la base de donnée
		
				if ( r.pw == mdp ){
					console.log('if mdp egal');
					db.run("DELETE FROM test WHERE cookie_id = ?", m[1]);
					res.end(JSON.stringify({message: "OK"}));
				}
				else {
					res.end(JSON.stringify({message: "KO"}));
				}
			}
		else{
				res.end(JSON.stringify({message: "KOtech"}));
			}
		
	});
};


/* ======================================================================================================================== */

exports.valid_cookie = function (c, o, cb) {
//o[cb](true);
//};
	if(c) {
		if (c == "0"){
			o[cb](false);
		}else{
			var m = c.split("=");
			//console.log(m);
			var stmt = "SELECT id FROM test WHERE cookie_id=\"" + m[1] + "\"";
	
			db.each(stmt, function (e, r) {//pour parcourir la base
			//console.log("==================== OK");
			//console.log("========"+e);
				if (r) {
					//console.log("==================== OK");
			
				}/*else{
				console.log("==================== Utilisateur deja connecté");
					o[cb](false);
				}*/
	
				}, function(e,r){
					//console.log("=========+++++++=====" +r);
					if (r==0){
						//console.log("USER DEJA CONNECTE");
						o[cb](false);
					}else if(r==1){
						//console.log("USER UNIQUE");
						var stmt = "SELECT cookie_date FROM test WHERE cookie_id=\"" + m[1] + "\"";
						var date = new Date().valueOf();
						db.each(stmt, function (e, r) {
						if ((date - r.cookie_date)>359073){
							db.run("UPDATE test SET cookie_id = ? WHERE cookie_id = ?", "0", m[1]);
							o[cb](false);
							}
							else {
							db.run("UPDATE test SET cookie_date = ? WHERE cookie_id = ?", date, m[1]);
							o[cb](true);
							}
					})}
					
			});
		}
	} else{
		o[cb](false);
	}
	
	};	
	

exports.check_all_cookies = function (){
	var stmt = "SELECT cookie_date, cookie_id, id FROM test";
	var date = new Date().valueOf();
	console.log(date);
	db.each(stmt, function(e,r){
		if((date-r.cookie_date)>360000){
			//console.log(r.id);
			db.run("UPDATE test SET cookie_id = ? WHERE id = ?", "0", r.id);
		}
		},function(e,r){
		console.log("nettoyage effectué");
		});
};



exports.login = function (l, p,res) {
	var stmt = "SELECT id, accountstatue FROM test WHERE id=\"" + l + "\" AND pw=\"" + p + "\"";
	console.log(stmt);
	db.each(stmt, function (e, r) {
	console.log(r);
	if (r) {

			if(r.accountstatue!=2) {
					var c =  r.id.substring(0,3) + Math.floor(Math.random() * 100000000);//TODO stock BDD + new Date().valueOf();

					cookie_update(c, r.id);//MaJ BdD
					res.writeHead(200, {"Content -Type": "application/json", "Set-Cookie" : 'cookieName='+c});
					res.end(JSON.stringify({message: "ok"})); // avant modif : res.end(JSON.stringify({message: "ok"}));
					}

				else if(r.accountstatue==2){
					res.end(JSON.stringify({message: "not_allowed"}));
					}
				}
					}, function () {
					res.writeHead(200, {"Content -Type": "application/json", "Set-Cookie" : "null"});
					res.end(JSON.stringify({message: "ko"}));
	});

};
/*+++++++++++++++++++supprimer un cookie++++++++++++++++++++++++++++++*/
exports.delete_cookie = function (l, res) {
	var m = l.split("=");
	
	db.run("UPDATE test SET cookie_id = ? WHERE cookie_id = ?", "0", m[1]);

	res.writeHead(200, {"Content -Type": "application/json"});
	res.end(JSON.stringify({message: "logout"}));

};
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

exports.read = function () {
    var stmt = "SELECT * FROM test";
    db.each(stmt, function (e, r) {
        console.log(util.inspect(r));
    });
    //db.close();
};




var cookie_update = function (cookie, id) {
	
	//console.log("===================="+cookie);
	//console.log("creation of a cookie");
	db.run("UPDATE test SET cookie_id = ?, cookie_date = ? WHERE id = ?", cookie, new Date().valueOf(), id);
	//db.run("UPDATE test SET cookie_date = ? WHERE id = ?", new Date().valueOf(), id);

};

/* ================================MY WALLET============================================== */
exports.buy = function (w, s, l, res) {
	var m = l.split("=");
	console.log("buying gold"+ w, s, m[1]);
	db.run("UPDATE test SET money = ? WHERE cookie_id = ?", w, m[1]);
	db.run("UPDATE test SET nbstock = ? WHERE cookie_id = ?", s, m[1]);
	
	res.end(JSON.stringify({message: "ok"}));
};

exports.reset_btn = function (l, res){
	var m = l.split("=");
	console.log("reset wallet of"+m[1]);
	db.run("UPDATE test SET money = 10000 WHERE cookie_id = ?", m[1]);
	db.run("UPDATE test SET nbstock = 0 WHERE cookie_id = ?", m[1]);
	res.end(JSON.stringify({message: "reset"}));	
};

exports.get_money = function (l, res) {
	var m = l.split("=");
	var stmt = "SELECT money, nbstock FROM test WHERE cookie_id=\"" + m[1] + "\"";

	console.log(stmt);
	db.each(stmt, function (e, r) {
		console.log(r);
		if (r) {
			res.end(JSON.stringify(r));
		}
	}, function () {
		res.end(JSON.stringify({message: "ko"}));
	});
};
/* ======================================================================================================================== */



/* ====================================GET ID================================================================== */
exports.get_id = function (l, res) {
	var m = l.split("=");
	var stmt = "SELECT id, accountstatue FROM test WHERE cookie_id=\""+  m[1] + "\"";
	console.log(stmt);
	db.each(stmt, function (e, r) {
		console.log(r);
		if (r) {
			res.end(JSON.stringify(r));
		}
	}, function () {
		res.end(JSON.stringify({message: "ko"}));
	});
};
/* ======================================================================================================================== */




