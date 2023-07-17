import express from 'express'
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  removePostById,
} from '../controllers/post.js'

const router = express.Router()

router.get('/', async (request, response) => {
  try {
    const posts = await getPosts()
    response.json({ posts })
  } catch (e) {
    response.status(500).json(e.message)
  }
})

router.get('/:id', async (request, response) => {
  try {
    const post = await getPostById(request.params.id)
    response.json({ post })
  } catch (e) {
    response.status(500).json(e.message)
  }
})

router.post('/', async (request, response) => {
  try {
    const createdPost = await createPost({
      ...request.body,
      sellerId: request.user._id,
    })
    response.json({ post: createdPost })
  } catch (e) {
    response.status(500).json(e.message)
  }
})

router.put('/:id', async (request, response) => {
  try {
    const updatedPost = await updatePost(request.params.id, request.body)
    response.json({ from: 'server', post: updatedPost })
  } catch (e) {
    response.status(500).json(e.message)
  }
})

router.delete('/:id', async (request, response) => {
  try {
    await removePostById(request.params.id)
    response.json({ removed: true })
  } catch (e) {
    response.status(500).json(e.message)
  }
})

export default router
