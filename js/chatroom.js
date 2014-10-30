//=:======pour le bouton Post=:=======:=======:=======:=======:=======:=======:=======:=======:=======:====== (avant on le mettait dans un autre js genre highchart.js
var index = {};

index.start = function () {
	document.addEventListener("keydown", index.on_click);// pour evenment quand on appui sur une touche
	document.addEventListener("click", index.on_click); // pour êvenement quand on clique sur la souris
	window.setInterval(index.nb_caract,500);//pour le nombre de caractère restant
};

index.nb_caract = function (){
		var longueur = document.getElementById("content-message").value.length;
		var rest = 150 - longueur;
		var ala= document.getElementById("mess_info");
		ala.style.color="#3c763d";
		ala.innerHTML="Vous pouver encore écrire "+rest+" caractères";
		
		if (rest<0){
			var allow = rest*(-1); 
			ala.innerHTML="Please stop writing, you are allow to write 150 caract. So the message won't be posted. Please delete "+allow+" caract!";
			ala.style.color="#a94442";
			return;
		}
	
		
};

index.on_click = function (ev) {
	
	var src = ev.target;
	if (src.has_class("post-message")) { //si on clique sur le bouton Post
		index.post_btn();
		 }
		
	if (ev.keyCode == 13 && document.getElementById("content-message").value != ""){ // si on appuie sur enter ET que le message n'est pas vide
		index.post_btn(); 
		
			
	}
	
};


index.post_btn = function () {

	
	var messageContent = (document.getElementById("content-message").value);
	if (messageContent.length>150){
		
		var ala= document.getElementById("mess_info");
		ala.innerHTML="Your message is too long. Please enter a message lower than 150 characters";
		ala.style.color="#a94442";
		
		return;
	}
	else{
	
	var pseudo = document.getElementById("nom_client").innerHTML;
	// var b = new Date().valueOf();
	
	var data = {ac: "post-btn", id: pseudo, content: messageContent, date: dateoftheday() }; // objet data à transmettre
	index.post(data, index.log_callback);
	
	}
     	
     		
     
};



index.log_callback = function () {

	if (this.readyState == 4 && this.status == 200) {
	
		var r = JSON.parse(this.responseText);
		
		if (r.message == "ok"){
		
		console.log("message posté");
		//window.location.reload();
		document.getElementById("content-message").value="";
		}
		else if (r == "ko"){
		console.log("erreur message posté");
		}else{
		console.log("refait ca encore une fois et tu te mange un LOW-KIK");
		
			
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
//=:=======:=======:=======:=====pour récupérer les message====:=======:=======:=======:=======:=======:======
var content2 = {};

content2.get_content = function () {

var data = {ac: "get-content"};
content2.post(data, content2.log_callback);	
		
};
					
				
					
dateoftheday = function() {
	
		
							Today = new Date; // création d'un objet Date appelé "Today"
					
					
					var heure = Today.getHours();
					var minute = Today.getMinutes();
					var seconde = Today.getSeconds();
					var jour = Today.getDate();
					var moi = Today.getMonth()+1;
					var annee = Today.getFullYear();
					
					var DateDuJour = ("posté le " + jour + "/" +moi+"/"+annee+ " à " +heure+ ":" +minute + ":" +seconde);
				
					return DateDuJour;
					
	
}					
					
content2.log_callback = function () {
	if (this.readyState == 4 && this.status == 200) {
	var r = JSON.parse(this.responseText);
	var lengthr = r[0].length;
	/*var a = r[0][lengthr-1];
	var b = r[0][lengthr-2];
	var c = r[1][lengthr-1];
	var d = r[1][lengthr-2];
	*/
	
	
	
	
	// Début de la boucle qui efface et recréé RAPIDEMENT la chat
	if (r != "ko") {

		document.getElementById("message-of-forum").innerHTML = ""; // On efface le contenu avant de recréer le chat
		
					
					
					// pour le titre
		
							var newLine1 = document.createElement('TR'); // pour creer une nouvelle ligne qui contiendra le titre "id" et "messages"
							
						
							// ID
							var newRow01 = document.createElement('TH');// pour creer une nouvelle colonne avec le titre ID
							
							newRow01.style.width="100px";
							newRow01.style.minWidth="100px";
							newRow01.style.maxWidth="100px";
							
				
							var newRowText01 = document.createTextNode('ID'); // qui contient la chaine de caractere 'ID'
							newRow01.appendChild(newRowText01); // On ajoute le titre à TD	
							newLine1.appendChild(newRow01); // On ajoute 'TD' à 'TR'
							
							// Messages
							var newRow02 = document.createElement('TH');// pour creer une nouvelle colonne avec le titre ID
							newRow02.style.minWidth="50px";
							newRow02.style.maxWidth="100px";
						
							
							var newRowText02 = document.createTextNode('Messages'); // qui contient la chaine de caractere 'ID'
							newRow02.appendChild(newRowText02); // On ajoute le titre à TD	
							newLine1.appendChild(newRow02); // On ajoute 'TD' à 'TR'
							
							
								// date
							var newRow03 = document.createElement('TH');// pour creer une nouvelle colonne avec le titre ID
							newRow03.style.minWidth="50px";
							newRow03.style.maxWidth="100px";
							
							
						
							
							var newRowText03 = document.createTextNode('Date'); // qui contient la chaine de caractere 'ID'
							newRow03.appendChild(newRowText03); // On ajoute le titre à TD	
							newLine1.appendChild(newRow03); // On ajoute 'TD' à 'TR'
							
							document.getElementById("message-of-forum").appendChild(newLine1); // On ajoute TR au tableau
							
							
							
						
							
							
							
							
							
		for(i=lengthr-1; i>lengthr-20; i--) {// pour parcourir du plus récent au plus vieux
								
				var newLine = document.createElement('TR'); // pour creer une nouvelle ligne qui contien id + message
				newLine.style.height="30px";	
		
						
					if(i%2==0){
						newLine.style.background="#eee";
						
					}
					
					
					// pour les id
			
					var newRow1 = document.createElement('TD');// pour creer une nouvelle colonne avec l'id
					var newRowText1 = document.createTextNode(r[0][i]);// qui contien lid						
					newRow1.appendChild(newRowText1);// on ajoute le texte à TD
					newLine.appendChild(newRow1);// on ajoute TD à TR
		
					
			
					
			
			
			
			
			
					// pour les message
				
					// pour creer une nouvelle colonne avec le message
					var str = r[1][i];
					
					if (str.length > 75){
						var newRow2 = document.createElement('td');
					
						var ell = str.substring(0,75);
						var ell2 = str.substring(76, 150);
						var newRowText2 = document.createTextNode(ell +"\n" + ell2);// qui contient le message					
						newRow2.appendChild(newRowText2);// on ajoute le message à TD
						
						newLine.appendChild(newRow2);// on ajoute TD à TR
						
					}else{
						var newRow2 = document.createElement('td');
						var newRowText2 = document.createTextNode(str);// qui contient le message					
						newRow2.appendChild(newRowText2);// on ajoute le message à TD
						newLine.appendChild(newRow2);// on ajoute TD à TR
					}
					
					
					// Pour la date
					/* var now = new Date();
					var annee   = now.getFullYear();
					var mois    = now.getMonth() + 1;
					var jour    = now.getDate();
					var heure   = now.getHours();
					var minute  = now.getMinutes();
					var seconde = now.getSeconds();
 
					var DateDuJour = ("posté le "+jour+"/"+mois+"/"+annee+" à "+heure+" : "+minute+" : "+seconde+" :" );
					// Résultat: Nous sommes le 2/11/2012 et il est 19 heure 57 minutes 37 secondes */
					
					
					var newRow3 = document.createElement('TD');// pour creer une nouvelle colonne avec la date
					console.log(r[2][i]);
					var newRowText3 = document.createTextNode((r[2][i]));// qui contien la date	
					newRow3.style.color ="purple";					
					newRow3.appendChild(newRowText3);// on ajoute le texte à TD
					newLine.appendChild(newRow3);// on ajoute TD à TR
					
					
		


					
					//on ajoute TR à table
					
					
					document.getElementById("message-of-forum").appendChild(newLine);
					
				
					
					
					
				
		}
		
			
			
	
			

	//document.getElementById("nom_client").innerHTML=/*"signed as " + */r.id; 

}}};

content2.post = function (data, callback) {
	var xhr = new XMLHttpRequest();
   							 xhr.open("POST", "/");
					    xhr.onreadystatechange = callback;
					    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					    xhr.send(JSON.stringify(data));
};					
//=:=======:=======:=======:=======:=======:pour recup ID=======:=======:=======:=======:=======:=======:======	
var contentID = {};

contentID.get_content = function () {

var data = {ac: "get-id-chat"};
contentID.post(data, contentID.log_callback);	
		
};
					
contentID.log_callback = function () {
	if (this.readyState == 4 && this.status == 200) {
	var r = JSON.parse(this.responseText);
	longueur = r.length;
	document.getElementById("display-number-id").innerHTML=longueur;
	var elm = document.getElementById("display-id");
	elm.innerHTML=" ";
	for (i=0;i<longueur;i++){
		
		var newLink = document.createElement('p');
		var newLinkText = document.createTextNode(r[i]);
		newLink.appendChild(newLinkText);
		elm.appendChild(newLink);
		
	}
	
	}};

contentID.post = function (data, callback) {
	var xhr = new XMLHttpRequest();
   							 xhr.open("POST", "/");
					    xhr.onreadystatechange = callback;
					    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					    xhr.send(JSON.stringify(data));
};

//=:=======:=======:=======:=======:=======:=======:=======:=======:=======:=======:=======:=======:======


HTMLElement.prototype.has_class = function (c) {
	return (this.className.indexOf(c) >= 0);
};

//=:=======:=======:=======:=======:=======:=======:=======:=======:=======:=======:=======:=======:======

window.onload = function () {

	setTimeout(id.get_id, 1);
	setTimeout(logout_process.start, 1);
	setTimeout(index.start, 1);
	content2.get_content();
	contentID.get_content();
};
window.setInterval(content2.get_content,2000);
window.setInterval(contentID.get_content,5000);


HTMLElement.prototype.has_class = function (c) {
	return (this.className.indexOf(c) >= 0);
};
//=:=======:=======:=======:=======:=======:=======:=======:=======:=======:=======:=======:=======:======
