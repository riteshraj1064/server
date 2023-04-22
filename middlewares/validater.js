const { check, validationResult } = require("express-validator");

exports.validateUser = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is Missing")
    .isLength({ min: 3, max: 20 })
    .withMessage("name must be 8 to 20 characters lomg!"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is Missing")
    .isLength({ min: 6, max: 20 })
    .withMessage("password must be 8 to 20 characters lomg!"),
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (!error.length) return next();

  res.status(400).json({ success: false, error: error[0].msg });
};
