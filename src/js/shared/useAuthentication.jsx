import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode'

import { extractJwtFromCookie } from './jwt_cookie';

export default function useAuthentication() {
    const [token, setToken] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const extractedToken = extractJwtFromCookie();
        setToken(extractedToken);
        setAuthenticated(extractedToken !== '');
    }, []);

    useEffect(() => {
        setErrors(authenticated ? [] : [{ message: 'Cannot load the page because you are not logged in' }]);
    }, [authenticated]);

	useEffect(() => {
		if (token) {
			const decodedToken = jwtDecode(token)
			const { roles } = decodedToken
			for (let i = 0; i < roles.length; i++) {
				if (roles[i].authority === "ADMIN") {
					setIsAdmin(true)
				}
			}
		}
	}, [token]);

    return { token, authenticated, errors, setErrors, isAdmin };
}