
const { addQuiz,getQuiz } = require("../controllers/quizs");

const router = require("express").Router();

router.post("/addquiz", addQuiz);
router.post("/allquiz", getQuiz);

module.exports = router;