var bcrypt = require('bcryptjs');
let customBcrypt = (temp) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(temp, salt);
    return hash
}

module.exports = customBcrypt