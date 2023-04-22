
const { addSubject,getSubject } = require("../controllers/subject");

const router = require("express").Router();

router.post("/addsubject", addSubject);
router.post("/allsubject", getSubject);

module.exports = router;