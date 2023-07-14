import mongoose from 'mongoose'


const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      enum: ['car', 'motorcycle', 'van'],
      require: true,
    },
    model: {
      type: String,
    },
    plateNumber: {
      type: String,
      require: true,
    },
    km: {
      type: Number,
    },
    carSeats: {
      type: Number,
    },
    fuelType: {
      type: String,
      enum: ['gas', 'electric'],
    },
    gearBoxType: {
      type: String,
      enum: ['manual', 'automatic'],
    },
    description: {
      type: String,
    },
    style: {
      type: String,
      enum: ['4x4', 'coupé'],
    },
    sellerId: {
      type: String,
    } /*(ref tabla user)*/,
    status: {
      type: String,
      enum: ['oculto', 'activo'],
    },
  },

  { collection: 'posts' }
)


const Post = mongoose.model('Post', postSchema)
export default Post