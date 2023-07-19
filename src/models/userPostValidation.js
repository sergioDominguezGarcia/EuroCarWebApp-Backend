import mongoose from 'mongoose'

const userPostValidationSchema = new mongoose.Schema(
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
    },
    createdAt: {
      type: Date,
      require: true,
      default: Date.now,
    },
  },
  { collection: 'userPostValidations' }
)

const UserPostValidations = mongoose.model(
  'UserPostValidations',
  userPostValidationSchema
)
export default UserPostValidations