const Usermodel = require("../models/user.model");
const { hashingpassword } = require("../helpers/hashingpassword");

module.exports = {
  findByEmail: async function (email) {
    return await Usermodel.find({ email });
  },

  createUser: async function (email, password, name) {
    const hash = hashingpassword(password);
    const current = new Usermodel({ email, password: hash, name });
    return await current.save();
  },
};
