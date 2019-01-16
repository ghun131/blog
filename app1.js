const bcrypt = require('bcrypt');

let password = "gogo";
let passwordConf = "gogo";
let saltRounds = 10;
let hash = "$2b$10$0xdlnsw8xizu2PgC2SozEuLlZil1i7.MpXwengUZuSArorjPYWCmW";

// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(passwordConf, salt, function(err, hash) {
//         this.user = hash;
//     });
// });

bcrypt.compare(password, hash, function(err, res) {
    console.log(res)
})
