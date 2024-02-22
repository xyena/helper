spitTxt("https://xyena.github.io/helper/allpkmn.txt");

async function spitTxt(file) {
	let obj = await fetch(file);
	let txt = await obj.text(); //string; proven by console.log(typeof txt);
	var looping = true;
	var i=0;
	for (i=0;looping==true;i++) { //TODO: don't use .split or .match on txt because it creates 1025 pointers in an array. Find a better way to do this?
		var tmp = txt.indexOf("\n");
		if (tmp==-1){tmp=txt.length;looping=false;} //we are at the end if no newlines are detected, or something else is wrong. Prepare to exit.
		document.getElementById("dexol").innerHTML += "<li><p class=\"dexentry\" id=\"de" + (i+1) + "\">" + txt.substring(0,tmp) + "</p></li>";
		txt = txt.substring(tmp+1); //trims off what we just read
	}
}