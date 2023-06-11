import { useState } from 'react'
import axios from 'axios'
import SuccessMessage from '../../components/messages/SuccessMessage'
import ErrorMessages from '../../components/messages/ErrorMessages'
import InputField from '../../components/form/InputField'
import SubmitButton from '../../components/buttons/SubmitButton'
import ResetButton from '../../components/buttons/ResetButton'
import Header from '../../components/view/Header'
import { saveJwtToCookie } from '../../shared/JwtCookie'
import '../../../css/form/Form.css'

export default function LoginForm() {

	const userInitialState = {
		email: '',
		password: ''
	}
	const [user, setUser] = useState(userInitialState)
	const [errors, setErrors] = useState([])
	const [success, setSuccess] = useState('')
	const { email, password } = user;

	function onInputChange(e) {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	async function onSubmit(e) {
		e.preventDefault();
		await axios
			.post("http://localhost:8080/api/v1/login", user)
			.then((response) => {
				const token = response.headers.authorization
				saveJwtToCookie(token)
				setSuccess("Successively logged in");
				setErrors([]);
			})
			.catch(error => {
				setSuccess('')
				setErrors(error.response.data.errors);
			})
	}

	function onReset() {
		setErrors([])
		setSuccess('')
		setUser(userInitialState)
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
	);
}
