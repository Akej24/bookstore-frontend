import { useEffect, useState } from 'react'
import axios from 'axios'
import { ErrorMessages } from '../components/Messages'
import { GET_CHECKOUT_CART_URL, ADD_PAYMENT_URL, ADD_ADDRESS_URL, ORDER_CHECKOUT_CART_URL } from '../shared/constans'
import { SubmitButton } from '../components/Buttons'
import { SuccessMessage } from '../components/Messages'
import { InputField } from '../components/Inputs'
import SummaryLine from '../components/SummaryLine'
import useAuthentication from '../shared/useAuthentication'
import Header from '../components/Header'
import '../../css/routes/CheckoutCart.css'

export default function CheckoutCart() {

    const [summaryPaymentMethod, setSummaryPaymentMethod] = useState('')
    const [summaryAddress, setSummaryAddress] = useState([])

    const [paymentMethod, setPaymentMethod] = useState('')
    const [address, setAddress] = useState([])

    const [reloadData, setReloadData] = useState(false)
    const [success, setSuccess] = useState('')
    const { token, authenticated, errors, setErrors } = useAuthentication()
    const { firstName, lastName, phoneNumber, street, streetNumber, zipCode, city } = address;

    function onPaymentInputChange(e) {
        const { value } = e.target
        setPaymentMethod(value)
    }

    function onAddressInputChange(e) {
        const { name, value } = e.target
        setAddress({
            ...address,
            [name]: value
        })
    }

    useEffect(() => {
        authenticated && axios
            .get(GET_CHECKOUT_CART_URL, { headers: { 'Authorization': 'Bearer ' + token } })
            .then(response => {
                setSummaryPaymentMethod(response.data.paymentMethod)
                setSummaryAddress(response.data.address)
                setReloadData(false)
            })
            .catch(() => setErrors([{ message: 'Internal error' }]))
    }, [authenticated, reloadData])

    async function onAddPaymentClick() {
        setSuccess('')
        authenticated && await axios
            .patch(ADD_PAYMENT_URL, {'paymentMethod': paymentMethod}, { headers: { 'Authorization': 'Bearer ' + token } })
            .then(() => setSuccess('Succcessively added payment method'))
            .catch(error => setErrors(error.response.data.errors))
    }

    async function onAddAddressClick() {
        setSuccess('')
        authenticated && await axios
            .patch(ADD_ADDRESS_URL, address, { headers: { 'Authorization': 'Bearer ' + token } })
            .then(() => setSuccess('Succcessively added address'))
            .catch(error => setErrors(error.response.data.errors))
    }

    async function onOrderClick() {
        setSuccess('')
        authenticated && await axios
            .post(ORDER_CHECKOUT_CART_URL, null, { headers: { 'Authorization': 'Bearer ' + token } })
            .then(() => setSuccess('Succcessively checked out'))
            .catch(error => setErrors(error.response.data.errors))
    }

    return (
        <>
            {!authenticated && <div className="errorPage"><ErrorMessages errors={errors} /></div>}
            {authenticated && (
                <>
                    <div className="checkout-cart">
                        <Header content="Checkout cart" />
                        <div className="checkout-cart-summary">
                            <SummaryLine content='First name: ' value={summaryAddress.firstName} />
                            <SummaryLine content='Lat name: ' value={summaryAddress.lastName} />
                            <SummaryLine content='Phone number: ' value={summaryAddress.phoneNumber} />
                            <SummaryLine content='Street: ' value={summaryAddress.street} />
                            <SummaryLine content='Street number: ' value={summaryAddress.streetNumber} />
                            <SummaryLine content='Zip code: ' value={summaryAddress.zipCode} />
                            <SummaryLine content='City: ' value={summaryAddress.city} />
                            <SummaryLine content='Payment method: ' value={summaryPaymentMethod} />
                        </div>
                        <div className="checkout-cart-payment">
                            <InputField
                                label='Payment method'
                                type='text'
                                placeholder='Enter payment'
                                name='paymentMethod'
                                value={paymentMethod}
                                onChange={onPaymentInputChange}
                            />
                            <SubmitButton onSubmit={onAddPaymentClick} value='Add payment' />
                            <SuccessMessage success={success} />
                            <ErrorMessages errors={errors} />
                        </div>
                        <div className="checkout-cart-address">
                            <InputField
                                label='First name'
                                type='text'
                                placeholder='Enter first name'
                                name='firstName'
                                value={firstName}
                                onChange={onAddressInputChange}
                            />
                            <InputField
                                label='Last name'
                                type='text'
                                placeholder='Enter last name'
                                name='lastName'
                                value={lastName}
                                onChange={onAddressInputChange}
                            />
                            <InputField
                                label='Phone number'
                                type='text'
                                placeholder='Enter phone number'
                                name='phoneNumber'
                                value={phoneNumber}
                                onChange={onAddressInputChange}
                            />
                            <InputField
                                label='Street'
                                type='text'
                                placeholder='Enter street'
                                name='street'
                                value={street}
                                onChange={onAddressInputChange}
                            />
                            <InputField
                                label='Street number'
                                type='number'
                                placeholder='Enter street number'
                                name='streetNumber'
                                value={streetNumber}
                                onChange={onAddressInputChange}
                            />
                            <InputField
                                label='Zip code'
                                type='text'
                                placeholder='Enter zip code'
                                name='zipCode'
                                value={zipCode}
                                onChange={onAddressInputChange}
                            />
                            <InputField
                                label='City'
                                type='text'
                                placeholder='Enter city'
                                name='city'
                                value={city}
                                onChange={onAddressInputChange}
                            />
                            <SubmitButton onSubmit={onAddAddressClick} value='Add address' />
                            <SuccessMessage success={success} />
                            <ErrorMessages errors={errors} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}