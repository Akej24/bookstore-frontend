import { SortButton, SubmitButton } from './Buttons'

export default function BooksTable({ books, addToCartClick, onEditClick, onDeleteClick, handleSort, isAdmin }) {
    return (
        <table>
            <BookHeader handleSort={handleSort} />
            <tbody className="books-table-tbody">
                {books.map((book) => (
                    <BookRow
                        key={book.bookId}
                        book={book}
                        addToCartClick={addToCartClick}
                        onEditClick={onEditClick}
                        onDeleteClick={onDeleteClick}
                        isAdmin={isAdmin}
                    />
                ))}
            </tbody>
        </table>
    )
}

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

function BookRow({ book, addToCartClick, onEditClick, onDeleteClick, isAdmin }) {
    const { bookId, bookTitle, bookAuthor, releaseDate, numberOfPages, availablePieces, bookPrice } = book
    return (
        <tr key={bookId}>
            <td>{bookTitle}</td>
            <td>{bookAuthor}</td>
            <td>{releaseDate}</td>
            <td>{numberOfPages}</td>
            <td>{availablePieces < 1 ? 'none' : availablePieces}</td>
            <td>{bookPrice} zł</td>
            <td><SubmitButton onSubmit={() => addToCartClick(book)} value='Add' enabled={true} /></td>
            <td><SubmitButton onSubmit={() => onEditClick(book)} value='Edit' enabled={isAdmin} /></td>
            <td><SubmitButton onSubmit={() => onDeleteClick(book)} value='Delete' enabled={isAdmin} /></td>
        </tr>
    )
}