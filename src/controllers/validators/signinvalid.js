function validateSignin(email, password) {
  if (!email || !password) {
    return false;
  }
  return true;
}

module.exports = validateSignin;
