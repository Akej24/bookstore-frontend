import { useState, useEffect } from 'react'
import axios from 'axios'

import { SuccessMessage, ErrorMessages } from '../components/Messages'
import { SubmitButton, ResetButton } from '../components/Buttons'
import { InputField, InputCheckbox } from '../components/Inputs'
import { bookEmptyState, booksUrl, authHeader } from '../shared/constants'
import Header from '../components/Header'
import useAuthentication from '../shared/useAuthentication'

import '../../css/components/Form.css'

export default function BookForm({ variant, bookInitialState }) {
    const [book, setBook] = useState(bookInitialState || bookEmptyState)
    const [success, setSuccess] = useState('')
    const { token, authenticated, errors, setErrors, isAdmin } = useAuthentication()
    const { bookId, bookTitle, bookAuthor, releaseDate, numberOfPages, availabilityStatus, availablePieces, bookPrice } = book

    function onInputChange(e) {
        const { name, value, type, checked } = e.target
        setBook(prevBook => ({
            ...prevBook,
            [name]: type === "checkbox" ? checked : (type === "number" ? parseFloat(value) : value)
        }))
    }

    async function onSubmit(e) {
        e.preventDefault()
        try {
            if (variant === 'create') {
                await axios.post(booksUrl(''), book, authHeader(token))
            } else if (variant === 'edit') {
                await axios.put(booksUrl(`/${book.bookId}`), book, authHeader(token))
            }
            setSuccess(`Successfully ${variant === 'create' ? 'added' : 'edited'}`)
            setErrors([])
        } catch (error) {
            setSuccess('')
            setErrors(error.response?.data?.errors || 'Internal error')
        }
    }

    function onReset(e) {
        setErrors([])
        setSuccess('')
        setBook(bookInitialState || bookEmptyState)
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
                        <InputCheckbox
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
                            <SubmitButton onSubmit={onSubmit} value="Submit" enabled={isAdmin} />
                            <ResetButton onReset={onReset} value="Reset" />
                        </div>
                        <SuccessMessage success={success} />
                        <ErrorMessages errors={errors} />
                    </form>
                </div>
            )}
        </>
    )
}