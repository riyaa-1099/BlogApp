import Usermodel,{IUser} from "../models/user.model";
import HashUtils from "../helpers/hashingpassword";

let hashutils = new HashUtils();

class UserService {
    
public findByEmail = async (email: string): Promise<IUser[]> => {
return await Usermodel.find({ email });
}

public createUser = async (email: string, password: string, name: string): Promise<void> => {
const hash = await hashutils.hashingpassword(password);
if (hash !== false) {
const user = new Usermodel({ email, password: hash, name });
await user.save();
}
}
}

export default UserService;