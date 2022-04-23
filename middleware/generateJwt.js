const jwt = require("jsonwebtoken");
module.exports = function (id, name, age, email , role){

    return jwt.sign(
      { id, name, age, email, role },
      process.env.SECRET,
      { expiresIn: "24h" }
    );
  };