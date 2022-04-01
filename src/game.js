import loadResources from "./game/ResourceLoader";

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
ctx.font = "30px Arial";
ctx.fillText("Chargement des ressources", 10, 50);



async function launchGame(n) {
    let x = await loadResources(n);
    console.log(x)
}

export default launchGame;