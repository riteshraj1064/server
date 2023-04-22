const router = require("express").Router();
const {
  createUser,
  signin,
  verifyEmail,
  forgetPassword,
  resetPassword,
} = require("../controllers/user");
const { isResetTokenValid } = require("../middlewares/user");
const { validateUser, validate } = require("../middlewares/validater");

router.post("/create", validateUser, validate, createUser);
router.post("/login", signin);
router.post("/verify-email", verifyEmail);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", isResetTokenValid, resetPassword);
router.get("/verify-token", isResetTokenValid, (req, res) => {
  res.json({
    success: true,
  });
});

module.exports = router;
