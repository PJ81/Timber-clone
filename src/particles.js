
class Particles {
    constructor() {
        this.particles = [];
        this.img = R.image(Grfx.PARTICLE);
    }

    start(x, y) {
        for(let p = 0; p < 10; p++) {
            this.particles.push({
                x: x,
                y: y,
                a: 1,
                vx: Math.cos(Math.random() * Options.TWO_PI) * 40,
                vy: Math.sin(Math.random() * Options.TWO_PI) * 60
            });
        }
    }

    draw(ctx) {
        for(let t = this.particles.length - 1; t > -1; t--) {
            const p = this.particles[t];
            ctx.drawImage(this.img, p.x, p.y);
        }
    }

    update(dt) {
        for(let t = this.particles.length - 1; t > -1; t--) {
            const p = this.particles[t];
            p.a -= dt;
            if(p.a < 0) {
                this.particles.splice(t, 1);
                continue;
            }
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.vy += dt * 120;
        }
    }

    reset() {
        this.particles = [];
    }
}