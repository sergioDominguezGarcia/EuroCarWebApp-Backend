import mongoose from 'mongoose'
import { PostAvailableTimeSchema } from './post.js'

const userPostRequestSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    //TO DO cambiar a enum
    status: {
      type: String,
      default: 'pending',
      required: true,
    },
    time: {
      type: PostAvailableTimeSchema,
    },
  },
  { collection: 'userPostRequests' }
)

const UserPostRequest = mongoose.model('Request', userPostRequestSchema)

export default UserPostRequest
