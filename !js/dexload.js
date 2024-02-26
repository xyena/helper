spitTxt("https://xyena.github.io/helper/allpkmn.txt");




//https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript/2998822#2998822
function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

async function spitTxt(file) {
	let obj = await fetch(file);
	let txt = await obj.text(); //string; proven by console.log(typeof txt);
	document.getElementById("dexol").innerHTML = "Loading...";
	var completedHTML = "";
	var looping = true;
	for (i=0;looping==true;i++) { //avoid using .split or .match on txt because it creates 1025 pointers in an array.
		var tmp = txt.indexOf("\n");
		if (tmp==-1){tmp=txt.length;looping=false;} //we are at the end if no newlines are detected, or something else is wrong. Prepare to exit.
		completedHTML += "<li><p class=\"dexentry\" id=\"de" + (i+1) + "\"><span class=\"numbah\">" + pad(i+1,4) + ":</span> " + txt.substring(0,tmp) + "</p></li>";
		txt = txt.substring(tmp+1); //trims off what we just read
	}
	document.getElementById("dexol").innerHTML = completedHTML;
}

