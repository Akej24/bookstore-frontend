import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../ui/Nav';
import BookRow from './BookRow';
import ErrorMessages from '../form/ErrorMessages';
import JwtCookie from '../shared/JwtCookie'
import '../../css/table/BooksTable.css';

export default function BooksTable() {

	const [books, setBooks] = useState([]);
	const [redirectToHomePage, setRedirectToHomePage] = useState(false);
	const errors = [{ message: 'Cannot load the page, because you are not logged in' }]

	useEffect(() => {
		let token = '';
		try {
			token = JwtCookie.extractJwt();
		} catch (error) {
			console.log('fdfd')
			setRedirectToHomePage(true)
		}
		axios
			.get("http://localhost:8080/api/v1/books", { headers: { 'Authorization': 'Bearer ' + token } })
			.then(response => setBooks(response.data))
			.catch(error => {

				console.log('fdfd222')
				setRedirectToHomePage(true)
			})
	}, []);


	async function onDeleteClick(bookId) {
		await axios.delete("http://localhost:8080/api/v1/books/" + bookId);
	}

	async function onEditClick() {
	}

	return (
		<>
			{redirectToHomePage && <><Nav /><div class="errorPage"><ErrorMessages errors={errors} /></div></>}
			{!redirectToHomePage && (
				<div id="table">
					<h1>Books table</h1>
					<table className="books-table">
						<tr>
							<th>Title</th>
							<th>Author</th>
							<th>Release date</th>
							<th>Pages</th>
							<th>Status</th>
							<th>Available pieces</th>
							<th>Price</th>
							<th>Add to cart</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
						{books.map((value, key) =>
							<BookRow
								key={key}
								value={value}
								onEditClick={onEditClick}
								onDeleteClick={onDeleteClick}
							/>
						)}
					</table>
				</div>
			)}
		</>
	)
}