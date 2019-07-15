

class Resources {
    constructor(cb) {
        this.images = new Array(25);
        
        Promise.all([
            (loadImage("./img/back.png")).then((i) => {this.images[Grfx.BACK] = i;}),
            (loadImage("./img/branch1.png")).then((i) => {this.images[Grfx.BRAL1] = i;}),
            (loadImage("./img/branch2.png")).then((i) => {this.images[Grfx.BRAR2] = i;}),
            (loadImage("./img/trunk.png")).then((i) => {this.images[Grfx.TRUNK] = i;}),
            (loadImage("./img/smk.png")).then((i) => {this.images[Grfx.SMOKE] = i;}),
            (loadImage("./img/grave.png")).then((i) => {this.images[Grfx.GRAVE] = i;}),
            (loadImage("./img/id1.png")).then((i) => {this.images[Grfx.CHOP0]= i;}),
            (loadImage("./img/ch0.png")).then((i) => {this.images[Grfx.CHOP1]= i;}),
            (loadImage("./img/ch1.png")).then((i) => {this.images[Grfx.CHOP2] = i;}),
            (loadImage("./img/id0.png")).then((i) => {this.images[Grfx.IDLE] = i;}),
            (loadImage("./img/w0.png")).then((i) => {this.images[Grfx.CLO0] = i;}),
            (loadImage("./img/w1.png")).then((i) => {this.images[Grfx.CLO1] = i;}),
            (loadImage("./img/w2.png")).then((i) => {this.images[Grfx.CLO2] = i;}),
            (loadImage("./img/w3.png")).then((i) => {this.images[Grfx.CLO3] = i;}),
            (loadImage("./img/w4.png")).then((i) => {this.images[Grfx.CLO4] = i;}),
            (loadImage("./img/timebar.png")).then((i) => {this.images[Grfx.TIMER] = i;}),
            (loadImage("./img/bar.gif")).then((i) => {this.images[Grfx.BAR] = i;}),
            (loadImage("./img/backBar.gif")).then((i) => {this.images[Grfx.BACKBAR] = i;}),
            (loadImage("./img/particle.gif")).then((i) => {this.images[Grfx.PARTICLE] = i;})
        ]).then(() => {
            this.build();
            cb();
        });
    }

    build() {
        this.images[Grfx.CHOP0R] = mirror(this.images[Grfx.CHOP0]);
        this.images[Grfx.CHOP1R] = mirror(this.images[Grfx.CHOP1]);
        this.images[Grfx.CHOP2R] = mirror(this.images[Grfx.CHOP2]);
        this.images[Grfx.IDLER] = mirror(this.images[Grfx.IDLE]);
        this.images[Grfx.BRAR1] = mirror(this.images[Grfx.BRAL1]);
        this.images[Grfx.BRAL2] = mirror(this.images[Grfx.BRAR2]);
    }

    image(index) {
        if(index < this.images.length) {
            return this.images[index];
        }
        return null;
    }
}