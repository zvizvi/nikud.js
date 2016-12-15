/*nikud = function(input) {

}
input = document.getElementById('q')
*/
$(document).ready(function() {

	nikudInput = $('.nikud input');

	kamatzKey = $('#nikud-key-kamatz');
	patachKey = $('#nikud-key-patach');
	tzereKey = $('#nikud-key-tzere');
	segolKey = $('#nikud-key-segol');
	hiriqKey = $('#nikud-key-hiriq');
	holamKey = $('#nikud-key-holam');
	kubutzKey = $('#nikud-key-kubutz');
	shvaKey = $('#nikud-key-shva');

	allKey = $('.nikud-key');
	nikudKey = $('.nikud-key:not(#nikud-key-dagesh)');
	dageshKey = $('#nikud-key-dagesh');

	checkChars = function() {
		val = $(nikudInput).val();
		lastChar = val.charCodeAt(val.length - 1);
		secoundLastChar = val.charCodeAt(val.length - 2);

		if (isNaN(lastChar) || lastChar < 1488 || lastChar > 1514) {
			allKey.addClass('-disabled');
			if (
				lastChar == 1468 && secoundLastChar > 1455 && secoundLastChar < 1470 ||
				secoundLastChar == 1468 && lastChar > 1455 && lastChar < 1470
			) {
			} else if (lastChar == 1468) { //dagesh
				nikudKey.removeClass('-disabled');
			} else if (lastChar > 1455 && lastChar < 1470) { //nikud
				dageshKey.removeClass('-disabled');
			}
		} else {
			allKey.removeClass('-disabled');
		}
	}

	checkChars();
	$(nikudInput).keyup(checkChars)

	$('.nikud-key').click(function() {
		if (!$(this).hasClass('-disabled')) {
			$(nikudInput).val(
				$(nikudInput).val() + $(this).attr('data-nikud')
			)
			checkChars();
		}
	})

	// $(document).keyup(function(e){
	// 	console.log(e.keyCode)
	// })
	o = function() {
		console.log($(nikudInput).val().slice(-1).charCodeAt(0))
	}
})
