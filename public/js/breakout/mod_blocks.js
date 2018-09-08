var Blocks = {

    blocks: [],

    // this is to be called in the boot state
    setup: function (opt) {

        opt = opt || {};

        this.game = opt.game || game;
        this.sheetKey = 'blocks';
        this.gridWidth = 10;
        this.gridHeight = 8;

        // number of block lengths on the sides
        this.blockWidthAjust = 1.25;

        this.blockWidth = this.game.width / (this.gridWidth + (2 * this.blockWidthAjust));
        this.blockHeight = 8;
        this.sx = this.blockWidth + this.blockWidth * (this.blockWidthAjust - 1);
        this.sy = 32;

        this.blocks = [];

    },

    // create a block pool, this is to be called in the create method of the game state
    createBlockPool: function () {

        var i = 0,
        x,
        y,
        sprite,
        count = this.gridWidth * this.gridHeight;

        // for total block count
        while (i < count) {

            x = i % this.gridWidth * this.blockWidth;
            y = Math.floor(i / this.gridWidth) * this.blockHeight;

            // create sprite for block
            sprite = this.game.add.sprite(0, 0, this.sheetKey, 2);
            sprite.name = 'block-' + i;
            sprite.x = this.sx + x;
            sprite.y = this.sy + y;
            sprite.width = this.blockWidth;
            sprite.height = this.blockHeight;

            // push to blocks array
            this.blocks.push(sprite);

            i += 1;
        }

        this.setupDataObjects();

    },

    // set up data block objects
    setupDataObjects: function (level) {

        var count = this.blocks.length,
        sprite,
        yPer,
        x,
        y,
        i = 0;

        level = level || 1;
        while (i < count) {

            yPer = Math.floor(i / this.gridWidth) / this.gridHeight;
            x = i % this.gridWidth * this.blockWidth;
            y = Math.floor(i / this.gridWidth) * this.blockHeight;

            sprite = this.blocks[i];

            // enable physics here
            if (!sprite.body) {
                game.physics.enable(sprite);
            }
            sprite.body.enable = true;
            sprite.body.immovable = true;
            sprite.body.onCollide = new Phaser.Signal();
            sprite.body.onCollide.add(this.onCollide, sprite);

            sprite.x = this.sx + x;
            sprite.y = this.sy + y;
            sprite.data.hp = 1 + Math.floor((1 - yPer) * 2);
            sprite.frame = sprite.data.hp - 1;
            sprite.alpha = 1;

            i += 1;

        }

        console.log('block length: ' + this.blocks.length);

    },

    // count how many blocks are still alive
    countAlive: function () {

        var alive = 0;

        this.blocks.forEach(function (block) {

            if (block.data.hp > 0) {

                alive += 1;

            }

        });

        return alive;

    },

    // what happens when the ball hits a block
    onCollide: function () {

        // the block sprite should be this
        var sprite = this,
        points = 0;

        // set score to zero if it is not there
        this.game.data = this.game.data || {};
        this.game.data.score = this.game.data.score || 0;

        sprite.data.hp -= 1;

        if (sprite.data.hp <= 0) {

            sprite.data.hp = 0;
            sprite.body.enable = false;
            sprite.alpha = 0;

            points += 100;

        } else {

            sprite.frame = sprite.data.hp - 1;
            points += 10;

        }

        this.game.data.score += points;

        Features.onScore.call(this);

    }

};
