import express, { request } from "express"
import { login, signup } from '../controllers/auth.js'

const router = express.Router()

router.post("/login", async (request, response) => {
  try{
    const token = await login(request.body)
    response.json(token)
  } catch (e) {
    response.status(500).json(e.message)
  }
})


router.post('/signup', async (request, response) => {
  try {
    const token = await signup(request.body)
    response.json(token)
  } catch (e) {
    response.status(500).json(e.message)
  }
})


export default router