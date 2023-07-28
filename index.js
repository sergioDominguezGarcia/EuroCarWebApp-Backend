import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

// import swaggerDocs from "./api/v1/swagger.js"

import postsRouter from './src/router/post.js'
import usersRouter from './src/router/user.js'
import authRouter from"./src/router/auth.js"
import {ensureAuthenticated} from "./src/middleware/auth.js"
import connectToDb from './src/services/db.js'


dotenv.config()

const startApp = async () => {
  const app = express()
  const port = process.env.PORT
  app.use(cors())
  app.use(ensureAuthenticated)

  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }))


  app.use("/auth", authRouter)
  app.use('/posts', postsRouter)
  app.use('/users', usersRouter)


  try {
    await connectToDb()
    app.listen(port, () => {
      console.log(`Server start in ${port}`);
      // swaggerDocs(app, port);
    })
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

startApp()
