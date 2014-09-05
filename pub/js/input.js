function getCheckedRadioButton() {
	var rads = document.getElementsByName('effect');
	for (var i = 0; i < rads.length; i++) {
		if (rads[i].checked) {
			//console.log(rads[i].value)
			return rads[i].value;
		}
	}
	return null; // if nothing is checked, then return null	
}

$(document).ready(function() {
	// Mouse hovers over .square and that div.square gets a color or effect
	// Because .square divs can be added or removed from page, the event handler
	// is delegated to the parent element, div#grid
	$('#grid').delegate('.square', 'mouseenter', getCheckedRadioButton, function(obj) {
		// generate a random rgb color as an object to pass into css() function
		function randomColor() {
			var randomInteger = function(min, max) {
				return Math.floor(min + Math.random() * ((max - min) + 1));
			};
			var	r,g,b;
			var rgb = [r,g,b];
			return { 'background-color': 'rgb(' + rgb.map(function(color) {
				return randomInteger(0, 255);
			}).toString() + ')'};
		}
		switch(obj.data()) {
			case 'black':
				$(this).css('opacity', 1);
				$(this).css('background-color', 'black');
				break;
			case 'randomColor':
				$(this).css('opacity', 1);
				$(this).css(randomColor());
				break;
			case 'trail':	
				// lifted from Arturo Coronel (gray background, black squares on hover). 
				// though my implementation is not perfect. the 'mouseleave' rule leaves opacity lingering at 0.1
				$(this).css({'background-color': 'black', 'opacity': 1});
				$(this).mouseleave(function() {
					$(this).fadeTo(800, 0.1);
				});
				break;
			case 'gradient':
				$(this).css('background-color', 'black');
				var currentOpacity = parseFloat($(this).css('opacity'));
				if (currentOpacity < 1.0) { 
					$(this).css('opacity', currentOpacity += 0.1); 
				}
				break;
			default:
				console.log('not sure how this happened');
				break;
		}
	});
	
	// selecting a new color(s) method clears board of all inline styles and any lingering event handlers
	$('#effects input').on('click', function() {
		$('.square').off(); 
		$('.square').removeAttr('style');
	});

	// press the clear button to clear the board
	$('#clear').on('click', function() {
		if (confirm('are you sure you want to clear the board?')) {
			$('.square').removeAttr('style');
		}
	});

	// press the regenerate button to regenerate a new grid
	$('#regenerate').on('click', function () {
		var size = prompt('how many squares per side would you like?\nPick between 1 & 64.');
		// can reliably generate a grid up to 300, but the visual effects are negligible past 64.
		while (size < 1 || size >= 65) {
			var badInput = size;
			size = prompt('You picked: ' + badInput + '.\nPick between 1 & 64.\nHow many squares per side would you like? ');
		}
		// remove all rows
		$('.row').remove();
		// from div.row's parent, call makeRow to generate new rows
		$('#grid').html(makeRow(size));
	});
});
