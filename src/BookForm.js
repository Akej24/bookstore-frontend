import React, { useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import "./css/Form.css";

export default function BookForm() {

  const [book, setBook] = useState({
    title: "",
    author: "",
    releaseDate: "",
    numberOfPages: 0,
    status: false,
    availablePieces: 0,
    price: 0
  })

  const { title, author, releaseDate, numberOfPages, status, availablePieces, price } = book;

  const onInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setBook({
      ...book,
      [name]: type === "checkbox" ? checked : value
      //[e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/books", book);
  }

  return (
    <>
      <Nav />
      <div class="submission-form">
        <form onSubmit={(e) => onSubmit(e)}>

          <h1><span>Book form</span></h1>

          <label htmlFor="title" class="inputBox">
            <span>Title</span>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => onInputChange(e)} />
          </label>

          <label htmlFor="author" class="inputBox">
            <span>Author</span>
            <input
              type="text"
              name="author"
              placeholder="Enter author"
              value={author}
              onChange={(e) => onInputChange(e)} />
          </label>

          <label htmlFor="releaseDate" class="inputBox">
            <span>Release date</span>
            <input
              type="date"
              name="releaseDate"
              placeholder="Enter release date "
              value={releaseDate}
              onChange={(e) => onInputChange(e)} />
          </label>

          <label htmlFor="numberOfPages" class="inputBox">
            <span>Number of pages</span>
            <input
              type="number"
              name="numberOfPages"
              placeholder="Enter number of pages"
              value={numberOfPages}
              onChange={(e) => onInputChange(e)} />
          </label>

          <label htmlFor="status" class="inputBox">
            <span>Status</span>
            <input
              type="checkbox"
              name="status"
              checked={status}
              onChange={(e) => onInputChange(e)} />
          </label>

          <br /><br />

          <label htmlFor="availablePieces" class="inputBox">
            <span>Available pieces</span>
            <input
              type="number"
              name="availablePieces"
              placeholder="Enter available pieces"
              value={availablePieces}
              onChange={(e) => onInputChange(e)} />
          </label>

          <label htmlFor="price" class="inputBox">
            <span>Price</span>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={price}
              onChange={(e) => onInputChange(e)} />
          </label>

          <input type="submit" class="buttonBox" value="Send" />
          <input type="reset" class="buttonBox" value="Reset" />

        </form>
      </div>
    </>
  );
}
