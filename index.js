import express from "express"
import bodyParser from "body-parser"
import cors from "cors";
import postsRouter from "./src/router/post.js"
import usersRouter from './src/router/user.js'
import dotenv from "dotenv"
dotenv.config();


const app = express()
const port = process.env.PORT

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);


app.get("/", (request, response) => {
  response.json({info: "hola mundo"})
})


app.use("/posts", postsRouter)
app.use('/users', usersRouter)




app.listen(port, () => {
  console.log(`Server start in ${port}`)
})

