const validateEmail = require("../../utils/emailvalidate");

function validateSignup(name, email, password) {
  if (!name || !email || !password) {
    return false;
  }

  const emailValid = validateEmail(email);
  if (emailValid===false) {
    return false;
  }
  return true;
}

module.exports = validateSignup;
