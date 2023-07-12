import mongoose from 'mongoose'


const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Date,
    },
    rol: {
      type: String,
      enum: ['admin', 'seller', 'customer'],
      require: true,
    },
    email: {
      type: String,
      require: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    password: {
      type: String,
      unique: true,
    },
    salt: {
      type: Number,
    },
    document: {
      type: String,
      require: true,
    },
  },
  { collection: 'users' }
)  


const User = mongoose.model('User', userSchema)
export default User