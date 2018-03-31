window.app = {};

window.app.code = function (s) {
    return s.replace(/[a-zA-Z]/g, function (c) {
        return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
};

window.app.onkeypress = function (e) {
	var letter = window.app.code(e.key);

	if (letter === " ") {
		window.app.typeclickSound.play();
		return;
	}

	var span = $("span.hidden:contains(" + letter + "):first");
	if (!span.length) {
		window.app.thumpSound.play();
		return;
	}
	
	window.app.typeclickSound.play();

	span.removeClass("hidden");
	span.text(e.key);

	var hidden = $("span.hidden:first");
	if (!hidden.length) {
		window.setTimeout(window.app.showNext, 1000);
	}
};

window.app.showNext = function () {
	window.app.returnSound.play();
};

window.app.markup = function () {
	$("p").each(function () {
	    var p = $(this), 
	    	text = p.text(),
	    	spanned = "",
	    	i,
	    	c;

	    for (i = 0; i < text.length; i++) {
	    	c = text[i];
	    	if (c !== " ") {
	    		spanned = spanned + '<span class="hidden">' + c + "</span>";
	    	} else {
	    		spanned = spanned + '<span>' + c + "</span>";
	    	}
	    }

	    p.html(spanned);
	    p.removeClass('hidden');
	});
};

window.app.lastInput = 0;
window.app.timeoutMillis = 5000;

window.onload = function () {
	window.app.markup();

	window.app.typeclickSound = new Audio("typeclick.wav");
	window.app.thumpSound = new Audio("thump.wav");
	window.app.returnSound = new Audio("return.wav");

	window.onkeypress = window.app.onkeypress;
};
