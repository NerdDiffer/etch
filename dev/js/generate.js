function wrapGrid(size, fn) {
	var html = '';
	html += "<div id='etch'><div id='grid'>";
	html += fn(size);
	html += "</div></div>"; 
	return html;
}

function makeRow(size) {
	var html = '';
	for (var r = 1; r <= size; r++) {
		html += "<div class='row'>";
		for (var c = 1; c <= size; c++) {
			html += "<div class='square'></div>";
		}
		html += "</div>"; 
	}
	return html;
}
