import { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'

import { extractJwtFromCookie } from './jwt_cookie'

export default function useAuthentication() {
    const [token, setToken] = useState('')
    const [authenticated, setAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const extractedToken = extractJwtFromCookie()
        setToken(extractedToken)
        setAuthenticated(extractedToken !== '')
    }, [])

    useEffect(() => {
        setErrors(authenticated ? [] : [{ message: 'Cannot load the page because you are not logged in' }])
    }, [authenticated])

	useEffect(() => {
		if (token) {
			const decodedToken = jwtDecode(token)
			const { roles } = decodedToken
            setIsAdmin(roles.some(role => role.authority === "ADMIN"))
		}
	}, [token])

    return { token, authenticated, errors, setErrors, isAdmin }
}