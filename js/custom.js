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
	if($('#lovemessage').children().length < 5 || Math.random() > 0.1) {
		return generateNameCombo();
	}
	return allSlogans[Math.floor(Math.random() * allSlogans.length)];
}

function generateNameCombo() {
	var firstName = getRandomName();
	var secondName = getRandomName(firstName);
	var combo = firstName + ' + ' + secondName + ' =';
	return combo.replace(/ /g, '&nbsp;');
}

function getRandomName(notName) {
	var name = allNames[Math.floor(Math.random() * allNames.length)];
	if(notName && name == notName) {
		return getRandomName(notName);
	}
	return name;
}

function addLine(line) {
	line = String(line);
	var HTMLstr = '<p class="singleLine">'+line+'</p>';
	$('#lovemessage').append(HTMLstr);
	$('#lovemessage').children().last().slabText();
}


$(document).ready(function(){
	$('#lovemessage').find('p').slabText();
	addLines(20);
	var lastScrollTop = $(document).height()-50;
	$(window).scroll(function(e){
		var st = $(this).scrollTop()+$(window).innerHeight();
		if (st > lastScrollTop){//scrolling down
			addLines(10);
			lastScrollTop = $(document).height()-50;
		}
	});
});