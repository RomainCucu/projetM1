// +++++++++++++++++++++++++Objet pour changer de mot de passe+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var mdp = {};

mdp.start = function () {
	document.addEventListener("click", mdp.on_click);
	// console.log('fonction start bien appelée');
	// document.addEventListener("keydown", index.on_click);
};

mdp.on_click = function (ev) {
	console.log('fonction mdp.start bien appelée');
	var src = ev.target;
	
	if (src.has_class("confirm1")) {
		mdp.get_mdp();
	}};

mdp.get_mdp = function () {
	var opw = document.getElementById("opw").value;
	var npw = document.getElementById("npw").value;
	var cpw = document.getElementById("cpw").value;
	
	if (npw == cpw){
	
	var data = {ac: "change-mdp", password: opw, npassword: npw};
	mdp.post(data, mdp.log_callback);			
	}
	else {
		var elm = document.getElementById("info-reg");
		elm.innerHTML=("Error, Yours new password are differends");
		elm.style.color="red";
		
	}
};
						
mdp.log_callback = function () {
	if (this.readyState == 4 && this.status == 200) {
	var r = JSON.parse(this.responseText);
	if (r.message == "OK") {
		var elm = document.getElementById("info-reg");
		elm.innerHTML=("Password changed ! ");
		elm.style.color="green";
		console.log("sucess");
	}	else if(r.message == "pwdiff"){
		var elm = document.getElementById("info-reg");
		elm.innerHTML=("Old password WRONG !");
		elm.style.color="red";
		console.log("reponse error");
	}	
}};


mdp.post = function (data, callback) {
	var xhr = new XMLHttpRequest();
   						xhr.open("POST", "/");
					    xhr.onreadystatechange = callback;
					    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					    xhr.send(JSON.stringify(data));
};				

// +++++++++++++++++++++++++Objet pour changer demail+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


var email = {};

email.start = function () {
	document.addEventListener("click", email.on_click);
	// console.log('fonction start bien appelée');
	// document.addEventListener("keydown", index.on_click);
};

email.on_click = function (ev) {
	console.log('fonction email.start bien appelée');
	var src = ev.target;
	
	if (src.has_class("confirm2")) {
		email.get_email();
		
	}};

email.get_email = function () {
	var cem = document.getElementById("cem").value;
	var pwe = document.getElementById("pwe").value;

	var data = {ac: "change-email", email: cem, pw:pwe};
	email.post(data, email.log_callback);			
};


						
email.log_callback = function () {
	if (this.readyState == 4 && this.status == 200) {
	var r = JSON.parse(this.responseText);
	if (r.message == "OK") {
		var elm = document.getElementById("info-reg2");
		elm.innerHTML=("email changed !");
		elm.style.color="green";
		console.log("sucess");
	}
	else if(r.message=="ERRORMDP"){
		var elm = document.getElementById("info-reg2");
		elm.innerHTML=("Error, your password is wrong !");
		elm.style.color="red";
		console.log("mdp incorrecte");
	}	
	else if(r.message == "KO"){
		var elm = document.getElementById("info-reg2");
		elm.innerHTML=("Error, please try again");
		elm.style.color="yellow";
		console.log("reponse error");
	}	
}};


email.post = function (data, callback) {
	var xhr = new XMLHttpRequest();
   						xhr.open("POST", "/");
					    xhr.onreadystatechange = callback;
					    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					    xhr.send(JSON.stringify(data));
};				


// +++++++++++++++++++++++++Objet pour changer Delete le compte+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var del = {};

del.start = function () {
	document.addEventListener("click", del.on_click);
	// console.log('fonction start bien appelée');
	// document.addEventListener("keydown", index.on_click);
};

del.on_click = function (ev) {
	console.log('fonction del.start bien appelée');
	var src = ev.target;
	
	if (src.has_class("confirm3")) {
		del.get_mdp();
	}};

del.get_mdp = function () {
	var pwd = document.getElementById("pwd").value;
	
	var data = {ac: "delete-account", pwd: pwd};
	del.post(data, del.log_callback);			
};
						
del.log_callback = function () {
	if (this.readyState == 4 && this.status == 200) {
	var r = JSON.parse(this.responseText);
	if (r.message == "OK") {
		var elm = document.getElementById("info-reg3");
		elm.innerHTML=("Account deleted");
		elm.style.color="green";
		console.log("sucess");
		setTimeout(function () {
			window.location.assign("../index.html");
		}, 1000);
		
	}	else if (r.message == "KO") {
		var elm = document.getElementById("info-reg3");
		elm.innerHTML=("Error, your password is wrong !");
		elm.style.color="red";
		console.log("reponse error: mdp");
		
	}	
	else if(r.message == "KOtech"){
		console.log("reponse error");
	}	
}};


del.post = function (data, callback) {
	var xhr = new XMLHttpRequest();
   						xhr.open("POST", "/");
					    xhr.onreadystatechange = callback;
					    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					    xhr.send(JSON.stringify(data));
};				

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


HTMLElement.prototype.has_class = function (c) {
	return (this.className.indexOf(c) >= 0);
};


window.onload = function () {
	//setTimeout(id.get_id, 1);
	id.get_id();
	setTimeout(mdp.start, 1);
	setTimeout(email.start, 1);
	setTimeout(del.start, 1);
	
	setTimeout(logout_process.start, 1);

};
