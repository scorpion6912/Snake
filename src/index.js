import launchGame from "./game.js";


function displayScore(score) {
    document.getElementById("screenswitch").checked = false;
    document.getElementById("score").innerHTML = "Score : " + score.toString();

}

function launchGameNumber(n) {
    document.getElementById("screenswitch").checked = true;
    launchGame(n).then(displayScore);
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


document.getElementById("level4").onclick = function () {
    launchGameNumber(4);
}


document.getElementById("level5").onclick = function () {
    launchGameNumber(5);
}


document.getElementById("level6").onclick = function () {
    launchGameNumber(6);
}