
const { addQuestion,getQuestion, insertQuestion } = require("../controllers/question");

const router = require("express").Router();

router.post("/addquestion", addQuestion);
router.post("/allquestion", getQuestion);
router.post("/addone", insertQuestion);

module.exports = router;