import { useEffect, useState } from 'react'
import axios from 'axios'

import { ErrorMessages } from '../components/Messages'
import { authHeader, orderUrl } from '../shared/constans'
import { convertDateToSimpleFormat } from "../shared/converters";
import SummaryLine from '../components/SummaryLine'
import useAuthentication from '../shared/useAuthentication'
import Header from '../components/Header'

import '../../css/routes/Orders.css'

export default function Orders() {

    const [orders, setOrders] = useState([])
    const { token, authenticated, errors, setErrors } = useAuthentication()

    useEffect(() => {
        authenticated && axios
            .get(orderUrl, authHeader(token))
            .then(response => setOrders(response.data))
            .catch(() => setErrors([{ message: 'Internal error' }]))
    }, [authenticated])


    return (
        <>
            {!authenticated && <div className="errorPage"><ErrorMessages errors={errors} /></div>}
            {authenticated && (
                <div className="orders">
                    <Header content="Orders" />
                    {orders.map(order => (
                        <div className="order-summary">
                            <SummaryLine
                                content="Order number"
                                value={order.orderId}
                            />
                            <SummaryLine
                                content="Payment method"
                                value={order.paymentMethod}
                            />
                            <SummaryLine
                                content="Order date"
                                value={convertDateToSimpleFormat(order.orderDate)}
                            />
                            <SummaryLine
                                content="Order status"
                                value={order.orderStatus}
                            />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}