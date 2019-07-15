

class Player {
    constructor() {
        this.smoke = new Smoke();
        this.x = Pos.RIGHT;
        this.animFrame = 0;
        this.animFrameTime = .2;
        this.state = PLAYER_DEAD;
        this.pressedL = this.pressedR = false;

        this.idleAnimR = [
            Grfx.CHOP0,
            Grfx.IDLE
        ];
        this.chopAnimR = [
            Grfx.CHOP0R,
            Grfx.CHOP1R,
            Grfx.CHOP2R,
            Grfx.CHOP2R,
            Grfx.CHOP1R
        ];
        this.idleAnimL = [
            Grfx.CHOP0R,
            Grfx.IDLER
        ];
        this.chopAnimL = [
            Grfx.CHOP0,
            Grfx.CHOP1,
            Grfx.CHOP2,
            Grfx.CHOP2,
            Grfx.CHOP1
        ];
        this.reset();
    }

    reset() {
        this.x = Pos.LEFT;
        this.animFrame = 0;
        this.animFrameTime = .2;
        this.state = PLAYER_IDLE;
        this.pressedL = this.pressedR = false;

        K.clear();
        K.addKey(37, (e) => {
            if(e === PRESSED && this.state === PLAYER_IDLE) {
                this.pressedL = true;
                this.x = Pos.LEFT;
                this.animFrameTime = this.animFrame = 0;
            }
        });
        K.addKey(39, (e) => {
            if(e === PRESSED && this.state === PLAYER_IDLE) {
                this.pressedR = true;
                this.x = Pos.RIGHT;
                this.animFrameTime = this.animFrame = 0;
            }
        });
    }

    kill() {
        this.state = PLAYER_DEAD;
        this.smoke.start(this.x === Pos.RIGHT);
    }

    update(dt) {
        if(this.state === PLAYER_DEAD) {
            if(this.smoke.active) this.smoke.update(dt);
        } else {
            this.state = (this.pressedR || this.pressedL) ? PLAYER_CHOP : PLAYER_IDLE;
            
            if((this.animFrameTime -= dt) < 0) {
                this.animFrameTime = this.state;
                this.animFrame = (this.animFrame + 1) % (this.state === PLAYER_IDLE ? 2 : 5);
                
                if(this.state === PLAYER_CHOP) {
                    switch(this.animFrame) {
                        case 0:
                            this.state = PLAYER_IDLE;
                            this.pressedL = this.pressedR = false;
                        break;
                        case 2:
                            window.dispatchEvent(new CustomEvent("chop", {
                                detail: 0
                            }));
                        break;
                    }
                }
            }
        }
    }

    draw(ctx) {
        switch(this.state) {
            case PLAYER_IDLE: 
                if(this.x === Pos.LEFT) {
                    ctx.drawImage(R.image(this.idleAnimR[this.animFrame]), this.x, 142);
                } else { 
                    ctx.drawImage(R.image(this.idleAnimL[this.animFrame]), this.x, 142);
                }
            break;
            case PLAYER_CHOP:
                if(this.x === Pos.LEFT) {
                    ctx.drawImage(R.image(this.chopAnimL[this.animFrame]), this.x, 142);
                } else {
                    ctx.drawImage(R.image(this.chopAnimR[this.animFrame]), this.x, 142);
                }
            break;
            case PLAYER_DEAD: 
                if(this.x === Pos.LEFT) {
                    ctx.drawImage(R.image(Grfx.GRAVE), this.x + 4, 153);
                } else {
                    ctx.drawImage(R.image(Grfx.GRAVE), this.x + 12, 153);
                }
                if(this.smoke.active) this.smoke.draw(ctx);
            break;
        }
    }
}