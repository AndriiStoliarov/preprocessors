var less = require('less');
var fs = require('fs');



var lessContent = fs.readFileSync('index.less', {encoding: 'utf-8'});

less.render(lessContent, function(err, output) {
    if (err) throw new Error(err);

    fs.writeFileSync('bundle.css', output.css);
});