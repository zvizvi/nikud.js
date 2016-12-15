$(document).ready(function() {

	var nikudInput = $('.nikud input'),
		kamatzKey = $('#nikud-key-kamatz'),

		patachKey = $('#nikud-key-patach'),
		tzereKey = $('#nikud-key-tzere'),
		segolKey = $('#nikud-key-segol'),
		hiriqKey = $('#nikud-key-hiriq'),
		holamKey = $('#nikud-key-holam'),
		kubutzKey = $('#nikud-key-kubutz'),
		shvaKey = $('#nikud-key-shva'),

		allKey = $('.nikud-key'),
		nikudKey = $('.nikud-key:not(#nikud-key-dagesh)'),
		dageshKey = $('#nikud-key-dagesh');

	checkChars = function() {
		var val = nikudInput.val();

		// lastChar = val.charCodeAt(val.length - 1);
		// secoundLastChar = val.charCodeAt(val.length - 2);

		currentChar = val.charCodeAt(nikudInput[0].selectionEnd - 1);
		secoundCurrentChar = val.charCodeAt(nikudInput[0].selectionEnd - 2);

		if (isNaN(currentChar) || currentChar < 1488 || currentChar > 1514) {
			allKey.addClass('-disabled');
			if (
				currentChar == 1468 && secoundCurrentChar > 1455 && secoundCurrentChar < 1470 ||
				secoundCurrentChar == 1468 && currentChar > 1455 && currentChar < 1470
			) {} else if (currentChar == 1468) { //dagesh
				nikudKey.removeClass('-disabled');
			} else if (currentChar > 1455 && currentChar < 1470) { //nikud
				dageshKey.removeClass('-disabled');
			}
		} else {
			allKey.removeClass('-disabled');
		}
	}

	checkChars();
	nikudInput.keyup(checkChars)
	nikudInput.mouseup(checkChars)

	$('.nikud-key').click(function() {
		if (!$(this).hasClass('-disabled')) {
			var pos = nikudInput[0].selectionEnd;
			nikudInput.val(
				nikudInput.val().slice(0, pos) + $(this).attr('data-nikud') + nikudInput.val().slice(pos)
			)
			nikudInput[0].setSelectionRange(pos+1, pos+1)
			checkChars();
		}
	})
})
