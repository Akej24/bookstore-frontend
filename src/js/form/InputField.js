export default function InputField({ label, type, placeholder, name, value, onChange }) {
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