import EditButton from './EditButton'
import DeleteButton from './DeleteButton'
import '../../../css/table/BookRow.css'

export default function BookRow({ key, value, onEditClick, onDeleteClick }) {
    return (
        <tr key={key}>
          <td>{value.bookTitle}</td>
          <td>{value.bookAuthor}</td>
          <td>{value.releaseDate}</td>
          <td>{value.numberOfPages}</td>
          <td>{value.availabilityStatus ? "available" : "not available"}</td>
          <td>{value.availablePieces}</td>
          <td>{value.bookPrice} zł</td>
          <td><button>-</button><button>+</button></td>
          <td><EditButton value={value} onEditClick={onEditClick} /></td>
          <td><DeleteButton value={value} onDeleteClick={onDeleteClick} /></td>
        </tr>
    )
}