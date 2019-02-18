var mongoose = require('mongoose'),
    schema   = mongoose.Schema;


var user = new schema({
      name    : { type: String },
      email   : { type: String },
      password: { type : String },

});

module.exports = mongoose.model('User',user);
