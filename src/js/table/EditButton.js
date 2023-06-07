import React from 'react';

export default function EditButton({ value, onEditClick }) {
    return (
        <button value={value.bookId} onClick={onEditClick}>Edit</button>
    )
}