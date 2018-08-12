import axios from 'axios'

const url = 'http://localhost:3002/products'

const fetchProducts = () => {
  return axios.get(url)
    .then(response => response.data)
}

const fetchProduct = id => {
  return axios.get(`${url}/${id}`)
    .then(response => response.data)
}

export {
  fetchProduct,
  fetchProducts
}