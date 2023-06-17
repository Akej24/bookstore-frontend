import '../../css/components/SummaryLine.css'

export default function SummaryLine({ content, value }) {
    return (
        <div className="summary-line">
            {content}
            <span className="summary-data">
                {value}
            </span>
        </div>
    )
}
