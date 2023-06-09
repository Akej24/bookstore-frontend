import React, { useState } from 'react'
import axios from 'axios';
import Nav from '../ui/Nav';
import SuccessMessage from './SuccessMessage';
import ErrorMessages from './ErrorMessages';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import ResetButton from './ResetButton';
import Header from '../ui/Header';
import '../../css/form/Form.css';

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
				document.cookie = 'Authorization=' + token
				setSuccess("Successively logged in");
				setErrors([]);
			})
			.catch(error => {
				setSuccess("")
				setErrors(error.response.data.errors);
			})
	}

	function onReset(e) {
		setUser(userInitialState)
	}

	return (
		<div className="submission-form">
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
				<SubmitButton onSubmit={onSubmit} />
				<ResetButton onReset={onReset} />
				<SuccessMessage success={success} />
				<ErrorMessages errors={errors} />
			</form>
		</div>
	);
}