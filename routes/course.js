
const { addClass,getAllclass } = require("../controllers/course");

const router = require("express").Router();

router.post("/addclass", addClass);
router.get("/allclass", getAllclass);

module.exports = router;