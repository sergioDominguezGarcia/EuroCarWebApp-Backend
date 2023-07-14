import Post from '../models/post.js'

/**
 * @return {[{name:string}, {name:string}, {name:string}]}
 */
export const getPosts = () => {
  return Post.find()
}

/**
 * @param {string} id
 * @returns {{name: string, id: string}}
 */
export const getPostById = async (id) => {
  const post = await Post.findOne({ _id: id })

  if (!post) {
    throw new Error('Post not found')
  }

  return post
}

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
 * @return {*}
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
  if (!name || !type || !plateNumber) {
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

  const validFuelType = ["gas", "electric"]
  if(fuelType && !validFuelType.includes(fuelType)){
    throw new Error("invalid fuel type")
  }


  const validGearBoxType = ["manual", "automatic"]
  if (gearBoxType && !validGearBoxType.includes(gearBoxType)){
    throw new Error('invalid gear box type')
  }

  const validStyle = ["4x4", "coupé", "sedan", "compact"]
  if(style && !validStyle.includes(style)){
    throw new Error('invalid style')    
  }

  const validStatus = ["oculto", "activo"]
  if(status && !validStatus.includes(status)){
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

/**
 * @param {string} id
 * @param {object} data
 * @return {*&{id}}
 */
export const updatePost = (id, data) => {
  /** Logic of DB*/

  return {
    id,
    ...data,
  }
}

/**
 *
 * @param {string} id
 * @return {boolean}
 */
export const removePostById = (id) => {
  /** Logic of DB*/
  console.log(id)
  return true
}
