import React from 'react';
import '../../css/form/ErrorMessages.css';

export default function ErrorMessage({ errors }) {
    return (
        errors && (
            <div className="errors">
                {errors.map((error, index) => (
                    <div className="error" key={index}>
                        {error.message}
                    </div>
                ))}
            </div>
        )
    );
}