import '../../css/components/Buttons.css'

export function ResetButton({ onReset, value }) {
    return (
        <div className="button-div">
            <input
                className="button"
                id="reset-button"
                type="reset"
                onClick={(e) => onReset(e)}
                value={value}
            />
        </div>
    );
}

export function SubmitButton({ onSubmit, value }) {
    return (
        <div className="button-div">
            <input
                className="button"
                id="submit-button"
                type="submit"
                onClick={onSubmit}
                value={value}
            />
        </div>
    );
}