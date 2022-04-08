const BOSS = 3;

class Boss {
    constructor(dims) {
        this.max = [dims[0] - 3, dims[1] - 3];
        this.pos = [0, 0];
        this.dir = 0;
    }

    actualize(game) {
        switch (this.dir) {
            case 0:
                this.pos[0] = this.pos[0] + 1;
                if (this.pos[0] == this.max[0]) this.dir = 3;
                break;
            case 1:
                this.pos[1] = this.pos[1] - 1;
                if (this.pos[1] == 0) this.dir = 0;
                break;
            case 2:
                this.pos[0] = this.pos[0] - 1;
                if (this.pos[0] == 0) this.dir = 1;
                break;
            case 3:
                this.pos[1] = this.pos[1] + 1;
                if (this.pos[1] == this.max[1]) this.dir = 2;
                break;
        }
        //On ajoute les 9 cases du bot au tableau zone
        for (let i = 0; i < 9; i++)if (game.zone[this.pos[0] + Math.floor(i / 3)][this.pos[1] + i % 3] == 0) game.zone[this.pos[0] + Math.floor(i / 3)][this.pos[1] + i % 3] = BOSS;

    }
}

export default Boss;