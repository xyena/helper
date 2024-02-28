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
	document.cookie="gamechoice="+document.getElementById("gamechoice").value+";"+document.cookie="OTname"+document.getElementById("OTname").value+";"+document.cookie="OTid"+document.getElementById("OTid").value+";"+document.cookie="gamenotes"+document.getElementById("gamenotes").value;
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

//Footer
document.getElementById("ftr").innerHTML="Pokémon and All Respective Names are Trademark &amp; &copy; of Nintendo 1996&ndash;";
document.getElementById("ftr").innerHTML+=new Date().getFullYear(); //:^)
	