$(document).ready(function(){

    $("button").click(function(){
        var a = $(this).text();
        if (a == "") a = "+/-";
        alert(a);
    });

}); 