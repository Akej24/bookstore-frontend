import { useEffect, useState } from 'react'
import axios from 'axios'

import { ErrorMessages, SuccessMessage } from '../components/Messages'
import { booksUrl, cartUrl, authHeader, sortOptionsInitialState } from '../shared/constants'
import { PaginationButtons } from '../components/Buttons'
import BooksTable from '../components/BooksTable'
import useAuthentication from '../shared/useAuthentication'
import BookForm from './BookForm'
import Header from '../components/Header'

import '../../css/components/Table.css'

export default function Books() {
	const [books, setBooks] = useState([])
	const [editingBook, setEditingBook] = useState(null)
	const [success, setSuccess] = useState('')
	const { token, authenticated, errors, setErrors, isAdmin } = useAuthentication()
	const [reloadData, setReloadData] = useState(false)
	const [currentPage, setCurrentPage] = useState(0)
	const [sortOptions, setSortOptions] = useState(sortOptionsInitialState)
	const { sortBy, sortDirection } = sortOptions

	useEffect(() => {
		authenticated && axios
			.get(booksUrl(`?page=${currentPage}&sortBy=${sortBy}&sortDirection=${sortDirection}`), authHeader(token))
			.then(response => setBooks(response.data), setReloadData(false))
			.catch(error => setErrors(error.response?.data?.errors || 'Internal error'))
	}, [authenticated, reloadData, currentPage, sortOptions])

	function handleSort(sortBy) {
		const toggleSortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
		setSortOptions({ sortBy, sortDirection: toggleSortDirection })
	}

	function handlePageChange(page) {
		setCurrentPage(page)
	}

	async function onEditClick(bookToEdit) {
		setEditingBook(bookToEdit)
	}

	async function onDeleteClick(book) {
		authenticated && await axios
			.delete(booksUrl(`/${book.bookId}`), authHeader(token))
			.then(() => setSuccess('Successfully deleted'), setErrors([]))
			.catch(error => setErrors(error.response?.data?.errors || 'Internal error'), setSuccess(''))
			.finally(() => setReloadData(true))
	}

	async function addToCartClick(book) {
		authenticated && await axios
			.post(cartUrl('/product'), { 'bookId': book.bookId }, authHeader(token))
			.then(() => setSuccess('Successfully added'), setErrors([]))
			.catch(error => setErrors(error.response?.data?.errors || 'Internal error'), setSuccess(''))
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
									onDeleteClick={onDeleteClick}
									handleSort={handleSort}
									isAdmin={isAdmin}
								/>
							</div>
							<div className="messages-div">
								<SuccessMessage success={success} />
								<ErrorMessages errors={errors} />
							</div>
							<PaginationButtons currentPage={currentPage} handlePageChange={handlePageChange} />
						</>
					}
				</>
			)}
		</>
	)
}