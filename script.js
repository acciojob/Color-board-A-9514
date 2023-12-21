//your JS code here. If required.
isMouseDown = false
function range (start, end, step) {
    results = [];
    if (!end) {
        end = start;
        start = 0;
    }
    if (!step || step === 0) {
        step = 1;
    }
    for (i = start; i < end; i+=step) {
        results.push(i);
        }
    return results;
};
function createCanvas() {
	board = document.getElementById("board")
	for (var i in range(75)) {
		tr = board.insertRow(0)
		for (var i in range(94)) {
			td = tr.insertCell(0)
			td.className="drawn"
		}
	}
	prepare()
}
function getSize() {
	var x=document.getElementById("sizepick")[0].value.toString()
	document.getElementById("sizenum").innerHTML=x
	return x + "px"
}
function changeSize() {
	var size = getSize()
	var classes = document.getElementsByClassName("drawn")
	for (var i=0;i<classes.length;i++) {
		classes[i].style.width=size
		classes[i].style.height=size
	}
}
function getColor() {
	var color = document.getElementById("colorpick")
	var hex = color[0].value.toUpperCase()		
	return hex
}
function changeDiv(e) {
	var eraser = document.getElementById("optionpick")[0].checked
	var full_b = document.getElementById("optionpick")[1].checked
	var getcol = document.getElementById("optionpick")[2].checked
	if (getcol && e.target.className === "drawn" && isMouseDown) {
		var color = e.target.style.backgroundColor
		if (color === "") color = "rgb(255, 255, 255)"
		var color = color.slice(color.indexOf("("), color.indexOf(")"))
		var color_params = color.split(/,/)
		color_params[0] = parseInt(color_params[0].slice(1))
		color_params[1] = parseInt(color_params[1])
		color_params[2] = parseInt(color_params[2].slice(1))
		var colors = color_params
		document.getElementById("colorpick")[0].value = rgbToHex(colors[0], colors[1], colors[2])
	}
	if ((isMouseDown) || (isMouseDown && e.target.className == 'drawn')) {
		if (eraser || full_b) {
			var classes = document.getElementsByClassName("drawn")
			for (i=0 ; i < classes.length ; i++) {
				if (eraser && full_b) classes[i].style.backgroundColor="white"
				else if (eraser) e.target.style.backgroundColor="white"
				else if (full_b) {
					classes[i].style.backgroundColor=getColor()
				}
			}
		}
	    else {
	    	if (e.target.className === 'drawn') {
	    	e.target.style.backgroundColor=getColor()
	    	}
	    }
	}
}
function onMouseDown(e) {
	isMouseDown = true;
	changeDiv(e)
}
function onMouseUp() {
	isMouseDown = false;
}
function prepare() {
	var board = document.getElementById('board');
	board.addEventListener('mouseover', changeDiv);
	board.addEventListener('mouseup', onMouseUp);
	board.addEventListener('mousedown', onMouseDown);
}
function rgbToHex(r, g, b) {
    function componentToHex(c) {
	    var hex = c.toString(16);
	    return hex.length == 1 ? "0" + hex : hex;
	}
    str = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
    return str.toUpperCase()
}