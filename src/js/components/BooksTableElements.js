import { SubmitButton } from './Buttons'

export function BookHeader() {
    return (
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Release date</th>
            <th>Pages</th>
            <th>Availability</th>
            <th>Price</th>
            <th>Add to cart</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
    )
}

export  function BookRow({ book, addToCartClick, onEditClick, onDeleteClick }) {
    return (
        <tr key={book.bookId}>
            <td>{book.bookTitle}</td>
            <td>{book.bookAuthor}</td>
            <td>{book.releaseDate}</td>
            <td>{book.numberOfPages}</td>
            <td>{book.availablePieces < 1 ? 'none' : book.availablePieces}</td>
            <td>{book.bookPrice} zł</td>
            <td><SubmitButton onSubmit={() => addToCartClick(book)} value='Add' /></td>
            <td><SubmitButton onSubmit={() => onEditClick(book)} value='Edit' /></td>
            <td><SubmitButton onSubmit={() => onDeleteClick(book)} value='Delete' /></td>
        </tr>
    )
}