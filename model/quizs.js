const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
     owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    questions:{
        type: Number,
        required: true,
    },
    time:{
        type: Number,
        required: true,
    },

})


module.exports = mongoose.model("Quizs", quizSchema);