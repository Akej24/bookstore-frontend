import { SubmitButton } from './Buttons'

export default function DeliveriesTable({ deliveries, onMarkAsSentClick, onMarkAsReceivedClick }) {
    return (
        <div className="table-div">
            <table>
                <DeliveryHeader />
                <tbody className="deliveries-table-tbody">
                    {deliveries.map(delivery => (
                        <DeliveryRow
                            key={delivery.deliveryNumber}
                            delivery={delivery}
                            onMarkAsSentClick={onMarkAsSentClick}
                            onMarkAsReceivedClick={onMarkAsReceivedClick}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function DeliveryHeader() {
    return (
        <thead className="deliveries-table-thead">
            <tr>
                <th>Delivery number</th>
                <th>Method</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Phone number</th>
                <th>Street</th>
                <th>Street number</th>
                <th>Zip code</th>
                <th>City</th>
                <th>Status</th>
                <th>Mark sent</th>
                <th>Mark received</th>
            </tr>
        </thead>
    )
}

function DeliveryRow({ delivery, onMarkAsSentClick, onMarkAsReceivedClick }) {
    const { orderId, deliveryNumber, deliveryMethod, address, deliveryStatus } = delivery
    const { firstName, lastName, phoneNumber, street, streetNumber, zipCode, city } = address
    return (
        <tr key={deliveryNumber}>
            <td>{deliveryNumber}</td>
            <td>{deliveryMethod}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{phoneNumber}</td>
            <td>{street}</td>
            <td>{streetNumber}</td>
            <td>{zipCode}</td>
            <td>{city}</td>
            <td>{deliveryStatus}</td>  
            <td><SubmitButton onSubmit={() => onMarkAsSentClick(deliveryNumber)} value='Send' /></td>
            <td><SubmitButton onSubmit={() => onMarkAsReceivedClick(deliveryNumber)} value='Receive' /></td>
        </tr>
    )
}