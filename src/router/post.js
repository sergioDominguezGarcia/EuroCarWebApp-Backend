import express from 'express'
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  removePostById,
} from '../controllers/post.js'

const router = express.Router()

router.get('/', (request, response) => {
  try{  const posts = getPosts()
  response.json({ posts })
}catch (e) {
    response.status(500).json(e.message)
  }
})

router.get('/:id', (request, response) => {
  try { 
    const post = getPostById(request.params.id)
  response.json({ post })
  } catch (e) {
    response.status(500).json(e.message)
  }

})

router.post('/', async (request, response) => {
  try {
    const createdPost = await createPost(request.body)
    response.json({ post: createdPost })
  } catch (e) {
    response.status(500).json(e.message)
  }
})

router.put('/:id', (request, response) => {
  try {
    const updatedPost = updatePost(request.params.id, request.body)
    response.json({ from: 'server', post: updatedPost })
  } catch (e) {
    response.status(500).json(e.message)
  }

})

router.delete('/:id', (request, response) => {
  try {
    removePostById(request.params.id)
    response.json({ removed: true })
  } catch (e) {
    response.status(500).json(e.message)
  }

})

export default router
