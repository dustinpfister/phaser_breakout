var Blocks = {

    blocks: [],

    // this is to be called in the create method of the game state
    setup: function (opt) {

        opt = opt || {};

        this.game = opt.game || game;
        this.sheetKey = 'blocks';
        this.gridWidth = 13;
        this.gridHeight = 8;
        this.blockWidth = 20;
        this.blockHeight = 8;
        this.sx = 32;
        this.sy = 32;

        this.blocks = [];

        this.createBlockPool(this.sheetKey, this.gridWidth * this.gridHeight);

    },

    // create a block pool with the given sheet key
    createBlockPool: function (sheetKey, count) {

        var i = 0,
        x,
        y,
        sprite;

        // for total block count
        while (i < count) {

            x = i % this.gridWidth * this.blockWidth;
            y = Math.floor(i / this.gridWidth) * this.blockHeight;

            // create sprite for block
            sprite = this.game.add.sprite(0, 0, 'blocks', 2);
            sprite.name = 'block-' + i;
            sprite.x = this.sx + x;
            sprite.y = this.sy + y;

            // physics
            game.physics.enable(sprite);
            sprite.body.immovable = true;

            sprite.body.onCollide = new Phaser.Signal();
            sprite.body.onCollide.add(this.onCollide, sprite);

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
        i = 0;

        level = level || 1;
        while (i < count) {

            yPer = Math.floor(i / this.gridWidth) / this.gridHeight;

            sprite = this.blocks[i];

            sprite.data.hp = 1 + Math.floor((1 - yPer) * 2);
            sprite.frame = sprite.data.hp - 1;
            sprite.body.enable = true;
            sprite.alpha = 1

                i += 1;

        }

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

    onCollide: function () {

        // the block sprite should be this
        var sprite = this;

        sprite.data.hp -= 1;

        if (sprite.data.hp <= 0) {

            sprite.data.hp = 0;
            sprite.body.enable = false;
            sprite.alpha = 0

        } else {

            sprite.frame = sprite.data.hp - 1;

        }

    }

};
