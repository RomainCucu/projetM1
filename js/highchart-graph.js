

// fonction pour remplir le graphe ======================================


var remplissage2 = function (){
	var data = {ac: "get_charts_sg"};
	post2(data, charts_remp2);
};

charts_remp2 = function () {
var d=new Date();

if ( (d.getHours()>=9 && d.getHours()<17)){
	if (this.readyState == 4 && this.status == 200) {
		var r = JSON.parse(this.responseText);
		$(function() {
	
	Highcharts.setOptions({
		global : {
			useUTC : false
		}
	});
	
	// Create the chart
	$('#container10').highcharts('StockChart', {
		chart : {
			events : {
				load : function() {

					// set up the updating of the chart each second
					var series = this.series[0];
					setInterval(function() {
						var x = r[r.length-1][0], // current time
						y = r[r.length-1][1];
						series.addPoint([x, y], true, true);
					}, 10000);
				}
			}
		},
		
		
		rangeSelector: {
			buttons: [{
				count: 60,
				type: 'minute',
				text: '1h'
			}, {
				count: 1,
				type: 'day',
				text: '1d'
			}, {
				type: 'all',
				text: 'All'
			}],
			inputEnabled: false,
			selected: 0
		},
		
		title : {
			text : 'Value of Gold - Intraday'
		},
		 subtitle: {
                text: 'Dynamic graphic',
                
            },
		 yAxis: {
                title: {
                    text: 'Value in $'
                },},
		exporting: {
			enabled: false
		},
		 
		series : [{
			name : 'Gold Value',
			data : (function() {
				// generate an array of random data
				var data = [];

				for( i = 0; i <= (r.length-1); i++) {
					data.push([
						r[i][0],
						r[i][1]
					]);
				}
				return data;
			})()
		}]
	});

});

		}
}else {document.getElementById("container10").innerHTML="MARCHE BOURSIER FERME, IL OUVRIRA A 15H30";
		return;}
};
var post2 = function (data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.onreadystatechange = callback;
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
};


var remplissage = function () {
	var data = {ac: "get_charts"};
	post(data, charts_remp);
};
charts_remp = function () {
	if (this.readyState == 4 && this.status == 200) {
		var r = JSON.parse(this.responseText);
//pour afficher la moyenne mobile -----------------------

		var t = r;
		var tt=new Array();
		
		var add=0;
		
			for(k=0; k<r.length-19; k++){
			
			// boucle i=0,  j=19;
			// puis   i=1,  j=20
			// puis   i=2,  j=21
			// taille du tab-21
				for (i=0+k; i<19+k; i++){
					// 1er 19 tours de boucle
					add += t[i][1];
					
				}
				
				var moy = add/20;
				add = 0;
				
				tt.push([r[i][0],(Math.round(moy*100)/100)]); 
					
			}
		
//pour afficher la moyenne mobile fini --------------------------------------
//pour afficher la tendance ---------------------------------------------------------
			
			var zz = r;
			var a = 0;
			var b = 0;
			var adate = 0;
			var bdate = 0;

			var maximums = new Array();

			for(i=zz.length-15; i<zz.length-2; i++){ // sur les 30 derniers jours
				
					if ((zz[i][1]-zz[i+1][1]) < 0 && (zz[i+1][1]-zz[i+2][1]) > 0){
					
						if (zz[i+1][1]>a){	
							a=zz[i+1][1];
							adate=zz[i+1][0];
							
						}
						
					
					}
				}
				
				
			for(i=zz.length-15; i<zz.length-2; i++){ // sur les 30 derniers jours
				
					if ((zz[i][1]-zz[i+1][1]) < 0 && (zz[i+1][1]-zz[i+2][1]) > 0){
					
					
							
						if (zz[i+1][1]>b && zz[i+1][1]<a){	
							b=zz[i+1][1];
							bdate=zz[i+1][0];
						}
						}
					
					}
			
			//var coeff=(a-b)/(adate-bdate);

			
			if (adate>bdate){
						
						maximums.push([bdate,b]);//on stocke le pik a la bonne date
						maximums.push([adate,a]);//on stocke le pik a la bonne date
						//maximums.push([adate+24*60*60*1000, coeff*((adate-bdate)+24*60*60*1000)+b]);
			}else{
				maximums.push([adate,a]);//on stocke le pik a la bonne date
				maximums.push([bdate,b]);//on stocke le pik a la bonne date
				
			}
			console.log(maximums);
			
//---------------------------------------------------------------------------------------

	

		
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
			legend :{
				enabled:true
			},
			
			series: [{
                name: 'Gold Value per Day',
                data: r
            }, {
                name: 'MMA20',
                data: tt
            }, {
                name: 'tendance',
                data: maximums
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
remplissage2();
setTimeout(id.get_id, 1);
setTimeout(logout_process.start, 1);

};









