import '../../../css/form/Messages.css'

export default function SuccessMessage({ success }) {
    return (
        success && (
            <div className="message" id="success-message">
                {success}
            </div>
        )
    );
}