import React from 'react';
import '../../css/form/SuccessMessage.css'

export default function BookForm({ success }) {
    return (
        success && (
            <div className="success">{success}</div>
        )
    );
}