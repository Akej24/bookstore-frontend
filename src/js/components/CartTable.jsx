import { SubmitButton } from './Buttons'

export default function CartTable({ cartLines, onDecreaseClick, onIncreaseClick, onDeleteClick }) {
    return (
        <div className="table-div">
            <table>
                <CartHeader />
                <tbody className="cart-table-tbody">
                    {cartLines.map(cartLine => (
                        <CartRow
                            key={cartLine.bookId}
                            cartLine={cartLine}
                            onDecreaseClick={onDecreaseClick}
                            onIncreaseClick={onIncreaseClick}
                            onDeleteClick={onDeleteClick}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function CartHeader() {
    return (
        <thead className="cart-table-thead">
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Decrease</th>
                <th>Amount</th>
                <th>Increase</th>
                <th>Delete</th>
            </tr>
        </thead>
    )
}

function CartRow({ cartLine, onDecreaseClick, onIncreaseClick, onDeleteClick }) {
    const { bookId, bookTitle, bookAuthor, bookPrice, booksAmount } = cartLine
    return (
        <tr key={bookId}>
            <td>{bookTitle}</td>
            <td>{bookAuthor}</td>
            <td>{bookPrice} zł</td>
            <td><SubmitButton onSubmit={() => onDecreaseClick(cartLine.bookId)} value='Decrease' /></td>
            <td>{booksAmount}</td>
            <td><SubmitButton onSubmit={() => onIncreaseClick(cartLine.bookId)} value='Increase' /></td>
            <td><SubmitButton onSubmit={() => onDeleteClick(cartLine.bookId)} value='Delete' /></td>
        </tr>
    )
}