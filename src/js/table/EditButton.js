import '../../css/table/EditButton.css';

export default function EditButton({ value, onEditClick }) {
    return (
        <button 
            className="edit" 
            value={value.bookId} 
            onClick={onEditClick}
        >Edit</button>
    )
}