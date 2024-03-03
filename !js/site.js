
// example just in case something happens:
// gamechoice1=gSapp; OTname1=saphere; OTid1=23456; gamenotes1=eye; gamechoice2=gHeGo; OTname2=higgs; OTid2=33333; gamenotes2=merp; gamechoice3=gHome; OTname3=HOME; OTid3=777777; gamenotes3=home is for losers

//Declare functions

//Read existing cookies on /game/index.html
async function toomanycooks() {
	let fortune = await document.cookie;
	if (document.getElementsByClassName("pgGame").length==0) //Returns 0 if pgGame is not on the page
		return;
	console.log(fortune);
	
	var looping=true;
	var i=1;
	var completedHTML = "";
	while (looping==true) {
		var sark = fortune.indexOf("gamechoice"+i); //0 if found
		if (sark!=-1) { //if we find the current iteration (ex., "gamechoice2") within the string version of the cookie, anywhere
			
			var temp = fortune.substring(sark+11+(i+"").length,fortune.indexOf(";")); //ex., "gSapp". if we did indexOf("=") then it would catch = in user input. i+"" = i cast as string so we can get length.
			
			completedHTML += "<ul class=\"ulGame "+temp+"\">"; //add a new game container. ex., <ul class="ulGame gSapp">
			
			completedHTML += "<li class=\"liGame\">" + gameMatch(temp) + "</li>";
			fortune = fortune.substring(fortune.indexOf(";")+2,fortune.length); //advance through one space and one semicolon
			
			completedHTML += "<li class=\"liOT\">" + "Trainer: " + fortune.substring(7+(i+"").length,fortune.indexOf(";")) + "</li>";
			fortune = fortune.substring(fortune.indexOf(";")+2,fortune.length);
			
			completedHTML += "<li class=\"liID\">" + "ID: " + fortune.substring(5+(i+"").length,fortune.indexOf(";")) + "</li>";
			fortune = fortune.substring(fortune.indexOf(";")+2,fortune.length);
			
			//we don't need to check if Notes contains anything, it will proceed correctly
			
			if (fortune.indexOf(";")==-1) { //we are at the end of the cookie itself, so we read up to length
				completedHTML += "<li class=\"liNotes\">" + "Notes: " + fortune.substring(10+(i+"").length,fortune.length) + "</li>";
			}
			else { //but if there's more to go, keep reading up to next semicolon, and chop
				completedHTML += "<li class=\"liNotes\">" + "Notes: " + fortune.substring(10+(i+"").length,fortune.indexOf(";")) + "</li>";
				fortune = fortune.substring(fortune.indexOf(";")+2,fortune.length);
			}
			
			completedHTML += "</ul>";
			i++;
		}
		else { //no iterations left
			looping=false;
		}
	}
	document.getElementById("gamelist").innerHTML = completedHTML;
}

//Add game
function gamePopup() {
	//first execution will always be from a "" state, no way around this
	if (document.getElementById("popup").style.display=="block")
		document.getElementById("popup").style.display="none";
	else
		document.getElementById("popup").style.display="block";
	return;
}
function storeGame() {
	if (document.getElementById("OTname").value.includes(";")==true) {
		alert("OT Name cannot contain a semicolon.");
		return;
	}
	if (document.getElementById("OTid").value.includes("a")==true) { //do this with regex later
		alert("ID must contain only numbers.");
		return;
	}
	if (document.getElementById("gamenotes").value.includes(";")==true) {
		alert("Game Notes cannot contain a semicolon.");
		return;
	}
	var looping=true;
	var i=1;
	while (looping==true) {
		if (document.cookie.indexOf("gamechoice"+i)!=-1) { //if we find the search term
			i++;
		}
		else { //we can't find it; i equals what we need for this iteration
			looping=false;
		}
	}
	//semicolons are interpreted literally. This has to be separate lines
	document.cookie="gamechoice"+i+"="+document.getElementById("gamechoice").value+";";
	document.cookie="OTname"+i+"="+document.getElementById("OTname").value+";";
	document.cookie="OTid"+i+"="+document.getElementById("OTid").value+";";
	document.cookie="gamenotes"+i+"="+document.getElementById("gamenotes").value;
}
function sanitize(string) { //https://stackoverflow.com/questions/2794137/sanitizing-user-input-before-adding-it-to-the-dom-in-javascript
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match)=>(map[match])); //arrow function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
}
function gameMatch(string) {
	//This should only be called from inside /game/index.html to reference #popup.
	//Example string = gSapp
	//console.log(document.getElementById("gamechoice").options[2].text);     = "2. Sapphire"
	//console.log(document.getElementById("gamechoice").options[2].getAttribute("value"));       = "gSapp"
	var j = document.getElementById("gamechoice").options.length;
	for (i=0;i<j;i++) {
		if (string==document.getElementById("gamechoice").options[i].getAttribute("value")) {
			return document.getElementById("gamechoice").options[i].text.substring(document.getElementById("gamechoice").options[2].text.indexOf(". ")+2,document.getElementById("gamechoice").options[i].text.length); //Sapphire
		}
	}
	console.log("Outside loop, didn't find :(");
}





toomanycooks();


//Footer
document.getElementById("ftr").innerHTML="Pokémon and All Respective Names are Trademark &amp; &copy; of Nintendo 1996&ndash;";
document.getElementById("ftr").innerHTML+=new Date().getFullYear(); //:^)
	