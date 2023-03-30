class EmailValidator {
  private readonly emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  public validateEmail(email: string): boolean {
    return this.emailRegex.test(email);
  }
}

export default EmailValidator;
