
function boopulate() {
	// Map every word in the comment to a new one
	var result = $(this).html().replace(/([a-zA-Z'"0-9]+)/g, function(x) { return getBoop(x); });
	// Stop the comment being processed again
	$(this).addClass("booped");

	return result;
}

function ucFirst(value) {
	if (typeof value !== "string" || value.length == 0) {
		return "";
	}
	
	return value.charAt(0).toUpperCase() + value.slice(1);
}

function getBoop(word) {
	// Could do more in-depth case checking here but not much added value I think
	
	if (typeof word !== "string" || word.length == 0) {
		return "";
	}
	
	// Get a random replacement from the list
	var boop = this.boops[Math.floor(Math.random() * this.boops.length)];
	if (word.toUpperCase() == word) {
		// If the original word was all uppercase, uppercase the replacement
		return boop.toUpperCase();
	}
	if (ucFirst(word) == word) {
		// If the original word started with an uppercase, uppercase the first letter of the replacement
		return ucFirst(boop);
	}
	
	// Otherwise return the replacement as-is
	return boop;
}

this.boops = [
	"boop",
	"beep"
];

setInterval(function() {
	// Get all comments
	var comments = $('.comment-renderer-text-content');
	// Only include comments not previously processed
	var unbooped = comments.not('.booped');
	// Boop them.
	unbooped.html(boopulate);
}, 500);
// Twice a second feels like a good compromise between responsive updating and not being too aggressive

