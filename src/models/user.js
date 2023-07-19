import mongoose from 'mongoose'


const userSchema = new mongoose.Schema(
  {
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
    },
    password: {
      type: String,
      unique: true,
    },
    salt: {
      type: Number,
      require: true,
    },
    document: {
      type: String,
    },

    favPosts:[
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    },
  ],
  },
  { collection: 'users' }
)  


const User = mongoose.model('User', userSchema)
export default User