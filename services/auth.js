const jwt = require("jsonwebtoken");

var authService = {
  verifyUser: function(req, res, next) {
    let token = req.cookies.jwt;
    // if we have a cookie we can proceed
    if (token) {
      jwt.verify(token, "secretkey", function(err, decoded) {
        if (err) {
          res.json({ status: "error", message: err.message, data: null });
        } else {
          req.body.userId = decoded.id;
          next();
        }
      });
    }
  }
};

module.exports = authService;
