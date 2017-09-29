var crypto = require('crypto');
var buffer = require("buffer");

var CryptoTest = {
    Test: function () {
        var md5 = crypto.createHash('md5');
        var buf = new Buffer("汪俊");
        var str = buf.toString("binary");  
        var res = md5.update(str).digest("hex");
        console.log("MD5 明文 汪俊 "+res);
    }
}

module.exports = CryptoTest;