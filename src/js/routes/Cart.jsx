import { useEffect, useState } from 'react'
import axios from 'axios'
import { ErrorMessages } from '../components/Messages'
import { CHECKOUT_CART_URL, DECREASE_CART_PRODUCT_AMOUNT_URL, GET_CART_URL, INCREASE_CART_PRODUCT_AMOUNT_URL } from '../shared/constans'
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
            .get(GET_CART_URL, { headers: { 'Authorization': 'Bearer ' + token } })
            .then(response => {
                setCart(response.data)
                setReloadData(false)
            })
            .catch(() => setErrors([{ message: 'Internal error' }]))
    }, [authenticated, reloadData])

    async function onDecreaseClick(bookId) {
        authenticated && await axios
            .patch(DECREASE_CART_PRODUCT_AMOUNT_URL, { 'bookId': bookId }, { headers: { 'Authorization': 'Bearer ' + token } })
        setSuccess('')
        setReloadData(true)
    }

    async function onIncreaseClick(bookId) {
        authenticated && await axios
            .patch(INCREASE_CART_PRODUCT_AMOUNT_URL, { 'bookId': bookId }, { headers: { 'Authorization': 'Bearer ' + token } })
            setSuccess('')
        setReloadData(true)
    }

    async function onCheckoutClick() {
        setSuccess('')
        authenticated && await axios
            .post(CHECKOUT_CART_URL, null, { headers: { 'Authorization': 'Bearer ' + token } })
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