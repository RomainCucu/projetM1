	
var index = {};

index.start = function () {
	document.addEventListener("click", index.on_click);
	document.addEventListener("keydown", index.on_enter);
	

	
	
};

index.on_click = function (ev) {
	var src = ev.target;
	if (src.has_class("sign-in")) {
		index.check_login();
	}else if( src.has_class("submit-register")){
		index.register();
	}else return
};

index.on_enter = function (ev) {
	var src = ev.target;
	var focus1 = document.getElementById("exampleInputPassword2").value;
	var log = document.getElementById("reg-login").value;
	var mail = document.getElementById("reg-mail").value;
	var pw = document.getElementById("reg-pw").value;
	var cpw = document.getElementById("reg-cpw").value;
	
	console.log(focus1);
	if (ev.keyCode == 13 && (log != "")){
		index.register();
	}else if(ev.keyCode == 13 && (mail != "")){
		index.register();
	}
	else if(ev.keyCode == 13 && (pw != "")){
		index.register();
	}
	else if(ev.keyCode == 13 && (cpw != "")){
		index.register();
	}
	else if(ev.keyCode == 13 && focus1 != "")
	{
		index.check_login();
	}else return;
};

//lorsque l'on crée un compte
index.register = function(){
	var log = document.getElementById("reg-login").value;
	var mail = document.getElementById("reg-mail").value;
	var pw = document.getElementById("reg-pw").value;
	var cpw = document.getElementById("reg-cpw").value;
		
	if(pw == cpw){
		var data = {ac: "register", login: log, password: pw, email: mail};
		index.post(data, index.reg_callback);
	} else{
		console.log("error register pw diff de cpw");
		var elt = document.getElementById("info-reg");
		elt.classList.add("text-danger");
		elt.innerHTML = "Erreur: MDP différents";
		var elts = document.getElementsByClassName("pw-reg-form");
		for (var i = 0; i < elts.length ; i++) {
				elts[i].classList.add("has-error");
		}
	}

};

//lorsque l'on recoit une rep du serveur pour le register
index.reg_callback = function () {
	if (this.readyState == 4 && this.status == 200) {
		//console.log(this.responseText);
		var r = JSON.parse(this.responseText);
		
		if (r.message == "ok"){
			location.reload();
		} else if( r.message == "short"){
			var elt = document.getElementById("info-reg");
			elt.classList.add("text-danger");
			elt.innerHTML = "Erreur: login, votre pseudo doit contenir au minimum 3 caractères et au maximum 15";
			var elts = document.getElementsByClassName("log-reg-form");
			elts[0].classList.add("has-error");
		}else {
			var elt = document.getElementById("info-reg");
			elt.classList.add("text-danger");
			elt.innerHTML = "Erreur: login ou mail déjà existannt";
			
		}
 	}
};

//lorsque l'on veut se connecter
index.check_login = function () {
	var log = document.getElementById("exampleInputEmail2").value;
	var pw = document.getElementById("exampleInputPassword2").value;
	var data = {ac: "login", login: log, password: pw};
	index.post(data, index.log_callback);
};

//reponse du serveur pour la connection
index.log_callback = function () {
	if (this.readyState == 4 && this.status == 200) {

		var r = JSON.parse(this.responseText);
		if (r.message == "ok") {
	//		index.setCookie(log, random, 1);
			window.location = "./html/accueil.html";
		}else if (r.message == "not_allowed"){ 
			document.getElementById("statut-du-compte").innerHTML="Your account has been suspended. Thank you for your understanding.";
			document.getElementById("statut-du-compte").className="text-danger";
			
			
		}else {
			console.log("Login error");
			var elts=document.getElementsByClassName("glyphicon");
				for (var i = 0; i < elts.length ; i++) {
					elts[i].classList.add("glyphicon-remove");
					elts[i].classList.add("form-control-feedback");
				}
				
			var elts=document.getElementsByClassName("has-feedback");
				for (var i = 0; i < elts.length ; i++) {
					elts[i].classList.add("has-warning");
					
				}
		}
	}
};




index.post = function (data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.onreadystatechange = callback;
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
};

HTMLElement.prototype.has_class = function (c) {
	return (this.className.indexOf(c) >= 0);
};






// fonction pour remplir le graphe ======================================
var remplissage = function () {
	var data = {ac: "get_charts"};
	post(data, charts_remp);
};

charts_remp = function () {
	if (this.readyState == 4 && this.status == 200) {
		var r = JSON.parse(this.responseText);
		
		$('#container').highcharts('StockChart', {
		 rangeSelector: {
	    	buttonTheme: { // styles for the buttons
	    		//fill: 'none',
	    		//stroke: 'none',
	    		//'stroke-width': 0,
	    		//r: 8,
	    		style: {
	    			color: '#000',
	    			fontWeight: 'bold'
	    		},
	    		states: {
	    			hover: {
	    			
	    			},
	    			select: {
	    				fill: '#ed9c28',
	    				style: {
	    					color: 'white'
	    				}
	    			}
	    		}
	    	},
	    	inputBoxBorderColor: 'gray',
	    	inputBoxWidth: 120,
	    	inputBoxHeight: 18,
	    	inputStyle: {
	    		color: '#000',
	    		fontWeight: 'bold'
	    	},
	    	labelStyle: {
	    		color: 'silver',
	    		fontWeight: 'bold'
	    	},
	    	selected: 1
	    },

			title : {
			
				text : "Gold Stock Price in $",
				style : {"color": "#000"}
				
			},
			
			series : [{
				color: '#ed9c28',
				name : "Gold",
				data : r,
				tooltip: {
					valueDecimals: 2
				}
				
				
			}]
			
			
		});
	}
};


var post = function (data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.onreadystatechange = callback;
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
};

/*window.onload = function () {
	remplissage();
};
*/


window.onload = function () {
	remplissage();
	setTimeout(index.start, 1);

};




