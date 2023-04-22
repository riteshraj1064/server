const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quizs",
    required: true,
  },
  englishData: { type: Array, required:true },
 
});

module.exports = mongoose.model("Question", questionSchema);
