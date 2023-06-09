import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../ui/Nav';
import SuccessMessage from './SuccessMessage';
import ErrorMessages from './ErrorMessages';
import SubmitButton from './SubmitButton';
import ResetButton from './ResetButton';
import CheckboxField from './InputCheckbox';
import InputField from './InputField';
import Header from '../ui/Header';
import '../../css/form/Form.css';

export default function BookForm() {

    const bookInitialState = {
        bookTitle: '',
        bookAuthor: '',
        releaseDate: '',
        numberOfPages: 0,
        availabilityStatus: false,
        availablePieces: 0,
        bookPrice: 0
    }
    const [book, setBook] = useState(bookInitialState)
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState('')
    const { bookTitle, bookAuthor, releaseDate, numberOfPages, availabilityStatus, availablePieces, bookPrice } = book

    function onInputChange(e) {
        const { name, value, type, checked } = e.target
        setBook({
            ...book,
            [name]: type === "checkbox" ? checked : (type === "number" ? parseFloat(value) : value)
        })
    }

    async function onSubmit(e) {
        e.preventDefault();
        setErrors(null);
        await axios
            .post("http://localhost:8080/api/v1/books", book)
            .then(() => {
                setSuccess("Successively added book")
                setErrors([])
            })
            .catch(error => {
                setSuccess('')
                setErrors(error.response.data.errors);
            })
    }

    function onReset(e) {
        setBook(bookInitialState)
    }

    return (
        <div className="submission-form" id="book-form">
            <form>
                <Header content='Book form' />
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
                <div className="buttons-container">
                    <SubmitButton onSubmit={onSubmit} value="Submit" />
                    <ResetButton onReset={onReset} value="Reset" />
                </div>
                <SuccessMessage success={success} />
                <ErrorMessages errors={errors} />
            </form>
        </div>
    );
}