import '../../css/form/Buttons.css'

export default function ResetButton({ onReset, value }) {
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