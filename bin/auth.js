const jwt = require('jsonwebtoken');
const jwtSecretKey = "heloper_key_ijirong";

module.exports = {

  generateToken: (user) => {
    return jwt.sign(user, jwtSecretKey);
  },

  validate: (req, res, next) => {
    const token = req.get('Authorization');
    try {
      let user = jwt.verify(token, jwtSecretKey);
      req.user = user;
      next();
    } catch {
      res.sendStatus(403);
    }
  },

  validateAdmin: (req, res, next) => {
    const token = req.get('Authorization');
    try {
      const user = jwt.verify(token, jwtSecretKey);
      req.user = user;
      if (user.is_admin !== true) {
        res.sendStatus(403);
      } else {
        next();
      }
    } catch {
      res.sendStatus(403);
    }
  },
};
