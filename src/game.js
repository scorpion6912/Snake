import loadResources from "./game/ResourceLoader";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.font = "30px Arial";
ctx.fillText("Chargement des ressources", 10, 50);

const MAX_X = 44;
const DECAL_X = 22;
const MAX_Y = 33;
const DECAL_Y = 27;

let engine;

class Game {
    constructor(resourceloader) {
        this.rloader = resourceloader;

        this.dim = this.rloader.level.dimensions;
        this.decal = [0, 0];
        this.setGrid();
        this.snake = this.rloader.level.snake;

        this.displayBg();
    }

    displayBg() {
        ctx.drawImage(this.rloader.bg, 0, 0, 800, 600);
    }

    displayElement(element, x, y) {
        return;
    }
    setGrid() {
        this.decal = [
            Math.round(DECAL_X + (MAX_X - this.dim[0]) * 35 / 2),
            Math.round(DECAL_Y + (MAX_Y - this.dim[1]) * 35 / 2)
        ];
        ctx.beginPath();
        ctx.rect(this.decal[0], this.decal[1], 35 * this.dim[0], 35 * this.dim[1]);
        ctx.stroke();
    }

}

let resourceloader = null;



async function launchGame(n) {
    let loader = await loadResources(n);

    engine = new Game(loader);

}

export default launchGame;