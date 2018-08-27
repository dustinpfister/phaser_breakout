game.state.add('mksheets', {

    create: function () {

        // ball sheet
        sheetFromCanvas({
            name: 'ball',
            game: game,
            frames: 10,
            frameWidth: 12,
            frameHeight: 12,
            forFrame: function (ctx) {

                var x,
                y,
                lw = 2,
                hlw = lw / 2,
                r;

                ctx.fillStyle = '#00a0f0';
                ctx.strokeStyle = '#c0c0c0';
                ctx.lineWidth = lw;
                //ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

                // outer circle
                ctx.beginPath();
                ctx.arc(this.hw, this.hh, this.hw - hlw, 0, this.p2);
                ctx.closePath();
                ctx.fill();
                //ctx.stroke();

                // inner circle
                ctx.fillStyle = '#c0c0c0';
                ctx.beginPath();

                r = Math.PI * 2 * this.per;
                x = Math.cos(r) * (this.hw - lw * 2) + this.hw;
                y = Math.sin(r) * (this.hw - lw * 2) + this.hh;

                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill()

            }

        });

        // paddle sheet
        sheetFromCanvas({
            name: 'paddle',
            game: game,
            frames: 1,
            frameWidth: 64,
            frameHeight: 8,
            forFrame: function (ctx) {

                ctx.fillStyle = '#0000ff';
                ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            }

        });

        // blocks
        sheetFromCanvas({
            name: 'blocks',
            game: game,
            frames: 3,
            frameWidth: 20,
            frameHeight: 8,
            forFrame: function (ctx) {

                var colors = ['green', 'blue', 'red'];

                // set color by frame
                ctx.fillStyle = colors[this.f];
                ctx.strokeStyle = 'rgba(255,255,255,.5)';
                ctx.lineWidth = 1;
                ctx.fillRect(0, 0, 32,8);
                ctx.strokeRect(0, 1, 31,7);

            }

        });

        game.state.start('game');

    }

});
