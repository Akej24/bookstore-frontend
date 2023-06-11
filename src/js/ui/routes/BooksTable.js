import { useEffect, useState } from 'react'
import axios from 'axios'
import BookRow from '../../components/table/BookRow'
import ErrorMessages from '../../components/messages/ErrorMessages'
import Header from '../../components/view/Header'
import BookForm from './BookForm'
import BookHeader from '../../components/table/BookHeader'
import useAuthentication from '../../shared/useAuthentication'
import { GET_BOOKS_URL } from './constans'
import '../../../css/table/BooksTable.css'

export default function BooksTable() {

	const [books, setBooks] = useState([])
	const [reloadData, setReloadData] = useState(false)
	const [editingBook, setEditingBook] = useState(null)
	const { token, authenticated, errors, setErrors } = useAuthentication()

	useEffect(() => {
		authenticated && axios
			.get(API_URL, { headers: { 'Authorization': 'Bearer ' + token } })
			.then(response => {
				setBooks(response.data)
				setReloadData(false)
			})
			.catch(() => setErrors([{ message: 'Internal error' }]))
	}, [authenticated, reloadData])


	async function onDeleteClick(book) {
		authenticated && await axios
			.delete(GET_BOOKS_URL + '/' + book.bookId, { headers: { 'Authorization': 'Bearer ' + token } })
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