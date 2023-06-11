export const ADD_BOOK_URL = 'http://localhost:8080/api/v1/books'
export const EDIT_BOOK_URL = 'http://localhost:8080/api/v1/books'
export const GET_BOOKS_URL = 'http://localhost:8080/api/v1/books'
export const DELETE_BOOKS_URL = 'http://localhost:8080/api/v1/books'

export const GET_ORDERS_URL = 'http://localhost:8080/api/v1/orders'

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