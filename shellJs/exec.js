var shell = require('shelljs')

exports.execScript = function(script) {
    shell.exec(script);
}