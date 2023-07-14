

/**
 * @return {[{name:string}, {name:string}, {name:string}]}
 */
export const getPosts = () => {
  /** Logic of DB */
  return [{ name: 'pene' }, { name: 'tm' }, { name: 'hijoputa' }]
}

/**
 * @param {string} id 
 * @returns {{name: string, id: string}}
 */
export const getPostById = (id) => {
  /** Logic of DB*/

  return {
    id,
    name: "test"
  }
}


/**
 * @param {object} data 
 * @param {string} data.name
 * @return {*}
 */
export const createPost = (data) => {
  /** Logic of DB*/

  return {
    ...data,
  }
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