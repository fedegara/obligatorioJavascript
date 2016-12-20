var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});
//TYPES
/*
 String
 Date
 Number
 Boolean
 Array
 Mixed
 */

module.exports = mongoose.model("user", userSchema);