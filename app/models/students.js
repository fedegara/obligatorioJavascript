var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    document: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    date_birthday: {type: Date, required: true}
});

module.exports = mongoose.model("student", studentSchema);