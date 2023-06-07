import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../ui/Nav";
import BookRow from './BookRow';
import "../../css/BooksTable.css";

export default function BooksTable() {

	const [books, setBooks] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8080/api/v1/books")
			.then(response => setBooks(response.data))
			.catch(error => console.log(error));
	}, []);

	async function onDeleteClick(bookId){
		await axios.delete("http://localhost:8080/books/" + bookId);
	}

	async function onEditClick(){
	}

	return (
		<>
			<Nav />
			<div id="table">
				<h1>Books table</h1>
				<table class="books-table">

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
		</>
	);
}