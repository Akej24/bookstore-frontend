import { useState } from 'react'
import axios from 'axios'

import { SuccessMessage, ErrorMessages } from '../components/Messages'
import { InputField } from '../components/Inputs'
import { SubmitButton, ResetButton } from '../components/Buttons'
import { loginUrl, loginUserInitialState } from '../shared/constants'
import { saveJwtToCookie } from '../shared/jwt_cookie'
import Header from '../components/Header'

import '../../css/components/Form.css'

export default function LoginForm() {
	const [user, setUser] = useState(loginUserInitialState)
	const [errors, setErrors] = useState([])
	const [success, setSuccess] = useState('')
	const { email, password } = user

	function onInputChange(e) {
		const { name, value } = e.target
		setUser(prevUser => ({
			...prevUser,
			[name]: value
		}))
	}

	async function onSubmit(e) {
		e.preventDefault()
		await axios
			.post(loginUrl, user)
			.then((response) => {
				const token = response.headers.authorization
				saveJwtToCookie(token)
				setSuccess('Successively logged in')
				setErrors([])
			})
			.catch(error => setErrors(error.response?.data?.errors || 'Internal error'), setSuccess(''))
	}

	function onReset() {
		setErrors([])
		setSuccess('')
		setUser(loginUserInitialState)
	}

	return (
		<div className="submission-form" id="login-form">
			<form>
				<Header content='Log in' />
				<InputField
					label="Email"
					type="text"
					name="email"
					placeholder="Enter your e-mail"
					value={email}
					onChange={onInputChange}
				/>
				<InputField
					label="Password"
					type="password"
					name="password"
					placeholder="Enter your password"
					value={password}
					onChange={onInputChange}
				/>
				<div className="buttons-container">
					<SubmitButton onSubmit={onSubmit} value="Submit" />
					<ResetButton onReset={onReset} value="Reset" />
				</div>
				<SuccessMessage success={success} />
				<ErrorMessages errors={errors} />
			</form>
		</div>
	)
}
