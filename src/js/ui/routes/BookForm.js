import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuccessMessage from '../../components/messages/SuccessMessage';
import ErrorMessages from '../../components/messages/ErrorMessages';
import SubmitButton from '../../components/buttons/SubmitButton';
import ResetButton from '../../components/buttons/ResetButton';
import CheckboxField from '../../components/form/InputCheckbox';
import InputField from '../../components/form/InputField';
import Header from '../../components/view/Header';
import { extractJwtFromCookie } from '../../shared/JwtCookie'
import '../../../css/form/Form.css';

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
    const [success, setSuccess] = useState('')
    const [token, setToken] = useState('')
    const [authenticated, setAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const { bookTitle, bookAuthor, releaseDate, numberOfPages, availabilityStatus, availablePieces, bookPrice } = book

    useEffect(() => {
        const extractedToken = extractJwtFromCookie();
        setToken(extractedToken);
        setAuthenticated(extractedToken !== '');
    }, []);

    useEffect(() => {
        setErrors(authenticated ? [] : [{ message: 'Cannot load the page because you are not logged in' }]);
    }, [authenticated]);

    function onInputChange(e) {
        const { name, value, type, checked } = e.target
        setBook({
            ...book,
            [name]: type === "checkbox" ? checked : (type === "number" ? parseFloat(value) : value)
        })
    }

    async function onSubmit(e) {
        e.preventDefault();
        authenticated && await axios
            .post("http://localhost:8080/api/v1/books", book, { headers: { 'Authorization': 'Bearer ' + token } })
            .then(() => {
                setSuccess("Successively added book")
                setErrors([])
            })
            .catch(error => {
                setSuccess('')
                setErrors(error.response.data.errors)
            })
    }

    function onReset(e) {
        setBook(bookInitialState)
    }

    return (
        <>
            {!authenticated && <div className="errorPage"><ErrorMessages errors={errors} /></div>}
            {authenticated && (
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
            )}
        </>
    );
}