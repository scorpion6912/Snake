
class ResourceLoader {

    toLoad = 6;

    /*
     * lvl - le chemin du JSON à charger
     * whenfinished - la fonction appelée quand le chargement est fini
     */
    constructor(lvl, whenfinished) {
        this.toLoad = 8;
        this.bg = null;
        this.normal = null;
        this.turn = null;
        this.head = null;
        this.tail = null;
        this.apple = null;
        this.level = null;
        this.wall = null

        this.resolved = function () { whenfinished(this) };

        this.loadImg("./res/bg.jpg").then(img => this.bg = img);
        this.loadImg("./res/normal.png").then(img => this.normal = img);
        this.loadImg("./res/wall.png").then(img => this.wall = img);
        this.loadImg("./res/apple.png").then(img => this.apple = img);
        this.loadImg("./res/turn.png").then(img => this.turn = img);
        this.loadImg("./res/head.png").then(img => this.head = img);
        this.loadImg("./res/tail.png").then(img => this.tail = img);
        this.loadJSON(lvl).then(data => this.level = data).catch(console.log);
    }

    loadImg(url) {
        let me = this;
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.src = url;
            img.onload = function () {
                me.toLoad -= 1;
                resolve(img)
                if (me.toLoad <= 0) me.resolved();
            };
            img.onerror = reject;
        });

    }

    loadJSON(url) {
        let me = this;
        return new Promise(function (resolve, reject) {
            let req = new XMLHttpRequest();
            req.open("GET", url);
            req.onerror = reject
            req.onload = function () {
                if (req.status === 200) {
                    me.toLoad -= 1;
                    resolve(JSON.parse(req.responseText));
                    if (me.toLoad <= 0) me.resolved();
                } else {
                    reject("Erreur " + req.status + " sur " + url);
                }
            };
            req.send();
        });
    }

}


function loadResources(nb) {
    return new Promise(function (resolve, _reject) {
        new ResourceLoader(`./levels/level${nb.toString()}.json`, resolve);
    });
}

export default loadResources;