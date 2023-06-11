export function InputField({ label, type, placeholder, name, value, onChange }) {
    return (
        <div className="input-field-div">
            <label htmlFor={name} className="input-field-label">
                <span className="input-field-span">
                    {label}
                </span>
                <input
                    className="input-field"
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </label>
        </div>
    );
}

export function InputRadio({ label, name, value, checked, onChange }) {
    return (
        <div className="input-radio-div">
            <label htmlFor={value} className="input-radio-label">
                <span className="input-radio-span">
                    {label}
                </span>
                <input
                    className="input-radio"
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                />
            </label>
        </div>
    );
}

export function InputCheckbox({ label, name, checked, onChange }) {
    return (
        <div className="input-checkbox-div">
            <label htmlFor={name} className="input-checkbox-label">
                <span className="input-checkbox-span">
                    {label}
                </span>
                <input
                    className="input-checkbox"
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                />
            </label>
        </div>
    );
}
