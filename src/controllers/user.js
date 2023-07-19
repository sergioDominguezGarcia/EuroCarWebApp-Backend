import User from '../models/user.js'


// Get all users controller
/**
 * @returns {Promise<object>}
 */
export const getUsers = async (user) => {
  if (!user || user.rol !== 'admin') {
    throw new Error('You dont have permission')
  }
  return User.find()
}

// Get user by id controller
/**
 *
 * @param {string} id
 * @returns {Promise<object>}
 */
export const getUserById = async (id) => {
  const user = await User.findOne({ _id: id }).populate('favPosts')

  if (!user) {
    throw new Error('User not found')
  }

  return user
}

// Delete user by id controller
/**
 * @param {string} id
 * @returns {Promise<boolean>}
 */
export const deleteUserById = async (id) => {
  await User.deleteOne({ _id: id })

  return true
}


