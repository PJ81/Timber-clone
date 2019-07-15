

class Timber extends State {
    constructor() {
        super();

        this.state = MENU;

        this.clouds = new Clouds();
        this.player = new Player();
        this.particles = new Particles();

        this.choped = null;
        this.tree = [];
        this.timer = 10;
        this.chops = this.score = this.step = 0;
        this.goDown = this.timeOut = false;

        this.timerImage = R.image(Grfx.TIMER);
        this.timerBar = R.image(Grfx.BAR);
        this.backBar = R.image(Grfx.BACKBAR);

        window.addEventListener("chop", () => {
            this.score++;
            const x = this.player.x === Pos.LEFT ? this.player.x + 40 : this.player.x-2;
            this.particles.start(x, 157);
            this.startChop();
        });
    }

    reset() {
        this.tree = [];
        this.timer = 10;
        this.choped = [];
        this.score = this.step = 0;
        this.goDown = this.timeOut = false;

        this.player.reset();
        this.particles.reset();
        this.tree.push({
            type: 2, side: 0, x: 44, y: 146, a: 0, d: 0
        });

        for(let t = 0; t < 8; t++) {
            this.createTree()
        }
    }

    createTree() {
        const t = this.tree[this.tree.length - 1],
              p = rand(0, 3), s = Math.random() < .5 ? Pos.RIGHT : Pos.LEFT;
        this.tree.push({
            type: p,
            side: s,
            y: t.y - 23,
            x: p === 2 ? 44 : s === Pos.LEFT ? 44 : 70 - (R.image(p ? Grfx.BRAL1 : Grfx.BRAR2).width),
            a: 0,
            d: 0
        });
    }

    update(dt) {
        this.clouds.update(dt);
        this.player.update(dt);
        this.particles.update(dt);
        
        if(this.state === GAME && this.player.state !== PLAYER_DEAD) {
            this.timer -= dt;
            if(this.timer < 0) {
                this.timer = 0;
                this.player.kill();
                this.timeOut = true;
                this.checkHiscore();
            }
        }

        if(this.goDown) {
            let y = dt * 200;
            if((this.step += y) > 23) {
                this.goDown = false;
                y -= (this.step - 23);
                this.step = 0;
            }
            for(let t = this.tree.length - 1; t > -1; t--) {
                this.tree[t].y += y;
            }
        }

        for(let t = this.choped.length - 1; t > -1; t--) {
            const r = this.choped[t];
            r.x += dt * r.d * 100;
            r.y += dt * 3;
            r.a += dt * r.d;
        }
    }

    startChop() {
        const t = this.tree.splice(0, 1)[0];
        t.d = this.player.x === Pos.LEFT ? 1 : -1;
        this.choped.push(t);

        this.createTree();
        this.goDown = true;
        if(this.tree[0].type < 2 && this.tree[0].side !== this.player.x) {
            this.player.kill();
            this.checkHiscore();
        } else {
            this.timer += .25;
        }
    }

    draw(ctx) {
        this.clouds.draw(ctx);
        ctx.drawImage(R.image(Grfx.BACK), 0, 0);
        
        for(let t = 0, l = this.tree.length; t < l; t++) {
            const r = this.tree[t];
            switch(r.type) {
                case 0:
                    ctx.drawImage(R.image(r.side === Pos.LEFT ? Grfx.BRAL2 : Grfx.BRAR2), r.x, r.y);
                break;
                case 1:
                    ctx.drawImage(R.image(r.side === Pos.LEFT ? Grfx.BRAL1 : Grfx.BRAR1), r.x, r.y);
                break;
                case 2:
                    ctx.drawImage(R.image(Grfx.TRUNK), r.x, r.y);
                break;
            }
        }

        this.player.draw(ctx);
        
        const wi = (Options.WIDTH >> 1) - (this.timerImage.width >> 1);
        ctx.drawImage(this.backBar, wi + 3, 13);
        ctx.drawImage(this.timerBar, wi + 3, 13, this.timer * 4.2, 7);
        ctx.drawImage(this.timerImage, wi, 10);

        ctx.fillStyle = "#eee";
		ctx.textAlign = "center";
        ctx.font = "8px 'Press Start 2P'"; 
        ctx.fillText(`${this.score}`, Options.WIDTH >> 1, Options.HEIGHT * .2);

        if(this.player.state === PLAYER_DEAD || this.state === MENU) {
            if(this.timeOut) {
                ctx.font = "12px 'Press Start 2P'"; 
                ctx.fillText("TIME", Options.WIDTH >> 1, Options.HEIGHT * .6);
                ctx.fillText(" UP!", Options.WIDTH >> 1, Options.HEIGHT * .68);
            }
            ctx.font = "8px 'Press Start 2P'"; 
            ctx.fillText("BEST SCORE", Options.WIDTH >> 1, Options.HEIGHT * .4);
            ctx.fillText(`${this.chops}`, Options.WIDTH >> 1, Options.HEIGHT * .46);

            ctx.fillText("RETURN TO", Options.WIDTH >> 1, Options.HEIGHT * .85);
            ctx.fillText("PLAY", Options.WIDTH >> 1, Options.HEIGHT * .9);

            K.clear();
            K.addKey(13, (e) => {
                if(e === PRESSED) {
                    this.state = GAME;
                    this.reset();
                }
            });
        }

        let img, w, h;
        for(let t = this.choped.length - 1; t > -1; t--) {
            const r = this.choped[t];
            switch(r.type) {
                case 0:
                    img = R.image(r.side === Pos.LEFT ? Grfx.BRAL2 : Grfx.BRAR2);
                break;
                case 1:
                    img = R.image(r.side === Pos.LEFT ? Grfx.BRAL1 : Grfx.BRAR1);
                break;
                case 2:
                    img = R.image(Grfx.TRUNK);
                break;
            }

            w = img.width >> 1;
            h = img.height >> 1;
            const k = 2 * (r.x + w);
            ctx.save();
            ctx.translate(r.x + w, r.y + h);
            ctx.rotate(r.a);
            ctx.drawImage(img, -w, -h);
            ctx.restore();

            if(k > Options.WIDTH || k < -100) {
                this.choped.splice(t, 0);
            }
        }

        this.particles.draw(ctx);
    }

    start() {
        this.chops = parseInt(localStorage.getItem('fatfrog_chops')) || 0;
        this.reset();
    }

    checkHiscore() {
        if(this.score > this.chops) {
            localStorage.setItem('fatfrog_chops', `${this.score}`);
            this.chops = this.score;
        }
    }
}