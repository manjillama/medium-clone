const sequelize = require('../config/dbConnection.js');
const Sequelize = require('sequelize');
const bcrypt = require("bcrypt");

const User = sequelize.define('users', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false
  }
},{
  // creates table in database in snake_case
  underscored: true,
  hooks: {
    beforeCreate: (user) => {
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(user.password, salt);
    }
  }
});
// http://docs.sequelizejs.com/manual/tutorial/upgrade-to-v4.html
User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}
/*
 * removing password from rest api
 * https://stackoverflow.com/questions/27972271/sequelize-dont-return-password
 */
User.prototype.toJSON =  function () {
  var values = Object.assign({}, this.get());
  delete values.password;
  return values;
}

module.exports = User;
