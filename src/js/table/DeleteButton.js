import React from 'react';

export default function DeleteButton({ value, onDeleteClick }) {
    return (
        <button onClick={() => onDeleteClick(value.bookId)}>Delete</button>
    )
}