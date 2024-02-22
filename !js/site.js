	
	var upoint = "https://play.pokemonshowdown.com/sprites/"
	var spritetype =	["gen5", //or xyani, or gen5-shiny, or xyani-shiny
						".png"]; //change to .gif for xyani and xyani-shiny
	//we want to load sprites by default, not models. that increases load times
	
	
	document.getElementById("ftr").innerHTML="Pokémon and All Respective Names are Trademark &amp; &copy; of Nintendo 1996&ndash;";
	document.getElementById("ftr").innerHTML+=new Date().getFullYear();
	
	spitTxt('./allpkmn.txt');
	
	
	
	
	
	/* This errors out with "Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource"; don't do it.
		console.log(httpGet("https://archives.bulbagarden.net/wiki/File:150Mewtwo_RG.png"));

	function httpGet(theUrl) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
		xmlHttp.send( null );
		return xmlHttp.responseText;
	}
	*/
	
	async function spitTxt(file) {
		let obj = await fetch(file);
		let txt = await obj.text();
		console.log(txt);
	}
	
	function doimages() {
		var UL = document.getElementById("pokes").getElementsByClassName("pkmn");
		//an array that contains bulbasaur, bulbasaurshiny, ivysaur, etc...
		for (i=0;i<UL.length;i++) {
			document.getElementById(UL[i].id).innerHTML = ""; //clear all text for everything in that <li>

			
			var j = UL[i].id.indexOf("shinY");
			if (j==-1) { //if not shiny
				j = upoint + spritetype[0] + "/"
				+ UL[i].id + spritetype[1];
			}else { //if shiny, substring out the shiny in the id
				j = upoint + spritetype[0] + "-shiny/"
				+ UL[i].id.substring(0,j) + spritetype[1];
			}
			var k = "<img class='pk' src='" + j + "' />";			
			document.getElementById(UL[i].id).innerHTML += (k);
			
			//construct ul .balls from class
			var ballchoices = UL[i].className.split(" ");
			var ret = "<ul class='balls'>";
			for (l=1;l<ballchoices.length;l++) { //starting at 1 to skip 'pkmn'
				ret += ("<li><img src='!images/" + ballchoices[l] + ".png'/</li>");
			}
			document.getElementById(UL[i].id).innerHTML += (ret + "</ul>");
		}
	}
	
	function swap() {
		if (spritetype[0]=="gen5") {
			spritetype = ["xyani",".gif"];
		}
		else if (spritetype[0]=="xyani") {
			spritetype = ["gen5",".png"];
		}
		doimages();
	}