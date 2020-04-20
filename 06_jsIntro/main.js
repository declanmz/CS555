// var text = document.getElementById("clickerDicker").innerHTML;

// function clicker() {
//     if (text == "Click It") {
//         text = "Clicked";
//     } else {
//         text = "Click It";
//     }
// }


$(document).ready(function(){
    $("#list").hide();

    $("#clickerDicker").click(function(){
        if ($(this).text() == "Click It"){
            $(this).text("HI");
        } else {
            $(this).text("Click It");
        }
    });

    $("#list").hover(function(){
        
    });
});