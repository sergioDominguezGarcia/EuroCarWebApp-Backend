import Post from '../models/post.js'
import User from '../models/user.js'
import UserPostComment from '../models/userPostComment.js'
import UserPostValorations from '../models/userPostValoration.js'
import UserPostRequest from '../models/userPostRequest.js'
import { isValid } from 'date-fns'

//Get all posts controller
/**
 * @return {Promise<object[]>}
 */
export const getPosts = async () => {
  return Post.find()
}

//Get post by id controller
/**
 * @param {string} id
 * @return {Promise<object>}
 */
export const getPostById = async (id) => {
  const post = await Post.findOne({ _id: id })

  if (!post) {
    throw new Error('Post not found')
  }

  const postValorations = await UserPostValorations.find({
    postId: post._id,
  })

  const rating = postValorations.reduce((accumulator, current) => {
    return accumulator + current.rate
  }, 0)

  const postComments = await UserPostComment.find({
    postId: post._id,
  })

  const postRequests = await UserPostRequest.find({
    postId: post._id,
  })

  return {
    ...post.toObject(),
    comments: postComments,
    rating: rating / 5,
    requests: postRequests,
  }
}

//Create post controller
/**
 * @param {object} data
 * @param {string} data.name
 * @param {"car" | "motorcycle" | "van"} data.type
 * @param {string} data.model
 * @param {string} data.plateNumber
 * @param {number} data.km
 * @param {number} data.carSeats
 * @param {"gas" | "electric" } data.fuelType
 * @param {"manual" | "automatic" } data.gearBoxType
 * @param {string} data.description
 * @param {"4x4" | "coupé" | "sedan" | "compact" } data.style
 * @param {string} data.sellerId
 * @param {"oculto" | "activo"} data.status
 * @param {string} data.name
 * @param {object[]} data.availableTime
 * @param {'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'} data.availableTime.weekDay
 * @param {object[]} data.availableTime.timing
 * @param {Date} data.availableTime.timing.start
 * @param {Date} data.availableTime.timing.end
 * @return {Promise<object>}
 */
export const createPost = async ({ data, user }) => {
  if (user.rol === 'customer') {
    throw new Error("You don't have permission")
  }
  const {
    name,
    type,
    model,
    plateNumber,
    km,
    carSeats,
    fuelType,
    gearBoxType,
    description,
    style,
    sellerId,
    status,
    availableTime,
  } = data
  if (!name || !type || !plateNumber || !sellerId) {
    throw new Error('Missing required fields')
  }

  const validPostType = ['car', 'motorcycle', 'van']
  if (!validPostType.includes(type)) {
    throw new Error('This is not valid type ')
  }

  const existPost = await Post.findOne({ name, type, sellerId })
  if (existPost) {
    throw new Error('This post already exist!')
  }

  const validFuelType = ['gas', 'electric']
  if (fuelType && !validFuelType.includes(fuelType)) {
    throw new Error('invalid fuel type')
  }

  const validGearBoxType = ['manual', 'automatic']
  if (gearBoxType && !validGearBoxType.includes(gearBoxType)) {
    throw new Error('invalid gear box type')
  }

  const validStyle = ['4x4', 'coupé', 'sedan', 'compact']
  if (style && !validStyle.includes(style)) {
    throw new Error('invalid style')
  }

  const validStatus = ['oculto', 'activo']
  if (status && !validStatus.includes(status)) {
    throw new Error('invalid status')
  }

  // const validWeekDay = [
  //   'Monday',
  //   'Tuesday',
  //   'Wednesday',
  //   'Thursday',
  //   'Friday',
  //   'Saturday',
  //   'Sunday',
  // ]

  // if (!validWeekDay.includes(availableTime.weekDay)) {
  //   throw new Error('The day of week is invalid')
  // }

  // if (
  //   !isValid(availableTime.timing.start) ||
  //   !isValid(availableTime.timing.end)
  // ) {
  //   throw new Error('Your start time or end time is invalid')
  // }

  const post = new Post({
    name,
    type,
    model,
    plateNumber,
    km,
    carSeats,
    fuelType,
    gearBoxType,
    description,
    style,
    sellerId,
    status,
    availableTime,
  })

  return post.save()
}

//Update post controller
/**
 * @param {object} data
 * @param {string} data.name
 * @param {"car" | "motorcycle" | "van"} data.type
 * @param {string} data.model
 * @param {string} data.plateNumber
 * @param {number} data.km
 * @param {number} data.carSeats
 * @param {"gas" | "electric" } data.fuelType
 * @param {"manual" | "automatic" } data.gearBoxType
 * @param {string} data.description
 * @param {"4x4" | "coupé" | "sedan" | "compact" } data.style
 * @param {string} data.sellerId
 * @param {"oculto" | "activo"} data.status
 * @param {string} data.name
 * @param {object[]} data.availableTime
 * @param {'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'} data.availableTime.weekDay
 * @param {object[]} data.availableTime.timing
 * @param {Date} data.availableTime.timing.start
 * @param {Date} data.availableTime.timing.end
 * @return {Promise<object>}
 */
export const updatePost = async ({ id, data, user }) => {
  const {
    name,
    type,
    model,
    plateNumber,
    km,
    carSeats,
    fuelType,
    gearBoxType,
    description,
    style,
    status,
    availableTime,
  } = data

  const post = await getPostById(id)

  if (availableTime) {
    post.availableTime = availableTime
  }

  if (model) {
    post.model = model
  }

  if (km) {
    post.km = km
  }

  if (carSeats) {
    post.carSeats = carSeats
  }

  if (description) {
    post.description = description
  }

  if (post.sellerId !== user._id && rol !== 'admin') {
    throw new Error('no tienes permiso')
  }

  if (name) {
    post.name = name
  }

  if (plateNumber) {
    post.plateNumber = plateNumber
  }

  const validPostType = ['car', 'motorcycle', 'van']
  if (type) {
    if (!validPostType.includes(type)) {
      throw new Error('This is not valid type ')
    } else {
      post.type = type
    }
  }

  const validFuelType = ['gas', 'electric']
  if (fuelType) {
    if (fuelType && !validFuelType.includes(fuelType)) {
      throw new Error('invalid fuel type')
    } else {
      post.fuelType = fuelType
    }
  }

  const validGearBoxType = ['manual', 'automatic']
  if (gearBoxType) {
    if (gearBoxType && !validGearBoxType.includes(gearBoxType)) {
      throw new Error('invalid gear box type')
    } else {
      post.gearBoxType = gearBoxType
    }
  }

  const validStyle = ['4x4', 'coupé', 'sedan', 'compact']
  if (style) {
    if (style && !validStyle.includes(style)) {
      throw new Error('invalid style')
    } else {
      post.style = style
    }
  }

  const validStatus = ['oculto', 'activo']
  if (status) {
    if (status && !validStatus.includes(status)) {
      throw new Error('invalid status')
    } else {
      post.status = status
    }
  }

  await post.save()

  return post
}

//Delete post controller
/**
 * @param {string} postId
 * @param {string} sellerId
 * @param {object} user
 * @param {string} user._id
 * @param {'admin' | 'seller' | 'customer'} user.rol
 * @returns {Promise<boolean>}
 */
export const deletePostById = async ({ postId, user }) => {
  const post = await getPostById(postId)
  if (post.sellerId.toString() !== user._id && user.rol !== 'admin') {
    throw new Error('No tienes permiso')
  }

  await Post.deleteOne({ _id: postId })

  return true
}

//Favorite post controller
/**
 * @param {string} postId
 * @param {object} user
 * @param {object[]} user.favPosts
 */
export const togglePostFavByUser = async (postId, user) => {
  if (!postId) {
    throw new Error('id is required')
  }
  const post = await getPostById(postId)
  const currentFavs = user.favPosts || []
  const existedFav = currentFavs.find(
    (currentId) => currentId.toString() === postId.toString()
  )

  let newFavList = []
  if (!existedFav) {
    newFavList = [...currentFavs, postId]
  } else {
    newFavList = currentFavs.filter(
      (currentId) => currentId.toString() !== postId.toString()
    )
  }
  await User.updateOne({ _id: user._id }, { favPosts: newFavList })
}

// Create comment by user controller
/**
 * @param {string} postId
 * @param {object} user
 * @param {object} data
 */
export const addCommentToPostByUser = async ({ postId, data, user }) => {
  if (user.rol === 'seller') {
    throw new Error("you don't have permission")
  }
  if (!data.comment) {
    throw new Error('missing require field')
  }

  const post = await getPostById(postId)
  const postComment = new UserPostComment({
    customerId: user._id,
    postId: post._id,
    comment: data.comment,
  })
  await postComment.save()
}

// Delete comment by user controller
/**
 * @param {string} commentId
 * @param {object} user
 * @param {'admin' | 'seller' | 'customer'} user.rol
 * @param {string} user._id
 * @returns {Promise<boolean>}
 */
export const deleteCommentByUser = async ({ commentId, user }) => {
  const postComment = await UserPostComment.findOne({ _id: commentId })
  if (!postComment) {
    throw new Error('comment not found')
  }

  if (
    postComment.customerId.toString() !== user._id.toString() &&
    user.rol !== 'admin'
  ) {
    throw new Error("you don't have permission")
  }

  await UserPostComment.deleteOne({ _id: commentId })
}

//Rating by user controller
/**
 * @param {string} postId
 * @param {object} user
 * @param {object} data
 */
export const addRatingToPostByUser = async ({ postId, data, user }) => {
  if (!data.rate) {
    throw new Error('missing require field')
  }

  const formattedRate = Number(data.rate)
  if (isNaN(formattedRate)) {
    throw new Error('invalid field')
  }

  if (formattedRate < 0 || formattedRate > 5) {
    throw new Error('invalid range')
  }

  const post = await getPostById(postId)

  const postRating = new UserPostValorations({
    customerId: user._id,
    postId: post._id,
    rate: formattedRate,
  })
  await postRating.save()
}

// Add request
/**
 * @param {string} postId
 * @param {object} data
 * @param {string} data.status
 * @param {object[]} data.time
 * @param {'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'} data.time.weekDay
 * @param {object[]} data.time.timing
 * @param {Date} data.time.timing.start
 * @param {Date} data.time.timing.end
 */
export const addPostRequestByUser = async ({ postId, data, user }) => {
  if (
    !data.status ||
    !data.time.weekDay ||
    !data.time.timing.start ||
    !data.time.timing.end
  ) {
    throw new Error('Missing some fields')
  }

  const validWeekDay = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  if (!validWeekDay.includes(data.time.weekDay)) {
    throw new Error('The day of the week is invalid')
  }

  if (!isValid(data.time.timing.start) || !isValid(data.time.timing.end)) {
    throw new Error('Your start time or end time for this request is invalid')
  }

  const post = await getPostById(postId)
  const postRequest = new UserPostRequest({
    postId: post._id,
    customerId: user._id,
    status: data.status,
    time: {
      weekDay: data.time.weekDay,
      timing: {
        start: data.time.timing.start,
        end: data.time.timing.end,
      },
    },
  })

  await postRequest.save()
}

// Update request
/**
 * @param {string} postId
 * @param {object} data
 * @param {string} data.status
 * @param {object[]} data.time
 * @param {'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'} data.time.weekDay
 * @param {object[]} data.time.timing
 * @param {Date} data.time.timing.start
 * @param {Date} data.time.timing.end
 */
export const updateRequestStatusBySeller = async ({
  postId,
  data,
  user,
  requestId,
}) => {
  const post = await getPostById(postId)
  const postRequest = await UserPostRequest.findOne({ _id: requestId })
  if (
    post.sellerId.toString() !== user._id.toString() &&
    user.rol !== 'admin'
  ) {
    throw new Error('You dont have permission to edit this request')
  }

  if (data.status) {
    postRequest.status = data.status
  }

  await post.save()

  return post
}
