export default function SummaryLine({ className, content, value }) {
    return (
        <div className={className}>
            {content}
            <span className="order-summary-data">
                {value}
            </span>
        </div>
    );
}
