class SigninValidator {
  public validate=(email: string, password: string): boolean =>{
    if (!email || !password) {
      return false;
    }
    return true;
  }
}

export default SigninValidator;
