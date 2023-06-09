import React, { useState } from 'react';
import axios from 'axios';
import JwtCookie from '../shared/JwtCookie';
import SuccessMessage from '../form/SuccessMessage'
import SubmitButton from '../form/SubmitButton';
import "../../css/content/Logout.css"

export default function Logout() {

    const [success, setSuccess] = useState('')

    async function onSubmit(e) {
        e.preventDefault();
        const token = JwtCookie.extractJwt()
        await axios
            .get("http://localhost:8080/api/v1/logout", { headers: { 'Authorization': 'Bearer ' + token } })
            .then(() => {
                const d = new Date();
                d.setHours(d.getHours() - 1);
                const utc = d.toUTCString();
                document.cookie = 'Authorization=' + token + ';expires=' + utc;
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