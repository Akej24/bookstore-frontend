import { useEffect, useState } from 'react'
import axios from 'axios'

import { ErrorMessages } from '../components/Messages'
import { cartUrl, authHeader, checkoutCartUrl } from '../shared/constants'
import { SubmitButton } from '../components/Buttons'
import { SuccessMessage } from '../components/Messages'
import SummaryLine from '../components/SummaryLine'
import CartTable from '../components/CartTable'
import useAuthentication from '../shared/useAuthentication'
import Header from '../components/Header'

import '../../css/routes/Cart.css'
import '../../css/components/Table.css'

export default function Cart() {
    const [cart, setCart] = useState([])
    const [reloadData, setReloadData] = useState(false)
    const [success, setSuccess] = useState('')
    const { token, authenticated, errors, setErrors } = useAuthentication()

    useEffect(() => {
        authenticated && axios
            .get(cartUrl(''), authHeader(token))
            .then(response => setCart(response.data), setReloadData(false))
            .catch(error => setErrors(error.response?.data?.errors || 'Internal error'))
    }, [authenticated, reloadData])

    async function onDecreaseClick(bookId) {
        authenticated && await axios
            .patch(cartUrl('/product/decrease'), { 'bookId': bookId }, authHeader(token))
            .then(() => setErrors([]), setSuccess(''))
            .catch(error => setErrors(error.response?.data?.errors || 'Internal error'))
            .finally(() => setReloadData(true))
    }

    async function onIncreaseClick(bookId) {
        authenticated && await axios
            .patch(cartUrl('/product/increase'), { 'bookId': bookId }, authHeader(token))
            .then(() => setErrors([]), setSuccess(''))
            .catch(error => setErrors(error.response?.data?.errors || 'Internal error'))
            .finally(() => setReloadData(true))
    }

    async function onDeleteClick(bookId) {
        authenticated && await axios
            .delete(cartUrl('/product/' + bookId), authHeader(token))
            .then(() => setErrors([]), setSuccess(''))
            .catch(error => setErrors(error.response?.data?.errors || 'Internal error'))
            .finally(() => setReloadData(true), cart.cartLines.length === 1 && setCart([]))
    }

    async function onCheckoutClick() {
        authenticated && await axios
            .post(checkoutCartUrl(''), null, authHeader(token))
            .then(() => setSuccess('Succcessively checked out'))
            .catch(error => setErrors(error.response?.data?.errors || 'Internal error'))
    }

    return (
        <>
            {!authenticated && <div className="errorPage"><ErrorMessages errors={errors} /></div>}
            {authenticated && (
                <>
                    <div className="cart">
                        <Header content="Cart" />
                        {cart.cartLines && (
                            <CartTable
                                cartLines={cart.cartLines}
                                onDecreaseClick={onDecreaseClick}
                                onIncreaseClick={onIncreaseClick}
                                onDeleteClick={onDeleteClick}
                            />
                        )}
                        <div className="cart-summary-and-checkout">
                            <div className="cart-summary">
                                <SummaryLine content='Total price: ' value={cart.totalPrice ? cart.totalPrice + ' zł' : '0 zł'} />
                            </div>
                            <div className="cart-checkout">
                                <SubmitButton onSubmit={onCheckoutClick} value='Checkout' />
                                <SuccessMessage success={success} />
                                <ErrorMessages errors={errors} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}