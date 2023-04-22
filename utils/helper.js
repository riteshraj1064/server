const crypto = require("crypto");

exports.sendError = (res, error, status = 401) => {
  res.status(status).json({ success: false, error: error });
};

exports.createRandamBytes = () =>
  new Promise((resolve, resject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) resject(err);

      const token = buff.toString("hex");
      resolve(token);
    });
  });
