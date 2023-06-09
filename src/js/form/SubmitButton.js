import '../../css/form/Buttons.css'

export default function SubmitButton({ onSubmit, value }) {
    return (
        <div className="button-div">
            <input
                className="button"
                id="submit-button"
                type="submit"
                onClick={(e) => onSubmit(e)}
                value={value}
            />
        </div>
    );
}