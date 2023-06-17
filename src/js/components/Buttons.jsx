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

export function SubmitButton({ onSubmit, value, enabled=true }) {
    return (
        <div className="button-div">
            <input
                className={enabled ? 'button' : 'disabled-button'}
                id={enabled ? 'submit-button' : ''}
                type="submit"
                onClick={onSubmit}
                value={enabled ? value : 'Disabled'}
            />
        </div>
    )
}

export function SortButton({ handleSort, value }) {
    return (
        <div className="sort-button-div">
            <input
                className="sort-button"
                type="submit"
                onClick={() => handleSort(value)}
                value='Sort'
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