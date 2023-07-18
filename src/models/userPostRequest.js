import mongoose from 'mongoose'

const userPostRequestSchema = new mongoose.Schema(
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
    createdAt: {
      type: Date,
      require: true,
      default: Date.now,
    },
    status: {
      type: String,
    },
  },
  { collection: 'userPostRequests' }
)

const UserPostRequest = mongoose.model('Request', userPostRequestSchema)

export default UserPostRequest
