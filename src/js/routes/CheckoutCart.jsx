import { useEffect, useState } from 'react'
import axios from 'axios'

import { ErrorMessages } from '../components/Messages'
import { addressInitialState, authHeader, checkoutCartUrl, orderUrl } from '../shared/constants'
import { SubmitButton, ResetButton } from '../components/Buttons'
import { SuccessMessage } from '../components/Messages'
import { InputField, InputRadio } from '../components/Inputs'
import SummaryLine from '../components/SummaryLine'
import useAuthentication from '../shared/useAuthentication'
import Header from '../components/Header'

import '../../css/routes/CheckoutCart.css'
import '../../css/components/Form.css'

export default function CheckoutCart() {
    const [summaryPaymentMethod, setSummaryPaymentMethod] = useState('')
    const [summaryAddress, setSummaryAddress] = useState([])
    const [paymentMethod, setPaymentMethod] = useState('')
    const [address, setAddress] = useState(addressInitialState)
    const [reloadData, setReloadData] = useState(false)
    const [success, setSuccess] = useState('')
    const { token, authenticated, errors, setErrors } = useAuthentication()
    const { firstName, lastName, phoneNumber, street, streetNumber, zipCode, city } = address

    useEffect(() => {
        setReloadData(false)
        authenticated && axios
            .get(checkoutCartUrl(''), authHeader(token))
            .then(response => {
                setSummaryPaymentMethod(response.data.paymentMethod || '')
                setSummaryAddress(response.data.address || [])
            })
            .catch(error => setErrors(error.response?.data?.errors || 'Internal error'), setSuccess(''))
    }, [authenticated, reloadData])

    function onPaymentInputChange(e) {
        setPaymentMethod(e.target.value)
    }

    function onAddressInputChange(e) {
        const { name, value, type } = e.target
        setAddress(prevAddress => ({
            ...prevAddress,
            [name]: type === 'number' ? Number(value) : value
        }))
    }

    function onPaymentMethodReset() {
        setErrors([])
        setSuccess('')
        setPaymentMethod('')
    }

    function onAddressReset() {
        setErrors([])
        setSuccess('')
        setAddress(addressInitialState)
    }

    async function onAddPaymentClick(e) {
        e.preventDefault()
        authenticated && await axios
            .patch(checkoutCartUrl('/payment'), { 'paymentMethod': paymentMethod }, authHeader(token))
            .then(() => setSuccess('Succcessively added payment method'), setErrors([]), setReloadData(true))
            .catch(error => setErrors(error.response?.data?.errors || 'Internal error'), setSuccess(''))
    }

    async function onAddAddressClick(e) {
        e.preventDefault()
        authenticated && await axios
            .patch(checkoutCartUrl('/address'), address, authHeader(token))
            .then(() => setSuccess('Succcessively added address'), setErrors([]), setReloadData(true))
            .catch(error => setErrors(error.response?.data?.errors || 'Internal error'), setSuccess(''))
    }

    async function onOrderClick(e) {
        e.preventDefault()
        setSuccess('Waiting for response...')
        if(authenticated){
            try {
                await axios.post(orderUrl(''), null, authHeader(token))
                setSuccess('Successfully ordered and e-mail sent')
                setErrors([])
            } catch(error) {
                setErrors(error.response?.data?.errors || 'Internal error')
                setSuccess('')
            }
        }
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
                        <div className="payment-address-forms">
                            <form className="submission-form">
                                <div className="payment-form">
                                    <label htmlFor="paymentMethod" className="payment-method">
                                        <InputRadio
                                            label="Credit card"
                                            name="paymentMethod"
                                            value="CREDIT_CARD"
                                            checked={paymentMethod === "CREDIT_CARD"}
                                            onChange={onPaymentInputChange}
                                        />
                                        <InputRadio
                                            label="Blik"
                                            name="paymentMethod"
                                            value="BLIK"
                                            checked={paymentMethod === "BLIK"}
                                            onChange={onPaymentInputChange}
                                        />
                                        <InputRadio
                                            label="Paypal"
                                            name="paymentMethod"
                                            value="PAYPAL"
                                            checked={paymentMethod === "PAYPAL"}
                                            onChange={onPaymentInputChange}
                                        />
                                    </label>
                                    <div className="buttons-container">
                                        <SubmitButton onSubmit={onAddPaymentClick} value='Add payment' />
                                        <ResetButton onReset={onPaymentMethodReset} value="Reset" />
                                    </div>
                                    <div className="messages">
                                        <SuccessMessage success={success} />
                                        <ErrorMessages errors={errors} />
                                    </div>
                                </div>
                            </form>
                            <form className="submission-form">
                                <div className="address-form">
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
                                    <div className="buttons-container">
                                        <SubmitButton onSubmit={onAddAddressClick} value='Add address' />
                                        <ResetButton onReset={onAddressReset} value="Reset" />
                                    </div>
                                    <div className="order-button">
                                        <SubmitButton onSubmit={onOrderClick} value='Order' />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}