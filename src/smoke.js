

class Smoke {
    constructor() {
        this.part = [];
        for(let p = 0; p < 4; p++) {
            this.part.push({
                x:0, y:0,
                s:0, a:1, 
                vx:.4, vy:.4, v:32
            });
        }
        this.part[0].vx = -.4;
        this.part[0].vy = -.4;
        this.part[1].vy = -.4;
        this.part[2].vx = -.4;
        this.active = false;
    }

    start(right) {
        this.active = true;
        for(let p = 0; p < 4; p++) {
            const z = this.part[p];
            z.x = 22 + (right ? 60 : 9);
            z.y = 163;
            z.s = .25;
            z.a = 1;
            z.v = 36
        }
    }

    update(dt) {
        for(let p = 0; p < 4; p++) {
            const z = this.part[p];
            z.x += z.vx * dt * z.v;
            z.y += z.vy * dt * z.v;
            z.s += dt;
            z.v -= dt * 12;
            if(z.s > 1) {
                z.a -= dt * .7;
                if(z.a < 0) {
                    z.a = 0;
                    this.active = false;
                    return;
                }
            }
        }
    }

    draw(ctx) {
        const i = R.image(Grfx.SMOKE);
        for(let p = 0; p < 4; p++) {
            const z = this.part[p];
            const sw = i.width * z.s, sh = i.height * z.s;
            ctx.globalAlpha = z.a;
            ctx.drawImage(i, z.x - sw / 2, z.y - sh / 2, sw, sh);
        }

        ctx.globalAlpha = 1;
    }
}