import '../../css/components/Messages.css';

export function ErrorMessages({ errors }) {
    return (
        errors && (
            <div className="messages">
                {errors.map((error, index) => (
                    <div className="message" id="error-message" key={index}>
                        {error.message}
                    </div>
                ))}
            </div>
        )
    );
}

export function SuccessMessage({ success }) {
    return (
        success && (
            <div className="message" id="success-message">
                {success}
            </div>
        )
    );
}