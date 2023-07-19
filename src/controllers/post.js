import Post from '../models/post.js'
import User from '../models/user.js'


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

  return post
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
 * @return {Promise<object>}
 */
export const createPost = async ({
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
}) => {
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
 * @return {Promise<object>}
 */
export const updatePost = async (id, data) => {
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
  } = data

  const post = await getPostById(id)

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
 * @param {string} id
 * @return {Promise<boolean>}
 */
export const deletePostById = async (id) => {
  await Post.deleteOne({ _id: id })
  console.log(id)
  return true
}

//Favorite post controller
/**
 * @param {string} id
 * @param {object} user
 * @param {object[]} user.favPosts
 */
export const togglePostFavByUser = async (id, user) => {
  if (!id) {
    throw new Error('id is required')
  } 
  const post = await getPostById(id)
  const currentFavs = user.favPosts || []
  const existedFav = currentFavs.find(
    (currentId) => currentId.toString() === id.toString()
  )

  let newFavList = []
  if (!existedFav) {
    newFavList = [...currentFavs, id]
  } else {
    newFavList = currentFavs.filter(
      (currentId) => currentId.toString() !== id.toString()
    )
  }
  await User.updateOne({ _id: user._id }, { favPosts: newFavList })
}