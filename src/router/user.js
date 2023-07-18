import express from 'express'

const router = express.Router()

router.get('/users/:id', (request, response) => {
  response.json({ ID: request.params.id })
})


export default router