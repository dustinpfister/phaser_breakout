let express = require('express'),

app = express();

app.set('port', process.env.PORT || process.argv[2] || 8080);

app.use('/', express.static('./public'));

app.listen(app.get('port'), () => {

    console.log('phaser_breakout is being hosted on port ' + app.get('port'));

});
