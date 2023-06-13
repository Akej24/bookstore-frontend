export const ADD_BOOK_URL = 'http://localhost:8080/api/v1/books'
export const EDIT_BOOK_URL = 'http://localhost:8080/api/v1/books/'
export const GET_BOOKS_URL = 'http://localhost:8080/api/v1/books'
export const DELETE_BOOKS_URL = 'http://localhost:8080/api/v1/books/'

export const GET_ACCOUNT_URL = 'http://localhost:8080/api/v1/users/account'
export const EDIT_ACCOUNT_URL = 'http://localhost:8080/api/v1/users/account'

export const GET_ORDERS_URL = 'http://localhost:8080/api/v1/orders'

export const GET_CHECKOUT_CART_URL = 'http://localhost:8080/api/v1/checkoutcart'
export const ADD_PAYMENT_URL = 'http://localhost:8080/api/v1/checkoutcart/payment'
export const ADD_ADDRESS_URL = 'http://localhost:8080/api/v1/checkoutcart/address'
export const ORDER_CHECKOUT_CART_URL = 'http://localhost:8080/api/v1/orders'

export const GET_CART_URL = 'http://localhost:8080/api/v1/cart'
export const ADD_PRODUCT_TO_CART_URL = 'http://localhost:8080/api/v1/cart/'
export const INCREASE_CART_PRODUCT_AMOUNT_URL = 'http://localhost:8080/api/v1/cart/product/increase'
export const DECREASE_CART_PRODUCT_AMOUNT_URL = 'http://localhost:8080/api/v1/cart/product/decrease'
export const CHECKOUT_CART_URL = 'http://localhost:8080/api/v1/checkoutcart'

export const bookEmptyState = {
  bookId: 2,
  bookTitle: '',
  bookAuthor: '',
  releaseDate: '',
  numberOfPages: 0,
  availabilityStatus: false,
  availablePieces: 0,
  bookPrice: 0
};