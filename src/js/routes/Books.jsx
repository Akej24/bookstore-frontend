import { useEffect, useState } from 'react'
import axios from 'axios'
import { ErrorMessages } from '../components/Messages'
import { ADD_PRODUCT_TO_CART_URL, DELETE_BOOKS_URL, GET_BOOKS_URL } from '../shared/constans'
import BooksTable from '../components/BooksTable'
import useAuthentication from '../shared/useAuthentication'
import BookForm from './BookForm'
import Header from '../components/Header'
import '../../css/components/Table.css'

export default function Books() {

	const [books, setBooks] = useState([])
	const [editingBook, setEditingBook] = useState(null)
	const [reloadData, setReloadData] = useState(false)
	const { token, authenticated, errors, setErrors } = useAuthentication()

	useEffect(() => {
		authenticated && axios
			.get(GET_BOOKS_URL, { headers: { 'Authorization': 'Bearer ' + token } })
			.then(response => {
				setBooks(response.data)
				setReloadData(false)
			})
			.catch(() => setErrors([{ message: 'Internal error' }]))
	}, [authenticated, reloadData])


	async function onDeleteClick(book) {
		authenticated && await axios
			.delete(DELETE_BOOKS_URL + book.bookId, { headers: { 'Authorization': 'Bearer ' + token } })
		setReloadData(true)
	}

	async function onEditClick(book) {
		setEditingBook(book);
	}

	async function addToCartClick(book) {
		authenticated && await axios
			.post(ADD_PRODUCT_TO_CART_URL, { 'bookId': book.bookId }, { headers: { 'Authorization': 'Bearer ' + token } })
	}

	return (
		<>
			{!authenticated && <div className="errorPage"><ErrorMessages errors={errors} /></div>}
			{authenticated && (
				<>
					{editingBook && <BookForm variant='edit' bookInitialState={editingBook} />}
					{!editingBook &&
						<div className="table-div">
							<Header content="Books table" />
							<BooksTable
								books={books}
								addToCartClick={addToCartClick}
								onEditClick={onEditClick}
								onDeleteClick={onDeleteClick} />
						</div>
					}
				</>
			)}
		</>
	);
}