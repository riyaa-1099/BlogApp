import mongoose,{ Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("blogusers", userSchema);

export { IUser };
export default UserModel;
