import React from 'react';
import '../../css/table/DeleteButton.css';

export default function DeleteButton({ value, onDeleteClick }) {
    return (
        <button 
            className="delete" 
            onClick={() => onDeleteClick(value.bookId)
        }>Delete</button>
    )
}