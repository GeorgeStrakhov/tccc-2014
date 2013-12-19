function addLines(n) {
	var lines = createNewLines(n);
	$.each(lines, function(){
		addLine(this);
	});
}

function createNewLines(n) {
	var lines = [];
	for (var i = 0; i < n; i++) {
		lines.push(generateLine());
	}
	return lines;
}

function generateLine() {
	return "что говорить когда нечего говорить";
}

function addLine(line) {
	line = String(line);
	var HTMLstr = '<p class="singleLine">'+line+'</p>';
	$('#lovemessage').append(HTMLstr);
	$('#lovemessage').children().last().slabText();
}


$(document).ready(function(){
	console.log('Blast happiness!');
	addLines(10);
	var lastScrollTop = $(document).height()-50;
	$(window).scroll(function(e){
		var st = $(this).scrollTop()+$(window).innerHeight();
		if (st > lastScrollTop){//scrolling down
			addLines(10);
			lastScrollTop = $(document).height()-50;
		}
	});
});