const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
     owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },

})


module.exports = mongoose.model("Subject", subjectSchema);