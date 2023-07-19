import express from 'express'
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePostById,
} from '../controllers/post.js'
import { togglePostFavByUser } from '../controllers/post.js'

const router = express.Router()

// Get all posts route
router.get('/', async (request, response) => {
  try {
    const posts = await getPosts()
    response.json({ posts })
  } catch (e) {
    response.status(500).json(e.message)
  }
})

// Get post by id route
router.get('/:id', async (request, response) => {
  try {
    const post = await getPostById(request.params.id)
    response.json({ post })
  } catch (e) {
    response.status(500).json(e.message)
  }
})

// Create post route
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

// Update post route
router.put('/:id', async (request, response) => {
  try {
    const updatedPost = await updatePost(request.params.id, request.body)
    response.json({ from: 'server', post: updatedPost })
  } catch (e) {
    response.status(500).json(e.message)
  }
})

// Delete post route
router.delete('/:id', async (request, response) => {
  try {
    await deletePostById(request.params.id)
    response.json({ deleted: true })
  } catch (e) {
    response.status(500).json(e.message)
  }
})

// Favorite post route
router.post('/favs/:id', async (request, response) => {
  try {
    await togglePostFavByUser(request.params.id, request.user)
    response.json(true)
  } catch (error) {
    response.status(500).json(error.message)
  }
})


export default router
