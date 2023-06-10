import { useEffect, useState } from 'react';
import axios from 'axios';
import BookRow from '../../components/table/BookRow';
import ErrorMessages from '../../components/messages/ErrorMessages';
import Header from '../../components/view/Header';
import BookHeader from '../../components/table/BookHeader'
import { extractJwtFromCookie } from '../../shared/JwtCookie'
import '../../../css/table/BooksTable.css';

export default function BooksTable() {

	const [books, setBooks] = useState([])
	const [token, setToken] = useState('')
	const [authenticated, setAuthenticated] = useState(false)
	const [errors, setErrors] = useState([])

	useEffect(() => {
		const extractedToken = extractJwtFromCookie();
		setToken(extractedToken);
		setAuthenticated(extractedToken !== '');
	}, []);

	useEffect(() => {
		setErrors(authenticated ? [] : [{ message: 'Cannot load the page because you are not logged in' }]);
	}, [authenticated]);

	useEffect(() => {
		authenticated && axios
			.get("http://localhost:8080/api/v1/books", { headers: { 'Authorization': 'Bearer ' + token } })
			.then(response => {
				console.log(response.data)
				setBooks(response.data)
			})
			.catch(error => setErrors([{ message: 'Internal error' }]))
	}, [authenticated]);


	async function onDeleteClick(bookId) {
		await axios.delete("http://localhost:8080/api/v1/books/" + bookId)
	}

	async function onEditClick() {
	}

	return (
		<>
			{!authenticated && <div className="errorPage"><ErrorMessages errors={errors} /></div>}
			{authenticated && (
				<div className="books-table">
					<Header content="Books table" />
					<table>
						<thead className="books-table-thead">
							<BookHeader />
						</thead>
						<tbody className="books-table-tbody">
							{books.map((book) =>
								<BookRow
									value={book}
									onEditClick={onEditClick}
									onDeleteClick={onDeleteClick}
								/>
							)}
						</tbody>
					</table>
				</div>
			)}
		</>
	)
}