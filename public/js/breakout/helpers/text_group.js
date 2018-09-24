// make a bunch of text display objects
var TextGroup = function (opt) {

    opt = opt || {};
    opt.game = opt.game || game;
    opt.count = opt.count || 1;
    opt.sx = opt.sx || 5;
    opt.sy = opt.sy || 5;
    opt.size = opt.size || 10;
    opt.font = opt.font || {
        fill: 'white',
        font: opt.size + 'px courier'
    };

    var group = game.add.group();
    group.name = opt.name || '';
    group.x = opt.sx;
    group.y = opt.sx;

    var i = 0,
    text;
    while (i < opt.count) {

        text = opt.game.add.text(0, opt.size * i, '', opt.font);
        text.name = 'text-' + i;

        group.add(text);

        i += 1;

    }

    return group;

};
