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
    )
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
    )
}

export function PaginationButtons({ currentPage, handlePageChange }) {
    return (
        <div className="pagination-buttons">
            <input
                className="pagination-button"
                disabled={currentPage === 0}
                type="submit"
                onClick={() => handlePageChange(currentPage - 1)}
                value="Previous"
            />
            <span className="current-page">
                {currentPage + 1}
            </span>
            <input
                className="pagination-button"
                type="submit"
                onClick={() => handlePageChange(currentPage + 1)}
                value="Next"
            />
        </div>
    )
}