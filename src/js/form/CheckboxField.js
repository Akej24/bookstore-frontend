import '../../css/form/CheckboxField.css'

export default function CheckboxField({ label, name, checked, onChange }) {
    return (
        <label htmlFor={name} className="inputBox">
            <span>{label}</span>
            <input 
                type="checkbox" 
                name={name} 
                checked={checked} 
                onChange={onChange} />
        </label>
    );
}