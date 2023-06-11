import { useEffect, useState } from 'react'
import axios from 'axios'
import { BookRow, BookHeader } from '../components/BooksTableElements'
import { ErrorMessages } from '../components/Messages'
import { DELETE_BOOKS_URL, GET_BOOKS_URL } from '../shared/constans'
import useAuthentication from '../shared/useAuthentication'
import BookForm from './BookForm'
import Header from '../components/Header'
import '../../css/routes/BooksTable.css'

export default function BooksTable() {

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
			.delete(DELETE_BOOKS_URL + '/' + book.bookId, { headers: { 'Authorization': 'Bearer ' + token } })
		setReloadData(true)
	}

	async function onEditClick(book) {
		setEditingBook(book);
	}

	async function addToCartClick(book) {
		authenticated && await axios
			.post("http://localhost:8080/api/v1/cart/", { 'bookId': book.bookId }, { headers: { 'Authorization': 'Bearer ' + token } })
	}

	return (
		<>
			{!authenticated && <div className="errorPage"><ErrorMessages errors={errors} /></div>}
			{authenticated && (
				<>
					{editingBook && <BookForm variant='edit' bookInitialState={editingBook} />}
					{!editingBook &&
						<div className="books-table">
							<Header content="Books table" />
							<table>
								<thead className="books-table-thead">
									<BookHeader />
								</thead>
								<tbody className="books-table-tbody">
									{books.map((book) => (
										<BookRow
											key={book.bookId}
											book={book}
											addToCartClick={addToCartClick}
											onEditClick={onEditClick}
											onDeleteClick={onDeleteClick}
										/>
									))}
								</tbody>
							</table>
						</div>
					}
				</>
			)}
		</>
	);
}