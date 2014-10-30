//======================================pour affichage de l'or et de la date=========================================================
// on doit recuperer la valeur de la veille, qui correspon a la valeur d'ouverture du jour, on la stockera dans b
var gold2 = {};// valeur de la veill

gold2.get_value = function () {

var data = {ac: "get_charts"};
gold2.post(data, gold2.log_callback);			
};
						
gold2.log_callback = function () {
	if (this.readyState == 4 && this.status == 200) {
		var r = JSON.parse(this.responseText);
			if (r != "ko") {
			r=r.reverse();

			var b= r[0][1]; // valeur du jour
			var elm = document.getElementById("old-value-of-gold");
			elm.innerHTML=b;
			// on recupere le valeur de l'or
	

}}};

gold2.post = function (data, callback) {
	var xhr = new XMLHttpRequest();
   						xhr.open("POST", "/");
					    xhr.onreadystatechange = callback;
					    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					    xhr.send(JSON.stringify(data));
};
var gold = {};
gold.get_value = function () {

var data = {ac: "get_charts_intraday"};
gold.post(data, gold.log_callback);			
};
						
gold.log_callback = function () {
	if (this.readyState == 4 && this.status == 200) {
	var r = JSON.parse(this.responseText);
	if (r != "ko") {
	
	r=r.reverse();
	var n = r[0][1]; // valeur du jour
	n = r[0][1];
	n = r[0][1];
	n = r[0][1];
	n = r[0][1];
	console.log(n);
	var b = parseFloat(document.getElementById("old-value-of-gold").innerHTML);

	// on recupere le valeur de l'or
	
	if (n > b){
	
		document.getElementById("value-of-gold").innerHTML=n;
		document.getElementById("value-of-gold").style.color='#3c763d';
		document.getElementById("symbol-value").classList.add("glyphicon-arrow-up");
		
		document.getElementById("value-of-diff").style.color='#3c763d';
		document.getElementById("symbol-value").style.color='#3c763d';
		/* pour déterminer le pourcentage*/
		/*
		var pourcentage = (n/b-1)*100;
		pourcentage = Math.round(pourcentage*100)/100;
		document.getElementById("value-of-diff").innerHTML="+"+ pourcentage + "%";*/
	}else if(n < b){
		document.getElementById("value-of-gold").innerHTML=n;
		document.getElementById("value-of-gold").style.color='#a94442';
		document.getElementById("symbol-value").classList.add("glyphicon-arrow-down");
		
		document.getElementById("value-of-diff").style.color='#a94442';
		document.getElementById("symbol-value").style.color='#a94442';
		/* pour déterminer le pourcentage*/
		/*
		var pourcentage = -(n/b-1)*100;
		pourcentage = Math.round(pourcentage*100)/100;
		document.getElementById("value-of-diff").innerHTML="-" + pourcentage +"%";*/
	}else if(n = b){
		document.getElementById("value-of-gold").innerHTML=n;
		document.getElementById("value-of-gold").style.color='#31708f';
		document.getElementById("symbol-value").classList.add("glyphicon-resize-vertical");
		document.getElementById("symbol-value").style.color='#31708f';
		document.getElementById("value-of-diff").style.color='#31708f';
		
		document.getElementById("value-of-diff").innerHTML="+0%";
	}
	
	// on recupere la date
	var date = new Date(r[0][0]);
	console.log(date);
	date = date + "";
	date =  date.split(" ");
	console.log((date));
	document.getElementById("value-of-date").innerHTML=date[0] + " " + date[1] + " " + date[2] + " " +date[3] + " at " + date[4];
	
	
	

}}};

gold.post = function (data, callback) {
	var xhr = new XMLHttpRequest();
   						xhr.open("POST", "/");
					    xhr.onreadystatechange = callback;
					    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					    xhr.send(JSON.stringify(data));
};	

//======================================pour les boutons d'achats=========================================================
var index = {};

index.start = function () {
	document.addEventListener("click", index.on_click);
	
};

index.on_click = function (ev) {
	var src = ev.target;
	if (src.has_class("buy-btn")) { //si on clique sur le bouton Buy
		index.buy_btn();
	}
	else if (src.has_class("sell-btn")){ //si on clik sur sell
		index.sell_btn();
	}
	else if (src.has_class("reset-btn")){ //si on clik sur reset
	
		index.reset_btn();
	}
};


index.buy_btn = function () {
	var valueofgold = 	parseFloat(document.getElementById("value-of-gold").innerHTML);
	var buyavailable = parseInt(document.getElementById("buy-btn").value)*valueofgold;
	if (buyavailable>0){
	
		if ( buyavailable <= portemonnaie ){
			var portefeuille = portemonnaie - (parseInt(document.getElementById("buy-btn").value))*valueofgold;//on recupere la valeur au niveau du input que l'on soustrait à la valeur
			var actions = nbaction + parseInt(document.getElementById("buy-btn").value); //on achete des actions 
			portefeuille = portefeuille.toString();
			actions = actions.toString();
			var admin = "admin";
			var data = {ac: "buy-btn", wallet: portefeuille, nbstock: actions}; // objet data à transmettre

			index.post(data, index.log_callback);
		}
		else {
			document.getElementById("buy-btn-text").innerHTML = "Vous n'avez pas assez d'argent";
			return;
		}
	}else{
		document.getElementById("buy-btn-text").innerHTML = "Choisir une somme positive !";
			return;
	}
};



index.sell_btn = function () {
if ((parseInt(document.getElementById("sell-btn").value))>0){
		if(parseInt(document.getElementById("sell-btn").value) <= nbaction){
			var valueofgold = 	parseFloat(document.getElementById("value-of-gold").innerHTML);
			var portefeuille = portemonnaie + (parseInt(document.getElementById("sell-btn").value)*valueofgold);//on recupere la valeur au niveau du input que l'on soustrait à la valeur
			var actions = nbaction - parseInt(document.getElementById("sell-btn").value);
			portefeuille = portefeuille.toString();
			actions = actions.toString();
			var admin = "admin";
			var data = {ac: "buy-btn", wallet: portefeuille, nbstock: actions}; // objet data à transmettre
			// on a bien vérifier que buy.money = " 12 " et que buy.admin = "admin"
			index.post(data, index.log_callback);
		}else{
			document.getElementById("sell-btn-text").innerHTML = "Vous n'avez pas assez d'action";
			return;
		}
}else{
	document.getElementById("sell-btn-text").innerHTML = "Choisir un nombre positif";
	return;
}
	
};

index.reset_btn = function () {
	
	
	var admin = "admin";
	var data = {ac: "reset-btn"}; // objet data à transmettre
	// on a bien vérifier que buy.money = " 12 " et que buy.admin = "admin"
	index.post(data, index.log_callback);
};

index.log_callback = function () {
	if (this.readyState == 4 && this.status == 200) {
		var r = JSON.parse(this.responseText);
		if (r.message == "ok") {
			 document.location.reload()
			
		}else if (r.message == "reset"){
			console.log("you reset your wallet"); 
			document.location.reload()
			
		}else {
			console.log("Login error");
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

//======================pour le graphique=================================================================


var portemonnaie ;
var action ;
var wallet = {};

wallet.get_load = function () {

var admin = "admin";
var data = {ac: "get-money"};
wallet.post(data, wallet.log_callback);			
};
						
						wallet.log_callback = function () {
						if (this.readyState == 4 && this.status == 200) {
							var r = JSON.parse(this.responseText);
							if (r != "ko") {
							var valueofgold = (document.getElementById("value-of-gold").innerHTML);
							valueofgold= parseFloat(valueofgold);
							
							//alert(valueofgold);
							
							
							portemonnaie = parseInt(r.money);
							//alert(valueofgold);
							action = parseInt(r.nbstock)*valueofgold;
							nbaction = parseInt(r.nbstock);
							// on recupere le nombre d'action que l'on a
							document.getElementById("value-of-stock").innerHTML = nbaction;
							document.getElementById("plus-moins-value").innerHTML = Math.round((portemonnaie + nbaction*valueofgold - 10000)*100)/100;
							
						
							if ((portemonnaie + nbaction*valueofgold - 10000)>0){
								document.getElementById("plus-moins-value").className="text-success";
							}else if((portemonnaie + nbaction*valueofgold - 10000)<0){
								document.getElementById("plus-moins-value").className="text-danger";
							}else {
								document.getElementById("plus-moins-value").className="text-info";
							}
							
							
							//you can buy
							document.getElementById("how-many-available-buy").innerHTML= parseInt(portemonnaie/valueofgold);
							document.getElementById("how-many-available-sell").innerHTML= parseInt(nbaction);
							
							
							
							$(function () {
        $('#container20').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Your money'
            },
            subtitle: {
                text: 'Starter edition'
            },
            xAxis: {
                categories: [
                    'valeur'
                ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'valeur en $'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} $</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'action',
                data: [action]
    
            }, {
                name: 'portefeuille',
                data: [portemonnaie]
    
            }]
        });
    });
    
							
						} else {
							console.log("Login error");
						}
						}
						};

						wallet.post = function (data, callback) {
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
setTimeout(gold2.get_value,0);
setTimeout(gold.get_value, 0);
remplissage();
remplissage2();

setTimeout(wallet.get_load, 2000);
setTimeout(index.start, 1);
setTimeout(id.get_id, 1);
setTimeout(logout_process.start, 1);
};
						
