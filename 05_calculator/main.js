// Need to add the percent functionality, currently it is just a modulous operator.
// Also need to make the AC button functionality better, currently it always clears everything.

var ops = [ '+', '-', '*', '/', '×', '÷' ];
var displayState = false;
var previnput;
var prevOp;
var lastOp;
var evalStr;
var displayStr;

function evalExtra(strEv) {
	try {
		if (strEv == '') return '';
		if (ops.includes(strEv.last())) {
			strEv = strEv.substring(0, strEv.length - 1);
		}
		while (strEv.includes('--')) {
			strEv = strEv.replace('--', '+');
		}
		var output = parseFloat(eval(strEv).toFixed(5)); //evalutes to 5 decimal places, but removes trailing zeros
		if (output == 'Infinity' || output == '-Infinity' || isNaN(output)) throw 'bad operation';
		return output;
	} catch (error) {
		return 'Error';
	}
}

function lastOperator() {
	var i = 0;
	lastOp = -1;

	for (c of evalStr) {
		if (ops.includes(c) && !(c == '-' && i == lastOp + 1 && lastOp >= -1)) {
			lastOp = i;
		}
		i++;
	}
}

String.prototype.last = function() {
	return this.charAt(this.length - 1);
}; //used this a couple times, so turned it into a method to make things more readable

$(document).ready(function() {
	displayStr = ''; //string that is displayed
	evalStr = ''; //string which goes into the eval function, which requires operators to be changed to * and /
	var a = ''; //concatination for the displayStr
	var b = ''; //concatination for the evalStr

	$('button').click(function() {
		a = b = $(this).text();

		lastOperator();

		switch (b) {
			case '':
				if (evalStr.charAt(lastOp + 1) == '-') {
					displayStr = displayStr.substring(1);
					evalStr = evalStr.substring(0, lastOp + 1) + evalStr.substring(lastOp + 2);
				} else {
					displayStr = '-' + displayStr;
					evalStr = evalStr.substring(0, lastOp + 1) + '-' + evalStr.substring(lastOp + 1);
				}
				break;
			case '×':
				b = '*';
				break;
			case '÷':
				b = '/';
				break;
			case '.':
				if (evalStr.substring(lastOp).includes('.')) a = b = ''; //stops errors from multiple decimal points
				if (evalStr.last() == '' || ops.includes(evalStr.last())) a = b = '0.';
				break;
			case 'C':
				if (ops.includes(evalStr.last())) evalStr = evalStr.substring(0, evalStr.length - 1);
				lastOperator();
				evalStr = evalStr.substring(0, lastOp + 1);
				displayStr = a = b = '';
				break;
			case 'AC':
				evalStr = displayStr = a = b = '';
				break;
			case '=':
				if (previnput == '=') {
					evalStr = evalStr.concat(prevOp);
				} else {
					prevOp = evalStr.substring(lastOp);
				}
				a = b = evalExtra(evalStr);
				displayStr = evalStr = '';
				break;
			case '%':
				var p = parseFloat(evalStr.substring(lastOp + 1) * 0.01);
				evalStr = evalStr.substring(0, lastOp + 1) + p;
				displayStr = p.toString();
				a = b = '';
				break;
		}

		if (ops.includes(b) && (evalStr == '' || evalStr == '-')) {
			b = '0' + b;
		}

		//this makes it so you can't input two operators in a row
		if (ops.includes(b) && ops.includes(evalStr.last())) {
			evalStr = evalStr.substring(0, evalStr.length - 1);
			// displayStr = displayStr.substring(0, displayStr.length - 1);
		}

		if (ops.includes(a)) {
			a = '';
			displayState = true;
		} else if (!ops.includes(a) && displayState) {
			displayStr = '';
			displayState = false;
		}

		displayStr = displayStr.concat(a);
		evalStr = evalStr.concat(b);

		$('h1').text(displayStr);

		if (displayStr == '') $('h1').text('0'); //just a placeholder for nothing

		console.log(evalStr);

		previnput = $(this).text();

		if (evalStr == '' || previnput == 'C') {
			$('#clear').text('AC');
		} else {
			$('#clear').text('C');
		}

		//making the text size on the caclulator dynamic, so it always stays in the visible text area
		if (displayStr.length > 7) {
			$('h1').css({
				fontSize: 90 / evalStr.length + 'em'
			});
		} else {
			$('h1').css({
				fontSize: '12em'
			});
		}
	});
});
