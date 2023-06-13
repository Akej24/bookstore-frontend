import { useEffect, useState } from 'react'
import axios from 'axios'
import { ErrorMessages } from '../components/Messages'
import { GET_ACCOUNT_URL, GET_ORDERS_URL } from '../shared/constans'
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

    useEffect(() => {
        authenticated && axios
            .get(GET_ACCOUNT_URL, { headers: { 'Authorization': 'Bearer ' + token } })
            .then(response => setAccount(response.data))
            .catch(() => setErrors([{ message: 'Internal error' }]))
    }, [authenticated])

    async function onEditClick(account) {
		setEditingAccount(account);
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
                                <SummaryLine
                                    content="E-mail"
                                    value={account.email}
                                />
                                <SummaryLine
                                    content="Username"
                                    value={account.username}
                                />
                                <SummaryLine
                                    content="First name"
                                    value={account.firstName}
                                />
                                <SummaryLine
                                    content="Last name"
                                    value={account.lastName}
                                />
                                <SummaryLine
                                    content="Date of birth"
                                    value={account.dateOfBirth}
                                />
                                <SummaryLine
                                    content="Funds"
                                    value={account.funds + ' zł'}
                                />
                            </div>
                            <div className="account-edit">
                                <SubmitButton onSubmit={onEditClick} value="Edit account" />
                            </div>
                        </div>
                    }
                </>
            )}
        </>
    );
}