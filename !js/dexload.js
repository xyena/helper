spitTxt("https://xyena.github.io/helper/allpkmn.txt");




//https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript/2998822#2998822
function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

function slapImg() {
	document.getElementById("dexol").innerHTML
}

async function spitTxt(file) {
	let obj = await fetch(file);
	let txt = await obj.text(); //string; proven by console.log(typeof txt);
	document.getElementById("dexol").innerHTML = "Loading...";
	
	//TESTING ONLY
	txt="Bulbasaur\nIvysaur\nVenusaur\nIron Valiant\nDudunsparce,Threesegment\nMaushold,Four\nCharizard";
	
	var completedHTML = "";
	var looping = true;
	var i=0; //since i controls the dex number of the output, we want to be specific about when we increment. Declare outside
	
	while (looping==true) { //avoid using .split or .match on txt because it creates 1025 pointers in an array.
		var position = txt.indexOf("\n");
		if (position==-1){position=txt.length;looping=false;} //we are at the end if no newlines are detected. Prep to exit at the end of this loop
		
		var pd = pad(i+1,4);
		
		
		if (txt.substring(0,2)!="//") { //if not a comment line
			var commasep = txt.substring(0,position).split(","); //if there is no comma, length=1 and commasep[0] is just <name> or <name,form> anyway. commasep[1] will be undefined.
			
			completedHTML += "<li class=\"dexentry\" id=\"de" + (i+1) + "\"><p>"; //id="de4" or id="de30". Add letter if a form is present later on
			completedHTML += slapImg(commasep[0],".");
			completedHTML += "<span class=\"numbah\">" + pd + ":</span> " + commasep[0] + "</p></li>"; //do the first one normally
			
			
			if (commasep.length!=1) { //it does contain a comma; so loop until all forms after the comma are covered			
				for (j=1;j<commasep.length;j++) {
					commasep[j];
					completedHTML += "<li class=\"dexentry\" id=\"de" + (i+1+"&#") + (97+(j-1)) + "\;\"><p>";
					completedHTML += slapImg(commasep[0],commasep[j]);
					completedHTML += "<span class=\"numbah\">" + pd + "&#" + (97+(j-1)) + "\;:</span> " + commasep[0] + commasep[j] + "</p></li>";
				}
			}
			i++;
		}
		txt = txt.substring(position+1); //trims off what we just read
	}
	document.getElementById("dexol").innerHTML = completedHTML;
}

//Currently not used, loading disabled in current build.
function slapImgShwdn(pkmn, frm) {
	
	var upoint = "<img src=\"https://play.pokemonshowdown.com/sprites/gen5";
	pkmn = pkmn.toLowerCase();
	frm = frm.toLowerCase();
	
	if (pkmn.includes(" ")==false) {
		upoint += "/" + pkmn;
	}
	
	if (frm==".") { //no form caught
		if (pkmn.includes(" ")==true) { //paradox
			return upoint + "/" + pkmn.substring(0,pkmn.indexOf(" ")) + pkmn.substring(pkmn.indexOf(" ")+1) + ".png\" />";
		}
		else { //not paradox
			return upoint + ".png\" />";
		}
	}
	else {
		if (frm.includes("breed")==true) { //"blaze breed"
			return upoint + "-paldea" + frm.substring(0,frm.indexOf("breed")-1) + ".png\" />"; //"blaze"
		}
		if (frm.includes("striped")==true) { //"blue-striped"
			return upoint + frm.substring(0,frm.indexOf("-")) + frm.substring(frm.indexOf("-")+1) + ".png\" />"; //"bluestriped"
		}
		switch (frm) {
			case "female": //bascF, meowF, deedeeF
				return upoint + "-f.png\" />";
			case "alolan":
				return upoint + "-alola.png\" />";
			case "galarian":
				return upoint + "-galar.png\" />";
			case "hisuian":
				return upoint + "-hisui.png\" />";
			case "paldean":
				return upoint + "-paldea.png\" />";
			case "10%": //zyg
				return upoint + "-10.png\" />";
			default:
				return upoint + "-" + frm + ".png\" />";
			//worma, pumpk, gourge, midnight, dusk, lowkey, rapid, bloodmoon, maus, squawk, dudun, droopy, stretchy
			//had to rename lowkey, rapid, maus, dudun
		}
	}
}
