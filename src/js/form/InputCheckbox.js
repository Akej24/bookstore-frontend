export default function InputCheckbox({ label, name, checked, onChange }) {
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