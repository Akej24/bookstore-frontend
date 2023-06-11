
import SubmitButton from '../buttons/SubmitButton'

export default function BookRow({ book, addToCartClick, onEditClick, onDeleteClick }) {
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