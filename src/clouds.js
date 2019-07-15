
class Clouds {
    constructor() {
        this.clouds = [];

        this.clouds.push({
            x:Math.random() * (Options.WIDTH >> 1), 
            y:Math.random() * 60 + 10, 
            s:rand(0, 5) + Grfx.CLO0,
            v:rand(2, 5)
        });
        for(let t = 0; t < 5; t++) {
            this.createOneCloud();
        }
    }

    createOneCloud() {
        const st = this.clouds[this.clouds.length - 1].x + 60 * (~~(Math.random() * 2) + 1);
        this.clouds.push({
            x:st, 
            y:Math.random() * 60 + 10, 
            s:rand(0, 5) + Grfx.CLO0,
            v:rand(2, 5)
        });
    }

    update(dt) {
        for(let c = this.clouds.length - 1; c > -1; c--) {
            const cl = this.clouds[c];
            cl.x -= dt * cl.v;
            if(cl.x < -R.image(cl.s).width) {
                this.clouds.splice(c, 1);
                this.createOneCloud();
            } else {
                this.clouds[c] = cl;
            }
        }
    }

    draw(ctx) {
        for(let c = this.clouds.length - 1; c > -1; c--) {
            const cl = this.clouds[c];
            if(cl.x > Options.WIDTH + 10) continue;
            ctx.drawImage(R.image(cl.s), cl.x, cl.y);
        }
    }
}