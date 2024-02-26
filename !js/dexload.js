spitTxt("https://xyena.github.io/helper/allpkmn.txt");




//https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript/2998822#2998822
function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

function slapImg(pkmn, frm) {
	var upoint = "<img src=\"https://play.pokemonshowdown.com/sprites/gen5";
	pkmn = pkmn.toLowerCase();
	frm = frm.toLowerCase();
	
	upoint += "/" + pkmn + ".png\" />";
	if (frm="") {return upoint}
	else {
		switch (frm) {
			case "female":
				return upoint + "-f.png\" />";
			default:
				return upoint + "-" + frm + ".png\" />";
		}
	}
}

async function spitTxt(file) {
	let obj = await fetch(file);
	let txt = await obj.text(); //string; proven by console.log(typeof txt);
	document.getElementById("dexol").innerHTML = "Loading...";
	
	//TESTING ONLY
	txt="Bulbasaur\nIvysaur\nVenusaur\nCharmander\nCharmeleon\nCharizard\nSquirtle\nWartortle\nBlastoise";
	
	var completedHTML = "";
	var looping = true;
	var i=0; //since i controls the dex number of the output, we want to be specific about when we increment. Declare outside
	
	while (looping==true) { //avoid using .split or .match on txt because it creates 1025 pointers in an array.
		var position = txt.indexOf("\n");
		if (position==-1){position=txt.length;looping=false;} //we are at the end if no newlines are detected. Prep to exit at the end of this loop
		if (txt.substring(0,2)!="//") { //if not a comment line
			if (txt.substring(0,position).includes(",")==false) {
				completedHTML += "<li><p class=\"dexentry\" id=\"de" + (i+1) + "\">";
				completedHTML += slapImg(txt.substring(0,position),"");
				completedHTML += "<span class=\"numbah\">" + pad(i+1,4) + ":</span> ";
				completedHTML += txt.substring(0,position) + "</p></li>";
				i++;
			}
			else { //it does contain a comma
				var line = txt.substring(0,position).split(","); //split the current line
				var j=0;
				completedHTML += "<li><p class=\"dexentry\" id=\"de" + (i+1) + "\"><span class=\"numbah\">" + pad(i+1,4) + ":</span> " + line[0] + "</p></li>"; //do the first one normally
				
				for (j=1;j<line.length;j++) {
					line[j];
					completedHTML += "<li><p class=\"dexentry\" id=\"de" + (i+1+"&#") + (97+(j-1)) + "\;\"><span class=\"numbah\">" + pad(i+1,4) + "&#" + (97+(j-1)) + "\;:</span> " + line[0] + line[j] + "</p></li>";
				}
				i++;
			}
		}
		txt = txt.substring(position+1); //trims off what we just read
		console.log(i + ": " + position);
	}
	document.getElementById("dexol").innerHTML = completedHTML;
}

