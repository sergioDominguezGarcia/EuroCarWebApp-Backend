import express from 'express'
import { getUsers, getUserById, deleteUserById } from '../controllers/user.js'

const router = express.Router()



// Get all users route (only admin)
router.get('/', async (request, response) => {
  try {
    const users = await getUsers(request.user)
    response.json({ users })
  } catch (error) {
    response.status(500).json(error.message)
  }
})

// Get user by id route
router.get('/:id', async (request, response) => {
  try {
    const user = await getUserById(request.params.id)
    response.json({ user })
  } catch (error) {
    if (error.message === 'User not found') {
      response.status(404).json(error.message)
    }
    response.status(500).json(error.message)
  }
})

// Delete user by id route (only admin)
router.delete('/:id', async (request, response) => {
  try {
    await deleteUserById(request.params.id)
    response.json({ removed: true })
  } catch (error) {
    response.status(500).json(error.message)
  }
})

export default router
