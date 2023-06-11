import { useEffect, useState } from 'react'
import axios from 'axios'
import { ErrorMessages } from '../components/Messages'
import { GET_ORDERS_URL } from '../shared/constans'
import { convertDateToSimpleFomart } from "../shared/converters";
import SummaryLine from '../components/SummaryLine'
import useAuthentication from '../shared/useAuthentication'
import Header from '../components/Header'
import '../../css/routes/Orders.css'

export default function Orders() {

    const [orders, setOrders] = useState([])
    const { token, authenticated, errors, setErrors } = useAuthentication()

    useEffect(() => {
        authenticated && axios
            .get(GET_ORDERS_URL, { headers: { 'Authorization': 'Bearer ' + token } })
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
                                className="order-id"
                                content="Order number"
                                value={order.orderId}
                            />
                            <SummaryLine
                                className="order-payment-method"
                                content="Payment method"
                                value={order.paymentMethod}
                            />
                            <SummaryLine
                                className="order-date"
                                content="Order date"
                                value={convertDateToSimpleFomart(order.orderDate)}
                            />
                            <SummaryLine
                                className="order-status"
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