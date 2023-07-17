import mongoose from "mongoose";

const connectToDb = async () => {
    console.log('starting DB connection...')
  await mongoose.connect("mongodb://localhost:27017/sergio", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
  })
    console.log('connected to DB')
}

export default connectToDb