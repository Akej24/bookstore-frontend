import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../ui/Nav';
import JwtCookie from '../shared/JwtCookie';
import '../../css/form/Form.css';
import SubmitButton from '../form/SubmitButton';

export default function Logout() {

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
            })
    }

    return (
        <div>
            Logout
            <SubmitButton onSubmit={onSubmit} />
        </div>
    );
}