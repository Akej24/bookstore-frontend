import { useEffect, useState } from 'react'
import axios from 'axios'

import { ErrorMessages } from '../components/Messages'
import { cartUrl, authHeader, checkoutCartUrl } from '../shared/constans'
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
            .then(response => {
                setCart(response.data)
                setReloadData(false)
            })
            .catch(() => setErrors([{ message: 'Internal error' }]))
    }, [authenticated, reloadData])

    async function onDecreaseClick(bookId) {
        authenticated && await axios
            .patch(cartUrl('/product/decrease'), { 'bookId': bookId }, authHeader(token))
        setSuccess('')
        setReloadData(true)
    }

    async function onIncreaseClick(bookId) {
        authenticated && await axios
            .patch(cartUrl('/product/increase'), { 'bookId': bookId }, authHeader(token))
            setSuccess('')
        setReloadData(true)
    }

    async function onCheckoutClick() {
        setSuccess('')
        authenticated && await axios
            .post(checkoutCartUrl(''), null, authHeader(token))
            .then( () => setSuccess('Succcessively checked out'))
            .catch( error => setErrors(error.response.data.errors))
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
                            />
                        )}
                        <div className="cart-summary-and-checkout">
                            <div className="cart-summary">
                                <SummaryLine content='Total price: ' value={cart.totalPrice + ' zł'} />
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