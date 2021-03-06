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
	if(!noSlab) {
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
	if(noSlab) {
		css+='.singleLine {text-align: right;}'; }
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
	var fs = wWidth * 0.75 / 19;
	return fs;
}

function loadMusic() {
	var audiofile = 'sounds/coke-prazdnik_small';
	var canPlayMp3 = (new Audio().canPlayType('audio/mpeg') !== '')?true:false;
	var canPlayOgg = (new Audio().canPlayType('audio/ogg; codecs="vorbis"') !== '')?true:false;
	var music = window.music = new Audio(audiofile+'.'+((canPlayMp3)?'mp3':'ogg'));

	music.load();
	music.play();
}

window.onload = function(){

	$('#spinner').hide();
	$('#lovemessage').show();

	var currentScroll = 0;

	var noSlab= window.noSlab= $.QueryString["noslab"];
	var fs = getFsize();
	setTypeFace();
	loadMusic();

	if(!noSlab) {
		$('#lovemessage').find('p').slabText();
	} else {
		$('#lovemessage').find('p').css('font-size', fs+'px');
	}
	setTimeout(function(){
		addLines(20);
	},100);
	//scroll listener
	var lastScrollTop = $(document).height()-50;
	$(window).scroll(function(e){
		currentScroll = $(this).scrollTop();
		var st = $(this).scrollTop() + $(window).innerHeight();
		if (st > lastScrollTop){//scrolling down
			addLines(10);
			lastScrollTop = $(document).height()-50;
		}
	});
	//resize listener
	$( window ).resize(function() {
		if(noSlab) {
			fs = getFsize();
			$('.singleLine').css('font-size', fs+'px');
		}
	});
	//let's scroll the page slowly
	setInterval(function(){
		$(document).scrollTop(currentScroll);
		currentScroll++;
	},100);
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