import express from "express"
import bodyParser from "body-parser"
import cors from "cors";
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




app.listen(port, () => {
  console.log(`Server start in ${port}`)
})

