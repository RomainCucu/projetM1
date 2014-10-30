var logout_process = {};

logout_process.start = function () {
	document.addEventListener("click", logout_process.on_click);
	//document.addEventListener("keydown", index.on_click);
};

logout_process.on_click = function (ev) {
	var src = ev.target;
	if (src.has_class("p-logout") || ev.keyCode == 13) {
	console.log("======");
		logout_process.deleteCookie();
	}
};
// =++++===++++++====+++++
var id = {};

id.get_id = function () {

var data = {ac: "get-id"};
id.post(data, id.log_callback);			
};
						
id.log_callback = function () {
	if (this.readyState == 4 && this.status == 200) {
	var r = JSON.parse(this.responseText);
	//console.log(r.message);
	if ( r.message == "nocookie"){
		window.location = "../index.html";
	}
	else if (r.id) {
	//console.log(r);
	document.getElementById("nom_client").innerHTML=/*"signed as " + */r.id; 
		if(r.accountstatue == "1"){
			var newLinkText = document.createTextNode("admin");
			document.getElementById('add-admin').href="admin.html";
			document.getElementById('add-admin').appendChild(newLinkText);
		}else return;

}}};

id.post = function (data, callback) {
	var xhr = new XMLHttpRequest();
   							 xhr.open("POST", "/");
					    xhr.onreadystatechange = callback;
					    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					    xhr.send(JSON.stringify(data));
};					




// ============pour logout ==============

logout_process.deleteCookie = function () {
	var data = {ac: "delete-cookie"};
	console.log("======");
	logout_process.post(data, logout_process.log_callback);
	
};
logout_process.post = function (data, callback) {
	var xhr = new XMLHttpRequest();
   							 xhr.open("POST", "/");
					    xhr.onreadystatechange = callback;
					    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					    xhr.send(JSON.stringify(data));
};	
logout_process.log_callback = function () {
	if (this.readyState == 4 && this.status == 200) {
	var r = JSON.parse(this.responseText);
	if (r.message == "logout"){
		window.location = "../index.html";
	
	}
	else console.log("bonjou");
	

}};				
// ========================

HTMLElement.prototype.has_class = function (c) {
	return (this.className.indexOf(c) >= 0);
};


// ------- pour affichage de lheure

var getHeure= function(){
	var date = new Date();
	date = date + "";

	date=date.split(" ");
	document.getElementById("p-heure").innerHTML = date[0] + " " + date[1] + " " + date[2] + " " + date[3] + " " + date[4];
};
setInterval(getHeure,1000);