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
	if(doSlabText) {
		$('#lovemessage').children().last().slabText();
	} else {
		var fs = getFsize();
		$('#lovemessage').children().last().css('font-size', fs+'px');
	}
}

function setTypeFace() {
	var typefaces = [
		'\"Poiret One\", cursive;',
		'\"Ubuntu\", sans-serif;',
		'\"Didact Gothic\", sans-serif;',
		'\"Open Sans Condensed\", sans-serif'
	];
	var tfkey = ($.QueryString["typeface"]) ? $.QueryString["typeface"] : 0;
	var tf = typefaces[tfkey];
	var css = '.singleLine {font-family: '+tf+'}';
	var head = document.getElementsByTagName('head')[0];
	var style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet){
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);
}

function getFsize() {
	var wWidth = $(window).width();
	var fs = wWidth * 0.75 / 15;
	return fs;
}

window.onload = function(){
	setTypeFace();

	var doSlabText = window.doSlabText = $.QueryString["slab"];

	if(doSlabText) {
		$('#lovemessage').find('p').slabText();
	}
	setTimeout(function(){
		addLines(20);
	},100);
	var lastScrollTop = $(document).height()-50;
	$(window).scroll(function(e){
		var st = $(this).scrollTop()+$(window).innerHeight();
		if (st > lastScrollTop){//scrolling down
			addLines(10);
			lastScrollTop = $(document).height()-50;
		}
	});
	$( window ).resize(function() {
		if(!doSlabText) {
			var fs = getFsize();
			$('.singleLine').css('font-size', fs+'px');
		}
	});
};

//query string
(function($) {
	$.QueryString = (function(a) {
		if (a == "") return {};
		var b = {};
		for (var i = 0; i < a.length; ++i)
		{
			var p=a[i].split('=');
			if (p.length != 2) continue;
			b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
		}
		return b;
	})(window.location.search.substr(1).split('&'))
})(jQuery);