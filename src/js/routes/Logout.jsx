import { useState } from 'react'
import axios from 'axios'

import { extractJwtFromCookie, deleteJwtFromCookie } from '../shared/jwt_cookie'
import { logoutUrl, authHeader } from '../shared/constans'
import { SuccessMessage } from '../components/Messages'
import { SubmitButton } from '../components/Buttons'

import '../../css/routes/Logout.css'

export default function Logout() {

    const [success, setSuccess] = useState('')

    async function onSubmit(e) {
        e.preventDefault()
        const token = extractJwtFromCookie()
        await axios
            .get(logoutUrl, authHeader(token))
            .then(() => {
                deleteJwtFromCookie(token)
                setSuccess('Successively logged out')
            })
    }

    return (
        <div className="logout-page">
            <SubmitButton onSubmit={onSubmit} value="Log out" />
            <SuccessMessage success={success} />
        </div>
    );
}