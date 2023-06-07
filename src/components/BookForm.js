import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav';
import SuccessMessage from './form/SuccessMessage';
import ErrorMessages from './form/ErrorMessages';
import CheckboxField from './form/CheckboxField';
import InputField from './form/InputField';
import '../css/form/Form.css';

export default function BookForm() {

    const bookInitialState = {
        bookTitle: "",
        bookAuthor: "",
        releaseDate: "",
        numberOfPages: 0,
        availabilityStatus: false,
        availablePieces: 0,
        bookPrice: 0
    }
    const [book, setBook] = useState(bookInitialState)
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState('')
    const { bookTitle, bookAuthor, releaseDate, numberOfPages, availabilityStatus, availablePieces, bookPrice } = book

    function onInputChange(e){
        const { name, value, type, checked } = e.target
        setBook({
            ...book,
            [name]: type === "checkbox" ? checked : (type === "number" ? parseFloat(value) : value)
        })
    }

    async function onSubmit(e){
        e.preventDefault();
        setErrors(null);
        await axios
            .post("http://localhost:8080/api/v1/books", book)
            .then(setSuccess("Successively added book"))
            .catch(error => {
                setSuccess("")
                setErrors(error.response.data.errors);
            })
    }

    async function onReset(e){
        setBook(bookInitialState)
    }

    return (
        <>
            <Nav />
            <div className="submission-form">
                <form
                    onSubmit={(e) => onSubmit(e)}
                    onReset={(e) => onReset(e)}>
                    <h1><span>Book form</span></h1>
                    <InputField
                        label="Title"
                        type="text"
                        placeholder="Enter title"
                        name="bookTitle"
                        value={bookTitle}
                        onChange={onInputChange}
                    />
                    <InputField
                        label="Author"
                        type="text"
                        placeholder="Enter author"
                        name="bookAuthor"
                        value={bookAuthor}
                        onChange={onInputChange}
                    />
                    <InputField
                        label="Release date"
                        type="date"
                        placeholder="Enter release date"
                        name="releaseDate"
                        value={releaseDate}
                        onChange={onInputChange}
                    />
                    <InputField
                        label="Number of pages"
                        type="number"
                        placeholder="Enter number of pages"
                        name="numberOfPages"
                        value={numberOfPages}
                        onChange={onInputChange}
                    />
                    <CheckboxField
                        label="Status"
                        name="availabilityStatus"
                        checked={availabilityStatus}
                        onChange={onInputChange}
                    />
                    <br />
                    <br />
                    <InputField
                        label="Available pieces"
                        type="number"
                        name="availablePieces"
                        placeholder="Enter available pieces"
                        value={availablePieces}
                        onChange={onInputChange}
                    />
                    <InputField
                        label="Price"
                        type="number"
                        name="bookPrice"
                        placeholder="Enter price"
                        value={bookPrice}
                        onChange={onInputChange}
                    />
                    <input type="submit" className="buttonBox" value="Send" />
                    <input type="reset" className="buttonBox" value="Reset" />
                    <SuccessMessage success={success} />
                    <ErrorMessages errors={errors} />
                </form>
            </div>
        </>
    );
}