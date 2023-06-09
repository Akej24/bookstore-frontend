import '../../css/form/SuccessMessage.css'

export default function SuccessMessage({ success }) {
    return (
        success && (
            <div className="success">{success}</div>
        )
    );
}