import launchGame from "./game.js";

function launchGameNumber(n) {
    document.getElementById("screenswitch").checked = true;
    launchGame(n);
    console.log("coucou");
}
document.getElementById("level1").onclick = function () {
    launchGameNumber(1);
}

document.getElementById("level2").onclick = function () {
    launchGameNumber(2);
}


document.getElementById("level3").onclick = function () {
    launchGameNumber(3);
}