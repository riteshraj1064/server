const User = require("../model/user");
const { sendError, createRandamBytes } = require("../utils/helper");
const jwt = require("jsonwebtoken");
const VerificationToken = require("../model/verificationToken");
const { isValidObjectId } = require("mongoose");
const { mailTransport } = require("../utils/mail");
const ResetToken = require("../model/resetToken");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) return sendError(res, "This Email is already exists!");

  const newUser = new User({
    name,
    email,
    password,
  });
  const otp = Math.floor(Math.random() * 10000);
  const verificationToken = new VerificationToken({
    owner: newUser._id,
    token: otp,
  });
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  await verificationToken.save();
  await newUser.save();

  mailTransport().sendMail({
    from: "allexamss24@gmail.com",
    to: newUser.email,
    subject: " Verify your Account",
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Quizzze</a>
      </div>
      <p style="font-size:1.1em">Hi,${newUser.name}</p>
      <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">Regards,<br />Quizzze</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>YQuizzze.Inc</p>
        <p>1600 Amphitheatre Parkway</p>
        <p>California</p>
      </div>
    </div>
  </div>`,
  });

  res.json({
    success: true,
    user: {
      name: newUser.name,
      email: newUser.email,
      id: newUser._id,
      wallet: newUser.wallet,
      verified: newUser.verified,
      token: token,
    },
  });
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email.trim() || !password.trim())
    return sendError(res, "Email and Password is missing !");

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "Email is not registered");

  const isMatched = await user.comparePassword(password);
  if (!isMatched) return sendError(res, "Email and Password is wrong !");

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.json({
    success: true,
    user: { name: user.name, email: user.email, id: user._id, token: token },
  });
};

exports.verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId.trim() || !otp.trim()) return sendError(res, "invalid request");

  if (!isValidObjectId(userId)) return sendError(res, "invalid user id");

  const user = await User.findById(userId);
  if (!user) return sendError(res, "user not found ");

  if (user.verified) return sendError(res, "This Account is already verified");
  const token = await VerificationToken.findOne({ owner: user._id });

  if (!token) return sendError(res, " Sorry, user not found ");
  const isMatch = await token.compareToken(otp);

  if (!isMatch) return sendError(res, "Please provid a valid token ");

  user.verified = true;

  await VerificationToken.findByIdAndDelete(token._id);
  await user.save();
  mailTransport().sendMail({
    from: "allexamss24@gmail.com",
    to: user.email,
    subject: " Your Account is verified",
    html: `<h1>Welcome</h1>`,
  });
  res.json({
    success: true,
    meassage: "your account is verified",
    user: { name: user.name, email: user.email, id: user._id },
  });
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return sendError(res, " Sorry, user not found ");

  const user = await User.findOne({ email });
  if (!user) return sendError(res, " Sorry, user not found ");

  const token = await ResetToken.findOne({ owner: user._id });
  if (token)
    return sendError(
      res,
      " Only after one hour letar you can forget your password"
    );

  const RandamBytes = await createRandamBytes();
  const resetToken = new ResetToken({ owner: user._id, token: RandamBytes });
  await resetToken.save();

  mailTransport().sendMail({
    from: "allexamss24@gmail.com",
    to: user.email,
    subject: " Password Reset",
    html: `<h1>${`${process.env.URI}?token=${RandamBytes}&id=${user._id}`}</h1>`,
  });
  res.json({
    success: true,
    meassage: "Password rest token is sent to your Email",
  });
};

exports.resetPassword = async (req, res) => {
  const { password } = req.body;

  const user = await User.findById(res.user._id);

  if (!user) return sendError(res, " Sorry, user not found ");

  const isSame = await user.comparePassword(password);
  if (isSame) return sendError(res, " New password is same to old password ");

  if (password.trim().length < 8 || password.trim().length > 20)
    return sendError(res, " password must be 8 to 20 characters long! ");

  user.password = password.trim();
  await ResetToken.findOneAndDelete({ owner: user._id });
  await user.save();

  mailTransport().sendMail({
    from: "allexamss24@gmail.com",
    to: user.email,
    subject: " Your Password is changed",
    html: `<h1> Your Password is changed</h1>`,
  });
  res.json({
    success: true,
    meassage: "Your Password is changed",
  });
};
