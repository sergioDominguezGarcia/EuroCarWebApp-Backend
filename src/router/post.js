import express from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  removePostById,
} from '../controllers/post'

const router = express.Router()

router.get("/", (request, response) => {
  const posts = getPosts()

  response.json({posts})
})

router.get("/:id", (request, response) => {
  const post = getPostById(request.params.id)
  response.json({ post })
})

router.post('/', (request, response) => {
  const createdPost = createPost(request.body)
  response.json({ post: createdPost })
})

router.put('/:id', (request, response) => {
  const updatedPost = updatePost(request.params.id, request.body)
  response.json({from: "server", post: updatedPost })
})

router.delete('/:id', (request, response) => {
  removePostById(request.params.id)
  response.json({ removed: true })
})

export default router

