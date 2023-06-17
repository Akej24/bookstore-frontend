import { useEffect, useState } from 'react'
import axios from 'axios'

import { ErrorMessages } from '../components/Messages'
import { accountUrl, authHeader } from '../shared/constants'
import { SubmitButton } from '../components/Buttons'
import AccountForm from '../components/AccountForm'
import SummaryLine from '../components/SummaryLine'
import useAuthentication from '../shared/useAuthentication'
import Header from '../components/Header'

import '../../css/routes/Account.css'

export default function Account() {
    const [account, setAccount] = useState([])
    const [editingAccount, setEditingAccount] = useState(null)
    const { token, authenticated, errors, setErrors } = useAuthentication()
    const { email, username, firstName, lastName, dateOfBirth, funds } = account

    useEffect(() => {
        authenticated && axios
            .get(accountUrl(''), authHeader(token))
            .then(response => setAccount(response.data))
            .catch(error => setErrors(error.response?.data?.errors || 'Internal error'))
    }, [authenticated])

    async function onEditClick(clickedAccount) {
        setEditingAccount(clickedAccount)
    }

    return (
        <>
            {!authenticated && <div className="errorPage"><ErrorMessages errors={errors} /></div>}
            {authenticated && (
                <>
                    {editingAccount && <AccountForm accountInitialState={account} />}
                    {!editingAccount &&
                        <div className="account">
                            <Header content="Account" />
                            <div className="account-summary">
                                <SummaryLine content="E-mail" value={email} />
                                <SummaryLine content="Username" value={username} />
                                <SummaryLine content="First name" value={firstName} />
                                <SummaryLine content="Last name" value={lastName} />
                                <SummaryLine content="Date of birth" value={dateOfBirth} />
                                <SummaryLine content="Funds" value={funds + ' zł'} />
                            </div>
                            <div className="account-edit">
                                <SubmitButton onSubmit={onEditClick} value="Edit account" />
                            </div>
                        </div>
                    }
                </>
            )}
        </>
    )
}