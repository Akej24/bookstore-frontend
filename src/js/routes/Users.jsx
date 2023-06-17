import { useEffect, useState } from 'react'
import axios from 'axios'

import { usersUrl, authHeader } from '../shared/constants'
import { ErrorMessages, SuccessMessage } from '../components/Messages'
import { PaginationButtons } from '../components/Buttons'
import UsersTable from '../components/UsersTable'
import useAuthentication from '../shared/useAuthentication'
import Header from '../components/Header'

import '../../css/components/Table.css'

export default function Users() {
    const [users, setUsers] = useState([])
    const [reloadData, setReloadData] = useState(false)
    const [success, setSuccess] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const { token, authenticated, errors, setErrors, isAdmin } = useAuthentication()

    useEffect(() => {
        isAdmin === false ? setErrors([{message: 'You do not have administrator permission'}]) : setErrors([''])
        authenticated && isAdmin && axios
            .get(usersUrl(`?page=${currentPage}`), authHeader(token))
            .then(response => setUsers(response.data), setReloadData(false), setErrors([]))
            .catch(error => setErrors(error.response?.data?.errors || 'Internal error'))
    }, [authenticated, isAdmin, reloadData, currentPage])

    async function onDeleteClick(userId) {
        authenticated && await axios
            .delete(usersUrl('/' + userId), authHeader(token))
            .then(() => setErrors([]), setSuccess('Successfully deleted'))
            .catch(error => setErrors(error.response?.data?.errors || 'Internal error'))
            .finally(() => setReloadData(true), users.length === 1 && setUsers([]))
    }

    function handlePageChange(page) {
        setSuccess('')
		setCurrentPage(page)
	}

    return (
        <>
            {(!authenticated || !isAdmin) && <div className="errorPage"><ErrorMessages errors={errors} /></div>}
            {authenticated && isAdmin && (
                <>
                    <div className="users">
                        <Header content="Users" />
                        {users && (
                            <UsersTable
                                users={users}
                                onDeleteClick={onDeleteClick}
                            />
                        )}
                        <div className="messages-div">
                            <SuccessMessage success={success} />
                            <ErrorMessages errors={errors} />
                        </div>
                    </div>
                    <PaginationButtons currentPage={currentPage} handlePageChange={handlePageChange} />
                </>
            )}
        </>
    )
}