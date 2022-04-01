
class ResourceLoader {


    /*
     * lvl - le chemin du JSON à charger
     * whenfinished - la fonction appelée quand le chargement est fini
     */
    constructor(lvl, whenfinished) {
        this.toLoad = 6;
        this.bg = null;
        this.normal = null;
        this.turn = null;
        this.head = null;
        this.tail = null;
        this.apple = null;
        this.level = null;

        this.resolved = function () { whenfinished(this) };

        this.loadImg("/res/bg.jpg").then(img => this.bg = img);
        this.loadImg("/res/normal.png").then(img => this.normal = img);
        this.loadImg("/res/apple.png").then(img => this.apple = img);
        this.loadImg("/res/turn.png").then(img => this.turn = img);
        this.loadImg("/res/head.png").then(img => this.head = img);
        this.loadImg("/res/tail.png").then(img => this.tail = img);
        this.loadJSON("/test.json").then(data => this.level = data)
    }

    loadImg(url) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.src = url;
            img.onload = function () {
                this.toLoad -= 1;
                if (this.toLoad <= 0) this.resolved();
                resolve(img)
            };
            img.onerror = reject;
        });

    }

    loadJSON(url) {
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            req.open("GET", url);
            req.onerror = reject
            req.onload = function () {
                if (req.status === 200) {
                    this.toLoad -= 1;
                    resolve(JSON.parse(req.responseText));
                } else {
                    reject("Erreur " + req.status);
                }
            };
            req.send();
        });
    }

}


function loadResources(nb) {
    return new Promise(function (resolve, _reject) {
        new ResourceLoader("", resolve);
    });
}

export default loadResources;