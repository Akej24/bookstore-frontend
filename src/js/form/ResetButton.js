import React from 'react';

export default function ResetButton({ onReset }) {
    return (
        <input
            type="reset"
            className="buttonBox"
            onClick={(e) => onReset(e)}
            value="Reset"
        />
    );
}