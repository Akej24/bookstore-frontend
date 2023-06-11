import { useState, useEffect } from 'react';
import { extractJwtFromCookie } from './jwt_cookie';

export default function useAuthentication() {
    const [token, setToken] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const extractedToken = extractJwtFromCookie();
        setToken(extractedToken);
        setAuthenticated(extractedToken !== '');
    }, []);

    useEffect(() => {
        setErrors(authenticated ? [] : [{ message: 'Cannot load the page because you are not logged in' }]);
    }, [authenticated]);

    return { token, authenticated, errors, setErrors };
}