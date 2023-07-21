import express from 'express'
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePostById,
  togglePostFavByUser,
  addCommentToPostByUser,
  deleteCommentByUser,
  addRatingToPostByUser,
  addPostRequestByUser,
  updateRequestStatusBySeller,
} from '../controllers/post.js'

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
    const updatedPost = await updatePost({
      id: request.params.id,
      data: request.body,
      user: request.user,
    })
    response.json(updatedPost)
  } catch (e) {
    response.status(500).json(e.message)
  }
})

// Delete post route
router.delete('/:id', async (request, response) => {
  try {
    await deletePostById({ postId: request.params.id, user: request.user })
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

// Comment post route
router.post('/comments/:postId', async (request, response) => {
  try {
    await addCommentToPostByUser({
      postId: request.params.postId,
      user: request.user,
      data: request.body,
    })
    response.json(true)
  } catch (error) {
    response.status(500).json(error.message)
  }
})

// Delete comments route
router.delete('/comments/:commentId', async (request, response) => {
  try {
    await deleteCommentByUser({
      commentId: request.params.commentId,
      user: request.user,
    })
    response.json(true)
  } catch (error) {
    response.status(500).json(error.message)
  }
})

// Valoration post route
router.post('/valorations/:postId', async (request, response) => {
  try {
    await addRatingToPostByUser({
      postId: request.params.postId,
      user: request.user,
      data: request.body,
    })
    response.json(true)
  } catch (error) {
    response.status(500).json(error.message)
  }
})

// Request route
router.post('/request/:postId', async (request, response) => {
  try {
    await addPostRequestByUser({
      postId: request.params.postId,
      data: request.body,
      user: request.user,
    })
    response.json(true)
  } catch (error) {
    response.status(500).json(error.message)
  }
})

// Update request route
router.put('/request/:postId/:requestId', async (request, response) => {
  try {
    await updateRequestStatusBySeller(
      request.params.postId,
      request.body,
      request.user
    )
  } catch (error) {
    response.status(500).json(error.message)
  }
})
export default router
