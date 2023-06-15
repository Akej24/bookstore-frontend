import { useEffect, useState } from 'react'
import axios from 'axios'

import { ErrorMessages } from '../components/Messages'
import { booksUrl, cartUrl, authHeader } from '../shared/constans'
import { PaginationButtons } from '../components/Buttons'
import BooksTable from '../components/BooksTable'
import useAuthentication from '../shared/useAuthentication'
import BookForm from './BookForm'
import Header from '../components/Header'

import '../../css/components/Table.css'

export default function Books() {

	const [books, setBooks] = useState([])
	const [editingBook, setEditingBook] = useState(null)
	const [currentPage, setCurrentPage] = useState(0)
	const [reloadData, setReloadData] = useState(false)
	const { token, authenticated, errors, setErrors } = useAuthentication()

	useEffect(() => {
		authenticated && axios
			.get(booksUrl('?page=' + currentPage), authHeader(token))
			.then(response => {
				setBooks(response.data)
				setReloadData(false)
			})
			.catch(() => setErrors([{ message: 'Internal error' }]))
	}, [authenticated, reloadData, currentPage])


	async function onDeleteClick(book) {
		authenticated && await axios
			.delete(booksUrl('/') + book.bookId, authHeader(token))
		setReloadData(true)
	}

	async function onEditClick(book) {
		setEditingBook(book);
	}

	async function addToCartClick(book) {
		authenticated && await axios
			.post(cartUrl('/product'), { 'bookId': book.bookId }, authHeader(token))
	}

	function handlePageChange(page) {
		setCurrentPage(page)
	}

	return (
		<>
			{!authenticated && <div className="errorPage"><ErrorMessages errors={errors} /></div>}
			{authenticated && (
				<>
					{editingBook && <BookForm variant='edit' bookInitialState={editingBook} />}
					{!editingBook &&
						<>
							<div className="table-div">
								<Header content="Books table" />
								<BooksTable
									books={books}
									addToCartClick={addToCartClick}
									onEditClick={onEditClick}
									onDeleteClick={onDeleteClick} />
							</div>
							<PaginationButtons currentPage={currentPage} handlePageChange={handlePageChange} />
						</>
					}
				</>
			)}
		</>
	);
}