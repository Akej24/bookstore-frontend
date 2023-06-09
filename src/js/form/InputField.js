import '../../css/form/InputField.css'

export default function InputField({ label, type, placeholder, name, value, onChange }) {
    return (
        <label htmlFor={name} className="inputBox">
            <span>{label}</span>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
        </label>
    );
}