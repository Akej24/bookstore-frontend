import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import "./css/BooksTable.css";

export default function BooksTable() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/books").then((response) => { setBooks(response.data); });
  }, []);

  const onDeleteClick = async bookId=> {
    await axios.delete("http://localhost:8080/books/" + bookId);
  }

  const onEditClick = async () => {
    
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
          {books.map((val, key) => {
            console.log(val);
            return (
              <tr key={key}>
                <td>{val.bookTitle}</td>
                <td>{val.bookAuthor}</td>
                <td>{val.releaseDate}</td>
                <td>{val.numberOfPages}</td>
                <td>{val.status ? "available" : "not available"}</td>
                <td>{val.availablePieces}</td>
                <td>{val.bookPrice} zł</td>
                <td><button>-</button><button>+</button></td>
                <td><button value={val.bookId} onClick={onEditClick}>Edit</button></td>
                <td><button onClick={() => onDeleteClick(val.bookId)}>Delete</button></td>
              </tr>
            )
          })}
        </table>
      </div>
    </>
  );
}