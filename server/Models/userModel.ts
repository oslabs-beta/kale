const bcrypt = require('bcrypt');
import { UserType } from '../../types';

const SALT_WORK_FACTOR: number = 10; // Use number type for numeric constant

const myURI: string =
  'mongodb+srv://codesmithbv:ax6POS3lHiGRGPfO@kalecluster.3wl6slc.mongodb.net/';

import mongoose from 'mongoose';
const { Schema } = mongoose;

try {
  mongoose.connect(myURI);
  console.log('connected to mongodb');
} catch (error) {
  console.log(error);
}

const userSchema = new Schema<UserType>({
  // Use generic type argument for UserType interface
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre<UserType>('save', async function (next) {
  const user = this as UserType; // Explicitly cast 'this' to UserType for property access

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

    // Hash the password along with our new salt
    const hash = await bcrypt.hash(user.password, salt);

    // Override the cleartext password with the hashed one
    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err; // Or handle the error differently
  }
};

const User = mongoose.model('User', userSchema);

export default User;
