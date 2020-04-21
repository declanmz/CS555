
// Need to add the percent functionality, currently it is just a modulous operator. 
// Also need to make the AC button functionality better, currently it always clears everything.

var ops = ["+", "*", "/", "%"];
var preOps = ops.concat("-");

function evalExtra(strEv){
    try {
        if (ops.includes(last(strEv)) || last(strEv) == "-"){
            strEv = strEv.substring(0, strEv.length-1);
        }
        return parseFloat(eval(strEv).toFixed(5)); //evalutes to 5 decimal places, but removes trailing zeros
    } catch (error) {
        return "Error";
    }
}

function last(strEv){ return strEv.charAt(strEv.length-1);} //found I needed to use this a few times, it is more readable as a function

$(document).ready(function(){

    var displayStr = ""; //string that is displayed
    var evalStr = ""; //string which goes into the eval function, which requires operators to be changed to * and /
    var a = ""; //concatination for the displayStr
    var b = ""; //concatination for the evalStr

    $("button").click(function(){

        a = b = $(this).text();

        switch (b){
            case "":
                if (evalStr.charAt(0) == "-"){
                    evalStr = evalStr.substring(1);
                    displayStr = displayStr.substring(1);
                } else {
                    evalStr = "-" + evalStr;
                    displayStr = "-" + displayStr;
                }
                break;
            case "×":
                b = "*";
                break;
            case "÷":
                b = "/";
                break;
            case ".":
                if (last(evalStr) == ".") a = b = ""; //stops errors from multiple decimal points
                if (last(evalStr) == "" || preOps.includes(last(evalStr))){
                    evalStr = evalStr.concat("0");
                    displayStr = displayStr.concat("0");
                }
                break;
            case "AC":
                displayStr = evalStr = a = b = "";
                break;
            case "=":
                a = b = evalExtra(evalStr);
                displayStr = evalStr = "";
                break;
        }

        if(ops.includes(b) && (evalStr == "" || evalStr == "-")){
            a = b = "";
        }

        //this makes it so you can't input two operators in a row, except for the negative sign, which can be put after any operator except itself
        if (ops.includes(b) && preOps.includes(last(evalStr)) || b == "-" && last(evalStr) == "-"){
            var subtactor = 1;
            if (last(evalStr) == "-" && ops.includes(evalStr.charAt(evalStr.length-2))) subtactor = 2;
            
            evalStr = evalStr.substring(0, evalStr.length-subtactor);
            displayStr = displayStr.substring(0, displayStr.length-subtactor);
        }
        

        displayStr = displayStr.concat(a);
        evalStr = evalStr.concat(b);

        $("h1").text(displayStr);

        if (displayStr == "") $("h1").text("0"); //just a placeholder for nothing

        console.log(evalStr);

        //making the text size on the caclulator dynamic, so it always stays in the visible text area
        if (displayStr.length > 7){
            $("h1").css({
                fontSize : 90/evalStr.length + "em"
            });
        } else {
            $("h1").css({
                fontSize : "12em"
            });
        }
        
    });

}); 