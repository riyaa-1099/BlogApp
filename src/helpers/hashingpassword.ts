import bcrypt from "bcrypt";

class HashUtils {
  public hashingpassword = async (password: string): Promise<string | false> => {
  try {
  const hash = await bcrypt.hash(password, 4);
  return hash;
  } catch (err) {
  console.log(err);
  return false;
  }
  }
  
  public checkhashedpassword = async (password: string, hashed_password: string): Promise<boolean> => {
  try {
  const result = await bcrypt.compare(password, hashed_password);
  return result;
  } catch (error) {
  console.error(error);
  return false;
  }
  }
  }
  
  export default HashUtils;