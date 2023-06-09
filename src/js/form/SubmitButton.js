export default function SubmitButton({ onSubmit }) {
    return (
        <input
            type="submit"
            className="buttonBox"
            onClick={(e) => onSubmit(e)}
            value="Send" 
        />
    );
}