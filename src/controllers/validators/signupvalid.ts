import EmailValidator from "../../utils/emailvalidate";

class SignupValidator {
  private emailValidator = new EmailValidator();

  public validateSignup=(name: string, email: string, password: string): boolean=> {
    if (!name || !email || !password) {
      return false;
    }
    const emailValid = this.emailValidator.validateEmail(email);

    if (emailValid === false) {
      return false;
    }
    return true;
  }
}

export default SignupValidator;
