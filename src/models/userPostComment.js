import mongoose from 'mongoose'

const userPostCommentSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },

    comment: {
      type: String,
      require: true,
    },
    createdAt: {
      type: Date,
      require: true,
      default: Date.now,
    },
  },
  { collection: 'userPostComments' }
)

const UserPostComment = mongoose.model('userPostComent', userPostCommentSchema)
export default UserPostComment
