const knex = require('../bin/config').movieknex;
const auth = require('../bin/auth');
const bcrypt = require('bcrypt');

const saltRounds = 10;

function userFromDatabase(dbResult) {
  let user = {};
  user['id'] = dbResult['id'];
  user['email'] = dbResult['email'];
  user['is_admin'] = dbResult['is_admin'];
  user['authToken'] = auth.generateToken(user);

  return user;
}

module.exports = {

  signup: async (user) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    try {
      const insertResult = await knex('helper_user').insert(user).returning("*");
      return userFromDatabase(insertResult[0]);
    } catch {
      // 중복에러
      return res.sendStatus(402);
    }
    return res.sendStatus(401);
  },

  longin: async (user) => {
    try {
      const userResult = await knex('helper_user').where({email: user.email});
      if (userResult && userResult[0]) {
        let selectedUserPassword = userResult[0]['password'];
        if (bcrypt.compareSync(user.password, selectedUserPassword)) {
          return userFromDatabase(userResult[0]);
        }
      }
    } catch {
      // 비밀번호 / 이메일 없음 / 기타 등등 에러
      return res.sendStatus(403);
    }
    return null
  }
};
