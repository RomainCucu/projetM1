var admin ={};

admin.start = function () {
	document.addEventListener("click", admin.on_click); // pour êvenement quand on clique sur la souris
};
admin.on_click = function (ev) {
	
	var src = ev.target;
	var id = src.id;
	if (src.has_class("delete-account")) { //si on clique sur le bouton Post
		admin.post_btn(id, "set-account-admin", "2");
	}else if(src.has_class("set-account-up")){
		admin.post_btn(id, "set-account-admin","1");
	}else if(src.has_class("set-account-down")){
		admin.post_btn(id,"set-account-admin","0");
	}
		
	
};

admin.post_btn = function (id, acdata, statue) {

	var data = {ac: acdata, id: id, statue: statue}; // objet data à transmettre
	admin.post(data, admin.log_callback);
 
};

admin.log_callback = function () {

	if (this.readyState == 4 && this.status == 200) {
	
		var r = JSON.parse(this.responseText);
		
		if (r.message == "suspend"){
			console.log("suspendu");
			window.location.reload();		
		}else if (r.message == "ko"){
			console.log("erreur suppression");
		}else if (r.message == "up"){
			console.log("compte upgradé");
			window.location.reload();
		}else if (r.message == "down"){
			console.log("compte downgradé");
			window.location.reload();
		}
	}
};

admin.post = function (data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.onreadystatechange = callback;
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
};
	

// +++++++++++++++++++++++++Objet pour changer Delete le compte+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
		//++++++++++++++++++++++++Objet pour changer récuperer la liste d'id++++++++++++++++++++++++++++++++++++++++++++++
		
	var content2 = {};

		content2.get_content2 = function () {
			console.log("on entre ds la fonction get_content2");
			var data = {ac: "get-content2"}; // voir le router
			content2.post(data, content2.log_callback);	 // on a définie la fctn post et la callback		
		};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


content2.log_callback = function () {if (this.readyState == 4 && this.status == 200) {
	var r = JSON.parse(this.responseText);
	longueur = r[0].length;
	document.getElementById("display-number-id").innerHTML=longueur;
	var elm = document.getElementById("display-id");
	console.log(r);
	for (i=0;i<longueur;i++){

			var newLink = document.createElement('p');
		
			var newLinkText = document.createTextNode(r[0][i]);
			newLink.appendChild(newLinkText);
			elm.appendChild(newLink);
		
			var dash = document.createElement('a');

			dash.id=r[0][i];
			dash.className='col-md-1 glyphicon glyphicon-trash text-danger delete-account';
		// on affiche les fleche
			var arrowup = document.createElement('a');
			arrowup.id=r[0][i];
			arrowup.className='col-md-1 glyphicon glyphicon-arrow-up text-success set-account-up '
		
			var arrowdown = document.createElement('a');
			arrowdown.id=r[0][i];
			arrowdown.className='col-md-1 glyphicon glyphicon-arrow-down text-warning set-account-down '
		
		
		
			//esp.appendChild(dashText);
			//dash.appendChild(dashText);
		
			newLink.appendChild(dash);
			newLink.appendChild(arrowup);
			newLink.appendChild(arrowdown);
	
			newLink.style.fontSize="30px";
		//on affiche le statue
			var statue = r[1][i];
			if (statue == "1") statue = "moderator";
			else if (statue == "0") statue = "member";
			else if (statue == "2") statue = "suspendu";
			var newLink1 = document.createElement('span');
			var newLinkText1 = document.createTextNode(" / statue : "+statue);
			newLink1.appendChild(newLinkText1);
			newLink.appendChild(newLink1);
		
		
	}
	
	}};


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



content2.post = function (data, callback) {
	var xhr = new XMLHttpRequest();
   						xhr.open("POST", "/");
					    xhr.onreadystatechange = callback;
					    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					    xhr.send(JSON.stringify(data));
};
		




HTMLElement.prototype.has_class = function (c) {
	return (this.className.indexOf(c) >= 0);
};


window.onload = function () {
	//setTimeout(id.get_id, 1);
	// id.get_id(); // pour afficher l'id ds la barre de menu
 //	setTimeout(del.start, 1); // pour charger la fonction start qui appelle toutes les autres fonctions
 	setTimeout(content2.get_content2, 1);
 	setTimeout(id.get_id, 1);
	setTimeout(logout_process.start, 1);
	admin.start();
};



//window.setInterval(content2.get_content2,2000);
