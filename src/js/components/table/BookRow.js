
import SubmitButton from '../buttons/SubmitButton'

export default function BookRow({ value, onEditClick, onDeleteClick }) {
    return (
        <tr key={value.bookId}>
            <td>{value.bookTitle}</td>
            <td>{value.bookAuthor}</td>
            <td>{value.releaseDate}</td>
            <td>{value.numberOfPages}</td>
            <td>{value.availablePieces < 1 ? 'none' : value.availablePieces}</td>
            <td>{value.bookPrice} zł</td>
            <td><SubmitButton onSubmit={onEditClick} value={'Add'} /></td>
            <td><SubmitButton onSubmit={onEditClick} value={'Edit'} /></td>
            <td><SubmitButton onSubmit={onDeleteClick} value={'Delete'} /></td>
        </tr>
    )
}