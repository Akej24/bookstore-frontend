import { SortButton, SubmitButton } from './Buttons'

function BookHeader({ handleSort }) {
    return (
        <thead className="books-table-thead">
            <tr>
                <th>
                    Title <SortButton handleSort={handleSort} value='bookTitle' />
                </th>
                <th>
                    Author <SortButton handleSort={handleSort} value='bookAuthor' />
                </th>
                <th>
                    Release date <SortButton handleSort={handleSort} value='releaseDate' />
                </th>
                <th>
                    Pages <SortButton handleSort={handleSort} value='numberOfPages' />
                </th>
                <th>
                    Availability <SortButton handleSort={handleSort} value='availabilityStatus' />
                </th>
                <th>
                    Price <SortButton handleSort={handleSort} value='bookPrice' />
                </th>
                <th>
                    Add to cart
                </th>
                <th>
                    Edit
                </th>
                <th>
                    Delete
                </th>
            </tr>
        </thead>
    )
}

function BookRow({ book, addToCartClick, onEditClick, onDeleteClick }) {
    return (
        <tr key={book.bookId}>
            <td>{book.bookTitle}</td>
            <td>{book.bookAuthor}</td>
            <td>{book.releaseDate}</td>
            <td>{book.numberOfPages}</td>
            <td>{book.availablePieces < 1 ? 'none' : book.availablePieces}</td>
            <td>{book.bookPrice} zł</td>
            <td><SubmitButton onSubmit={() => addToCartClick(book)} value='Add' /></td>
            <td><SubmitButton onSubmit={() => onEditClick(book)} value='Edit' /></td>
            <td><SubmitButton onSubmit={() => onDeleteClick(book)} value='Delete' /></td>
        </tr>
    )
}

export default function BooksTable({ books, addToCartClick, onEditClick, onDeleteClick, handleSort }) {
    return (
        <table>
            <BookHeader handleSort={handleSort} />
            <tbody className="books-table-tbody">
                {books.map((book) => (
                    <BookRow
                        book={book}
                        addToCartClick={addToCartClick}
                        onEditClick={onEditClick}
                        onDeleteClick={onDeleteClick}
                    />
                ))}
            </tbody>
        </table>
    )
}