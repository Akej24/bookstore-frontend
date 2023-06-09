import '../../css/form/Messages.css';

export default function ErrorMessage({ errors }) {
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