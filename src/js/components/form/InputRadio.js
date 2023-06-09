export default function InputRadio({ label, name, value, checked, onChange }) {
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