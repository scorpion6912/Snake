import loadResources from "./game/ResourceLoader";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.font = "30px Arial";
ctx.fillText("Chargement des ressources", 10, 50);

const MAX_X = 44;
const DECAL_X = 11;
const MAX_Y = 33;
const DECAL_Y = 14;
const SQUARX = 17.3;
const SQUARY = 17.5;

let engine;

function drawAndRotate(tile, x, y, width, height, angle=0, flip=false){
    ctx.save();
    ctx.translate(x+width/2,y+height/2);
    ctx.scale(flip&&angle%2==1?1:-1, flip&&angle%2==0?-1:1);
    ctx.rotate(angle*Math.PI/2);
    ctx.drawImage(tile,-width/2,-height/2,width,height);
    ctx.restore();
}

class Game {



    constructor(resourceloader) {
        this.rloader = resourceloader;

        this.dim = this.rloader.level.dimensions;
        this.decal = [0, 0];
        this.snake = Object.values(this.rloader.level.snake);

        this.applepos = Object.values(this.rloader.level.food);

        this.dir = (this.drawSnake()+2)%4;
        this.actualizeAndDrawApple();


        this.lastdir = this.dir;

        //Savoir s'il a mangé
        this.ate = false;


        const me = this;


        setInterval(function(){
            me.actualize();
        },this.rloader.level.delay);

        window.onkeydown = function(event){
            me.keyHandler(event);
        }

    }

    keyHandler(event){
        let newdir=null;;
        switch (event.key){
            case 'ArrowRight':
                newdir = 0;
                event.preventDefault();
                break;
            case 'ArrowLeft':
                newdir = 2;
                event.preventDefault();
                break;
            case 'ArrowUp':
                newdir = 3;
                event.preventDefault();
                break;
            case 'ArrowDown':
                newdir = 1;
                event.preventDefault();
                break;
        }
        if (newdir == null || newdir%2==this.lastdir%2) return;
        this.dir = newdir;
    }

    displayBg() {
        ctx.drawImage(this.rloader.bg, 0, 0, 800, 600);
    }

    displayElement(element, x, y) {
        return;
    }
    setGrid() {
        this.decal = [
            DECAL_X + Math.round((MAX_X - this.dim[0])/ 2) * SQUARX,
            DECAL_Y + Math.round((MAX_Y - this.dim[1])/ 2) * SQUARY
        ];
        
        ctx.beginPath();
        ctx.rect(this.decal[0]-2, this.decal[1]-2, SQUARX * this.dim[0]+4, SQUARY * this.dim[1]+4);
        ctx.stroke();
    }


    actualize(){
        this.actualizeSnake();
        this.drawSnake();
        this.actualizeAndDrawApple();
        this.lastdir = this.dir;
    }

    actualizeAndDrawApple(){
        let apple,head;
        for (let i in this.applepos){
            apple = this.applepos[i];
            head = this.snake[this.snake.length-1];
            if (head[0] == apple[0] && head[1] == apple[1] ){
                this.ate = true;
                this.applepos[i] = null;
            } else ctx.drawImage(this.rloader.apple,this.decal[0]+apple[0]*SQUARX,this.decal[1]+apple[1]*SQUARY, SQUARX, SQUARY);
            
        }
        console.log(this.applepos);
        this.applepos = this.applepos.filter(function(value, index, arr){ 
            return value != null;
        });
    }

    actualizeSnake(){
        const last = this.snake[this.snake.length-1].slice(0);
        last[0] = last[0] + (this.dir==0?1:this.dir==2?-1:0);
        last[1] = last[1] + (this.dir==1?1:this.dir==3?-1:0);
        if (!this.ate) this.snake = this.snake.slice(1);
        this.ate = false;
        this.snake.push(last);
    }

    //Dessine le snake et renvoie la direction de la tête
    drawSnake(){
        let dir, prev, tile, flips;
        let actual = null;
        let next = this.snake[0];

        this.displayBg();
        this.setGrid();

        for (let i=1;i<=this.snake.length;i++){
            dir = [null, null];
            flips = false;
            prev=actual;
            actual = next;
            next = i>=this.snake.length? null : this.snake[i];
            
            tile = this.rloader.normal;

            /*
                0: →
                1: ↑
                2: ←
                3: ↓
            */
            if (next){
                dir[0] = next[0]==actual[0]?(next[1]>actual[1]?3:1):(next[0]>actual[0]?0:2);
            }else tile = this.rloader.head;

            
            if (prev){
                dir[1] = prev[0]==actual[0]?(prev[1]>actual[1]?3:1):(prev[0]>actual[0]?0:2);
            }else tile = this.rloader.tail;
            
            if (prev && next && (dir[0]%2)!=(dir[1]%2)){
                tile = this.rloader.turn;
                //Condition pour inverser droite la tuile de changement de direction
                flips = (4+dir[0]-dir[1])%4 == 1;
                
            }


            
            drawAndRotate(tile, this.decal[0]+actual[0]*SQUARX, this.decal[1]+actual[1]*SQUARY, SQUARX, SQUARY, prev?dir[1]:(dir[0]+2)%4, flips);
        }

        ctx.restore();

        return dir[1];
    }
}


let resourceloader = null;



async function launchGame(n) {
    let loader = await loadResources(n);

    engine = new Game(loader);

}

export default launchGame;