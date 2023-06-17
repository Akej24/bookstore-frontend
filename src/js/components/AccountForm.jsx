import { useState, useEffect } from 'react'
import axios from 'axios'
import { SuccessMessage, ErrorMessages } from '../components/Messages'
import { SubmitButton, ResetButton } from '../components/Buttons'
import { InputField } from '../components/Inputs'
import { authHeader, accountUrl } from '../shared/constants'
import Header from '../components/Header'
import useAuthentication from '../shared/useAuthentication'
import '../../css/components/Form.css'

export default function AccountForm({ accountInitialState }) {

    const [account, setAccount] = useState({ ...accountInitialState, password: '' });
    const [success, setSuccess] = useState('')
    const { token, authenticated, errors, setErrors } = useAuthentication()
    const { username, password, firstName, lastName, dateOfBirth } = account

    function onInputChange(e) {
        const { name, value } = e.target
        setAccount(preAccount => ({
            ...preAccount,
            [name]: value
        }))
    }

    async function onSubmit(e) {
        e.preventDefault()
        await axios
            .patch(accountUrl(''), account, authHeader(token))
            .then(() => setSuccess('Successfully edited'), setErrors([]))
            .catch(error => setErrors(error.response?.data?.errors || 'Internal error'))

    }

    function onReset(e) {
        setErrors([])
        setSuccess('')
        setAccount(accountInitialState)
    }

    return (
        <>
            {!authenticated && <div className="errorPage"><ErrorMessages errors={errors} /></div>}
            {authenticated && (
                <div className="submission-form" id="account-form">
                    <form>
                        <Header content='Edit account' />
                        <InputField
                            label="Username"
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={onInputChange}
                        />
                        <InputField
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="Enter your current / new password"
                            value={password}
                            onChange={onInputChange}
                        />
                        <InputField
                            label="First name"
                            type="text"
                            name="firstName"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={onInputChange}
                        />
                        <InputField
                            label="Last name"
                            type="text"
                            name="lastName"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={onInputChange}
                        />
                        <InputField
                            label="Date of birth"
                            type="date"
                            name="dateOfBirth"
                            placeholder="Enter your date of birth"
                            value={dateOfBirth}
                            onChange={onInputChange}
                        />
                        <div className="buttons-container">
                            <SubmitButton onSubmit={onSubmit} value="Submit" />
                            <ResetButton onReset={onReset} value="Reset" />
                        </div>
                        <SuccessMessage success={success} />
                        <ErrorMessages errors={errors} />
                    </form>
                </div>
            )}
        </>
    );
}