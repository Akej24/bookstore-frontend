const DOMAIN_URL = 'http://localhost:8082/api/v1/'

export const logoutUrl = DOMAIN_URL + 'logout'
export const loginUrl = DOMAIN_URL + 'login'
export const usersUrl = (path) => DOMAIN_URL + 'users' + path
export const accountUrl = (path) => DOMAIN_URL + 'account' + path
export const booksUrl = (path) => DOMAIN_URL + 'books' + path
export const cartUrl = (path) => DOMAIN_URL + 'cart' + path
export const checkoutCartUrl = (path) => DOMAIN_URL + 'checkoutcart' + path
export const orderUrl = (path) => DOMAIN_URL + 'orders' + path
export const deliveriesUrl = (path) => DOMAIN_URL + 'deliveries' + path

export const authHeader = (token) => {
    return { headers: {Authorization: `Bearer ${token}`, }, }
}

export const registerUserInitialState = {
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    role: ''
}	

export const loginUserInitialState = {
    email: '',
    password: ''
}

export const bookEmptyState = {
    bookId: -1,
    bookTitle: '',
    bookAuthor: '',
    releaseDate: '',
    numberOfPages: 0,
    availabilityStatus: true,
    availablePieces: 1,
    bookPrice: 0
}

export const addressInitialState = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    street: '',
    streetNumber: 0,
    zipCode: '',
    city: ''
}

export const sortOptionsInitialState = {
    sortBy: 'releaseDate',
    sortDirection: 'asc',
}

