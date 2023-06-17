import { SubmitButton } from './Buttons'

export default function UsersTable({ users, onDeleteClick }) {
    return (
        <div className="table-div">
            <table>
                <UserHeader />
                <tbody className="users-table-tbody">
                    {users.map(user => (
                        <UserRow
                            key={user.userId}
                            user={user}
                            onDeleteClick={onDeleteClick}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function UserHeader() {
    return (
        <thead className="users-table-thead">
            <tr>
                <th>E-mail</th>
                <th>Username</th>
                <th>Funds</th>
                <th>Delete</th>
            </tr>
        </thead>
    )
}

function UserRow({ user, onDeleteClick }) {
    const { userId, email, username, funds } = user
    return (
        <tr key={userId}>
            <td>{email}</td>
            <td>{username}</td>
            <td>{funds} zł</td>
            <td><SubmitButton onSubmit={() => onDeleteClick(userId)} value='Delete' /></td>
        </tr>
    )
}