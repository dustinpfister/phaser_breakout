// make a bunch of text display objects
var mkTextObjects = function (opt) {

    opt = opt || {};
    opt.game = opt.game || game;
    opt.count = opt.count || 1;
    opt.sx = opt.sx || 5;
    opt.sy = opt.sy || 5;
    opt.size = opt.size || 8;
    opt.font = opt.font || {
        fill: 'white',
        font: opt.size + 'px courier'
    };

    var i = 0,
    text;
    while (i < opt.count) {

        text = opt.game.add.text(opt.sx, opt.sy + opt.size * i, '', opt.font);
        text.name = 'text-' + i;

        i += 1;

    }

};