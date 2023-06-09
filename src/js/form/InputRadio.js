import React from 'react';

export default function InputRadio({ label, name, value, checked, onChange }) {
    return (
        <label htmlFor={value} className="inputRadio">
            <span>{label}</span>
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
        </label>
    );
}