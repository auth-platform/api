import mongoose, { Schema, Document } from "mongoose";
import { toStandardJSON } from "../../consts/StandardJSON";

export interface IUser extends Document {
  email: String,
  pwd: String,
  role: String,
  name: String
}



const schema = new Schema({
  email: { type: String },
  pwd: { type: String },
  role: { type: String },
  name: { type: String }
}, {collection: 'users', timestamps: true, toJSON: toStandardJSON((_, ret, __) => {
  delete ret.pwd;
  return ret;
})});

export default mongoose.model('User', schema);

