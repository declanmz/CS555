var flip = true;

function clicker() {
    if (flip) {
        document.getElementById("clickerDicker").innerHTML = "Clicked";
        flip = false;
    } else {
        document.getElementById("clickerDicker").innerHTML = "Click It";
        flip = true;
    }
}