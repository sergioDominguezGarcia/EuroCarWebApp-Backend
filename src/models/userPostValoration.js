import mongoose from 'mongoose'

const userPostValorationSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      require: true,
    },
    rate: {
      type: Number,
      require: true,
      min: 0,
      max: 5
    },
    createdAt: {
      type: Date,
      require: true,
      default: Date.now,
    },
  },
  { collection: 'userPostValidations' }
)

const UserPostValorations = mongoose.model(
  'UserPostValorations',
  userPostValorationSchema
)
export default UserPostValorations