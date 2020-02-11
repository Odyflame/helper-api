var express = require('express');
var router = express.Router();
const userService = require('../services/users');
const auth = require('../bin/auth');

/* GET users listing. */
router.post('/signup', async (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const result = await userService.signup(user);
  if (!!result) {
    res.json(result)
  }
  res.sendStatus(200);
});

router.post('/login', async (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const result = await userService.longin(user);
  if (!!result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});



router.get('/authCheck', auth.validate, async (req, res, next) => {
  res.sendStatus(200);
});

module.exports = router;
