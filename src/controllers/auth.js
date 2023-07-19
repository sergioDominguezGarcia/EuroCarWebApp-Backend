import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Login controller
/**
 * @param {string} email
 * @param {string} password
 * @return {Promise<string>}
 */
export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Miss some fields')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('User not found')
  }

  const matchedPassword = await bcrypt.compare(password, user.password)

  if (!matchedPassword) {
    throw new Error('invalid password')
  }

  return jwt.sign({ email, id: user._id }, process.env.TOKEN_SECRET)
}

// Sign up controller
/**
 * @param {string} firstName
 * @param {string} lastName
 * @param {date} age
 * @param {"seller" | "customer"} rol
 * @param {string} email
 * @param {string} password
 * @param {number} phone
 * @param {string} document
 * @return {Promise<string>}
 */
export const signup = async ({
  email,
  password,
  rol,
  firstName,
  lastName,
  age,
  phone,
  document,
}) => {
  if (!email || !password || !rol) {
    throw new Error('Miss some fields')
  }

  const hasUser = await User.findOne({ email })
  if (hasUser) {
    throw new Error('Email is used')
  }

  if (phone && typeof phone !== 'number') {
    throw new Error('Invalid characters')
  }

  if (dni && typeof dni !== 'string') {
    throw new Error('Invalid characters')
  }

  const validRoles = ['seller', 'customer']
  if (rol && !validRoles.includes(rol)) {
    throw new Error(`Role must be one of ${validRoles}`)
  }

  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = new User({
    email,
    password: hashedPassword,
    rol,
    firstName,
    lastName,
    age,
    phone,
    document,
    salt
  })

  await user.save()

  return jwt.sign({ email, id: user._id }, process.env.TOKEN_SECRET)
}
