import { useEffect, useState } from 'react'
import axios from 'axios'

import { deliveriesUrl, authHeader } from '../shared/constants'
import { ErrorMessages, SuccessMessage } from '../components/Messages'
import DeliveriesTable from '../components/DeliveriesTable'
import useAuthentication from '../shared/useAuthentication'
import Header from '../components/Header'

import '../../css/components/Table.css'

export default function Deliveries(){
    const [deliveries, setDeliveries] = useState([])
    const [reloadData, setReloadData] = useState(false)
    const [success, setSuccess] = useState('')
    const { token, authenticated, errors, setErrors, isAdmin } = useAuthentication()

    useEffect(() => {
        isAdmin === false ? setErrors([{message: 'You do not have administrator permission'}]) : setErrors([''])
        authenticated && isAdmin && axios
            .get(deliveriesUrl(''), authHeader(token))
            .then(response => setDeliveries(response.data), setReloadData(false), setErrors([]))
            .catch(error => setErrors(error.response?.data?.errors || 'Internal error'))
    }, [authenticated, isAdmin, reloadData])

    async function onMarkAsSentClick(deliveryNumber) {
        authenticated && await axios
            .post(deliveriesUrl('/send/' + deliveryNumber), null, authHeader(token))
            .then(() => setErrors([]), setSuccess('Successfully marked as send'))
            .catch(error => setErrors(error.response?.data?.errors || 'Internal error'))
            .finally(() => setReloadData(true))
    }

    async function onMarkAsReceivedClick(deliveryNumber) {
        authenticated && await axios
            .post(deliveriesUrl('/receive/' + deliveryNumber), null, authHeader(token))
            .then(() => setErrors([]), setSuccess('Successfully marked as received'))
            .catch(error => setErrors(error.response?.data?.errors || 'Internal error'))
            .finally(() => setReloadData(true))
    }

    return (
        <>
            {(!authenticated || !isAdmin) && <div className="errorPage"><ErrorMessages errors={errors} /></div>}
            {authenticated && isAdmin && (
                <>
                    <div className="deliveries">
                        <Header content="Deliveries" />
                        {deliveries && (
                            <DeliveriesTable
                                deliveries={deliveries}
                                onMarkAsSentClick={onMarkAsSentClick}
                                onMarkAsReceivedClick={onMarkAsReceivedClick}
                            />
                        )}
                        <div className="messages-div">
                            <SuccessMessage success={success} />
                            <ErrorMessages errors={errors} />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}